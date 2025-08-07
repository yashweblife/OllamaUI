import { useState } from "react"

export default function useWaitedFetch(url: string) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)
    const send = async (options?: Partial<RequestInit>) => {
        try {
            const res = await fetch(url, options)
            const data = await res.json()
            setData(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    return { data, loading, error, send }
}