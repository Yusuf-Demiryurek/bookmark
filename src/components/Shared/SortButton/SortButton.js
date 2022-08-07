import { PropTypes } from 'prop-types';
import Fab from '@mui/material/Fab';
import SortIcon from '@mui/icons-material/Sort';

export default function SortButton({ id, handleClick }) {
  return (
    <Fab size="medium" color="primary" aria-label="add" id={id} onClick={handleClick}>
      <SortIcon />
    </Fab>
  );
}

SortButton.propTypes = {
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
