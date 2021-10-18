import { Fragment } from "react";
import ReactDOM from "react-dom";
import Styles from "../UI/Model.module.css";

const Backdrop = (props) => {
  return <div className={Styles.backdrop} />;
};

const ModelOverLay = (props) => {
  return (
    <div className={Styles.modal}>
      <div className={Styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const Model = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModelOverLay>
          <h1>Something Went Wrong</h1>
          {props.children}
        </ModelOverLay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Model;
