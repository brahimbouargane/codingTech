import { useState } from "react";
import Icon from "@/components/ui/Icon";

const Accordion = ({ items, className = "space-y-5", onClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Check if items is an array before mapping
  if (!Array.isArray(items)) {
    return null;
  }

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      // Clicking the same item again should close it
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          className="accordion shadow-base dark:shadow-none rounded-md"
          key={index}
        >
          <div
            className={`flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 ${
              activeIndex === index
                ? "bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md"
                : "bg-white dark:bg-slate-700  rounded-md"
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.nomeDeplome} </span>
            <span
              className={`text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5 ${
                activeIndex === index ? "rotate-180 transform" : ""
              }`}
            >
              <Icon icon="heroicons-outline:chevron-down" />
            </span>
          </div>

          {activeIndex === index && (
            <div
              className={`${
                index === activeIndex
                  ? "dark:border dark:border-slate-700 dark:border-t-0"
                  : ""
              } text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md`}
            >
              <div className="px-8 py-4">
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                <div className="flex justify-between">
                  <p>{item.nomEcole}</p>
                  <p>
                    Date de début: {item.dateDebut} Date de fin: {item.datefin}
                  </p>
                  <button onClick={onClick}>ok</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
