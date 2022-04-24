import appBox, { loadJobs } from '@/stores/app'
import { cloneMany } from '@/utils/arrays'
import { useDerivedBox } from 'blackbox.js'
import { useEffect } from 'react'

export default function Home() {
  const jobs = useDerivedBox(appBox, (state) => state.jobs)

  useEffect(() => {
    loadJobs()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-600">
      <header className="bg-blue-600 rounded-bl-full">
        <div className="py-12 wrapper">
          <h1 className="mb-4 text-white text-4xl font-bold tracking-tighter">
            devjobs
          </h1>
        </div>
      </header>
      <section className="-mt-8 my-16 wrapper">
        <form className="py-3 px-4 flex gap-8 justify-between rounded-lg bg-white shadow-sm">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Filter by title, companies, expertise or location..."
          />

          <button className="py-2 px-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded">
            Search
          </button>
        </form>
      </section>
      <section className="wrapper grid grid-cols-3 gap-8">
        {cloneMany(jobs, 10).map((job) => (
          <div
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
            <h3 className="mb-2">
              {job.full_time ? 'Full time' : 'Part time'}
            </h3>
            <h2 className="text-xl text-gray-800 font-bold tracking-tighter">
              {job.title}
            </h2>
            <p className="mb-4">{job.company.name}</p>
            <p className="text-blue-600">{job.company.country}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
