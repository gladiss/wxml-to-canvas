import { wxml, style } from './demo'

Page({
  data: {
    src: '',
    width: 375,
    height: 200
  },
  onLoad() {
    this.widget = this.selectComponent('.widget')
    // 进入页面直接渲染
    this.widget.renderToCanvas({ wxml, style })
  },
  renderToCanvas() {
    const p1 = this.widget.renderToCanvas({ wxml, style })
    // eslint-disable-next-line promise/catch-or-return
    p1.then(res => {
      // eslint-disable-next-line no-console
      console.log('container', res.layoutBox)
      this.container = res
    })
  },

  extraImage() {
    const p2 = this.widget.canvasToTempFilePath()
    // eslint-disable-next-line promise/catch-or-return
    p2.then(res => {
      this.setData({
        src: res.tempFilePath
        // width: this.container.layoutBox.width,
        // height: this.container.layoutBox.height
      })
    })
  },
  /**
   * 修改canvas高度和宽度
   */
  changeHeight() {
    this.setData(
      {
        width: 360,
        height: 300
      },
      () => {
        this.widget.renderToCanvas({ wxml, style })
      }
    )
  }
})
