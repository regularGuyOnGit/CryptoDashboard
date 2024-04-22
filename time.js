const timestamp = 1698105600000; // Your timestamp in milliseconds
const date = new Date(timestamp);

// Extracting the month name
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = monthNames[date.getMonth()];

console.log(month);
