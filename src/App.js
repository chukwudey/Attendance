import "./styles.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import icon from "./assets/img/your-smile-logo.png";
import Header from "./Header";
import StaffList from "./StaffList";
import StaffTimeSheet from "./StaffTimeSheet";
import Logger from "./Logger";
import { useToggle } from "./hooks";
import { GoogleSpreadsheet } from "google-spreadsheet";

export default function App() {
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  const [shiftLog, setShiftLog] = useState([]);
  const [appPage, setAppPage] = useState("StaffList");
  const [isToggleBreak, setToggleBreak, toggleBreak] = useToggle(false);
  const [isToggleWork, setToggleWork, toggleWork] = useToggle(false);
  const [personName, setPersonName] = useState({
    name: "",
    status: null,
    time: null,
    date: null
  });
  const [personStatus, setPersonStatus] = useState({
    name: null,
    status: null
  });
  const [AppState, setAppState] = useState({
    loading: false,
    data: {
      acf: {
        cip_staff_list: []
      }
    }
  });
  const { data, loading } = AppState;
  const { acf } = data;

  useEffect(() => {
    setAppState({ loading: true, data: {} });
    const API_DATA = "https://yoursmile.com.au/wp-json/acf/v3/options/options/";
    fetch(API_DATA)
      .then((res) => res.json())
      .then((data) => {
        setAppState({
          loading: false,
          data: data
        });
      });
  }, [setAppState]);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, "\n")
      });
      await doc.loadInfo();
      console.log("title: ", doc.title);
      await doc.updateProperties({ title: "Your Smile Employee Shift Logger" });
      // const sheet = doc.sheetsById[SHEET_ID];
      // await doc.addSheet({ title: "hot new sheet!" });
      const sheet = await doc.sheetsByTitle["hot new sheet!"];
      const result = await sheet.addRow(row);
      console.log("Result: ", result);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const setTime = (status) => {
    let date = new Date().toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    let time = new Date().toLocaleTimeString("en-AU", {});
    setShiftLog([
      ...shiftLog,
      `<td>${personName.name}</td><td>${personName.status}</td><td>${time}</td><td>${date}</td>`
    ]);
    const newRow = {
      staff_id: "id",
      staff_name: personName.name,
      shift_status: status,
      shift_time: time,
      shift_date: date
    };
    appendSpreadsheet(newRow);
  };
  const StartShift = () => {
    setTime("Start Shift");
    setPersonName({ ...personName, status: "Started Shift" });
    setToggleWork(false);
  };
  const EndShift = () => {
    setTime("End Shift");
    setPersonName({ ...personName, status: "Ended Shift" });
    setToggleWork(true);
  };
  const StartBreak = () => {
    setTime("Start Break");
    setPersonName({ ...personName, status: "Started Break" });
    setToggleBreak(false);
  };
  const EndBreak = () => {
    setTime("End Break");
    setPersonName({ ...personName, status: "Ended Break" });
    setToggleBreak(true);
  };
  if (loading) {
    return "Loading";
  }
  console.log("personName", personName);
  console.log("personStatus", personStatus);
  console.log("shiftLog", shiftLog);
  return (
    <>
      <Header icon={icon} />
      {appPage === "StaffList" && (
        <StaffList
          personName={personName}
          personStatus={personStatus}
          setPersonName={setPersonName}
          setPersonStatus={setPersonStatus}
          setAppPage={setAppPage}
          cip_staff_list={acf.cip_staff_list}
        />
      )}
      {appPage === "TimeSheet" && (
        <StaffTimeSheet
          personName={personName}
          personStatus={personStatus}
          setPersonName={setPersonName}
          setPersonStatus={setPersonStatus}
          useToggle={useToggle}
          shiftLog={shiftLog}
          setShiftLog={setShiftLog}
          StartShift={StartShift}
          StartBreak={StartBreak}
          EndShift={EndShift}
          EndBreak={EndBreak}
          isToggleWork={isToggleWork}
          setToggleWork={setToggleWork}
          toggleWork={toggleWork}
          isToggleBreak={isToggleBreak}
          setToggleBreak={setToggleBreak}
          toggleBreak={toggleBreak}
          appPage={appPage}
          setAppPage={setAppPage}
        />
      )}
      <Logger shiftLog={shiftLog} />
    </>
  );
}
App.propTypes = {
  personName: {
    name: PropTypes.string,
    status: PropTypes.oneOf(["offShift", "onShift", "onBreak"])
  }
};
