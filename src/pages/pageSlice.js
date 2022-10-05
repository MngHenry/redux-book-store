import { createSlice } from "@reduxjs/toolkit";
import api from "../app/apiService";
import { BOOKS_PER_PAGE } from "../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  Books: [],
  bookDetails: [],
  favoritesList: [],
};

const slice = createSlice({
  name: "page",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBooksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.Books = action.payload;
    },
    getDetailBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.bookDetails = action.payload;
    },
    addReadingListSuccess(state, actions) {
      state.isLoading = false;
      state.error = null;
    },
    getFavoritesListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.favoritesList = action.payload;
    },
    removeBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getBooks =
  ({ pageNum, query, limit = BOOKS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get(
        `/books?_page=${pageNum}&_limit=${limit}&q=${query}`
      );
      dispatch(slice.actions.getBooksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getDetailBook =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get(`/books/${bookId}`);
      dispatch(slice.actions.getDetailBookSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const addReadingList =
  ({ addBook }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.post(`/favorites`, addBook);
      dispatch(slice.actions.addReadingListSuccess(response.data));
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getFavoritesList = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await api.get(`/favorites`);
    dispatch(slice.actions.getFavoritesListSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const removeReadingBook =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.delete(`/favorites/${bookId}`);
      dispatch(slice.actions.removeBookSuccess(response.data));
      toast.success("The book has been removed to the reading list!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer;
