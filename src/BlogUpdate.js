import { useState } from 'react'
import useFetch from './useFetch'
import { useParams, useHistory } from 'react-router-dom'

const BlogUpdate = () => {
	const { id } = useParams()
	const history = useHistory()
	const { data:blog, error } = useFetch('http://localhost:8000/blogs/' + id)

	const [title, setTitle] = useState(null)
	const [body, setBody] = useState('');
	const [author, setAuthor] = useState('')

	const inputTitle = document.getElementById('title')
	const inputBody = document.getElementById('body')
	const inputAuthor = document.getElementById('author')

	const handleUpdate = (e) => {
		e.preventDefault()

		const title = inputTitle.value
		const body = inputBody.value
		const author = inputAuthor.value

		
		const updated = {title, body, author}

		fetch('http://localhost:8000/blogs/' + id, {
			method:'PUT',
			headers: { 'Content-Type': "application/json" },
			body: JSON.stringify(updated)
		}).then(() => {
			history.push('/')
		})
	}

	return (
		<div className="blog-update">
			{blog && <h2>Blog Page Update { blog.title }</h2> }

			{error && <div>{ error }</div>}

			{ blog &&
			<form onSubmit={handleUpdate}>
						<label>New blog title:</label>
						<input 
							id="title"
							type="text" required 
							defaultValue={ blog.title }
							onChange={ (e) => setTitle(e.target.value) }
						/>
						<label>New blog body:</label>
						<textarea 
							id="body"
							required
							defaultValue={ blog.body }
							onChange={ (e) => setBody(e.target.value) }
						></textarea>
						<label>New Blog author:</label>
						<input 
							id="author"
							type="text" required 
							defaultValue={ blog.author }
							onChange={ (e) => setAuthor(e.target.value) }
						/>
						<button>Update Blog</button>
					</form>
				}
		</div>
	)
}

export default BlogUpdate