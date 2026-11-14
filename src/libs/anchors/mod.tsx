import { Clicker } from "@hazae41/labase";
import React, { JSX } from "react";

React;

export function AnchorChip(props: JSX.IntrinsicElements["a"]) {
  const { children, ...rest } = props

  return <a className="group rounded-full po-2 bg-default-contrast outline-none hover:bg-default-double-contrast focus-visible:outline-contrast focus-visible:bg-default-double-contrast inert:opacity-50"
    {...rest}>
    <Clicker>
      {children}
    </Clicker>
  </a>
}