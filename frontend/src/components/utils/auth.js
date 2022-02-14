
export const baseUrl = 'https://api.mestoproject.students.nomoredomains.xyz';

// function checked(res) {
//   if (res.ok) {
//     // console.log('asd', res.json())
//     // return Promise.resolve(res.json());
//     return res.json();
//   }
//   return Promise.reject(res.status)
// }

function checked(res) {
  if (res.ok) {
    return res.json().then(jsonData => {
      console.log("GotJsonData", jsonData)
      return Promise.resolve(jsonData);
    });
  }
  return Promise.reject(res.status)
}

export const register = ({password, email}) => {
  return fetch(`${baseUrl}/signup`,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "password": password,
    "email": email
  })
})
.then((res) => {
  return checked(res)
})
}

export const authorize = ({identifier, password}) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": identifier
    })
  })
  .then((res) => {
    return checked(res)
  })
  .then((data) => {
    if (data) {
      localStorage.setItem('token', data.token);
    }
    return data;
  })
}


export const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => {
    return checked(res)
  })
  .then(({data}) => {
    return (data)
  })
}


