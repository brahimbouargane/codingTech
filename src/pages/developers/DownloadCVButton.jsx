import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DownloadCVButton({ developerId }) {
  const [cvUrl, setCvUrl] = useState("http://res.cloudinary.com/dgqgv1xsg/image/upload/v1699125035/80d0e9be-568a-4e8e-80bb-7b1bb34918db.pdf");

  useEffect(() => {
    // Make an API request to get the CV URL
    axios.get(`http://localhost:7777/developers/${developerId}/cv-url`)
      .then(response => {
        setCvUrl("http://res.cloudinary.com/dgqgv1xsg/image/upload/v1699125035/80d0e9be-568a-4e8e-80bb-7b1bb34918db.pdf");
      })
      .catch(error => {
        console.error('Error fetching CV URL:', error);
      });
  }, [developerId]);

  return (
    <div>
      {cvUrl ? (
        <a href={cvUrl} download="developer_cv.pdf">Download CV</a>
      ) : (
        <p>CV not available</p>
      )}
    </div>
  );
}

export default DownloadCVButton;
