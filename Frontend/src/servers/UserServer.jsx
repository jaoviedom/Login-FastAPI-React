const TOKEN_URL = "http://127.0.0.1:8000/token";
const ADD_URL = "http://127.0.0.1:8000/adduser/";
const GET_USERS_URL = "http://127.0.0.1:8000/users/";

export const login = async(username, password) => {
  return await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`)
  });
}

export const listUsers = async () => {
  return await fetch(GET_USERS_URL);
};

export const registerUser = async (newUser) => {
  return await fetch(ADD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': String(newUser.name).trim(),
      'username': String(newUser.username).trim(),
      "email": String(newUser.email).trim(),
      "full_name": String(newUser.full_name).trim(),
      "hashed_password": String(newUser.hashed_password).trim(),
      "disabled": String(newUser.disabled).trim(),
    })
  });
};

export const getUser = async (userId) => {
  return await fetch(`${API_URL}${userId}`);
};

export const updateResidential = async (residentialId, updatedResidential) => {
  return await fetch(`${API_URL}${residentialId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': String(updatedResidential.name).trim(),
      "address": String(updatedResidential.address).trim(),
      "city": String(updatedResidential.city).trim(),
      "departament": String(updatedResidential.departament).trim(),
      "email": String(updatedResidential.email).trim(),
      "phone": String(updatedResidential.phone).trim(),
      "administrator": String(updatedResidential.administrator).trim()
    })
  })
}