import { OnEditPrompt } from '@/containers/HomePage'
import { Button, Textarea } from '@nextui-org/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import { PencilIcon } from '../icons/Pencil'

export type ChatMessageUserProps = React.HTMLProps<HTMLDivElement> & {
  message: string
  onEditPrompt: OnEditPrompt
  index: number
}

export const ChatMessageUser: React.FC<ChatMessageUserProps> = ({
  message,
  onEditPrompt,
  index,
  ...props
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [content, setContent] = useState<string>(message)

  const handleContetnChange = (value: string) => {
    setContent(value)
  }

  const openEditMode = () => {
    setIsEdit(true)
  }

  const closeEditMode = () => {
    setIsEdit(false)
  }

  const handleResend = () => {
    onEditPrompt(content, index)
    closeEditMode()
  }

  return (
    <div {...props} className={clsx('flex-row-reverse', props.className)}>
      {isEdit ? (
        <div className="relative">
          <Textarea
            value={content}
            onChange={(e) => {
              handleContetnChange(e.target.value)
            }}
          ></Textarea>
          <div className="absolute bottom-2 right-2 flex gap-2">
            <Button size="sm" onClick={closeEditMode}>
              cancel
            </Button>
            <Button size="sm" color="primary" onClick={handleResend}>
              Resend
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse gap-1 group">
          <div className="max-w-[70%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5">
            <div
              className="whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <div>
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={openEditMode}
              className="transition opacity-0 group-hover:opacity-100"
            >
              <PencilIcon className="text-gray-500 text-sm w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
