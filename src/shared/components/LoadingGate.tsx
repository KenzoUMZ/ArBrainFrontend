import type { ReactNode } from 'react'

interface LoadingGateProps {
  isLoading: boolean
  skeleton: ReactNode
  children: ReactNode | (() => ReactNode)
}

function renderChildren(children: ReactNode | (() => ReactNode)) {
  return typeof children === 'function' ? children() : children
}

export default function LoadingGate({
  isLoading,
  skeleton,
  children,
}: LoadingGateProps) {
  if (isLoading) {
    return <div className="skeleton-enter">{skeleton}</div>
  }

  return <div className="content-enter">{renderChildren(children)}</div>
}
