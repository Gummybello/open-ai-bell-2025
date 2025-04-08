'use client'
import { useState } from "react";

export default function Home() {

  const [flashcards, setFlashcards] = useState([])
  const [topic, setTopic] = useState('')
  const[loading,setloading] = useState(false)

  const generateFlashcards = async (event) => {
    event.preventDefault()
    setloading(true)
    const response = await fetch('/api/word-gen',{
      method:'POST',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        topic:topic,
      })
    })

    const flashcardsData = await response.json()
    setFlashcardscards(flashcardsData)
    setLoading(false)
  }


  return (
    <form onSubmit={generateFlashcards} className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl"> OpenAI </h1>
      <input type="text" placeholder="ขอคำนาม 1 คำ"
      name="topic"
      onChange={(event) => setTopic(event.target.value)}
      value={topic}
      />
      <button type="submit" disabled={loading}>
      {loading ?'Loading..' : 'คำ ต้อง เชื่อม'}
      </button>
      
      คุณเลือกหัวข้อ{topic}
    {flashcards ?
    <div className="flex flex-wrap ">
      {flashcards.map((flashcard)=> (
      <div key={flashcard.id} className="w-1/2 p-2">
        <div className="bg-pink p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-blod">{flashcard.word}</h2>
          </div>
    </div>
  ))}
  </div> : ''}
  </form>
  );
}