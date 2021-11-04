import DraggableLayout from "components/layout/DraggableColumnLayout";
import TestControlData from "core/control/TestControlData";

import ControlContainer from "./controlpanel/ControlContainer";
import PreviewContainer from "./preview/PreviewContainer";

const CreatePage = () => {
  return (
    <DraggableLayout
      leftPanel={<ControlContainer sketchConfig={TestControlData} />}
      rightPanel={<PreviewContainer />}
    />
  );
};

export default CreatePage;
