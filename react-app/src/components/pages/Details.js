import React, { useState, useEffect } from 'react';

const Details = () => {
  const [data, getData] = useState([]);
  const URL = 'http://localhost:8080/club/:id';
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
      <h2>{data.name}</h2>
    </>
  );
};
export default Details;
