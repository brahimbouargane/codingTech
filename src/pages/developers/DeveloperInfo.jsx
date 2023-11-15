import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Fileinput from "@/components/ui/Fileinput";
import axios from "axios";

function DeveloperInfo({ developer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imageFile", selectedFile);

      // Make a POST request to the update endpoint
      const response = await axios.post(
        `http://localhost:7777/developers/${developer.id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error updating developer:", error);
    }

    // Close the modal after submission
    handleModalClose();
  };

  const handleFileChange1 = (e) => {
    setSelectedFile1(e.target.files[0]);
  };
  const handleModalOpen1 = () => {
    setIsModalOpen1(true);
  };

  const handleModalClose1 = () => {
    setIsModalOpen1(false);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imageFile", selectedFile1);

      // Make a POST request to the update endpoint
      const response = await axios.post(
        `http://localhost:7777/developers/${developer.id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error updating developer:", error);
    }

    // Close the modal after submission
    handleModalClose1();
  };

  return (
    <>
      {" "}
      <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
        <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg">
          <img
            src="https://i.pinimg.com/564x/ff/ff/c6/ffffc638e1175786e406a084fd3e271a.jpg"
            alt={developer.nom}
            className="w-full h-full object-cover "
          />
          <Button
            style={{ padding: "0" }}
            onClick={handleModalOpen1} // Use "style" instead of "state" for inline styles
            className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
          >
            <FiEdit />
          </Button>
        </div>
        <div className="profile-box flex-none md:text-start text-center">
          <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
            <div className="flex-none">
              <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                <img
                  src={developer.imagePublicId}
                  alt={developer.nom}
                  className="w-full h-full object-cover rounded-full"
                />
                <Button
                  style={{ padding: "0" }}
                  onClick={handleModalOpen} // Use "style" instead of "state" for inline styles
                  className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                >
                  <FiEdit />
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                {developer.nom + " " + developer.prenom}
              </div>
              <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                {developer.jobTitle}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
          <div className="flex-1">
            <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"></div>
            <div className="text-sm text-slate-600 font-light dark:text-slate-300"></div>
          </div>
          <div className="flex-1 " style={{ marginRight: "10px" }}>
            <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
              <a href={developer.username}>
                <Button
                  icon="heroicons-outline:message-i"
                  text="send message"
                  className="btn-outline-primary rounded-[999px]"
                  iconPosition="right"
                />
              </a>
            </div>
            <div className="text-sm text-slate-600 font-light dark:text-slate-300"></div>
          </div>

          <div className="flex-1">
            <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
              <Button
                icon="heroicons-outline:newspaper"
                text="CV PDF"
                className="btn-outline-primary rounded-[999px]"
                iconPosition="right"
              />
            </div>
            <div className="text-sm text-slate-600 font-light dark:text-slate-300"></div>
          </div>
        </div>
      </div>
      <Modal
        activeModal={isModalOpen}
        onClose={handleModalClose}
        title="edit Image Profil"
        // Other props you want to pass to the Modal component
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Fileinput
            name="basic"
            selectedFile={selectedFile}
            onChange={handleFileChange}
          />
          <div className="ltr:text-right rtl:text-left">
            <button type="submit" className="btn btn-dark text-center">
              edit
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        activeModal={isModalOpen1}
        onClose={handleModalClose1}
        title="edit Background"
        // Other props you want to pass to the Modal component
      >
        <form onSubmit={handleSubmit1} className="space-y-4">
          <Fileinput
            name="basic"
            selectedFile={selectedFile1}
            onChange={handleFileChange1}
          />
          <div className="ltr:text-right rtl:text-left">
            <button type="submit" className="btn btn-dark text-center">
              edit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DeveloperInfo;
