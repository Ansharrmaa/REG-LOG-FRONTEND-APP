export interface User {
  id: number | string;
  fullName: string;
  email: string;
  mobileNumber: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export interface VerifyOtpRequest {
  identifier: string;
  otp: string;
}

export interface VerifyOtpResponse {
  resetToken: string;
  expiresInSeconds: number;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CsrfResponse {
  token: string;
  headerName: string;
  parameterName: string;
}

export interface ApiMessageResponse {
  message: string;
  data?: unknown;
}

export interface ApiError {
  status: number;
  error?: string;
  message: string;
  path?: string;
  fieldErrors?: Record<string, string>;
}
