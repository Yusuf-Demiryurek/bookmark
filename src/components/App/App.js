import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from '../Layout/Header/Header';
import Book from '../Page/Book';
import NewBook from '../Page/NewBook';
import UpdateBook from '../Page/UpdateBook';
import { setBooksList } from '../../actions/books';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const importState = JSON.parse(localStorage.getItem('state'));

    const localState = importState.list.map((book) => ({
      ...book,
      startDate: new Date(book.startDate),
      endDate: new Date(book.endDate),
    }));

    dispatch(setBooksList(localState));
  }, []);
  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<> </>} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/add" element={<NewBook />} />
        <Route path="/book/update/:id" element={<UpdateBook />} />
        <Route path="*" element={<> </>} />
      </Routes>

    </ThemeProvider>
  );
}

export default App;
