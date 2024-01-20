var OSS = require('ali-oss');
var bucket = 'dev-mf-common-bucket'
if (window.location.host === 'h5.morexpress.com.cn') {
  bucket = 'prod-mf-common-bucket'
}
export function client() {
  var client = new OSS({
    region: 'oss-cn-hangzhou',
    // region: 'oss-cn-beijing',
    //   region: 'oss.shanci.tech',
    accessKeyId: 'LTAI5t8VLUa4qUiWFYfMUn48',
    accessKeySecret: 'GweTQJW5NDA77qi8OJWJCJnaUCHQOv',
    // bucket: 'mor-express-test'
    bucket: bucket
  }) // 后端提供数据
  return client
}
