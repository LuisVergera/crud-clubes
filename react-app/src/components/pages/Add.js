import React, { useState } from 'react';

function Add() {
  const URL = 'http://localhost:8080/add';

  const [club, setClub] = useState({
    name: '',
    venue: '',
    colors: '',
    address: '',
    phone: '',
    crest: '',
    country: '',
    founded: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(club),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const onChange = (e) => {
    const newClub = { ...club };
    newClub[e.target.name] = e.target.value;
    setClub(newClub);
  };

  return (
    <>
      <form
        action="/add"
        method="POST"
        encType="multipart/form-data"
        id="add-club"
        onSubmit={handleSubmit}
      >
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          id="name"
          name="name"
          value={club.name}
          onChange={(e) => onChange(e)}
          required
        />

        <label>Pais</label>
        <input
          type="text"
          placeholder="Pais"
          id="country"
          value={club.country}
          name="country"
          onChange={(e) => onChange(e)}
          required
        />

        <label>Escudo</label>
        <input
          type="file"
          id="crest"
          value={club.crest}
          name="crest"
          onChange={(e) => onChange(e)}
          required
        />

        <label>Estadio</label>
        <input
          type="text"
          placeholder="estadio"
          id="venue"
          value={club.venue}
          name="venue"
          onChange={(e) => onChange(e)}
          required
        />

        <label>Colores</label>
        <input
          type="text"
          placeholder="color1/color2"
          id="colors"
          value={club.colors}
          name="colors"
          onChange={(e) => onChange(e)}
          required
        />

        <label>Dirección</label>
        <input
          type="text"
          placeholder="direccion"
          id="address"
          value={club.address}
          name="address"
          onChange={(e) => onChange(e)}
          required
        />

        <label>Telefono</label>
        <input
          type="text"
          placeholder="telefono"
          id="phone"
          value={club.phone}
          name="phone"
          onChange={(e) => onChange(e)}
          required
        />

        <label>Fundacion</label>
        <input
          type="text"
          placeholder="fundacion"
          id="founded"
          value={club.founded}
          name="founded"
          onChange={(e) => onChange(e)}
          required
        />

        <button type="submit">Agregar</button>
      </form>
    </>
  );
}

export default Add;
