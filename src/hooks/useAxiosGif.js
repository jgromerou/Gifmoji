import { useEffect, useState } from "react";
import { giphyAxios } from "../config/AxiosGiphy";
import Toast from "../helpers/toast";

const apiKey = import.meta.env.VITE_APIKEY_GIPHY;

export const useAxiosGif = (search) => {
  const [dataFetch, setDataFetch] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 12;

  useEffect(() => {
    getFetch();
  }, [search, offset]);

  const getFetch = async () => {
    try {
      const resp = await giphyAxios.get(
        `gifs/search?api_key=${apiKey}&q=${search}&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
      );
      const { data } = resp.data;
      setDataFetch((prev) => {
        if (search !== searchData) {
          setSearchData(search);
          setOffset(0);
          return data;
        } else {
          return [...prev, ...data];
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMore = () => {
    const maxGifsToLoad = 70;
    if (offset < maxGifsToLoad) {
      setOffset((prev) => prev + 1 + limit);
    } else {
      Toast.fire({
        iconColor: "#ffc107",
        icon: "warning",
        title: "¡Lo siento! ¡Has alcanzado el límite de GIF cargados!",
      });
    }
  };

  return {
    dataFetch,
    isLoading,
    onLoadMore,
  };
};
