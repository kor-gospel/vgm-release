let B;
let __tla = (async () => {
  const v = "/assets/vgm_decrypt_bg-BjNUMhxt.wasm", A = async (e = {}, n) => {
    let r;
    if (n.startsWith("data:")) {
      const o = n.replace(/^data:.*?base64,/, "");
      let s;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") s = Buffer.from(o, "base64");
      else if (typeof atob == "function") {
        const i = atob(o);
        s = new Uint8Array(i.length);
        for (let t = 0; t < i.length; t++) s[t] = i.charCodeAt(t);
      } else throw new Error("Cannot decode base64-encoded data URL");
      r = await WebAssembly.instantiate(s, e);
    } else {
      const o = await fetch(n), s = o.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && s.startsWith("application/wasm")) r = await WebAssembly.instantiateStreaming(o, e);
      else {
        const i = await o.arrayBuffer();
        r = await WebAssembly.instantiate(i, e);
      }
    }
    return r.instance.exports;
  };
  URL = globalThis.URL;
  const f = await A({}, v), y = f.memory, T = f.decrypt, w = f.__wbindgen_add_to_stack_pointer, g = f.__wbindgen_malloc, W = f.__wbindgen_realloc, U = f.__wbindgen_free;
  let _ = null;
  function l() {
    return (_ === null || _.buffer !== y.buffer) && (_ = new Uint8Array(y.buffer)), _;
  }
  let u = 0;
  function x(e, n) {
    const r = n(e.length * 1);
    return l().set(e, r / 1), u = e.length, r;
  }
  const E = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let b = new E("utf-8");
  const M = typeof b.encodeInto == "function" ? function(e, n) {
    return b.encodeInto(e, n);
  } : function(e, n) {
    const r = b.encode(e);
    return n.set(r), {
      read: e.length,
      written: r.length
    };
  };
  function C(e, n, r) {
    if (r === void 0) {
      const a = b.encode(e), c = n(a.length);
      return l().subarray(c, c + a.length).set(a), u = a.length, c;
    }
    let o = e.length, s = n(o);
    const i = l();
    let t = 0;
    for (; t < o; t++) {
      const a = e.charCodeAt(t);
      if (a > 127) break;
      i[s + t] = a;
    }
    if (t !== o) {
      t !== 0 && (e = e.slice(t)), s = r(s, o, o = t + e.length * 3);
      const a = l().subarray(s + t, s + o), c = M(e, a);
      t += c.written;
    }
    return u = t, s;
  }
  let d = null;
  function h() {
    return (d === null || d.buffer !== y.buffer) && (d = new Int32Array(y.buffer)), d;
  }
  function S(e, n) {
    return l().subarray(e / 1, e / 1 + n);
  }
  B = function(e, n, r) {
    try {
      const m = w(-16);
      var o = x(e, g), s = u, i = C(n, g, W), t = u;
      T(m, o, s, i, t, r);
      var a = h()[m / 4 + 0], c = h()[m / 4 + 1], p = S(a, c).slice();
      return U(a, c * 1), p;
    } finally {
      w(16);
    }
  };
})();
export {
  __tla,
  B as decrypt
};
