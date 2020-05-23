const API = "http://localhost:8080";

export const createUser = (user) => {
  return fetch(`${API}/api/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readUsers = () => {
  return fetch(`${API}/api/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readUserById = (userId) => {
  return fetch(`${API}/api/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUser = (userId, user) => {
  return fetch(`${API}/api/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (userId) => {
  return fetch(`${API}/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
