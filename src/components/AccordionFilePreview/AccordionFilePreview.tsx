import { FILE_TYPE, FileData } from '@/types/data.types'
import { FC } from 'react'
import { AccordionImagePreview } from './AccordionImagePreview'

export type AccordionFilePreviewProps = { file: FileData }

export const AccordionFilePreview: FC<AccordionFilePreviewProps> = ({
  file,
}) => {
  switch (file.type) {
    case FILE_TYPE.IMAGE:
      return <AccordionImagePreview file={file} />

    // TODO: URL in API get 404 status code
    // case FILE_TYPE.AUDIO:
    //   return <AccordionAudioPreview file={file} />

    default:
      return <div>{file.excerpt || 'No Summery'}</div>
  }
}
