import React from "react";
import phone from "/src/assets/icons/phone.png";
import mail from "/src/assets/icons/mail.png";

function upperHeader() {
  return (
    <div className="fixed z-50 w-full h-7 bg-white flex  justify-between items-center">
      <p className="hidden md:block"></p>
      <div className="flex flew-row justify-start ml-3 px-3 md:px-10">
        <div className="ml-2 flex items-center gap-2">
          <img
            src={phone}
            alt=""
            className="h-5 w-5 object-contain align-middle"
          />
          <p className="leading-none flex items-center">38012345678</p>
        </div>
        <div className="md:ml-16 ml-5 flex items-center gap-2 ">
          <img
            src={mail}
            alt=""
            className="h-5 w-5 object-contain align-middle"
          />
          <p>pranolviv@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default upperHeader;
