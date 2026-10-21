import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { VerifyOtpPage } from '@/pages/VerifyOtp/VerifyOtpPage';
import { AuthProvider } from '@/context/AuthContext';
import { authService } from '@/services/authService';

vi.mock('@/services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn().mockRejectedValue({ status: 401 }),
    verifyResetOtp: vi.fn(),
    forgotPassword: vi.fn(),
  },
}));

vi.mock('@/services/apiClient', () => ({
  apiClient: {
    getCsrfToken: vi.fn().mockResolvedValue('mock-csrf-token'),
  },
}));

const renderVerifyOtpPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <VerifyOtpPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('VerifyOtpPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders OTP input and verify button', async () => {
    renderVerifyOtpPage();

    expect(await screen.findByRole('heading', { name: /verify verification code/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/6-digit one-time passcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify & continue/i })).toBeInTheDocument();
  });

  it('validates that OTP must be 6 digits', async () => {
    const user = userEvent.setup();
    renderVerifyOtpPage();

    const otpInput = await screen.findByLabelText(/6-digit one-time passcode/i);
    await user.type(otpInput, '123');

    const submitBtn = screen.getByRole('button', { name: /verify & continue/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/otp must be exactly 6 digits/i)).toBeInTheDocument();
  });

  it('calls verifyResetOtp on valid 6-digit submission', async () => {
    const user = userEvent.setup();
    vi.mocked(authService.verifyResetOtp).mockResolvedValue({
      resetToken: 'opaque-reset-token-xyz',
      expiresInSeconds: 600,
    });

    renderVerifyOtpPage();

    // Since recoveryIdentifier is null in this isolated test, the identifier input is rendered
    const identifierInput = await screen.findByPlaceholderText(/user@example.com or 9876543210/i);
    await user.type(identifierInput, 'user@example.com');

    const otpInput = screen.getByLabelText(/6-digit one-time passcode/i);
    await user.type(otpInput, '654321');

    const submitBtn = screen.getByRole('button', { name: /verify & continue/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(authService.verifyResetOtp).toHaveBeenCalledWith({
        identifier: 'user@example.com',
        otp: '654321',
      });
    });
  });
});
