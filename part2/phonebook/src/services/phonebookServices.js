import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('created ', newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log('updated ', newObject)
    return request.then(response => response.data)
}

const del = id => {
    axios.delete(`${baseUrl}/${id}`)
    console.log('deleted ', id)
}

export default {getAll, create, update, del}