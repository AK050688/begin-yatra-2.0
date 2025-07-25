import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import axios from 'axios';
import api from '../../../../Api/ApiService';

const AddPlaceModal = ({ show, onClose, onPlaceCreated }) => {
  const [placeName, setPlaceName] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const placeImageRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
const token  = useSelector(selectAccessToken)
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('placeName', placeName);
      formData.append('placeDescription', placeDescription);
      if (placeImageRef.current?.files[0]) {
        formData.append('placeImage', placeImageRef.current.files[0]);
      }
      const res = await api.post(`/api/place`,  formData, {
        headers: {
          'Authorization': token,
        },
      
      });
      console.log("res Add place ",res);
      
      if (res.data.statusCode=== 201) {
        setMessage('Place created successfully!');
        setPlaceName('');
        setPlaceDescription('');
        if (placeImageRef.current) placeImageRef.current.value = '';
        onPlaceCreated && onPlaceCreated();
        onClose();
      } else {
        setMessage('Failed to create place.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-lg max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-4">Add Place</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Place Name:
              <input type="text" value={placeName} onChange={e => setPlaceName(e.target.value)} className="w-full border rounded px-2 py-1" required />
            </label>
          </div>
          <div>
            <label>Description:
              <textarea value={placeDescription} onChange={e => setPlaceDescription(e.target.value)} className="w-full border rounded px-2 py-1" required />
            </label>
          </div>
          <div>
            <label>Place Image:
              <input type="file" ref={placeImageRef} accept="image/*" className="w-full" required />
            </label>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{submitting ? 'Creating...' : 'Add Place'}</button>
          {message && <div className="mt-2 text-center text-red-500">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal; 