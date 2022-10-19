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
  isEditMode,
  isDataFromApi,
  fetchAllBooks,
}) => {
  console.log("Book Vlaues:", onBookValues);

  const bookDetails = {
    title: onBookValues.title,
    author: onBookValues.author,
    isbn: onBookValues.isbn,
    barcode: onBookValues.barcode,
    pages: onBookValues.pages,
  };

  const handleAddOrEdit = (event) => {
    event.preventDefault();

    
    if(!isEditMode) {
      console.log("IN nELSE....");
      axios
        .post("http://localhost:8080/add", bookDetails)
        .then((response) => {
          console.log(response);
          fetchAllBooks();
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
    
    onSetBookValues({ ...onBookInitialValues });
    handleClose();
  };

  console.log("OnBookValues:",onBookValues);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    // From Database case
    if (!isDataFromApi) {
      onSetBookValues({
        ...onBookValues,
        [name]: value,
      });
      return;
    }
    // In case of Data from Google Books
    // onSetBookValues({
    //   ...onBookValues,
    //   volumeInfo: {
    //     ...onBookValues.volumeInfo,
    //     [name]: value,
    //   },
    // });
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Add Book
      </Button> */}
      <Dialog open={onOpen} onClose={handleClose}>
        <DialogTitle>Add Form</DialogTitle>
        <form onSubmit={handleAddOrEdit}>
          <DialogContent>
            {/* <DialogContentText>Edit Form</DialogContentText> */}
            <TextField
              autoFocus
              name="title"
              margin="dense"
              label="Book Title"
              type="text"
              fullWidth
              variant="standard"
              value={
                
                   onBookValues.title
              }
              onChange={handleOnChange}
            />
            <TextField
              name="isbn"
              margin="dense"
              label="ISBN"
              type="number"
              fullWidth
              variant="standard"
              value={
                 onBookValues.isbn
              }
              onChange={handleOnChange}
            />
            <TextField
              name="barcode"
              margin="dense"
              label="barcode"
              type="number"
              fullWidth
              variant="standard"
              value={
                 onBookValues.barcode
              }
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="author"
              label="Author Name"
              type="text"
              fullWidth
              variant="standard"
              value={
                 onBookValues.author
              }
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="pages"
              label="Pages"
              type="number"
              fullWidth
              variant="standard"
              value={
                 onBookValues.pages
              }
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
