import { QueryKey, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import axiosInstance from '@/axios/instance';
import { AxiosError } from 'axios';

interface UseQueryProps<T, R = T> {
  queryKey: QueryKey;
  onSuccessFn?: (data: R) => void;
  selectFn?: (data: T) => R;
  apiMethod: 'get' | 'post';
  apiEndPoint: string;
  apiQueryParams?: Object;
  apiPathParams?: string | number;
  apiBody?: Object | null;
  apiMultipartPost?: boolean;
  queryEnable?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export const useQueryInstance = <T, R = T>({
  queryKey,
  onSuccessFn,
  selectFn,
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
}: UseQueryProps<T, R>) => {
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
  const { data, isError, error, refetch, isRefetching, isLoading } = useQuery<
    T,
    Error | AxiosError<ErrorResponse>,
    R
  >({
    queryKey,
    queryFn: apiSet,
    enabled: queryEnable,
    refetchOnMount,
    refetchOnReconnect,
    staleTime,
    gcTime,
    select: selectFn,
  });

  // 커스텀 onSuccess
  useEffect(() => {
    if (queryEnable && data && !isRefetching && typeof onSuccessFn === 'function') {
      onSuccessFn(data);
    }
  }, [data, isRefetching, queryEnable]);

  return { data, isError, error, refetch, isLoading };
};
