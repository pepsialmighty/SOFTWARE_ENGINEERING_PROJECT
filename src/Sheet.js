import React, { useState, useCallback, Fragment } from "react";
import axios from "axios";

import Cell from "./Cell";
import { Sheet as StyledSheet } from "./styles";

const getColumnName = (index) =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Sheet = ({ numberOfRows, numberOfColumns }) => {
  const [data, setData] = useState({});
  const [fetchedData, setFetchedData] = useState(null);

  const [yell, setYell] = useState({});

  const setCellValue = useCallback(
    ({ row, column, value, isYell }) => {
      const newData = { ...data };
      const newYell = { ...yell };

      newData[`${column}${row}`] = value;
      setData(newData);

      newYell[`${column}${row}`] = isYell;
      setYell(newYell);
    },
    [data, yell]
  );

  // const triggerYell = (value) => {
  //   return value;
  // };

  const computeCell = useCallback(
    ({ row, column }) => {
      const cellContent = data[`${column}${row}`];
      const cellStatus = yell[`${column}${row}`];

      if (cellContent) {
        if (cellContent.charAt(0) === "=") {
          // This regex converts = "A1+A2" to ["A1","+","A2"]
          const expression = cellContent.substr(1).split(/([+*-])/g);

          let subStitutedExpression = "";

          let objectData = null;

          expression.forEach((item) => {
            // Regex to test if it is of form alphabet followed by number ex: A1
            if (/^[A-z][0-9]$/g.test(item || "")) {
              subStitutedExpression += data[(item || "").toUpperCase()] || 0;
            } else if (/S/.test(item.toUpperCase())) {
              axios
                .get("https://jsonplaceholder.typicode.com/todos/1")
                .then((res) => {
                  const value = res.data;
                  if (yell === false) {
                    setYell(true);
                    setFetchedData(value);
                  }
                });
              // setFetchedData("haha");
              objectData = fetchedData && fetchedData;
            } else {
              subStitutedExpression += item;
            }
          });

          // @shame: Need to comeup with parser to replace eval and to support more expressions
          try {
            return objectData ? objectData : eval(subStitutedExpression);
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
      return "";
    },
    [data, fetchedData, yell]
  );

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
                      currentStatus={yell[`${columnName}${i}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                      // triggerYell={() => triggerYell(fetched)}
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
