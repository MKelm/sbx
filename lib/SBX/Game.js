/*
 * This file is part of Starball X.
 * Copyright 2013-2014 by Martin Kelm - All rights reserved.
 * Project page @ https://github.com/mkelm/sbx
 *
 * Starball X is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Starball X is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Starball X. If not, see <http://www.gnu.org/licenses/>.
 */

// game class so setup and deligate (between) game related objects
// the class can contain re-factored logic from the first pre-alpha phase
// the logic can be sepereted more and more in future

SBX.Game = function() {
  SBX.Element.call(this, "game", false);

  this.display = null;
  this.stepCount = 0;
  this.bricks = [];
  this.brickCols = 16;
  this.brickRows = 16;
  this.brickSize = { w : 20, h : 20 };
  this.brickMargin = { w: 10, h: 10 };

  this.bricksBorder = {};
  this.spaceBorder = {};
}

SBX.Game.prototype = Object.create(SBX.Element.prototype);
SBX.Game.prototype.constructor = SBX.Game;

SBX.Game.prototype.step = function(scope) {
  scope.stepCount++;
}

SBX.Game.prototype.initializeDisplay = function() {
  this.display = new PIXI.DisplayObjectContainer();
  this.display.position.x = 0;
  this.display.position.y = 0;

  this.display.pivot = {x: 0.5, y: 0.5 };
  this.display.position = {x: sbx.pixi.screen.width/2, y: sbx.pixi.screen.height/2 };

  this.display.scale = {x: sbx.pixi.screen.ratio, y: sbx.pixi.screen.ratio};
  sbx.pixi.stage.addChild(this.display);
}

SBX.Game.prototype.initializeBricks = function() {
  var c = 0, cols = this.brickCols, rows = this.brickRows;
  var x = ((cols / 2) * (-1 * (this.brickSize.w + this.brickMargin.w))) + 0.5 * this.brickMargin.w;
  var y = ((rows / 2) * (-1 * (this.brickSize.h + this.brickMargin.h))) + 0.5 * this.brickMargin.h;
  for (var i = 1; i <= cols; i++) {
    for (var j = 1; j <= rows; j++) {
      var gfx = new PIXI.Graphics();
      gfx.position.x = x + ((i - 1) * (this.brickSize.w + this.brickMargin.w));
      gfx.position.y = y + ((j - 1) * (this.brickSize.h + this.brickMargin.h));
      gfx.beginFill("0xFFFFFF");
      gfx.drawRect(0, 0, this.brickSize.w, this.brickSize.h);
      this.bricks[c] = { graphic : gfx, x : i, y : j };
      this.display.addChild(this.bricks[c].graphic);
      c++;
    }
  }
}

SBX.Game.prototype.initializeBricksBorder = function() {
  this.bricksBorder = {
    x : ((this.brickCols / 2) * (-1 * (this.brickSize.w + this.brickMargin.w))) - 0.5 * this.brickMargin.w,
    y : ((this.brickRows / 2) * (-1 * (this.brickSize.h + this.brickMargin.h))) - 0.5 * this.brickMargin.h,
    width : (this.brickCols * (this.brickSize.w + this.brickMargin.w)) + this.brickMargin.w,
    height : (this.brickRows * (this.brickSize.h + this.brickMargin.h)) + this.brickMargin.h
  };

  var gfx = new PIXI.Graphics();
  gfx.lineStyle(1, 0x00FFFF);
  gfx.moveTo(this.bricksBorder.x, this.bricksBorder.y);
  gfx.lineTo(this.bricksBorder.x + this.bricksBorder.width, this.bricksBorder.y);
  gfx.lineTo(this.bricksBorder.x + this.bricksBorder.width, this.bricksBorder.y + this.bricksBorder.height);
  gfx.lineTo(this.bricksBorder.x, this.bricksBorder.y + this.bricksBorder.height);
  gfx.lineTo(this.bricksBorder.x, this.bricksBorder.y);
  this.display.addChild(gfx);
}

SBX.Game.prototype.initializeSpaceBorder = function() {
  this.spaceBorder = {
    x : this.bricksBorder.x - 100,
    y : this.bricksBorder.y - 100,
    width : this.bricksBorder.width + 200,
    height : this.bricksBorder.height + 200
  };

  var gfx = new PIXI.Graphics();
  gfx.lineStyle(1, 0xFF0000);
  gfx.moveTo(this.spaceBorder.x, this.spaceBorder.y);
  gfx.lineTo(this.spaceBorder.x + this.spaceBorder.width, this.spaceBorder.y);
  gfx.lineTo(this.spaceBorder.x + this.spaceBorder.width, this.spaceBorder.y + this.spaceBorder.height);
  gfx.lineTo(this.spaceBorder.x, this.spaceBorder.y + this.spaceBorder.height);
  gfx.lineTo(this.spaceBorder.x, this.spaceBorder.y);
  this.display.addChild(gfx);
}

SBX.Game.prototype.start = function() {
  this.initializeDisplay();
  this.initializeBricks();
  this.initializeBricksBorder();
  this.initializeSpaceBorder();

  // interval to move ball
  sbx.intervals.gameStep = setInterval(this.step.curry(this), 10);
}