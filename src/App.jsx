// src/App.jsx
import React, { useState, useRef } from 'react';
import { db, broadcastChannel } from './main';
import './App.css';
import { FiUserPlus, FiDatabase, FiPlay, FiTrash2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  
  const [sql,  setSql ] = useState('SELECT * FROM users;');
  const [error,  setError ] = useState('');

  const sqlRef = useRef(sql);
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

  // Add new user with all fields, then tell everyone to refresh
  const handleAddUser = async (e) => {
    e.preventDefault();

    // Get values from form refs
    const nameValue = nameRef.current.value.trim();
    const ageValue = ageRef.current.value.trim();
    const genderValue = genderRef.current.value.trim();

    // Validate all fields
    if (!nameValue || !ageValue || !genderValue) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate age is a number
    if (isNaN(ageValue) || ageValue < 0 || ageValue > 120) {
      toast.error('Please enter a valid age (0-120)');
      return;
    }

    try {
      // Insert with all fields
      await db.query(
        'INSERT INTO users (name, age, gender) VALUES ($1, $2, $3);',
        [nameValue, parseInt(ageValue), genderValue]
      );

      // Clear form fields
      nameRef.current.value = '';
      ageRef.current.value = '';
      genderRef.current.value = '';

      // Refresh and broadcast
      sqlRef.current = 'SELECT * FROM users;'
      toast.success('User created successfully!');
      setError("")
      broadcastChannel.postMessage({ type: 'REFRESH_DATA' });

    } catch (err) {
      console.error('Insert error:', err);
      toast.error('Failed to save user: ' + err.message);
    }
  };





return (
    <div className="relative w-200px">
       {/* Toast Container Positioned at top-right */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl p-11">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <FiDatabase className="text-blue-500 mr-3" />
            Patient Management System
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiUserPlus className="mr-2 text-green-500" />
                New Patient Registration
              </h2>
              <form onSubmit={handleAddUser} className="space-y-6">
                <div>
                  <label className="block text-sm text-left font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    ref={nameRef}
                    placeholder="Shivam Singh Bhadoria"
                    className="w-full text-black px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-left text-gray-600 mb-1">Age</label>
                  <input
                    type="number"
                    ref={ageRef}
                    placeholder="23"
                    className="w-full text-black px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-left text-gray-600 mb-1">Gender</label>
                  <select
                    ref={genderRef}
                    className="w-full text-black px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all shadow-md"
                >
                  <FiUserPlus className="mr-2" />
                  Register Patient
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

