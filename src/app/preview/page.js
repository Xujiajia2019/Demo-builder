"use client"

export default function Preview() {
  return (
    <main className='container mx-auto'>
      <div className="flex items-center p-4 mx-auto justify-center">
        <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
          <h3 className="font-bold text-white text-xl">
            Preview
          </h3>
        </div>
      </div>
      <iframe className='w-full' style={{height: 90 + 'vh'}}  src='http://localhost:3001/project'></iframe>
    </main>
  )
}