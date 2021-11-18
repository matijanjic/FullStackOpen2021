import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)

  console.log(maxVotes)

  const randSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const incVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    checkMax()
  }
  
  const checkMax = () => {
    let max = votes[0]
    let index = 0
    
      for(var i = 0; i < votes.length; i++) {
        if (votes[i] > max) {
          console.log(index)
          index = i
          max = votes[i]
        }
        
      }
      setMaxVotes(index) 
  }

  return (
    <div>
      <div><h1>Anecdote of the day</h1></div>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes.</div>
      <div><button onClick={incVote}>vote</button></div>
      <div><button onClick={randSelect}>next anecdote</button></div>
      <div><h1>Anecdote with the most votes</h1></div>
      <div>{anecdotes[maxVotes]}</div> 
      <div>has {votes[maxVotes]} votes</div>
    </div>
  )
}

export default App