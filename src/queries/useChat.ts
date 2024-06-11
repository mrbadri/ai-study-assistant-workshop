import { ApiChatParams, ApiChatResponse, chatApi } from '@/services/api'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'

const useChat = (
  opts: Partial<UseMutationOptions<ApiChatResponse, Error, ApiChatParams>> = {},
) => {
  return useMutation({
    mutationFn: chatApi,
    mutationKey: ['chat api'],
    ...opts,
  })
}

export default useChat
