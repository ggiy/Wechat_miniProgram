import Animation from '../base/animation'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/snow1.png'
const BG_WIDTH     = screenHeight
const BG_HEIGHT    = screenWidth

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Animation {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    this.x = 0
    this.y = 0
    this.interval = 1000 / 8
    this.top = 0
    this.initExplosionAnimation()
    this.render(ctx)
  }

  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/snow'
    const EXPLO_FRAME_COUNT = 7

    for ( let i = 1;i <= EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX+i+'.png')
    }

    this.initFrames(frames)
  }

  update() {
    this.top += 2

    if ( this.top >= screenHeight )
      this.top = 0
  }

  aniRender(ctx) {
    //console.log(this.width)
    ctx.drawImage(
      this.imgList[this.index],
      this.x,
      this.y,
      screenWidth,
      screenHeight
    )
  }
  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      this.top,
      screenWidth,
      screenHeight
    )
  }
}
