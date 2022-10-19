import React from "react";
import BasicTable from "../Table/RenderTable";

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
