import { FC, ReactNode } from 'react';

interface InterceptorProps {
  shouldRenderChildren: boolean;
  children: ReactNode;
  fallBack?: ReactNode;
}

export const Interceptor: FC<InterceptorProps> = ({
  shouldRenderChildren,
  children,
  fallBack,
}) => {
  if (!shouldRenderChildren) {
    return <>{fallBack || <></>}</>;
  }

  return <>{children}</>;
};