import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { meets, files } from "@/constant/data";
import SelectMonth from "@/components/partials/SelectMonth";
import TeamTable from "@/components/partials/Table/team-table";
import GroupChart4 from "@/components/partials/widget/chart/group-chart4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import CalendarView from "@/components/partials/widget/CalendarView";

import userAvatar from "@/assets/images/all-img/main-user.png";

const AboutPromotion = () => {
  return (
    <div>
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
        About Promotion
      </h4>
      
    </div>
  );
};

export default AboutPromotion;
