import React, {
  createContext,
  useState,
  useContext,
  ButtonHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useClickOutSide } from "../../hooks";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{
  width: number;
  position: { x: number; y: number };
}>`
  position: fixed;
  width: ${(props) => props.width}px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 1.6rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    transition: all 0.3s;
  }
`;

interface IdefaultMenus {
  menusName: string;
  width: number;
  position: null | { x: number; y: number };
  handlePosition: (e: { x: number; y: number }) => void;
  handleClose: () => void;
  handleOpen: (e: string) => void;
}

const MenusContext = createContext<IdefaultMenus>({
  menusName: "",
  position: null,
  width: 200,
  handlePosition: () => {},
  handleClose: () => {},
  handleOpen: () => {},
});

const Menus = ({
  children,
  width = 200,
}: React.PropsWithChildren<{ width?: number }>) => {
  const [menusName, setMenusName] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const handlePosition = (position: { x: number; y: number }) => {
    setPosition(position);
  };

  const handleOpen = (name: string) => {
    setMenusName(name);
  };
  const handleClose = () => {
    setMenusName("");
  };

  return (
    <MenusContext.Provider
      value={{
        position,
        handlePosition,
        menusName,
        handleClose,
        handleOpen,
        width,
      }}>
      <StyledMenu>{children}</StyledMenu>
    </MenusContext.Provider>
  );
};

const Open = ({
  children,
  menu = "",
  ...restProps
}: React.PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { menu: string }
>) => {
  const {
    handleOpen,
    handlePosition,
    width: ModalWidth,
  } = useContext(MenusContext);

  return (
    <StyledToggle
      {...restProps}
      onClick={(e: React.DragEvent<HTMLButtonElement>) => {
        const { width, right, bottom } =
          e.currentTarget.getBoundingClientRect();
        const position = {
          x: right - width / 2 - ModalWidth,
          y: bottom + 2,
        };
        handlePosition(position);
        handleOpen(menu);
      }}>
      {children}
    </StyledToggle>
  );
};

const Content = ({
  children,
  menuName,
  ...restProps
}: React.PropsWithChildren<
  React.RefAttributes<HTMLUListElement> & { menuName: string }
>) => {
  const { menusName, position, width, handleClose } = useContext(MenusContext);
  const { ref } = useClickOutSide<HTMLUListElement>(handleClose);

  if (menusName !== menuName || !position) return null;

  return createPortal(
    <StyledList
      ref={ref}
      onClick={handleClose}
      width={width}
      position={position}
      {...restProps}>
      {children}
    </StyledList>,
    document.body
  );
};

const Item = ({
  children,
  ...restProps
}: React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

Menus.Open = Open;
Menus.Content = Content;
Menus.Item = Item;

export default Menus;
