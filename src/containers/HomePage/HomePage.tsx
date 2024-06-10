import { ChatMessages } from '@/components/ChatMessages'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { QUERY_PARAMS_KEY } from '@/constant/queryParams.constant'
import useQueryParams from '@/hook/queryParameter/queryParameter.hook'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage, chatApi } from '@/services/api'
import { FILE_TYPE } from '@/types/data.types'
import { filterByType } from '@/utils/filterType.utills'
import { populateDirs } from '@/utils/populateDirs.util'
import React, { useEffect, useMemo, useState } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)

  const queryParm = useQueryParams()
  const filter = queryParm.getArray(QUERY_PARAMS_KEY.FILE_TYPE) as FILE_TYPE[]

  const search = useSearch(
    { query },
    {
      cacheTime: 0,
      enabled: queryParm.router.isReady,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError(err) {
        console.log('err', err)
      },
    },
  )

  const fileList = useMemo(
    () => filterByType(populateDirs(search.data?.files || []), filter),
    [search.data, filter],
  )

  const onSearch = () => {
    search.refetch()
  }

  const onPrompt = async (prompt: string) => {
    setGenerating(true)

    setMessages((value) => [
      ...value,
      {
        role: 'user',
        message: prompt,
      },
    ])

    const { message } = await chatApi({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })

    setGenerating(false)
    setMessages((value) => [...value, message])
    setPrompt('')
  }

  useEffect(() => {
    setSelectedFiles([])
  }, [search.data])

  if (search.isLoading) return <>Loading ...</>

  return (
    <ChatLayout
      messageBar={
        <MessageBar
          hide={selectedFiles.length === 0}
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={(prompt) => onPrompt(prompt)}
          loading={generating}
          disabled={generating}
        />
      }
    >
      <Search
        compact={messages.length > 0}
        searching={search.isFetching}
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
      />
      <ChatMessages
        className="py-[20px]"
        data={messages.map((msg) => ({
          role: msg.role,
          message: msg.message,
        }))}
      />
    </ChatLayout>
  )
}
