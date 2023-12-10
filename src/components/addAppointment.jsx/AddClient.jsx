import React, { useState } from "react";
import { addCliient } from "../Reducer/ClientsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddClient.css";

const AddClient = () => {
  const clients = useSelector((state) => state.clients);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //for error messages
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientExists = () => {
    return clients.some(
      (client) =>
        client.fname.toLowerCase() === fname.toLowerCase() &&
        client.lname.toLowerCase() === lname.toLowerCase() &&
        client.location.toLowerCase() === location.toLowerCase()
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error messages
    setFnameError("");
    setLnameError("");
    setLocationError("");
    setDateError("");
    setTimeError("");

    // Validation logic
    if (!fname.trim()) {
      setFnameError("First Name is required");
      return;
    }

    if (!lname.trim()) {
      setLnameError("Last Name is required");
      return;
    }

    if (!location.trim()) {
      setLocationError("Location is required");
      return;
    }

    if (!date.trim()) {
      setDateError("Date is required");
      return;
    }

    if (!time.trim()) {
      setTimeError("Time is required");
      return;
    }

    if (clientExists()) {
      alert("Client already exists!");
    } else {
      dispatch(
        addCliient({
          id: clients[clients.length - 1].id + 1,
          fname,
          lname,
          location,
          apt: [
            {
              aptIndex: 1, // index 1
              date,
              time,
            },
          ],
        })
      );
      alert("Client added successfully!");
      navigate("/");
    }
  };

  return (
    <div className="header">
      <div className="header-1">
        <h2 style={{ color: "aliceblue" }}>Add New Client's Appointent</h2>
        <form className="content" onSubmit={handleSubmit}>
          <div className="data-head">
            <div className="data">
              <label htmlFor="fname">First Name:</label>
              <input
                onChange={(e) => setFname(e.target.value)}
                type="text"
                name="fname"
                className="form-control"
                placeholder="Enter First Name"
              />
            </div>
            {fnameError && <span className="error">{fnameError}</span>}
          </div>
          <div className="data-head">
            <div className="data">
              <label htmlFor="lname">Last Name:</label>
              <input
                onChange={(e) => setLname(e.target.value)}
                type="text"
                name="lname"
                className="form-control"
                placeholder="Enter Last Name"
              />
            </div>
            {lnameError && <span className="error">{lnameError}</span>}
          </div>
          <div className="data-head">
            <div className="data">
              <label htmlFor="location">Location:</label>
              <input
                style={{ marginLeft: "10px" }}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                name="location"
                className="form-control"
                placeholder="Enter your Location"
              />
            </div>
            {locationError && <span className="error">{locationError}</span>}
          </div>
          <div className="data-head">
            <div className="data">
              <label htmlFor="date">Date:</label>
              <input
                style={{ marginLeft: "35px" }}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                name="date"
                className="form-control"
              />
            </div>
            {dateError && <span className="error">{dateError}</span>}
          </div>
          <div className="data-head">
            <div className="data">
              <label htmlFor="time">Time:</label>
              <input
                style={{ marginLeft: "35px" }}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                name="time"
                className="form-control"
              />
            </div>
            {timeError && <span className="error">{timeError}</span>}
          </div>

          <div className="something">
            <button className="btn-submit" type="submit">
              Submit
            </button>
            <button className="btn-back">
              <Link
                to={`/`}
                style={{ textDecoration: "none", color: "aliceblue" }}
              >
                Back
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
