import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/Login/LoginPage';
import { AuthProvider } from '@/context/AuthContext';
import { authService } from '@/services/authService';

vi.mock('@/services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn().mockRejectedValue({ status: 401 }),
    login: vi.fn(),
    logout: vi.fn(),
  },
}));

vi.mock('@/services/apiClient', () => ({
  apiClient: {
    getCsrfToken: vi.fn().mockResolvedValue('mock-csrf-token'),
  },
}));

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form elements', async () => {
    renderLoginPage();

    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email or 10-digit mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in to novashop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create an account/i })).toBeInTheDocument();
  });

  it('shows validation error when submitting empty form', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    const submitBtn = await screen.findByRole('button', { name: /sign in to novashop/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/email or mobile number is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/^password is required/i)).toBeInTheDocument();
  });

  it('shows error when invalid identifier is entered', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    const identifierInput = await screen.findByLabelText(/email or 10-digit mobile number/i);
    await user.type(identifierInput, 'invalid-identifier');

    const submitBtn = screen.getByRole('button', { name: /sign in to novashop/i });
    await user.click(submitBtn);

    expect(
      await screen.findByText(/enter a valid email address or 10-digit mobile number/i)
    ).toBeInTheDocument();
  });

  it('calls login API with credentials on valid submission', async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 1,
      fullName: 'Test User',
      email: 'test@example.com',
      mobileNumber: '9876543210',
    };
    vi.mocked(authService.login).mockResolvedValue(mockUser);

    renderLoginPage();

    const identifierInput = await screen.findByLabelText(/email or 10-digit mobile number/i);
    const passwordInput = screen.getByLabelText(/^password/i);

    await user.type(identifierInput, 'test@example.com');
    await user.type(passwordInput, 'Secret@123');

    const submitBtn = screen.getByRole('button', { name: /sign in to novashop/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'Secret@123',
      });
    });
  });

  it('displays generic error when backend rejects credentials', async () => {
    const user = userEvent.setup();
    vi.mocked(authService.login).mockRejectedValue({
      status: 400,
      message: 'Invalid credentials. Please verify your details.',
    });

    renderLoginPage();

    const identifierInput = await screen.findByLabelText(/email or 10-digit mobile number/i);
    const passwordInput = screen.getByLabelText(/^password/i);

    await user.type(identifierInput, 'wrong@example.com');
    await user.type(passwordInput, 'WrongPass@123');

    const submitBtn = screen.getByRole('button', { name: /sign in to novashop/i });
    await user.click(submitBtn);

    expect(
      await screen.findByText(/invalid credentials\. please verify your details\./i)
    ).toBeInTheDocument();
  });
});
