import React, { useState, useEffect } from "react";
import timeFormat from '../utils/timeFormat'
const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      
  const dataWithLocalTime = data.map((item) => {
    const localTimestamp = new Date(item.time).toLocaleString();
    const formattedDate = timeFormat(localTimestamp)
    return { ...item, localTime: formattedDate }; // Add 'localTime' property to each item with the converted timestamp
  });
  setFeedData(dataWithLocalTime);
; // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Function to fetch data from the backend


    // Call the fetchData function when the component mounts
    fetchData();
  }, [feedData]); // The empty dependency array ensures that the effect runs only once when the component mounts


  const handleClick = (e, userId) => {
    e.preventDefault();
       console.log(userId);
    fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle the successful response, such as updating the state or re-fetching the data
        fetchData();
        console.log("User deleted successfully!");
      })
      .catch((error) => {
        // Handle errors from the API call
        console.error("Error deleting user:", error.message);
      });
  };



  return (
    <div style= {{backgroundColor:'#51E2F5', padding:'20px'}}>
      <h1>Forum Page</h1>
      <h3> Total Comments: {feedData.length} </h3>
      {feedData.map((feed) => (
        <div key={feed.id} >
          <p>ID: {feed.id}</p>
          <p>Name: {feed.name}</p>
          <p>Content: {feed.content}</p>
          <p> {feed.localTime} </p>
          <img src="deleteIcon.png" onClick={(e) => handleClick(e, feed.id)} style={{ width: '20px', height: '20px' }}/>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default Feed;
