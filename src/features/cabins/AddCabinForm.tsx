import { CreateOrUpdateCabinForm } from ".";
import { Button, Modal } from "../../ui";

const AddCabinForm = (): JSX.Element => {
  return (
    <Modal>
      <Modal.Open windowName="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window windowName="cabin-form">
        <CreateOrUpdateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabinForm;
