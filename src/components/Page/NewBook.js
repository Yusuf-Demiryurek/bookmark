import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object({
  title: yup
    .string('Veueillez saisir un titre')
    .min(1, 'Un titre doit contenir au moins 1 caractère')
    .required('Le titre est requis'),
  currentPage: yup
    .number('veuillez entrer un nombre')
    .positive(0, 'Vueillez entrer une valeur supérieure à 0')
    .integer('veuillez entrer un entier'),
  totalPage: yup
    .number('veuillez entrer un nombre')
    .positive(0, 'Vueillez entrer une valeur supérieure à 0')
    .integer('veuillez entrer un entier')
    .when('currentPage', {
      is: (currentPage) => currentPage > 0,
      then: (schema) => schema.min((yup.ref('currentPage')), 'est inférieure à la page actuelle'),
      otherwise: (schema) => schema.min(0),
    }),
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

export default function NewBook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navToBookPage = () => navigate('/book', { replace: true });

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      category: '',
      status: 1,
      currentPage: '',
      totalPage: '',
      startDate: null,
      endDate: null,
      score: 0,
      review: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const book = {
        ...values,
        id: uuidv4(),
        currentPage: values.currentPage.toString(),
        totalPage: values.totalPage.toString(),
        score: +values.score,
      };
      dispatch(addBook(book));
      navToBookPage();
    },
  });

  // console.log(formik.errors);

  return (
    <FormControl fullWidth onSubmit={formik.handleSubmit}>
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
        <TextField
          id="title"
          label="Titre"
          variant="outlined"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id="author"
          label="Auteur"
          variant="outlined"
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <TextField
          id="category"
          label="Catégorie"
          variant="outlined"
          value={formik.values.category}
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
          <TextField
            id="currentPage"
            label="Page actuel"
            variant="outlined"
            sx={{ width: '48%' }}
            type="number"
            value={formik.values.currentPage}
            onChange={formik.handleChange}
          />
          <TextField
            id="totalPage"
            label="Nombre de Pages"
            variant="outlined"
            sx={{ width: '48%' }}
            type="number"
            value={formik.values.totalPage}
            onChange={formik.handleChange}
            error={formik.touched.totalPage && Boolean(formik.errors.totalPage)}
            helperText={formik.touched.totalPage && formik.errors.totalPage}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            id="startDate"
            name="startDate"
            label="Date de début"
            inputFormat="dd/MM/yyyy"
            value={formik.values.startDate}
            onChange={(value) => formik.setFieldValue('startDate', value)}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            id="endDate"
            name="endDate"
            label="Date de fin"
            inputFormat="dd/MM/yyyy"
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
        <Box>
          <Typography component="legend">Note</Typography>
          <Rating
            id="score"
            name="score"
            precision={0.5}
            value={+formik.values.score}
            onChange={formik.handleChange}
          />
        </Box>
        <TextField
          id="review"
          label="Commentaire"
          multiline
          rows={3}
          value={formik.values.review}
          onChange={formik.handleChange}
        />
        <Button variant="contained" type="submit">Ajouter</Button>
      </Box>
    </FormControl>
  );
}
