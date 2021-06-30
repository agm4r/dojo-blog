import BlogList from './BlogList.js'
import useFetch from './useFetch.js'
import { useHistory } from 'react-router-dom'

const Home5 = () => {
	const { data:blogs, error, isLoading } = useFetch('http://localhost:8000/blogs');
	const history = useHistory()

	const handleDelete = (id) => {
		// const newBlogs = blogs.filter(blog => (blog.id !== id))
		// setBlog(newBlogs)
		fetch('http://localhost:8000/blogs/' + id, {
			method: 'DELETE'
		}).then(() => {
			history.go(0)
		})
	}

	return (
		<div className="home">
			{ error && <div>{ error }</div> }
			{ isLoading && <div>Loading...</div> }
			{blogs && <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />}
		</div>
	);
}

export default Home5;
