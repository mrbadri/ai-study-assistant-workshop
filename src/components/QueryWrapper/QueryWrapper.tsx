import { Skeleton } from '@nextui-org/react'
import { FC, ReactNode } from 'react'

export type QueryWrapperProps = {
  children: ReactNode
  isLoading: boolean
  isError: boolean
  LoadingCommponent?: ReactNode
  ErrorComponent?: ReactNode
}

const QueryWrapper: FC<QueryWrapperProps> = ({
  children,
  isLoading,
  isError,
  LoadingCommponent = <Skeleton className="w-full h-full rounded" />,
  ErrorComponent = <> Is Error ...</>,
}) => {
  if (isLoading) return LoadingCommponent

  if (isError) return ErrorComponent

  return <>{children}</>
}

export default QueryWrapper
