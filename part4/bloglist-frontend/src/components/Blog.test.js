import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    user: {
      name: 'testName',
      username: 'testUsername'
    }
  }

  const user = {
    username: 'testUsername'
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler}/>
    )
  })
  test('Blogs only show Title and Author', () => {


    expect(component.container).not.toHaveTextContent('testUrl')
    expect(component.container).not.toHaveTextContent('testName')

    const visibleDiv = component.container.querySelector('.blogTitleAndAuthor')
    expect(visibleDiv).not.toBe(null)

    const hiddenDiv = component.container.querySelector('.blogAllInfo')
    expect(hiddenDiv).toBe(null)
  })

  test('Blog shows all info when button clicked', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const hiddenDiv = component.container.querySelector('.blogAllInfo')
    expect(hiddenDiv).not.toBe(null)
  })

  test('Blog hides info when hide button clicked', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const hideButton = component.getByText('hide')
    fireEvent.click(hideButton)

    const hiddenDiv = component.container.querySelector('.blogAllInfo')
    expect(hiddenDiv).toBe(null)
  })

  test('Clicking like button twice calls the event handler twice', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})




