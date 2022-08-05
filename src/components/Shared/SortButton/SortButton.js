import Fab from '@mui/material/Fab';
import SortIcon from '@mui/icons-material/Sort';

export default function SortButton() {
  return (
    <Fab size="medium" color="primary" aria-label="add">
      <SortIcon />
    </Fab>
  );
}
