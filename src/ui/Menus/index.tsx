import React, {
  createContext,
  useState,
  useContext,
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
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

export const StyledButton = styled.button`
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
  menu?: string | number;
  width: number;
  position: null | { x: number; y: number };
  handlePosition: (e: { x: number; y: number }) => void;
  setMenu: Dispatch<SetStateAction<string | number>>;
  handleClose: () => void;
}

const MenusContext = createContext<IdefaultMenus>({
  menu: "",
  position: null,
  width: 200,
  // dunng` de position modal menu ngay ben duoi' phan tu? click
  handlePosition: () => {},
  setMenu: () => {},
  handleClose: () => {},
});

const Menus = ({
  children,
  width = 200,
}: React.PropsWithChildren<{ width?: number }>) => {
  const [menu, setMenu] = useState<string | number>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handlePosition = (position: { x: number; y: number }) => {
    setPosition(position);
  };

  const handleClose = () => {
    setMenu("");
  };

  return (
    <MenusContext.Provider
      value={{
        position,
        handlePosition,
        menu,
        handleClose,
        setMenu,
        width,
      }}>
      {children}
    </MenusContext.Provider>
  );
};

const Menu = ({ children }: React.PropsWithChildren) => {
  return <StyledMenu>{children}</StyledMenu>;
};

const Open = ({
  children,
  menuId,
  ...restProps
}: React.PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { menuId?: string | number }
>) => {
  const {
    setMenu,
    menu,
    handlePosition,
    width: ModalWidth,
  } = useContext(MenusContext);
  const handleOpen = (menuId: string | number | undefined) => {
    menu !== menuId ? setMenu(menuId || "") : setMenu("");
  };

  return (
    <StyledToggle
      {...restProps}
      onClick={(e: React.DragEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const { width, right, bottom } =
          // lay' tọa độ của element dùng để mở và position modal menus
          e.currentTarget.getBoundingClientRect();
        const position = {
          // vì sử dụng left style cho x nên - ModalWidth
          x: right - width / 2 - ModalWidth,
          y: bottom + 2,
        };
        handlePosition(position);
        handleOpen(menuId);
      }}>
      {children}
    </StyledToggle>
  );
};

// Modal menus
const Content = ({
  children,
  menuId,
  ...restProps
}: React.PropsWithChildren<
  React.RefAttributes<HTMLUListElement> & {
    menuId: string | number | undefined;
  }
>) => {
  const { menu, position, width, handleClose } = useContext(MenusContext);
  const { ref } = useClickOutSide<HTMLUListElement>(handleClose, false);

  if (menu !== menuId || !position) return null;

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
Menus.Menu = Menu;
Menus.Open = Open;
Menus.Content = Content;
Menus.Item = Item;

export default Menus;
