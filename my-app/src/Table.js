"use strict";

import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import React, { Component } from "react";
import { render } from "react-dom";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './styles.css';
import { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


    const pagination = true;
    const paginationPageSize = 100;
    const rowHeight = 30;
    const suppressRowTransform = true;
 
class Table extends Component {
    constructor(props) {
        super(props);
      
  // console.log(props)

        this.state = {      
          columnDefs: [
            {
              field: "Custom Creative Field 2",
              filter: false,
            },
            {
              field: "Creative Dimension",
            
              filter: false,
          
            },
            {
              field: "Impressions",
            
              filter: false,  
            },
            {
              field: "Clicks",
           
              filter: false,  
            },
            {
              field: "Creative Tactic / Campaign Qualifier",
           
              filter: false,  
            },
          ],
          
          defaultColDef: {
            cellStyle: { backgroundColor: 'white', 
            borderRight:'0.15px solid lightgrey' },
            resizable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
          },
          rowSelection: 'single',
          rowData: [],
        };   
      }
      
      onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    

      };

     onBtnExport = () => {
        this.gridApi.exportDataAsCsv();
      }

    handleChange = (e) => { 
        let tactic = {field: e.target.value}
        // console.log("tactic", tactic)
        // console.log("state", this.state)
        this.setState(prevState => ({
            columnDefs: [...prevState.columnDefs, tactic]
        }))
    }

    generatePDF = () => { 
      var doc = new jsPDF('p', 'pt', 'letter'); 
      doc.text(20, 20, 'Hello.')   
      doc.save('flexiTable.pdf')
    }  
    
      render() {    
        return (
          
          <div style={{ width: "100vw", height: "100vh" }}>
            
             <div
          style={{ marginTop:'0px', marginLeft:'10px',height: '0%', display: 'flex', flexDirection: 'column' }}
             >
        <span className="titles">DIMENSIONS</span>
        <span className="subhead">Select a dimension from dropdown lists to add it to the table</span> 
          <div className="btns-box">
          <select className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>KPIs</option>
                <option value="CTR">CTR</option>
                <option value="VCR">VCR</option>
                <option value="Conversion Rate">Conversion Rate</option>
                <option value="Engagement Rate">Engagement Rate</option>
            </select>
            <select className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>Volume Metrics</option>
                <option value="Impressions">Impressions</option>
                <option value="Clicks">Clicks</option>
                <option value="Rich Media Engagements">Rich Media Engagements</option>
                <option value="Total Conversions">Total Conversions</option>
            </select>
            
            <select className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>Strategy & Targeting Tactics</option>
                <option value="Contextual Environment">Contextual Environment</option>
                <option value="Creative Tactic / Campaign Qualifier">Creative Tactic / Campaign Qualifier</option>
                <option value="Audience">Audience</option>
            </select>
            <select className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>Product Inputs</option>
                <option value="Product">Product</option>
                <option value="Product Detail 1">Product Detail 1</option>
                <option value="Product Detail 2">Product Detail 2</option>
            </select>
            <select  className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>Creative Version Qualifiers</option>
                <option value="Creative Version">Creative Version</option>
                <option value="Custom Version Field 1">Custom Version Field 1</option>
                <option value="Custom Version Field 2">Custom Version Field 2</option>
                <option value="Custom Version Field 3">Custom Version Field 3</option>
                <option value="Creative Dimension">Creative Dimension</option>
                <option value="Creative Execution">Creative Execution</option>
            </select>
            <select className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>Real-Time Trigger Targeting</option>
                <option value="Data Provider">Data Provider</option>
                <option value="Trigger Type ">Trigger Type</option>
                <option value="Trigger Detail ">Trigger Detail</option>
                <option value="Trigger Parameter ">Trigger Parameter</option>
            </select>
            <select className="dropdown" onChange={(e) => this.handleChange(e)}>
                <option disabled selected value>Creative Element Insights</option>
                <option value="Custom Creative Field 1">Custom Creative Field 1</option>
                <option value="Custom Creative Field 2">Custom Creative Field 2</option>
                <option value="Custom Creative Field 3">Custom Creative Field 3</option>
                <option value="Custom Creative Field 4">Custom Creative Field 4</option>
                <option value="Custom Creative Field 5">Custom Creative Field 5</option>
                <option value="Custom Creative Field 6">Custom Creative Field 6</option>
                <option value="Custom Creative Field 7">Custom Creative Field 7</option>
                <option value="Custom Creative Field 8">Custom Creative Field 8</option>
                <option value="Custom Creative Field 9">Custom Creative Field 9</option>
                <option value="Custom Creative Field 10">Custom Creative Field 10</option>
                <option value="Custom Creative Field 11">Custom Creative Field 11</option>
                <option value="Custom Creative Field 12">Custom Creative Field 12</option>
            </select>
            <span className="focus"></span>
            
            </div>
            
        </div>
        <button className="export-btn" onClick={() => this.onBtnExport()}>
              Download CSV
            </button>


            {/* <button onClick={() => this.generatePDF()} type="primary">Download PDF</button>  */}
     
          
            <div
              id="myGrid"
              style={{
                paddingRight: "10px",
                marginTop:"15px",
                height: "90vh",
                width: "82vw",
                float: "right"
              }}
              className="ag-theme-alpine"
            >
        <span className="titles">PERFORMANCE BY DIMENSION</span>

              <AgGridReact
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                frameworkComponents={this.state.frameworkComponents}
                onGridReady={this.onGridReady}
                rowData={this.props.data}
                rowHeight={rowHeight}
                pagination={pagination} 
                paginationPageSize={paginationPageSize}
                suppressRowTransform={suppressRowTransform}
              />
            </div>
          </div>
        );     
      } 
    }


    

    // function getRowData(data, key) {
    //     var filtered_data = [];
    //     for ( let i=0; i< data.length; i++){
    //         if (data[i].Product == key){
    //             filtered_data.push(data[i])
    //         }
    //     }

    //     return filtered_data
    //   }
     

    

export default Table;

