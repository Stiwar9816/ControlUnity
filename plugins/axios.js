 import * as axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = 'mongodb+srv://JhonE:pa55word123@cluster0-hstd5.mongodb.net/test?retryWrites=true&w=majority'
}

export default axios.create(options)