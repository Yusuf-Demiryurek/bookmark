import * as React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { setFilter } from '../../../actions/books';

const validationSchema = yup.object({
  startDate: yup
    .date()
    .nullable(),
  endDate: yup
    .date()
    .nullable()
    .when('startDate', {
      is: (startDate) => startDate && !(startDate.getTime().isNaN),
      then: (schema) => schema.min((yup.ref('startDate')), 'est inférieure à la date de début'),
    }),
});

export default function BookFilter({
  sideFilterIsOpen, toggleDrawer, setFilteredBooks, books,
}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      category: '',
      status: 0,
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const filteredBooks = books.filter((book) => {
        const titleFilter = values.title ? book.title.includes(values.title) : true;
        const authorFilter = values.author ? book.author.includes(values.author) : true;
        const categoryFilter = values.category ? book.category.includes(values.category) : true;
        const statusFilter = values.status > 0 ? book.status === values.status : true;
        const startDateFilter = values.startDate ? book.endDate >= values.startDate : true;
        const endDateFilter = values.endDate ? book.endDate <= values.endDate : true;
        return (
          titleFilter
          && authorFilter
          && categoryFilter
          && statusFilter
          && startDateFilter
          && endDateFilter);
      });
      setFilteredBooks(filteredBooks);
      dispatch(setFilter(true));
    },
  });

  const formFilter = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <FormControl fullWidth onSubmit={formik.handleSubmit}>
        <Box
          component="form"
          marginTop="1rem"
          marginBottom="1rem"
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
          <Typography variant="h6" component="p">
            Filtres
          </Typography>
          <TextField
            id="title"
            label="Titre"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            id="author"
            label="Auteur"
            variant="outlined"
            value={formik.values.auhtor}
            onChange={formik.handleChange}
          />
          <TextField
            id="category"
            label="Catégorie"
            variant="outlined"
            value={formik.values.auhtor}
            onChange={formik.handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              label="Status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Sélectionnez une valeur </MenuItem>
              <MenuItem value={1}>À lire</MenuItem>
              <MenuItem value={2}>En cours</MenuItem>
              <MenuItem value={3}>Fini</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              id="startDate"
              name="startDate"
              label="Le livre a été lu entre le"
              format="MM/yyyy"
              minDate={new Date(2020, 0)}
              maxDate={new Date(2030, 0)}
              views={['year', 'month']}
              value={formik.values.startDate}
              onChange={(value) => formik.setFieldValue('startDate', value)}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDatePicker
              id="endDate"
              name="endDate"
              label="et le"
              format="MM/yyyy"
              minDate={new Date(2020, 0)}
              maxDate={new Date(2030, 0)}
              views={['year', 'month']}
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue('endDate', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              )}
            />
          </LocalizationProvider>
          <Button variant="contained" type="submit">Appliquer</Button>
          <Button
            variant="contained"
            onClick={() => {
              formik.handleReset();
              formik.handleSubmit();
              dispatch(setFilter(false));
            }}
          >Supprimer les filtres
          </Button>
        </Box>
      </FormControl>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Drawer
          anchor="right"
          open={sideFilterIsOpen}
          onClose={toggleDrawer(false)}
        >
          {formFilter}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

BookFilter.propTypes = {
  sideFilterIsOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  setFilteredBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};
