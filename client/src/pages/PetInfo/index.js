import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setPage } from "../../feature/user/authSlice";
import { Modal, notification } from "antd";

import "./style.css";
import { useDispatch } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const PetInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateActivity, setUpdateActivity] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setPage({ page: "petInfo" }));
      try {
        const response = await axios.get(
          `http://localhost:3001/pets/get-pet/${id}`
        );
        if (response.status === 200) {
          const pet = response.data.pet;
          const activity = pet.activity;
          const filteredActivityList = activity.filter((event) => {
            // Compare the start date of each event with the current date
            return moment(event.start).isSameOrAfter(currentDate, "day");
          });
          setPet(pet);
          setActivityList(filteredActivityList);
          console.log(pet);
        }
      } catch (err) {
        console.log("Unable to find pet, please connect to the server");
      }
    };

    fetchData();
  }, [updateActivity]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const activityType = e.target.activityType.value;
    const activityDate = e.target.activityDate.value;
    const activityDescription = e.target.activityDescription.value;

    // Check if the activityDate is a valid date (e.g., not in the past)
    const currentDate = moment().format("YYYY-MM-DD");
    if (activityDate < currentDate) {
      alert("Please select a date in the present or future.");
      return;
    }

    console.log(typeof activityDate);

    const newActivity = {
      id: activityList.length + 1, // Generate a unique ID (you might want to use a better method)
      title: activityType,
      start: new Date(activityDate),
      end: new Date(activityDate),
      description: activityDescription,
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/pets/add-activity/`,
        { _id: id, activity: newActivity }
      );
      if (response.status === 201) {
        setActivityList([...activityList, newActivity]);
        openNotificationWithIcon("success", "Activity added successfully");
      } else {
        throw new Error();
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error in adding activity");
    }
    setIsModalOpen(false);
    e.target.reset();
  };

  const handleDelete = async (activityId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/pets/delete-activity/`,
        { _id: id, activityId }
      );
      if (response.status === 200) {
        openNotificationWithIcon("success", "Pet deleted successfully");
        setTimeout(() => {
          setUpdateActivity(!updateActivity);
        }, 500);
      } else {
        throw new Error();
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error in deleting activity");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="pet-info">
      {contextHolder}
      <div className="petInfoContainer">
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={activityList}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            step={60}
            defaultDate={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
          />
        </div>
        <div className="activityList">
          <div className="activityHeader">
            <div>
              <h2>Activity and Medical Records</h2>
              <p>Pet name : {pet?.name}</p>
            </div>
            <div>
              <button
                onClick={showModal}
                className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>
          <ul
            style={{
              height: "85%",
              overflowY: "scroll",
              paddingRight: "10px",
              marginTop: "10px",
            }}
          >
            {activityList.length === 0 && (
              <>
                <p style={{ textAlign: "center" }}>No record's found!</p>
              </>
            )}
            {activityList.map((activityList, index) => {
              const formattedDate = new Date(
                activityList.start
              ).toLocaleDateString();

              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid lightgrey",
                    // padding: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid lightgrey",
                      padding: "10px 5px",
                    }}
                  >
                    <p>
                      <b>Type</b> : {activityList.title}
                    </p>
                    <p>
                      <b>Date</b> : {formattedDate}
                      <button
                        style={{ color: "red", margin: "0px 10px" }}
                        onClick={() => handleDelete(activityList.id)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </p>
                  </div>
                  <div style={{ width: "100%", padding: "10px 5px" }}>
                    <b>Description : </b>
                    <p style={{ overflowWrap: "break-word" }}>
                      {activityList.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={700}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="activityType" className="form-label">
              Type
            </label>
            <input
              type="text"
              id="activityType"
              name="activityType"
              required
              className="form-input"
              placeholder="Example : Medical, exercise, ..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="activityDate" className="form-label">
              Date
            </label>
            <input
              type="date"
              id="activityDate"
              name="activityDate"
              required
              min={moment().format("YYYY-MM-DD")} // Minimum date is today
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="activityDescription" className="form-label">
              Description
            </label>
            <textarea
              id="activityDescription"
              name="activityDescription"
              rows="4"
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button bg-red-600">
            Add Activity
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PetInfo;
