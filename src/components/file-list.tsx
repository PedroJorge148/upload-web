'use client'

import { CheckCircle2, Link, XCircle } from 'lucide-react'
import { CircularProgress } from '@nextui-org/react'

export function FileList() {
  return (
    <ul className="mt-5 space-y-3">
      <li className="flex items-center justify-between text-zinc-400">
        <div className="flex items-center">
          <div className="flex flex-col">
            <strong className="text-zinc-800">profile.png</strong>
            <span className="mt-1 text-xs text-zinc-400">
              64 Kb{' '}
              <button className="ml-1 cursor-pointer bg-transparent text-rose-500">
                Excluir
              </button>
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>

          <a
            href="https://www.github.com/pedrojorge148.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link className="mr-2 h-6 w-6" />
          </a>
          <CheckCircle2 className="mr-2 h-6 w-6 text-emerald-500" />
          <XCircle className="mr-2 h-6 w-6 text-rose-500" />
        </div>
      </li>
    </ul>
  )
}
