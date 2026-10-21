import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FormField } from '@/components/forms/FormField';
import { TextInput } from '@/components/forms/TextInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormError } from '@/components/common/FormError';
import { Toast } from '@/components/common/Toast';
import { verifyOtpSchema, VerifyOtpFormData } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/auth';

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const { recoveryIdentifier, setResetToken } = useAuth();

  const [identifier, setIdentifier] = useState<string>(recoveryIdentifier || '');
  const [serverError, setServerError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Resend cooldown timer (60s)
  const [resendCooldown, setResendCooldown] = useState<number>(60);
  const [isResending, setIsResending] = useState<boolean>(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    mode: 'onTouched',
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: VerifyOtpFormData) => {
    if (!identifier) {
      setServerError('Please provide your registered email or mobile number.');
      return;
    }

    setServerError(null);
    setToastMessage(null);

    try {
      const response = await authService.verifyResetOtp({
        identifier: identifier.trim(),
        otp: data.otp.trim(),
      });

      // Keep reset token in memory only
      setResetToken(response.resetToken);

      setToastMessage('OTP verified! Proceeding to reset password...');
      setTimeout(() => {
        navigate('/reset-password');
      }, 1000);
    } catch (err: unknown) {
      const error = err as ApiError;
      setServerError(error.message || 'Invalid or expired OTP. Please verify and try again.');
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !identifier || isResending) return;

    setIsResending(true);
    setServerError(null);

    try {
      await authService.forgotPassword({ identifier: identifier.trim() });
      setToastMessage('A fresh verification code has been dispatched.');
      setResendCooldown(60);
    } catch (err: unknown) {
      const error = err as ApiError;
      setServerError(error.message || 'Failed to resend OTP. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify verification code"
      subtitle={
        identifier
          ? `Enter the 6-digit passcode sent to the email associated with ${identifier}.`
          : 'Enter your identifier and the 6-digit passcode sent to your email.'
      }
      badge="Two-Step Verification"
    >
      {toastMessage && (
        <div className="mb-6">
          <Toast type="success" message={toastMessage} onClose={() => setToastMessage(null)} />
        </div>
      )}

      {serverError && (
        <div className="mb-6">
          <FormError message={serverError} />
        </div>
      )}

      {/* If user navigated directly without identifier */}
      {!recoveryIdentifier && (
        <div className="mb-4">
          <FormField label="Email or Mobile Number" required>
            <TextInput
              placeholder="e.g. user@example.com or 9876543210"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </FormField>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="6-Digit One-Time Passcode (OTP)"
          htmlFor="otp"
          helperText="Valid for 5 minutes. Maximum 5 verification attempts allowed."
          error={errors.otp?.message}
          required
        >
          <TextInput
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            autoComplete="one-time-code"
            leftIcon={<ShieldAlert className="w-4 h-4" />}
            className="text-center font-mono text-lg tracking-widest font-bold"
            error={!!errors.otp}
            {...register('otp')}
          />
        </FormField>

        {/* Resend Action */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-500">Didn't receive the code?</span>
          <button
            type="button"
            disabled={resendCooldown > 0 || isResending}
            onClick={handleResend}
            className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
            </span>
          </button>
        </div>

        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            Verify &amp; Continue
          </PrimaryButton>
        </div>

        <div className="text-center pt-3">
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change email or mobile number</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
