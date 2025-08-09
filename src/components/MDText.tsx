import ReactMarkdown from "react-markdown"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function MDText({ text, owner }: { text: string, owner?: string }) {
    return (

        <div
            style={{
                backgroundColor: owner?'#242424':'rgb(22,22,22)',
                padding: '1rem',
                borderRadius: '0.5rem',
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
            >{text}</ReactMarkdown>
        </div>
    )
}