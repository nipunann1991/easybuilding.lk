

let serverUrl = "https://easybuilding.herokuapp.com/easybuilding-api/";

export const environment = {
  production: true,
  baseUrl: serverUrl+'index.php/',
  uploadPath: serverUrl+"/assets/uploads/",
  token: JSON.parse(localStorage.getItem('token')),
  profileUrl: '/my-account/user/me/0/about'
};
