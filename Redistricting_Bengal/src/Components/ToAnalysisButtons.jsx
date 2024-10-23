import React from "react";
import { Modal, Button } from "react-bootstrap";

const ToAnalysisButtons = ({
  show,
  handleClose,
  toEnsemble,
  toRandom,
  selectedState,
}) => {
  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <div className="button-container">
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toEnsemble(selectedState, "Ensemble SMD/MMD")}
        >
          Ensemble SMD/MMD
        </Button>
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toRandom(selectedState, "Random SMD")}
        >
          Random SMD
        </Button>
        <Button
          variant="link"
          className="toAnalysisButtons"
          onClick={() => toRandom(selectedState, "Random MMD")}
        >
          Random MMD
        </Button>
      </div>
    </Modal>
  );
};

export default ToAnalysisButtons;
