import createBox from 'blackbox.js'

import { getJobs } from '@/services/http/jobs'

type BoxType = {
  jobs: API.Job[]
}

const appBox = createBox<BoxType>({
  jobs: [],
})

export async function loadJobs(): Promise<void> {
  const jobs = await getJobs()

  appBox.set((state) => {
    state.jobs = jobs
    return state
  })
}

export default appBox
