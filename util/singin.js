const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const loading = document.querySelector(".loaging");
const wrapper = document.querySelector(".wrapper");
const api = "https://fakestoreapi.com/auth/login";
const usernameRegex = "derek";
const passwordRegex = "jklg*_56";
const singingBtn = document.querySelector(".singing-btn");

singingBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();
  if (username !== usernameRegex || password !== passwordRegex) {
    Swal.fire({
      title: "Xato!",
      text: "bunday account mavjud emas",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }
  errorMessage.style.display = "none";
  const user = { username, password };
  axios.post(api, user).then((res) => {
    const token = res.data.token;
    localStorage.setItem("token", token);
    window.location.href = "dashbord.html";
  });
});
