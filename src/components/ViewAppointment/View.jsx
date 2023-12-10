import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  deleteSchedule,
  updateSchedule,
  addSchedule,
} from "../Reducer/ClientsReducer";
import ReactPaginate from "react-paginate";
import "./View.css";
import "./../Home/Home.css";

const View = () => {
  const { id } = useParams();
  const clients = useSelector((state) => state.clients);
  const client = clients.find((c) => c.id === Number(id));
  console.log(clients);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isNewBoxOpen, setNewBoxOpen] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const appointmentsPerPage = 5; // Set the number of appointments to display per page

  const pagesVisited = pageNumber * appointmentsPerPage;

  const pageCount = Math.ceil(client?.apt?.length / appointmentsPerPage);

  const displayAppointments =
    client?.apt?.slice(pagesVisited, pagesVisited + appointmentsPerPage) || [];

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    //initial values for editing when client changes
    if (client) {
      setEditDate(client?.apt[0]?.date || "");
      setEditTime(client?.apt[0]?.time || "");
    }
  }, [client]);

  const handleAddAppointment = () => {
    setNewBoxOpen(true);
  };

  const isAppointmentOverlap = (newDate, newTime) => {
    // Convert the new date and time to a single Date object
    const newDateTime = new Date(`${newDate}T${newTime}`);

    // Check if there is an existing appointment on the same date and time or within a 30-minute gap
    const isOverlap = client.apt.some((appointment) => {
      const existingDateTime = new Date(
        `${appointment.date}T${appointment.time}`
      );
      const timeDifference =
        Math.abs(newDateTime - existingDateTime) / (1000 * 60); // Difference in minutes

      return timeDifference < 30;
    });

    return isOverlap;
  };

  const handleSaveAppointment = () => {
    setDateError("");
    setTimeError("");

    // Validation logic
    if (!date.trim()) {
      setDateError("Date is required");
      return;
    }

    if (!time.trim()) {
      setTimeError("Time is required");
      return;
    }

    const newApt = {
      date: date, // default date for new appointment
      time: time, // default time for new appointment
    };
    // Check for appointment overlap
    if (isAppointmentOverlap(date, time)) {
      alert(
        "Trainer has another appointment scheduled on this time. Please choose a different time."
      );
    } else {
      // Proceed to add the new appointment
      dispatch(
        addSchedule({
          id: client.id,
          newApt,
        })
      );
      setNewBoxOpen(false);
      alert("Appointment scheduled");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditDate(client?.apt[index]?.date || "");
    setEditTime(client?.apt[index]?.time || "");
    // setEditBoxOpen(true)
    setModalOpen(true);
  };

  const handleUpdate = () => {
    // Check for appointment overlap
    if (isAppointmentOverlap(editDate, editTime)) {
      alert(
        "Trainer has another appointment scheduled on this time. Please choose a different time."
      );
    } else {
      // Proceed to update the appointment
      dispatch(
        updateSchedule({
          id: client.id,
          aptIndex: editIndex,
          updatedApt: {
            date: editDate,
            time: editTime,
          },
        })
      );
      //   setEditBoxOpen(false);
      setModalOpen(false);
      setEditIndex(null);
    }
  };

  const handleDelete = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (isConfirmed) {
      // User confirmed, dispatch the delete action
      dispatch(
        deleteSchedule({
          id: client.id,
          aptIndex: index,
        })
      );
    }
  };

  return (
    <div className="box">
      <h1>Appointments</h1>
      <div className="buttons">
        <button onClick={handleAddAppointment} className="btn-add">
          +
        </button>
        <button className="back">
          <Link to="/" style={{ textDecoration: "none", color: "aliceblue" }}>
            back
          </Link>
        </button>
      </div>

      <div className="client-info" style={{ height: "70vh" }}>
        <div>
          {client && (
            <div className="client-details">
              <p>
                <b>Client: </b> {client.fname} {client.lname}
              </p>
              <p>
                <b>Location:</b> {client.location}
              </p>
            </div>
          )}
        </div>

        <table className="client-row">
          <thead className="table-body">
            <tr>
              <th className="th">Date</th>
              <th className="th">Time</th>

              <th className="th">Action</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {displayAppointments.map((appointment, index) => (
              <tr key={index}>
                {/* <td>{appointment.aptIndex}</td> */}
                <td className="th">{appointment.date}</td>
                <td className="th">{appointment.time}</td>
                <td className="th td">
                  <button onClick={() => handleEdit(index)} className="btn-4">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="btn-5">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"pagination__page"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>

      {/* New Box for Adding a New Appointment */}
      {isNewBoxOpen && (
        <div className="modal-overlay">
          <div className="edit-box">
            <h2>Add New Appointment</h2>
            <div className="div-head">
              <div className="div-1">
                <label>Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {dateError && <span className="error">{dateError}</span>}
            </div>
            <br />
            <div className="div-head">
              <div className="div-1">
                <label>Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              {timeError && <span className="error">{timeError}</span>}
            </div>
            <br />
            <div className="div-2">
              <button onClick={handleSaveAppointment} className="btn-6">
                Save
              </button>
              <button onClick={() => setNewBoxOpen(false)} className="btn-7">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Box */}
      {/* {isEditBoxOpen && ( */}
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="edit-box">
            <h2>Edit Client</h2>
            <div className="div-1">
              <label>Date:</label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
            <br />
            <div className="div-1">
              <label>Time:</label>
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
              />
            </div>
            <br />
            <div className="div-2">
              <button onClick={handleUpdate} className="btn-6">
                Save
              </button>
              <button onClick={() => setModalOpen(false)} className="btn-7">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
