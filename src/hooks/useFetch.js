import { useState, useEffect } from "react";

// 4 - custom hook
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    // 5 - refatorando o POST
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    // 6 - carregamento
    const [loading, setLoading] = useState(false)

    // 7 - tratando erros
    const [error, setError] = useState(null)

    // 8 - metodo DELETE
    const [itemId, setItemId] = useState(null)

    const httpConfig = (data, method) => {
        if(method === 'POST') {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(data),
            })

            setMethod(method)
        }

        // 8 - metodo DELETE
        else if(method === 'DELETE') {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                  },
            })

            setMethod(method)
            setItemId(data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            // 6 - carregamento
            setLoading(true)

            // 7 - tratando erros
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } 
            
            catch (error) {
                console.log(error.message)
                setError('Erro ao carregar dados!')
            }

            setLoading(false)
        }

        fetchData()
    }, [url, callFetch])

    // 5 - refatorando o POST
    useEffect(() => {
        const httpRequest = async () => {
            let json

            if(method === 'POST') {
                    let fetchOptions = [url, config]
                    const res = await fetch(...fetchOptions)
                    json = await res.json()
                }
            
            // 8 - metodo DELETE
            else if(method ==='DELETE') {
                    const deleteUrl = `${url}/${itemId}`
                    const res = await fetch(deleteUrl, config)
                    json = await res.json()
                }

            setCallFetch(json)
            }

            httpRequest()
        }, [config, method, url])

    return { data, httpConfig, loading, error }
}