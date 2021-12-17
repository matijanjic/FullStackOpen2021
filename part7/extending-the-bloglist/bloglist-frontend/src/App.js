import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import UserList from './components/UserList'
import { initialize } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { checkLocalStorage } from './reducers/loginReducer'
import CreateBlog from './components/CreateBlog'
import NavBar from './components/NavBar'
import { initUsers } from './reducers/userReducer'
import {
  Switch,
  Route,
  /*Link,
  Redirect,
  useParams,
  useHistory,*/
  useRouteMatch
} from 'react-router-dom'
import UserView from './components/UserView'
import BlogView from './components/BlogView'


const App = () => {

  const dispatch = useDispatch()

  //initialize users
  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  //initialize blogs
  useEffect(() => {
    dispatch(initialize())
  },[dispatch])

  //check local storage for user token
  useEffect(() => {
    dispatch(checkLocalStorage())
  },[dispatch])

  const user = useSelector(state => state.login)
  const userIDMatch = useRouteMatch('/users/:id')
  const blogIDMatch = useRouteMatch('/blogs/:id')

  return (
    <div>

      <Notification />
      <div>
        { user ? <NavBar /> : <Login />}
      </div>
      <div>
        <h3>Blog app</h3>
      </div>
      <Switch>
        <Route path='/users/:id'>
          <UserView userID={userIDMatch ? userIDMatch.params.id : null} />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <BlogView blogID={blogIDMatch ? blogIDMatch.params.id : null}/>
        </Route>
        <Route path='/'>
          {user === null
            ? null
            : <div>
              <BlogList />
              <CreateBlog />
            </div>
          }
        </Route>
      </Switch>

    </div>
  )
}

export default App