import { FileData } from '@/types/data.types'
import { unbody } from '../unbody.client'
import { searchMapper } from './search.mapper'
import { getQuerySearch } from './search.query'

export type ApiSearchParams = {
  query: string
}
export type ApiSearchResponse = {
  files?: FileData[]
  query: string
}

export const searchApi = async ({
  query,
}: ApiSearchParams): Promise<ApiSearchResponse> => {
  const queries = getQuerySearch(query)

  const results = await unbody.exec(...queries)

  return searchMapper.response({ results, query })
}
