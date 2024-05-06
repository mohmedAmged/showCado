import React from 'react'

export default function Error({error}) {
  return (
    <>
      <div className='errorContainer text-danger'>{error}</div>
    </>
  )
}
