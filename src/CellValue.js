import React from "react";

export default function CellValue({ data, handleChange }) {
  console.log("data", data);
  return (
    <>
      {typeof data === "string" ? (
        <input value={data.title} type="text" onChange={handleChange} />
      ) : (
        <select>
          {data &&
            // data.map((item, index) => (
            //   <option key={`${item}_${index}`} value={item}>
            //     {item}
            //   </option>
            // ))
            Object.values(data).map((item, index) => (
              <option key={`${item}_${index}`} value={item}>
                {item.toString()}
              </option>
            ))}
        </select>
      )}
    </>
  );
}
