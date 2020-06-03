import React, { Component, useState } from 'react';
import DataTable from './ui/DataTable';
import Input from './ui/Input';
import Button from './ui/SubmitButton';
import './App.css';

const headings = [
  'Artist',
  'Title',
  'Year'
];

const rows = [
  [
    'Bruno Mars',
    'Gernade',
    2010
  ],
  [
    'Unknown',
    'Feel Special',
    2019
  ]
];

class App extends Component {
  render() {

    return (
      <div className = 'container'>
        <Input/>
        <Button/>
        <DataTable headings={headings} rows={rows} />
      </div>
    );
}

export default App;