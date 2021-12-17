import React from 'react'
import { useSelector } from 'react-redux'

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
        <h2>{user.name}</h2>
        <h4>Added blogs</h4>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>
              {blog.title}
            </li>)}
        </ul>
      </div>
    )
  }


}

export default UserView