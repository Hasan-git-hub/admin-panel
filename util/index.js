const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const loading = document.querySelector(".loaging");
const wrapper = document.querySelector(".wrapper");
const api = "https://fakestoreapi.com/auth/login";
const usernameRegex = "derek";
const passwordRegex = "jklg*_56";
const singingBtn = document.querySelector(".singing-btn");

singingBtn.addEventListener("click", () => {
  window.location.href = "pages/singin.html";
});
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  if (username !== "derek" || password !== "jklg*_56") {
    Swal.fire({
      title: "Xato!",
      text: "Username yoki password noto‘g‘ri",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  const user = { username, password };

  axios.post(api, user)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.href = "pages/dashbord.html";
    })
});
