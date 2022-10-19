import React from "react";
import BasicTable from "../Table/RenderTable";

//intial values
const bookInitialValues = {
  id: null,
  title: "",
  isbn: "",
  author: "",
  pages: "",
  barcode: ""
};

const Books = () => {
  return (
    <div>
      <BasicTable onBookInitialValues={bookInitialValues} />
    </div>
  );
};

export default Books;
