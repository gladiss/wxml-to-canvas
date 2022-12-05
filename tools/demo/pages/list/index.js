Page({
  data: {
    list: [
      {
        id: 'index',
        name: '首页',
        url: '/pages/index/index'
      },
      {
        id: 'shadow',
        name: '阴影',
        url: '/pages/shadow/index'
      },
      {
        id: 'ellipsis',
        name: '文本省略号',
        url: '/pages/ellipsis/index'
      }
    ]
  },

  toDemo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
