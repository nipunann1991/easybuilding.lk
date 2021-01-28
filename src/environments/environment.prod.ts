

let serverUrl = "https://easybuilding.biz/easybuilding-api/";

export const environment = {
  production: true,
  siteUrl: 'https://easybuilding.biz/', 
  baseUrl: serverUrl+'index.php/',
  uploadPath: serverUrl+"/assets/uploads/",
  token: JSON.parse(localStorage.getItem('token')),
  profileUrl: '/my-account/user/me/about',
  fb_provider: "1143031585749453",
  google_provider: "308484019125-bouf476qe8mbm9593net0fad8ddgts5q.apps.googleusercontent.com"
};
