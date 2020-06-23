const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

let start = new Image()
start.src = 'images/start.png'

let exit = new Image()
exit.src = 'images/exit.png'

let pause = new Image()
pause.src = 'images/pause.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
    ctx.drawImage(
      pause,
      screenWidth - 30,
      20,
      30,
      30
    )
  }

  renderGameOver(ctx, score) {
    //ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    //ctx.fillStyle = "#ffffff"
    //ctx.font    = "20px Arial"

    /*ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )*/

    

    ctx.drawImage(
      exit,
      40,
      screenHeight - 90,
      50, 50
    )

    ctx.drawImage(
      start,
      screenWidth - 90,
      screenHeight - 90,
      50, 50
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth - 90,
      startY: screenHeight - 90,
      endX  : screenWidth - 70 + 50,
      endY  : screenHeight - 90 + 50
    }
  }
}

