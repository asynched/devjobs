import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDerivedBox } from 'blackbox.js'

import { cloneMany } from '@/utils/arrays'

import useInput from '@/hooks/useInput'
import useDebounce from '@/hooks/useDebounce'

import appBox, { loadJobs, loadAutocompleteJobs } from '@/stores/app'

import Header from '@/components/common/Header'
import Title from '@/components/utils/Title'

export default function Home() {
  const jobs = useDerivedBox(appBox, (state) => state.jobs)
  const autocompleteJobs = useDerivedBox(
    appBox,
    (state) => state.autocompleteJobs
  )
  const queryJobs = useDebounce(loadAutocompleteJobs, 1000)
  const [inputValue, inputRegistration] = useInput('')

  useEffect(() => {
    if (inputValue.trim().length) {
      queryJobs(inputValue)
    }
  }, [inputValue])

  useEffect(() => {
    loadJobs()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-600">
      <Title title="DevJobs | Home" />
      <Header />
      <section className="-mt-8 my-16 wrapper">
        <form className="relative py-3 px-4 flex gap-8 justify-between rounded-lg bg-white shadow-sm">
          <input
            list="jobs"
            className="w-full outline-none"
            type="text"
            placeholder="Filter by title, companies, expertise or location..."
            {...inputRegistration}
          />
          <datalist onChange={console.log} id="jobs">
            {autocompleteJobs.map((job) => (
              <option key={job.id}>{job.title}</option>
            ))}
          </datalist>

          <button className="py-2 px-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded">
            Search
          </button>
        </form>
      </section>
      <section className="mb-12 wrapper grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cloneMany(jobs, 10).map((job) => (
          <Link
            to={`jobs/${job.id}`}
            key={job.id + Math.random()}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center w-10 h-10 bg-white -mt-8 mb-4 shadow-lg rounded-lg">
              <img
                className="transform scale-75"
                src={job.company.image}
                alt={job.company.name}
              />
            </div>
            <p className="mb-2">{job.fullTime ? 'Full time' : 'Part time'}</p>
            <h2 className="text-xl text-gray-800 font-bold tracking-tighter">
              {job.title}
            </h2>
            <p className="mb-4">{job.company.name}</p>
            <p className="text-blue-600">{job.company.country}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
