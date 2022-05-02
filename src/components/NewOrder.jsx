import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addProducts, ADD_PRODUCTS } from "../Redux/Product/actions";

export const NewOrder = () => {
  // Get data of only this user. store it in redux
  // GET /orders?owner_name=john will give you all order of user john
  //  on submit click create a new order, new order has status `Not Accepted`
  const { user } = useSelector((store) => store.auth);

  const orders = useSelector((store) => store.orders.orders);
  const [filter, setFilter] = useState(true);
  const [formData, setFormData] = useState({
    problem: "",
    owner_name: user.username,
    brand: "",
    status: "Not Accepted",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const getData = (data) => {
    dispatch(addProducts(data));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders?owner_name=" + user.username)
      .then(({ data }) => {
        getData(data);
      });
  }, []);
  const handleSubmit = () => {
    axios.post("http://localhost:8080/orders", formData);
    axios
      .get("http://localhost:8080/orders?owner_name=" + user.username)
      .then(({ data }) => {
        getData(data);
      });
  };
  return (
    <div>
      <div className="form">
        <input
          className="new-problem"
          type="text"
          name="problem"
          placeholder="Enter problem"
          onChange={handleChange}
        />
        {/* This input is readonly, it's coming from redux */}
        <input
          className="owner-name"
          type="text"
          name="owner_name"
          placeholder="yourname"
          value={user.username}
          readOnly
        />
        <input
          className="brand"
          type="text"
          name="brand"
          placeholder="Enter brand name"
          onChange={handleChange}
        />
        {/* Create new problem, show it in below form immediately */}
        <button className="submit" onClick={handleSubmit}>
          submit
        </button>
      </div>

      <div className="pastOrders">
        {/* this button filters the data below. */}
        {/* it's just a toggle of redux state something like `showUnfinished`  */}
        <button className="filter">
          {/* Text should change like:   Show {showUnfinished ? "all" : "Only unfinished"} */}
          {filter ? "Only unfinished" : "showUnfinished"}
        </button>

        {/* Here create a div for every oreder, filter them before based on `showUnfinished` */}
        {orders.map((order) => (
          <div className="past-orders" key={order.id}>
            <span className="id">{order.id}</span>.{" "}
            <span className="problem">{order.problem}</span>{" "}
            <span className="cost">
              {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
              {order.status !== "Not Accepted" ? "$" + order.cost : ""}
            </span>
            <p className="status">Status: {order.status} </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
