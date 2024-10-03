// src/App.js

import React from 'react';
import CsvToJsonConverter from './CsvToJsonConverter';

const App = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <CsvToJsonConverter />
        </div>
    );
};

export default App;