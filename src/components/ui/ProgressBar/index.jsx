import React from "react";
import Bar from "./Bar";
import axios from "axios";
const ProgressBar = ({
  title,
  children,
  value,
  idSkill,
  backClass = "rounded-[999px]",
  className = "bg-slate-900 dark:bg-slate-900",
  titleClass = "text-base font-normal",
  striped,
  onClick,
  onDeletion,
  icon,
  animate,
  showValue,
}) => {


  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:7777/niveauOfSkill/${id}`
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
    <div className="relative">
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "flex-end",
          }}
        >
          <div>{title}</div>
          <div style={{ paddingLeft: "5px" }}>
            {" "}
            <button  onClick={() => handleDelete(idSkill)}>{icon}</button>
          </div>
        </div>
      )}

      {
        // if no children, then show the progress bar
        !children && (
          <div
            className={`w-full  overflow-hidden bg-opacity-10 progress  ${backClass}`}
          >
            <Bar
              value={value}
              className={className}
              striped={striped}
              animate={animate}
              showValue={showValue}
            />
          </div>
        )
      }
      {
        // if children, then show the progress bar with children
        children && (
          <div
            className={`w-full  overflow-hidden bg-opacity-10 flex progress  ${backClass}`}
          >
            {children}
          </div>
        )
      }
    </div>
  );
};

export default ProgressBar;
