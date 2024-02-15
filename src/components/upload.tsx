'use client'

import { useDropzone } from 'react-dropzone'
import { UploadIcon } from 'lucide-react'

export function Upload() {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: true,
    onDrop: () => {},
    maxSize: 5_242_880, // 5 mb
  }) //

  return (
    <>
      <label
        htmlFor="files"
        className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 text-sm text-zinc-500 hover:bg-slate-100 data-[drag-accept=true]:border-emerald-500 data-[drag-reject=true]:border-rose-600 data-[drag-active=true]:bg-emerald-200 data-[drag-reject=true]:bg-rose-200"
        data-drag-accept={isDragAccept}
        data-drag-active={isDragActive}
        data-drag-reject={isDragReject}
        {...getRootProps()}
      >
        <UploadIcon className="h-4 w-4" />
        <div className="flex flex-col gap-1 text-center">
          <span className="font-medium">Drop images here</span>
          {isDragAccept && (
            <span className="text-xs text-emerald-500">
              File type accepted.
            </span>
          )}
          {isDragReject && (
            <span className="text-xs text-rose-500">
              File type not supported.
            </span>
          )}
          {!isDragActive && (
            <span className="text-xs text-zinc-500">
              Drop some files here...
            </span>
          )}
        </div>
      </label>

      <input type="file" id="files" multiple {...getInputProps()} />
    </>
  )
}
