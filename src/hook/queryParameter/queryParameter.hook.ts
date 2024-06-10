import { useRouter } from 'next/router'

// Refrence: TransitionOptions from nextJs
export interface useQueryParamsProps {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
  unstable_skipClientCache?: boolean
}

const useQueryParams = (options?: useQueryParamsProps) => {
  const router = useRouter()

  const add = (key: string, value: string) => {
    router.push(
      {
        ...router,
        query: {
          ...router.query,
          [key]: value,
        },
      },
      undefined,
      options,
    )
  }

  const append = (key: string, value: string) => {
    const existingValue = router.query[key] as string
    const newValue = existingValue ? `${existingValue},${value}` : value
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          [key]: newValue.replace(/\s*,\s*/g, ','),
        },
      },
      undefined,
      options,
    )
  }

  const get = (key: string) => router.query[key] as string

  const getArray = (key: string) => {
    const value = get(key)
    return value ? value.split(',') : []
  }

  const remove = (key: string) => {
    const { [key]: deletedParam, ...queryParams } = router.query
    router.push(
      {
        pathname: router.pathname,
        query: queryParams,
      },
      undefined,
      options,
    )
  }

  const removeValue = (key: string, valueToDelete: string) => {
    const existingValue = getArray(key)

    if (existingValue) {
      if (existingValue.length === 1) remove(key)
      else {
        const newValue = existingValue
          .filter((item) => item !== valueToDelete)
          .join(',')

        add(key, newValue)
      }
    }
  }

  return { add, append, get, getArray, remove, removeValue, router }
}

export default useQueryParams
