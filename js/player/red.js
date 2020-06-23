import Sprite   from '../base/sprite'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

const RED_WIDTH   = 30
const RED_HEIGHT  = 30
const RED_IMG_SRC = 'images/Red.png'
const RED_IMG_SRC1 = 'images/Red_Alpha60.png'
const RED_IMG_SRC2 = 'images/Red_Alpha15.png'
const RED_IMG_SRC3 = 'images/Red_Alpha10.png'
const X = screenWidth / 2 - RED_WIDTH / 2 - 30 + 100 + 20
const Y = screenHeight - RED_HEIGHT - 30 - 20 - 30 - 30
const LINE_X = screenWidth / 2 + 10
const LINE_Y = screenHeight - 45 - 20 - 30 - 30
const R = 80

export default class Red extends Sprite{
  constructor(){
    super(RED_IMG_SRC, RED_WIDTH, RED_HEIGHT)
    this.img1 = new Image()
    this.img1.src = RED_IMG_SRC1
    this.img2 = new Image()
    this.img2.src = RED_IMG_SRC2
    this.img3 = new Image()
    this.img3.src = RED_IMG_SRC3
    this.RED_X = screenWidth / 2 - RED_WIDTH / 2 - 30 + 80 
    this.RED_Y = screenHeight - RED_HEIGHT - 30 - 20
    this.x = X 
    this.y = Y
  }

  updatePos(angle){
    let r = Math.PI/180 * angle
    let posx = Math.cos(r)
    let posy = Math.sin(r)
    this.rx = LINE_X + R * posx
    this.ry = LINE_Y - R * posy
    this.x = this.rx - this.width/2
    this.y = this.ry - this.height/2
  }
}