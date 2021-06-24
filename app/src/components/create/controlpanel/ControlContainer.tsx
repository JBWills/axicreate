import styled from "styled-components";

const ContainerStyle = styled.div`
  background: ${({ theme }) => theme.colors.white};
  height: 100%;
`;

const ControlContainer = () => (
  <ContainerStyle>
    <div />
  </ContainerStyle>
);

export default ControlContainer;
