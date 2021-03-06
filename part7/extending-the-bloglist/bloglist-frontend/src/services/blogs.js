import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const addComment = async (id, comment) => {
  console.log('addComment blogservice', comment)

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: comment })
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(config)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, create, setToken, update, remove, addComment }