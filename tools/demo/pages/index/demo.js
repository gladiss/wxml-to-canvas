const wxml = `
<view class="container" >
  <view class="header">
  <view class="item-box red">
  </view>
  <view class="item-box green" >
    <text class="text">yeah!</text>
  </view>
  <view class="item-box blue">
      <image class="img" src="https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_appwx_logo.png"></image>
  </view>
  </view>
  <text class="ellipsis">test ellipsis!test ellipsis!</text>
</view>
`

const style = {
  container: {
    width: 375,
    height: 300,
    backgroundColor: '#ccc'
  },
  header: {
    width: 375,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ccc',
    alignItems: 'center'
  },
  itemBox: {
    width: 80,
    height: 60
  },
  red: {
    backgroundColor: '#ff0000',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 10
  },
  green: {
    backgroundColor: '#00ff00'
  },
  blue: {
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    width: 80,
    height: 60,
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  ellipsis: {
    width: 40,
    height: 40,
    color: '#000000'
  }
}

module.exports.wxml = wxml
module.exports.style = style
