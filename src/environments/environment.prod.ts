

let serverUrl = "https://easybuilding.lk/easybuilding-api/";

export const environment = {
  production: true,
  siteUrl: 'https://easybuilding.lk/', 
  baseUrl: serverUrl+'index.php/',
  uploadPath: serverUrl+"/assets/uploads/",
  token: JSON.parse(localStorage.getItem('token')),
  profileUrl: '/my-account/user/me/about',
  fb_provider: "780057816008651",
  google_provider: "308484019125-bouf476qe8mbm9593net0fad8ddgts5q.apps.googleusercontent.com",
  tinyMCEAPI: "pckrow7imtz8efu8d15fa1kcbnpvqybfgzlzthu5zln78wyc"
};
