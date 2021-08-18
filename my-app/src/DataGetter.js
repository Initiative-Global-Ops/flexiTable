import React from "react";
import { useEffect, useState, useRef } from 'react';
require("./App.css");

const { tableau } = window;
// console.log("window", window)


function DataGetter(props){
  const {data, setData, columns, setColumns} = props

  // console.log("columns", columns)
  // console.log("setData", setData)

  useEffect(() => {
  // console.log("useEffect", useEffect)
    tableau.extensions.initializeAsync().then(() => {
      const dashboardName = tableau.extensions.dashboardContent.dashboard.name;   
      tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "flexiTable").getUnderlyingDataAsync().then(dataTable => {
 
        var dataJson;
        var dataArr = [];
        var cols = [];
        dataTable.columns.map(d => {
          cols.push(d.fieldName);
       })

       dataTable.data.map(d => {
          dataJson = {};
          for (let i = 0; i < cols.length; i++) {   
            if (cols[i].includes("CTR") || cols[i].includes("VCR") || cols[i].includes("Conversion Rate") || cols[i].includes("Engagement Rate")){
              dataJson[cols[i]] = !isNaN(d[i].value) ? (d[i].value * 100).toFixed(2) + "%" : "-";
            } else {
             dataJson[cols[i]] = d[i].value
            }
        
        }  
          dataArr.push(dataJson)
      });

      var convertToPercentages = function (arr, max) {
        return dataArr.map(function (d, i) {
            return (100 * d / max) | 0;
        });
      }

  
        const {data} = dataArr
        const {columns} = dataTable

        setData(dataArr)
        setColumns(columns)

      });
    });
    }, [])

  return <div>i dont do nothing - i'm just a dumb old datagetter</div>
}

export default DataGetter;
