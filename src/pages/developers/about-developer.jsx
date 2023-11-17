import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { TfiTwitter } from "react-icons/tfi";
import * as yup from "yup";
import {
  FiGithub,
  FiLinkedin,
  FiPhoneCall,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";
import Button from "@/components/ui/Button";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import Carousel from "@/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";

import c1 from "@/assets/images/all-img/c1.png";
import c2 from "@/assets/images/all-img/c2.png";
import c3 from "@/assets/images/all-img/c3.png";
import {
  FaSquareGithub,
  FaSquareXTwitter,
  FaRegEnvelope,
  FaLinkedinIn,
} from "react-icons/fa6";
import { useForm } from "react-hook-form";
import FormationOfDeveloper from "./FormationOfDeveloper";
import ExperiencesOfDeveloper from "./ExperiencesOfDeveloper";
import { connect } from "formik";
import {
  fetchDeveloper,
  insertDeveloper,
  editDeveloper,
} from "../../store/reducers/developerSlice";
import DeveloperInfo from "./DeveloperInfo";
import DeveloperProject from "./DeveloperProject";
import SkillDeveloper from "./SkillDeveloper";

const AboutDeveloper = () => {
  const developer = useSelector((state) => state.developer.developer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDeveloper(id));
    console.log(developer);
  }, []);
  useEffect(() => {
    // Format the date when the former data is available
    if (developer.dateNaissance) {
      const date = new Date(developer.dateNaissance);
      const formattedDate = date.toISOString().split("T")[0]; // Get the yyyy-MM-dd part
      setFormattedDate(formattedDate);
    }
  }, [developer.dateNaissance]);

  const FormValidationSchema = yup.object({
    nom: yup.string().required("Nom is required"),
    prenom: yup.string().required("Prenom is required"),
    jobTitle: yup.string().required("Prenom is required"),
    description: yup.string().required("Prenom is required"),
    twitterUrl: yup.string().required("Prenom is required"),
    gitHubUrl: yup.string().required("Prenom is required"),
    linkedinUrl: yup.string().required("Prenom is required"),
    telephone: yup.string().required("Telephone is required"),
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
  var iddev = developer.id;
  const onSubmit = (data) => {
    //console.log(data.nom);
    const promotion = {
      nom: data.nom,
      prenom: data.prenom,
      jobTitle: data.jobTitle,
      description: data.description,
      twitterUrl: data.twitterUrl,
      gitHubUrl: data.gitHubUrl,
      linkedinUrl: data.linkedinUrl,
      telephone: data.telephone,
      id: iddev,
    };

    dispatch(editDeveloper(promotion))
      .unwrap()
      .then(() => {
        reset();
        handleModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(fetchDeveloper(id));
  };

  return (
    <div>
      <div>
        <div className="space-y-5 profile-page">
          <DeveloperInfo developer={developer} />
          <div>{/* Other developer profile information */}</div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
            <GroupChart4 />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              {" "}
              <Card title="About Me" noborder>
                <div className="text-sm">{developer.description}</div>
              </Card>
              <br></br>
              <Card
                title="Info Devloper "
                icon={<FiEdit />}
                onClick={handleModalOpen}
              >
                <ul className="list space-y-8">
                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <FaRegEnvelope />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        EMAIL
                      </div>
                      <a
                        href="mailto:someone@example.com"
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {developer.username}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <FiPhoneCall />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        PHONE
                      </div>
                      <a
                        href="tel:0189749676767"
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {developer.telephone}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <FiCalendar />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        Date Naissance
                      </div>
                      <div className="text-base text-slate-600 dark:text-slate-50">
                        {formattedDate}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Link to={developer.linkedinUrl}>
                        <FiLinkedin />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        Linked in
                      </div>
                      <div className="text-base text-slate-600 dark:text-slate-50">
                        {formattedDate}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Link to={developer.gitHubUrl}>
                        <FiGithub />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        Git Hub
                      </div>
                      <div className="text-base text-slate-600 dark:text-slate-50">
                        {formattedDate}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Link to={developer.twitterUrl}>
                        <TfiTwitter />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        Twitter
                      </div>
                      <div className="text-base text-slate-600 dark:text-slate-50">
                        {formattedDate}
                      </div>
                    </div>
                  </li>
                </ul>
              </Card>
              <Modal
                activeModal={isModalOpen}
                onClose={handleModalClose}
                title="edit Info"
                // Other props you want to pass to the Modal component
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput
                      name="nom"
                      label="nom"
                      placeholder="nom"
                      register={register}
                    />
                    <Textinput
                      name="prenom"
                      label="prenom"
                      placeholder="prenom"
                      register={register}
                    />
                    <Textinput
                      name="jobTitle"
                      label="job titel"
                      placeholder="job titel"
                      register={register}
                    />

                    <Textinput
                      name="description"
                      label="descreption"
                      placeholder="descreption"
                      register={register}
                    />
                    <Textinput
                      name="telephone"
                      label="telephone"
                      placeholder="telephone"
                      register={register}
                    />
                    <Textinput
                      name="twitterUrl"
                      label="twitter url"
                      placeholder="twitter url"
                      register={register}
                    />
                    <Textinput
                      name="gitHubUrl"
                      label="github url"
                      placeholder="github url"
                      register={register}
                    />
                    <Textinput
                      name="linkedinUrl"
                      label="linkedin url"
                      placeholder="linkedin url"
                      register={register}
                    />
                  </div>
                  <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark text-center">edit</button>
                  </div>
                </form>
              </Modal>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <div>
                <FormationOfDeveloper
                  devfoemation={developer.educations}
                  idDeveloper={developer.id}
                />
              </div>
              <br></br>

              <div>
                <ExperiencesOfDeveloper
                  idDeveloper={developer.id}
                  devEx={developer.experiences}
                />
              </div>
              <br></br>
              <DeveloperProject
                idDeveloper={developer.id}
                devProject={developer.projects}
              />
              <br></br>
              <SkillDeveloper skillDev={developer.niveauOfSkillDevelopers}  idDeveloper={developer.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
