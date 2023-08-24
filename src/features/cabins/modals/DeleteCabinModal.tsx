import { useDeleteCabin } from "../hooks";

import { HiMiniTrash } from "react-icons/hi2";
import { ConfirmDelete, Menus, Modal } from "../../../ui";

const DeleteCabinModal = ({
  cabinId,
}: {
  cabinId: number | undefined;
}): JSX.Element => {
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Modal>
      <Modal.Open openWindowName="delete">
        <Menus.Item>
          <HiMiniTrash /> Delete Cabin
        </Menus.Item>
      </Modal.Open>
      <Modal.Window windowName="delete">
        <ConfirmDelete
          resourceName={"cabin"}
          disabled={isDeleting}
          onConfirm={() => {
            if (cabinId) deleteCabin(cabinId);
          }}
        />
      </Modal.Window>
    </Modal>
  );
};

export default DeleteCabinModal;
