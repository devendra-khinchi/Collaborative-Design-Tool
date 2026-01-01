import { useEffect } from "react";
import ReactDOM from "react-dom";

function ModalBackdrop({ children, bg = "bg-[rgba(0,0,0,0.4)]" }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return ReactDOM.createPortal(
    <div
      className={`w-full h-screen fixed top-0 left-0 flex items-center justify-center z-999 ${
        bg ? bg : "bg-white"
      }`}
    >
      {children}
    </div>,
    document.getElementById("modal")
  );
}

export default ModalBackdrop;
