import { Link } from 'react-router-dom'

const BlogList = (props) => {
	const blogs = props.blogs
	const handleDelete = props.handleDelete

	return (
		blogs.map((blog) => (
			<div className="blog-preview" key={blog.id}>
				<Link to={ `blogs/${blog.id}` }>
					<h2>{ blog.title }</h2>
					<p>Written by { blog.author }</p>
				</Link>
				<button onClick={() => handleDelete(blog.id)}>Delete</button> 
				<button><Link to={ `blogs/update/${blog.id}` } className="update-link">Update Blog</Link></button> 
			</div>
		))
	)
}

export default BlogList