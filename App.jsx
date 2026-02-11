import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './src/navigation/Navigation';
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        retry: 1,
        refetchOnMount: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
export default App;
