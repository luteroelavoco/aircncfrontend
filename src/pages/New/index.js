import React, { useState, useMemo } from 'react';
import "./style.css";
import camera from "../../assets/camera.svg";
import api from '../../services/api';
export default function New({history}) {

  const [thumbanil, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');


  const preview = useMemo(() => {
    return thumbanil ? URL.createObjectURL(thumbanil) : null;
  }, [thumbanil])

  async function handleSubmit(e) {

    e.preventDefault();
    const user_id = localStorage.getItem('user');
    const data = new FormData();
    data.append('thumbnail',thumbanil);
    data.append('company',company);
    data.append('techs',techs);
    data.append('price',price);
    await api.post('/spots', data,{
      headers:{
        user_id
      }
    })
    history.push("/dashboard");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbanil && 'has-thumbnail'}
        >
          <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
          <img src={camera} alt="select img" />
        </label>


        <label htmlFor="company">EMPRESA *</label>
        <input type="text"
          id="company"
          value={company}
          onChange={event => setCompany(event.target.value)}
          placeholder="Sua empresa incrivel"
        />

        <label htmlFor="techs"> TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
        <input type="text"
          id="techs"
          value={techs}
          onChange={event => setTechs(event.target.value)}
          placeholder="Quai tecnologias usam ?"
        />

        <label htmlFor="techs"> VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
        <input type="text"
          id="price"
          value={price}
          onChange={event => setPrice(event.target.value)}
          placeholder="Valor cobrado por dia ?"
        />

        <button className="btn"> Cadastrar </button>

      </form>
    </>
  );
}
