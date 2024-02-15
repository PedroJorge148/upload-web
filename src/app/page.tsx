import { FileList } from '@/components/file-list'
import { Upload } from '@/components/upload'

export default function Home() {
  return (
    <main className="m-7 w-full max-w-[400px] rounded bg-white p-4">
      <Upload />
      <FileList />
    </main>
  )
}
