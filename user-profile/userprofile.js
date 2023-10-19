async function getUserData(id) {
    const response = await fetch("http://localhost:3000/users");
  
    const info = await response.json();
  
    const firstname = info[id - 1].fName;
  
    document.querySelector(".firstname2").textContent = firstname;
  
    const lastname = info[id - 1].lName;
  
    document.querySelector(".lastname2").textContent = lastname;
  
    const email = info[id - 1].email;
  
    document.querySelector(".email2").textContent = email;
  
    const address = info[id - 1].address;
  
    document.querySelector(".address2").textContent = address;
  }
  getUserData(1);
  // -----------------------------------------------------
  async function updateUserData() {
    const userId = 1; // ID of the user you want to update
    const firstname2 = document.getElementById("firstName").value;
    const lastname2 = document.getElementById("lastName").value;
    const address2 = document.getElementById("address").value;
    const existingEmail = document.querySelector(".email2").textContent;
  
    // Only update if firstname2 is not null or empty
    if (firstname2) {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fName: firstname2,
          lName: lastname2,
          address: `Address: ${address2}`,
          email: `${existingEmail}`, // Preserve the existing email
        }),
      });
  
  
      if (response.ok) {
        console.log("User data updated successfully");
      } else {
        console.error("Failed to update user data");
      }
    }
  }
  
  // ----------------------------------------------------------------------------------
  // removeData from JSON
  // function removeData() {
  //   // Specify the URL of the endpoint
  //   const userId = 1;
  //   const firstname2 = document.getElementById("callfirstname").value;
  //   const lastname2 = document.getElementById("calllastname").value;
  //   const address2 = document.getElementById("calladdress").value;
  //   const existingEmail = document.querySelector(".email2").textContent;
  
  //   fetch(`http://localhost:3000/users/${userId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // You can include a request body if needed
  //     body: JSON.stringify({
  //       firstname: firstname2,
  //       lastname: lastname2,
  //       address: `Address: ${address2}`,
  //       email: `${existingEmail}`,
  //     }),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Data removed successfully:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error removing data:', error);
  //     });
  // }
  // // ----------------------------------------------------------------------------------
  
  // // profilepic
  // let ProfilePic = document.getElementById("profilepic");
  // let InputFile = document.getElementById("input-file");
  
  // addEventListener('load', () => {
  //   const storedProfilePic = sessionStorage.getItem('profilePic');
  //   if (storedProfilePic) {
  //     ProfilePic.src = storedProfilePic;
  //   }
  // });
  
  // InputFile.onchange = function () {
  //   const imageUrl = URL.createObjectURL(InputFile.files[0]);
  
  //   // Save the profile picture data to session storage
  //   sessionStorage.setItem('profilePic', imageUrl);
  
  //   ProfilePic.src = imageUrl;
  // }
  // // ----------------------------------------------------------------------------------
  // // LOGOUT
  // function Logout() {
  //   sessionStorage.removeItem('userId');
  //   sessionStorage.removeItem('profilePic');
  //   removeData();
  //   window.location.href = '../index.html';
  // }
  
  