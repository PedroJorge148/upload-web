'use client'

import { file } from '@/app/page'
import { CheckCircle2, Link, XCircle } from 'lucide-react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface FileListProps {
  files: file[]
  onDelete: (id: string) => void
}

export function FileList({ files, onDelete }: FileListProps) {
  return (
    <ul className="mt-5 space-y-3">
      {files.map((file) => {
        return (
          <li
            key={file.id}
            className="flex items-center justify-between text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <img
                src={file.preview}
                alt="image preview"
                className="h-9 w-9 rounded object-cover"
              />
              <div className="flex flex-col">
                <strong title={file.name} className="text-zinc-800">
                  {file.name.length > 20
                    ? file.name.substring(0, 25).concat('...')
                    : file.name}
                </strong>
                <span className="mt-1 text-xs text-zinc-400">
                  {file.readableSize}{' '}
                  {file.url && (
                    <button
                      onClick={() => onDelete(file.id)}
                      className="ml-1 cursor-pointer bg-transparent text-rose-500"
                    >
                      Excluir
                    </button>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              {!file.uploaded && !file.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />
              )}

              {file.url && (
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <Link className="mr-2 h-6 w-6" />
                </a>
              )}

              {file.uploaded && (
                <CheckCircle2 className="mr-2 h-6 w-6 text-emerald-500" />
              )}
              {file.error && <XCircle className="mr-2 h-6 w-6 text-rose-500" />}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
