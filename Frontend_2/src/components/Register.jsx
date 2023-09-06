import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/adduser';

export default function Register() {
  const userRef = useRef()
  const fullnameRef = useRef()
  const emailRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    const user = {
      "username": username,
      "email": email,
      "full_name": fullname,
      "hashed_password": password,
      "role": "Usuario",
      "disabled": false
    }
    console.log(user)
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify( user ),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No hay respuesta del servidor');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Nombre de usuario:
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          De 4 a 24 caracteres.<br />
          Debe comenzar con una letra.<br />
          Se permiten letras, números, guiones bajos y guiones.
        </p>

        <label htmlFor="email">
          Email:
          {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} /> */}
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          // aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
        // onFocus={() => setUserFocus(true)}
        // onBlur={() => setUserFocus(false)}
        />

        <label htmlFor="fullname">
          Nombre completo:
          {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} /> */}
        </label>
        <input
          type="text"
          id="fullname"
          ref={fullnameRef}
          autoComplete="off"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          required
          // aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
        // onFocus={() => setUserFocus(true)}
        // onBlur={() => setUserFocus(false)}
        />


        <label htmlFor="password">
          Contraseña:
          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={password}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} /><br />
          De 4 a 24 caracteres.<br />
          Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
          Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>


        <label htmlFor="confirm_pwd">
          Confirmación de contraseña:
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} /><br />
          Las contraseñas deben coincidir.
        </p>

        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Inscribirse</button>
      </form>
      <p>
        ¿Ya está registrado?<br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Ingrese</a>
        </span>
      </p>
    </section>
  )
}
