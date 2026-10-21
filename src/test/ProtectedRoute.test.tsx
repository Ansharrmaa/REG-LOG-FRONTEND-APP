import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import { authService } from '@/services/authService';

vi.mock('@/services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn(),
  },
}));

vi.mock('@/services/apiClient', () => ({
  apiClient: {
    getCsrfToken: vi.fn().mockResolvedValue('mock-token'),
  },
}));

describe('ProtectedRoute Component', () => {
  it('redirects unauthenticated user to /login', async () => {
    vi.mocked(authService.getCurrentUser).mockRejectedValue({ status: 401 });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Login Page Mock</div>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Secret Dashboard Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Login Page Mock')).toBeInTheDocument();
    expect(screen.queryByText('Secret Dashboard Content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', async () => {
    vi.mocked(authService.getCurrentUser).mockResolvedValue({
      id: 1,
      fullName: 'Alice Bob',
      email: 'alice@example.com',
      mobileNumber: '9876543210',
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Login Page Mock</div>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Secret Dashboard Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Secret Dashboard Content')).toBeInTheDocument();
  });
});
