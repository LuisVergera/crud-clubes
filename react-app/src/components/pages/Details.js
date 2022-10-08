import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import apiClubes from '../../api/fetch-api';
import './details.css';

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
        <img src={data.crestUrl} alt="" name="crest" />
        <table>
          <caption>{data.name}</caption>
          <tbody>
            <tr>
              <td>Fundación</td>
              <td>{data.founded}</td>
            </tr>
            <tr>
              <td>Colores</td>
              <td>{data.clubColors}</td>
            </tr>
            <tr>
              <td>Sede</td>
              <td>{data.venue}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>{data.address}</td>
            </tr>
            <tr>
              <td>Telefono</td>
              <td>{data.phone}</td>
            </tr>
            <tr>
              <td>Sitio Web</td>
              <td>{data.website}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>Actualizado por ultima vez</td>
              <td>{data.lastUpdated}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Details;
