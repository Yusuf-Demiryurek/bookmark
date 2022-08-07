import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterButton({ onClick }) {
  return (
    <Fab size="medium" color="primary" aria-label="add" onClick={onClick}>
      <FilterListIcon />
    </Fab>
  );
}

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
