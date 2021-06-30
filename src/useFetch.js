import {useState} from 'react'
import {useEffect} from 'react'

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const abortCont = new AbortController()

		setTimeout(() => {
			fetch(url, {signal: abortCont.signal})
			.then(respon => {
				if (!respon.ok) {
					throw Error('Could not fetch the data for that resource');
				}
				return respon.json()
			})
			.then(data => {
				setData(data)
				setIsLoading(false)
			})
			.catch(err => {
				if (err.name === 'AbortError') {
					console.log('fetch aborted')
				} else {
					setIsLoading(false)
					setError(err.message)
				}
			})
		}, 1000);

		return () => abortCont.abort()
	}, [url])

	return {data, error, isLoading, setData}
}

export default useFetch;