import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/\d/, 'Must contain at least one numeric digit')
  .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character');

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, 'Full name must be at least 3 characters')
      .max(100, 'Full name cannot exceed 100 characters'),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Please enter a valid email address'),
    mobileNumber: z
      .string()
      .trim()
      .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Email or mobile number is required')
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isMobile = /^\d{10}$/.test(val);
        return isEmail || isMobile;
      },
      {
        message: 'Enter a valid email address or 10-digit mobile number',
      }
    ),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Email or mobile number is required')
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isMobile = /^\d{10}$/.test(val);
        return isEmail || isMobile;
      },
      {
        message: 'Enter a valid email address or 10-digit mobile number',
      }
    ),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
