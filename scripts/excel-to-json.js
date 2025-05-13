const XLSX = require('xlsx');
const fs = require('fs');

// Cambia el nombre del archivo si es necesario
const workbook = XLSX.readFile('leads.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convierte a JSON
const leads = XLSX.utils.sheet_to_json(worksheet);

// Guarda el JSON en un archivo
fs.writeFileSync('leads.json', JSON.stringify(leads, null, 2));
console.log(`Leads convertidos a JSON: ${leads.length}`); 