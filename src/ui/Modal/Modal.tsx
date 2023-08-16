import React, {
  createContext,
  useContext,
  useState,
  cloneElement,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  windowName,
}: {
  children: React.ReactElement;
  windowName: string;
}) => {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(windowName) });
};

const Window = ({
  children,
  windowName,
}: {
  children: React.ReactElement;
  windowName: string;
}) => {
  const { openModalName, closeModal } = useContext(ModalContext);

  const modalRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && modalRef.current?.contains(e.target as Node))
        return;
      closeModal();
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [closeModal]);

  if (openModalName !== windowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        {cloneElement(children, { closeModal })}
      </StyledModal>
    </Overlay>,
    document.body
  );
};
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
