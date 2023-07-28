

export default function timeFormat(timestampFromBackend )
{

// Convert the timestamp to a Date object
const dateObject = new Date(timestampFromBackend);

// Get the individual components of the date
const year = dateObject.getFullYear();
const month = String(dateObject.getMonth() + 1).padStart(2, "0");
const day = String(dateObject.getDate()).padStart(2, "0");
const hours = String(dateObject.getHours()).padStart(2, "0");
const minutes = String(dateObject.getMinutes()).padStart(2, "0");

// Concatenate the components to form the desired format
const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

return formattedDate;

}
