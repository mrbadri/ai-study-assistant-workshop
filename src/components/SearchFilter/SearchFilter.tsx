import { QUERY_PARAMS_KEY } from '@/constant/queryParams.constant'
import useQueryParams from '@/hook/queryParamets.hook'
import { FILE_TYPE } from '@/types/data.types'
import { Chip } from '@nextui-org/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

const SEARCH_FILTER = [
  {
    label: 'Docs',
    type: FILE_TYPE.DOCUMENT,
  },
  {
    label: 'PDF',
    type: FILE_TYPE.PDF,
  },
  {
    label: 'Images',
    type: FILE_TYPE.IMAGE,
  },
  {
    label: 'MP3/Audio',
    type: FILE_TYPE.AUDIO,
  },
  {
    label: 'MP4/Video',
    type: FILE_TYPE.VIDEO,
  },
]

export type SearchFilterProps = React.HTMLProps<HTMLDivElement>

const SearchFilter: FC<SearchFilterProps> = (props) => {
  const router = useRouter()
  const query = useQueryParams()

  const typeSelected = router.query.fileType as FILE_TYPE
  const filtersType = query.getArray(QUERY_PARAMS_KEY.FILE_TYPE)

  const handleClick = (type: FILE_TYPE, isActive: boolean) => {
    if (isActive) query.removeValue(QUERY_PARAMS_KEY.FILE_TYPE, type)
    else query.append(QUERY_PARAMS_KEY.FILE_TYPE, type)
  }

  return (
    <div
      {...props}
      className={clsx('flex gap-2 justify-center', props.className)}
    >
      {SEARCH_FILTER.map((item, index) => {
        const isActive = filtersType.includes(item.type)
        const activeClass: string = isActive ? 'bg-gray-100 ' : 'bg-white'

        const Icon = (
          <Image
            src={`/images/fileType/${item.type}.png`}
            height={20}
            width={20}
            alt={`file ${item.type}`}
          />
        )

        return (
          <Chip
            className={clsx(
              'shadow-sm hover:shadow duration-300 cursor-pointer text-sm transition',
              activeClass,
            )}
            startContent={Icon}
            variant="light"
            size="lg"
            onClick={() => {
              handleClick(item.type, isActive)
            }}
            key={index}
          >
            {item.label}
          </Chip>
        )
      })}
    </div>
  )
}

export default SearchFilter
