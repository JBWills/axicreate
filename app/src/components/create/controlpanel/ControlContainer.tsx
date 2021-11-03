import { Leva } from "leva";
import styled from "styled-components";

const ContainerStyle = styled.div`
  background: ${({ theme }) => theme.colors.gray04};
  height: 100%;
`;

const ControlContainer = () => {
  return (
    <ContainerStyle>
      <Leva fill flat isRoot titleBar={{ title: "Axicreate", drag: false }} />
    </ContainerStyle>
  );
};

export default ControlContainer;
