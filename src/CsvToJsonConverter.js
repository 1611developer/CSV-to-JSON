// src/CsvToJsonConverter.js

import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const CsvToJsonConverter = () => {
    const [jsonData, setJsonData] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setJsonData(JSON.stringify(results.data, null, 2));
                    setError(null);
                },
                error: (err) => {
                    setError("Error parsing CSV: " + err.message);
                    setJsonData(null);
                },
            });
        }
    };

    const handleDownload = () => {
        const blob = new Blob([jsonData], { type: 'application/json' });
        saveAs(blob, 'converted_data.json');
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">CSV to JSON Converter</h1>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {jsonData && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Converted JSON</h2>
                    <pre className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded">
                        {jsonData}
                    </pre>
                    <button
                        onClick={handleDownload}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Download JSON
                    </button>
                </div>
            )}
        </div>
    );
};

export default CsvToJsonConverter;