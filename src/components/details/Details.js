import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
const Details = () => {
  const history = useHistory();
  const query = history.location?.state;
  const { id } = useParams();
  const [catItem, setCatItem] = useState({ name: "" });
  const getCat = async () => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
    const result = await res.json();
    if (result.status === 400) {
      setCatItem({ name: "NOT_FOUND" });
      return;
    }
    if (result.url) {
      const breed = result.breeds[0];
      let data = { url: result.url };
      if (breed) {
        const { name, origin, description, temperament } = breed;
        data = { ...data, name, origin, description, temperament };
      }
      setCatItem(data);
    }
  };

  useEffect(() => {
    getCat();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {["NOT_FOUND", ""].includes(catItem.name) ? (
        <div className="container">
          {!catItem.name
            ? "Loading..."
            : "Apologies but we could not load cat details for you at this time! Miau!"}
        </div>
      ) : (
        <div className="Cat">
          <div className="container m-5">
            <div className="card">
              <div className="card-header">
                <Link
                  className="btn btn-primary btn-block"
                  to={`/?breed=${query}`}
                >
                  Back
                </Link>
              </div>
              <img
                className="card-img"
                src={catItem.url}
                alt-text="cat image"
              />
              <div className="card-body">
                <h4>{catItem.name ?? ""}</h4>
                <h5>Origin: {catItem.origin ?? ""}</h5>
                <h6>{catItem.temperament}</h6>
                <p>{catItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
