import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Toggle from "react-toggle";

/* URL definitions */
let base_url = "http://localhost:3001/";
let load_containers_url = `${base_url}` + "containers/json";
let containers_action_url = "containers/";

const tableStyle = {
  textAlign: "center",
  color: "#5a5a5a",
  fontSize: "16px",
  fontWeight: "500",
};

const renderHeader = () => {
  let headerElement = ["name", "Last Pushed", "status", "logs", "action"];

  return headerElement.map((item, index) => {
    return (
      <th key={index} style={{ textAlign: "center" }}>
        {item.toUpperCase()}
      </th>
    );
  });
};

function Containers() {
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  /* Load the containers by invoking Docker Engine REST API */
  const loadContainers = async () => {
    let response = await fetch(load_containers_url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setData(response);
  };

  const handleLoadContainers = () =>  {
    setView(true);
    loadContainers();
  }

  /* Start or Stop the container based on the trigger */
  const startOrStopContainer = (value, item) => {
    //Decode the state value based on the onclick event value
    let Statevalue = value.target.checked === true ? "Started" : "Exited";
    let actionValue = value.target.checked === true ? "/start" : "/stop";

    /* Form the container url */
    let container_url =
      `${base_url}` +
      `${containers_action_url}` +
      `${item.Id}` +
      `${actionValue}`;

    /* Invoke the start/stop container API followed by load container API */
    fetch(container_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: item.Id,
        Names: item.Names,
        State: Statevalue,
        Status: item.Status,
        Created: item.Created,
        Image: item.Image,
      }),
    }).then(function() {
      //Refresh the page once the start/stop container operation is completed
      loadContainers();
    });
    console.log("ItemName:" + `${item.Names}`);
    let name = item.Names;
    let action = value.target.checked === true
    ? " started"
    : " stopped";
    toast(`${item.Names}` + ` container` +  action + ` successfully`, { iconClass: "toast-custom" });
  };

  var renderData =
    data !== undefined &&
    data.map((item, index) => {
      console.log("item.id1", item.Id);

      return (
        <tr key={index} style={{ height: "40px", border: "1px solid #c9c9c9" }}>
          <td style={tableStyle}>{item.Names}</td>
          <td style={tableStyle}>{new Date(item.Created).toDateString()}</td>
          <td style={tableStyle}>{item.State}</td>
          <td style={tableStyle}>{item.view}</td>
          <td className="action-table" style={{ textAlign: "center" }}>
            <Toggle
              id={item.Id}
              defaultChecked={item.State === "Exited" ? false : true}
              onChange={(defaultChecked) =>
                startOrStopContainer(defaultChecked, item)
              }
            />
            <label htmlFor={item.Id} disable="true"></label>
          </td>
        </tr>
      );
    });

  return (
    
    <>
    <div className="container">
    <button 
    onClick= {() => handleLoadContainers()}
    style={{marginTop:"30px",cursor:"pointer",fontSize:"16px",fontWeight:600,border:"none", padding:"10px 12px", color:"#fff", background:"#0354cb"}}>View Containers</button>
    { view ?  
    <div className="ViewContainers" style={{ clear: "both" }}>
      <div
        className="table"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          display: "flex",
        }}
      >
        <table style={{ marginTop: "40px", width: "750px" }}>
          <tr
            style={{
              backgroundColor: "#03a9f4",
              color: "#fff",
              height: "38px",
            }}
          >
            {renderHeader()}
          </tr>
          <tbody>{renderData}</tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
    : null } 
    </div>
    </>
  );
}

export default Containers;
