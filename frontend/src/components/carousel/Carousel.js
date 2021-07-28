import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import React, { useContext } from "react";
import { StateContext } from "../../context/StateProvider";
import "./carousel.scss";

const Carousel = ({ images, id }) => {
  const isActive = (index) => {
    if (index === 0) return "active";
  };

  const [{ theme }] = useContext(StateContext);

  return (
    <div id={`image${id}`} className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators" style={{ zIndex: 1 }}>
        {images.map((img, index) => (
          <li
            key={index}
            data-target={`#image${id}`}
            data-slide-to={index}
            className={isActive(index)}
          />
        ))}
      </ol>

      <div className="carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            {img.url.match(/video/i) ? (
              <video
                controls
                src={img.url}
                className="d-block w-100"
                alt={img.url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            ) : (
              <img
                src={img.url}
                className="d-block w-100"
                alt={img.url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <a
            className="carousel-control-prev"
            href={`#image${id}`}
            role="button"
            data-slide="prev"
            style={{ width: "10%" }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <ArrowBackIos className="arrowIcon"></ArrowBackIos>
          </a>

          <a
            className="carousel-control-next"
            href={`#image${id}`}
            role="button"
            data-slide="next"
            style={{ width: "10%" }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <ArrowForwardIos className="arrowIcon"></ArrowForwardIos>
          </a>
        </>
      )}
    </div>
  );
};

export default Carousel;
