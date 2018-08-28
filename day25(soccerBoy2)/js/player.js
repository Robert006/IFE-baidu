  // 创建球员
  function Player(option) {
      var names = ['C罗', '梅西', '李毅', '郝海东', '内马尔', '齐达内', '托雷斯']
      var width = parseInt(svgNode.parentNode.offsetWidth);
      var scale = (width / 120).toFixed(2);
      var rx = common.getRandom(10 * scale, width - 12 * scale);
      var ry = common.getRandom(10 * scale, 68 * scale);
      svgNode.parentNode.style.position = 'relative';
      var point = document.createElement('i');
      point.style.cssText = 'position:absolute;background:blue;border-radius:50%;border:1px solid #fff;';
      point.style.width = 2 * scale + 'px';
      point.style.height = 2 * scale + 'px';
      point.style.top = ry + 'px';
      point.style.left = rx + 'px';
      var vNum = option.speed || common.getRandom(1, 99);
      var vMax = (3 + (vNum - 1) * (9 / 98)) * scale;
      svgNode.parentNode.appendChild(point);
      this.name = option.name || names[common.getRandom(0, names.length - 1)];
      point.innerHTML = this.name;
      this.velocity = vNum; //球员速度值
      this.explosive = common.getRandom(1, 99); //爆发力
      this.physical = common.getRandom(1, 99); //体力
      this.skill = option.skill || common.getRandom(1, 99); //技术值
      this.power = option.power || common.getRandom(1, 99); //力量值
      this.speedUp = (-3 / 98) * this.explosive + (4 * 99 - 1) / 98; //达到最高速所需时间
      this.insist = (990 - 15) / 98 + (this.physical - 1) * (5 / 98); //最高速坚持时间
      this.pos = {
          x: rx - 10 * scale,
          y: ry - 10 * scale,
      }; //球员位置
      this.finded = {}; //找到球
      this.timer = null; //球员运动定时器
      this.running = function (target) {
          var start = this.pos;
          var end = {
              x: 10 * scale + target.x,
              y: 10 * scale + target.y,
          };
          // 假设球员在5米内完成加速
          var angle = common.getAngle(start.x, start.y, end.x, end.y);
          var vx = Math.abs(5 * scale * Math.cos(angle / 180 * (Math.PI)));
          var vy = Math.abs(5 * scale * Math.sin(angle / 180 * (Math.PI)));
          // 加速后的位置
          var speedPoint = {};
          // 最大速度坚持到最后1s所在位置
          var maxPoint = {};
          // 球员加速时间
          var speedTime = this.speedUp;
          speedPoint.x = start.x > end.x ? (start.x - vx) : (start.x + vx);
          speedPoint.y = start.y > end.y ? (start.y - vy) : (start.y + vy);
          point.style.transition = 'all ' + speedTime + 's ease-in';
          point.style.top = speedPoint.y + 'px';
          point.style.left = speedPoint.x + 'px';
          //保持最大速度
          //   console.log('insist', this.insist)
          var highway = this.insist * vMax; //最大速度运动的距离
          // 在最大速度运动距离到达终点
          //   console.log('hightway', highway)
          this.timer = setTimeout(maxSpeed, this.speedUp * 1000)
          var get = this.finded;

          function maxSpeed() {
              var remain = Math.sqrt(Math.pow(speedPoint.x - end.x, 2) + Math.pow(speedPoint.y - end.y, 2));
              var hx, hy, htime;
              // console.log('remain', remain)
              if (highway > remain) {
                  function runAndStop(resolve, reject) {
                      hx = Math.abs((remain - 2 * scale) * Math.sin(angle / 180 * (Math.PI)));
                      hy = Math.abs((remain - 2 * scale) * Math.cos(angle / 180 * (Math.PI)));
                      htime = remain / vMax;
                      maxPoint = end;
                      point.style.transition = 'all ' + htime + 's liner';
                      point.style.top = end.y - 2 * scale * Math.cos(angle / 180 * (Math.PI)) + 'px';
                      point.style.left = end.x - 2 * scale * Math.sin(angle / 180 * (Math.PI)) + 'px';
                      resolve();
                  }
                  var p = new Promise(runAndStop).then(() => {
                      point.style.transition = 'all ' + 1 + 's ease-out';
                      point.style.top = end.y + 'px';
                      point.style.left = end.x + 'px';
                      //重置球员位置
                      start.x = end.x;
                      start.y = end.y;
                      if (target.type || target.type == 'soccer') {
                          get.soccer = true;
                      }
                  })

                  // this.timer = setTimeout(downSpeed, htime * 1000)
              } else {
                  function tiredAndDown(resolve, reject) {
                      hx = Math.abs(highway * Math.sin(angle / 180 * (Math.PI)));
                      hy = Math.abs(highway * Math.cos(angle / 180 * (Math.PI)));
                      htime = highway / vMax;
                      maxPoint.x = speedPoint.x > end.x ? (speedPoint.x - hx) : (speedPoint.x + hx);
                      maxPoint.y = speedPoint.y > end.y ? (speedPoint.y - hy) : (speedPoint.y + hy);
                      point.style.transition = 'all ' + htime + 's liner';
                      point.style.top = 10 * scale + maxPoint.y + 'px';
                      point.style.left = 10 * scale + maxPoint.x + 'px';
                      resolve();
                  }
                  new Promise(tiredAndDown).then(() => {
                      point.style.transition = 'all ' + 3 + 's ease-out';
                      point.style.top = end.y + 'px';
                      point.style.left = end.x + 'px';
                      //重置球员位置
                      start.x = end.x;
                      start.y = end.y;
                      if (target.type || target.type == 'soccer') {
                          get.soccer = true;
                      }
                  })
              }
          }

          function downSpeed() {
              var downPoint = {};
              downPoint.x = start.x > end.x ? (end.x - vx) : (end.x + vx);
              downPoint.y = start.y > end.y ? (end.y - vy) : (end.y + vy);
              console.log(downPoint)
              point.style.transition = 'all ' + speedTime + 's ease-out';
              point.style.top = downPoint.y + 'px';
              point.style.left = downPoint.x + 'px';
          }
      }
  }