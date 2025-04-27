import  { useState } from 'react'
import './App.css'

function App() {
  const [json, setJson] = useState("")
  const [csv, setCsv] = useState("")
  
  const style = {
    container: {
      backgroundColor: 'lightblue',
      padding: '200px',
      borderRadius: '120px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      fontSize: '16px',
      lineHeight: '1.5',
      margin: '0 auto',
      maxWidth: '600px',
      textAlign: 'left' as const,
      marginTop: '70px',
      marginBottom: '20px',
    },
    textBox: {
      width: '70%',
      backgroundColor: 'rgb(210, 210, 245)',
      color: 'rgb(20, 90, 70)',
      fontSize: '20px',
      
      
    },
    heading: {
      fontSize: '34px',
      fontWeight: 'italic',
      marginBottom: '10px',
      color: 'rgb(27, 156, 118)',
    }
  }
  
  const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {  
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = ({target}) => {
      const content = target?.result;
      if (content) {
        const text = content.toString();
        if (file.type === 'application/json') {
          setJson(text);
        } else if (file.type === 'text/csv') {
          setCsv(text);
        }
      }
    }
    reader.readAsText(file);
  }
  const converter  = () => {
    if (json) {
      const jsonData = JSON.parse(json);
      const csvData = jsonData.map((row: string) => Object.values(row).join(',')).join('\n');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      a.click();
    } else if (csv) {
      const csvData = csv.split('\n').map(row => row.split(','));
      const jsonData = csvData.map((row) => {
        return row.reduce((acc: any, value: any, index: number) => {
          acc[`column${index + 1}`] = value;
          return acc;
        }, {});
      });
      const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      a.click();
    } 
  }
  return (
    <div>
      <h1 style={style.heading}>A tool tailored Just for You &lt;3</h1>
      <div>
        <article style={style.container}>
          <h1>
            JSON &gt;&gt; CSV
          </h1>
          <p>
            CSV stands for Comma-Separated Values.
          </p>
          <hr />
          <p>It is a simple file format used to store tabular data, such as a spreadsheet or database.</p>
          <hr />
          <p>Each line of the file represents a row of data, and each value in the row is separated by a comma.</p>
          <input style={style.textBox} type="file" onChange={(e) => { readFile(e); converter(); }}  accept='.json'/>
        </article>
      </div>
      <div>
        <article style={style.container}>
          <h1>
           CSV &gt;&gt; JSON
          </h1>
          <p>
            JSON stands for JavaScript Object Notation.
          </p>
          <hr />
          <p>It is a simple file format used to store tabular data, such as a spreadsheet or database. <q>yeah this line is the same as <b>The one</b> in <small>CSV</small></q></p>
          <hr />
          <p>Each line consists of key : value pairs and begins and ends with  <small>curly { } braces</small></p>
          <input style={style.textBox} type="file"  onChange={(e) => {readFile(e); converter()}} accept='.csv' />
        </article>
      </div>

    </div>

  )
}

export default App
