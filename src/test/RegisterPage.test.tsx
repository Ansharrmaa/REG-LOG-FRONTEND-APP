import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RegisterPage } from '@/pages/Register/RegisterPage';
import { AuthProvider } from '@/context/AuthContext';
import { authService } from '@/services/authService';

vi.mock('@/services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn().mockRejectedValue({ status: 401 }),
    register: vi.fn(),
  },
}));

vi.mock('@/services/apiClient', () => ({
  apiClient: {
    getCsrfToken: vi.fn().mockResolvedValue('mock-csrf-token'),
  },
}));

const renderRegisterPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('RegisterPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all registration form inputs and password requirements', async () => {
    renderRegisterPage();

    expect(
      await screen.findByRole('heading', { name: /create your account|join siya vastra/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/10-digit mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByText(/password requirements/i)).toBeInTheDocument();
  });

  it('updates password requirement checklist while typing', async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    const passwordInput = await screen.findByLabelText(/^password/i);
    await user.type(passwordInput, 'ValidPassword@123');

    expect(screen.getByText(/strong/i)).toBeInTheDocument();
  });

  it('submits normalized data to register API', async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 2,
      fullName: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '9876543210',
    };
    vi.mocked(authService.register).mockResolvedValue(mockUser);

    renderRegisterPage();

    await user.type(await screen.findByLabelText(/full name/i), '  John Doe  ');
    await user.type(screen.getByLabelText(/email address/i), 'JOHN@EXAMPLE.COM');
    await user.type(screen.getByLabelText(/10-digit mobile number/i), '9876543210');
    await user.type(screen.getByLabelText(/^password/i), 'SecurePass@123');
    await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass@123');

    const submitBtn = screen.getByRole('button', { name: /create siya vastra account/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '9876543210',
        password: 'SecurePass@123',
        confirmPassword: 'SecurePass@123',
      });
    });
  });

  it('displays backend 409 conflict error when email or mobile already exists', async () => {
    const user = userEvent.setup();
    vi.mocked(authService.register).mockRejectedValue({
      status: 409,
      message: 'An account with this email already exists',
    });

    renderRegisterPage();

    await user.type(await screen.findByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'existing@example.com');
    await user.type(screen.getByLabelText(/10-digit mobile number/i), '9876543210');
    await user.type(screen.getByLabelText(/^password/i), 'SecurePass@123');
    await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass@123');

    const submitBtn = screen.getByRole('button', { name: /create siya vastra account/i });
    await user.click(submitBtn);

    expect(
      await screen.findByText(/an account with this email already exists/i)
    ).toBeInTheDocument();
  });
});
