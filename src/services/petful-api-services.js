import config from '../config'

const PetfulApiService = {
  getCats() {
    return fetch(`${config.API_ENDPOINT}/cat`, {
      headers: {
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  },

  deleteCat(name) {
    return fetch(`${config.API_ENDPOINT}/cat/${name}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  getDogs() {
    return fetch(`${config.API_ENDPOINT}/dog`, {
      headers: {
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json())
  }, 

  deleteDog(name) {
    return fetch(`${config.API_ENDPOINT}/dog/${name}`, {
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

  postPeople(people) {
    const { name } = people;

    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      }, body: JSON.stringify({
        name
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

