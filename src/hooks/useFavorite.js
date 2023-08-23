import { useState } from "react";
import Toast from "../helpers/toast";

export const useFavorite = () => {
  const sessionFavCart = JSON.parse(sessionStorage.getItem("favCart")) || [];
  const [fav, setFav] = useState(sessionFavCart);

  const addFavoriteCart = (gifid) => {
    const existFavoriteCardInCart = fav.find((item) => item.id === gifid);

    if (!existFavoriteCardInCart) {
      const newLikeObj = {
        id: gifid,
        color: true,
      };
      setFav([...fav, newLikeObj]);
    } else {
      const removeItemFav = fav.filter((itemFav) => itemFav.id !== gifid);
      setFav(removeItemFav);
    }

    const action = !existFavoriteCardInCart?.color
      ? "Gif agregado a favorito!"
      : "Gif borrado de favorito!";

    const icon = !existFavoriteCardInCart?.color
      ? `<i class="bi bi-heart-fill fs-6"></i>`
      : `<i class="bi bi-heartbreak-fill fs-6"></i>`;

    Toast.fire({
      iconHtml: icon,
      icon: "error",
      title: action,
    });

    sessionStorage.setItem("favCart", JSON.stringify(fav));
  };

  const getHeart = (gifId) => {
    const dataHeart = fav.some(
      (item) => item.id == gifId && item.color === true
    );
    return dataHeart ? true : false;
  };

  return {
    fav,
    onClickFavorite: (value) => addFavoriteCart(value),
    getHeart: (value) => getHeart(value),
  };
};
