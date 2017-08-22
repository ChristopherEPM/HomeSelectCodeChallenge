const TOKEN = "https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization"
const HOST = "https://api.github.com"

const Api = {
  users: async (params = {}) => {
    const response = await fetch(`${HOST}/users?since=135`)
    const json = await response.json()
    return json
  },
  searchs: async (user_name = "") => {
    const response = await fetch(`${HOST}/users/${user_name}`)
    const json = await response.json()
    return json
  }
}
global.Api = Api
export default Api