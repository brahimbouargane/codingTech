import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchFormer } from "../../store/reducers/formerSlice";

const AboutFormer = () => {
  const former = useSelector((state) => state.former.former);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    dispatch(fetchFormer(id));
    console.log(former); // Use dispatch directly
  }, []);

  useEffect(() => {
    // Format the date when the former data is available
    if (former.dateNaissance) {
      const date = new Date(former.dateNaissance);
      const formattedDate = date.toISOString().split("T")[0]; // Get the yyyy-MM-dd part
      setFormattedDate(formattedDate);
    }
  }, [former.dateNaissance]);

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
                      src={former.imagePublicId}
                      alt=""
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
                    {former.nom + " " + former.prenom}
                  </div>
                  <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                    Front End Developer
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                  $32,400
                </div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                  Total Balance
                </div>
              </div>

              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                  200
                </div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                  Board Card
                </div>
              </div>

              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                  3200
                </div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                  Calender Events
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <Card title="Info">
                <ul className="list space-y-8">
                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:envelope" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        EMAIL
                      </div>
                      <a
                        href="mailto:someone@example.com"
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {former.username}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:phone-arrow-up-right" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        PHONE
                      </div>
                      <a
                        href="tel:0189749676767"
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {former.telephone}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:map" />
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
                </ul>
              </Card>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <Card title="User Overview">
                {/* <BasicArea height={190} /> */}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFormer;
