import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (failureCount >= 3) throw error;
        return !isClientError(error);
      },
    },
  },
});

export function isClientError(error: any) {
  return !!error && error.status >= 400 && error.status < 500;
}
