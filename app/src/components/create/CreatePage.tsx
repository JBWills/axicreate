import DraggableLayout from "components/layout/DraggableColumnLayout";

import ControlContainer from "./controlpanel/ControlContainer";
import PreviewContainer from "./preview/PreviewContainer";

const CreatePage = () => (
  <DraggableLayout
    leftPanel={<ControlContainer />}
    rightPanel={<PreviewContainer />}
  />
);

export default CreatePage;
