export enum FILE_TYPE {
  FOLDER = 'folder',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  PDF = 'pdf',
}

export type FileData = {
  id: string
  name: string
  type: FILE_TYPE
  excerpt?: string
  tags?: string[]
  path: string[]
  extension?: string

  children?: FileData[]

  metadata: {
    id: string
    __typename: string
  }
}
