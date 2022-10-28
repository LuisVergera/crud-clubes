import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [data, getData] = useState([]);
  //const URL = apiClubes.searchClubById(id);
  const URL = `http://localhost:8080/club/${id}`;
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
      <h1>CRUD Clubes</h1>
      <div>
        <img src={data.crestUrl} alt="" name="crest" className="" />
        <table className="table-auto">
          <caption className="text-blue-600">{data.name}</caption>
          <tbody>
            <tr>
              <td className="border border-slate-300 ...">Fundación</td>
              <td className="border border-slate-300 ...">{data.founded}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">Colores</td>
              <td className="border border-slate-300 ...">{data.clubColors}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">Sede</td>
              <td className="border border-slate-300 ...">{data.venue}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">Dirección</td>
              <td className="border border-slate-300 ...">{data.address}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">Telefono</td>
              <td className="border border-slate-300 ...">{data.phone}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">Sitio Web</td>
              <td className="border border-slate-300 ...">{data.website}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">Email</td>
              <td className="border border-slate-300 ...">{data.email}</td>
            </tr>
            <tr>
              <td className="border border-slate-300 ...">
                Actualizado por ultima vez
              </td>
              <td className="border border-slate-300 ...">
                {data.lastUpdated}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Details;
