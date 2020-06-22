import config from "../config";

const PetfulApiService = {
  getCat() {
    return fetch(`${config.API_ENDPOINT}/pets/cat`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteCat() {
    return fetch(`${config.API_ENDPOINT}/pets/cat`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  },

  getDog() {
    return fetch(`${config.API_ENDPOINT}/pets/dog`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteDog() {
    return fetch(`${config.API_ENDPOINT}/pets/dog`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  },

  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postPeople(user) {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: user }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deletePeople() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  },
};

export default PetfulApiService;
