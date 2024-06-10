import { FILE_TYPE, FileData } from '@/types/data.types'

export const filterByType = (data: FileData[], types: FILE_TYPE[]) => {
  if (types.length === 0) return data
  return data?.filter((item) => types.includes(item.type))
}
