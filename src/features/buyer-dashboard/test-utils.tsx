import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';
import { ToastProvider } from '@/components/feedback';

/**
 * Renders a dashboard section with a fresh QueryClient + toasts. The real
 * hooks run against their forced contract mocks, so tests read the same
 * payloads the UI shows in development.
 */
export const renderWithProviders = (ui: React.ReactElement): RenderResult => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity, staleTime: Infinity },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{ui}</ToastProvider>
    </QueryClientProvider>,
  );
};
