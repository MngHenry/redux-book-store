import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { addReadingList, getDetailBook } from "./pageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BASE_URL } from "../app/config";

const BookDetailPage = () => {
  const params = useParams();
  const bookId = params.id;

  const addToReadingList = (book) => {
    setAddBook(book);
  };

  const { bookDetails, isLoading } = useSelector((state) => state.page);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailBook({ bookId }));
  }, [bookId, dispatch]);

  const [addBook, setAddBook] = useState("");
  useEffect(() => {
    if (!addBook) return;
    dispatch(addReadingList({ addBook }));
  }, [addBook, dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {bookDetails && (
              <img
                width="100%"
                src={`${BASE_URL}/${bookDetails.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {bookDetails && (
              <Stack>
                <h2>{bookDetails.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {bookDetails.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {bookDetails.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {bookDetails.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {bookDetails.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {bookDetails.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(bookDetails)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
