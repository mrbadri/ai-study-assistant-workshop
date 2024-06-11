import { FileData } from '@/types/data.types'
import { FC } from 'react'
import { AudioPlayer } from '../AudioPlayer'

export type AccordionAudioPreviewProps = { file: FileData }
export const AccordionAudioPreview: FC<AccordionAudioPreviewProps> = ({
  file,
}) => {
  return (
    <div className="flex gap-4">
      <div>
        <AudioPlayer />
      </div>
      <div>{file.excerpt}</div>
    </div>
  )
}
