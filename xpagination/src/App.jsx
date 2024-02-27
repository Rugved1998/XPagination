import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  useEffect(() => {
    // Handle async nature of state update
    if (data.length > 0) {
      const lastPage = Math.ceil(data.length / perPage);
      if (currentPage > lastPage) {
        setCurrentPage(lastPage);
      }
    }
  }, [data, currentPage, perPage]);

  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / perPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const pageStyle={
    margin:"30px",
    backgroundColor:"#DCDCDC",
    display:"flex",
    flexDirection:"column"
  }
  const headerStyle={
    display:"flex",
    justifyContent:"center"
  }
  const footerStyle={
    display:"flex",
    justifyContent:"center",
    gap:"30px"
  }
  const colorStyle={
    backgroundColor:"#228B22",
    color:"white",
  }
  const rowStyle={
    
  }
  return (
    <div style={pageStyle}>
      <div style={headerStyle}> <h1>Employee Data Table</h1></div>
      
      <table>
        
        <thead >
          <tr style={colorStyle}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} style={rowStyle}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
       <br />     
      <div style={footerStyle}>
        <button data-testid="prevButton" style={colorStyle} onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span data-testid="currentPage" style={colorStyle}>Page {currentPage}</span>
        <button data-testid="nextButton" style={colorStyle} onClick={nextPage} disabled={currentPage === Math.ceil(data.length / perPage)}>
          Next
        </button>
      </div>
      <br />
    </div>
  );
};


