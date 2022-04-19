import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppContextProvider } from './Context'

import { Home, SitemapResults, SitemapView } from './PageTemplates'

import { QuitDialog } from './Components'

const App = () => {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="results" element={<SitemapResults />} />
        <Route path="sitemap" element={<SitemapView />} />
      </Routes>
      <QuitDialog />
    </AppContextProvider>
  )
}

export default App

// "start": "ESLINT_NO_DEV_ERRORS='true' react-scripts start",
