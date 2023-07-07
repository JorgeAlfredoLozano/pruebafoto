import React, { useState } from 'react';
import axios from 'axios';

const apiKey = '9f6c6345c293cd9ea633a1d2e70f1b01'; // Reemplaza 'tu_api_key' con tu API key de ImgBB

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      axios
        .post('https://api.imgbb.com/1/upload', formData, {
          params: {
            key: apiKey
          }
        })
        .then((response) => {
          console.log(response.data.data.url)
          setUploadedImage(response.data.data.url);
        })
        .catch((error) => {
          console.error('Hubo un error al subir la imagen:', error);
        });
    }
  };

  return (
    <div>
      <h1>Cargar foto a ImgBB</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cargar foto</button>

      {uploadedImage && (
        <div>
          <h2>Imagen subida</h2>
          <img src={uploadedImage} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default App;
