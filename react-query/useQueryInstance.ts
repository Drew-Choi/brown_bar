import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import axiosInstance from '@/axios/instance';

interface UseQueryProps {
  queryKey: any[];
  onSuccess?: (data: any) => void | undefined;
  selectFn?: (data: any) => void | undefined;
  initialDataFn?: (() => any) | undefined;
  apiMethod: 'get' | 'post';
  apiEndPoint: string;
  apiQueryParams?: Object | undefined;
  apiPathParams?: string | number | undefined;
  apiBody?: Object | null;
  apiMultipartPost?: boolean | undefined;
  queryEnable?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export const useQueryInstance = ({
  queryKey,
  onSuccess,
  selectFn,
  initialDataFn,
  apiMethod,
  apiEndPoint,
  apiQueryParams,
  apiPathParams,
  apiBody = null,
  apiMultipartPost,
  queryEnable = true,
  refetchOnMount = false,
  refetchOnReconnect = false,
  staleTime = Infinity,
  gcTime = Infinity,
}: UseQueryProps) => {
  // api 세팅
  const apiSet = async () => {
    switch (apiMethod) {
      case 'get': {
        const response = await axiosInstance.get(
          `${apiEndPoint}${apiPathParams ? '/' + apiPathParams : ''}`,
          {
            params: apiQueryParams,
          },
        );
        return response.data;
      }

      case 'post': {
        const response = await axiosInstance.post(
          `${apiEndPoint}${apiPathParams ? '/' + apiPathParams : ''}`,
          apiBody,
          {
            params: apiQueryParams,
            headers: apiMultipartPost ? { 'Content-Type': 'multipart/form-data' } : {},
          },
        );
        return response.data;
      }
    }
  };

  // useQuery 세팅 및 요청
  const fallback: any = [];
  const {
    data = fallback,
    isError,
    error,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: apiSet,
    enabled: queryEnable,
    refetchOnMount,
    refetchOnReconnect,
    staleTime,
    gcTime,
    select: selectFn,
    initialData: initialDataFn,
  });

  // 커스텀 onSuccess
  useEffect(() => {
    if (queryEnable && data && !isRefetching && typeof onSuccess === 'function') {
      onSuccess(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefetching, queryEnable]);

  return { data, isError, error, refetch, isLoading };
};
