import { FileData } from '@/types/data.types'
import Image from 'next/image'
import { FC } from 'react'

export type AccordionImagePreview = { file: FileData }
export const AccordionImagePreview: FC<AccordionImagePreview> = ({ file }) => {
  return (
    <div className="flex gap-4">
      <div>
        <Image
          width={200}
          height={200}
          src={file.url || ''}
          alt={file.alt || 'image'}
        />
      </div>
      <div>{file.excerpt}</div>
    </div>
  )
}
