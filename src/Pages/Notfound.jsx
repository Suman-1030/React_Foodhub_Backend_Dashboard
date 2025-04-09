import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div className='notfound'>
      <div className='con'>
        <h1>404</h1>
        <div>Page not found</div>
      </div>
      <Link to='/' style={{ marginTop: '20px', textDecoration: 'underline', color: 'blue' }}>
        Get Back
      </Link>
    </div>
  )
}

export default Notfound
