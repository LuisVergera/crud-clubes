import React, { useState, useRef } from 'react';
import handlePost from '../../utilities/handlePost';
import { useParams } from 'react-router-dom';

function Edit() {
  const URL = 'http://localhost:8080/add';
  const file = useRef();

  async function createTeam(body) {
    const response = await fetch(URL, {
      body,
      method: 'POST',
    });
    const editedTeam = await response.json();
    return editedTeam.data;
  }

  const [club, setClub] = useState({
    name: '',
    venue: '',
    colors: '',
    address: '',
    phone: '',
    crest: null,
    country: '',
    founded: '',
  });

  const onChange = (e) => {
    const newClub = { ...club };
    newClub[e.target.name] = e.target.value;
    setClub(newClub);
  };

  const handleFile = (event) => {
    setClub((state) => ({ ...state, crest: event.target.files[0] }));
  };

  const submit = (event) => {
    handlePost(event, createTeam, club);
  };

  return (
    <>
      <form
        action="http://localhost:8080/add"
        method="POST"
        encType="multipart/form-data"
        id="add-club"
        onSubmit={submit}
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
          name="crest"
          ref={file}
          onChange={handleFile}
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

export default Edit;
