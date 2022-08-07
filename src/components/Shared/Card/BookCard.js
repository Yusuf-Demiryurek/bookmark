import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { deleteBook } from '../../../actions/books';
import ProgressBar from '../ProgressBar/ProgressBar';
import ToStartBadge from '../Badge/ToStartBadge';
import InProgressBadge from '../Badge/InProgressBadge';
import FinishBadge from '../Badge/FinishBadge';

export default function BookCard({
  // eslint-disable-next-line no-unused-vars
  id, title, author, category, status, currentPage, totalPage, startDate, endDate, review, score,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavToUpdateForm = (bookId) => navigate(`/book/update/${bookId}`, { replace: true });
  const handleDeleteBook = (bookId) => dispatch(deleteBook(bookId));

  // Progress calculation
  const progress = (currentPage && totalPage)
    ? parseInt(currentPage, 10) / parseInt(totalPage, 10) : 0;
  return (
    <Card sx={{
      display: 'flex', flexDirection: 'Column', justifyContent: 'space-between', width: 350, height: 500, m: '1rem',
    }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">
          {author}
        </Typography>
        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary">
          {category}
        </Typography>
        {(currentPage || totalPage) && (
        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.primary">
          Page {currentPage ? `${currentPage}` : '0'}  {totalPage ? `/ ${totalPage}` : '' }
        </Typography>
        )}
        {startDate && (
        <>
          <Typography sx={{ fontSize: 10 }} color="text.secondary">
            Commencé le:
          </Typography>
          <Typography sx={{ fontSize: 12, mb: 1 }} color="text.primary">
            {`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}
          </Typography>
        </>
        )}
        {endDate && (
          <>
            <Typography sx={{ fontSize: 10 }} color="text.secondary">
              fini le:
            </Typography>
            <Typography sx={{ fontSize: 12, mb: 1 }} color="text.primary">
              {`${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}
            </Typography>
          </>
        )}
        {status === 3 && <FinishBadge />}
        {status === 2 && <InProgressBadge />}
        {status === 1 && <ToStartBadge />}
        <ProgressBar progress={progress} />
        <Typography variant="body1">
          {review}
        </Typography>
        <Rating name="half-rating" value={+score} precision={0.5} readOnly />
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => handleNavToUpdateForm(id)}>Editer</Button>
        <Button variant="contained" onClick={() => handleDeleteBook(id)}>Supprimer</Button>
      </CardActions>
    </Card>
  );
}

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  currentPage: PropTypes.string.isRequired,
  totalPage: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  review: PropTypes.string.isRequired,
  score: PropTypes.number,
};

BookCard.defaultProps = {
  startDate: null,
  endDate: null,
  score: 0,
};
