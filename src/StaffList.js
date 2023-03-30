import React from "react";

const StaffList = ({
  cip_staff_list,
  setPersonName,
  personName,
  setAppPage,
  personStatus,
  setPersonStatus
}) => {
  const staffDetails = cip_staff_list.map((person, i) => {
    const { name, status } = person;
    const handleStaffPerson = () => {
      setAppPage("TimeSheet");
      setPersonName({
        name: name,
        status: status
      });
    };
    return (
      <div key={i} className="names">
        <button
          type="button"
          className={"button"}
          onClick={() => handleStaffPerson()}
        >
          {name} - {status}
        </button>
      </div>
    );
  });
  return (
    <>
      <h2>Select your name</h2>
      <div className="names">{staffDetails}</div>
    </>
  );
};

export default StaffList;
