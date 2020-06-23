import DataBus   from '../databus'
import Animation from '../base/animation'

let databus = new DataBus()

const ENEMY_IMG_SRC = 'images/direct.png'
const ENEMY_WIDTH   = window.innerWidth/2
const ENEMY_HEIGHT  = 35
const X = 0

const __ = {
  speed: Symbol('speed')
}

export default class Long extends Animation{
  constructor(){
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.x = 20
    this.initExplosionAnimation()
  }

  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/direct.png'
    const EXPLO_FRAME_COUNT = 5

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX)
    }

    this.initFrames(frames)
  }

    // 将播放中的帧绘制到canvas上
  /*aniRender(ctx) {
    ctx.drawImage(
      this.imgList[this.index],
      this.x,
      this.y,
      this.width  * (1+0.1*this.index),
      this.height * (1+0.1*this.index)
    )
   
  }*/

  init(speed) {
    this.x = 20
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }
  update() {
    this.y += this[__.speed]
    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      databus.removeEnemey(this)
  }

}