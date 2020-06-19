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

  deleteCats(name) {
    return fetch(`${config.API_ENDPOINT}`)
  }

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
  }
}




export default PetfulApiService
// localhost:8000/api/pets/dog
// localhost:8000/api/pets/cat
