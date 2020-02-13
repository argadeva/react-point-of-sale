import API from "../../axios/Api";

export const login = user => {
  return API.post(
    "/users/login",
    {
      email: user.email,
      password: user.password
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.data.token !== undefined) {
        localStorage.setItem("usertoken", res.data.token);
      } else {
        window.location.reload();
      }
    })
    .catch(err => {
      console.log(err);
    });
};
