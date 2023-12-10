import React, { useState } from "react";
import Fullcalender from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import "./ShowCalendar.css";

const ShowCalender = () => {
  const clients = useSelector((state) => state.clients);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  // function to convert date and time
  const AptDateTime = (date, time) => {
    const dateTimeString = `${date}T${time}`;
    return new Date(dateTimeString);
  };

  // extract appointment data from clients
  const appointments = clients.reduce((acc, client) => {
    const clientApt = client.apt.map((appointment) => ({
      title: `${client.fname} ${client.lname}`,
      start: AptDateTime(appointment.date, appointment.time),
    }));
    return [...acc, ...clientApt];
  }, []);

  // Function to handle date click in the calendar
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const appointmentsOnDate = appointments.filter((event) => {
      const aptDate = new Date(event.start).toISOString().split("T")[0];
      return aptDate === clickedDate;
    });

    setSelectedDate(clickedDate);
    setSelectedAppointments(appointmentsOnDate);
  };

  return (
    <div className="cont">
      <h1 style={{ alignSelf: "center" }}>
        Hey Trainer, See your sheduled appointments here..
      </h1>
      <div className="calender">
        <Fullcalender
          plugins={[DayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"80vh"}
          events={appointments}
          dateClick={handleDateClick}
        />

        {selectedDate && (
          <div>
            <h2>Appointments on {selectedDate}:</h2>
            <ul>
              {selectedAppointments.map((appointment, index) => (
                <li key={index}>
                  {appointment.title} at{" "}
                  {new Date(appointment.start).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCalender;
