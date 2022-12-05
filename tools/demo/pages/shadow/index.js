Page({
  data: {
    src: '',
    width: 375,
    height: 500,
    wxml: `
    <view class="container" >
      <text class="text">有外边框的阴影</text>
      <view class="item-box red"></view>
      <text class="text">无外边框的阴影</text>
      <view class="item-box green"></view>
      <text class="text">文字的阴影</text>
      <text class="ellipsis">test ellipsis!test ellipsis!</text>
      <text class="text">图片的阴影，需要将image的clip属性设置为false</text>
      <image class="img" clip="false" src="https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon48_wx_button.png"></image>
    </view>
    `,
    style: `
    {
      container: {
        width: 375,
        height: 500,
        backgroundColor: '#c0c0c0',
        flexDirection: 'column',
        paddingLeft: 30
      },
      itemBox: {
        width: 80,
        height: 60
      },
      red: {
        backgroundColor: '#ff0000',
        borderRadius: 10,
        borderColor: 'pink',
        borderWidth: 10,
        shadow: '0 25 10 #000'
      },
      green: {
        backgroundColor: '#00ff00',
        shadow: '0 25 10 #000'
      },
      blue: {
        backgroundColor: '#0000ff'
      },
      text: {
        width: 200,
        height: 40,
        marginTop: 30
      },
      ellipsis: {
        width: 40,
        height: 40,
        color: '#000',
        shadow: '0 25 10 red'
      },
      img: {
        width: 100,
        height: 20,
        shadow: '25 25 20 #000'
      }
    }
    `
  },
  onLoad() {
    const style = {
      container: {
        width: 375,
        height: 500,
        backgroundColor: '#c0c0c0',
        flexDirection: 'column',
        paddingLeft: 30
      },
      itemBox: {
        width: 80,
        height: 60
      },
      red: {
        backgroundColor: '#ff0000',
        borderRadius: 10,
        borderColor: 'pink',
        borderWidth: 10,
        shadow: '0 25 10 #000'
      },
      green: {
        backgroundColor: '#00ff00',
        shadow: '0 25 10 #000'
      },
      blue: {
        backgroundColor: '#0000ff'
      },
      text: {
        width: 330,
        height: 40,
        marginTop: 30
      },
      ellipsis: {
        width: 40,
        height: 40,
        color: '#000',
        shadow: '0 25 10 red'
      },
      img: {
        width: 100,
        height: 20,
        shadow: '25 25 20 #000'
      }
    }
    this.widget = this.selectComponent('.widget')
    this.widget.renderToCanvas({
      wxml: this.data.wxml,
      style: style
    })
  }
})
