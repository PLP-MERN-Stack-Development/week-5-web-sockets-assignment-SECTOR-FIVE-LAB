import React from 'react';

const FileUpload = ({ socket }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    socket.emit('file_shared', { filePath: data.filePath });
  };

  return <input type="file" onChange={handleFileUpload} />;
};

export default FileUpload;