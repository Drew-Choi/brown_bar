import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // stale 상태 항상 fresh로
      staleTime: Infinity,
      // cache 계속 유지
      gcTime: Infinity,
      retry: 1,
    },
  },
});
