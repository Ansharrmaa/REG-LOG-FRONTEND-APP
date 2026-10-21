import { describe, it, expect } from 'vitest';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '@/schemas/authSchemas';

describe('Auth Schemas Validation', () => {
  describe('registerSchema', () => {
    it('accepts valid registration data', () => {
      const valid = {
        fullName: 'Jane Doe',
        email: 'JANE@example.com',
        mobileNumber: '9876543210',
        password: 'ValidPassword@123',
        confirmPassword: 'ValidPassword@123',
      };
      const result = registerSchema.safeParse(valid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('jane@example.com');
      }
    });

    it('rejects short full name', () => {
      const invalid = {
        fullName: 'Al',
        email: 'al@example.com',
        mobileNumber: '9876543210',
        password: 'ValidPassword@123',
        confirmPassword: 'ValidPassword@123',
      };
      const result = registerSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.fullName).toBeDefined();
      }
    });

    it('rejects invalid email address', () => {
      const invalid = {
        fullName: 'Jane Doe',
        email: 'not-an-email',
        mobileNumber: '9876543210',
        password: 'ValidPassword@123',
        confirmPassword: 'ValidPassword@123',
      };
      const result = registerSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined();
      }
    });

    it('rejects mobile number with less or more than 10 digits', () => {
      const invalidShort = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        mobileNumber: '12345',
        password: 'ValidPassword@123',
        confirmPassword: 'ValidPassword@123',
      };
      expect(registerSchema.safeParse(invalidShort).success).toBe(false);

      const invalidLong = {
        ...invalidShort,
        mobileNumber: '1234567890123',
      };
      expect(registerSchema.safeParse(invalidLong).success).toBe(false);

      const invalidAlpha = {
        ...invalidShort,
        mobileNumber: '98765abcde',
      };
      expect(registerSchema.safeParse(invalidAlpha).success).toBe(false);
    });

    it('rejects weak password violating security policy', () => {
      const noUpper = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        mobileNumber: '9876543210',
        password: 'lowercase@123',
        confirmPassword: 'lowercase@123',
      };
      expect(registerSchema.safeParse(noUpper).success).toBe(false);

      const noSpecial = {
        ...noUpper,
        password: 'Password123',
        confirmPassword: 'Password123',
      };
      expect(registerSchema.safeParse(noSpecial).success).toBe(false);

      const noDigit = {
        ...noUpper,
        password: 'Password@abc',
        confirmPassword: 'Password@abc',
      };
      expect(registerSchema.safeParse(noDigit).success).toBe(false);

      const shortPwd = {
        ...noUpper,
        password: 'P@1a',
        confirmPassword: 'P@1a',
      };
      expect(registerSchema.safeParse(shortPwd).success).toBe(false);
    });

    it('rejects password confirmation mismatch', () => {
      const mismatch = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        mobileNumber: '9876543210',
        password: 'ValidPassword@123',
        confirmPassword: 'DifferentPassword@123',
      };
      const result = registerSchema.safeParse(mismatch);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
          'Passwords do not match'
        );
      }
    });
  });

  describe('loginSchema', () => {
    it('accepts valid email identifier', () => {
      const valid = {
        identifier: 'user@example.com',
        password: 'password123',
      };
      expect(loginSchema.safeParse(valid).success).toBe(true);
    });

    it('accepts valid 10-digit mobile number identifier', () => {
      const valid = {
        identifier: '9876543210',
        password: 'password123',
      };
      expect(loginSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects invalid identifier format (neither email nor 10 digits)', () => {
      const invalid = {
        identifier: 'invalid-user-123',
        password: 'password123',
      };
      const result = loginSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.identifier).toBeDefined();
      }
    });

    it('rejects missing password', () => {
      const invalid = {
        identifier: 'user@example.com',
        password: '',
      };
      expect(loginSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('accepts email or 10-digit mobile', () => {
      expect(forgotPasswordSchema.safeParse({ identifier: 'user@example.com' }).success).toBe(true);
      expect(forgotPasswordSchema.safeParse({ identifier: '9876543210' }).success).toBe(true);
      expect(forgotPasswordSchema.safeParse({ identifier: 'random' }).success).toBe(false);
    });
  });

  describe('verifyOtpSchema', () => {
    it('accepts exactly 6 digits', () => {
      expect(verifyOtpSchema.safeParse({ otp: '123456' }).success).toBe(true);
      expect(verifyOtpSchema.safeParse({ otp: '12345' }).success).toBe(false);
      expect(verifyOtpSchema.safeParse({ otp: '1234567' }).success).toBe(false);
      expect(verifyOtpSchema.safeParse({ otp: '12345a' }).success).toBe(false);
    });
  });

  describe('resetPasswordSchema', () => {
    it('accepts valid new password and matching confirmation', () => {
      const valid = {
        newPassword: 'NewPassword@123',
        confirmPassword: 'NewPassword@123',
      };
      expect(resetPasswordSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects mismatching confirmation', () => {
      const invalid = {
        newPassword: 'NewPassword@123',
        confirmPassword: 'DifferentPassword@123',
      };
      expect(resetPasswordSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('changePasswordSchema', () => {
    it('accepts valid current and matching new password', () => {
      const valid = {
        currentPassword: 'CurrentPassword@123',
        newPassword: 'NewPassword@123',
        confirmPassword: 'NewPassword@123',
      };
      expect(changePasswordSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects missing current password', () => {
      const invalid = {
        currentPassword: '',
        newPassword: 'NewPassword@123',
        confirmPassword: 'NewPassword@123',
      };
      expect(changePasswordSchema.safeParse(invalid).success).toBe(false);
    });
  });
});
