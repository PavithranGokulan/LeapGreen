import { useState } from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scheduled Maintenance Checklist - Nacelle</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1, h2 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>

    <h1>Scheduled Maintenance Checklist - Nacelle</h1>
    <p><strong>LOC NO:</strong> 338</p>
    <p><strong>Permit No:</strong> 338/Nacelle/2023/028</p>
    <p><strong>Team Leader:</strong> Arulkumar</p>
    <p><strong>HTSC NO:</strong> 293</p>
    <p><strong>Breakdown Type:</strong> Schedule Error</p>
    <p><strong>Maintenance Date:</strong> 28-11-2023</p>
    <p><strong>Site Engineers Name:</strong> Arulkumar, Shankarganesh, MuthuKrishnan, Nishanth, N.Karthik, Rajkumar</p>
    <p><strong>Turbine Stop Date And Time:</strong> 28-11-2023 09:30</p>
    <p><strong>Turbine Restore Date And Time:</strong> 28-11-2023 14:36</p>
    <p><strong>Permit Open Time:</strong> 28-11-2023 09:35:00</p>
    <p><strong>Permit Close Time:</strong> 28-11-2023 16:46:02</p>
    <p><strong>Checklist Entry Open Time:</strong> 28-11-2023 09:35:21</p>
    <p><strong>Checklist Entry Close Time:</strong> 28-11-2023 16:45:24</p>
    <p><strong>Site:</strong> Bogampatty</p>
    <p><strong>List:</strong> Nacelle</p>

    <h2>Scheduled Maintenance Checklist</h2>
    <table>
        <tr>
            <th>SR. NO.</th>
            <th>CHECK POINT DETAILS</th>
            <th>STATUS</th>
            <th>REMARKS</th>
            <th>UPDATED REMARKS</th>
        </tr>
        <tr>
            <td>A</td>
            <td>General Rules at Service Check (Nacelle)</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>1</td>
            <td>Tightening Torque Rules for V47-500/600 kW Half Yearly</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Lubrication Rules and General check for V47-500/600 KW Half Yearly</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>B</td>
            <td>Safety Rules (Nacelle)</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>1</td>
            <td>Locking of Rotor Half Yearly</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <!-- More checklist items -->
    </table>

    <h2>Other Sections</h2>
    <ul>
        <li>Documents Used at Service Check (Nacelle)</li>
        <li>Fall Protection System (Nacelle)</li>
        <li>Anchor Points (Nacelle)</li>
        <li>Nose Cone (Nacelle)</li>
        <li>Blades (Nacelle)</li>
        <li>Hub and Blade Bearing (Nacelle)</li>
        <!-- More sections -->
    </ul>

    <h2>Additional Information</h2>
    <p><strong>Permit Image:</strong> <em>Image placeholder</em></p>

</body>
</html>
`;

export default function Example() {
  const [selectedPrinter, setSelectedPrinter] = useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});
