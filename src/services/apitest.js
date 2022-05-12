var axios = require('axios');
var qs = require('qs');
// var data = JSON.stringify({
//   "UP_PKeyID": 1,
//   "Type": 1
// });

// var config = {
//   method: 'post',
//   url: 'http://apifashion.ikaart.org/api/Fashion/GetUserPost',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   data : data
// }

let data = qs.stringify({
  username: 'finalname@gmail.com',
  password: '1234567890',
  clientid: 1,
  grant_type: 'password',
});
axios('http://apifashion.ikaart.org/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  data: data,
})
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
