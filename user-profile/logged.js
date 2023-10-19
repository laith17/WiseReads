var user = sessionStorage.getItem("userId");
var profileIcon = document.getElementById("profile-icon");
var groupBtns = document.getElementById("groupBtns");

if (user !== "" && user !== null) {
    profileIcon.style.display = 'block';
    groupBtns.style.display = 'none';
} else {
    profileIcon.style.display = 'none';
    groupBtns.style.display = 'block';
}
function logOut(){
    sessionStorage.removeItem("userId");
    // removeData();
    window.location.href = "../index.html";
}