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
      <table className="border-8-solid table-fixed bg-gradient-to-r from-white to-emerald-500 justify-centers">
        <tbody>
          <tr>
            <th className="w-auto border-4 border-slate-300 border-emerald-400 ...">
              Club Id
            </th>
            <th className="w-auto border-4 border-slate-300 border-emerald-400 ...">
              Escudo
            </th>
            <th className="w-auto border-4 border-slate-300 border-emerald-400 ...">
              Nombre
            </th>
            <th className="w-auto border-4 border-slate-300 border-emerald-400 ...">
              Acciones
            </th>
          </tr>
          {data.map((club, i) => (
            <tr key={i}>
              <td className="font-bold text-emerald-700 border-4 border-slate-300 border-emerald-400 ...">
                {club.id}
              </td>
              <td className="border-4 border-slate-300 border-emerald-400 ...">
                <img
                  src={club.crestUrl}
                  alt="club-crest"
                  className="w-40 h-40"
                />
              </td>
              <td className="font-serif text-xl text-center border-4 border-slate-300 border-emerald-400 ...">
                {club.name}
              </td>
              <td className="border-4 border-slate-300 border-emerald-400 ...">
                <Link to={`club/${club.id}`}>
                  <button
                    type="button"
                    className="text-white w-10 bg-emerald-500 rounded-md hover:ring-2 ring-emerald-400 shadow-xl shadow-emerald-200"
                  >
                    Ver
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-white w-auto bg-blue-500 rounded-md hover:ring-2 ring-blue-400 shadow-xl shadow-blue-200"
                >
                  Editar
                </button>
                <button
                  type="submit"
                  onClick={() => handleDelete(club.id)}
                  className="text-white w-auto bg-red-500 rounded-md hover:ring-2 ring-red-400 shadow-xl shadow-red-200"
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
