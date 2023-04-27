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
  const [query, setQuery] = useState("");
  const [queryTags, setQueryTags] = useState("");

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleChangeTags = event => {
    setQueryTags(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ads = await getAds();

      setAds(ads);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredAds = ads
    .filter(ad => {
      if (queryTags === "") {
        return true;
      }
      return ad.sale ? queryTags === "true" : queryTags === "false";
    })
    .filter(ad =>
      (ad.name ?? "").toUpperCase().startsWith(query.toUpperCase()),
    );

  return (
    <Layout title="Que quieres hacer..." {...props}>
      {isLoading ? (
        <Spiner message="cargando..." />
      ) : (
        <div>
          {!!ads.length ? (
            <>
              <label>
                Search:{" "}
                <input
                  type="text"
                  style={{ borderWidth: 1 }}
                  value={query}
                  onChange={handleChange}
                />
                <label>Vender</label>
                <input
                  className="form-input"
                  type="radio"
                  name="sale"
                  value={true}
                  onChange={handleChangeTags}
                />
                <label>Comprar</label>
                <input
                  className="form-input"
                  type="radio"
                  name="sale"
                  value={false}
                  onChange={handleChangeTags}
                />
              </label>
              <div className="ad-container ">
                <ul>
                  {filteredAds.map(ad => (
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
