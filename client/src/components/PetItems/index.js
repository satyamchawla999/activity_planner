import React, { useState } from "react";
import axios from "axios";
import { notification, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PetItems = ({ pet, setPetDelete, petDelete, page }) => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.uid);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleOk = async () => {
    try {
      const endPoint = (page !== 'adoption' ? "http://localhost:3001/pets/delete-pet" : "http://localhost:3001/adoptions/delete-adoption")
      const response = await axios.post(
        endPoint,
        { _id: pet._id }
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        openNotificationWithIcon("success", "Deleted successfully!");
        setTimeout(() => {
          setPetDelete(!petDelete);
        }, 500);
      } else {
        throw new Error;
      }
    } catch (err) {
      if(page === 'adoption') {
        openNotificationWithIcon("error", "Error in deleting adoption");
      } else {
        openNotificationWithIcon("error", "Error in deleting pet");
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = () => {
    navigate(`/pet-info/${pet._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    showModal();
  };
  return (
    <>
      {contextHolder}
      <div
        className="petItem"
        style={{ height: page === "adoption" ? "210px" : "200px" }}
      >
        <div className="petImage">
          <img
            src={`http://localhost:3001/Pets_Image/${pet?.imgUrl}`}
            alt="Pet Image"
          />
        </div>

        <div className="petDetails">
          <div className="petDetailsInfo">
            <div className="petDetailsTable">
              <div>
                <p>Name:</p>
                <p>Type:</p>
                <p>Age:</p>
                <p>Breed:</p>
                <p>Gender:</p>
                {page === "adoption" && (
                  <>
                    <p>Email:</p>
                  </>
                )}
              </div>
              <div>
                <p>{pet?.name}</p>
                <p>{pet?.type}</p>
                <p>{pet?.age}</p>
                <p>{pet?.breed}</p>
                <p>{pet?.gender}</p>
                {page === "adoption" && (
                  <>
                    <p>{pet?.email}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="petActions">
            {page === "adoption" &&
              (pet.uid === uid ? (
                <>
                  <button className="moreInfo" onClick={handleDelete}>
                    Delete adoption
                  </button>
                </>
              ) : (
                <>
                  <button className="contactNumber" style={{border:"1px solid green", color:"green"}}>
                    Contact Number: {pet?.number}
                  </button>
                </>
              ))}

            {page !== "adoption" && (
              <>
                <button className="moreInfo" onClick={handleNavigate}>
                  More Info
                </button>
                <button className="deletePet" onClick={handleDelete}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        closable={false}
        width={400}
      >
        <div className="text-grey p-4">
          <p className="text-xl font-bold">Are you sure you want to delete?</p>
          <p className="text-sm">{pet?.name}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleOk}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PetItems;
