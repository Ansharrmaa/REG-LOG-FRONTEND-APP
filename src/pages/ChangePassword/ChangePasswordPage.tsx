import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { PasswordStrengthIndicator } from '@/components/forms/PasswordStrengthIndicator';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormError } from '@/components/common/FormError';
import { Toast } from '@/components/common/Toast';
import { changePasswordSchema, ChangePasswordFormData } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/auth';

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPasswordValue = watch('newPassword');

  const onSubmit = async (data: ChangePasswordFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      setSuccessMessage(
        'Password changed successfully! Existing sessions have been revoked. Please sign in with your new password.'
      );

      // Backend revokes active sessions on password change
      await logout();

      setTimeout(() => {
        navigate('/login', {
          state: {
            message: 'Password changed successfully. Please sign in with your new password.',
          },
        });
      }, 1500);
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.status === 401) {
        setServerError('Your session has expired. Please sign in again.');
        await logout();
        navigate('/login');
      } else {
        setServerError(
          error.message || 'Failed to change password. Please ensure your current password is correct.'
        );
      }
    }
  };

  return (
    <AuthLayout
      title="Change your password"
      subtitle="Update your security credentials. Changing your password will sign you out of other active sessions."
      badge="Security Settings"
    >
      {successMessage && (
        <div className="mb-6">
          <Toast type="success" message={successMessage} />
        </div>
      )}

      {serverError && (
        <div className="mb-6">
          <FormError message={serverError} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Current Password */}
        <FormField
          label="Current Password"
          htmlFor="currentPassword"
          error={errors.currentPassword?.message}
          required
        >
          <PasswordInput
            id="currentPassword"
            placeholder="Enter current password"
            autoComplete="current-password"
            error={!!errors.currentPassword}
            {...register('currentPassword')}
          />
        </FormField>

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

        {/* Password Requirement Indicator */}
        <PasswordStrengthIndicator password={newPasswordValue} />

        {/* Confirm New Password */}
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
            icon={<KeyRound className="w-4 h-4" />}
          >
            Update Password
          </PrimaryButton>
        </div>

        <div className="text-center pt-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
