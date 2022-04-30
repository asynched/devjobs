import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home'))
const Job = React.lazy(() => import('@/pages/Job'))

export default function Router() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<Job />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}
