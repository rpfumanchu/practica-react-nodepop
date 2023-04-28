import Layout from "../../layout/Layout";
import { getAds } from "../service";
import "./AdsPage.css";
import { Link } from "react-router-dom";
import DrawAd from "../DrawAd";
import { useEffect, useState } from "react";
import Spiner from "../../shared/spinner/Spinner";
import EmptyAdList from "../emptyAdList/EmptyAdList";
import ErrorModal from "../../shared/modal/ErrorModal";
import DrawTags from "../DrawTags";

const AdsPage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [query, setQuery] = useState("");
  const [querySale, setQuerySale] = useState("");
  const [queryPriceRange, setQueryPriceRange] = useState("");
  const [noResults, setNoResult] = useState(true);
  const [queryTags, setQueryTags] = useState([]);

  const handleSelectChange = event => {
    const selectedTags = Array.from(
      event.target.selectedOptions,
      option => option.value,
    );

    setQueryTags(selectedTags);
    setNoResult(true);
  };

  const resetError = () => {
    setNoResult(false);
  };

  const handleChange = event => {
    setQuery(event.target.value);
    setNoResult(true);
  };

  const handleChangeSale = event => {
    setQuerySale(event.target.value);
    setNoResult(true);
  };

  const handleChangePriceRange = event => {
    setQueryPriceRange(event.target.value);
    setNoResult(true);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setNoResult(true);

      const ads = await getAds();

      setAds(ads);
      setIsLoading(false);
      //setNoResult(true);
    }
    fetchData();
  }, []);

  const filteredAds = ads

    .filter(ad => {
      if (querySale === "") {
        return true;
      }
      return ad.sale ? querySale === "true" : querySale === "false";
    })
    .filter(ad => (ad.name ?? "").toUpperCase().startsWith(query.toUpperCase()))
    .filter(ad => {
      if (!queryPriceRange) return true;
      switch (queryPriceRange) {
        case "opcion1":
          return ad.price < 50;
        case "opcion2":
          return ad.price >= 50 && ad.price <= 100;
        case "opcion3":
          return ad.price >= 100 && ad.price <= 250;
        case "opcion4":
          return ad.price >= 250;
        default:
          return true;
      }
    })
    .filter(ad => {
      if (queryTags.length === []) return [];
      return queryTags.every(tag => ad.tags.includes(tag));
    });

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
              </label>
              <label>Todos</label>
              <input
                className="form-input"
                type="radio"
                name="sale"
                value={""}
                defaultChecked
                onClick={handleChangeSale}
              />
              <label>Venta</label>
              <input
                className="form-input"
                type="radio"
                name="sale"
                value={true}
                checked={querySale === "true"}
                onClick={handleChangeSale}
              />
              <label>Compra</label>
              <input
                className="form-input"
                type="radio"
                name="sale"
                value={false}
                onClick={handleChangeSale}
              />
              <label htmlFor="price-range">Precio:</label>
              <select
                id="price-range"
                type="switch"
                value={queryPriceRange}
                onChange={handleChangePriceRange}>
                <option value="" defaultChecked>
                  Todos
                </option>
                <option value="opcion1">0 - 50 </option>
                <option value="opcion2">50 - 100 </option>
                <option value="opcion3">100 - 250 </option>
                <option value="opcion4"> &gt;250 </option>
              </select>
              <DrawTags handleSelectChange={handleSelectChange} {...props} />

              <div className="ad-container ">
                {filteredAds.length === 0 && noResults ? (
                  <ErrorModal
                    title="Upsssss"
                    message={"No hay resultados"}
                    onCancel={resetError}
                  />
                ) : (
                  <ul>
                    {filteredAds.map(ad => (
                      <li key={ad.id}>
                        <Link to={`/api/v1/adverts/${ad.id}`}>
                          <DrawAd {...ad} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
