import Player     from './player/index'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'
import Long from './npc/long'
import Short from './npc/short'
import Area from './npc/area'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music    = new Music()

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    // 下次进行重绘时执行
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if ( databus.frame % 50 === 0 ) {
      let enemy = databus.pool.getItemByClass('enemy', Long)
      enemy.init(4)
      databus.enemys.push(enemy)
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this
    for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
      let enemy = databus.enemys[i]

      if ( this.player.blue.isCollideWith(enemy) || this.player.red.isCollideWith(enemy)) {
        databus.gameOver = true
        that.music.playExplosion()
        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(!this.bg.isPlaying)
      this.bg.playAnimation(0, true)

    databus.enemys.forEach((item) => {
      if (!item.isPlaying)
        item.playAnimation(0, true)
      //console.log(item.isPlaying)
    })

    databus.animations.forEach((ani) => {
      //console.log(ani)
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })
    this.player.render(ctx)
    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      
      databus.enemys.forEach((item) => {
        item.visible = false
      })
      this.gameinfo.renderGameOver(ctx, databus.score)

      if ( !this.hasEventBind ) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    this.bg.update()

    databus.enemys.forEach((item) =>{
      item.update()
    })
   
    this.enemyGenerate()

    this.collisionDetection()

  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
