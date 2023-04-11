globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/prod-ssr.js
var DEV;
var init_prod_ssr = __esm({
  ".svelte-kit/output/server/chunks/prod-ssr.js"() {
    DEV = false;
  }
});

// .svelte-kit/output/server/chunks/index2.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component8) {
  current_component = component8;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component8, name) {
  if (!component8 || !component8.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component8;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css8) => css8.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, message) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, message);
}
function json(data, init3) {
  const body = JSON.stringify(data);
  const headers = new Headers(init3?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init3,
    headers
  });
}
function text(body, init3) {
  const headers = new Headers(init3?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  return new Response(body, {
    ...init3,
    headers
  });
}
var HttpError, Redirect, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class HttpError2 {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class Redirect2 {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class ActionFailure2 {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function stringify_string(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code <= 31) {
      result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    escaped = {
      "<": "\\u003C",
      ">": "\\u003E",
      "/": "\\u002F",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\0": "\\u0000",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type2 = get_type(thing);
    switch (type2) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type2}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_constants();
  }
});

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index9 = p++;
    indexes.set(thing, index9);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index9] = `["${key2}",${flatten(value2)}]`;
        return index9;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index9] = str;
    return index9;
  }
  const index8 = flatten(value);
  if (index8 < 0)
    return `${index8}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type2 = typeof thing;
  if (type2 === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type2 === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index8 = 0;
      while (index8 < str.length) {
        var eqIdx = str.indexOf("=", index8);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index8);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index8 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index8, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index8 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start2;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start2 = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start2, lastComma));
              start2 = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start2, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.server.js
var layout_server_exports = {};
__export(layout_server_exports, {
  load: () => load
});
async function load({ fetch: fetch2, url, request }) {
  const currentRoute = await url.pathname;
  let location = {};
  let weather = {};
  {
    location = {
      ip: decodeURIComponent(request.headers.get("x-real-ip") ?? "unknown"),
      city: decodeURIComponent(request.headers.get("x-vercel-ip-city") ?? "unknown"),
      region: decodeURIComponent(request.headers.get("x-vercel-ip-country-region") ?? "unknown"),
      country: decodeURIComponent(request.headers.get("x-vercel-ip-country") ?? "unknown"),
      lat: decodeURIComponent(request.headers.get("x-vercel-ip-latitude") ?? "unknown"),
      lon: decodeURIComponent(request.headers.get("x-vercel-ip-longitude") ?? "unknown")
    };
    weather = getWeather(location.lat, location.lon);
  }
  async function getWeather(lat, lon) {
    const weatherRes = await fetch2(`/api/weather/lat=${lat}&lon=${lon}`);
    const weatherData = await weatherRes.json();
    return weatherData;
  }
  return {
    currentRoute,
    location,
    weather
  };
}
var init_layout_server = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.server.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var css$1, SearchIcon, css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index2();
    css$1 = {
      code: ".svg_icon.svelte-z52vsq{height:1.5em;width:1.5em;font-size:1em;fill:currentColor;vertical-align:top}.pointer.svelte-z52vsq{cursor:pointer}.pointer.svelte-z52vsq:hover:not(:active){opacity:0.5}",
      map: null
    };
    SearchIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { style = "" } = $$props;
      let { fontsize = "1em" } = $$props;
      let { color: color2 = "currentColor" } = $$props;
      let { btn = true } = $$props;
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.fontsize === void 0 && $$bindings.fontsize && fontsize !== void 0)
        $$bindings.fontsize(fontsize);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0)
        $$bindings.color(color2);
      if ($$props.btn === void 0 && $$bindings.btn && btn !== void 0)
        $$bindings.btn(btn);
      $$result.css.add(css$1);
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-icon="search" class="${["svg_icon svelte-z52vsq", btn ? "pointer" : ""].join(" ").trim()}"${add_styles(merge_ssr_styles(escape(style, true), { color: color2, "font-size": fontsize }))}${add_attribute("btn", btn, 0)}><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>`;
    });
    css = {
      code: ".search_bar.svelte-113j3yk{flex:1;display:flex;justify-content:center;align-items:center;gap:0 1rem;text-decoration:underline !important;font-size:1.25rem}.alerts.svelte-113j3yk:not(.active){color:tomato}.innerWidth.svelte-113j3yk{position:fixed;top:0.75rem;left:0.75rem;z-index:100}",
      map: null
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let innerWidth, title3 = "Dev Open_Weather";
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css);
      return `${$$result.head += `<!-- HEAD_svelte-1258swp_START -->${$$result.title = `<title>${escape(title3)}</title>`, ""}<!-- HEAD_svelte-1258swp_END -->`, ""}


<div class="innerWidth svelte-113j3yk">${escape(innerWidth)}</div>
<header class=""><div class="flex"><a class="search_bar svelte-113j3yk" href="/search"><div class="location">${escape(data?.location.city)}, ${escape(data?.location.region)}</div>
      
      ${validate_component(SearchIcon, "SearchIcon").$$render($$result, { fontsize: "0.8em" }, {}, {})}</a></div></header>

<main><div class="router">${slots.default ? slots.default({}) : ``}</div></main>

<footer><div class="flex"><nav><div class="${["route", data.currentRoute === "/" ? "active" : ""].join(" ").trim()}"><a href="/">Home</a></div>

      <div class="spacer">|</div>

      <div class="${["route", data.currentRoute === "/map" ? "active" : ""].join(" ").trim()}"><a href="/map">Map</a></div>

      ${data.weather.alerts ? `<div class="spacer">|</div>

        <div class="${[
        "route alerts svelte-113j3yk",
        data.currentRoute === "/alerts" ? "active" : ""
      ].join(" ").trim()}"><a href="/alerts">Alerts</a></div>` : ``}

      <div class="spacer">|</div>

      <div class="${["route", data.currentRoute.includes("/docs") ? "active" : ""].join(" ").trim()}"><a href="/docs">Docs</a></div></nav></div>
</footer>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  server: () => layout_server_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets
});
var index, component, file, server_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_server();
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/entry/_layout.svelte.06462a13.js";
    server_id = "src/routes/+layout.server.js";
    imports = ["_app/immutable/entry/_layout.svelte.06462a13.js", "_app/immutable/chunks/index.09f10f2b.js"];
    stylesheets = ["_app/immutable/assets/_layout.c3227ac6.css"];
    fonts = ["_app/immutable/assets/source-serif-4-cyrillic-ext-400-normal.c2b51d19.woff2", "_app/immutable/assets/source-serif-4-all-400-normal.a90ada35.woff", "_app/immutable/assets/source-serif-4-cyrillic-400-normal.cbf6898c.woff2", "_app/immutable/assets/source-serif-4-greek-400-normal.66f00e72.woff2", "_app/immutable/assets/source-serif-4-vietnamese-400-normal.75773e34.woff2", "_app/immutable/assets/source-serif-4-latin-ext-400-normal.eb2ebc02.woff2", "_app/immutable/assets/source-serif-4-latin-400-normal.b63fc127.woff2", "_app/immutable/assets/lato-latin-ext-400-normal.1c2fc265.woff2", "_app/immutable/assets/lato-all-400-normal.8844f83a.woff", "_app/immutable/assets/lato-latin-400-normal.918b7dc3.woff2"];
  }
});

// .svelte-kit/output/server/entries/pages/_error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_error.svelte.js"() {
    init_index2();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
    };
    page = {
      /** @param {(value: any) => void} fn */
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let countdown = 3;
      $$unsubscribe_page();
      return `<div class="page"><div>${escape($page.status)}: ${escape($page.error.message)} <q>${escape($page.url.pathname)}</q>.</div>
  <div>redirecting in ${escape(countdown)}</div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/entry/_error.svelte.2b84b678.js";
    imports2 = ["_app/immutable/entry/_error.svelte.2b84b678.js", "_app/immutable/chunks/index.09f10f2b.js", "_app/immutable/chunks/singletons.341826d1.js", "_app/immutable/chunks/navigation.b732f982.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/d3-array/src/index.js
var init_src = __esm({
  "node_modules/d3-array/src/index.js"() {
  }
});

// node_modules/d3-axis/src/index.js
var init_src2 = __esm({
  "node_modules/d3-axis/src/index.js"() {
  }
});

// node_modules/d3-dispatch/src/dispatch.js
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
function get(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop2, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var noop2, dispatch_default;
var init_dispatch = __esm({
  "node_modules/d3-dispatch/src/dispatch.js"() {
    noop2 = { value: () => {
    } };
    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
        if (arguments.length < 2) {
          while (++i < n)
            if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
              return t;
          return;
        }
        if (callback != null && typeof callback !== "function")
          throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type)
            _[t] = set(_[t], typename.name, callback);
          else if (callback == null)
            for (t in _)
              _[t] = set(_[t], typename.name, null);
        }
        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _)
          copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type2, that) {
        if ((n = arguments.length - 2) > 0)
          for (var args = new Array(n), i = 0, n, t; i < n; ++i)
            args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type2))
          throw new Error("unknown type: " + type2);
        for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
          t[i].value.apply(that, args);
      },
      apply: function(type2, that, args) {
        if (!this._.hasOwnProperty(type2))
          throw new Error("unknown type: " + type2);
        for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
          t[i].value.apply(that, args);
      }
    };
    dispatch_default = dispatch;
  }
});

// node_modules/d3-dispatch/src/index.js
var init_src3 = __esm({
  "node_modules/d3-dispatch/src/index.js"() {
    init_dispatch();
  }
});

// node_modules/d3-selection/src/namespaces.js
var xhtml, namespaces_default;
var init_namespaces = __esm({
  "node_modules/d3-selection/src/namespaces.js"() {
    xhtml = "http://www.w3.org/1999/xhtml";
    namespaces_default = {
      svg: "http://www.w3.org/2000/svg",
      xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
  }
});

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}
var init_namespace = __esm({
  "node_modules/d3-selection/src/namespace.js"() {
    init_namespaces();
  }
});

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
var init_creator = __esm({
  "node_modules/d3-selection/src/creator.js"() {
    init_namespace();
    init_namespaces();
  }
});

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}
var init_selector = __esm({
  "node_modules/d3-selection/src/selector.js"() {
  }
});

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
var init_select = __esm({
  "node_modules/d3-selection/src/selection/select.js"() {
    init_selection();
    init_selector();
  }
});

// node_modules/d3-selection/src/array.js
function array2(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
var init_array = __esm({
  "node_modules/d3-selection/src/array.js"() {
  }
});

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}
var init_selectorAll = __esm({
  "node_modules/d3-selection/src/selectorAll.js"() {
  }
});

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array2(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}
var init_selectAll = __esm({
  "node_modules/d3-selection/src/selection/selectAll.js"() {
    init_selection();
    init_array();
    init_selectorAll();
  }
});

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}
var init_matcher = __esm({
  "node_modules/d3-selection/src/matcher.js"() {
  }
});

// node_modules/d3-selection/src/selection/selectChild.js
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var find;
var init_selectChild = __esm({
  "node_modules/d3-selection/src/selection/selectChild.js"() {
    init_matcher();
    find = Array.prototype.find;
  }
});

// node_modules/d3-selection/src/selection/selectChildren.js
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
var filter;
var init_selectChildren = __esm({
  "node_modules/d3-selection/src/selection/selectChildren.js"() {
    init_matcher();
    filter = Array.prototype.filter;
  }
});

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
var init_filter = __esm({
  "node_modules/d3-selection/src/selection/filter.js"() {
    init_selection();
    init_matcher();
  }
});

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}
var init_sparse = __esm({
  "node_modules/d3-selection/src/selection/sparse.js"() {
  }
});

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
var init_enter = __esm({
  "node_modules/d3-selection/src/selection/enter.js"() {
    init_sparse();
    init_selection();
    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
      },
      insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
      },
      querySelector: function(selector) {
        return this._parent.querySelector(selector);
      },
      querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
      }
    };
  }
});

// node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}
var init_constant = __esm({
  "node_modules/d3-selection/src/constant.js"() {
  }
});

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key2) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key2.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key2.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key2) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key2 ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key2);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
var init_data = __esm({
  "node_modules/d3-selection/src/selection/data.js"() {
    init_selection();
    init_enter();
    init_constant();
  }
});

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}
var init_exit = __esm({
  "node_modules/d3-selection/src/selection/exit.js"() {
    init_sparse();
    init_selection();
  }
});

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
var init_join = __esm({
  "node_modules/d3-selection/src/selection/join.js"() {
  }
});

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}
var init_merge = __esm({
  "node_modules/d3-selection/src/selection/merge.js"() {
    init_selection();
  }
});

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
var init_order = __esm({
  "node_modules/d3-selection/src/selection/order.js"() {
  }
});

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
var init_sort = __esm({
  "node_modules/d3-selection/src/selection/sort.js"() {
    init_selection();
  }
});

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
var init_call = __esm({
  "node_modules/d3-selection/src/selection/call.js"() {
  }
});

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}
var init_nodes = __esm({
  "node_modules/d3-selection/src/selection/nodes.js"() {
  }
});

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node)
        return node;
    }
  }
  return null;
}
var init_node = __esm({
  "node_modules/d3-selection/src/selection/node.js"() {
  }
});

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}
var init_size = __esm({
  "node_modules/d3-selection/src/selection/size.js"() {
  }
});

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}
var init_empty = __esm({
  "node_modules/d3-selection/src/selection/empty.js"() {
  }
});

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
var init_each = __esm({
  "node_modules/d3-selection/src/selection/each.js"() {
  }
});

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
var init_attr = __esm({
  "node_modules/d3-selection/src/selection/attr.js"() {
    init_namespace();
  }
});

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
var init_window = __esm({
  "node_modules/d3-selection/src/window.js"() {
  }
});

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
var init_style = __esm({
  "node_modules/d3-selection/src/selection/style.js"() {
    init_window();
  }
});

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
var init_property = __esm({
  "node_modules/d3-selection/src/selection/property.js"() {
  }
});

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
var init_classed = __esm({
  "node_modules/d3-selection/src/selection/classed.js"() {
    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };
  }
});

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
var init_text = __esm({
  "node_modules/d3-selection/src/selection/text.js"() {
  }
});

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
var init_html = __esm({
  "node_modules/d3-selection/src/selection/html.js"() {
  }
});

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}
var init_raise = __esm({
  "node_modules/d3-selection/src/selection/raise.js"() {
  }
});

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}
var init_lower = __esm({
  "node_modules/d3-selection/src/selection/lower.js"() {
  }
});

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
var init_append = __esm({
  "node_modules/d3-selection/src/selection/append.js"() {
    init_creator();
  }
});

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
var init_insert = __esm({
  "node_modules/d3-selection/src/selection/insert.js"() {
    init_creator();
    init_selector();
  }
});

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}
var init_remove = __esm({
  "node_modules/d3-selection/src/selection/remove.js"() {
  }
});

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
var init_clone = __esm({
  "node_modules/d3-selection/src/selection/clone.js"() {
  }
});

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
var init_datum = __esm({
  "node_modules/d3-selection/src/selection/datum.js"() {
  }
});

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options2) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options2);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options2);
    o = { type: typename.type, name: typename.name, value, listener, options: options2 };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function on_default(typename, value, options2) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options2));
  return this;
}
var init_on = __esm({
  "node_modules/d3-selection/src/selection/on.js"() {
  }
});

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}
var init_dispatch2 = __esm({
  "node_modules/d3-selection/src/selection/dispatch.js"() {
    init_window();
  }
});

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        yield node;
    }
  }
}
var init_iterator = __esm({
  "node_modules/d3-selection/src/selection/iterator.js"() {
  }
});

// node_modules/d3-selection/src/selection/index.js
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
var root, selection_default;
var init_selection = __esm({
  "node_modules/d3-selection/src/selection/index.js"() {
    init_select();
    init_selectAll();
    init_selectChild();
    init_selectChildren();
    init_filter();
    init_data();
    init_enter();
    init_exit();
    init_join();
    init_merge();
    init_order();
    init_sort();
    init_call();
    init_nodes();
    init_node();
    init_size();
    init_empty();
    init_each();
    init_attr();
    init_style();
    init_property();
    init_classed();
    init_text();
    init_html();
    init_raise();
    init_lower();
    init_append();
    init_insert();
    init_remove();
    init_clone();
    init_datum();
    init_on();
    init_dispatch2();
    init_iterator();
    root = [null];
    Selection.prototype = selection.prototype = {
      constructor: Selection,
      select: select_default,
      selectAll: selectAll_default,
      selectChild: selectChild_default,
      selectChildren: selectChildren_default,
      filter: filter_default,
      data: data_default,
      enter: enter_default,
      exit: exit_default,
      join: join_default,
      merge: merge_default,
      selection: selection_selection,
      order: order_default,
      sort: sort_default,
      call: call_default,
      nodes: nodes_default,
      node: node_default,
      size: size_default,
      empty: empty_default,
      each: each_default,
      attr: attr_default,
      style: style_default,
      property: property_default,
      classed: classed_default,
      text: text_default,
      html: html_default,
      raise: raise_default,
      lower: lower_default,
      append: append_default,
      insert: insert_default,
      remove: remove_default,
      clone: clone_default,
      datum: datum_default,
      on: on_default,
      dispatch: dispatch_default2,
      [Symbol.iterator]: iterator_default
    };
    selection_default = selection;
  }
});

// node_modules/d3-selection/src/index.js
var init_src4 = __esm({
  "node_modules/d3-selection/src/index.js"() {
    init_matcher();
    init_namespace();
    init_selection();
    init_selector();
    init_selectorAll();
    init_style();
  }
});

// node_modules/d3-drag/src/index.js
var init_src5 = __esm({
  "node_modules/d3-drag/src/index.js"() {
  }
});

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key2 in definition)
    prototype[key2] = definition[key2];
  return prototype;
}
var init_define = __esm({
  "node_modules/d3-color/src/define.js"() {
  }
});

// node_modules/d3-color/src/color.js
function Color() {
}
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s2, l, a) {
  if (a <= 0)
    h = s2 = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s2 = NaN;
  else if (s2 <= 0)
    h = NaN;
  return new Hsl(h, s2, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s2 = max2 - min2, l = (max2 + min2) / 2;
  if (s2) {
    if (r === max2)
      h = (g - b) / s2 + (g < b) * 6;
    else if (g === max2)
      h = (b - r) / s2 + 2;
    else
      h = (r - g) / s2 + 4;
    s2 /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s2 = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s2, l, o.opacity);
}
function hsl(h, s2, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
var darker, brighter, reI, reN, reP, reHex, reRgbInteger, reRgbPercent, reRgbaInteger, reRgbaPercent, reHslPercent, reHslaPercent, named;
var init_color = __esm({
  "node_modules/d3-color/src/color.js"() {
    init_define();
    darker = 0.7;
    brighter = 1 / darker;
    reI = "\\s*([+-]?\\d+)\\s*";
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
    reHex = /^#([0-9a-f]{3,8})$/;
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
    named = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };
    define_default(Color, color, {
      copy(channels) {
        return Object.assign(new this.constructor(), this, channels);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHex8: color_formatHex8,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });
    define_default(Rgb, rgb, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
      },
      displayable() {
        return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatHex8: rgb_formatHex8,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));
    define_default(Hsl, hsl, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb() {
        var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      clamp() {
        return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
      },
      displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl() {
        const a = clampa(this.opacity);
        return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
      }
    }));
  }
});

// node_modules/d3-color/src/index.js
var init_src6 = __esm({
  "node_modules/d3-color/src/index.js"() {
    init_color();
  }
});

// node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t2 = t12 * t12, t3 = t2 * t12;
  return ((1 - 3 * t12 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t12 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var init_basis = __esm({
  "node_modules/d3-interpolate/src/basis.js"() {
  }
});

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var init_basisClosed = __esm({
  "node_modules/d3-interpolate/src/basisClosed.js"() {
    init_basis();
  }
});

// node_modules/d3-interpolate/src/constant.js
var constant_default2;
var init_constant2 = __esm({
  "node_modules/d3-interpolate/src/constant.js"() {
    constant_default2 = (x) => () => x;
  }
});

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}
var init_color2 = __esm({
  "node_modules/d3-interpolate/src/color.js"() {
    init_constant2();
  }
});

// node_modules/d3-interpolate/src/rgb.js
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgb_default, rgbBasis, rgbBasisClosed;
var init_rgb = __esm({
  "node_modules/d3-interpolate/src/rgb.js"() {
    init_src6();
    init_basis();
    init_basisClosed();
    init_color2();
    rgb_default = function rgbGamma(y) {
      var color2 = gamma(y);
      function rgb2(start2, end) {
        var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
        return function(t) {
          start2.r = r(t);
          start2.g = g(t);
          start2.b = b(t);
          start2.opacity = opacity(t);
          return start2 + "";
        };
      }
      rgb2.gamma = rgbGamma;
      return rgb2;
    }(1);
    rgbBasis = rgbSpline(basis_default);
    rgbBasisClosed = rgbSpline(basisClosed_default);
  }
});

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
var init_number = __esm({
  "node_modules/d3-interpolate/src/number.js"() {
  }
});

// node_modules/d3-interpolate/src/string.js
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s2[i])
        s2[i] += bs;
      else
        s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i])
        s2[i] += bm;
      else
        s2[++i] = bm;
    } else {
      s2[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s2[i])
      s2[i] += bs;
    else
      s2[++i] = bs;
  }
  return s2.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s2[(o = q[i2]).i] = o.x(t);
    return s2.join("");
  });
}
var reA, reB;
var init_string = __esm({
  "node_modules/d3-interpolate/src/string.js"() {
    init_number();
    reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    reB = new RegExp(reA.source, "g");
  }
});

// node_modules/d3-interpolate/src/transform/decompose.js
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b))
    a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d)
    c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d))
    c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c)
    a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var degrees, identity;
var init_decompose = __esm({
  "node_modules/d3-interpolate/src/transform/decompose.js"() {
    degrees = 180 / Math.PI;
    identity = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };
  }
});

// node_modules/d3-interpolate/src/transform/parse.js
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
var svgNode;
var init_parse2 = __esm({
  "node_modules/d3-interpolate/src/transform/parse.js"() {
    init_decompose();
  }
});

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse3, pxComma, pxParen, degParen) {
  function pop(s2) {
    return s2.length ? s2.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s2.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s2, q) {
    if (a !== b) {
      if (a - b > 180)
        b += 360;
      else if (b - a > 180)
        a += 360;
      q.push({ i: s2.push(pop(s2) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s2.push(pop(s2) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s2, q) {
    if (a !== b) {
      q.push({ i: s2.push(pop(s2) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s2.push(pop(s2) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push(pop(s2) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s2.push(pop(s2) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s2 = [], q = [];
    a = parse3(a), b = parse3(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s2, q);
    rotate(a.rotate, b.rotate, s2, q);
    skewX(a.skewX, b.skewX, s2, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s2, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s2[(o = q[i]).i] = o.x(t);
      return s2.join("");
    };
  };
}
var interpolateTransformCss, interpolateTransformSvg;
var init_transform = __esm({
  "node_modules/d3-interpolate/src/transform/index.js"() {
    init_number();
    init_parse2();
    interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
  }
});

// node_modules/d3-interpolate/src/index.js
var init_src7 = __esm({
  "node_modules/d3-interpolate/src/index.js"() {
    init_number();
    init_string();
    init_transform();
    init_rgb();
  }
});

// node_modules/d3-timer/src/timer.js
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t02, t12 = taskHead, t2, time = Infinity;
  while (t12) {
    if (t12._call) {
      if (time > t12._time)
        time = t12._time;
      t02 = t12, t12 = t12._next;
    } else {
      t2 = t12._next, t12._next = null;
      t12 = t02 ? t02._next = t2 : taskHead = t2;
    }
  }
  taskTail = t02;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
var frame, timeout, interval, pokeDelay, taskHead, taskTail, clockLast, clockNow, clockSkew, clock, setFrame;
var init_timer = __esm({
  "node_modules/d3-timer/src/timer.js"() {
    frame = 0;
    timeout = 0;
    interval = 0;
    pokeDelay = 1e3;
    clockLast = 0;
    clockNow = 0;
    clockSkew = 0;
    clock = typeof performance === "object" && performance.now ? performance : Date;
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
      setTimeout(f, 17);
    };
    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function")
          throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail)
            taskTail._next = this;
          else
            taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };
  }
});

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var init_timeout = __esm({
  "node_modules/d3-timer/src/timeout.js"() {
    init_timer();
  }
});

// node_modules/d3-timer/src/index.js
var init_src8 = __esm({
  "node_modules/d3-timer/src/index.js"() {
    init_timer();
    init_timeout();
  }
});

// node_modules/d3-transition/src/transition/schedule.js
function schedule_default(node, name, id2, index8, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index: index8,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed)
      start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING)
      return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}
var emptyOn, emptyTween, CREATED, SCHEDULED, STARTING, STARTED, RUNNING, ENDING, ENDED;
var init_schedule = __esm({
  "node_modules/d3-transition/src/transition/schedule.js"() {
    init_src3();
    init_src8();
    emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
    emptyTween = [];
    CREATED = 0;
    SCHEDULED = 1;
    STARTING = 2;
    STARTED = 3;
    RUNNING = 4;
    ENDING = 5;
    ENDED = 6;
  }
});

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}
var init_interrupt = __esm({
  "node_modules/d3-transition/src/interrupt.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}
var init_interrupt2 = __esm({
  "node_modules/d3-transition/src/selection/interrupt.js"() {
    init_interrupt();
  }
});

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}
var init_tween = __esm({
  "node_modules/d3-transition/src/transition/tween.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
var init_interpolate = __esm({
  "node_modules/d3-transition/src/transition/interpolate.js"() {
    init_src6();
    init_src7();
  }
});

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}
var init_attr2 = __esm({
  "node_modules/d3-transition/src/transition/attr.js"() {
    init_src7();
    init_src4();
    init_tween();
    init_interpolate();
  }
});

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t02 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t02 = (i0 = i) && attrInterpolate(name, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key2 = "attr." + name;
  if (arguments.length < 2)
    return (key2 = this.tween(key2)) && key2._value;
  if (value == null)
    return this.tween(key2, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key2, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
var init_attrTween = __esm({
  "node_modules/d3-transition/src/transition/attrTween.js"() {
    init_src4();
  }
});

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init2(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init2(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}
var init_delay = __esm({
  "node_modules/d3-transition/src/transition/delay.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}
var init_duration = __esm({
  "node_modules/d3-transition/src/transition/duration.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}
var init_ease = __esm({
  "node_modules/d3-transition/src/transition/ease.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}
var init_easeVarying = __esm({
  "node_modules/d3-transition/src/transition/easeVarying.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
var init_filter2 = __esm({
  "node_modules/d3-transition/src/transition/filter.js"() {
    init_src4();
    init_transition2();
  }
});

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
var init_merge2 = __esm({
  "node_modules/d3-transition/src/transition/merge.js"() {
    init_transition2();
  }
});

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init2 : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
var init_on2 = __esm({
  "node_modules/d3-transition/src/transition/on.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}
var init_remove2 = __esm({
  "node_modules/d3-transition/src/transition/remove.js"() {
  }
});

// node_modules/d3-transition/src/transition/select.js
function select_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
var init_select2 = __esm({
  "node_modules/d3-transition/src/transition/select.js"() {
    init_src4();
    init_transition2();
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var init_selectAll2 = __esm({
  "node_modules/d3-transition/src/transition/selectAll.js"() {
    init_src4();
    init_transition2();
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/selection.js
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}
var Selection2;
var init_selection2 = __esm({
  "node_modules/d3-transition/src/transition/selection.js"() {
    init_src4();
    Selection2 = selection_default.prototype.constructor;
  }
});

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key2 = "style." + name, event = "end." + key2, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key2] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}
var init_style2 = __esm({
  "node_modules/d3-transition/src/transition/style.js"() {
    init_src7();
    init_src4();
    init_schedule();
    init_tween();
    init_interpolate();
  }
});

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key2 = "style." + (name += "");
  if (arguments.length < 2)
    return (key2 = this.tween(key2)) && key2._value;
  if (value == null)
    return this.tween(key2, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key2, styleTween(name, value, priority == null ? "" : priority));
}
var init_styleTween = __esm({
  "node_modules/d3-transition/src/transition/styleTween.js"() {
  }
});

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}
var init_text2 = __esm({
  "node_modules/d3-transition/src/transition/text.js"() {
    init_tween();
  }
});

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t02 = (i0 = i) && textInterpolate(i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key2 = "text";
  if (arguments.length < 1)
    return (key2 = this.tween(key2)) && key2._value;
  if (value == null)
    return this.tween(key2, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key2, textTween(value));
}
var init_textTween = __esm({
  "node_modules/d3-transition/src/transition/textTween.js"() {
  }
});

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
var init_transition = __esm({
  "node_modules/d3-transition/src/transition/transition.js"() {
    init_transition2();
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}
var init_end = __esm({
  "node_modules/d3-transition/src/transition/end.js"() {
    init_schedule();
  }
});

// node_modules/d3-transition/src/transition/index.js
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var id, selection_prototype;
var init_transition2 = __esm({
  "node_modules/d3-transition/src/transition/index.js"() {
    init_src4();
    init_attr2();
    init_attrTween();
    init_delay();
    init_duration();
    init_ease();
    init_easeVarying();
    init_filter2();
    init_merge2();
    init_on2();
    init_remove2();
    init_select2();
    init_selectAll2();
    init_selection2();
    init_style2();
    init_styleTween();
    init_text2();
    init_textTween();
    init_transition();
    init_tween();
    init_end();
    id = 0;
    selection_prototype = selection_default.prototype;
    Transition.prototype = transition.prototype = {
      constructor: Transition,
      select: select_default2,
      selectAll: selectAll_default2,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: filter_default2,
      merge: merge_default2,
      selection: selection_default2,
      transition: transition_default,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: on_default2,
      attr: attr_default2,
      attrTween: attrTween_default,
      style: style_default2,
      styleTween: styleTween_default,
      text: text_default2,
      textTween: textTween_default,
      remove: remove_default2,
      tween: tween_default,
      delay: delay_default,
      duration: duration_default,
      ease: ease_default,
      easeVarying: easeVarying_default,
      end: end_default,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };
  }
});

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var init_cubic = __esm({
  "node_modules/d3-ease/src/cubic.js"() {
  }
});

// node_modules/d3-ease/src/index.js
var init_src9 = __esm({
  "node_modules/d3-ease/src/index.js"() {
    init_cubic();
  }
});

// node_modules/d3-transition/src/selection/transition.js
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
var defaultTiming;
var init_transition3 = __esm({
  "node_modules/d3-transition/src/selection/transition.js"() {
    init_transition2();
    init_schedule();
    init_src9();
    init_src8();
    defaultTiming = {
      time: null,
      // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };
  }
});

// node_modules/d3-transition/src/selection/index.js
var init_selection3 = __esm({
  "node_modules/d3-transition/src/selection/index.js"() {
    init_src4();
    init_interrupt2();
    init_transition3();
    selection_default.prototype.interrupt = interrupt_default2;
    selection_default.prototype.transition = transition_default2;
  }
});

// node_modules/d3-transition/src/index.js
var init_src10 = __esm({
  "node_modules/d3-transition/src/index.js"() {
    init_selection3();
  }
});

// node_modules/d3-brush/src/constant.js
var init_constant3 = __esm({
  "node_modules/d3-brush/src/constant.js"() {
  }
});

// node_modules/d3-brush/src/event.js
var init_event = __esm({
  "node_modules/d3-brush/src/event.js"() {
  }
});

// node_modules/d3-brush/src/noevent.js
var init_noevent = __esm({
  "node_modules/d3-brush/src/noevent.js"() {
  }
});

// node_modules/d3-brush/src/brush.js
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
function type(t) {
  return { type: t };
}
var abs, max, min, X, Y, XY;
var init_brush = __esm({
  "node_modules/d3-brush/src/brush.js"() {
    init_src10();
    init_constant3();
    init_event();
    init_noevent();
    ({ abs, max, min } = Math);
    X = {
      name: "x",
      handles: ["w", "e"].map(type),
      input: function(x, e) {
        return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
      },
      output: function(xy) {
        return xy && [xy[0][0], xy[1][0]];
      }
    };
    Y = {
      name: "y",
      handles: ["n", "s"].map(type),
      input: function(y, e) {
        return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
      },
      output: function(xy) {
        return xy && [xy[0][1], xy[1][1]];
      }
    };
    XY = {
      name: "xy",
      handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
      input: function(xy) {
        return xy == null ? null : number2(xy);
      },
      output: function(xy) {
        return xy;
      }
    };
  }
});

// node_modules/d3-brush/src/index.js
var init_src11 = __esm({
  "node_modules/d3-brush/src/index.js"() {
    init_brush();
  }
});

// node_modules/d3-path/src/index.js
var init_src12 = __esm({
  "node_modules/d3-path/src/index.js"() {
  }
});

// node_modules/d3-chord/src/index.js
var init_src13 = __esm({
  "node_modules/d3-chord/src/index.js"() {
  }
});

// node_modules/d3-contour/src/index.js
var init_src14 = __esm({
  "node_modules/d3-contour/src/index.js"() {
  }
});

// node_modules/d3-delaunay/src/index.js
var init_src15 = __esm({
  "node_modules/d3-delaunay/src/index.js"() {
  }
});

// node_modules/d3-dsv/src/index.js
var init_src16 = __esm({
  "node_modules/d3-dsv/src/index.js"() {
  }
});

// node_modules/d3-fetch/src/index.js
var init_src17 = __esm({
  "node_modules/d3-fetch/src/index.js"() {
  }
});

// node_modules/d3-quadtree/src/index.js
var init_src18 = __esm({
  "node_modules/d3-quadtree/src/index.js"() {
  }
});

// node_modules/d3-force/src/index.js
var init_src19 = __esm({
  "node_modules/d3-force/src/index.js"() {
  }
});

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}
var init_formatDecimal = __esm({
  "node_modules/d3-format/src/formatDecimal.js"() {
  }
});

// node_modules/d3-format/src/exponent.js
function exponent_default(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}
var init_exponent = __esm({
  "node_modules/d3-format/src/exponent.js"() {
    init_formatDecimal();
  }
});

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
var init_formatGroup = __esm({
  "node_modules/d3-format/src/formatGroup.js"() {
  }
});

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}
var init_formatNumerals = __esm({
  "node_modules/d3-format/src/formatNumerals.js"() {
  }
});

// node_modules/d3-format/src/formatSpecifier.js
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
var re;
var init_formatSpecifier = __esm({
  "node_modules/d3-format/src/formatSpecifier.js"() {
    re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    formatSpecifier.prototype = FormatSpecifier.prototype;
    FormatSpecifier.prototype.toString = function() {
      return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
    };
  }
});

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s2) {
  out:
    for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s2[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s2[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}
var init_formatTrim = __esm({
  "node_modules/d3-format/src/formatTrim.js"() {
  }
});

// node_modules/d3-format/src/formatPrefixAuto.js
function formatPrefixAuto_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d)
    return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}
var prefixExponent;
var init_formatPrefixAuto = __esm({
  "node_modules/d3-format/src/formatPrefixAuto.js"() {
    init_formatDecimal();
  }
});

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d)
    return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
var init_formatRounded = __esm({
  "node_modules/d3-format/src/formatRounded.js"() {
    init_formatDecimal();
  }
});

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default;
var init_formatTypes = __esm({
  "node_modules/d3-format/src/formatTypes.js"() {
    init_formatDecimal();
    init_formatPrefixAuto();
    init_formatRounded();
    formatTypes_default = {
      "%": (x, p) => (x * 100).toFixed(p),
      "b": (x) => Math.round(x).toString(2),
      "c": (x) => x + "",
      "d": formatDecimal_default,
      "e": (x, p) => x.toExponential(p),
      "f": (x, p) => x.toFixed(p),
      "g": (x, p) => x.toPrecision(p),
      "o": (x) => Math.round(x).toString(8),
      "p": (x, p) => formatRounded_default(x * 100, p),
      "r": formatRounded_default,
      "s": formatPrefixAuto_default,
      "X": (x) => Math.round(x).toString(16).toUpperCase(),
      "x": (x) => Math.round(x).toString(16)
    };
  }
});

// node_modules/d3-format/src/identity.js
function identity_default(x) {
  return x;
}
var init_identity = __esm({
  "node_modules/d3-format/src/identity.js"() {
  }
});

// node_modules/d3-format/src/locale.js
function locale_default(locale3) {
  var group = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "\u2212" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n")
      comma = true, type2 = "g";
    else if (!formatTypes_default[type2])
      precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var map, prefixes;
var init_locale = __esm({
  "node_modules/d3-format/src/locale.js"() {
    init_exponent();
    init_formatGroup();
    init_formatNumerals();
    init_formatSpecifier();
    init_formatTrim();
    init_formatTypes();
    init_formatPrefixAuto();
    init_identity();
    map = Array.prototype.map;
    prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  }
});

// node_modules/d3-format/src/defaultLocale.js
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}
var locale, format, formatPrefix;
var init_defaultLocale = __esm({
  "node_modules/d3-format/src/defaultLocale.js"() {
    init_locale();
    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });
  }
});

// node_modules/d3-format/src/index.js
var init_src20 = __esm({
  "node_modules/d3-format/src/index.js"() {
    init_defaultLocale();
  }
});

// node_modules/d3-geo/src/index.js
var init_src21 = __esm({
  "node_modules/d3-geo/src/index.js"() {
  }
});

// node_modules/d3-hierarchy/src/index.js
var init_src22 = __esm({
  "node_modules/d3-hierarchy/src/index.js"() {
  }
});

// node_modules/d3-polygon/src/index.js
var init_src23 = __esm({
  "node_modules/d3-polygon/src/index.js"() {
  }
});

// node_modules/d3-random/src/index.js
var init_src24 = __esm({
  "node_modules/d3-random/src/index.js"() {
  }
});

// node_modules/d3-time/src/interval.js
function timeInterval(floori, offseti, count, field) {
  function interval2(date) {
    return floori(date = arguments.length === 0 ? new Date() : new Date(+date)), date;
  }
  interval2.floor = (date) => {
    return floori(date = new Date(+date)), date;
  };
  interval2.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval2.round = (date) => {
    const d0 = interval2(date), d1 = interval2.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval2.offset = (date, step) => {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval2.range = (start2, stop, step) => {
    const range = [];
    start2 = interval2.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop) || !(step > 0))
      return range;
    let previous;
    do
      range.push(previous = new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop);
    return range;
  };
  interval2.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date)
        while (floori(date), !test(date))
          date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date, 1), !test(date)) {
            }
          }
      }
    });
  };
  if (count) {
    interval2.count = (start2, end) => {
      t0.setTime(+start2), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval2.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? (d) => field(d) % step === 0 : (d) => interval2.count(0, d) % step === 0);
    };
  }
  return interval2;
}
var t0, t1;
var init_interval = __esm({
  "node_modules/d3-time/src/interval.js"() {
    t0 = new Date();
    t1 = new Date();
  }
});

// node_modules/d3-time/src/duration.js
var durationSecond, durationMinute, durationHour, durationDay, durationWeek, durationMonth, durationYear;
var init_duration2 = __esm({
  "node_modules/d3-time/src/duration.js"() {
    durationSecond = 1e3;
    durationMinute = durationSecond * 60;
    durationHour = durationMinute * 60;
    durationDay = durationHour * 24;
    durationWeek = durationDay * 7;
    durationMonth = durationDay * 30;
    durationYear = durationDay * 365;
  }
});

// node_modules/d3-time/src/day.js
var timeDay, timeDays, utcDay, utcDays, unixDay, unixDays;
var init_day = __esm({
  "node_modules/d3-time/src/day.js"() {
    init_interval();
    init_duration2();
    timeDay = timeInterval(
      (date) => date.setHours(0, 0, 0, 0),
      (date, step) => date.setDate(date.getDate() + step),
      (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay,
      (date) => date.getDate() - 1
    );
    timeDays = timeDay.range;
    utcDay = timeInterval((date) => {
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCDate(date.getUTCDate() + step);
    }, (start2, end) => {
      return (end - start2) / durationDay;
    }, (date) => {
      return date.getUTCDate() - 1;
    });
    utcDays = utcDay.range;
    unixDay = timeInterval((date) => {
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCDate(date.getUTCDate() + step);
    }, (start2, end) => {
      return (end - start2) / durationDay;
    }, (date) => {
      return Math.floor(date / durationDay);
    });
    unixDays = unixDay.range;
  }
});

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start2, end) => {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start2, end) => {
    return (end - start2) / durationWeek;
  });
}
var timeSunday, timeMonday, timeTuesday, timeWednesday, timeThursday, timeFriday, timeSaturday, timeSundays, timeMondays, timeTuesdays, timeWednesdays, timeThursdays, timeFridays, timeSaturdays, utcSunday, utcMonday, utcTuesday, utcWednesday, utcThursday, utcFriday, utcSaturday, utcSundays, utcMondays, utcTuesdays, utcWednesdays, utcThursdays, utcFridays, utcSaturdays;
var init_week = __esm({
  "node_modules/d3-time/src/week.js"() {
    init_interval();
    init_duration2();
    timeSunday = timeWeekday(0);
    timeMonday = timeWeekday(1);
    timeTuesday = timeWeekday(2);
    timeWednesday = timeWeekday(3);
    timeThursday = timeWeekday(4);
    timeFriday = timeWeekday(5);
    timeSaturday = timeWeekday(6);
    timeSundays = timeSunday.range;
    timeMondays = timeMonday.range;
    timeTuesdays = timeTuesday.range;
    timeWednesdays = timeWednesday.range;
    timeThursdays = timeThursday.range;
    timeFridays = timeFriday.range;
    timeSaturdays = timeSaturday.range;
    utcSunday = utcWeekday(0);
    utcMonday = utcWeekday(1);
    utcTuesday = utcWeekday(2);
    utcWednesday = utcWeekday(3);
    utcThursday = utcWeekday(4);
    utcFriday = utcWeekday(5);
    utcSaturday = utcWeekday(6);
    utcSundays = utcSunday.range;
    utcMondays = utcMonday.range;
    utcTuesdays = utcTuesday.range;
    utcWednesdays = utcWednesday.range;
    utcThursdays = utcThursday.range;
    utcFridays = utcFriday.range;
    utcSaturdays = utcSaturday.range;
  }
});

// node_modules/d3-time/src/year.js
var timeYear, timeYears, utcYear, utcYears;
var init_year = __esm({
  "node_modules/d3-time/src/year.js"() {
    init_interval();
    timeYear = timeInterval((date) => {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setFullYear(date.getFullYear() + step);
    }, (start2, end) => {
      return end.getFullYear() - start2.getFullYear();
    }, (date) => {
      return date.getFullYear();
    });
    timeYear.every = (k) => {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
        date.setFullYear(Math.floor(date.getFullYear() / k) * k);
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
      }, (date, step) => {
        date.setFullYear(date.getFullYear() + step * k);
      });
    };
    timeYears = timeYear.range;
    utcYear = timeInterval((date) => {
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCFullYear(date.getUTCFullYear() + step);
    }, (start2, end) => {
      return end.getUTCFullYear() - start2.getUTCFullYear();
    }, (date) => {
      return date.getUTCFullYear();
    });
    utcYear.every = (k) => {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
      }, (date, step) => {
        date.setUTCFullYear(date.getUTCFullYear() + step * k);
      });
    };
    utcYears = utcYear.range;
  }
});

// node_modules/d3-time/src/index.js
var init_src25 = __esm({
  "node_modules/d3-time/src/index.js"() {
    init_day();
    init_week();
    init_year();
  }
});

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m, d) {
  return { y, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format2;
      if (!(date instanceof Date))
        date = new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c = specifier.charAt(++i)]) != null)
            c = specifier.charAt(++i);
          else
            pad2 = c === "e" ? " " : "0";
          if (format2 = formats2[c])
            c = format2(date, pad2);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d))
        d.Z = 0;
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0)
        d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c, parse3;
    while (i < n) {
      if (j >= m)
        return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse3 = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse3 || (j = parse3(d, string, j)) < 0)
          return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}
var pads, numberRe, percentRe, requoteRe;
var init_locale2 = __esm({
  "node_modules/d3-time-format/src/locale.js"() {
    init_src25();
    pads = { "-": "", "_": " ", "0": "0" };
    numberRe = /^\s*\d+/;
    percentRe = /^%/;
    requoteRe = /[\\^$*+?|[\]().{}]/g;
  }
});

// node_modules/d3-time-format/src/defaultLocale.js
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}
var locale2, timeFormat, timeParse, utcFormat, utcParse;
var init_defaultLocale2 = __esm({
  "node_modules/d3-time-format/src/defaultLocale.js"() {
    init_locale2();
    defaultLocale2({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
  }
});

// node_modules/d3-time-format/src/index.js
var init_src26 = __esm({
  "node_modules/d3-time-format/src/index.js"() {
    init_defaultLocale2();
  }
});

// node_modules/d3-scale/src/index.js
var init_src27 = __esm({
  "node_modules/d3-scale/src/index.js"() {
  }
});

// node_modules/d3-scale-chromatic/src/index.js
var init_src28 = __esm({
  "node_modules/d3-scale-chromatic/src/index.js"() {
  }
});

// node_modules/d3-shape/src/index.js
var init_src29 = __esm({
  "node_modules/d3-shape/src/index.js"() {
  }
});

// node_modules/d3-zoom/src/constant.js
var init_constant4 = __esm({
  "node_modules/d3-zoom/src/constant.js"() {
  }
});

// node_modules/d3-zoom/src/event.js
var init_event2 = __esm({
  "node_modules/d3-zoom/src/event.js"() {
  }
});

// node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity2;
  return node.__zoom;
}
var identity2;
var init_transform2 = __esm({
  "node_modules/d3-zoom/src/transform.js"() {
    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };
    identity2 = new Transform(1, 0, 0);
    transform.prototype = Transform.prototype;
  }
});

// node_modules/d3-zoom/src/noevent.js
var init_noevent2 = __esm({
  "node_modules/d3-zoom/src/noevent.js"() {
  }
});

// node_modules/d3-zoom/src/zoom.js
var init_zoom = __esm({
  "node_modules/d3-zoom/src/zoom.js"() {
    init_src10();
    init_constant4();
    init_event2();
    init_transform2();
    init_noevent2();
  }
});

// node_modules/d3-zoom/src/index.js
var init_src30 = __esm({
  "node_modules/d3-zoom/src/index.js"() {
    init_zoom();
    init_transform2();
  }
});

// node_modules/d3/src/index.js
var init_src31 = __esm({
  "node_modules/d3/src/index.js"() {
    init_src();
    init_src2();
    init_src11();
    init_src13();
    init_src6();
    init_src14();
    init_src15();
    init_src3();
    init_src5();
    init_src16();
    init_src9();
    init_src17();
    init_src19();
    init_src20();
    init_src21();
    init_src22();
    init_src7();
    init_src12();
    init_src23();
    init_src18();
    init_src24();
    init_src27();
    init_src28();
    init_src4();
    init_src29();
    init_src25();
    init_src26();
    init_src8();
    init_src10();
    init_src30();
  }
});

// .svelte-kit/output/server/chunks/Accordion.js
function dateObj(date, mask, utc) {
  date = date ? new Date(date) : /* @__PURE__ */ new Date();
  mask = mask ? mask : "DDD MMM dd YYYY HH:mm:ss";
  var MMMM = ["\0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MMM = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dddd = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ddd = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function ii(i, len) {
    var s22 = i + "";
    len = len || 2;
    while (s22.length < len)
      s22 = "0" + s22;
    return s22;
  }
  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  mask = mask.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  mask = mask.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  mask = mask.replace(/(^|[^\\])y/g, "$1" + y);
  var Y2 = utc ? date.getUTCFullYear() : date.getFullYear();
  mask = mask.replace(/(^|[^\\])YYYY+/g, "$1" + Y2);
  mask = mask.replace(/(^|[^\\])YY/g, "$1" + Y2.toString().substr(2, 2));
  mask = mask.replace(/(^|[^\\])Y/g, "$1" + Y2);
  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  mask = mask.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  mask = mask.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  mask = mask.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  mask = mask.replace(/(^|[^\\])M/g, "$1" + M);
  var d = utc ? date.getUTCDate() : date.getDate();
  mask = mask.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  mask = mask.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  mask = mask.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  mask = mask.replace(/(^|[^\\])d/g, "$1" + d);
  var D = utc ? date.getUTCDate() : date.getDate();
  mask = mask.replace(/(^|[^\\])DDDD+/g, "$1" + dddd[0]);
  mask = mask.replace(/(^|[^\\])DDD/g, "$1" + ddd[0]);
  mask = mask.replace(/(^|[^\\])DD/g, "$1" + ii(D));
  mask = mask.replace(/(^|[^\\])D/g, "$1" + D);
  var H = utc ? date.getUTCHours() : date.getHours();
  mask = mask.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  mask = mask.replace(/(^|[^\\])H/g, "$1" + H);
  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  mask = mask.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  mask = mask.replace(/(^|[^\\])h/g, "$1" + h);
  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  mask = mask.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  mask = mask.replace(/(^|[^\\])m/g, "$1" + m);
  var s2 = utc ? date.getUTCSeconds() : date.getSeconds();
  mask = mask.replace(/(^|[^\\])ss+/g, "$1" + ii(s2));
  mask = mask.replace(/(^|[^\\])s/g, "$1" + s2);
  var S = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  mask = mask.replace(/(^|[^\\])SSS+/g, "$1" + ii(S, 3));
  S = Math.round(S / 10);
  mask = mask.replace(/(^|[^\\])SS/g, "$1" + ii(S));
  S = Math.round(S / 10);
  mask = mask.replace(/(^|[^\\])S/g, "$1" + S);
  var A = H < 12 ? "AM" : "PM";
  mask = mask.replace(/(^|[^\\])AA+/g, "$1" + A);
  mask = mask.replace(/(^|[^\\])A/g, "$1" + A.charAt(0));
  var a = A.toLowerCase();
  mask = mask.replace(/(^|[^\\])aa+/g, "$1" + a);
  mask = mask.replace(/(^|[^\\])a/g, "$1" + a.charAt(0));
  var o = ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10];
  mask = mask.replace(/(^|[^\\])o+/g, "$1" + o);
  var timezone = /(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]d{4})?)/g;
  var timezoneClip = /[^-+dA-Z]/g;
  var Z = (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "");
  mask = mask.replace(/(^|[^\\])Z+/g, "$1" + Z);
  var tz = -date.getTimezoneOffset();
  var z = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    z += ii(tzHrs) + ":" + ii(tzMin);
  }
  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  mask = mask.replace(new RegExp(dddd[0], "g"), dddd[day]);
  mask = mask.replace(new RegExp(ddd[0], "g"), ddd[day]);
  mask = mask.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  mask = mask.replace(new RegExp(MMM[0], "g"), MMM[M]);
  mask = mask.replace(/\\(.)/g, "$1");
  return mask;
}
var css2, Accordion;
var init_Accordion = __esm({
  ".svelte-kit/output/server/chunks/Accordion.js"() {
    init_index2();
    css2 = {
      code: ".accordion.svelte-i0i27c{--radius:0;--header-font-size:inherit;--body-font-size:inherit;--seperator:none}.accordion.svelte-i0i27c:not(:last-of-type){border-bottom:1px solid #cccccc55}.header.svelte-i0i27c{padding:1rem 0;cursor:pointer}",
      map: null
    };
    Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { isOpen = false } = $$props;
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
        $$bindings.isOpen(isOpen);
      $$result.css.add(css2);
      return `<div class="accordion svelte-i0i27c"><div class="header svelte-i0i27c">${slots.header ? slots.header({}) : ``}</div>
	
	${isOpen ? `<div class="body svelte-i0i27c">${slots.default ? slots.default({}) : ``}</div>` : ``}
</div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function titlecase(value) {
  if (!value)
    return "";
  value = value.toString().toLowerCase();
  return value.replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase();
  });
}
function round(num, d = 0) {
  return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
}
function mmToInches(mm) {
  return mm / 25.4;
}
function makeStripe(icon) {
  let obj = { text: "clear", color: "#ECEFF1" };
  if (icon == 801) {
    obj.text = "clear";
    obj.color = "#ECEFF1";
  } else if (icon == 802) {
    obj.text = "partly cloudy";
    obj.color = "#CFD8DC";
  } else if (icon == 803) {
    obj.text = "mostly cloudy";
    obj.color = "#B0BEC5";
  } else if (icon == 804) {
    obj.text = "overcast";
    obj.color = "#90A4AE";
  } else if (icon > 700 && icon < 800) {
    obj.text = "overcast";
    obj.color = "#90A4AE";
  } else if (icon == 500 || icon == 520) {
    obj.text = "light rain";
    obj.color = "#BBDEFB";
  } else if (icon == 501 || icon == 521) {
    obj.text = "rain";
    obj.color = "#64B5F6";
  } else if (icon == 502 || icon == 503 || icon == 504 || icon == 522 || icon == 531) {
    obj.text = "heavy rain";
    obj.color = "#2196F3";
  } else if (icon == 511) {
    obj.text = "sleet";
    obj.color = "#E0F7FA";
  } else if (icon > 600 && icon < 700) {
    obj.text = "snow";
    obj.color = "#B2EBF2";
  }
  return obj;
}
function precipSymbol(code) {
  let symbol = "";
  if (code === 781) {
    symbol = `\u{1F32A}\uFE0F`;
  } else if (code === 511 || code > 610 && code < 617) {
    symbol = `\u{1F9CA}`;
  } else if (code >= 600 && code < 700) {
    symbol = `\u2744\uFE0F`;
  } else if (code >= 200 && code < 600) {
    symbol = `\u{1F4A7}`;
  }
  return symbol;
}
var css$6, WobbleChart, icons, css$5, WeatherIcon, css$4, Current, css$3, max_hours, Hours, css$2, RangeBar, css$12, Days, css3, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index2();
    init_src31();
    init_Accordion();
    css$6 = {
      code: "#chart.svelte-sajw82{min-width:300px}",
      map: null
    };
    WobbleChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { minutes } = $$props;
      minutes.map((el) => {
        return {
          time: el.dt * 1e3,
          value: el.precipitation
        };
      }).filter((el, i) => {
        return i % 3 === 0;
      });
      if ($$props.minutes === void 0 && $$bindings.minutes && minutes !== void 0)
        $$bindings.minutes(minutes);
      $$result.css.add(css$6);
      return `

<div id="chart" class="svelte-sajw82"></div>`;
    });
    icons = [
      {
        name: "clear-day",
        tag: "01d",
        defs: `<linearGradient id="gr-orb" x1="33" x2="39" y1="154.53" y2="160.53" gradientTransform="translate(-28.495 -165.22) scale(1.125)" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ff8f00" offset="0"/>
    <stop stop-color="#ffeb3b" offset="1"/>
  </linearGradient>`,
        path: `<g>
    <path class="corona" d="M5 12l2.473-1.875L7.05 7.05l3.075.423L12 5l1.875 2.473 3.075-.423-.423 3.075L19 12l-2.473 1.875.423 3.075-3.075-.423L12 19l-1.875-2.473-3.075.423.423-3.075z" fill="#ff6f00" />
    <circle class="orb" cx="12" cy="12" r="4.5" fill="url(#gr-orb)"/>
  </g>`
      },
      {
        name: "clear-night",
        tag: "01n",
        defs: `<linearGradient id="gr-moon" x1="14" x2="10" y1="169.53" y2="162.53" gradientTransform="matrix(1.25 0 0 1.25 -3 -194.91)" gradientUnits="userSpaceOnUse">
    <stop stop-color="#607d8b" offset="0"/>
    <stop stop-color="#cfd8dc" offset="1"/>
  </linearGradient>`,
        path: `<path class="moon" d="M11.924 7A5 5 0 007 12a5 5 0 005 5 5 5 0 005-5 5 5 0 000-.065 3.125 3.125 0 01-.625.065 3.125 3.125 0 01-3.125-3.125 3.125 3.125 0 01.432-1.582A5 5 0 0012 7a5 5 0 00-.076 0z" fill="url(#gr-moon)"/>`
      },
      {
        name: "cloudy",
        tag: ["04d", "04n"],
        defs: `<linearGradient id="gr-cloud">
    <stop stop-color="#90a4ae" offset="0"/>
    <stop stop-color="#eceff1" offset="1"/>
  </linearGradient>
  <linearGradient id="b-cloud" x1="8.836" x2="5.867" y1="181.03" y2="173.13" gradientTransform="translate(2.102 -167.06)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="c-cloud" x1="1.211" x2="5.211" y1="192.99" y2="185.39" gradientTransform="matrix(-1 0 0 1 11.211 -175.69)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="d-cloud" x1="4.898" x2="8.898" y1="173.06" y2="181.06" gradientTransform="rotate(180 9.45 93.534)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-cloud" x1="-10" x2="-6" y1="181.53" y2="189.53" gradientTransform="rotate(180 4 98.767)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="f-cloud" x1="-6.219" x2="-9.469" y1="189.41" y2="181.75" gradientTransform="translate(19 -174.53)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="g-cloud" x1=".804" x2="-2.506" y1="188.25" y2="181.02" gradientTransform="translate(13.79 -170.38)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>`,
        path: `<g>
    <path class="cloud" d="M9.49 6.001a2.504 2.504 0 00-1.81.793 2.506 2.506 0 00-1.824-.208 2.5 2.5 0 00-1.212 4.085c-.168.476-.187.99-.057 1.477a2.504 2.504 0 004.247 1.06 2.506 2.506 0 003.22-.768c1.681-.399 2.144-2.02 1.875-3.087-.25-.99-1.104-1.712-2.119-1.834a2.503 2.503 0 00-2.32-1.518z" fill="url(#b-cloud)"/>
    <path class="cloud" d="M9.518 9.564a2.5 2.5 0 012.437 2.968 2.5 2.5 0 01-2.628 4.238 2.5 2.5 0 01-4.124-.724 2.5 2.5 0 01-.245-4.923h.001a2.5 2.5 0 012.871-.918 2.5 2.5 0 011.688-.64z" fill="url(#c-cloud)"/>
    <path class="cloud" d="M11.51 14.001a2.504 2.504 0 001.81-.793 2.51 2.51 0 001.825.208 2.5 2.5 0 001.212-4.085c.168-.476.187-.99.057-1.477a2.504 2.504 0 00-4.247-1.06 2.506 2.506 0 00-3.22.768c-1.681.399-2.144 2.02-1.875 3.087.25.99 1.104 1.712 2.119 1.834a2.503 2.503 0 002.32 1.518z" fill="url(#d-cloud)"/>
    <path class="cloud" d="M16.596 8.003a2.501 2.501 0 00-1.922.791 2.5 2.5 0 00-3.133 3.76 2.499 2.499 0 003.633 2.654c.094.1.2.185.307.268a2.5 2.5 0 002.02 1.025 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-.047-.475A2.494 2.494 0 0018.5 9.001a2.5 2.5 0 00-1.904-.998z" fill="url(#e-cloud)"/>
    <path class="cloud" d="M9.983 7.001A2.5 2.5 0 007.52 9.202a2.5 2.5 0 00.98 4.8 2.5 2.5 0 003.826.206 2.5 2.5 0 003.133-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.527.208 2.5 2.5 0 00-1.843-.793z" fill="url(#f-cloud)"/>
    <path class="cloud" d="M12.483 10.001a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.565.544 1.001.976 1.396.514 1.783 2.016 2.13 3.086 1.872a2.24 2.24 0 00.527-.208A2.5 2.5 0 0017 15.501a2.5 2.5 0 00-2.387-4.337 2.5 2.5 0 00-2.13-1.163z" fill="url(#g-cloud)"/>
  </g>`
      },
      {
        name: "full-moon",
        tag: "01n",
        defs: `<linearGradient id="gr-moon" x1="14" x2="10" y1="16" y2="8" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#607d8b"/>
    <stop offset="1" stop-color="#cfd8dc"/>`,
        path: `<circle class="full-moon" cx="12" cy="12" r="5" fill="url(#gr-moon)"/>`
      },
      {
        name: "mostly-cloudy-day",
        tag: "03d",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-orb" x1="11" x2="17" y1="7" y2="13" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#ff8f00"/>
    <stop offset="1" stop-color="#ffeb3b"/>
  </linearGradient>
  <linearGradient id="b-m-c-day" x1="11" x2="7" y1="14" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-m-c-day" x1="10" x2="6" y1="17" y2="9" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="f-m-c-day" x1="16" x2="12" y1="18" y2="10" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="c-m-c-day" x1="18" x2="14" y1="15" y2="7" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>`,
        path: `<g class="mostly-cloudy-day">
    <path fill="url(#b-m-c-day)" d="M7.482 6.001a2.5 2.5 0 00-2.437 2.968 2.5 2.5 0 002.629 4.238 2.5 2.5 0 004.123-.724 2.5 2.5 0 00.245-4.923 2.5 2.5 0 00-2.871-.918A2.5 2.5 0 007.482 6z" class="cloud" />
    <path fill="url(#c-m-c-day)" d="M14.982 7a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 0013.5 14a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 0014.982 7z" class="cloud" />
    <g class="sun">
      <path fill="#ff6f00" d="M8 10l2.12-1.607-.363-2.636 2.636.363L14 4l1.607 2.12 2.636-.363-.363 2.636L20 10l-2.12 1.607.363 2.636-2.636-.363L14 16l-1.607-2.12-2.636.363.363-2.636z" class="corona" />
      <circle cx="14" cy="10" r="4" fill="url(#gr-orb)" class="orb" />
    </g>
    <path fill="url(#e-m-c-day)" d="M8.49 9a2.504 2.504 0 00-1.81.793 2.506 2.506 0 00-1.824-.208 2.5 2.5 0 00-1.213 4.086 2.504 2.504 0 004.19 2.536 2.506 2.506 0 003.221-.768c1.68-.398 2.144-2.019 1.875-3.086-.25-.99-1.104-1.712-2.12-1.834A2.503 2.503 0 008.49 9z" class="cloud" />
    <path fill="url(#f-m-c-day)" d="M13.483 10a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.566.543 1.002.975 1.396.515 1.783 2.017 2.13 3.087 1.872a2.24 2.24 0 00.526-.208A2.5 2.5 0 0018 15.5a2.5 2.5 0 00-2.388-4.337A2.5 2.5 0 0013.482 10z" class="cloud" />
  </g>`
      },
      {
        name: "mostly-cloudy-night",
        tag: "03n",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-moon" x1="14.5" x2="10.5" y1="14" y2="6" gradientTransform="translate(.5)" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#607d8b"/>
    <stop offset="1" stop-color="#cfd8dc"/>
  </linearGradient>
  <linearGradient id="b-m-c-night" x1="10.499" x2="6.5" y1="15" y2="7" gradientTransform="matrix(1.0003 0 0 1 .498 0)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-m-c-night" x1="10.5" x2="6.501" y1="18" y2="10" gradientTransform="matrix(1.0001 0 0 1 1.499 0)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="c-m-c-night" x1="17.503" x2="13.503" y1="17" y2="9" gradientTransform="matrix(1.0003 0 0 1.0006 -.506 -.006)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>`,
        path: `<g class="mostly-cloudy-night">
    <path fill="url(#b-m-c-night)" d="M7.982 7a2.5 2.5 0 00-2.464 2.201A2.5 2.5 0 006.5 14a2.5 2.5 0 003.827.207 2.5 2.5 0 003.133-3.76 2.5 2.5 0 00-3.107-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 007.982 7z" class="cloud" />
    <path fill="url(#c-m-c-night)" d="M15.488 9a2.505 2.506 0 00-1.81.793 2.507 2.508 0 00-1.825-.208 2.5 2.502 0 00-1.213 4.088 2.505 2.506 0 004.19 2.538 2.507 2.508 0 003.223-.768c1.68-.4 2.144-2.021 1.875-3.089-.25-.99-1.104-1.713-2.12-1.835a2.504 2.505 0 00-2.32-1.52z" class="cloud" />
    <path fill="url(#gr-moon)" d="M12.94 6A4 4 0 009 10a4 4 0 004 4 4 4 0 004-4 4 4 0 000-.053 2.5 2.5 0 01-.5.053A2.5 2.5 0 0114 7.5a2.5 2.5 0 01.346-1.266A4 4 0 0013 6a4 4 0 00-.06 0z" class="moon" />
    <path fill="url(#e-m-c-night)" d="M9.482 10A2.5 2.5 0 007.5 11a2.5 2.5 0 00-2.415 3.147c.152.565.543 1.001.975 1.396.515 1.783 2.017 2.13 3.087 1.872a2.24 2.24 0 00.526-.208A2.5 2.5 0 0014 15.5a2.5 2.5 0 00-2.388-4.337A2.5 2.5 0 009.482 10z" class="cloud" />
  </g>`
      },
      {
        name: "partly-cloudy-day",
        tag: "02d",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-orb" x1="11" x2="17" y1="7" y2="13" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#ff8f00"/>
    <stop offset="1" stop-color="#ffeb3b"/>
  </linearGradient>
  <linearGradient id="b-p-c-day" x1="9" x2="7" y1="15" y2="9" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="d-p-c-day" x1="12" x2="9" y1="18" y2="11" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>`,
        path: `<g class="partly-cloudy-day">
    <path fill="url(#b-p-c-day)" d="M6.987 9a1.875 1.875 0 00-1.848 1.65 1.875 1.875 0 00.736 3.6 1.875 1.875 0 002.87.155 1.875 1.875 0 002.349-2.82 1.875 1.875 0 00-2.725-1.99A1.875 1.875 0 006.987 9z" class="small-cloud" />
    <path fill="#ff6f00" d="M8 10l2.12-1.607-.363-2.636 2.636.363L14 4l1.607 2.12 2.636-.363-.363 2.636L20 10l-2.12 1.607.363 2.636-2.636-.363L14 16l-1.607-2.12-2.636.363.363-2.636z" class="corona" />
    <circle cx="14" cy="10" r="4" fill="url(#gr-orb)" class="orb" />
    <path fill="url(#d-p-c-day)" d="M10.035 11a2.285 2.285 0 00-1.784.875 2.29 2.29 0 00-.583.075c-1.2.313-1.913 1.512-1.59 2.68.136.494.488.875.877 1.22.463 1.56 1.815 1.864 2.778 1.638a2.02 2.02 0 00.474-.182c.567.59 1.423.829 2.226.62.983-.257 1.667-1.123 1.667-2.113a2.155 2.155 0 00.823-2.317c-.321-1.167-1.555-1.86-2.756-1.546a2.35 2.35 0 00-.216.068A2.266 2.266 0 0010.035 11z" class="cloud-small" />
  </g>`
      },
      {
        name: "partly-cloudy-night",
        tag: "02n",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="d-p-c-night" x1="12.828" x2="9.827" y1="18" y2="10.897" gradientTransform="translate(.171 .102) scale(1.0001)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="b-p-c-night" x1="10.501" x2="8.501" y1="15.103" y2="9.103" gradientTransform="translate(.499 -.103)" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="gr-moon" x1="16" x2="13" y1="14" y2="6" gradientTransform="translate(-.5 -.103)" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#607d8b"/>
    <stop offset="1" stop-color="#cfd8dc"/>
  </linearGradient>`,
        path: `<g>
    <path fill="url(#b-p-c-night)" d="M10.512 9a1.875 1.875 0 011.848 1.65 1.875 1.875 0 01-.736 3.6 1.875 1.875 0 01-2.87.155 1.875 1.875 0 01-2.349-2.82 1.875 1.875 0 012.725-1.99A1.875 1.875 0 0110.512 9z" class="small-cloud" />
    <path fill="url(#gr-moon)" d="M13.94 6A4 4 0 0010 10a4 4 0 004 4 4 4 0 004-4 4 4 0 000-.052 2.5 2.5 0 01-.5.052A2.5 2.5 0 0115 7.5a2.5 2.5 0 01.346-1.265A4 4 0 0014 6a4 4 0 00-.06 0z" class="moon" />
    <path fill="url(#d-p-c-night)" d="M10.133 11c-.191 0-.382.026-.566.074-1.138.297-1.848 1.397-1.627 2.522a2.156 2.156 0 00-.864 2.345c.322 1.167 1.556 1.86 2.756 1.546a2.31 2.31 0 00.474-.182c.567.59 1.423.83 2.226.62a2.232 2.232 0 001.486-1.254c.106-.012.21-.032.314-.059 1.2-.312 1.913-1.512 1.59-2.68a2.223 2.223 0 00-1.684-1.568 2.283 2.283 0 00-2.585-.803 2.287 2.287 0 00-1.52-.561z" class="small-cloud" />
  </g>`
      },
      {
        name: "rain",
        tag: "10d",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-rain">
    <stop offset="0" stop-color="#e3f1fc"/>
    <stop offset=".339" stop-color="#badefa"/>
    <stop offset="1" stop-color="#64b6f6"/>
  </linearGradient>
  <linearGradient id="e-rain-cloud" x1="13" x2="9" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="f-rain-cloud" x1="10" x2="6" y1="15.588" y2="7.636" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="g-rain-cloud" x1="18" x2="14" y1="14" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="i-rain-cloud" x1="15" x2="11" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <radialGradient id="h-rain-drop" cx="17.193" cy="13.847" r="1.5" gradientTransform="matrix(1 0 0 1.3333 0 -4.667)" gradientUnits="userSpaceOnUse" xlink:href="#gr-rain"/>
  <radialGradient id="d-rain-drop" cx="12.152" cy="17.77" r="1.5" gradientTransform="matrix(1 0 0 1.3333 0 -6)" gradientUnits="userSpaceOnUse" xlink:href="#gr-rain"/>
  <radialGradient id="c-rain-drop" cx="7.234" cy="15.877" r="1.5" gradientTransform="matrix(1 0 0 1.3333 0 -5.333)" gradientUnits="userSpaceOnUse" xlink:href="#gr-rain"/>`,
        path: `<g class="rain">
    <path fill="url(#c-rain-drop)" d="M9 16.4c0 .884-.672 1.6-1.5 1.6S6 17.284 6 16.4c0-.286.07-.554.193-.786C6.45 15.128 7.5 14 7.5 14s1.05 1.128 1.307 1.614c.123.232.193.5.193.786z" class="raindrop"/>
    <path fill="url(#d-rain-drop)" d="M14 18.4c0 .884-.672 1.6-1.5 1.6s-1.5-.716-1.5-1.6c0-.286.07-.554.193-.786C11.45 17.128 12.5 16 12.5 16s1.05 1.128 1.307 1.614c.123.232.193.5.193.786z" class="raindrop"/>
    <path fill="url(#e-rain-cloud)" d="M10.51 12a2.504 2.504 0 001.81-.793c.56.297 1.212.372 1.824.208a2.5 2.5 0 001.213-4.085c.167-.476.187-.99.057-1.477a2.503 2.503 0 00-4.247-1.06 2.506 2.506 0 00-3.22.768c-1.681.399-2.144 2.02-1.875 3.087.25.99 1.104 1.712 2.119 1.834A2.504 2.504 0 0010.51 12z" class="cloud"/>
    <path fill="url(#f-rain-cloud)" d="M9.518 7.57a2.5 2.5 0 012.437 2.968 2.5 2.5 0 01-2.629 4.239 2.5 2.5 0 01-4.123-.725 2.5 2.5 0 01-.245-4.923 2.5 2.5 0 012.871-.918 2.5 2.5 0 011.689-.641z" class="cloud"/>
    <path fill="url(#g-rain-cloud)" d="M17.018 14a2.5 2.5 0 002.463-2.201A2.5 2.5 0 0018.501 7a2.5 2.5 0 00-3.826-.207 2.5 2.5 0 00-3.133 3.76 2.5 2.5 0 003.106 2.862 2.5 2.5 0 00.527-.208 2.5 2.5 0 001.843.793z" class="cloud"/>
    <path fill="url(#h-rain-drop)" d="M19 14.4c0 .884-.672 1.6-1.5 1.6s-1.5-.716-1.5-1.6c0-.286.07-.554.193-.786C16.45 13.128 17.5 12 17.5 12s1.05 1.128 1.307 1.614c.123.232.193.5.193.786z" class="raindrop"/>
    <path fill="url(#i-rain-cloud)" d="M12.483 8a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.565.544 1.001.976 1.396.514 1.783 2.016 2.13 3.086 1.872a2.24 2.24 0 00.526-.208A2.5 2.5 0 0017 13.5a2.5 2.5 0 00-2.387-4.337A2.5 2.5 0 0012.483 8z" class="cloud"/>
  </g>`
      },
      {
        name: "drizzle",
        tag: "09d",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-rain">
    <stop offset="0" stop-color="#e3f1fc"/>
    <stop offset=".339" stop-color="#badefa"/>
    <stop offset="1" stop-color="#64b6f6"/>
  </linearGradient>
  <linearGradient id="d-driz-cloud" x1="10" x2="6" y1="15.415" y2="7.608" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="h-driz-cloud" x1="15" x2="11" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="c-driz-cloud" x1="13" x2="9" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-driz-cloud" x1="18" x2="14" y1="14" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <radialGradient id="g-drizz-drop" cx="9.226" cy="17.882" r="1.5" gradientTransform="matrix(1 0 0 1.3333 0 -6)" gradientUnits="userSpaceOnUse" xlink:href="#gr-rain"/>
  <radialGradient id="f-drizz-drop" cx="17.168" cy="13.838" r="1.5" gradientTransform="matrix(1 0 0 1.3333 0 -4.667)" gradientUnits="userSpaceOnUse" xlink:href="#gr-rain"/>`,
        path: `<g class="drizzle">
    <path fill="url(#c-driz-cloud)" d="M10.511 12.001a2.504 2.504 0 001.81-.793c.56.297 1.212.372 1.824.208a2.5 2.5 0 001.213-4.085c.167-.476.187-.99.057-1.477a2.503 2.503 0 00-4.247-1.06 2.506 2.506 0 00-3.22.768c-1.681.399-2.144 2.02-1.875 3.087.25.99 1.104 1.712 2.119 1.834a2.504 2.504 0 002.319 1.518z" class="cloud"/>
    <path fill="url(#d-driz-cloud)" d="M9.519 7.57a2.5 2.5 0 012.437 2.969 2.5 2.5 0 01-2.63 4.239 2.5 2.5 0 01-4.122-.725 2.5 2.5 0 01-.245-4.923 2.5 2.5 0 012.87-.918 2.5 2.5 0 011.69-.641z" class="cloud"/>
    <path fill="url(#e-driz-cloud)" d="M17.019 14.001a2.5 2.5 0 002.463-2.201 2.5 2.5 0 00-.98-4.799 2.5 2.5 0 00-3.826-.207 2.5 2.5 0 00-3.133 3.76 2.5 2.5 0 003.106 2.862 2.5 2.5 0 00.527-.208 2.5 2.5 0 001.843.793z" class="cloud"/>
    <path fill="url(#f-drizz-drop)" d="M19.001 14.401c0 .884-.672 1.6-1.5 1.6s-1.5-.716-1.5-1.6c0-.286.07-.554.193-.786.257-.486 1.307-1.614 1.307-1.614s1.05 1.128 1.307 1.614c.123.232.193.5.193.786z" class="raindrop"/>
    <path fill="url(#g-drizz-drop)" d="M11.001 18.401c0 .884-.672 1.6-1.5 1.6s-1.5-.716-1.5-1.6c0-.286.07-.554.193-.786.257-.486 1.307-1.614 1.307-1.614s1.05 1.128 1.307 1.614c.123.232.193.5.193.786z" class="raindrop"/>
    <path fill="url(#h-driz-cloud)" d="M12.484 8a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.148c.152.565.544 1 .976 1.396.514 1.783 2.016 2.13 3.086 1.872a2.24 2.24 0 00.526-.208 2.5 2.5 0 004.326-1.707 2.5 2.5 0 00-2.387-4.337A2.5 2.5 0 0012.484 8z" class="cloud"/>
  </g>`
      },
      {
        name: "snow",
        tag: "13d",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-snowflake">
    <stop offset="0" stop-color="#fff"/>
    <stop offset="1" stop-color="#c5ddf1"/>
  </linearGradient>
  <linearGradient id="j-snow-cloud" x1="10" x2="6" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="i-snow-cloud" x1="18" x2="14" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="h-snow-cloud" x1="16" x2="12" y1="14" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="f-snow-cloud" x1="16" x2="12" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="g-snow-cloud" x1="12" x2="8" y1="13" y2="5" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-snow-flake" x1="6.196" x2="7.438" y1="14.77" y2="17.287" gradientUnits="userSpaceOnUse" xlink:href="#gr-snowflake"/>
  <linearGradient id="d-snow-flake" x1="10.196" x2="11.568" y1="18.77" y2="21.369" gradientUnits="userSpaceOnUse" xlink:href="#gr-snowflake"/>
  <linearGradient id="c-snow-flake" x1="17.196" x2="18.409" y1="16.77" y2="19.316" gradientUnits="userSpaceOnUse" xlink:href="#gr-snowflake"/>`,
        path: `<g class="snow">
    <g class="snowflake" >
      <path fill="#64b5f6" d="M17.778 16a.355.355 0 00-.351.351v.07c-.046-.025-.09-.06-.141-.06a.322.322 0 00-.227.094c-.048.047-.06.112-.071.175-.06-.022-.123-.043-.189-.025a.325.325 0 00-.194.148.194.194 0 00-.001 0c-.026.045-.018.1-.02.153l-.06-.034a.353.353 0 00-.478.13.354.354 0 00.129.477l.06.035c-.045.028-.097.048-.123.093a.318.318 0 00-.03.242c.016.066.066.11.116.15-.05.04-.1.085-.118.15a.315.315 0 00.032.244c.027.046.078.066.123.094l-.059.034a.353.353 0 00-.13.478.353.353 0 00.478.128l.06-.034c.002.054-.004.109.022.153a.321.321 0 00.194.149c.065.017.127-.003.188-.026.01.063.023.129.07.176a.323.323 0 00.228.094c.05 0 .094-.034.14-.058v.068a.355.355 0 00.352.35.355.355 0 00.352-.35v-.069c.046.025.09.058.141.058a.322.322 0 00.227-.093c.047-.048.06-.113.07-.176.06.022.122.044.188.026a.32.32 0 00.194-.149.194.194 0 00.001-.001c.025-.043.018-.1.02-.152l.06.034a.354.354 0 00.478-.128.353.353 0 00-.13-.478l-.059-.034c.045-.028.097-.05.122-.094a.194.194 0 00.002-.001.32.32 0 00.03-.243c-.017-.065-.065-.11-.115-.151.048-.04.098-.084.116-.149a.315.315 0 00-.033-.243c-.026-.045-.077-.066-.122-.094l.06-.033a.353.353 0 00.129-.478.353.353 0 00-.479-.129l-.06.034c-.001-.053.005-.108-.02-.153a.321.321 0 00-.194-.148c-.066-.018-.128.003-.189.025-.01-.063-.022-.128-.07-.175a.324.324 0 00-.225-.095c-.05 0-.096.035-.142.058v-.067a.355.355 0 00-.352-.351zm-.511 1.116l.16.16v.118l-.102-.06zm1.02 0l-.057.218-.1.058v-.117zm-1.312.825l.101.058-.102.058-.217-.058zm1.607 0l.216.058-.218.058-.1-.058zm-1.155.666v.116l-.16.16.059-.216zm.703 0l.1.058.058.218-.158-.158z"/>
      <path fill="url(#c-snow-flake)" d="M17.778 16.194a.157.157 0 00-.157.158v.487l-.248-.247a.126.126 0 10-.177.178l.425.426v.532l-.462-.266-.155-.58a.126.126 0 10-.244.065l.09.337-.421-.244a.157.157 0 00-.216.058.156.156 0 00.058.214l.422.244-.337.09a.125.125 0 00-.076.058.127.127 0 00-.011.097.124.124 0 00.153.088l.58-.155.462.266-.462.267-.58-.156a.126.126 0 10-.066.243l.339.091-.422.244a.158.158 0 00-.06.215c.044.075.14.1.216.057l.422-.244-.09.337a.126.126 0 00.09.154.126.126 0 00.153-.089l.156-.579.461-.268v.533l-.425.425a.126.126 0 10.179.178l.246-.248v.49a.158.158 0 00.315-.001v-.487l.246.246a.126.126 0 10.178-.178l-.424-.424v-.534l.461.267.155.58a.126.126 0 10.244-.065l-.091-.337.422.244a.157.157 0 10.157-.272l-.422-.244.337-.09a.125.125 0 00.09-.155.126.126 0 00-.155-.09l-.58.157-.461-.267.462-.266.579.156a.126.126 0 10.065-.244l-.337-.09.422-.244a.156.156 0 00.058-.214.157.157 0 00-.215-.058l-.422.244.09-.337a.126.126 0 00-.09-.154.126.126 0 00-.153.088l-.156.581-.46.266v-.534l.423-.423a.126.126 0 00-.088-.215.126.126 0 00-.089.036l-.246.247v-.487a.157.157 0 00-.157-.158z"/>
    </g>
    <g class="snowflake" >
      <path fill="#64b5f6" d="M10.778 18a.355.355 0 00-.351.351v.07c-.046-.025-.09-.06-.141-.06a.322.322 0 00-.227.094c-.048.047-.06.112-.071.175-.06-.022-.123-.043-.189-.025a.325.325 0 00-.194.148.194.194 0 00-.001 0c-.025.045-.018.1-.02.153l-.06-.034a.353.353 0 00-.478.13.354.354 0 00.129.477l.06.035c-.044.028-.097.048-.123.093a.318.318 0 00-.03.242c.016.066.066.11.116.15-.05.04-.1.085-.118.15a.315.315 0 00.032.244c.027.046.079.066.123.094l-.059.034a.353.353 0 00-.13.478.353.353 0 00.478.128l.06-.034c.002.054-.004.109.022.153a.321.321 0 00.194.149c.065.017.127-.003.188-.026.01.063.023.129.07.176a.323.323 0 00.228.094c.05 0 .094-.034.141-.058v.068a.355.355 0 00.351.35.355.355 0 00.352-.35v-.069c.046.025.09.058.141.058a.322.322 0 00.227-.093c.047-.048.06-.113.07-.176.06.022.122.044.188.026a.32.32 0 00.194-.149.194.194 0 00.001-.001c.025-.043.018-.1.02-.152l.06.034a.354.354 0 00.478-.128.353.353 0 00-.129-.478l-.06-.034c.046-.028.097-.05.122-.094a.194.194 0 00.002-.001.32.32 0 00.031-.243c-.017-.065-.066-.11-.116-.151.049-.04.099-.084.116-.149a.315.315 0 00-.033-.243c-.026-.045-.076-.066-.121-.094l.06-.033a.353.353 0 00.128-.478.353.353 0 00-.478-.129l-.06.034c-.002-.053.004-.108-.022-.153a.321.321 0 00-.193-.148c-.066-.018-.128.003-.189.025-.01-.063-.022-.128-.07-.175a.324.324 0 00-.225-.095c-.05 0-.096.035-.142.058v-.067a.355.355 0 00-.352-.351zm-.511 1.116l.16.16v.118l-.102-.06zm1.02 0l-.057.218-.1.058v-.117zm-1.312.825l.101.058-.101.058L9.757 20zm1.607 0l.216.058-.218.058-.1-.058zm-1.155.666v.116l-.16.16.059-.216zm.703 0l.1.058.058.218-.158-.158z"/>
      <path fill="url(#d-snow-flake)" d="M10.778 18.194a.157.157 0 00-.157.158v.487l-.248-.247a.126.126 0 10-.177.178l.425.426v.532l-.462-.266-.155-.58a.126.126 0 10-.244.065l.09.337-.421-.244a.157.157 0 00-.216.058.156.156 0 00.058.214l.422.244-.337.09a.125.125 0 00-.076.058.127.127 0 00-.011.097.124.124 0 00.153.088l.58-.155.462.266-.462.267-.58-.156a.126.126 0 10-.066.243l.339.091-.422.244a.158.158 0 00-.06.215c.044.075.14.1.216.057l.422-.244-.09.337a.126.126 0 00.09.154.126.126 0 00.153-.089l.156-.579.461-.268v.533l-.425.425a.126.126 0 10.179.178l.246-.248v.49a.158.158 0 00.315-.001v-.487l.246.246a.126.126 0 10.178-.178l-.424-.424v-.534l.461.267.155.58a.126.126 0 10.244-.065l-.091-.337.422.244a.157.157 0 10.157-.272l-.422-.244.337-.09a.125.125 0 00.09-.155.126.126 0 00-.155-.09l-.58.157-.461-.267.462-.266.579.156a.126.126 0 10.065-.244l-.337-.09.422-.244a.156.156 0 00.058-.214.157.157 0 00-.215-.058l-.422.244.09-.337a.126.126 0 00-.09-.154.126.126 0 00-.153.088l-.156.581-.46.266v-.534l.423-.423a.126.126 0 00-.088-.215.126.126 0 00-.089.036l-.246.247v-.487a.157.157 0 00-.157-.158z"/>
    </g>
    <g class="snowflake" >
      <path fill="#64b5f6" d="M6.778 14a.355.355 0 00-.351.351v.07c-.046-.025-.09-.06-.141-.06a.322.322 0 00-.227.094c-.048.047-.06.112-.071.175-.06-.022-.123-.043-.189-.025a.325.325 0 00-.194.148.194.194 0 00-.001 0c-.025.045-.018.1-.02.153l-.06-.034a.353.353 0 00-.478.13.354.354 0 00.129.477l.06.035c-.044.028-.097.048-.123.093a.318.318 0 00-.03.242c.016.066.066.11.116.15-.05.04-.1.085-.118.15a.315.315 0 00.032.244c.027.046.079.066.123.094l-.059.034a.353.353 0 00-.13.478.353.353 0 00.478.128l.06-.034c.002.054-.004.109.022.153a.321.321 0 00.194.149c.065.017.127-.003.188-.026.01.063.023.129.07.176a.323.323 0 00.228.094c.05 0 .094-.034.141-.058v.068a.355.355 0 00.351.35.355.355 0 00.352-.35v-.069c.046.025.09.058.141.058a.322.322 0 00.227-.093c.047-.048.06-.113.07-.176.06.022.122.044.188.026a.32.32 0 00.194-.149.194.194 0 00.001-.001c.025-.043.018-.1.02-.152l.06.034A.354.354 0 008.508 17a.353.353 0 00-.129-.478l-.06-.034c.045-.028.097-.05.122-.094a.194.194 0 00.002-.001.32.32 0 00.031-.243c-.017-.065-.066-.11-.116-.151.049-.04.099-.084.116-.149a.315.315 0 00-.033-.243c-.026-.045-.077-.066-.121-.094l.059-.033A.353.353 0 008.51 15a.353.353 0 00-.48-.129l-.059.035c-.002-.054.004-.11-.022-.154a.321.321 0 00-.193-.148c-.066-.018-.128.003-.189.025-.01-.063-.022-.128-.07-.175a.324.324 0 00-.225-.095c-.05 0-.096.035-.142.058v-.067a.355.355 0 00-.352-.35zm-.511 1.116l.16.16v.118l-.102-.06zm1.02 0l-.057.218-.1.058v-.117zm-1.312.825l.101.058-.102.058L5.757 16zm1.607 0l.216.058-.218.058-.1-.058zm-1.155.666v.116l-.16.16.058-.216zm.703 0l.1.058.058.218-.158-.158z"/>
      <path fill="url(#e-snow-flake)" d="M6.778 14.194a.157.157 0 00-.157.158v.487l-.248-.247a.126.126 0 10-.177.178l.425.426v.532l-.462-.266-.155-.58a.126.126 0 10-.244.065l.09.337-.421-.244a.157.157 0 00-.216.058.156.156 0 00.058.214l.422.244-.337.09a.125.125 0 00-.076.058.127.127 0 00-.011.097.124.124 0 00.153.088l.58-.155.462.266-.462.267-.58-.156a.126.126 0 10-.066.243l.339.091-.422.244a.158.158 0 00-.06.215c.044.075.14.1.216.057l.422-.244-.09.337a.126.126 0 00.09.154.126.126 0 00.153-.089l.156-.579.461-.268v.533l-.425.425a.126.126 0 10.179.178l.246-.248v.49a.158.158 0 00.315-.001v-.487l.246.246a.126.126 0 10.178-.178l-.424-.424v-.534l.461.267.155.58a.126.126 0 10.244-.065l-.091-.337.422.244a.157.157 0 10.157-.272l-.422-.244.337-.09a.125.125 0 00.09-.155.126.126 0 00-.155-.09l-.58.157L7.093 16l.462-.266.579.156a.126.126 0 10.065-.244l-.337-.09.422-.244a.156.156 0 00.058-.214.157.157 0 00-.215-.058l-.422.244.09-.337a.126.126 0 00-.09-.154.126.126 0 00-.153.088l-.156.581-.46.266v-.534l.423-.423a.126.126 0 00-.088-.215.126.126 0 00-.089.036l-.246.247v-.487a.157.157 0 00-.157-.158z"/>
    </g>
    <path fill="url(#f-snow-cloud)" d="M12.482 4.001a2.5 2.5 0 00-2.437 2.968 2.5 2.5 0 002.629 4.238 2.5 2.5 0 004.123-.724 2.5 2.5 0 00.245-4.923 2.5 2.5 0 00-2.871-.918A2.5 2.5 0 0012.482 4z" class="cloud"/>
    <path fill="url(#g-snow-cloud)" d="M8.982 5a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 007.5 12a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 008.982 5z" class="cloud"/>
    <path fill="url(#h-snow-cloud)" d="M12.982 6a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 0011.5 13a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 0012.982 6z" class="cloud"/>
    <path fill="url(#i-snow-cloud)" d="M16.49 8a2.504 2.504 0 00-1.81.793 2.506 2.506 0 00-1.824-.208 2.5 2.5 0 00-1.213 4.086 2.504 2.504 0 004.19 2.536 2.506 2.506 0 003.221-.768c1.68-.398 2.144-2.019 1.875-3.086-.25-.99-1.104-1.712-2.12-1.834A2.503 2.503 0 0016.49 8z" class="cloud"/>
    <path fill="url(#j-snow-cloud)" d="M7.483 8a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.566.543 1.002.975 1.396.515 1.783 2.017 2.13 3.087 1.872a2.24 2.24 0 00.526-.208A2.5 2.5 0 0012 13.5a2.5 2.5 0 00-2.388-4.337A2.5 2.5 0 007.482 8z" class="cloud" />
  </g>`
      },
      {
        name: "flurries",
        tag: "",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-snowflake">
    <stop offset="0" stop-color="#fff"/>
    <stop offset="1" stop-color="#c5ddf1"/>
  </linearGradient>
  <linearGradient id="c-flurriescloud" x1="16" x2="12" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="d-flurriescloud" x1="12" x2="8" y1="13" y2="5" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-flurriescloud" x1="16" x2="12" y1="14" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="g-flurriescloud" x1="18" x2="14" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="h-flurriescloud" x1="10" x2="6" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="i-flurryflake" x1="8.988" x2="10.568" y1="17.63" y2="20.369" gradientUnits="userSpaceOnUse" xlink:href="#gr-snowflake"/>
  <linearGradient id="f-flurryflake" x1="17.196" x2="18.568" y1="13.77" y2="16.369" gradientUnits="userSpaceOnUse" xlink:href="#gr-snowflake"/>`,
        path: `<g class="flurries">
    <g class="snowflake" >
      <path fill="#64b5f6" d="M17.778 13a.355.355 0 00-.351.351v.07c-.046-.025-.09-.06-.141-.06a.322.322 0 00-.227.094c-.048.047-.06.112-.071.175-.06-.022-.123-.043-.189-.025a.325.325 0 00-.194.148.194.194 0 00-.001 0c-.026.045-.018.1-.02.153l-.06-.034a.353.353 0 00-.478.13.354.354 0 00.129.477l.06.035c-.045.028-.097.048-.123.093a.318.318 0 00-.03.242c.016.066.066.11.116.15-.05.04-.1.085-.118.15a.315.315 0 00.032.244c.027.046.078.066.123.094l-.059.034a.353.353 0 00-.13.478.353.353 0 00.478.128l.06-.034c.002.054-.004.109.022.153a.321.321 0 00.194.149c.065.017.127-.003.188-.026.01.063.023.129.07.176a.323.323 0 00.228.094c.05 0 .094-.034.14-.058v.068a.355.355 0 00.352.35.355.355 0 00.352-.35v-.069c.046.025.09.058.141.058a.322.322 0 00.227-.093c.047-.048.06-.113.07-.176.06.022.122.044.188.026a.32.32 0 00.194-.149.194.194 0 00.001-.001c.025-.043.018-.1.02-.152l.06.034a.354.354 0 00.478-.128.353.353 0 00-.13-.478l-.059-.034c.045-.028.097-.05.122-.094a.194.194 0 00.002-.001.32.32 0 00.03-.243c-.017-.065-.065-.11-.115-.151.048-.04.098-.084.116-.149a.315.315 0 00-.033-.243c-.026-.045-.077-.066-.122-.094l.06-.033a.353.353 0 00.129-.478.353.353 0 00-.479-.129l-.06.034c-.001-.053.005-.108-.02-.153a.321.321 0 00-.194-.148c-.066-.018-.128.003-.189.025-.01-.063-.022-.128-.07-.175a.324.324 0 00-.225-.095c-.05 0-.096.035-.142.058v-.067a.355.355 0 00-.352-.351zm-.511 1.116l.16.16v.118l-.102-.06zm1.02 0l-.057.218-.1.058v-.117zm-1.312.825l.101.058-.102.058-.217-.058zm1.607 0l.216.058-.218.058-.1-.058zm-1.155.666v.116l-.16.16.059-.216zm.703 0l.1.058.058.218-.158-.158z"/>
      <path fill="url(#f-flurryflake)" d="M17.778 13.194a.157.157 0 00-.157.158v.487l-.248-.247a.126.126 0 10-.177.178l.425.426v.532l-.462-.266-.155-.58a.126.126 0 10-.244.065l.09.337-.421-.244a.157.157 0 00-.216.058.156.156 0 00.058.214l.422.244-.337.09a.125.125 0 00-.076.058.127.127 0 00-.011.097.124.124 0 00.153.088l.58-.155.462.266-.462.267-.58-.156a.126.126 0 10-.066.243l.339.091-.422.244a.158.158 0 00-.06.215c.044.075.14.1.216.057l.422-.244-.09.337a.126.126 0 00.09.154.126.126 0 00.153-.089l.156-.579.461-.268v.533l-.425.425a.126.126 0 10.179.178l.246-.248v.49a.157.157 0 00.315-.001v-.487l.246.246a.126.126 0 10.178-.178l-.424-.424v-.534l.461.267.155.58a.126.126 0 10.244-.065l-.091-.337.422.244a.157.157 0 10.157-.272l-.422-.244.337-.09a.125.125 0 00.09-.155.126.126 0 00-.155-.09l-.58.157-.461-.267.462-.266.579.156a.126.126 0 10.065-.244l-.337-.09.422-.244a.156.156 0 00.058-.214.157.157 0 00-.215-.058l-.422.244.09-.337a.126.126 0 00-.09-.154.126.126 0 00-.153.088l-.156.581-.46.266v-.534l.423-.423a.126.126 0 00-.088-.215.126.126 0 00-.089.036l-.246.247v-.487a.157.157 0 00-.157-.158z"/>
    </g>		
    <g class="snowflake">
      <path fill="#64b5f6" d="M9.778 17a.355.355 0 00-.351.351v.07c-.046-.025-.09-.06-.141-.06a.322.322 0 00-.227.094c-.048.047-.06.112-.071.175-.06-.022-.123-.043-.189-.025a.325.325 0 00-.194.148.194.194 0 00-.001 0c-.025.045-.018.1-.02.153l-.06-.034a.353.353 0 00-.478.13.354.354 0 00.129.477l.06.035c-.044.028-.097.048-.123.093a.318.318 0 00-.03.242c.016.066.066.11.116.15-.05.04-.1.085-.118.15a.315.315 0 00.032.244c.027.046.079.066.123.094l-.059.034a.353.353 0 00-.13.478.353.353 0 00.478.128l.06-.034c.002.054-.004.109.022.153a.321.321 0 00.194.149c.065.017.127-.003.188-.026.01.063.023.129.07.176a.323.323 0 00.228.094c.05 0 .094-.034.141-.058v.068a.355.355 0 00.351.35.355.355 0 00.352-.35v-.069c.046.025.09.058.141.058a.322.322 0 00.227-.093c.047-.048.06-.113.07-.176.06.022.122.044.188.026a.32.32 0 00.194-.149.194.194 0 00.001-.001c.025-.043.018-.1.02-.152l.06.034a.354.354 0 00.478-.128.353.353 0 00-.129-.478l-.06-.034c.046-.028.097-.05.122-.094a.194.194 0 00.002-.001.32.32 0 00.031-.243c-.017-.065-.066-.11-.116-.151.049-.04.099-.084.116-.149a.315.315 0 00-.033-.243c-.026-.045-.076-.066-.121-.094l.06-.033a.353.353 0 00.128-.478.353.353 0 00-.478-.129l-.06.034c-.002-.053.004-.108-.022-.153a.321.321 0 00-.193-.148c-.066-.018-.128.003-.189.025-.01-.063-.022-.128-.07-.175a.324.324 0 00-.225-.095c-.05 0-.096.035-.142.058v-.067A.355.355 0 009.778 17zm-.511 1.116l.16.16v.118l-.102-.06zm1.02 0l-.057.218-.1.058v-.117zm-1.312.825l.101.058-.101.058L8.757 19zm1.607 0l.216.058-.218.058-.1-.058zm-1.155.666v.116l-.16.16.058-.216zm.703 0l.1.058.058.218-.158-.158z"/>
      <path fill="url(#i-flurryflake)" d="M9.778 17.194a.157.157 0 00-.157.158v.487l-.248-.247a.126.126 0 10-.177.178l.425.426v.532l-.462-.266-.155-.58a.126.126 0 10-.244.065l.09.337-.421-.244a.157.157 0 00-.216.058.156.156 0 00.058.214l.422.244-.337.09a.125.125 0 00-.076.058.127.127 0 00-.011.097.124.124 0 00.153.088l.58-.155.462.266-.462.267-.58-.156a.126.126 0 10-.066.243l.339.091-.422.244a.158.158 0 00-.06.215c.044.075.14.1.216.057l.422-.244-.09.337a.126.126 0 00.09.154.126.126 0 00.153-.089l.156-.579.461-.268v.533l-.425.425a.126.126 0 10.179.178l.246-.248v.49a.157.157 0 00.315-.001v-.487l.246.246a.126.126 0 10.178-.178l-.424-.424v-.534l.461.267.155.58a.126.126 0 10.244-.065l-.091-.337.422.244a.157.157 0 10.157-.272l-.422-.244.337-.09a.125.125 0 00.09-.155.126.126 0 00-.155-.09l-.58.157-.461-.267.462-.266.579.156a.126.126 0 10.065-.244l-.337-.09.422-.244a.156.156 0 00.058-.214.157.157 0 00-.215-.058l-.422.244.09-.337a.126.126 0 00-.09-.154.126.126 0 00-.153.088l-.156.581-.46.266v-.534l.423-.423a.126.126 0 00-.088-.215.126.126 0 00-.089.036l-.246.247v-.487a.157.157 0 00-.157-.158z"/>
    </g>		
		<path fill="url(#c-flurriescloud)" d="M12.482 4.001a2.5 2.5 0 00-2.437 2.968 2.5 2.5 0 002.629 4.238 2.5 2.5 0 004.123-.724 2.5 2.5 0 00.245-4.923 2.5 2.5 0 00-2.871-.918A2.5 2.5 0 0012.482 4z" class="cloud" />		
      <path fill="url(#d-flurriescloud)" d="M8.982 5a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 007.5 12a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 008.982 5z" class="cloud" />			
      <path fill="url(#e-flurriescloud)" d="M12.982 6a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 0011.5 13a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 0012.982 6z" class="cloud" />			
    <path fill="url(#g-flurriescloud)" d="M16.49 8a2.504 2.504 0 00-1.81.793 2.506 2.506 0 00-1.824-.208 2.5 2.5 0 00-1.213 4.086 2.504 2.504 0 004.19 2.536 2.506 2.506 0 003.221-.768c1.68-.398 2.144-2.019 1.875-3.086-.25-.99-1.104-1.712-2.12-1.834A2.503 2.503 0 0016.49 8z" class="cloud" />		
    <path fill="url(#h-flurriescloud)" d="M7.483 8a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.566.543 1.002.975 1.396.515 1.783 2.017 2.13 3.087 1.872a2.24 2.24 0 00.526-.208A2.5 2.5 0 0012 13.5a2.5 2.5 0 00-2.388-4.337A2.5 2.5 0 007.482 8z" class="cloud" />			
  </g>`
      },
      {
        name: "sleet",
        weatherCode: [],
        tag: "",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-ice">
    <stop offset="0" stop-color="#e3f1fc"/>
    <stop offset=".339" stop-color="#badefa"/>
    <stop offset="1" stop-color="#64b6f6"/>
  </linearGradient>
  <linearGradient id="c-pellet-shell" x2="3" y2="3" gradientTransform="translate(6 16)" gradientUnits="userSpaceOnUse" xlink:href="#gr-ice"/>
  <linearGradient id="i" x1="18" x2="14" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e" x1="17" x2="13" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="f" x1="12" x2="8" y1="13" y2="5" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="g" x1="10" x2="6" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="h" x1="15" x2="11" y1="14" y2="6.299" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="d-pellet-core" x2="3" y2="3" gradientTransform="translate(-8.65 -18.65) scale(.76667)" gradientUnits="userSpaceOnUse" xlink:href="#gr-ice"/>`,
        path: `<g  class="pellet" transform="translate(5 2)">
    <circle cx="7.5" cy="17.5" r="1.5" fill="url(#c-pellet-shell)"/>
    <circle cx="-7.5" cy="-17.5" r="1.15" fill="url(#d-pellet-core)" transform="scale(-1)"/>
  </g>
  <g  class="pellet" transform="translate(10 -1)">
    <circle cx="7.5" cy="17.5" r="1.5" fill="url(#c-pellet-shell)"/>
    <circle cx="-7.5" cy="-17.5" r="1.15" fill="url(#d-pellet-core)" transform="scale(-1)"/>
  </g>
  <g  class="pellet" >
    <circle cx="7.5" cy="17.5" r="1.5" fill="url(#c-pellet-shell)"/>
    <circle cx="-7.5" cy="-17.5" r="1.15" fill="url(#d-pellet-core)" transform="scale(-1)"/>
  </g>
    <path fill="url(#e)" d="M14.483 4a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.566.543 1.002.975 1.396.515 1.783 2.017 2.13 3.087 1.872a2.24 2.24 0 00.526-.208A2.5 2.5 0 0019 9.5a2.5 2.5 0 00-2.388-4.337A2.5 2.5 0 0014.482 4z"/>
    <path fill="url(#f)" d="M8.482 5.001a2.5 2.5 0 00-2.437 2.968 2.5 2.5 0 002.629 4.238 2.5 2.5 0 004.123-.724 2.5 2.5 0 00.245-4.923 2.5 2.5 0 00-2.871-.918A2.5 2.5 0 008.482 5z"/>
    <path fill="url(#g)" d="M6.982 8a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 005.5 15a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 006.982 8z"/>
    <path fill="url(#h)" d="M11.982 6a2.5 2.5 0 00-2.463 2.201A2.5 2.5 0 0010.5 13a2.5 2.5 0 003.826.207 2.5 2.5 0 003.132-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.526.208A2.5 2.5 0 0011.982 6z"/>
    <path fill="url(#i)" d="M16.49 8a2.504 2.504 0 00-1.81.793 2.506 2.506 0 00-1.824-.208 2.5 2.5 0 00-1.213 4.086 2.504 2.504 0 004.19 2.536 2.506 2.506 0 003.221-.768c1.68-.398 2.144-2.019 1.875-3.086-.25-.99-1.104-1.712-2.12-1.834A2.503 2.503 0 0016.49 8z"/>`
      },
      {
        name: "thunderstorm",
        weatherCode: [],
        tag: "11d",
        defs: `<linearGradient id="gr-stormcloud">
    <stop offset="0" stop-color="#546e7a"/>
    <stop offset="1" stop-color="#cfd8dc"/>
  </linearGradient>
  <linearGradient id="c-stormcloud" x1="10" x2="6" y1="15.582" y2="7.63" gradientUnits="userSpaceOnUse" xlink:href="#gr-stormcloud"/>
  <linearGradient id="f-stormcloud" x1="13" x2="9" y1="13" y2="5" gradientUnits="userSpaceOnUse" xlink:href="#gr-stormcloud"/>
  <linearGradient id="e-stormcloud" x1="18" x2="14" y1="14.4" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-stormcloud"/>
  <linearGradient id="g-stormcloud" x1="15" x2="11" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-stormcloud"/>
  <linearGradient id="d-stormcloud" x1="14" x2="10" y1="13" y2="5" gradientUnits="userSpaceOnUse" xlink:href="#gr-stormcloud"/>
  <linearGradient id="gr-lightning" x1="11" x2="10" y1="15" y2="19" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#e65100"/>
    <stop offset="1" stop-color="#ffc107"/>
  </linearGradient>`,
        path: `<g class="thunderstorm">
    <path fill="#78909c" d="M9.952 12A2 2 0 008 14a2 2 0 002 2 2 2 0 001.5-.68A2 2 0 0013 16a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-1.5.68A2 2 0 0010 12a2 2 0 00-.048 0z" class="notcloud" />
    <path fill="url(#gr-lightning)" d="M12.756 13L8 17h1.25l-1.005 4L13 17h-1.25z" class="bolt" />
    <path fill="url(#c-stormcloud)" d="M9.518 7.563a2.5 2.5 0 012.437 2.968 2.5 2.5 0 01-2.628 4.239 2.5 2.5 0 01-4.124-.725 2.5 2.5 0 01-.245-4.923h.001a2.5 2.5 0 012.871-.918 2.5 2.5 0 011.688-.641z" class="stormcloud" />
    <path fill="url(#d-stormcloud)" d="M11.51 13a2.504 2.504 0 001.81-.793c.56.298 1.212.372 1.825.208a2.5 2.5 0 001.212-4.085c.167-.475.187-.99.057-1.476a2.504 2.504 0 00-4.247-1.06 2.506 2.506 0 00-3.22.768c-1.681.398-2.144 2.019-1.875 3.086.25.99 1.104 1.712 2.119 1.834A2.503 2.503 0 0011.511 13z" class="stormcloud" />
    <path fill="url(#e-stormcloud)" d="M16.597 6.002a2.502 2.502 0 00-1.922.791 2.5 2.5 0 00-3.133 3.76 2.5 2.5 0 003.633 2.654c.093.1.2.185.306.268a2.5 2.5 0 002.02 1.025 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-.047-.474A2.494 2.494 0 0018.501 7a2.501 2.501 0 00-1.904-.998z" class="stormcloud" />
    <path fill="url(#f-stormcloud)" d="M9.983 5A2.5 2.5 0 007.52 7.201 2.5 2.5 0 008.5 12a2.5 2.5 0 003.826.207 2.5 2.5 0 003.133-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.527.208A2.5 2.5 0 009.983 5z" class="stormcloud" />
    <path fill="url(#g-stormcloud)" d="M12.483 8a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.566.544 1.002.976 1.396.514 1.783 2.016 2.13 3.086 1.872a2.24 2.24 0 00.527-.208A2.5 2.5 0 0017 13.5a2.5 2.5 0 00-2.387-4.337A2.5 2.5 0 0012.483 8z" class="stormcloud" />
  </g>`
      },
      {
        name: "wind",
        weatherCode: [],
        tag: "",
        defs: `<linearGradient id="gr-metal">
    <stop offset="0" stop-color="#cfd8dc"/>
    <stop offset="1" stop-color="#607d8b"/>
  </linearGradient>
  <linearGradient id="b-windmill" x1="10" x2="13" y1="17" y2="17" gradientUnits="userSpaceOnUse" xlink:href="#gr-metal"/>
  <linearGradient id="c-windmill" x1="9" x2="12" y1="8" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-metal"/>
  <linearGradient id="d-windmill" x1="9" x2="12" y1="8" y2="8" gradientTransform="rotate(240 12 12)" gradientUnits="userSpaceOnUse" xlink:href="#gr-metal"/>
  <linearGradient id="e-windmill" x1="9" x2="12" y1="8" y2="8" gradientTransform="rotate(120 12 12)" gradientUnits="userSpaceOnUse" xlink:href="#gr-metal"/>`,
        path: `<g class="wind">
    <path fill="url(#b-windmill)" d="M12 11a1 1 0 00-1 1 1 1 0 00.525.879C11.19 15.594 11 20.43 11 21.5c0 .277.223.5.5.5h1c.277 0 .5-.223.5-.5 0-1.069-.19-5.906-.525-8.621A1 1 0 0013 12a1 1 0 00-1-1z" class="tower" />
    
    <g class="rotor">
      <path fill="url(#c-windmill)" d="M11.558 2h-.009a.728.728 0 00-.7.528L9.277 8.03c-.165.578.134 1.172.47 1.6C10.09 10.07 11 11 12 11V2.442A.442.442 0 0011.558 2z" class="blade" />
      <path fill="url(#d-windmill)" d="M3.56 17.383l.005.008a.728.728 0 00.807.342l5.551-1.39c.583-.146.948-.702 1.151-1.207.21-.517.56-1.77.06-2.636l-7.411 4.28a.442.442 0 00-.162.603z" class="blade" />
      <path fill="url(#e-windmill)" d="M20.881 16.617l.004-.008a.728.728 0 00-.107-.87L16.8 11.627c-.418-.432-1.082-.47-1.62-.393-.553.077-1.813.4-2.313 1.266l7.411 4.279a.442.442 0 00.604-.162z" class="blade" />
      <animateTransform attributeType="xml" 
				attributeName="transform" type="rotate" 
				from="0 12 12" to="360 12 12" 
				dur="12s" repeatCount="indefinite"/>
    </g>
  </g>`
      },
      {
        name: "fog",
        weatherCode: [2e3],
        tag: "50d",
        defs: `<linearGradient id="gr-cloud">
    <stop offset="0" stop-color="#90a4ae"/>
    <stop offset="1" stop-color="#eceff1"/>
  </linearGradient>
  <linearGradient id="gr-fog">
    <stop offset="0" stop-color="#cfd8dc"/>
    <stop offset=".333" stop-color="#cfd8dc" stop-opacity=".867"/>
    <stop offset="1" stop-color="#cfd8dc" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="b-fogcloud" x1="10.055" x2="6.011" y1="15.536" y2="7.668" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="a-fogcloud" x1="11" x2="7" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="c-fogcloud" x1="14" x2="10" y1="12" y2="4" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="e-fogcloud" x1="13" x2="9" y1="13" y2="5" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="d-fogcloud" x1="18" x2="14" y1="14" y2="6" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <linearGradient id="f-fogcloud" x1="15" x2="11" y1="16" y2="8" gradientUnits="userSpaceOnUse" xlink:href="#gr-cloud"/>
  <radialGradient id="j-fog" cx="12" cy="14" r="12" gradientTransform="matrix(1 0 0 .33333 0 9.333)" gradientUnits="userSpaceOnUse" xlink:href="#gr-fog"/>
  <radialGradient id="i-fog" cx="12" cy="16" r="12" gradientTransform="matrix(1 0 0 .5 0 8)" gradientUnits="userSpaceOnUse" xlink:href="#gr-fog"/>`,
        path: `<g class="fogclouds">
    <path fill="url(#a-fogcloud)" d="M9.49 4a2.504 2.504 0 00-1.81.793 2.506 2.506 0 00-1.824-.208 2.5 2.5 0 00-1.212 4.086c-.168.475-.187.99-.057 1.476a2.504 2.504 0 004.247 1.06 2.506 2.506 0 003.22-.768c1.681-.398 2.144-2.019 1.875-3.087-.25-.99-1.104-1.71-2.119-1.833A2.503 2.503 0 009.49 4z" class="cloud" />
    <path fill="url(#b-fogcloud)" d="M9.518 7.563a2.5 2.5 0 012.437 2.968 2.5 2.5 0 01-2.628 4.24 2.5 2.5 0 01-4.124-.726 2.5 2.5 0 01-.245-4.923h.001a2.5 2.5 0 012.871-.918 2.5 2.5 0 011.688-.64z" class="cloud" />
    <path fill="url(#c-fogcloud)" d="M11.51 12a2.504 2.504 0 001.81-.793c.56.298 1.212.372 1.825.208a2.5 2.5 0 001.212-4.085c.167-.475.187-.99.057-1.476a2.504 2.504 0 00-4.247-1.06 2.506 2.506 0 00-3.22.768c-1.681.398-2.144 2.019-1.875 3.086.25.99 1.104 1.712 2.119 1.834A2.503 2.503 0 0011.511 12z" class="cloud" />
    <path fill="url(#d-fogcloud)" d="M16.596 6.002a2.501 2.501 0 00-1.922.791 2.5 2.5 0 00-3.133 3.76 2.499 2.499 0 003.633 2.654c.094.1.2.185.307.268a2.5 2.5 0 002.02 1.025 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-.047-.474A2.494 2.494 0 0018.5 7a2.5 2.5 0 00-1.904-.998z" class="cloud" />
    <path fill="url(#e-fogcloud)" d="M9.983 5A2.5 2.5 0 007.52 7.201a2.5 2.5 0 00.98 4.8 2.5 2.5 0 003.826.206 2.5 2.5 0 003.133-3.76 2.5 2.5 0 00-3.106-2.862 2.5 2.5 0 00-.527.208A2.5 2.5 0 009.983 5z" class="cloud" />
    <path fill="url(#f-fogcloud)" d="M12.483 8a2.5 2.5 0 00-1.982 1 2.5 2.5 0 00-2.415 3.147c.152.566.544 1.002.976 1.396.514 1.783 2.016 2.13 3.086 1.872a2.24 2.24 0 00.527-.208A2.5 2.5 0 0017 13.5a2.5 2.5 0 00-2.387-4.337A2.5 2.5 0 0012.483 8z" class="cloud" />
  </g>  
  <path fill="url(#i-fog)" d="M0 10h24v11H0z" class="fog" />
  <path fill="url(#j-fog)" d="M0 10h24v9H0z" class="fog" />`
      }
    ];
    css$5 = {
      code: "svg.svelte-1lmd4z1{display:inline-grid;place-items:center center;height:2em;width:2em;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:top}",
      map: null
    };
    WeatherIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let svg;
      let { icon = icons[0].tag } = $$props;
      let { fontsize = "1.5em" } = $$props;
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.fontsize === void 0 && $$bindings.fontsize && fontsize !== void 0)
        $$bindings.fontsize(fontsize);
      $$result.css.add(css$5);
      svg = icons.find((el) => el.tag.includes(icon)) ?? icons[0].tag;
      return `



<svg class="weatherIcon svelte-1lmd4z1" style="${"font-size: " + escape(fontsize, true)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><!-- HTML_TAG_START -->${svg.defs}<!-- HTML_TAG_END --></defs><g><!-- HTML_TAG_START -->${svg.path}<!-- HTML_TAG_END --></g>${slots.default ? slots.default({}) : ``}</svg>`;
    });
    css$4 = {
      code: ".current.svelte-52yen0.svelte-52yen0{margin-top:0.3rem}.current_time.svelte-52yen0.svelte-52yen0{display:flex;justify-content:center;gap:0 1rem;font-size:0.875rem}.current_conditions.svelte-52yen0.svelte-52yen0{margin:2rem 0 3rem}.current_conditions.svelte-52yen0 .snapshot.svelte-52yen0{display:flex;justify-content:center;align-items:center;gap:0}.current_conditions.svelte-52yen0 .snapshot .temp.svelte-52yen0{font-size:2.5rem}.current_conditions.svelte-52yen0 .conditions.svelte-52yen0{text-align:center;margin-top:-1rem;font-size:1.375rem}.day_stats.svelte-52yen0.svelte-52yen0{display:flex;justify-content:space-between;align-items:center;gap:0 1rem;max-width:320px;max-width:18em;margin:2rem auto 2.5rem;font-size:0.9375rem}.day_stats.svelte-52yen0 .hilo.svelte-52yen0,.day_stats.svelte-52yen0 .sun_times.svelte-52yen0{display:grid;grid-template-columns:max-content max-content;align-items:center;gap:0 1ch}.precipChart.svelte-52yen0.svelte-52yen0{max-width:500px;margin:0 auto}.precipChart.svelte-52yen0 .summary.svelte-52yen0{text-align:center;margin-bottom:-1rem}.precipChart.svelte-52yen0 .summary var.svelte-52yen0{font-style:unset;margin:0 1ch}@media(min-width: 480px){.precipChart.svelte-52yen0 .summary.svelte-52yen0{margin-bottom:-1.5rem\r\n    }}",
      map: null
    };
    Current = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { current, minutes } = $$props;
      let minutes_of_precip = minutes.map((el) => el?.precipitation).filter((el) => el > 0);
      if ($$props.current === void 0 && $$bindings.current && current !== void 0)
        $$bindings.current(current);
      if ($$props.minutes === void 0 && $$bindings.minutes && minutes !== void 0)
        $$bindings.minutes(minutes);
      $$result.css.add(css$4);
      return `<div class="current svelte-52yen0"><div class="current_time svelte-52yen0"><span>${escape(dateObj(current?.dt * 1e3, "dddd"))}</span>
    <span>${escape(dateObj(current?.dt * 1e3, "MMMM do"))}</span>
    <span>${escape(dateObj(current?.dt * 1e3, "h:mm aa"))}</span></div> 
  
  

  <div class="current_conditions svelte-52yen0"><div class="snapshot svelte-52yen0">${validate_component(WeatherIcon, "WeatherIcon").$$render(
        $$result,
        {
          icon: current?.weather[0].icon,
          fontsize: "3.5rem"
        },
        {},
        {}
      )}
      <div class="temp svelte-52yen0">${escape(round(current?.temp))}</div></div>
    <div class="conditions svelte-52yen0"><div class="icon">${escape(titlecase(current?.weather[0].description))}</div></div></div> 
  </div> 



  
  ${minutes_of_precip.length > 5 ? `<div class="precipChart svelte-52yen0"><div class="summary svelte-52yen0">${current?.snow ? `Snow this hour: <var class="svelte-52yen0">${escape(round(mmToInches(current?.snow["1h"]), 2) + '"')}</var>` : `${current?.rain ? `Rain this hour: <var class="svelte-52yen0">${escape(round(mmToInches(current?.rain["1h"]), 2) + '"')}</var>` : `This hour..  ${escape(titlecase(current?.weather[0].description))}`}`}</div>

    ${validate_component(WobbleChart, "WobbleChart").$$render($$result, { minutes }, {}, {})}</div>` : ``}
  


<div class="day_stats svelte-52yen0"><div class="hilo svelte-52yen0"><div class="label">High:</div>
    <div class="high temp">${escape(round(current?.high))}</div>
    <div class="label">Low:</div>
    <div class="low temp">${escape(round(current?.low))}</div></div>
  <div class="sun_times svelte-52yen0"><div class="label">Sunrise:</div>
    <div class="sunrise">${escape(dateObj(current?.sunrise * 1e3, "h:mm aa"))}</div>
    <div class="label">Sunset:</div>
    <div class="sunset">${escape(dateObj(current?.sunset * 1e3, "h:mm aa"))}</div></div></div> 
`;
    });
    css$3 = {
      code: '.hours.svelte-h8mg8a.svelte-h8mg8a{padding-bottom:2rem;margin:1rem auto 2rem}.tabs.svelte-h8mg8a.svelte-h8mg8a{display:flex;flex-flow:row wrap;margin:0 auto 1.5rem}.tabs.svelte-h8mg8a .tab.svelte-h8mg8a{flex:1 0 25%;color:#35495e;font-size:0.75em;font-weight:bold;text-align:center;padding:0 0.3rem;background:#eceff1;border:1px solid #b0bec5;border-bottom-color:#b0bec555;border-top-left-radius:0.3rem;border-top-right-radius:0.3rem}@media(min-width: 768px){.tabs.svelte-h8mg8a .tab.svelte-h8mg8a{flex:1 1 auto\r\n    }}.tabs.svelte-h8mg8a .tab.svelte-h8mg8a:hover{background:var(--background-color);cursor:pointer}.tabs.svelte-h8mg8a .tab.selectedTab.svelte-h8mg8a{color:#41b883;background:var(--background-color);border-bottom:none}.hour.svelte-h8mg8a.svelte-h8mg8a{display:flex;align-items:center;gap:1ch;min-height:2.25rem}@media(min-width: 500px){.hour.svelte-h8mg8a.svelte-h8mg8a{gap:2ch\r\n  }}.stripe.svelte-h8mg8a.svelte-h8mg8a{align-self:stretch;min-width:1rem;border:1px none #ccc;border-right-style:solid;border-left-style:solid}.topcap.svelte-h8mg8a.svelte-h8mg8a{border-radius:0.4em 0.4em 0 0 ;border-top-style:solid}.bottomcap.svelte-h8mg8a.svelte-h8mg8a{border-radius:0 0 0.4em 0.4em;border-bottom-style:solid}.metric.svelte-h8mg8a.svelte-h8mg8a{border:1px solid #ccc;border-radius:0.75rem;padding:0.275rem 0.3rem 0.25rem 0.4rem ;background:#eceff1;display:grid;place-items:center center;transition:0.3s}.metric.svelte-h8mg8a .metricValue.svelte-h8mg8a{line-height:1}.wind.svelte-h8mg8a.svelte-h8mg8a{display:grid;grid-auto-flow:column;align-items:center}.wind_dir.svelte-h8mg8a.svelte-h8mg8a{font-size:0.675rem;margin:0 0 0.075rem 0.075rem}.summary.svelte-h8mg8a.svelte-h8mg8a{--muted-7:#999;--muted-4:#999;flex:1;font-style:italic;color:var(--muted-7);font-size:0.75rem;display:flex;gap:0.5rem;justify-content:stretch;align-items:center}.summary.svelte-h8mg8a .line.svelte-h8mg8a{flex:1;background-image:linear-gradient(var(--muted-4), transparent);height:1px}@media(min-width: 400px){.summary.svelte-h8mg8a.svelte-h8mg8a{gap:1.5rem\r\n  }.summary.svelte-h8mg8a .line.svelte-h8mg8a{margin-right:1rem}}.temp.svelte-h8mg8a.svelte-h8mg8a::after{content:"\\00b0"}.percent.svelte-h8mg8a.svelte-h8mg8a::after{content:"%"}.metric.pressure.svelte-h8mg8a.svelte-h8mg8a{padding:0.2rem 0.3rem 0.3rem}',
      map: null
    };
    max_hours = 24;
    Hours = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let stripes;
      let { hours } = $$props;
      hours = hours.slice(0, max_hours);
      const tabs = [
        { name: "Temp", value: "temp" },
        { name: "Precip %", value: "pop" },
        { name: "Inches / hr", value: "rain" },
        { name: "Humidity", value: "humidity" },
        { name: "Wind", value: "wind_speed" },
        { name: "Gusts", value: "wind_gust" },
        { name: "Clouds", value: "clouds" },
        { name: "Pressure", value: "pressure" }
      ];
      let selectedTab = 0;
      let domain = [], metric = [];
      function offset(num) {
        const leftPadding = (num - domain[0]) / (domain[1] - domain[0]) || 0;
        const rightPadding = 1 - leftPadding;
        const width = 100;
        return width * rightPadding + "px";
      }
      if ($$props.hours === void 0 && $$bindings.hours && hours !== void 0)
        $$bindings.hours(hours);
      $$result.css.add(css$3);
      metric = hours.map((el) => round(el?.temp));
      domain = [Math.min.apply(null, metric), Math.max.apply(null, metric)];
      stripes = hours.map((el) => {
        const obj = makeStripe(el.weather[0].id);
        return { color: obj.color, text: obj.text };
      });
      return `<section class="hours svelte-h8mg8a">
  <div class="tabs svelte-h8mg8a">${each(tabs, (tab, i) => {
        return `<div class="${["tab svelte-h8mg8a", selectedTab === i ? "selectedTab" : ""].join(" ").trim()}"><div class="text">${escape(tab.name)}</div>
      </div>`;
      })}</div>
  
  
  
  ${each(hours, (hour, i) => {
        return `${i % 2 ? `<div class="hour svelte-h8mg8a"><div class="${[
          "stripe svelte-h8mg8a",
          (i === 1 ? "topcap" : "") + " " + (i === 23 ? "bottomcap" : "")
        ].join(" ").trim()}"${add_styles({ "background": stripes[i].color })}></div>

        <div class="time">${escape(dateObj(hour?.dt * 1e3, "h aa"))}</div> 
        
        <div class="summary svelte-h8mg8a">${escape(i === 1 ? stripes[i].text : stripes[i - 2].text === stripes[i].text ? "" : stripes[i].text)}

          <div class="line svelte-h8mg8a"></div></div> 
      
        ${metric[i] > 0 ? `<div class="${["metric svelte-h8mg8a", ""].join(" ").trim()}" style="${"margin-right: " + escape(offset(metric[i]), true)}"><div class="${[
          "metricValue svelte-h8mg8a",
          "temp  "
        ].join(" ").trim()}">${escape(metric[i])}

            ${``}</div> </div> ` : ``}</div> ` : ``}`;
      })} 
  </section> `;
    });
    css$2 = {
      code: '.range.svelte-uxf9oq{height:100%;position:relative;padding:0 1.5rem 0 1rem;display:grid;justify-content:stretch}@media(min-width: 500px){.range.svelte-uxf9oq{padding:0 1.5rem 0 2rem\r\n  }}.shell.svelte-uxf9oq{display:grid;align-items:center;position:relative}.bar.svelte-uxf9oq{position:relative;background:gainsboro;border:1px solid #808080;height:0.75rem;border-radius:0.375rem;box-shadow:0 -2px 4px inset rgba(0,0,0,0.1)}@media(min-width: 500px){.bar.svelte-uxf9oq{height:1rem;border-radius:0.5rem\r\n  }}.low.svelte-uxf9oq,.high.svelte-uxf9oq{position:absolute;top:-0.5rem}.low.svelte-uxf9oq:after,.high.svelte-uxf9oq:after{content:"\xB0"}@media(min-width: 500px){.low.svelte-uxf9oq,.high.svelte-uxf9oq{font-size:inherit;top:-0.3rem\r\n  }}.low.svelte-uxf9oq{left:-2rem}.high.svelte-uxf9oq{right:-2.2rem}',
      map: null
    };
    RangeBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { high, low, domain } = $$props;
      let hi, lo;
      function scale(n) {
        return (n - domain[0]) / (domain[1] - domain[0]) * 100;
      }
      if ($$props.high === void 0 && $$bindings.high && high !== void 0)
        $$bindings.high(high);
      if ($$props.low === void 0 && $$bindings.low && low !== void 0)
        $$bindings.low(low);
      if ($$props.domain === void 0 && $$bindings.domain && domain !== void 0)
        $$bindings.domain(domain);
      $$result.css.add(css$2);
      {
        {
          hi = scale(high);
          lo = scale(low);
        }
      }
      return `<section class="RangeBar"><div class="range svelte-uxf9oq"><div class="shell svelte-uxf9oq"${add_styles({ "left": `${lo}%`, "width": `${hi - lo}%` })}>
         
      <div class="bar svelte-uxf9oq"><div class="low svelte-uxf9oq">${escape(low)}</div>
        <div class="high svelte-uxf9oq">${escape(high)}</div></div></div></div>    
</section>`;
    });
    css$12 = {
      code: ".day.svelte-1eipc6i.svelte-1eipc6i{display:grid;grid-template-columns:4.5rem 5rem 1fr;align-items:center;padding-right:1.1rem}@media(min-width: 500px){.day.svelte-1eipc6i.svelte-1eipc6i{grid-template-columns:5rem 5rem 1fr\r\n  }}.weekday.svelte-1eipc6i .precip.svelte-1eipc6i{color:rgba( 51, 51, 51, 0.7);font-size:0.75rem;line-height:1.3}.weekday.svelte-1eipc6i .precip div.svelte-1eipc6i{padding-right:0.5rem}.weekday.svelte-1eipc6i .precip span.svelte-1eipc6i:first-child{font-size:0.55rem;margin-right:0.2rem;vertical-align:2px;filter:grayscale(60%)}",
      map: null
    };
    Days = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { days = [] } = $$props;
      let weekrange = getRange(days);
      function getRange(days2) {
        let highs = days2.map((el) => round(el.temp.max));
        let lows = days2.map((el) => round(el.temp.min));
        return [Math.min.apply(null, lows), Math.max.apply(null, highs)];
      }
      if ($$props.days === void 0 && $$bindings.days && days !== void 0)
        $$bindings.days(days);
      $$result.css.add(css$12);
      return `<div class="days">${each(days, (day, i) => {
        return `${validate_component(Accordion, "Accordion").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(i)}
`;
          },
          header: () => {
            return `<div class="day svelte-1eipc6i">${validate_component(WeatherIcon, "WeatherIcon").$$render(
              $$result,
              {
                icon: day.weather[0].icon,
                fontsize: "1.75em"
              },
              {},
              {}
            )}

    <div class="weekday svelte-1eipc6i"><div class="date svelte-1eipc6i">${escape(i === 0 ? "Today" : dateObj(day.dt * 1e3, "ddd"))}</div>
      <div class="precip svelte-1eipc6i"><div class="svelte-1eipc6i"><span class="svelte-1eipc6i">${escape(precipSymbol(day.weather[0].id))}</span>
          <span class="svelte-1eipc6i">${escape(day.pop > 0.01 ? day.pop * 100 + "%" : "0%")}</span></div>
      </div></div>

    ${validate_component(RangeBar, "RangeBar").$$render(
              $$result,
              {
                domain: weekrange,
                high: round(day.temp.max),
                low: round(day.temp.min)
              },
              {},
              {}
            )}</div>
`;
          }
        })}`;
      })}
</div>`;
    });
    css3 = {
      code: ".wrapper.svelte-1vxeiks{max-width:640px;margin:0 auto}.day_summary.svelte-1vxeiks{margin-bottom:-0.5rem}",
      map: null
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let day_summary;
      let { data } = $$props;
      const { weather } = data;
      let days = {}, hours = {}, minutes = {}, current = {}, alerts = [];
      function getDaySummary(arr) {
        const n = arr.length;
        let str = "day_summary";
        if (n > 0) {
          str = `<div style="color:tomato">${alerts[0]?.event}`;
          n > 1 ? str += `<sup> +${n - 1}</sup>` : "";
          str += `</div>`;
        }
        return str;
      }
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css3);
      {
        {
          current = weather?.current;
          minutes = weather?.minutely;
          hours = weather?.hourly;
          days = weather?.daily;
          alerts = weather?.alerts.length ? weather?.alerts : [];
        }
      }
      day_summary = getDaySummary(alerts);
      {
        console.log("weather:", data);
      }
      minutes.map((el) => el?.precipitation).filter((el) => el > 0);
      return `<div class="page">${validate_component(Current, "Current").$$render(
        $$result,
        {
          current: {
            high: days[0].temp.max,
            low: days[0].temp.min,
            sunrise: days[0].sunrise,
            sunset: days[0].sunset,
            ...current
          },
          minutes
        },
        {},
        {}
      )}

  <div class="wrapper svelte-1vxeiks"${add_styles({ "max-width": `640px` })}><div class="day_summary svelte-1vxeiks"><!-- HTML_TAG_START -->${day_summary}<!-- HTML_TAG_END --></div>
    ${validate_component(Hours, "Hours").$$render($$result, { hours }, {}, {})}

    <div class="week_summary">week_summary</div>
    ${validate_component(Days, "Days").$$render($$result, { days }, {}, {})}</div>
  </div>

`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component3, file3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file3 = "_app/immutable/entry/_page.svelte.c837c69c.js";
    imports3 = ["_app/immutable/entry/_page.svelte.c837c69c.js", "_app/immutable/chunks/index.09f10f2b.js", "_app/immutable/chunks/Accordion.57f4378a.js"];
    stylesheets3 = ["_app/immutable/assets/_page.38da96fa.css", "_app/immutable/assets/Accordion.ba66559c.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/alerts/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
function humanize(str) {
  const res = str.replace(/(HAZARD)/, "<br>HAZARD&nbsp;").replace(/(SOURCE)/, "SOURCE&nbsp;").replace(/(IMPACT)/, "IMPACT&nbsp;").replace(/(IMPACTS)/, "IMPACTS&nbsp;").replace(/(HAIL)/, "<br>HAIL&nbsp;").replace(/(WIND)/, "WIND&nbsp;").replace(/(Locations impacted)/, "<br>Locations impacted").replace(/(Forecast)/, "<br>Forecast&nbsp;").replace(/(Flood History)/, "<br>Flood History&nbsp;").replace(/(ADDITIONAL DETAILS)/, "<br>ADDITIONAL DETAILS&nbsp;").replace(/(PRECAUTIONARY)/, "<br>PRECAUTIONARY").replace(/(NEXT UPDATE)/, "<br>NEXT UPDATE").replace(/(SITUATION OVERVIEW)/, "<br>SITUATION OVERVIEW").replace(/(POTENTIAL IMPACTS)/, "<br>POTENTIAL IMPACTS").replace(/(THREAT TO LIFE)/, "<br>THREAT TO LIFE").replace(/(PLAN:)/, "<br>PLAN:").replace(/(PREPARE:)/, "<br>PREPARE:").replace(/\n/g, "<br>").trim();
  return res;
}
var css4, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/alerts/_page.svelte.js"() {
    init_index2();
    init_Accordion();
    css4 = {
      code: ".alerts.svelte-1oo9jct.svelte-1oo9jct{max-width:calc(672px + 2rem);margin:0 auto;font-family:var(--serif)}.alerts.svelte-1oo9jct pre.svelte-1oo9jct{font-family:var(--serif);margin:0 0 1rem}.event.svelte-1oo9jct.svelte-1oo9jct{font-size:1.1em;font-weight:bold;margin-bottom:0.3em}.param.svelte-1oo9jct.svelte-1oo9jct{font-size:0.875em}.label.svelte-1oo9jct.svelte-1oo9jct{display:inline-block;width:6ch}",
      map: null
    };
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data, isOpen = false } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
        $$bindings.isOpen(isOpen);
      $$result.css.add(css4);
      return `<div class="page"><div class="alerts svelte-1oo9jct">${each(data?.weather.alerts, (alert, i) => {
        return `${validate_component(Accordion, "Accordion").$$render($$result, { isOpen }, {}, {
          header: () => {
            return `<div class="header" slot="header"><div class="event svelte-1oo9jct">${escape(alert.event)}</div>
          <div class="start param svelte-1oo9jct"><div class="label svelte-1oo9jct">Start:</div>
            ${escape(dateObj(alert.start * 1e3, "ddd h:mm aa"))}</div>
          <div class="end param svelte-1oo9jct"><div class="label svelte-1oo9jct">End:</div>
            ${escape(dateObj(alert.end * 1e3, "ddd h:mm aa"))}</div>
        </div>`;
          },
          default: () => {
            return `<pre class="desc svelte-1oo9jct"><!-- HTML_TAG_START -->${humanize(alert?.description)}<!-- HTML_TAG_END --></pre>
      `;
          }
        })}`;
      })}</div></div>
`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  file: () => file4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component4, file4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    file4 = "_app/immutable/entry/alerts-page.svelte.684f0438.js";
    imports4 = ["_app/immutable/entry/alerts-page.svelte.684f0438.js", "_app/immutable/chunks/index.09f10f2b.js", "_app/immutable/chunks/Accordion.57f4378a.js"];
    stylesheets4 = ["_app/immutable/assets/_page.abdfaba7.css", "_app/immutable/assets/Accordion.ba66559c.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/docs/_page.md.js
var page_md_exports = {};
__export(page_md_exports, {
  default: () => Page3
});
var css5, Page3;
var init_page_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/_page.md.js"() {
    init_index2();
    css5 = {
      code: ".page.svelte-vzvlky{position:relative;top:calc(var(--header-height) + 1rem);width:90%;max-width:960px;padding:0 0 calc(var(--footer-height) + 1rem);margin:0 auto}",
      map: null
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css5);
      return `<div class="page svelte-vzvlky">Open Weather \xA0 \xA0 <a href="https://home.openweathermap.org/"><small>link</small></a>
    
  <br><br>
  
<h4>Todo</h4>
<ul><li>Search<ul><li>form actions</li>
<li>tomtom</li>
<li>database</li></ul></li>
<li>Days<ul><li>add hours to accordion - 5-day / 3-hour call</li>
<li><del>fix media queries / bar width</del></li></ul></li>
<li>Page  <ul><li>day_summary  </li>
<li>week_summary  </li>
<li><del>remove background color</del></li></ul></li>
<li>Hours<ul><li>rain start &amp; stop</li>
<li><del>fix inch / hr</del></li></ul></li>
<li>Map<ul><li><del>map - windy</del></li></ul></li></ul>
  <br><br>
<p>Api Call</p>
<pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token comment">/*
https://api.openweathermap.org/data/3.0/onecall?lat=&#123;lat&#125;&amp;lon=&#123;lon&#125;&amp;units=imperial&amp;appid=&#123;API_KEY_&#125; 
*/</span> 
</code>`}<!-- HTML_TAG_END --></pre>
  <br><br>
<h3><a href="https://fontsource.org/docs/getting-started" rel="nofollow">Fontsource</a></h3>
<p>install font</p>
<pre class="language-sh"><!-- HTML_TAG_START -->${`<code class="language-sh"><span class="token function">npm</span> i @fontsource/lato
<span class="token function">npm</span> i @fontsource/source-serif-pro</code>`}<!-- HTML_TAG_END --></pre>
<p>import into <code>+layout.svelte</code></p>
<pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token comment">&lt;!-- +layout.svelte --></span>
import "@fontsource/lato"
import "@fontsource/source-serif-Pro"</code>`}<!-- HTML_TAG_END --></pre>
<p><em>QED</em></p>
<pre class="language-css"><!-- HTML_TAG_START -->${`<code class="language-css"><span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'Lato'</span><span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'Source Serif Pro'</span><span class="token punctuation">,</span> serif<span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  file: () => file5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component5, file5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => (await Promise.resolve().then(() => (init_page_md(), page_md_exports))).default;
    file5 = "_app/immutable/entry/docs-page.md.904ffb59.js";
    imports5 = ["_app/immutable/entry/docs-page.md.904ffb59.js", "_app/immutable/chunks/index.09f10f2b.js"];
    stylesheets5 = ["_app/immutable/assets/_page.1b52f2bf.css"];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/map/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page4
});
var css6, title, Page4;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/map/_page.svelte.js"() {
    init_index2();
    css6 = {
      code: ".map.svelte-1ag9nib{position:relative;top:0;width:100%;height:100vh;padding:0 0 var(--footer-height);z-index:15;background:var(--background-color)}",
      map: null
    };
    title = "Map by Windy";
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let mapUrl;
      let { data } = $$props;
      const lat = data?.location.lat;
      const lon = data?.location.lon;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css6);
      mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`;
      return `<div class="map svelte-1ag9nib"><iframe width="100%" height="100%"${add_attribute("src", mapUrl, 0)} frameborder="0"${add_attribute("title", title, 0)}></iframe></div>
`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  file: () => file6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component6, file6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    file6 = "_app/immutable/entry/map-page.svelte.8b96f069.js";
    imports6 = ["_app/immutable/entry/map-page.svelte.8b96f069.js", "_app/immutable/chunks/index.09f10f2b.js"];
    stylesheets6 = ["_app/immutable/assets/_page.b7ee240d.css"];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/search/_page.server.js
var page_server_exports = {};
var init_page_server = __esm({
  ".svelte-kit/output/server/entries/pages/search/_page.server.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/search/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page5
});
var title2, List, css7, Page5;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/search/_page.svelte.js"() {
    init_index2();
    init_devalue();
    title2 = "List";
    List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="">${escape(title2)}
</div>`;
    });
    css7 = {
      code: ".search_page.svelte-y616bd.svelte-y616bd{position:absolute;top:0;width:100%;height:100vh;z-index:15;background:var(--background-color)}.header.svelte-y616bd.svelte-y616bd{display:flex;justify-content:center;align-items:center;height:var(--header-height);border-bottom:var(--border)}.location_group.svelte-y616bd.svelte-y616bd{display:flex;justify-content:space-between;align-items:center;gap:0 0.75em;width:100%;padding:0 1rem;max-width:500px}.location_group.svelte-y616bd form.svelte-y616bd{flex:1}.location_group.svelte-y616bd input.svelte-y616bd{text-align:center;width:100%;background:#fff}.location_group.svelte-y616bd input.svelte-y616bd:focus{outline:1px solid var(--active-color)}.location_group.svelte-y616bd svg.svelte-y616bd{width:1.25em;height:1.25em;font-size:1em;line-height:1;opacity:0.6}.location_group.svelte-y616bd .btn.svelte-y616bd{display:grid;plaace-items:center center;font-size:1.25rem}.lists.svelte-y616bd.svelte-y616bd{max-width:500px;margin:0 auto;padding:0 1rem}.lists.svelte-y616bd .flex.svelte-y616bd{display:flex;align-items:baseline;gap:0 1ch;margin-top:4rem}.lists.svelte-y616bd .comment.svelte-y616bd{margin-top:1em;font-size:0.75em;color:#999;padding:0 1em}.lists.svelte-y616bd .center.svelte-y616bd{text-align:center;font-style:italic}.error.svelte-y616bd.svelte-y616bd{text-align:center}",
      map: null
    };
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let saved_items, recent_items, saved_itemsNames, recent_itemsNames;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css7);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          console.log("geoData", data);
        }
        $$rendered = `<div class="search_page svelte-y616bd"><div class="header svelte-y616bd"><div class="location_group svelte-y616bd"><div class="btn svelte-y616bd"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-y616bd"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg></div>

      
      <form method="POST" action="?/tomtom" class="svelte-y616bd"><input type="text" placeholder="Search" name="searchTerm" class="svelte-y616bd">
        
        <input type="submit" hidden class="svelte-y616bd"></form>

      <div class="btn search svelte-y616bd"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-y616bd"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></div></div> </div> 


  ${``}


  <section class="lists svelte-y616bd"><div class="comment svelte-y616bd">Saved Locations:</div>
    ${validate_component(List, "List").$$render(
          $$result,
          {
            id: "list_1",
            type: "dnd",
            items: saved_items
          },
          {
            items: ($$value) => {
              saved_items = $$value;
              $$settled = false;
            }
          },
          {}
        )}

    <div class="comment center svelte-y616bd">~ drag recent searches here to save location ~
    </div>
    <div class="comment svelte-y616bd">Recent Searches:</div>
    ${validate_component(List, "List").$$render(
          $$result,
          {
            id: "list_2",
            type: "dnd",
            items: recent_items
          },
          {
            items: ($$value) => {
              recent_items = $$value;
              $$settled = false;
            }
          },
          {}
        )}

    ${`<div class="flex svelte-y616bd"><span${add_styles({ "padding": `0 1rem` })}><div>store.saved_items: \u2003 ${escape(saved_itemsNames)}</div>
          <br>
          <div>store.recent_items: \u2003 ${escape(recent_itemsNames)}</div></span></div>
      `}</section>
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  file: () => file7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  server: () => page_server_exports,
  server_id: () => server_id2,
  stylesheets: () => stylesheets7
});
var index7, component7, file7, server_id2, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_server();
    index7 = 6;
    component7 = async () => (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    file7 = "_app/immutable/entry/search-page.svelte.94d5d5cc.js";
    server_id2 = "src/routes/search/+page.server.js";
    imports7 = ["_app/immutable/entry/search-page.svelte.94d5d5cc.js", "_app/immutable/chunks/index.09f10f2b.js", "_app/immutable/chunks/parse.d12b0d5b.js", "_app/immutable/chunks/singletons.341826d1.js", "_app/immutable/chunks/navigation.b732f982.js"];
    stylesheets7 = ["_app/immutable/assets/_page.060bc455.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/geolocate/_server.js
var server_exports = {};
__export(server_exports, {
  GET: () => GET
});
async function GET(event) {
  event.getClientAddress();
  decodeURIComponent(event.request.headers.get("x-vercel-ip-country-region") ?? "unknown");
  decodeURIComponent(event.request.headers.get("x-vercel-ip-country") ?? "unknown");
  decodeURIComponent(event.request.headers.get("x-vercel-ip-latitude") ?? "unknown");
  decodeURIComponent(event.request.headers.get("x-vercel-ip-longitude") ?? "unknown");
  event.getClientAddress();
  const location = {
    city: ipv4Data?.city,
    region: ipv4Data?.region,
    regionName: ipv4Data?.regionName,
    countryCode: ipv4Data?.countryCode,
    countryName: ipv4Data?.country,
    lat: ipv4Data?.lat,
    lon: ipv4Data?.lon,
    query: ipv4Data?.query
  };
  return json(location);
}
var init_server = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/geolocate/_server.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/endpoints/api/ipv4/_server.js
var server_exports2 = {};
var init_server2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/ipv4/_server.js"() {
  }
});

// .svelte-kit/output/server/entries/endpoints/api/ip/_server.js
var server_exports3 = {};
__export(server_exports3, {
  GET: () => GET2
});
async function GET2() {
  try {
    const getIp = await fetch("http://ip-api.com/json?fields=57855");
    const ipData = await getIp.json();
    const location = await {
      ip: ipData?.query,
      city: ipData?.city,
      region: ipData?.region,
      country: ipData?.countryCode,
      lat: ipData?.lat,
      lon: ipData?.lon
    };
    return json(location);
  } catch (error2) {
    console.log("load error:", error2);
  }
}
var init_server3 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/ip/_server.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/endpoints/api/weather/_search_/_server.js
var server_exports4 = {};
__export(server_exports4, {
  GET: () => GET3
});
async function GET3({ params }) {
  try {
    let weather;
    let override_dev = false;
    if (dev && !override_dev)
      ;
    else {
      const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${params.search}&units=imperial&appid=${WEATHER_KEY}`);
      weather = await res.json();
    }
    return json(weather);
  } catch (error2) {
    console.log("load error:", error2);
  }
}
var dev, WEATHER_KEY;
var init_server4 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/weather/_search_/_server.js"() {
    init_prod_ssr();
    init_chunks();
    dev = DEV;
    WEATHER_KEY = "826b835b9408db50ca70aa7158b06f23";
  }
});

// .svelte-kit/output/server/index.js
init_prod_ssr();

// .svelte-kit/output/server/chunks/internal.js
init_index2();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<link rel="icon" type="image/svg+xml" href="' + assets2 + '/favicon.svg" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "fq73cv"
};
function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_chunks();
init_devalue();
init_index2();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type2, subtype, q = "1"] = match;
      parts.push({ type: type2, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type2, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type2 || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type2 = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type2.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {Redirect | HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type2 = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type2 === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push(`"parent":1`);
  if (node.uses?.route)
    uses.push(`"route":1`);
  if (node.uses?.url)
    uses.push(`"url":1`);
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method];
  if (!handler && method === "HEAD") {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await handler(
      /** @type {import('types').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE" || method === "OPTIONS") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json({
        type: "redirect",
        status: err.status,
        location: err.location
      });
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error(`Cannot "throw fail()". Use "return fail()"`) : error2;
}
function action_json(data, init22) {
  return json(data, init22);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init22) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      uses.dependencies.add(url2.href);
      return event.fetch(info, init22);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init22) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    let response = await event.fetch(input, init22);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init22?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init22?.body
              ),
              request_headers: init22?.headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get3 = response.headers.get;
      response.headers.get = (key2) => {
        const lower2 = key2.toLowerCase();
        const value = get3.call(response.headers, lower2);
        if (value && !lower2.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower2, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower2}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start2) {
  return {
    subscribe: writable(value, start2).subscribe
  };
}
function writable(value, start2 = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set3(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set3(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start2(set3) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set3, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter2, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let vary = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter2(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
    if (key2 === "vary")
      vary = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !vary) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array22 = encode(data);
  for (let i = 0; i < array22.length; i += 16) {
    const w = array22.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  let deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = /* @__PURE__ */ new Set([...client.start.imports, ...client.app.imports]);
  const stylesheets8 = new Set(client.app.stylesheets);
  const fonts8 = new Set(client.app.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/");
    if (segments.length === 1 && base !== "") {
      base$1 = `./${base.split("/").at(-1)}`;
      base_expression = `new URL(${s(base$1)}, location).pathname`;
    } else {
      base$1 = segments.slice(2).map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    }
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets8.add(url);
      for (const url of node.fonts)
        fonts8.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets8) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts8) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      `env: ${s(public_env)}`,
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `element: document.currentScript.parentElement`
    ].filter(Boolean);
    if (chunks) {
      blocks.push(`const deferred = new Map();`);
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = [`app`, `${global}.element`];
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start.file))}),
						import(${s(prefixed(client.app.file))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id2 = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id: id2, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id: id2, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id2})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {any} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id2 = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id2},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id2;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index8 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index8]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    const value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      result[param.name] = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
      continue;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('types').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      let path = opts.path ?? default_path;
      new_cookies[name] = {
        name,
        value,
        options: {
          ...defaults,
          ...opts,
          path
        }
      };
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  return { cookies, new_cookies, get_cookie_header };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header }) {
  return async (info, init22) => {
    const original_request = normalize_fetch_input(info, init22, event.url);
    const request_body = init22?.body;
    let mode = (info instanceof Request ? info.mode : init22?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init22?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        let response;
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file8 = is_asset ? filename : filename_html;
          if (state.read) {
            const type2 = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file8), {
              headers: type2 ? { "content-type": type2 } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (request_body && typeof request_body !== "string" && !ArrayBuffer.isView(request_body)) {
          throw new Error("Request body must be a string or TypedArray");
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            event.cookies.set(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init22, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init22);
}
function validator(expected) {
  const set3 = new Set(expected);
  function validate(module, file8) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || set3.has(key2))
        continue;
      const hint = hint_for_supported_files(key2, file8?.slice(file8.lastIndexOf("."))) ?? `valid exports are ${expected.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file8 ? ` in ${file8}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  let supported_files = [];
  if (valid_common_exports.includes(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_page_server_exports.includes(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.includes(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.join(` or `)}`;
  }
}
var valid_common_exports = ["load", "prerender", "csr", "ssr", "trailingSlash", "config"];
var valid_page_server_exports = [
  "load",
  "prerender",
  "csr",
  "ssr",
  "actions",
  "trailingSlash",
  "config"
];
var valid_server_exports = [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "prerender",
  "trailingSlash",
  "config"
];
var validate_common_exports = validator(valid_common_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type: type2 }) => type2 === "js" || type2 === "css";
async function respond(request, options2, manifest2, state) {
  let url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("_").map(Boolean);
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower2 = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower2 === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower2 in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower2] = value;
          if (state.prerendering && lower2 === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route && !is_data_request) {
      if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
      if (normalized !== url.pathname && !state.prerendering?.fallback) {
        return new Response(void 0, {
          status: 308,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (
              // ensure paths starting with '//' are not treated as protocol-relative
              (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
            )
          }
        });
      }
    }
    const { cookies, new_cookies, get_cookie_header } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var _options, _manifest;
var Server = class {
  /** @param {import('types').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('types').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    const entries = Object.entries(env);
    const prefix = __privateGet(this, _options).env_public_prefix;
    Object.fromEntries(entries.filter(([k]) => !k.startsWith(prefix)));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith(prefix)));
    set_public_env(pub);
    if (!__privateGet(this, _options).hooks) {
      const module = await get_hooks();
      __privateGet(this, _options).hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        // @ts-expect-error
        handleError: module.handleError || (({ error: error2 }) => console.error(error2?.stack)),
        handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
      };
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "favicon.svg"]),
  mimeTypes: { ".png": "image/png", ".svg": "image/svg+xml" },
  _: {
    client: { "start": { "file": "_app/immutable/entry/start.2f6c1f0f.js", "imports": ["_app/immutable/entry/start.2f6c1f0f.js", "_app/immutable/chunks/index.09f10f2b.js", "_app/immutable/chunks/singletons.341826d1.js", "_app/immutable/chunks/parse.d12b0d5b.js"], "stylesheets": [], "fonts": [] }, "app": { "file": "_app/immutable/entry/app.38006a55.js", "imports": ["_app/immutable/entry/app.38006a55.js", "_app/immutable/chunks/index.09f10f2b.js"], "stylesheets": [], "fonts": [] } },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7))
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "/alerts",
        pattern: /^\/alerts\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/api/geolocate",
        pattern: /^\/api\/geolocate\/?$/,
        params: [],
        page: null,
        endpoint: () => Promise.resolve().then(() => (init_server(), server_exports))
      },
      {
        id: "/api/ipv4",
        pattern: /^\/api\/ipv4\/?$/,
        params: [],
        page: null,
        endpoint: () => Promise.resolve().then(() => (init_server2(), server_exports2))
      },
      {
        id: "/api/ip",
        pattern: /^\/api\/ip\/?$/,
        params: [],
        page: null,
        endpoint: () => Promise.resolve().then(() => (init_server3(), server_exports3))
      },
      {
        id: "/api/weather/[search]",
        pattern: /^\/api\/weather\/([^/]+?)\/?$/,
        params: [{ "name": "search", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: () => Promise.resolve().then(() => (init_server4(), server_exports4))
      },
      {
        id: "/docs",
        pattern: /^\/docs\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      },
      {
        id: "/map",
        pattern: /^\/map\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 5 },
        endpoint: null
      },
      {
        id: "/search",
        pattern: /^\/search\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 6 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/fn/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map
