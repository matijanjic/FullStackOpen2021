describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'matija',
      name: 'matija',
      password: 'matija'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const user2 = {
      username: 'matija2',
      name: 'matija2',
      password: 'matija2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })

  describe('Login', function() {
    it('succedes witch correct credentials', function() {
      cy.get('#username').type('matija')
      cy.get('#password').type('matija')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'Successfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('matija')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'matija', password: 'matija' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Cypress Title')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('Cypress Url')
      cy.get('#submit-blog').click()
      cy.get('.blogTitleAndAuthor').should('contain', 'Cypress Title')
    })
  })

  describe('When logged in and multiple blogs exist', function() {
    beforeEach(function() {
      cy.login({ username: 'matija', password: 'matija' })
      cy.createBlog({ title: 'first blog', author: 'cypress', url: 'localhost' })
      cy.createBlog({ title: 'second blog', author: 'cypress', url: 'localhost' })
      cy.createBlog({ title: 'third blog', author: 'cypress', url: 'localhost' })
    })

    it('A blog can be liked', function() {
      cy.contains('second blog').contains('show').click()
      cy.get('#likes').should('contain', 'likes 0')
      cy.contains('second blog').parent().contains('like').click()
      cy.contains('second blog').parent().contains('like').click()
      cy.get('#likes').should('contain', 'likes 2')
    })
  })

  describe('Blog deletion', function() {
    beforeEach(function() {
      cy.login({ username: 'matija', password: 'matija' })
      cy.createBlog({ title: 'first blog', author: 'cypress', url: 'localhost' })
      cy.createBlog({ title: 'second blog', author: 'cypress', url: 'localhost' })
    })

    it('User that created a blog can delete it', function() {
      cy.contains('second blog').contains('show').click()
      cy.contains('second blog').parent().contains('delete').click()
      cy.get('html').should('not.contain', 'second blog')
    })

    it('User that did not create the blog can not delete it', function() {
      cy.login({ username: 'matija2', password: 'matija2' })
      cy.contains('second blog').contains('show').click()
      cy.contains('second blog').parent().should('not.contain', 'delete')
    })
  })

  it.only('Blogs are ordered according to number of likes', function() {
    cy.login({ username: 'matija', password: 'matija' })
    cy.createBlog({ title: 'first blog', author: 'cypress', url: 'localhost' })
    cy.createBlog({ title: 'second blog', author: 'cypress', url: 'localhost' })
    cy.createBlog({ title: 'third blog', author: 'cypress', url: 'localhost' })
    cy.contains('first blog').contains('show').click()
    cy.get('#likes').find('button').click()
    cy.contains('first blog').contains('hide').click()

    cy.contains('second blog').contains('show').click()
    cy.get('#likes').find('button').click()
    cy.get('#likes').find('button').click()
    cy.contains('second blog').contains('hide').click()

    cy.contains('third blog').contains('show').click()
    cy.get('#likes').find('button').click()
    cy.get('#likes').find('button').click()
    cy.get('#likes').find('button').click()
    cy.contains('third blog').contains('hide').click()
    cy.visit('http://localhost:3000')
    cy.get('.blogTitleAndAuthor').then((blog) => {
      blog.map((i, el) => {
        console.log(i)
        if(i === 0) {
          cy.wrap(el).should('contain', 'third blog')
        } else if (i === 1) {
          cy.wrap(el).should('contain', 'second blog')
        } else {
          cy.wrap(el).should('contain', 'first blog')
        }


      })
    })


  })
})