import React, {
  createContext,
  useContext,
  useState,
  cloneElement,
} from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  @media (max-width: 600px) {
    overflow: auto;
    width: 100vw;
  }
`;

const Overlay = styled.div`
  overflow: auto;
  position: fixed;
  min-height: 100vh;
  min-width: 100vw;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
      stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface IDefaultModalValue {
  openModalName: string;
  openModal: (name: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IDefaultModalValue>({
  openModalName: "",
  openModal: () => {},
  closeModal: () => {},
});

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openModalName, setOpenModalName] = useState<string>("");

  const openModal = (modalName: string) => {
    setOpenModalName(modalName);
  };
  const closeModal = () => setOpenModalName("");

  return (
    <ModalContext.Provider value={{ openModalName, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({
  children,
  openWindowName,
}: {
  children: React.ReactElement;
  openWindowName: string;
}) => {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(openWindowName) });
};

const modalPosition = document.getElementById("modal-overlay") as HTMLElement;

const Window = ({
  children,
  windowName,
}: {
  children: React.ReactElement;
  windowName: string;
}) => {
  const { openModalName, closeModal } = useContext(ModalContext);
  // const { ref: modalRef } = useClickOutSide<HTMLDivElement | null>(closeModal);

  if (openModalName !== windowName) return null;

  return createPortal(
    <Overlay onClick={closeModal}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        {cloneElement(children, { closeModal })}
      </StyledModal>
    </Overlay>,
    modalPosition
  );
};
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
