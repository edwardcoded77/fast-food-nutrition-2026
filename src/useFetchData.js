
import { useState, useEffect } from 'react'

    function useFetchData(url) {
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const load = async () => {
        try {
            setLoading(true)
            setError("")

            let allRecords = []
            let offset = 0
            let total = 0

            do {
            const pageUrl = new URL(url)
            pageUrl.searchParams.set("limit", "100")
            pageUrl.searchParams.set("offset", String(offset))

            const response = await fetch(pageUrl)
            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.error?.message || "Failed to load records")
            }

            allRecords = [...allRecords, ...json.records]
            total = json.total
            offset += json.count
            } while (offset < total)

            setRecords(allRecords)
        } catch (problem) {
            setError("Could not load food records: " + problem.message)
        } finally {
            setLoading(false)
        }
        }

    load()
    }, [url])

    return { records, loading, error }
}

export default useFetchData
