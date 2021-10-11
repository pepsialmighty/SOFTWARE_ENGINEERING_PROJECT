import React, { useState, useCallback, useEffect, Fragment } from "react";
import axios from "axios";

import Cell from "./Cell";
import { Sheet as StyledSheet } from "./styles";

const getColumnName = (index) =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Sheet = ({ numberOfRows, numberOfColumns }) => {
  const [data, setData] = useState({});
  const [fetchedData, setFetchedData] = useState(null);
  const [valueData, setValueData] = useState(null);

  const setCellValue = useCallback(
    ({ row, column, value }) => {
      const newData = { ...data };

      newData[`${column}${row}`] = value;
      setData(newData);
    },
    [data, setData]
  );

  useEffect(() => {
    setValueData(fetchedData);
  }, [fetchedData]);

  const computeCell = useCallback(
    ({ row, column }) => {
      const cellContent = data[`${column}${row}`];
      if (cellContent) {
        if (cellContent.charAt(0) === "=") {
          // This regex converts = "A1+A2" to ["A1","+","A2"]
          const expression = cellContent.substr(1).split(/([+*-])/g);

          let subStitutedExpression = "";

          expression.forEach((item) => {
            // Regex to test if it is of form alphabet followed by number ex: A1
            if (/^[A-z][0-9]$/g.test(item || "")) {
              subStitutedExpression += data[(item || "").toUpperCase()] || 0;
            } else if (/S/.test(item)) {
              axios
                .get("https://jsonplaceholder.typicode.com/todos/1")
                .then((res) => {
                  const value = res.data;
                  setFetchedData(value);
                });
              // setFetchedData("haha");
              // subStitutedExpression = valueData && valueData.id;
            } else {
              subStitutedExpression += item;
            }
          });

          // @shame: Need to comeup with parser to replace eval and to support more expressions
          try {
            return eval(subStitutedExpression);
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
      return "";
    },
    [data]
  );

  console.log(fetchedData);

  return (
    <StyledSheet numberOfColumns={numberOfColumns}>
      {Array(numberOfRows)
        .fill()
        .map((m, i) => {
          return (
            <Fragment key={i}>
              {Array(numberOfColumns)
                .fill()
                .map((n, j) => {
                  const columnName = getColumnName(j);
                  return (
                    <Cell
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      setCellValue={setCellValue}
                      currentValue={data[`${columnName}${i}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                    />
                  );
                })}
            </Fragment>
          );
        })}
    </StyledSheet>
  );
};

export default Sheet;
