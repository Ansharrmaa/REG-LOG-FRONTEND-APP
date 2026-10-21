import { apiClient } from './apiClient';
import {
  User,
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ApiMessageResponse,
} from '@/types/auth';

export const authService = {
  async register(data: RegisterRequest): Promise<User> {
    return apiClient.post<User>('/auth/register', data);
  },

  async login(data: LoginRequest): Promise<User> {
    return apiClient.post<User>('/auth/login', data);
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async logout(): Promise<ApiMessageResponse> {
    return apiClient.post<ApiMessageResponse>('/auth/logout');
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiMessageResponse> {
    return apiClient.post<ApiMessageResponse>('/auth/forgot-password', data);
  },

  async verifyResetOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return apiClient.post<VerifyOtpResponse>('/auth/verify-reset-otp', data);
  },

  async resetPassword(data: ResetPasswordRequest): Promise<ApiMessageResponse> {
    return apiClient.post<ApiMessageResponse>('/auth/reset-password', data);
  },

  async changePassword(data: ChangePasswordRequest): Promise<ApiMessageResponse> {
    return apiClient.post<ApiMessageResponse>('/auth/change-password', data);
  },
};
