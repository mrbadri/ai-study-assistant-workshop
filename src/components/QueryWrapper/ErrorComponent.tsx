import { Button } from '@nextui-org/react'
import { FC } from 'react'

interface ErrorComponentProps {
  errorMessage?: string
  isLoading: boolean
  onRetry: () => void
}

const ErrorComponent: FC<ErrorComponentProps> = ({
  errorMessage,
  onRetry,
  isLoading,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 py-2">
      <div className="bg-gray-50 p-4 rounded-lg max-w-md shadow-md">
        <div className="text-left">
          <p className="text-gray-700 mb-2 font-semibold">
            Oops! Something went wrong:
          </p>
          <p className="text-red-600 mb-4">{errorMessage}</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onRetry} isLoading={isLoading} radius="sm">
            Retry
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorComponent
