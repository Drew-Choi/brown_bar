import axiosInstance from '@/utils/axios';
import { MutationFunction, UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseMutationProps {
  onSuccessFn?: (response: any) => void | undefined;
  onErrorFn?: (error: Error | AxiosError | unknown) => void | undefined;
  onMutateFn?: (data: any) => void | undefined;
  apiMethod: 'post' | 'get';
  apiEndPoint: string | undefined;
  apiMultipartPost?: boolean | undefined;
}

interface ApiSetProps {
  apiQueryParams?: Object;
  apiPathParams?: string | number;
  apiBody?: Object | null;
}

export const useMutationInstance = ({
  onSuccessFn,
  onErrorFn,
  onMutateFn,
  apiMethod,
  apiEndPoint,
  apiMultipartPost,
}: UseMutationProps) => {
  // api 세팅
  const apiSet = async ({ apiQueryParams, apiPathParams, apiBody = null }: ApiSetProps) => {
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

      default:
        break;
    }
  };

  // useMutation 세팅 및 요청
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      apiQueryParams,
      apiPathParams,
      apiBody,
    }: ApiSetProps): Promise<ApiSetProps | null> => {
      if (isPending) {
        return null;
      } else {
        const result = await apiSet({
          apiQueryParams,
          apiPathParams,
          apiBody,
        });
        return result;
      }
    },
    onError: onErrorFn,
    onSuccess: onSuccessFn,
    onMutate: onMutateFn,
  });

  return { mutate };
};