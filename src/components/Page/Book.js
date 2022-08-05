import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import BookCard from '../Shared/Card/BookCard';
import AddButton from '../Shared/AddButton/AddButton';
import FilterButton from '../Shared/FilterButton/FilterButton';
import SortButton from '../Shared/SortButton/SortButton';

export default function Book() {
  const navigate = useNavigate();
  const books = useSelector((state) => state.list);

  const handleNavToAddForm = () => navigate('/book/add', { replace: true });
  return (
    <Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', '& > :not(style)': { m: 1 }, marginTop: 2,
      }}
      >
        <AddButton onClick={handleNavToAddForm} />
        <FilterButton />
        <SortButton />
      </Box>
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', m: '2rem',
      }}
      >
        {books.map((book) => <BookCard key={book.id} {...book} />)}
      </Box>
    </Box>
  );
}
