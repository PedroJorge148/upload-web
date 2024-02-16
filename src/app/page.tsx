'use client'

import { FileList } from '@/components/file-list'
import { Upload } from '@/components/upload'
import { api } from '@/lib/axios'
import { formatBytes } from '@/utils/format-bytes'
import { useEffect, useState } from 'react'
import { generate } from 'short-uuid'

export interface file {
  file: File
  id: string
  name: string
  readableSize: string
  preview: string
  progress: number
  uploaded: boolean
  error: boolean
  url: string | null
}

export default function Home() {
  const [files, setFiles] = useState<file[]>([])

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await api.get<TODO>('/uploads')

  //     const uploadedFiles = response.data.map((file) => ({
  //       id: file.id,
  //       name: file.name,
  //       readableSize: formatBytes(file.size),
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.fileUrl,
  //     }))

  //     setFiles(uploadedFiles)
  //   }
  //   fetchData()
  // }, [])

  function updateFile(id: string, override: Partial<file> = {}) {
    setFiles((prevState) =>
      prevState.map((file) => {
        return file.id === id ? { ...file, ...override } : file
      }),
    )
  }

  function processUpload(uploadedFile: file) {
    const data = new FormData()

    data.append('file', uploadedFile.file, uploadedFile.name)

    api
      .post('/uploads', data, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total!)

          updateFile(uploadedFile.id, { progress })
        },
      })
      .then((response) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.file.id,
          url: response.data.file.fileUrl,
        })
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        })
      })
  }

  async function handleDelete(id: string) {
    await api.delete(`/uploads/${id}/delete`)

    setFiles(files.filter((file) => file.id !== id))
  }

  function handleUpload(filesUploaded: File[]) {
    const uploadedFiles: file[] = filesUploaded.map((file) => ({
      file,
      id: generate(),
      name: file.name,
      readableSize: formatBytes(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))

    setFiles((prevState) => [...prevState, ...uploadedFiles])

    uploadedFiles.forEach(processUpload)
  }

  return (
    <main className="m-7 w-full max-w-[400px] rounded bg-white p-4">
      <Upload onUpload={handleUpload} />
      {files && <FileList files={files} onDelete={handleDelete} />}
    </main>
  )
}
