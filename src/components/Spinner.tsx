import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Grid container direction="row" justifyContent="center" className="proGressP loader_position" alignItems="center">
      <CircularProgress />
    </Grid>
  );
};

export default Spinner;
