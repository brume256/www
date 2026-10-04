import { Option } from "@hazae41/result-and-option";
import React, { Fragment } from "react";
import { createContext, useContext } from "react";

React;

export const ClientContext = createContext<boolean>(false);

export function useClientContext() {
  return Option.wrap(useContext(ClientContext));
}

export function ClientProvider(props: { children: React.ReactNode } & { value: boolean }) {
  const { children, value } = props

  return <ClientContext.Provider value={value}>
    {children}
  </ClientContext.Provider>
}

export function Client(props: { children: React.ReactNode }) {
  const { children } = props

  const client = useClientContext().getOrNull()

  if (!client)
    return null

  return <Fragment>
    {children}
  </Fragment>
}