import { QUERY_PARAMS_KEY } from '@/constant/queryParams.constant'
import { MODE } from '@/types/data.types'
import useQueryParams from './queryParamets.hook'

export const useMode = (initialMode = MODE.EXPLORE) => {
  const queryParams = useQueryParams()

  const setMode = (mode: MODE) => {
    queryParams.add(QUERY_PARAMS_KEY.MODE, mode)
  }

  const mode = queryParams.get(QUERY_PARAMS_KEY.MODE) || initialMode

  return { mode, setMode }
}
