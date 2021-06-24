import React from "react";

import { Grid, GridSpacing } from "@material-ui/core";
import styled from "styled-components";

const FlexGridContainer = styled(Grid)`
  flex-grow: 1;
`;

type FlexGridProps = {
  children: React.ReactNode;
  spacing?: GridSpacing;
};

const FlexGrid = ({ children, spacing }: FlexGridProps) => (
  <FlexGridContainer container spacing={spacing}>
    {children}
  </FlexGridContainer>
);

FlexGrid.defaultProps = {
  spacing: 0,
};

export default FlexGrid;
