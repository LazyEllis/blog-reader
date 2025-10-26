import { useState, useEffect, useRef, useContext, createContext } from "react";
import { classNames } from "../lib/utils";
import styles from "../styles/Dropdown.module.css";

const MenuContext = createContext({
  isOpen: false,
  toggleMenu: () => {},
});

export const Menu = ({ className = "", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <MenuContext value={{ isOpen, toggleMenu }}>
      <div className={classNames(styles.menu, className)} ref={menuRef}>
        {children}
      </div>
    </MenuContext>
  );
};

export const MenuButton = ({ children }) => {
  const { toggleMenu } = useContext(MenuContext);

  return (
    <button onClick={toggleMenu} className={styles.menuButton}>
      {children}
    </button>
  );
};

export const MenuItems = ({ children }) => {
  const { isOpen } = useContext(MenuContext);

  if (isOpen) return <ul className={styles.menuItems}>{children}</ul>;
};

export const MenuItem = ({ children }) => (
  <li className={styles.menuItem}>{children}</li>
);
