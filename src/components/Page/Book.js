import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
import BookCard from '../Shared/Card/BookCard';
import AddButton from '../Shared/AddButton/AddButton';
import FilterButton from '../Shared/FilterButton/FilterButton';
import SortButton from '../Shared/SortButton/SortButton';
import BookFilter from '../Shared/SideFilterDrawer/BookFilter';

export default function Book() {
  const navigate = useNavigate();
  const books = useSelector((state) => state.list);
  const isFiltered = useSelector((state) => state.isFiltered);

  const [sideFilterIsOpen, setSideFilterIsOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState(books);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSideFilterIsOpen(open);
  };

  const handleNavToAddForm = () => navigate('/book/add', { replace: true });

  return (
    <Box>
      <BookFilter
        sideFilterIsOpen={sideFilterIsOpen}
        toggleDrawer={toggleDrawer}
        setFilteredBooks={setFilteredBooks}
        books={books}
      />
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', '& > :not(style)': { m: 1 }, marginTop: 2,
      }}
      >
        <AddButton onClick={handleNavToAddForm} />
        <FilterButton onClick={toggleDrawer(true)} />
        <SortButton />
      </Box>
      {/* {isFiltered
        && (
        <Alert variant="filled" severity="info" sx={{ mx: '2rem', my: '6px' }}>
          Les données sont filtrées
        </Alert>
        )} */}
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', m: '2rem',
      }}
      >
        {isFiltered
          ? filteredBooks.map((book) => <BookCard key={book.id} {...book} />)
          : books.map((book) => <BookCard key={book.id} {...book} />)}
      </Box>
    </Box>
  );
}
