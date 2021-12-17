import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_NEW':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data)
  case 'UPDATE':
    return state.map(blog => blog.id !== action.data.blog.id ? blog : action.data.blog)
  default:
    return state
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch({
      type: 'ADD_NEW',
      data: blog
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.sort((a, b) => b.likes - a.likes)
    })
  }
}

export const delBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {

    const likedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlog)
    console.log(updatedBlog)


    dispatch({
      type: 'UPDATE',
      data: { blog: { ...blog, likes: blog.likes + 1 } }
    })
  }
}

export default reducer