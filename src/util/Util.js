export const print = (text) => {
  var myDiv = document.getElementById("app");

  myDiv.innerHTML +=
    "<div style='color:white; background-color: black;margin-bottom: 1px;font-weight: bold;padding: 3px; padding-left: 20px;'>" +
    text +
    "</div>";

  document.body.appendChild(myDiv);
};
