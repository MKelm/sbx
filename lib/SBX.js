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

/*
 Note:
 To make it not too complex and too slow the SBX framework uses prototyping like the pixi.js framework.
 Prototyping offers a ~19,6x faster speed than ignoring prototyping to make a framework in node-webkit.
 To derivate methods use parentClass.prototype.method.call(this, parameters) !!!
*/

// SBX framework initialization
var SBX = SBX || {};