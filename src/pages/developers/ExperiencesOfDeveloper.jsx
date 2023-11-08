import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/ui/Modal";
import * as yup from "yup";
const ExperiencesOfDeveloper = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const FormValidationSchema = yup.object({
       
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

   const handellClicke = ()=>{
    console.log("handellClicke")
   }


  const items = [
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
  ];
  return (
    <>
      <div>
        <Card
          title="EXPÉRIENCES PROFESSIONNELLES"
          icon={<MdOutlineAddCircleOutline />}
          onClick={handleModalOpen}
        >
          <Accordion items={items} onClick={handellClicke} />
        </Card>
        <Modal
          activeModal={isModalOpen}
          onClose={handleModalClose}
          title="edit Expériences "
          // Other props you want to pass to the Modal component
        >
        
        </Modal>
      </div>
    </>
  );
};

export default ExperiencesOfDeveloper;
