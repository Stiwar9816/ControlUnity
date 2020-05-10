 import * as axios from '@nuxtjs/axios'

let options = {}
if (process.server) {
  options.baseURL = `http://${process.env.MONGODB_URI || 'localhost'}:${process.env.PORT || 3000}`
}

export default axios.create(options)