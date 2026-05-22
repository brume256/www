import React, { JSX, ReactNode } from "react";

React;

export function Clicker(props: { children?: ReactNode }) {
  const { children } = props

  return <div className="h-full w-full flex justify-center items-center gap-2 not-group-aria-disabled:group-active:scale-90 transition-transform">
    {children}
  </div>
}

export function AnchorChip(props: { children?: ReactNode } & JSX.IntrinsicElements["a"] & { "aria-disabled"?: boolean }) {
  const { children, "aria-disabled": disabled = false, ...rest } = props

  return <a className="group rounded-full po-2 bg-default-contrast outline-none not-aria-disabled:hover:bg-default-double-contrast focus-visible:outline-contrast aria-disabled:opacity-50 transition-opacity"
    aria-disabled={disabled}
    {...rest}>
    <Clicker>
      {children}
    </Clicker>
  </a>
}