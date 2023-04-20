import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAd } from "./service";
import Layout from "../layout/Layout";
import "./AdsPage.css";

const AdDetailPage = props => {
  const params = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    getAd(params.id).then(ad => setAd(ad));
  }, [params.id]);

  return (
    <Layout title="Tweet detail" {...props}>
      {/* <div>{ad.name}</div> */}
    </Layout>
    // <Layout title="Detalle del Anuncio" {...rest}>
    //   {ad && (
    //     <div className="ad-container">
    //       {ad.name} {ad.price} {ad.tags} {ad.state}
    //     </div>
    //   )}
    // </Layout>
  );
};

export default AdDetailPage;
