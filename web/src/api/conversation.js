import request from '@/utils/request'
let transportPrefix = '/common'
// let prefix = '/mock/81'
// let transportPrefix = '/mock/81'
/**
 * 发送对话内容
 */
export function sendMessage(data) {
  return request({
    url: `${transportPrefix}/v3/sendMessage`,
    method: 'post',
    data
  })
}

/**
 * 获取声音
 */
export function getVoice(data) {
  return request({
    url: `${transportPrefix}/v3/getvoice`,
    method: 'post',
    data
  })
}
