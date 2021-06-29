declare module "react-p5-wrapper" {
  import P5 from "p5";

  type P5WrapperProps = {
    sketch: (p5: P5) => void;
  };

   const P5Wrapper: React.ComponentClass<P5WrapperProps & any>;

  export default P5Wrapper;
}
