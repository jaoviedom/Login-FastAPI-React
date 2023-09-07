import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/token';

export default function Login() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/"

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      );
      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access_token;
      const role = response?.data?.role;
      setAuth({ username, password, role, accessToken });
      setUsername('');
      setPwd('');
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No hay respuesta');
      } else if (err.response?.status === 400) {
        setErrMsg('Falta nombre de usuario o contraseña');
      } else if (err.response?.status === 401) {
        setErrMsg('No autorizado');
      } else {
        setErrMsg('Error de inicio de sesion');
      }
      errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={password}
          required
        />
        <button>Ingresar</button>
      </form>
      <p>
        ¿Aún no tiene una cuenta?<br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">¡Regístrese!</a>
        </span>
      </p>
    </section>
  )
}
