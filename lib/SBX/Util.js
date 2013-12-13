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

// SBX utility class

SBX.Util = function() {
  this.jsons = {};
}

SBX.Util.prototype.constructor = SBX.Util;

SBX.Util.prototype.getEventListener = function(obj, func) {
  return function(event) { obj[func](obj, event); };
}

SBX.Util.prototype.quit = function(delay) {
  if (typeof delay == "undefined") {
    delay = 0;
  }
  global.setTimeout(function() {
    require('nw.gui').App.closeAllWindows();
  }, delay);
}

SBX.Util.prototype.loadJSON = function(json, forceLoad) {
  var result = {};
  if (typeof this.jsons[json] == "undefined") {
    try {
      result = JSON.parse(require('fs').readFileSync(json, { encoding : "utf8" }));
      if (forceLoad !== true) {
        // load json files one time only
        // espacially externals which will be used in multiple data files
        this.jsons[json] = result;
      }
    } catch (err) {
    }
  } else {
    result = this.jsons[json];
  }
  return result;
};

SBX.Util.prototype.objectLength = function(object) {
  var size = 0, key;
  for (key in object) {
    if (object.hasOwnProperty(key)) size++;
  }
  return size;
};

SBX.Util.prototype.time = function(type, delay) {
  var div = 1;
  if (type == "unix") {
    div = 1000;
  }
  if (!delay > 0) {
    delay = 0;
  }
  var t = new Date().getTime() / div;
  if (type != "formated") {
    return Math.round(t + delay);
  } else {
    var date = new Date(t);
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }
}