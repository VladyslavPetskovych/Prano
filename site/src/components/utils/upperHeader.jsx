import React, { useState } from "react";
import phone from "/src/assets/icons/phone.png";
import mail from "/src/assets/icons/mail.png";

function UpperHeader() {
  const [notification, setNotification] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setNotification(`${text} скопійовано!`);
        setTimeout(() => {
          setNotification("");
        }, 1500);
      })
      .catch((err) => {
        console.error("Не вдалося скопіювати: ", err);
      });
  };

  return (
    <>
      <div className="fixed top-0  z-50 w-full h-7 bg-white shadow-sm flex justify-end items-center px-4 md:px-10">
        <div className="flex flex-row  justify-end items-center gap-8 text-sm text-gray-800 ml-2 md:ml-0">
          {/* Phone */}
          <a
            href="tel:+380771515111"
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy("+380771515111");
            }}
          >
            <img src={phone} alt="phone" className="h-4 w-4 object-contain " />
            <span className="italic hover:underline font-bold">
              +380771515111
            </span>
          </a>

          {/* Email */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy("pranolviv@gmail.com")}
          >
            <img src={mail} alt="mail" className="h-4 w-4 object-contain" />
            <span className="italic hover:underline font-bold">
              pranolviv@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Bottom notification */}
      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 z-50">
          {notification}
        </div>
      )}
    </>
  );
}

export default UpperHeader;
