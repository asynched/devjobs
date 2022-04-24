import API from '@/services/http/api'

export async function getJobs(): Promise<API.Job[]> {
  const { data } = await API.get('/jobs')
  return data
}

export async function getJob(id: string): Promise<API.Job> {
  const { data } = await API.get(`/jobs/${id}`)
  return data
}
