import { Button, Grid } from "@material-ui/core";
import { useContextSelector } from "use-context-selector";

import FlexGrid from "components/FlexGrid";
import AppContext from "core/context/AppContext";

const FirstIncrementor = () => {
  const counter = useContextSelector(AppContext, (s) => s.state.counter);
  const increment = useContextSelector(AppContext, (s) => s.actions.increment);
  const decrement = useContextSelector(AppContext, (s) => s.actions.decrement);

  console.log("Rendering first incrementor");
  return (
    <>
      <Grid item xs={4}>
        Counter 1: {counter}
      </Grid>

      <Grid item xs={4}>
        <Button onClick={increment}>Increment 1</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={decrement}>Decrement 1</Button>
      </Grid>
    </>
  );
};
const SecondIncrementor = () => {
  const counter2 = useContextSelector(AppContext, (s) => s.state.counter2);
  const increment = useContextSelector(AppContext, (s) => s.actions.increment2);
  const decrement = useContextSelector(AppContext, (s) => s.actions.decrement2);
  console.log("Rendering second incrementor");
  return (
    <>
      <Grid item xs={4}>
        Counter 2: {counter2}
      </Grid>
      <Grid item xs={4}>
        <Button onClick={increment}>Increment 2</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={decrement}>Decrement 2</Button>
      </Grid>
    </>
  );
};

const Welcome = () => {
  return (
    <FlexGrid spacing={3}>
      <FirstIncrementor />
      <SecondIncrementor />
    </FlexGrid>
  );
};

export default Welcome;
