"use client"
import io from "socket.io-client"
import { useState, useEffect } from "react"
import '../app/globals.css'

let socket

export default function Home() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    socket = io('http://localhost:3000/')
  }

  const sendMessage = async () => {
    socket.emit("message", message)
    setMessage("")
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage()
      }
    }
  }

  return (
    <main className='container mx-auto'>
      <div className="flex items-center p-4 mx-auto justify-center">
        <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
          <h3 className="font-bold text-white text-xl">
            Website builder
          </h3>
          <div className="border-t border-gray-300 w-full flex rounded-bl-md">
            <input
              type="text"
              placeholder="Your website logo name"
              value={message}
              className="outline-none py-2 px-2 rounded-bl-md flex-1"
              onChange={e => setMessage(e.target.value)}
              onKeyUp={handleKeypress}
            />
            <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
              <button
                className="group-hover:text-white px-3 h-full"
                onClick={() => {
                  sendMessage()
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <iframe className='w-full' style={{height: 90 + 'vh'}}  src='http://localhost:3000/products/the-3p-fulfilled-snowboard'></iframe>
    </main>
  )
}
