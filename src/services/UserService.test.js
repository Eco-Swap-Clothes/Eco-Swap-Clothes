import { describe, it, expect, beforeEach, vi } from 'vitest';
import UserService from './UserService';
import apiClient from '../config/api';

vi.mock('../config/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      localStorage.setItem('token', 'valid-token');

      const mockUser = {
        id: 1,
        nombre: 'Test User',
        mail: 'test@example.com',
        puntos: 100,
      };

      apiClient.get.mockResolvedValueOnce({
        data: mockUser,
      });

      const result = await UserService.getCurrentUser();

      expect(apiClient.get).toHaveBeenCalledWith('/api/users/me');
      expect(result).toEqual(mockUser);
    });

    it('should throw error when no token exists', async () => {
      await expect(UserService.getCurrentUser()).rejects.toThrow('No autenticado.');
    });

    it('should throw error when request fails', async () => {
      localStorage.setItem('token', 'valid-token');

      apiClient.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(UserService.getCurrentUser()).rejects.toThrow('Network error');
    });
  });

  describe('getMyPublishedItems', () => {
    it('should get user published items successfully', async () => {
      localStorage.setItem('token', 'valid-token');

      const mockItems = [
        { id: 1, titulo: 'Item 1', descripcion: 'Description 1' },
        { id: 2, titulo: 'Item 2', descripcion: 'Description 2' },
      ];

      apiClient.get.mockResolvedValueOnce({
        data: mockItems,
      });

      const result = await UserService.getMyPublishedItems();

      expect(apiClient.get).toHaveBeenCalledWith('/api/users/me/items');
      expect(result).toEqual(mockItems);
    });

    it('should throw error when no token exists', async () => {
      await expect(UserService.getMyPublishedItems()).rejects.toThrow('No autenticado.');
    });

    it('should throw error when request fails', async () => {
      localStorage.setItem('token', 'valid-token');

      apiClient.get.mockRejectedValueOnce(new Error('Failed to fetch items'));

      await expect(UserService.getMyPublishedItems()).rejects.toThrow('Failed to fetch items');
    });

    it('should return empty array when user has no items', async () => {
      localStorage.setItem('token', 'valid-token');

      apiClient.get.mockResolvedValueOnce({
        data: [],
      });

      const result = await UserService.getMyPublishedItems();

      expect(result).toEqual([]);
    });
  });
});
