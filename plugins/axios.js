 import * as axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = `http://localhost:3000/api/}`
}

export default axios.create(options)