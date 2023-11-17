import React, { useState } from "react";
import TeamTable from "@/components/partials/Table/team-table";
import Card from "@/components/ui/Card";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/ui/Modal";
import * as yup from "yup";
import FormGroup from "@/components/ui/FormGroup";
import Flatpickr from "react-flatpickr";
import Textinput from "@/components/ui/Textinput";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeveloper,
  addProject,
} from "../../store/reducers/developerSlice";
import TableProject from "./TableProject";

const DeveloperProject = ({ idDeveloper, devProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date_debut, setDate_debut] = useState(null);
  const [date_fin, setDate_fin] = useState(null);

  const dispatch = useDispatch();

  const refreshComponent = () => {
    dispatch(fetchDeveloper(idDeveloper));
  };

  const FormValidationSchema = yup.object({
    projectName: yup.string().required("Nom is required"),
    date_debut: yup.date().required("date naissance is required"),
    date_fin: yup.date().required("date naissance is required"),
    urlProject: yup.string().required("Nom is required"),
    status: yup.string().required("Nom is required"),
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

 
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  if (devProject) {
    console.log(devProject);
  }

  const onSubmit = (data) => {
    //console.log(data.nom);
    const promotion = {
      dateFin: data.date_debut,
      dateDebut: data.date_fin,
      urlProject: data.urlProject,
      projectName: data.projectName,
      status: data.status,
      developer_id: idDeveloper,
    };

    dispatch(addProject(promotion))
      .unwrap()
      .then(() => {
        dispatch(fetchDeveloper(idDeveloper));
        reset();
        handleModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
        

  return (
    <>
      <Card
        title="project perssoneil"
        onClick={handleModalOpen}
        icon={<MdOutlineAddCircleOutline />}
        noborder
      >
        {devProject !== null && (
        <TableProject devProject={devProject} onDeletion={refreshComponent} />
      )}
      </Card>
      <Modal
        activeModal={isModalOpen}
        onClose={handleModalClose}
        title="Add Project"
        // Other props you want to pass to the Modal component
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <FormGroup
              label="Date de debut"
              id="date_debut"
              error={errors.date_debut}
            >
              <Controller
                name="date_debut"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    id="date_debut"
                    placeholder="yyyy, dd M"
                    value={date_debut} // Use dateNaissance as the value
                    onChange={(selectedDates) => {
                      const selectedDate = selectedDates[0]; // Assuming you want to select a single date
                      field.onChange(selectedDate); // Update the form field value
                      setDate_debut(selectedDate); // Update the dateNaissance state
                    }}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                  />
                )}
              />
            </FormGroup>
            <FormGroup
              label="Date de fin"
              id="date_fin"
              error={errors.dateNaissance}
            >
              <Controller
                name="date_fin"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    id="date_fin"
                    placeholder="yyyy, dd M"
                    value={date_fin} // Use dateNaissance as the value
                    onChange={(selectedDates) => {
                      const selectedDate = selectedDates[0]; // Assuming you want to select a single date
                      field.onChange(selectedDate); // Update the form field value
                      setDate_fin(selectedDate); // Update the dateNaissance state
                    }}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                  />
                )}
              />
            </FormGroup>

            <Textinput
              name="projectName"
              label="Project nom"
              placeholder="Project nom"
              register={register}
            />
            <Textinput
              name="status"
              label="status"
              placeholder="status"
              register={register}
            />
          </div>{" "}
          <Textinput
            name="urlProject"
            label="project url"
            placeholder="project url"
            register={register}
          />
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Add</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DeveloperProject;
