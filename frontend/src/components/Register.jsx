import { useState, useRef } from "react";
import "./register.css"
import RoomIcon from "@mui/icons-material/Room";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

const Register = ({setShowRegister}) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try{
            await axios.post("http://localhost:8800/api/users/register", newUser);
            setError(false);
            setSuccess(true);
        }
        catch(err){
            setError(true);
        }
    }

  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon/>
        LamaPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}/>
        <input type="email" placeholder="email" ref={emailRef}/>
        <input type="password" placeholder="password" ref={passwordRef}/>
        <button className="registerBtn">Register</button>
        {success && <span className="success">Successful. You can login now!</span>}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon className="registerCancel" onClick = {() =>setShowRegister(false)}/>
    </div>
  )
}

export default Register
