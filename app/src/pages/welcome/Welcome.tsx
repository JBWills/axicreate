import { Button, Grid } from "@material-ui/core";

import FlexGrid from "components/FlexGrid";

const Welcome = () => (
  <FlexGrid spacing={3}>
    <Grid item xs={12}>
      <Button>Test</Button>
    </Grid>
    <Grid item xs={6}>
      <Button>Test2</Button>
    </Grid>
    <Grid item xs={6}>
      <Button>Test3</Button>
    </Grid>
  </FlexGrid>
);

export default Welcome;
