import React, { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdotes, selected, votes}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes.</div>
    </>
  )
}

const AnecdoteWinner = ({anecdotes, votes}) => {
  const winnerIndex = votes.indexOf(Math.max(...votes))
  if (votes[winnerIndex] === 0) {
    return (
      <>
      <h1>Anecdote with the most votes</h1>
      <div>There are no votes yet.</div>
      </>
    )
  }
  return (
    <>
    <h1>Anecdote with the most votes</h1>
    <div>{anecdotes[winnerIndex]}</div>
    <div>has {votes[winnerIndex]} votes.</div>
    </>
  )
}

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

  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    
  }

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
      <Button onClick={handleVoteClick} text='vote'/>
      <Button onClick={handleAnecdoteClick} text='next anecdote'/>
      <AnecdoteWinner anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App