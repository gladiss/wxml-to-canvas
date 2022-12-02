const xmlParse = require('./xml-parser')
const { Widget } = require('./widget')
const { Draw } = require('./draw')
const { compareVersion } = require('./utils')

const canvasId = 'weui-canvas'

Component({
  properties: {
    width: {
      type: Number,
      value: 400
    },
    height: {
      type: Number,
      value: 300
    },
    androidDprTo2: {
      type: Boolean,
      value: false
    }
  },
  data: {
    use2dCanvas: false, // 2.9.2 后可用canvas 2d 接口
    canvasWidth: 400,
    canvasHeight: 300
  },
  observers: {
    width: function (value) {
      if (this.data.canvasWidth !== value && this.ctx) {
        this.clearCtx()
      }
    },
    height: function (value) {
      if (this.data.canvasHeight !== value && this.ctx) {
        this.clearCtx()
      }
    }
  },
  lifetimes: {
    attached() {
      const { SDKVersion, platform, pixelRatio: Dpr } = wx.getSystemInfoSync()
      const use2dCanvas = compareVersion(SDKVersion, '2.9.2') >= 0
      this.dpr = Dpr
      if (
        Dpr > 2 &&
        platform !== 'ios' &&
        platform !== 'devtools' &&
        this.data.androidDprTo2
      ) {
        this.dpr = 2
      }
      this.initCtx = new Promise(resolve => {
        this.setData({ use2dCanvas }, () => {
          this.initCanvas(resolve)
        })
      })
    }
  },
  methods: {
    clearCtx() {
      if (this.isClearing) return
      this.isClearing = true
      this.initCtx = new Promise(resolve => {
        this.ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)
        this.ctx = null
        this.canvas = null
        this.setData(
          {
            canvasWidth: this.data.width,
            canvasHeight: this.data.height
          },
          () => this.initCanvas(resolve)
        )
      })
    },
    initCanvas(resolve) {
      if (this.data.use2dCanvas) {
        const query = this.createSelectorQuery()
        query
          .select(`#${canvasId}`)
          .fields({ node: true, size: true })
          .exec(res => {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            canvas.width = res[0].width * this.dpr
            canvas.height = res[0].height * this.dpr
            ctx.scale(this.dpr, this.dpr)
            this.ctx = ctx
            this.canvas = canvas
            this.isClearing = false
            resolve()
          })
      } else {
        this.ctx = wx.createCanvasContext(canvasId, this)
        this.isClearing = false
        resolve()
      }
    },
    async renderToCanvas(args) {
      await this.initCtx
      const { wxml, style } = args
      const ctx = this.ctx
      const canvas = this.canvas
      const use2dCanvas = this.data.use2dCanvas

      if (use2dCanvas && !canvas) {
        return Promise.reject(
          new Error('renderToCanvas: fail canvas has not been created')
        )
      }
      ctx.clearRect(0, 0, this.data.width, this.data.height)
      const { root: xom } = xmlParse(wxml)

      const widget = new Widget(xom, style)
      const container = widget.init()
      this.boundary = {
        top: container.layoutBox.top,
        left: container.layoutBox.left,
        width: container.computedStyle.width,
        height: container.computedStyle.height
      }
      const draw = new Draw(ctx, canvas, use2dCanvas)
      await draw.drawNode(container)

      if (!use2dCanvas) {
        await this.canvasDraw(ctx)
      }
      return Promise.resolve(container)
    },

    canvasDraw(ctx, reserve) {
      return new Promise(resolve => {
        ctx.draw(reserve, () => {
          resolve()
        })
      })
    },

    canvasToTempFilePath(args = {}) {
      const use2dCanvas = this.data.use2dCanvas

      return new Promise((resolve, reject) => {
        const { top, left, width, height } = this.boundary

        const copyArgs = {
          x: left,
          y: top,
          width,
          height,
          destWidth: width * this.dpr,
          destHeight: height * this.dpr,
          canvasId,
          fileType: args.fileType || 'png',
          quality: args.quality || 1,
          success: resolve,
          fail: reject
        }

        if (use2dCanvas) {
          delete copyArgs.canvasId
          copyArgs.canvas = this.canvas
        }
        wx.canvasToTempFilePath(copyArgs, this)
      })
    }
  }
})
