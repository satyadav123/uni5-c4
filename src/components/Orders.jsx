import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, sort } from "../Redux/Product/actions";

export const Orders = () => {
  //  Get all data when admin logs in and populate it
  // store it in redux
  const orders = useSelector(store => store.orders.orders);
  const dispatch = useDispatch();
  const getData = (data) => {
    dispatch(addProducts(data));
  };
  useEffect(() => {
    axios.get("http://localhost:8080/orders").then((res) => {
      
      getData(res.data);
    });
  }, []);
  
  const handleSort =(e) => {
    const value = e.target.value;
    dispatch(sort(value));
  }
 
  return (
    <div>
      <div>
        <div>
          <select className="controls" name="progress" id="progress" onChange={handleSort}>
            <option value="id">ID</option>
            <option value="status">Status</option>
            <option value="cost">Cost</option>
          </select>
        </div>
        <table className="orders">
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Change Status</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="orders-row" key={order.id}>
                <td className="id">{order.id}</td>
                <td className="problem">{order.problem}</td>
                <td className="owner">{order.owner_name}</td>
                <td className="status">{order.status}</td>
                <td className="cost">{order.cost}</td>
                <td className="change-status">
                  {/* Show select dropdown only if status is Not Accepted */}
                  {order.status === "Not Accepted" ? (
                    ""
                  ) : (
                    <select className="changeStatus" name="changeStatus">
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                      <option value="Not Accepted">Not Accepted</option>
                    </select>
                  )}
                </td>
                <td className="accept">
                  {/* Show this button only if status is Not Accepted */}
                  {/* on change make request to update it in db, and show changed status in table */}

                  {order.status === "Not Accepted" ? (
                    <button>Accept</button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
