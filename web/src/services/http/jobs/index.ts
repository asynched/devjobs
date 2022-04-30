import API from '@/services/http/api'
import autocompleteAPI from '@/services/http/autocomplete'

function parseJob(job: API.RawJob): API.Job {
  return {
    ...job,
    applicationUrl: job.application_url,
    fullTime: job.full_time,
  }
}

export async function getJobs(): Promise<API.Job[]> {
  const { data } = await API.get<API.RawJob[]>('/jobs')
  return data.map(parseJob)
}

export async function getJob(id: string): Promise<API.Job> {
  const { data } = await API.get<API.RawJob>(`/jobs/${id}`)
  return parseJob(data)
}

export async function getAutocompleteSuggestions(
  query: string
): Promise<API.Job[]> {
  const { data } = await autocompleteAPI.get('/autocomplete', {
    params: {
      q: query,
    },
  })

  return data.map(parseJob)
}
