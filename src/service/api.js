const api = {
  getGifts : async() => {
    return await JSON.parse(localStorage.getItem('gifts'))
  },
  postGifts : gifts => {
    localStorage.setItem('gifts', JSON.stringify(gifts))
  }
}

export default api
