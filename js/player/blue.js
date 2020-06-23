import Sprite   from '../base/sprite'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

const BLUE_WIDTH   = 30
const BLUE_HEIGHT  = 30
const BLUE_IMG_SRC = 'images/Blue.png'
const BLUE_IMG_SRC1 = 'images/Blue_Alpha60.png'
const BLUE_IMG_SRC2 = 'images/Blue_Aplha15.png'
const BLUE_IMG_SRC3 = 'images/Blue_Aplha10.png'
const X = screenWidth / 2 - BLUE_WIDTH / 2 - 30 -20 - 20
const Y = screenHeight - BLUE_HEIGHT - 30 - 20 - 30 - 30
const LINE_X = screenWidth / 2 + 10
const LINE_Y = screenHeight - 45 - 20 - 30 - 30
const R = 80

export default class Blue extends Sprite{
  constructor(){
    super(BLUE_IMG_SRC, BLUE_WIDTH, BLUE_HEIGHT)
    this.img1 = new Image()
    this.img1.src = BLUE_IMG_SRC1
    this.img2 = new Image()
    this.img2.src = BLUE_IMG_SRC2
    this.img3 = new Image()
    this.img3.src = BLUE_IMG_SRC3
    this.BLUE_X = screenWidth / 2 - BLUE_WIDTH / 2 - 30 
    this.BLUE_Y = screenHeight - BLUE_HEIGHT - 30 - 20 
    this.x = X
    this.y = Y
    this.rx = this.x + this.width/2
    this.ry = this.y + this.height/2
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