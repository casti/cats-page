import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BreedList = ({ breedId }) => {
  const [page, setPage] = useState(1);
  const [breedList, setBreedList] = useState([]);
  const getBreedList = async (pageNo) => {
    setPage(pageNo);
    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?page=${pageNo}&limit=10&breed_id=${breedId}`
    );
    const results = await res.json();
    const items = results.map((x) => ({ url: x.url, id: x.id }));
    const list = pageNo > 1 ? [...breedList, ...items] : [...items];
    setBreedList(list);
  };

  useEffect(() => {
    if (!breedId) {
      return;
    }
    getBreedList();
  }, [breedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = () => {
    getBreedList((page ?? 1) + 1);
  };
  return (
    <>
      <div className="row pt-3 pb-3">
        {breedList[0] ? (
          breedList.map((item, k) => (
            <div key={k} className="col-md-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.url}
                  alt="cat thumbnail image"
                />
                <div className="card-body">
                  <Link
                    className="btn btn-primary btn-block"
                    to={{ pathname: `/${item.id}`, state: breedId }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 p-4">No cats available</div>
        )}
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-6 col-12">
          <button className="btn btn-success" type="button" onClick={loadMore}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
};
export default BreedList;
