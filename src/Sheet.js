import React, { useState, useCallback, Fragment } from "react";

import Cell from "./Cell";
import { Sheet as StyledSheet } from "./styles";

const getColumnName = (index) =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Sheet = ({ numberOfRows, numberOfColumns }) => {
  const [data, setData] = useState({});
  const [fetchedData, setFetchedData] = useState();

  const setCellValue = useCallback(
    ({ row, column, value }) => {
      const newData = { ...data };

      newData[`${column}${row}`] = value;
      setData(newData);
    },
    [data, setData]
  );

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
            } else if (/SPARQL/.test(item)) {
              console.log("ITS IS");
              fetch("https://jsonplaceholder.typicode.com/todos/1")
                .then((response) => response.json())
                .then((json) => {
                  setFetchedData(json.id);
                });
              subStitutedExpression += fetchedData;
            } else {
              subStitutedExpression += item;
            }
          });

          console.log("subStitutedExpression", subStitutedExpression);

          // @shame: Need to comeup with parser to replace eval and to support more expressions
          try {
            return eval(subStitutedExpression);
            // return subStitutedExpression;
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
    },
    [data, fetchedData]
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
