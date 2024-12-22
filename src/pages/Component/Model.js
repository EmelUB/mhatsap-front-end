import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({
  show,
  onClose,
  title,
  content,
  actions,
  width,
  height,
  description,
  contentTitle,
  icon,
}) => {
  const alertRef = useRef(null);

  const handleClickOutside = (event) => {
    if (alertRef.current && !alertRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  const alertWidth = width ? width : "w-1/4";
  const alertHeight = height ? height : "h-2/4";

  return (
    <div className="fixed z-40 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 dark:bg-opacity-50 flex items-center justify-center min-h-screen">
      <div
        ref={alertRef}
        className={`bg-white rounded-md shadow-lg ${alertWidth} ${alertHeight}`}
      >
        <div className="flex flex-col h-full pt-2 ">
          {/* Başlık */}
          <div className="py-1 text-center text-white text-2xl font-semibold">
            <div className="flex justify-between items-center pb-3 border-bottom-gray-200">
              <h3 className="justify-center flex-1 text-one text-base flex font-semibold ">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faXmark} className={"pr-3"} />
              </button>
            </div>
          </div>

          {/* Ortada kalan içerik */}
          <div className="flex-1 flex items-center justify-center p-4 flex-col rounded-12 border border-gray-200 overflow-hidden">
            <div className="flex  items-center justify-center">
              <center>
                {/* <Icon
                  icon={icon}
                  iconColor="primary"
                  className="opacity-20 size-[96px]"
                /> */}
                <h3 className="text-primary font-bold text-lg">
                  {contentTitle}
                </h3>
                <p className="text-black-100 text-sm mt-5">{description}</p>
              </center>
              {content}
            </div>
          </div>

          {/* Butonlar */}
          <div className="w-full flex justify-center pb-2">
            {actions && (
              <div
                className={`mt-3 w-full flex justify-center gap-2
              `}
              >
                {actions.map((action) => (
                  <button
                    border={action.border}
                    key={action.label}
                    className={action.className}
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
