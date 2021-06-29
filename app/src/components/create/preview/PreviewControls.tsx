import styled from "styled-components";

const ControlsStyle = styled.div`
  background: ${({ theme }) => theme.colors.error};
  width: 100%;
  height: 100px;
  flex-shrink: 0;
`;

const PreviewControls = () => <ControlsStyle />;

export default PreviewControls;
