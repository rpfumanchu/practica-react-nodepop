import "./Modal.css";

function Modal(props) {
  const { message, onConfirm, onCancel } = props;

  // return (
  //   <div className="modal-container">
  //     <div className="modal">
  //       <div className="modal-header">{message}</div>
  //       <div className="modal-actions">
  //         <button className="modal-button cancel" onClick={onCancel}>
  //           Cancelar
  //         </button>
  //         <button className="modal-button confirm" onClick={onConfirm}>
  //           Confirmar
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">Confirmar acción</div>
        <div className="modal-body">{message}</div>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
