import React from "react";

const StaffTimeSheet = ({
  setPersonName,
  personName,
  personStatus,
  setPersonStatus,
  setShiftLog,
  shiftLog,
  StartShift,
  StartBreak,
  useToggle,
  EndShift,
  EndBreak,
  isToggleWork,
  setToggleWork,
  toggleWork,
  isToggleBreak,
  setToggleBreak,
  toggleBreak,
  appPage,
  setAppPage
}) => {
  return (
    <>
      <div className="logger">
        <h2>{`Welcome ${personName.name} - ${personName.status} - ${
          !isToggleWork
            ? !isToggleBreak
              ? "On Duty"
              : "On Break"
            : "Start Shift"
        }`}</h2>
        <div className="names">
          {isToggleWork && (
            <button
              type="button"
              className={`xworking-${isToggleWork}`}
              onClick={() => StartShift()}
            >
              <span role="img" aria-label="start-finish-button"></span>
              {"Start Shift"}
            </button>
          )}
          {!isToggleWork && (
            <>
              {isToggleBreak ? (
                <button
                  type="button"
                  className={`xworking-${!isToggleBreak}`}
                  onClick={() => StartBreak()}
                >
                  <span role="img" aria-label="start-finish-button"></span>
                  {isToggleBreak ? "Finish Break" : "Start Break"}
                </button>
              ) : (
                <button
                  type="button"
                  className={`xworking-${!isToggleBreak}`}
                  onClick={() => EndBreak()}
                >
                  <span role="img" aria-label="start-finish-button"></span>
                  {isToggleBreak ? "Finish Break" : "Start Break"}
                </button>
              )}
              <button
                type="button"
                className={`xworking-${isToggleWork}`}
                onClick={() => EndShift()}
              >
                <span role="img" aria-label="start-finish-button"></span>
                {"End Shift"}
              </button>
            </>
          )}
        </div>
        <button
          type="button"
          className={"button button-clear"}
          onClick={() => setAppPage("StaffList")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default StaffTimeSheet;
