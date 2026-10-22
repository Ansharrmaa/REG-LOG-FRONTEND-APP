import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { PasswordStrengthIndicator } from '@/components/forms/PasswordStrengthIndicator';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormError } from '@/components/common/FormError';
import { resetPasswordSchema, ResetPasswordFormData } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/auth';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetToken, clearRecoveryState } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPasswordValue = watch('newPassword');

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetToken) {
      setServerError('Reset token is missing or expired. Please restart the password recovery process.');
      return;
    }

    setServerError(null);

    try {
      await authService.resetPassword({
        resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      // Clear memory token immediately
      clearRecoveryState();

      navigate('/login', {
        state: {
          message: 'Your password has been successfully reset! Please sign in with your new credentials.',
        },
      });
    } catch (err: unknown) {
      const error = err as ApiError;
      setServerError(
        error.message || 'Unable to reset password. The reset link may have expired. Please try again.'
      );
    }
  };

  // If user accesses this page without having verified OTP
  if (!resetToken) {
    return (
      <AuthLayout
        title="Password Reset Expired"
        subtitle="No active password reset session was found."
        badge="Session Required"
      >
        <div className="space-y-6 text-center py-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            For your security, password reset tokens are single-use and expire within 10 minutes.
            Please request a fresh verification code to proceed.
          </p>
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#881337] hover:bg-rose-950 text-white font-semibold text-sm shadow-md transition-colors"
          >
            <span>Request New Reset Code</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create new password"
      subtitle="Your new password must differ from previous passwords and satisfy security requirements."
      badge="Set New Credentials"
    >
      {serverError && (
        <div className="mb-6">
          <FormError message={serverError} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* New Password */}
        <FormField
          label="New Password"
          htmlFor="newPassword"
          error={errors.newPassword?.message}
          required
        >
          <PasswordInput
            id="newPassword"
            placeholder="Enter new password"
            autoComplete="new-password"
            error={!!errors.newPassword}
            {...register('newPassword')}
          />
        </FormField>

        {/* Dynamic Requirement Indicator */}
        <PasswordStrengthIndicator password={newPasswordValue} />

        {/* Confirm Password */}
        <FormField
          label="Confirm New Password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
          required
        >
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm new password"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
        </FormField>

        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            icon={<ShieldCheck className="w-4 h-4" />}
          >
            Update Password &amp; Invalidate Sessions
          </PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
};
