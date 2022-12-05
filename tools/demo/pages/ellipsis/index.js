Page({
  data: {
    src: '',
    width: 375,
    height: 200
  },
  onLoad() {
    this.widget = this.selectComponent('.widget')
    this.widget.renderToCanvas({
      wxml: `
      <view class="container">
        <text class="text">单行省略号</text>
        <text class="ellipsis1">test ellipsis!test ellipsis!test ellipsis!test ellipsis!test ellipsis!test ellipsis!</text>
        <text class="text">多行省略号</text>
        <text class="ellipsis2">test ellipsis!test ellipsis!test ellipsis!test ellipsis!test ellipsis!test ellipsis!>test ellipsis!test ellipsis!>test ellipsis!test ellipsis!>test ellipsis!test ellipsis!</text>
      </view>
      `,
      style: {
        container: {
          width: 375,
          height: 300,
          backgroundColor: '#ccc',
          paddingLeft: 30
        },
        text: {
          width: 80,
          height: 40,
          marginTop: 30
        },
        ellipsis1: {
          width: 300,
          height: 20,
          color: '#000',
          backgroundColor: 'pink'
        },
        ellipsis2: {
          width: 300,
          height: 40,
          color: '#000',
          backgroundColor: 'pink'
        }
      }
    })
  }
})
