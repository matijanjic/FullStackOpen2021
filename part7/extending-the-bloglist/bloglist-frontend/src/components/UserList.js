import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {

  const users = useSelector(state => state.users)
  console.log('users in userlist', users)

  return(
    <div>
      <h3 className='mt-4'>Users</h3>
      <Table className='w-50'>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList