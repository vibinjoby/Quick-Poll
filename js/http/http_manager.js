function post(urlParam, requestParams, callback) {
  const url = "http://localhost:3000/api" + urlParam;
  fetch(url, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(requestParams),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      callback(true, response);
    })
    .catch(function (err) {
      console.log(err);
      callback(false, null);
    });
}

function get(urlParam, headers, callback) {
  const url = "https://quick-poll-server.herokuapp.com" + urlParam;

  fetch(url, {
    mode: "cors",
    method: "GET",
    headers: headers,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      callback(true, response);
    })
    .catch(function (err) {
      console.log(err);
      callback(false, null);
    });
}

function checkResponse(response, callback) {
  let success = response.success;
  if (success) {
    let id = response.id;
    callback(true, id);
  } else {
    callback(false, response.message);
  }
}
export { post, get, checkResponse };
