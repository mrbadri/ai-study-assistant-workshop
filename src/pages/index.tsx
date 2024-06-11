import { HomePage } from '@/containers/HomePage'
import { MODE } from '@/types/data.types'
import { GetServerSideProps, NextPage } from 'next'

interface PageProps {
  mode: MODE | undefined
}

const Page: NextPage<PageProps> = ({ mode }) => {
  return <HomePage mode={mode} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mode = context.query.mode

  return {
    props: {
      mode: mode || null,
    },
  }
}

export default Page
