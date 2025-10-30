"use client"

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function SiteHeader() {
  const [search, setSearch] = useState('')

  return (
    <header className="backdrop-blur-md bg-slate-900/80 border-b border-slate-800 shadow-sm sticky top-0 z-50">
      <div className="container-page py-4 md:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
              L
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">Lembo</h1>
              <p className="text-xs md:text-sm text-slate-400">Community Management Platform</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…  ⌘K"
                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Link href="/notifications" className="text-slate-300 hover:text-white transition-colors text-xl" aria-label="Notifications">
              🔔
            </Link>
            <Link href="/profile" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
              N
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
