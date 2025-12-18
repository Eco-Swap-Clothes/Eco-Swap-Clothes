import { describe, it, expect, beforeEach, vi } from 'vitest';
import ItemService from './ItemService';
import apiClient from '../config/api';

// Mock apiClient
vi.mock('../config/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('ItemService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('getAllItems', () => {
    it('should return items from content array', async () => {
      const mockItems = [
        { id: 1, titulo: 'Item 1' },
        { id: 2, titulo: 'Item 2' },
      ];

      apiClient.get.mockResolvedValueOnce({
        data: {
          content: mockItems,
        },
      });

      const result = await ItemService.getAllItems();

      expect(apiClient.get).toHaveBeenCalledWith('/api/items');
      expect(result).toEqual(mockItems);
    });

    it('should return data directly if no content property', async () => {
      const mockItems = [
        { id: 1, titulo: 'Item 1' },
        { id: 2, titulo: 'Item 2' },
      ];

      apiClient.get.mockResolvedValueOnce({
        data: mockItems,
      });

      const result = await ItemService.getAllItems();

      expect(result).toEqual(mockItems);
    });

    it('should throw error when request fails', async () => {
      apiClient.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(ItemService.getAllItems()).rejects.toThrow('Network error');
    });
  });

  describe('createItem', () => {
    it('should create item successfully with valid token', async () => {
      localStorage.setItem('token', 'valid-token');

      const mockFormData = new FormData();
      mockFormData.append('titulo', 'New Item');
      mockFormData.append('descripcion', 'Description');

      const mockResponse = {
        id: 1,
        titulo: 'New Item',
        descripcion: 'Description',
      };

      apiClient.post.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await ItemService.createItem(mockFormData);

      expect(apiClient.post).toHaveBeenCalledWith(
        '/api/items',
        mockFormData,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when no token exists', async () => {
      const mockFormData = new FormData();

      await expect(ItemService.createItem(mockFormData)).rejects.toThrow(
        'No autenticado. Por favor, inicia sesión.'
      );
    });

    it('should throw error when creation fails', async () => {
      localStorage.setItem('token', 'valid-token');
      const mockFormData = new FormData();

      apiClient.post.mockRejectedValueOnce(new Error('Creation failed'));

      await expect(ItemService.createItem(mockFormData)).rejects.toThrow('Creation failed');
    });
  });

  describe('updateItem', () => {
    it('should update item successfully', async () => {
      localStorage.setItem('token', 'valid-token');

      const mockFormData = new FormData();
      mockFormData.append('titulo', 'Updated Item');

      const mockResponse = {
        id: 1,
        titulo: 'Updated Item',
      };

      apiClient.put.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await ItemService.updateItem(1, mockFormData);

      expect(apiClient.put).toHaveBeenCalledWith(
        '/api/items/1',
        mockFormData,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when no token exists', async () => {
      const mockFormData = new FormData();

      await expect(ItemService.updateItem(1, mockFormData)).rejects.toThrow(
        'No autenticado. Por favor, inicia sesión.'
      );
    });

    it('should throw error when update fails', async () => {
      localStorage.setItem('token', 'valid-token');
      const mockFormData = new FormData();

      apiClient.put.mockRejectedValueOnce(new Error('Update failed'));

      await expect(ItemService.updateItem(1, mockFormData)).rejects.toThrow('Update failed');
    });
  });

  describe('deleteItem', () => {
    it('should delete item successfully', async () => {
      localStorage.setItem('token', 'valid-token');

      const mockResponse = { message: 'Item deleted' };

      apiClient.delete.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await ItemService.deleteItem(1);

      expect(apiClient.delete).toHaveBeenCalledWith('/api/items/1');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when no token exists', async () => {
      await expect(ItemService.deleteItem(1)).rejects.toThrow(
        'No autenticado. Por favor, inicia sesión.'
      );
    });

    it('should throw error when deletion fails', async () => {
      localStorage.setItem('token', 'valid-token');

      apiClient.delete.mockRejectedValueOnce(new Error('Deletion failed'));

      await expect(ItemService.deleteItem(1)).rejects.toThrow('Deletion failed');
    });
  });
});
