import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addNew(content)
    props.setNotification(`You created new anecdote '${content}'`, 2)
    
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
    </div>
  )
}
const mapDispatchToProps = {
  addNew,
  setNotification
}
export default connect(null, mapDispatchToProps)(AnecdoteForm)