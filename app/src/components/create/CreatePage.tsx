import { LevaStoreProvider, useCreateStore, useControls } from "leva";

import DraggableLayout from "components/layout/DraggableColumnLayout";

import ControlContainer from "./controlpanel/ControlContainer";
import PreviewContainer from "./preview/PreviewContainer";

const CreatePage = () => {
  const controlStore = useCreateStore();
  const [c1, c2] = useControls(() => ({
    previewScale: 1.0,
    previewOffset: {
      value: {
        x: 0,
        y: 0,
      },
      lock: true,
    },
  }));

  return (
    <LevaStoreProvider store={controlStore}>
      <DraggableLayout
        leftPanel={<ControlContainer />}
        rightPanel={<PreviewContainer />}
      />
    </LevaStoreProvider>
  );
};

export default CreatePage;
