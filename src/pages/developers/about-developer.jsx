import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { useSelector, useDispatch } from "react-redux";
import { fetchDeveloper } from "../../store/reducers/developerSlice";
import { TfiTwitter } from "react-icons/tfi";
import { FiGithub, FiLinkedin, FiPhoneCall, FiCalendar,FiEdit } from "react-icons/fi";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";

import {
  FaSquareGithub,
  FaSquareXTwitter,
  FaRegEnvelope,
  FaLinkedinIn,
} from "react-icons/fa6";
import DownloadCVButton from "./DownloadCVButton";

const AboutDeveloper = () => {
  const developer = useSelector((state) => state.developer.developer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState("");

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
    <div>
      <div>
        <div className="space-y-5 profile-page">
          <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
            <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
            <div className="profile-box flex-none md:text-start text-center">
              <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                <div className="flex-none">
                  <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                    <img
                      src={developer.imagePublicId}
                      alt={developer.nom}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <Link
                      to="#"
                      className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                    >
                      <Icon icon="heroicons:pencil-square" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                    {developer.nom + " " + developer.prenom}
                  </div>
                  <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                    Front End Developer
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
                  <Button
                    icon="heroicons-outline:message-i"
                    text="send message"
                    className="btn-outline-primary rounded-[999px]"
                    iconPosition="right"
                  />
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
          <div>
            {/* Other developer profile information */}
            <DownloadCVButton developerId={developer.cvPublicId} />
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
            <GroupChart4 />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <Card title="Info Devloper "  icon={<FiEdit /> }>
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
              <br></br>
              <Card title="Height Examples">
                <div className="space-y-4">
                  <ProgressBar
                    className="bg-info-500"
                    value={50}
                    title="JAVA"
                  />
                  <ProgressBar
                    value={70}
                    title="SPRING BOOT"
                    backClass="h-[10px] rounded-[999px]"
                    className="bg-info-500"
                  />
                  <ProgressBar
                    value={50}
                    title="LARAVEL"
                    backClass="h-[10px] rounded-[999px]"
                    className="bg-info-500"
                  />
                  <ProgressBar
                    value={50}
                    title="PHP"
                    backClass="h-[10px] rounded-[999px]"
                    className="bg-info-500"
                  />
                </div>
              </Card>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <Card title="About Me" noborder>
                <div className="text-sm">{developer.description}</div>
              </Card>
              <br></br>
              <Card title="DIPLÔMES ET FORMATIONS">
                <Accordion items={items} />
              </Card>
              <br></br>
              <Card title="EXPÉRIENCES PROFESSIONNELLES">
                <Accordion items={items} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
