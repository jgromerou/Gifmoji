import { useEffect, useState } from 'react';
import { useLike } from '../hooks/useLike';

const noImage = import.meta.env.VITE_NO_IMAGE;

const GifCard = ({ dataItem }) => {
  const { like, onClickLike, totalLikes } = useLike();
  const sessionFavCart = JSON.parse(sessionStorage.getItem('favCart')) || [];
  const [fav, setFav] = useState(sessionFavCart);

  useEffect(() => {
    sessionStorage.setItem('likeCart', JSON.stringify(like));
    sessionStorage.setItem('favCart', JSON.stringify(fav));
  }, [like, fav]);

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
      ? 'New favorite added!'
      : 'Favorite removed!';

    console.log(action);

    // console.log(action, existFavoriteCardInCart);
    sessionStorage.setItem('favCart', JSON.stringify(fav));
  };

  const getHeart = (gifId) => {
    const dataHeart = fav.some(
      (item) => item.id == gifId && item.color === true
    );
    return dataHeart ? true : false;
  };

  return (
    <>
      {dataItem.map((gif) => (
        <div key={gif.id} className="col">
          <div className="card shadow">
            <img
              src={gif.images.fixed_width_small.url || noImage}
              alt={gif.name}
              width={'100%'}
              height={'230'}
            />
            <div className="card-body bg-dark border-top border-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className={
                      totalLikes(gif.id) > 0
                        ? 'btn btn-sm btn-primary me-1 mb-1 btn-lg-responsive'
                        : 'btn btn-sm btn-outline-primary me-1 mb-1 btn-lg-responsive'
                    }
                    onClick={() => onClickLike(gif.id)}
                  >
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                    <span className="badge">{totalLikes(gif.id)}</span>
                  </button>
                  <button
                    type="button"
                    className={
                      getHeart(gif.id)
                        ? 'btn btn-sm btn-danger ms-1 mb-1 btn-lg-responsive'
                        : 'btn btn-sm btn-outline-danger ms-1 mb-1 btn-lg-responsive'
                    }
                    onClick={() => addFavoriteCart(gif.id)}
                  >
                    <i
                      className={
                        getHeart(gif.id) ? 'bi bi-heart-fill' : 'bi bi-heart'
                      }
                    ></i>
                  </button>
                </div>
                <small className="text-light widthId text-truncate">
                  cod: ${gif.id}
                </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GifCard;
