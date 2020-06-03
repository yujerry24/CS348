import React, { Component, useState } from 'react';
import DataTable from './ui/DataTable';
import './App.css';

const App = () => {
    const headings = [
      'Artist',
      'Title',
      'Year'
    ];
    
    const [rows, setRows] = useState([
      [
        'Jerry',
        'I need context',
        2
      ],
      [
        'Yellow plaid scarf',
        '$35.00',
        20
      ],
      [
        'Blue plaid scarf',
        '$35.00',
        10
      ],
      [
        'Pink plaid scarf',
        '$35.00',
        4
      ],
    ]);

    const getData = () => {
      fetch("http://localhost:4000/playlist1").then((res) => res.json()).then((data) => {
        console.log(data);
        setRows(data.map((val, index) => {
          return [val['artist'], val['title'], val['year']];
        }))
      });
    }

    return (
      <div>
        <button onClick={() => getData()}>Click me!</button>
        <div>
          <DataTable headings={headings} rows={rows} />
        </div>
      </div>
    );
}

export default App;