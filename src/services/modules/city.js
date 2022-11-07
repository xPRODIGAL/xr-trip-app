import xrRequest from '../request'

export function getCityAll() {
  return xrRequest.get({
    url: "/city/all"
  })
}
