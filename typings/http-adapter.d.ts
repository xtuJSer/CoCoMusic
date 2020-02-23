declare module 'axios/lib/adapters/http' {
  import { AxiosAdapter } from 'axios'

  const HttpAdapter: AxiosAdapter

  export default HttpAdapter
}
