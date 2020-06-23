import DataBus   from '../databus'
import Animation from '../base/animation'

let databus = new DataBus()

const ENEMY_IMG_SRC = 'images/direct.png'
const ENEMY_WIDTH   = window.innerWidth/6
const ENEMY_HEIGHT  = window.innerWidth/6
const X = 0

const __ = {
  speed: Symbol('speed')
}

export default class Area extends Animation{
  constructor(){
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.x = X
    //this.initExplosionAnimation()
  }
  init(speed) {
    this.x = 0
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