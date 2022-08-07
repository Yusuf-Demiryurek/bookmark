import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BookCard from '../Shared/Card/BookCard';
import AddButton from '../Shared/AddButton/AddButton';
import FilterButton from '../Shared/FilterButton/FilterButton';
import SortButton from '../Shared/SortButton/SortButton';
import BookFilter from '../Shared/SideFilterDrawer/BookFilter';
import { setFilter } from '../../actions/books';

export default function Book() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.list);
  const isFiltered = useSelector((state) => state.isFiltered);

  const [sideFilterIsOpen, setSideFilterIsOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [sortingAsc, setSortingAsc] = useState(
    {
      title: true,
      author: true,
      category: true,
      status: true,
      currentPage: true,
      totalPage: true,
      startDate: true,
      endDate: true,
      score: true,
    },
  );

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSideFilterIsOpen(open);
  };

  const handleNavToAddForm = () => navigate('/book/add', { replace: true });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (key) => {
    setAnchorEl(null);
    const coeff = sortingAsc[key] ? 1 : -1;
    const sortedBooks = isFiltered
      ? filteredBooks.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1 * coeff;
        }
        if (a[key] > b[key]) {
          return 1 * coeff;
        }
        return 0;
      })
      : books.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1 * coeff;
        }
        if (a[key] > b[key]) {
          return 1 * coeff;
        }
        return 0;
      });
    setFilteredBooks(sortedBooks);
    dispatch(setFilter(true));
    setSortingAsc({
      ...sortingAsc,
      [key]: !sortingAsc[key],
    });
  };

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
        <SortButton id="sort-button" handleClick={handleClick} />
        <Menu
          id="sort-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'sort-button',
          }}
        >
          <MenuItem onClick={() => handleClose('title')}>Titre</MenuItem>
          <MenuItem onClick={() => handleClose('author')}>Auteur</MenuItem>
          <MenuItem onClick={() => handleClose('category')}>Catégorie</MenuItem>
          <MenuItem onClick={() => handleClose('status')}>Status</MenuItem>
          <MenuItem onClick={() => handleClose('currentPage')}>Page actuelle</MenuItem>
          <MenuItem onClick={() => handleClose('totalPage')}>Nombre de pages</MenuItem>
          <MenuItem onClick={() => handleClose('startDate')}>Date de début</MenuItem>
          <MenuItem onClick={() => handleClose('endDate')}>Date de fin</MenuItem>
          <MenuItem onClick={() => handleClose('score')}>Note</MenuItem>
        </Menu>
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
