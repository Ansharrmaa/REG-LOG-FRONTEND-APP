import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, UserPlus } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FormField } from '@/components/forms/FormField';
import { TextInput } from '@/components/forms/TextInput';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { PasswordStrengthIndicator } from '@/components/forms/PasswordStrengthIndicator';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormError } from '@/components/common/FormError';
import { Toast } from '@/components/common/Toast';
import { registerSchema, RegisterFormData } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { ApiError } from '@/types/auth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      await authService.register({
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        mobileNumber: data.mobileNumber.trim().replace(/\D/g, ''),
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      setSuccessMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', {
          state: {
            identifier: data.email.toLowerCase(),
            message: 'Registration successful! Please sign in with your credentials.',
          },
        });
      }, 1500);
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, msg]) => {
          setError(field as keyof RegisterFormData, { message: msg });
        });
      }
      setServerError(error.message || 'Registration failed. Please check your information.');
    }
  };

  return (
    <AuthLayout
      title="Join Siya Vastra"
      subtitle="Create your account to experience handcrafted luxury and exclusive member access."
      badge="Privé Circle Membership"
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
        {/* Full Name */}
        <FormField
          label="Full Name"
          htmlFor="fullName"
          error={errors.fullName?.message}
          required
        >
          <TextInput
            id="fullName"
            placeholder="John Doe"
            autoComplete="name"
            leftIcon={<UserIcon className="w-4 h-4" />}
            error={!!errors.fullName}
            {...register('fullName')}
          />
        </FormField>

        {/* Email Address */}
        <FormField
          label="Email Address"
          htmlFor="email"
          error={errors.email?.message}
          required
        >
          <TextInput
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            leftIcon={<Mail className="w-4 h-4" />}
            error={!!errors.email}
            {...register('email')}
          />
        </FormField>

        {/* Mobile Number */}
        <FormField
          label="10-Digit Mobile Number"
          htmlFor="mobileNumber"
          helperText="Format: 10 digits without country code (e.g. 9876543210)"
          error={errors.mobileNumber?.message}
          required
        >
          <TextInput
            id="mobileNumber"
            type="tel"
            maxLength={10}
            placeholder="9876543210"
            autoComplete="tel"
            leftIcon={<Phone className="w-4 h-4" />}
            error={!!errors.mobileNumber}
            {...register('mobileNumber')}
          />
        </FormField>

        {/* Password */}
        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
          required
        >
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            error={!!errors.password}
            {...register('password')}
          />
        </FormField>

        {/* Dynamic Requirement Indicator */}
        <PasswordStrengthIndicator password={passwordValue} />

        {/* Confirm Password */}
        <FormField
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
          required
        >
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
        </FormField>

        {/* Submit */}
        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            icon={<UserPlus className="w-4 h-4" />}
          >
            Create Siya Vastra Account
          </PrimaryButton>
        </div>

        {/* Sign in prompt */}
        <div className="text-center pt-3 text-sm text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-rose-900 hover:text-rose-950 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
