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

  async function handleDelete(n) {
    let response = await fetch(`http://localhost:8080/delete/${n}`, {
      method: 'DELETE',
    });
    let data = await response.json();
  }

  return (
    <>
      <h2>Listado de equipos</h2>
      <table>
        <tbody>
          <tr>
            <th>Club Id</th>
            <th>Escudo</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
          {data.map((club, i) => (
            <tr key={i}>
              <td className="border-solid">{club.id}</td>
              <td className="border-solid">
                <img
                  src={club.crestUrl}
                  alt="club-crest"
                  className="w-40 h-40"
                />
              </td>
              <td className="border-solid">{club.name}</td>
              <td className="border-solid">
                <Link to={`club/${club.id}`}>
                  <button
                    type="button"
                    className="text-white w-10 bg-emerald-500 rounded-md hover:ring-2 ring-emerald-700 shadow-xl shadow-emerald-200"
                  >
                    Ver
                  </button>
                </Link>

                <button
                  type="submit"
                  onClick={() => handleDelete(club.id)}
                  className="text-white w-10 bg-red-500 rounded-md hover:ring-2 ring-red-700 shadow-xl shadow-red-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
