import React, { useState, useEffect } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import Card from "@/components/ui/Card";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/ui/Modal";
import * as yup from "yup";
import { TiDelete } from "react-icons/ti";
import Textinput from "@/components/ui/Textinput";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeveloper, addSkill } from "../../store/reducers/developerSlice";

const SkillDeveloper = ({ skillDev, idDeveloper }) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const refreshComponent = () => {
    dispatch(fetchDeveloper(idDeveloper));
  };


  const FormValidationSchema = yup.object({
    skillName: yup.string().required("Nom is required"),
    niveauOfSkillDeveloper: yup
      .number()
      .required("Nom is required")
      .max(100, "Value must be less than or equal to 100"),
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

  const onSubmit = (data) => {
    //console.log(data.nom);
    const promotion = {
      niveauOfSkillDeveloper: data.niveauOfSkillDeveloper,
      skillName: data.skillName,
      developer_id: idDeveloper,
    };

    dispatch(addSkill(promotion))
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if skillDev exists, otherwise use static data
        const newData = skillDev
          ? skillDev
          : [
              {
                skill: { id: 1, skillName: "java" },
                niveauOfSkillDeveloper: 60,
              },
              {
                skill: { id: 2, skillName: "react" },
                niveauOfSkillDeveloper: 80,
              },
              {
                skill: { id: 3, skillName: "spring" },
                niveauOfSkillDeveloper: 70,
              },
            ];
        setData(newData);
      } catch (error) {
        console.error("Error setting data:", error);
      }
    };

    fetchData();
  }, [skillDev]);
  return (
    <>
      <Card
        title="Skill Developer"
        onClick={handleModalOpen}
        icon={<MdOutlineAddCircleOutline />}
      >
        <div className="space-y-4">
          <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4">
            {data.map((skill, index) => (
              <ProgressBar
                icon={<TiDelete />}
                key={index}
                className="bg-primary-500"
                value={skill.niveauOfSkillDeveloper}
                onDeletion={refreshComponent}
                title={skill.skill.skillName}
                idSkill = {skill.id}
              />
            ))}
          </div>
        </div>
      </Card>
      <Modal
        activeModal={isModalOpen}
        onClose={handleModalClose}
        title="Add Formation"
        // Other props you want to pass to the Modal component
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Textinput
            name="skillName"
            label="skill name"
            placeholder="nom"
            register={register}
          />
          <Textinput
            name="niveauOfSkillDeveloper"
            label="niveau Of Skill"
            type="number"
            placeholder="nome Deplome"
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

export default SkillDeveloper;
