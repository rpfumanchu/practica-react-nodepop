import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAd } from "./service";
import Layout from "../layout/Layout";
import "./AdsPage.css";
import "./AdDetail.css";
import DefaultPhoto from "../shared/DefaultPhoto";

const AdDetail = props => {
  const params = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    getAd(params.id).then(ad => setAd(ad));
  }, [params.id]);

  return (
    <Layout title="Detalle del anuncio" {...props}>
      {ad && (
        <div className="ad-detail">
          <div className="ad">
            <span className="text"> articulo {ad.name}</span>
            <span className="text">
              Estado: {ad.sale === true ? "Venta" : "Compra"}
            </span>
            <span className="text">{ad.price} Euros</span>
            <DefaultPhoto className="img" />
            {/* <span>{(ad.photo = adStatusImage())}</span> */}
            {/* <p class="text">${ad.stateuse}</p>
            <p class="text">${ad.description}</p> */}
            <span className="span">{ad.tags}</span>
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
