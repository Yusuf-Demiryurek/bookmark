import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({ onClick }) {
  return (
    <Fab size="medium" color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
