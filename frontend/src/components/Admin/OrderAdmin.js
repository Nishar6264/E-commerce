import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOrderUser } from "../../services/API/orderApi";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function OrderAdmin() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order?.listOrder);
  const [text, setText] = useState("");

  useEffect(() => {
    getListOrderUser(dispatch);
  }, []);

  useEffect(() => {
   
    socket.on("receive_order", (data) => {
      setText("User ID: " + data + " Somemmeeee");

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    });
  }, []);
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Order
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Order</h4>
                <h3>{text}</h3>
                <input
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.idUser}</td>
                          <td>{item.fullname}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.productName}</td>
                          <td>{item.productCategory}</td>
                          <td>{item.total}</td>
                          <td>
                            {item.delivery
                              ? "Delivered"
                              : "Not Delivered"}
                          </td>
                          <td>
                            {item.status ? "Shipped" : "Not Shipped yet"}
                          </td>
                          <td>
                            <a
                              style={{ cursor: "pointer", color: "white" }}
                              className="btn btn-success"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by AdminEcom. Designed and Developed by{" "}
        <a href="">Nishar Alam</a>.
      </footer>
    </div>
  );
}
