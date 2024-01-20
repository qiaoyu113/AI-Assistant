import request from '@/utils/request'
let transportPrefix = '/common'
// let prefix = '/mock/81'
// let transportPrefix = '/mock/81'
/**
 * 获取线索列表
 */
export function sendMessage(data) {
  return request({
    url: `${transportPrefix}/v3/sendMessage`,
    method: 'post',
    data
  })
}
