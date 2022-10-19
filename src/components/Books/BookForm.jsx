import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const BookForm = ({
  onBookInitialValues,
  handleClose,
  onOpen,
  onSetBookValues,
  onBookValues,
  fetchAllBooks,
}) => {

  //key value pairs
  const bookDetails = {
    title: onBookValues.title,
    author: onBookValues.author,
    isbn: onBookValues.isbn,
    barcode: onBookValues.barcode,
    pages: onBookValues.pages,
  };

  //add books to database
  const handleAdd = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/add", bookDetails)
      .then((response) => {
        console.log(response);
        fetchAllBooks();
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    //reset form
    onSetBookValues({ ...onBookInitialValues });
    handleClose();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    onSetBookValues({
      ...onBookValues,
      [name]: value,
    });
  };

  return (
    <div>
      <Dialog open={onOpen} onClose={handleClose}>
        <DialogTitle>Add Form</DialogTitle>
        <form onSubmit={handleAdd}>
          <DialogContent>
            <TextField
              autoFocus
              name="title"
              margin="dense"
              label="Book Title"
              type="text"
              fullWidth
              variant="standard"
              value={onBookValues.title}
              onChange={handleOnChange}
            />
            <TextField
              name="isbn"
              margin="dense"
              label="ISBN"
              type="number"
              fullWidth
              variant="standard"
              maxLength={5}
              value={onBookValues.isbn}
              onChange={handleOnChange}
            />
            <TextField
              name="barcode"
              margin="dense"
              label="barcode"
              type="number"
              fullWidth
              variant="standard"
              value={onBookValues.barcode}
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="author"
              label="Author Name"
              type="text"
              fullWidth
              variant="standard"
              value={onBookValues.author}
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="pages"
              label="Pages"
              type="number"
              fullWidth
              variant="standard"
              value={onBookValues.pages}
              onChange={handleOnChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default BookForm;
