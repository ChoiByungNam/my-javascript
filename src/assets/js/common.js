class Tetris {
  constructor(ctx) {
    this.status = false;

    this.cube;
    this.cubeSize = 25;
    this.cubeOffsetTop = 50;
    this.cubeOffsetLeft = 160;

    this.currentShapeNumber = 1;
    this.currentShapeX = 3;
    this.currentShapeY = 0;

    this.canvasOffsetTop = canvas.clientTop
    this.canvasOffsetRight = canvas.clientLeft + canvas.width
    this.canvasOffsetBottom = canvas.clientTop + canvas.height
    this.canvasOffsetLeft = canvas.clientLeft
    this.shapes = [
      {name: 'I', color: 'red'},
      {name: 'L', color: 'green'},
      {name: 'J', color: 'blue'},
      {name: 'T', color: 'yellow'},
      {name: 'O', color: 'skyblue'},
      {name: 'S', color: 'gray'},
      {name: 'Z', color: 'purple'}
    ];
    this.anim;

    window.onkeydown = (e) => {
      if (e.which == 37) { // left
        console.log('left');
      } else if (e.which == 38) { // up
        console.log('rotate');
      } else if (e.which == 39) { // right
        console.log('right');
      } else if (e.which == 40) { // bottom
        console.log('bottom');
      }
    }

    this.init();
    this.draw();
  }

  init() {
    if (this.status == false) {
      this.ctx = canvas.getContext('2d');
      this.grid();
      this.cube[5][5] = 1;
      this.status = true;
    }
  }

  grid() {
    this.cube = new Array();
    this.cube.push(new Array(10));
    for (let i = 0; i < 20; ++i) {
      this.cube.push(new Array(10));
      for (let j = 0; j < 10; ++j) this.cube[i][j] = 0;
      // console.log(this.cube);
    }
  }

  draw() {
    // canvas 테두리
    if (this.status == false) return;
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(0, 0, this.ctx.canvas.width - 1, this.ctx.canvas.height - 1);
    this.ctx.stroke();
    for (let i = 0; i < 20; ++i) {
      for (let j = 0; j < 10; ++j) {
        if (this.cube[i][j] == 0) {
          this.ctx.fillStyle = '#ccc';
        } else {
          this.ctx.fillStyle = '#000';
        }

        // 떨어지는 shape 체크
        let shapeCheck = this.cube[this.currentShapeNumber].length;

        for (let k = 0; k < shapeCheck; k += 2) {
          // console.log(this.currentShapeX, this.cube[this.currentShapeNumber]);
          if (this.currentShapeY + this.cube[this.currentShapeNumber][k] == i && this.currentShapeX + this.cube[this.currentShapeNumber][k + 1] == j) {
            this.ctx.fillStyle = 'green';
          }

          let currentX, currentY;
          currentX = this.cubeOffsetLeft + j * this.cubeSize;
          currentY = this.cubeOffsetTop + i * this.cubeSize;
          // console.log(currentX, currentY);
          this.ctx.fillRect(currentX, currentY, this.cubeSize - 2, this.cubeSize - 2);
        }
      }
    }
  }
}

const canvas = document.getElementById('canvas');
const tetris = new Tetris(canvas);

/*
  로직
  - canvas 테두리 그리기.
  - canvas shape 타입 및 위치 세팅하여 그리기.
  - 키보드 방향키로 shape 이동 시키기.
  - 아래 방향으로 shape 5초 간격으로 이동 시키기.
  - shape 가 canvas 좌/우, 하단 도달했을 경우 체크하여 처리하기.

  블럭 7개,
  마지막 단계(last), 최소 속도(min), 최대 속도(max)
  점수,
  블럭 미리보기,
*/
