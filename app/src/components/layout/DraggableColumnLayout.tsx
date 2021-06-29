import { ReactNode } from "react";

import { Resizable } from "re-resizable";
import styled from "styled-components";

import { FillParent } from "util/css/mixins";

type DraggableLayoutProps = {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
};

const Container = styled.div`
  ${FillParent}
  display: flex;
  flex-direction: horizontal;
  align-items: stretch;
  justify-content: flex-start;
`;

const ResizableLeftPanel = ({ children }: { children: ReactNode }) => (
  <Resizable
    defaultSize={{ width: "30%", height: "100%" }}
    maxWidth="70%"
    minHeight="100%"
    snap={{ x: [10] }}
    snapGap={15}
    bounds="parent"
    enable={{ right: true }}>
    {children}
  </Resizable>
);

const RightPanel = styled.div`
  flex: 1;
  flex-basis: 0%;
  overflow: hidden;
`;

const DraggableLayout = ({ leftPanel, rightPanel }: DraggableLayoutProps) => (
  <Container>
    <ResizableLeftPanel>{leftPanel}</ResizableLeftPanel>

    <RightPanel>{rightPanel}</RightPanel>
  </Container>
);

export default DraggableLayout;
