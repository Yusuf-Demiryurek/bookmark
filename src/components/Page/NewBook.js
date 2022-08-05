import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { addBook } from '../../actions/books';

export default function NewBook() {
  const navigate = useNavigate();

  const navToBookPage = () => navigate('/book', { replace: true });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [totalPage, setTotalPage] = useState('');
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [score, setScore] = useState(2.5);
  const [review, setReview] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const authorHandler = (e) => {
    setAuthor(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  const currentPageHandler = (e) => {
    setCurrentPage(e.target.value);
  };
  const totalPageHandler = (e) => {
    setTotalPage(e.target.value);
  };
  const startDateHandler = (e) => {
    setStartDate(e);
  };
  const endDateHandler = (e) => {
    setEndDate(e);
  };
  const scoreHandler = (e) => {
    setScore(+e.target.value);
  };
  const reviewHandler = (e) => {
    setReview(e.target.value);
  };

  const dispatch = useDispatch();
  const submitHandler = () => {
    const book = {
      id: uuidv4(),
      title: title,
      author: author,
      category: category,
      status: status,
      currentPage: currentPage,
      totalPage: totalPage,
      startDate: startDate,
      endDate: endDate,
      review: review,
      score: score,
    };
    dispatch(addBook(book));
    navToBookPage();
  };

  return (
    <Box
      component="form"
      marginTop="2rem"
      marginBottom="2rem"
      sx={{
        display: 'flex',
        flexDirection: 'Column',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '90%' },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField id="title" label="Titre" variant="outlined" value={title} onChange={titleHandler} />
      <TextField id="author" label="Auteur" variant="outlined" value={author} onChange={authorHandler} />
      <TextField id="category" label="Catégorie" variant="outlined" value={category} onChange={categoryHandler} />
      <FormControl fullWidth>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          id="status"
          value={status}
          label="Age"
          onChange={statusHandler}
        >
          <MenuItem value={1}>À lire</MenuItem>
          <MenuItem value={2}>En cours</MenuItem>
          <MenuItem value={3}>Fini</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <TextField id="currentPage" label="Page actuel" variant="outlined" sx={{ width: '48%' }} value={currentPage} onChange={currentPageHandler} />
        <TextField id="totalPage" label="Nombre de Page" variant="outlined" sx={{ width: '48%' }} value={totalPage} onChange={totalPageHandler} />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date de début"
          inputFormat="dd/MM/yyyy"
          value={startDate}
          onChange={startDateHandler}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          label="Date de fin"
          inputFormat="dd/MM/yyyy"
          value={endDate}
          onChange={endDateHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box>
        <Typography component="legend">Note</Typography>
        <Rating name="score" precision={0.5} value={score} onChange={scoreHandler} />
      </Box>
      <TextField
        id="outlined-multiline-static"
        label="Commentaire"
        multiline
        rows={3}
        value={review}
        onChange={reviewHandler}
      />
      <Button variant="contained" onClick={submitHandler}>Ajouter</Button>
    </Box>
  );
}
