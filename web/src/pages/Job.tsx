import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

import useAsync from '@/hooks/useAsync'
import { getJob } from '@/services/http/jobs'

import Header from '@/components/common/Header'
import Title from '@/components/utils/Title'

type URLParameters = {
  id: string
}

export default function Job() {
  const params = useParams<URLParameters>()
  const navigate = useNavigate()
  const { data, error, isLoading } = useAsync(() => getJob(params.id!))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    navigate('/')
  }

  return (
    <div className="text-gray-600">
      <Title title={`DevJobs | ${data.title}`} />
      <Header />
      <div className="wrapper bg-white -mt-8 flex items-center gap-8 rounded-lg shadow-lg">
        <div className="p-8 hidden md:block">
          <img
            className="w-16 h-16 object-contain"
            src={data.company.image}
            alt={data.company.name}
          />
        </div>
        <div className="pl-8 md:pl-0 py-8">
          <h1 className="text-3xl font-bold tracking-tighter text-gray-800">
            {data.company.name}
          </h1>
          <p>{data.company.country}</p>
        </div>
        <a
          href={data.company.website}
          target="_blank"
          className="ml-auto mr-8 bg-gradient-to-r from-blue-600 to-indigo-600 py-2 px-4 rounded text-white"
        >
          Company site
        </a>
      </div>

      <div className="my-12 wrapper prose max-w-screen-lg prose-headings:tracking-tighter">
        <p className="text-gray-500">
          {data.fullTime ? 'Full time' : 'Part time'} -{' '}
          {data.remote ? 'Remote' : 'On-site'} - {data.company.country}
        </p>
        <Markdown children={data.description} />
      </div>
    </div>
  )
}
