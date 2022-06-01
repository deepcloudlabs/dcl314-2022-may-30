import {useEffect, useState} from "react";


function App() {
  const [continents, setContinents] = useState([]);
  const [continent, setContinent] = useState("Asia");
  const [countries, setCountries] = useState([]);
  let list = () => {
    fetch(`http://localhost:9100/world/api/v1/countries?continent=${continent}`,{
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then( res => res.json())
        .then( countries => setCountries(countries));
  }
  let handleChange = (event) => {
    setContinent(event.target.value);
  }
  useEffect(() => {
    fetch("http://localhost:9100/world/api/v1/continents",{
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then( res => res.json())
      .then( continents => setContinents(continents));
    return () => {}
  }, []);
  return (
      <div className="container">
        <p></p>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">World Card</h4>
          </div>
          <div className="card-body">
            <label className="form-label" htmlFor="continent">Continent:</label>
            <select name="continent"
                    onChange={handleChange}
                    className="form-select"
                    id="continent">
              {
                continents.map( continent => <option key={continent}>{continent}</option>)
              }
            </select>
            <button onClick={list} className="btn btn-success">List</button>
          </div>
        </div>
        <p></p>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">World Countries</h4>
            <p></p>
            <span className="badge bg-danger" data-bind="text: population"></span>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-hover table-striped table-responsive">
              <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Population</th>
                <th>Surface Area</th>
                <th>GNP</th>
                <th>Independence Year</th>
                <th>Government Form</th>
              </tr>
              </thead>
              <tbody>
              {
                countries.map( (country,index) =>
                    <tr key={country._id}>
                      <td>{index + 1}</td>
                      <td>{country.name}</td>
                      <td>{country.population}</td>
                      <td>{country.surfaceArea}</td>
                      <td>{country.gnp}</td>
                      <td>{country.indepYear}</td>
                      <td>{country.governmentForm}</td>
                    </tr>
                )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default App;
