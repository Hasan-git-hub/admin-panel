const userBox = document.querySelector(".info-name");
const passBox = document.querySelector(".info-pass");
const logout = document.querySelector(".logout-1");
const editBtn = document.querySelector(".edit");
const exitBtn = document.querySelector(".exit");

let isEdit = false;

function maskPassword(pass) {
  if (!pass) return "Noma'lum";
  if (pass.length <= 12) return pass;
  return pass.slice(0, 12) + "...";
}

function renderProfile() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  userBox.innerHTML = `
    <span>Username:</span>
    <p>${username || "Noma'lum"}</p>
  `;

  passBox.innerHTML = `
    <span>Password:</span>
    <p>${maskPassword(password)}</p>
  `;
}

renderProfile();

editBtn.addEventListener("click", () => {
  if (!isEdit) {
    userBox.innerHTML = `
      <input 
        type="text" 
        class="edit-inp" 
        id="editUser"
        maxlength="10"
        value="${localStorage.getItem("username") || ""}"
      >
    `;

    passBox.innerHTML = `
      <input 
        type="text" 
        class="edit-inp" 
        id="editPass"
        value="${localStorage.getItem("password") || ""}"
      >
    `;

    editBtn.textContent = "Save";
    isEdit = true;
  } else {
    const newUser = document.getElementById("editUser").value.trim();
    const newPass = document.getElementById("editPass").value.trim();

    if (!newUser || !newPass) {
      Swal.fire({
        title: "Xato!",
        text: "Username va password bo'sh bo'lishi mumkin emas",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (newUser.length > 10 && newPass.length > 12) { 
        Swal.fire({
        title: "Xato!",
        text: "Username va password juda uzun",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    else if (newPass.length < 6) {
      Swal.fire({
        title: "Xato!",
        text: "Password kamida 6 ta belgidan iborat bo'lishi kerak",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    else if (newUser.length < 4) {
      Swal.fire({
        title: "Xato!",
        text: "Username kamida 4 ta belgidan iborat bo'lishi kerak",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    else if (newUser.length > 10) {
      Swal.fire({
        title: "Xato!",
        text: "Username 10 ta belgidan oshmasligi kerak",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    else if (newPass.length > 12) {
      Swal.fire({
        title: "Xato!",
        text: "password 12 ta belgidan oshmasligi kerak",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    localStorage.setItem("username", newUser);
    localStorage.setItem("password", newPass);

    renderProfile();
    editBtn.textContent = "Edit";
    isEdit = false;
  }
});

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../index.html";
});

exitBtn.addEventListener("click", () => {
  window.location.href = "dashbord.html";
});

if (!localStorage.getItem("token")) {
  window.location.href = "/index.html";
}
