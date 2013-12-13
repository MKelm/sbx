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

  this.stepCount = 0;

  this.display = new PIXI.DisplayObjectContainer();
  this.display.position.x = 0;
  this.display.position.y = 0;

  this.display.pivot = {x: 0.5, y: 0.5 };
  this.display.position = {x: sbx.pixi.screen.width/2, y: sbx.pixi.screen.height/2 };

  this.display.scale = {x: sbx.pixi.screen.ratio, y: sbx.pixi.screen.ratio};
  sbx.pixi.stage.addChild(this.display);
}

SBX.Game.prototype = Object.create(SBX.Element.prototype);
SBX.Game.prototype.constructor = SBX.Game;

SBX.Game.prototype.step = function(scope) {
  scope.stepCount++;
}

SBX.Game.prototype.start = function() {
  // interval to move ball
  sbx.intervals.gameStep = setInterval(this.step.curry(this), 10);

  // test to draw bricks
  var graphic = new PIXI.Graphics();
  graphic.position.x = -30;
  graphic.position.y = 0;
  graphic.beginFill("0xFFFFFF");
  graphic.drawRect(0, 0, 20, 10);
  this.display.addChild(graphic);

  var graphic = new PIXI.Graphics();
  graphic.position.x = 0;
  graphic.position.y = 0;
  graphic.beginFill("0xFFFFFF");
  graphic.drawRect(0, 0, 20, 10);
  this.display.addChild(graphic);

  var graphic = new PIXI.Graphics();
  graphic.position.x = 30;
  graphic.position.y = 0;
  graphic.beginFill("0xFFFFFF");
  graphic.drawRect(0, 0, 20, 10);
  this.display.addChild(graphic);
}