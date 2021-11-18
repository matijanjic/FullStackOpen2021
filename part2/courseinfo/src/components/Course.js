import React from "react"

const Course = ({courses}) => {
    return(
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
          </div>
        )}
      </div>
    )}
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((sum, ex) => sum + ex.exercises, 0)
    
    return(
      <p><b>Number of exercises {total}</b></p>
    ) 
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part=> 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }

export default Course