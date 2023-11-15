import { useState } from "react";
import Icon from "@/components/ui/Icon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccordionEx = ({
  items,
  className = "space-y-5",
  onClick,
  idDev,
  onDeletion,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:7777/experiences/${id}`
      );
      if (response.status !== 204) {
        throw new Error("Échec de la suppression de l'éducation");
      } else {
        // Appelez la fonction de rafraîchissement du composant parent
        onDeletion();
      }

      console.log(`Education with ID ${id} deleted successfully.`);
    } catch (error) {
      // Handle errors
      console.error("Error deleting education:", error);
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
            <span>{item.nomLentreprise} </span>
            {activeIndex !== index && ( // Only render the span if activeIndex === index
              <span>
                {item.dateDebut} // {item.dateFin}
              </span>
            )}
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
                <div
                  style={{ color: "#1e293b" }}
                  dangerouslySetInnerHTML={{ __html: item.jobTitle }}
                />
                <div className="flex justify-between">
                  <p>{item.description}</p>
                </div>
                <p>
                  début: {item.dateDebut} fin: {item.datefin}
                </p>
                <div className="flex justify-between">
                  <div>
                    <p> </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-white text-center"
                      style={{ color: "#D75052" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-white text-center"
                      onClick={onClick}
                    >
                      update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionEx;
