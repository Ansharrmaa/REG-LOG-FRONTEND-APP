import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, ArrowLeft, Mail } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FormField } from '@/components/forms/FormField';
import { TextInput } from '@/components/forms/TextInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormError } from '@/components/common/FormError';
import { Toast } from '@/components/common/Toast';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/auth';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRecoveryIdentifier } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      identifier: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    setSuccessInfo(null);

    const trimmedIdentifier = data.identifier.trim();

    try {
      const response = await authService.forgotPassword({ identifier: trimmedIdentifier });
      // Store identifier in memory for OTP verification
      setRecoveryIdentifier(trimmedIdentifier);
      setSuccessInfo(
        response.message ||
          'If an account exists, a 6-digit verification code has been dispatched to your registered email address.'
      );

      // Short pause to show message before navigating
      setTimeout(() => {
        navigate('/verify-otp');
      }, 1500);
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.status === 429) {
        setServerError('Too many reset requests. Please wait a few minutes before trying again.');
      } else {
        setServerError(error.message || 'Unable to process your request. Please try again later.');
      }
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your registered email address or mobile number to receive a one-time passcode (OTP)."
      badge="Password Recovery"
    >
      {successInfo && (
        <div className="mb-6">
          <Toast type="success" message={successInfo} />
        </div>
      )}

      {serverError && (
        <div className="mb-6">
          <FormError message={serverError} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="Email or 10-Digit Mobile Number"
          htmlFor="identifier"
          helperText="We will send an OTP to the verified email address linked to this identifier."
          error={errors.identifier?.message}
          required
        >
          <TextInput
            id="identifier"
            placeholder="e.g. user@example.com or 9876543210"
            autoComplete="username"
            leftIcon={<Mail className="w-4 h-4" />}
            error={!!errors.identifier}
            {...register('identifier')}
          />
        </FormField>

        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            icon={<KeyRound className="w-4 h-4" />}
          >
            Send Recovery Code (OTP)
          </PrimaryButton>
        </div>

        <div className="text-center pt-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to sign in</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
