import React, { useEffect, useState } from "react";
import "./dropDown.scss";
import { useAnimate, stagger, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import { CgOptions } from "../../constants";

export default function DropDown({ items, selectedValue, setSelectedValue }) {
  const [scope, animate] = useAnimate();
  const [open, setOpen] = useState(false);

  const staggerList = stagger(0.1, { startDelay: 0.1, endDelay: 0.25 });

  useEffect(() => {
    animate(
      "ul",
      {
        width: open ? 140 : 140,
        height: open ? "max-content" : 0,
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      }
    );
    animate(
      "li",
      open
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.3, y: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0,
      }
    );
  }, [open]);

  const handleOnItemclick = (item) => {
    setOpen(false);
    setSelectedValue(item);
  };

  return (
    <div className="dropDown" ref={scope}>
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.95 }}
        >
          filter orders <CgOptions />
        </motion.button>
        <ul>
          {items.map((item, index) => (
            <motion.li
              key={index}
              className={`${selectedValue === item ? "selected" : ""}`}
              onClick={() => handleOnItemclick(item)}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </OutsideClickHandler>
    </div>
  );
}
