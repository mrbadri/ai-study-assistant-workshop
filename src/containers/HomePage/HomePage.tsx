import { QUERY_PARAMS_KEY } from '@/constant/queryParams.constant'
import useLocalStorage from '@/hook/localStorage.hook'
import { useMode } from '@/hook/mode.hooks'
import useQueryParams from '@/hook/queryParamets.hook'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import useChat from '@/queries/useChat'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage } from '@/services/api'
import { FILE_TYPE, MODE } from '@/types/data.types'
import { filterByType } from '@/utils/filterType.utills'
import { populateDirs } from '@/utils/populateDirs.util'
import dynamic from 'next/dynamic'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'

const Search = dynamic(
  () => {
    return import('@/components/Search/Search').then((mod) => mod.Search)
  },
  {
    ssr: false,
  },
)

const MessageBar = dynamic(
  () => {
    return import('@/components/MessageBar').then((mod) => mod.MessageBar)
  },
  {
    ssr: false,
  },
)

const ChatMessages = dynamic(
  () => {
    return import('@/components/ChatMessages/ChatMessages').then(
      (mod) => mod.ChatMessages,
    )
  },
  {
    ssr: false,
  },
)

export type HomePageProps = React.HTMLProps<HTMLDivElement> & {
  mode: MODE | undefined
}

export type OnEditPrompt = (
  prompt: string,
  messageIndex: number,
) => Promise<void>

export const HomePage: React.FC<HomePageProps> = ({
  className,
  mode: intialMode,
  ...props
}) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useLocalStorage<string[]>(
    'selectedFiles',
    [],
  )
  const [messages, setMessages] = useLocalStorage<ApiChatMessage[]>(
    'messages',
    [],
  )

  const { mode } = useMode(intialMode)

  const isChatMode = mode === MODE.CHAT

  const queryParm = useQueryParams()
  const filter = queryParm.getArray(QUERY_PARAMS_KEY.FILE_TYPE) as FILE_TYPE[]

  const chatQuery = useChat({
    onSuccess(res) {
      setMessages((value) => [...value, res.message])
      setPrompt('')
    },
  })

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
    setMessages((value) => [
      ...value,
      {
        role: 'user',
        message: prompt,
      },
    ])

    chatQuery.mutate({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })
  }

  const onEditPrompt: OnEditPrompt = async (prompt, messageIndex) => {
    setMessages((value) => {
      const updatedMessages = value.slice(0, messageIndex)
      updatedMessages.push({
        role: 'user',
        message: prompt,
      })
      return updatedMessages
    })

    chatQuery.mutate({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })
  }

  useLayoutEffect(() => {
    if (isChatMode && selectedFiles.length === 0)
      queryParm.remove(QUERY_PARAMS_KEY.MODE)
  }, [selectedFiles.length, isChatMode])

  useEffect(() => {
    if (!isChatMode && queryParm.router.isReady) setSelectedFiles([])
  }, [searchQuery.data])

  return (
    <ChatLayout
      messageBar={
        <MessageBar
          hide={selectedFiles.length === 0}
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={(prompt) => onPrompt(prompt)}
          loading={chatQuery.isLoading}
          disabled={chatQuery.isLoading}
        />
      }
    >
      <Search
        compact={isChatMode}
        searchQuery={searchQuery}
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
      />
      {isChatMode && (
        <ChatMessages
          onEditPrompt={onEditPrompt}
          className="py-[20px]"
          data={messages.map((msg) => ({
            role: msg.role,
            message: msg.message,
          }))}
        />
      )}
    </ChatLayout>
  )
}
