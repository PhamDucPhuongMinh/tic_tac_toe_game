import React, { useEffect } from "react";
import "./index.scss";

type Props = {
  children?: JSX.Element;
  onClose: () => void;
  onRestart: () => void;
};

const Modal: React.FC<Props> = ({ children, onClose, onRestart }) => {
  const [isShow, setIsShow] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 10);
  }, []);

  return (
    <div className={`notify-modal ${isShow ? "notify-modal--show" : ""}`}>
      <div className="notify-modal__content bg-white p-4 text-center rounded">
        {children}
        <div className="mt-3">
          <button className="btn btn-sm btn-dark mt-1 mx-2" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-sm btn-primary mt-1 mx-2" onClick={onRestart}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
