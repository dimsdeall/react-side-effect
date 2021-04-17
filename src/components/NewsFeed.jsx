import React, { useState, useEffect } from 'react'

const defaultNews = {
    status: "ok",
    totalReseult: 0,
    articles: []
}
const endpoint = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=ed40d511eb184e4bbc4545efc25979de'
function NewsFeed() {
    const [news, setNews] = useState(defaultNews)
    const [page, setPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)

    const HandleRefresh = () => {
        setNews(defaultNews)
        setPages(1)
        setIsLoading(false)
        setIsRefresh(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const response = await fetch(`${endpoint}&page=${page}`)
                const result = await response.json()
                setNews(current => {
                    return (
                        {
                            ...result,
                            articles: [
                                ...current.articles,
                                ...result.articles
                            ],
                            totalReseult: result.totalResult,
                            status: result.status
                        }
                    )
                })
                if (result.status !== 'ok') {
                    throw new Error('error')
                }
            } catch (error) {
                setIsError(true)
            }
            setIsLoading(false)
        }

        fetchData()
    }, [page, isRefresh])

    return (
        <>
            <h3>Top Head Line</h3>
            {isLoading && <p>Loading. . . .</p>}
            {isError && <p>Ganggunan</p>}

            <ol>
                {news.articles.map((item, index) => (
                    <li key={index}> {item.title} </li>
                ))}
            </ol>
            {
                news.articles.length < parseInt(news.totalResults) ? (
                    <button
                        disabled={isLoading}
                        onClick={() => setPages(c => c + 1)}
                    >Load More</button>
                ) : null
            }
            <button onClick={HandleRefresh} disabled={isLoading} >Refresh</button>
        </>
    )
}

export default NewsFeed
