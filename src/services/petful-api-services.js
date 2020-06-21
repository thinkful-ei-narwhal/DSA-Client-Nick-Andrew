import config from '../config'

const PetfulApiService = {
  getCat() {
    return fetch(`${config.API_ENDPOINT}/pets/cat`, {
      headers: {
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  },

  deleteCat(name) {
    return fetch(`${config.API_ENDPOINT}/pets/cat`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  getDog() {
    return fetch(`${config.API_ENDPOINT}/pets/dog`, {
      headers: {
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  }, 

  deleteDog(name) {
    return fetch(`${config.API_ENDPOINT}/pets/dog`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      headers: {
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  },

  postPeople(user) {
    return fetch(`${config.API_ENDPOINT}/people/${user}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      }, body: JSON.stringify({
        user
      }),
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  deletePeople(name) {
    return fetch(`${config.API_ENDPOINT}/people/${name}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },
}




export default PetfulApiService

