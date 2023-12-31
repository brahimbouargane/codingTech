import React from "react";
import useSkin from "@/hooks/useSkin";

const Card = ({
  children,
  title,
  icon,
  subtitle,
  onClick,
  headerslot,
  className = "custom-class",
  bodyClass = "p-6",
  noborder,
  titleClass = "custom-class",
}) => {
  const [skin] = useSkin();



  return (
    <div
      className={`
        card rounded-md bg-white dark:bg-slate-800   ${
          skin === "bordered"
            ? " border border-slate-200 dark:border-slate-700"
            : "shadow-base"
        }
   
    ${className}
        `}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noborder ? "no-border" : ""}`}>
          <div>
            {title && (
              <div
                style={{ color: "#3F5EDF" }}
                className={`card-title ${titleClass}`}
              >
                <div style={{ display: "flex", alignItems: "center",justifyItems:"flex-end" }}>
                  <div>{title}</div>
                  <div style={{ paddingLeft: "15px" }}> <button onClick={onClick}>{icon}</button></div>
                </div>
              </div>
            )}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerslot && <div className="card-header-slot">{headerslot}</div>}
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
