import React, { useCallback, useState, memo, useMemo } from 'react'
import CellValue from './CellValue'

import { Input, Header } from './styles'

const Cell = ({
  rowIndex,
  columnIndex,
  columnName,
  setCellValue,
  computeCell,
  currentValue,
  currentStatus,
}) => {
  const [edit, setEdit] = useState(false)
  const value = useMemo(() => {
    if (edit) {
      return currentValue || ''
    }
    return computeCell({ row: rowIndex, column: columnName })
  }, [edit, computeCell, rowIndex, columnName, currentValue])
  console.log('value', value)
  const handleChange = useCallback(
    (event) => {
      setCellValue({
        row: rowIndex,
        column: columnName,
        value: event.target.value,
        // isYell: /S/.test(event.target.value) ? true : false,
      })
    },
    [setCellValue, rowIndex, columnName],
  )

  const handleBlur = (event) => {
    setCellValue({
      row: rowIndex,
      column: columnName,
      value: event.target.value,
      isYell: /S/.test(event.target.value) ? true : false,
    })
    setEdit(false)
  }

  if (columnIndex === 0 && rowIndex === 0) {
    return <Header />
  }

  if (columnIndex === 0) {
    return <Header>{rowIndex}</Header>
  }

  if (rowIndex === 0) {
    return <Header>{columnName}</Header>
  }

  return (
    <>
      {currentStatus ? (
        <CellValue data={value} handleChange={handleChange} />
      ) : (
        <Input
          onBlur={handleBlur}
          onFocus={() => setEdit(true)}
          value={value}
          type='text'
          onChange={handleChange}
        />
      )}
    </>
  )
}

export default memo(Cell)
