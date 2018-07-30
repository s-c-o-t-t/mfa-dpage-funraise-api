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
	if (window.console) console.log("mwd-donate-widget.js v18.7.27");

	window.mwdspace = window.mwdspace || {};

	window.mwdspace.MFA_Funraise_Widget = function (input) {
		var thisWidget = this;
		if (typeof input == "undefined") {
			var input = {};
		}

		thisWidget.isStarted = false;
		thisWidget.isLoaded = false;
		thisWidget.allowAutoScroll = false;
		thisWidget.codeVersion = "1.0.0";

		thisWidget.domTargetElement = {};
		thisWidget.promises = {};
		thisWidget.intervals = {};
		thisWidget.urls = {};
		thisWidget.defaults = {};
		thisWidget.options = {};

		thisWidget.setSystemValues();
		thisWidget.setUserOptions(input);

		var target = document.querySelectorAll(thisWidget.options.element);
		if (!target) {
			if (window.console) console.error("MFA_Funraise_Widget(): specified target element not found:", thisWidget.options.element);
			return false;
		}
		if (target.length > 1) {
			if (window.console) console.warn("MFA_Funraise_Widget(): using 1st of multiple target elemets found:", thisWidget.options.element);
			return false;
		}
		thisWidget.domTargetElement = target[0];
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setSystemValues = function () {
		var thisWidget = this;

		// LOCATION URLS
		thisWidget.urls.base = "https://quiz.mercyforanimals.org/donate-widget/" + thisWidget.codeVersion + "/";
		thisWidget.urls.fontAwesome4 = "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
		thisWidget.urls.fontAwesome5 = "https://use.fontawesome.com/releases/v5.1.0/css/all.css";
		thisWidget.urls.specialSelectStyles = "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css";
		thisWidget.urls.specialSelectScript = "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js";
		thisWidget.urls.spreedlyScript = "https://core.spreedly.com/iframe/iframe-v1.min.js";
		thisWidget.urls.jqueryScript = "https://code.jquery.com/jquery-3.3.1.min.js";
		thisWidget.urls.companyMatchApi = "https://platform.funraise.io/api/v1/ddcompanies";
		thisWidget.urls.bitcoinPaymentApi = "https://bitpay.com/";
		thisWidget.urls.testBitcoinPaymentApi = "https://test.bitpay.com/";

		// DEFAULT VALUES
		// Funraise test Spreedly environment key: ECDNSGhIR0fYQisIc1PHH7NX0pN
		// Funraise live Spreedly environment key: KvcTOx3FPBgscLs51rjT848DP7p
		// MWD test environment key: ODBm2idmYFT3pBge5qxRBjQaWH9

		thisWidget.defaults.organizationId = "fcb4d538-ca92-4212-86cc-06d8ac929c4d";
		thisWidget.defaults.formId = 1194;
		thisWidget.defaults.paymentTokenApiKey = "KvcTOx3FPBgscLs51rjT848DP7p";
		thisWidget.defaults.testPaymentTokenApiKey = "ECDNSGhIR0fYQisIc1PHH7NX0pN";
		thisWidget.defaults.minimumGiftAmount = 5;
		thisWidget.defaults.giftStringSingle = [25, 50, 75, 100];
		thisWidget.defaults.giftStringMonthly = [5, 10, 15, 20];
		thisWidget.defaults.currencyCode = "USD";
		thisWidget.defaults.topVisualPaddingSelector = "section#header";

		// OTHER
		thisWidget.payMethodIconHtml = {
			card: '<i class="fa far fa-credit-card" aria-hidden="true"></i>',
			visa: '<i class="fa fab fa-cc-visa" aria-hidden="true"></i>',
			mastercard: '<i class="fa fab fa-cc-mastercard" aria-hidden="true"></i>',
			amex: '<i class="fa fab fa-cc-amex" aria-hidden="true"></i>',
			discover: '<i class="fa fab fa-cc-discover" aria-hidden="true"></i>',
			bitcoin: '<i class="fa fab fa-bitcoin fa-btc" aria-hidden="true"></i>'
		};
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setUserOptions = function (input) {
		var thisWidget = this;
		if (typeof input == "undefined") {
			var input = {};
		}

		if (typeof input.baseUrlOverride == "string" && input.baseUrlOverride.trim()) {
			thisWidget.urls.base = encodeURI(input.baseUrlOverride);
			if (thisWidget.urls.base.substr(-1) != "/") {
				thisWidget.urls.base += "/";
			}
		}

		// VALIDATE/FINALIZE USER OPTIONS
		if (typeof input.element == "string" && input.element.trim()) {
			thisWidget.options.element = input.element;
		} else {
			if (window.console) console.error("MFA_Funraise_Widget(): invalid options - No target element:", input);
			return false;
		}

		// ENVIRONMENT IDS/KEYS
		// Funraise organization id
		if (typeof input.organizationId != "undefined") {
			thisWidget.options.organizationId = input.organizationId;
		} else {
			thisWidget.options.organizationId = thisWidget.defaults.organizationId;
		}
		// Funraise form id
		if (typeof input.formId != "undefined") {
			thisWidget.options.formId = input.formId;
		} else {
			thisWidget.options.formId = thisWidget.defaults.formId;
		}
		// Spreedly environment key
		if (typeof input.paymentTokenApiKey != "undefined") {
			thisWidget.options.paymentTokenApiKey = input.paymentTokenApiKey;
		} else {
			thisWidget.options.paymentTokenApiKey = thisWidget.defaults.paymentTokenApiKey;
		}

		// MAIN SINGLE GIFT VALUES
		if (_typeof(input.giftStringSingle) == "object" && input.giftStringSingle.length > 0) {
			thisWidget.options.giftStringSingle = input.giftStringSingle;
		} else {
			thisWidget.options.giftStringSingle = thisWidget.defaults.giftStringSingle;
		}
		// MAIN MONTHLY GIFT VALUES
		if (_typeof(input.giftStringMonthly) == "object" && input.giftStringMonthly.length > 0) {
			thisWidget.options.giftStringMonthly = input.giftStringMonthly;
		} else {
			thisWidget.options.giftStringMonthly = thisWidget.defaults.giftStringMonthly;
		}

		// CURRENCIES (and related gift values)
		if (typeof input.defaultCurrency == "string" && input.defaultCurrency.trim()) {
			thisWidget.options.defaultCurrency = input.defaultCurrency;
		} else {
			thisWidget.options.defaultCurrency = false;
		}
		if (_typeof(input.currencies) == "object") {
			thisWidget.options.filterListCurrency = input.currencies;
		} else {
			thisWidget.options.filterListCurrency = false;
		}

		// PAY METHODS
		if (typeof input.defaultPayMethod == "string" && input.defaultPayMethod.trim()) {
			thisWidget.options.defaultPayMethod = input.defaultPayMethod;
		} else {
			thisWidget.options.defaultPayMethod = false;
		}
		if (typeof input.payMethods == "string" && input.payMethods.trim()) {
			// convert given string to array
			thisWidget.options.filterListPayMethod = [input.payMethods];
		} else if (input.payMethods && input.payMethods.constructor === Array && input.payMethods.length > 0) {
			// use given pay method list as array
			thisWidget.options.filterListPayMethod = input.payMethods;
		} else {
			thisWidget.options.filterListPayMethod = false;
		}

		// FREQUENCIES
		if (typeof input.defaultFrequency == "string" && input.defaultFrequency.trim()) {
			thisWidget.options.defaultFrequency = input.defaultFrequency;
		} else {
			thisWidget.options.defaultFrequency = false;
		}
		if (typeof input.frequencies == "string" && input.frequencies.trim()) {
			// convert given string to array
			thisWidget.options.filterListFrequency = [input.frequencies];
		} else if (input.frequencies && input.frequencies.constructor === Array && input.frequencies.length > 0) {
			// use given frequency list as array
			thisWidget.options.filterListFrequency = input.frequencies;
		} else {
			thisWidget.options.filterListFrequency = false;
		}

		// FONT AWESOME - no load (use existing), or load either version 4 or 5
		if (typeof input.fontAwesomeVersion == "undefined") {
			thisWidget.options.fontAwesomeVersion = 4;
		} else if (!isNaN(input.fontAwesomeVersion)) {
			thisWidget.options.fontAwesomeVersion = parseInt(input.fontAwesomeVersion);
		} else {
			thisWidget.options.fontAwesomeVersion = null;
		}

		// VARIOUS BOOLEAN OPTIONS
		thisWidget.options.includeCompanyMatch = input.includeCompanyMatch === false ? false : true;
		thisWidget.options.includeExtraPercent = input.includeExtraPercent === false ? false : true;

		// LABEL OVERRIDES (aka TRANSLATIONS)
		thisWidget.options.labelOverrideObject = false;
		thisWidget.options.labelOverrideFileUrl = false;
		if (typeof input.labelOverride == "string" && input.labelOverride.trim()) {
			thisWidget.options.labelOverrideFileUrl = input.labelOverride;
		} else if (_typeof(input.labelOverride) == "object") {
			thisWidget.options.labelOverrideObject = input.labelOverride;
		}

		// USER CALLBACK FUNCTIONS
		// onLoad
		if (typeof input.onLoad == "function") {
			thisWidget.options.onLoad = input.onLoad;
		} else {
			thisWidget.options.onLoad = false;
		}
		// onDonation
		if (typeof input.onDonation == "function") {
			thisWidget.options.onDonation = input.onDonation;
		} else {
			thisWidget.options.onDonation = false;
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var thisWidget, promiseFontIconStyles, promiseMainStyles, widgetHtml, sharedUtilResult, promiseMainHtml, promiseSharedUtils, _ref2, _ref3, container, isJqueryLoaded, promiseSpecialSelectCode, promiseBusinessLayer, promiseTransactionLayer;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						thisWidget = this;

						if (!thisWidget.isStarted) {
							_context.next = 4;
							break;
						}

						if (window.console) console.warn("MFA_Funraise_Widget already started");
						return _context.abrupt("return");

					case 4:
						thisWidget.isStarted = true;

						thisWidget.domTargetElement.innerHTML = "";

						promiseFontIconStyles = thisWidget.getFontIconStyles();
						promiseMainStyles = thisWidget.linkExternalStylesheet(thisWidget.urls.base + "css/mwd-donate-widget.css");

						thisWidget.linkExternalStylesheet(thisWidget.urls.specialSelectStyles);
						_context.next = 11;
						return Promise.all([promiseFontIconStyles, promiseMainStyles]);

					case 11:
						promiseMainHtml = thisWidget.loadFile(thisWidget.urls.base + "mwd-donate-widget.html");
						promiseSharedUtils = thisWidget.linkExternalScript(thisWidget.urls.base + "js/shared-utils.js");
						_context.next = 15;
						return Promise.all([promiseMainHtml, promiseSharedUtils]);

					case 15:
						_ref2 = _context.sent;
						_ref3 = _slicedToArray(_ref2, 2);
						widgetHtml = _ref3[0];
						sharedUtilResult = _ref3[1];

						if (widgetHtml) {
							_context.next = 22;
							break;
						}

						if (window.console) console.error("MFA_Funraise_Widget.start() - unable to load base HTML");
						return _context.abrupt("return");

					case 22:
						container = document.createElement("div");

						container.id = "mfaDonationWidgetContainer";
						container.style.opacity = 0;
						thisWidget.domTargetElement.appendChild(container);

						container.innerHTML = widgetHtml;

						setTimeout(function () {
							container.className = "reveal";
						}, 1);

						// start Spreedly first bc it has slow response time
						thisWidget.promises.spreedlyIframeScript = thisWidget.linkExternalScript(thisWidget.urls.spreedlyScript);
						_context.next = 31;
						return thisWidget.linkExternalScript(thisWidget.urls.jqueryScript);

					case 31:
						isJqueryLoaded = _context.sent;


						// select2 should load after jQuery load complete
						promiseSpecialSelectCode = thisWidget.linkExternalScript(thisWidget.urls.specialSelectScript);
						promiseBusinessLayer = thisWidget.linkExternalScript(thisWidget.urls.base + "js/gift-utilities.js");
						promiseTransactionLayer = thisWidget.linkExternalScript(thisWidget.urls.base + "js/transaction-system-layer.js");
						_context.next = 37;
						return Promise.all([promiseBusinessLayer, promiseTransactionLayer, promiseSpecialSelectCode]);

					case 37:
						if (isJqueryLoaded) {
							thisWidget.jquery = jQuery.noConflict();
						} else {
							thisWidget.jquery = $ || {};
						}

						thisWidget.run();

					case 39:
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
										theLabel = thisWidget.labelOverride.donor.matchCompanyPlaceholder || theLabel;
									}
								} catch (err) {}

								jqMatchSelect = jq('select[name="donorMatchCompany"]');

								if (!(typeof jqMatchSelect.select2 != "function")) {
									_context2.next = 9;
									break;
								}

								if (window.console) console.warn("SKIPPING COMPANY MATCH SMART SELECTOR");
								return _context2.abrupt("return");

							case 9:

								jqMatchSelect.select2({
									minimumInputLength: 3,
									delay: 400,
									placeholder: theLabel,
									width: "100%",
									ajax: {
										url: thisWidget.urls.companyMatchApi,
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

		var checkBitcoinPaymentStatus = function () {
			var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(input) {
				var baseUrl, jqBitcoinContainer, response, domMessage;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								if (typeof input != "string") {
									if (window.console) console.warn("checkBitcoinPaymentStatus() given invalid transaction id:", typeof input === "undefined" ? "undefined" : _typeof(input), input);
									resolve(null);
								}

								baseUrl = thisWidget.urls.bitcoinPaymentApi;

								if (inTestMode) {
									baseUrl = thisWidget.urls.testBitcoinPaymentApi;
								}

								jqBitcoinContainer = jqContainer.find("div.bitcoinContainer");
								_context4.next = 6;
								return new Promise(function (resolve) {
									var requestUrl = encodeURI(baseUrl + "invoices/" + input);
									var xhr = new XMLHttpRequest();

									xhr.addEventListener("load", function (event) {
										// if (window.console) console.log("FILE LOADED:", event);
										var fileContents = event.target.responseText || event.target.response || null;
										var tempObject = window.mwdspace.sharedUtils.safeJsonParse(fileContents);

										if (!tempObject || !tempObject.data) {
											if (window.console) console.log("checkBitcoinPaymentStatus(): invalid response", event);
											resolve(null);
										}

										resolve(tempObject.data);
									});
									xhr.addEventListener("error", function (event) {
										if (window.console) console.error("checkBitcoinPaymentStatus() ERROR EVENT", requestUrl, event);
										resolve(null);
									});

									xhr.open("get", requestUrl, true);
									xhr.setRequestHeader("Accept", "application/json");
									xhr.send();
								});

							case 6:
								response = _context4.sent;

								if (response) {
									_context4.next = 13;
									break;
								}

								domMessage = document.createElement("div");

								domMessage.innerHTML = "Warning: Unable to verify the status of this invoice (" + new Date().toLocaleTimeString() + "). Will try again shortly.</div>";
								jq(domMessage).addClass("spacingContainer error");
								jqBitcoinContainer.find("div.bitcoinFeedback").empty().append(domMessage);
								return _context4.abrupt("return");

							case 13:

								if (window.console) console.log("checkBitcoinPaymentStatus() RESPONSE", response);

								jqBitcoinContainer.find("div.bitcoinStatus").html(response.status);

								_context4.t0 = response.status;
								_context4.next = _context4.t0 === "paid" ? 18 : _context4.t0 === "confirmed" ? 18 : _context4.t0 === "complete" ? 18 : _context4.t0 === "expired" ? 21 : _context4.t0 === "invalid" ? 24 : _context4.t0 === "new" ? 29 : 31;
								break;

							case 18:
								prepAndShowConfirmationStep();
								clearInterval(thisWidget.intervals.bitcoinStatusChecker);
								return _context4.abrupt("break", 31);

							case 21:
								prepAndShowErrorStep("The Bitcoin invoice expired before payment was received.");
								clearInterval(thisWidget.intervals.bitcoinStatusChecker);
								return _context4.abrupt("break", 31);

							case 24:
								domMessage = document.createElement("div");

								domMessage.innerHTML = "The invoice received payments, but is listed as invalid.";
								jq(domMessage).addClass("spacingContainer error");
								jqBitcoinContainer.find("div.bitcoinFeedback").empty().append(domMessage);
								return _context4.abrupt("break", 31);

							case 29:
								// FOR TEST MODE
								if (inTestMode) {
									prepAndShowConfirmationStep();
									clearInterval(thisWidget.intervals.bitcoinStatusChecker);
								}

								return _context4.abrupt("break", 31);

							case 31:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			return function checkBitcoinPaymentStatus(_x2) {
				return _ref7.apply(this, arguments);
			};
		}();

		var thisWidget, jq, userInputData, jqContainer, jqStepList, jqGiftHeaderContainer, jqMainBackButton, jqFreeFormGiftInput, jqPayMethodSelect, jqRegionSelect, jqRegionInput, jqCurrencySelect, jqCardNumberFeedback, jqBitcoinTimeRemaining, inTestMode, promiseSpreedly, showNextStep, showPreviousStep, showStep, checkStepGift, checkStepDonor, checkStepCard, showStepFeedback, showIntroContent, setupInputWatchers, processChangeWatch, validateInputField, processGiftAmountChange, updateGiftAmount, setCurrencyDisplaySymbol, updatePayMethod, setFrequencyButtonVisibility, updateFrequency, prePopulateUserFields, checkPrePopulationSources, setInputFromUrl, setInputFromStorage, setInputValue, buildTransactionSendData, sendTransaction, getGiftString, getCurrencySpecificGiftString, buildGiftStringButtons, buildGiftStringButton, cleanCurrency, formatDisplayGift, buildCurrencySelect, buildCurrencyOption, buildPayMethodSelect, buildPayMethodOption, buildFrequencyButtons, buildFrequencyButton, prepareRegionInput, showRegionInput, buildRegionSelect, buildRegionOption, buildCountrySelect, buildCountryOption, buildCardExpireMonthSelect, buildCardExpireMonthOption, buildCardExpireYearSelect, buildCardExpireYearOption, setupSpreedly, setSpreedlyLabels, setCardNumberFeedback, setOptionalSectionVisibility, tokenizeUserCard, prepAndShowProcessingStep, prepAndShowBitcoinStep, updateBitcoinTimer, prepAndShowConfirmationStep, prepAndShowErrorStep, scrollAll;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						scrollAll = function scrollAll(theElement) {
							if (typeof theElement == "undefined") {
								return;
							}
							if (!thisWidget.allowAutoScroll) {
								// don't scroll until after initial page load is complete
								return;
							}
							theElement = jq(theElement);
							if (theElement.length <= 0) {
								return;
							}

							var originalScrollTop = jq(window).scrollTop();
							var baseScrollTime = 555;

							var viewHeight = jq(window).height();
							var viewTop = originalScrollTop;
							var viewBottom = viewTop + viewHeight;

							var elementHeight = theElement.innerHeight();
							var elementPadding = (theElement.outerHeight() - elementHeight) / 2;
							elementPadding = elementPadding <= 0 ? 0 : elementPadding;

							var elementTop = theElement.offset().top;
							var elementBottom = elementTop + elementHeight;

							var topVisualPadding = 0;
							if (typeof thisWidget.defaults.topVisualPaddingSelector == "string") {
								topVisualPadding = jq(thisWidget.defaults.topVisualPaddingSelector).outerHeight() || 0;
								topVisualPadding = topVisualPadding > viewHeight * 0.25 ? viewHeight * 0.25 : topVisualPadding;
							}

							// if (window.console) {
							// 	if (window.console) console.log("viewTop", viewTop);
							// 	if (window.console) console.log("elementTop", elementTop);
							// 	if (window.console) console.log("elementPadding", elementPadding);
							// }

							//top is off screen or  element is taller the screen, so scroll to element top
							if (elementHeight > viewHeight || viewTop + topVisualPadding > elementTop) {
								// if (window.console) console.log("SCROLL TO TOP");
								animateScroll(elementTop - topVisualPadding, -5);
								return;
							}

							//the element bottom is off screen so scroll up enough to not push the top offscreen
							if (viewBottom < elementBottom) {
								// if (window.console) console.log("SCROLL TO BOTTOM");
								var newTop = elementBottom - viewHeight;
								if (newTop < topVisualPadding) {
									newTop = topVisualPadding;
								}
								animateScroll(newTop, 5);
							}

							function animateScroll(scrollTop, gap) {
								// if (window.console) console.log("animateScroll", scrollTop, gap);

								if (typeof gap == "undefined") {
									var gap = 0;
								}

								jq("html,body").animate({
									scrollTop: scrollTop + gap
								}, baseScrollTime);
							}
						};

						prepAndShowErrorStep = function prepAndShowErrorStep(input) {
							if (typeof input == "undefined") {
								var input = {};
							}
							var jqStep = jqContainer.find('section[data-step-name="transactionError"]');
							jqStep.find("span.errorMessage").html(input);
							showStep("transactionError");
						};

						prepAndShowConfirmationStep = function prepAndShowConfirmationStep(input) {
							if (typeof input == "undefined") {
								var input = {};
							}

							var jqMessage = jqContainer.find('section[data-step-name="confirmation"] span.confirmationMessage');

							// THANK YOU TEXT
							var thankYouText = "Thank you";
							try {
								if (thisWidget.labelOverride.confirmation.thankYouText) {
									thankYouText = thisWidget.labelOverride.confirmation.thankYouText;
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

							if (thisWidget.options.onDonation) {
								try {
									if (window.console) console.log(">>> Calling custom onDonation function");
									thisWidget.options.onDonation(window.mwdspace.userInputData);
								} catch (err) {
									if (window.console) console.error("Caught error from onDonation function: ", err.message);
								}
							}
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
								if (window.console) console.warn("updateBitcoinTimer() caught error", err.message);
							}
							jqBitcoinTimeRemaining.html(displayCountdown);
						};

						prepAndShowBitcoinStep = function prepAndShowBitcoinStep(input) {
							if ((typeof input === "undefined" ? "undefined" : _typeof(input)) != "object") {
								if (window.console) console.warn("prepAndShowBitcoinStep() given invalid input", input);
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
								if (window.console) console.log("Calling checkBitcoinPaymentStatus() with ", input.transaction_id);
								checkBitcoinPaymentStatus(input.transaction_id);
							}, 30000);
						};

						prepAndShowProcessingStep = function prepAndShowProcessingStep() {
							var iconHtml = "";

							if (window.mwdspace.userInputData.payMethod == "bitcoin") {
								iconHtml = thisWidget.payMethodIconHtml.bitcoin;
							} else if (window.mwdspace.userInputData.payMethod == "card") {
								switch (window.mwdspace.userInputData.payCardType) {
									case "visa":
										iconHtml = thisWidget.payMethodIconHtml.visa;
										break;
									case "mastercard":
									case "master":
									case "mc":
										iconHtml = thisWidget.payMethodIconHtml.mastercard;
										break;
									case "amex":
									case "american_express":
									case "americanexpress":
										iconHtml = thisWidget.payMethodIconHtml.amex;
										break;
									case "discover":
									case "disc":
										iconHtml = thisWidget.payMethodIconHtml.discover;
										break;
								}
							}

							var jqStep = jqContainer.find('section[data-step-name="processing"]');
							jqStep.find("span.processingPaySymbol").html(iconHtml);

							showStep("processing");
						};

						tokenizeUserCard = function tokenizeUserCard() {
							// tokenize only when all fields are ready
							// when successful, this will populate transactionSendData.paymentToken field

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

									Spreedly.tokenizeCreditCard(tokenOptions);
									return true;
								} else {
									if (window.console) console.error("NO SPREEDLY OBJECT");
								}
							} else {
								if (window.console) console.error("SPREEDLY FIELD NOT READY");
							}
							return false;
						};

						setOptionalSectionVisibility = function setOptionalSectionVisibility() {
							// COMPANY MATCH
							var jqCompanyMatchGroup = jqContainer.find('input[name="companyMatch"]').closest("div.inputGroup");
							if (thisWidget.options.includeCompanyMatch) {
								jqCompanyMatchGroup.show();
							} else {
								jqCompanyMatchGroup.hide();
							}

							// EXTRA PERCENT
							var jqExtraPercentRadio = jqContainer.find('input[name="giftExtraPercent"]').closest("div.inputGroup");
							if (thisWidget.options.includeExtraPercent) {
								jqExtraPercentRadio.show();
							} else {
								jqExtraPercentRadio.hide();
							}
						};

						setCardNumberFeedback = function setCardNumberFeedback(isValid, cardType) {
							if (isValid) {
								jqCardNumberFeedback.find("span.cardNumberValidity").removeClass("invalid").addClass("valid").html('<i class="fa fas fa-check-circle"></i>');
							} else {
								jqCardNumberFeedback.find("span.cardNumberValidity").removeClass("valid").addClass("invalid").html('<i class="fa fas fa-times"></i>');
							}

							var jqCardIcon = jqCardNumberFeedback.find("span.cardType");
							switch (cardType) {
								case "visa":
									jqCardIcon.html(thisWidget.payMethodIconHtml.visa).addClass("known");
									break;
								case "master":
									jqCardIcon.html(thisWidget.payMethodIconHtml.mastercard).addClass("known");
									break;
								case "american_express":
									jqCardIcon.html(thisWidget.payMethodIconHtml.amex).addClass("known");
									break;
								case "discover":
									jqCardIcon.html(thisWidget.payMethodIconHtml.discover).addClass("known");
									break;
								default:
									jqCardIcon.html(thisWidget.payMethodIconHtml.card).removeClass("known");
							}
						};

						setSpreedlyLabels = function setSpreedlyLabels() {
							Spreedly.setFieldType("number", "text");
							Spreedly.setNumberFormat("prettyFormat");

							// match styles from another similar field
							var inputFontSize = jqPayMethodSelect.css("font-size") || "16px";
							var inputColor = jqPayMethodSelect.css("color") || "#333";
							var cssString = "padding:0;font-size:" + inputFontSize + ";color:" + inputColor + ";";
							Spreedly.setStyle("number", cssString);
							Spreedly.setStyle("cvv", cssString);

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
						};

						setupSpreedly = function setupSpreedly() {
							var _this = this;

							return new Promise(function () {
								var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve) {
									var paymentTokenApiKey;
									return regeneratorRuntime.wrap(function _callee3$(_context3) {
										while (1) {
											switch (_context3.prev = _context3.next) {
												case 0:
													_context3.next = 2;
													return thisWidget.promises.spreedlyIframeScript;

												case 2:

													Spreedly.on("ready", function () {
														setSpreedlyLabels();
														resolve();
													});

													Spreedly.on("paymentMethod", function (token, result) {
														window.mwdspace.transactionSendData.paymentToken = null;

														if (result.errors && result.errors.length > 0) {
															if (window.console) console.warn("SPREEDLY REPORTS paymentMethod ERRORS:");
															for (var i = 0; i < result.errors.length; i++) {
																var error = result.errors[i];
																if (window.console) console.warn(error);
															}
															var message = "Error during secure card information transfer. Please try again.";
															try {
																message = thisWidget.labelOverride.gift.error.tokenizeError || message;
															} catch (err) {}
															showStepFeedback("cardInfo", message, true);
														} else {
															window.mwdspace.transactionSendData.paymentToken = token;
															sendTransaction();
															showStepFeedback("cardInfo");
														}
													});

													Spreedly.on("fieldEvent", function (name, type, activeEl, response) {
														if (type == "input") {
															window.mwdspace.userInputData.hasValidCardNumber = response.validNumber || false;
															window.mwdspace.userInputData.hasValidCardCvv = response.validCvv || false;
															window.mwdspace.userInputData.payCardType = response.cardType || false;
															if (name == "number") {
																setCardNumberFeedback(response.validNumber, response.cardType);
															}
														}
													});

													Spreedly.on("errors", function (errors) {
														if (window.console) console.warn("SPREEDLY REPORTS GENERAL ERRORS:");
														for (var i = 0; i < errors.length; i++) {
															var error = errors[i];
															if (window.console) console.warn(error);
														}
														var message = "Unexpected error with secure card handler";
														try {
															message = thisWidget.labelOverride.gift.error.generalTokenizerError || message;
														} catch (err) {}
														showStepFeedback("cardInfo", message, true);
													});

													paymentTokenApiKey = thisWidget.options.paymentTokenApiKey;

													if (inTestMode) {
														paymentTokenApiKey = thisWidget.defaults.testPaymentTokenApiKey;
													}
													Spreedly.init(paymentTokenApiKey, {
														numberEl: "cardNumberTarget",
														cvvEl: "cardCvvTarget"
													});

												case 9:
												case "end":
													return _context3.stop();
											}
										}
									}, _callee3, _this);
								}));

								return function (_x) {
									return _ref6.apply(this, arguments);
								};
							}());
						};

						buildCardExpireYearOption = function buildCardExpireYearOption(year, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								if (window.console) console.warn("buildRegionOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}

							var domOption = null;
							try {
								if (typeof year != "number" && typeof year != "string" && !year) {
									if (window.console) console.error("Invalid year given:", year);
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
								if (window.console) console.error("Unable to build the option element for year:", year);
							}
							return domOption;
						};

						buildCardExpireYearSelect = function buildCardExpireYearSelect() {
							try {
								// show only current year and beyond
								var recentDate = new Date();
								recentDate.setDate(recentDate.getDate() - 7); // show last year for 7 days
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
										if (window.console) console.warn("Unable to add card expire year:", expireYear);
									}
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the card expire year select dropdown", err);
							}
						};

						buildCardExpireMonthOption = function buildCardExpireMonthOption(month, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								if (window.console) console.warn("buildRegionOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}

							var domOption = null;
							try {
								if (typeof month != "number" && typeof month != "string" && !month) {
									if (window.console) console.error("Invalid month given:", month);
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
								if (window.console) console.error("Unable to build the option element for month:", month);
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
										if (window.console) console.warn("Unable to add card expire month:", expireMonth);
									}
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the card expire month select dropdown", err);
							}
						};

						buildCountryOption = function buildCountryOption(country, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								if (window.console) console.warn("buildCountryOption() ignoring invalid attributes object", attributes);
								attributes = {};
							}
							var domOption = null;
							try {
								if (country.code) {
									domOption = document.createElement("option");
									domOption.innerText = country.name;
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the option element for country:", country);
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
								if (window.console) console.warn("buildCountrySelect(): ignoring invalid option object", options);
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
								var domThisOption, thisCountry, okToBuild;

								for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
									okToBuild = true;
									thisCountry = window.mwdspace.validCountryList[i];
									if (okToBuild) {
										domThisOption = buildCountryOption(thisCountry);
										if (domThisOption) {
											domCountrySelect.append(domThisOption);
										} else {
											if (window.console) console.warn("Unable to add country:", thisCountry);
										}
									}
								}
								domCountrySelect.val(defaultCountry).trigger("change");
							} catch (err) {
								if (window.console) console.error("Unable to build the country select dropdown", err);
							}
						};

						buildRegionOption = function buildRegionOption(regionName, attributes) {
							if (typeof attributes == "undefined") {
								var attributes = {};
							}
							if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) != "object") {
								if (window.console) console.warn("buildRegionOption() ignoring invalid attributes object", attributes);
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
								if (window.console) console.error("Unable to build the option element for region:", region);
							}
							return null;
						};

						buildRegionSelect = function buildRegionSelect(regions) {
							jqRegionInput.hide();
							jqRegionSelect.val("").show().trigger("change");

							if (typeof regions == "undefined") {
								if (window.console) console.warn("buildRegionSelect(): no regions object", regions);
								return false;
							}
							if ((typeof regions === "undefined" ? "undefined" : _typeof(regions)) != "object" || regions.length < 1) {
								if (window.console) console.warn("buildRegionSelect(): invalid regions object", regions);
								return false;
							}

							try {
								if (jqRegionSelect.length !== 1) {
									if (window.console) console.error("Unable to identify the region select dropdown");
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
										if (window.console) console.warn("Unable to add region:", thisRegion);
									}
								}
								if (regionCtr > 0) {
									return true;
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the region select dropdown", err);
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
								if (window.console) console.warn("prepareRegionInput(): ignoring invalid option object", options);
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
								if (window.console) console.error("Unable to prepare the region input method", err);
							}
							showRegionInput();
						};

						buildFrequencyButton = function buildFrequencyButton(frequency, options) {
							if (typeof options == "undefined") {
								var options = {};
							}
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") {
								options = {};
								if (window.console) console.warn("buildFrequencyButton(): ignoring invalid option object", options);
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
								if (window.console) console.error("Error building the button for frequency:", frequency, err);
							}
							return domButton;
						};

						buildFrequencyButtons = function buildFrequencyButtons() {
							try {
								if (!window.mwdspace.validFrequencyList) {
									throw new Error("Invalid list of frequencies given");
								}
								var jqFrequencyContainer = jqContainer.find("div.giftFrequencyContainer");
								if (jqFrequencyContainer.length !== 1) {
									throw new Error("Unable to identify the frequency container");
								}
								// remove any existing options
								jqFrequencyContainer.find("div.fancyRadioButton").remove();

								var domThisButton, thisFrequency, okToBuild;

								var finalFrequencyList = [];
								var defaultIndex = 0;
								var currentIndex = 0;

								for (var i = 0; i < window.mwdspace.validFrequencyList.length; i++) {
									thisFrequency = window.mwdspace.validFrequencyList[i];
									okToBuild = true;
									if (thisWidget.options.filterListFrequency) {
										if (thisWidget.options.filterListFrequency.indexOf(thisFrequency.code) < 0) {
											okToBuild = false;
										}
									}
									if (okToBuild) {
										domThisButton = buildFrequencyButton(thisFrequency, {
											id: window.mwdspace.sharedUtils.makeUniqueId("frequency-" + i)
										});
										if (domThisButton) {
											jqFrequencyContainer.append(domThisButton);
											finalFrequencyList.push(thisFrequency.code);
										} else {
											if (window.console) console.warn("Unable to add frequency:", thisFrequency);
										}
										if (thisWidget.options.defaultFrequency === thisFrequency.code) {
											defaultIndex = currentIndex;
										}
										currentIndex++;
									}
								}
								jqFrequencyContainer.find('input[name="giftFrequency"]').eq(defaultIndex).prop("checked", true).trigger("change");
								setFrequencyButtonVisibility(finalFrequencyList);
							} catch (err) {
								if (window.console) console.error("Unable to build the frequency buttons", err);
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
								if (window.console) console.error("Unable to build the option element for method:", method);
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
								var domThisOption, thisPayMethod, okToBuild;

								var defaultCode = null;
								var itemCount = 0;

								for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
									thisPayMethod = window.mwdspace.validPayMethodList[i];
									okToBuild = true;
									if (thisWidget.options.filterListPayMethod) {
										if (thisWidget.options.filterListPayMethod.indexOf(thisPayMethod.code) < 0) {
											okToBuild = false;
										}
									}
									if (okToBuild) {
										domThisOption = buildPayMethodOption(window.mwdspace.validPayMethodList[i]);
										if (domThisOption) {
											jqPayMethodSelect.append(domThisOption);
											itemCount++;
										} else {
											if (window.console) console.warn("Unable to add payment method:", window.mwdspace.validPayMethodList[i]);
										}
										if (thisWidget.options.defaultPayMethod === thisPayMethod.code || !defaultCode) {
											defaultCode = thisPayMethod.code;
										}
									}
								}

								jqPayMethodSelect.val(defaultCode).trigger("change");
								// hide the selector when only one value
								if (itemCount === 1) {
									jqPayMethodSelect.closest("div.inputGroup").hide();
								} else {
									jqPayMethodSelect.closest("div.inputGroup").show();
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the payment method select dropdown", err);
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
								if (window.console) console.error("Unable to build the option element for currency:", currency);
							}
							return domOption;
						};

						buildCurrencySelect = function buildCurrencySelect() {
							var filterList = thisWidget.options.filterListCurrency;
							var defaultCurrency = typeof thisWidget.options.defaultCurrency == "string" ? thisWidget.options.defaultCurrency : thisWidget.defaults.currencyCode;

							// TODO - make action list from the filter

							var itemsVisible = 0;

							try {
								if (!window.mwdspace.validCurrencyList) {
									throw new Error("List of valid currencies not found");
								}
								if (jqCurrencySelect.length !== 1) {
									throw new Error("Unable to identify the currency select dropdown");
								}
								var domThisOption, thisCurrency, okToBuild;

								for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
									okToBuild = true;
									thisCurrency = window.mwdspace.validCurrencyList[i];
									if (filterList) {
										okToBuild = _typeof(filterList[thisCurrency.code]) == "object";
									}
									if (okToBuild) {
										domThisOption = buildCurrencyOption(thisCurrency);
										if (domThisOption) {
											jqCurrencySelect.append(domThisOption);
											itemsVisible++;
										} else {
											if (window.console) console.warn("Unable to add currency:", thisCurrency);
										}
									}
								}

								jqCurrencySelect.val(defaultCurrency).trigger("change");
								if (itemsVisible == 1) {
									jqCurrencySelect.hide();
								} else {
									jqCurrencySelect.show();
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the currency select dropdown", err);
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
								if (window.console) console.warn("cleanCurrency() given empty input");
								var input = "";
							}
							input = "" + input;
							var rawCurrency = parseFloat(input.replace(/[^0-9|\.]/g, ""));
							if (isNaN(rawCurrency)) {
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
								if (window.console) console.warn("buildGiftStringButton(): ignoring invalid option object", options);
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
								if (window.console) console.error("Error building the button for fixed amount:", input, err);
							}
							return domButton;
						};

						buildGiftStringButtons = function buildGiftStringButtons(giftStringList) {
							// if (window.console) console.log(">>> buildGiftStringButtons()", giftStringList);
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
										if (window.console) console.warn("Unable to add fixed gift button:", thisAmount);
									}
								}
								// below is in progress
								if (defaultId) {
									jqGiftStringContainer.find("div.giftAmountContainer input#" + defaultId).prop("checked", true).trigger("change");
								} else {
									jqGiftStringContainer.find("div.giftAmountContainer input[name='giftAmountFixed']").eq(1).prop("checked", true).trigger("change");
								}
							} catch (err) {
								if (window.console) console.error("Unable to build the fixed gift buttons", err);
							}
						};

						getCurrencySpecificGiftString = function getCurrencySpecificGiftString(type) {
							if (typeof type == "undefined") {
								var type = "";
							}
							var propertyName = "giftStringSingle";
							if (type == "monthly") {
								propertyName = "giftStringMonthly";
							}
							try {
								var giftStringList = thisWidget.options.filterListCurrency[window.mwdspace.userInputData.giftCurrency][propertyName];
								if (giftStringList && giftStringList.length > 0) {
									return giftStringList;
								}
							} catch (err) {
								if (window.console) console.warn("getCurrencySpecificGiftString() caught error: ", err.name, err.message);
							}

							return false;
						};

						getGiftString = function getGiftString() {
							// if (window.console) console.log(">>> getGiftString()");
							var giftStringOptions = {
								minimumGiftAmount: thisWidget.currentGiftMinimum
								// basicRounding: true,
								// minimumDynamicStart: 30.0,
							};
							if (window.mwdspace.userInputData.giftFrequency == "monthly") {
								if (thisWidget.options.giftStringMonthly) {
									var tempGiftString = getCurrencySpecificGiftString("monthly");
									if (tempGiftString) {
										// use given currency specific monthly amounts
										giftStringOptions.giftStringList = tempGiftString;
									} else {
										tempGiftString = getCurrencySpecificGiftString("single");
										if (tempGiftString) {
											// convert currency specific single gifts into monthly amounts
											giftStringOptions.calculateAsMonthly = true;
											giftStringOptions.giftStringList = tempGiftString;
										} else {
											// use default monthly
											giftStringOptions.giftStringList = thisWidget.options.giftStringMonthly;
										}
									}
								}
							} else {
								if (thisWidget.options.giftStringSingle) {
									// use given currency specific monthly amounts, with default as backup
									giftStringOptions.giftStringList = getCurrencySpecificGiftString("single") || thisWidget.options.giftStringSingle;
								}
							}

							var finalGiftString = window.mwdspace.giftUtils.processGiftStringList(giftStringOptions);

							buildGiftStringButtons(finalGiftString);
							setCurrencyDisplaySymbol();
						};

						sendTransaction = function sendTransaction() {
							if (!window.mwdspace.transactionLayer.validateSendData(window.mwdspace.transactionSendData)) {
								return false;
							}

							// if (window.console) console.log("sendTransaction() SENDING", window.mwdspace.transactionSendData);

							prepAndShowProcessingStep();

							window.mwdspace.transactionLayer.startDonation(window.mwdspace.transactionSendData, function (response) {
								var transactionData = response.json || {};

								if (window.console) console.log("transactionData", transactionData);

								if (transactionData.type == "bitcoin") {
									prepAndShowBitcoinStep(transactionData);
								} else {
									var transactionStatus = String(transactionData.status);
									if (transactionStatus.match(/complete/i)) {
										prepAndShowConfirmationStep();
									} else {
										prepAndShowErrorStep('The server appears to have had an error processing this card transaction, and reported status "' + transactionStatus + '".');
									}
								}
							}, function (response) {
								if (window.console) console.warn("Donation received fail response from server", response);

								var userMessage;
								if (response.text) {
									// pass thru the transaction system response text
									userMessage = "Server message:";
									try {
										userMessage = thisWidget.labelOverride.transactionError.error.systemMessage || userMessage;
									} catch (err) {}
									userMessage += " " + response.text;
								} else {
									userMessage = "The server was unable to process the transaction, but provided no explanation.";
									try {
										userMessage = thisWidget.labelOverride.transactionError.error.unknown || userMessage;
									} catch (err) {}
									try {
										userMessage += " <span class='hint'>(HTML status: " + (response.status || "[No Status]") + " " + (response.statusText || "[No Text]") + ")</span>";
									} catch (err) {
										if (window.console) console.log("Caught error: ", err.message);
									}
								}

								prepAndShowErrorStep(userMessage);
							});
							return true;
						};

						buildTransactionSendData = function buildTransactionSendData() {
							// if (window.console) console.log("buildTransactionSendData() START");
							try {
								window.mwdspace.transactionSendData = {};
								var sendData = window.mwdspace.transactionSendData;

								var userData = window.mwdspace.userInputData;
								// if (window.console) console.log("buildTransactionSendData() userData", userData);

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

								sendData.amount = userData.totalAmount || 0;
								sendData.baseAmount = Number(userData.baseAmount || 0).toFixed(2); //mimic test
								sendData.tipAmount = Number(userData.extraAmount || 0).toFixed(2); //mimic test
								sendData.tipPercent = Number(userData.extraPercent || 0).toFixed(2); //mimic test

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

								return true;
							} catch (err) {
								if (window.console) console.warn("buildTransactionSendData() caught error: ", err.message);
							}
							return false;
						};

						setInputValue = function setInputValue(selector, value) {
							if (typeof selector == "undefined" || !selector) {
								if (window.console) console.log("setInputValue() given invalid selector", selector);
								return;
							}
							var jqTargets = jqContainer.find("section.step input[name='" + selector + "'], section.step select[name='" + selector + "']");
							if (jqTargets.length > 0) {
								jqTargets.val(value).trigger("change");
								return true;
							}
							return false;
						};

						setInputFromStorage = function setInputFromStorage(selector) {
							if (typeof selector == "undefined" || !selector) {
								if (window.console) console.log("setInputFromStorage() given invalid selector", selector);
								return;
							}
							var storedValue = window.mwdspace.sharedUtils.getLocalValue(selector, {
								prefix: false
							});
							if (storedValue) {
								return setInputValue(selector, storedValue);
							}
							return false;
						};

						setInputFromUrl = function setInputFromUrl(urlKey, selector) {
							if (typeof urlKey == "undefined" || !urlKey) {
								if (window.console) console.log("setInputFromUrl() given invalid urlKey", urlKey);
								return;
							}
							if (typeof selector == "undefined" || !selector) {
								if (window.console) console.log("setInputFromUrl() given invalid selector", selector);
								return;
							}
							var urlValue = window.mwdspace.sharedUtils.getUrlParameter(urlKey);
							if (urlValue) {
								return setInputValue(selector, urlValue);
							}
							return false;
						};

						checkPrePopulationSources = function checkPrePopulationSources(urlKey, selector) {
							// check for and set value from url first
							if (!setInputFromUrl(urlKey, selector)) {
								// check storage if no url value exists
								setInputFromStorage(selector);
							}
						};

						prePopulateUserFields = function prePopulateUserFields() {
							// populate from URL or storage
							checkPrePopulationSources("first", "donorFirstName");
							checkPrePopulationSources("last", "donorLastName");
							checkPrePopulationSources("email", "donorEmail");
							checkPrePopulationSources("phone", "donorPhone");
							checkPrePopulationSources("street", "donorStreet");
							checkPrePopulationSources("city", "donorCity");
							checkPrePopulationSources("postcode", "donorPostCode");
							checkPrePopulationSources("country", "donorCountry");
							checkPrePopulationSources("region", "donorRegion"); //must occur after country

							// populate from url only
							setInputFromUrl("currency", "giftCurrency");
							setInputFromUrl("amount", "giftAmountFreeform");
						};

						updateFrequency = function updateFrequency(newValue) {
							// if (window.console) console.log(">>> updateFrequency()", newValue);
							if (typeof newValue == "undefined") {
								var newValue = null;
							}
							var donationAmountHeadline;
							switch (newValue) {
								case "single":
									donationAmountHeadline = "Your donation";
									try {
										if (thisWidget.labelOverride.header.singleDonationText) donationAmountHeadline = thisWidget.labelOverride.header.singleDonationText;
									} catch (err) {}
									break;
								case "monthly":
									donationAmountHeadline = "Your recurring donation";
									try {
										if (thisWidget.labelOverride.header.monthlyDonationText) donationAmountHeadline = thisWidget.labelOverride.header.monthlyDonationText;
									} catch (err) {}
									break;
								default:
									donationAmountHeadline = "UNKNOWN DONATION FREQUENCY";
							}

							thisWidget.setElementLabelOverride("header.donationText", donationAmountHeadline);

							getGiftString();
						};

						setFrequencyButtonVisibility = function setFrequencyButtonVisibility(frequencyList) {
							// if (window.console) console.log(">>> setFrequencyButtonVisibility()");
							if ((typeof frequencyList === "undefined" ? "undefined" : _typeof(frequencyList)) != "object" || frequencyList.length < 1) {
								if (window.console) console.warn("setFrequencyButtonVisibility() ignoring invalid frequency list", frequencyList);
								return;
							}

							var actionList = [];
							var itemsVisible = 0;
							var selectedOptionNowHidden = false;

							var thisFrequency;
							jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton input[type='radio']").each(function () {
								thisFrequency = {
									jqObject: jq(this),
									show: true
								};
								if (frequencyList.indexOf(thisFrequency.jqObject.val()) >= 0) {
									// show this frequency
									itemsVisible++;
								} else {
									// hide this frequency
									thisFrequency.show = false;
									if (thisFrequency.jqObject.prop("checked")) {
										selectedOptionNowHidden = true;
									}
								}
								actionList.push(thisFrequency);
							});

							if (itemsVisible < 1) {
								// something is wrong, show all
								jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").show();
							} else if (itemsVisible == 1) {
								// hide all
								jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").hide();
							} else {
								// show/hide according to action list
								for (var i = 0; i < actionList.length; i++) {
									if (actionList[i].show) {
										actionList[i].jqObject.closest("div.fancyRadioButton").show();
									} else {
										actionList[i].jqObject.closest("div.fancyRadioButton").hide();
									}
								}
							}

							if (selectedOptionNowHidden) {
								// auto select the first visible option
								for (var i = 0; i < actionList.length; i++) {
									if (actionList[i].show) {
										actionList[i].jqObject.prop("checked", true).trigger("change");
										break;
									}
								}
							}
						};

						updatePayMethod = function updatePayMethod() {
							// if (window.console) console.log(">>> updatePayMethod()");
							var payMethod = jqPayMethodSelect.val();
							var thisItem;
							for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
								thisItem = window.mwdspace.validPayMethodList[i];
								if (thisItem.code == payMethod) {
									if (thisItem.frequencies) {
										setFrequencyButtonVisibility(thisItem.frequencies);
									}
									break;
								}
							}
						};

						setCurrencyDisplaySymbol = function setCurrencyDisplaySymbol() {
							// if (window.console) console.log(">>> setCurrencyDisplaySymbol()");
							var currencyCode = jqCurrencySelect.val();
							var currencySymbol = "(?)";
							var thisItem;
							for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
								thisItem = window.mwdspace.validCurrencyList[i];
								thisWidget.currentGiftMinimum = thisItem.minimumAmount;
								if (thisItem.code == currencyCode && thisItem.symbol) {
									currencySymbol = thisItem.symbol;
									break;
								}
							}
							thisWidget.currentCurrencySymbol = currencySymbol;
							jqContainer.find("span.currencySymbol").html(currencySymbol);
						};

						updateGiftAmount = function updateGiftAmount(input) {
							// if (window.console) console.log(">>> updateGiftAmount()", input);
							if (typeof input == "undefined") {
								var input = {};
							}
							try {
								userInputData.totalAmount = userInputData.totalAmount || 0;
								userInputData.baseAmount = userInputData.baseAmount || 0;
								userInputData.extraAmount = userInputData.extraAmount || 0;
								userInputData.extraPercent = userInputData.extraPercent || 0;

								if (typeof input.baseAmount != "undefined") {
									userInputData.baseAmount = parseFloat(input.baseAmount) || 0.0;
								}
								if (typeof input.extraPercent != "undefined") {
									userInputData.extraPercent = parseFloat(input.extraPercent) || 0.0;
								}
								userInputData.extraAmount = userInputData.baseAmount * userInputData.extraPercent / 100;
								userInputData.totalAmount = userInputData.baseAmount + userInputData.extraAmount;

								var displayAmount = userInputData.totalAmount.toFixed(2).split(".");
								jqContainer.find("div.amountDisplay span.displayWholeAmount").text(displayAmount[0] || "??");
								jqContainer.find("div.amountDisplay span.displaySubAmount").text("." + displayAmount[1] || "??");
							} catch (err) {
								if (window.console) console.log("updateGiftAmount() caught error: ", err.message);
							}
						};

						processGiftAmountChange = function processGiftAmountChange(event) {
							var jqTarget = jq(event.target);
							// if (window.console) console.log(">>> processGiftAmountChange()", event.type, jqTarget.attr("name"));
							var newValue = cleanCurrency(jqTarget.val()) || 0.0;
							updateGiftAmount({ baseAmount: newValue });
							jqContainer.find("div.giftOption input").removeClass("selected");

							jqTarget.addClass("selected");
							if (event.type == "change") {
								jqGiftHeaderContainer.slideDown(666, function () {
									scrollAll(jqContainer);
								});
							}
							if (event.type == "change" || event.type == "blur") {
								if (jqTarget.attr("name") == "giftAmountFreeform") {
									var amount = cleanCurrency(newValue) || 0.0;
									var cleanedAmount = amount.toFixed(2);
									if (cleanedAmount != newValue) {
										jqTarget.val(cleanedAmount);
									}
								}
								if (amount < thisWidget.currentGiftMinimum) {
									jqFreeFormGiftInput.addClass("invalid");
								} else {
									jqFreeFormGiftInput.removeClass("invalid");
								}
								jqContainer.find("div.giftOption input[type='radio']").prop("checked", false);
							}
						};

						validateInputField = function validateInputField(jqThis, options) {
							// if (window.console) console.log("validateInputField()", jqThis, options);
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
							// if (window.console) console.log("processChangeWatch()", jqThis, options);
							if (typeof options == "undefined") {
								var options = {};
							}

							var isValid = true;
							var validatedValue = null; // kill the stored value when not valid

							options.validationPattern = jqThis.attr("data-validation");
							if (options.validationPattern) {
								isValid = validateInputField(jqThis, options);
							}

							if (isValid) {
								var elementType = jqThis.attr("type");
								if (elementType == "checkbox" || elementType == "radio") {
									if (jqThis.prop("checked")) {
										// set value only if boolean input checked
										validatedValue = options.value;
									}
								} else {
									validatedValue = options.value;
								}
							}
							userInputData[options.name] = validatedValue;

							window.mwdspace.sharedUtils.setLocalValue(options.name, options.value, {
								prefix: false
							});
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
									setCurrencyDisplaySymbol();
									getGiftString();
								} else if (name == "payMethod" && tag == "select") {
									updatePayMethod();
								} else if (name == "giftFrequency" && tag == "input") {
									updateFrequency(newValue);
								}
							});

							// AMOUNT - also show header display
							jqContainer.find('div.giftOption input[name="giftAmountFreeform"]').on("focus keyup paste", function (event) {
								processGiftAmountChange(event);
							});

							// CURRENCY
							// if (window.console) console.log('jqCurrencySelect.trigger("change");');
							// jqCurrencySelect.trigger("change");

							// PAYMENT METHOD
							// if (window.console) console.log('jqPayMethodSelect.trigger("change");');
							// jqPayMethodSelect.trigger("change");

							// FREQUENCY
							// if (window.console) console.log('jqContainer.trigger("change");');
							// jqContainer.trigger("change");

							// COMPANY MATCH - also show/hide company match input fields
							jqContainer.find("input#inputCompanyMatch").on("change", function () {
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

						showIntroContent = function showIntroContent() {
							// check for intro content (from label override)
							var jqIntroContent = jqGiftHeaderContainer.find("div.introContentContainer");
							if (jqIntroContent.html() != "") {
								jqGiftHeaderContainer.find("div.giftFormHeader").addClass("showIntro");
								jqGiftHeaderContainer.show();
							}
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
								if (window.console) console.log("showStepFeedback() given invalid input", stepName, message);
							}
							var jqFeedback = jq('section[data-step-name="' + stepName + '"] div.userFeedback p.message');
							if (message || isError) {
								jqFeedback.html(message || "Sorry, an unknown error occured").fadeIn(444);
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
							var isValid = true;

							jqContainer.find("section.step[data-step-name='cardInfo'] .changeWatch").trigger("change");

							var jqCardNumberBox = jqContainer.find("div.payInfoContainer div#cardNumberTarget");
							if (userInputData.hasValidCardNumber === true) {
								jqCardNumberBox.removeClass("invalid");
							} else {
								isValid = false;
								jqCardNumberBox.addClass("invalid");
								if (window.console) console.warn("hasValidCardNumber is invalid", userInputData.hasValidCardNumber);
							}
							var jqCardCvvBox = jqContainer.find("div.payInfoContainer div#cardCvvTarget");
							if (userInputData.hasValidCardCvv === true) {
								jqCardCvvBox.removeClass("invalid");
							} else {
								isValid = false;
								jqCardCvvBox.addClass("invalid");
								if (window.console) console.warn("hasValidCardCvv is invalid", userInputData.hasValidCardCvv);
							}

							if (typeof userInputData.payCardExpireMonth != "string") {
								if (window.console) console.warn("payCardExpireMonth is invalid", userInputData.payCardExpireMonth);
								isValid = false;
							}
							if (typeof userInputData.payCardExpireYear != "string") {
								if (window.console) console.warn("payCardExpireYear is invalid", userInputData.payCardExpireYear);
								isValid = false;
							}

							return isValid;
						};

						checkStepDonor = function checkStepDonor() {
							var isValid = true;

							jqContainer.find("section.step[data-step-name='donorInfo'] .changeWatch").each(function () {
								if (jq(this).attr("name") != "donorCountry" && jq(this).css("display") != "none") {
									jq(this).trigger("change");
								}
							});
							userInputData.donorCountry = jqContainer.find("div.billingInfoContainer select[name='donorCountry']").val() || null;

							if (typeof userInputData.donorFirstName != "string") {
								if (window.console) console.warn("donorFirstName is invalid", userInputData.donorFirstName);
								isValid = false;
							}
							if (typeof userInputData.donorLastName != "string") {
								if (window.console) console.warn("donorLastName is invalid", userInputData.donorLastName);
								isValid = false;
							}
							if (typeof userInputData.donorEmail != "string") {
								if (window.console) console.warn("donorEmail is invalid", userInputData.donorEmail);
								isValid = false;
							}
							if (typeof userInputData.donorPhone != "undefined" && typeof userInputData.donorPhone != "string") {
								if (window.console) console.warn("donorPhone is invalid", userInputData.donorPhone);
								isValid = false;
							}
							if (typeof userInputData.donorStreet != "string") {
								if (window.console) console.warn("donorStreet is invalid", userInputData.donorStreet);
								isValid = false;
							}
							if (typeof userInputData.donorRegion != "string") {
								if (window.console) console.warn("donorRegion is invalid", userInputData.donorRegion);
								isValid = false;
							}
							if (typeof userInputData.donorPostCode != "string") {
								if (window.console) console.warn("donorPostCode is invalid", userInputData.donorPostCode);
								isValid = false;
							}
							if (typeof userInputData.donorCountry != "string") {
								if (window.console) console.warn("donorCountry is invalid", userInputData.donorCountry);
								isValid = false;
							}
							if (userInputData.companyMatch == "on") {
								if (typeof userInputData.donorMatchCompany != "string") {
									if (window.console) console.warn("donorMatchCompany is invalid", userInputData.donorMatchCompany);
									isValid = false;
								}
								if (typeof userInputData.donorMatchEmail != "string") {
									if (window.console) console.warn("donorMatchEmail is invalid", userInputData.donorMatchEmail);
									isValid = false;
								}
							}

							return isValid;
						};

						checkStepGift = function checkStepGift() {
							var isValid = true;

							if (typeof userInputData.baseAmount != "number" || userInputData.baseAmount < thisWidget.currentGiftMinimum) {
								if (window.console) console.warn("baseAmount is invalid", userInputData.baseAmount);
								isValid = false;
								var message = "Please enter an amount of at least";
								try {
									message = thisWidget.labelOverride.gift.error.invalidAmount || message;
								} catch (err) {}
								message += " " + thisWidget.currentCurrencySymbol + thisWidget.currentGiftMinimum;
								showStepFeedback("giftAmount", message, true);
							} else {
								showStepFeedback("giftAmount");
							}
							if (typeof userInputData.giftCurrency != "string") {
								if (window.console) console.warn("Currency is invalid", userInputData.giftCurrency);
								isValid = false;
							}
							if (typeof userInputData.payMethod != "string") {
								if (window.console) console.warn("Pay Method is invalid", userInputData.payMethod);
								isValid = false;
							}
							if (typeof userInputData.giftFrequency != "string") {
								if (window.console) console.warn("Gift frequency is invalid", userInputData.giftFrequency);
								isValid = false;
							}

							return isValid;
						};

						showStep = function showStep(targetStepName) {
							window.mwdspace.currentStepName = "";
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
									// SHOW THIS STEP
									// handle back button visibility
									switch (targetStepName) {
										case "donorInfo":
										case "cardInfo":
											jqContainer.find("div.giftFormHeaderContainer").show();
											jqMainBackButton.fadeIn(888);
											break;
										default:
											jqMainBackButton.hide();
									}
									// handle button text
									if (targetStepName == "donorInfo") {
										var buttonText;
										// TODO - make function to create all next buttons on the fly (and indicate action)
										switch (window.mwdspace.userInputData.payMethod) {
											case "card":
												if (window.console) console.warn("Making next button");
												buttonText = "Enter Payment Information";
												try {
													if (thisWidget.labelOverride.button.goPaymentInfo) buttonText = thisWidget.labelOverride.button.goPaymentInfo;
												} catch (err) {}
												break;
											case "bitcoin":
												if (window.console) console.warn("Making submit button");
												buttonText = "Submit Donation";
												try {
													if (thisWidget.labelOverride.button.mainSubmit) buttonText = thisWidget.labelOverride.button.mainSubmit;
												} catch (err) {}
												break;
										}
										thisWidget.setElementLabelOverride("button.goPaymentInfo", buttonText);
									}
									jq(jqStepList[i]).fadeIn(666, function () {
										scrollAll(jqContainer);
									});
									window.mwdspace.currentStepName = thisName;
									if (targetStepName == "confirmation") {
										window.mwdspace.sharedUtils.removeSessionValue("savedStepName");
									}
								} else {
									//HIDE THIS STEP
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
											buildTransactionSendData();
											return sendTransaction();
										}
									}
									break;
								case "cardInfo":
									if (checkStepCard()) {
										buildTransactionSendData();
										return tokenizeUserCard();
									}
									break;
							}
							return false;
						};

						thisWidget = this;


						if (typeof thisWidget.jquery !== "function") {
							if (window.console) console.error("jQuery (thisWidget.jquery) not found");
							exit();
						}
						jq = thisWidget.jquery;
						// if (window.console) console.log("MFA_Funraise_Widget using jQuery version", jq.fn.jquery);

						window.mwdspace.userInputData = {};
						window.mwdspace.transactionSendData = {};
						userInputData = window.mwdspace.userInputData;

						thisWidget.currentGiftMinimum = thisWidget.defaults.minimumGiftAmount;

						window.mwdspace.pageIdPrefix = "widget" + thisWidget.options.formId;

						// JQUERY OBJECTS
						jqContainer = jq("div.giftFormContainer");
						jqStepList = jqContainer.find("section.step");
						jqGiftHeaderContainer = jqContainer.find("div.giftFormHeaderContainer");
						jqMainBackButton = jqContainer.find("button.goPreviousStep");
						jqFreeFormGiftInput = jqContainer.find('input[name="giftAmountFreeform"]');
						jqPayMethodSelect = jqContainer.find('select[name="payMethod"]');
						jqRegionSelect = jqContainer.find('select[name="donorRegion"]');
						jqRegionInput = jqContainer.find('input[name="donorRegion"]');
						jqCurrencySelect = jqContainer.find('select[name="giftCurrency"]');
						jqCardNumberFeedback = jqContainer.find("div.payInfoContainer div.cardNumberFeedback");
						jqBitcoinTimeRemaining = jqContainer.find("div.bitcoinContainer span.bitcoinTimeRemaining");

						// TEST MODE

						inTestMode = window.mwdspace.sharedUtils.getUrlParameter("test") == "true";

						if (inTestMode) {
							if (window.console) console.warn("TEST MODE - mwd-donate-widget.js");
							jqContainer.find("div.testModeContainer").slideDown(999);
						}

						thisWidget.promises.labelOverrideLoad = thisWidget.prepareLabelOverride();

						setOptionalSectionVisibility();

						buildCountrySelect();
						buildCardExpireMonthSelect();
						buildCardExpireYearSelect();
						setupCompanyMatchSelect();

						setupInputWatchers();
						buildPayMethodSelect();

						// ensure text override file load (if any) is complete
						_context5.next = 88;
						return thisWidget.promises.labelOverrideLoad;

					case 88:
						if (thisWidget.labelOverride) {
							thisWidget.processLabelOverrideObject(thisWidget.labelOverride);
							showIntroContent();
						}

						buildCurrencySelect();
						buildFrequencyButtons();
						updateGiftAmount();
						prePopulateUserFields();

						showStep();

						promiseSpreedly = setupSpreedly(); //async, but waiting not required

						// GENERAL CLICK HANDLER

						document.addEventListener("click", function (event) {
							// if (window.console) console.log("click", event.target.tagName, event.target.className);
							var clickTarget = jq(event.target).closest("button, .clickTarget");
							if (clickTarget) {
								if (clickTarget.hasClass("goNextStep")) {
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
								} else if (clickTarget.hasClass("infoIcon")) {
									clickTarget.trigger("hover");
								}
							}
						});

						setTimeout(function () {
							thisWidget.allowAutoScroll = true;
						}, 999);

						_context5.next = 99;
						return promiseSpreedly;

					case 99:
						thisWidget.isLoaded = true;
						if (thisWidget.options.onLoad) {
							try {
								if (window.console) console.log(">>> Calling custom onLoad function");
								thisWidget.options.onLoad();
							} catch (err) {
								if (window.console) console.error("Caught error from onLoad function: ", err.message);
							}
						}

						// Evaluate the existing HTML buttons and hide or show


						/* remove all but digits/dot before converting to float and rounding to 2 digits */


						/* remove all chars but digits/dot before convert to float */

					case 101:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function (url) {
		var thisWidget = this;
		return new Promise(function (resolve) {
			// if (window.console) console.log("linkExternalStylesheet() start:", url);
			var domStyleLink = document.createElement("link");
			thisWidget.domTargetElement.appendChild(domStyleLink);
			domStyleLink.rel = "stylesheet";
			domStyleLink.type = "text/css";
			var timeout = setTimeout(function () {
				if (window.console) console.log("linkExternalStylesheet() No load after 5s", url);
				resolve(false);
			}, 5000);
			domStyleLink.addEventListener("load", function (event) {
				clearTimeout(timeout);
				// if (window.console) console.log("STYLESHEET LOADED:", url);
				resolve(true);
			});
			domStyleLink.addEventListener("error", function (event) {
				if (window.console) console.error("linkExternalStylesheet() ERROR EVENT", url, event);
				resolve(false);
			});
			domStyleLink.href = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function (url) {
		var thisWidget = this;
		return new Promise(function (resolve) {
			// if (window.console) console.log("linkExternalScript() start:", url);
			var domScript = document.createElement("script");
			thisWidget.domTargetElement.appendChild(domScript);
			var timeout = setTimeout(function () {
				if (window.console) console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			domScript.addEventListener("load", function (event) {
				clearTimeout(timeout);
				// if (window.console) console.log("SCRIPT LOADED:", url);
				resolve(true);
			});
			domScript.addEventListener("error", function (event) {
				clearTimeout(timeout);
				if (window.console) console.error("linkExternalScript() ERROR", url, event);
				resolve(false);
			});
			domScript.src = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = function (input) {
		var thisWidget = this;
		return new Promise(function (resolve) {
			if (typeof input == "undefined") {
				if (window.console) console.warn("loadFile() given empty url");
				resolve(null);
			}
			if (typeof input != "string") {
				if (window.console) console.warn("loadFile() given invalid url type:", typeof input === "undefined" ? "undefined" : _typeof(input), input);
				resolve(null);
			}
			// if (window.console) console.log("loadFile() start:", input);
			var requestUrl = encodeURI(input);
			var xhr = new XMLHttpRequest();

			var timeout = setTimeout(function () {
				if (window.console) console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			xhr.addEventListener("load", function (event) {
				clearTimeout(timeout);
				// if (window.console) console.log("FILE LOADED:", input);
				var fileContents = event.target.responseText || event.target.response || null;
				resolve(fileContents);
			});
			xhr.addEventListener("error", function (event) {
				clearTimeout(timeout);
				if (window.console) console.error("loadFile() ERROR EVENT", requestUrl, event);
				resolve(null);
			});

			xhr.open("get", requestUrl, true);
			xhr.send();
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.getFontIconStyles = function () {
		var _this2 = this;

		var thisWidget = this;
		return new Promise(function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve) {
				var fontsLoaded;
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								fontsLoaded = false;

								if (!(thisWidget.options.fontAwesomeVersion == 4)) {
									_context6.next = 7;
									break;
								}

								_context6.next = 4;
								return thisWidget.linkExternalStylesheet(thisWidget.urls.fontAwesome4);

							case 4:
								fontsLoaded = _context6.sent;
								_context6.next = 11;
								break;

							case 7:
								if (!(thisWidget.options.fontAwesomeVersion == 5)) {
									_context6.next = 11;
									break;
								}

								_context6.next = 10;
								return thisWidget.linkExternalStylesheet(thisWidget.urls.fontAwesome5);

							case 10:
								fontsLoaded = _context6.sent;

							case 11:
								return _context6.abrupt("return", resolve(fontsLoaded));

							case 12:
							case "end":
								return _context6.stop();
						}
					}
				}, _callee6, _this2);
			}));

			return function (_x3) {
				return _ref8.apply(this, arguments);
			};
		}());
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.prepareLabelOverride = function () {
		var _this3 = this;

		var thisWidget = this;
		return new Promise(function () {
			var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve) {
				var overrideFileContents, tempObject;
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								if (!thisWidget.options.labelOverrideObject) {
									_context7.next = 6;
									break;
								}

								if (window.console) console.log("Using label object");
								thisWidget.labelOverride = thisWidget.options.labelOverrideObject;
								resolve(true);
								_context7.next = 18;
								break;

							case 6:
								if (!thisWidget.options.labelOverrideFileUrl) {
									_context7.next = 18;
									break;
								}

								_context7.prev = 7;

								if (window.console) console.log("Loading label file:", thisWidget.options.labelOverrideFileUrl);
								_context7.next = 11;
								return thisWidget.loadFile(thisWidget.options.labelOverrideFileUrl);

							case 11:
								overrideFileContents = _context7.sent;

								if (overrideFileContents) {
									tempObject = window.mwdspace.sharedUtils.safeJsonParse(overrideFileContents);

									if (tempObject) {
										thisWidget.labelOverride = tempObject;
										resolve(true);
									} else {
										if (window.console) console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to parse text override data from file:", thisWidget.options.labelOverride);
									}
								} else {
									if (window.console) console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to load file for text override data:", thisWidget.options.labelOverride);
								}
								_context7.next = 18;
								break;

							case 15:
								_context7.prev = 15;
								_context7.t0 = _context7["catch"](7);

								if (window.console) console.log("prepareLabelOverride() caught error: ", _context7.t0.message);

							case 18:

								resolve(false);

							case 19:
							case "end":
								return _context7.stop();
						}
					}
				}, _callee7, _this3, [[7, 15]]);
			}));

			return function (_x4) {
				return _ref9.apply(this, arguments);
			};
		}());
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.processLabelOverrideObject = function (input, prefix) {
		var thisWidget = this;
		if ((typeof input === "undefined" ? "undefined" : _typeof(input)) != "object" || !input) {
			if (window.console) console.warn("MFA_Funraise_Widget.processLabelOverrideObject() given invalid object", typeof input === "undefined" ? "undefined" : _typeof(input));
			return false;
		}
		if (typeof prefix == "undefined") {
			var prefix = "";
		}
		if (typeof prefix != "string") {
			if (window.console) console.warn("Ignoring invalid string prefix value", prefix);
			prefix = "";
		}
		if (prefix) {
			prefix = prefix + ".";
		}
		var thisSelector;
		for (var key in input) {
			thisSelector = prefix + key;
			if (typeof input[key] == "string") {
				thisWidget.setElementLabelOverride(thisSelector, input[key]);
			} else {
				// recursive, to handle nested JSON objects
				thisWidget.processLabelOverrideObject(input[key], thisSelector);
			}
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setElementLabelOverride = function (labelId, value) {
		var thisWidget = this;
		if (typeof labelId == "undefined") {
			var labelId = "";
		}
		if (!labelId) {
			if (window.console) console.warn("setElementLabelOverride() given empty labelId");
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
						if (window.console) console.warn("setElementLabelOverride(): Ignoring tag", labelId, thisTag);
				}
			}
		} else {
			if (window.console) console.warn("REPLACE labelId not found", labelId);
		}
	};
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvbXdkLWRvbmF0ZS13aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7QUFDQSxDQUFDLFlBQVc7QUFDWCxLQUFJLE9BQU8sT0FBWCxFQUFvQixRQUFRLEdBQVIsQ0FBWSwrQkFBWjs7QUFFcEIsUUFBTyxRQUFQLEdBQWtCLE9BQU8sUUFBUCxJQUFtQixFQUFyQzs7QUFFQSxRQUFPLFFBQVAsQ0FBZ0IsbUJBQWhCLEdBQXNDLFVBQVMsS0FBVCxFQUFnQjtBQUNyRCxNQUFJLGFBQWEsSUFBakI7QUFDQSxNQUFJLE9BQU8sS0FBUCxJQUFnQixXQUFwQixFQUFpQztBQUNoQyxPQUFJLFFBQVEsRUFBWjtBQUNBOztBQUVELGFBQVcsU0FBWCxHQUF1QixLQUF2QjtBQUNBLGFBQVcsUUFBWCxHQUFzQixLQUF0QjtBQUNBLGFBQVcsZUFBWCxHQUE2QixLQUE3QjtBQUNBLGFBQVcsV0FBWCxHQUF5QixPQUF6Qjs7QUFFQSxhQUFXLGdCQUFYLEdBQThCLEVBQTlCO0FBQ0EsYUFBVyxRQUFYLEdBQXNCLEVBQXRCO0FBQ0EsYUFBVyxTQUFYLEdBQXVCLEVBQXZCO0FBQ0EsYUFBVyxJQUFYLEdBQWtCLEVBQWxCO0FBQ0EsYUFBVyxRQUFYLEdBQXNCLEVBQXRCO0FBQ0EsYUFBVyxPQUFYLEdBQXFCLEVBQXJCOztBQUVBLGFBQVcsZUFBWDtBQUNBLGFBQVcsY0FBWCxDQUEwQixLQUExQjs7QUFFQSxNQUFJLFNBQVMsU0FBUyxnQkFBVCxDQUEwQixXQUFXLE9BQVgsQ0FBbUIsT0FBN0MsQ0FBYjtBQUNBLE1BQUksQ0FBQyxNQUFMLEVBQWE7QUFDWixPQUFJLE9BQU8sT0FBWCxFQUNDLFFBQVEsS0FBUixDQUNDLDREQURELEVBRUMsV0FBVyxPQUFYLENBQW1CLE9BRnBCO0FBSUQsVUFBTyxLQUFQO0FBQ0E7QUFDRCxNQUFJLE9BQU8sTUFBUCxHQUFnQixD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bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwibXdkLWRvbmF0ZS13aWRnZXQuanMgdjE4LjcuMjdcIik7XG5cblx0d2luZG93Lm13ZHNwYWNlID0gd2luZG93Lm13ZHNwYWNlIHx8IHt9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0ID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgaW5wdXQgPSB7fTtcblx0XHR9XG5cblx0XHR0aGlzV2lkZ2V0LmlzU3RhcnRlZCA9IGZhbHNlO1xuXHRcdHRoaXNXaWRnZXQuaXNMb2FkZWQgPSBmYWxzZTtcblx0XHR0aGlzV2lkZ2V0LmFsbG93QXV0b1Njcm9sbCA9IGZhbHNlO1xuXHRcdHRoaXNXaWRnZXQuY29kZVZlcnNpb24gPSBcIjEuMC4wXCI7XG5cblx0XHR0aGlzV2lkZ2V0LmRvbVRhcmdldEVsZW1lbnQgPSB7fTtcblx0XHR0aGlzV2lkZ2V0LnByb21pc2VzID0ge307XG5cdFx0dGhpc1dpZGdldC5pbnRlcnZhbHMgPSB7fTtcblx0XHR0aGlzV2lkZ2V0LnVybHMgPSB7fTtcblx0XHR0aGlzV2lkZ2V0LmRlZmF1bHRzID0ge307XG5cdFx0dGhpc1dpZGdldC5vcHRpb25zID0ge307XG5cblx0XHR0aGlzV2lkZ2V0LnNldFN5c3RlbVZhbHVlcygpO1xuXHRcdHRoaXNXaWRnZXQuc2V0VXNlck9wdGlvbnMoaW5wdXQpO1xuXG5cdFx0dmFyIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpc1dpZGdldC5vcHRpb25zLmVsZW1lbnQpO1xuXHRcdGlmICghdGFyZ2V0KSB7XG5cdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdFx0XCJNRkFfRnVucmFpc2VfV2lkZ2V0KCk6IHNwZWNpZmllZCB0YXJnZXQgZWxlbWVudCBub3QgZm91bmQ6XCIsXG5cdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmVsZW1lbnRcblx0XHRcdFx0KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKHRhcmdldC5sZW5ndGggPiAxKSB7XG5cdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcIk1GQV9GdW5yYWlzZV9XaWRnZXQoKTogdXNpbmcgMXN0IG9mIG11bHRpcGxlIHRhcmdldCBlbGVtZXRzIGZvdW5kOlwiLFxuXHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5lbGVtZW50XG5cdFx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXNXaWRnZXQuZG9tVGFyZ2V0RWxlbWVudCA9IHRhcmdldFswXTtcblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUuc2V0U3lzdGVtVmFsdWVzID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gTE9DQVRJT04gVVJMU1xuXHRcdHRoaXNXaWRnZXQudXJscy5iYXNlID1cblx0XHRcdFwiaHR0cHM6Ly9xdWl6Lm1lcmN5Zm9yYW5pbWFscy5vcmcvZG9uYXRlLXdpZGdldC9cIiArIHRoaXNXaWRnZXQuY29kZVZlcnNpb24gKyBcIi9cIjtcblx0XHR0aGlzV2lkZ2V0LnVybHMuZm9udEF3ZXNvbWU0ID1cblx0XHRcdFwiaHR0cHM6Ly9zdGFja3BhdGguYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI7XG5cdFx0dGhpc1dpZGdldC51cmxzLmZvbnRBd2Vzb21lNSA9XG5cdFx0XHRcImh0dHBzOi8vdXNlLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92NS4xLjAvY3NzL2FsbC5jc3NcIjtcblx0XHR0aGlzV2lkZ2V0LnVybHMuc3BlY2lhbFNlbGVjdFN0eWxlcyA9XG5cdFx0XHRcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbGVjdDIvNC4wLjYtcmMuMC9jc3Mvc2VsZWN0Mi5taW4uY3NzXCI7XG5cdFx0dGhpc1dpZGdldC51cmxzLnNwZWNpYWxTZWxlY3RTY3JpcHQgPVxuXHRcdFx0XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zZWxlY3QyLzQuMC42LXJjLjAvanMvc2VsZWN0Mi5taW4uanNcIjtcblx0XHR0aGlzV2lkZ2V0LnVybHMuc3ByZWVkbHlTY3JpcHQgPSBcImh0dHBzOi8vY29yZS5zcHJlZWRseS5jb20vaWZyYW1lL2lmcmFtZS12MS5taW4uanNcIjtcblx0XHR0aGlzV2lkZ2V0LnVybHMuanF1ZXJ5U2NyaXB0ID0gXCJodHRwczovL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy4zLjEubWluLmpzXCI7XG5cdFx0dGhpc1dpZGdldC51cmxzLmNvbXBhbnlNYXRjaEFwaSA9IFwiaHR0cHM6Ly9wbGF0Zm9ybS5mdW5yYWlzZS5pby9hcGkvdjEvZGRjb21wYW5pZXNcIjtcblx0XHR0aGlzV2lkZ2V0LnVybHMuYml0Y29pblBheW1lbnRBcGkgPSBcImh0dHBzOi8vYml0cGF5LmNvbS9cIjtcblx0XHR0aGlzV2lkZ2V0LnVybHMudGVzdEJpdGNvaW5QYXltZW50QXBpID0gXCJodHRwczovL3Rlc3QuYml0cGF5LmNvbS9cIjtcblxuXHRcdC8vIERFRkFVTFQgVkFMVUVTXG5cdFx0Ly8gRnVucmFpc2UgdGVzdCBTcHJlZWRseSBlbnZpcm9ubWVudCBrZXk6IEVDRE5TR2hJUjBmWVFpc0ljMVBISDdOWDBwTlxuXHRcdC8vIEZ1bnJhaXNlIGxpdmUgU3ByZWVkbHkgZW52aXJvbm1lbnQga2V5OiBLdmNUT3gzRlBCZ3NjTHM1MXJqVDg0OERQN3Bcblx0XHQvLyBNV0QgdGVzdCBlbnZpcm9ubWVudCBrZXk6IE9EQm0yaWRtWUZUM3BCZ2U1cXhSQmpRYVdIOVxuXG5cdFx0dGhpc1dpZGdldC5kZWZhdWx0cy5vcmdhbml6YXRpb25JZCA9IFwiZmNiNGQ1MzgtY2E5Mi00MjEyLTg2Y2MtMDZkOGFjOTI5YzRkXCI7XG5cdFx0dGhpc1dpZGdldC5kZWZhdWx0cy5mb3JtSWQgPSAxMTk0O1xuXHRcdHRoaXNXaWRnZXQuZGVmYXVsdHMucGF5bWVudFRva2VuQXBpS2V5ID0gXCJLdmNUT3gzRlBCZ3NjTHM1MXJqVDg0OERQN3BcIjtcblx0XHR0aGlzV2lkZ2V0LmRlZmF1bHRzLnRlc3RQYXltZW50VG9rZW5BcGlLZXkgPSBcIkVDRE5TR2hJUjBmWVFpc0ljMVBISDdOWDBwTlwiO1xuXHRcdHRoaXNXaWRnZXQuZGVmYXVsdHMubWluaW11bUdpZnRBbW91bnQgPSA1O1xuXHRcdHRoaXNXaWRnZXQuZGVmYXVsdHMuZ2lmdFN0cmluZ1NpbmdsZSA9IFsyNSwgNTAsIDc1LCAxMDBdO1xuXHRcdHRoaXNXaWRnZXQuZGVmYXVsdHMuZ2lmdFN0cmluZ01vbnRobHkgPSBbNSwgMTAsIDE1LCAyMF07XG5cdFx0dGhpc1dpZGdldC5kZWZhdWx0cy5jdXJyZW5jeUNvZGUgPSBcIlVTRFwiO1xuXHRcdHRoaXNXaWRnZXQuZGVmYXVsdHMudG9wVmlzdWFsUGFkZGluZ1NlbGVjdG9yID0gXCJzZWN0aW9uI2hlYWRlclwiO1xuXG5cdFx0Ly8gT1RIRVJcblx0XHR0aGlzV2lkZ2V0LnBheU1ldGhvZEljb25IdG1sID0ge1xuXHRcdFx0Y2FyZDogJzxpIGNsYXNzPVwiZmEgZmFyIGZhLWNyZWRpdC1jYXJkXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPicsXG5cdFx0XHR2aXNhOiAnPGkgY2xhc3M9XCJmYSBmYWIgZmEtY2MtdmlzYVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4nLFxuXHRcdFx0bWFzdGVyY2FyZDogJzxpIGNsYXNzPVwiZmEgZmFiIGZhLWNjLW1hc3RlcmNhcmRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+Jyxcblx0XHRcdGFtZXg6ICc8aSBjbGFzcz1cImZhIGZhYiBmYS1jYy1hbWV4XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPicsXG5cdFx0XHRkaXNjb3ZlcjogJzxpIGNsYXNzPVwiZmEgZmFiIGZhLWNjLWRpc2NvdmVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPicsXG5cdFx0XHRiaXRjb2luOiAnPGkgY2xhc3M9XCJmYSBmYWIgZmEtYml0Y29pbiBmYS1idGNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+Jyxcblx0XHR9O1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5zZXRVc2VyT3B0aW9ucyA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXHRcdGlmICh0eXBlb2YgaW5wdXQgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIGlucHV0ID0ge307XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5iYXNlVXJsT3ZlcnJpZGUgPT0gXCJzdHJpbmdcIiAmJiBpbnB1dC5iYXNlVXJsT3ZlcnJpZGUudHJpbSgpKSB7XG5cdFx0XHR0aGlzV2lkZ2V0LnVybHMuYmFzZSA9IGVuY29kZVVSSShpbnB1dC5iYXNlVXJsT3ZlcnJpZGUpO1xuXHRcdFx0aWYgKHRoaXNXaWRnZXQudXJscy5iYXNlLnN1YnN0cigtMSkgIT0gXCIvXCIpIHtcblx0XHRcdFx0dGhpc1dpZGdldC51cmxzLmJhc2UgKz0gXCIvXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gVkFMSURBVEUvRklOQUxJWkUgVVNFUiBPUFRJT05TXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5lbGVtZW50ID09IFwic3RyaW5nXCIgJiYgaW5wdXQuZWxlbWVudC50cmltKCkpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5lbGVtZW50ID0gaW5wdXQuZWxlbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdFwiTUZBX0Z1bnJhaXNlX1dpZGdldCgpOiBpbnZhbGlkIG9wdGlvbnMgLSBObyB0YXJnZXQgZWxlbWVudDpcIixcblx0XHRcdFx0XHRpbnB1dFxuXHRcdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIEVOVklST05NRU5UIElEUy9LRVlTXG5cdFx0Ly8gRnVucmFpc2Ugb3JnYW5pemF0aW9uIGlkXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5vcmdhbml6YXRpb25JZCAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMub3JnYW5pemF0aW9uSWQgPSBpbnB1dC5vcmdhbml6YXRpb25JZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLm9yZ2FuaXphdGlvbklkID0gdGhpc1dpZGdldC5kZWZhdWx0cy5vcmdhbml6YXRpb25JZDtcblx0XHR9XG5cdFx0Ly8gRnVucmFpc2UgZm9ybSBpZFxuXHRcdGlmICh0eXBlb2YgaW5wdXQuZm9ybUlkICE9IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQgPSBpbnB1dC5mb3JtSWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQgPSB0aGlzV2lkZ2V0LmRlZmF1bHRzLmZvcm1JZDtcblx0XHR9XG5cdFx0Ly8gU3ByZWVkbHkgZW52aXJvbm1lbnQga2V5XG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5wYXltZW50VG9rZW5BcGlLZXkgIT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLnBheW1lbnRUb2tlbkFwaUtleSA9IGlucHV0LnBheW1lbnRUb2tlbkFwaUtleTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLnBheW1lbnRUb2tlbkFwaUtleSA9IHRoaXNXaWRnZXQuZGVmYXVsdHMucGF5bWVudFRva2VuQXBpS2V5O1xuXHRcdH1cblxuXHRcdC8vIE1BSU4gU0lOR0xFIEdJRlQgVkFMVUVTXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5naWZ0U3RyaW5nU2luZ2xlID09IFwib2JqZWN0XCIgJiYgaW5wdXQuZ2lmdFN0cmluZ1NpbmdsZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZ2lmdFN0cmluZ1NpbmdsZSA9IGlucHV0LmdpZnRTdHJpbmdTaW5nbGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5naWZ0U3RyaW5nU2luZ2xlID0gdGhpc1dpZGdldC5kZWZhdWx0cy5naWZ0U3RyaW5nU2luZ2xlO1xuXHRcdH1cblx0XHQvLyBNQUlOIE1PTlRITFkgR0lGVCBWQUxVRVNcblx0XHRpZiAodHlwZW9mIGlucHV0LmdpZnRTdHJpbmdNb250aGx5ID09IFwib2JqZWN0XCIgJiYgaW5wdXQuZ2lmdFN0cmluZ01vbnRobHkubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmdpZnRTdHJpbmdNb250aGx5ID0gaW5wdXQuZ2lmdFN0cmluZ01vbnRobHk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5naWZ0U3RyaW5nTW9udGhseSA9IHRoaXNXaWRnZXQuZGVmYXVsdHMuZ2lmdFN0cmluZ01vbnRobHk7XG5cdFx0fVxuXG5cdFx0Ly8gQ1VSUkVOQ0lFUyAoYW5kIHJlbGF0ZWQgZ2lmdCB2YWx1ZXMpXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5kZWZhdWx0Q3VycmVuY3kgPT0gXCJzdHJpbmdcIiAmJiBpbnB1dC5kZWZhdWx0Q3VycmVuY3kudHJpbSgpKSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZGVmYXVsdEN1cnJlbmN5ID0gaW5wdXQuZGVmYXVsdEN1cnJlbmN5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZGVmYXVsdEN1cnJlbmN5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaW5wdXQuY3VycmVuY2llcyA9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdEN1cnJlbmN5ID0gaW5wdXQuY3VycmVuY2llcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmZpbHRlckxpc3RDdXJyZW5jeSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIFBBWSBNRVRIT0RTXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5kZWZhdWx0UGF5TWV0aG9kID09IFwic3RyaW5nXCIgJiYgaW5wdXQuZGVmYXVsdFBheU1ldGhvZC50cmltKCkpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5kZWZhdWx0UGF5TWV0aG9kID0gaW5wdXQuZGVmYXVsdFBheU1ldGhvZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmRlZmF1bHRQYXlNZXRob2QgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5wYXlNZXRob2RzID09IFwic3RyaW5nXCIgJiYgaW5wdXQucGF5TWV0aG9kcy50cmltKCkpIHtcblx0XHRcdC8vIGNvbnZlcnQgZ2l2ZW4gc3RyaW5nIHRvIGFycmF5XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdFBheU1ldGhvZCA9IFtpbnB1dC5wYXlNZXRob2RzXTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0aW5wdXQucGF5TWV0aG9kcyAmJlxuXHRcdFx0aW5wdXQucGF5TWV0aG9kcy5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgJiZcblx0XHRcdGlucHV0LnBheU1ldGhvZHMubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0Ly8gdXNlIGdpdmVuIHBheSBtZXRob2QgbGlzdCBhcyBhcnJheVxuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmZpbHRlckxpc3RQYXlNZXRob2QgPSBpbnB1dC5wYXlNZXRob2RzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdFBheU1ldGhvZCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIEZSRVFVRU5DSUVTXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5kZWZhdWx0RnJlcXVlbmN5ID09IFwic3RyaW5nXCIgJiYgaW5wdXQuZGVmYXVsdEZyZXF1ZW5jeS50cmltKCkpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5kZWZhdWx0RnJlcXVlbmN5ID0gaW5wdXQuZGVmYXVsdEZyZXF1ZW5jeTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmRlZmF1bHRGcmVxdWVuY3kgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5mcmVxdWVuY2llcyA9PSBcInN0cmluZ1wiICYmIGlucHV0LmZyZXF1ZW5jaWVzLnRyaW0oKSkge1xuXHRcdFx0Ly8gY29udmVydCBnaXZlbiBzdHJpbmcgdG8gYXJyYXlcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5maWx0ZXJMaXN0RnJlcXVlbmN5ID0gW2lucHV0LmZyZXF1ZW5jaWVzXTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0aW5wdXQuZnJlcXVlbmNpZXMgJiZcblx0XHRcdGlucHV0LmZyZXF1ZW5jaWVzLmNvbnN0cnVjdG9yID09PSBBcnJheSAmJlxuXHRcdFx0aW5wdXQuZnJlcXVlbmNpZXMubGVuZ3RoID4gMFxuXHRcdCkge1xuXHRcdFx0Ly8gdXNlIGdpdmVuIGZyZXF1ZW5jeSBsaXN0IGFzIGFycmF5XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdEZyZXF1ZW5jeSA9IGlucHV0LmZyZXF1ZW5jaWVzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdEZyZXF1ZW5jeSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIEZPTlQgQVdFU09NRSAtIG5vIGxvYWQgKHVzZSBleGlzdGluZyksIG9yIGxvYWQgZWl0aGVyIHZlcnNpb24gNCBvciA1XG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5mb250QXdlc29tZVZlcnNpb24gPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmZvbnRBd2Vzb21lVmVyc2lvbiA9IDQ7XG5cdFx0fSBlbHNlIGlmICghaXNOYU4oaW5wdXQuZm9udEF3ZXNvbWVWZXJzaW9uKSkge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmZvbnRBd2Vzb21lVmVyc2lvbiA9IHBhcnNlSW50KGlucHV0LmZvbnRBd2Vzb21lVmVyc2lvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5mb250QXdlc29tZVZlcnNpb24gPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIFZBUklPVVMgQk9PTEVBTiBPUFRJT05TXG5cdFx0dGhpc1dpZGdldC5vcHRpb25zLmluY2x1ZGVDb21wYW55TWF0Y2ggPVxuXHRcdFx0aW5wdXQuaW5jbHVkZUNvbXBhbnlNYXRjaCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG5cdFx0dGhpc1dpZGdldC5vcHRpb25zLmluY2x1ZGVFeHRyYVBlcmNlbnQgPVxuXHRcdFx0aW5wdXQuaW5jbHVkZUV4dHJhUGVyY2VudCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG5cblx0XHQvLyBMQUJFTCBPVkVSUklERVMgKGFrYSBUUkFOU0xBVElPTlMpXG5cdFx0dGhpc1dpZGdldC5vcHRpb25zLmxhYmVsT3ZlcnJpZGVPYmplY3QgPSBmYWxzZTtcblx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMubGFiZWxPdmVycmlkZUZpbGVVcmwgPSBmYWxzZTtcblx0XHRpZiAodHlwZW9mIGlucHV0LmxhYmVsT3ZlcnJpZGUgPT0gXCJzdHJpbmdcIiAmJiBpbnB1dC5sYWJlbE92ZXJyaWRlLnRyaW0oKSkge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmxhYmVsT3ZlcnJpZGVGaWxlVXJsID0gaW5wdXQubGFiZWxPdmVycmlkZTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dC5sYWJlbE92ZXJyaWRlID09IFwib2JqZWN0XCIpIHtcblx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlT2JqZWN0ID0gaW5wdXQubGFiZWxPdmVycmlkZTtcblx0XHR9XG5cblx0XHQvLyBVU0VSIENBTExCQUNLIEZVTkNUSU9OU1xuXHRcdC8vIG9uTG9hZFxuXHRcdGlmICh0eXBlb2YgaW5wdXQub25Mb2FkID09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLm9uTG9hZCA9IGlucHV0Lm9uTG9hZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLm9uTG9hZCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBvbkRvbmF0aW9uXG5cdFx0aWYgKHR5cGVvZiBpbnB1dC5vbkRvbmF0aW9uID09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLm9uRG9uYXRpb24gPSBpbnB1dC5vbkRvbmF0aW9uO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMub25Eb25hdGlvbiA9IGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUuc3RhcnQgPSBhc3luYyBmdW5jdGlvbigpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cdFx0aWYgKHRoaXNXaWRnZXQuaXNTdGFydGVkKSB7XG5cdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUud2FybihcIk1GQV9GdW5yYWlzZV9XaWRnZXQgYWxyZWFkeSBzdGFydGVkXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzV2lkZ2V0LmlzU3RhcnRlZCA9IHRydWU7XG5cblx0XHR0aGlzV2lkZ2V0LmRvbVRhcmdldEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuXHRcdHZhciBwcm9taXNlRm9udEljb25TdHlsZXMgPSB0aGlzV2lkZ2V0LmdldEZvbnRJY29uU3R5bGVzKCk7XG5cdFx0dmFyIHByb21pc2VNYWluU3R5bGVzID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTdHlsZXNoZWV0KFxuXHRcdFx0dGhpc1dpZGdldC51cmxzLmJhc2UgKyBcImNzcy9td2QtZG9uYXRlLXdpZGdldC5jc3NcIlxuXHRcdCk7XG5cdFx0dGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTdHlsZXNoZWV0KHRoaXNXaWRnZXQudXJscy5zcGVjaWFsU2VsZWN0U3R5bGVzKTtcblx0XHRhd2FpdCBQcm9taXNlLmFsbChbcHJvbWlzZUZvbnRJY29uU3R5bGVzLCBwcm9taXNlTWFpblN0eWxlc10pO1xuXG5cdFx0dmFyIHdpZGdldEh0bWwsIHNoYXJlZFV0aWxSZXN1bHQ7XG5cdFx0dmFyIHByb21pc2VNYWluSHRtbCA9IHRoaXNXaWRnZXQubG9hZEZpbGUoXG5cdFx0XHR0aGlzV2lkZ2V0LnVybHMuYmFzZSArIFwibXdkLWRvbmF0ZS13aWRnZXQuaHRtbFwiXG5cdFx0KTtcblx0XHR2YXIgcHJvbWlzZVNoYXJlZFV0aWxzID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTY3JpcHQoXG5cdFx0XHR0aGlzV2lkZ2V0LnVybHMuYmFzZSArIFwianMvc2hhcmVkLXV0aWxzLmpzXCJcblx0XHQpO1xuXHRcdFt3aWRnZXRIdG1sLCBzaGFyZWRVdGlsUmVzdWx0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcblx0XHRcdHByb21pc2VNYWluSHRtbCxcblx0XHRcdHByb21pc2VTaGFyZWRVdGlscyxcblx0XHRdKTtcblx0XHRpZiAoIXdpZGdldEh0bWwpIHtcblx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk1GQV9GdW5yYWlzZV9XaWRnZXQuc3RhcnQoKSAtIHVuYWJsZSB0byBsb2FkIGJhc2UgSFRNTFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb250YWluZXIuaWQgPSBcIm1mYURvbmF0aW9uV2lkZ2V0Q29udGFpbmVyXCI7XG5cdFx0Y29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdHRoaXNXaWRnZXQuZG9tVGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9IHdpZGdldEh0bWw7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29udGFpbmVyLmNsYXNzTmFtZSA9IFwicmV2ZWFsXCI7XG5cdFx0fSwgMSk7XG5cblx0XHQvLyBzdGFydCBTcHJlZWRseSBmaXJzdCBiYyBpdCBoYXMgc2xvdyByZXNwb25zZSB0aW1lXG5cdFx0dGhpc1dpZGdldC5wcm9taXNlcy5zcHJlZWRseUlmcmFtZVNjcmlwdCA9IHRoaXNXaWRnZXQubGlua0V4dGVybmFsU2NyaXB0KFxuXHRcdFx0dGhpc1dpZGdldC51cmxzLnNwcmVlZGx5U2NyaXB0XG5cdFx0KTtcblx0XHR2YXIgaXNKcXVlcnlMb2FkZWQgPSBhd2FpdCB0aGlzV2lkZ2V0LmxpbmtFeHRlcm5hbFNjcmlwdCh0aGlzV2lkZ2V0LnVybHMuanF1ZXJ5U2NyaXB0KTtcblxuXHRcdC8vIHNlbGVjdDIgc2hvdWxkIGxvYWQgYWZ0ZXIgalF1ZXJ5IGxvYWQgY29tcGxldGVcblx0XHR2YXIgcHJvbWlzZVNwZWNpYWxTZWxlY3RDb2RlID0gdGhpc1dpZGdldC5saW5rRXh0ZXJuYWxTY3JpcHQoXG5cdFx0XHR0aGlzV2lkZ2V0LnVybHMuc3BlY2lhbFNlbGVjdFNjcmlwdFxuXHRcdCk7XG5cblx0XHR2YXIgcHJvbWlzZUJ1c2luZXNzTGF5ZXIgPSB0aGlzV2lkZ2V0LmxpbmtFeHRlcm5hbFNjcmlwdChcblx0XHRcdHRoaXNXaWRnZXQudXJscy5iYXNlICsgXCJqcy9naWZ0LXV0aWxpdGllcy5qc1wiXG5cdFx0KTtcblx0XHR2YXIgcHJvbWlzZVRyYW5zYWN0aW9uTGF5ZXIgPSB0aGlzV2lkZ2V0LmxpbmtFeHRlcm5hbFNjcmlwdChcblx0XHRcdHRoaXNXaWRnZXQudXJscy5iYXNlICsgXCJqcy90cmFuc2FjdGlvbi1zeXN0ZW0tbGF5ZXIuanNcIlxuXHRcdCk7XG5cblx0XHRhd2FpdCBQcm9taXNlLmFsbChbXG5cdFx0XHRwcm9taXNlQnVzaW5lc3NMYXllcixcblx0XHRcdHByb21pc2VUcmFuc2FjdGlvbkxheWVyLFxuXHRcdFx0cHJvbWlzZVNwZWNpYWxTZWxlY3RDb2RlLFxuXHRcdF0pO1xuXHRcdGlmIChpc0pxdWVyeUxvYWRlZCkge1xuXHRcdFx0dGhpc1dpZGdldC5qcXVlcnkgPSBqUXVlcnkubm9Db25mbGljdCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzV2lkZ2V0LmpxdWVyeSA9ICQgfHwge307XG5cdFx0fVxuXG5cdFx0dGhpc1dpZGdldC5ydW4oKTtcblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUucnVuID0gYXN5bmMgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXG5cdFx0aWYgKHR5cGVvZiB0aGlzV2lkZ2V0LmpxdWVyeSAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoXCJqUXVlcnkgKHRoaXNXaWRnZXQuanF1ZXJ5KSBub3QgZm91bmRcIik7XG5cdFx0XHRleGl0KCk7XG5cdFx0fVxuXHRcdHZhciBqcSA9IHRoaXNXaWRnZXQuanF1ZXJ5O1xuXHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJNRkFfRnVucmFpc2VfV2lkZ2V0IHVzaW5nIGpRdWVyeSB2ZXJzaW9uXCIsIGpxLmZuLmpxdWVyeSk7XG5cblx0XHR3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YSA9IHt9O1xuXHRcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhID0ge307XG5cdFx0dmFyIHVzZXJJbnB1dERhdGEgPSB3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YTtcblx0XHR0aGlzV2lkZ2V0LmN1cnJlbnRHaWZ0TWluaW11bSA9IHRoaXNXaWRnZXQuZGVmYXVsdHMubWluaW11bUdpZnRBbW91bnQ7XG5cblx0XHR3aW5kb3cubXdkc3BhY2UucGFnZUlkUHJlZml4ID0gXCJ3aWRnZXRcIiArIHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWQ7XG5cblx0XHQvLyBKUVVFUlkgT0JKRUNUU1xuXHRcdHZhciBqcUNvbnRhaW5lciA9IGpxKFwiZGl2LmdpZnRGb3JtQ29udGFpbmVyXCIpO1xuXHRcdHZhciBqcVN0ZXBMaXN0ID0ganFDb250YWluZXIuZmluZChcInNlY3Rpb24uc3RlcFwiKTtcblx0XHR2YXIganFHaWZ0SGVhZGVyQ29udGFpbmVyID0ganFDb250YWluZXIuZmluZChcImRpdi5naWZ0Rm9ybUhlYWRlckNvbnRhaW5lclwiKTtcblx0XHR2YXIganFNYWluQmFja0J1dHRvbiA9IGpxQ29udGFpbmVyLmZpbmQoXCJidXR0b24uZ29QcmV2aW91c1N0ZXBcIik7XG5cdFx0dmFyIGpxRnJlZUZvcm1HaWZ0SW5wdXQgPSBqcUNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdEFtb3VudEZyZWVmb3JtXCJdJyk7XG5cdFx0dmFyIGpxUGF5TWV0aG9kU2VsZWN0ID0ganFDb250YWluZXIuZmluZCgnc2VsZWN0W25hbWU9XCJwYXlNZXRob2RcIl0nKTtcblx0XHR2YXIganFSZWdpb25TZWxlY3QgPSBqcUNvbnRhaW5lci5maW5kKCdzZWxlY3RbbmFtZT1cImRvbm9yUmVnaW9uXCJdJyk7XG5cdFx0dmFyIGpxUmVnaW9uSW5wdXQgPSBqcUNvbnRhaW5lci5maW5kKCdpbnB1dFtuYW1lPVwiZG9ub3JSZWdpb25cIl0nKTtcblx0XHR2YXIganFDdXJyZW5jeVNlbGVjdCA9IGpxQ29udGFpbmVyLmZpbmQoJ3NlbGVjdFtuYW1lPVwiZ2lmdEN1cnJlbmN5XCJdJyk7XG5cdFx0dmFyIGpxQ2FyZE51bWJlckZlZWRiYWNrID0ganFDb250YWluZXIuZmluZChcblx0XHRcdFwiZGl2LnBheUluZm9Db250YWluZXIgZGl2LmNhcmROdW1iZXJGZWVkYmFja1wiXG5cdFx0KTtcblx0XHR2YXIganFCaXRjb2luVGltZVJlbWFpbmluZyA9IGpxQ29udGFpbmVyLmZpbmQoXG5cdFx0XHRcImRpdi5iaXRjb2luQ29udGFpbmVyIHNwYW4uYml0Y29pblRpbWVSZW1haW5pbmdcIlxuXHRcdCk7XG5cblx0XHQvLyBURVNUIE1PREVcblx0XHR2YXIgaW5UZXN0TW9kZSA9IHdpbmRvdy5td2RzcGFjZS5zaGFyZWRVdGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpID09IFwidHJ1ZVwiO1xuXHRcdGlmIChpblRlc3RNb2RlKSB7XG5cdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUud2FybihcIlRFU1QgTU9ERSAtIG13ZC1kb25hdGUtd2lkZ2V0LmpzXCIpO1xuXHRcdFx0anFDb250YWluZXIuZmluZChcImRpdi50ZXN0TW9kZUNvbnRhaW5lclwiKS5zbGlkZURvd24oOTk5KTtcblx0XHR9XG5cblx0XHR0aGlzV2lkZ2V0LnByb21pc2VzLmxhYmVsT3ZlcnJpZGVMb2FkID0gdGhpc1dpZGdldC5wcmVwYXJlTGFiZWxPdmVycmlkZSgpO1xuXG5cdFx0c2V0T3B0aW9uYWxTZWN0aW9uVmlzaWJpbGl0eSgpO1xuXG5cdFx0YnVpbGRDb3VudHJ5U2VsZWN0KCk7XG5cdFx0YnVpbGRDYXJkRXhwaXJlTW9udGhTZWxlY3QoKTtcblx0XHRidWlsZENhcmRFeHBpcmVZZWFyU2VsZWN0KCk7XG5cdFx0c2V0dXBDb21wYW55TWF0Y2hTZWxlY3QoKTtcblxuXHRcdHNldHVwSW5wdXRXYXRjaGVycygpO1xuXHRcdGJ1aWxkUGF5TWV0aG9kU2VsZWN0KCk7XG5cblx0XHQvLyBlbnN1cmUgdGV4dCBvdmVycmlkZSBmaWxlIGxvYWQgKGlmIGFueSkgaXMgY29tcGxldGVcblx0XHRhd2FpdCB0aGlzV2lkZ2V0LnByb21pc2VzLmxhYmVsT3ZlcnJpZGVMb2FkO1xuXHRcdGlmICh0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUpIHtcblx0XHRcdHRoaXNXaWRnZXQucHJvY2Vzc0xhYmVsT3ZlcnJpZGVPYmplY3QodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlKTtcblx0XHRcdHNob3dJbnRyb0NvbnRlbnQoKTtcblx0XHR9XG5cblx0XHRidWlsZEN1cnJlbmN5U2VsZWN0KCk7XG5cdFx0YnVpbGRGcmVxdWVuY3lCdXR0b25zKCk7XG5cdFx0dXBkYXRlR2lmdEFtb3VudCgpO1xuXHRcdHByZVBvcHVsYXRlVXNlckZpZWxkcygpO1xuXG5cdFx0c2hvd1N0ZXAoKTtcblxuXHRcdHZhciBwcm9taXNlU3ByZWVkbHkgPSBzZXR1cFNwcmVlZGx5KCk7IC8vYXN5bmMsIGJ1dCB3YWl0aW5nIG5vdCByZXF1aXJlZFxuXG5cdFx0Ly8gR0VORVJBTCBDTElDSyBIQU5ETEVSXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiY2xpY2tcIiwgZXZlbnQudGFyZ2V0LnRhZ05hbWUsIGV2ZW50LnRhcmdldC5jbGFzc05hbWUpO1xuXHRcdFx0dmFyIGNsaWNrVGFyZ2V0ID0ganEoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiYnV0dG9uLCAuY2xpY2tUYXJnZXRcIik7XG5cdFx0XHRpZiAoY2xpY2tUYXJnZXQpIHtcblx0XHRcdFx0aWYgKGNsaWNrVGFyZ2V0Lmhhc0NsYXNzKFwiZ29OZXh0U3RlcFwiKSkge1xuXHRcdFx0XHRcdGlmICghc2hvd05leHRTdGVwKCkpIHtcblx0XHRcdFx0XHRcdGNsaWNrVGFyZ2V0LmFkZENsYXNzKFwic2hvd0ludmFsaWRcIik7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRjbGlja1RhcmdldC5yZW1vdmVDbGFzcyhcInNob3dJbnZhbGlkXCIpO1xuXHRcdFx0XHRcdFx0fSwgMTUwMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKGNsaWNrVGFyZ2V0Lmhhc0NsYXNzKFwiZ29QcmV2aW91c1N0ZXBcIikpIHtcblx0XHRcdFx0XHRzaG93UHJldmlvdXNTdGVwKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoY2xpY2tUYXJnZXQuaGFzQ2xhc3MoXCJlcnJvclJlc3RhcnRcIikpIHtcblx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UuZG9uYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG5cdFx0XHRcdFx0c2hvd1N0ZXAoXCJnaWZ0QW1vdW50XCIpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGNsaWNrVGFyZ2V0Lmhhc0NsYXNzKFwiaW5mb0ljb25cIikpIHtcblx0XHRcdFx0XHRjbGlja1RhcmdldC50cmlnZ2VyKFwiaG92ZXJcIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzV2lkZ2V0LmFsbG93QXV0b1Njcm9sbCA9IHRydWU7XG5cdFx0fSwgOTk5KTtcblxuXHRcdGF3YWl0IHByb21pc2VTcHJlZWRseTtcblx0XHR0aGlzV2lkZ2V0LmlzTG9hZGVkID0gdHJ1ZTtcblx0XHRpZiAodGhpc1dpZGdldC5vcHRpb25zLm9uTG9hZCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIj4+PiBDYWxsaW5nIGN1c3RvbSBvbkxvYWQgZnVuY3Rpb25cIik7XG5cdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5vbkxvYWQoKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkNhdWdodCBlcnJvciBmcm9tIG9uTG9hZCBmdW5jdGlvbjogXCIsIGVyci5tZXNzYWdlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzaG93TmV4dFN0ZXAoKSB7XG5cdFx0XHRzd2l0Y2ggKG13ZHNwYWNlLmN1cnJlbnRTdGVwTmFtZSkge1xuXHRcdFx0XHRjYXNlIFwiZ2lmdEFtb3VudFwiOlxuXHRcdFx0XHRcdGlmIChjaGVja1N0ZXBHaWZ0KCkpIHtcblx0XHRcdFx0XHRcdHNob3dTdGVwKFwiZG9ub3JJbmZvXCIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZG9ub3JJbmZvXCI6XG5cdFx0XHRcdFx0aWYgKGNoZWNrU3RlcERvbm9yKCkpIHtcblx0XHRcdFx0XHRcdGlmICh3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5wYXlNZXRob2QgPT0gXCJjYXJkXCIpIHtcblx0XHRcdFx0XHRcdFx0c2hvd1N0ZXAoXCJjYXJkSW5mb1wiKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRidWlsZFRyYW5zYWN0aW9uU2VuZERhdGEoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlbmRUcmFuc2FjdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImNhcmRJbmZvXCI6XG5cdFx0XHRcdFx0aWYgKGNoZWNrU3RlcENhcmQoKSkge1xuXHRcdFx0XHRcdFx0YnVpbGRUcmFuc2FjdGlvblNlbmREYXRhKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdG9rZW5pemVVc2VyQ2FyZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzaG93UHJldmlvdXNTdGVwKCkge1xuXHRcdFx0c3dpdGNoIChtd2RzcGFjZS5jdXJyZW50U3RlcE5hbWUpIHtcblx0XHRcdFx0Y2FzZSBcImRvbm9ySW5mb1wiOlxuXHRcdFx0XHRcdHNob3dTdGVwKFwiZ2lmdEFtb3VudFwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImNhcmRJbmZvXCI6XG5cdFx0XHRcdFx0c2hvd1N0ZXAoXCJkb25vckluZm9cIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2hvd1N0ZXAodGFyZ2V0U3RlcE5hbWUpIHtcblx0XHRcdHdpbmRvdy5td2RzcGFjZS5jdXJyZW50U3RlcE5hbWUgPSBcIlwiO1xuXHRcdFx0dGFyZ2V0U3RlcE5hbWUgPSB3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuZW5zdXJlU3RyaW5nKHRhcmdldFN0ZXBOYW1lKTtcblx0XHRcdGlmICghdGFyZ2V0U3RlcE5hbWUpIHtcblx0XHRcdFx0dGFyZ2V0U3RlcE5hbWUgPSB3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuZ2V0U2Vzc2lvblZhbHVlKFwic2F2ZWRTdGVwTmFtZVwiKTtcblx0XHRcdFx0aWYgKCF0YXJnZXRTdGVwTmFtZSkge1xuXHRcdFx0XHRcdHRhcmdldFN0ZXBOYW1lID0gXCJnaWZ0QW1vdW50XCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYubG9hZGluZ0Rpc3BsYXlcIikuaGlkZSgpO1xuXHRcdFx0dmFyIHRoaXNOYW1lO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqcVN0ZXBMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXNOYW1lID0ganFTdGVwTGlzdFtpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN0ZXAtbmFtZVwiKTtcblx0XHRcdFx0aWYgKHRoaXNOYW1lID09IHRhcmdldFN0ZXBOYW1lKSB7XG5cdFx0XHRcdFx0Ly8gU0hPVyBUSElTIFNURVBcblx0XHRcdFx0XHQvLyBoYW5kbGUgYmFjayBidXR0b24gdmlzaWJpbGl0eVxuXHRcdFx0XHRcdHN3aXRjaCAodGFyZ2V0U3RlcE5hbWUpIHtcblx0XHRcdFx0XHRcdGNhc2UgXCJkb25vckluZm9cIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJjYXJkSW5mb1wiOlxuXHRcdFx0XHRcdFx0XHRqcUNvbnRhaW5lci5maW5kKFwiZGl2LmdpZnRGb3JtSGVhZGVyQ29udGFpbmVyXCIpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0anFNYWluQmFja0J1dHRvbi5mYWRlSW4oODg4KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRqcU1haW5CYWNrQnV0dG9uLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gaGFuZGxlIGJ1dHRvbiB0ZXh0XG5cdFx0XHRcdFx0aWYgKHRhcmdldFN0ZXBOYW1lID09IFwiZG9ub3JJbmZvXCIpIHtcblx0XHRcdFx0XHRcdHZhciBidXR0b25UZXh0O1xuXHRcdFx0XHRcdFx0Ly8gVE9ETyAtIG1ha2UgZnVuY3Rpb24gdG8gY3JlYXRlIGFsbCBuZXh0IGJ1dHRvbnMgb24gdGhlIGZseSAoYW5kIGluZGljYXRlIGFjdGlvbilcblx0XHRcdFx0XHRcdHN3aXRjaCAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEucGF5TWV0aG9kKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJjYXJkXCI6XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLndhcm4oXCJNYWtpbmcgbmV4dCBidXR0b25cIik7XG5cdFx0XHRcdFx0XHRcdFx0YnV0dG9uVGV4dCA9IFwiRW50ZXIgUGF5bWVudCBJbmZvcm1hdGlvblwiO1xuXHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmJ1dHRvbi5nb1BheW1lbnRJbmZvKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRidXR0b25UZXh0ID1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuYnV0dG9uLmdvUGF5bWVudEluZm87XG5cdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIFwiYml0Y29pblwiOlxuXHRcdFx0XHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKFwiTWFraW5nIHN1Ym1pdCBidXR0b25cIik7XG5cdFx0XHRcdFx0XHRcdFx0YnV0dG9uVGV4dCA9IFwiU3VibWl0IERvbmF0aW9uXCI7XG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuYnV0dG9uLm1haW5TdWJtaXQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJ1dHRvblRleHQgPSB0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuYnV0dG9uLm1haW5TdWJtaXQ7XG5cdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpc1dpZGdldC5zZXRFbGVtZW50TGFiZWxPdmVycmlkZShcImJ1dHRvbi5nb1BheW1lbnRJbmZvXCIsIGJ1dHRvblRleHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRqcShqcVN0ZXBMaXN0W2ldKS5mYWRlSW4oNjY2LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHNjcm9sbEFsbChqcUNvbnRhaW5lcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLmN1cnJlbnRTdGVwTmFtZSA9IHRoaXNOYW1lO1xuXHRcdFx0XHRcdGlmICh0YXJnZXRTdGVwTmFtZSA9PSBcImNvbmZpcm1hdGlvblwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMucmVtb3ZlU2Vzc2lvblZhbHVlKFwic2F2ZWRTdGVwTmFtZVwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9ISURFIFRISVMgU1RFUFxuXHRcdFx0XHRcdGpxKGpxU3RlcExpc3RbaV0pLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrU3RlcEdpZnQoKSB7XG5cdFx0XHR2YXIgaXNWYWxpZCA9IHRydWU7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCAhPSBcIm51bWJlclwiIHx8XG5cdFx0XHRcdHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCA8IHRoaXNXaWRnZXQuY3VycmVudEdpZnRNaW5pbXVtXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihcImJhc2VBbW91bnQgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmJhc2VBbW91bnQpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50IG9mIGF0IGxlYXN0XCI7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0bWVzc2FnZSA9IHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5naWZ0LmVycm9yLmludmFsaWRBbW91bnQgfHwgbWVzc2FnZTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxuXHRcdFx0XHRtZXNzYWdlICs9XG5cdFx0XHRcdFx0XCIgXCIgKyB0aGlzV2lkZ2V0LmN1cnJlbnRDdXJyZW5jeVN5bWJvbCArIHRoaXNXaWRnZXQuY3VycmVudEdpZnRNaW5pbXVtO1xuXHRcdFx0XHRzaG93U3RlcEZlZWRiYWNrKFwiZ2lmdEFtb3VudFwiLCBtZXNzYWdlLCB0cnVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNob3dTdGVwRmVlZGJhY2soXCJnaWZ0QW1vdW50XCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmdpZnRDdXJyZW5jeSAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJDdXJyZW5jeSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZ2lmdEN1cnJlbmN5KTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLnBheU1ldGhvZCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJQYXkgTWV0aG9kIGlzIGludmFsaWRcIiwgdXNlcklucHV0RGF0YS5wYXlNZXRob2QpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHVzZXJJbnB1dERhdGEuZ2lmdEZyZXF1ZW5jeSAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJHaWZ0IGZyZXF1ZW5jeSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZ2lmdEZyZXF1ZW5jeSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlzVmFsaWQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY2hlY2tTdGVwRG9ub3IoKSB7XG5cdFx0XHR2YXIgaXNWYWxpZCA9IHRydWU7XG5cblx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdC5maW5kKFwic2VjdGlvbi5zdGVwW2RhdGEtc3RlcC1uYW1lPSdkb25vckluZm8nXSAuY2hhbmdlV2F0Y2hcIilcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0anEodGhpcykuYXR0cihcIm5hbWVcIikgIT0gXCJkb25vckNvdW50cnlcIiAmJlxuXHRcdFx0XHRcdFx0anEodGhpcykuY3NzKFwiZGlzcGxheVwiKSAhPSBcIm5vbmVcIlxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0anEodGhpcykudHJpZ2dlcihcImNoYW5nZVwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0dXNlcklucHV0RGF0YS5kb25vckNvdW50cnkgPVxuXHRcdFx0XHRqcUNvbnRhaW5lclxuXHRcdFx0XHRcdC5maW5kKFwiZGl2LmJpbGxpbmdJbmZvQ29udGFpbmVyIHNlbGVjdFtuYW1lPSdkb25vckNvdW50cnknXVwiKVxuXHRcdFx0XHRcdC52YWwoKSB8fCBudWxsO1xuXG5cdFx0XHRpZiAodHlwZW9mIHVzZXJJbnB1dERhdGEuZG9ub3JGaXJzdE5hbWUgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JGaXJzdE5hbWUgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yTGFzdE5hbWUgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JMYXN0TmFtZSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZG9ub3JMYXN0TmFtZSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vckVtYWlsICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihcImRvbm9yRW1haWwgaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmRvbm9yRW1haWwpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yUGhvbmUgIT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHR0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vclBob25lICE9IFwic3RyaW5nXCJcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JQaG9uZSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZG9ub3JQaG9uZSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vclN0cmVldCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJkb25vclN0cmVldCBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZG9ub3JTdHJlZXQpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHVzZXJJbnB1dERhdGEuZG9ub3JSZWdpb24gIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JSZWdpb24gaXMgaW52YWxpZFwiLCB1c2VySW5wdXREYXRhLmRvbm9yUmVnaW9uKTtcblx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yUG9zdENvZGUgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JQb3N0Q29kZSBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuZG9ub3JQb3N0Q29kZSk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vckNvdW50cnkgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiZG9ub3JDb3VudHJ5IGlzIGludmFsaWRcIiwgdXNlcklucHV0RGF0YS5kb25vckNvdW50cnkpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAodXNlcklucHV0RGF0YS5jb21wYW55TWF0Y2ggPT0gXCJvblwiKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5kb25vck1hdGNoQ29tcGFueSAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XHRcImRvbm9yTWF0Y2hDb21wYW55IGlzIGludmFsaWRcIixcblx0XHRcdFx0XHRcdFx0dXNlcklucHV0RGF0YS5kb25vck1hdGNoQ29tcGFueVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLmRvbm9yTWF0Y2hFbWFpbCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XHRcImRvbm9yTWF0Y2hFbWFpbCBpcyBpbnZhbGlkXCIsXG5cdFx0XHRcdFx0XHRcdHVzZXJJbnB1dERhdGEuZG9ub3JNYXRjaEVtYWlsXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNWYWxpZDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGVja1N0ZXBDYXJkKCkge1xuXHRcdFx0dmFyIGlzVmFsaWQgPSB0cnVlO1xuXG5cdFx0XHRqcUNvbnRhaW5lclxuXHRcdFx0XHQuZmluZChcInNlY3Rpb24uc3RlcFtkYXRhLXN0ZXAtbmFtZT0nY2FyZEluZm8nXSAuY2hhbmdlV2F0Y2hcIilcblx0XHRcdFx0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cblx0XHRcdHZhciBqcUNhcmROdW1iZXJCb3ggPSBqcUNvbnRhaW5lci5maW5kKFwiZGl2LnBheUluZm9Db250YWluZXIgZGl2I2NhcmROdW1iZXJUYXJnZXRcIik7XG5cdFx0XHRpZiAodXNlcklucHV0RGF0YS5oYXNWYWxpZENhcmROdW1iZXIgPT09IHRydWUpIHtcblx0XHRcdFx0anFDYXJkTnVtYmVyQm94LnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0anFDYXJkTnVtYmVyQm94LmFkZENsYXNzKFwiaW52YWxpZFwiKTtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFwiaGFzVmFsaWRDYXJkTnVtYmVyIGlzIGludmFsaWRcIixcblx0XHRcdFx0XHRcdHVzZXJJbnB1dERhdGEuaGFzVmFsaWRDYXJkTnVtYmVyXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHZhciBqcUNhcmRDdnZCb3ggPSBqcUNvbnRhaW5lci5maW5kKFwiZGl2LnBheUluZm9Db250YWluZXIgZGl2I2NhcmRDdnZUYXJnZXRcIik7XG5cdFx0XHRpZiAodXNlcklucHV0RGF0YS5oYXNWYWxpZENhcmRDdnYgPT09IHRydWUpIHtcblx0XHRcdFx0anFDYXJkQ3Z2Qm94LnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0anFDYXJkQ3Z2Qm94LmFkZENsYXNzKFwiaW52YWxpZFwiKTtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihcImhhc1ZhbGlkQ2FyZEN2diBpcyBpbnZhbGlkXCIsIHVzZXJJbnB1dERhdGEuaGFzVmFsaWRDYXJkQ3Z2KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVNb250aCAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcInBheUNhcmRFeHBpcmVNb250aCBpcyBpbnZhbGlkXCIsXG5cdFx0XHRcdFx0XHR1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVNb250aFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgdXNlcklucHV0RGF0YS5wYXlDYXJkRXhwaXJlWWVhciAhPSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcInBheUNhcmRFeHBpcmVZZWFyIGlzIGludmFsaWRcIixcblx0XHRcdFx0XHRcdHVzZXJJbnB1dERhdGEucGF5Q2FyZEV4cGlyZVllYXJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc1ZhbGlkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNob3dTdGVwRmVlZGJhY2soc3RlcE5hbWUsIG1lc3NhZ2UsIGlzRXJyb3IpIHtcblx0XHRcdGlmICh0eXBlb2Ygc3RlcE5hbWUgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgc3RlcE5hbWUgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBtZXNzYWdlID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG1lc3NhZ2UgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBpc0Vycm9yID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGlzRXJyb3IgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICghc3RlcE5hbWUpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic2hvd1N0ZXBGZWVkYmFjaygpIGdpdmVuIGludmFsaWQgaW5wdXRcIiwgc3RlcE5hbWUsIG1lc3NhZ2UpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGpxRmVlZGJhY2sgPSBqcShcblx0XHRcdFx0J3NlY3Rpb25bZGF0YS1zdGVwLW5hbWU9XCInICsgc3RlcE5hbWUgKyAnXCJdIGRpdi51c2VyRmVlZGJhY2sgcC5tZXNzYWdlJ1xuXHRcdFx0KTtcblx0XHRcdGlmIChtZXNzYWdlIHx8IGlzRXJyb3IpIHtcblx0XHRcdFx0anFGZWVkYmFjay5odG1sKG1lc3NhZ2UgfHwgXCJTb3JyeSwgYW4gdW5rbm93biBlcnJvciBvY2N1cmVkXCIpLmZhZGVJbig0NDQpO1xuXHRcdFx0XHRpZiAoaXNFcnJvcikge1xuXHRcdFx0XHRcdGpxRmVlZGJhY2suYWRkQ2xhc3MoXCJlcnJvclwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqcUZlZWRiYWNrLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGpxRmVlZGJhY2suZmFkZU91dCgyMjIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGpxKHRoaXMpLmh0bWwoXCJcIik7XG5cdFx0XHRcdFx0anEodGhpcykucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2hvd0ludHJvQ29udGVudCgpIHtcblx0XHRcdC8vIGNoZWNrIGZvciBpbnRybyBjb250ZW50IChmcm9tIGxhYmVsIG92ZXJyaWRlKVxuXHRcdFx0dmFyIGpxSW50cm9Db250ZW50ID0ganFHaWZ0SGVhZGVyQ29udGFpbmVyLmZpbmQoXCJkaXYuaW50cm9Db250ZW50Q29udGFpbmVyXCIpO1xuXHRcdFx0aWYgKGpxSW50cm9Db250ZW50Lmh0bWwoKSAhPSBcIlwiKSB7XG5cdFx0XHRcdGpxR2lmdEhlYWRlckNvbnRhaW5lci5maW5kKFwiZGl2LmdpZnRGb3JtSGVhZGVyXCIpLmFkZENsYXNzKFwic2hvd0ludHJvXCIpO1xuXHRcdFx0XHRqcUdpZnRIZWFkZXJDb250YWluZXIuc2hvdygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldHVwSW5wdXRXYXRjaGVycygpIHtcblx0XHRcdC8vIENIQU5HRSBFVkVOVCBIQU5ETEVSXG5cdFx0XHRqcShkb2N1bWVudCkub24oXCJjaGFuZ2UgYmx1clwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHR2YXIganFUaGlzID0ganEoZXZlbnQudGFyZ2V0KTtcblxuXHRcdFx0XHR2YXIgbmFtZSA9IGpxVGhpcy5hdHRyKFwibmFtZVwiKTtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0ganFUaGlzLnZhbCgpO1xuXHRcdFx0XHR2YXIgdGFnID0gU3RyaW5nKGpxVGhpcy5wcm9wKFwidGFnTmFtZVwiKSkudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0XHRpZiAoanFUaGlzLmhhc0NsYXNzKFwiY2hhbmdlV2F0Y2hcIikpIHtcblx0XHRcdFx0XHRwcm9jZXNzQ2hhbmdlV2F0Y2goanFUaGlzLCB7IG5hbWU6IG5hbWUsIHZhbHVlOiBuZXdWYWx1ZSB9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQobmFtZSA9PSBcImdpZnRBbW91bnRGaXhlZFwiIHx8IG5hbWUgPT0gXCJnaWZ0QW1vdW50RnJlZWZvcm1cIikgJiZcblx0XHRcdFx0XHR0YWcgPT0gXCJpbnB1dFwiXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHByb2Nlc3NHaWZ0QW1vdW50Q2hhbmdlKGV2ZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmIChuYW1lID09IFwiZ2lmdEV4dHJhUGVyY2VudFwiICYmIHRhZyA9PSBcImlucHV0XCIpIHtcblx0XHRcdFx0XHR2YXIgbmV3UGVyY2VudCA9IDA7XG5cdFx0XHRcdFx0aWYgKGpxVGhpcy5wcm9wKFwiY2hlY2tlZFwiKSkge1xuXHRcdFx0XHRcdFx0bmV3UGVyY2VudCA9IGpxVGhpcy52YWwoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dXBkYXRlR2lmdEFtb3VudCh7IGV4dHJhUGVyY2VudDogbmV3UGVyY2VudCB9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChuYW1lID09IFwiZ2lmdEN1cnJlbmN5XCIgJiYgdGFnID09IFwic2VsZWN0XCIpIHtcblx0XHRcdFx0XHRzZXRDdXJyZW5jeURpc3BsYXlTeW1ib2woKTtcblx0XHRcdFx0XHRnZXRHaWZ0U3RyaW5nKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAobmFtZSA9PSBcInBheU1ldGhvZFwiICYmIHRhZyA9PSBcInNlbGVjdFwiKSB7XG5cdFx0XHRcdFx0dXBkYXRlUGF5TWV0aG9kKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAobmFtZSA9PSBcImdpZnRGcmVxdWVuY3lcIiAmJiB0YWcgPT0gXCJpbnB1dFwiKSB7XG5cdFx0XHRcdFx0dXBkYXRlRnJlcXVlbmN5KG5ld1ZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEFNT1VOVCAtIGFsc28gc2hvdyBoZWFkZXIgZGlzcGxheVxuXHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0LmZpbmQoJ2Rpdi5naWZ0T3B0aW9uIGlucHV0W25hbWU9XCJnaWZ0QW1vdW50RnJlZWZvcm1cIl0nKVxuXHRcdFx0XHQub24oXCJmb2N1cyBrZXl1cCBwYXN0ZVwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdHByb2Nlc3NHaWZ0QW1vdW50Q2hhbmdlKGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdC8vIENVUlJFTkNZXG5cdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKCdqcUN1cnJlbmN5U2VsZWN0LnRyaWdnZXIoXCJjaGFuZ2VcIik7Jyk7XG5cdFx0XHQvLyBqcUN1cnJlbmN5U2VsZWN0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cblx0XHRcdC8vIFBBWU1FTlQgTUVUSE9EXG5cdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKCdqcVBheU1ldGhvZFNlbGVjdC50cmlnZ2VyKFwiY2hhbmdlXCIpOycpO1xuXHRcdFx0Ly8ganFQYXlNZXRob2RTZWxlY3QudHJpZ2dlcihcImNoYW5nZVwiKTtcblxuXHRcdFx0Ly8gRlJFUVVFTkNZXG5cdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKCdqcUNvbnRhaW5lci50cmlnZ2VyKFwiY2hhbmdlXCIpOycpO1xuXHRcdFx0Ly8ganFDb250YWluZXIudHJpZ2dlcihcImNoYW5nZVwiKTtcblxuXHRcdFx0Ly8gQ09NUEFOWSBNQVRDSCAtIGFsc28gc2hvdy9oaWRlIGNvbXBhbnkgbWF0Y2ggaW5wdXQgZmllbGRzXG5cdFx0XHRqcUNvbnRhaW5lclxuXHRcdFx0XHQuZmluZChcImlucHV0I2lucHV0Q29tcGFueU1hdGNoXCIpXG5cdFx0XHRcdC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoanEodGhpcykucHJvcChcImNoZWNrZWRcIikpIHtcblx0XHRcdFx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdFx0XHRcdC5maW5kKFwiZGl2I2NvbGxhcHNhYmxlQ29tcGFueU1hdGNoXCIpXG5cdFx0XHRcdFx0XHRcdC5zbGlkZURvd24oNjY2LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0XHRcdFx0LmZpbmQoXCJkaXYjY29sbGFwc2FibGVDb21wYW55TWF0Y2hcIilcblx0XHRcdFx0XHRcdFx0LnNsaWRlVXAoMzMzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHByb2Nlc3NDaGFuZ2VXYXRjaChqcVRoaXMsIG9wdGlvbnMpIHtcblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJwcm9jZXNzQ2hhbmdlV2F0Y2goKVwiLCBqcVRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGlzVmFsaWQgPSB0cnVlO1xuXHRcdFx0dmFyIHZhbGlkYXRlZFZhbHVlID0gbnVsbDsgLy8ga2lsbCB0aGUgc3RvcmVkIHZhbHVlIHdoZW4gbm90IHZhbGlkXG5cblx0XHRcdG9wdGlvbnMudmFsaWRhdGlvblBhdHRlcm4gPSBqcVRoaXMuYXR0cihcImRhdGEtdmFsaWRhdGlvblwiKTtcblx0XHRcdGlmIChvcHRpb25zLnZhbGlkYXRpb25QYXR0ZXJuKSB7XG5cdFx0XHRcdGlzVmFsaWQgPSB2YWxpZGF0ZUlucHV0RmllbGQoanFUaGlzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzVmFsaWQpIHtcblx0XHRcdFx0dmFyIGVsZW1lbnRUeXBlID0ganFUaGlzLmF0dHIoXCJ0eXBlXCIpO1xuXHRcdFx0XHRpZiAoZWxlbWVudFR5cGUgPT0gXCJjaGVja2JveFwiIHx8IGVsZW1lbnRUeXBlID09IFwicmFkaW9cIikge1xuXHRcdFx0XHRcdGlmIChqcVRoaXMucHJvcChcImNoZWNrZWRcIikpIHtcblx0XHRcdFx0XHRcdC8vIHNldCB2YWx1ZSBvbmx5IGlmIGJvb2xlYW4gaW5wdXQgY2hlY2tlZFxuXHRcdFx0XHRcdFx0dmFsaWRhdGVkVmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWxpZGF0ZWRWYWx1ZSA9IG9wdGlvbnMudmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHVzZXJJbnB1dERhdGFbb3B0aW9ucy5uYW1lXSA9IHZhbGlkYXRlZFZhbHVlO1xuXG5cdFx0XHR3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuc2V0TG9jYWxWYWx1ZShvcHRpb25zLm5hbWUsIG9wdGlvbnMudmFsdWUsIHtcblx0XHRcdFx0cHJlZml4OiBmYWxzZSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXRGaWVsZChqcVRoaXMsIG9wdGlvbnMpIHtcblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJ2YWxpZGF0ZUlucHV0RmllbGQoKVwiLCBqcVRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGlzVmFsaWQgPSB0cnVlO1xuXG5cdFx0XHR2YXIgdmFsdWVTdHJpbmcgPSBcIlwiO1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLnZhbHVlICE9IFwidW5kZWZpbmVkXCIgJiYgb3B0aW9ucy52YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0XHR2YWx1ZVN0cmluZyA9IFN0cmluZyhvcHRpb25zLnZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0c3dpdGNoIChvcHRpb25zLnZhbGlkYXRpb25QYXR0ZXJuKSB7XG5cdFx0XHRcdGNhc2UgXCJlbWFpbFwiOlxuXHRcdFx0XHRcdGlzVmFsaWQgPSB2YWx1ZVN0cmluZy5tYXRjaCgvXltcXHd8XFwufFxcLXxcXF9dK0BbXFx3fFxcLnxcXC18XFxfXStcXC5bYS16XXsyLH0kL2kpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAob3B0aW9ucy52YWxpZGF0aW9uUGF0dGVybiwgXCJpXCIpO1xuXHRcdFx0XHRcdGlzVmFsaWQgPSB2YWx1ZVN0cmluZy5tYXRjaChyZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNWYWxpZCkge1xuXHRcdFx0XHRqcVRoaXMucmVtb3ZlQ2xhc3MoXCJpbnZhbGlkXCIpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGpxVGhpcy5hZGRDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJvY2Vzc0dpZnRBbW91bnRDaGFuZ2UoZXZlbnQpIHtcblx0XHRcdHZhciBqcVRhcmdldCA9IGpxKGV2ZW50LnRhcmdldCk7XG5cdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiPj4+IHByb2Nlc3NHaWZ0QW1vdW50Q2hhbmdlKClcIiwgZXZlbnQudHlwZSwganFUYXJnZXQuYXR0cihcIm5hbWVcIikpO1xuXHRcdFx0dmFyIG5ld1ZhbHVlID0gY2xlYW5DdXJyZW5jeShqcVRhcmdldC52YWwoKSkgfHwgMC4wO1xuXHRcdFx0dXBkYXRlR2lmdEFtb3VudCh7IGJhc2VBbW91bnQ6IG5ld1ZhbHVlIH0pO1xuXHRcdFx0anFDb250YWluZXIuZmluZChcImRpdi5naWZ0T3B0aW9uIGlucHV0XCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG5cblx0XHRcdGpxVGFyZ2V0LmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PSBcImNoYW5nZVwiKSB7XG5cdFx0XHRcdGpxR2lmdEhlYWRlckNvbnRhaW5lci5zbGlkZURvd24oNjY2LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzY3JvbGxBbGwoanFDb250YWluZXIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChldmVudC50eXBlID09IFwiY2hhbmdlXCIgfHwgZXZlbnQudHlwZSA9PSBcImJsdXJcIikge1xuXHRcdFx0XHRpZiAoanFUYXJnZXQuYXR0cihcIm5hbWVcIikgPT0gXCJnaWZ0QW1vdW50RnJlZWZvcm1cIikge1xuXHRcdFx0XHRcdHZhciBhbW91bnQgPSBjbGVhbkN1cnJlbmN5KG5ld1ZhbHVlKSB8fCAwLjA7XG5cdFx0XHRcdFx0dmFyIGNsZWFuZWRBbW91bnQgPSBhbW91bnQudG9GaXhlZCgyKTtcblx0XHRcdFx0XHRpZiAoY2xlYW5lZEFtb3VudCAhPSBuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdFx0anFUYXJnZXQudmFsKGNsZWFuZWRBbW91bnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoYW1vdW50IDwgdGhpc1dpZGdldC5jdXJyZW50R2lmdE1pbmltdW0pIHtcblx0XHRcdFx0XHRqcUZyZWVGb3JtR2lmdElucHV0LmFkZENsYXNzKFwiaW52YWxpZFwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqcUZyZWVGb3JtR2lmdElucHV0LnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRqcUNvbnRhaW5lci5maW5kKFwiZGl2LmdpZnRPcHRpb24gaW5wdXRbdHlwZT0ncmFkaW8nXVwiKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlR2lmdEFtb3VudChpbnB1dCkge1xuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIj4+PiB1cGRhdGVHaWZ0QW1vdW50KClcIiwgaW5wdXQpO1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBpbnB1dCA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dXNlcklucHV0RGF0YS50b3RhbEFtb3VudCA9IHVzZXJJbnB1dERhdGEudG90YWxBbW91bnQgfHwgMDtcblx0XHRcdFx0dXNlcklucHV0RGF0YS5iYXNlQW1vdW50ID0gdXNlcklucHV0RGF0YS5iYXNlQW1vdW50IHx8IDA7XG5cdFx0XHRcdHVzZXJJbnB1dERhdGEuZXh0cmFBbW91bnQgPSB1c2VySW5wdXREYXRhLmV4dHJhQW1vdW50IHx8IDA7XG5cdFx0XHRcdHVzZXJJbnB1dERhdGEuZXh0cmFQZXJjZW50ID0gdXNlcklucHV0RGF0YS5leHRyYVBlcmNlbnQgfHwgMDtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGlucHV0LmJhc2VBbW91bnQgIT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCA9IHBhcnNlRmxvYXQoaW5wdXQuYmFzZUFtb3VudCkgfHwgMC4wO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2YgaW5wdXQuZXh0cmFQZXJjZW50ICE9IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHR1c2VySW5wdXREYXRhLmV4dHJhUGVyY2VudCA9IHBhcnNlRmxvYXQoaW5wdXQuZXh0cmFQZXJjZW50KSB8fCAwLjA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dXNlcklucHV0RGF0YS5leHRyYUFtb3VudCA9XG5cdFx0XHRcdFx0KHVzZXJJbnB1dERhdGEuYmFzZUFtb3VudCAqIHVzZXJJbnB1dERhdGEuZXh0cmFQZXJjZW50KSAvIDEwMDtcblx0XHRcdFx0dXNlcklucHV0RGF0YS50b3RhbEFtb3VudCA9XG5cdFx0XHRcdFx0dXNlcklucHV0RGF0YS5iYXNlQW1vdW50ICsgdXNlcklucHV0RGF0YS5leHRyYUFtb3VudDtcblxuXHRcdFx0XHR2YXIgZGlzcGxheUFtb3VudCA9IHVzZXJJbnB1dERhdGEudG90YWxBbW91bnQudG9GaXhlZCgyKS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdFx0LmZpbmQoXCJkaXYuYW1vdW50RGlzcGxheSBzcGFuLmRpc3BsYXlXaG9sZUFtb3VudFwiKVxuXHRcdFx0XHRcdC50ZXh0KGRpc3BsYXlBbW91bnRbMF0gfHwgXCI/P1wiKTtcblx0XHRcdFx0anFDb250YWluZXJcblx0XHRcdFx0XHQuZmluZChcImRpdi5hbW91bnREaXNwbGF5IHNwYW4uZGlzcGxheVN1YkFtb3VudFwiKVxuXHRcdFx0XHRcdC50ZXh0KFwiLlwiICsgZGlzcGxheUFtb3VudFsxXSB8fCBcIj8/XCIpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInVwZGF0ZUdpZnRBbW91bnQoKSBjYXVnaHQgZXJyb3I6IFwiLCBlcnIubWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q3VycmVuY3lEaXNwbGF5U3ltYm9sKCkge1xuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIj4+PiBzZXRDdXJyZW5jeURpc3BsYXlTeW1ib2woKVwiKTtcblx0XHRcdHZhciBjdXJyZW5jeUNvZGUgPSBqcUN1cnJlbmN5U2VsZWN0LnZhbCgpO1xuXHRcdFx0dmFyIGN1cnJlbmN5U3ltYm9sID0gXCIoPylcIjtcblx0XHRcdHZhciB0aGlzSXRlbTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXNJdGVtID0gd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0W2ldO1xuXHRcdFx0XHR0aGlzV2lkZ2V0LmN1cnJlbnRHaWZ0TWluaW11bSA9IHRoaXNJdGVtLm1pbmltdW1BbW91bnQ7XG5cdFx0XHRcdGlmICh0aGlzSXRlbS5jb2RlID09IGN1cnJlbmN5Q29kZSAmJiB0aGlzSXRlbS5zeW1ib2wpIHtcblx0XHRcdFx0XHRjdXJyZW5jeVN5bWJvbCA9IHRoaXNJdGVtLnN5bWJvbDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpc1dpZGdldC5jdXJyZW50Q3VycmVuY3lTeW1ib2wgPSBjdXJyZW5jeVN5bWJvbDtcblx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJzcGFuLmN1cnJlbmN5U3ltYm9sXCIpLmh0bWwoY3VycmVuY3lTeW1ib2wpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZVBheU1ldGhvZCgpIHtcblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCI+Pj4gdXBkYXRlUGF5TWV0aG9kKClcIik7XG5cdFx0XHR2YXIgcGF5TWV0aG9kID0ganFQYXlNZXRob2RTZWxlY3QudmFsKCk7XG5cdFx0XHR2YXIgdGhpc0l0ZW07XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5td2RzcGFjZS52YWxpZFBheU1ldGhvZExpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpc0l0ZW0gPSB3aW5kb3cubXdkc3BhY2UudmFsaWRQYXlNZXRob2RMaXN0W2ldO1xuXHRcdFx0XHRpZiAodGhpc0l0ZW0uY29kZSA9PSBwYXlNZXRob2QpIHtcblx0XHRcdFx0XHRpZiAodGhpc0l0ZW0uZnJlcXVlbmNpZXMpIHtcblx0XHRcdFx0XHRcdHNldEZyZXF1ZW5jeUJ1dHRvblZpc2liaWxpdHkodGhpc0l0ZW0uZnJlcXVlbmNpZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEV2YWx1YXRlIHRoZSBleGlzdGluZyBIVE1MIGJ1dHRvbnMgYW5kIGhpZGUgb3Igc2hvd1xuXHRcdGZ1bmN0aW9uIHNldEZyZXF1ZW5jeUJ1dHRvblZpc2liaWxpdHkoZnJlcXVlbmN5TGlzdCkge1xuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIj4+PiBzZXRGcmVxdWVuY3lCdXR0b25WaXNpYmlsaXR5KClcIik7XG5cdFx0XHRpZiAodHlwZW9mIGZyZXF1ZW5jeUxpc3QgIT0gXCJvYmplY3RcIiB8fCBmcmVxdWVuY3lMaXN0Lmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFwic2V0RnJlcXVlbmN5QnV0dG9uVmlzaWJpbGl0eSgpIGlnbm9yaW5nIGludmFsaWQgZnJlcXVlbmN5IGxpc3RcIixcblx0XHRcdFx0XHRcdGZyZXF1ZW5jeUxpc3Rcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBhY3Rpb25MaXN0ID0gW107XG5cdFx0XHR2YXIgaXRlbXNWaXNpYmxlID0gMDtcblx0XHRcdHZhciBzZWxlY3RlZE9wdGlvbk5vd0hpZGRlbiA9IGZhbHNlO1xuXG5cdFx0XHR2YXIgdGhpc0ZyZXF1ZW5jeTtcblx0XHRcdGpxQ29udGFpbmVyXG5cdFx0XHRcdC5maW5kKFwiZGl2LmdpZnRGcmVxdWVuY3lDb250YWluZXIgZGl2LmZhbmN5UmFkaW9CdXR0b24gaW5wdXRbdHlwZT0ncmFkaW8nXVwiKVxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR0aGlzRnJlcXVlbmN5ID0ge1xuXHRcdFx0XHRcdFx0anFPYmplY3Q6IGpxKHRoaXMpLFxuXHRcdFx0XHRcdFx0c2hvdzogdHJ1ZSxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGlmIChmcmVxdWVuY3lMaXN0LmluZGV4T2YodGhpc0ZyZXF1ZW5jeS5qcU9iamVjdC52YWwoKSkgPj0gMCkge1xuXHRcdFx0XHRcdFx0Ly8gc2hvdyB0aGlzIGZyZXF1ZW5jeVxuXHRcdFx0XHRcdFx0aXRlbXNWaXNpYmxlKys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIGhpZGUgdGhpcyBmcmVxdWVuY3lcblx0XHRcdFx0XHRcdHRoaXNGcmVxdWVuY3kuc2hvdyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXNGcmVxdWVuY3kuanFPYmplY3QucHJvcChcImNoZWNrZWRcIikpIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRPcHRpb25Ob3dIaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhY3Rpb25MaXN0LnB1c2godGhpc0ZyZXF1ZW5jeSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoaXRlbXNWaXNpYmxlIDwgMSkge1xuXHRcdFx0XHQvLyBzb21ldGhpbmcgaXMgd3JvbmcsIHNob3cgYWxsXG5cdFx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZ2lmdEZyZXF1ZW5jeUNvbnRhaW5lciBkaXYuZmFuY3lSYWRpb0J1dHRvblwiKS5zaG93KCk7XG5cdFx0XHR9IGVsc2UgaWYgKGl0ZW1zVmlzaWJsZSA9PSAxKSB7XG5cdFx0XHRcdC8vIGhpZGUgYWxsXG5cdFx0XHRcdGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZ2lmdEZyZXF1ZW5jeUNvbnRhaW5lciBkaXYuZmFuY3lSYWRpb0J1dHRvblwiKS5oaWRlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBzaG93L2hpZGUgYWNjb3JkaW5nIHRvIGFjdGlvbiBsaXN0XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChhY3Rpb25MaXN0W2ldLnNob3cpIHtcblx0XHRcdFx0XHRcdGFjdGlvbkxpc3RbaV0uanFPYmplY3QuY2xvc2VzdChcImRpdi5mYW5jeVJhZGlvQnV0dG9uXCIpLnNob3coKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWN0aW9uTGlzdFtpXS5qcU9iamVjdC5jbG9zZXN0KFwiZGl2LmZhbmN5UmFkaW9CdXR0b25cIikuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25Ob3dIaWRkZW4pIHtcblx0XHRcdFx0Ly8gYXV0byBzZWxlY3QgdGhlIGZpcnN0IHZpc2libGUgb3B0aW9uXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChhY3Rpb25MaXN0W2ldLnNob3cpIHtcblx0XHRcdFx0XHRcdGFjdGlvbkxpc3RbaV0uanFPYmplY3QucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSkudHJpZ2dlcihcImNoYW5nZVwiKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUZyZXF1ZW5jeShuZXdWYWx1ZSkge1xuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIj4+PiB1cGRhdGVGcmVxdWVuY3koKVwiLCBuZXdWYWx1ZSk7XG5cdFx0XHRpZiAodHlwZW9mIG5ld1ZhbHVlID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHZhciBkb25hdGlvbkFtb3VudEhlYWRsaW5lO1xuXHRcdFx0c3dpdGNoIChuZXdWYWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwic2luZ2xlXCI6XG5cdFx0XHRcdFx0ZG9uYXRpb25BbW91bnRIZWFkbGluZSA9IFwiWW91ciBkb25hdGlvblwiO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmhlYWRlci5zaW5nbGVEb25hdGlvblRleHQpXG5cdFx0XHRcdFx0XHRcdGRvbmF0aW9uQW1vdW50SGVhZGxpbmUgPVxuXHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5oZWFkZXIuc2luZ2xlRG9uYXRpb25UZXh0O1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm1vbnRobHlcIjpcblx0XHRcdFx0XHRkb25hdGlvbkFtb3VudEhlYWRsaW5lID0gXCJZb3VyIHJlY3VycmluZyBkb25hdGlvblwiO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmhlYWRlci5tb250aGx5RG9uYXRpb25UZXh0KVxuXHRcdFx0XHRcdFx0XHRkb25hdGlvbkFtb3VudEhlYWRsaW5lID1cblx0XHRcdFx0XHRcdFx0XHR0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuaGVhZGVyLm1vbnRobHlEb25hdGlvblRleHQ7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGRvbmF0aW9uQW1vdW50SGVhZGxpbmUgPSBcIlVOS05PV04gRE9OQVRJT04gRlJFUVVFTkNZXCI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXNXaWRnZXQuc2V0RWxlbWVudExhYmVsT3ZlcnJpZGUoXCJoZWFkZXIuZG9uYXRpb25UZXh0XCIsIGRvbmF0aW9uQW1vdW50SGVhZGxpbmUpO1xuXG5cdFx0XHRnZXRHaWZ0U3RyaW5nKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJlUG9wdWxhdGVVc2VyRmllbGRzKCkge1xuXHRcdFx0Ly8gcG9wdWxhdGUgZnJvbSBVUkwgb3Igc3RvcmFnZVxuXHRcdFx0Y2hlY2tQcmVQb3B1bGF0aW9uU291cmNlcyhcImZpcnN0XCIsIFwiZG9ub3JGaXJzdE5hbWVcIik7XG5cdFx0XHRjaGVja1ByZVBvcHVsYXRpb25Tb3VyY2VzKFwibGFzdFwiLCBcImRvbm9yTGFzdE5hbWVcIik7XG5cdFx0XHRjaGVja1ByZVBvcHVsYXRpb25Tb3VyY2VzKFwiZW1haWxcIiwgXCJkb25vckVtYWlsXCIpO1xuXHRcdFx0Y2hlY2tQcmVQb3B1bGF0aW9uU291cmNlcyhcInBob25lXCIsIFwiZG9ub3JQaG9uZVwiKTtcblx0XHRcdGNoZWNrUHJlUG9wdWxhdGlvblNvdXJjZXMoXCJzdHJlZXRcIiwgXCJkb25vclN0cmVldFwiKTtcblx0XHRcdGNoZWNrUHJlUG9wdWxhdGlvblNvdXJjZXMoXCJjaXR5XCIsIFwiZG9ub3JDaXR5XCIpO1xuXHRcdFx0Y2hlY2tQcmVQb3B1bGF0aW9uU291cmNlcyhcInBvc3Rjb2RlXCIsIFwiZG9ub3JQb3N0Q29kZVwiKTtcblx0XHRcdGNoZWNrUHJlUG9wdWxhdGlvblNvdXJjZXMoXCJjb3VudHJ5XCIsIFwiZG9ub3JDb3VudHJ5XCIpO1xuXHRcdFx0Y2hlY2tQcmVQb3B1bGF0aW9uU291cmNlcyhcInJlZ2lvblwiLCBcImRvbm9yUmVnaW9uXCIpOyAvL211c3Qgb2NjdXIgYWZ0ZXIgY291bnRyeVxuXG5cdFx0XHQvLyBwb3B1bGF0ZSBmcm9tIHVybCBvbmx5XG5cdFx0XHRzZXRJbnB1dEZyb21VcmwoXCJjdXJyZW5jeVwiLCBcImdpZnRDdXJyZW5jeVwiKTtcblx0XHRcdHNldElucHV0RnJvbVVybChcImFtb3VudFwiLCBcImdpZnRBbW91bnRGcmVlZm9ybVwiKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGVja1ByZVBvcHVsYXRpb25Tb3VyY2VzKHVybEtleSwgc2VsZWN0b3IpIHtcblx0XHRcdC8vIGNoZWNrIGZvciBhbmQgc2V0IHZhbHVlIGZyb20gdXJsIGZpcnN0XG5cdFx0XHRpZiAoIXNldElucHV0RnJvbVVybCh1cmxLZXksIHNlbGVjdG9yKSkge1xuXHRcdFx0XHQvLyBjaGVjayBzdG9yYWdlIGlmIG5vIHVybCB2YWx1ZSBleGlzdHNcblx0XHRcdFx0c2V0SW5wdXRGcm9tU3RvcmFnZShzZWxlY3Rvcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0SW5wdXRGcm9tVXJsKHVybEtleSwgc2VsZWN0b3IpIHtcblx0XHRcdGlmICh0eXBlb2YgdXJsS2V5ID09IFwidW5kZWZpbmVkXCIgfHwgIXVybEtleSkge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZXRJbnB1dEZyb21VcmwoKSBnaXZlbiBpbnZhbGlkIHVybEtleVwiLCB1cmxLZXkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHNlbGVjdG9yID09IFwidW5kZWZpbmVkXCIgfHwgIXNlbGVjdG9yKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNldElucHV0RnJvbVVybCgpIGdpdmVuIGludmFsaWQgc2VsZWN0b3JcIiwgc2VsZWN0b3IpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgdXJsVmFsdWUgPSB3aW5kb3cubXdkc3BhY2Uuc2hhcmVkVXRpbHMuZ2V0VXJsUGFyYW1ldGVyKHVybEtleSk7XG5cdFx0XHRpZiAodXJsVmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHNldElucHV0VmFsdWUoc2VsZWN0b3IsIHVybFZhbHVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXRJbnB1dEZyb21TdG9yYWdlKHNlbGVjdG9yKSB7XG5cdFx0XHRpZiAodHlwZW9mIHNlbGVjdG9yID09IFwidW5kZWZpbmVkXCIgfHwgIXNlbGVjdG9yKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNldElucHV0RnJvbVN0b3JhZ2UoKSBnaXZlbiBpbnZhbGlkIHNlbGVjdG9yXCIsIHNlbGVjdG9yKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHN0b3JlZFZhbHVlID0gd2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLmdldExvY2FsVmFsdWUoc2VsZWN0b3IsIHtcblx0XHRcdFx0cHJlZml4OiBmYWxzZSxcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHN0b3JlZFZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBzZXRJbnB1dFZhbHVlKHNlbGVjdG9yLCBzdG9yZWRWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZShzZWxlY3RvciwgdmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gXCJ1bmRlZmluZWRcIiB8fCAhc2VsZWN0b3IpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic2V0SW5wdXRWYWx1ZSgpIGdpdmVuIGludmFsaWQgc2VsZWN0b3JcIiwgc2VsZWN0b3IpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIganFUYXJnZXRzID0ganFDb250YWluZXIuZmluZChcblx0XHRcdFx0XCJzZWN0aW9uLnN0ZXAgaW5wdXRbbmFtZT0nXCIgK1xuXHRcdFx0XHRcdHNlbGVjdG9yICtcblx0XHRcdFx0XHRcIiddLCBzZWN0aW9uLnN0ZXAgc2VsZWN0W25hbWU9J1wiICtcblx0XHRcdFx0XHRzZWxlY3RvciArXG5cdFx0XHRcdFx0XCInXVwiXG5cdFx0XHQpO1xuXHRcdFx0aWYgKGpxVGFyZ2V0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGpxVGFyZ2V0cy52YWwodmFsdWUpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkVHJhbnNhY3Rpb25TZW5kRGF0YSgpIHtcblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJidWlsZFRyYW5zYWN0aW9uU2VuZERhdGEoKSBTVEFSVFwiKTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhID0ge307XG5cdFx0XHRcdHZhciBzZW5kRGF0YSA9IHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhO1xuXG5cdFx0XHRcdHZhciB1c2VyRGF0YSA9IHdpbmRvdy5td2RzcGFjZS51c2VySW5wdXREYXRhO1xuXHRcdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiYnVpbGRUcmFuc2FjdGlvblNlbmREYXRhKCkgdXNlckRhdGFcIiwgdXNlckRhdGEpO1xuXG5cdFx0XHRcdHNlbmREYXRhLm9yZ2FuaXphdGlvbklkID0gdGhpc1dpZGdldC5vcHRpb25zLm9yZ2FuaXphdGlvbklkIHx8IG51bGw7XG5cdFx0XHRcdHNlbmREYXRhLmZvcm1JZCA9IHRoaXNXaWRnZXQub3B0aW9ucy5mb3JtSWRcblx0XHRcdFx0XHQ/IFN0cmluZyh0aGlzV2lkZ2V0Lm9wdGlvbnMuZm9ybUlkKVxuXHRcdFx0XHRcdDogXCJcIjsgLy9taW1pYyB0ZXN0XG5cdFx0XHRcdHNlbmREYXRhLmZvcm1BbGxvY2F0aW9uSWQgPSB0aGlzV2lkZ2V0Lm9wdGlvbnMuZm9ybUFsbG9jYXRpb25JZCB8fCBudWxsO1xuXG5cdFx0XHRcdC8qIHN0YXJ0IC0gbm8gZGF0YSwgYWRkZWQgdG8gbWltaWMgY3VycmVudCB3aWRnZXQgKi9cblx0XHRcdFx0c2VuZERhdGEuYmFua19hY2NvdW50X2hvbGRlcl90eXBlID0gXCJwZXJzb25hbFwiO1xuXHRcdFx0XHRzZW5kRGF0YS5iYW5rX2FjY291bnRfbnVtYmVyID0gXCJcIjtcblx0XHRcdFx0c2VuZERhdGEuYmFua19hY2NvdW50X3R5cGUgPSBcImNoZWNraW5nXCI7XG5cdFx0XHRcdHNlbmREYXRhLmJhbmtfbmFtZSA9IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLmJhbmtfcm91dGluZ19udW1iZXIgPSBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5jb21tZW50ID0gXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucGF5bWVudF9tZXRob2RfdG9rZW4gPSBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS50YWdzID0gbnVsbDtcblx0XHRcdFx0LyogZW5kIC0gbm8gZGF0YSwgYWRkZWQgdG8gbWltaWMgY3VycmVudCB3aWRnZXQgKi9cblxuXHRcdFx0XHRzZW5kRGF0YS5maXJzdF9uYW1lID0gdXNlckRhdGEuZG9ub3JGaXJzdE5hbWUgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEubGFzdF9uYW1lID0gdXNlckRhdGEuZG9ub3JMYXN0TmFtZSB8fCBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5lbWFpbCA9IHVzZXJEYXRhLmRvbm9yRW1haWwgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucGhvbmUgPSB1c2VyRGF0YS5kb25vclBob25lIHx8IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLmFkZHJlc3MgPSB1c2VyRGF0YS5kb25vclN0cmVldCB8fCBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5jaXR5ID0gdXNlckRhdGEuZG9ub3JDaXR5IHx8IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLnN0YXRlID0gdXNlckRhdGEuZG9ub3JSZWdpb24gfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEucG9zdGFsQ29kZSA9IHVzZXJEYXRhLmRvbm9yUG9zdENvZGUgfHwgXCJcIjtcblx0XHRcdFx0c2VuZERhdGEuY291bnRyeSA9IHVzZXJEYXRhLmRvbm9yQ291bnRyeSB8fCBcIlwiO1xuXG5cdFx0XHRcdHNlbmREYXRhLmFtb3VudCA9IHVzZXJEYXRhLnRvdGFsQW1vdW50IHx8IDA7XG5cdFx0XHRcdHNlbmREYXRhLmJhc2VBbW91bnQgPSBOdW1iZXIodXNlckRhdGEuYmFzZUFtb3VudCB8fCAwKS50b0ZpeGVkKDIpOyAvL21pbWljIHRlc3Rcblx0XHRcdFx0c2VuZERhdGEudGlwQW1vdW50ID0gTnVtYmVyKHVzZXJEYXRhLmV4dHJhQW1vdW50IHx8IDApLnRvRml4ZWQoMik7IC8vbWltaWMgdGVzdFxuXHRcdFx0XHRzZW5kRGF0YS50aXBQZXJjZW50ID0gTnVtYmVyKHVzZXJEYXRhLmV4dHJhUGVyY2VudCB8fCAwKS50b0ZpeGVkKDIpOyAvL21pbWljIHRlc3RcblxuXHRcdFx0XHRzd2l0Y2ggKHVzZXJEYXRhLmdpZnRGcmVxdWVuY3kpIHtcblx0XHRcdFx0XHRjYXNlIFwic2luZ2xlXCI6XG5cdFx0XHRcdFx0XHRzZW5kRGF0YS5yZWN1cnJpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHNlbmREYXRhLmZyZXF1ZW5jeSA9IFwib1wiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIm1vbnRobHlcIjpcblx0XHRcdFx0XHRcdHNlbmREYXRhLnJlY3VycmluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRzZW5kRGF0YS5mcmVxdWVuY3kgPSBcIm1cIjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRzZW5kRGF0YS5yZWN1cnJpbmcgPSBudWxsO1xuXHRcdFx0XHRcdFx0c2VuZERhdGEuZnJlcXVlbmN5ID0gXCJcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNlbmREYXRhLmN1cnJlbmN5ID0gdXNlckRhdGEuZ2lmdEN1cnJlbmN5IHx8IFwiXCI7XG5cdFx0XHRcdHNlbmREYXRhLnBheW1lbnRUeXBlID0gdXNlckRhdGEucGF5TWV0aG9kIHx8IFwiXCI7XG5cblx0XHRcdFx0aWYgKHNlbmREYXRhLnBheW1lbnRUeXBlID09IFwiY2FyZFwiKSB7XG5cdFx0XHRcdFx0c2VuZERhdGEubW9udGggPSB1c2VyRGF0YS5wYXlDYXJkRXhwaXJlTW9udGggfHwgXCJcIjtcblx0XHRcdFx0XHRzZW5kRGF0YS55ZWFyID0gdXNlckRhdGEucGF5Q2FyZEV4cGlyZVllYXIgfHwgXCJcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNlbmREYXRhLmRvbmF0ZURvdWJsZSA9IHVzZXJEYXRhLmlzQ29tcGFueU1hdGNoID09PSB0cnVlO1xuXHRcdFx0XHRzZW5kRGF0YS5jb21wYW55ID0gdXNlckRhdGEuY29tcGFueU1hdGNoTmFtZSB8fCBcIlwiO1xuXHRcdFx0XHRzZW5kRGF0YS5lbXBsb3llZUVtYWlsID0gdXNlckRhdGEuY29tcGFueU1hdGNoRW1haWwgfHwgXCJcIjtcblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiYnVpbGRUcmFuc2FjdGlvblNlbmREYXRhKCkgY2F1Z2h0IGVycm9yOiBcIiwgZXJyLm1lc3NhZ2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNlbmRUcmFuc2FjdGlvbigpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0IXdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvbkxheWVyLnZhbGlkYXRlU2VuZERhdGEoXG5cdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGFcblx0XHRcdFx0KVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcInNlbmRUcmFuc2FjdGlvbigpIFNFTkRJTkdcIiwgd2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGEpO1xuXG5cdFx0XHRwcmVwQW5kU2hvd1Byb2Nlc3NpbmdTdGVwKCk7XG5cblx0XHRcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvbkxheWVyLnN0YXJ0RG9uYXRpb24oXG5cdFx0XHRcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhLFxuXHRcdFx0XHRmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0XHRcdHZhciB0cmFuc2FjdGlvbkRhdGEgPSByZXNwb25zZS5qc29uIHx8IHt9O1xuXG5cdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcInRyYW5zYWN0aW9uRGF0YVwiLCB0cmFuc2FjdGlvbkRhdGEpO1xuXG5cdFx0XHRcdFx0aWYgKHRyYW5zYWN0aW9uRGF0YS50eXBlID09IFwiYml0Y29pblwiKSB7XG5cdFx0XHRcdFx0XHRwcmVwQW5kU2hvd0JpdGNvaW5TdGVwKHRyYW5zYWN0aW9uRGF0YSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciB0cmFuc2FjdGlvblN0YXR1cyA9IFN0cmluZyh0cmFuc2FjdGlvbkRhdGEuc3RhdHVzKTtcblx0XHRcdFx0XHRcdGlmICh0cmFuc2FjdGlvblN0YXR1cy5tYXRjaCgvY29tcGxldGUvaSkpIHtcblx0XHRcdFx0XHRcdFx0cHJlcEFuZFNob3dDb25maXJtYXRpb25TdGVwKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRwcmVwQW5kU2hvd0Vycm9yU3RlcChcblx0XHRcdFx0XHRcdFx0XHQnVGhlIHNlcnZlciBhcHBlYXJzIHRvIGhhdmUgaGFkIGFuIGVycm9yIHByb2Nlc3NpbmcgdGhpcyBjYXJkIHRyYW5zYWN0aW9uLCBhbmQgcmVwb3J0ZWQgc3RhdHVzIFwiJyArXG5cdFx0XHRcdFx0XHRcdFx0XHR0cmFuc2FjdGlvblN0YXR1cyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnXCIuJ1xuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJEb25hdGlvbiByZWNlaXZlZCBmYWlsIHJlc3BvbnNlIGZyb20gc2VydmVyXCIsIHJlc3BvbnNlKTtcblxuXHRcdFx0XHRcdHZhciB1c2VyTWVzc2FnZTtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UudGV4dCkge1xuXHRcdFx0XHRcdFx0Ly8gcGFzcyB0aHJ1IHRoZSB0cmFuc2FjdGlvbiBzeXN0ZW0gcmVzcG9uc2UgdGV4dFxuXHRcdFx0XHRcdFx0dXNlck1lc3NhZ2UgPSBcIlNlcnZlciBtZXNzYWdlOlwiO1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0dXNlck1lc3NhZ2UgPVxuXHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS50cmFuc2FjdGlvbkVycm9yLmVycm9yLnN5c3RlbU1lc3NhZ2UgfHxcblx0XHRcdFx0XHRcdFx0XHR1c2VyTWVzc2FnZTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0XHRcdHVzZXJNZXNzYWdlICs9IFwiIFwiICsgcmVzcG9uc2UudGV4dDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dXNlck1lc3NhZ2UgPVxuXHRcdFx0XHRcdFx0XHRcIlRoZSBzZXJ2ZXIgd2FzIHVuYWJsZSB0byBwcm9jZXNzIHRoZSB0cmFuc2FjdGlvbiwgYnV0IHByb3ZpZGVkIG5vIGV4cGxhbmF0aW9uLlwiO1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0dXNlck1lc3NhZ2UgPVxuXHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS50cmFuc2FjdGlvbkVycm9yLmVycm9yLnVua25vd24gfHxcblx0XHRcdFx0XHRcdFx0XHR1c2VyTWVzc2FnZTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHVzZXJNZXNzYWdlICs9XG5cdFx0XHRcdFx0XHRcdFx0XCIgPHNwYW4gY2xhc3M9J2hpbnQnPihIVE1MIHN0YXR1czogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdChyZXNwb25zZS5zdGF0dXMgfHwgXCJbTm8gU3RhdHVzXVwiKSArXG5cdFx0XHRcdFx0XHRcdFx0XCIgXCIgK1xuXHRcdFx0XHRcdFx0XHRcdChyZXNwb25zZS5zdGF0dXNUZXh0IHx8IFwiW05vIFRleHRdXCIpICtcblx0XHRcdFx0XHRcdFx0XHRcIik8L3NwYW4+XCI7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvcjogXCIsIGVyci5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRwcmVwQW5kU2hvd0Vycm9yU3RlcCh1c2VyTWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRHaWZ0U3RyaW5nKCkge1xuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcIj4+PiBnZXRHaWZ0U3RyaW5nKClcIik7XG5cdFx0XHR2YXIgZ2lmdFN0cmluZ09wdGlvbnMgPSB7XG5cdFx0XHRcdG1pbmltdW1HaWZ0QW1vdW50OiB0aGlzV2lkZ2V0LmN1cnJlbnRHaWZ0TWluaW11bSxcblx0XHRcdFx0Ly8gYmFzaWNSb3VuZGluZzogdHJ1ZSxcblx0XHRcdFx0Ly8gbWluaW11bUR5bmFtaWNTdGFydDogMzAuMCxcblx0XHRcdH07XG5cdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEuZ2lmdEZyZXF1ZW5jeSA9PSBcIm1vbnRobHlcIikge1xuXHRcdFx0XHRpZiAodGhpc1dpZGdldC5vcHRpb25zLmdpZnRTdHJpbmdNb250aGx5KSB7XG5cdFx0XHRcdFx0dmFyIHRlbXBHaWZ0U3RyaW5nID0gZ2V0Q3VycmVuY3lTcGVjaWZpY0dpZnRTdHJpbmcoXCJtb250aGx5XCIpO1xuXHRcdFx0XHRcdGlmICh0ZW1wR2lmdFN0cmluZykge1xuXHRcdFx0XHRcdFx0Ly8gdXNlIGdpdmVuIGN1cnJlbmN5IHNwZWNpZmljIG1vbnRobHkgYW1vdW50c1xuXHRcdFx0XHRcdFx0Z2lmdFN0cmluZ09wdGlvbnMuZ2lmdFN0cmluZ0xpc3QgPSB0ZW1wR2lmdFN0cmluZztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGVtcEdpZnRTdHJpbmcgPSBnZXRDdXJyZW5jeVNwZWNpZmljR2lmdFN0cmluZyhcInNpbmdsZVwiKTtcblx0XHRcdFx0XHRcdGlmICh0ZW1wR2lmdFN0cmluZykge1xuXHRcdFx0XHRcdFx0XHQvLyBjb252ZXJ0IGN1cnJlbmN5IHNwZWNpZmljIHNpbmdsZSBnaWZ0cyBpbnRvIG1vbnRobHkgYW1vdW50c1xuXHRcdFx0XHRcdFx0XHRnaWZ0U3RyaW5nT3B0aW9ucy5jYWxjdWxhdGVBc01vbnRobHkgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRnaWZ0U3RyaW5nT3B0aW9ucy5naWZ0U3RyaW5nTGlzdCA9IHRlbXBHaWZ0U3RyaW5nO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gdXNlIGRlZmF1bHQgbW9udGhseVxuXHRcdFx0XHRcdFx0XHRnaWZ0U3RyaW5nT3B0aW9ucy5naWZ0U3RyaW5nTGlzdCA9XG5cdFx0XHRcdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmdpZnRTdHJpbmdNb250aGx5O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXNXaWRnZXQub3B0aW9ucy5naWZ0U3RyaW5nU2luZ2xlKSB7XG5cdFx0XHRcdFx0Ly8gdXNlIGdpdmVuIGN1cnJlbmN5IHNwZWNpZmljIG1vbnRobHkgYW1vdW50cywgd2l0aCBkZWZhdWx0IGFzIGJhY2t1cFxuXHRcdFx0XHRcdGdpZnRTdHJpbmdPcHRpb25zLmdpZnRTdHJpbmdMaXN0ID1cblx0XHRcdFx0XHRcdGdldEN1cnJlbmN5U3BlY2lmaWNHaWZ0U3RyaW5nKFwic2luZ2xlXCIpIHx8XG5cdFx0XHRcdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZ2lmdFN0cmluZ1NpbmdsZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZmluYWxHaWZ0U3RyaW5nID0gd2luZG93Lm13ZHNwYWNlLmdpZnRVdGlscy5wcm9jZXNzR2lmdFN0cmluZ0xpc3QoXG5cdFx0XHRcdGdpZnRTdHJpbmdPcHRpb25zXG5cdFx0XHQpO1xuXG5cdFx0XHRidWlsZEdpZnRTdHJpbmdCdXR0b25zKGZpbmFsR2lmdFN0cmluZyk7XG5cdFx0XHRzZXRDdXJyZW5jeURpc3BsYXlTeW1ib2woKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRDdXJyZW5jeVNwZWNpZmljR2lmdFN0cmluZyh0eXBlKSB7XG5cdFx0XHRpZiAodHlwZW9mIHR5cGUgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgdHlwZSA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0XHR2YXIgcHJvcGVydHlOYW1lID0gXCJnaWZ0U3RyaW5nU2luZ2xlXCI7XG5cdFx0XHRpZiAodHlwZSA9PSBcIm1vbnRobHlcIikge1xuXHRcdFx0XHRwcm9wZXJ0eU5hbWUgPSBcImdpZnRTdHJpbmdNb250aGx5XCI7XG5cdFx0XHR9XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgZ2lmdFN0cmluZ0xpc3QgPVxuXHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5maWx0ZXJMaXN0Q3VycmVuY3lbXG5cdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5naWZ0Q3VycmVuY3lcblx0XHRcdFx0XHRdW3Byb3BlcnR5TmFtZV07XG5cdFx0XHRcdGlmIChnaWZ0U3RyaW5nTGlzdCAmJiBnaWZ0U3RyaW5nTGlzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdpZnRTdHJpbmdMaXN0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFwiZ2V0Q3VycmVuY3lTcGVjaWZpY0dpZnRTdHJpbmcoKSBjYXVnaHQgZXJyb3I6IFwiLFxuXHRcdFx0XHRcdFx0ZXJyLm5hbWUsXG5cdFx0XHRcdFx0XHRlcnIubWVzc2FnZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZEdpZnRTdHJpbmdCdXR0b25zKGdpZnRTdHJpbmdMaXN0KSB7XG5cdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiPj4+IGJ1aWxkR2lmdFN0cmluZ0J1dHRvbnMoKVwiLCBnaWZ0U3RyaW5nTGlzdCk7XG5cdFx0XHRpZiAodHlwZW9mIGdpZnRTdHJpbmdMaXN0ID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGdpZnRTdHJpbmdMaXN0ID0gW107XG5cdFx0XHR9XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWdpZnRTdHJpbmdMaXN0IHx8IGdpZnRTdHJpbmdMaXN0Lmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGdpZnQgc3RyaW5nIGxpc3QgZ2l2ZW5cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGpxR2lmdFN0cmluZ0NvbnRhaW5lciA9IGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZml4ZWRBbW91bnRDb250YWluZXJcIik7XG5cdFx0XHRcdGlmIChqcUdpZnRTdHJpbmdDb250YWluZXIubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSBmaXhlZCBnaWZ0IGFtb3VudCBjb250YWluZXJcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gcmVtb3ZlIGFueSBleGlzdGluZyBvcHRpb25zXG5cdFx0XHRcdGpxR2lmdFN0cmluZ0NvbnRhaW5lci5lbXB0eSgpO1xuXG5cdFx0XHRcdHZhciBkb21UaGlzQnV0dG9uLCB0aGlzQW1vdW50LCB0aGlzSWQ7XG5cdFx0XHRcdHZhciBkZWZhdWx0SWQgPSBudWxsO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZ2lmdFN0cmluZ0xpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzQW1vdW50ID0gZ2lmdFN0cmluZ0xpc3RbaV07XG5cdFx0XHRcdFx0dGhpc0lkID0gd2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLm1ha2VVbmlxdWVJZChcImFtb3VudC1cIiArIGkpO1xuXHRcdFx0XHRcdGlmICghZGVmYXVsdElkICYmIFN0cmluZyh0aGlzQW1vdW50KS5tYXRjaCgvXFwqLykpIHtcblx0XHRcdFx0XHRcdGRlZmF1bHRJZCA9IHRoaXNJZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9tVGhpc0J1dHRvbiA9IGJ1aWxkR2lmdFN0cmluZ0J1dHRvbih0aGlzQW1vdW50LCB7XG5cdFx0XHRcdFx0XHRpZDogdGhpc0lkLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChkb21UaGlzQnV0dG9uKSB7XG5cdFx0XHRcdFx0XHRqcUdpZnRTdHJpbmdDb250YWluZXIuYXBwZW5kKGRvbVRoaXNCdXR0b24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBhZGQgZml4ZWQgZ2lmdCBidXR0b246XCIsIHRoaXNBbW91bnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBiZWxvdyBpcyBpbiBwcm9ncmVzc1xuXHRcdFx0XHRpZiAoZGVmYXVsdElkKSB7XG5cdFx0XHRcdFx0anFHaWZ0U3RyaW5nQ29udGFpbmVyXG5cdFx0XHRcdFx0XHQuZmluZChcImRpdi5naWZ0QW1vdW50Q29udGFpbmVyIGlucHV0I1wiICsgZGVmYXVsdElkKVxuXHRcdFx0XHRcdFx0LnByb3AoXCJjaGVja2VkXCIsIHRydWUpXG5cdFx0XHRcdFx0XHQudHJpZ2dlcihcImNoYW5nZVwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqcUdpZnRTdHJpbmdDb250YWluZXJcblx0XHRcdFx0XHRcdC5maW5kKFwiZGl2LmdpZnRBbW91bnRDb250YWluZXIgaW5wdXRbbmFtZT0nZ2lmdEFtb3VudEZpeGVkJ11cIilcblx0XHRcdFx0XHRcdC5lcSgxKVxuXHRcdFx0XHRcdFx0LnByb3AoXCJjaGVja2VkXCIsIHRydWUpXG5cdFx0XHRcdFx0XHQudHJpZ2dlcihcImNoYW5nZVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBmaXhlZCBnaWZ0IGJ1dHRvbnNcIiwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZEdpZnRTdHJpbmdCdXR0b24oaW5wdXQsIG9wdGlvbnMpIHtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgIT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRvcHRpb25zID0ge307XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcImJ1aWxkR2lmdFN0cmluZ0J1dHRvbigpOiBpZ25vcmluZyBpbnZhbGlkIG9wdGlvbiBvYmplY3RcIixcblx0XHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGRvbUJ1dHRvbiA9IG51bGw7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgdGhpc0Ftb3VudCA9IHtcblx0XHRcdFx0XHRhbW91bnQ6IGNsZWFuQ3VycmVuY3koaW5wdXQpLFxuXHRcdFx0XHRcdGRpc3BsYXlUZXh0OiBmb3JtYXREaXNwbGF5R2lmdChpbnB1dCksXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKCF0aGlzQW1vdW50LmFtb3VudCB8fCAhdGhpc0Ftb3VudC5kaXNwbGF5VGV4dCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZ2lmdCBzdHJpbmcgYW1vdW50XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gdGhlIGNvbnRhaW5lciBkaXZcblx0XHRcdFx0ZG9tQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0anEoZG9tQnV0dG9uKS5hZGRDbGFzcyhcImdpZnRPcHRpb24gZml4ZWQgZmFuY3lSYWRpb0J1dHRvblwiKTtcblxuXHRcdFx0XHQvLyB0aGUgcmFkaW9cblx0XHRcdFx0dmFyIGRvbVJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFkaW9cIik7XG5cdFx0XHRcdGRvbVJhZGlvLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJnaWZ0QW1vdW50Rml4ZWRcIik7XG5cdFx0XHRcdGRvbVJhZGlvLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHRoaXNBbW91bnQuYW1vdW50KTtcblx0XHRcdFx0aWYgKG9wdGlvbnMuaWQpIHtcblx0XHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBvcHRpb25zLmlkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkb21CdXR0b24uYXBwZW5kQ2hpbGQoZG9tUmFkaW8pO1xuXG5cdFx0XHRcdC8vIHRoZSBsYWJlbFxuXHRcdFx0XHR2YXIgZG9tTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cdFx0XHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRcdFx0ZG9tTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIG9wdGlvbnMuaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRvbUJ1dHRvbi5hcHBlbmRDaGlsZChkb21MYWJlbCk7XG5cblx0XHRcdFx0Ly8gbGFiZWwgY3VycmVuY3kgc3ltYm9sXG5cdFx0XHRcdHZhciBkb21TeW1ib2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdFx0anEoZG9tU3ltYm9sKS5hZGRDbGFzcyhcImN1cnJlbmN5U3ltYm9sXCIpO1xuXHRcdFx0XHRkb21MYWJlbC5hcHBlbmRDaGlsZChkb21TeW1ib2wpO1xuXG5cdFx0XHRcdC8vIGxhYmVsIGFtb3VudCB2YWx1ZVxuXHRcdFx0XHR2YXIgZG9tQW1vdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cdFx0XHRcdGpxKGRvbUFtb3VudCkuYWRkQ2xhc3MoXCJkaXNwbGF5QW1vdW50XCIpO1xuXHRcdFx0XHRkb21BbW91bnQuaW5uZXJIVE1MID0gdGhpc0Ftb3VudC5kaXNwbGF5VGV4dCB8fCBcIlVua25vd25cIjtcblx0XHRcdFx0ZG9tTGFiZWwuYXBwZW5kQ2hpbGQoZG9tQW1vdW50KTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGJ1aWxkaW5nIHRoZSBidXR0b24gZm9yIGZpeGVkIGFtb3VudDpcIiwgaW5wdXQsIGVycik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZG9tQnV0dG9uO1xuXHRcdH1cblxuXHRcdC8qIHJlbW92ZSBhbGwgYnV0IGRpZ2l0cy9kb3QgYmVmb3JlIGNvbnZlcnRpbmcgdG8gZmxvYXQgYW5kIHJvdW5kaW5nIHRvIDIgZGlnaXRzICovXG5cdFx0ZnVuY3Rpb24gY2xlYW5DdXJyZW5jeShpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKFwiY2xlYW5DdXJyZW5jeSgpIGdpdmVuIGVtcHR5IGlucHV0XCIpO1xuXHRcdFx0XHR2YXIgaW5wdXQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdFx0aW5wdXQgPSBcIlwiICsgaW5wdXQ7XG5cdFx0XHR2YXIgcmF3Q3VycmVuY3kgPSBwYXJzZUZsb2F0KGlucHV0LnJlcGxhY2UoL1teMC05fFxcLl0vZywgXCJcIikpO1xuXHRcdFx0aWYgKGlzTmFOKHJhd0N1cnJlbmN5KSkge1xuXHRcdFx0XHRyZXR1cm4gMC4wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE1hdGgucm91bmQocmF3Q3VycmVuY3kgKiAxMDApIC8gMTAwO1xuXHRcdH1cblxuXHRcdC8qIHJlbW92ZSBhbGwgY2hhcnMgYnV0IGRpZ2l0cy9kb3QgYmVmb3JlIGNvbnZlcnQgdG8gZmxvYXQgKi9cblx0XHRmdW5jdGlvbiBmb3JtYXREaXNwbGF5R2lmdChpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBpbnB1dCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0XHRpbnB1dCA9IFwiXCIgKyBpbnB1dDtcblx0XHRcdHZhciBhbW91bnQgPSBjbGVhbkN1cnJlbmN5KGlucHV0KTtcblx0XHRcdGFtb3VudCA9IGFtb3VudC50b0ZpeGVkKDIpO1xuXHRcdFx0YW1vdW50ID0gYW1vdW50LnJlcGxhY2UoL1xcLjAwJC9nLCBcIlwiKTtcblx0XHRcdHJldHVybiBhbW91bnQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDdXJyZW5jeVNlbGVjdCgpIHtcblx0XHRcdHZhciBmaWx0ZXJMaXN0ID0gdGhpc1dpZGdldC5vcHRpb25zLmZpbHRlckxpc3RDdXJyZW5jeTtcblx0XHRcdHZhciBkZWZhdWx0Q3VycmVuY3kgPVxuXHRcdFx0XHR0eXBlb2YgdGhpc1dpZGdldC5vcHRpb25zLmRlZmF1bHRDdXJyZW5jeSA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdFx0PyB0aGlzV2lkZ2V0Lm9wdGlvbnMuZGVmYXVsdEN1cnJlbmN5XG5cdFx0XHRcdFx0OiB0aGlzV2lkZ2V0LmRlZmF1bHRzLmN1cnJlbmN5Q29kZTtcblxuXHRcdFx0Ly8gVE9ETyAtIG1ha2UgYWN0aW9uIGxpc3QgZnJvbSB0aGUgZmlsdGVyXG5cblx0XHRcdHZhciBpdGVtc1Zpc2libGUgPSAwO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIXdpbmRvdy5td2RzcGFjZS52YWxpZEN1cnJlbmN5TGlzdCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkxpc3Qgb2YgdmFsaWQgY3VycmVuY2llcyBub3QgZm91bmRcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGpxQ3VycmVuY3lTZWxlY3QubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSBjdXJyZW5jeSBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGRvbVRoaXNPcHRpb24sIHRoaXNDdXJyZW5jeSwgb2tUb0J1aWxkO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93Lm13ZHNwYWNlLnZhbGlkQ3VycmVuY3lMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b2tUb0J1aWxkID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzQ3VycmVuY3kgPSB3aW5kb3cubXdkc3BhY2UudmFsaWRDdXJyZW5jeUxpc3RbaV07XG5cdFx0XHRcdFx0aWYgKGZpbHRlckxpc3QpIHtcblx0XHRcdFx0XHRcdG9rVG9CdWlsZCA9IHR5cGVvZiBmaWx0ZXJMaXN0W3RoaXNDdXJyZW5jeS5jb2RlXSA9PSBcIm9iamVjdFwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob2tUb0J1aWxkKSB7XG5cdFx0XHRcdFx0XHRkb21UaGlzT3B0aW9uID0gYnVpbGRDdXJyZW5jeU9wdGlvbih0aGlzQ3VycmVuY3kpO1xuXHRcdFx0XHRcdFx0aWYgKGRvbVRoaXNPcHRpb24pIHtcblx0XHRcdFx0XHRcdFx0anFDdXJyZW5jeVNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cdFx0XHRcdFx0XHRcdGl0ZW1zVmlzaWJsZSsrO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBhZGQgY3VycmVuY3k6XCIsIHRoaXNDdXJyZW5jeSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0anFDdXJyZW5jeVNlbGVjdC52YWwoZGVmYXVsdEN1cnJlbmN5KS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0XHRpZiAoaXRlbXNWaXNpYmxlID09IDEpIHtcblx0XHRcdFx0XHRqcUN1cnJlbmN5U2VsZWN0LmhpZGUoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqcUN1cnJlbmN5U2VsZWN0LnNob3coKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBjdXJyZW5jeSBzZWxlY3QgZHJvcGRvd25cIiwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZEN1cnJlbmN5T3B0aW9uKGN1cnJlbmN5KSB7XG5cdFx0XHR2YXIgZG9tT3B0aW9uID0gbnVsbDtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmIChjdXJyZW5jeS5jb2RlKSB7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRcdFx0XHRkb21PcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgY3VycmVuY3kuY29kZSk7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IGN1cnJlbmN5LmNvZGUgKyBcIiBcIiArIChjdXJyZW5jeS5uYW1lIHx8IFwiXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIG9wdGlvbiBlbGVtZW50IGZvciBjdXJyZW5jeTpcIiwgY3VycmVuY3kpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbU9wdGlvbjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZFBheU1ldGhvZFNlbGVjdCgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghd2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkxpc3Qgb2YgdmFsaWQgcGF5bWVudCBtZXRob2RzIG5vdCBmb3VuZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoanFQYXlNZXRob2RTZWxlY3QubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSBwYXltZW50IG1ldGhvZCBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGRvbVRoaXNPcHRpb24sIHRoaXNQYXlNZXRob2QsIG9rVG9CdWlsZDtcblxuXHRcdFx0XHR2YXIgZGVmYXVsdENvZGUgPSBudWxsO1xuXHRcdFx0XHR2YXIgaXRlbUNvdW50ID0gMDtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5td2RzcGFjZS52YWxpZFBheU1ldGhvZExpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzUGF5TWV0aG9kID0gd2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdFtpXTtcblx0XHRcdFx0XHRva1RvQnVpbGQgPSB0cnVlO1xuXHRcdFx0XHRcdGlmICh0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdFBheU1ldGhvZCkge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHR0aGlzV2lkZ2V0Lm9wdGlvbnMuZmlsdGVyTGlzdFBheU1ldGhvZC5pbmRleE9mKHRoaXNQYXlNZXRob2QuY29kZSkgPFxuXHRcdFx0XHRcdFx0XHQwXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0b2tUb0J1aWxkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChva1RvQnVpbGQpIHtcblx0XHRcdFx0XHRcdGRvbVRoaXNPcHRpb24gPSBidWlsZFBheU1ldGhvZE9wdGlvbihcblx0XHRcdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdFtpXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGlmIChkb21UaGlzT3B0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdGpxUGF5TWV0aG9kU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0XHRcdFx0aXRlbUNvdW50Kys7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJVbmFibGUgdG8gYWRkIHBheW1lbnQgbWV0aG9kOlwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnZhbGlkUGF5TWV0aG9kTGlzdFtpXVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5kZWZhdWx0UGF5TWV0aG9kID09PSB0aGlzUGF5TWV0aG9kLmNvZGUgfHxcblx0XHRcdFx0XHRcdFx0IWRlZmF1bHRDb2RlXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdENvZGUgPSB0aGlzUGF5TWV0aG9kLmNvZGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0anFQYXlNZXRob2RTZWxlY3QudmFsKGRlZmF1bHRDb2RlKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0XHQvLyBoaWRlIHRoZSBzZWxlY3RvciB3aGVuIG9ubHkgb25lIHZhbHVlXG5cdFx0XHRcdGlmIChpdGVtQ291bnQgPT09IDEpIHtcblx0XHRcdFx0XHRqcVBheU1ldGhvZFNlbGVjdC5jbG9zZXN0KFwiZGl2LmlucHV0R3JvdXBcIikuaGlkZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGpxUGF5TWV0aG9kU2VsZWN0LmNsb3Nlc3QoXCJkaXYuaW5wdXRHcm91cFwiKS5zaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgcGF5bWVudCBtZXRob2Qgc2VsZWN0IGRyb3Bkb3duXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRQYXlNZXRob2RPcHRpb24obWV0aG9kKSB7XG5cdFx0XHR2YXIgZG9tT3B0aW9uID0gbnVsbDtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmIChtZXRob2QuY29kZSkge1xuXHRcdFx0XHRcdGRvbU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIG1ldGhvZC5jb2RlKTtcblx0XHRcdFx0XHRkb21PcHRpb24uc2V0QXR0cmlidXRlKFwiZGF0YS1sYWJlbC1pZFwiLCBcImdpZnQucGF5TWV0aG9kLlwiICsgbWV0aG9kLmNvZGUpO1xuXHRcdFx0XHRcdGRvbU9wdGlvbi5pbm5lclRleHQgPSBtZXRob2QuZGVzY3JpcHRpb24gfHwgXCJVbmtub3duXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgb3B0aW9uIGVsZW1lbnQgZm9yIG1ldGhvZDpcIiwgbWV0aG9kKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb21PcHRpb247XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRGcmVxdWVuY3lCdXR0b25zKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCF3aW5kb3cubXdkc3BhY2UudmFsaWRGcmVxdWVuY3lMaXN0KSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsaXN0IG9mIGZyZXF1ZW5jaWVzIGdpdmVuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBqcUZyZXF1ZW5jeUNvbnRhaW5lciA9IGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuZ2lmdEZyZXF1ZW5jeUNvbnRhaW5lclwiKTtcblx0XHRcdFx0aWYgKGpxRnJlcXVlbmN5Q29udGFpbmVyLmxlbmd0aCAhPT0gMSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBpZGVudGlmeSB0aGUgZnJlcXVlbmN5IGNvbnRhaW5lclwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyByZW1vdmUgYW55IGV4aXN0aW5nIG9wdGlvbnNcblx0XHRcdFx0anFGcmVxdWVuY3lDb250YWluZXIuZmluZChcImRpdi5mYW5jeVJhZGlvQnV0dG9uXCIpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdHZhciBkb21UaGlzQnV0dG9uLCB0aGlzRnJlcXVlbmN5LCBva1RvQnVpbGQ7XG5cblx0XHRcdFx0dmFyIGZpbmFsRnJlcXVlbmN5TGlzdCA9IFtdO1xuXHRcdFx0XHR2YXIgZGVmYXVsdEluZGV4ID0gMDtcblx0XHRcdFx0dmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cubXdkc3BhY2UudmFsaWRGcmVxdWVuY3lMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpc0ZyZXF1ZW5jeSA9IHdpbmRvdy5td2RzcGFjZS52YWxpZEZyZXF1ZW5jeUxpc3RbaV07XG5cdFx0XHRcdFx0b2tUb0J1aWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAodGhpc1dpZGdldC5vcHRpb25zLmZpbHRlckxpc3RGcmVxdWVuY3kpIHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmZpbHRlckxpc3RGcmVxdWVuY3kuaW5kZXhPZih0aGlzRnJlcXVlbmN5LmNvZGUpIDxcblx0XHRcdFx0XHRcdFx0MFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdG9rVG9CdWlsZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob2tUb0J1aWxkKSB7XG5cdFx0XHRcdFx0XHRkb21UaGlzQnV0dG9uID0gYnVpbGRGcmVxdWVuY3lCdXR0b24odGhpc0ZyZXF1ZW5jeSwge1xuXHRcdFx0XHRcdFx0XHRpZDogd2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLm1ha2VVbmlxdWVJZChcImZyZXF1ZW5jeS1cIiArIGkpLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRpZiAoZG9tVGhpc0J1dHRvbikge1xuXHRcdFx0XHRcdFx0XHRqcUZyZXF1ZW5jeUNvbnRhaW5lci5hcHBlbmQoZG9tVGhpc0J1dHRvbik7XG5cdFx0XHRcdFx0XHRcdGZpbmFsRnJlcXVlbmN5TGlzdC5wdXNoKHRoaXNGcmVxdWVuY3kuY29kZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGFkZCBmcmVxdWVuY3k6XCIsIHRoaXNGcmVxdWVuY3kpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHRoaXNXaWRnZXQub3B0aW9ucy5kZWZhdWx0RnJlcXVlbmN5ID09PSB0aGlzRnJlcXVlbmN5LmNvZGUpIHtcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdEluZGV4ID0gY3VycmVudEluZGV4O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y3VycmVudEluZGV4Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGpxRnJlcXVlbmN5Q29udGFpbmVyXG5cdFx0XHRcdFx0LmZpbmQoJ2lucHV0W25hbWU9XCJnaWZ0RnJlcXVlbmN5XCJdJylcblx0XHRcdFx0XHQuZXEoZGVmYXVsdEluZGV4KVxuXHRcdFx0XHRcdC5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKVxuXHRcdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0XHRzZXRGcmVxdWVuY3lCdXR0b25WaXNpYmlsaXR5KGZpbmFsRnJlcXVlbmN5TGlzdCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBmcmVxdWVuY3kgYnV0dG9uc1wiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkRnJlcXVlbmN5QnV0dG9uKGZyZXF1ZW5jeSwgb3B0aW9ucykge1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdG9wdGlvbnMgPSB7fTtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFwiYnVpbGRGcmVxdWVuY3lCdXR0b24oKTogaWdub3JpbmcgaW52YWxpZCBvcHRpb24gb2JqZWN0XCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHZhciBkb21CdXR0b24gPSBudWxsO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGZyZXF1ZW5jeS5jb2RlKSB7XG5cdFx0XHRcdFx0Ly8gdGhlIGNvbnRhaW5lciBkaXZcblx0XHRcdFx0XHRkb21CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRcdGpxKGRvbUJ1dHRvbikuYWRkQ2xhc3MoXCJmYW5jeVJhZGlvQnV0dG9uXCIpO1xuXG5cdFx0XHRcdFx0Ly8gdGhlIHJhZGlvXG5cdFx0XHRcdFx0dmFyIGRvbVJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0XHRcdGpxKGRvbVJhZGlvKS5hZGRDbGFzcyhcImNoYW5nZVdhdGNoXCIpO1xuXHRcdFx0XHRcdGRvbVJhZGlvLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYWRpb1wiKTtcblx0XHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiZ2lmdEZyZXF1ZW5jeVwiKTtcblx0XHRcdFx0XHRkb21SYWRpby5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBmcmVxdWVuY3kuY29kZSk7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuaWQpIHtcblx0XHRcdFx0XHRcdGRvbVJhZGlvLnNldEF0dHJpYnV0ZShcImlkXCIsIG9wdGlvbnMuaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb21CdXR0b24uYXBwZW5kQ2hpbGQoZG9tUmFkaW8pO1xuXG5cdFx0XHRcdFx0Ly8gdGhlIGxhYmVsXG5cdFx0XHRcdFx0dmFyIGRvbUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG5cdFx0XHRcdFx0ZG9tTGFiZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1sYWJlbC1pZFwiLCBcImdpZnQuZnJlcXVlbmN5LlwiICsgZnJlcXVlbmN5LmNvZGUpO1xuXHRcdFx0XHRcdGRvbUxhYmVsLmlubmVySFRNTCA9IGZyZXF1ZW5jeS5uYW1lIHx8IFwiVW5rbm93blwiO1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRcdFx0XHRkb21MYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgb3B0aW9ucy5pZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRvbUJ1dHRvbi5hcHBlbmRDaGlsZChkb21MYWJlbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGJ1aWxkaW5nIHRoZSBidXR0b24gZm9yIGZyZXF1ZW5jeTpcIiwgZnJlcXVlbmN5LCBlcnIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbUJ1dHRvbjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwcmVwYXJlUmVnaW9uSW5wdXQoKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XCJwcmVwYXJlUmVnaW9uSW5wdXQoKTogaWdub3JpbmcgaW52YWxpZCBvcHRpb24gb2JqZWN0XCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIHVzZXJDb3VudHJ5ID0ganFDb250YWluZXIuZmluZCgnc2VsZWN0W25hbWU9XCJkb25vckNvdW50cnlcIl0nKS52YWwoKTtcblx0XHRcdFx0dmFyIHRoaXNDb3VudHJ5O1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5td2RzcGFjZS52YWxpZENvdW50cnlMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpc0NvdW50cnkgPSB3aW5kb3cubXdkc3BhY2UudmFsaWRDb3VudHJ5TGlzdFtpXTtcblx0XHRcdFx0XHRpZiAodXNlckNvdW50cnkgPT0gdGhpc0NvdW50cnkuY29kZSB8fCB1c2VyQ291bnRyeSA9PSB0aGlzQ291bnRyeS5uYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpc0NvdW50cnkucmVnaW9ucyAmJiBidWlsZFJlZ2lvblNlbGVjdCh0aGlzQ291bnRyeS5yZWdpb25zKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gcHJlcGFyZSB0aGUgcmVnaW9uIGlucHV0IG1ldGhvZFwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdFx0c2hvd1JlZ2lvbklucHV0KCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2hvd1JlZ2lvbklucHV0KCkge1xuXHRcdFx0anFSZWdpb25TZWxlY3QuaGlkZSgpO1xuXHRcdFx0anFSZWdpb25JbnB1dFxuXHRcdFx0XHQudmFsKFwiXCIpXG5cdFx0XHRcdC5zaG93KClcblx0XHRcdFx0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRSZWdpb25TZWxlY3QocmVnaW9ucykge1xuXHRcdFx0anFSZWdpb25JbnB1dC5oaWRlKCk7XG5cdFx0XHRqcVJlZ2lvblNlbGVjdFxuXHRcdFx0XHQudmFsKFwiXCIpXG5cdFx0XHRcdC5zaG93KClcblx0XHRcdFx0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cblx0XHRcdGlmICh0eXBlb2YgcmVnaW9ucyA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJidWlsZFJlZ2lvblNlbGVjdCgpOiBubyByZWdpb25zIG9iamVjdFwiLCByZWdpb25zKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiByZWdpb25zICE9IFwib2JqZWN0XCIgfHwgcmVnaW9ucy5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJidWlsZFJlZ2lvblNlbGVjdCgpOiBpbnZhbGlkIHJlZ2lvbnMgb2JqZWN0XCIsIHJlZ2lvbnMpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmIChqcVJlZ2lvblNlbGVjdC5sZW5ndGggIT09IDEpIHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSByZWdpb24gc2VsZWN0IGRyb3Bkb3duXCIpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgZG9tVGhpc09wdGlvbiwgdGhpc1JlZ2lvbjtcblxuXHRcdFx0XHR2YXIgcmVnaW9uQ3RyID0gMDtcblxuXHRcdFx0XHRqcVJlZ2lvblNlbGVjdC5lbXB0eSgpO1xuXHRcdFx0XHRkb21UaGlzT3B0aW9uID0gYnVpbGRSZWdpb25PcHRpb24oXCJTdGF0ZS9SZWdpb24uLi5cIiwge1xuXHRcdFx0XHRcdFwiZGF0YS1sYWJlbC1pZFwiOiBcImRvbm9yLnJlZ2lvblBsYWNlaG9sZGVyXCIsXG5cdFx0XHRcdFx0dmFsdWU6IFwiXCIsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRqcVJlZ2lvblNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWdpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpc1JlZ2lvbiA9IHJlZ2lvbnNbaV07XG5cdFx0XHRcdFx0ZG9tVGhpc09wdGlvbiA9IGJ1aWxkUmVnaW9uT3B0aW9uKHRoaXNSZWdpb24ubmFtZSk7XG5cdFx0XHRcdFx0aWYgKGRvbVRoaXNPcHRpb24pIHtcblx0XHRcdFx0XHRcdGpxUmVnaW9uU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0XHRcdHJlZ2lvbkN0cisrO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBhZGQgcmVnaW9uOlwiLCB0aGlzUmVnaW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJlZ2lvbkN0ciA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSByZWdpb24gc2VsZWN0IGRyb3Bkb3duXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRSZWdpb25PcHRpb24ocmVnaW9uTmFtZSwgYXR0cmlidXRlcykge1xuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcImJ1aWxkUmVnaW9uT3B0aW9uKCkgaWdub3JpbmcgaW52YWxpZCBhdHRyaWJ1dGVzIG9iamVjdFwiLFxuXHRcdFx0XHRcdFx0YXR0cmlidXRlc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgcmVnaW9uTmFtZSA9PSBcInN0cmluZ1wiICYmIHJlZ2lvbk5hbWUudHJpbSgpKSB7XG5cdFx0XHRcdFx0dmFyIGRvbU9wdGlvbiA9IG51bGw7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRcdFx0XHRkb21PcHRpb24uaW5uZXJUZXh0ID0gcmVnaW9uTmFtZTtcblx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdFx0ZG9tT3B0aW9uLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBkb21PcHRpb247XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgb3B0aW9uIGVsZW1lbnQgZm9yIHJlZ2lvbjpcIiwgcmVnaW9uKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkQ291bnRyeVNlbGVjdChvcHRpb25zKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XCJidWlsZENvdW50cnlTZWxlY3QoKTogaWdub3JpbmcgaW52YWxpZCBvcHRpb24gb2JqZWN0XCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHZhciBkZWZhdWx0Q291bnRyeSA9XG5cdFx0XHRcdHR5cGVvZiBvcHRpb25zLmRlZmF1bHQgPT0gXCJzdHJpbmdcIiA/IG9wdGlvbnMuZGVmYXVsdCA6IFwiVW5pdGVkIFN0YXRlc1wiO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCF3aW5kb3cubXdkc3BhY2UudmFsaWRDb3VudHJ5TGlzdCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkxpc3Qgb2YgdmFsaWQgY291bnRyaWVzIG5vdCBmb3VuZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgZG9tQ291bnRyeVNlbGVjdCA9IGpxQ29udGFpbmVyLmZpbmQoJ3NlbGVjdFtuYW1lPVwiZG9ub3JDb3VudHJ5XCJdJyk7XG5cdFx0XHRcdGRvbUNvdW50cnlTZWxlY3Qub24oXCJjaGFuZ2VcIiwgcHJlcGFyZVJlZ2lvbklucHV0KTtcblx0XHRcdFx0aWYgKGRvbUNvdW50cnlTZWxlY3QubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSBjb3VudHJ5IHNlbGVjdCBkcm9wZG93blwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgZG9tVGhpc09wdGlvbiwgdGhpc0NvdW50cnksIG9rVG9CdWlsZDtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5td2RzcGFjZS52YWxpZENvdW50cnlMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b2tUb0J1aWxkID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzQ291bnRyeSA9IHdpbmRvdy5td2RzcGFjZS52YWxpZENvdW50cnlMaXN0W2ldO1xuXHRcdFx0XHRcdGlmIChva1RvQnVpbGQpIHtcblx0XHRcdFx0XHRcdGRvbVRoaXNPcHRpb24gPSBidWlsZENvdW50cnlPcHRpb24odGhpc0NvdW50cnkpO1xuXHRcdFx0XHRcdFx0aWYgKGRvbVRoaXNPcHRpb24pIHtcblx0XHRcdFx0XHRcdFx0ZG9tQ291bnRyeVNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGFkZCBjb3VudHJ5OlwiLCB0aGlzQ291bnRyeSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGRvbUNvdW50cnlTZWxlY3QudmFsKGRlZmF1bHRDb3VudHJ5KS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBjb3VudHJ5IHNlbGVjdCBkcm9wZG93blwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkQ291bnRyeU9wdGlvbihjb3VudHJ5LCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlcyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFwiYnVpbGRDb3VudHJ5T3B0aW9uKCkgaWdub3JpbmcgaW52YWxpZCBhdHRyaWJ1dGVzIG9iamVjdFwiLFxuXHRcdFx0XHRcdFx0YXR0cmlidXRlc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdHZhciBkb21PcHRpb24gPSBudWxsO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGNvdW50cnkuY29kZSkge1xuXHRcdFx0XHRcdGRvbU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IGNvdW50cnkubmFtZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBvcHRpb24gZWxlbWVudCBmb3IgY291bnRyeTpcIiwgY291bnRyeSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRkb21PcHRpb24uc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb21PcHRpb247XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDYXJkRXhwaXJlTW9udGhTZWxlY3QoKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgZG9tQ2FyZEV4cGlyZU1vbnRoU2VsZWN0ID0ganFDb250YWluZXIuZmluZChcblx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJwYXlDYXJkRXhwaXJlTW9udGhcIl0nXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChkb21DYXJkRXhwaXJlTW9udGhTZWxlY3QubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGlkZW50aWZ5IHRoZSBjYXJkIGV4cGlyZSBtb250aCBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gYWRkIHBsYWNlaG9sZGVyIHZhbHVlXG5cdFx0XHRcdHZhciBkb21UaGlzT3B0aW9uID0gYnVpbGRDYXJkRXhwaXJlTW9udGhPcHRpb24oXCJNb250aFwiLCB7XG5cdFx0XHRcdFx0dmFsdWU6IFwiXCIsXG5cdFx0XHRcdFx0XCJkYXRhLWxhYmVsLWlkXCI6IFwiY2FyZEluZm8uY2FyZEV4cGlyZU1vbnRoUGxhY2Vob2xkZXJcIixcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGRvbUNhcmRFeHBpcmVNb250aFNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cdFx0XHRcdC8vIGFkZCBtb250aHNcblx0XHRcdFx0Zm9yICh2YXIgZXhwaXJlTW9udGggPSAxOyBleHBpcmVNb250aCA8PSAxMjsgZXhwaXJlTW9udGgrKykge1xuXHRcdFx0XHRcdGRvbVRoaXNPcHRpb24gPSBidWlsZENhcmRFeHBpcmVNb250aE9wdGlvbihleHBpcmVNb250aCk7XG5cdFx0XHRcdFx0aWYgKGRvbVRoaXNPcHRpb24pIHtcblx0XHRcdFx0XHRcdGRvbUNhcmRFeHBpcmVNb250aFNlbGVjdC5hcHBlbmQoZG9tVGhpc09wdGlvbik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGFkZCBjYXJkIGV4cGlyZSBtb250aDpcIiwgZXhwaXJlTW9udGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGJ1aWxkIHRoZSBjYXJkIGV4cGlyZSBtb250aCBzZWxlY3QgZHJvcGRvd25cIiwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZENhcmRFeHBpcmVNb250aE9wdGlvbihtb250aCwgYXR0cmlidXRlcykge1xuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcImJ1aWxkUmVnaW9uT3B0aW9uKCkgaWdub3JpbmcgaW52YWxpZCBhdHRyaWJ1dGVzIG9iamVjdFwiLFxuXHRcdFx0XHRcdFx0YXR0cmlidXRlc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGRvbU9wdGlvbiA9IG51bGw7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAodHlwZW9mIG1vbnRoICE9IFwibnVtYmVyXCIgJiYgdHlwZW9mIG1vbnRoICE9IFwic3RyaW5nXCIgJiYgIW1vbnRoKSB7XG5cdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBtb250aCBnaXZlbjpcIiwgbW9udGgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcEludCA9IHBhcnNlSW50KG1vbnRoKTtcblx0XHRcdFx0XHRcdGlmICghaXNOYU4odGVtcEludCkgJiYgdGVtcEludCA+PSAwICYmIHRlbXBJbnQgPCAxMCkge1xuXHRcdFx0XHRcdFx0XHRtb250aCA9IFwiMFwiICsgdGVtcEludDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHt9XG5cblx0XHRcdFx0XHRkb21PcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0XHRkb21PcHRpb24uc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IG1vbnRoO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIG9wdGlvbiBlbGVtZW50IGZvciBtb250aDpcIiwgbW9udGgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbU9wdGlvbjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBidWlsZENhcmRFeHBpcmVZZWFyU2VsZWN0KCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gc2hvdyBvbmx5IGN1cnJlbnQgeWVhciBhbmQgYmV5b25kXG5cdFx0XHRcdHZhciByZWNlbnREYXRlID0gbmV3IERhdGUoKTtcblx0XHRcdFx0cmVjZW50RGF0ZS5zZXREYXRlKHJlY2VudERhdGUuZ2V0RGF0ZSgpIC0gNyk7IC8vIHNob3cgbGFzdCB5ZWFyIGZvciA3IGRheXNcblx0XHRcdFx0dmFyIHN0YXJ0WWVhciA9IHJlY2VudERhdGUuZ2V0RnVsbFllYXIoKTtcblx0XHRcdFx0dmFyIHllYXJzVG9TaG93ID0gMjA7XG5cblx0XHRcdFx0dmFyIGRvbUNhcmRFeHBpcmVZZWFyU2VsZWN0ID0ganFDb250YWluZXIuZmluZChcblx0XHRcdFx0XHQnc2VsZWN0W25hbWU9XCJwYXlDYXJkRXhwaXJlWWVhclwiXSdcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGRvbUNhcmRFeHBpcmVZZWFyU2VsZWN0Lmxlbmd0aCAhPT0gMSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBpZGVudGlmeSB0aGUgY2FyZCBleHBpcmUgeWVhciBzZWxlY3QgZHJvcGRvd25cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gYWRkIHBsYWNlaG9sZGVyIHZhbHVlXG5cdFx0XHRcdHZhciBkb21UaGlzT3B0aW9uID0gYnVpbGRDYXJkRXhwaXJlWWVhck9wdGlvbihcIlllYXJcIiwge1xuXHRcdFx0XHRcdHZhbHVlOiBcIlwiLFxuXHRcdFx0XHRcdFwiZGF0YS1sYWJlbC1pZFwiOiBcImNhcmRJbmZvLmNhcmRFeHBpcmVZZWFyUGxhY2Vob2xkZXJcIixcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGRvbUNhcmRFeHBpcmVZZWFyU2VsZWN0LmFwcGVuZChkb21UaGlzT3B0aW9uKTtcblx0XHRcdFx0Ly8gYWRkIHllYXJzXG5cdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0dmFyIGV4cGlyZVllYXIgPSBzdGFydFllYXI7XG5cdFx0XHRcdFx0ZXhwaXJlWWVhciA8IHN0YXJ0WWVhciArIHllYXJzVG9TaG93O1xuXHRcdFx0XHRcdGV4cGlyZVllYXIrK1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRkb21UaGlzT3B0aW9uID0gYnVpbGRDYXJkRXhwaXJlWWVhck9wdGlvbihleHBpcmVZZWFyKTtcblx0XHRcdFx0XHRpZiAoZG9tVGhpc09wdGlvbikge1xuXHRcdFx0XHRcdFx0ZG9tQ2FyZEV4cGlyZVllYXJTZWxlY3QuYXBwZW5kKGRvbVRoaXNPcHRpb24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBhZGQgY2FyZCBleHBpcmUgeWVhcjpcIiwgZXhwaXJlWWVhcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gYnVpbGQgdGhlIGNhcmQgZXhwaXJlIHllYXIgc2VsZWN0IGRyb3Bkb3duXCIsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDYXJkRXhwaXJlWWVhck9wdGlvbih5ZWFyLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlcyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFwiYnVpbGRSZWdpb25PcHRpb24oKSBpZ25vcmluZyBpbnZhbGlkIGF0dHJpYnV0ZXMgb2JqZWN0XCIsXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0YXR0cmlidXRlcyA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZG9tT3B0aW9uID0gbnVsbDtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgeWVhciAhPSBcIm51bWJlclwiICYmIHR5cGVvZiB5ZWFyICE9IFwic3RyaW5nXCIgJiYgIXllYXIpIHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHllYXIgZ2l2ZW46XCIsIHllYXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0geWVhcjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkb21PcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0XHRkb21PcHRpb24uc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9tT3B0aW9uLmlubmVyVGV4dCA9IHllYXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBidWlsZCB0aGUgb3B0aW9uIGVsZW1lbnQgZm9yIHllYXI6XCIsIHllYXIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbU9wdGlvbjtcblx0XHR9XG5cblx0XHRhc3luYyBmdW5jdGlvbiBzZXR1cENvbXBhbnlNYXRjaFNlbGVjdCgpIHtcblx0XHRcdGlmICh0aGlzV2lkZ2V0LnByb21pc2VzLnNwcmVlZGx5SWZyYW1lU2NyaXB0KSB7XG5cdFx0XHRcdGF3YWl0IHRoaXNXaWRnZXQucHJvbWlzZXMuc3ByZWVkbHlJZnJhbWVTY3JpcHQ7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdGhlTGFiZWwgPSBcIlNlYXJjaCBieSBjb21wYW55IG5hbWVcIjtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICh0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuZG9ub3IubWF0Y2hDb21wYW55UGxhY2Vob2xkZXIpIHtcblx0XHRcdFx0XHR0aGVMYWJlbCA9XG5cdFx0XHRcdFx0XHR0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuZG9ub3IubWF0Y2hDb21wYW55UGxhY2Vob2xkZXIgfHwgdGhlTGFiZWw7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge31cblxuXHRcdFx0dmFyIGpxTWF0Y2hTZWxlY3QgPSBqcSgnc2VsZWN0W25hbWU9XCJkb25vck1hdGNoQ29tcGFueVwiXScpO1xuXG5cdFx0XHRpZiAodHlwZW9mIGpxTWF0Y2hTZWxlY3Quc2VsZWN0MiAhPSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLndhcm4oXCJTS0lQUElORyBDT01QQU5ZIE1BVENIIFNNQVJUIFNFTEVDVE9SXCIpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGpxTWF0Y2hTZWxlY3Quc2VsZWN0Mih7XG5cdFx0XHRcdG1pbmltdW1JbnB1dExlbmd0aDogMyxcblx0XHRcdFx0ZGVsYXk6IDQwMCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IHRoZUxhYmVsLFxuXHRcdFx0XHR3aWR0aDogXCIxMDAlXCIsXG5cdFx0XHRcdGFqYXg6IHtcblx0XHRcdFx0XHR1cmw6IHRoaXNXaWRnZXQudXJscy5jb21wYW55TWF0Y2hBcGksXG5cdFx0XHRcdFx0ZGF0YTogZnVuY3Rpb24ocGFyYW1zKSB7XG5cdFx0XHRcdFx0XHR2YXIgcXVlcnkgPSB7XG5cdFx0XHRcdFx0XHRcdHE6IHBhcmFtcy50ZXJtLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJldHVybiBxdWVyeTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmV0dXJuT2JqZWN0ID0ge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzOiBbXSxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiICYmIGRhdGEubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChkYXRhW2ldLm5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybk9iamVjdC5yZXN1bHRzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZDogZGF0YVtpXS5uYW1lLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0ZXh0OiBkYXRhW2ldLm5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiByZXR1cm5PYmplY3Q7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldHVwU3ByZWVkbHkoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcblx0XHRcdFx0YXdhaXQgdGhpc1dpZGdldC5wcm9taXNlcy5zcHJlZWRseUlmcmFtZVNjcmlwdDtcblxuXHRcdFx0XHRTcHJlZWRseS5vbihcInJlYWR5XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNldFNwcmVlZGx5TGFiZWxzKCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRTcHJlZWRseS5vbihcInBheW1lbnRNZXRob2RcIiwgZnVuY3Rpb24odG9rZW4sIHJlc3VsdCkge1xuXHRcdFx0XHRcdHdpbmRvdy5td2RzcGFjZS50cmFuc2FjdGlvblNlbmREYXRhLnBheW1lbnRUb2tlbiA9IG51bGw7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0LmVycm9ycyAmJiByZXN1bHQuZXJyb3JzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiU1BSRUVETFkgUkVQT1JUUyBwYXltZW50TWV0aG9kIEVSUk9SUzpcIik7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5lcnJvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gcmVzdWx0LmVycm9yc1tpXTtcblx0XHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLndhcm4oZXJyb3IpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIG1lc3NhZ2UgPVxuXHRcdFx0XHRcdFx0XHRcIkVycm9yIGR1cmluZyBzZWN1cmUgY2FyZCBpbmZvcm1hdGlvbiB0cmFuc2Zlci4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2UgPVxuXHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5naWZ0LmVycm9yLnRva2VuaXplRXJyb3IgfHwgbWVzc2FnZTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdFx0XHRcdHNob3dTdGVwRmVlZGJhY2soXCJjYXJkSW5mb1wiLCBtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnRyYW5zYWN0aW9uU2VuZERhdGEucGF5bWVudFRva2VuID0gdG9rZW47XG5cdFx0XHRcdFx0XHRzZW5kVHJhbnNhY3Rpb24oKTtcblx0XHRcdFx0XHRcdHNob3dTdGVwRmVlZGJhY2soXCJjYXJkSW5mb1wiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFNwcmVlZGx5Lm9uKFwiZmllbGRFdmVudFwiLCBmdW5jdGlvbihuYW1lLCB0eXBlLCBhY3RpdmVFbCwgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PSBcImlucHV0XCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5td2RzcGFjZS51c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZE51bWJlciA9XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLnZhbGlkTnVtYmVyIHx8IGZhbHNlO1xuXHRcdFx0XHRcdFx0d2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEuaGFzVmFsaWRDYXJkQ3Z2ID1cblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UudmFsaWRDdnYgfHwgZmFsc2U7XG5cdFx0XHRcdFx0XHR3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5wYXlDYXJkVHlwZSA9IHJlc3BvbnNlLmNhcmRUeXBlIHx8IGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKG5hbWUgPT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRcdFx0XHRzZXRDYXJkTnVtYmVyRmVlZGJhY2socmVzcG9uc2UudmFsaWROdW1iZXIsIHJlc3BvbnNlLmNhcmRUeXBlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFNwcmVlZGx5Lm9uKFwiZXJyb3JzXCIsIGZ1bmN0aW9uKGVycm9ycykge1xuXHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKFwiU1BSRUVETFkgUkVQT1JUUyBHRU5FUkFMIEVSUk9SUzpcIik7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBlcnJvciA9IGVycm9yc1tpXTtcblx0XHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIG1lc3NhZ2UgPSBcIlVuZXhwZWN0ZWQgZXJyb3Igd2l0aCBzZWN1cmUgY2FyZCBoYW5kbGVyXCI7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPVxuXHRcdFx0XHRcdFx0XHR0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuZ2lmdC5lcnJvci5nZW5lcmFsVG9rZW5pemVyRXJyb3IgfHxcblx0XHRcdFx0XHRcdFx0bWVzc2FnZTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHt9XG5cdFx0XHRcdFx0c2hvd1N0ZXBGZWVkYmFjayhcImNhcmRJbmZvXCIsIG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgcGF5bWVudFRva2VuQXBpS2V5ID0gdGhpc1dpZGdldC5vcHRpb25zLnBheW1lbnRUb2tlbkFwaUtleTtcblx0XHRcdFx0aWYgKGluVGVzdE1vZGUpIHtcblx0XHRcdFx0XHRwYXltZW50VG9rZW5BcGlLZXkgPSB0aGlzV2lkZ2V0LmRlZmF1bHRzLnRlc3RQYXltZW50VG9rZW5BcGlLZXk7XG5cdFx0XHRcdH1cblx0XHRcdFx0U3ByZWVkbHkuaW5pdChwYXltZW50VG9rZW5BcGlLZXksIHtcblx0XHRcdFx0XHRudW1iZXJFbDogXCJjYXJkTnVtYmVyVGFyZ2V0XCIsXG5cdFx0XHRcdFx0Y3Z2RWw6IFwiY2FyZEN2dlRhcmdldFwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldFNwcmVlZGx5TGFiZWxzKCkge1xuXHRcdFx0U3ByZWVkbHkuc2V0RmllbGRUeXBlKFwibnVtYmVyXCIsIFwidGV4dFwiKTtcblx0XHRcdFNwcmVlZGx5LnNldE51bWJlckZvcm1hdChcInByZXR0eUZvcm1hdFwiKTtcblxuXHRcdFx0Ly8gbWF0Y2ggc3R5bGVzIGZyb20gYW5vdGhlciBzaW1pbGFyIGZpZWxkXG5cdFx0XHR2YXIgaW5wdXRGb250U2l6ZSA9IGpxUGF5TWV0aG9kU2VsZWN0LmNzcyhcImZvbnQtc2l6ZVwiKSB8fCBcIjE2cHhcIjtcblx0XHRcdHZhciBpbnB1dENvbG9yID0ganFQYXlNZXRob2RTZWxlY3QuY3NzKFwiY29sb3JcIikgfHwgXCIjMzMzXCI7XG5cdFx0XHR2YXIgY3NzU3RyaW5nID1cblx0XHRcdFx0XCJwYWRkaW5nOjA7Zm9udC1zaXplOlwiICsgaW5wdXRGb250U2l6ZSArIFwiO2NvbG9yOlwiICsgaW5wdXRDb2xvciArIFwiO1wiO1xuXHRcdFx0U3ByZWVkbHkuc2V0U3R5bGUoXCJudW1iZXJcIiwgY3NzU3RyaW5nKTtcblx0XHRcdFNwcmVlZGx5LnNldFN0eWxlKFwiY3Z2XCIsIGNzc1N0cmluZyk7XG5cblx0XHRcdHZhciBsYWJlbENhcmQgPSBcIkNhcmRcIjtcblx0XHRcdHZhciBsYWJlbEN2diA9IFwiY3Z2XCI7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAodGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlLmNhcmRJbmZvLmNhcmROdW1iZXJQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRcdGxhYmVsQ2FyZCA9IHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5jYXJkSW5mby5jYXJkTnVtYmVyUGxhY2Vob2xkZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycikge31cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICh0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuY2FyZEluZm8uY3Z2UGxhY2Vob2xkZXIpIHtcblx0XHRcdFx0XHRsYWJlbEN2diA9IHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5jYXJkSW5mby5jdnZQbGFjZWhvbGRlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxuXHRcdFx0U3ByZWVkbHkuc2V0UGxhY2Vob2xkZXIoXCJudW1iZXJcIiwgbGFiZWxDYXJkKTtcblx0XHRcdFNwcmVlZGx5LnNldFBsYWNlaG9sZGVyKFwiY3Z2XCIsIGxhYmVsQ3Z2KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXRDYXJkTnVtYmVyRmVlZGJhY2soaXNWYWxpZCwgY2FyZFR5cGUpIHtcblx0XHRcdGlmIChpc1ZhbGlkKSB7XG5cdFx0XHRcdGpxQ2FyZE51bWJlckZlZWRiYWNrXG5cdFx0XHRcdFx0LmZpbmQoXCJzcGFuLmNhcmROdW1iZXJWYWxpZGl0eVwiKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyhcImludmFsaWRcIilcblx0XHRcdFx0XHQuYWRkQ2xhc3MoXCJ2YWxpZFwiKVxuXHRcdFx0XHRcdC5odG1sKCc8aSBjbGFzcz1cImZhIGZhcyBmYS1jaGVjay1jaXJjbGVcIj48L2k+Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqcUNhcmROdW1iZXJGZWVkYmFja1xuXHRcdFx0XHRcdC5maW5kKFwic3Bhbi5jYXJkTnVtYmVyVmFsaWRpdHlcIilcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJ2YWxpZFwiKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyhcImludmFsaWRcIilcblx0XHRcdFx0XHQuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYXMgZmEtdGltZXNcIj48L2k+Jyk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBqcUNhcmRJY29uID0ganFDYXJkTnVtYmVyRmVlZGJhY2suZmluZChcInNwYW4uY2FyZFR5cGVcIik7XG5cdFx0XHRzd2l0Y2ggKGNhcmRUeXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJ2aXNhXCI6XG5cdFx0XHRcdFx0anFDYXJkSWNvbi5odG1sKHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwudmlzYSkuYWRkQ2xhc3MoXCJrbm93blwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm1hc3RlclwiOlxuXHRcdFx0XHRcdGpxQ2FyZEljb24uaHRtbCh0aGlzV2lkZ2V0LnBheU1ldGhvZEljb25IdG1sLm1hc3RlcmNhcmQpLmFkZENsYXNzKFwia25vd25cIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhbWVyaWNhbl9leHByZXNzXCI6XG5cdFx0XHRcdFx0anFDYXJkSWNvbi5odG1sKHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwuYW1leCkuYWRkQ2xhc3MoXCJrbm93blwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRpc2NvdmVyXCI6XG5cdFx0XHRcdFx0anFDYXJkSWNvbi5odG1sKHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwuZGlzY292ZXIpLmFkZENsYXNzKFwia25vd25cIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0anFDYXJkSWNvbi5odG1sKHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwuY2FyZCkucmVtb3ZlQ2xhc3MoXCJrbm93blwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXRPcHRpb25hbFNlY3Rpb25WaXNpYmlsaXR5KCkge1xuXHRcdFx0Ly8gQ09NUEFOWSBNQVRDSFxuXHRcdFx0dmFyIGpxQ29tcGFueU1hdGNoR3JvdXAgPSBqcUNvbnRhaW5lclxuXHRcdFx0XHQuZmluZCgnaW5wdXRbbmFtZT1cImNvbXBhbnlNYXRjaFwiXScpXG5cdFx0XHRcdC5jbG9zZXN0KFwiZGl2LmlucHV0R3JvdXBcIik7XG5cdFx0XHRpZiAodGhpc1dpZGdldC5vcHRpb25zLmluY2x1ZGVDb21wYW55TWF0Y2gpIHtcblx0XHRcdFx0anFDb21wYW55TWF0Y2hHcm91cC5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqcUNvbXBhbnlNYXRjaEdyb3VwLmhpZGUoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRVhUUkEgUEVSQ0VOVFxuXHRcdFx0dmFyIGpxRXh0cmFQZXJjZW50UmFkaW8gPSBqcUNvbnRhaW5lclxuXHRcdFx0XHQuZmluZCgnaW5wdXRbbmFtZT1cImdpZnRFeHRyYVBlcmNlbnRcIl0nKVxuXHRcdFx0XHQuY2xvc2VzdChcImRpdi5pbnB1dEdyb3VwXCIpO1xuXHRcdFx0aWYgKHRoaXNXaWRnZXQub3B0aW9ucy5pbmNsdWRlRXh0cmFQZXJjZW50KSB7XG5cdFx0XHRcdGpxRXh0cmFQZXJjZW50UmFkaW8uc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0anFFeHRyYVBlcmNlbnRSYWRpby5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG9rZW5pemVVc2VyQ2FyZCgpIHtcblx0XHRcdC8vIHRva2VuaXplIG9ubHkgd2hlbiBhbGwgZmllbGRzIGFyZSByZWFkeVxuXHRcdFx0Ly8gd2hlbiBzdWNjZXNzZnVsLCB0aGlzIHdpbGwgcG9wdWxhdGUgdHJhbnNhY3Rpb25TZW5kRGF0YS5wYXltZW50VG9rZW4gZmllbGRcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHR1c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZE51bWJlciAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLmhhc1ZhbGlkQ2FyZEN2diAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVNb250aCAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lICYmXG5cdFx0XHRcdHVzZXJJbnB1dERhdGEuZG9ub3JMYXN0TmFtZSAmJlxuXHRcdFx0XHR1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVZZWFyXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBTcHJlZWRseSA9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0dmFyIHRva2VuT3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdC8vIFJlcXVpcmVkXG5cdFx0XHRcdFx0XHRmaXJzdF9uYW1lOiB1c2VySW5wdXREYXRhLmRvbm9yRmlyc3ROYW1lLFxuXHRcdFx0XHRcdFx0bGFzdF9uYW1lOiB1c2VySW5wdXREYXRhLmRvbm9yTGFzdE5hbWUsXG5cdFx0XHRcdFx0XHRtb250aDogdXNlcklucHV0RGF0YS5wYXlDYXJkRXhwaXJlTW9udGgsXG5cdFx0XHRcdFx0XHR5ZWFyOiB1c2VySW5wdXREYXRhLnBheUNhcmRFeHBpcmVZZWFyLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8gT3B0aW9uYWxcblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vckVtYWlsKSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuZW1haWwgPSB1c2VySW5wdXREYXRhLmRvbm9yRW1haWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VySW5wdXREYXRhLmRvbm9yUGhvbmUpIHtcblx0XHRcdFx0XHRcdHRva2VuT3B0aW9ucy5waG9uZV9udW1iZXIgPSB1c2VySW5wdXREYXRhLmRvbm9yUGhvbmU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VySW5wdXREYXRhLmRvbm9yU3RyZWV0KSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuYWRkcmVzczEgPSB1c2VySW5wdXREYXRhLmRvbm9yU3RyZWV0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vckNpdHkpIHtcblx0XHRcdFx0XHRcdHRva2VuT3B0aW9ucy5jaXR5ID0gdXNlcklucHV0RGF0YS5kb25vckNpdHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh1c2VySW5wdXREYXRhLmRvbm9yUmVnaW9uKSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuc3RhdGUgPSB1c2VySW5wdXREYXRhLmRvbm9yUmVnaW9uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vclBvc3RDb2RlKSB7XG5cdFx0XHRcdFx0XHR0b2tlbk9wdGlvbnMuemlwID0gdXNlcklucHV0RGF0YS5kb25vclBvc3RDb2RlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodXNlcklucHV0RGF0YS5kb25vckNvdW50cnkpIHtcblx0XHRcdFx0XHRcdHRva2VuT3B0aW9ucy5jb3VudHJ5ID0gdXNlcklucHV0RGF0YS5kb25vckNvdW50cnk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0U3ByZWVkbHkudG9rZW5pemVDcmVkaXRDYXJkKHRva2VuT3B0aW9ucyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmVycm9yKFwiTk8gU1BSRUVETFkgT0JKRUNUXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUuZXJyb3IoXCJTUFJFRURMWSBGSUVMRCBOT1QgUkVBRFlcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJlcEFuZFNob3dQcm9jZXNzaW5nU3RlcCgpIHtcblx0XHRcdHZhciBpY29uSHRtbCA9IFwiXCI7XG5cblx0XHRcdGlmICh3aW5kb3cubXdkc3BhY2UudXNlcklucHV0RGF0YS5wYXlNZXRob2QgPT0gXCJiaXRjb2luXCIpIHtcblx0XHRcdFx0aWNvbkh0bWwgPSB0aGlzV2lkZ2V0LnBheU1ldGhvZEljb25IdG1sLmJpdGNvaW47XG5cdFx0XHR9IGVsc2UgaWYgKHdpbmRvdy5td2RzcGFjZS51c2VySW5wdXREYXRhLnBheU1ldGhvZCA9PSBcImNhcmRcIikge1xuXHRcdFx0XHRzd2l0Y2ggKHdpbmRvdy5td2RzcGFjZS51c2VySW5wdXREYXRhLnBheUNhcmRUeXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcInZpc2FcIjpcblx0XHRcdFx0XHRcdGljb25IdG1sID0gdGhpc1dpZGdldC5wYXlNZXRob2RJY29uSHRtbC52aXNhO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIm1hc3RlcmNhcmRcIjpcblx0XHRcdFx0XHRjYXNlIFwibWFzdGVyXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIm1jXCI6XG5cdFx0XHRcdFx0XHRpY29uSHRtbCA9IHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwubWFzdGVyY2FyZDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJhbWV4XCI6XG5cdFx0XHRcdFx0Y2FzZSBcImFtZXJpY2FuX2V4cHJlc3NcIjpcblx0XHRcdFx0XHRjYXNlIFwiYW1lcmljYW5leHByZXNzXCI6XG5cdFx0XHRcdFx0XHRpY29uSHRtbCA9IHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwuYW1leDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJkaXNjb3ZlclwiOlxuXHRcdFx0XHRcdGNhc2UgXCJkaXNjXCI6XG5cdFx0XHRcdFx0XHRpY29uSHRtbCA9IHRoaXNXaWRnZXQucGF5TWV0aG9kSWNvbkh0bWwuZGlzY292ZXI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIganFTdGVwID0ganFDb250YWluZXIuZmluZCgnc2VjdGlvbltkYXRhLXN0ZXAtbmFtZT1cInByb2Nlc3NpbmdcIl0nKTtcblx0XHRcdGpxU3RlcC5maW5kKFwic3Bhbi5wcm9jZXNzaW5nUGF5U3ltYm9sXCIpLmh0bWwoaWNvbkh0bWwpO1xuXG5cdFx0XHRzaG93U3RlcChcInByb2Nlc3NpbmdcIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJlcEFuZFNob3dCaXRjb2luU3RlcChpbnB1dCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJwcmVwQW5kU2hvd0JpdGNvaW5TdGVwKCkgZ2l2ZW4gaW52YWxpZCBpbnB1dFwiLCBpbnB1dCk7XG5cdFx0XHRcdHByZXBBbmRTaG93RXJyb3JTdGVwKFwiVW5hYmxlIHRvIGRpc3BsYXkgQml0Y29pbiBpbnZvaWNlIHNjcmVlblwiKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGpxU3RlcCA9IGpxQ29udGFpbmVyLmZpbmQoJ3NlY3Rpb25bZGF0YS1zdGVwLW5hbWU9XCJiaXRjb2luSW52b2ljZVwiXScpO1xuXG5cdFx0XHRqcVN0ZXAuZmluZChcInNwYW4uYml0Y29pblN0YXR1c1wiKS5odG1sKGlucHV0Lmludm9pY2Vfc3RhdHVzKTtcblx0XHRcdGpxU3RlcFxuXHRcdFx0XHQuZmluZChcImltZy5zY2FuQ29kZVwiKVxuXHRcdFx0XHQuYXR0cihcInNyY1wiLCBcImRhdGE6aW1hZ2UvcG5nO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiICsgaW5wdXQuaW1nX2RhdGEpO1xuXHRcdFx0anFTdGVwLmZpbmQoXCJzcGFuLmJpdGNvaW5BbW91bnRcIikuaHRtbChpbnB1dC5hbHRfYW1vdW50KTtcblx0XHRcdGpxU3RlcC5maW5kKFwic3Bhbi5iaXRjb2luV2FsbGV0TGlua1wiKS5odG1sKGlucHV0LmNoZWNrb3V0X3VybCk7XG5cdFx0XHRqcVN0ZXAuZmluZChcImEuYml0Y29pbldhbGxldExpbmtcIikuYXR0cihcImhyZWZcIiwgaW5wdXQuY2hlY2tvdXRfdXJsKTtcblxuXHRcdFx0Ly8ga2VlcCBleHBpcmUgY291bnRkb3duIHRpbWVyIHVwZGF0ZWRcblx0XHRcdHVwZGF0ZUJpdGNvaW5UaW1lcihpbnB1dC5leHApO1xuXHRcdFx0dGhpc1dpZGdldC5pbnRlcnZhbHMuYml0Y29pblRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHVwZGF0ZUJpdGNvaW5UaW1lcihpbnB1dC5leHApO1xuXHRcdFx0fSwgMTAwMCk7XG5cblx0XHRcdHNob3dTdGVwKFwiYml0Y29pbkludm9pY2VcIik7XG5cblx0XHRcdC8vIHdhdGNoIGZvciBwYXltZW50IGNvbXBsZXRpb24gb24gQml0Y29pbiBzaWRlXG5cdFx0XHR0aGlzV2lkZ2V0LmludGVydmFscy5iaXRjb2luU3RhdHVzQ2hlY2tlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXG5cdFx0XHRcdFx0XHRcIkNhbGxpbmcgY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpIHdpdGggXCIsXG5cdFx0XHRcdFx0XHRpbnB1dC50cmFuc2FjdGlvbl9pZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdGNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoaW5wdXQudHJhbnNhY3Rpb25faWQpO1xuXHRcdFx0fSwgMzAwMDApO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUJpdGNvaW5UaW1lcihleHBpcmVUaW1lKSB7XG5cdFx0XHRpZiAodHlwZW9mIGV4cGlyZVRpbWUgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgZXhwaXJlVGltZSA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZGlzcGxheUNvdW50ZG93biA9IFwiVW5rbm93biB0aW1lXCI7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgbWludXRlcyA9IDA7XG5cdFx0XHRcdHZhciBzZWNvbmRzID0gMDtcblxuXHRcdFx0XHR2YXIgZXhwaXJlRGF0ZSA9IG5ldyBEYXRlKGV4cGlyZVRpbWUpLmdldFRpbWUoKTtcblx0XHRcdFx0dmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0XHRcdHZhciBtaW51dGVzUmVtYWluaW5nID0gKGV4cGlyZURhdGUgLSBub3cpIC8gMTAwMCAvIDYwO1xuXG5cdFx0XHRcdGlmIChtaW51dGVzUmVtYWluaW5nID4gMCkge1xuXHRcdFx0XHRcdG1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzUmVtYWluaW5nKTtcblx0XHRcdFx0XHRzZWNvbmRzID0gcGFyc2VJbnQoKG1pbnV0ZXNSZW1haW5pbmcgLSBtaW51dGVzKSAqIDYwKTtcblxuXHRcdFx0XHRcdGlmIChtaW51dGVzUmVtYWluaW5nIDwgMikge1xuXHRcdFx0XHRcdFx0anFCaXRjb2luVGltZVJlbWFpbmluZ1xuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdChcImRpdi5iaXRjb2luU3RhdHVzRGlzcGxheVwiKVxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoXCJ3YXJuaW5nXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqcUJpdGNvaW5UaW1lUmVtYWluaW5nXG5cdFx0XHRcdFx0XHQuY2xvc2VzdChcImRpdi5iaXRjb2luU3RhdHVzRGlzcGxheVwiKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFwiZXJyb3JcIik7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzV2lkZ2V0LmludGVydmFscy5iaXRjb2luVGltZXIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNlY29uZHMgPCAxMCkge1xuXHRcdFx0XHRcdHNlY29uZHMgPSBcIjBcIiArIHNlY29uZHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGlzcGxheUNvdW50ZG93biA9IG1pbnV0ZXMudG9GaXhlZCgpICsgXCI6XCIgKyBzZWNvbmRzO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJ1cGRhdGVCaXRjb2luVGltZXIoKSBjYXVnaHQgZXJyb3JcIiwgZXJyLm1lc3NhZ2UpO1xuXHRcdFx0fVxuXHRcdFx0anFCaXRjb2luVGltZVJlbWFpbmluZy5odG1sKGRpc3BsYXlDb3VudGRvd24pO1xuXHRcdH1cblxuXHRcdGFzeW5jIGZ1bmN0aW9uIGNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoaW5wdXQpIHtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXQgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XCJjaGVja0JpdGNvaW5QYXltZW50U3RhdHVzKCkgZ2l2ZW4gaW52YWxpZCB0cmFuc2FjdGlvbiBpZDpcIixcblx0XHRcdFx0XHRcdHR5cGVvZiBpbnB1dCxcblx0XHRcdFx0XHRcdGlucHV0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGJhc2VVcmwgPSB0aGlzV2lkZ2V0LnVybHMuYml0Y29pblBheW1lbnRBcGk7XG5cdFx0XHRpZiAoaW5UZXN0TW9kZSkge1xuXHRcdFx0XHRiYXNlVXJsID0gdGhpc1dpZGdldC51cmxzLnRlc3RCaXRjb2luUGF5bWVudEFwaTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGpxQml0Y29pbkNvbnRhaW5lciA9IGpxQ29udGFpbmVyLmZpbmQoXCJkaXYuYml0Y29pbkNvbnRhaW5lclwiKTtcblxuXHRcdFx0dmFyIHJlc3BvbnNlID0gYXdhaXQgbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0XHR2YXIgcmVxdWVzdFVybCA9IGVuY29kZVVSSShiYXNlVXJsICsgXCJpbnZvaWNlcy9cIiArIGlucHV0KTtcblx0XHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJGSUxFIExPQURFRDpcIiwgZXZlbnQpO1xuXHRcdFx0XHRcdHZhciBmaWxlQ29udGVudHMgPVxuXHRcdFx0XHRcdFx0ZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCB8fCBldmVudC50YXJnZXQucmVzcG9uc2UgfHwgbnVsbDtcblx0XHRcdFx0XHR2YXIgdGVtcE9iamVjdCA9IHdpbmRvdy5td2RzcGFjZS5zaGFyZWRVdGlscy5zYWZlSnNvblBhcnNlKGZpbGVDb250ZW50cyk7XG5cblx0XHRcdFx0XHRpZiAoIXRlbXBPYmplY3QgfHwgIXRlbXBPYmplY3QuZGF0YSkge1xuXHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoKTogaW52YWxpZCByZXNwb25zZVwiLCBldmVudCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKG51bGwpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc29sdmUodGVtcE9iamVjdC5kYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcImNoZWNrQml0Y29pblBheW1lbnRTdGF0dXMoKSBFUlJPUiBFVkVOVFwiLFxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0VXJsLFxuXHRcdFx0XHRcdFx0XHRldmVudFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXNvbHZlKG51bGwpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR4aHIub3BlbihcImdldFwiLCByZXF1ZXN0VXJsLCB0cnVlKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXHRcdFx0XHR4aHIuc2VuZCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghcmVzcG9uc2UpIHtcblx0XHRcdFx0dmFyIGRvbU1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRkb21NZXNzYWdlLmlubmVySFRNTCA9XG5cdFx0XHRcdFx0XCJXYXJuaW5nOiBVbmFibGUgdG8gdmVyaWZ5IHRoZSBzdGF0dXMgb2YgdGhpcyBpbnZvaWNlIChcIiArXG5cdFx0XHRcdFx0bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSArXG5cdFx0XHRcdFx0XCIpLiBXaWxsIHRyeSBhZ2FpbiBzaG9ydGx5LjwvZGl2PlwiO1xuXHRcdFx0XHRqcShkb21NZXNzYWdlKS5hZGRDbGFzcyhcInNwYWNpbmdDb250YWluZXIgZXJyb3JcIik7XG5cdFx0XHRcdGpxQml0Y29pbkNvbnRhaW5lclxuXHRcdFx0XHRcdC5maW5kKFwiZGl2LmJpdGNvaW5GZWVkYmFja1wiKVxuXHRcdFx0XHRcdC5lbXB0eSgpXG5cdFx0XHRcdFx0LmFwcGVuZChkb21NZXNzYWdlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiY2hlY2tCaXRjb2luUGF5bWVudFN0YXR1cygpIFJFU1BPTlNFXCIsIHJlc3BvbnNlKTtcblxuXHRcdFx0anFCaXRjb2luQ29udGFpbmVyLmZpbmQoXCJkaXYuYml0Y29pblN0YXR1c1wiKS5odG1sKHJlc3BvbnNlLnN0YXR1cyk7XG5cblx0XHRcdHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzKSB7XG5cdFx0XHRcdGNhc2UgXCJwYWlkXCI6XG5cdFx0XHRcdGNhc2UgXCJjb25maXJtZWRcIjpcblx0XHRcdFx0Y2FzZSBcImNvbXBsZXRlXCI6XG5cdFx0XHRcdFx0cHJlcEFuZFNob3dDb25maXJtYXRpb25TdGVwKCk7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzV2lkZ2V0LmludGVydmFscy5iaXRjb2luU3RhdHVzQ2hlY2tlcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJleHBpcmVkXCI6XG5cdFx0XHRcdFx0cHJlcEFuZFNob3dFcnJvclN0ZXAoXG5cdFx0XHRcdFx0XHRcIlRoZSBCaXRjb2luIGludm9pY2UgZXhwaXJlZCBiZWZvcmUgcGF5bWVudCB3YXMgcmVjZWl2ZWQuXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpc1dpZGdldC5pbnRlcnZhbHMuYml0Y29pblN0YXR1c0NoZWNrZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiaW52YWxpZFwiOlxuXHRcdFx0XHRcdHZhciBkb21NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0XHRkb21NZXNzYWdlLmlubmVySFRNTCA9XG5cdFx0XHRcdFx0XHRcIlRoZSBpbnZvaWNlIHJlY2VpdmVkIHBheW1lbnRzLCBidXQgaXMgbGlzdGVkIGFzIGludmFsaWQuXCI7XG5cdFx0XHRcdFx0anEoZG9tTWVzc2FnZSkuYWRkQ2xhc3MoXCJzcGFjaW5nQ29udGFpbmVyIGVycm9yXCIpO1xuXHRcdFx0XHRcdGpxQml0Y29pbkNvbnRhaW5lclxuXHRcdFx0XHRcdFx0LmZpbmQoXCJkaXYuYml0Y29pbkZlZWRiYWNrXCIpXG5cdFx0XHRcdFx0XHQuZW1wdHkoKVxuXHRcdFx0XHRcdFx0LmFwcGVuZChkb21NZXNzYWdlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm5ld1wiOlxuXHRcdFx0XHRcdC8vIEZPUiBURVNUIE1PREVcblx0XHRcdFx0XHRpZiAoaW5UZXN0TW9kZSkge1xuXHRcdFx0XHRcdFx0cHJlcEFuZFNob3dDb25maXJtYXRpb25TdGVwKCk7XG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHRoaXNXaWRnZXQuaW50ZXJ2YWxzLmJpdGNvaW5TdGF0dXNDaGVja2VyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwcmVwQW5kU2hvd0NvbmZpcm1hdGlvblN0ZXAoaW5wdXQpIHtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXQgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHR2YXIgaW5wdXQgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGpxTWVzc2FnZSA9IGpxQ29udGFpbmVyLmZpbmQoXG5cdFx0XHRcdCdzZWN0aW9uW2RhdGEtc3RlcC1uYW1lPVwiY29uZmlybWF0aW9uXCJdIHNwYW4uY29uZmlybWF0aW9uTWVzc2FnZSdcblx0XHRcdCk7XG5cblx0XHRcdC8vIFRIQU5LIFlPVSBURVhUXG5cdFx0XHR2YXIgdGhhbmtZb3VUZXh0ID0gXCJUaGFuayB5b3VcIjtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICh0aGlzV2lkZ2V0LmxhYmVsT3ZlcnJpZGUuY29uZmlybWF0aW9uLnRoYW5rWW91VGV4dCkge1xuXHRcdFx0XHRcdHRoYW5rWW91VGV4dCA9IHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZS5jb25maXJtYXRpb24udGhhbmtZb3VUZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnIpIHt9XG5cdFx0XHRqcU1lc3NhZ2UuaHRtbCh0aGFua1lvdVRleHQpO1xuXG5cdFx0XHQvLyBGSVJTVCBOQU1FXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAod2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEuZG9ub3JGaXJzdE5hbWUpIHtcblx0XHRcdFx0XHR2YXIgZG9tRmlyc3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0cm9uZ1wiKTtcblx0XHRcdFx0XHRkb21GaXJzdE5hbWUuaW5uZXJIVE1MID0gd2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEuZG9ub3JGaXJzdE5hbWU7XG5cdFx0XHRcdFx0anFNZXNzYWdlLmFwcGVuZChcIiwgXCIpO1xuXHRcdFx0XHRcdGpxTWVzc2FnZS5hcHBlbmQoZG9tRmlyc3ROYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxuXHRcdFx0anFNZXNzYWdlLmFwcGVuZChcIiFcIik7XG5cblx0XHRcdHNob3dTdGVwKFwiY29uZmlybWF0aW9uXCIpO1xuXG5cdFx0XHRpZiAodGhpc1dpZGdldC5vcHRpb25zLm9uRG9uYXRpb24pIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiPj4+IENhbGxpbmcgY3VzdG9tIG9uRG9uYXRpb24gZnVuY3Rpb25cIik7XG5cdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLm9uRG9uYXRpb24od2luZG93Lm13ZHNwYWNlLnVzZXJJbnB1dERhdGEpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiQ2F1Z2h0IGVycm9yIGZyb20gb25Eb25hdGlvbiBmdW5jdGlvbjogXCIsIGVyci5tZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHByZXBBbmRTaG93RXJyb3JTdGVwKGlucHV0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGlucHV0ID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0dmFyIGlucHV0ID0ge307XG5cdFx0XHR9XG5cdFx0XHR2YXIganFTdGVwID0ganFDb250YWluZXIuZmluZCgnc2VjdGlvbltkYXRhLXN0ZXAtbmFtZT1cInRyYW5zYWN0aW9uRXJyb3JcIl0nKTtcblx0XHRcdGpxU3RlcC5maW5kKFwic3Bhbi5lcnJvck1lc3NhZ2VcIikuaHRtbChpbnB1dCk7XG5cdFx0XHRzaG93U3RlcChcInRyYW5zYWN0aW9uRXJyb3JcIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsQWxsKHRoZUVsZW1lbnQpIHtcblx0XHRcdGlmICh0eXBlb2YgdGhlRWxlbWVudCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICghdGhpc1dpZGdldC5hbGxvd0F1dG9TY3JvbGwpIHtcblx0XHRcdFx0Ly8gZG9uJ3Qgc2Nyb2xsIHVudGlsIGFmdGVyIGluaXRpYWwgcGFnZSBsb2FkIGlzIGNvbXBsZXRlXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoZUVsZW1lbnQgPSBqcSh0aGVFbGVtZW50KTtcblx0XHRcdGlmICh0aGVFbGVtZW50Lmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG9yaWdpbmFsU2Nyb2xsVG9wID0ganEod2luZG93KS5zY3JvbGxUb3AoKTtcblx0XHRcdHZhciBiYXNlU2Nyb2xsVGltZSA9IDU1NTtcblxuXHRcdFx0dmFyIHZpZXdIZWlnaHQgPSBqcSh3aW5kb3cpLmhlaWdodCgpO1xuXHRcdFx0dmFyIHZpZXdUb3AgPSBvcmlnaW5hbFNjcm9sbFRvcDtcblx0XHRcdHZhciB2aWV3Qm90dG9tID0gdmlld1RvcCArIHZpZXdIZWlnaHQ7XG5cblx0XHRcdHZhciBlbGVtZW50SGVpZ2h0ID0gdGhlRWxlbWVudC5pbm5lckhlaWdodCgpO1xuXHRcdFx0dmFyIGVsZW1lbnRQYWRkaW5nID0gKHRoZUVsZW1lbnQub3V0ZXJIZWlnaHQoKSAtIGVsZW1lbnRIZWlnaHQpIC8gMjtcblx0XHRcdGVsZW1lbnRQYWRkaW5nID0gZWxlbWVudFBhZGRpbmcgPD0gMCA/IDAgOiBlbGVtZW50UGFkZGluZztcblxuXHRcdFx0dmFyIGVsZW1lbnRUb3AgPSB0aGVFbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHRcdHZhciBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArIGVsZW1lbnRIZWlnaHQ7XG5cblx0XHRcdHZhciB0b3BWaXN1YWxQYWRkaW5nID0gMDtcblx0XHRcdGlmICh0eXBlb2YgdGhpc1dpZGdldC5kZWZhdWx0cy50b3BWaXN1YWxQYWRkaW5nU2VsZWN0b3IgPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR0b3BWaXN1YWxQYWRkaW5nID1cblx0XHRcdFx0XHRqcSh0aGlzV2lkZ2V0LmRlZmF1bHRzLnRvcFZpc3VhbFBhZGRpbmdTZWxlY3Rvcikub3V0ZXJIZWlnaHQoKSB8fCAwO1xuXHRcdFx0XHR0b3BWaXN1YWxQYWRkaW5nID1cblx0XHRcdFx0XHR0b3BWaXN1YWxQYWRkaW5nID4gdmlld0hlaWdodCAqIDAuMjUgPyB2aWV3SGVpZ2h0ICogMC4yNSA6IHRvcFZpc3VhbFBhZGRpbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkge1xuXHRcdFx0Ly8gXHRpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwidmlld1RvcFwiLCB2aWV3VG9wKTtcblx0XHRcdC8vIFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcImVsZW1lbnRUb3BcIiwgZWxlbWVudFRvcCk7XG5cdFx0XHQvLyBcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJlbGVtZW50UGFkZGluZ1wiLCBlbGVtZW50UGFkZGluZyk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdC8vdG9wIGlzIG9mZiBzY3JlZW4gb3IgIGVsZW1lbnQgaXMgdGFsbGVyIHRoZSBzY3JlZW4sIHNvIHNjcm9sbCB0byBlbGVtZW50IHRvcFxuXHRcdFx0aWYgKGVsZW1lbnRIZWlnaHQgPiB2aWV3SGVpZ2h0IHx8IHZpZXdUb3AgKyB0b3BWaXN1YWxQYWRkaW5nID4gZWxlbWVudFRvcCkge1xuXHRcdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiU0NST0xMIFRPIFRPUFwiKTtcblx0XHRcdFx0YW5pbWF0ZVNjcm9sbChlbGVtZW50VG9wIC0gdG9wVmlzdWFsUGFkZGluZywgLTUpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vdGhlIGVsZW1lbnQgYm90dG9tIGlzIG9mZiBzY3JlZW4gc28gc2Nyb2xsIHVwIGVub3VnaCB0byBub3QgcHVzaCB0aGUgdG9wIG9mZnNjcmVlblxuXHRcdFx0aWYgKHZpZXdCb3R0b20gPCBlbGVtZW50Qm90dG9tKSB7XG5cdFx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJTQ1JPTEwgVE8gQk9UVE9NXCIpO1xuXHRcdFx0XHR2YXIgbmV3VG9wID0gZWxlbWVudEJvdHRvbSAtIHZpZXdIZWlnaHQ7XG5cdFx0XHRcdGlmIChuZXdUb3AgPCB0b3BWaXN1YWxQYWRkaW5nKSB7XG5cdFx0XHRcdFx0bmV3VG9wID0gdG9wVmlzdWFsUGFkZGluZztcblx0XHRcdFx0fVxuXHRcdFx0XHRhbmltYXRlU2Nyb2xsKG5ld1RvcCwgNSk7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG9wLCBnYXApIHtcblx0XHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcImFuaW1hdGVTY3JvbGxcIiwgc2Nyb2xsVG9wLCBnYXApO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgZ2FwID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHR2YXIgZ2FwID0gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGpxKFwiaHRtbCxib2R5XCIpLmFuaW1hdGUoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiBzY3JvbGxUb3AgKyBnYXAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRiYXNlU2Nyb2xsVGltZVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUubGlua0V4dGVybmFsU3R5bGVzaGVldCA9IGZ1bmN0aW9uKHVybCkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0Ly8gaWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcImxpbmtFeHRlcm5hbFN0eWxlc2hlZXQoKSBzdGFydDpcIiwgdXJsKTtcblx0XHRcdHZhciBkb21TdHlsZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0XHRcdHRoaXNXaWRnZXQuZG9tVGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChkb21TdHlsZUxpbmspO1xuXHRcdFx0ZG9tU3R5bGVMaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRcdFx0ZG9tU3R5bGVMaW5rLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImxpbmtFeHRlcm5hbFN0eWxlc2hlZXQoKSBObyBsb2FkIGFmdGVyIDVzXCIsIHVybCk7XG5cdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fSwgNTAwMCk7XG5cdFx0XHRkb21TdHlsZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiU1RZTEVTSEVFVCBMT0FERUQ6XCIsIHVybCk7XG5cdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdGRvbVN0eWxlTGluay5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJsaW5rRXh0ZXJuYWxTdHlsZXNoZWV0KCkgRVJST1IgRVZFTlRcIiwgdXJsLCBldmVudCk7XG5cdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRkb21TdHlsZUxpbmsuaHJlZiA9IGVuY29kZVVSSSh1cmwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5saW5rRXh0ZXJuYWxTY3JpcHQgPSBmdW5jdGlvbih1cmwpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJsaW5rRXh0ZXJuYWxTY3JpcHQoKSBzdGFydDpcIiwgdXJsKTtcblx0XHRcdHZhciBkb21TY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0dGhpc1dpZGdldC5kb21UYXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGRvbVNjcmlwdCk7XG5cdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJsaW5rRXh0ZXJuYWxTY3JpcHQoKSBObyBsb2FkIGFmdGVyIDVzXCIsIHVybCk7XG5cdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fSwgNTAwMCk7XG5cdFx0XHRkb21TY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHQvLyBpZiAod2luZG93LmNvbnNvbGUpIGNvbnNvbGUubG9nKFwiU0NSSVBUIExPQURFRDpcIiwgdXJsKTtcblx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9tU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5lcnJvcihcImxpbmtFeHRlcm5hbFNjcmlwdCgpIEVSUk9SXCIsIHVybCwgZXZlbnQpO1xuXHRcdFx0XHRyZXNvbHZlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9tU2NyaXB0LnNyYyA9IGVuY29kZVVSSSh1cmwpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5sb2FkRmlsZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRpZiAodHlwZW9mIGlucHV0ID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLndhcm4oXCJsb2FkRmlsZSgpIGdpdmVuIGVtcHR5IHVybFwiKTtcblx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgaW5wdXQgIT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFwibG9hZEZpbGUoKSBnaXZlbiBpbnZhbGlkIHVybCB0eXBlOlwiLCB0eXBlb2YgaW5wdXQsIGlucHV0KTtcblx0XHRcdFx0cmVzb2x2ZShudWxsKTtcblx0XHRcdH1cblx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJsb2FkRmlsZSgpIHN0YXJ0OlwiLCBpbnB1dCk7XG5cdFx0XHR2YXIgcmVxdWVzdFVybCA9IGVuY29kZVVSSShpbnB1dCk7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmxvZyhcImxpbmtFeHRlcm5hbFNjcmlwdCgpIE5vIGxvYWQgYWZ0ZXIgNXNcIiwgdXJsKTtcblx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHR9LCA1MDAwKTtcblx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdC8vIGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJGSUxFIExPQURFRDpcIiwgaW5wdXQpO1xuXHRcdFx0XHR2YXIgZmlsZUNvbnRlbnRzID0gZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCB8fCBldmVudC50YXJnZXQucmVzcG9uc2UgfHwgbnVsbDtcblx0XHRcdFx0cmVzb2x2ZShmaWxlQ29udGVudHMpO1xuXHRcdFx0fSk7XG5cdFx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKSBjb25zb2xlLmVycm9yKFwibG9hZEZpbGUoKSBFUlJPUiBFVkVOVFwiLCByZXF1ZXN0VXJsLCBldmVudCk7XG5cdFx0XHRcdHJlc29sdmUobnVsbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0eGhyLm9wZW4oXCJnZXRcIiwgcmVxdWVzdFVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2VuZCgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5nZXRGb250SWNvblN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcblx0XHRcdHZhciBmb250c0xvYWRlZCA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXNXaWRnZXQub3B0aW9ucy5mb250QXdlc29tZVZlcnNpb24gPT0gNCkge1xuXHRcdFx0XHRmb250c0xvYWRlZCA9IGF3YWl0IHRoaXNXaWRnZXQubGlua0V4dGVybmFsU3R5bGVzaGVldChcblx0XHRcdFx0XHR0aGlzV2lkZ2V0LnVybHMuZm9udEF3ZXNvbWU0XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXNXaWRnZXQub3B0aW9ucy5mb250QXdlc29tZVZlcnNpb24gPT0gNSkge1xuXHRcdFx0XHRmb250c0xvYWRlZCA9IGF3YWl0IHRoaXNXaWRnZXQubGlua0V4dGVybmFsU3R5bGVzaGVldChcblx0XHRcdFx0XHR0aGlzV2lkZ2V0LnVybHMuZm9udEF3ZXNvbWU1XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZShmb250c0xvYWRlZCk7XG5cdFx0fSk7XG5cdH07XG5cblx0d2luZG93Lm13ZHNwYWNlLk1GQV9GdW5yYWlzZV9XaWRnZXQucHJvdG90eXBlLnByZXBhcmVMYWJlbE92ZXJyaWRlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHRoaXNXaWRnZXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuXHRcdFx0aWYgKHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlT2JqZWN0KSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS5sb2coXCJVc2luZyBsYWJlbCBvYmplY3RcIik7XG5cdFx0XHRcdHRoaXNXaWRnZXQubGFiZWxPdmVycmlkZSA9IHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlT2JqZWN0O1xuXHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzV2lkZ2V0Lm9wdGlvbnMubGFiZWxPdmVycmlkZUZpbGVVcmwpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcblx0XHRcdFx0XHRcdFx0XCJMb2FkaW5nIGxhYmVsIGZpbGU6XCIsXG5cdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlRmlsZVVybFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR2YXIgb3ZlcnJpZGVGaWxlQ29udGVudHMgPSBhd2FpdCB0aGlzV2lkZ2V0LmxvYWRGaWxlKFxuXHRcdFx0XHRcdFx0dGhpc1dpZGdldC5vcHRpb25zLmxhYmVsT3ZlcnJpZGVGaWxlVXJsXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAob3ZlcnJpZGVGaWxlQ29udGVudHMpIHtcblx0XHRcdFx0XHRcdHZhciB0ZW1wT2JqZWN0ID0gd2luZG93Lm13ZHNwYWNlLnNoYXJlZFV0aWxzLnNhZmVKc29uUGFyc2UoXG5cdFx0XHRcdFx0XHRcdG92ZXJyaWRlRmlsZUNvbnRlbnRzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKHRlbXBPYmplY3QpIHtcblx0XHRcdFx0XHRcdFx0dGhpc1dpZGdldC5sYWJlbE92ZXJyaWRlID0gdGVtcE9iamVjdDtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmICh3aW5kb3cuY29uc29sZSlcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJNRkFfRnVucmFpc2VfV2lkZ2V0LnByZXBhcmVMYWJlbE92ZXJyaWRlKCkgLSB1bmFibGUgdG8gcGFyc2UgdGV4dCBvdmVycmlkZSBkYXRhIGZyb20gZmlsZTpcIixcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFwiTUZBX0Z1bnJhaXNlX1dpZGdldC5wcmVwYXJlTGFiZWxPdmVycmlkZSgpIC0gdW5hYmxlIHRvIGxvYWQgZmlsZSBmb3IgdGV4dCBvdmVycmlkZSBkYXRhOlwiLFxuXHRcdFx0XHRcdFx0XHRcdHRoaXNXaWRnZXQub3B0aW9ucy5sYWJlbE92ZXJyaWRlXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInByZXBhcmVMYWJlbE92ZXJyaWRlKCkgY2F1Z2h0IGVycm9yOiBcIiwgZXJyLm1lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHdpbmRvdy5td2RzcGFjZS5NRkFfRnVucmFpc2VfV2lkZ2V0LnByb3RvdHlwZS5wcm9jZXNzTGFiZWxPdmVycmlkZU9iamVjdCA9IGZ1bmN0aW9uKFxuXHRcdGlucHV0LFxuXHRcdHByZWZpeFxuXHQpIHtcblx0XHR2YXIgdGhpc1dpZGdldCA9IHRoaXM7XG5cdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSBcIm9iamVjdFwiIHx8ICFpbnB1dCkge1xuXHRcdFx0aWYgKHdpbmRvdy5jb25zb2xlKVxuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XCJNRkFfRnVucmFpc2VfV2lkZ2V0LnByb2Nlc3NMYWJlbE92ZXJyaWRlT2JqZWN0KCkgZ2l2ZW4gaW52YWxpZCBvYmplY3RcIixcblx0XHRcdFx0XHR0eXBlb2YgaW5wdXRcblx0XHRcdFx0KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBwcmVmaXggPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHByZWZpeCA9IFwiXCI7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgcHJlZml4ICE9IFwic3RyaW5nXCIpIHtcblx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKFwiSWdub3JpbmcgaW52YWxpZCBzdHJpbmcgcHJlZml4IHZhbHVlXCIsIHByZWZpeCk7XG5cdFx0XHRwcmVmaXggPSBcIlwiO1xuXHRcdH1cblx0XHRpZiAocHJlZml4KSB7XG5cdFx0XHRwcmVmaXggPSBwcmVmaXggKyBcIi5cIjtcblx0XHR9XG5cdFx0dmFyIHRoaXNTZWxlY3Rvcjtcblx0XHRmb3IgKHZhciBrZXkgaW4gaW5wdXQpIHtcblx0XHRcdHRoaXNTZWxlY3RvciA9IHByZWZpeCArIGtleTtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXRba2V5XSA9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHRoaXNXaWRnZXQuc2V0RWxlbWVudExhYmVsT3ZlcnJpZGUodGhpc1NlbGVjdG9yLCBpbnB1dFtrZXldKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJlY3Vyc2l2ZSwgdG8gaGFuZGxlIG5lc3RlZCBKU09OIG9iamVjdHNcblx0XHRcdFx0dGhpc1dpZGdldC5wcm9jZXNzTGFiZWxPdmVycmlkZU9iamVjdChpbnB1dFtrZXldLCB0aGlzU2VsZWN0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR3aW5kb3cubXdkc3BhY2UuTUZBX0Z1bnJhaXNlX1dpZGdldC5wcm90b3R5cGUuc2V0RWxlbWVudExhYmVsT3ZlcnJpZGUgPSBmdW5jdGlvbihcblx0XHRsYWJlbElkLFxuXHRcdHZhbHVlXG5cdCkge1xuXHRcdHZhciB0aGlzV2lkZ2V0ID0gdGhpcztcblx0XHRpZiAodHlwZW9mIGxhYmVsSWQgPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIGxhYmVsSWQgPSBcIlwiO1xuXHRcdH1cblx0XHRpZiAoIWxhYmVsSWQpIHtcblx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKFwic2V0RWxlbWVudExhYmVsT3ZlcnJpZGUoKSBnaXZlbiBlbXB0eSBsYWJlbElkXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgc2VsZWN0b3IgPSAnW2RhdGEtbGFiZWwtaWQ9XCInICsgbGFiZWxJZCArICdcIl0nO1xuXHRcdHZhciBlbGVtZW50TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdHZhciB0aGlzVGFnO1xuXHRcdGlmIChlbGVtZW50TGlzdCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50TGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzVGFnID0gU3RyaW5nKGVsZW1lbnRMaXN0W2ldLnRhZ05hbWUpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHN3aXRjaCAodGhpc1RhZykge1xuXHRcdFx0XHRcdGNhc2UgXCJpbnB1dFwiOlxuXHRcdFx0XHRcdFx0ZWxlbWVudExpc3RbaV0uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImxhYmVsXCI6XG5cdFx0XHRcdFx0Y2FzZSBcInNwYW5cIjpcblx0XHRcdFx0XHRjYXNlIFwiZGl2XCI6XG5cdFx0XHRcdFx0Y2FzZSBcIm9wdGlvblwiOlxuXHRcdFx0XHRcdGNhc2UgXCJoMVwiOlxuXHRcdFx0XHRcdGNhc2UgXCJoMlwiOlxuXHRcdFx0XHRcdGNhc2UgXCJoM1wiOlxuXHRcdFx0XHRcdGNhc2UgXCJoNFwiOlxuXHRcdFx0XHRcdGNhc2UgXCJoNVwiOlxuXHRcdFx0XHRcdGNhc2UgXCJoNlwiOlxuXHRcdFx0XHRcdGNhc2UgXCJwXCI6XG5cdFx0XHRcdFx0Y2FzZSBcImxpXCI6XG5cdFx0XHRcdFx0XHRlbGVtZW50TGlzdFtpXS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcInNldEVsZW1lbnRMYWJlbE92ZXJyaWRlKCk6IElnbm9yaW5nIHRhZ1wiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsSWQsXG5cdFx0XHRcdFx0XHRcdFx0dGhpc1RhZ1xuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh3aW5kb3cuY29uc29sZSkgY29uc29sZS53YXJuKFwiUkVQTEFDRSBsYWJlbElkIG5vdCBmb3VuZFwiLCBsYWJlbElkKTtcblx0XHR9XG5cdH07XG59KSgpO1xuIl19

//# sourceMappingURL=mwd-donate-widget.js.map
