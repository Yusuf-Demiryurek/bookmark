/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import {
  SET_BOOKS_LIST, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK,
} from '../actions/books';

// const books = [
//   {
//     id: '1',
//     title: 'Sonic the Hedgehog, Vol. 1: Fallout',
//     author: 'Ian Flynn',
//     category: 'Bande dessinée',
//     status: 2,
//     currentPage: '5',
//     totalPage: '50',
//     startDate: new Date(2018, 11, 24),
//     endDate: new Date(2018, 11, 24),
//     review: "Une Super bande dessinée qui raconte l'histoire d'un hérisson bleu qui court super vite",
//     score: 5,
//   },
//   {
//     id: '2',
//     title: 'Sonic T02 Le retour du Dr Eggman',
//     author: 'Ian Flynn',
//     category: 'Bande dessinée',
//     status: 1,
//     currentPage: '',
//     totalPage: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     review: "Une Super bande dessinée qui raconte l'histoire d'un hérisson bleu qui court super vite",
//     score: 3,
//   },
//   {
//     id: '3',
//     title: 'Sonic T03 La bataille pour Angel Island (3)',
//     author: 'Ian Flynn',
//     category: 'Bande dessinée',
//     status: 3,
//     currentPage: '50',
//     totalPage: '50',
//     startDate: new Date(2018, 11, 24),
//     endDate: new Date(2020, 11, 24),
//     review: "Super bande dessinée qui raconte l'histoire d'un hérisson bleu qui court super vite",
//     score: 5,
//   },
// ];

export const initialState = {
  list: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BOOKS_LIST:
    {
      const newState = {
        ...state,
        list: action.payload.books,
        loading: false,
      };
      const serializedState = JSON.stringify(newState);
      localStorage.setItem('state', serializedState);
      return newState;
    }
    case ADD_BOOK:
    {
      const newState = {
        ...state,
        list: [{ ...action.payload.book }, ...state.list],
      };
      const serializedState = JSON.stringify(newState);
      localStorage.setItem('state', serializedState);
      return newState;
    }
    case UPDATE_BOOK:
    {
      const indexToReplace = state.list.findIndex((book) => book.id === action.payload.book.id);
      const newList = [...state.list];
      newList.splice(indexToReplace, 1, action.payload.book);
      const newState = {
        ...state,
        list: [...newList],
      };
      const serializedState = JSON.stringify(newState);
      localStorage.setItem('state', serializedState);
      return newState;
    }
    case DELETE_BOOK:
    {
      const indexToDelete = state.list.findIndex((book) => book.id === action.payload.id);
      const newList = [...state.list];
      newList.splice(indexToDelete, 1);
      const newState = {
        ...state,
        list: [...newList],
      };
      const serializedState = JSON.stringify(newState);
      localStorage.setItem('state', serializedState);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
