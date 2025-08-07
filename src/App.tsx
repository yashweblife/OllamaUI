import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'
function App() {
  const [text, setText] = useState('')
  const test = async () =>{
    const res = await fetch('http://localhost:11434/api/generate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model:"gpt-oss:20b",
        prompt:"write a simple js code to print hello world",
        stream:false
      })
    })
    const data = await res.json()
    console.log(data.response)
    setText(data.response)
  }
  return (
    <div className="App">
      <ReactMarkdown >
        {text || ''}
      </ReactMarkdown>
      <button onClick={test}>Click</button>
    </div>
  )
}

export default App
