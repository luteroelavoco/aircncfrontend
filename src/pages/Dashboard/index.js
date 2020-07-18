import React, { useEffect, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import socketio from 'socket.io-client';
import "./style.css";
import api, { url } from "../../services/api";



export default function Dashboard() {

  const [spots, setSpots] = useState([]);
  const [request, setRequests] = useState([]);
  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio(url, {
    query: {
      user_id
    }
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...request, data]);
    })
  }, [request, socket])


  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');

      const response = await api.get('/dashboard', {
        headers: {
          user_id
        }
      })
      setSpots(response.data);
    }
    loadSpots();
  }, [])

  async function handleAccept(id) {

    await api.post(`/bookings/${id}/approval`);
    setRequests(request.filter(request => request._id !== id));

  }

  async function handleReject(id) {

    await api.post(`/bookings/${id}/rejection`);
    setRequests(request.filter(request => request._id !== id));

  }
  return (
    <>

      <ul className="notifications">
        {request.map(item => (
          <li key={item._id}>
            <p>
              <strong>{item.user.email}</strong> está solicitando uma reserva em <strong>{item.spot.company}</strong> para a data: <strong>{item.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(item._id)}>Aceitar</button>
            <button className="reject" onClick={() => handleReject(item._id)}>Rejeitar</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong> {spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "Grátis"}</span>

          </li>
        ))}
      </ul>

      <Link to="new" >
        <button className="btn"> Cadastrar Novos Spots</button>
      </Link>
    </>
  );
}
