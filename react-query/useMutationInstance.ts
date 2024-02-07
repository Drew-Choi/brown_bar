import axiosInstance from '@/axios/instance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ApiSetProps<QueryParamsType = undefined, BodyType = undefined> {
  apiQueryParams?: QueryParamsType;
  apiPathParams?: string | number;
  apiBody?: BodyType | null;
}

interface UseMutationProps<T, QueryParamsType = undefined, BodyType = undefined> {
  onSuccessFn?: (response: T, variables: ApiSetProps<QueryParamsType, BodyType>) => void;
  onErrorFn?: (error: AxiosError<ErrorResponse>) => void;
  apiMethod: 'post' | 'get' | 'delete';
  apiEndPoint: string;
  apiMultipartPost?: boolean;
}

export const useMutationInstance = <T, QueryParamsType = undefined, BodyType = undefined>({
  onSuccessFn,
  onErrorFn,
  apiMethod,
  apiEndPoint,
  apiMultipartPost,
}: UseMutationProps<T, QueryParamsType, BodyType>) => {
  // api 세팅
  const apiSet = async ({
    apiQueryParams,
    apiPathParams,
    apiBody = null,
  }: ApiSetProps<QueryParamsType, BodyType>) => {
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

      case 'delete': {
        const response = await axiosInstance.delete(
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
  const { mutate, isPending } = useMutation<
    T,
    AxiosError<ErrorResponse>,
    ApiSetProps<QueryParamsType, BodyType>
  >({
    mutationFn: async ({ apiQueryParams, apiPathParams, apiBody }) => {
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
  });

  return { mutate };
};
