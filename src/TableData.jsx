// src/App.jsx
import React from 'react';

export default function TableData({ rows }) {
  return (
    <div className="overflow-x-auto">
      {/* Scrollable vertically, max 400px tall */}
      <div className="max-h-40 overflow-y-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100 sticky top-0">
            <tr>
              {rows.length > 0
                ? Object.keys(rows[0]).map(col => (
                    <th
                      key={col}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase"
                    >
                      {col}
                    </th>
                  ))
                : (
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      No Columns
                    </th>
                  )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0
              ? (
                <tr>
                  <td className="px-4 py-2 text-black" colSpan={1}>
                    No rows returned
                  </td>
                </tr>
              )
              : rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {Object.values(row).map((cell, i) => (
                      <td key={i} className="px-4 py-2 border-t text-sm text-gray-800">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}