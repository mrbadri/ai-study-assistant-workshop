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

export type OnEditPrompt = (
  prompt: string,
  messageIndex: number,
) => Promise<void>

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)

  const queryParm = useQueryParams()
  const filter = queryParm.getArray(QUERY_PARAMS_KEY.FILE_TYPE) as FILE_TYPE[]

  const searchQuery = useSearch(
    { query },
    {
      cacheTime: 0,
      enabled: queryParm.router.isReady,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const fileList = useMemo(
    () => filterByType(populateDirs(searchQuery.data?.files || []), filter),
    [searchQuery.data, filter],
  )

  const onSearch = () => {
    searchQuery.refetch()
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

  const onEditPrompt: OnEditPrompt = async (prompt, messageIndex) => {
    setGenerating(true)

    setMessages((value) => {
      const updatedMessages = value.slice(0, messageIndex)
      updatedMessages.push({
        role: 'user',
        message: prompt,
      })
      return updatedMessages
    })

    const { message } = await chatApi({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })

    setGenerating(false)
    setMessages((value) => {
      const updatedMessages = value.slice(0, messageIndex + 1)
      updatedMessages.push(message)
      return updatedMessages
    })
    setPrompt('')
  }

  useEffect(() => {
    setSelectedFiles([])
  }, [searchQuery.data])

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
        searchQuery={searchQuery}
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
      />

      <ChatMessages
        onEditPrompt={onEditPrompt}
        className="py-[20px]"
        data={messages.map((msg) => ({
          role: msg.role,
          message: msg.message,
        }))}
      />
    </ChatLayout>
  )
}
