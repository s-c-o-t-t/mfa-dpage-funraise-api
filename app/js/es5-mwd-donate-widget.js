(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

_dereq_(327);

_dereq_(328);

_dereq_(2);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2,"327":327,"328":328}],2:[function(_dereq_,module,exports){
_dereq_(130);
module.exports = _dereq_(23).RegExp.escape;

},{"130":130,"23":23}],3:[function(_dereq_,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],4:[function(_dereq_,module,exports){
var cof = _dereq_(18);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"18":18}],5:[function(_dereq_,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _dereq_(128)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _dereq_(42)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"128":128,"42":42}],6:[function(_dereq_,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],7:[function(_dereq_,module,exports){
var isObject = _dereq_(51);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"51":51}],8:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = _dereq_(119);
var toAbsoluteIndex = _dereq_(114);
var toLength = _dereq_(118);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"114":114,"118":118,"119":119}],9:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = _dereq_(119);
var toAbsoluteIndex = _dereq_(114);
var toLength = _dereq_(118);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"114":114,"118":118,"119":119}],10:[function(_dereq_,module,exports){
var forOf = _dereq_(39);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"39":39}],11:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_(117);
var toLength = _dereq_(118);
var toAbsoluteIndex = _dereq_(114);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"114":114,"117":117,"118":118}],12:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = _dereq_(25);
var IObject = _dereq_(47);
var toObject = _dereq_(119);
var toLength = _dereq_(118);
var asc = _dereq_(15);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"118":118,"119":119,"15":15,"25":25,"47":47}],13:[function(_dereq_,module,exports){
var aFunction = _dereq_(3);
var toObject = _dereq_(119);
var IObject = _dereq_(47);
var toLength = _dereq_(118);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"118":118,"119":119,"3":3,"47":47}],14:[function(_dereq_,module,exports){
var isObject = _dereq_(51);
var isArray = _dereq_(49);
var SPECIES = _dereq_(128)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"128":128,"49":49,"51":51}],15:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = _dereq_(14);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"14":14}],16:[function(_dereq_,module,exports){
'use strict';
var aFunction = _dereq_(3);
var isObject = _dereq_(51);
var invoke = _dereq_(46);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"3":3,"46":46,"51":51}],17:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_(18);
var TAG = _dereq_(128)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"128":128,"18":18}],18:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],19:[function(_dereq_,module,exports){
'use strict';
var dP = _dereq_(72).f;
var create = _dereq_(71);
var redefineAll = _dereq_(93);
var ctx = _dereq_(25);
var anInstance = _dereq_(6);
var forOf = _dereq_(39);
var $iterDefine = _dereq_(55);
var step = _dereq_(57);
var setSpecies = _dereq_(100);
var DESCRIPTORS = _dereq_(29);
var fastKey = _dereq_(66).fastKey;
var validate = _dereq_(125);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"100":100,"125":125,"25":25,"29":29,"39":39,"55":55,"57":57,"6":6,"66":66,"71":71,"72":72,"93":93}],20:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = _dereq_(17);
var from = _dereq_(10);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"10":10,"17":17}],21:[function(_dereq_,module,exports){
'use strict';
var redefineAll = _dereq_(93);
var getWeak = _dereq_(66).getWeak;
var anObject = _dereq_(7);
var isObject = _dereq_(51);
var anInstance = _dereq_(6);
var forOf = _dereq_(39);
var createArrayMethod = _dereq_(12);
var $has = _dereq_(41);
var validate = _dereq_(125);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"12":12,"125":125,"39":39,"41":41,"51":51,"6":6,"66":66,"7":7,"93":93}],22:[function(_dereq_,module,exports){
'use strict';
var global = _dereq_(40);
var $export = _dereq_(33);
var redefine = _dereq_(94);
var redefineAll = _dereq_(93);
var meta = _dereq_(66);
var forOf = _dereq_(39);
var anInstance = _dereq_(6);
var isObject = _dereq_(51);
var fails = _dereq_(35);
var $iterDetect = _dereq_(56);
var setToStringTag = _dereq_(101);
var inheritIfRequired = _dereq_(45);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"101":101,"33":33,"35":35,"39":39,"40":40,"45":45,"51":51,"56":56,"6":6,"66":66,"93":93,"94":94}],23:[function(_dereq_,module,exports){
var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],24:[function(_dereq_,module,exports){
'use strict';
var $defineProperty = _dereq_(72);
var createDesc = _dereq_(92);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"72":72,"92":92}],25:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_(3);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"3":3}],26:[function(_dereq_,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = _dereq_(35);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"35":35}],27:[function(_dereq_,module,exports){
'use strict';
var anObject = _dereq_(7);
var toPrimitive = _dereq_(120);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"120":120,"7":7}],28:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],29:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_(35)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"35":35}],30:[function(_dereq_,module,exports){
var isObject = _dereq_(51);
var document = _dereq_(40).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"40":40,"51":51}],31:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],32:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var getKeys = _dereq_(81);
var gOPS = _dereq_(78);
var pIE = _dereq_(82);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"78":78,"81":81,"82":82}],33:[function(_dereq_,module,exports){
var global = _dereq_(40);
var core = _dereq_(23);
var hide = _dereq_(42);
var redefine = _dereq_(94);
var ctx = _dereq_(25);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"23":23,"25":25,"40":40,"42":42,"94":94}],34:[function(_dereq_,module,exports){
var MATCH = _dereq_(128)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"128":128}],35:[function(_dereq_,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],36:[function(_dereq_,module,exports){
'use strict';
var hide = _dereq_(42);
var redefine = _dereq_(94);
var fails = _dereq_(35);
var defined = _dereq_(28);
var wks = _dereq_(128);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"128":128,"28":28,"35":35,"42":42,"94":94}],37:[function(_dereq_,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = _dereq_(7);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"7":7}],38:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = _dereq_(49);
var isObject = _dereq_(51);
var toLength = _dereq_(118);
var ctx = _dereq_(25);
var IS_CONCAT_SPREADABLE = _dereq_(128)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"118":118,"128":128,"25":25,"49":49,"51":51}],39:[function(_dereq_,module,exports){
var ctx = _dereq_(25);
var call = _dereq_(53);
var isArrayIter = _dereq_(48);
var anObject = _dereq_(7);
var toLength = _dereq_(118);
var getIterFn = _dereq_(129);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"118":118,"129":129,"25":25,"48":48,"53":53,"7":7}],40:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],41:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],42:[function(_dereq_,module,exports){
var dP = _dereq_(72);
var createDesc = _dereq_(92);
module.exports = _dereq_(29) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"29":29,"72":72,"92":92}],43:[function(_dereq_,module,exports){
var document = _dereq_(40).document;
module.exports = document && document.documentElement;

},{"40":40}],44:[function(_dereq_,module,exports){
module.exports = !_dereq_(29) && !_dereq_(35)(function () {
  return Object.defineProperty(_dereq_(30)('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"29":29,"30":30,"35":35}],45:[function(_dereq_,module,exports){
var isObject = _dereq_(51);
var setPrototypeOf = _dereq_(99).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"51":51,"99":99}],46:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],47:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"18":18}],48:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators = _dereq_(58);
var ITERATOR = _dereq_(128)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"128":128,"58":58}],49:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"18":18}],50:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = _dereq_(51);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"51":51}],51:[function(_dereq_,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],52:[function(_dereq_,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = _dereq_(51);
var cof = _dereq_(18);
var MATCH = _dereq_(128)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"128":128,"18":18,"51":51}],53:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"7":7}],54:[function(_dereq_,module,exports){
'use strict';
var create = _dereq_(71);
var descriptor = _dereq_(92);
var setToStringTag = _dereq_(101);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_(42)(IteratorPrototype, _dereq_(128)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"101":101,"128":128,"42":42,"71":71,"92":92}],55:[function(_dereq_,module,exports){
'use strict';
var LIBRARY = _dereq_(60);
var $export = _dereq_(33);
var redefine = _dereq_(94);
var hide = _dereq_(42);
var has = _dereq_(41);
var Iterators = _dereq_(58);
var $iterCreate = _dereq_(54);
var setToStringTag = _dereq_(101);
var getPrototypeOf = _dereq_(79);
var ITERATOR = _dereq_(128)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"101":101,"128":128,"33":33,"41":41,"42":42,"54":54,"58":58,"60":60,"79":79,"94":94}],56:[function(_dereq_,module,exports){
var ITERATOR = _dereq_(128)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"128":128}],57:[function(_dereq_,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],58:[function(_dereq_,module,exports){
module.exports = {};

},{}],59:[function(_dereq_,module,exports){
var getKeys = _dereq_(81);
var toIObject = _dereq_(117);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};

},{"117":117,"81":81}],60:[function(_dereq_,module,exports){
module.exports = false;

},{}],61:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],62:[function(_dereq_,module,exports){
// 20.2.2.16 Math.fround(x)
var sign = _dereq_(65);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"65":65}],63:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],64:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],65:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],66:[function(_dereq_,module,exports){
var META = _dereq_(124)('meta');
var isObject = _dereq_(51);
var has = _dereq_(41);
var setDesc = _dereq_(72).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_dereq_(35)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"124":124,"35":35,"41":41,"51":51,"72":72}],67:[function(_dereq_,module,exports){
var Map = _dereq_(160);
var $export = _dereq_(33);
var shared = _dereq_(103)('metadata');
var store = shared.store || (shared.store = new (_dereq_(266))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"103":103,"160":160,"266":266,"33":33}],68:[function(_dereq_,module,exports){
var global = _dereq_(40);
var macrotask = _dereq_(113).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = _dereq_(18)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"113":113,"18":18,"40":40}],69:[function(_dereq_,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = _dereq_(3);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"3":3}],70:[function(_dereq_,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = _dereq_(81);
var gOPS = _dereq_(78);
var pIE = _dereq_(82);
var toObject = _dereq_(119);
var IObject = _dereq_(47);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || _dereq_(35)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"119":119,"35":35,"47":47,"78":78,"81":81,"82":82}],71:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = _dereq_(7);
var dPs = _dereq_(73);
var enumBugKeys = _dereq_(31);
var IE_PROTO = _dereq_(102)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_(30)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _dereq_(43).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"102":102,"30":30,"31":31,"43":43,"7":7,"73":73}],72:[function(_dereq_,module,exports){
var anObject = _dereq_(7);
var IE8_DOM_DEFINE = _dereq_(44);
var toPrimitive = _dereq_(120);
var dP = Object.defineProperty;

exports.f = _dereq_(29) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"120":120,"29":29,"44":44,"7":7}],73:[function(_dereq_,module,exports){
var dP = _dereq_(72);
var anObject = _dereq_(7);
var getKeys = _dereq_(81);

module.exports = _dereq_(29) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"29":29,"7":7,"72":72,"81":81}],74:[function(_dereq_,module,exports){
'use strict';
// Forced replacement prototype accessors methods
module.exports = _dereq_(60) || !_dereq_(35)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete _dereq_(40)[K];
});

},{"35":35,"40":40,"60":60}],75:[function(_dereq_,module,exports){
var pIE = _dereq_(82);
var createDesc = _dereq_(92);
var toIObject = _dereq_(117);
var toPrimitive = _dereq_(120);
var has = _dereq_(41);
var IE8_DOM_DEFINE = _dereq_(44);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = _dereq_(29) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"117":117,"120":120,"29":29,"41":41,"44":44,"82":82,"92":92}],76:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_(117);
var gOPN = _dereq_(77).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"117":117,"77":77}],77:[function(_dereq_,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = _dereq_(80);
var hiddenKeys = _dereq_(31).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"31":31,"80":80}],78:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],79:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = _dereq_(41);
var toObject = _dereq_(119);
var IE_PROTO = _dereq_(102)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"102":102,"119":119,"41":41}],80:[function(_dereq_,module,exports){
var has = _dereq_(41);
var toIObject = _dereq_(117);
var arrayIndexOf = _dereq_(11)(false);
var IE_PROTO = _dereq_(102)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"102":102,"11":11,"117":117,"41":41}],81:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = _dereq_(80);
var enumBugKeys = _dereq_(31);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"31":31,"80":80}],82:[function(_dereq_,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],83:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_(33);
var core = _dereq_(23);
var fails = _dereq_(35);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"23":23,"33":33,"35":35}],84:[function(_dereq_,module,exports){
var getKeys = _dereq_(81);
var toIObject = _dereq_(117);
var isEnum = _dereq_(82).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"117":117,"81":81,"82":82}],85:[function(_dereq_,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN = _dereq_(77);
var gOPS = _dereq_(78);
var anObject = _dereq_(7);
var Reflect = _dereq_(40).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"40":40,"7":7,"77":77,"78":78}],86:[function(_dereq_,module,exports){
var $parseFloat = _dereq_(40).parseFloat;
var $trim = _dereq_(111).trim;

module.exports = 1 / $parseFloat(_dereq_(112) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"111":111,"112":112,"40":40}],87:[function(_dereq_,module,exports){
var $parseInt = _dereq_(40).parseInt;
var $trim = _dereq_(111).trim;
var ws = _dereq_(112);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"111":111,"112":112,"40":40}],88:[function(_dereq_,module,exports){
'use strict';
var path = _dereq_(89);
var invoke = _dereq_(46);
var aFunction = _dereq_(3);
module.exports = function (/* ...pargs */) {
  var fn = aFunction(this);
  var length = arguments.length;
  var pargs = Array(length);
  var i = 0;
  var _ = path._;
  var holder = false;
  while (length > i) if ((pargs[i] = arguments[i++]) === _) holder = true;
  return function (/* ...args */) {
    var that = this;
    var aLen = arguments.length;
    var j = 0;
    var k = 0;
    var args;
    if (!holder && !aLen) return invoke(fn, pargs, that);
    args = pargs.slice();
    if (holder) for (;length > j; j++) if (args[j] === _) args[j] = arguments[k++];
    while (aLen > k) args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

},{"3":3,"46":46,"89":89}],89:[function(_dereq_,module,exports){
module.exports = _dereq_(40);

},{"40":40}],90:[function(_dereq_,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],91:[function(_dereq_,module,exports){
var newPromiseCapability = _dereq_(69);

module.exports = function (C, x) {
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"69":69}],92:[function(_dereq_,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],93:[function(_dereq_,module,exports){
var redefine = _dereq_(94);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"94":94}],94:[function(_dereq_,module,exports){
var global = _dereq_(40);
var hide = _dereq_(42);
var has = _dereq_(41);
var SRC = _dereq_(124)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_dereq_(23).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"124":124,"23":23,"40":40,"41":41,"42":42}],95:[function(_dereq_,module,exports){
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],96:[function(_dereq_,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],97:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = _dereq_(33);
var aFunction = _dereq_(3);
var ctx = _dereq_(25);
var forOf = _dereq_(39);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"25":25,"3":3,"33":33,"39":39}],98:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = _dereq_(33);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"33":33}],99:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = _dereq_(51);
var anObject = _dereq_(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _dereq_(25)(Function.call, _dereq_(75).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"25":25,"51":51,"7":7,"75":75}],100:[function(_dereq_,module,exports){
'use strict';
var global = _dereq_(40);
var dP = _dereq_(72);
var DESCRIPTORS = _dereq_(29);
var SPECIES = _dereq_(128)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"128":128,"29":29,"40":40,"72":72}],101:[function(_dereq_,module,exports){
var def = _dereq_(72).f;
var has = _dereq_(41);
var TAG = _dereq_(128)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"128":128,"41":41,"72":72}],102:[function(_dereq_,module,exports){
var shared = _dereq_(103)('keys');
var uid = _dereq_(124);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"103":103,"124":124}],103:[function(_dereq_,module,exports){
var global = _dereq_(40);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"40":40}],104:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = _dereq_(7);
var aFunction = _dereq_(3);
var SPECIES = _dereq_(128)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"128":128,"3":3,"7":7}],105:[function(_dereq_,module,exports){
'use strict';
var fails = _dereq_(35);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"35":35}],106:[function(_dereq_,module,exports){
var toInteger = _dereq_(116);
var defined = _dereq_(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"116":116,"28":28}],107:[function(_dereq_,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = _dereq_(52);
var defined = _dereq_(28);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"28":28,"52":52}],108:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var fails = _dereq_(35);
var defined = _dereq_(28);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"28":28,"33":33,"35":35}],109:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = _dereq_(118);
var repeat = _dereq_(110);
var defined = _dereq_(28);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"110":110,"118":118,"28":28}],110:[function(_dereq_,module,exports){
'use strict';
var toInteger = _dereq_(116);
var defined = _dereq_(28);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"116":116,"28":28}],111:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var defined = _dereq_(28);
var fails = _dereq_(35);
var spaces = _dereq_(112);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"112":112,"28":28,"33":33,"35":35}],112:[function(_dereq_,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],113:[function(_dereq_,module,exports){
var ctx = _dereq_(25);
var invoke = _dereq_(46);
var html = _dereq_(43);
var cel = _dereq_(30);
var global = _dereq_(40);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_dereq_(18)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"18":18,"25":25,"30":30,"40":40,"43":43,"46":46}],114:[function(_dereq_,module,exports){
var toInteger = _dereq_(116);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"116":116}],115:[function(_dereq_,module,exports){
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = _dereq_(116);
var toLength = _dereq_(118);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"116":116,"118":118}],116:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],117:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_(47);
var defined = _dereq_(28);
module.exports = function (it) {
  return IObject(defined(it));
};

},{"28":28,"47":47}],118:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_(116);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"116":116}],119:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_(28);
module.exports = function (it) {
  return Object(defined(it));
};

},{"28":28}],120:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_(51);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"51":51}],121:[function(_dereq_,module,exports){
'use strict';
if (_dereq_(29)) {
  var LIBRARY = _dereq_(60);
  var global = _dereq_(40);
  var fails = _dereq_(35);
  var $export = _dereq_(33);
  var $typed = _dereq_(123);
  var $buffer = _dereq_(122);
  var ctx = _dereq_(25);
  var anInstance = _dereq_(6);
  var propertyDesc = _dereq_(92);
  var hide = _dereq_(42);
  var redefineAll = _dereq_(93);
  var toInteger = _dereq_(116);
  var toLength = _dereq_(118);
  var toIndex = _dereq_(115);
  var toAbsoluteIndex = _dereq_(114);
  var toPrimitive = _dereq_(120);
  var has = _dereq_(41);
  var classof = _dereq_(17);
  var isObject = _dereq_(51);
  var toObject = _dereq_(119);
  var isArrayIter = _dereq_(48);
  var create = _dereq_(71);
  var getPrototypeOf = _dereq_(79);
  var gOPN = _dereq_(77).f;
  var getIterFn = _dereq_(129);
  var uid = _dereq_(124);
  var wks = _dereq_(128);
  var createArrayMethod = _dereq_(12);
  var createArrayIncludes = _dereq_(11);
  var speciesConstructor = _dereq_(104);
  var ArrayIterators = _dereq_(141);
  var Iterators = _dereq_(58);
  var $iterDetect = _dereq_(56);
  var setSpecies = _dereq_(100);
  var arrayFill = _dereq_(9);
  var arrayCopyWithin = _dereq_(8);
  var $DP = _dereq_(72);
  var $GOPD = _dereq_(75);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"100":100,"104":104,"11":11,"114":114,"115":115,"116":116,"118":118,"119":119,"12":12,"120":120,"122":122,"123":123,"124":124,"128":128,"129":129,"141":141,"17":17,"25":25,"29":29,"33":33,"35":35,"40":40,"41":41,"42":42,"48":48,"51":51,"56":56,"58":58,"6":6,"60":60,"71":71,"72":72,"75":75,"77":77,"79":79,"8":8,"9":9,"92":92,"93":93}],122:[function(_dereq_,module,exports){
'use strict';
var global = _dereq_(40);
var DESCRIPTORS = _dereq_(29);
var LIBRARY = _dereq_(60);
var $typed = _dereq_(123);
var hide = _dereq_(42);
var redefineAll = _dereq_(93);
var fails = _dereq_(35);
var anInstance = _dereq_(6);
var toInteger = _dereq_(116);
var toLength = _dereq_(118);
var toIndex = _dereq_(115);
var gOPN = _dereq_(77).f;
var dP = _dereq_(72).f;
var arrayFill = _dereq_(9);
var setToStringTag = _dereq_(101);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"101":101,"115":115,"116":116,"118":118,"123":123,"29":29,"35":35,"40":40,"42":42,"6":6,"60":60,"72":72,"77":77,"9":9,"93":93}],123:[function(_dereq_,module,exports){
var global = _dereq_(40);
var hide = _dereq_(42);
var uid = _dereq_(124);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"124":124,"40":40,"42":42}],124:[function(_dereq_,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],125:[function(_dereq_,module,exports){
var isObject = _dereq_(51);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"51":51}],126:[function(_dereq_,module,exports){
var global = _dereq_(40);
var core = _dereq_(23);
var LIBRARY = _dereq_(60);
var wksExt = _dereq_(127);
var defineProperty = _dereq_(72).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"127":127,"23":23,"40":40,"60":60,"72":72}],127:[function(_dereq_,module,exports){
exports.f = _dereq_(128);

},{"128":128}],128:[function(_dereq_,module,exports){
var store = _dereq_(103)('wks');
var uid = _dereq_(124);
var Symbol = _dereq_(40).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"103":103,"124":124,"40":40}],129:[function(_dereq_,module,exports){
var classof = _dereq_(17);
var ITERATOR = _dereq_(128)('iterator');
var Iterators = _dereq_(58);
module.exports = _dereq_(23).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"128":128,"17":17,"23":23,"58":58}],130:[function(_dereq_,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = _dereq_(33);
var $re = _dereq_(95)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"33":33,"95":95}],131:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = _dereq_(33);

$export($export.P, 'Array', { copyWithin: _dereq_(8) });

_dereq_(5)('copyWithin');

},{"33":33,"5":5,"8":8}],132:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $every = _dereq_(12)(4);

$export($export.P + $export.F * !_dereq_(105)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"105":105,"12":12,"33":33}],133:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = _dereq_(33);

$export($export.P, 'Array', { fill: _dereq_(9) });

_dereq_(5)('fill');

},{"33":33,"5":5,"9":9}],134:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $filter = _dereq_(12)(2);

$export($export.P + $export.F * !_dereq_(105)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"105":105,"12":12,"33":33}],135:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = _dereq_(33);
var $find = _dereq_(12)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(5)(KEY);

},{"12":12,"33":33,"5":5}],136:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = _dereq_(33);
var $find = _dereq_(12)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(5)(KEY);

},{"12":12,"33":33,"5":5}],137:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $forEach = _dereq_(12)(0);
var STRICT = _dereq_(105)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"105":105,"12":12,"33":33}],138:[function(_dereq_,module,exports){
'use strict';
var ctx = _dereq_(25);
var $export = _dereq_(33);
var toObject = _dereq_(119);
var call = _dereq_(53);
var isArrayIter = _dereq_(48);
var toLength = _dereq_(118);
var createProperty = _dereq_(24);
var getIterFn = _dereq_(129);

$export($export.S + $export.F * !_dereq_(56)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"118":118,"119":119,"129":129,"24":24,"25":25,"33":33,"48":48,"53":53,"56":56}],139:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $indexOf = _dereq_(11)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(105)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"105":105,"11":11,"33":33}],140:[function(_dereq_,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = _dereq_(33);

$export($export.S, 'Array', { isArray: _dereq_(49) });

},{"33":33,"49":49}],141:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_(5);
var step = _dereq_(57);
var Iterators = _dereq_(58);
var toIObject = _dereq_(117);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_(55)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"117":117,"5":5,"55":55,"57":57,"58":58}],142:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = _dereq_(33);
var toIObject = _dereq_(117);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (_dereq_(47) != Object || !_dereq_(105)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"105":105,"117":117,"33":33,"47":47}],143:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toIObject = _dereq_(117);
var toInteger = _dereq_(116);
var toLength = _dereq_(118);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(105)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"105":105,"116":116,"117":117,"118":118,"33":33}],144:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $map = _dereq_(12)(1);

$export($export.P + $export.F * !_dereq_(105)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"105":105,"12":12,"33":33}],145:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var createProperty = _dereq_(24);

// WebKit Array.of isn't generic
$export($export.S + $export.F * _dereq_(35)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"24":24,"33":33,"35":35}],146:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $reduce = _dereq_(13);

$export($export.P + $export.F * !_dereq_(105)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"105":105,"13":13,"33":33}],147:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $reduce = _dereq_(13);

$export($export.P + $export.F * !_dereq_(105)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"105":105,"13":13,"33":33}],148:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var html = _dereq_(43);
var cof = _dereq_(18);
var toAbsoluteIndex = _dereq_(114);
var toLength = _dereq_(118);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * _dereq_(35)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"114":114,"118":118,"18":18,"33":33,"35":35,"43":43}],149:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $some = _dereq_(12)(3);

$export($export.P + $export.F * !_dereq_(105)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"105":105,"12":12,"33":33}],150:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var aFunction = _dereq_(3);
var toObject = _dereq_(119);
var fails = _dereq_(35);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !_dereq_(105)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"105":105,"119":119,"3":3,"33":33,"35":35}],151:[function(_dereq_,module,exports){
_dereq_(100)('Array');

},{"100":100}],152:[function(_dereq_,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = _dereq_(33);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"33":33}],153:[function(_dereq_,module,exports){
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = _dereq_(33);
var toISOString = _dereq_(26);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"26":26,"33":33}],154:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toObject = _dereq_(119);
var toPrimitive = _dereq_(120);

$export($export.P + $export.F * _dereq_(35)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"119":119,"120":120,"33":33,"35":35}],155:[function(_dereq_,module,exports){
var TO_PRIMITIVE = _dereq_(128)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) _dereq_(42)(proto, TO_PRIMITIVE, _dereq_(27));

},{"128":128,"27":27,"42":42}],156:[function(_dereq_,module,exports){
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  _dereq_(94)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"94":94}],157:[function(_dereq_,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = _dereq_(33);

$export($export.P, 'Function', { bind: _dereq_(16) });

},{"16":16,"33":33}],158:[function(_dereq_,module,exports){
'use strict';
var isObject = _dereq_(51);
var getPrototypeOf = _dereq_(79);
var HAS_INSTANCE = _dereq_(128)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) _dereq_(72).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"128":128,"51":51,"72":72,"79":79}],159:[function(_dereq_,module,exports){
var dP = _dereq_(72).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _dereq_(29) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"29":29,"72":72}],160:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(19);
var validate = _dereq_(125);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = _dereq_(22)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"125":125,"19":19,"22":22}],161:[function(_dereq_,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = _dereq_(33);
var log1p = _dereq_(63);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"33":33,"63":63}],162:[function(_dereq_,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = _dereq_(33);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"33":33}],163:[function(_dereq_,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = _dereq_(33);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"33":33}],164:[function(_dereq_,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = _dereq_(33);
var sign = _dereq_(65);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"33":33,"65":65}],165:[function(_dereq_,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = _dereq_(33);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"33":33}],166:[function(_dereq_,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = _dereq_(33);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"33":33}],167:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = _dereq_(33);
var $expm1 = _dereq_(61);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"33":33,"61":61}],168:[function(_dereq_,module,exports){
// 20.2.2.16 Math.fround(x)
var $export = _dereq_(33);

$export($export.S, 'Math', { fround: _dereq_(62) });

},{"33":33,"62":62}],169:[function(_dereq_,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = _dereq_(33);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"33":33}],170:[function(_dereq_,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = _dereq_(33);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * _dereq_(35)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"33":33,"35":35}],171:[function(_dereq_,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = _dereq_(33);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"33":33}],172:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = _dereq_(33);

$export($export.S, 'Math', { log1p: _dereq_(63) });

},{"33":33,"63":63}],173:[function(_dereq_,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = _dereq_(33);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"33":33}],174:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = _dereq_(33);

$export($export.S, 'Math', { sign: _dereq_(65) });

},{"33":33,"65":65}],175:[function(_dereq_,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = _dereq_(33);
var expm1 = _dereq_(61);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * _dereq_(35)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"33":33,"35":35,"61":61}],176:[function(_dereq_,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = _dereq_(33);
var expm1 = _dereq_(61);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"33":33,"61":61}],177:[function(_dereq_,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = _dereq_(33);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"33":33}],178:[function(_dereq_,module,exports){
'use strict';
var global = _dereq_(40);
var has = _dereq_(41);
var cof = _dereq_(18);
var inheritIfRequired = _dereq_(45);
var toPrimitive = _dereq_(120);
var fails = _dereq_(35);
var gOPN = _dereq_(77).f;
var gOPD = _dereq_(75).f;
var dP = _dereq_(72).f;
var $trim = _dereq_(111).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(_dereq_(71)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = _dereq_(29) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _dereq_(94)(global, NUMBER, $Number);
}

},{"111":111,"120":120,"18":18,"29":29,"35":35,"40":40,"41":41,"45":45,"71":71,"72":72,"75":75,"77":77,"94":94}],179:[function(_dereq_,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = _dereq_(33);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"33":33}],180:[function(_dereq_,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export = _dereq_(33);
var _isFinite = _dereq_(40).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"33":33,"40":40}],181:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = _dereq_(33);

$export($export.S, 'Number', { isInteger: _dereq_(50) });

},{"33":33,"50":50}],182:[function(_dereq_,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = _dereq_(33);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"33":33}],183:[function(_dereq_,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export = _dereq_(33);
var isInteger = _dereq_(50);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"33":33,"50":50}],184:[function(_dereq_,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = _dereq_(33);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"33":33}],185:[function(_dereq_,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = _dereq_(33);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"33":33}],186:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var $parseFloat = _dereq_(86);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"33":33,"86":86}],187:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var $parseInt = _dereq_(87);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"33":33,"87":87}],188:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toInteger = _dereq_(116);
var aNumberValue = _dereq_(4);
var repeat = _dereq_(110);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !_dereq_(35)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"110":110,"116":116,"33":33,"35":35,"4":4}],189:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $fails = _dereq_(35);
var aNumberValue = _dereq_(4);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"33":33,"35":35,"4":4}],190:[function(_dereq_,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = _dereq_(33);

$export($export.S + $export.F, 'Object', { assign: _dereq_(70) });

},{"33":33,"70":70}],191:[function(_dereq_,module,exports){
var $export = _dereq_(33);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: _dereq_(71) });

},{"33":33,"71":71}],192:[function(_dereq_,module,exports){
var $export = _dereq_(33);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !_dereq_(29), 'Object', { defineProperties: _dereq_(73) });

},{"29":29,"33":33,"73":73}],193:[function(_dereq_,module,exports){
var $export = _dereq_(33);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_dereq_(29), 'Object', { defineProperty: _dereq_(72).f });

},{"29":29,"33":33,"72":72}],194:[function(_dereq_,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = _dereq_(51);
var meta = _dereq_(66).onFreeze;

_dereq_(83)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"51":51,"66":66,"83":83}],195:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = _dereq_(117);
var $getOwnPropertyDescriptor = _dereq_(75).f;

_dereq_(83)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"117":117,"75":75,"83":83}],196:[function(_dereq_,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
_dereq_(83)('getOwnPropertyNames', function () {
  return _dereq_(76).f;
});

},{"76":76,"83":83}],197:[function(_dereq_,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = _dereq_(119);
var $getPrototypeOf = _dereq_(79);

_dereq_(83)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"119":119,"79":79,"83":83}],198:[function(_dereq_,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = _dereq_(51);

_dereq_(83)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"51":51,"83":83}],199:[function(_dereq_,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = _dereq_(51);

_dereq_(83)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"51":51,"83":83}],200:[function(_dereq_,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = _dereq_(51);

_dereq_(83)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"51":51,"83":83}],201:[function(_dereq_,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = _dereq_(33);
$export($export.S, 'Object', { is: _dereq_(96) });

},{"33":33,"96":96}],202:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_(119);
var $keys = _dereq_(81);

_dereq_(83)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"119":119,"81":81,"83":83}],203:[function(_dereq_,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = _dereq_(51);
var meta = _dereq_(66).onFreeze;

_dereq_(83)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"51":51,"66":66,"83":83}],204:[function(_dereq_,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = _dereq_(51);
var meta = _dereq_(66).onFreeze;

_dereq_(83)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"51":51,"66":66,"83":83}],205:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_(33);
$export($export.S, 'Object', { setPrototypeOf: _dereq_(99).set });

},{"33":33,"99":99}],206:[function(_dereq_,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = _dereq_(17);
var test = {};
test[_dereq_(128)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _dereq_(94)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"128":128,"17":17,"94":94}],207:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var $parseFloat = _dereq_(86);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"33":33,"86":86}],208:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var $parseInt = _dereq_(87);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"33":33,"87":87}],209:[function(_dereq_,module,exports){
'use strict';
var LIBRARY = _dereq_(60);
var global = _dereq_(40);
var ctx = _dereq_(25);
var classof = _dereq_(17);
var $export = _dereq_(33);
var isObject = _dereq_(51);
var aFunction = _dereq_(3);
var anInstance = _dereq_(6);
var forOf = _dereq_(39);
var speciesConstructor = _dereq_(104);
var task = _dereq_(113).set;
var microtask = _dereq_(68)();
var newPromiseCapabilityModule = _dereq_(69);
var perform = _dereq_(90);
var promiseResolve = _dereq_(91);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_dereq_(128)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var sameConstructor = LIBRARY ? function (a, b) {
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
} : function (a, b) {
  return a === b;
};
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _dereq_(93)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return sameConstructor($Promise, C)
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
_dereq_(101)($Promise, PROMISE);
_dereq_(100)(PROMISE);
Wrapper = _dereq_(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
    return promiseResolve(this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_(56)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"100":100,"101":101,"104":104,"113":113,"128":128,"17":17,"23":23,"25":25,"3":3,"33":33,"39":39,"40":40,"51":51,"56":56,"6":6,"60":60,"68":68,"69":69,"90":90,"91":91,"93":93}],210:[function(_dereq_,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = _dereq_(33);
var aFunction = _dereq_(3);
var anObject = _dereq_(7);
var rApply = (_dereq_(40).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !_dereq_(35)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"3":3,"33":33,"35":35,"40":40,"7":7}],211:[function(_dereq_,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = _dereq_(33);
var create = _dereq_(71);
var aFunction = _dereq_(3);
var anObject = _dereq_(7);
var isObject = _dereq_(51);
var fails = _dereq_(35);
var bind = _dereq_(16);
var rConstruct = (_dereq_(40).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"16":16,"3":3,"33":33,"35":35,"40":40,"51":51,"7":7,"71":71}],212:[function(_dereq_,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = _dereq_(72);
var $export = _dereq_(33);
var anObject = _dereq_(7);
var toPrimitive = _dereq_(120);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * _dereq_(35)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"120":120,"33":33,"35":35,"7":7,"72":72}],213:[function(_dereq_,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = _dereq_(33);
var gOPD = _dereq_(75).f;
var anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"33":33,"7":7,"75":75}],214:[function(_dereq_,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = _dereq_(33);
var anObject = _dereq_(7);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
_dereq_(54)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"33":33,"54":54,"7":7}],215:[function(_dereq_,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = _dereq_(75);
var $export = _dereq_(33);
var anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"33":33,"7":7,"75":75}],216:[function(_dereq_,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = _dereq_(33);
var getProto = _dereq_(79);
var anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"33":33,"7":7,"79":79}],217:[function(_dereq_,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = _dereq_(75);
var getPrototypeOf = _dereq_(79);
var has = _dereq_(41);
var $export = _dereq_(33);
var isObject = _dereq_(51);
var anObject = _dereq_(7);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"33":33,"41":41,"51":51,"7":7,"75":75,"79":79}],218:[function(_dereq_,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = _dereq_(33);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"33":33}],219:[function(_dereq_,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export = _dereq_(33);
var anObject = _dereq_(7);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"33":33,"7":7}],220:[function(_dereq_,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = _dereq_(33);

$export($export.S, 'Reflect', { ownKeys: _dereq_(85) });

},{"33":33,"85":85}],221:[function(_dereq_,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export = _dereq_(33);
var anObject = _dereq_(7);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"33":33,"7":7}],222:[function(_dereq_,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = _dereq_(33);
var setProto = _dereq_(99);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"33":33,"99":99}],223:[function(_dereq_,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = _dereq_(72);
var gOPD = _dereq_(75);
var getPrototypeOf = _dereq_(79);
var has = _dereq_(41);
var $export = _dereq_(33);
var createDesc = _dereq_(92);
var anObject = _dereq_(7);
var isObject = _dereq_(51);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"33":33,"41":41,"51":51,"7":7,"72":72,"75":75,"79":79,"92":92}],224:[function(_dereq_,module,exports){
var global = _dereq_(40);
var inheritIfRequired = _dereq_(45);
var dP = _dereq_(72).f;
var gOPN = _dereq_(77).f;
var isRegExp = _dereq_(52);
var $flags = _dereq_(37);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (_dereq_(29) && (!CORRECT_NEW || _dereq_(35)(function () {
  re2[_dereq_(128)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  _dereq_(94)(global, 'RegExp', $RegExp);
}

_dereq_(100)('RegExp');

},{"100":100,"128":128,"29":29,"35":35,"37":37,"40":40,"45":45,"52":52,"72":72,"77":77,"94":94}],225:[function(_dereq_,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (_dereq_(29) && /./g.flags != 'g') _dereq_(72).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _dereq_(37)
});

},{"29":29,"37":37,"72":72}],226:[function(_dereq_,module,exports){
// @@match logic
_dereq_(36)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

},{"36":36}],227:[function(_dereq_,module,exports){
// @@replace logic
_dereq_(36)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

},{"36":36}],228:[function(_dereq_,module,exports){
// @@search logic
_dereq_(36)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

},{"36":36}],229:[function(_dereq_,module,exports){
// @@split logic
_dereq_(36)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = _dereq_(52);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

},{"36":36,"52":52}],230:[function(_dereq_,module,exports){
'use strict';
_dereq_(225);
var anObject = _dereq_(7);
var $flags = _dereq_(37);
var DESCRIPTORS = _dereq_(29);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  _dereq_(94)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (_dereq_(35)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"225":225,"29":29,"35":35,"37":37,"7":7,"94":94}],231:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(19);
var validate = _dereq_(125);
var SET = 'Set';

// 23.2 Set Objects
module.exports = _dereq_(22)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"125":125,"19":19,"22":22}],232:[function(_dereq_,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
_dereq_(108)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"108":108}],233:[function(_dereq_,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
_dereq_(108)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"108":108}],234:[function(_dereq_,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
_dereq_(108)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"108":108}],235:[function(_dereq_,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
_dereq_(108)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"108":108}],236:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $at = _dereq_(106)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"106":106,"33":33}],237:[function(_dereq_,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = _dereq_(33);
var toLength = _dereq_(118);
var context = _dereq_(107);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * _dereq_(34)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"107":107,"118":118,"33":33,"34":34}],238:[function(_dereq_,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
_dereq_(108)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"108":108}],239:[function(_dereq_,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
_dereq_(108)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"108":108}],240:[function(_dereq_,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
_dereq_(108)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"108":108}],241:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var toAbsoluteIndex = _dereq_(114);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"114":114,"33":33}],242:[function(_dereq_,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = _dereq_(33);
var context = _dereq_(107);
var INCLUDES = 'includes';

$export($export.P + $export.F * _dereq_(34)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"107":107,"33":33,"34":34}],243:[function(_dereq_,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
_dereq_(108)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"108":108}],244:[function(_dereq_,module,exports){
'use strict';
var $at = _dereq_(106)(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_(55)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"106":106,"55":55}],245:[function(_dereq_,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
_dereq_(108)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"108":108}],246:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var toIObject = _dereq_(117);
var toLength = _dereq_(118);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"117":117,"118":118,"33":33}],247:[function(_dereq_,module,exports){
var $export = _dereq_(33);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _dereq_(110)
});

},{"110":110,"33":33}],248:[function(_dereq_,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
_dereq_(108)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"108":108}],249:[function(_dereq_,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = _dereq_(33);
var toLength = _dereq_(118);
var context = _dereq_(107);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * _dereq_(34)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"107":107,"118":118,"33":33,"34":34}],250:[function(_dereq_,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
_dereq_(108)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"108":108}],251:[function(_dereq_,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
_dereq_(108)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"108":108}],252:[function(_dereq_,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
_dereq_(108)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"108":108}],253:[function(_dereq_,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
_dereq_(111)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"111":111}],254:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = _dereq_(40);
var has = _dereq_(41);
var DESCRIPTORS = _dereq_(29);
var $export = _dereq_(33);
var redefine = _dereq_(94);
var META = _dereq_(66).KEY;
var $fails = _dereq_(35);
var shared = _dereq_(103);
var setToStringTag = _dereq_(101);
var uid = _dereq_(124);
var wks = _dereq_(128);
var wksExt = _dereq_(127);
var wksDefine = _dereq_(126);
var keyOf = _dereq_(59);
var enumKeys = _dereq_(32);
var isArray = _dereq_(49);
var anObject = _dereq_(7);
var toIObject = _dereq_(117);
var toPrimitive = _dereq_(120);
var createDesc = _dereq_(92);
var _create = _dereq_(71);
var gOPNExt = _dereq_(76);
var $GOPD = _dereq_(75);
var $DP = _dereq_(72);
var $keys = _dereq_(81);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  _dereq_(77).f = gOPNExt.f = $getOwnPropertyNames;
  _dereq_(82).f = $propertyIsEnumerable;
  _dereq_(78).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !_dereq_(60)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_(42)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"101":101,"103":103,"117":117,"120":120,"124":124,"126":126,"127":127,"128":128,"29":29,"32":32,"33":33,"35":35,"40":40,"41":41,"42":42,"49":49,"59":59,"60":60,"66":66,"7":7,"71":71,"72":72,"75":75,"76":76,"77":77,"78":78,"81":81,"82":82,"92":92,"94":94}],255:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var $typed = _dereq_(123);
var buffer = _dereq_(122);
var anObject = _dereq_(7);
var toAbsoluteIndex = _dereq_(114);
var toLength = _dereq_(118);
var isObject = _dereq_(51);
var ArrayBuffer = _dereq_(40).ArrayBuffer;
var speciesConstructor = _dereq_(104);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * _dereq_(35)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

_dereq_(100)(ARRAY_BUFFER);

},{"100":100,"104":104,"114":114,"118":118,"122":122,"123":123,"33":33,"35":35,"40":40,"51":51,"7":7}],256:[function(_dereq_,module,exports){
var $export = _dereq_(33);
$export($export.G + $export.W + $export.F * !_dereq_(123).ABV, {
  DataView: _dereq_(122).DataView
});

},{"122":122,"123":123,"33":33}],257:[function(_dereq_,module,exports){
_dereq_(121)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],258:[function(_dereq_,module,exports){
_dereq_(121)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],259:[function(_dereq_,module,exports){
_dereq_(121)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],260:[function(_dereq_,module,exports){
_dereq_(121)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],261:[function(_dereq_,module,exports){
_dereq_(121)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],262:[function(_dereq_,module,exports){
_dereq_(121)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],263:[function(_dereq_,module,exports){
_dereq_(121)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],264:[function(_dereq_,module,exports){
_dereq_(121)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"121":121}],265:[function(_dereq_,module,exports){
_dereq_(121)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"121":121}],266:[function(_dereq_,module,exports){
'use strict';
var each = _dereq_(12)(0);
var redefine = _dereq_(94);
var meta = _dereq_(66);
var assign = _dereq_(70);
var weak = _dereq_(21);
var isObject = _dereq_(51);
var fails = _dereq_(35);
var validate = _dereq_(125);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _dereq_(22)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"12":12,"125":125,"21":21,"22":22,"35":35,"51":51,"66":66,"70":70,"94":94}],267:[function(_dereq_,module,exports){
'use strict';
var weak = _dereq_(21);
var validate = _dereq_(125);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
_dereq_(22)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"125":125,"21":21,"22":22}],268:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = _dereq_(33);
var flattenIntoArray = _dereq_(38);
var toObject = _dereq_(119);
var toLength = _dereq_(118);
var aFunction = _dereq_(3);
var arraySpeciesCreate = _dereq_(15);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

_dereq_(5)('flatMap');

},{"118":118,"119":119,"15":15,"3":3,"33":33,"38":38,"5":5}],269:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = _dereq_(33);
var flattenIntoArray = _dereq_(38);
var toObject = _dereq_(119);
var toLength = _dereq_(118);
var toInteger = _dereq_(116);
var arraySpeciesCreate = _dereq_(15);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

_dereq_(5)('flatten');

},{"116":116,"118":118,"119":119,"15":15,"33":33,"38":38,"5":5}],270:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = _dereq_(33);
var $includes = _dereq_(11)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_dereq_(5)('includes');

},{"11":11,"33":33,"5":5}],271:[function(_dereq_,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = _dereq_(33);
var microtask = _dereq_(68)();
var process = _dereq_(40).process;
var isNode = _dereq_(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"18":18,"33":33,"40":40,"68":68}],272:[function(_dereq_,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = _dereq_(33);
var cof = _dereq_(18);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"18":18,"33":33}],273:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-global
var $export = _dereq_(33);

$export($export.G, { global: _dereq_(40) });

},{"33":33,"40":40}],274:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_dereq_(97)('Map');

},{"97":97}],275:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_dereq_(98)('Map');

},{"98":98}],276:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = _dereq_(33);

$export($export.P + $export.R, 'Map', { toJSON: _dereq_(20)('Map') });

},{"20":20,"33":33}],277:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"33":33}],278:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"33":33}],279:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"33":33}],280:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);
var scale = _dereq_(64);
var fround = _dereq_(62);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"33":33,"62":62,"64":64}],281:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(33);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"33":33}],282:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(33);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"33":33}],283:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(33);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"33":33}],284:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"33":33}],285:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"33":33}],286:[function(_dereq_,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = _dereq_(33);

$export($export.S, 'Math', { scale: _dereq_(64) });

},{"33":33,"64":64}],287:[function(_dereq_,module,exports){
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = _dereq_(33);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"33":33}],288:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(33);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"33":33}],289:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toObject = _dereq_(119);
var aFunction = _dereq_(3);
var $defineProperty = _dereq_(72);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
_dereq_(29) && $export($export.P + _dereq_(74), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"119":119,"29":29,"3":3,"33":33,"72":72,"74":74}],290:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toObject = _dereq_(119);
var aFunction = _dereq_(3);
var $defineProperty = _dereq_(72);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
_dereq_(29) && $export($export.P + _dereq_(74), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"119":119,"29":29,"3":3,"33":33,"72":72,"74":74}],291:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = _dereq_(33);
var $entries = _dereq_(84)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"33":33,"84":84}],292:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = _dereq_(33);
var ownKeys = _dereq_(85);
var toIObject = _dereq_(117);
var gOPD = _dereq_(75);
var createProperty = _dereq_(24);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"117":117,"24":24,"33":33,"75":75,"85":85}],293:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toObject = _dereq_(119);
var toPrimitive = _dereq_(120);
var getPrototypeOf = _dereq_(79);
var getOwnPropertyDescriptor = _dereq_(75).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
_dereq_(29) && $export($export.P + _dereq_(74), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"119":119,"120":120,"29":29,"33":33,"74":74,"75":75,"79":79}],294:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(33);
var toObject = _dereq_(119);
var toPrimitive = _dereq_(120);
var getPrototypeOf = _dereq_(79);
var getOwnPropertyDescriptor = _dereq_(75).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
_dereq_(29) && $export($export.P + _dereq_(74), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"119":119,"120":120,"29":29,"33":33,"74":74,"75":75,"79":79}],295:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = _dereq_(33);
var $values = _dereq_(84)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"33":33,"84":84}],296:[function(_dereq_,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export = _dereq_(33);
var global = _dereq_(40);
var core = _dereq_(23);
var microtask = _dereq_(68)();
var OBSERVABLE = _dereq_(128)('observable');
var aFunction = _dereq_(3);
var anObject = _dereq_(7);
var anInstance = _dereq_(6);
var redefineAll = _dereq_(93);
var hide = _dereq_(42);
var forOf = _dereq_(39);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

_dereq_(100)('Observable');

},{"100":100,"128":128,"23":23,"3":3,"33":33,"39":39,"40":40,"42":42,"6":6,"68":68,"7":7,"93":93}],297:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = _dereq_(33);
var core = _dereq_(23);
var global = _dereq_(40);
var speciesConstructor = _dereq_(104);
var promiseResolve = _dereq_(91);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"104":104,"23":23,"33":33,"40":40,"91":91}],298:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = _dereq_(33);
var newPromiseCapability = _dereq_(69);
var perform = _dereq_(90);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"33":33,"69":69,"90":90}],299:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"67":67,"7":7}],300:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"67":67,"7":7}],301:[function(_dereq_,module,exports){
var Set = _dereq_(231);
var from = _dereq_(10);
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var getPrototypeOf = _dereq_(79);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"10":10,"231":231,"67":67,"7":7,"79":79}],302:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var getPrototypeOf = _dereq_(79);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"67":67,"7":7,"79":79}],303:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"67":67,"7":7}],304:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"67":67,"7":7}],305:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var getPrototypeOf = _dereq_(79);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"67":67,"7":7,"79":79}],306:[function(_dereq_,module,exports){
var metadata = _dereq_(67);
var anObject = _dereq_(7);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"67":67,"7":7}],307:[function(_dereq_,module,exports){
var $metadata = _dereq_(67);
var anObject = _dereq_(7);
var aFunction = _dereq_(3);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"3":3,"67":67,"7":7}],308:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
_dereq_(97)('Set');

},{"97":97}],309:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
_dereq_(98)('Set');

},{"98":98}],310:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = _dereq_(33);

$export($export.P + $export.R, 'Set', { toJSON: _dereq_(20)('Set') });

},{"20":20,"33":33}],311:[function(_dereq_,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = _dereq_(33);
var $at = _dereq_(106)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"106":106,"33":33}],312:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = _dereq_(33);
var defined = _dereq_(28);
var toLength = _dereq_(118);
var isRegExp = _dereq_(52);
var getFlags = _dereq_(37);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

_dereq_(54)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"118":118,"28":28,"33":33,"37":37,"52":52,"54":54}],313:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = _dereq_(33);
var $pad = _dereq_(109);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"109":109,"33":33}],314:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = _dereq_(33);
var $pad = _dereq_(109);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"109":109,"33":33}],315:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(111)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"111":111}],316:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(111)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"111":111}],317:[function(_dereq_,module,exports){
_dereq_(126)('asyncIterator');

},{"126":126}],318:[function(_dereq_,module,exports){
_dereq_(126)('observable');

},{"126":126}],319:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-global
var $export = _dereq_(33);

$export($export.S, 'System', { global: _dereq_(40) });

},{"33":33,"40":40}],320:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
_dereq_(97)('WeakMap');

},{"97":97}],321:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
_dereq_(98)('WeakMap');

},{"98":98}],322:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
_dereq_(97)('WeakSet');

},{"97":97}],323:[function(_dereq_,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
_dereq_(98)('WeakSet');

},{"98":98}],324:[function(_dereq_,module,exports){
var $iterators = _dereq_(141);
var getKeys = _dereq_(81);
var redefine = _dereq_(94);
var global = _dereq_(40);
var hide = _dereq_(42);
var Iterators = _dereq_(58);
var wks = _dereq_(128);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"128":128,"141":141,"40":40,"42":42,"58":58,"81":81,"94":94}],325:[function(_dereq_,module,exports){
var $export = _dereq_(33);
var $task = _dereq_(113);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"113":113,"33":33}],326:[function(_dereq_,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global = _dereq_(40);
var $export = _dereq_(33);
var invoke = _dereq_(46);
var partial = _dereq_(88);
var navigator = global.navigator;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return MSIE ? function (fn, time /* , ...args */) {
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      // eslint-disable-next-line no-new-func
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"33":33,"40":40,"46":46,"88":88}],327:[function(_dereq_,module,exports){
_dereq_(254);
_dereq_(191);
_dereq_(193);
_dereq_(192);
_dereq_(195);
_dereq_(197);
_dereq_(202);
_dereq_(196);
_dereq_(194);
_dereq_(204);
_dereq_(203);
_dereq_(199);
_dereq_(200);
_dereq_(198);
_dereq_(190);
_dereq_(201);
_dereq_(205);
_dereq_(206);
_dereq_(157);
_dereq_(159);
_dereq_(158);
_dereq_(208);
_dereq_(207);
_dereq_(178);
_dereq_(188);
_dereq_(189);
_dereq_(179);
_dereq_(180);
_dereq_(181);
_dereq_(182);
_dereq_(183);
_dereq_(184);
_dereq_(185);
_dereq_(186);
_dereq_(187);
_dereq_(161);
_dereq_(162);
_dereq_(163);
_dereq_(164);
_dereq_(165);
_dereq_(166);
_dereq_(167);
_dereq_(168);
_dereq_(169);
_dereq_(170);
_dereq_(171);
_dereq_(172);
_dereq_(173);
_dereq_(174);
_dereq_(175);
_dereq_(176);
_dereq_(177);
_dereq_(241);
_dereq_(246);
_dereq_(253);
_dereq_(244);
_dereq_(236);
_dereq_(237);
_dereq_(242);
_dereq_(247);
_dereq_(249);
_dereq_(232);
_dereq_(233);
_dereq_(234);
_dereq_(235);
_dereq_(238);
_dereq_(239);
_dereq_(240);
_dereq_(243);
_dereq_(245);
_dereq_(248);
_dereq_(250);
_dereq_(251);
_dereq_(252);
_dereq_(152);
_dereq_(154);
_dereq_(153);
_dereq_(156);
_dereq_(155);
_dereq_(140);
_dereq_(138);
_dereq_(145);
_dereq_(142);
_dereq_(148);
_dereq_(150);
_dereq_(137);
_dereq_(144);
_dereq_(134);
_dereq_(149);
_dereq_(132);
_dereq_(147);
_dereq_(146);
_dereq_(139);
_dereq_(143);
_dereq_(131);
_dereq_(133);
_dereq_(136);
_dereq_(135);
_dereq_(151);
_dereq_(141);
_dereq_(224);
_dereq_(230);
_dereq_(225);
_dereq_(226);
_dereq_(227);
_dereq_(228);
_dereq_(229);
_dereq_(209);
_dereq_(160);
_dereq_(231);
_dereq_(266);
_dereq_(267);
_dereq_(255);
_dereq_(256);
_dereq_(261);
_dereq_(264);
_dereq_(265);
_dereq_(259);
_dereq_(262);
_dereq_(260);
_dereq_(263);
_dereq_(257);
_dereq_(258);
_dereq_(210);
_dereq_(211);
_dereq_(212);
_dereq_(213);
_dereq_(214);
_dereq_(217);
_dereq_(215);
_dereq_(216);
_dereq_(218);
_dereq_(219);
_dereq_(220);
_dereq_(221);
_dereq_(223);
_dereq_(222);
_dereq_(270);
_dereq_(268);
_dereq_(269);
_dereq_(311);
_dereq_(314);
_dereq_(313);
_dereq_(315);
_dereq_(316);
_dereq_(312);
_dereq_(317);
_dereq_(318);
_dereq_(292);
_dereq_(295);
_dereq_(291);
_dereq_(289);
_dereq_(290);
_dereq_(293);
_dereq_(294);
_dereq_(276);
_dereq_(310);
_dereq_(275);
_dereq_(309);
_dereq_(321);
_dereq_(323);
_dereq_(274);
_dereq_(308);
_dereq_(320);
_dereq_(322);
_dereq_(273);
_dereq_(319);
_dereq_(272);
_dereq_(277);
_dereq_(278);
_dereq_(279);
_dereq_(280);
_dereq_(281);
_dereq_(283);
_dereq_(282);
_dereq_(284);
_dereq_(285);
_dereq_(286);
_dereq_(288);
_dereq_(287);
_dereq_(297);
_dereq_(298);
_dereq_(299);
_dereq_(300);
_dereq_(302);
_dereq_(301);
_dereq_(304);
_dereq_(303);
_dereq_(305);
_dereq_(306);
_dereq_(307);
_dereq_(271);
_dereq_(296);
_dereq_(326);
_dereq_(325);
_dereq_(324);
module.exports = _dereq_(23);

},{"131":131,"132":132,"133":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"160":160,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"170":170,"171":171,"172":172,"173":173,"174":174,"175":175,"176":176,"177":177,"178":178,"179":179,"180":180,"181":181,"182":182,"183":183,"184":184,"185":185,"186":186,"187":187,"188":188,"189":189,"190":190,"191":191,"192":192,"193":193,"194":194,"195":195,"196":196,"197":197,"198":198,"199":199,"200":200,"201":201,"202":202,"203":203,"204":204,"205":205,"206":206,"207":207,"208":208,"209":209,"210":210,"211":211,"212":212,"213":213,"214":214,"215":215,"216":216,"217":217,"218":218,"219":219,"220":220,"221":221,"222":222,"223":223,"224":224,"225":225,"226":226,"227":227,"228":228,"229":229,"23":23,"230":230,"231":231,"232":232,"233":233,"234":234,"235":235,"236":236,"237":237,"238":238,"239":239,"240":240,"241":241,"242":242,"243":243,"244":244,"245":245,"246":246,"247":247,"248":248,"249":249,"250":250,"251":251,"252":252,"253":253,"254":254,"255":255,"256":256,"257":257,"258":258,"259":259,"260":260,"261":261,"262":262,"263":263,"264":264,"265":265,"266":266,"267":267,"268":268,"269":269,"270":270,"271":271,"272":272,"273":273,"274":274,"275":275,"276":276,"277":277,"278":278,"279":279,"280":280,"281":281,"282":282,"283":283,"284":284,"285":285,"286":286,"287":287,"288":288,"289":289,"290":290,"291":291,"292":292,"293":293,"294":294,"295":295,"296":296,"297":297,"298":298,"299":299,"300":300,"301":301,"302":302,"303":303,"304":304,"305":305,"306":306,"307":307,"308":308,"309":309,"310":310,"311":311,"312":312,"313":313,"314":314,"315":315,"316":316,"317":317,"318":318,"319":319,"320":320,"321":321,"322":322,"323":323,"324":324,"325":325,"326":326}],328:[function(_dereq_,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
	console.log("mwd-donate-widget.js v18.7.10d");

	window.mwdspace = window.mwdspace || {};

	var payMethodIconHtml = {
		card: '<i class="far fa-credit-card"></i>',
		visa: '<i class="fab fa-cc-visa"></i>',
		mastercard: '<i class="fab fa-cc-mastercard"></i>',
		amex: '<i class="fab fa-cc-amex"></i>',
		discover: '<i class="fab fa-cc-discover"></i>',
		bitcoin: '<i class="fab fa-bitcoin"></i>'
	};

	window.mwdspace.MFA_Funraise_Widget = function (input) {
		var thisWidget = this;
		if ((typeof input === "undefined" ? "undefined" : _typeof(input)) == "object") {
			thisWidget.options = input;
		} else {
			thisWidget.options = {};
		}

		thisWidget.isStarted = false;
		thisWidget.isLoaded = false;
		thisWidget.codeVersion = "1.0.0";
		thisWidget.baseWidgetUrl = "https://quiz.mercyforanimals.org/donate-widget/" + thisWidget.codeVersion + "/";

		thisWidget.targetElement = {};
		thisWidget.promises = {};
		thisWidget.intervals = {};

		thisWidget.mainStylesUrl = thisWidget.baseWidgetUrl + "css/mwd-donate-widget.css";
		thisWidget.mainHtmlUrl = thisWidget.baseWidgetUrl + "mwd-donate-widget.html";

		console.log("window.mwdspace.MFA_Funraise_Widget", thisWidget.codeVersion);

		if (!thisWidget.options.loadingText) {
			thisWidget.options.loadingText = "One moment...";
		}

		if (!thisWidget.options.element) {
			console.warn("Invalid options - No target element:", thisWidget.options);
			return false;
		}

		if (typeof thisWidget.options.organizationId != "string" || !thisWidget.options.organizationId.trim()) {
			thisWidget.options.organizationId = "fcb4d538-ca92-4212-86cc-06d8ac929c4d";
		}
		if (typeof thisWidget.options.formId != "number" || typeof thisWidget.options.formId != "string" || !thisWidget.options.formId) {
			thisWidget.options.formId = 1194; // 4394
		}
		if (!thisWidget.options.listSingleGiftAskString || !thisWidget.options.listSingleGiftAskString.length) {
			thisWidget.options.listSingleGiftAskString = [25, 50, 75, 100];
		}

		if (!thisWidget.options.listMonthlyGiftAskString || !thisWidget.options.listMonthlyGiftAskString.length) {
			thisWidget.options.listMonthlyGiftAskString = [5, 10, 15, 20];
		}

		window.mwdspace.pageIdPrefix = "form" + thisWidget.options.formId;

		var target = document.querySelectorAll(thisWidget.options.element);
		if (!target) {
			console.warn("Specified target element not found:", thisWidget.options.element);
			return false;
		}
		thisWidget.targetElement = target[0];
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var thisWidget, promiseFontStyles, stylesUrl, promiseMainStyles, widgetHtml, sharedUtilResult, promiseMainHtml, promiseSharedUtils, _ref2, _ref3, container, isJqueryLoaded, promiseSpecialSelectCode, promiseBusinessLayer, promiseTransactionLayer;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						thisWidget = this;

						if (!thisWidget.isStarted) {
							_context.next = 4;
							break;
						}

						console.warn("window.mwdspace.MFA_Funraise_Widget already started");
						return _context.abrupt("return");

					case 4:
						thisWidget.isStarted = true;

						thisWidget.targetElement.innerHTML = "";

						promiseFontStyles = thisWidget.linkExternalStylesheet("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
						stylesUrl = thisWidget.options.styleSheets || thisWidget.mainStylesUrl;
						promiseMainStyles = thisWidget.linkExternalStylesheet(stylesUrl);

						thisWidget.linkExternalStylesheet("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css");
						_context.next = 12;
						return Promise.all([promiseFontStyles, promiseMainStyles]);

					case 12:
						promiseMainHtml = thisWidget.loadFile(thisWidget.mainHtmlUrl);
						promiseSharedUtils = thisWidget.linkExternalScript(thisWidget.baseWidgetUrl + "js/shared-utils.js");
						_context.next = 16;
						return Promise.all([promiseMainHtml, promiseSharedUtils]);

					case 16:
						_ref2 = _context.sent;
						_ref3 = _slicedToArray(_ref2, 2);
						widgetHtml = _ref3[0];
						sharedUtilResult = _ref3[1];

						if (widgetHtml) {
							_context.next = 23;
							break;
						}

						console.error("MFA_Funraise_Widget.start() - unable to load base HTML");
						return _context.abrupt("return");

					case 23:
						container = document.createElement("div");

						container.id = "mfaDonationWidgetContainer";
						container.style.opacity = 0;
						thisWidget.targetElement.appendChild(container);

						container.innerHTML = widgetHtml;

						setTimeout(function () {
							container.className = "reveal";
						}, 1);

						// start Spreedly first bc it has slow response time
						thisWidget.promises.spreedlyIframeScript = thisWidget.linkExternalScript("https://core.spreedly.com/iframe/iframe-v1.min.js");
						_context.next = 32;
						return thisWidget.linkExternalScript("https://code.jquery.com/jquery-3.3.1.min.js");

					case 32:
						isJqueryLoaded = _context.sent;


						// select2 should load after jQuery load complete
						promiseSpecialSelectCode = thisWidget.linkExternalScript("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js");
						promiseBusinessLayer = thisWidget.linkExternalScript(thisWidget.baseWidgetUrl + "js/gift-utilities.js");
						promiseTransactionLayer = thisWidget.linkExternalScript(thisWidget.baseWidgetUrl + "js/transaction-system-layer.js");
						_context.next = 38;
						return Promise.all([promiseBusinessLayer, promiseTransactionLayer, promiseSpecialSelectCode]);

					case 38:
						if (isJqueryLoaded) {
							thisWidget.jquery = jQuery.noConflict();
						} else {
							thisWidget.jquery = $ || {};
						}

						thisWidget.run();

					case 40:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	window.mwdspace.MFA_Funraise_Widget.prototype.run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
		var setupCompanyMatchSelect = function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var theLabel, jqMatchSelect;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!thisWidget.promises.spreedlyIframeScript) {
									_context2.next = 3;
									break;
								}

								_context2.next = 3;
								return thisWidget.promises.spreedlyIframeScript;

							case 3:
								theLabel = "Search by company name";

								try {
									if (thisWidget.labelOverride.donor.matchCompanyPlaceholder) {
										theLabel = thisWidget.labelOverride.donor.matchCompanyPlaceholder;
									}
								} catch (err) {}

								jqMatchSelect = jq('select[name="donorMatchCompany"]');

								if (!(typeof jqMatchSelect.select2 != "function")) {
									_context2.next = 9;
									break;
								}

								console.warn("SKIPPING COMPANY MATCH SMART SELECTOR");
								return _context2.abrupt("return");

							case 9:

								jqMatchSelect.select2({
									minimumInputLength: 3,
									delay: 400,
									placeholder: theLabel,
									width: "100%",
									ajax: {
										url: "https://platform.funraise.io/api/v1/ddcompanies",
										data: function data(params) {
											var query = {
												q: params.term
											};
											return query;
										},
										processResults: function processResults(data) {
											var returnObject = {
												results: []
											};

											if ((typeof data === "undefined" ? "undefined" : _typeof(data)) == "object" && data.length) {
												for (var i = 0; i < data.length; i++) {
													if (data[i].name) {
														returnObject.results.push({
															id: data[i].name,
															text: data[i].name
														});
													}
												}
											}
											return returnObject;
										}
									}
								});

							case 10:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			return function setupCompanyMatchSelect() {
				return _ref5.apply(this, arguments);
			};
		}();

		var setupSpreedly = function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								if (!thisWidget.promises.spreedlyIframeScript) {
									_context3.next = 10;
									break;
								}

								_context3.next = 3;
								return thisWidget.promises.spreedlyIframeScript;

							case 3:
								Spreedly.on("ready", function () {
									//format card number
									Spreedly.setPlaceholder("number", "Card");
									Spreedly.setFieldType("number", "text");
									Spreedly.setNumberFormat("prettyFormat");

									//format cvv
									Spreedly.setPlaceholder("cvv", "cvv");

									setSpreedlyLabels();
								});
								Spreedly.on("paymentMethod", function (token, result) {
									// console.log("\n\nSPREEDLY PAYMENT TOKENIZED", result);

									window.mwdspace.transactionSendData.paymentToken = token;

									sendTransaction();

									// PROCESS ERROR CHECK NEEDED
								});
								Spreedly.on("errors", function (errors) {
									console.log("\n\nSPREEDLY REPORTS ERRORS:");
									for (var i = 0; i < errors.length; i++) {
										var error = errors[i];
										console.log(error);
									}
									// PROCESS ERROR CHECK NEEDED
								});
								Spreedly.on("fieldEvent", function (name, type, activeEl, response) {
									if (type == "input") {
										window.mwdspace.userInputData.hasValidCardNumber = response.validNumber || false;
										window.mwdspace.userInputData.hasValidCardCvv = response.validCvv || false;
										window.mwdspace.userInputData.payCardType = response.cardType || false;
										if (name == "number") {
											if (response.validNumber) {
												jqCardNumberFeedback.find("span.cardNumberValidity").removeClass("invalid").addClass("valid").html('<i class="fas fa-check-circle"></i>');
											} else {
												jqCardNumberFeedback.find("span.cardNumberValidity").removeClass("valid").addClass("invalid").html('<i class="fas fa-times"></i>');
											}
											var iconHtml;
											switch (response.cardType) {
												case "visa":
													iconHtml = payMethodIconHtml.visa;
													break;
												case "master":
													iconHtml = payMethodIconHtml.mastercard;
													break;
												case "american_express":
													iconHtml = payMethodIconHtml.amex;
													break;
												case "discover":
													iconHtml = payMethodIconHtml.discover;
													break;
												default:
													iconHtml = payMethodIconHtml.card;
											}
											jqCardNumberFeedback.find("span.cardType").html(iconHtml);
										}
									}
								});
								Spreedly.init(paymentTokenizerId, {
									numberEl: "cardNumberTarget",
									cvvEl: "cardCvvTarget"
								});
								_context3.next = 11;
								break;

							case 10:
								console.error("Spreedly load not found - Skipping Spreedly setup");

							case 11:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			return function setupSpreedly() {
				return _ref6.apply(this, arguments);
			};
		}();

		var checkBitcoinPaymentStatus = function () {
			var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(input) {
				var baseInvoiceUrl, jqBitcoinContainer, response, messageHtml, domMessage;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								console.log(">>> checkBitcoinPaymentStatus()");
								if (typeof input == "undefined") {
									console.warn("checkBitcoinPaymentStatus() given empty url");
									input = null;
								}

								baseInvoiceUrl = "https://bitpay.com/invoices/";
								jqBitcoinContainer = jqContainer.find("div.bitcoinContainer");

								if (!(window.mwdspace.sharedUtils.getUrlParameter("data") == "live")) {
									_context4.next = 11;
									break;
								}

								console.log("SENDING LIVE POLL REQUEST");
								_context4.next = 8;
								return new Promise(function (resolve) {
									console.log(">>> checkBitcoinPaymentStatus() INSIDE PROMISE");
									if (typeof input != "string") {
										console.warn("checkBitcoinPaymentStatus() given invalid url type:", typeof input === "undefined" ? "undefined" : _typeof(input), input);
										resolve(null);
									}
									console.log("checkBitcoinPaymentStatus() start:", input);
									var requestUrl = encodeURI(baseInvoiceUrl + input);
									var xhr = new XMLHttpRequest();

									xhr.addEventListener("load", function (event) {
										// console.log("FILE LOADED:", event);
										var fileContents = event.target.responseText || event.target.response || null;
										var tempObject = window.mwdspace.sharedUtils.safeJsonParse(fileContents);

										if (!tempObject || !tempObject.data) {
											console.log("checkBitcoinPaymentStatus(): invalid response", event);
											resolve(null);
										}

										resolve(tempObject.data);
									});
									xhr.addEventListener("error", function (event) {
										console.error("checkBitcoinPaymentStatus() ERROR EVENT", requestUrl, event);
										resolve(null);
									});
									xhr.addEventListener("abort", function (event) {
										console.warn("checkBitcoinPaymentStatus() ABORT EVENT", requestUrl, event);
										resolve(null);
									});

									xhr.open("get", requestUrl, true);
									xhr.setRequestHeader("Accept", "application/json");
									xhr.send();
								});

							case 8:
								response = _context4.sent;
								_context4.next = 12;
								break;

							case 11:
								response = {
									url: "https://bitpay.com/invoice?id=G8pTXqC6wz8hAyR5EzDM2X",
									status: "complete",
									price: 5,
									currency: "USD",
									orderId: "644353",
									invoiceTime: 1530812344969,
									expirationTime: 1530813244969,
									currentTime: 1530812749555,
									guid: "99044051",
									id: "G8pTXqC6wz8hAyR5EzDM2X",
									lowFeeDetected: false,
									amountPaid: 0,
									exceptionStatus: false,
									refundAddressRequestPending: false,
									buyerProvidedInfo: {},
									paymentSubtotals: {
										BCH: 679800,
										BTC: 76100
									},
									paymentTotals: {
										BCH: 679800,
										BTC: 77700
									},
									exchangeRates: {
										BCH: {
											BTC: 0.11193848139253873,
											USD: 735.55
										},
										BTC: {
											BCH: 8.933100410560373,
											USD: 6571.009999999999
										}
									},
									supportedTransactionCurrencies: {
										BCH: {
											enabled: true
										},
										BTC: {
											enabled: true
										}
									},
									minerFees: {
										BCH: {
											totalFee: 0,
											satoshisPerByte: 0
										},
										BTC: {
											totalFee: 1600,
											satoshisPerByte: 11.179
										}
									},
									paymentCodes: {
										BCH: {
											BIP72b: "bitcoincash:?r=https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",
											BIP73: "https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X"
										},
										BTC: {
											BIP72b: "bitcoin:?r=https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",
											BIP73: "https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X"
										}
									},
									btcPrice: "0.000761",
									token: "5uqeA84nXkFyYDAk2yW3RZUo3XpqfVaNq25v6HjNw27EtxcNoNjCetZBh8375q2rH"
								};

							case 12:
								if (response) {
									_context4.next = 16;
									break;
								}

								messageHtml = "<div class='spacingContainer error'>Warning: Unable to check the status of this invoice (" + new Date().toLocaleTimeString() + "). Will try again shortly.</div>";

								jqBitcoinContainer.find("div.bitcoinFeedback").html(messageHtml);
								return _context4.abrupt("return");

							case 16:

								console.log("checkBitcoinPaymentStatus() RESPONSE", response);

								jqBitcoinContainer.find("div.bitcoinStatus").html(response.status);

								_context4.t0 = response.status;
								_context4.next = _context4.t0 === "paid" ? 21 : _context4.t0 === "confirmed" ? 21 : _context4.t0 === "complete" ? 21 : _context4.t0 === "expired" ? 24 : _context4.t0 === "invalid" ? 27 : 32;
								break;

							case 21:
								prepAndShowConfirmationStep();
								clearInterval(thisWidget.intervals.bitcoinStatusChecker);
								return _context4.abrupt("break", 32);

							case 24:
								prepAndShowErrorStep("The Bitcoin invoice expired before payment was received.");
								clearInterval(thisWidget.intervals.bitcoinStatusChecker);
								return _context4.abrupt("break", 32);

							case 27:
								domMessage = document.createElement("div");

								domMessage.innerHTML = "The invoice received payments, but is listed as invalid.";
								jq(domMessage).addClass("spacingContainer error");
								jqBitcoinContainer.find("div.bitcoinFeedback").append(domMessage);
								return _context4.abrupt("break", 32);

							case 32:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			return function checkBitcoinPaymentStatus(_x) {
				return _ref7.apply(this, arguments);
			};
		}();

		var thisWidget, jq, userInputData, paymentTokenizerId, jqContainer, jqStepList, jqMainBackButton, jqPayMethodSelect, jqRegionSelect, jqRegionInput, jqCurrencySelect, jqCardNumberFeedback, jqBitcoinTimeRemaining, showNextStep, showPreviousStep, showStep, checkStepGift, checkStepDonor, checkStepCard, showStepFeedback, setupInputWatchers, processChangeWatch, validateInputField, processGiftAmountChange, updateGiftAmount, updateCurrency, updatePayMethod, filterFrequencyButtons, updateFrequency, prePopulateUserFields, setInputFromUrl, buildTransactionSendData, sendTransaction, getGiftString, buildGiftStringButtons, buildGiftStringButton, cleanCurrency, formatDisplayGift, buildCurrencySelect, buildCurrencyOption, buildPayMethodSelect, buildPayMethodOption, buildFrequencyButtons, buildFrequencyButton, prepareRegionInput, showRegionInput, buildRegionSelect, buildRegionOption, buildCountrySelect, buildCountryOption, buildCardExpireMonthSelect, buildCardExpireMonthOption, buildCardExpireYearSelect, buildCardExpireYearOption, setSpreedlyLabels, tokenizeUserCard, findListMatch, prepAndShowProcessingStep, prepAndShowBitcoinStep, updateBitcoinTimer, prepAndShowConfirmationStep, prepAndShowErrorStep, scrollAll;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						scrollAll = function scrollAll(theElement) {
							if (!thisWidget.isLoaded) {
								// don't scroll until after initial page load is complete
								return;
							}

							theElement = jq(theElement);

							var originalScrollTop = jq(window).scrollTop();

							var viewHeight = jq(window).height();
							var viewTop = originalScrollTop;
							var viewBottom = viewTop + viewHeight;
							var padding = (theElement.outerHeight() - theElement.innerHeight()) / 2;
							padding = padding <= 0 ? 4 : padding;
							var elementTop = theElement.offset().top + padding;
							var elementBottom = elementTop + theElement.innerHeight();

							//when the element is taller the screen, scroll to element top (less padding)
							if (theElement.innerHeight() > viewHeight) {
								jq("html,body").animate({
									scrollTop: elementTop,
									easing: "ease"
								}, 444);
								return;
							}

							//the element top is off screen so scroll to element top (less padding)
							if (viewTop > elementTop) {
								jq("html,body").animate({
									scrollTop: elementTop,
									easing: "ease"
								}, 999);
								return;
							}

							//the element bottom is off screen so scroll up enough to not push the top offscreen
							if (viewBottom < elementBottom) {
								jq("html,body").animate({
									scrollTop: elementBottom - viewHeight + padding,
									easing: "ease"
								}, 999);
							}
						};

						prepAndShowErrorStep = function prepAndShowErrorStep(input) {
							if (typeof input == "undefined") {
								var input = {};
							}
							var jqStep = jqContainer.find('section[data-step-name="processError"]');
							jqStep.find("span.errorDescription").html(input);
							showStep("processError");
						};

						prepAndShowConfirmationStep = function prepAndShowConfirmationStep(input) {
							if (typeof input == "undefined") {
								var input = {};
							}

							var jqMessage = jqContainer.find('section[data-step-name="confirmation"] span.transactionSuccessMessage');

							console.log("jqMessage.length", jqMessage.length);

							// THANK YOU TEXT
							var thankYouText = "Thank you";
							try {
								if (thisWidget.labelOverride.transactionSuccess.thankYouText) {
									thankYouText = thisWidget.labelOverride.transactionSuccess.thankYouText;
								}
							} catch (err) {}
							jqMessage.html(thankYouText);

							// FIRST NAME
							try {
								if (window.mwdspace.userInputData.donorFirstName) {
									var domFirstName = document.createElement("strong");
									domFirstName.innerHTML = window.mwdspace.userInputData.donorFirstName;
									jqMessage.append(", ");
									jqMessage.append(domFirstName);
								}
							} catch (err) {}

							jqMessage.append("!");

							showStep("confirmation");
						};

						updateBitcoinTimer = function updateBitcoinTimer(expireTime) {
							if (typeof expireTime == "undefined") {
								var expireTime = null;
							}
							var displayCountdown = "Unknown time";
							try {
								var minutes = 0;
								var seconds = 0;

								var expireDate = new Date(expireTime).getTime();
								var now = new Date().getTime();

								var minutesRemaining = (expireDate - now) / 1000 / 60;

								if (minutesRemaining > 0) {
									minutes = parseInt(minutesRemaining);
									seconds = parseInt((minutesRemaining - minutes) * 60);

									if (minutesRemaining < 2) {
										jqBitcoinTimeRemaining.closest("div.bitcoinStatusDisplay").addClass("warning");
									}
								} else {
									jqBitcoinTimeRemaining.closest("div.bitcoinStatusDisplay").addClass("error");
									clearInterval(thisWidget.intervals.bitcoinTimer);
								}

								if (seconds < 10) {
									seconds = "0" + seconds;
								}
								displayCountdown = minutes.toFixed() + ":" + seconds;
							} catch (err) {
								console.warn("updateBitcoinTimer() caught error", err.message);
							}
							jqBitcoinTimeRemaining.html(displayCountdown);
						};

						prepAndShowBitcoinStep = function prepAndShowBitcoinStep(input) {
							if ((typeof input === "undefined" ? "undefined" : _typeof(input)) != "object") {
								console.warn("prepAndShowBitcoinStep() given invalid input", input);
								prepAndShowErrorStep("Unable to display Bitcoin invoice screen");
								return;
							}
							var jqStep = jqContainer.find('section[data-step-name="bitcoinInvoice"]');

							jqStep.find("span.bitcoinStatus").html(input.invoice_status);
							jqStep.find("img.scanCode").attr("src", "data:image/png;charset=utf-8;base64," + input.img_data);
							jqStep.find("span.bitcoinAmount").html(input.alt_amount);
							jqStep.find("span.bitcoinWalletLink").html(input.checkout_url);
							jqStep.find("a.bitcoinWalletLink").attr("href", input.checkout_url);

							// keep expire countdown timer updated
							updateBitcoinTimer(input.exp);
							thisWidget.intervals.bitcoinTimer = setInterval(function () {
								updateBitcoinTimer(input.exp);
							}, 1000);

							showStep("bitcoinInvoice");

							// watch for payment completion on Bitcoin side
							thisWidget.intervals.bitcoinStatusChecker = setInterval(function () {
								checkBitcoinPaymentStatus(input.transaction_id);
							}, 30000);
						};

						prepAndShowProcessingStep = function prepAndShowProcessingStep() {
							var iconHtml = "";

							if (window.mwdspace.userInputData.payMethod == "bitcoin") {
								iconHtml = payMethodIconHtml.bitcoin;
							} else if (window.mwdspace.userInputData.payMethod == "card") {
								switch (window.mwdspace.userInputData.payCardType) {
									case "visa":
										iconHtml = payMethodIconHtml.visa;
										break;
									case "mastercard":
									case "master":
									case "mc":
										iconHtml = payMethodIconHtml.mastercard;
										break;
									case "amex":
									case "american_express":
									case "americanexpress":
										iconHtml = payMethodIconHtml.amex;
										break;
									case "discover":
									case "disc":
										iconHtml = payMethodIconHtml.discover;
										break;
								}
							}

							var jqStep = jqContainer.find('section[data-step-name="processing"]');
							jqStep.find("span.processingPaySymbol").html(iconHtml);

							showStep("processing");
						};

						findListMatch = function findListMatch(theList, matchString) {
							for (var i = 0; i < theList.length; i++) {}
						};

						tokenizeUserCard = function tokenizeUserCard() {
							// tokenize only when all fields are ready
							// when successful, this will populate userInputData.paymentToken field

							// PROCESS ERROR CHECK NEEDED

							if (userInputData.hasValidCardNumber && userInputData.hasValidCardCvv && userInputData.payCardExpireMonth && userInputData.donorFirstName && userInputData.donorLastName && userInputData.payCardExpireYear) {
								if ((typeof Spreedly === "undefined" ? "undefined" : _typeof(Spreedly)) == "object") {
									var tokenOptions = {
										// Required
										first_name: userInputData.donorFirstName,
										last_name: userInputData.donorLastName,
										month: userInputData.payCardExpireMonth,
										year: userInputData.payCardExpireYear
									};
									// Optional
									if (userInputData.donorEmail) {
										tokenOptions.email = userInputData.donorEmail;
									}
									if (userInputData.donorPhone) {
										tokenOptions.phone_number = userInputData.donorPhone;
									}
									if (userInputData.donorStreet) {
										tokenOptions.address1 = userInputData.donorStreet;
									}
									if (userInputData.donorCity) {
										tokenOptions.city = userInputData.donorCity;
									}
									if (userInputData.donorRegion) {
										tokenOptions.state = userInputData.donorRegion;
									}
									if (userInputData.donorPostCode) {
										tokenOptions.zip = userInputData.donorPostCode;
									}
									if (userInputData.donorCountry) {
										tokenOptions.country = userInputData.donorCountry;
									}

									console.log(">> CALLING tokenizeCreditCard", tokenOptions);
									Spreedly.tokenizeCreditCard(tokenOptions);
									return true;
								} else {
									console.error("NO SPREEDLY OBJECT");
								}
							} else {
								console.error("SPREEDLY FIELD NOT READY");
							}
							return false;
						};

						setSpreedlyLabels = function setSpreedlyLabels() {
							if ((typeof Spreedly === "undefined" ? "undefined" : _typeof(Spreedly)) == "object") {
								var labelCard = "Card";
								var labelCvv = "cvv";
								try {
									if (thisWidget.labelOverride.cardInfo.cardNumberPlaceholder) {
										labelCard = thisWidget.labelOverride.cardInfo.cardNumberPlaceholder;
									}
								} catch (err) {}
								try {
									if (thisWidget.labelOverride.cardInfo.cvvPlaceholder) {
										labelCvv = thisWidget.labelOverride.cardInfo.cvvPlaceholder;
									}
								} catch (err) {}
								Spreedly.setPlaceholder("number", labelCard);
								Spreedly.setPlaceholder("cvv", labelCvv);

								Spreedly.setStyle("number", "font-size:16px;color:#333;");
								Spreedly.setStyle("cvv", "font-size:16px;color:#333;");
							}
						};

						buildCardExpireYearOption = function buildCardExpireYearOption(year, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								console.warn("buildRegionOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}

							var domOption = null;
							try {
								if (typeof year != "number" && typeof year != "string" && !year) {
									console.error("Invalid year given:", year);
								} else {
									if (typeof value == "undefined") {
										var value = year;
									}

									domOption = document.createElement("option");
									for (var key in attributes) {
										domOption.setAttribute(key, attributes[key]);
									}
									domOption.innerText = year;
								}
							} catch (err) {
								console.error("Unable to build the option element for year:", year);
							}
							return domOption;
						};

						buildCardExpireYearSelect = function buildCardExpireYearSelect() {
							try {
								// show only current year and beyond (with some fudge factor)
								var recentDate = new Date();
								recentDate.setDate(recentDate.getDate() - 7);
								var startYear = recentDate.getFullYear();
								var yearsToShow = 20;

								var domCardExpireYearSelect = jqContainer.find('select[name="payCardExpireYear"]');
								if (domCardExpireYearSelect.length !== 1) {
									throw new Error("Unable to identify the card expire year select dropdown");
								}
								// add placeholder value
								var domThisOption = buildCardExpireYearOption("Year", {
									value: "",
									"data-label-id": "cardInfo.cardExpireYearPlaceholder"
								});
								domCardExpireYearSelect.append(domThisOption);
								// add years
								for (var expireYear = startYear; expireYear < startYear + yearsToShow; expireYear++) {
									domThisOption = buildCardExpireYearOption(expireYear);
									if (domThisOption) {
										domCardExpireYearSelect.append(domThisOption);
									} else {
										console.warn("Unable to add card expire year:", expireYear);
									}
								}
							} catch (err) {
								console.error("Unable to build the card expire year select dropdown", err);
							}
						};

						buildCardExpireMonthOption = function buildCardExpireMonthOption(month, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								console.warn("buildRegionOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}

							var domOption = null;
							try {
								if (typeof month != "number" && typeof month != "string" && !month) {
									console.error("Invalid month given:", month);
								} else {
									try {
										var tempInt = parseInt(month);
										if (!isNaN(tempInt) && tempInt >= 0 && tempInt < 10) {
											month = "0" + tempInt;
										}
									} catch (err) {}

									domOption = document.createElement("option");
									for (var key in attributes) {
										domOption.setAttribute(key, attributes[key]);
									}
									domOption.innerText = month;
								}
							} catch (err) {
								console.error("Unable to build the option element for month:", month);
							}
							return domOption;
						};

						buildCardExpireMonthSelect = function buildCardExpireMonthSelect() {
							try {
								var domCardExpireMonthSelect = jqContainer.find('select[name="payCardExpireMonth"]');
								if (domCardExpireMonthSelect.length !== 1) {
									throw new Error("Unable to identify the card expire month select dropdown");
								}
								// add placeholder value
								var domThisOption = buildCardExpireMonthOption("Month", {
									value: "",
									"data-label-id": "cardInfo.cardExpireMonthPlaceholder"
								});
								domCardExpireMonthSelect.append(domThisOption);
								// add months
								for (var expireMonth = 1; expireMonth <= 12; expireMonth++) {
									domThisOption = buildCardExpireMonthOption(expireMonth);
									if (domThisOption) {
										domCardExpireMonthSelect.append(domThisOption);
									} else {
										console.warn("Unable to add card expire month:", expireMonth);
									}
								}
							} catch (err) {
								console.error("Unable to build the card expire month select dropdown", err);
							}
						};

						buildCountryOption = function buildCountryOption(country, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								console.warn("buildCountryOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}
							var domOption = null;
							try {
								if (country.code) {
									domOption = document.createElement("option");
									domOption.innerText = country.name;
								}
							} catch (err) {
								console.error("Unable to build the option element for country:", country);
							}
							for (var key in attributes) {
								domOption.setAttribute(key, attributes[key]);
							}
							return domOption;
						};

						buildCountrySelect = function buildCountrySelect(options) {
							if (typeof options == "undefined") {
								var options = {};
							}
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") {
								options = {};
								console.warn("buildCountrySelect(): ignoring invalid option object", options);
							}
							var defaultCountry = typeof options.default == "string" ? options.default : "United States";
							try {
								if (!window.mwdspace.validCountryList) {
									throw new Error("List of valid countries not found");
								}
								var domCountrySelect = jqContainer.find('select[name="donorCountry"]');
								domCountrySelect.on("change", prepareRegionInput);
								if (domCountrySelect.length !== 1) {
									throw new Error("Unable to identify the country select dropdown");
								}
								var domThisOption, thisCountry, okToAdd;

								for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
									okToAdd = true;
									thisCountry = window.mwdspace.validCountryList[i];
									if (options.filterList) {
										okToAdd = findListMatch(options.filterList, thisCountry.code);
									}
									if (okToAdd) {
										// var attributes = {};
										domThisOption = buildCountryOption(thisCountry);
										if (domThisOption) {
											domCountrySelect.append(domThisOption);
										} else {
											console.warn("Unable to add country:", thisCountry);
										}
									}
								}
								domCountrySelect.val(defaultCountry).trigger("change");
							} catch (err) {
								console.error("Unable to build the country select dropdown", err);
							}
						};

						buildRegionOption = function buildRegionOption(regionName, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								console.warn("buildRegionOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}
							try {
								if (typeof regionName == "string" && regionName.trim()) {
									var domOption = null;
									domOption = document.createElement("option");
									domOption.innerText = regionName;
									for (var key in attributes) {
										domOption.setAttribute(key, attributes[key]);
									}
									return domOption;
								}
							} catch (err) {
								console.error("Unable to build the option element for region:", region);
							}
							return null;
						};

						buildRegionSelect = function buildRegionSelect(regions) {
							jqRegionInput.hide();
							jqRegionSelect.val("").show().trigger("change");

							if (typeof regions == "undefined") {
								console.warn("buildRegionSelect(): no regions object", regions);
								return false;
							}
							if ((typeof regions === "undefined" ? "undefined" : _typeof(regions)) != "object" || regions.length < 1) {
								console.warn("buildRegionSelect(): invalid regions object", regions);
								return false;
							}

							try {
								if (jqRegionSelect.length !== 1) {
									console.error("Unable to identify the region select dropdown");
									return false;
								}
								var domThisOption, thisRegion;

								var regionCtr = 0;

								jqRegionSelect.empty();
								domThisOption = buildRegionOption("State/Region...", {
									"data-label-id": "donor.regionPlaceholder",
									value: ""
								});
								jqRegionSelect.append(domThisOption);

								for (var i = 0; i < regions.length; i++) {
									thisRegion = regions[i];
									domThisOption = buildRegionOption(thisRegion.name);
									if (domThisOption) {
										jqRegionSelect.append(domThisOption);
										regionCtr++;
									} else {
										console.warn("Unable to add region:", thisRegion);
									}
								}
								if (regionCtr > 0) {
									return true;
								}
							} catch (err) {
								console.error("Unable to build the region select dropdown", err);
							}
							return false;
						};

						showRegionInput = function showRegionInput() {
							jqRegionSelect.hide();
							jqRegionInput.val("").show().trigger("change");
						};

						prepareRegionInput = function prepareRegionInput() {
							if (typeof options == "undefined") {
								var options = {};
							}
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") {
								options = {};
								console.warn("prepareRegionInput(): ignoring invalid option object", options);
							}

							try {
								var userCountry = jqContainer.find('select[name="donorCountry"]').val();
								var thisCountry;
								for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
									thisCountry = window.mwdspace.validCountryList[i];
									if (userCountry == thisCountry.code || userCountry == thisCountry.name) {
										if (thisCountry.regions && buildRegionSelect(thisCountry.regions)) {
											return;
										}
									}
								}
							} catch (err) {
								console.error("Unable to prepare the region input method", err);
							}
							showRegionInput();
						};

						buildFrequencyButton = function buildFrequencyButton(frequency, options) {
							if (typeof options == "undefined") {
								var options = {};
							}
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") {
								options = {};
								console.warn("buildFrequencyButton(): ignoring invalid option object", options);
							}
							var domButton = null;
							try {
								if (frequency.code) {
									// the container div
									domButton = document.createElement("div");
									jq(domButton).addClass("fancyRadioButton");

									// the radio
									var domRadio = document.createElement("input");
									jq(domRadio).addClass("changeWatch");
									domRadio.setAttribute("type", "radio");
									domRadio.setAttribute("name", "giftFrequency");
									domRadio.setAttribute("value", frequency.code);
									if (options.id) {
										domRadio.setAttribute("id", options.id);
									}
									domButton.appendChild(domRadio);

									// the label
									var domLabel = document.createElement("label");

									domLabel.setAttribute("data-label-id", "gift.frequency." + frequency.code);
									domLabel.innerHTML = frequency.name || "Unknown";
									if (options.id) {
										domLabel.setAttribute("for", options.id);
									}
									domButton.appendChild(domLabel);
								}
							} catch (err) {
								console.error("Error building the button for frequency:", frequency, err);
							}
							return domButton;
						};

						buildFrequencyButtons = function buildFrequencyButtons() {
							try {
								if (!window.mwdspace.validFrequencyList || window.mwdspace.validFrequencyList.length < 1) {
									throw new Error("Invalid list of frequencies given");
								}
								var jqFrequencyContainer = jqContainer.find("div.giftFrequencyContainer");
								if (jqFrequencyContainer.length !== 1) {
									throw new Error("Unable to identify the frequency container");
								}
								// remove any existing options
								jqFrequencyContainer.find("div.fancyRadioButton").remove();

								var domThisButton;

								for (var i = 0; i < window.mwdspace.validFrequencyList.length; i++) {
									domThisButton = buildFrequencyButton(window.mwdspace.validFrequencyList[i], { id: window.mwdspace.sharedUtils.makeUniqueId("frequency-" + i) });
									if (domThisButton) {
										jqFrequencyContainer.append(domThisButton);
									} else {
										console.warn("Unable to add frequency:", window.mwdspace.validFrequencyList[i]);
									}
								}
								jqFrequencyContainer.find('input[name="giftFrequency"]').eq(0).prop("checked", true).trigger("change");
							} catch (err) {
								console.error("Unable to build the frequency buttons", err);
							}
						};

						buildPayMethodOption = function buildPayMethodOption(method) {
							var domOption = null;
							try {
								if (method.code) {
									domOption = document.createElement("option");
									domOption.setAttribute("value", method.code);
									domOption.setAttribute("data-label-id", "gift.payMethod." + method.code);
									domOption.innerText = method.description || "Unknown";
								}
							} catch (err) {
								console.error("Unable to build the option element for method:", method);
							}
							return domOption;
						};

						buildPayMethodSelect = function buildPayMethodSelect() {
							try {
								if (!window.mwdspace.validPayMethodList) {
									throw new Error("List of valid payment methods not found");
								}
								if (jqPayMethodSelect.length !== 1) {
									throw new Error("Unable to identify the payment method select dropdown");
								}
								var domThisOption;

								for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
									domThisOption = buildPayMethodOption(window.mwdspace.validPayMethodList[i]);
									if (domThisOption) {
										jqPayMethodSelect.append(domThisOption);
									} else {
										console.warn("Unable to add payment method:", window.mwdspace.validPayMethodList[i]);
									}
								}
								// hide the selector when it has only one value
								if (window.mwdspace.validPayMethodList.length > 1) {
									jqPayMethodSelect.show();
								} else {
									jqPayMethodSelect.hide();
								}
							} catch (err) {
								console.error("Unable to build the payment method select dropdown", err);
							}
						};

						buildCurrencyOption = function buildCurrencyOption(currency) {
							var domOption = null;
							try {
								if (currency.code) {
									domOption = document.createElement("option");
									domOption.setAttribute("value", currency.code);
									domOption.innerText = currency.code + " " + (currency.name || "");
								}
							} catch (err) {
								console.error("Unable to build the option element for currency:", currency);
							}
							return domOption;
						};

						buildCurrencySelect = function buildCurrencySelect(options) {
							if (typeof options == "undefined") {
								var options = {};
							}
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") {
								options = {};
								console.warn("buildCurrencySelect(): ignoring invalid option object", options);
							}
							var defaultCurrency = typeof options.default == "string" ? options.default : "USD";
							try {
								if (!window.mwdspace.validCurrencyList) {
									throw new Error("List of valid currencies not found");
								}
								var domCurrencySelect = jqCurrencySelect;
								if (domCurrencySelect.length !== 1) {
									throw new Error("Unable to identify the currency select dropdown");
								}
								var domThisOption, thisCurrency, okToAdd;

								for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
									okToAdd = true;
									thisCurrency = window.mwdspace.validCurrencyList[i];
									if (options.filterList) {
										okToAdd = findListMatch(options.filterList, thisCurrency.code);
									}
									if (okToAdd) {
										domThisOption = buildCurrencyOption(thisCurrency);
										if (domThisOption) {
											domCurrencySelect.append(domThisOption);
										} else {
											console.warn("Unable to add currency:", thisCurrency);
										}
									}
								}
								domCurrencySelect.val(defaultCurrency).trigger("change");
							} catch (err) {
								console.error("Unable to build the currency select dropdown", err);
							}
						};

						formatDisplayGift = function formatDisplayGift(input) {
							if (typeof input == "undefined") {
								var input = "";
							}
							input = "" + input;
							var amount = cleanCurrency(input);
							amount = amount.toFixed(2);
							amount = amount.replace(/\.00$/g, "");
							return amount;
						};

						cleanCurrency = function cleanCurrency(input) {
							if (typeof input == "undefined") {
								console.warn("cleanCurrency() given empty input");
								var input = "";
							}
							input = "" + input;
							var rawCurrency = parseFloat(input.replace(/[^0-9|\.]/g, ""));
							if (isNaN(rawCurrency)) {
								console.log("cleanCurrency() defaulting invalid input to 0.00", input);
								return 0.0;
							}
							return Math.round(rawCurrency * 100) / 100;
						};

						buildGiftStringButton = function buildGiftStringButton(input, options) {
							if (typeof options == "undefined") {
								var options = {};
							}
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") {
								options = {};
								console.warn("buildGiftStringButton(): ignoring invalid option object", options);
							}
							var domButton = null;
							try {
								var thisAmount = {
									amount: cleanCurrency(input),
									displayText: formatDisplayGift(input)
								};

								if (!thisAmount.amount || !thisAmount.displayText) {
									throw new Error("Invalid gift string amount");
								}

								// the container div
								domButton = document.createElement("div");
								jq(domButton).addClass("giftOption fixed fancyRadioButton");

								// the radio
								var domRadio = document.createElement("input");
								domRadio.setAttribute("type", "radio");
								domRadio.setAttribute("name", "giftAmountFixed");
								domRadio.setAttribute("value", thisAmount.amount);
								if (options.id) {
									domRadio.setAttribute("id", options.id);
								}
								domButton.appendChild(domRadio);

								// the label
								var domLabel = document.createElement("label");
								if (options.id) {
									domLabel.setAttribute("for", options.id);
								}
								domButton.appendChild(domLabel);

								// label currency symbol
								var domSymbol = document.createElement("span");
								jq(domSymbol).addClass("currencySymbol");
								domLabel.appendChild(domSymbol);

								// label amount value
								var domAmount = document.createElement("span");
								jq(domAmount).addClass("displayAmount");
								domAmount.innerHTML = thisAmount.displayText || "Unknown";
								domLabel.appendChild(domAmount);
							} catch (err) {
								console.error("Error building the button for fixed amount:", input, err);
							}
							return domButton;
						};

						buildGiftStringButtons = function buildGiftStringButtons(giftStringList) {
							if (typeof giftStringList == "undefined") {
								var giftStringList = [];
							}
							try {
								if (!giftStringList || giftStringList.length < 1) {
									throw new Error("Invalid gift string list given");
								}
								var jqGiftStringContainer = jqContainer.find("div.fixedAmountContainer");
								if (jqGiftStringContainer.length !== 1) {
									throw new Error("Unable to identify the fixed gift amount container");
								}
								// remove any existing options
								jqGiftStringContainer.empty();

								var domThisButton, thisAmount, thisId;
								var defaultId = null;

								for (var i = 0; i < giftStringList.length; i++) {
									thisAmount = giftStringList[i];
									thisId = window.mwdspace.sharedUtils.makeUniqueId("amount-" + i);
									if (!defaultId && String(thisAmount).match(/\*/)) {
										defaultId = thisId;
									}
									domThisButton = buildGiftStringButton(thisAmount, {
										id: thisId
									});
									if (domThisButton) {
										jqGiftStringContainer.append(domThisButton);
									} else {
										console.warn("Unable to add fixed gift button:", thisAmount);
									}
								}
								// below is in progress
								if (defaultId) {
									jqGiftStringContainer.find("div.giftAmountContainer input#" + defaultId).prop("checked", true).trigger("change");
								} else {
									jqGiftStringContainer.find("div.giftAmountContainer input[name='giftAmountFixed']").eq(1).prop("checked", true).trigger("change");
								}
							} catch (err) {
								console.error("Unable to build the fixed gift buttons", err);
							}
							updateCurrency();
						};

						getGiftString = function getGiftString() {
							var giftStringOptions = {
								// basicRounding: true,
								// minimumDynamicStart: 30.0,
							};
							if (window.mwdspace.userInputData.frequency == "monthly") {
								if (thisWidget.options.listMonthlyGiftAskString) {
									giftStringOptions.giftStringList = thisWidget.options.listMonthlyGiftAskString;
									if (!thisWidget.isMonthlyOnlyPage) {
										giftStringOptions.calculateAsMonthly = true;
									}
								}
							} else {
								if (thisWidget.options.listSingleGiftAskString) {
									giftStringOptions.giftStringList = thisWidget.options.listSingleGiftAskString;
								}
							}

							var finalGiftString = window.mwdspace.giftUtils.processGiftStringList(giftStringOptions);
							buildGiftStringButtons(finalGiftString);
						};

						sendTransaction = function sendTransaction() {
							window.mwdspace.transactionSendData = buildTransactionSendData();
							if (!window.mwdspace.transactionLayer.validateSendData(window.mwdspace.transactionSendData)) {
								return false;
							}
							console.log("sendTransaction() SENDING", window.mwdspace.transactionSendData);

							prepAndShowProcessingStep();

							window.mwdspace.transactionLayer.startDonation(window.mwdspace.transactionSendData, function (donationInfo) {
								console.log("SUCCESS FUNCTION", donationInfo);

								if (donationInfo.type == "card") {
									var transactionStatus = String(donationInfo.status);
									if (transactionStatus.match(/complete/i)) {
										prepAndShowConfirmationStep();
									} else {
										prepAndShowErrorStep('The server appears to have had an error processing this card transaction, and reported status "' + transactionStatus + '".');
									}
								} else if (donationInfo.type == "bitcoin") {
									prepAndShowBitcoinStep(donationInfo);
								} else {
									console.warn("Unrecognized type property in server response", donationInfo);
									prepAndShowErrorStep("Unrecognized response from the sever");
								}
							}, function (donationInfo) {
								console.log("FAIL FUNCTION", donationInfo);

								console.warn("Donation received fail response from server", donationInfo);

								var userMessage = donationInfo.text || "The server was unable to process the transaction, but provided no explanation.";

								prepAndShowErrorStep(userMessage);
							});
							return true;
						};

						buildTransactionSendData = function buildTransactionSendData() {
							console.log("buildTransactionSendData() START");
							try {
								window.mwdspace.transactionSendData = {};
								var sendData = window.mwdspace.transactionSendData;

								var userData = window.mwdspace.userInputData;
								console.log("buildTransactionSendData() userData", userData);

								sendData.organizationId = thisWidget.options.organizationId || null;
								sendData.formId = thisWidget.options.formId ? String(thisWidget.options.formId) : ""; //mimic test
								sendData.formAllocationId = thisWidget.options.formAllocationId || null;

								/* start - no data, added to mimic current widget */
								sendData.bank_account_holder_type = "personal";
								sendData.bank_account_number = "";
								sendData.bank_account_type = "checking";
								sendData.bank_name = "";
								sendData.bank_routing_number = "";
								sendData.comment = "";
								sendData.payment_method_token = "";
								sendData.tags = null;
								/* end - no data, added to mimic current widget */

								sendData.first_name = userData.donorFirstName || "";
								sendData.last_name = userData.donorLastName || "";
								sendData.email = userData.donorEmail || "";
								sendData.phone = userData.donorPhone || "";
								sendData.address = userData.donorStreet || "";
								sendData.city = userData.donorCity || "";
								sendData.state = userData.donorRegion || "";
								sendData.postalCode = userData.donorPostCode || "";
								sendData.country = userData.donorCountry || "";

								var baseAmount = cleanCurrency(userData.baseAmount) || 0.0;
								var tipPercent = parseFloat(userData.giftExtraPercent) || 0.0;
								var tipAmount = cleanCurrency(baseAmount * tipPercent / 100);
								sendData.amount = baseAmount + tipAmount;
								sendData.baseAmount = baseAmount.toFixed(2); //mimic test
								sendData.tipAmount = tipAmount.toFixed(2); //mimic test
								sendData.tipPercent = "3.00"; //mimic test

								switch (userData.giftFrequency) {
									case "single":
										sendData.recurring = false;
										sendData.frequency = "o";
										break;
									case "monthly":
										sendData.recurring = true;
										sendData.frequency = "m";
										break;
									default:
										sendData.recurring = null;
										sendData.frequency = "";
								}

								sendData.currency = userData.giftCurrency || "";
								sendData.paymentType = userData.payMethod || "";

								if (sendData.paymentType == "card") {
									sendData.month = userData.payCardExpireMonth || "";
									sendData.year = userData.payCardExpireYear || "";
								}

								sendData.donateDouble = userData.isCompanyMatch === true;
								sendData.company = userData.companyMatchName || "";
								sendData.employeeEmail = userData.companyMatchEmail || "";

								console.log("buildTransactionSendData() sendData", sendData);
								return sendData;
							} catch (err) {
								console.log("buildTransactionSendData() caught error: ", err.message);
							}
							return null;
						};

						setInputFromUrl = function setInputFromUrl(urlKey, selector) {
							if (typeof urlKey == "undefined" || !urlKey) {
								console.log("setInputFromUrl() given invalid urlKey", urlKey);
								return;
							}
							if (typeof selector == "undefined" || !selector) {
								console.log("setInputFromUrl() given invalid selector", selector);
								return;
							}
							var urlValue = window.mwdspace.sharedUtils.getUrlParameter(urlKey);
							if (urlValue) {
								console.log("-- POPULATING", selector, "with", urlValue);
								var jqTarget = jqContainer.find("section.step input[name='" + selector + "'], section.step select[name='" + selector + "']").val(urlValue).trigger("change");
							}
						};

						prePopulateUserFields = function prePopulateUserFields() {
							setInputFromUrl("first", "donorFirstName");
							setInputFromUrl("last", "donorLastName");
							setInputFromUrl("email", "donorEmail");
							setInputFromUrl("phone", "donorPhone");
							setInputFromUrl("street", "donorStreet");
							setInputFromUrl("city", "donorCity");
							setInputFromUrl("postcode", "donorPostCode");
							setInputFromUrl("country", "donorCountry");
							setInputFromUrl("region", "donorRegion"); //must be after country

							setInputFromUrl("currency", "giftCurrency");
							setInputFromUrl("amount", "giftAmountFreeform");
						};

						updateFrequency = function updateFrequency() {
							// var frequency = jqContainer
							// 	.find("div.giftFrequencyContainer input[type='radio']:checked")
							// 	.val();
							// var thisItem;
							// for (var i = 0; i < window.mwdspace.validFrequencyList.length; i++) {
							// 	thisItem = window.mwdspace.validFrequencyList[i];
							// 	if (thisItem.code == frequency) {
							// 		userInputData.frequency = thisItem.code;
							// 		break;
							// 	}
							// }
							getGiftString();
						};

						filterFrequencyButtons = function filterFrequencyButtons(frequencyList) {
							if ((typeof frequencyList === "undefined" ? "undefined" : _typeof(frequencyList)) != "object" || frequencyList.length < 1) {
								console.warn("filterFrequencyButtons() ignoring invalid frequency list", frequencyList);
								return;
							}
							console.log("filterFrequencyButtons()", frequencyList);
							var visibleOptions = 0;
							var selectedOptionNowHidden = false;
							jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton input[type='radio']").each(function () {
								if (frequencyList.indexOf(jq(this).val()) >= 0) {
									// show this frequency
									jq(this).closest("div.fancyRadioButton").show();
									visibleOptions++;
								} else {
									// hide this frequency
									if (jq(this).prop("checked")) {
										selectedOptionNowHidden = true;
									}
									jq(this).closest("div.fancyRadioButton").hide();
								}
							});
							if (visibleOptions < 1) {
								// something is wrong, show all
								jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").show();
							} else if (visibleOptions == 1) {
								// hide all
								jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").hide();
							}
						};

						updatePayMethod = function updatePayMethod() {
							var payMethod = jqPayMethodSelect.val();
							var thisItem;
							for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
								thisItem = window.mwdspace.validPayMethodList[i];
								if (thisItem.code == payMethod) {
									// userInputData.payMethod = thisItem.code;
									userInputData.minimumAmount = thisItem.minimumAmount;
									if (thisItem.frequencies) {
										console.log("calling freq filter", thisItem);
										filterFrequencyButtons(thisItem.frequencies);
									}
									break;
								}
							}
						};

						updateCurrency = function updateCurrency() {
							// delete userInputData.currency;
							var currencyCode = jqCurrencySelect.val();
							var currencySymbol = " (?) ";
							var thisItem;
							for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
								thisItem = window.mwdspace.validCurrencyList[i];
								if (thisItem.code == currencyCode && thisItem.symbol) {
									currencySymbol = thisItem.symbol;
									// userInputData.currency = currencyCode;
									break;
								}
							}
							jqContainer.find("span.currencySymbol").html(currencySymbol);
							// getGiftString();
						};

						updateGiftAmount = function updateGiftAmount(input) {
							if (typeof input == "undefined") {
								var input = {};
							}
							try {
								userInputData.baseAmount = userInputData.baseAmount || 0;
								userInputData.extraPercent = userInputData.extraPercent || 0;
								if (typeof input.baseAmount != "undefined") {
									userInputData.baseAmount = parseFloat(input.baseAmount) || 0.0;
								}
								if (typeof input.extraPercent != "undefined") {
									userInputData.extraPercent = parseFloat(input.extraPercent) || 0.0;
								}
								var total = parseFloat(userInputData.baseAmount + userInputData.baseAmount * userInputData.extraPercent / 100);
								var displayAmount = total.toFixed(2).split(".");
								jqContainer.find("div.amountDisplay span.displayWholeAmount").text(displayAmount[0]);
								jqContainer.find("div.amountDisplay span.displaySubAmount").text("." + displayAmount[1]);

								window.mwdspace.sharedUtils.setSessionValue("baseAmount", userInputData.baseAmount);
								window.mwdspace.sharedUtils.setSessionValue("extraPercent", userInputData.extraPercent);
							} catch (err) {
								console.log("updateGiftAmount() caught error: ", err.message);
							}
						};

						processGiftAmountChange = function processGiftAmountChange(event) {
							var jqTarget = jq(event.target);
							// console.log(">>> processGiftAmountChange()", event.type, jqTarget.attr("name"));
							var newValue = cleanCurrency(jqTarget.val()) || 0.0;
							updateGiftAmount({ baseAmount: newValue });
							jqContainer.find("div.giftOption input").removeClass("selected");

							jqTarget.addClass("selected");
							if (event.type == "change") {
								jq("div.giftFormHeaderContainer").slideDown(666, function () {
									scrollAll(jqContainer);
								});
							}
							if (jqTarget.attr("name") == "giftAmountFreeform") {
								if (event.type == "change" || event.type == "blur") {
									var amount = cleanCurrency(newValue) || 0.0;
									var cleanedAmount = amount.toFixed(2);
									if (cleanedAmount != newValue) {
										jqTarget.val(cleanedAmount);
									}
									if (amount < window.mwdspace.userInputData.minimumAmount) {
										jqTarget.addClass("invalid");
									} else {
										jqTarget.removeClass("invalid");
									}
								}
								jqContainer.find("div.giftOption input[type='radio']").prop("checked", false);
							}
						};

						validateInputField = function validateInputField(jqThis, options) {
							// console.log("validateInputField()", jqThis, options);
							if (typeof options == "undefined") {
								var options = {};
							}

							var isValid = true;

							var valueString = "";
							if (typeof options.value != "undefined" && options.value !== null) {
								valueString = String(options.value);
							}

							switch (options.validationPattern) {
								case "email":
									isValid = valueString.match(/^[\w|\.|\-|\_]+@[\w|\.|\-|\_]+\.[a-z]{2,}$/i);
									break;
								// case "giftAmount":
								// 	var valueFloat = parseFloat(valueString);
								// 	isValid = !isNaN(valueFloat) || valueFloat > userInputData.minimumAmount;
								// 	break;
								default:
									var re = new RegExp(options.validationPattern, "i");
									isValid = valueString.match(re);
							}
							if (isValid) {
								jqThis.removeClass("invalid");
								return true;
							}
							jqThis.addClass("invalid");
							return false;
						};

						processChangeWatch = function processChangeWatch(jqThis, options) {
							// console.log("processChangeWatch()", jqThis, options);
							if (typeof options == "undefined") {
								var options = {};
							}

							var isValid = true;
							var validatedValue = null; // reset stored value when not valid

							options.validationPattern = jqThis.attr("data-validation");
							if (options.validationPattern) {
								isValid = validateInputField(jqThis, options);
							}

							if (isValid) {
								var elementType = jqThis.attr("type");
								if (elementType == "checkbox" || elementType == "radio") {
									if (jqThis.prop("checked")) {
										// set value only when boolean input checked
										validatedValue = options.value;
									}
								} else {
									validatedValue = options.value;
								}
							}
							userInputData[options.name] = validatedValue;

							window.mwdspace.sharedUtils.setSessionValue(options.name, options.value);
						};

						setupInputWatchers = function setupInputWatchers() {
							// CHANGE EVENT HANDLER
							jq(document).on("change blur", function (event) {
								var jqThis = jq(event.target);

								var name = jqThis.attr("name");
								var newValue = jqThis.val();
								var tag = String(jqThis.prop("tagName")).toLowerCase();

								if (jqThis.hasClass("changeWatch")) {
									processChangeWatch(jqThis, { name: name, value: newValue });
								}

								if ((name == "giftAmountFixed" || name == "giftAmountFreeform") && tag == "input") {
									processGiftAmountChange(event);
								} else if (name == "giftExtraPercent" && tag == "input") {
									var newPercent = 0;
									if (jqThis.prop("checked")) {
										newPercent = jqThis.val();
									}
									updateGiftAmount({ extraPercent: newPercent });
								} else if (name == "giftCurrency" && tag == "select") {
									updateCurrency();
								} else if (name == "payMethod" && tag == "select") {
									updatePayMethod();
								} else if (name == "giftFrequency" && tag == "input") {
									updateFrequency();
								}
							});

							// AMOUNT - also show header display
							jqContainer.find('div.giftOption input[name="giftAmountFreeform"]').on("focus keyup paste", function (event) {
								console.log("FREEFORM EVENT", event.type);
								processGiftAmountChange(event);
							});

							// CURRENCY
							jqCurrencySelect.trigger("change");

							// PAYMENT METHOD
							jqPayMethodSelect.trigger("change");

							// FREQUENCY
							jqContainer.trigger("change");

							// COMPANY MATCH - also show/hide company match input fields
							jqContainer.find("input#inputCompanyMatch").change(function () {
								if (jq(this).prop("checked")) {
									jqContainer.find("div#collapsableCompanyMatch").slideDown(666, function () {
										scrollAll(jqContainer);
									});
								} else {
									jqContainer.find("div#collapsableCompanyMatch").slideUp(333, function () {
										scrollAll(jqContainer);
									});
								}
							}).trigger("change");
						};

						showStepFeedback = function showStepFeedback(stepName, message, isError) {
							if (typeof stepName == "undefined") {
								var stepName = "";
							}
							if (typeof message == "undefined") {
								var message = "";
							}
							if (typeof isError == "undefined") {
								var isError = false;
							}
							if (!stepName) {
								console.log("showStepFeedback() given invalid input", stepName, message);
							}
							var jqFeedback = jq('section[data-step-name="giftAmount"] div.userFeedback p.message');
							if (message) {
								jqFeedback.html(message).fadeIn(444);
								if (isError) {
									jqFeedback.addClass("error");
								} else {
									jqFeedback.removeClass("error");
								}
							} else {
								jqFeedback.fadeOut(222, function () {
									jq(this).html("");
									jq(this).removeClass("error");
								});
							}
						};

						checkStepCard = function checkStepCard() {
							console.log(">>> checkStepCard()");
							var isValid = true;

							jqContainer.find("section.step[data-step-name='cardInfo'] .changeWatch").trigger("change");

							var jqCardNumberBox = jqContainer.find("div.payInfoContainer div#cardNumberTarget");
							if (userInputData.hasValidCardNumber === true) {
								jqCardNumberBox.removeClass("invalid");
							} else {
								isValid = false;
								jqCardNumberBox.addClass("invalid");
								console.warn("hasValidCardNumber is invalid", userInputData.hasValidCardNumber);
							}
							var jqCardCvvBox = jqContainer.find("div.payInfoContainer div#cardCvvTarget");
							if (userInputData.hasValidCardCvv === true) {
								jqCardCvvBox.removeClass("invalid");
							} else {
								isValid = false;
								jqCardCvvBox.addClass("invalid");
								console.warn("hasValidCardCvv is invalid", userInputData.hasValidCardCvv);
							}

							if (typeof userInputData.payCardExpireMonth != "string") {
								console.warn("payCardExpireMonth is invalid", userInputData.payCardExpireMonth);
								isValid = false;
							}
							if (typeof userInputData.payCardExpireYear != "string") {
								console.warn("payCardExpireYear is invalid", userInputData.payCardExpireYear);
								isValid = false;
							}

							return isValid;
						};

						checkStepDonor = function checkStepDonor() {
							console.log(">>> checkStepDonor()");
							var isValid = true;

							console.log("JQ MATCH #1", jqContainer.find("section.step[data-step-name='donorInfo'] .changeWatch").length);
							console.log("JQ MATCH #2", jqContainer.find("div.billingInfoContainer select[name='donorCountry']").length, jqContainer.find("div.billingInfoContainer select[name='donorCountry']").val());
							jqContainer.find("section.step[data-step-name='donorInfo'] .changeWatch").each(function () {
								if (jq(this).attr("name") != "donorCountry" && jq(this).css("display") != "none") {
									jq(this).trigger("change");
								}
							});
							userInputData.donorCountry = jqContainer.find("div.billingInfoContainer select[name='donorCountry']").val() || null;

							if (typeof userInputData.donorFirstName != "string") {
								console.warn("donorFirstName is invalid", userInputData.donorFirstName);
								isValid = false;
							}
							if (typeof userInputData.donorLastName != "string") {
								console.warn("donorLastName is invalid", userInputData.donorLastName);
								isValid = false;
							}
							if (typeof userInputData.donorEmail != "string") {
								console.warn("donorEmail is invalid", userInputData.donorEmail);
								isValid = false;
							}
							if (typeof userInputData.donorPhone != "undefined" && typeof userInputData.donorPhone != "string") {
								console.warn("donorPhone is invalid", userInputData.donorPhone);
								isValid = false;
							}
							if (typeof userInputData.donorStreet != "string") {
								console.warn("donorStreet is invalid", userInputData.donorStreet);
								isValid = false;
							}
							if (typeof userInputData.donorRegion != "string") {
								console.warn("donorRegion is invalid", userInputData.donorRegion);
								isValid = false;
							}
							if (typeof userInputData.donorPostCode != "string") {
								console.warn("donorPostCode is invalid", userInputData.donorPostCode);
								isValid = false;
							}
							if (typeof userInputData.donorCountry != "string") {
								console.warn("donorCountry is invalid", userInputData.donorCountry);
								isValid = false;
							}
							if (userInputData.companyMatch == "on") {
								if (typeof userInputData.donorMatchCompany != "string") {
									console.warn("donorMatchCompany is invalid", userInputData.donorMatchCompany);
									isValid = false;
								}
								if (typeof userInputData.donorMatchEmail != "string") {
									console.warn("donorMatchEmail is invalid", userInputData.donorMatchEmail);
									isValid = false;
								}
							}

							return isValid;
						};

						checkStepGift = function checkStepGift() {
							var isValid = true;

							if (typeof userInputData.baseAmount != "number" || userInputData.baseAmount < userInputData.minimumAmount) {
								console.warn("baseAmount is invalid", userInputData.baseAmount);
								isValid = false;
								var message = "Please enter a valid gift amount";
								try {
									message = thisWidget.labelOverride.gift.error.invalidAmount;
								} catch (err) {}
								showStepFeedback("giftAmount", message, true);
							} else {
								showStepFeedback("giftAmount");
							}
							if (typeof userInputData.giftCurrency != "string") {
								console.warn("Currency is invalid", userInputData.giftCurrency);
								isValid = false;
							}
							if (typeof userInputData.payMethod != "string") {
								console.warn("Pay Method is invalid", userInputData.payMethod);
								isValid = false;
							}
							if (typeof userInputData.giftFrequency != "string") {
								console.warn("Gift frequency is invalid", userInputData.giftFrequency);
								isValid = false;
							}

							return isValid;
						};

						showStep = function showStep(targetStepName) {
							mwdspace.currentStepName = "";
							targetStepName = window.mwdspace.sharedUtils.ensureString(targetStepName);
							if (!targetStepName) {
								targetStepName = window.mwdspace.sharedUtils.getSessionValue("savedStepName");
								if (!targetStepName) {
									targetStepName = "giftAmount";
								}
							}
							jqContainer.find("div.loadingDisplay").hide();
							var thisName;
							for (var i = 0; i < jqStepList.length; i++) {
								thisName = jqStepList[i].getAttribute("data-step-name");
								if (thisName == targetStepName) {
									switch (targetStepName) {
										case "donorInfo":
										case "cardInfo":
											jq("div.giftFormHeaderContainer").show();
											jqMainBackButton.fadeIn(888);
											break;
										default:
											jqMainBackButton.hide();
									}
									jq(jqStepList[i]).fadeIn(666, function () {
										scrollAll(jqContainer);
									});
									mwdspace.currentStepName = thisName;
									if (targetStepName == "confirmation") {
										window.mwdspace.sharedUtils.removeSessionValue("savedStepName");
									}
								} else {
									jq(jqStepList[i]).hide();
								}
							}
						};

						showPreviousStep = function showPreviousStep() {
							switch (mwdspace.currentStepName) {
								case "donorInfo":
									showStep("giftAmount");
									break;
								case "cardInfo":
									showStep("donorInfo");
									break;
							}
						};

						showNextStep = function showNextStep() {
							switch (mwdspace.currentStepName) {
								case "giftAmount":
									if (checkStepGift()) {
										showStep("donorInfo");
										return true;
									}
									break;
								case "donorInfo":
									if (checkStepDonor()) {
										if (window.mwdspace.userInputData.payMethod == "card") {
											showStep("cardInfo");
											return true;
										} else {
											return sendTransaction();
										}
									}
									break;
								case "cardInfo":
									if (checkStepCard()) {
										return tokenizeUserCard();
									}
									break;
							}
							return false;
						};

						thisWidget = this;


						if (typeof thisWidget.jquery !== "function") {
							console.error("jQuery (thisWidget.jquery) not found");
							exit();
						}
						jq = thisWidget.jquery;
						// console.log("MFA_Funraise_Widget using jQuery version", jq.fn.jquery);

						window.mwdspace.userInputData = {};
						window.mwdspace.transactionSendData = {};
						userInputData = window.mwdspace.userInputData;

						userInputData.minimumAmount = 5;
						thisWidget.defaultGiftList = [25, 50, 75, 100];

						// GLOBALS
						// Funraise environment key: ECDNSGhIR0fYQisIc1PHH7NX0pN
						// MWD test environment key: ODBm2idmYFT3pBge5qxRBjQaWH9
						paymentTokenizerId = thisWidget.options.paymentTokenizerId || "ECDNSGhIR0fYQisIc1PHH7NX0pN";

						// JQUERY OBJECTS

						jqContainer = jq("div.giftFormContainer");
						jqStepList = jqContainer.find("section.step");
						jqMainBackButton = jqContainer.find("button.goPreviousStep");
						jqPayMethodSelect = jqContainer.find('select[name="payMethod"]');
						jqRegionSelect = jqContainer.find('select[name="donorRegion"]');
						jqRegionInput = jqContainer.find('input[name="donorRegion"]');
						jqCurrencySelect = jqContainer.find('select[name="giftCurrency"]');
						jqCardNumberFeedback = jqContainer.find("div.payInfoContainer div.cardNumberFeedback");
						jqBitcoinTimeRemaining = jqContainer.find("div.bitcoinContainer span.bitcoinTimeRemaining");


						thisWidget.promises.labelOverrideLoad = thisWidget.prepareLabelOverride();

						buildCurrencySelect();
						buildPayMethodSelect();

						buildCountrySelect();
						buildCardExpireMonthSelect();
						buildCardExpireYearSelect();
						setupCompanyMatchSelect();

						setupInputWatchers();
						buildFrequencyButtons();
						prePopulateUserFields();

						// ensure text override file load (if any) is complete
						_context5.next = 80;
						return thisWidget.promises.labelOverrideLoad;

					case 80:
						if (thisWidget.labelOverride) {
							thisWidget.processLabelOverride(thisWidget.labelOverride);
						}
						showStep();

						setupSpreedly(); //async, but waiting not required

						setTimeout(function () {
							thisWidget.isLoaded = true;
						}, 999);

						// GENERAL CLICK HANDLER
						document.addEventListener("click", function (event) {
							// console.log("click", event.target.tagName, event.target.className);
							var clickTarget = jq(event.target).closest("button, .clickTarget");
							if (clickTarget) {
								if (clickTarget.hasClass("processDonation")) {
									console.log("You shoudn't be seeing this");
									// if (window.mwdspace.donationInProgress) {
									// 	alert("A donation is processing.");
									// } else {
									// 	window.mwdspace.transactionSendData = buildTransactionSendData();
									// 	if (
									// 		window.mwdspace.transactionLayer.validateSendData(
									// 			window.mwdspace.transactionSendData
									// 		)
									// 	) {
									// 		prepAndShowProcessingStep();
									// 		if (window.mwdspace.transactionSendData.payMethod == "card") {
									// 			tokenizeUserCard();
									// 		} else {
									// 			sendTransaction();
									// 		}
									// 	} else {
									// 		window.mwdspace.donationInProgress = false;
									// 		clickTarget.addClass("showInvalid");
									// 		setTimeout(function() {
									// 			clickTarget.removeClass("showInvalid");
									// 		}, 1500);
									// 	}
									// }
								} else if (clickTarget.hasClass("goNextStep")) {
									if (!showNextStep()) {
										clickTarget.addClass("showInvalid");
										setTimeout(function () {
											clickTarget.removeClass("showInvalid");
										}, 1500);
									}
								} else if (clickTarget.hasClass("goPreviousStep")) {
									showPreviousStep();
								} else if (clickTarget.hasClass("errorRestart")) {
									window.mwdspace.donationInProgress = false;
									showStep("giftAmount");
								}
							}
						});

						/* remove all but digits/dot before converting to float and rounding to 2 digits */


						/* remove all chars but digits/dot before convert to float */

					case 85:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function (url) {
		var thisWidget = this;
		return new Promise(function (resolve) {
			// console.log("linkExternalStylesheet() start:", url);
			var domStyleLink = document.createElement("link");
			thisWidget.targetElement.appendChild(domStyleLink);
			domStyleLink.rel = "stylesheet";
			domStyleLink.type = "text/css";
			var timeout = setTimeout(function () {
				console.log("linkExternalStylesheet() No load after 5s", url);
				resolve(false);
			}, 5000);
			domStyleLink.addEventListener("load", function (event) {
				clearTimeout(timeout);
				// console.log("STYLESHEET LOADED:", url);
				resolve(true);
			});
			domStyleLink.addEventListener("error", function (event) {
				console.error("linkExternalStylesheet() ERROR EVENT", url, event);
				resolve(false);
			});
			domStyleLink.addEventListener("abort", function (event) {
				console.warn("linkExternalStylesheet() ABORT EVENT", url, event);
				resolve(false);
			});
			domStyleLink.href = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function (url) {
		var thisWidget = this;
		return new Promise(function (resolve) {
			// console.log("linkExternalScript() start:", url);
			var domScript = document.createElement("script");
			thisWidget.targetElement.appendChild(domScript);
			var timeout = setTimeout(function () {
				console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			domScript.addEventListener("load", function (event) {
				clearTimeout(timeout);
				// console.log("SCRIPT LOADED:", url);
				resolve(true);
			});
			domScript.addEventListener("error", function (event) {
				clearTimeout(timeout);
				console.error("linkExternalScript() ERROR", url, event);
				resolve(false);
			});
			domScript.addEventListener("abort", function (event) {
				clearTimeout(timeout);
				console.warn("linkExternalScript() ABORTED", url, event);
				resolve(false);
			});
			domScript.src = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = function (input) {
		var thisWidget = this;
		return new Promise(function (resolve) {
			if (typeof input == "undefined") {
				console.warn("loadFile() given empty url");
				resolve(null);
			}
			if (typeof input != "string") {
				console.warn("loadFile() given invalid url type:", typeof input === "undefined" ? "undefined" : _typeof(input), input);
				resolve(null);
			}
			// console.log("loadFile() start:", input);
			var requestUrl = encodeURI(input);
			var xhr = new XMLHttpRequest();

			var timeout = setTimeout(function () {
				console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			xhr.addEventListener("load", function (event) {
				clearTimeout(timeout);
				// console.log("FILE LOADED:", input);
				var fileContents = event.target.responseText || event.target.response || null;
				resolve(fileContents);
			});
			xhr.addEventListener("error", function (event) {
				clearTimeout(timeout);
				console.error("loadFile() ERROR EVENT", requestUrl, event);
				resolve(null);
			});
			xhr.addEventListener("abort", function (event) {
				clearTimeout(timeout);
				console.warn("loadFile() ABORT EVENT", requestUrl, event);
				resolve(null);
			});

			xhr.open("get", requestUrl, true);
			xhr.send();
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.prepareLabelOverride = function () {
		var _this = this;

		var thisWidget = this;
		return new Promise(function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve) {
				var overrideFileContents, tempObject;
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								if (!thisWidget.options.labelOverride) {
									_context6.next = 18;
									break;
								}

								_context6.t0 = _typeof(thisWidget.options.labelOverride);
								_context6.next = _context6.t0 === "object" ? 4 : _context6.t0 === "string" ? 7 : 18;
								break;

							case 4:
								thisWidget.labelOverride = thisWidget.options.labelOverride;
								resolve(true);
								return _context6.abrupt("break", 18);

							case 7:
								_context6.prev = 7;
								_context6.next = 10;
								return thisWidget.loadFile(thisWidget.options.labelOverride);

							case 10:
								overrideFileContents = _context6.sent;

								if (overrideFileContents) {
									tempObject = window.mwdspace.sharedUtils.safeJsonParse(overrideFileContents);

									if (tempObject) {
										thisWidget.labelOverride = tempObject;
										resolve(true);
									} else {
										console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to parse text override data from file:", thisWidget.options.labelOverride);
									}
								} else {
									console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to load file for text override data:", thisWidget.options.labelOverride);
								}
								_context6.next = 17;
								break;

							case 14:
								_context6.prev = 14;
								_context6.t1 = _context6["catch"](7);

								console.log("Caught error: ", _context6.t1.message);

							case 17:
								return _context6.abrupt("break", 18);

							case 18:
								resolve(false);

							case 19:
							case "end":
								return _context6.stop();
						}
					}
				}, _callee6, _this, [[7, 14]]);
			}));

			return function (_x2) {
				return _ref8.apply(this, arguments);
			};
		}());
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.processLabelOverride = function (input, prefix) {
		var thisWidget = this;
		if ((typeof input === "undefined" ? "undefined" : _typeof(input)) != "object" || !input) {
			console.warn("MFA_Funraise_Widget.processLabelOverride() given invalid object", typeof input === "undefined" ? "undefined" : _typeof(input));
			return false;
		}
		if (typeof prefix == "undefined") {
			var prefix = "";
		}
		if (typeof prefix != "string") {
			console.warn("Ignoring invalid string prefix value", prefix);
			prefix = "";
		}
		if (prefix) {
			prefix = prefix + ".";
		}
		var thisSelector;
		for (var key in input) {
			thisSelector = prefix + key;
			if (typeof input[key] == "string") {
				thisWidget.setElementText(thisSelector, input[key]);
			} else {
				// recursive, to handle nested JSON objects
				thisWidget.processLabelOverride(input[key], thisSelector);
			}
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setElementText = function (labelId, value) {
		var thisWidget = this;
		if (typeof labelId == "undefined") {
			var labelId = "";
		}
		if (!labelId) {
			console.warn("setElementText() given empty labelId");
			return;
		}
		var selector = '[data-label-id="' + labelId + '"]';
		var elementList = document.querySelectorAll(selector);
		var thisTag;
		if (elementList) {
			for (var i = 0; i < elementList.length; i++) {
				thisTag = String(elementList[i].tagName).toLowerCase();
				switch (thisTag) {
					case "input":
						elementList[i].setAttribute("placeholder", value);
						break;
					case "label":
					case "span":
					case "div":
					case "option":
					case "h1":
					case "h2":
					case "h3":
					case "h4":
					case "h5":
					case "h6":
					case "p":
					case "li":
						elementList[i].innerHTML = value;
						break;
					default:
						console.warn("setElementText(): Ignoring tag", labelId, thisTag);
				}
			}
		} else {
			console.warn("REPLACE labelId not found", labelId);
		}
	};
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbXdkLWRvbmF0ZS13aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7QUFDQSxDQUFDLFlBQVc7QUFDWCxTQUFRLEdBQVIsQ0FBWSxnQ0FBWjs7QUFFQSxRQUFPLFFBQVAsR0FBa0IsT0FBTyxRQUFQLElBQW1CLEVBQXJDOztBQUVBLEtBQUksb0JBQW9CO0FBQ3ZCLFFBQU0sb0NBRGlCO0FBRXZCLFFBQU0sZ0NBRmlCO0FBR3ZCLGNBQVksc0NBSFc7QUFJdkIsUUFBTSxnQ0FKaUI7QUFLdkIsWUFBVSxvQ0FMYTtBQU12QixXQUFTO0FBTmMsRUFBeEI7O0FBU0EsUUFBTyxRQUFQLENBQWdCLG1CQUFoQixHQUFzQyxVQUFTLEtBQVQsRUFBZ0I7QUFDckQsTUFBSSxhQUFhLElBQWpCO0FBQ0EsTUFBSSxRQUFPLEtBQVAseUNBQU8sS0FBUCxNQUFnQixRQUFwQixFQUE4QjtBQUM3QixjQUFXLE9BQVgsR0FBcUIsS0FBckI7QUFDQSxHQUZELE1BRU87QUFDTixjQUFXLE9BQVgsR0FBcUIsRUFBckI7QUFDQTs7QUFFRCxhQUFXLFNBQVgsR0FBdUIsS0FBdkI7QUFDQSxhQUFXLFFBQVgsR0FBc0IsS0FBdEI7QUFDQSxhQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxhQUFXLGFBQVgsR0FDQyxvREFBb0QsV0FBVyxXQUEvRCxHQUE2RSxHQUQ5RTs7QUFHQSxhQUFXLGFBQVgsR0FBMkIsRUFBM0I7QUFDQSxhQUFXLFFBQVgsR0FBc0IsRUFBdEI7QUFDQSxhQUFXLFNBQVgsR0FBdUIsRUFBdkI7O0FBRUEsYUFBVyxhQUFYLEdBQTJCLFdBQVcsYUFBWCxHQUEyQiwyQkFBdEQ7QUFDQSxhQUFXLFdBQVgsR0FBeUIsV0FBVyxhQUFYLEdBQTJCLHdCQUFwRDs7QUFFQSxVQUFRLEdBQVIsQ0FBWSxxQ0FBWixFQUFtRCxXQUFXLFdBQTlEOztBQUVBLE1B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Q0E7QUFDRDtBQUNDLGNBQVEsSUFBUixDQUFhLGdDQUFiLEVBQStDLE9BQS9DLEVBQXdELE9BQXhEO0FBbkJGO0FBcUJBO0FBQ0QsR0F6QkQsTUF5Qk87QUFDTixXQUFRLElBQVIsQ0FBYSwyQkFBYixFQUEwQyxPQUExQztBQUNBO0FBQ0QsRUF4Q0Q7QUF5Q0EsQ0ExNUVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKFwibXdkLWRvbmF0ZS13aWRnZXQuanMgdjE4LjcuMTBkXCIpO1xuXG5cdHdpbmRvdy5td2RzcGFjZSA9IHdpbmRvdy5td2RzcGFjZSB8fCB7fTtcblxuXHR2YXIgcGF5TWV0aG9kSWNvbkh0bWwgPSB7XG5cdFx0Y2FyZDogJzxpIGNsYXNzPVwiZmFyIGZhLWNyZWRpdC1jYXJkXCI+PC9pPicsXG5cdFx0dmlzYTogJzxpIGNsYXNzPVwiZmFiIGZhLWNjLXZpc2FcIj48L2k+Jyxcblx0XHRtYXN0ZXJjYXJkOiAnPGkgY2xhc3M9XCJmYWIgZmEtY2MtbWFzdGVyY2FyZFwiPjwvaT4nLFxuXHRcdGFtZXg6ICc8aSBjbGFzcz1cImZhYiBmYS1jYy1hbWV4XCI+PC9pPicsXG5cdFx0ZGlzY292ZXI6ICc8aSBjbGFzcz1cImZhYiBmYS1jYy1kaXNjb3ZlclwiPjwvaT4nLFxuXHRcdGJpdGNvaW46ICc8aSBjbGFzcz1cImZhYiBmYS1iaXRjb2luXCI+PC9pPicsXG5cdH07XG5cblx0d2luZG93Lm13ZHNwYWNlLk1GQV9GdW5yYWlzZV9XaWRnZXQgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRpZiAodHlwZW9mIGlucHV0ID09IFwib2JqZWN0XCIpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucyA9IGlucHV0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMgPSB7fTtcblx0XHR9XG5cblx0XHR0aGlzV2lkZ2V0LmlzU3RhcnRlZCA9IGZhbHNlO1xuXHRcdHRoaXNXaWRnZXQuaXNMb2FkZWQgPSBmYWxzZTtcblx0XHR0aGlzV2lkZ2V0LmNvZGVWZXJzaW9uID0gXCIxLjAuMFwiO1xuXHRcdHRoaXNXaWRnZXQuYmFzZVdpZGdldFVybCA9XG5cdFx0XHRcImh0dHBzOi8vcXVpei5tZXJjeWZvcmFuaW1hbHMub3JnL2RvbmF0ZS13aWRnZXQvXCIgKyB0aGlzV2lkZ2V0LmNvZGVWZXJzaW9uICsgXCIvXCI7XG5cblx0XHR0aGlzV2lkZ2V0LnRhcmdldEVsZW1lbnQgPSB7fTtcblx0XHR0aGlzV2lkZ2V0LnByb21pc2VzID0ge307XG5cdFx0dGhpc1dpZGdldC5pbnRlcnZhbHMgPSB7fTtcblxuXHRcdHRoaXNXaWRnZXQubWFpblN0eWxlc1VybCA9IHRoaXNXaWRnZXQuYmFzZVdpZGdldFVybCArIFwiY3NzL213ZC1kb25hdGUtd2lkZ2V0LmNzc1wiO1xuXHRcdHRoaXNXaWRnZXQubWFpbkh0bWxVcmwgPSB0aGlzV2lkZ2V0LmJhc2VXaWRnZXRVcmwgKyBcIm13ZC1kb25hdGUtd2lkZ2V0Lmh0bWxcIjtcblxuXHRcdGNvbnNvbGUubG9nKFwid2luZG93Lm13ZHNwYWNlLk1GQV9GdW5yYWlzZV9XaWRnZXRcIiwgdGhpc1dpZGdldC5jb2RlVmVyc2lvbik7XG5cblx0XHRpZiAoIXRoaXNXaWRnZXQub3B0aW9ucy5sb2FkaW5nVGV4dCkge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmxvYWRpbmdUZXh0ID0gXCJPbmUgbW9tZW50Li4uXCI7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzV2lkZ2V0Lm9wdGlvbnMuZWxlbWVudCkge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiSW52YWxpZCBvcHRpb25zIC0gTm8gdGFyZ2V0IGVsZW1lbnQ6XCIsIHRoaXNXaWRnZXQub3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0dHlwZW9mIHRoaXNXaWRnZXQub3B0aW9ucy5vcmdhbml6YXRpb25JZCAhPSBcInN0cmluZ1wiIHx8XG5cdFx0XHQhdGhpc1dpZGdldC5vcHRpb25zLm9yZ2FuaXphdGlvbklkLnRyaW0oKVxuXHRcdCkge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLm9yZ2FuaXphdGlvbklkID0gXCJmY2I0ZDUzOC1jYTkyLTQyMTItODZjYy0wNmQ4YWM5MjljNGRcIjtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0dHlwZW9mIHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQgIT0gXCJudW1iZXJcIiB8fFxuXHRcdFx0dHlwZW9mIHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQgIT0gXCJzdHJpbmdcIiB8fFxuXHRcdFx0IXRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWRcblx0XHQpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQgPSAxMTk0OyAvLyA0Mzk0XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdCF0aGlzV2lkZ2V0Lm9wdGlvbnMubGlzdFNpbmdsZUdpZnRBc2tTdHJpbmcgfHxcblx0XHRcdCF0aGlzV2lkZ2V0Lm9wdGlvbnMubGlzdFNpbmdsZUdpZnRBc2tTdHJpbmcubGVuZ3RoXG5cdFx0KSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMubGlzdFNpbmdsZUdpZnRBc2tTdHJpbmcgPSBbMjUsIDUwLCA3NSwgMTAwXTtcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHQhdGhpc1dpZGdldC5vcHRpb25zLmxpc3RNb250aGx5R2lmdEFza1N0cmluZyB8fFxuXHRcdFx0IXRoaXNXaWRnZXQub3B0aW9ucy5saXN0TW9udGhseUdpZnRBc2tTdHJpbmcubGVuZ3RoXG5cdFx0KSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMubGlzdE1vbnRobHlHaWZ0QXNrU3RyaW5nID0gWzUsIDEwLCAxNSwgMjBdO1xuXHRcdH1cblxuXHRcdHdpbmRvdy5td2RzcGFjZS5wYWdlSWRQcmVmaXggPSBcImZvcm1cIiArIHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQ7XG5cblx0XHR2YXIgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzV2lkZ2V0Lm9wdGlvbnMuZWxlbWVudCk7XG5cdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlNwZWNpZmllZCB0YXJnZXQgZWxlbWVudCBub3QgZm91bmQ6XCIsIHRoaXNXaWRnZXQub3B0aW9ucy5lbGVtZW50KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dGhpc1dpZGdldC50YXJnZXRFbGVtZW50ID0gdGFyZ2V0WzBdO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5zdGFydCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRpZiAodGhpc1dpZGdldC5pc1N0YXJ0ZWQpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIndpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0IGFscmVhZHkgc3RhcnRlZFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpc1dpZGdldC5pc1N0YXJ0ZWQgPSB0cnVlO1xuXG5cdFx0dGhpc1dpZGdldC50YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHR2YXIgcHJvbWlzZUZvbnRTdHlsZXMgPSB0aGlzV2lkZ2V0LmxpbmtFeHRlcm5hbFN0eWxlc2hlZXQoXG5cdFx0XHRcImh0dHBzOi8vdXNlLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92NS4xLjAvY3NzL2FsbC5jc3NcIlxuXHRcdCk7XG5cdFx0dmFyIHN0eWxlc1VybCA9IHRoaXNXaWRnZXQub3B0aW9ucy5zdHlsZVNoZWV0cyB8fCB0aGlzV2lkZ2V0Lm1haW5TdHlsZXNVcmw7XG5cdFx0dmFyIHByb21pc2VNYWluU3R5bGVzID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTdHlsZXNoZWV0KHN0eWxlc1VybCk7XG5cdFx0dGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTdHlsZXNoZWV0KFxuXHRcdFx0XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zZWxlY3QyLzQuMC42LXJjLjAvY3NzL3NlbGVjdDIubWluLmNzc1wiXG5cdFx0KTtcblx0XHRhd2FpdCBQcm9taXNlLmFsbChbcHJvbWlzZUZvbnRTdHlsZXMsIHByb21pc2VNYWluU3R5bGVzXSk7XG5cblx0XHR2YXIgd2lkZ2V0SHRtbCwgc2hhcmVkVXRpbFJlc3VsdDtcblx0XHR2YXIgcHJvbWlzZU1haW5IdG1sID0gdGhpc1dpZGdldC5sb2FkRmlsZSh0aGlzV2lkZ2V0Lm1haW5IdG1sVXJsKTtcblx0XHR2YXIgcHJvbWlzZVNoYXJlZFV0aWxzID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTY3JpcHQoXG5cdFx0XHR0aGlzV2lkZ2V0LmJhc2VXaWRnZXRVcmwgKyBcImpzL3NoYXJlZC11dGlscy5qc1wiXG5cdFx0KTtcblx0XHRbd2lkZ2V0SHRtbCwgc2hhcmVkVXRpbFJlc3VsdF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG5cdFx0XHRwcm9taXNlTWFpbkh0bWwsXG5cdFx0XHRwcm9taXNlU2hhcmVkVXRpbHMsXG5cdFx0XSk7XG5cdFx0aWYgKCF3aWRnZXRIdG1sKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiTUZBX0Z1bnJhaXNlX1dpZGdldC5zdGFydCgpIC0gdW5hYmxlIHRvIGxvYWQgYmFzZSBIVE1MXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnRhaW5lci5pZCA9IFwibWZhRG9uYXRpb25XaWRnZXRDb250YWluZXJcIjtcblx0XHRjb250YWluZXIuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0dGhpc1dpZGdldC50YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gd2lkZ2V0SHRtbDtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRjb250YWluZXIuY2xhc3NOYW1lID0gXCJyZXZlYWxcIjtcblx0XHR9LCAxKTtcblxuXHRcdC8vIHN0YXJ0IFNwcmVlZGx5IGZpcnN0IGJjIGl0IGhhcyBzbG93IHJlc3BvbnNlIHRpbWVcblx0XHR0aGlzV2lkZ2V0LnByb21pc2VzLnNwcmVlZGx5SWZyYW1lU2NyaXB0ID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTY3JpcHQoXG5cdFx0XHRcImh0dHBzOi8vY29yZS5zcHJlZWRseS5jb20vaWZyYW1lL2lmcmFtZS12MS5taW4uanNcIlxuXHRcdCk7XG5cdFx0dmFyIGlzSnF1ZXJ5TG9hZGVkID0gYXdhaXQgdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTY3JpcHQoXG5cdFx0XHRcImh0dHBzOi8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0zLjMuMS5taW4uanNcIlxuXHRcdCk7XG5cblx0XHQvLyBzZWxlY3QyIHNob3VsZCBsb2FkIGFmdGVyIGpRdWVyeSBsb2FkIGNvbXBsZXRlXG5cdFx0dmFyIHByb21pc2VTcGVjaWFsU2VsZWN0Q29kZSA9IHRoaXNXaWRnZXQubGlua0V4dGVybmFsU2NyaXB0KFxuXHRcdFx0XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zZWxlY3QyLzQuMC42LXJjLjAvanMvc2VsZWN0Mi5taW4uanNcIlxuXHRcdCk7XG5cblx0XHR2YXIgcHJvbWlzZUJ1c2luZXNzTGF5ZXIgPSB0aGlzV2lkZ2V0LmxpbmtFeHRlcm5hbFNjcmlwdChcblx0XHRcdHRoaXNXaWRnZXQuYmFzZVdpZGdldFVybCArIFwianMvZ2lmdC11dGlsaXRpZXMuanNcIlxuXHRcdCk7XG5cdFx0dmFyIHByb21pc2VUcmFuc2FjdGlvbkxheWVyID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTY3JpcHQoXG5cdFx0XHR0aGlzV2lkZ2V0LmJhc2VXaWRnZXRVcmwgKyBcImpzL3RyYW5zYWN0aW9uLXN5c3RlbS1sYXllci5qc1wiXG5cdFx0KTtcblxuXHRcdGF3YWl0IFByb21pc2UuYWxsKFtcblx0XHRcdHByb21pc2VCdXNpbmVzc0xheWVyLFxuXHRcdFx0cHJvbWlzZVRyYW5zYWN0aW9uTGF5ZXIsXG5cdFx0XHRwcm9taXNlU3BlY2lhbFNlbGVjdENvZGUsXG5cdFx0XSk7XG5cdFx0aWYgKGlzSnF1ZXJ5TG9hZGVkKSB7XG5cdFx0XHR0aGlzV2lkZ2V0LmpxdWVyeSA9IGpRdWVyeS5ub0NvbmZsaWN0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNXaWRnZXQuanF1ZXJ5ID0gJCB8fCB7fTtcblx0XHR9XG5cblx0XHR0aGlzV2lkZ2V0LnJ1bigpO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5ydW4gPSBhc3luYyBmdW5jdGlvbigpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cblx0XHRpZiAodHlwZW9mIHRoaXNXaWRnZXQuanF1ZXJ5ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJqUXVlcnkgKHRoaXNXaWRnZXQuanF1ZXJ5KSBub3QgZm91bmRcIik7XG5cdFx0XHRleGl0KCk7XG5cdFx0fVxuXHRcdHZhciBqcSA9IHRoaXNXaWRnZXQuanF1ZXJ5O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiTUZBX0Z1bnJhaXNlX1dpZGdldCB1c2luZyBqUXVlcnkgdmVyc2lvblwiLCBqcS5mbi5qcXVlcnkpO1xuXG5cdFx0d2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEgPSB7fTtcblx0XHR3aW5kb3cubXdkc3BhY2UudHJhbnNhY3Rpb25TZW5kRGF0YSA9IHt9O1xuXHRcdHZhciB1c2VySW5wdXREYXRhID0gd2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGE7XG5cdFx0dXNlcklucHV0RGF0YS5taW5pbXVtQW1vdW50ID0gNTtcblx0XHR0aGlzV2lkZ2V0LmRlZmF1bHRHaWZ0TGlzdCA9IFsyNSwgNTAsIDc1LCAxMDBdO1xuXG5cdFx0Ly8gR0xPQkFMU1xuXHRcdC8vIEZ1bnJhaXNlIGVudmlyb25tZW50IGtleTogRUNETlNHaElSMGZZUWlzSWMxUEhIN05YMHBOXG5cdFx0Ly8gTVdEIHRlc3QgZW52aXJvbm1lbnQga2V5OiBPREJtMmlkbVlGVDNwQmdlNXF4UkJqUWFXSDlcblx0XHR2YXIgcGF5bWVudFRva2VuaXplcklkID1cblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5wYXltZW50VG9rZW5pemVySWQgfHwgXCJFQ0ROU0doSVIwZllRaXNJYzFQSEg3TlgwcE5cIjtcblxuXHRcdC8vIEpRVUVSWSBPQkpFQ1RTXG5cdFx0dmFyIGpxQ29udGFpbmVyID0ganEoXCJkaXYuZ2lmdEZvcm1Db250YWluZXJcIik7XG5cdFx0dmFyIGpxU3RlcExpc3QgPSBqcUNvbnRhaW5lci5maW5kKFwic2VjdGlvbi5zdGVwXCIpO1xuXHRcdHZhciBqcU1haW5CYWNrQnV0dG9uID0ganFDb250YWluZXIuZmluZChcImJ1dHRvbi5nb1ByZXZpb3VzU3RlcFwiKTtcblx0XHR2YXIganFQYXlNZXRob2RTZWxlY3QgPSBqcUNvbnRhaW5lci5maW5kKCdzZWxlY3RbbmFtZT1cInBheU1ldGhvZFwiXScpO1xuXHRcdHZhciBqcVJlZ2lvblNlbGVjdCA9IGpxQ29udGFpbmVyLmZpbmQoJ3NlbGVjdFtuYW1lPVwiZG9ub3JSZWdpb25cIl0nKTtcblx0XHR2YXIganFSZWdpb25JbnB1dCA9IGpxQ29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9XCJkb25vclJlZ2lvblwiXScpO1xuXHRcdHZhciBqcUN1cnJlbmN5U2VsZWN0ID0ganFDb250YWluZXIuZmluZCgnc2VsZWN0W25hbWU9XCJnaWZ0Q3VycmVuY3lcIl0nKTtcblx0XHR2YXIganFDYXJkTnVtYmVyRmVlZGJhY2sgPSBqcUNvbnRhaW5lci5maW5kKFxuXHRcdFx0XCJkaXYucGF5SW5mb0NvbnRhaW5lciBkaXYuY2FyZE51bWJlckZlZWRiYWNrXCJcblx0XHQpO1xuXHRcdHZhciBqcUJpdGNvaW5UaW1lUmVtYWluaW5nID0ganFDb250YWluZXIuZmluZChcblx0XHRcdFwiZGl2LmJpdGNvaW5Db250YWluZXIgc3Bhbi5iaXRjb2luVGltZVJlbWFpbmluZ1wiXG5cdFx0KTtcblxuXHRcdHRoaXNXaWRnZXQucHJvbWlzZXMubGFiZWxPdmVycmlkZUxvYWQgPSB0aGlzV2lkZ2V0LnByZXBhcmVMYWJlbE92ZXJyaWRlKCk7XG5cblx0XHRidWlsZEN1cnJlbmN5U2VsZWN0KCk7XG5cdFx0YnVpbGRQYXlNZXRob2RTZWxlY3QoKTtcblxuXHRcdGJ1aWxkQ291bnRyeVNlbGVjdCgpO1xuXHRcdGJ1aWxkQ2FyZEV4cGlyZU1vbnRoU2VsZWN0KCk7XG5cdFx0YnVpbGRDYXJkRXhwaXJlWWVhclNlbGVjdCgpO1xuXHRcdHNldHVwQ29tcGFueU1hdGNoU2VsZWN0KCk7XG5cblx0XHRzZXR1cElucHV0V2F0Y2hlcnMoKTtcblx0XHRidWlsZEZyZXF1ZW5jeUJ1dHRvbnMoKTtcblx0XHRwcmVQb3B1bGF0ZVVzZXJGaWVsZHMoKTtcblxuXHRcdC8vIGVuc3VyZSB0ZXh0IG92ZXJyaWRlIGZpbGUgbG9hZCAoaWYgYW55KSBpcyBjb21wbGV0ZVxuXHRcdGF3YWl0IHRoaXNXaWRnZXQucHJvbWlzZXMubGFiZWxPdmVycmlkZUxvYWQ7XG5cdFx0aWYgKHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZSkge1xuXHRcdFx0dGhpc1dpZGdldC5wcm9jZXNzTGFiZWxPdmVycmlkZSh0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUpO1xuXHRcdH1cblx0XHRzaG93U3RlcCgpO1xuXG5cdFx0c2V0dXBTcHJlZWRseSgpOyAvL2FzeW5jLCBidXQgd2FpdGluZyBub3QgcmVxdWlyZWRcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzV2lkZ2V0LmlzTG9hZGVkID0gdHJ1ZTtcblx0XHR9LCA5OTkpO1xuXG5cdFx0Ly8gR0VORVJBTCBDTElDSyBIQU5ETEVSXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImNsaWNrXCIsIGV2ZW50LnRhcmdldC50YWdOYW1lLCBldmVudC50YXJnZXQuY2xhc3NOYW1lKTtcblx0XHRcdHZhciBjbGlja1RhcmdldCA9IGpxKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcImJ1dHRvbiwgLmNsaWNrVGFyZ2V0XCIpO1xuXHRcdFx0aWYgKGNsaWNrVGFyZ2V0KSB7XG5cdFx0XHRcdGlmIChjbGlja1RhcmdldC5oYXNDbGFzcyhcInByb2Nlc3NEb25hdGlvblwiKSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiWW91IHNob3Vkbid0IGJlIHNlZWluZyB0aGlzXCIpO1xuXHRcdFx0XHRcdC8vIGlmICh3aW5kb3cubXdkc3BhY2UuZG9uYXRpb25JblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0Ly8gXHRhbGVydChcIkEgZG9uYXRpb24gaXMgcHJvY2Vzc2luZy5cIik7XG5cdFx0XHRcdFx0Ly8gfSBlbHNlIHtcblx0XHRcdFx0XHQvLyBcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhID0gYnVpbGRUcmFuc2FjdGlvblNlbmREYXRhKCk7XG5cdFx0XHRcdFx0Ly8gXHRpZiAoXG5cdFx0XHRcdFx0Ly8gXHRcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvbkxheWVyLnZhbGlkYXRlU2VuZERhdGEoXG5cdFx0XHRcdFx0Ly8gXHRcdFx0d2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGFcblx0XHRcdFx0XHQvLyBcdFx0KVxuXHRcdFx0XHRcdC8vIFx0KSB7XG5cdFx0XHRcdFx0Ly8gXHRcdHByZXBBbmRTaG93UHJvY2Vzc2luZ1N0ZXAoKTtcblx0XHRcdFx0XHQvLyBcdFx0aWYgKHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhLnBheU1ldGhvZCA9PSBcImNhcmRcIikge1xuXHRcdFx0XHRcdC8vIFx0XHRcdHRva2VuaXplVXNlckNhcmQoKTtcblx0XHRcdFx0XHQvLyBcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBcdFx0XHRzZW5kVHJhbnNhY3Rpb24oKTtcblx0XHRcdFx0XHQvLyBcdFx0fVxuXHRcdFx0XHRcdC8vIFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBcdFx0d2luZG93Lm13ZHNwYWNlLmRvbmF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHRcdFx0XHRcdC8vIFx0XHRjbGlja1RhcmdldC5hZGRDbGFzcyhcInNob3dJbnZhbGlkXCIpO1xuXHRcdFx0XHRcdC8vIFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIFx0XHRcdGNsaWNrVGFyZ2V0LnJlbW92ZUNsYXNzKFwic2hvd0ludmFsaWRcIik7XG5cdFx0XHRcdFx0Ly8gXHRcdH0sIDE1MDApO1xuXHRcdFx0XHRcdC8vIFx0fVxuXHRcdFx0XHRcdC8vIH1cblx0XHRcdFx0fSBlbHNlIGlmIChjbGlja1RhcmdldC5oYXNDbGFzcyhcImdvTmV4dFN0ZXBcIikpIHtcblx0XHRcdFx0XHRpZiAoIXNob3dOZXh0U3RlcCgpKSB7XG5cdFx0XHRcdFx0XHRjbGlja1RhcmdldC5hZGRDbGFzcyhcInNob3dJbnZhbGlkXCIpO1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Y2xpY2tUYXJnZXQucmVtb3ZlQ2xhc3MoXCJzaG93SW52YWxpZFwiKTtcblx0XHRcdFx0XHRcdH0sIDE1MDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChjbGlja1RhcmdldC5oYXNDbGFzcyhcImdvUHJldmlvdXNTdGVwXCIpKSB7XG5cdFx0XHRcdFx0c2hvd1ByZXZpb3VzU3RlcCgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGNsaWNrVGFyZ2V0Lmhhc0NsYXNzKFwiZXJyb3JSZXN0YXJ0XCIpKSB7XG5cdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLmRvbmF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHRcdFx0XHRcdHNob3dTdGVwKFwiZ2lmdEFtb3VudFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gc2hvd05leHRTdGVwKCkge1xuXHRcdFx0c3dpdGNoIChtd2RzcGFjZS5jdXJyZW50U3RlcE5hbWUpIHtcblx0XHRcdFx0Y2FzZSBcImdpZnRBbW91bnRcIjpcblx0XHRcdFx0XHRpZiAoY2hlY2tTdGVwR2lmdCgpKSB7XG5cdFx0XHRcdFx0XHRzaG93U3RlcChcImRvbm9ySW5mb1wiKTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRvbm9ySW5mb1wiOlxuXHRcdFx0XHRcdGlmIChjaGVja1N0ZXBEb25vcigpKSB7XG5cdFx0XHRcdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEucGF5TWV0aG9kID09IFwiY2FyZFwiKSB7XG5cdFx0XHRcdFx0XHRcdHNob3dTdGVwKFwiY2FyZEluZm9cIik7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlbmRUcmFuc2FjdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImNhcmRJbmZvXCI6XG5cdFx0XHRcdFx0aWYgKGNoZWNrU3RlcENhcmQoKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRva2VuaXplVXNlckNhcmQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2hvd1ByZXZpb3VzU3RlcCgpIHtcblx0XHRcdHN3aXRjaCAobXdkc3BhY2UuY3VycmVudFN0ZXBOYW1lKSB7XG5cdFx0XHRcdGNhc2UgXCJkb25vckluZm9cIjpcblx0XHRcdFx0XHRzaG93U3RlcChcImdpZnRBbW91bnRcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJjYXJkSW5mb1wiOlxuXHRcdFx0XHRcdHNob3dTdGVwKFwiZG9ub3JJbmZvXCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNob3dTdGVwKHRhcmdldFN0ZXBOYW1lKSB7XG5cdFx0XHRtd2RzcGFjZS5jdXJyZW50U3RlcE5hbWUgPSBcIlwiO1xuXHRcdFx0dGFyZ2V0U3RlcE5hbWUgPSB3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuZW5zdXJlU3RyaW5nKHRhcmdldFN0ZXBOYW1lKTtcblx0XHRcdGlmICghdGFyZ2V0U3RlcE5hbWUpIHtcblx0XHRcdFx0dGFyZ2V0U3RlcE5hbWUgPSB3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuZ2V0U2Vzc2lvblZhbHVlKFwic2F2ZWRTdGVwTmFtZVwiKTtcblx0XHRcdFx0aWYgKCF0YXJnZXRTdGVwTmFtZSkge1xuXHRcdFx0XHRcdHRhcmdldFN0ZXBOYW1lID0gXCJnaWZ0QW1vdW50XCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYubG9hZGluZ0Rpc3BsYXlcIikuaGlkZSgpO1xuXHRcdFx0dmFyIHRoaXNOYW1lO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqcVN0ZXBMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXNOYW1lID0ganFTdGVwTGlzdFtpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN0ZXAtbmFtZVwiKTtcblx0XHRcdFx0aWYgKHRoaXNOYW1lID09IHRhcmdldFN0ZXBOYW1lKSB7XG5cdFx0XHRcdFx0c3dpdGNoICh0YXJnZXRTdGVwTmFtZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcImRvbm9ySW5mb1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImNhcmRJbmZvXCI6XG5cdFx0XHRcdFx0XHRcdGpxKFwiZGl2LmdpZnRGb3JtSGVhZGVyQ29udGFpbmVyXCIpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0anFNYWluQmFja0J1dHRvbi5mYWRlSW4oODg4KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRqcU1haW5CYWNrQnV0dG9uLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0anEoanFTdGVwTGlzdFtpXSkuZmFkZUluKDY2NiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdG13ZHNwYWNlLmN1cnJlbnRTdGVwTmFtZSA9IHRoaXNOYW1lO1xuXHRcdFx0XHRcdGlmICh0YXJnZXRTdGVwTmFtZSA9PSBcImNvbmZpcm1hdGlvblwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMucmVtb3ZlU2Vzc2lvblZhbHVlKFwic2F2ZWRTdGVwTmFtZVwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0anEoanFTdGVwTGlzdFtpXSkuaGlkZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY2hlY2tTdGVwR2lmdCgpIHtcblx0XHRcdHZhciBpc1ZhbGlkID0gdHJ1ZTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgdXNlcklucHV0RGF0YS5iYXNlQW1vdW50ICE9IFwibnVtYmVyXCIgfHxcblx0XHRcdFx0dXNlcklucHV0RGF0YS5iYXNlQW1vdW50IDwgdXNlcklucHV0RGF0YS5taW5pbXVtQW1vdW50XG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiYmFzZUFtb3VudCBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0dmFyIG1lc3NhZ2UgPSBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGdpZnQgYW1vdW50XCI7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0bWVzc2FnZSA9IHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5naWZ0LmVycm9yLmludmFsaWRBbW91bnQ7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0c2hvd1N0ZXBGZWVkYmFjayhcImdpZnRBbW91bnRcIiwgbWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzaG93U3RlcEZlZWRiYWNrKFwiZ2lmdEFtb3VudFwiKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5naWZ0Q3VycmVuY3kgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJDdXJyZW5jeSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZ2lmdEN1cnJlbmN5KTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLnBheU1ldGhvZCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIlBheSBNZXRob2QgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLnBheU1ldGhvZCk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5naWZ0RnJlcXVlbmN5ICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiR2lmdCBmcmVxdWVuY3kgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmdpZnRGcmVxdWVuY3kpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc1ZhbGlkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrU3RlcERvbm9yKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCI+Pj4gY2hlY2tTdGVwRG9ub3IoKVwiKTtcblx0XHRcdHZhciBpc1ZhbGlkID0gdHJ1ZTtcblxuXHRcdFx0Y29uc29sZS5sb2coXG5cdFx0XHRcdFwiSlEgTUFUQ0ggIzFcIixcblx0XHRcdFx0anFDb250YWluZXIuZmluZChcInNlY3Rpb24uc3RlcFtkYXRhLXN0ZXAtbmFtZT0nZG9ub3JJbmZvJ10gLmNoYW5nZVdhdGNoXCIpLmxlbmd0aFxuXHRcdFx0KTtcblx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcIkpRIE1BVENIICMyXCIsXG5cdFx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuYmlsbGluZ0luZm9Db250YWluZXIgc2VsZWN0W25hbWU9J2Rvbm9yQ291bnRyeSddXCIpLmxlbmd0aCxcblx0XHRcdFx0anFDb250YWluZXIuZmluZChcImRpdi5iaWxsaW5nSW5mb0NvbnRhaW5lciBzZWxlY3RbbmFtZT0nZG9ub3JDb3VudHJ5J11cIikudmFsKClcblx0XHRcdCk7XG5cdFx0XHRqcUNvbnRhaW5lclxuXHRcdFx0XHQuZmluZChcInNlY3Rpb24uc3RlcFtkYXRhLXN0ZXAtbmFtZT0nZG9ub3JJbmZvJ10gLmNoYW5nZVdhdGNoXCIpXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdGpxKHRoaXMpLmF0dHIoXCJuYW1lXCIpICE9IFwiZG9ub3JDb3VudHJ5XCIgJiZcblx0XHRcdFx0XHRcdGpxKHRoaXMpLmNzcyhcImRpc3BsYXlcIikgIT0gXCJub25lXCJcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGpxKHRoaXMpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdHVzZXJJbnB1dERhdGEuZG9ub3JDb3VudHJ5ID1cblx0XHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0XHQuZmluZChcImRpdi5iaWxsaW5nSW5mb0NvbnRhaW5lciBzZWxlY3RbbmFtZT0nZG9ub3JDb3VudHJ5J11cIilcblx0XHRcdFx0XHQudmFsKCkgfHwgbnVsbDtcblxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JGaXJzdE5hbWUgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yTGFzdE5hbWUgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJkb25vckxhc3ROYW1lIGlzIGludmFsaWRcIiwgdXNlcklucHV0RGF0YS5kb25vckxhc3ROYW1lKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yRW1haWwgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJkb25vckVtYWlsIGlzIGludmFsaWRcIiwgdXNlcklucHV0RGF0YS5kb25vckVtYWlsKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vclBob25lICE9IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0dHlwZW9mIHVzZXJJbnB1dERhdGEuZG9ub3JQaG9uZSAhPSBcInN0cmluZ1wiXG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JQaG9uZSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZG9ub3JQaG9uZSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vclN0cmVldCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcImRvbm9yU3RyZWV0IGlzIGludmFsaWRcIiwgdXNlcklucHV0RGF0YS5kb25vclN0cmVldCk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vclJlZ2lvbiAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcImRvbm9yUmVnaW9uIGlzIGludmFsaWRcIiwgdXNlcklucHV0RGF0YS5kb25vclJlZ2lvbik7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vclBvc3RDb2RlICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JQb3N0Q29kZSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZG9ub3JQb3N0Q29kZSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vckNvdW50cnkgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJkb25vckNvdW50cnkgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmRvbm9yQ291bnRyeSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh1c2VySW5wdXREYXRhLmNvbXBhbnlNYXRjaCA9PSBcIm9uXCIpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yTWF0Y2hDb21wYW55ICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcImRvbm9yTWF0Y2hDb21wYW55IGlzIGludmFsaWRcIixcblx0XHRcdFx0XHRcdHVzZXJJbnB1dERhdGEuZG9ub3JNYXRjaENvbXBhbnlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mIHVzZXJJbnB1dERhdGEuZG9ub3JNYXRjaEVtYWlsICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJkb25vck1hdGNoRW1haWwgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmRvbm9yTWF0Y2hFbWFpbCk7XG5cdFx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc1ZhbGlkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrU3RlcENhcmQoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIj4+PiBjaGVja1N0ZXBDYXJkKClcIik7XG5cdFx0XHR2YXIgaXNWYWxpZCA9IHRydWU7XG5cblx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdC5maW5kKFwic2VjdGlvbi5zdGVwW2RhdGEtc3RlcC1uYW1lPSdjYXJkSW5mbyddIC5jaGFuZ2VXYXRjaFwiKVxuXHRcdFx0XHQudHJpZ2dlcihcImNoYW5nZVwiKTtcblxuXHRcdFx0dmFyIGpxQ2FyZE51bWJlckJveCA9IGpxQ29udGFpbmVyLmZpbmQoXCJkaXYucGF5SW5mb0NvbnRhaW5lciBkaXYjY2FyZE51bWJlclRhcmdldFwiKTtcblx0XHRcdGlmICh1c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZE51bWJlciA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRqcUNhcmROdW1iZXJCb3gucmVtb3ZlQ2xhc3MoXCJpbnZhbGlkXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0XHRqcUNhcmROdW1iZXJCb3guYWRkQ2xhc3MoXCJpbnZhbGlkXCIpO1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJoYXNWYWxpZENhcmROdW1iZXIgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZE51bWJlcik7XG5cdFx0XHR9XG5cdFx0XHR2YXIganFDYXJkQ3Z2Qm94ID0ganFDb250YWluZXIuZmluZChcImRpdi5wYXlJbmZvQ29udGFpbmVyIGRpdiNjYXJkQ3Z2VGFyZ2V0XCIpO1xuXHRcdFx0aWYgKHVzZXJJbnB1dERhdGEuaGFzVmFsaWRDYXJkQ3Z2ID09PSB0cnVlKSB7XG5cdFx0XHRcdGpxQ2FyZEN2dkJveC5yZW1vdmVDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdGpxQ2FyZEN2dkJveC5hZGRDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcImhhc1ZhbGlkQ2FyZEN2diBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuaGFzVmFsaWRDYXJkQ3Z2KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVNb250aCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcInBheUNhcmRFeHBpcmVNb250aCBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEucGF5Q2FyZEV4cGlyZU1vbnRoKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVZZWFyICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwicGF5Q2FyZEV4cGlyZVllYXIgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVZZWFyKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNWYWxpZDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzaG93U3RlcEZlZWRiYWNrKHN0ZXBOYW1lLCBtZXNzYWdlLCBpc0Vycm9yKSB7XG5cdFx0XHRpZiAodHlwZW9mIHN0ZXBOYW1lID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIHN0ZXBOYW1lID0gXCJcIjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgbWVzc2FnZSA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gXCJcIjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgaXNFcnJvciA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBpc0Vycm9yID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXN0ZXBOYW1lKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwic2hvd1N0ZXBGZWVkYmFjaygpIGdpdmVuIGludmFsaWQgaW5wdXRcIiwgc3RlcE5hbWUsIG1lc3NhZ2UpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGpxRmVlZGJhY2sgPSBqcShcblx0XHRcdFx0J3NlY3Rpb25bZGF0YS1zdGVwLW5hbWU9XCJnaWZ0QW1vdW50XCJdIGRpdi51c2VyRmVlZGJhY2sgcC5tZXNzYWdlJ1xuXHRcdFx0KTtcblx0XHRcdGlmIChtZXNzYWdlKSB7XG5cdFx0XHRcdGpxRmVlZGJhY2suaHRtbChtZXNzYWdlKS5mYWRlSW4oNDQ0KTtcblx0XHRcdFx0aWYgKGlzRXJyb3IpIHtcblx0XHRcdFx0XHRqcUZlZWRiYWNrLmFkZENsYXNzKFwiZXJyb3JcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0anFGZWVkYmFjay5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqcUZlZWRiYWNrLmZhZGVPdXQoMjIyLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRqcSh0aGlzKS5odG1sKFwiXCIpO1xuXHRcdFx0XHRcdGpxKHRoaXMpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldHVwSW5wdXRXYXRjaGVycygpIHtcblx0XHRcdC8vIENIQU5HRSBFVkVOVCBIQU5ETEVSXG5cdFx0XHRqcShkb2N1bWVudCkub24oXCJjaGFuZ2UgYmx1clwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHR2YXIganFUaGlzID0ganEoZXZlbnQudGFyZ2V0KTtcblxuXHRcdFx0XHR2YXIgbmFtZSA9IGpxVGhpcy5hdHRyKFwibmFtZVwiKTtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0ganFUaGlzLnZhbCgpO1xuXHRcdFx0XHR2YXIgdGFnID0gU3RyaW5nKGpxVGhpcy5wcm9wKFwidGFnTmFtZVwiKSkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0XHRpZiAoanFUaGlzLmhhc0NsYXNzKFwiY2hhbmdlV2F0Y2hcIikpIHtcblx0XHRcdFx0XHRwcm9jZXNzQ2hhbmdlV2F0Y2goanFUaGlzLCB7IG5hbWU6IG5hbWUsIHZhbHVlOiBuZXdWYWx1ZSB9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQobmFtZSA9PSBcImdpZnRBbW91bnRGaXhlZFwiIHx8IG5hbWUgPT0gXCJnaWZ0QW1vdW50RnJlZWZvcm1cIikgJiZcblx0XHRcdFx0XHR0YWcgPT0gXCJpbnB1dFwiXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHByb2Nlc3NHaWZ0QW1vdW50Q2hhbmdlKGV2ZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmIChuYW1lID09IFwiZ2lmdEV4dHJhUGVyY2VudFwiICYmIHRhZyA9PSBcImlucHV0XCIpIHtcblx0XHRcdFx0XHR2YXIgbmV3UGVyY2VudCA9IDA7XG5cdFx0XHRcdFx0aWYgKGpxVGhpcy5wcm9wKFwiY2hlY2tlZFwiKSkge1xuXHRcdFx0XHRcdFx0bmV3UGVyY2VudCA9IGpxVGhpcy52YWwoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dXBkYXRlR2lmdEFtb3VudCh7IGV4dHJhUGVyY2VudDogbmV3UGVyY2VudCB9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChuYW1lID09IFwiZ2lmdEN1cnJlbmN5XCIgJiYgdGFnID09IFwic2VsZWN0XCIpIHtcblx0XHRcdFx0XHR1cGRhdGVDdXJyZW5jeSgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG5hbWUgPT0gXCJwYXlNZXRob2RcIiAmJiB0YWcgPT0gXCJzZWxlY3RcIikge1xuXHRcdFx0XHRcdHVwZGF0ZVBheU1ldGhvZCgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG5hbWUgPT0gXCJnaWZ0RnJlcXVlbmN5XCIgJiYgdGFnID09IFwiaW5wdXRcIikge1xuXHRcdFx0XHRcdHVwZGF0ZUZyZXF1ZW5jeSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQU1PVU5UIC0gYWxzbyBzaG93IGhlYWRlciBkaXNwbGF5XG5cdFx0XHRqcUNvbnRhaW5lclxuXHRcdFx0XHQuZmluZCgnZGl2LmdpZnRPcHRpb24gaW5wdXRbbmFtZT1cImdpZnRBbW91bnRGcmVlZm9ybVwiXScpXG5cdFx0XHRcdC5vbihcImZvY3VzIGtleXVwIHBhc3RlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJGUkVFRk9STSBFVkVOVFwiLCBldmVudC50eXBlKTtcblx0XHRcdFx0XHRwcm9jZXNzR2lmdEFtb3VudENoYW5nZShldmVudCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHQvLyBDVVJSRU5DWVxuXHRcdFx0anFDdXJyZW5jeVNlbGVjdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXG5cdFx0XHQvLyBQQVlNRU5UIE1FVEhPRFxuXHRcdFx0anFQYXlNZXRob2RTZWxlY3QudHJpZ2dlcihcImNoYW5nZVwiKTtcblxuXHRcdFx0Ly8gRlJFUVVFTkNZXG5cdFx0XHRqcUNvbnRhaW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXG5cdFx0XHQvLyBDT01QQU5ZIE1BVENIIC0gYWxzbyBzaG93L2hpZGUgY29tcGFueSBtYXRjaCBpbnB1dCBmaWVsZHNcblx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdC5maW5kKFwiaW5wdXQjaW5wdXRDb21wYW55TWF0Y2hcIilcblx0XHRcdFx0LmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoanEodGhpcykucHJvcChcImNoZWNrZWRcIikpIHtcblx0XHRcdFx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdFx0XHRcdC5maW5kKFwiZGl2I2NvbGxhcHNhYmxlQ29tcGFueU1hdGNoXCIpXG5cdFx0XHRcdFx0XHRcdC5zbGlkZURvd24oNjY2LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0XHRcdFx0LmZpbmQoXCJkaXYjY29sbGFwc2FibGVDb21wYW55TWF0Y2hcIilcblx0XHRcdFx0XHRcdFx0LnNsaWRlVXAoMzMzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHByb2Nlc3NDaGFuZ2VXYXRjaChqcVRoaXMsIG9wdGlvbnMpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwicHJvY2Vzc0NoYW5nZVdhdGNoKClcIiwganFUaGlzLCBvcHRpb25zKTtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpc1ZhbGlkID0gdHJ1ZTtcblx0XHRcdHZhciB2YWxpZGF0ZWRWYWx1ZSA9IG51bGw7IC8vIHJlc2V0IHN0b3JlZCB2YWx1ZSB3aGVuIG5vdCB2YWxpZFxuXG5cdFx0XHRvcHRpb25zLnZhbGlkYXRpb25QYXR0ZXJuID0ganFUaGlzLmF0dHIoXCJkYXRhLXZhbGlkYXRpb25cIik7XG5cdFx0XHRpZiAob3B0aW9ucy52YWxpZGF0aW9uUGF0dGVybikge1xuXHRcdFx0XHRpc1ZhbGlkID0gdmFsaWRhdGVJbnB1dEZpZWxkKGpxVGhpcywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc1ZhbGlkKSB7XG5cdFx0XHRcdHZhciBlbGVtZW50VHlwZSA9IGpxVGhpcy5hdHRyKFwidHlwZVwiKTtcblx0XHRcdFx0aWYgKGVsZW1lbnRUeXBlID09IFwiY2hlY2tib3hcIiB8fCBlbGVtZW50VHlwZSA9PSBcInJhZGlvXCIpIHtcblx0XHRcdFx0XHRpZiAoanFUaGlzLnByb3AoXCJjaGVja2VkXCIpKSB7XG5cdFx0XHRcdFx0XHQvLyBzZXQgdmFsdWUgb25seSB3aGVuIGJvb2xlYW4gaW5wdXQgY2hlY2tlZFxuXHRcdFx0XHRcdFx0dmFsaWRhdGVkVmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWxpZGF0ZWRWYWx1ZSA9IG9wdGlvbnMudmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHVzZXJJbnB1dERhdGFbb3B0aW9ucy5uYW1lXSA9IHZhbGlkYXRlZFZhbHVlO1xuXG5cdFx0XHR3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuc2V0U2Vzc2lvblZhbHVlKG9wdGlvbnMubmFtZSwgb3B0aW9ucy52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdmFsaWRhdGVJbnB1dEZpZWxkKGpxVGhpcywgb3B0aW9ucykge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJ2YWxpZGF0ZUlucHV0RmllbGQoKVwiLCBqcVRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGlzVmFsaWQgPSB0cnVlO1xuXG5cdFx0XHR2YXIgdmFsdWVTdHJpbmcgPSBcIlwiO1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLnZhbHVlICE9IFwidW5kZWZpbmVkXCIgJiYgb3B0aW9ucy52YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0XHR2YWx1ZVN0cmluZyA9IFN0cmluZyhvcHRpb25zLnZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0c3dpdGNoIChvcHRpb25zLnZhbGlkYXRpb25QYXR0ZXJuKSB7XG5cdFx0XHRcdGNhc2UgXCJlbWFpbFwiOlxuXHRcdFx0XHRcdGlzVmFsaWQgPSB2YWx1ZVN0cmluZy5tYXRjaCgvXltcXHd8XFwufFxcLXxcXF9dK0BbXFx3fFxcLnxcXC18XFxfXStcXC5bYS16XXsyLH0kL2kpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHQvLyBjYXNlIFwiZ2lmdEFtb3VudFwiOlxuXHRcdFx0XHQvLyBcdHZhciB2YWx1ZUZsb2F0ID0gcGFyc2VGbG9hdCh2YWx1ZVN0cmluZyk7XG5cdFx0XHRcdC8vIFx0aXNWYWxpZCA9ICFpc05hTih2YWx1ZUZsb2F0KSB8fCB2YWx1ZUZsb2F0ID4gdXNlcklucHV0RGF0YS5taW5pbXVtQW1vdW50O1xuXHRcdFx0XHQvLyBcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAob3B0aW9ucy52YWxpZGF0aW9uUGF0dGVybiwgXCJpXCIpO1xuXHRcdFx0XHRcdGlzVmFsaWQgPSB2YWx1ZVN0cmluZy5tYXRjaChyZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNWYWxpZCkge1xuXHRcdFx0XHRqcVRoaXMucmVtb3ZlQ2xhc3MoXCJpbnZhbGlkXCIpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGpxVGhpcy5hZGRDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJvY2Vzc0dpZnRBbW91bnRDaGFuZ2UoZXZlbnQpIHtcblx0XHRcdHZhciBqcVRhcmdldCA9IGpxKGV2ZW50LnRhcmdldCk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIj4+PiBwcm9jZXNzR2lmdEFtb3VudENoYW5nZSgpXCIsIGV2ZW50LnR5cGUsIGpxVGFyZ2V0LmF0dHIoXCJuYW1lXCIpKTtcblx0XHRcdHZhciBuZXdWYWx1ZSA9IGNsZWFuQ3VycmVuY3koanFUYXJnZXQudmFsKCkpIHx8IDAuMDtcblx0XHRcdHVwZGF0ZUdpZnRBbW91bnQoeyBiYXNlQW1vdW50OiBuZXdWYWx1ZSB9KTtcblx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZ2lmdE9wdGlvbiBpbnB1dFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG5cdFx0XHRqcVRhcmdldC5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT0gXCJjaGFuZ2VcIikge1xuXHRcdFx0XHRqcShcImRpdi5naWZ0Rm9ybUhlYWRlckNvbnRhaW5lclwiKS5zbGlkZURvd24oNjY2LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChqcVRhcmdldC5hdHRyKFwibmFtZVwiKSA9PSBcImdpZnRBbW91bnRGcmVlZm9ybVwiKSB7XG5cdFx0XHRcdGlmIChldmVudC50eXBlID09IFwiY2hhbmdlXCIgfHwgZXZlbnQudHlwZSA9PSBcImJsdXJcIikge1xuXHRcdFx0XHRcdHZhciBhbW91bnQgPSBjbGVhbkN1cnJlbmN5KG5ld1ZhbHVlKSB8fCAwLjA7XG5cdFx0XHRcdFx0dmFyIGNsZWFuZWRBbW91bnQgPSBhbW91bnQudG9GaXhlZCgyKTtcblx0XHRcdFx0XHRpZiAoY2xlYW5lZEFtb3VudCAhPSBuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdFx0anFUYXJnZXQudmFsKGNsZWFuZWRBbW91bnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYW1vdW50IDwgd2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEubWluaW11bUFtb3VudCkge1xuXHRcdFx0XHRcdFx0anFUYXJnZXQuYWRkQ2xhc3MoXCJpbnZhbGlkXCIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRqcVRhcmdldC5yZW1vdmVDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZ2lmdE9wdGlvbiBpbnB1dFt0eXBlPSdyYWRpbyddXCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVHaWZ0QW1vdW50KGlucHV0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGlucHV0ID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGlucHV0ID0ge307XG5cdFx0XHR9XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR1c2VySW5wdXREYXRhLmJhc2VBbW91bnQgPSB1c2VySW5wdXREYXRhLmJhc2VBbW91bnQgfHwgMDtcblx0XHRcdFx0dXNlcklucHV0RGF0YS5leHRyYVBlcmNlbnQgPSB1c2VySW5wdXREYXRhLmV4dHJhUGVyY2VudCB8fCAwO1xuXHRcdFx0XHRpZiAodHlwZW9mIGlucHV0LmJhc2VBbW91bnQgIT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCA9IHBhcnNlRmxvYXQoaW5wdXQuYmFzZUFtb3VudCkgfHwgMC4wO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2YgaW5wdXQuZXh0cmFQZXJjZW50ICE9IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHR1c2VySW5wdXREYXRhLmV4dHJhUGVyY2VudCA9IHBhcnNlRmxvYXQoaW5wdXQuZXh0cmFQZXJjZW50KSB8fCAwLjA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHRvdGFsID0gcGFyc2VGbG9hdChcblx0XHRcdFx0XHR1c2VySW5wdXREYXRhLmJhc2VBbW91bnQgK1xuXHRcdFx0XHRcdFx0KHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCAqIHVzZXJJbnB1dERhdGEuZXh0cmFQZXJjZW50KSAvIDEwMFxuXHRcdFx0XHQpO1xuXHRcdFx0XHR2YXIgZGlzcGxheUFtb3VudCA9IHRvdGFsLnRvRml4ZWQoMikuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHRqcUNvbnRhaW5lclxuXHRcdFx0XHRcdC5maW5kKFwiZGl2LmFtb3VudERpc3BsYXkgc3Bhbi5kaXNwbGF5V2hvbGVBbW91bnRcIilcblx0XHRcdFx0XHQudGV4dChkaXNwbGF5QW1vdW50WzBdKTtcblx0XHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0XHQuZmluZChcImRpdi5hbW91bnREaXNwbGF5IHNwYW4uZGlzcGxheVN1YkFtb3VudFwiKVxuXHRcdFx0XHRcdC50ZXh0KFwiLlwiICsgZGlzcGxheUFtb3VudFsxXSk7XG5cblx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLnNldFNlc3Npb25WYWx1ZShcblx0XHRcdFx0XHRcImJhc2VBbW91bnRcIixcblx0XHRcdFx0XHR1c2VySW5wdXREYXRhLmJhc2VBbW91bnRcblx0XHRcdFx0KTtcblx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLnNldFNlc3Npb25WYWx1ZShcblx0XHRcdFx0XHRcImV4dHJhUGVyY2VudFwiLFxuXHRcdFx0XHRcdHVzZXJJbnB1dERhdGEuZXh0cmFQZXJjZW50XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ1cGRhdGVHaWZ0QW1vdW50KCkgY2F1Z2h0IGVycm9yOiBcIiwgZXJyLm1lc3NhZ2UpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbmN5KCkge1xuXHRcdFx0Ly8gZGVsZXRlIHVzZXJJbnB1dERhdGEuY3VycmVuY3k7XG5cdFx0XHR2YXIgY3VycmVuY3lDb2RlID0ganFDdXJyZW5jeVNlbGVjdC52YWwoKTtcblx0XHRcdHZhciBjdXJyZW5jeVN5bWJvbCA9IFwiICg/KSBcIjtcblx0XHRcdHZhciB0aGlzSXRlbTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXNJdGVtID0gd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0W2ldO1xuXHRcdFx0XHRpZiAodGhpc0l0ZW0uY29kZSA9PSBjdXJyZW5jeUNvZGUgJiYgdGhpc0l0ZW0uc3ltYm9sKSB7XG5cdFx0XHRcdFx0Y3VycmVuY3lTeW1ib2wgPSB0aGlzSXRlbS5zeW1ib2w7XG5cdFx0XHRcdFx0Ly8gdXNlcklucHV0RGF0YS5jdXJyZW5jeSA9IGN1cnJlbmN5Q29kZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0anFDb250YWluZXIuZmluZChcInNwYW4uY3VycmVuY3lTeW1ib2xcIikuaHRtbChjdXJyZW5jeVN5bWJvbCk7XG5cdFx0XHQvLyBnZXRHaWZ0U3RyaW5nKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlUGF5TWV0aG9kKCkge1xuXHRcdFx0dmFyIHBheU1ldGhvZCA9IGpxUGF5TWV0aG9kU2VsZWN0LnZhbCgpO1xuXHRcdFx0dmFyIHRoaXNJdGVtO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cubXdkc3BhY2UudmFsaWRQYXlNZXRob2RMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXNJdGVtID0gd2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdFtpXTtcblx0XHRcdFx0aWYgKHRoaXNJdGVtLmNvZGUgPT0gcGF5TWV0aG9kKSB7XG5cdFx0XHRcdFx0Ly8gdXNlcklucHV0RGF0YS5wYXlNZXRob2QgPSB0aGlzSXRlbS5jb2RlO1xuXHRcdFx0XHRcdHVzZXJJbnB1dERhdGEubWluaW11bUFtb3VudCA9IHRoaXNJdGVtLm1pbmltdW1BbW91bnQ7XG5cdFx0XHRcdFx0aWYgKHRoaXNJdGVtLmZyZXF1ZW5jaWVzKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNhbGxpbmcgZnJlcSBmaWx0ZXJcIiwgdGhpc0l0ZW0pO1xuXHRcdFx0XHRcdFx0ZmlsdGVyRnJlcXVlbmN5QnV0dG9ucyh0aGlzSXRlbS5mcmVxdWVuY2llcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZmlsdGVyRnJlcXVlbmN5QnV0dG9ucyhmcmVxdWVuY3lMaXN0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGZyZXF1ZW5jeUxpc3QgIT0gXCJvYmplY3RcIiB8fCBmcmVxdWVuY3lMaXN0Lmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiZmlsdGVyRnJlcXVlbmN5QnV0dG9ucygpIGlnbm9yaW5nIGludmFsaWQgZnJlcXVlbmN5IGxpc3RcIixcblx0XHRcdFx0XHRmcmVxdWVuY3lMaXN0XG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKFwiZmlsdGVyRnJlcXVlbmN5QnV0dG9ucygpXCIsIGZyZXF1ZW5jeUxpc3QpO1xuXHRcdFx0dmFyIHZpc2libGVPcHRpb25zID0gMDtcblx0XHRcdHZhciBzZWxlY3RlZE9wdGlvbk5vd0hpZGRlbiA9IGZhbHNlO1xuXHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0LmZpbmQoXCJkaXYuZ2lmdEZyZXF1ZW5jeUNvbnRhaW5lciBkaXYuZmFuY3lSYWRpb0J1dHRvbiBpbnB1dFt0eXBlPSdyYWRpbyddXCIpXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChmcmVxdWVuY3lMaXN0LmluZGV4T2YoanEodGhpcykudmFsKCkpID49IDApIHtcblx0XHRcdFx0XHRcdC8vIHNob3cgdGhpcyBmcmVxdWVuY3lcblx0XHRcdFx0XHRcdGpxKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KFwiZGl2LmZhbmN5UmFkaW9CdXR0b25cIilcblx0XHRcdFx0XHRcdFx0LnNob3coKTtcblx0XHRcdFx0XHRcdHZpc2libGVPcHRpb25zKys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIGhpZGUgdGhpcyBmcmVxdWVuY3lcblx0XHRcdFx0XHRcdGlmIChqcSh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKSkge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZE9wdGlvbk5vd0hpZGRlbiA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRqcSh0aGlzKVxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdChcImRpdi5mYW5jeVJhZGlvQnV0dG9uXCIpXG5cdFx0XHRcdFx0XHRcdC5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdGlmICh2aXNpYmxlT3B0aW9ucyA8IDEpIHtcblx0XHRcdFx0Ly8gc29tZXRoaW5nIGlzIHdyb25nLCBzaG93IGFsbFxuXHRcdFx0XHRqcUNvbnRhaW5lci5maW5kKFwiZGl2LmdpZnRGcmVxdWVuY3lDb250YWluZXIgZGl2LmZhbmN5UmFkaW9CdXR0b25cIikuc2hvdygpO1xuXHRcdFx0fSBlbHNlIGlmICh2aXNpYmxlT3B0aW9ucyA9PSAxKSB7XG5cdFx0XHRcdC8vIGhpZGUgYWxsXG5cdFx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZ2lmdEZyZXF1ZW5jeUNvbnRhaW5lciBkaXYuZmFuY3lSYWRpb0J1dHRvblwiKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlRnJlcXVlbmN5KCkge1xuXHRcdFx0Ly8gdmFyIGZyZXF1ZW5jeSA9IGpxQ29udGFpbmVyXG5cdFx0XHQvLyBcdC5maW5kKFwiZGl2LmdpZnRGcmVxdWVuY3lDb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTpjaGVja2VkXCIpXG5cdFx0XHQvLyBcdC52YWwoKTtcblx0XHRcdC8vIHZhciB0aGlzSXRlbTtcblx0XHRcdC8vIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93Lm13ZHNwYWNlLnZhbGlkRnJlcXVlbmN5TGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gXHR0aGlzSXRlbSA9IHdpbmRvdy5td2RzcGFjZS52YWxpZEZyZXF1ZW5jeUxpc3RbaV07XG5cdFx0XHQvLyBcdGlmICh0aGlzSXRlbS5jb2RlID09IGZyZXF1ZW5jeSkge1xuXHRcdFx0Ly8gXHRcdHVzZXJJbnB1dERhdGEuZnJlcXVlbmN5ID0gdGhpc0l0ZW0uY29kZTtcblx0XHRcdC8vIFx0XHRicmVhaztcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXHRcdFx0Z2V0R2lmdFN0cmluZygpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHByZVBvcHVsYXRlVXNlckZpZWxkcygpIHtcblx0XHRcdHNldElucHV0RnJvbVVybChcImZpcnN0XCIsIFwiZG9ub3JGaXJzdE5hbWVcIik7XG5cdFx0XHRzZXRJbnB1dEZyb21VcmwoXCJsYXN0XCIsIFwiZG9ub3JMYXN0TmFtZVwiKTtcblx0XHRcdHNldElucHV0RnJvbVVybChcImVtYWlsXCIsIFwiZG9ub3JFbWFpbFwiKTtcblx0XHRcdHNldElucHV0RnJvbVVybChcInBob25lXCIsIFwiZG9ub3JQaG9uZVwiKTtcblx0XHRcdHNldElucHV0RnJvbVVybChcInN0cmVldFwiLCBcImRvbm9yU3RyZWV0XCIpO1xuXHRcdFx0c2V0SW5wdXRGcm9tVXJsKFwiY2l0eVwiLCBcImRvbm9yQ2l0eVwiKTtcblx0XHRcdHNldElucHV0RnJvbVVybChcInBvc3Rjb2RlXCIsIFwiZG9ub3JQb3N0Q29kZVwiKTtcblx0XHRcdHNldElucHV0RnJvbVVybChcImNvdW50cnlcIiwgXCJkb25vckNvdW50cnlcIik7XG5cdFx0XHRzZXRJbnB1dEZyb21VcmwoXCJyZWdpb25cIiwgXCJkb25vclJlZ2lvblwiKTsgLy9tdXN0IGJlIGFmdGVyIGNvdW50cnlcblxuXHRcdFx0c2V0SW5wdXRGcm9tVXJsKFwiY3VycmVuY3lcIiwgXCJnaWZ0Q3VycmVuY3lcIik7XG5cdFx0XHRzZXRJbnB1dEZyb21VcmwoXCJhbW91bnRcIiwgXCJnaWZ0QW1vdW50RnJlZWZvcm1cIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0SW5wdXRGcm9tVXJsKHVybEtleSwgc2VsZWN0b3IpIHtcblx0XHRcdGlmICh0eXBlb2YgdXJsS2V5ID09IFwidW5kZWZpbmVkXCIgfHwgIXVybEtleSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInNldElucHV0RnJvbVVybCgpIGdpdmVuIGludmFsaWQgdXJsS2V5XCIsIHVybEtleSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gXCJ1bmRlZmluZWRcIiB8fCAhc2VsZWN0b3IpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJzZXRJbnB1dEZyb21VcmwoKSBnaXZlbiBpbnZhbGlkIHNlbGVjdG9yXCIsIHNlbGVjdG9yKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHVybFZhbHVlID0gd2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLmdldFVybFBhcmFtZXRlcih1cmxLZXkpO1xuXHRcdFx0aWYgKHVybFZhbHVlKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiLS0gUE9QVUxBVElOR1wiLCBzZWxlY3RvciwgXCJ3aXRoXCIsIHVybFZhbHVlKTtcblx0XHRcdFx0dmFyIGpxVGFyZ2V0ID0ganFDb250YWluZXJcblx0XHRcdFx0XHQuZmluZChcblx0XHRcdFx0XHRcdFwic2VjdGlvbi5zdGVwIGlucHV0W25hbWU9J1wiICtcblx0XHRcdFx0XHRcdFx0c2VsZWN0b3IgK1xuXHRcdFx0XHRcdFx0XHRcIiddLCBzZWN0aW9uLnN0ZXAgc2VsZWN0W25hbWU9J1wiICtcblx0XHRcdFx0XHRcdFx0c2VsZWN0b3IgK1xuXHRcdFx0XHRcdFx0XHRcIiddXCJcblx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0LnZhbCh1cmxWYWx1ZSlcblx0XHRcdFx0XHQudHJpZ2dlcihcImNoYW5nZVwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZFRyYW5zYWN0aW9uU2VuZERhdGEoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImJ1aWxkVHJhbnNhY3Rpb25TZW5kRGF0YSgpIFNUQVJUXCIpO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGEgPSB7fTtcblx0XHRcdFx0dmFyIHNlbmREYXRhID0gd2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGE7XG5cblx0XHRcdFx0dmFyIHVzZXJEYXRhID0gd2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGE7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiYnVpbGRUcmFuc2FjdGlvblNlbmREYXRhKCkgdXNlckRhdGFcIiwgdXNlckRhdGEpO1xuXG5cdFx0XHRcdHNlbmREYXRhLm9yZ2FuaXphdGlvbklkID0gdGhpc1dpZGdldC5vcHRpb25zLm9yZ2FuaXphdGlvbklkIHx8IG51bGw7XG5cdFx0XHRcdHNlbmREYXRhLmZvcm1JZCA9IHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWRcblx0XHRcdFx0XHQ/IFN0cmluZyh0aGlzV2lkZ2V0Lm9wdGlvbnMuZm9ybUlkKVxuXHRcdFx0XHRcdDogXCJcIjsgLy9taW1pYyB0ZXN0XG5cdFx0XHRcdHNlbmREYXRhLmZvcm1BbGxvY2F0aW9uSWQgPSB0aGlzV2lkZ2V0Lm9wdGlvbnMuZm9ybUFsbG9jYXRpb25JZCB8fCBudWxsO1xuXG5cdFx0XHRcdC8qIHN0YXJ0IC0gbm8gZGF0YSwgYWRkZWQgdG8gbWltaWMgY3VycmVudCB3aWRnZXQgKi9cblx0XHRcdFx0c2VuZERhdGEuYmFua19hY2NvdW50X2hvbGRlcl90eXBlID0gXCJwZXJzb25hbFwiO1xuXHRcdFx0XHRzZW5kRGF0YS5iYW5rX2FjY291bnRfbnVtYmVyID0gXCJcIjtcblx0XHRcdFx0c2VuZERhdGEuYmFua19hY2NvdW50X3R5cGUgPSBcImNoZWNraW5nXCI7XG5cdFx0XHRcdHNlbmREYXRhLmJhbmtfbmFtZSA9IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLmJhbmtfcm91dGluZ19udW1iZXIgPSBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5jb21tZW50ID0gXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucGF5bWVudF9tZXRob2RfdG9rZW4gPSBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS50YWdzID0gbnVsbDtcblx0XHRcdFx0LyogZW5kIC0gbm8gZGF0YSwgYWRkZWQgdG8gbWltaWMgY3VycmVudCB3aWRnZXQgKi9cblxuXHRcdFx0XHRzZW5kRGF0YS5maXJzdF9uYW1lID0gdXNlckRhdGEuZG9ub3JGaXJzdE5hbWUgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEubGFzdF9uYW1lID0gdXNlckRhdGEuZG9ub3JMYXN0TmFtZSB8fCBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5lbWFpbCA9IHVzZXJEYXRhLmRvbm9yRW1haWwgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucGhvbmUgPSB1c2VyRGF0YS5kb25vclBob25lIHx8IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLmFkZHJlc3MgPSB1c2VyRGF0YS5kb25vclN0cmVldCB8fCBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5jaXR5ID0gdXNlckRhdGEuZG9ub3JDaXR5IHx8IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLnN0YXRlID0gdXNlckRhdGEuZG9ub3JSZWdpb24gfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucG9zdGFsQ29kZSA9IHVzZXJEYXRhLmRvbm9yUG9zdENvZGUgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEuY291bnRyeSA9IHVzZXJEYXRhLmRvbm9yQ291bnRyeSB8fCBcIlwiO1xuXG5cdFx0XHRcdHZhciBiYXNlQW1vdW50ID0gY2xlYW5DdXJyZW5jeSh1c2VyRGF0YS5iYXNlQW1vdW50KSB8fCAwLjA7XG5cdFx0XHRcdHZhciB0aXBQZXJjZW50ID0gcGFyc2VGbG9hdCh1c2VyRGF0YS5naWZ0RXh0cmFQZXJjZW50KSB8fCAwLjA7XG5cdFx0XHRcdHZhciB0aXBBbW91bnQgPSBjbGVhbkN1cnJlbmN5KChiYXNlQW1vdW50ICogdGlwUGVyY2VudCkgLyAxMDApO1xuXHRcdFx0XHRzZW5kRGF0YS5hbW91bnQgPSBiYXNlQW1vdW50ICsgdGlwQW1vdW50O1xuXHRcdFx0XHRzZW5kRGF0YS5iYXNlQW1vdW50ID0gYmFzZUFtb3VudC50b0ZpeGVkKDIpOyAvL21pbWljIHRlc3Rcblx0XHRcdFx0c2VuZERhdGEudGlwQW1vdW50ID0gdGlwQW1vdW50LnRvRml4ZWQoMik7IC8vbWltaWMgdGVzdFxuXHRcdFx0XHRzZW5kRGF0YS50aXBQZXJjZW50ID0gXCIzLjAwXCI7IC8vbWltaWMgdGVzdFxuXG5cdFx0XHRcdHN3aXRjaCAodXNlckRhdGEuZ2lmdEZyZXF1ZW5jeSkge1xuXHRcdFx0XHRcdGNhc2UgXCJzaW5nbGVcIjpcblx0XHRcdFx0XHRcdHNlbmREYXRhLnJlY3VycmluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0c2VuZERhdGEuZnJlcXVlbmN5ID0gXCJvXCI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwibW9udGhseVwiOlxuXHRcdFx0XHRcdFx0c2VuZERhdGEucmVjdXJyaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNlbmREYXRhLmZyZXF1ZW5jeSA9IFwibVwiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHNlbmREYXRhLnJlY3VycmluZyA9IG51bGw7XG5cdFx0XHRcdFx0XHRzZW5kRGF0YS5mcmVxdWVuY3kgPSBcIlwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2VuZERhdGEuY3VycmVuY3kgPSB1c2VyRGF0YS5naWZ0Q3VycmVuY3kgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucGF5bWVudFR5cGUgPSB1c2VyRGF0YS5wYXlNZXRob2QgfHwgXCJcIjtcblxuXHRcdFx0XHRpZiAoc2VuZERhdGEucGF5bWVudFR5cGUgPT0gXCJjYXJkXCIpIHtcblx0XHRcdFx0XHRzZW5kRGF0YS5tb250aCA9IHVzZXJEYXRhLnBheUNhcmRFeHBpcmVNb250aCB8fCBcIlwiO1xuXHRcdFx0XHRcdHNlbmREYXRhLnllYXIgPSB1c2VyRGF0YS5wYXlDYXJkRXhwaXJlWWVhciB8fCBcIlwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2VuZERhdGEuZG9uYXRlRG91YmxlID0gdXNlckRhdGEuaXNDb21wYW55TWF0Y2ggPT09IHRydWU7XG5cdFx0XHRcdHNlbmREYXRhLmNvbXBhbnkgPSB1c2VyRGF0YS5jb21wYW55TWF0Y2hOYW1lIHx8IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLmVtcGxveWVlRW1haWwgPSB1c2VyRGF0YS5jb21wYW55TWF0Y2hFbWFpbCB8fCBcIlwiO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiYnVpbGRUcmFuc2FjdGlvblNlbmREYXRhKCkgc2VuZERhdGFcIiwgc2VuZERhdGEpO1xuXHRcdFx0XHRyZXR1cm4gc2VuZERhdGE7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJidWlsZFRyYW5zYWN0aW9uU2VuZERhdGEoKSBjYXVnaHQgZXJyb3I6IFwiLCBlcnIubWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZW5kVHJhbnNhY3Rpb24oKSB7XG5cdFx0XHR3aW5kb3cubXdkc3BhY2UudHJhbnNhY3Rpb25TZW5kRGF0YSA9IGJ1aWxkVHJhbnNhY3Rpb25TZW5kRGF0YSgpO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhd2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uTGF5ZXIudmFsaWRhdGVTZW5kRGF0YShcblx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudHJhbnNhY3Rpb25TZW5kRGF0YVxuXHRcdFx0XHQpXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc29sZS5sb2coXCJzZW5kVHJhbnNhY3Rpb24oKSBTRU5ESU5HXCIsIHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhKTtcblxuXHRcdFx0cHJlcEFuZFNob3dQcm9jZXNzaW5nU3RlcCgpO1xuXG5cdFx0XHR3aW5kb3cubXdkc3BhY2UudHJhbnNhY3Rpb25MYXllci5zdGFydERvbmF0aW9uKFxuXHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudHJhbnNhY3Rpb25TZW5kRGF0YSxcblx0XHRcdFx0ZnVuY3Rpb24oZG9uYXRpb25JbmZvKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTVUNDRVNTIEZVTkNUSU9OXCIsIGRvbmF0aW9uSW5mbyk7XG5cblx0XHRcdFx0XHRpZiAoZG9uYXRpb25JbmZvLnR5cGUgPT0gXCJjYXJkXCIpIHtcblx0XHRcdFx0XHRcdHZhciB0cmFuc2FjdGlvblN0YXR1cyA9IFN0cmluZyhkb25hdGlvbkluZm8uc3RhdHVzKTtcblx0XHRcdFx0XHRcdGlmICh0cmFuc2FjdGlvblN0YXR1cy5tYXRjaCgvY29tcGxldGUvaSkpIHtcblx0XHRcdFx0XHRcdFx0cHJlcEFuZFNob3dDb25maXJtYXRpb25TdGVwKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRwcmVwQW5kU2hvd0Vycm9yU3RlcChcblx0XHRcdFx0XHRcdFx0XHQnVGhlIHNlcnZlciBhcHBlYXJzIHRvIGhhdmUgaGFkIGFuIGVycm9yIHByb2Nlc3NpbmcgdGhpcyBjYXJkIHRyYW5zYWN0aW9uLCBhbmQgcmVwb3J0ZWQgc3RhdHVzIFwiJyArXG5cdFx0XHRcdFx0XHRcdFx0XHR0cmFuc2FjdGlvblN0YXR1cyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnXCIuJ1xuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZG9uYXRpb25JbmZvLnR5cGUgPT0gXCJiaXRjb2luXCIpIHtcblx0XHRcdFx0XHRcdHByZXBBbmRTaG93Qml0Y29pblN0ZXAoZG9uYXRpb25JbmZvKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XHRcIlVucmVjb2duaXplZCB0eXBlIHByb3BlcnR5IGluIHNlcnZlciByZXNwb25zZVwiLFxuXHRcdFx0XHRcdFx0XHRkb25hdGlvbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRwcmVwQW5kU2hvd0Vycm9yU3RlcChcIlVucmVjb2duaXplZCByZXNwb25zZSBmcm9tIHRoZSBzZXZlclwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uKGRvbmF0aW9uSW5mbykge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiRkFJTCBGVU5DVElPTlwiLCBkb25hdGlvbkluZm8pO1xuXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiRG9uYXRpb24gcmVjZWl2ZWQgZmFpbCByZXNwb25zZSBmcm9tIHNlcnZlclwiLCBkb25hdGlvbkluZm8pO1xuXG5cdFx0XHRcdFx0dmFyIHVzZXJNZXNzYWdlID1cblx0XHRcdFx0XHRcdGRvbmF0aW9uSW5mby50ZXh0IHx8XG5cdFx0XHRcdFx0XHRcIlRoZSBzZXJ2ZXIgd2FzIHVuYWJsZSB0byBwcm9jZXNzIHRoZSB0cmFuc2FjdGlvbiwgYnV0IHByb3ZpZGVkIG5vIGV4cGxhbmF0aW9uLlwiO1xuXG5cdFx0XHRcdFx0cHJlcEFuZFNob3dFcnJvclN0ZXAodXNlck1lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0R2lmdFN0cmluZygpIHtcblx0XHRcdHZhciBnaWZ0U3RyaW5nT3B0aW9ucyA9IHtcblx0XHRcdFx0Ly8gYmFzaWNSb3VuZGluZzogdHJ1ZSxcblx0XHRcdFx0Ly8gbWluaW11bUR5bmFtaWNTdGFydDogMzAuMCxcblx0XHRcdH07XG5cdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEuZnJlcXVlbmN5ID09IFwibW9udGhseVwiKSB7XG5cdFx0XHRcdGlmICh0aGlzV2lkZ2V0Lm9wdGlvbnMubGlzdE1vbnRobHlHaWZ0QXNrU3RyaW5nKSB7XG5cdFx0XHRcdFx0Z2lmdFN0cmluZ09wdGlvbnMuZ2lmdFN0cmluZ0xpc3QgPVxuXHRcdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmxpc3RNb250aGx5R2lmdEFza1N0cmluZztcblx0XHRcdFx0XHRpZiAoIXRoaXNXaWRnZXQuaXNNb250aGx5T25seVBhZ2UpIHtcblx0XHRcdFx0XHRcdGdpZnRTdHJpbmdPcHRpb25zLmNhbGN1bGF0ZUFzTW9udGhseSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpc1dpZGdldC5vcHRpb25zLmxpc3RTaW5nbGVHaWZ0QXNrU3RyaW5nKSB7XG5cdFx0XHRcdFx0Z2lmdFN0cmluZ09wdGlvbnMuZ2lmdFN0cmluZ0xpc3QgPVxuXHRcdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmxpc3RTaW5nbGVHaWZ0QXNrU3RyaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBmaW5hbEdpZnRTdHJpbmcgPSB3aW5kb3cubXdkc3BhY2UuZ2lmdFV0aWxzLnByb2Nlc3NHaWZ0U3RyaW5nTGlzdChcblx0XHRcdFx0Z2lmdFN0cmluZ09wdGlvbnNcblx0XHRcdCk7XG5cdFx0XHRidWlsZEdpZnRTdHJpbmdCdXR0b25zKGZpbmFsR2lmdFN0cmluZyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRHaWZ0U3RyaW5nQnV0dG9ucyhnaWZ0U3RyaW5nTGlzdCkge1xuXHRcdFx0aWYgKHR5cGVvZiBnaWZ0U3RyaW5nTGlzdCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBnaWZ0U3RyaW5nTGlzdCA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFnaWZ0U3RyaW5nTGlzdCB8fCBnaWZ0U3RyaW5nTGlzdC5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBnaWZ0IHN0cmluZyBsaXN0IGdpdmVuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBqcUdpZnRTdHJpbmdDb250YWluZXIgPSBqcUNvbnRhaW5lci5maW5kKFwiZGl2LmZpeGVkQW1vdW50Q29udGFpbmVyXCIpO1xuXHRcdFx0XHRpZiAoanFHaWZ0U3RyaW5nQ29udGFpbmVyLmxlbmd0aCAhPT0gMSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBpZGVudGlmeSB0aGUgZml4ZWQgZ2lmdCBhbW91bnQgY29udGFpbmVyXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHJlbW92ZSBhbnkgZXhpc3Rpbmcgb3B0aW9uc1xuXHRcdFx0XHRqcUdpZnRTdHJpbmdDb250YWluZXIuZW1wdHkoKTtcblxuXHRcdFx0XHR2YXIgZG9tVGhpc0J1dHRvbiwgdGhpc0Ftb3VudCwgdGhpc0lkO1xuXHRcdFx0XHR2YXIgZGVmYXVsdElkID0gbnVsbDtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGdpZnRTdHJpbmdMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpc0Ftb3VudCA9IGdpZnRTdHJpbmdMaXN0W2ldO1xuXHRcdFx0XHRcdHRoaXNJZCA9IHdpbmRvdy5td2RzcGFjZS5zaGFyZWRVdGlscy5tYWtlVW5pcXVlSWQoXCJhbW91bnQtXCIgKyBpKTtcblx0XHRcdFx0XHRpZiAoIWRlZmF1bHRJZCAmJiBTdHJpbmcodGhpc0Ftb3VudCkubWF0Y2goL1xcKi8pKSB7XG5cdFx0XHRcdFx0XHRkZWZhdWx0SWQgPSB0aGlzSWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRvbVRoaXNCdXR0b24gPSBidWlsZEdpZnRTdHJpbmdCdXR0b24odGhpc0Ftb3VudCwge1xuXHRcdFx0XHRcdFx0aWQ6IHRoaXNJZCxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoZG9tVGhpc0J1dHRvbikge1xuXHRcdFx0XHRcdFx0anFHaWZ0U3RyaW5nQ29udGFpbmVyLmFwcGVuZChkb21UaGlzQnV0dG9uKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGFkZCBmaXhlZCBnaWZ0IGJ1dHRvbjpcIiwgdGhpc0Ftb3VudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGJlbG93IGlzIGluIHByb2dyZXNzXG5cdFx0XHRcdGlmIChkZWZhdWx0SWQpIHtcblx0XHRcdFx0XHRqcUdpZnRTdHJpbmdDb250YWluZXJcblx0XHRcdFx0XHRcdC5maW5kKFwiZGl2LmdpZnRBbW91bnRDb250YWluZXIgaW5wdXQjXCIgKyBkZWZhdWx0SWQpXG5cdFx0XHRcdFx0XHQucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSlcblx0XHRcdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGpxR2lmdFN0cmluZ0NvbnRhaW5lclxuXHRcdFx0XHRcdFx0LmZpbmQoXCJkaXYuZ2lmdEFtb3VudENvbnRhaW5lciBpbnB1dFtuYW1lPSdnaWZ0QW1vdW50Rml4ZWQnXVwiKVxuXHRcdFx0XHRcdFx0LmVxKDEpXG5cdFx0XHRcdFx0XHQucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSlcblx0XHRcdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgZml4ZWQgZ2lmdCBidXR0b25zXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0XHR1cGRhdGVDdXJyZW5jeSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkR2lmdFN0cmluZ0J1dHRvbihpbnB1dCwgb3B0aW9ucykge1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdG9wdGlvbnMgPSB7fTtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiYnVpbGRHaWZ0U3RyaW5nQnV0dG9uKCk6IGlnbm9yaW5nIGludmFsaWQgb3B0aW9uIG9iamVjdFwiLFxuXHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHZhciBkb21CdXR0b24gPSBudWxsO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIHRoaXNBbW91bnQgPSB7XG5cdFx0XHRcdFx0YW1vdW50OiBjbGVhbkN1cnJlbmN5KGlucHV0KSxcblx0XHRcdFx0XHRkaXNwbGF5VGV4dDogZm9ybWF0RGlzcGxheUdpZnQoaW5wdXQpLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICghdGhpc0Ftb3VudC5hbW91bnQgfHwgIXRoaXNBbW91bnQuZGlzcGxheVRleHQpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGdpZnQgc3RyaW5nIGFtb3VudFwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHRoZSBjb250YWluZXIgZGl2XG5cdFx0XHRcdGRvbUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGpxKGRvbUJ1dHRvbikuYWRkQ2xhc3MoXCJnaWZ0T3B0aW9uIGZpeGVkIGZhbmN5UmFkaW9CdXR0b25cIik7XG5cblx0XHRcdFx0Ly8gdGhlIHJhZGlvXG5cdFx0XHRcdHZhciBkb21SYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRcdFx0ZG9tUmFkaW8uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhZGlvXCIpO1xuXHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiZ2lmdEFtb3VudEZpeGVkXCIpO1xuXHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0aGlzQW1vdW50LmFtb3VudCk7XG5cdFx0XHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRcdFx0ZG9tUmFkaW8uc2V0QXR0cmlidXRlKFwiaWRcIiwgb3B0aW9ucy5pZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZG9tQnV0dG9uLmFwcGVuZENoaWxkKGRvbVJhZGlvKTtcblxuXHRcdFx0XHQvLyB0aGUgbGFiZWxcblx0XHRcdFx0dmFyIGRvbUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5pZCkge1xuXHRcdFx0XHRcdGRvbUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBvcHRpb25zLmlkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkb21CdXR0b24uYXBwZW5kQ2hpbGQoZG9tTGFiZWwpO1xuXG5cdFx0XHRcdC8vIGxhYmVsIGN1cnJlbmN5IHN5bWJvbFxuXHRcdFx0XHR2YXIgZG9tU3ltYm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cdFx0XHRcdGpxKGRvbVN5bWJvbCkuYWRkQ2xhc3MoXCJjdXJyZW5jeVN5bWJvbFwiKTtcblx0XHRcdFx0ZG9tTGFiZWwuYXBwZW5kQ2hpbGQoZG9tU3ltYm9sKTtcblxuXHRcdFx0XHQvLyBsYWJlbCBhbW91bnQgdmFsdWVcblx0XHRcdFx0dmFyIGRvbUFtb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdFx0XHRqcShkb21BbW91bnQpLmFkZENsYXNzKFwiZGlzcGxheUFtb3VudFwiKTtcblx0XHRcdFx0ZG9tQW1vdW50LmlubmVySFRNTCA9IHRoaXNBbW91bnQuZGlzcGxheVRleHQgfHwgXCJVbmtub3duXCI7XG5cdFx0XHRcdGRvbUxhYmVsLmFwcGVuZENoaWxkKGRvbUFtb3VudCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGJ1aWxkaW5nIHRoZSBidXR0b24gZm9yIGZpeGVkIGFtb3VudDpcIiwgaW5wdXQsIGVycik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZG9tQnV0dG9uO1xuXHRcdH1cblxuXHRcdC8qIHJlbW92ZSBhbGwgYnV0IGRpZ2l0cy9kb3QgYmVmb3JlIGNvbnZlcnRpbmcgdG8gZmxvYXQgYW5kIHJvdW5kaW5nIHRvIDIgZGlnaXRzICovXG5cdFx0ZnVuY3Rpb24gY2xlYW5DdXJyZW5jeShpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcImNsZWFuQ3VycmVuY3koKSBnaXZlbiBlbXB0eSBpbnB1dFwiKTtcblx0XHRcdFx0dmFyIGlucHV0ID0gXCJcIjtcblx0XHRcdH1cblx0XHRcdGlucHV0ID0gXCJcIiArIGlucHV0O1xuXHRcdFx0dmFyIHJhd0N1cnJlbmN5ID0gcGFyc2VGbG9hdChpbnB1dC5yZXBsYWNlKC9bXjAtOXxcXC5dL2csIFwiXCIpKTtcblx0XHRcdGlmIChpc05hTihyYXdDdXJyZW5jeSkpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJjbGVhbkN1cnJlbmN5KCkgZGVmYXVsdGluZyBpbnZhbGlkIGlucHV0IHRvIDAuMDBcIiwgaW5wdXQpO1xuXHRcdFx0XHRyZXR1cm4gMC4wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE1hdGgucm91bmQocmF3Q3VycmVuY3kgKiAxMDApIC8gMTAwO1xuXHRcdH1cblxuXHRcdC8qIHJlbW92ZSBhbGwgY2hhcnMgYnV0IGRpZ2l0cy9kb3QgYmVmb3JlIGNvbnZlcnQgdG8gZmxvYXQgKi9cblx0XHRmdW5jdGlvbiBmb3JtYXREaXNwbGF5R2lmdChpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBpbnB1dCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0XHRpbnB1dCA9IFwiXCIgKyBpbnB1dDtcblx0XHRcdHZhciBhbW91bnQgPSBjbGVhbkN1cnJlbmN5KGlucHV0KTtcblx0XHRcdGFtb3VudCA9IGFtb3VudC50b0ZpeGVkKDIpO1xuXHRcdFx0YW1vdW50ID0gYW1vdW50LnJlcGxhY2UoL1xcLjAwJC9nLCBcIlwiKTtcblx0XHRcdHJldHVybiBhbW91bnQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDdXJyZW5jeVNlbGVjdChvcHRpb25zKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJidWlsZEN1cnJlbmN5U2VsZWN0KCk6IGlnbm9yaW5nIGludmFsaWQgb3B0aW9uIG9iamVjdFwiLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHRcdHZhciBkZWZhdWx0Q3VycmVuY3kgPSB0eXBlb2Ygb3B0aW9ucy5kZWZhdWx0ID09IFwic3RyaW5nXCIgPyBvcHRpb25zLmRlZmF1bHQgOiBcIlVTRFwiO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCF3aW5kb3cubXdkc3BhY2UudmFsaWRDdXJyZW5jeUxpc3QpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJMaXN0IG9mIHZhbGlkIGN1cnJlbmNpZXMgbm90IGZvdW5kXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBkb21DdXJyZW5jeVNlbGVjdCA9IGpxQ3VycmVuY3lTZWxlY3Q7XG5cdFx0XHRcdGlmIChkb21DdXJyZW5jeVNlbGVjdC5sZW5ndGggIT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaWRlbnRpZnkgdGhlIGN1cnJlbmN5IHNlbGVjdCBkcm9wZG93blwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgZG9tVGhpc09wdGlvbiwgdGhpc0N1cnJlbmN5LCBva1RvQWRkO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b2tUb0FkZCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpc0N1cnJlbmN5ID0gd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0W2ldO1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLmZpbHRlckxpc3QpIHtcblx0XHRcdFx0XHRcdG9rVG9BZGQgPSBmaW5kTGlzdE1hdGNoKG9wdGlvbnMuZmlsdGVyTGlzdCwgdGhpc0N1cnJlbmN5LmNvZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob2tUb0FkZCkge1xuXHRcdFx0XHRcdFx0ZG9tVGhpc09wdGlvbiA9IGJ1aWxkQ3VycmVuY3lPcHRpb24odGhpc0N1cnJlbmN5KTtcblx0XHRcdFx0XHRcdGlmIChkb21UaGlzT3B0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdGRvbUN1cnJlbmN5U2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBhZGQgY3VycmVuY3k6XCIsIHRoaXNDdXJyZW5jeSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGRvbUN1cnJlbmN5U2VsZWN0LnZhbChkZWZhdWx0Q3VycmVuY3kpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgY3VycmVuY3kgc2VsZWN0IGRyb3Bkb3duXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDdXJyZW5jeU9wdGlvbihjdXJyZW5jeSkge1xuXHRcdFx0dmFyIGRvbU9wdGlvbiA9IG51bGw7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoY3VycmVuY3kuY29kZSkge1xuXHRcdFx0XHRcdGRvbU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGN1cnJlbmN5LmNvZGUpO1xuXHRcdFx0XHRcdGRvbU9wdGlvbi5pbm5lclRleHQgPSBjdXJyZW5jeS5jb2RlICsgXCIgXCIgKyAoY3VycmVuY3kubmFtZSB8fCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIG9wdGlvbiBlbGVtZW50IGZvciBjdXJyZW5jeTpcIiwgY3VycmVuY3kpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbU9wdGlvbjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZFBheU1ldGhvZFNlbGVjdCgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghd2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkxpc3Qgb2YgdmFsaWQgcGF5bWVudCBtZXRob2RzIG5vdCBmb3VuZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoanFQYXlNZXRob2RTZWxlY3QubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSBwYXltZW50IG1ldGhvZCBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGRvbVRoaXNPcHRpb247XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cubXdkc3BhY2UudmFsaWRQYXlNZXRob2RMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZG9tVGhpc09wdGlvbiA9IGJ1aWxkUGF5TWV0aG9kT3B0aW9uKHdpbmRvdy5td2RzcGFjZS52YWxpZFBheU1ldGhvZExpc3RbaV0pO1xuXHRcdFx0XHRcdGlmIChkb21UaGlzT3B0aW9uKSB7XG5cdFx0XHRcdFx0XHRqcVBheU1ldGhvZFNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFx0XCJVbmFibGUgdG8gYWRkIHBheW1lbnQgbWV0aG9kOlwiLFxuXHRcdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudmFsaWRQYXlNZXRob2RMaXN0W2ldXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBoaWRlIHRoZSBzZWxlY3RvciB3aGVuIGl0IGhhcyBvbmx5IG9uZSB2YWx1ZVxuXHRcdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdC5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0anFQYXlNZXRob2RTZWxlY3Quc2hvdygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGpxUGF5TWV0aG9kU2VsZWN0LmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIHBheW1lbnQgbWV0aG9kIHNlbGVjdCBkcm9wZG93blwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkUGF5TWV0aG9kT3B0aW9uKG1ldGhvZCkge1xuXHRcdFx0dmFyIGRvbU9wdGlvbiA9IG51bGw7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAobWV0aG9kLmNvZGUpIHtcblx0XHRcdFx0XHRkb21PcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdFx0XHRcdGRvbU9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBtZXRob2QuY29kZSk7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLnNldEF0dHJpYnV0ZShcImRhdGEtbGFiZWwtaWRcIiwgXCJnaWZ0LnBheU1ldGhvZC5cIiArIG1ldGhvZC5jb2RlKTtcblx0XHRcdFx0XHRkb21PcHRpb24uaW5uZXJUZXh0ID0gbWV0aG9kLmRlc2NyaXB0aW9uIHx8IFwiVW5rbm93blwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgb3B0aW9uIGVsZW1lbnQgZm9yIG1ldGhvZDpcIiwgbWV0aG9kKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb21PcHRpb247XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRGcmVxdWVuY3lCdXR0b25zKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCF3aW5kb3cubXdkc3BhY2UudmFsaWRGcmVxdWVuY3lMaXN0IHx8XG5cdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnZhbGlkRnJlcXVlbmN5TGlzdC5sZW5ndGggPCAxXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbGlzdCBvZiBmcmVxdWVuY2llcyBnaXZlblwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIganFGcmVxdWVuY3lDb250YWluZXIgPSBqcUNvbnRhaW5lci5maW5kKFwiZGl2LmdpZnRGcmVxdWVuY3lDb250YWluZXJcIik7XG5cdFx0XHRcdGlmIChqcUZyZXF1ZW5jeUNvbnRhaW5lci5sZW5ndGggIT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaWRlbnRpZnkgdGhlIGZyZXF1ZW5jeSBjb250YWluZXJcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gcmVtb3ZlIGFueSBleGlzdGluZyBvcHRpb25zXG5cdFx0XHRcdGpxRnJlcXVlbmN5Q29udGFpbmVyLmZpbmQoXCJkaXYuZmFuY3lSYWRpb0J1dHRvblwiKS5yZW1vdmUoKTtcblxuXHRcdFx0XHR2YXIgZG9tVGhpc0J1dHRvbjtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5td2RzcGFjZS52YWxpZEZyZXF1ZW5jeUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRkb21UaGlzQnV0dG9uID0gYnVpbGRGcmVxdWVuY3lCdXR0b24oXG5cdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudmFsaWRGcmVxdWVuY3lMaXN0W2ldLFxuXHRcdFx0XHRcdFx0eyBpZDogd2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLm1ha2VVbmlxdWVJZChcImZyZXF1ZW5jeS1cIiArIGkpIH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChkb21UaGlzQnV0dG9uKSB7XG5cdFx0XHRcdFx0XHRqcUZyZXF1ZW5jeUNvbnRhaW5lci5hcHBlbmQoZG9tVGhpc0J1dHRvbik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFx0XCJVbmFibGUgdG8gYWRkIGZyZXF1ZW5jeTpcIixcblx0XHRcdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnZhbGlkRnJlcXVlbmN5TGlzdFtpXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0anFGcmVxdWVuY3lDb250YWluZXJcblx0XHRcdFx0XHQuZmluZCgnaW5wdXRbbmFtZT1cImdpZnRGcmVxdWVuY3lcIl0nKVxuXHRcdFx0XHRcdC5lcSgwKVxuXHRcdFx0XHRcdC5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKVxuXHRcdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIGZyZXF1ZW5jeSBidXR0b25zXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRGcmVxdWVuY3lCdXR0b24oZnJlcXVlbmN5LCBvcHRpb25zKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJidWlsZEZyZXF1ZW5jeUJ1dHRvbigpOiBpZ25vcmluZyBpbnZhbGlkIG9wdGlvbiBvYmplY3RcIiwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZG9tQnV0dG9uID0gbnVsbDtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmIChmcmVxdWVuY3kuY29kZSkge1xuXHRcdFx0XHRcdC8vIHRoZSBjb250YWluZXIgZGl2XG5cdFx0XHRcdFx0ZG9tQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0XHRqcShkb21CdXR0b24pLmFkZENsYXNzKFwiZmFuY3lSYWRpb0J1dHRvblwiKTtcblxuXHRcdFx0XHRcdC8vIHRoZSByYWRpb1xuXHRcdFx0XHRcdHZhciBkb21SYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRcdFx0XHRqcShkb21SYWRpbykuYWRkQ2xhc3MoXCJjaGFuZ2VXYXRjaFwiKTtcblx0XHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFkaW9cIik7XG5cdFx0XHRcdFx0ZG9tUmFkaW8uc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImdpZnRGcmVxdWVuY3lcIik7XG5cdFx0XHRcdFx0ZG9tUmFkaW8uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgZnJlcXVlbmN5LmNvZGUpO1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBvcHRpb25zLmlkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9tQnV0dG9uLmFwcGVuZENoaWxkKGRvbVJhZGlvKTtcblxuXHRcdFx0XHRcdC8vIHRoZSBsYWJlbFxuXHRcdFx0XHRcdHZhciBkb21MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuXHRcdFx0XHRcdGRvbUxhYmVsLnNldEF0dHJpYnV0ZShcImRhdGEtbGFiZWwtaWRcIiwgXCJnaWZ0LmZyZXF1ZW5jeS5cIiArIGZyZXF1ZW5jeS5jb2RlKTtcblx0XHRcdFx0XHRkb21MYWJlbC5pbm5lckhUTUwgPSBmcmVxdWVuY3kubmFtZSB8fCBcIlVua25vd25cIjtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5pZCkge1xuXHRcdFx0XHRcdFx0ZG9tTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIG9wdGlvbnMuaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb21CdXR0b24uYXBwZW5kQ2hpbGQoZG9tTGFiZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGJ1aWxkaW5nIHRoZSBidXR0b24gZm9yIGZyZXF1ZW5jeTpcIiwgZnJlcXVlbmN5LCBlcnIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbUJ1dHRvbjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwcmVwYXJlUmVnaW9uSW5wdXQoKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJwcmVwYXJlUmVnaW9uSW5wdXQoKTogaWdub3JpbmcgaW52YWxpZCBvcHRpb24gb2JqZWN0XCIsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgdXNlckNvdW50cnkgPSBqcUNvbnRhaW5lci5maW5kKCdzZWxlY3RbbmFtZT1cImRvbm9yQ291bnRyeVwiXScpLnZhbCgpO1xuXHRcdFx0XHR2YXIgdGhpc0NvdW50cnk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93Lm13ZHNwYWNlLnZhbGlkQ291bnRyeUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzQ291bnRyeSA9IHdpbmRvdy5td2RzcGFjZS52YWxpZENvdW50cnlMaXN0W2ldO1xuXHRcdFx0XHRcdGlmICh1c2VyQ291bnRyeSA9PSB0aGlzQ291bnRyeS5jb2RlIHx8IHVzZXJDb3VudHJ5ID09IHRoaXNDb3VudHJ5Lm5hbWUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzQ291bnRyeS5yZWdpb25zICYmIGJ1aWxkUmVnaW9uU2VsZWN0KHRoaXNDb3VudHJ5LnJlZ2lvbnMpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHByZXBhcmUgdGhlIHJlZ2lvbiBpbnB1dCBtZXRob2RcIiwgZXJyKTtcblx0XHRcdH1cblx0XHRcdHNob3dSZWdpb25JbnB1dCgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNob3dSZWdpb25JbnB1dCgpIHtcblx0XHRcdGpxUmVnaW9uU2VsZWN0LmhpZGUoKTtcblx0XHRcdGpxUmVnaW9uSW5wdXRcblx0XHRcdFx0LnZhbChcIlwiKVxuXHRcdFx0XHQuc2hvdygpXG5cdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkUmVnaW9uU2VsZWN0KHJlZ2lvbnMpIHtcblx0XHRcdGpxUmVnaW9uSW5wdXQuaGlkZSgpO1xuXHRcdFx0anFSZWdpb25TZWxlY3Rcblx0XHRcdFx0LnZhbChcIlwiKVxuXHRcdFx0XHQuc2hvdygpXG5cdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXG5cdFx0XHRpZiAodHlwZW9mIHJlZ2lvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJidWlsZFJlZ2lvblNlbGVjdCgpOiBubyByZWdpb25zIG9iamVjdFwiLCByZWdpb25zKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiByZWdpb25zICE9IFwib2JqZWN0XCIgfHwgcmVnaW9ucy5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcImJ1aWxkUmVnaW9uU2VsZWN0KCk6IGludmFsaWQgcmVnaW9ucyBvYmplY3RcIiwgcmVnaW9ucyk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGpxUmVnaW9uU2VsZWN0Lmxlbmd0aCAhPT0gMSkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gaWRlbnRpZnkgdGhlIHJlZ2lvbiBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBkb21UaGlzT3B0aW9uLCB0aGlzUmVnaW9uO1xuXG5cdFx0XHRcdHZhciByZWdpb25DdHIgPSAwO1xuXG5cdFx0XHRcdGpxUmVnaW9uU2VsZWN0LmVtcHR5KCk7XG5cdFx0XHRcdGRvbVRoaXNPcHRpb24gPSBidWlsZFJlZ2lvbk9wdGlvbihcIlN0YXRlL1JlZ2lvbi4uLlwiLCB7XG5cdFx0XHRcdFx0XCJkYXRhLWxhYmVsLWlkXCI6IFwiZG9ub3IucmVnaW9uUGxhY2Vob2xkZXJcIixcblx0XHRcdFx0XHR2YWx1ZTogXCJcIixcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGpxUmVnaW9uU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzUmVnaW9uID0gcmVnaW9uc1tpXTtcblx0XHRcdFx0XHRkb21UaGlzT3B0aW9uID0gYnVpbGRSZWdpb25PcHRpb24odGhpc1JlZ2lvbi5uYW1lKTtcblx0XHRcdFx0XHRpZiAoZG9tVGhpc09wdGlvbikge1xuXHRcdFx0XHRcdFx0anFSZWdpb25TZWxlY3QuYXBwZW5kKGRvbVRoaXNPcHRpb24pO1xuXHRcdFx0XHRcdFx0cmVnaW9uQ3RyKys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBhZGQgcmVnaW9uOlwiLCB0aGlzUmVnaW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJlZ2lvbkN0ciA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIHJlZ2lvbiBzZWxlY3QgZHJvcGRvd25cIiwgZXJyKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZFJlZ2lvbk9wdGlvbihyZWdpb25OYW1lLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlcyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiYnVpbGRSZWdpb25PcHRpb24oKSBpZ25vcmluZyBpbnZhbGlkIGF0dHJpYnV0ZXMgb2JqZWN0XCIsXG5cdFx0XHRcdFx0YXR0cmlidXRlc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRhdHRyaWJ1dGVzID0ge307XG5cdFx0XHR9XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHJlZ2lvbk5hbWUgPT0gXCJzdHJpbmdcIiAmJiByZWdpb25OYW1lLnRyaW0oKSkge1xuXHRcdFx0XHRcdHZhciBkb21PcHRpb24gPSBudWxsO1xuXHRcdFx0XHRcdGRvbU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IHJlZ2lvbk5hbWU7XG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRcdGRvbU9wdGlvbi5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZG9tT3B0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgb3B0aW9uIGVsZW1lbnQgZm9yIHJlZ2lvbjpcIiwgcmVnaW9uKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkQ291bnRyeVNlbGVjdChvcHRpb25zKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJidWlsZENvdW50cnlTZWxlY3QoKTogaWdub3JpbmcgaW52YWxpZCBvcHRpb24gb2JqZWN0XCIsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGRlZmF1bHRDb3VudHJ5ID1cblx0XHRcdFx0dHlwZW9mIG9wdGlvbnMuZGVmYXVsdCA9PSBcInN0cmluZ1wiID8gb3B0aW9ucy5kZWZhdWx0IDogXCJVbml0ZWQgU3RhdGVzXCI7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIXdpbmRvdy5td2RzcGFjZS52YWxpZENvdW50cnlMaXN0KSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTGlzdCBvZiB2YWxpZCBjb3VudHJpZXMgbm90IGZvdW5kXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBkb21Db3VudHJ5U2VsZWN0ID0ganFDb250YWluZXIuZmluZCgnc2VsZWN0W25hbWU9XCJkb25vckNvdW50cnlcIl0nKTtcblx0XHRcdFx0ZG9tQ291bnRyeVNlbGVjdC5vbihcImNoYW5nZVwiLCBwcmVwYXJlUmVnaW9uSW5wdXQpO1xuXHRcdFx0XHRpZiAoZG9tQ291bnRyeVNlbGVjdC5sZW5ndGggIT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaWRlbnRpZnkgdGhlIGNvdW50cnkgc2VsZWN0IGRyb3Bkb3duXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBkb21UaGlzT3B0aW9uLCB0aGlzQ291bnRyeSwgb2tUb0FkZDtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5td2RzcGFjZS52YWxpZENvdW50cnlMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b2tUb0FkZCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpc0NvdW50cnkgPSB3aW5kb3cubXdkc3BhY2UudmFsaWRDb3VudHJ5TGlzdFtpXTtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5maWx0ZXJMaXN0KSB7XG5cdFx0XHRcdFx0XHRva1RvQWRkID0gZmluZExpc3RNYXRjaChvcHRpb25zLmZpbHRlckxpc3QsIHRoaXNDb3VudHJ5LmNvZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob2tUb0FkZCkge1xuXHRcdFx0XHRcdFx0Ly8gdmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdFx0XHRcdGRvbVRoaXNPcHRpb24gPSBidWlsZENvdW50cnlPcHRpb24odGhpc0NvdW50cnkpO1xuXHRcdFx0XHRcdFx0aWYgKGRvbVRoaXNPcHRpb24pIHtcblx0XHRcdFx0XHRcdFx0ZG9tQ291bnRyeVNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gYWRkIGNvdW50cnk6XCIsIHRoaXNDb3VudHJ5KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZG9tQ291bnRyeVNlbGVjdC52YWwoZGVmYXVsdENvdW50cnkpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgY291bnRyeSBzZWxlY3QgZHJvcGRvd25cIiwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZENvdW50cnlPcHRpb24oY291bnRyeSwgYXR0cmlidXRlcykge1xuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcImJ1aWxkQ291bnRyeU9wdGlvbigpIGlnbm9yaW5nIGludmFsaWQgYXR0cmlidXRlcyBvYmplY3RcIixcblx0XHRcdFx0XHRhdHRyaWJ1dGVzXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdHZhciBkb21PcHRpb24gPSBudWxsO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGNvdW50cnkuY29kZSkge1xuXHRcdFx0XHRcdGRvbU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IGNvdW50cnkubmFtZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIG9wdGlvbiBlbGVtZW50IGZvciBjb3VudHJ5OlwiLCBjb3VudHJ5KTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdGRvbU9wdGlvbi5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbU9wdGlvbjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZENhcmRFeHBpcmVNb250aFNlbGVjdCgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBkb21DYXJkRXhwaXJlTW9udGhTZWxlY3QgPSBqcUNvbnRhaW5lci5maW5kKFxuXHRcdFx0XHRcdCdzZWxlY3RbbmFtZT1cInBheUNhcmRFeHBpcmVNb250aFwiXSdcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGRvbUNhcmRFeHBpcmVNb250aFNlbGVjdC5sZW5ndGggIT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaWRlbnRpZnkgdGhlIGNhcmQgZXhwaXJlIG1vbnRoIHNlbGVjdCBkcm9wZG93blwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBhZGQgcGxhY2Vob2xkZXIgdmFsdWVcblx0XHRcdFx0dmFyIGRvbVRoaXNPcHRpb24gPSBidWlsZENhcmRFeHBpcmVNb250aE9wdGlvbihcIk1vbnRoXCIsIHtcblx0XHRcdFx0XHR2YWx1ZTogXCJcIixcblx0XHRcdFx0XHRcImRhdGEtbGFiZWwtaWRcIjogXCJjYXJkSW5mby5jYXJkRXhwaXJlTW9udGhQbGFjZWhvbGRlclwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZG9tQ2FyZEV4cGlyZU1vbnRoU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0Ly8gYWRkIG1vbnRoc1xuXHRcdFx0XHRmb3IgKHZhciBleHBpcmVNb250aCA9IDE7IGV4cGlyZU1vbnRoIDw9IDEyOyBleHBpcmVNb250aCsrKSB7XG5cdFx0XHRcdFx0ZG9tVGhpc09wdGlvbiA9IGJ1aWxkQ2FyZEV4cGlyZU1vbnRoT3B0aW9uKGV4cGlyZU1vbnRoKTtcblx0XHRcdFx0XHRpZiAoZG9tVGhpc09wdGlvbikge1xuXHRcdFx0XHRcdFx0ZG9tQ2FyZEV4cGlyZU1vbnRoU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGFkZCBjYXJkIGV4cGlyZSBtb250aDpcIiwgZXhwaXJlTW9udGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIGNhcmQgZXhwaXJlIG1vbnRoIHNlbGVjdCBkcm9wZG93blwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkQ2FyZEV4cGlyZU1vbnRoT3B0aW9uKG1vbnRoLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlcyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiYnVpbGRSZWdpb25PcHRpb24oKSBpZ25vcmluZyBpbnZhbGlkIGF0dHJpYnV0ZXMgb2JqZWN0XCIsXG5cdFx0XHRcdFx0YXR0cmlidXRlc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRhdHRyaWJ1dGVzID0ge307XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkb21PcHRpb24gPSBudWxsO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHR5cGVvZiBtb250aCAhPSBcIm51bWJlclwiICYmIHR5cGVvZiBtb250aCAhPSBcInN0cmluZ1wiICYmICFtb250aCkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIG1vbnRoIGdpdmVuOlwiLCBtb250aCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciB0ZW1wSW50ID0gcGFyc2VJbnQobW9udGgpO1xuXHRcdFx0XHRcdFx0aWYgKCFpc05hTih0ZW1wSW50KSAmJiB0ZW1wSW50ID49IDAgJiYgdGVtcEludCA8IDEwKSB7XG5cdFx0XHRcdFx0XHRcdG1vbnRoID0gXCIwXCIgKyB0ZW1wSW50O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblxuXHRcdFx0XHRcdGRvbU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRcdGRvbU9wdGlvbi5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb21PcHRpb24uaW5uZXJUZXh0ID0gbW9udGg7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBvcHRpb24gZWxlbWVudCBmb3IgbW9udGg6XCIsIG1vbnRoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb21PcHRpb247XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDYXJkRXhwaXJlWWVhclNlbGVjdCgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIHNob3cgb25seSBjdXJyZW50IHllYXIgYW5kIGJleW9uZCAod2l0aCBzb21lIGZ1ZGdlIGZhY3Rvcilcblx0XHRcdFx0dmFyIHJlY2VudERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRyZWNlbnREYXRlLnNldERhdGUocmVjZW50RGF0ZS5nZXREYXRlKCkgLSA3KTtcblx0XHRcdFx0dmFyIHN0YXJ0WWVhciA9IHJlY2VudERhdGUuZ2V0RnVsbFllYXIoKTtcblx0XHRcdFx0dmFyIHllYXJzVG9TaG93ID0gMjA7XG5cblx0XHRcdFx0dmFyIGRvbUNhcmRFeHBpcmVZZWFyU2VsZWN0ID0ganFDb250YWluZXIuZmluZChcblx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJwYXlDYXJkRXhwaXJlWWVhclwiXSdcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGRvbUNhcmRFeHBpcmVZZWFyU2VsZWN0Lmxlbmd0aCAhPT0gMSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBpZGVudGlmeSB0aGUgY2FyZCBleHBpcmUgeWVhciBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gYWRkIHBsYWNlaG9sZGVyIHZhbHVlXG5cdFx0XHRcdHZhciBkb21UaGlzT3B0aW9uID0gYnVpbGRDYXJkRXhwaXJlWWVhck9wdGlvbihcIlllYXJcIiwge1xuXHRcdFx0XHRcdHZhbHVlOiBcIlwiLFxuXHRcdFx0XHRcdFwiZGF0YS1sYWJlbC1pZFwiOiBcImNhcmRJbmZvLmNhcmRFeHBpcmVZZWFyUGxhY2Vob2xkZXJcIixcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGRvbUNhcmRFeHBpcmVZZWFyU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0Ly8gYWRkIHllYXJzXG5cdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0dmFyIGV4cGlyZVllYXIgPSBzdGFydFllYXI7XG5cdFx0XHRcdFx0ZXhwaXJlWWVhciA8IHN0YXJ0WWVhciArIHllYXJzVG9TaG93O1xuXHRcdFx0XHRcdGV4cGlyZVllYXIrK1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRkb21UaGlzT3B0aW9uID0gYnVpbGRDYXJkRXhwaXJlWWVhck9wdGlvbihleHBpcmVZZWFyKTtcblx0XHRcdFx0XHRpZiAoZG9tVGhpc09wdGlvbikge1xuXHRcdFx0XHRcdFx0ZG9tQ2FyZEV4cGlyZVllYXJTZWxlY3QuYXBwZW5kKGRvbVRoaXNPcHRpb24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gYWRkIGNhcmQgZXhwaXJlIHllYXI6XCIsIGV4cGlyZVllYXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIGNhcmQgZXhwaXJlIHllYXIgc2VsZWN0IGRyb3Bkb3duXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDYXJkRXhwaXJlWWVhck9wdGlvbih5ZWFyLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlcyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiYnVpbGRSZWdpb25PcHRpb24oKSBpZ25vcmluZyBpbnZhbGlkIGF0dHJpYnV0ZXMgb2JqZWN0XCIsXG5cdFx0XHRcdFx0YXR0cmlidXRlc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRhdHRyaWJ1dGVzID0ge307XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkb21PcHRpb24gPSBudWxsO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHR5cGVvZiB5ZWFyICE9IFwibnVtYmVyXCIgJiYgdHlwZW9mIHllYXIgIT0gXCJzdHJpbmdcIiAmJiAheWVhcikge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHllYXIgZ2l2ZW46XCIsIHllYXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0geWVhcjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkb21PcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0XHRkb21PcHRpb24uc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IHllYXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBvcHRpb24gZWxlbWVudCBmb3IgeWVhcjpcIiwgeWVhcik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZG9tT3B0aW9uO1xuXHRcdH1cblxuXHRcdGFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tcGFueU1hdGNoU2VsZWN0KCkge1xuXHRcdFx0aWYgKHRoaXNXaWRnZXQucHJvbWlzZXMuc3ByZWVkbHlJZnJhbWVTY3JpcHQpIHtcblx0XHRcdFx0YXdhaXQgdGhpc1dpZGdldC5wcm9taXNlcy5zcHJlZWRseUlmcmFtZVNjcmlwdDtcblx0XHRcdH1cblx0XHRcdHZhciB0aGVMYWJlbCA9IFwiU2VhcmNoIGJ5IGNvbXBhbnkgbmFtZVwiO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5kb25vci5tYXRjaENvbXBhbnlQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRcdHRoZUxhYmVsID0gdGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmRvbm9yLm1hdGNoQ29tcGFueVBsYWNlaG9sZGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHt9XG5cblx0XHRcdHZhciBqcU1hdGNoU2VsZWN0ID0ganEoJ3NlbGVjdFtuYW1lPVwiZG9ub3JNYXRjaENvbXBhbnlcIl0nKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBqcU1hdGNoU2VsZWN0LnNlbGVjdDIgIT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIlNLSVBQSU5HIENPTVBBTlkgTUFUQ0ggU01BUlQgU0VMRUNUT1JcIik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0anFNYXRjaFNlbGVjdC5zZWxlY3QyKHtcblx0XHRcdFx0bWluaW11bUlucHV0TGVuZ3RoOiAzLFxuXHRcdFx0XHRkZWxheTogNDAwLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogdGhlTGFiZWwsXG5cdFx0XHRcdHdpZHRoOiBcIjEwMCVcIixcblx0XHRcdFx0YWpheDoge1xuXHRcdFx0XHRcdHVybDogXCJodHRwczovL3BsYXRmb3JtLmZ1bnJhaXNlLmlvL2FwaS92MS9kZGNvbXBhbmllc1wiLFxuXHRcdFx0XHRcdGRhdGE6IGZ1bmN0aW9uKHBhcmFtcykge1xuXHRcdFx0XHRcdFx0dmFyIHF1ZXJ5ID0ge1xuXHRcdFx0XHRcdFx0XHRxOiBwYXJhbXMudGVybSxcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZXR1cm4gcXVlcnk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0dmFyIHJldHVybk9iamVjdCA9IHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0czogW10sXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIiAmJiBkYXRhLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YVtpXS5uYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5PYmplY3QucmVzdWx0cy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWQ6IGRhdGFbaV0ubmFtZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGV4dDogZGF0YVtpXS5uYW1lLFxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmV0dXJuT2JqZWN0O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRhc3luYyBmdW5jdGlvbiBzZXR1cFNwcmVlZGx5KCkge1xuXHRcdFx0aWYgKHRoaXNXaWRnZXQucHJvbWlzZXMuc3ByZWVkbHlJZnJhbWVTY3JpcHQpIHtcblx0XHRcdFx0YXdhaXQgdGhpc1dpZGdldC5wcm9taXNlcy5zcHJlZWRseUlmcmFtZVNjcmlwdDtcblx0XHRcdFx0U3ByZWVkbHkub24oXCJyZWFkeVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvL2Zvcm1hdCBjYXJkIG51bWJlclxuXHRcdFx0XHRcdFNwcmVlZGx5LnNldFBsYWNlaG9sZGVyKFwibnVtYmVyXCIsIFwiQ2FyZFwiKTtcblx0XHRcdFx0XHRTcHJlZWRseS5zZXRGaWVsZFR5cGUoXCJudW1iZXJcIiwgXCJ0ZXh0XCIpO1xuXHRcdFx0XHRcdFNwcmVlZGx5LnNldE51bWJlckZvcm1hdChcInByZXR0eUZvcm1hdFwiKTtcblxuXHRcdFx0XHRcdC8vZm9ybWF0IGN2dlxuXHRcdFx0XHRcdFNwcmVlZGx5LnNldFBsYWNlaG9sZGVyKFwiY3Z2XCIsIFwiY3Z2XCIpO1xuXG5cdFx0XHRcdFx0c2V0U3ByZWVkbHlMYWJlbHMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFNwcmVlZGx5Lm9uKFwicGF5bWVudE1ldGhvZFwiLCBmdW5jdGlvbih0b2tlbiwgcmVzdWx0KSB7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJcXG5cXG5TUFJFRURMWSBQQVlNRU5UIFRPS0VOSVpFRFwiLCByZXN1bHQpO1xuXG5cdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGEucGF5bWVudFRva2VuID0gdG9rZW47XG5cblx0XHRcdFx0XHRzZW5kVHJhbnNhY3Rpb24oKTtcblxuXHRcdFx0XHRcdC8vIFBST0NFU1MgRVJST1IgQ0hFQ0sgTkVFREVEXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRTcHJlZWRseS5vbihcImVycm9yc1wiLCBmdW5jdGlvbihlcnJvcnMpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlxcblxcblNQUkVFRExZIFJFUE9SVFMgRVJST1JTOlwiKTtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVycm9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGVycm9yID0gZXJyb3JzW2ldO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBQUk9DRVNTIEVSUk9SIENIRUNLIE5FRURFRFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0U3ByZWVkbHkub24oXCJmaWVsZEV2ZW50XCIsIGZ1bmN0aW9uKG5hbWUsIHR5cGUsIGFjdGl2ZUVsLCByZXNwb25zZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlID09IFwiaW5wdXRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEuaGFzVmFsaWRDYXJkTnVtYmVyID1cblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UudmFsaWROdW1iZXIgfHwgZmFsc2U7XG5cdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5oYXNWYWxpZENhcmRDdnYgPVxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZS52YWxpZEN2diB8fCBmYWxzZTtcblx0XHRcdFx0XHRcdHdpbmRvdy5td2RzcGFjZS51c2VySW5wdXREYXRhLnBheUNhcmRUeXBlID0gcmVzcG9uc2UuY2FyZFR5cGUgfHwgZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAobmFtZSA9PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS52YWxpZE51bWJlcikge1xuXHRcdFx0XHRcdFx0XHRcdGpxQ2FyZE51bWJlckZlZWRiYWNrXG5cdFx0XHRcdFx0XHRcdFx0XHQuZmluZChcInNwYW4uY2FyZE51bWJlclZhbGlkaXR5XCIpXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJpbnZhbGlkXCIpXG5cdFx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoXCJ2YWxpZFwiKVxuXHRcdFx0XHRcdFx0XHRcdFx0Lmh0bWwoJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT4nKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRqcUNhcmROdW1iZXJGZWVkYmFja1xuXHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoXCJzcGFuLmNhcmROdW1iZXJWYWxpZGl0eVwiKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKFwidmFsaWRcIilcblx0XHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhcImludmFsaWRcIilcblx0XHRcdFx0XHRcdFx0XHRcdC5odG1sKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4nKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YXIgaWNvbkh0bWw7XG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAocmVzcG9uc2UuY2FyZFR5cGUpIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwidmlzYVwiOlxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkh0bWwgPSBwYXlNZXRob2RJY29uSHRtbC52aXNhO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIm1hc3RlclwiOlxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkh0bWwgPSBwYXlNZXRob2RJY29uSHRtbC5tYXN0ZXJjYXJkO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcImFtZXJpY2FuX2V4cHJlc3NcIjpcblx0XHRcdFx0XHRcdFx0XHRcdGljb25IdG1sID0gcGF5TWV0aG9kSWNvbkh0bWwuYW1leDtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJkaXNjb3ZlclwiOlxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkh0bWwgPSBwYXlNZXRob2RJY29uSHRtbC5kaXNjb3Zlcjtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRpY29uSHRtbCA9IHBheU1ldGhvZEljb25IdG1sLmNhcmQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0anFDYXJkTnVtYmVyRmVlZGJhY2suZmluZChcInNwYW4uY2FyZFR5cGVcIikuaHRtbChpY29uSHRtbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0U3ByZWVkbHkuaW5pdChwYXltZW50VG9rZW5pemVySWQsIHtcblx0XHRcdFx0XHRudW1iZXJFbDogXCJjYXJkTnVtYmVyVGFyZ2V0XCIsXG5cdFx0XHRcdFx0Y3Z2RWw6IFwiY2FyZEN2dlRhcmdldFwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTcHJlZWRseSBsb2FkIG5vdCBmb3VuZCAtIFNraXBwaW5nIFNwcmVlZGx5IHNldHVwXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldFNwcmVlZGx5TGFiZWxzKCkge1xuXHRcdFx0aWYgKHR5cGVvZiBTcHJlZWRseSA9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdHZhciBsYWJlbENhcmQgPSBcIkNhcmRcIjtcblx0XHRcdFx0dmFyIGxhYmVsQ3Z2ID0gXCJjdnZcIjtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmNhcmRJbmZvLmNhcmROdW1iZXJQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRcdFx0bGFiZWxDYXJkID0gdGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmNhcmRJbmZvLmNhcmROdW1iZXJQbGFjZWhvbGRlcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmNhcmRJbmZvLmN2dlBsYWNlaG9sZGVyKSB7XG5cdFx0XHRcdFx0XHRsYWJlbEN2diA9IHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5jYXJkSW5mby5jdnZQbGFjZWhvbGRlcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0U3ByZWVkbHkuc2V0UGxhY2Vob2xkZXIoXCJudW1iZXJcIiwgbGFiZWxDYXJkKTtcblx0XHRcdFx0U3ByZWVkbHkuc2V0UGxhY2Vob2xkZXIoXCJjdnZcIiwgbGFiZWxDdnYpO1xuXG5cdFx0XHRcdFNwcmVlZGx5LnNldFN0eWxlKFwibnVtYmVyXCIsIFwiZm9udC1zaXplOjE2cHg7Y29sb3I6IzMzMztcIik7XG5cdFx0XHRcdFNwcmVlZGx5LnNldFN0eWxlKFwiY3Z2XCIsIFwiZm9udC1zaXplOjE2cHg7Y29sb3I6IzMzMztcIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG9rZW5pemVVc2VyQ2FyZCgpIHtcblx0XHRcdC8vIHRva2VuaXplIG9ubHkgd2hlbiBhbGwgZmllbGRzIGFyZSByZWFkeVxuXHRcdFx0Ly8gd2hlbiBzdWNjZXNzZnVsLCB0aGlzIHdpbGwgcG9wdWxhdGUgdXNlcklucHV0RGF0YS5wYXltZW50VG9rZW4gZmllbGRcblxuXHRcdFx0Ly8gUFJPQ0VTUyBFUlJPUiBDSEVDSyBORUVERURcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHR1c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZE51bWJlciAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZEN2diAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVNb250aCAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lICYmXG5cdFx0XHRcdHVzZXJJbnB1dERhdGEuZG9ub3JMYXN0TmFtZSAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVZZWFyXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBTcHJlZWRseSA9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0dmFyIHRva2VuT3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdC8vIFJlcXVpcmVkXG5cdFx0XHRcdFx0XHRmaXJzdF9uYW1lOiB1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lLFxuXHRcdFx0XHRcdFx0bGFzdF9uYW1lOiB1c2VySW5wdXREYXRhLmRvbm9yTGFzdE5hbWUsXG5cdFx0XHRcdFx0XHRtb250aDogdXNlcklucHV0RGF0YS5wYXlDYXJkRXhwaXJlTW9udGgsXG5cdFx0XHRcdFx0XHR5ZWFyOiB1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVZZWFyLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8gT3B0aW9uYWxcblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vckVtYWlsKSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuZW1haWwgPSB1c2VySW5wdXREYXRhLmRvbm9yRW1haWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VySW5wdXREYXRhLmRvbm9yUGhvbmUpIHtcblx0XHRcdFx0XHRcdHRva2VuT3B0aW9ucy5waG9uZV9udW1iZXIgPSB1c2VySW5wdXREYXRhLmRvbm9yUGhvbmU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VySW5wdXREYXRhLmRvbm9yU3RyZWV0KSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuYWRkcmVzczEgPSB1c2VySW5wdXREYXRhLmRvbm9yU3RyZWV0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vckNpdHkpIHtcblx0XHRcdFx0XHRcdHRva2VuT3B0aW9ucy5jaXR5ID0gdXNlcklucHV0RGF0YS5kb25vckNpdHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VySW5wdXREYXRhLmRvbm9yUmVnaW9uKSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuc3RhdGUgPSB1c2VySW5wdXREYXRhLmRvbm9yUmVnaW9uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vclBvc3RDb2RlKSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuemlwID0gdXNlcklucHV0RGF0YS5kb25vclBvc3RDb2RlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vckNvdW50cnkpIHtcblx0XHRcdFx0XHRcdHRva2VuT3B0aW9ucy5jb3VudHJ5ID0gdXNlcklucHV0RGF0YS5kb25vckNvdW50cnk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCI+PiBDQUxMSU5HIHRva2VuaXplQ3JlZGl0Q2FyZFwiLCB0b2tlbk9wdGlvbnMpO1xuXHRcdFx0XHRcdFNwcmVlZGx5LnRva2VuaXplQ3JlZGl0Q2FyZCh0b2tlbk9wdGlvbnMpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJOTyBTUFJFRURMWSBPQkpFQ1RcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTUFJFRURMWSBGSUVMRCBOT1QgUkVBRFlcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZmluZExpc3RNYXRjaCh0aGVMaXN0LCBtYXRjaFN0cmluZykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVMaXN0Lmxlbmd0aDsgaSsrKSB7fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHByZXBBbmRTaG93UHJvY2Vzc2luZ1N0ZXAoKSB7XG5cdFx0XHR2YXIgaWNvbkh0bWwgPSBcIlwiO1xuXG5cdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEucGF5TWV0aG9kID09IFwiYml0Y29pblwiKSB7XG5cdFx0XHRcdGljb25IdG1sID0gcGF5TWV0aG9kSWNvbkh0bWwuYml0Y29pbjtcblx0XHRcdH0gZWxzZSBpZiAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEucGF5TWV0aG9kID09IFwiY2FyZFwiKSB7XG5cdFx0XHRcdHN3aXRjaCAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEucGF5Q2FyZFR5cGUpIHtcblx0XHRcdFx0XHRjYXNlIFwidmlzYVwiOlxuXHRcdFx0XHRcdFx0aWNvbkh0bWwgPSBwYXlNZXRob2RJY29uSHRtbC52aXNhO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIm1hc3RlcmNhcmRcIjpcblx0XHRcdFx0XHRjYXNlIFwibWFzdGVyXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIm1jXCI6XG5cdFx0XHRcdFx0XHRpY29uSHRtbCA9IHBheU1ldGhvZEljb25IdG1sLm1hc3RlcmNhcmQ7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiYW1leFwiOlxuXHRcdFx0XHRcdGNhc2UgXCJhbWVyaWNhbl9leHByZXNzXCI6XG5cdFx0XHRcdFx0Y2FzZSBcImFtZXJpY2FuZXhwcmVzc1wiOlxuXHRcdFx0XHRcdFx0aWNvbkh0bWwgPSBwYXlNZXRob2RJY29uSHRtbC5hbWV4O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImRpc2NvdmVyXCI6XG5cdFx0XHRcdFx0Y2FzZSBcImRpc2NcIjpcblx0XHRcdFx0XHRcdGljb25IdG1sID0gcGF5TWV0aG9kSWNvbkh0bWwuZGlzY292ZXI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIganFTdGVwID0ganFDb250YWluZXIuZmluZCgnc2VjdGlvbltkYXRhLXN0ZXAtbmFtZT1cInByb2Nlc3NpbmdcIl0nKTtcblx0XHRcdGpxU3RlcC5maW5kKFwic3Bhbi5wcm9jZXNzaW5nUGF5U3ltYm9sXCIpLmh0bWwoaWNvbkh0bWwpO1xuXG5cdFx0XHRzaG93U3RlcChcInByb2Nlc3NpbmdcIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJlcEFuZFNob3dCaXRjb2luU3RlcChpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcInByZXBBbmRTaG93Qml0Y29pblN0ZXAoKSBnaXZlbiBpbnZhbGlkIGlucHV0XCIsIGlucHV0KTtcblx0XHRcdFx0cHJlcEFuZFNob3dFcnJvclN0ZXAoXCJVbmFibGUgdG8gZGlzcGxheSBCaXRjb2luIGludm9pY2Ugc2NyZWVuXCIpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIganFTdGVwID0ganFDb250YWluZXIuZmluZCgnc2VjdGlvbltkYXRhLXN0ZXAtbmFtZT1cImJpdGNvaW5JbnZvaWNlXCJdJyk7XG5cblx0XHRcdGpxU3RlcC5maW5kKFwic3Bhbi5iaXRjb2luU3RhdHVzXCIpLmh0bWwoaW5wdXQuaW52b2ljZV9zdGF0dXMpO1xuXHRcdFx0anFTdGVwXG5cdFx0XHRcdC5maW5kKFwiaW1nLnNjYW5Db2RlXCIpXG5cdFx0XHRcdC5hdHRyKFwic3JjXCIsIFwiZGF0YTppbWFnZS9wbmc7Y2hhcnNldD11dGYtODtiYXNlNjQsXCIgKyBpbnB1dC5pbWdfZGF0YSk7XG5cdFx0XHRqcVN0ZXAuZmluZChcInNwYW4uYml0Y29pbkFtb3VudFwiKS5odG1sKGlucHV0LmFsdF9hbW91bnQpO1xuXHRcdFx0anFTdGVwLmZpbmQoXCJzcGFuLmJpdGNvaW5XYWxsZXRMaW5rXCIpLmh0bWwoaW5wdXQuY2hlY2tvdXRfdXJsKTtcblx0XHRcdGpxU3RlcC5maW5kKFwiYS5iaXRjb2luV2FsbGV0TGlua1wiKS5hdHRyKFwiaHJlZlwiLCBpbnB1dC5jaGVja291dF91cmwpO1xuXG5cdFx0XHQvLyBrZWVwIGV4cGlyZSBjb3VudGRvd24gdGltZXIgdXBkYXRlZFxuXHRcdFx0dXBkYXRlQml0Y29pblRpbWVyKGlucHV0LmV4cCk7XG5cdFx0XHR0aGlzV2lkZ2V0LmludGVydmFscy5iaXRjb2luVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdFx0dXBkYXRlQml0Y29pblRpbWVyKGlucHV0LmV4cCk7XG5cdFx0XHR9LCAxMDAwKTtcblxuXHRcdFx0c2hvd1N0ZXAoXCJiaXRjb2luSW52b2ljZVwiKTtcblxuXHRcdFx0Ly8gd2F0Y2ggZm9yIHBheW1lbnQgY29tcGxldGlvbiBvbiBCaXRjb2luIHNpZGVcblx0XHRcdHRoaXNXaWRnZXQuaW50ZXJ2YWxzLmJpdGNvaW5TdGF0dXNDaGVja2VyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoaW5wdXQudHJhbnNhY3Rpb25faWQpO1xuXHRcdFx0fSwgMzAwMDApO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUJpdGNvaW5UaW1lcihleHBpcmVUaW1lKSB7XG5cdFx0XHRpZiAodHlwZW9mIGV4cGlyZVRpbWUgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgZXhwaXJlVGltZSA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZGlzcGxheUNvdW50ZG93biA9IFwiVW5rbm93biB0aW1lXCI7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgbWludXRlcyA9IDA7XG5cdFx0XHRcdHZhciBzZWNvbmRzID0gMDtcblxuXHRcdFx0XHR2YXIgZXhwaXJlRGF0ZSA9IG5ldyBEYXRlKGV4cGlyZVRpbWUpLmdldFRpbWUoKTtcblx0XHRcdFx0dmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0XHRcdHZhciBtaW51dGVzUmVtYWluaW5nID0gKGV4cGlyZURhdGUgLSBub3cpIC8gMTAwMCAvIDYwO1xuXG5cdFx0XHRcdGlmIChtaW51dGVzUmVtYWluaW5nID4gMCkge1xuXHRcdFx0XHRcdG1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzUmVtYWluaW5nKTtcblx0XHRcdFx0XHRzZWNvbmRzID0gcGFyc2VJbnQoKG1pbnV0ZXNSZW1haW5pbmcgLSBtaW51dGVzKSAqIDYwKTtcblxuXHRcdFx0XHRcdGlmIChtaW51dGVzUmVtYWluaW5nIDwgMikge1xuXHRcdFx0XHRcdFx0anFCaXRjb2luVGltZVJlbWFpbmluZ1xuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdChcImRpdi5iaXRjb2luU3RhdHVzRGlzcGxheVwiKVxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoXCJ3YXJuaW5nXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqcUJpdGNvaW5UaW1lUmVtYWluaW5nXG5cdFx0XHRcdFx0XHQuY2xvc2VzdChcImRpdi5iaXRjb2luU3RhdHVzRGlzcGxheVwiKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFwiZXJyb3JcIik7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzV2lkZ2V0LmludGVydmFscy5iaXRjb2luVGltZXIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNlY29uZHMgPCAxMCkge1xuXHRcdFx0XHRcdHNlY29uZHMgPSBcIjBcIiArIHNlY29uZHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGlzcGxheUNvdW50ZG93biA9IG1pbnV0ZXMudG9GaXhlZCgpICsgXCI6XCIgKyBzZWNvbmRzO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcInVwZGF0ZUJpdGNvaW5UaW1lcigpIGNhdWdodCBlcnJvclwiLCBlcnIubWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0XHRqcUJpdGNvaW5UaW1lUmVtYWluaW5nLmh0bWwoZGlzcGxheUNvdW50ZG93bik7XG5cdFx0fVxuXG5cdFx0YXN5bmMgZnVuY3Rpb24gY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cyhpbnB1dCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCI+Pj4gY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpXCIpO1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcImNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoKSBnaXZlbiBlbXB0eSB1cmxcIik7XG5cdFx0XHRcdHZhciBpbnB1dCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBiYXNlSW52b2ljZVVybCA9IFwiaHR0cHM6Ly9iaXRwYXkuY29tL2ludm9pY2VzL1wiO1xuXHRcdFx0dmFyIGpxQml0Y29pbkNvbnRhaW5lciA9IGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuYml0Y29pbkNvbnRhaW5lclwiKTtcblxuXHRcdFx0dmFyIHJlc3BvbnNlO1xuXG5cdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLmdldFVybFBhcmFtZXRlcihcImRhdGFcIikgPT0gXCJsaXZlXCIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJTRU5ESU5HIExJVkUgUE9MTCBSRVFVRVNUXCIpO1xuXHRcdFx0XHRyZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIj4+PiBjaGVja0JpdGNvaW5QYXltZW50U3RhdHVzKCkgSU5TSURFIFBST01JU0VcIik7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcdFwiY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpIGdpdmVuIGludmFsaWQgdXJsIHR5cGU6XCIsXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBpbnB1dCxcblx0XHRcdFx0XHRcdFx0aW5wdXRcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKG51bGwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoKSBzdGFydDpcIiwgaW5wdXQpO1xuXHRcdFx0XHRcdHZhciByZXF1ZXN0VXJsID0gZW5jb2RlVVJJKGJhc2VJbnZvaWNlVXJsICsgaW5wdXQpO1xuXHRcdFx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdFx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJGSUxFIExPQURFRDpcIiwgZXZlbnQpO1xuXHRcdFx0XHRcdFx0dmFyIGZpbGVDb250ZW50cyA9XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldC5yZXNwb25zZVRleHQgfHwgZXZlbnQudGFyZ2V0LnJlc3BvbnNlIHx8IG51bGw7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9iamVjdCA9IHdpbmRvdy5td2RzcGFjZS5zaGFyZWRVdGlscy5zYWZlSnNvblBhcnNlKFxuXHRcdFx0XHRcdFx0XHRmaWxlQ29udGVudHNcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGlmICghdGVtcE9iamVjdCB8fCAhdGVtcE9iamVjdC5kYXRhKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpOiBpbnZhbGlkIHJlc3BvbnNlXCIsIGV2ZW50KTtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wT2JqZWN0LmRhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpIEVSUk9SIEVWRU5UXCIsXG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RVcmwsXG5cdFx0XHRcdFx0XHRcdGV2ZW50XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcdFwiY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpIEFCT1JUIEVWRU5UXCIsXG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RVcmwsXG5cdFx0XHRcdFx0XHRcdGV2ZW50XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHhoci5vcGVuKFwiZ2V0XCIsIHJlcXVlc3RVcmwsIHRydWUpO1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblx0XHRcdFx0XHR4aHIuc2VuZCgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3BvbnNlID0ge1xuXHRcdFx0XHRcdHVybDogXCJodHRwczovL2JpdHBheS5jb20vaW52b2ljZT9pZD1HOHBUWHFDNnd6OGhBeVI1RXpETTJYXCIsXG5cdFx0XHRcdFx0c3RhdHVzOiBcImNvbXBsZXRlXCIsXG5cdFx0XHRcdFx0cHJpY2U6IDUsXG5cdFx0XHRcdFx0Y3VycmVuY3k6IFwiVVNEXCIsXG5cdFx0XHRcdFx0b3JkZXJJZDogXCI2NDQzNTNcIixcblx0XHRcdFx0XHRpbnZvaWNlVGltZTogMTUzMDgxMjM0NDk2OSxcblx0XHRcdFx0XHRleHBpcmF0aW9uVGltZTogMTUzMDgxMzI0NDk2OSxcblx0XHRcdFx0XHRjdXJyZW50VGltZTogMTUzMDgxMjc0OTU1NSxcblx0XHRcdFx0XHRndWlkOiBcIjk5MDQ0MDUxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiRzhwVFhxQzZ3ejhoQXlSNUV6RE0yWFwiLFxuXHRcdFx0XHRcdGxvd0ZlZURldGVjdGVkOiBmYWxzZSxcblx0XHRcdFx0XHRhbW91bnRQYWlkOiAwLFxuXHRcdFx0XHRcdGV4Y2VwdGlvblN0YXR1czogZmFsc2UsXG5cdFx0XHRcdFx0cmVmdW5kQWRkcmVzc1JlcXVlc3RQZW5kaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRidXllclByb3ZpZGVkSW5mbzoge30sXG5cdFx0XHRcdFx0cGF5bWVudFN1YnRvdGFsczoge1xuXHRcdFx0XHRcdFx0QkNIOiA2Nzk4MDAsXG5cdFx0XHRcdFx0XHRCVEM6IDc2MTAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cGF5bWVudFRvdGFsczoge1xuXHRcdFx0XHRcdFx0QkNIOiA2Nzk4MDAsXG5cdFx0XHRcdFx0XHRCVEM6IDc3NzAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXhjaGFuZ2VSYXRlczoge1xuXHRcdFx0XHRcdFx0QkNIOiB7XG5cdFx0XHRcdFx0XHRcdEJUQzogMC4xMTE5Mzg0ODEzOTI1Mzg3Myxcblx0XHRcdFx0XHRcdFx0VVNEOiA3MzUuNTUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0QlRDOiB7XG5cdFx0XHRcdFx0XHRcdEJDSDogOC45MzMxMDA0MTA1NjAzNzMsXG5cdFx0XHRcdFx0XHRcdFVTRDogNjU3MS4wMDk5OTk5OTk5OTksXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3VwcG9ydGVkVHJhbnNhY3Rpb25DdXJyZW5jaWVzOiB7XG5cdFx0XHRcdFx0XHRCQ0g6IHtcblx0XHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRCVEM6IHtcblx0XHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtaW5lckZlZXM6IHtcblx0XHRcdFx0XHRcdEJDSDoge1xuXHRcdFx0XHRcdFx0XHR0b3RhbEZlZTogMCxcblx0XHRcdFx0XHRcdFx0c2F0b3NoaXNQZXJCeXRlOiAwLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdEJUQzoge1xuXHRcdFx0XHRcdFx0XHR0b3RhbEZlZTogMTYwMCxcblx0XHRcdFx0XHRcdFx0c2F0b3NoaXNQZXJCeXRlOiAxMS4xNzksXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cGF5bWVudENvZGVzOiB7XG5cdFx0XHRcdFx0XHRCQ0g6IHtcblx0XHRcdFx0XHRcdFx0QklQNzJiOlxuXHRcdFx0XHRcdFx0XHRcdFwiYml0Y29pbmNhc2g6P3I9aHR0cHM6Ly9iaXRwYXkuY29tL2kvRzhwVFhxQzZ3ejhoQXlSNUV6RE0yWFwiLFxuXHRcdFx0XHRcdFx0XHRCSVA3MzogXCJodHRwczovL2JpdHBheS5jb20vaS9HOHBUWHFDNnd6OGhBeVI1RXpETTJYXCIsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0QlRDOiB7XG5cdFx0XHRcdFx0XHRcdEJJUDcyYjogXCJiaXRjb2luOj9yPWh0dHBzOi8vYml0cGF5LmNvbS9pL0c4cFRYcUM2d3o4aEF5UjVFekRNMlhcIixcblx0XHRcdFx0XHRcdFx0QklQNzM6IFwiaHR0cHM6Ly9iaXRwYXkuY29tL2kvRzhwVFhxQzZ3ejhoQXlSNUV6RE0yWFwiLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGJ0Y1ByaWNlOiBcIjAuMDAwNzYxXCIsXG5cdFx0XHRcdFx0dG9rZW46IFwiNXVxZUE4NG5Ya0Z5WURBazJ5VzNSWlVvM1hwcWZWYU5xMjV2NkhqTncyN0V0eGNOb05qQ2V0WkJoODM3NXEyckhcIixcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFyZXNwb25zZSkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZUh0bWwgPVxuXHRcdFx0XHRcdFwiPGRpdiBjbGFzcz0nc3BhY2luZ0NvbnRhaW5lciBlcnJvcic+V2FybmluZzogVW5hYmxlIHRvIGNoZWNrIHRoZSBzdGF0dXMgb2YgdGhpcyBpbnZvaWNlIChcIiArXG5cdFx0XHRcdFx0bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSArXG5cdFx0XHRcdFx0XCIpLiBXaWxsIHRyeSBhZ2FpbiBzaG9ydGx5LjwvZGl2PlwiO1xuXHRcdFx0XHRqcUJpdGNvaW5Db250YWluZXIuZmluZChcImRpdi5iaXRjb2luRmVlZGJhY2tcIikuaHRtbChtZXNzYWdlSHRtbCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc29sZS5sb2coXCJjaGVja0JpdGNvaW5QYXltZW50U3RhdHVzKCkgUkVTUE9OU0VcIiwgcmVzcG9uc2UpO1xuXG5cdFx0XHRqcUJpdGNvaW5Db250YWluZXIuZmluZChcImRpdi5iaXRjb2luU3RhdHVzXCIpLmh0bWwocmVzcG9uc2Uuc3RhdHVzKTtcblxuXHRcdFx0c3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcblx0XHRcdFx0Y2FzZSBcInBhaWRcIjpcblx0XHRcdFx0Y2FzZSBcImNvbmZpcm1lZFwiOlxuXHRcdFx0XHRjYXNlIFwiY29tcGxldGVcIjpcblx0XHRcdFx0XHRwcmVwQW5kU2hvd0NvbmZpcm1hdGlvblN0ZXAoKTtcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRoaXNXaWRnZXQuaW50ZXJ2YWxzLmJpdGNvaW5TdGF0dXNDaGVja2VyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImV4cGlyZWRcIjpcblx0XHRcdFx0XHRwcmVwQW5kU2hvd0Vycm9yU3RlcChcblx0XHRcdFx0XHRcdFwiVGhlIEJpdGNvaW4gaW52b2ljZSBleHBpcmVkIGJlZm9yZSBwYXltZW50IHdhcyByZWNlaXZlZC5cIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzV2lkZ2V0LmludGVydmFscy5iaXRjb2luU3RhdHVzQ2hlY2tlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJpbnZhbGlkXCI6XG5cdFx0XHRcdFx0dmFyIGRvbU1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRcdGRvbU1lc3NhZ2UuaW5uZXJIVE1MID1cblx0XHRcdFx0XHRcdFwiVGhlIGludm9pY2UgcmVjZWl2ZWQgcGF5bWVudHMsIGJ1dCBpcyBsaXN0ZWQgYXMgaW52YWxpZC5cIjtcblx0XHRcdFx0XHRqcShkb21NZXNzYWdlKS5hZGRDbGFzcyhcInNwYWNpbmdDb250YWluZXIgZXJyb3JcIik7XG5cdFx0XHRcdFx0anFCaXRjb2luQ29udGFpbmVyLmZpbmQoXCJkaXYuYml0Y29pbkZlZWRiYWNrXCIpLmFwcGVuZChkb21NZXNzYWdlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwcmVwQW5kU2hvd0NvbmZpcm1hdGlvblN0ZXAoaW5wdXQpIHtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXQgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgaW5wdXQgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGpxTWVzc2FnZSA9IGpxQ29udGFpbmVyLmZpbmQoXG5cdFx0XHRcdCdzZWN0aW9uW2RhdGEtc3RlcC1uYW1lPVwiY29uZmlybWF0aW9uXCJdIHNwYW4udHJhbnNhY3Rpb25TdWNjZXNzTWVzc2FnZSdcblx0XHRcdCk7XG5cblx0XHRcdGNvbnNvbGUubG9nKFwianFNZXNzYWdlLmxlbmd0aFwiLCBqcU1lc3NhZ2UubGVuZ3RoKTtcblxuXHRcdFx0Ly8gVEhBTksgWU9VIFRFWFRcblx0XHRcdHZhciB0aGFua1lvdVRleHQgPSBcIlRoYW5rIHlvdVwiO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS50cmFuc2FjdGlvblN1Y2Nlc3MudGhhbmtZb3VUZXh0KSB7XG5cdFx0XHRcdFx0dGhhbmtZb3VUZXh0ID0gdGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLnRyYW5zYWN0aW9uU3VjY2Vzcy50aGFua1lvdVRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdGpxTWVzc2FnZS5odG1sKHRoYW5rWW91VGV4dCk7XG5cblx0XHRcdC8vIEZJUlNUIE5BTUVcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICh3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5kb25vckZpcnN0TmFtZSkge1xuXHRcdFx0XHRcdHZhciBkb21GaXJzdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3Ryb25nXCIpO1xuXHRcdFx0XHRcdGRvbUZpcnN0TmFtZS5pbm5lckhUTUwgPSB3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5kb25vckZpcnN0TmFtZTtcblx0XHRcdFx0XHRqcU1lc3NhZ2UuYXBwZW5kKFwiLCBcIik7XG5cdFx0XHRcdFx0anFNZXNzYWdlLmFwcGVuZChkb21GaXJzdE5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHt9XG5cblx0XHRcdGpxTWVzc2FnZS5hcHBlbmQoXCIhXCIpO1xuXG5cdFx0XHRzaG93U3RlcChcImNvbmZpcm1hdGlvblwiKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwcmVwQW5kU2hvd0Vycm9yU3RlcChpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBpbnB1dCA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0dmFyIGpxU3RlcCA9IGpxQ29udGFpbmVyLmZpbmQoJ3NlY3Rpb25bZGF0YS1zdGVwLW5hbWU9XCJwcm9jZXNzRXJyb3JcIl0nKTtcblx0XHRcdGpxU3RlcC5maW5kKFwic3Bhbi5lcnJvckRlc2NyaXB0aW9uXCIpLmh0bWwoaW5wdXQpO1xuXHRcdFx0c2hvd1N0ZXAoXCJwcm9jZXNzRXJyb3JcIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsQWxsKHRoZUVsZW1lbnQpIHtcblx0XHRcdGlmICghdGhpc1dpZGdldC5pc0xvYWRlZCkge1xuXHRcdFx0XHQvLyBkb24ndCBzY3JvbGwgdW50aWwgYWZ0ZXIgaW5pdGlhbCBwYWdlIGxvYWQgaXMgY29tcGxldGVcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGVFbGVtZW50ID0ganEodGhlRWxlbWVudCk7XG5cblx0XHRcdHZhciBvcmlnaW5hbFNjcm9sbFRvcCA9IGpxKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cblx0XHRcdHZhciB2aWV3SGVpZ2h0ID0ganEod2luZG93KS5oZWlnaHQoKTtcblx0XHRcdHZhciB2aWV3VG9wID0gb3JpZ2luYWxTY3JvbGxUb3A7XG5cdFx0XHR2YXIgdmlld0JvdHRvbSA9IHZpZXdUb3AgKyB2aWV3SGVpZ2h0O1xuXHRcdFx0dmFyIHBhZGRpbmcgPSAodGhlRWxlbWVudC5vdXRlckhlaWdodCgpIC0gdGhlRWxlbWVudC5pbm5lckhlaWdodCgpKSAvIDI7XG5cdFx0XHRwYWRkaW5nID0gcGFkZGluZyA8PSAwID8gNCA6IHBhZGRpbmc7XG5cdFx0XHR2YXIgZWxlbWVudFRvcCA9IHRoZUVsZW1lbnQub2Zmc2V0KCkudG9wICsgcGFkZGluZztcblx0XHRcdHZhciBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArIHRoZUVsZW1lbnQuaW5uZXJIZWlnaHQoKTtcblxuXHRcdFx0Ly93aGVuIHRoZSBlbGVtZW50IGlzIHRhbGxlciB0aGUgc2NyZWVuLCBzY3JvbGwgdG8gZWxlbWVudCB0b3AgKGxlc3MgcGFkZGluZylcblx0XHRcdGlmICh0aGVFbGVtZW50LmlubmVySGVpZ2h0KCkgPiB2aWV3SGVpZ2h0KSB7XG5cdFx0XHRcdGpxKFwiaHRtbCxib2R5XCIpLmFuaW1hdGUoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiBlbGVtZW50VG9wLFxuXHRcdFx0XHRcdFx0ZWFzaW5nOiBcImVhc2VcIixcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdDQ0NFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vdGhlIGVsZW1lbnQgdG9wIGlzIG9mZiBzY3JlZW4gc28gc2Nyb2xsIHRvIGVsZW1lbnQgdG9wIChsZXNzIHBhZGRpbmcpXG5cdFx0XHRpZiAodmlld1RvcCA+IGVsZW1lbnRUb3ApIHtcblx0XHRcdFx0anEoXCJodG1sLGJvZHlcIikuYW5pbWF0ZShcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IGVsZW1lbnRUb3AsXG5cdFx0XHRcdFx0XHRlYXNpbmc6IFwiZWFzZVwiLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0OTk5XG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly90aGUgZWxlbWVudCBib3R0b20gaXMgb2ZmIHNjcmVlbiBzbyBzY3JvbGwgdXAgZW5vdWdoIHRvIG5vdCBwdXNoIHRoZSB0b3Agb2Zmc2NyZWVuXG5cdFx0XHRpZiAodmlld0JvdHRvbSA8IGVsZW1lbnRCb3R0b20pIHtcblx0XHRcdFx0anEoXCJodG1sLGJvZHlcIikuYW5pbWF0ZShcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IGVsZW1lbnRCb3R0b20gLSB2aWV3SGVpZ2h0ICsgcGFkZGluZyxcblx0XHRcdFx0XHRcdGVhc2luZzogXCJlYXNlXCIsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQ5OTlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0d2luZG93Lm13ZHNwYWNlLk1GQV9GdW5yYWlzZV9XaWRnZXQucHJvdG90eXBlLmxpbmtFeHRlcm5hbFN0eWxlc2hlZXQgPSBmdW5jdGlvbih1cmwpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwibGlua0V4dGVybmFsU3R5bGVzaGVldCgpIHN0YXJ0OlwiLCB1cmwpO1xuXHRcdFx0dmFyIGRvbVN0eWxlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXHRcdFx0dGhpc1dpZGdldC50YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGRvbVN0eWxlTGluayk7XG5cdFx0XHRkb21TdHlsZUxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdFx0XHRkb21TdHlsZUxpbmsudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJsaW5rRXh0ZXJuYWxTdHlsZXNoZWV0KCkgTm8gbG9hZCBhZnRlciA1c1wiLCB1cmwpO1xuXHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdH0sIDUwMDApO1xuXHRcdFx0ZG9tU3R5bGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJTVFlMRVNIRUVUIExPQURFRDpcIiwgdXJsKTtcblx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9tU3R5bGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwibGlua0V4dGVybmFsU3R5bGVzaGVldCgpIEVSUk9SIEVWRU5UXCIsIHVybCwgZXZlbnQpO1xuXHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9tU3R5bGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJsaW5rRXh0ZXJuYWxTdHlsZXNoZWV0KCkgQUJPUlQgRVZFTlRcIiwgdXJsLCBldmVudCk7XG5cdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRkb21TdHlsZUxpbmsuaHJlZiA9IGVuY29kZVVSSSh1cmwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5saW5rRXh0ZXJuYWxTY3JpcHQgPSBmdW5jdGlvbih1cmwpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwibGlua0V4dGVybmFsU2NyaXB0KCkgc3RhcnQ6XCIsIHVybCk7XG5cdFx0XHR2YXIgZG9tU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblx0XHRcdHRoaXNXaWRnZXQudGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChkb21TY3JpcHQpO1xuXHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcImxpbmtFeHRlcm5hbFNjcmlwdCgpIE5vIGxvYWQgYWZ0ZXIgNXNcIiwgdXJsKTtcblx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHR9LCA1MDAwKTtcblx0XHRcdGRvbVNjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKFwiU0NSSVBUIExPQURFRDpcIiwgdXJsKTtcblx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9tU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJsaW5rRXh0ZXJuYWxTY3JpcHQoKSBFUlJPUlwiLCB1cmwsIGV2ZW50KTtcblx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHRcdGRvbVNjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJsaW5rRXh0ZXJuYWxTY3JpcHQoKSBBQk9SVEVEXCIsIHVybCwgZXZlbnQpO1xuXHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9tU2NyaXB0LnNyYyA9IGVuY29kZVVSSSh1cmwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5sb2FkRmlsZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRpZiAodHlwZW9mIGlucHV0ID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwibG9hZEZpbGUoKSBnaXZlbiBlbXB0eSB1cmxcIik7XG5cdFx0XHRcdHJlc29sdmUobnVsbCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGlucHV0ICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwibG9hZEZpbGUoKSBnaXZlbiBpbnZhbGlkIHVybCB0eXBlOlwiLCB0eXBlb2YgaW5wdXQsIGlucHV0KTtcblx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdH1cblx0XHRcdC8vIGNvbnNvbGUubG9nKFwibG9hZEZpbGUoKSBzdGFydDpcIiwgaW5wdXQpO1xuXHRcdFx0dmFyIHJlcXVlc3RVcmwgPSBlbmNvZGVVUkkoaW5wdXQpO1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwibGlua0V4dGVybmFsU2NyaXB0KCkgTm8gbG9hZCBhZnRlciA1c1wiLCB1cmwpO1xuXHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdH0sIDUwMDApO1xuXHRcdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJGSUxFIExPQURFRDpcIiwgaW5wdXQpO1xuXHRcdFx0XHR2YXIgZmlsZUNvbnRlbnRzID0gZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCB8fCBldmVudC50YXJnZXQucmVzcG9uc2UgfHwgbnVsbDtcblx0XHRcdFx0cmVzb2x2ZShmaWxlQ29udGVudHMpO1xuXHRcdFx0fSk7XG5cdFx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcImxvYWRGaWxlKCkgRVJST1IgRVZFTlRcIiwgcmVxdWVzdFVybCwgZXZlbnQpO1xuXHRcdFx0XHRyZXNvbHZlKG51bGwpO1xuXHRcdFx0fSk7XG5cdFx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwibG9hZEZpbGUoKSBBQk9SVCBFVkVOVFwiLCByZXF1ZXN0VXJsLCBldmVudCk7XG5cdFx0XHRcdHJlc29sdmUobnVsbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0eGhyLm9wZW4oXCJnZXRcIiwgcmVxdWVzdFVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2VuZCgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5wcmVwYXJlTGFiZWxPdmVycmlkZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcblx0XHRcdGlmICh0aGlzV2lkZ2V0Lm9wdGlvbnMubGFiZWxPdmVycmlkZSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZiB0aGlzV2lkZ2V0Lm9wdGlvbnMubGFiZWxPdmVycmlkZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHRcdHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZSA9IHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvdmVycmlkZUZpbGVDb250ZW50cyA9IGF3YWl0IHRoaXNXaWRnZXQubG9hZEZpbGUoXG5cdFx0XHRcdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmxhYmVsT3ZlcnJpZGVcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKG92ZXJyaWRlRmlsZUNvbnRlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHRlbXBPYmplY3QgPSB3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuc2FmZUpzb25QYXJzZShcblx0XHRcdFx0XHRcdFx0XHRcdG92ZXJyaWRlRmlsZUNvbnRlbnRzXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGVtcE9iamVjdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlID0gdGVtcE9iamVjdDtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiTUZBX0Z1bnJhaXNlX1dpZGdldC5wcmVwYXJlTGFiZWxPdmVycmlkZSgpIC0gdW5hYmxlIHRvIHBhcnNlIHRleHQgb3ZlcnJpZGUgZGF0YSBmcm9tIGZpbGU6XCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJNRkFfRnVucmFpc2VfV2lkZ2V0LnByZXBhcmVMYWJlbE92ZXJyaWRlKCkgLSB1bmFibGUgdG8gbG9hZCBmaWxlIGZvciB0ZXh0IG92ZXJyaWRlIGRhdGE6XCIsXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMubGFiZWxPdmVycmlkZVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvcjogXCIsIGVyci5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHR9KTtcblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUucHJvY2Vzc0xhYmVsT3ZlcnJpZGUgPSBmdW5jdGlvbihcblx0XHRpbnB1dCxcblx0XHRwcmVmaXhcblx0KSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXHRcdGlmICh0eXBlb2YgaW5wdXQgIT0gXCJvYmplY3RcIiB8fCAhaW5wdXQpIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XCJNRkFfRnVucmFpc2VfV2lkZ2V0LnByb2Nlc3NMYWJlbE92ZXJyaWRlKCkgZ2l2ZW4gaW52YWxpZCBvYmplY3RcIixcblx0XHRcdFx0dHlwZW9mIGlucHV0XG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHByZWZpeCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgcHJlZml4ID0gXCJcIjtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBwcmVmaXggIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiSWdub3JpbmcgaW52YWxpZCBzdHJpbmcgcHJlZml4IHZhbHVlXCIsIHByZWZpeCk7XG5cdFx0XHRwcmVmaXggPSBcIlwiO1xuXHRcdH1cblx0XHRpZiAocHJlZml4KSB7XG5cdFx0XHRwcmVmaXggPSBwcmVmaXggKyBcIi5cIjtcblx0XHR9XG5cdFx0dmFyIHRoaXNTZWxlY3Rvcjtcblx0XHRmb3IgKHZhciBrZXkgaW4gaW5wdXQpIHtcblx0XHRcdHRoaXNTZWxlY3RvciA9IHByZWZpeCArIGtleTtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXRba2V5XSA9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHRoaXNXaWRnZXQuc2V0RWxlbWVudFRleHQodGhpc1NlbGVjdG9yLCBpbnB1dFtrZXldKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJlY3Vyc2l2ZSwgdG8gaGFuZGxlIG5lc3RlZCBKU09OIG9iamVjdHNcblx0XHRcdFx0dGhpc1dpZGdldC5wcm9jZXNzTGFiZWxPdmVycmlkZShpbnB1dFtrZXldLCB0aGlzU2VsZWN0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUuc2V0RWxlbWVudFRleHQgPSBmdW5jdGlvbihsYWJlbElkLCB2YWx1ZSkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRpZiAodHlwZW9mIGxhYmVsSWQgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIGxhYmVsSWQgPSBcIlwiO1xuXHRcdH1cblx0XHRpZiAoIWxhYmVsSWQpIHtcblx0XHRcdGNvbnNvbGUud2FybihcInNldEVsZW1lbnRUZXh0KCkgZ2l2ZW4gZW1wdHkgbGFiZWxJZFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIHNlbGVjdG9yID0gJ1tkYXRhLWxhYmVsLWlkPVwiJyArIGxhYmVsSWQgKyAnXCJdJztcblx0XHR2YXIgZWxlbWVudExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHR2YXIgdGhpc1RhZztcblx0XHRpZiAoZWxlbWVudExpc3QpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudExpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpc1RhZyA9IFN0cmluZyhlbGVtZW50TGlzdFtpXS50YWdOYW1lKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRzd2l0Y2ggKHRoaXNUYWcpIHtcblx0XHRcdFx0XHRjYXNlIFwiaW5wdXRcIjpcblx0XHRcdFx0XHRcdGVsZW1lbnRMaXN0W2ldLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIHZhbHVlKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJsYWJlbFwiOlxuXHRcdFx0XHRcdGNhc2UgXCJzcGFuXCI6XG5cdFx0XHRcdFx0Y2FzZSBcImRpdlwiOlxuXHRcdFx0XHRcdGNhc2UgXCJvcHRpb25cIjpcblx0XHRcdFx0XHRjYXNlIFwiaDFcIjpcblx0XHRcdFx0XHRjYXNlIFwiaDJcIjpcblx0XHRcdFx0XHRjYXNlIFwiaDNcIjpcblx0XHRcdFx0XHRjYXNlIFwiaDRcIjpcblx0XHRcdFx0XHRjYXNlIFwiaDVcIjpcblx0XHRcdFx0XHRjYXNlIFwiaDZcIjpcblx0XHRcdFx0XHRjYXNlIFwicFwiOlxuXHRcdFx0XHRcdGNhc2UgXCJsaVwiOlxuXHRcdFx0XHRcdFx0ZWxlbWVudExpc3RbaV0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwic2V0RWxlbWVudFRleHQoKTogSWdub3JpbmcgdGFnXCIsIGxhYmVsSWQsIHRoaXNUYWcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlJFUExBQ0UgbGFiZWxJZCBub3QgZm91bmRcIiwgbGFiZWxJZCk7XG5cdFx0fVxuXHR9O1xufSkoKTtcbiJdfQ==

//# sourceMappingURL=mwd-donate-widget.js.map
