import classNames from "classnames";
import React from "react";

const BurgerMenu = ({ opened, toggleOpened }) => {
  return (
    <div
      className={classNames(`tham tham-e-squeeze tham-w-6`, {
        "tham-active": opened,
      })}
      onClick={toggleOpened}
    >
      <div className="tham-box ">
        <div className="tham-inner" />
      </div>
    </div>
  );
};

export default BurgerMenu;
