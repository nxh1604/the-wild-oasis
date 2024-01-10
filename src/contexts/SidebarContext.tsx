import { createContext, useState } from "react";

const SidebarContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
});

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
