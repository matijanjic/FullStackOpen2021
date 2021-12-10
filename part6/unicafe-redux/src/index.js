import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleRating = (type) => {
    switch(type) {
      case 'good':
        store.dispatch({
          type: 'GOOD'
        })
        break
      case 'ok':
        store.dispatch({
          type: 'OK'
        })
        break
      case 'bad':
        store.dispatch({
          type: 'BAD'
        })
        break
      default:
        store.dispatch({
          type: 'ZERO'
        })
    }
  }

  return (
    <div>
      <button onClick={() => handleRating('good')}>good</button> 
      <button onClick={() => handleRating('ok')}>ok</button> 
      <button onClick={() => handleRating('bad')}>bad</button>
      <button onClick={() => handleRating('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)