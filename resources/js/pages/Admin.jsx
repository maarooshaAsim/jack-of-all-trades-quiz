import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'

const tokenStorageKey = 'joat_admin_token'

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || fallback
}

export function Admin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    setToken(window.localStorage.getItem(tokenStorageKey))
  }, [])

  useEffect(() => {
    if (!token) {
      setStats(null)
      return
    }

    let isMounted = true
    setIsLoadingStats(true)

    axios
      .get('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (isMounted) {
          setStats(data.stats)
        }
      })
      .catch((error) => {
        if (isMounted) {
          window.localStorage.removeItem(tokenStorageKey)
          setToken(null)
          setMessage(getErrorMessage(error, 'Session expired. Log in again.'))
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingStats(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [token])

  const login = async (event) => {
    event.preventDefault()
    setMessage('')
    setIsLoggingIn(true)

    try {
      const { data } = await axios.post('/api/admin/login', {
        username,
        password,
      })

      if (!data.token) {
        setMessage('Login succeeded, but ADMIN_TOKEN is not configured.')
        return
      }

      window.localStorage.setItem(tokenStorageKey, data.token)
      setToken(data.token)
      setPassword('')
      setMessage('')
    } catch (error) {
      setMessage(getErrorMessage(error, 'Login failed. Check the admin username and password.'))
    } finally {
      setIsLoggingIn(false)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(tokenStorageKey)
    setToken(null)
    setStats(null)
    setMessage('Logged out.')
  }

  const downloadExport = async () => {
    if (!token || isExporting) {
      return
    }

    setMessage('')
    setIsExporting(true)

    try {
      const response = await axios.get('/api/admin/export', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const downloadUrl = URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `joat-answers-${new Date().toISOString().slice(0, 10)}.xlsx`
      link.click()
      URL.revokeObjectURL(downloadUrl)
      setMessage('Export downloaded.')
    } catch (error) {
      setMessage('Export failed. Log in again and retry.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Shell tone="from-[#f6f0ff] via-[#fff9f1] to-[#f6fffa]">
      <div className="flex justify-center">
        <Logo />
      </div>

      <div className="mx-auto mt-8 w-full max-w-[32rem] rounded-[1.5rem] bg-white/86 p-6 text-[#18161d] shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:mt-10 sm:p-8">
        <p className="text-[0.75rem] font-black uppercase tracking-[0.24em] text-[#ff5a2c]">Admin</p>
        <h1 className="mt-3 text-[2rem] font-black uppercase leading-none sm:text-[2.6rem]">Quiz Exports</h1>
        <p className="mt-4 text-[1rem] font-semibold leading-7 text-[#3a3348]">
          Log in with the configured admin credentials, then download all submitted answers as an XLSX file.
        </p>

        {token ? (
          <div className="mt-8 space-y-5">
            <div className="flex flex-col items-stretch gap-4 rounded-[1rem] bg-[#18161d] px-5 py-5 text-white min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
              <div>
                <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-white/55">Dashboard</p>
                <p className="mt-2 text-[1.2rem] font-black">Logged in</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="joat-button-motion min-h-11 rounded-[0.65rem] bg-white/12 px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.12em] text-white"
              >
                Log Out
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              <div className="rounded-[1rem] bg-[#edecec] px-4 py-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#5b6170]">Attempts</p>
                <p className="mt-2 text-[2rem] font-black leading-none">{isLoadingStats ? '...' : stats?.total_attempts ?? 0}</p>
              </div>
              <div className="rounded-[1rem] bg-[#edecec] px-4 py-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#5b6170]">Answers</p>
                <p className="mt-2 text-[2rem] font-black leading-none">{isLoadingStats ? '...' : stats?.total_answers ?? 0}</p>
              </div>
              <div className="rounded-[1rem] bg-[#edecec] px-4 py-4 min-[380px]:col-span-2">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#5b6170]">Latest Attempt</p>
                <p className="mt-2 text-[1rem] font-black leading-none">
                  {isLoadingStats ? 'Loading...' : stats?.latest_attempt_at ?? 'No attempts yet'}
                </p>
              </div>
            </div>

            <div className="rounded-[1rem] bg-white px-5 py-5 shadow-[0_5px_12px_rgba(0,0,0,0.08)]">
              <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#5b6170]">Top Branches</p>
              {stats?.top_branches?.length ? (
                <div className="mt-4 space-y-3">
                  {stats.top_branches.map((branch) => (
                    <div key={branch.name} className="flex items-center justify-between gap-4 border-b border-[#18161d]/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-left text-[0.95rem] font-black uppercase leading-tight">{branch.name}</span>
                      <span className="rounded-full bg-[#18161d] px-3 py-1 text-[0.8rem] font-black text-white">{branch.total}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[0.95rem] font-semibold text-[#5b6170]">
                  {isLoadingStats ? 'Loading branch stats...' : 'No branch data yet.'}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={downloadExport}
              disabled={isExporting}
              className="joat-button-motion min-h-12 w-full rounded-[0.9rem] bg-[#18161d] px-5 py-4 text-[0.95rem] font-black uppercase tracking-[0.14em] text-white shadow-[0_5px_10px_rgba(0,0,0,0.24)] disabled:cursor-wait disabled:opacity-60"
            >
              {isExporting ? 'Preparing XLSX' : 'Download XLSX'}
            </button>
          </div>
        ) : (
          <form onSubmit={login} className="mt-8 space-y-4">
            <label className="block text-left">
              <span className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#5b6170]">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 w-full rounded-[0.9rem] border-2 border-[#18161d]/12 bg-white px-4 py-3 text-[1rem] font-semibold outline-none focus:border-[#18161d]"
                autoComplete="username"
                required
              />
            </label>

            <label className="block text-left">
              <span className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#5b6170]">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-[0.9rem] border-2 border-[#18161d]/12 bg-white px-4 py-3 text-[1rem] font-semibold outline-none focus:border-[#18161d]"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="joat-button-motion min-h-12 w-full rounded-[0.9rem] bg-[#18161d] px-5 py-4 text-[0.95rem] font-black uppercase tracking-[0.14em] text-white shadow-[0_5px_10px_rgba(0,0,0,0.24)] disabled:cursor-wait disabled:opacity-60"
            >
              {isLoggingIn ? 'Logging In' : 'Log In'}
            </button>
          </form>
        )}

        {message ? (
          <p className="mt-5 rounded-[0.8rem] bg-[#edecec] px-4 py-3 text-[0.9rem] font-bold text-[#18161d]">{message}</p>
        ) : null}
      </div>
    </Shell>
  )
}
