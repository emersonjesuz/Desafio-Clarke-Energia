"use client";

import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ApolloClientProvider = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <div className="relative">{children}</div>
    </ApolloProvider>
  );
};
