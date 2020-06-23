import Red from './red'
import Blue from './blue'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const LINE_X = screenWidth / 2 + 10
const LINE_Y = screenHeight - 45 - 20 - 30 - 30
const R = 80

export default class Player{
  constructor() {
    this.blue = new Blue()
    this.red = new Red()
    this.touchedLeft = false
    this.touchedRight = false
    // 用于完成旋转
    this.angleInc = 5
    this.angle = 0
    // 初始化事件监听
    this.initEvent()
  }

  checkIsOnLeft(x){
    if (x < screenWidth / 2){
      return true
    }
    return false
  }

  initEvent(){
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      this.handleTouch(x)
    })

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      
      this.handleTouch(x)
  
    })

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault()

      this.touchedRight = false
      this.touchedLeft = false
    })
  }

  handleTouch(x){
    if (this.checkIsOnLeft(x))
      {
        //console.log(1)
        this.angle += this.angleInc
        this.touchedLeft = true
        this.touchedRight = false
        this.red.updatePos(this.angle)
        this.blue.updatePos(this.angle+180)
      }
      else{
        this.angle -= this.angleInc
        this.touchedRight = true
        this.touchedLeft = false
        this.red.updatePos(this.angle)
        this.blue.updatePos(this.angle + 180)
      }
  }

  render(ctx){ 
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(LINE_X, LINE_Y, R, 0, Math.PI*2)
    ctx.strokeStyle = 'white'
    ctx.stroke()
    this.blue.drawToCanvas(ctx)
    /*ctx.drawImage(
      this.blue.img1,
      this.blue.x, this.blue.y,
      this.blue.width, this.blue.height
      )
    ctx.drawImage(
      this.blue.img2,
      this.blue.x, this.blue.y,
      this.blue.width, this.blue.height
    )
    ctx.drawImage(
      this.blue.img3,
      this.blue.x, this.blue.y,
      this.blue.width, this.blue.height
    )*/
    this.red.drawToCanvas(ctx)
    /*ctx.drawImage(
      this.red.img1,
      this.red.x, this.red.y,
      this.red.width, this.red.height
    )
    ctx.drawImage(
      this.red.img2,
      this.red.x, this.red.y,
      this.red.width, this.red.height
    )
    ctx.drawImage(
      this.red.img3,
      this.red.x, this.red.y,
      this.red.width, this.red.height
    )*/
  }

}
