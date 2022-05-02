import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth/actions";
export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    axios
      .get(`http://localhost:8080/users?username=${formData.username}`)
      .then((res) => {
        const {data} =res;
        const user = data[0];

        if(user.pass === formData.password){
          console.log('success')
          dispatch(login({id:user.id,username:user.username,role:user.role}));
          if(user.role === 'admin'){
             navigate("/orders");
          }
          else{
            navigate("/Neworder")
          }
        }
        else{
          console.log("fail")
        }
        

      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        onChange={handleChange}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};
