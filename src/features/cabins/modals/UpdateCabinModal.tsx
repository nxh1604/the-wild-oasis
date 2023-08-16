import { HiPencil } from "react-icons/hi2";
import { Button, Modal } from "../../../ui";
import { CreateOrUpdateCabinForm } from "..";
import { ICabinData } from "../../../services/apiCabins/apiCabins";

const UpdateCabinModal = ({ cabin }: { cabin: ICabinData }): JSX.Element => {
  return (
    <Modal>
      <Modal.Open openWindowName="cabin">
        <Button variation="primary" size="small">
          <HiPencil />
        </Button>
      </Modal.Open>
      <Modal.Window windowName="cabin">
        <CreateOrUpdateCabinForm cabin={cabin} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateCabinModal;
