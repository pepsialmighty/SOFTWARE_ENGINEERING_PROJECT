import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { AiOutlineFunction } from 'react-icons/ai'

export default function FunctionBar() {
  const [formActive, setFormActive] = useState(false)
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setValue('')
    setFormActive(false)
  }
  const handleChange = (e) => {
    setValue(e.target.value)
    if (e.target.value.length > 0) {
      setFormActive(true)
    } else {
      setFormActive(false)
    }
  }
  const handleReset = () => {
    setValue('')
    setFormActive(false)
  }
  return (
    <form onSubmit={handleSubmit} className='function-bar'>
      <span>
        <button
          onClick={handleReset}
          className={`btn-del ${formActive ? 'active' : ''}`}>
          <IoClose />
        </button>
        <button
          type='submit'
          className={`btn-check ${formActive ? 'active' : ''}`}>
          <FaCheck />
        </button>
        <i>
          <AiOutlineFunction />
        </i>
      </span>
      <input type='text' value={value} onChange={handleChange} />
    </form>
  )
}
