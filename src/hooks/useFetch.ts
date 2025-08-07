import { useEffect, useState } from "react"

export default function useFetch<T>(url:string){
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        send()
    },[])
    const send = async (options?:Partial<RequestInit>) => {
        try {
            const res = await fetch(url, options)
            const data = await res.json()
            setData(data)
            console.log(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    return {data, loading, error, send}
}