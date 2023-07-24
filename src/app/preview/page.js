"use client"
import { useRouter } from 'next/navigation'

export default function Preview() {
  const router = useRouter()

  function onRebuild () {
    router.push('/')
  }

  function onPreview () {
    router.push('/project')
  }

  return (
    <main className='container mx-auto'>
      <div className="flex items-center p-4 mx-auto justify-center">
        <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
          <h3 className="font-bold text-xl">
            Homepage
          </h3>
          <div className="flex gap-4">
            <button className="btn" onClick={onRebuild}>
              Back to rebuild
              <svg className="h-6 w-6"  height="48" viewBox="0 -960 960 960" width="48" xmlns="http://www.w3.org/2000/svg"><path d="m530-481-198-198 43-43 241 241-241 241-43-43z"/></svg>
            </button>
            <button className="btn" onClick={onPreview}>
              Preview
              <svg className="h-6 w-6" height="48" viewBox="0 -960 960 960" width="48" xmlns="http://www.w3.org/2000/svg"><path d="m530-481-198-198 43-43 241 241-241 241-43-43z"/></svg>
            </button>
          </div>
        </div>
      </div>
      <iframe className='w-full' style={{height: 75 + 'vh'}}  src='/project'></iframe>
    </main>
  )
}