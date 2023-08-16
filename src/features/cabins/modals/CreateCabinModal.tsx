import { CreateOrUpdateCabinForm } from "..";
import { Button, Modal } from "../../../ui";

const CreateCabinModal = (): JSX.Element => {
  return (
    <Modal>
      <Modal.Open openWindowName="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window windowName="cabin-form">
        <CreateOrUpdateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateCabinModal;
