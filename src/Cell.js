import React, { useCallback, useState, memo, useMemo } from "react";

import { Input, Header } from "./styles";

const Cell = ({
  rowIndex,
  columnIndex,
  columnName,
  setCellValue,
  computeCell,
  currentValue,
  currentStatus,
}) => {
  const [edit, setEdit] = useState(false);

  const value = useMemo(() => {
    if (edit) {
      return currentValue || "";
    }
    return computeCell({ row: rowIndex, column: columnName });
  }, [edit, computeCell, rowIndex, columnName, currentValue]);

  console.log(currentStatus);

  const handleChange = useCallback(
    (event) => {
      setCellValue({
        row: rowIndex,
        column: columnName,
        value: event.target.value,
        isYell: /S/.test(event.target.value) ? true : false,
      });
    },
    [setCellValue, rowIndex, columnName]
  );

  if (columnIndex === 0 && rowIndex === 0) {
    return <Header />;
  }

  if (columnIndex === 0) {
    return <Header>{rowIndex}</Header>;
  }

  if (rowIndex === 0) {
    return <Header>{columnName}</Header>;
  }

  return (
    <>
      {currentStatus ? (
        <h1>hoho</h1>
      ) : (
        <Input
          onBlur={() => setEdit(false)}
          onFocus={() => setEdit(true)}
          value={value}
          type="text"
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default memo(Cell);
