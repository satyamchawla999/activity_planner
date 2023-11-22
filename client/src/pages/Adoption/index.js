import { Modal } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { setPage } from "../../feature/user/authSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { renderPagination } from "../../constants/index";

import "./style.css";
import CreateForm from "../../components/CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PetItems from "../../components/PetItems";

const Adoption = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const [petUpdate, setPetUpdate] = useState(false);
  const [petDelete, setPetDelete] = useState(false);

  const [pets, setPets] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(setPage({ page: "adoption" }));
    const getPets = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/adoptions/get-adoptions",
          { uid: uid }
        );
        if (response.status === 200) {
          const pets = response.data.adoptions;
          console.log(pets);
          setPets(pets);
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPets();
  }, [petUpdate,petDelete]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setPetUpdate(!petUpdate);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="dash-board">
        <div className="pet-heading">
          <h1>Adoption</h1>

          <button
            onClick={showModal}
            className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Create Adoption
          </button>
        </div>

        <div className="petItemContainer">
          {pets.length === 0 ? (
            <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
              <img style={{width:"100px", height:"100px"}} src={require('../../assets/images/pet-shelter.png')} alt="#"/>
              <p style={{fontSize:"20px", color:"F44336"}}>No record's found!</p>
            </div>
          ) : (
            <>
              {pets &&
                pets.map((pet, index) => <PetItems pet={pet} page="adoption" petDelete={petDelete} setPetDelete={setPetDelete} key={index} />)}
            </>
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={700}
      >
        <CreateForm handleOk={handleOk} page={'adoption'} />
      </Modal>
    </>
  );
};

export default Adoption;
