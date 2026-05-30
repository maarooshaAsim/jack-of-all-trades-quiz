import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin } from './pages/Admin.jsx'
import { ExploreTypeDetail } from './pages/ExploreTypeDetail.jsx'
import { ExploreTypes } from './pages/ExploreTypes.jsx'
import { InfoPage } from './pages/InfoPage.jsx'
import { Landing } from './pages/Landing.jsx'
import { Quiz } from './pages/Quiz.jsx'
import { Result } from './pages/Result.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore/types" element={<ExploreTypes />} />
        <Route path="/explore/types/:baseType" element={<ExploreTypeDetail />} />
        <Route path="/explore/:type" element={<InfoPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
