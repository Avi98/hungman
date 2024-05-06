"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface IQueryProvider {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: IQueryProvider) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
