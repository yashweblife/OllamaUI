import 'github-markdown-css/github-markdown-dark.css'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import './App.css'
function App() {
  const [text, setText] = useState('')
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
  return (
    <div className="App">
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
      <button onClick={test}>Click</button>
    </div>
  )
}

export default App
