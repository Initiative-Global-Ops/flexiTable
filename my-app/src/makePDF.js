import React, { Component } from "react";
import { render } from "react-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Table from './Table';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#000'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

 
  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="letter" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
   
  );

//   return(
//     <button onClick={this.MyDocument} type="primary">Download PDF</button>
//   );
  
  export default MyDocument;