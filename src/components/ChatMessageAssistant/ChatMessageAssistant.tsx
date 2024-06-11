import { Avatar } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import { useAnimatedText } from '../AnimatedText'

export type ChatMessageAssistantProps = React.HTMLProps<HTMLDivElement> & {
  message: string
  disableAnimation?: boolean
}

export const ChatMessageAssistant: React.FC<ChatMessageAssistantProps> = ({
  message,
  disableAnimation = false,
  ...props
}) => {
  const content = useAnimatedText(message, {
    maxTime: 1000,
    disabled: disableAnimation,
  })

  return (
    <div {...props} className={clsx('flex-row-reverse', props.className)}>
      <div className="flex flex-row gap-4 items-start">
        <Avatar
          className="flex-shrink-0"
          showFallback
          color={'primary'}
          name={'AI'}
          classNames={{
            name: 'text-[16px]',
          }}
        />
        <div className="flex-grow  rounded-lg p-3 text-md  mt-[-4px]">
          <div
            className="whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  )
}
