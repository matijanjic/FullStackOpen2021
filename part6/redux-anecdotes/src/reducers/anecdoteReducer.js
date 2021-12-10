import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      anecdote.votes += 1
      return state.map(a => a.id !== id ? a : anecdote)
    }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT':
      return action.data
  
    default: return state
      
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}
export const addNew = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

//TODO
//either replace the id with the whole anecdote object
//or handle fetching the correct anecdote inside the action
export const incVote = (anecdote) => {
  return async dispatch => {
    anecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    })
  }
  
    
}

export default reducer