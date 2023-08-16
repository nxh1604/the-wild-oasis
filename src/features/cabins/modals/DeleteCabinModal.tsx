import { useDeleteCabin } from "../hooks";

import { HiMiniTrash } from "react-icons/hi2";
import { Button, ConfirmDelete, Modal } from "../../../ui";

const DeleteCabinModal = ({
  cabinId,
}: {
  cabinId: number | undefined;
}): JSX.Element => {
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Modal>
      <Modal.Open openWindowName="delete">
        <Button
          variation="danger"
          size="small"
          onClick={() => {
            if (cabinId) deleteCabin(cabinId);
          }}
          disabled={isDeleting}>
          <HiMiniTrash />
        </Button>
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
