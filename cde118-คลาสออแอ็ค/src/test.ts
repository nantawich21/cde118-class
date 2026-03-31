import Papa from 'papaparse';

async function test() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/1X5XRaNDwWpwAGvHL2Tpt_HMCPTNUHSZHQkXMPZ2Ewsw/export?format=csv');
  const text = await res.text();
  console.log(text.split('\n')[0]);
}
test();
