import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import BookForm from "../Books/BookForm";
import { useEffect } from "react";
import axios from "axios";
import TableRowViewControl from "./TableRowViewControl";
import Checkbox from '@mui/material/Checkbox';

export default function BasicTable({ onBookInitialValues }) {
  const [bookValues, setBookValues] = useState(onBookInitialValues);
  const [booksData, setBooksData] = useState([]);
  const [error, setError] = useState("");
  const [searchField, setSearchField] = useState("");
  const [open, setOpen] = useState(false);
  const [isDataFromApi, setIsDataFromApi] = useState(false);

  // fetching books from local database and add to booksdata state
  const fetchAllBooks = () => {
    axios
      .get("http://localhost:8080/books")
      .then((bookResponse) => {
        console.log("bookResponse:", bookResponse);
        setBooksData(bookResponse.data);
      })
      .catch(() => {
        console.log("error:", error);
      });
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
// delete bookitem from local database
  const handleDelete = (bookItem) => {
    
    axios
      .delete(`http://localhost:8080/delete/${bookItem?.barcode}`)
      .then((response) => {
        console.log("Delete:", response);
        fetchAllBooks();
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  // isbn validation
  const validateISBN = (event) => {
    const { value } = event.target;
    setSearchField(value);

    var isValidISBN = value.match(/[9]+[0-9]{12}/g);

    if (isValidISBN && value.length === 13) {
      setError("ISBN is Valid");
    } else {
      setError("ISBN Not Valid");
    }
  };

  // find book in database if present else search from google api
  const handleSearchBook = (event) => {
    event.preventDefault();

    const filteredBooks = booksData?.filter(
      (bookToSearch) => bookToSearch.isbn == searchField
    );

    if (filteredBooks.length > 0) {
      setBooksData(filteredBooks);
    } else {
      axios
        .request({
          url: "https://www.googleapis.com/books/v1/volumes",
          method: "get",
          params: {
            q: searchField,
          },
        })
        .then((response) => {
          console.log("response:", response);
          setIsDataFromApi(true);
          setBooksData(response?.data?.items);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  //display data from google api in tablerowviewcontrol
  const displayTableRows = () => {
    return Object.keys(booksData).map((bookItem,index) => {
      const bookItemValue = booksData[bookItem];

      return (
        <TableRowViewControl
          uniqueKey={bookItemValue.id}
          bookItemValue={bookItemValue}
        />
      );
    });
  };

  return (
    <>
    {/* add book */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "2%",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Book
        </Button>

        {/* Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSearchBook}>
            <TextField
              type="number"
              variant="outlined"
              onChange={validateISBN}
              placeholder="Search...."
            />
            <Button type="submit" variant="outlined">
              Search
            </Button>
          </form>
        </div>
      </div>
      <p style={{ textAlign: "right", marginRight: "2%" }}>
        {error}
      </p>
      {/* displaying data */}
      {booksData?.length > 0 ? (
        <>
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Book Title</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Author Name</TableCell>
                  <TableCell>Pages</TableCell>
                  {!isDataFromApi ?<><TableCell>Barcode</TableCell>
                  <TableCell>Read</TableCell> 
                  <TableCell>Operations</TableCell></>:null}
                </TableRow>
              </TableHead>
              <TableBody>
                {!isDataFromApi
                  ? booksData?.map((bookItem) => (
                      <TableRow
                        key={bookItem?.bookId}
                      >
                        <TableCell component="th" scope="row">
                          {bookItem?.title}
                        </TableCell>
                        <TableCell>{bookItem?.isbn}</TableCell>
                        <TableCell>{bookItem?.author}</TableCell>
                        <TableCell>{bookItem?.pages}</TableCell>
                        <TableCell>{bookItem?.barcode}</TableCell>
                        <TableCell><Checkbox checked={bookItem?.readBook}/></TableCell>
                        <TableCell>
                          <Button
                            variant="text"
                            onClick={() => handleDelete(bookItem)}
                            color="error"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : displayTableRows()}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          Nothing to Show. Please Add Some data
        </h3>
      )}

      {/* add books in local database */}
      <BookForm
        onBookInitialValues={onBookInitialValues}
        handleClose={handleClose}
        onOpen={open}
        onSetBookValues={setBookValues}
        onBookValues={bookValues}
        fetchAllBooks={fetchAllBooks}
      />
    </>
  );
}
