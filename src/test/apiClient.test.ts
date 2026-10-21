import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '@/services/apiClient';

describe('ApiClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and caches CSRF token on request', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/auth/csrf')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              token: 'test-csrf-token-123',
              headerName: 'X-XSRF-TOKEN',
              parameterName: '_csrf',
            }),
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ success: true }),
      });
    });

    global.fetch = fetchMock;

    const token = await apiClient.getCsrfToken(true);
    expect(token).toBe('test-csrf-token-123');

    // Mutating request includes CSRF header and credentials: 'include'
    await apiClient.post('/auth/test', { data: 'test' });
    const postCall = fetchMock.mock.calls.find((call) => call[0].includes('/auth/test'));
    expect(postCall).toBeDefined();
    if (!postCall) throw new Error('Expected postCall to be defined');
    expect(postCall[1].credentials).toBe('include');
    expect(postCall[1].headers['X-XSRF-TOKEN']).toBe('test-csrf-token-123');
  });

  it('transforms backend error response into ApiError', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: () =>
        Promise.resolve({
          status: 400,
          message: 'Validation failed',
          fieldErrors: { email: 'Email already in use' },
        }),
    });

    try {
      await apiClient.get('/auth/me');
      expect.fail('Should have thrown an error');
    } catch (err: unknown) {
      const error = err as { status: number; message: string; fieldErrors?: Record<string, string> };
      expect(error.status).toBe(400);
      expect(error.message).toBe('Validation failed');
      expect(error.fieldErrors?.email).toBe('Email already in use');
    }
  });

  it('handles network failure gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    try {
      await apiClient.get('/auth/me');
      expect.fail('Should have thrown a network error');
    } catch (err: unknown) {
      const error = err as { status: number; message: string };
      expect(error.status).toBe(0);
      expect(error.message).toContain('Unable to connect to the server');
    }
  });
});
