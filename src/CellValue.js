import React from 'react'

export default function CellValue({ data, handleChange }) {
  return (
    <>
      {typeof data === 'object' ? (
        <input value={data.title} type='text' onChange={handleChange} />
      ) : (
        <select>
          <option value='123'>123</option>
        </select>
      )}
    </>
  )
}
