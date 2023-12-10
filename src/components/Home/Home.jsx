import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteClient, updateClient } from "../Reducer/ClientsReducer";
import ReactPaginate from "react-paginate";
import "./Home.css";

const Home = () => {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const [editingClientId, setEditingClientId] = useState(null);
  const [editedFname, setEditedFname] = useState("");
  const [editedLname, setEditedLname] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const clientsPerPage = 5;

  const pagesVisited = pageNumber * clientsPerPage;
  const pageCount = Math.ceil(clients.length / clientsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleEditClick = (id, fname, lname, location) => {
    setEditingClientId(id);
    setEditedFname(fname);
    setEditedLname(lname);
    setEditedLocation(location);
  };

  const handleSaveClick = () => {
    // Update client information if valid
    if (editedFname.trim() && editedLname.trim() && editedLocation.trim()) {
      dispatch(
        updateClient({
          id: editingClientId,
          fname: editedFname,
          lname: editedLname,
          location: editedLocation,
        })
      );
      setEditingClientId(null);
    }
  };

  const handleCancelClick = () => {
    // Cancel editing
    setEditingClientId(null);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Client?"
    );

    if (isConfirmed) {
      dispatch(deleteClient({ id: id }));
    }
  };

  return (
    <div className="container">
      <h1>Hello, Trainer!!!</h1>
      <div className="buttons">
        <Link to="/add" className="btn-1">
          Add new Client
        </Link>
        <Link to="/calender" className="btn-2">
          Show Calender
        </Link>
      </div>

      <div className="client-info">
        <h3 style={{ color: "#2a2b2e", alignSelf: "center" }}>Your Clients</h3>
        <table className="client-row">
          <thead className="table-body">
            <tr>
              <th className="th">First Name</th>
              <th className="th">Last Name</th>
              <th className="th">Location</th>
              <th className="th">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {clients
              .slice(pagesVisited, pagesVisited + clientsPerPage)
              .map((client) => (
                <tr key={client.id}>
                  <td className="th">
                    {editingClientId === client.id ? (
                      <input
                        type="text"
                        value={editedFname}
                        style={{
                          borderRadius: "10px",
                          height: "30px",
                          paddingLeft: "0px",
                        }}
                        onChange={(e) => setEditedFname(e.target.value)}
                      />
                    ) : (
                      <span>{client.fname}</span>
                    )}
                  </td>
                  <td className="th">
                    {editingClientId === client.id ? (
                      <input
                        type="text"
                        value={editedLname}
                        style={{ borderRadius: "10px", height: "30px" }}
                        onChange={(e) => setEditedLname(e.target.value)}
                      />
                    ) : (
                      <span>{client.lname}</span>
                    )}
                  </td>
                  <td className="th">
                    {editingClientId === client.id ? (
                      <input
                        type="text"
                        value={editedLocation}
                        style={{ borderRadius: "10px", height: "30px" }}
                        onChange={(e) => setEditedLocation(e.target.value)}
                      />
                    ) : (
                      <span>{client.location}</span>
                    )}
                  </td>
                  <td className="th td">
                    {editingClientId === client.id ? (
                      <>
                        <button className="btn-6" onClick={handleSaveClick}>
                          Save
                        </button>
                        <button className="btn-7" onClick={handleCancelClick}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn-3">
                          <Link
                            to={`/view/${client.id}`}
                            style={{
                              textDecoration: "none",
                              color: "aliceblue",
                            }}
                          >
                            View
                          </Link>
                        </button>
                        <button
                          className="btn-4"
                          onClick={() =>
                            handleEditClick(
                              client.id,
                              client.fname,
                              client.lname,
                              client.location
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn-5"
                          onClick={() => handleDelete(client.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
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
    </div>
  );
};

export default Home;
