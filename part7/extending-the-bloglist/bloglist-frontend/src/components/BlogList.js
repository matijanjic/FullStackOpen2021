import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const BlogList = () => {

  const loggedUser = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)

  return(
    <Table striped bordered hover variant='dark'>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <Blog key={blog.id} blog={blog} user={loggedUser}/>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default BlogList
