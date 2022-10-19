import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableRowViewControl = ({
  uniqueKey,
  bookItemValue
}) => {
  console.log(bookItemValue);
  return (
    <>
      <TableRow
        key={uniqueKey}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row">
          {bookItemValue?.volumeInfo?.title}
        </TableCell>
        <TableCell>
          {bookItemValue && bookItemValue?.volumeInfo?.industryIdentifiers
            ? bookItemValue?.volumeInfo?.industryIdentifiers[0].identifier
            : null}
        </TableCell>
        <TableCell>{bookItemValue?.volumeInfo?.authors}</TableCell>
        <TableCell>{bookItemValue?.volumeInfo?.pageCount}</TableCell>
        <TableCell>
      
          
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowViewControl;
