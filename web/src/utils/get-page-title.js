import defaultSettings from '@/settings'

const title = defaultSettings.title || 'AI-Assistant租赁平台'
let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 判断是否是 iOS终端

export default function getPageTitle(pageTitle) {
  if (pageTitle && !isIOS) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
