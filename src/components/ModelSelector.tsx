import { useState } from "react"
import { useFetch } from "../hooks"

export default function ModelSelector() {
    const { data: models } = useFetch<{ models: any[] }>('http://localhost:11434/api/tags')
    const [selectedModel, setSelectedModel] = useState('')
    const handleSelect = (e: any) => {
        console.log(e.target.value)
        setSelectedModel(e.target.value)
    }
    return (
        <select
            value={selectedModel}
            onChange={handleSelect}
        >
            {models && models.models.map((model: { name: string }) => (
                <option key={model.name} value={model.name}>{model.name}</option>
            ))}
        </select>
    )
}