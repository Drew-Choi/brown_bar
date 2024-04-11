import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { useQueryInstance } from '@/react-query/useQueryInstance';

export const useIsStart = () => {
  // 영업상태 초기설정
  const {
    data: { data: isStart } = { data: false },
    isError,
    isLoading,
  } = useQueryInstance<{
    data: boolean;
  }>({
    queryKey: [QUERY_KEY.IS_START],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.START,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  return { isStart, isError, isLoading };
};
