import { useState } from "react";
import Navbar from "./components/header/Navbar";
import SelectCategories from "./components/ui/SelectCategories";
import Search from "./components/ui/Search";
import GifCard from "./components/GifCard";
import Banner from "./components/header/Banner";
import { useFetchAxios } from "./hooks/useFetchAxios";
import { Loading } from "./components/ui/Loading";
import { useAxiosGif } from "./hooks/useAxiosGif";

const apiKey = import.meta.env.VITE_APIKEY_GIPHY;

export const Gimoji = () => {
  const [search, setSearch] = useState("biker");

  const { data: dataCateg } = useFetchAxios(
    `gifs/categories?api_key=${apiKey}`,
    "get"
  );

  const {
    dataFetch: dataSearch,
    isLoading: isLoadingSearch,
    onLoadMore,
  } = useAxiosGif(search);

  const onChangeByCategory = (event) => {
    setSearch(event.target.value);
  };

  // const onChangeSearch = (event) => {
  //   const data = event.target.value;
  //   if (data.length >= 2) {
  //     setSearch(event.target.value);
  //   }
  // };

  const onClickSearch = (textSearch) => {
    if (textSearch.length >= 2) {
      setSearch(textSearch);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoadingSearch) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Banner />

      <div className="mainSection">
        <div className="container pb-3">
          <div className="row">
            <div className="col-md-4 mb-3">
              <SelectCategories
                dataItem={dataCateg}
                onChangeCategory={(event) => onChangeByCategory(event)}
              />
            </div>
            <div className="col-md-8">
              {/* <Search onChangeSearch={(event) => onChangeSearch(event)} /> */}
              <Search onClickSearch={(event) => onClickSearch(event)} />
            </div>
          </div>
        </div>

        {dataSearch.length > 0 ? (
          <div className="container pb-3">
            <div className="album pt-5 pb-4">
              <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
                  <GifCard dataItem={dataSearch} />
                </div>
              </div>
            </div>

            <div className="text-center mb-4 pt-4 pb-3">
              <button
                className="btn btn-outline-primary me-2"
                onClick={onLoadMore}
              >
                Cargar más resultados
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={handleBackToTop}
              >
                Volver al Top
                <span>
                  <i className="bi bi-arrow-up-circle ms-2"></i>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="lead text-white">
              Ups, no hay GIF coincidentes! Pruebe una búsqueda diferente o
              explore categorías.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
