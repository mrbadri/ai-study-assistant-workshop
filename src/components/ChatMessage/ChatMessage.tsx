import { OnEditPrompt } from '@/containers/HomePage'
import React from 'react'
import { ChatMessageAssistant } from '../ChatMessageAssistant'
import { ChatMessageUser } from '../ChatMessageUser'

export type ChatMessageProps = Omit<React.HTMLProps<HTMLDivElement>, 'role'> & {
  message: string
  role: 'user' | 'assistant'
  index: number
  disableAnimation?: boolean
  onEditPrompt: OnEditPrompt
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  role,
  disableAnimation = false,
  onEditPrompt,
  index,
  ...props
}) => {
  if (role === 'user')
    return (
      <ChatMessageUser
        onEditPrompt={onEditPrompt}
        index={index}
        message={message}
        {...props}
      />
    )

  return (
    <ChatMessageAssistant
      message={message}
      disableAnimation={disableAnimation}
      role={role}
      {...props}
    />
  )
}
