import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {

  test('Blog creation calls the event handler with correct data', () => {

    const createBlog = jest.fn()
    const component = render(
      <CreateBlog submitBlog={createBlog}/>
    )


    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const blogForm = component.container.querySelector('.blogForm')

    fireEvent.change(title, {
      target: { value: 'testTitle' }
    })

    fireEvent.change(author, {
      target: { value: 'testAuthor' }
    })

    fireEvent.change(url, {
      target: { value: 'testUrl' }
    })

    fireEvent.submit(blogForm)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
    expect(createBlog.mock.calls[0][0].url).toBe('testUrl')

  })
})




