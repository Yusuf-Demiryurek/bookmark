import Fab from '@mui/material/Fab';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterButton() {
  return (
    <Fab size="medium" color="primary" aria-label="add">
      <FilterListIcon />
    </Fab>
  );
}
