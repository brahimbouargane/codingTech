import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
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
  fetchDevelopers,
  deleteDeveloper,
  insertDeveloper,
  editDeveloper,
  addEducation,
} from "../../store/reducers/developerSlice";
import AccordionEx from "./AccordionEx";

const ExperiencesOfDeveloper = ({ idDeveloper ,devEx}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateNaissance, setDateNaissance] = useState(null);
  const [date_debut, setDate_debut] = useState(null);
  const [date_fin, setDate_fin] = useState(null);
  const [items, setItems] = useState( [
    {
      title: "Technicien Spécialisé en Développement Digital (FullStack)",
      dateDebut: "2015-12-0-6",
      datefin: "2015-12-0-6",
      content: "OFPPT NTIC 1 Casablanca",
    },
    {
      title: "Where i can learn more about using Dashcode?",
      dateDebut: "2015-12-0-6",
      datefin: "2015-12-0-6",
      content:
        "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
    },
    {
      title: "Why Dashcode is so important?",
      dateDebut: "2015-12-0-6",
      datefin: "2015-12-0-6",
      content:
        "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
    },
  ]);
  const dispatch = useDispatch();


 

  const FormValidationSchema = yup.object({
    nomLentreprise: yup.string().required("Nom is required"),
    jobTitle: yup.string().required("Nom is required"),
    date_debut: yup.date().required("date naissance is required"),
    date_fin: yup.date().required("date naissance is required"),
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

  const handellClicke = () => {
    console.log("handellClicke");
  };

  
  

  const onSubmit = (data) => {
    //console.log(data.nom);
    const promotion = {
      dateFin: data.date_debut,
      dateDebut: data.date_fin,
      jobTitle: data.jobTitle,
      nomLentreprise: data.nomLentreprise,
      developer_id: idDeveloper,
    };

    dispatch(addEducation(promotion))
      .unwrap()
      .then(() => {
        dispatch(fetchDeveloper());
        reset();
        handleModalClose();
    
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Card
          title="EXPÉRIENCES "
          icon={<MdOutlineAddCircleOutline />}
          onClick={handleModalOpen}
        >
          <AccordionEx items={devEx} onClick={handellClicke} />
        </Card>
        <Modal
          activeModal={isModalOpen}
          onClose={handleModalClose}
          title="edit Expériences "
          // Other props you want to pass to the Modal component     onSubmit={handleSubmit(onSubmit)}
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
                name="nomLentreprise"
                label="Nom de l'entreprise"
                placeholder="nom"
                register={register}
              />
              <Textinput
                name="jobTitle"
                label="job title"
                placeholder="job Title"
                register={register}
              />
            </div>
            <div className="ltr:text-right rtl:text-left">
              <button className="btn btn-dark text-center">Add</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ExperiencesOfDeveloper;
