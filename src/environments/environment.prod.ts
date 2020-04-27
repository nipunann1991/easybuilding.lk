

let serverUrl = "http://localhost:81/easybuilding-api/";

export const environment = {
  production: true,
  baseUrl: serverUrl+'index.php/',
  uploadPath: serverUrl+"/assets/uploads/",
  token: JSON.parse(localStorage.getItem('token'))
};
