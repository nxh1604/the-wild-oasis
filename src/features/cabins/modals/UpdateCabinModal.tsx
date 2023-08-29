import { HiPencil } from "react-icons/hi2";
import { Menus, Modal } from "../../../ui";
import { CreateOrUpdateCabinForm } from "..";

const UpdateCabinModal = ({ cabin }: { cabin: ICabinData }): JSX.Element => {
  return (
    <Modal>
      <Modal.Open openWindowName="cabin">
        <Menus.Item>
          <HiPencil /> Edit Cabin
        </Menus.Item>
      </Modal.Open>
      <Modal.Window windowName="cabin">
        <CreateOrUpdateCabinForm cabin={cabin} />
      </Modal.Window>
    </Modal>
  );
};

export default UpdateCabinModal;
