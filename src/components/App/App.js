import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from '../Layout/Header/Header';
import Book from '../Page/Book';
import NewBook from '../Page/NewBook';
import UpdateBook from '../Page/UpdateBook';

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
