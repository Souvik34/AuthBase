import React from 'react'

const Signup = () => {
  return (
   <div className='container'>
    <h1>Signup</h1>
    <form>
        <div>
            <label htmlFor="name">Name</label>
            <input
             type="text"
             name='name'
             autoFocus
             placeholder='Enter your Name'
              />
        </div>
    </form>
   </div>
  )
}

export default Signup