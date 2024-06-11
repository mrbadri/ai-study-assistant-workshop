import { FileData } from '@/types/data.types'
import { APIResponse } from '../types'
import { apiUtils } from '../utils'

export type SearchMapperResponseProps = {
  results: APIResponse<any[]>
  query: string
}

const searchMapperResponse = ({
  results,
  query,
}: SearchMapperResponseProps) => {
  const files: FileData[] = []

  console.log(results)

  try {
    results.data
      .flatMap((res) => res.payload)
      .forEach((file) => {
        const {
          _additional,
          __typename,
          originalName,
          path = [],
          ext,
          autoKeywords,
          autoCaption,
          autoSummary,
          autoTypes,
          alt,
          url,
        } = file

        const type = apiUtils.getFileType(__typename, ext)

        files.push({
          id: _additional.id,
          type,
          alt,
          url,
          name: originalName,
          extension: ext,
          excerpt: (type === 'image' ? autoCaption : autoSummary) || '',
          tags: (type === 'image' ? autoTypes : autoKeywords) || [],
          path: (path || []).slice(1, (path || []).length - 1),
          metadata: {
            id: _additional.id,
            __typename: __typename,
          },
        })
      })
  } catch (error) {
    console.error('Error searchMapperResponse:', error)
    throw error
  }

  console.log({ files })

  return {
    files,
    query,
  }
}

export const searchMapper = {
  response: searchMapperResponse,
}
