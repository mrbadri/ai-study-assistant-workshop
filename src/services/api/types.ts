export type ApiChatMessage = {
  role: 'assistant' | 'user'
  message: string
}

export type APIResponse<T> = {
  data: T
}
