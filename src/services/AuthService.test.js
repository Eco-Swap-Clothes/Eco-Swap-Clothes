import { describe, it, expect, beforeEach, vi } from 'vitest';
import AuthService from './AuthService';
import apiClient from '../config/api';

// Mock apiClient
vi.mock('../config/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('getCurrentToken', () => {
    it('should return token from localStorage', () => {
      const mockToken = 'test-token-123';
      localStorage.setItem('token', mockToken);

      const token = AuthService.getCurrentToken();

      expect(token).toBe(mockToken);
    });

    it('should return null when no token exists', () => {
      localStorage.clear();
      const token = AuthService.getCurrentToken();
      expect(token).toBeNull();
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        nombre: 'Test User',
        mail: 'test@example.com',
        id: 1,
      };

      apiClient.post.mockResolvedValueOnce({
        data: mockUser,
      });

      const result = await AuthService.register('Test User', 'test@example.com', 'password123');

      expect(apiClient.post).toHaveBeenCalledWith('/api/auth/register', {
        nombre: 'Test User',
        mail: 'test@example.com',
        contrasena: 'password123',
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error when registration fails', async () => {
      apiClient.post.mockRejectedValueOnce(new Error('Registration failed'));

      await expect(
        AuthService.register('Test User', 'test@example.com', 'password123')
      ).rejects.toThrow('Registration failed');
    });
  });

  describe('login', () => {
    it('should login successfully and store token', async () => {
      const mockResponse = {
        token: 'auth-token-123',
        user: {
          id: 1,
          nombre: 'Test User',
          mail: 'test@example.com',
        },
      };

      apiClient.post.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await AuthService.login('test@example.com', 'password123');

      expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', {
        mail: 'test@example.com',
        contrasena: 'password123',
      });
      expect(result).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('auth-token-123');
    });

    it('should login without token', async () => {
      const mockResponse = {
        user: {
          id: 1,
          nombre: 'Test User',
        },
      };

      apiClient.post.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await AuthService.login('test@example.com', 'password123');

      expect(result).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should throw error when login fails', async () => {
      apiClient.post.mockRejectedValueOnce(new Error('Invalid credentials'));

      await expect(
        AuthService.login('test@example.com', 'wrong-password')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('token', 'test-token');

      AuthService.logout();

      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should work even when no token exists', () => {
      localStorage.clear();

      AuthService.logout();

      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
