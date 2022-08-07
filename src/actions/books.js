export const SET_BOOKS_LIST = 'SET_BOOKS_LIST';
export const setBooksList = (books) => ({
  type: SET_BOOKS_LIST,
  payload: { books: books },
});

export const ADD_BOOK = 'ADD_BOOK';
export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: { book: book },
});

export const UPDATE_BOOK = 'UPDATE_BOOK';
export const updateBook = (book) => ({
  type: UPDATE_BOOK,
  payload: { book: book },
});

export const DELETE_BOOK = 'DELETE_BOOK';
export const deleteBook = (id) => ({
  type: DELETE_BOOK,
  payload: { id: id },
});

export const SET_FILTERS = 'SET_FILTERS';
export const setFilter = (isFiltered) => ({
  type: SET_FILTERS,
  payload: { isFiltered: isFiltered },
});
