import { useState } from "react";

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
      ? "New favorite added!"
      : "Favorite removed!";

    console.log(action);

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
