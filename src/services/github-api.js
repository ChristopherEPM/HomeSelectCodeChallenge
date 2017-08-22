const TOKEN = "https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization"
const HOST = "https://api.github.com"
const AUTH = "fa1ce8fc369a9d4577979a57c1f08b4ca5961cfb"

const Api = {
  users: async (params = {}) => {
    const response = await fetch(`${HOST}/users?since=135&access_token=${AUTH}`)
    const json = await response.json()
    return json
  },
  searchs: async (user_name = "") => {
    const response = await fetch(`${HOST}/users/${user_name}?access_token=${AUTH}`)
    const json = await response.json()
    return json
  },
  organizations: async (user_name = "") => {
    const response = await fetch(`${HOST}/users/${user_name}/orgs?access_token=${AUTH}`)
    const json = await response.json()
    return json
  },
  followers: async (user_name = "") => {
    const response = await fetch(`${HOST}/users/${user_name}/followers?access_token=${AUTH}`)
    const json = await response.json()
    return json
  },
  followings: async (user_name = "") => {
    const response = await fetch(`${HOST}/users/${user_name}/following?access_token=${AUTH}`)
    const json = await response.json()
    return json
  },
  repos: async (user_name = "") => {
    const response = await fetch(`${HOST}/users/${user_name}/repos?access_token=${AUTH}`)
    const json = await response.json()
    return json
  }

}
global.Api = Api
export default Api