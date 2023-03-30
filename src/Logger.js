import React from "react";

const Logger = ({ shiftLog }) => {
  return (
    <>
      <hr />
      <h3>Logger</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {shiftLog
            .slice(0)
            .reverse()
            .map((entry, i) => (
              <tr key={i} dangerouslySetInnerHTML={{ __html: entry }} />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Logger;
