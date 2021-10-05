import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BreedList from "./BreedList";
const Breed = () => {
  const { search } = useLocation();
  const [breeds, setBreeds] = useState([{ id: "None", name: "Select Breed" }]);
  const [selectedItem, setSelectedItem] = useState("None");
  const [breedId, setBreedId] = useState();
  const getBreeds = async (selectedBreed) => {
    const res = await fetch("https://api.thecatapi.com/v1/breeds");
    const results = await res.json();
    const items = results.map((x) => ({
      id: x.id,
      selected: selectedBreed === x.id ? true : false,
      name: x.name,
    }));
    setBreeds([...breeds, ...items]);
    const selected = items.filter((x) => x.selected === true);
    if (selected[0]) {
      setSelectedItem(selected[0].id);
      onBreedChange(selected[0].id);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(search);
    getBreeds(query.get("breed"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBreedChange = (value) => {
    setBreedId(value);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-3 col-sm-6 col-12">
          <div className="form-group">
            <label className="form-label" htmlFor="breed">
              Breed
            </label>
            <select
              id="breed"
              value={selectedItem}
              className="form-select"
              onChange={(e) => onBreedChange(e.target.value)}
            >
              {breeds.map((item, k) => (
                <option key={k} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <BreedList breedId={breedId} />
    </>
  );
};

export default Breed;
