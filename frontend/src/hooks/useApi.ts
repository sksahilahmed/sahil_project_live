import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { ApiError } from '../types';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (
      apiCall: () => Promise<{ data: T }>,
      options?: UseApiOptions<T>
    ): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiCall();
        setData(response.data);
        options?.onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError<ApiError>;
        const apiError: ApiError = {
          message: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
          statusCode: axiosError.response?.status || 500,
          error: axiosError.response?.data?.error,
        };
        setError(apiError);
        options?.onError?.(apiError);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, error, isLoading, execute, reset };
}

