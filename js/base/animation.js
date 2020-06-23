import Sprite  from './sprite'
import DataBus from '../databus'

let databus = new DataBus()

const __ = {
  timer: Symbol('timer'),
}

/**
 * 简易的帧动画类实现
 */
export default class Animation extends Sprite {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height)

    // 当前动画是否播放中
    this.isPlaying = false

    // 动画是否需要循环播放
    this.loop = false

    // 每一帧的时间间隔
    this.interval = 1000 / 12

    // 帧定时器
    this[__.timer] = null

    // 当前播放的帧
    this.index = -1

    // 总帧数
    this.count = 0
    this.temp = 0
    // 帧图片集合
    this.imgList = []

    /**
     * 推入到全局动画池里面
     * 便于全局绘图的时候遍历和绘制当前动画帧
     */
    databus.animations.push(this)
  }

  /**
   * 初始化帧动画的所有帧
   * 为了简单，只支持一个帧动画
   */
  initFrames(imgList) {
    imgList.forEach((imgSrc) => {
      let img = new Image()
      img.src = imgSrc

      this.imgList.push(img)
    })

    this.count = imgList.length
  }

  // 将播放中的帧绘制到canvas上
  aniRender(ctx) {
    //console.log(this.width)
    ctx.drawImage(
      this.imgList[this.index],
      this.x - this.width*(this.index*0.03)/2,
      this.y - this.height*(0.05*this.index)/2,
      this.width  * (this.index * 0.03+1),
      this.height * (0.05*this.index+1)
    )
  }

  // 播放预定的帧动画
  playAnimation(index = 0, loop = false) {
    // 动画播放的时候精灵图不再展示，播放帧动画的具体帧
    //this.visible   = false

    this.isPlaying = true
    this.loop      = loop

    this.index     = index

    if ( this.interval > 0 && this.count ) {
      this[__.timer] = setInterval(
        this.frameLoop.bind(this),
        this.interval
      )
    }
  }

  // 停止帧动画播放
  stop() {
    this.isPlaying = false

    if ( this[__.timer] )
      clearInterval(this[__.timer])
  }

  // 帧遍历
  frameLoop() {
    this.temp++
    if (this.loop){
      this.index = this.temp % this.count
    }else{
      this.index = this.temp
      if (this.index > this.count - 1){
        this.temp--
        this.index--
        this.stop()
      }
    }
  }
}