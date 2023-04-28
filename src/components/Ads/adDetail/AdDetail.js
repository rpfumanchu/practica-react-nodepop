import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAd, deleteAd } from "../service";
import Layout from "../../layout/Layout";
import "../adsPage/AdsPage.css";
import "./AdDetail.css";
import DefaultPhoto from "../../shared/defaultPhoto/DefaultPhoto";
import Button from "../../shared/Button";
import Modal from "../../shared/modal/Modal";

const AdDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ad, setAd] = useState(null);
  const [deleteAdId, setDeleteAdId] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    getAd(params.id)
      .then(ad => setAd(ad))
      .catch(error => {
        if (error.status === 404) {
          return navigate("/404");
        }
        setError(error);
      });
  }, [params.id, navigate]);

  const handleShowModalconfirm = async event => {
    const removeAd = await deleteAd(params.id);
    setDeleteAdId(removeAd);
    navigate("/api/v1/adverts");
    console.log(deleteAdId);
  };

  const handleShowModalCancel = () => {
    setShowModal(true);
  };

  const handleButton = () => {
    setShowModal(false);
  };

  return (
    <Layout title="Detalle del anuncio">
      {(ad || error) && (
        <div className="ad-detail">
          <div className="ad">
            <span className="text"> articulo {ad.name}</span>
            <span className="text">
              Estado: {ad.sale === true ? "Venta" : "Compra"}
            </span>
            <span className="text">{ad.price} Euros</span>
            <span className="img">
              {ad.photo === null ? (
                <DefaultPhoto className="img" />
              ) : (
                <img
                  className="img"
                  src={ad.photo}
                  alt="imagenes anuncios"></img>
              )}
            </span>
            {/* <DefaultPhoto className="img" /> */}
            {/* <span>{(ad.photo = adStatusImage())}</span> */}
            {/* <p class="text">${ad.stateuse}</p>
            <p class="text">${ad.description}</p> */}
            <span className="span">{ad.tags.join(", ")}</span>

            {showModal ? (
              <Button
                variant="primary2"
                width="button-form"
                onClick={handleButton}
                // disabled={buttonDisabled}>
              >
                Borrar
              </Button>
            ) : (
              <Modal
                title="Confirmar acciòn"
                message="¿Estas seguro? "
                onConfirm={handleShowModalconfirm}
                onCancel={handleShowModalCancel}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
  // return <Layout title="detalle del anincio" {...props}></Layout>;
  // return (
  //   <Layout title="Tweet detail" {...props}>
  //     {/* <div>{ad.name}</div> */}
  //     <div>esta es la pagina de detalle</div>
  //   </Layout>
  // <Layout title="Detalle del Anuncio" {...rest}>
  //   {ad && (
  //     <div className="ad-container">
  //       {ad.name} {ad.price} {ad.tags} {ad.state}
  //     </div>
  //   )}
  // </Layout>
  // );
};

export default AdDetail;
