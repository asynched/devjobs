import createBox from 'blackbox.js'

import { getAutocompleteSuggestions, getJobs } from '@/services/http/jobs'

type BoxType = {
  jobs: API.Job[]
  autocompleteJobs: API.Job[]
}

const appBox = createBox<BoxType>({
  jobs: [],
  autocompleteJobs: [],
})

export async function loadJobs(): Promise<void> {
  const jobs = await getJobs()

  appBox.set((state) => {
    state.jobs = jobs
    return state
  })
}

export async function loadAutocompleteJobs(query: string): Promise<void> {
  const jobs = await getAutocompleteSuggestions(query)

  appBox.set((state) => {
    state.autocompleteJobs = jobs
    return state
  })
}

export default appBox
