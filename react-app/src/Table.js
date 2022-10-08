import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//importar el fetch a la api

//const clubes = ''

function Table() {
  const [data, getData] = useState([]);
  const URL = 'http://localhost:8080/';
  const fetchApi = () => {
    fetch(URL)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);
        getData(response);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <h2>Listado de equipos</h2>
      <tbody>
        <tr>
          <th>Club Id</th>
          <th>Escudo</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
        {data.map((club, i) => (
          <tr key={i}>
            <td>{club.id}</td>
            <td>
              <img src={club.crestUrl} alt="club-crest" />
            </td>
            <td>{club.name}</td>
            <td>
              <Link to={`club/${club.id}`}>
                <button type="button">Ver</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default Table;
