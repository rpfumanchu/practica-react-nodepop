import Layout from "../layout/Layout";
import { getAds } from "./service";
import "./AdsPage.css";
import { Link } from "react-router-dom";
import DrawAd from "./DrawAd";
import { useEffect, useState } from "react";

const AdsPage = props => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ads = await getAds();
      setAds(ads);
    }
    fetchData();
  }, []);

  return (
    <Layout title="Que quieres hacer..." {...props}>
      <div>
        <ul>
          {ads.map(ad => (
            <li key={ad.id}>
              <Link to={`/api/v1/adverts/${ad.id}`}>
                <DrawAd {...ad} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default AdsPage;
