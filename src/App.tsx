import 'github-markdown-css/github-markdown-dark.css'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import './App.css'
import ModelSelector from './components/ModelSelector'
function App() {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [models, setModels] = useState([])
  // useEffect(() => {
  //   getModels()
  // },[])
  const getModels = async () => {
    const res = await fetch('http://localhost:11434/api/tags')
    const data = await res.json()
    setModels(data.models)
  }

  const test = async () => {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-oss:20b",
        prompt: "write a simple js code to print hello world",
        stream: false
      })
    })
    const data = await res.json()
    console.log(data.response)
    setText(data.response)
  }

  const pullNewModel = async () => {
    const res = await fetch('http://localhost:11434/api/pull', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-oss:20b"
      })
    })
    const data = await res.json()
    console.log(data.response)
    getModels()
  }
  return (
    <div className="App">
      <div
        style={{
          height:'60vh',
          overflowY:'scroll'
        }}
      >
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {text || ''}
      </ReactMarkdown>
      </div>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >{userInput}</ReactMarkdown>
      <textarea
        style={{
          minHeight: '20vh',
          width: '500px',
        }}
      value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(32, 32, 32)'
          }}
        >
          <ModelSelector />
          <button onClick={pullNewModel}>Pull a Model</button>
        <button onClick={test}>Click</button>
        </div>
    </div>
  )
}

export default App
