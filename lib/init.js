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

// global sbx object initialization
var sbx = sbx || {};

$(document).ready(function() {
  global.setTimeout(function() {
    //try {
      sbx.util = new SBX.Util();

      sbx.version = new SBX.Version();
      sbx.version.updateHashesFile(); // for maintainer

      sbx.userConfig = sbx.util.loadJSON('./user/data/config.json');
      sbx.intervals = {};
      sbx.pixi = new SBX.Pixi();

      sbx.game = new SBX.Game();

      // add/start the pixi renderer
      document.body.appendChild(sbx.pixi.renderer.view);
      requestAnimFrame(sbx.pixi.animate.curry(sbx.pixi));

      sbx.pixi.loadAssets(function() { sbx.game.start(); });

    //} catch (err) {
      //console.log(err);
    //}
  }, 0.00000001); // use timeout to detect fullscreen size correctly
});