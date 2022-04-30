import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 xl:rounded-bl-[8rem]">
      <div className="py-12 wrapper">
        <Link
          to="/"
          className="block mb-4 text-white text-5xl font-bold tracking-tighter"
        >
          devjobs
        </Link>
      </div>
    </header>
  )
}
