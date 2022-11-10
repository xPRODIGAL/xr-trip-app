import xrRequest from '../request'

export function getDetailInfos(houseId) {
  return xrRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}
