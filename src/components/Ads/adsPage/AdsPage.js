import Layout from "../../layout/Layout";
import { getAds } from "../service";
import "./AdsPage.css";
import { Link } from "react-router-dom";
import DrawAd from "../DrawAd";
import { useEffect, useState } from "react";
import Spiner from "../../shared/spinner/Spinner";
import EmptyAdList from "../emptyAdList/EmptyAdList";

const AdsPage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ads = await getAds();

      setAds(ads);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Layout title="Que quieres hacer..." {...props}>
      {isLoading ? (
        <Spiner message="cargando..." />
      ) : (
        <div>
          {!!ads.length ? (
            <>
              <div className="ad-container">
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
            </>
          ) : (
            <EmptyAdList />
          )}
        </div>
      )}
    </Layout>
  );
};

export default AdsPage;
