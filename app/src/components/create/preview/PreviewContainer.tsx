import styled from "styled-components";

const ContainerStyle = styled.div`
  background: ${({ theme }) => theme.colors.black};
  height: 100%;
`;

const PreviewContainer = () => (
  <ContainerStyle>
    <div />
  </ContainerStyle>
);

export default PreviewContainer;
