import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserCheck } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { FormField } from '@/components/forms/FormField';
import { TextInput } from '@/components/forms/TextInput';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormError } from '@/components/common/FormError';
import { Toast } from '@/components/common/Toast';
import { loginSchema, LoginFormData } from '@/schemas/authSchemas';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/auth';

const REMEMBER_IDENTIFIER_KEY = 'siyavastra_saved_identifier';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // If redirected from registration or password reset
  useEffect(() => {
    if (location.state?.message) {
      setInfoMessage(location.state.message);
    }
  }, [location.state]);

  const savedIdentifier = localStorage.getItem(REMEMBER_IDENTIFIER_KEY) || '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      identifier: location.state?.identifier || savedIdentifier || '',
      password: '',
    },
  });

  useEffect(() => {
    if (savedIdentifier) {
      setRememberMe(true);
      setValue('identifier', savedIdentifier);
    }
  }, [savedIdentifier, setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setInfoMessage(null);

    try {
      await login({
        identifier: data.identifier.trim(),
        password: data.password,
      });

      // Handle remember me identifier (never store password)
      if (rememberMe) {
        localStorage.setItem(REMEMBER_IDENTIFIER_KEY, data.identifier.trim());
      } else {
        localStorage.removeItem(REMEMBER_IDENTIFIER_KEY);
      }

      // Navigate to intended destination or dashboard
      const origin = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.status === 429) {
        setServerError('Too many login attempts. Please wait a minute and try again.');
      } else {
        setServerError(error.message || 'Invalid credentials. Please verify your details.');
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in with your registered email or 10-digit mobile number."
      badge="Verified Member Access"
    >
      {infoMessage && (
        <div className="mb-6">
          <Toast type="info" message={infoMessage} onClose={() => setInfoMessage(null)} />
        </div>
      )}

      {serverError && (
        <div className="mb-6">
          <FormError message={serverError} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Identifier Field */}
        <FormField
          label="Email or 10-Digit Mobile Number"
          htmlFor="identifier"
          helperText="e.g. user@example.com or 9876543210"
          error={errors.identifier?.message}
          required
        >
          <TextInput
            id="identifier"
            placeholder="user@example.com or 9876543210"
            autoComplete="username"
            leftIcon={<UserCheck className="w-4 h-4" />}
            error={!!errors.identifier}
            {...register('identifier')}
          />
        </FormField>

        {/* Password Field */}
        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
          required
        >
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={!!errors.password}
            {...register('password')}
          />
        </FormField>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
            <span>Remember identifier</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            icon={<LogIn className="w-4 h-4" />}
          >
            Sign In to Siya Vastra
          </PrimaryButton>
        </div>

        {/* Register prompt */}
        <div className="text-center pt-3 text-sm text-slate-500">
          New to Siya Vastra?{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
