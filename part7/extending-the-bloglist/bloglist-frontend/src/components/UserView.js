import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const UserView = ({ userID }) => {

  const users = useSelector(state => state.users)
  console.log('users in userview', users)

  const user = users.find(user => user.id === userID)
  console.log(user)

  if (!user) {
    return null
  } else {
    return(
      <div>
        <h2 className='mt-4'>User {user.name}</h2>
        <h4 className='mt-4 mb-4'>Added blogs</h4>
        <ListGroup className='w-50' variant='flush'>
          {user.blogs.map(blog =>
            <ListGroup.Item key={blog.id}>
              {blog.title}
            </ListGroup.Item>)}
        </ListGroup>
      </div>
    )
  }


}

export default UserView