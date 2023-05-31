(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8570], {
        10263: function(t) {
            ! function(e) {
                "use strict";

                function n(t) {
                    var e, n, o, i, u;

                    function a() {
                        n = 0, o = e.length
                    }

                    function s(t, e) {
                        return {
                            name: t,
                            tokens: e || "",
                            semantic: e || "",
                            children: []
                        }
                    }

                    function c(t, e) {
                        var n;
                        return null === e ? null : ((n = s(t)).tokens = e.tokens, n.semantic = e.semantic, n.children.push(e), n)
                    }

                    function l(t, e) {
                        return null !== e && (t.tokens += e.tokens, t.semantic += e.semantic), t.children.push(e), t
                    }

                    function f(t) {
                        var r;
                        return n < o && t(r = e[n]) ? (n += 1, s("token", r)) : null
                    }

                    function d() {
                        return null
                    }

                    function p(t) {
                        return function() {
                            return c("literal", f(function(e) {
                                return e === t
                            }))
                        }
                    }

                    function h() {
                        var t = arguments;
                        return function() {
                            var e, r, o, i;
                            for (e = 0, i = n, r = s("and"); e < t.length; e += 1) {
                                if (null === (o = t[e]())) return n = i, null;
                                l(r, o)
                            }
                            return r
                        }
                    }

                    function v() {
                        var t = arguments;
                        return function() {
                            var e, r, o;
                            for (e = 0, o = n; e < t.length; e += 1) {
                                if (null !== (r = t[e]())) return r;
                                n = o
                            }
                            return null
                        }
                    }

                    function m(t) {
                        return function() {
                            var e, r;
                            return (r = n, null !== (e = t())) ? e : (n = r, s("opt"))
                        }
                    }

                    function g(t) {
                        return function() {
                            var e = t();
                            return null !== e && (e.semantic = ""), e
                        }
                    }

                    function b(t) {
                        return function() {
                            var e = t();
                            return null !== e && e.semantic.length > 0 && (e.semantic = " "), e
                        }
                    }

                    function y(t, e) {
                        return function() {
                            var r, o, i, u;
                            for (u = n, r = s("star"), i = 0; null !== (o = t());) i += 1, l(r, o);
                            return i >= (void 0 === e ? 0 : e) ? r : (n = u, null)
                        }
                    }

                    function w(t) {
                        return t.charCodeAt(0) >= 128
                    }

                    function x() {
                        return c("cr", p("\r")())
                    }

                    function S() {
                        return c("crlf", h(x, U)())
                    }

                    function M() {
                        return c("dquote", p('"')())
                    }

                    function E() {
                        return c("htab", p("	")())
                    }

                    function U() {
                        return c("lf", p("\n")())
                    }

                    function O() {
                        return c("sp", p(" ")())
                    }

                    function j() {
                        return c("vchar", f(function(e) {
                            var n = e.charCodeAt(0),
                                r = 33 <= n && n <= 126;
                            return t.rfc6532 && (r = r || w(e)), r
                        }))
                    }

                    function R() {
                        return c("wsp", v(O, E)())
                    }

                    function C() {
                        var t = c("quoted-pair", v(h(p("\\"), v(j, R)), tu)());
                        return null === t ? null : (t.semantic = t.semantic[1], t)
                    }

                    function A() {
                        return c("fws", v(ts, h(m(h(y(R), g(S))), y(R, 1)))())
                    }

                    function k() {
                        return c("ctext", v(function() {
                            return f(function(e) {
                                var n = e.charCodeAt(0),
                                    r = 33 <= n && n <= 39 || 42 <= n && n <= 91 || 93 <= n && n <= 126;
                                return t.rfc6532 && (r = r || w(e)), r
                            })
                        }, to)())
                    }

                    function L() {
                        return c("ccontent", v(k, C, N)())
                    }

                    function N() {
                        return c("comment", h(p("("), y(h(m(A), L)), m(A), p(")"))())
                    }

                    function z() {
                        return c("cfws", v(h(y(h(m(A), N), 1), m(A)), A)())
                    }

                    function P() {
                        return c("atext", f(function(e) {
                            var n = "a" <= e && e <= "z" || "A" <= e && e <= "Z" || "0" <= e && e <= "9" || ["!", "#", "$", "%", "&", "'", "*", "+", "-", "/", "=", "?", "^", "_", "`", "{", "|", "}", "~"].indexOf(e) >= 0;
                            return t.rfc6532 && (n = n || w(e)), n
                        }))
                    }

                    function H() {
                        return c("atom", h(b(m(z)), y(P, 1), b(m(z)))())
                    }

                    function F() {
                        var t, e;
                        return null === (t = c("dot-atom-text", y(P, 1)())) || null !== (e = y(h(p("."), y(P, 1)))()) && l(t, e), t
                    }

                    function I() {
                        return c("dot-atom", h(g(m(z)), F, g(m(z)))())
                    }

                    function T() {
                        return c("qtext", v(function() {
                            return f(function(e) {
                                var n = e.charCodeAt(0),
                                    r = 33 === n || 35 <= n && n <= 91 || 93 <= n && n <= 126;
                                return t.rfc6532 && (r = r || w(e)), r
                            })
                        }, ti)())
                    }

                    function _() {
                        return c("qcontent", v(T, C)())
                    }

                    function D() {
                        return c("quoted-string", h(g(m(z)), g(M), y(h(m(b(A)), _)), m(g(A)), g(M), g(m(z)))())
                    }

                    function W() {
                        return c("word", v(H, D)())
                    }

                    function q() {
                        return c("address", v(B, V)())
                    }

                    function B() {
                        return c("mailbox", v($, tn)())
                    }

                    function $() {
                        return c("name-addr", h(m(J), Z)())
                    }

                    function Z() {
                        return c("angle-addr", v(h(g(m(z)), p("<"), tn, p(">"), g(m(z))), tc)())
                    }

                    function V() {
                        return c("group", h(J, p(":"), m(X), p(";"), g(m(z)))())
                    }

                    function J() {
                        var t;
                        return c("display-name", (null !== (t = c("phrase", v(ta, y(W, 1))())) && (t.semantic = t.semantic.replace(/([ \t]|\r\n)+/g, " ").replace(/^\s*/, "").replace(/\s*$/, "")), t))
                    }

                    function G() {
                        return c("mailbox-list", v(h(B, y(h(p(","), B))), td)())
                    }

                    function Q() {
                        return c("address-list", v(h(q, y(h(p(","), q))), tp)())
                    }

                    function X() {
                        return c("group-list", v(G, g(z), th)())
                    }

                    function Y() {
                        return c("local-part", v(tv, I, D)())
                    }

                    function K() {
                        return c("dtext", v(function() {
                            return f(function(e) {
                                var n = e.charCodeAt(0),
                                    r = 33 <= n && n <= 90 || 94 <= n && n <= 126;
                                return t.rfc6532 && (r = r || w(e)), r
                            })
                        }, tg)())
                    }

                    function tt() {
                        return c("domain-literal", h(g(m(z)), p("["), y(h(m(A), K)), m(A), p("]"), g(m(z)))())
                    }

                    function te() {
                        var e;
                        return c("domain", (e = v(tm, I, tt)(), t.rejectTLD && e && e.semantic && 0 > e.semantic.indexOf(".") ? null : (e && (e.semantic = e.semantic.replace(/\s+/g, "")), e)))
                    }

                    function tn() {
                        return c("addr-spec", h(Y, p("@"), te)())
                    }

                    function tr() {
                        return t.strict ? null : c("obs-NO-WS-CTL", f(function(t) {
                            var e = t.charCodeAt(0);
                            return 1 <= e && e <= 8 || 11 === e || 12 === e || 14 <= e && e <= 31 || 127 === e
                        }))
                    }

                    function to() {
                        return t.strict ? null : c("obs-ctext", tr())
                    }

                    function ti() {
                        return t.strict ? null : c("obs-qtext", tr())
                    }

                    function tu() {
                        return t.strict ? null : c("obs-qp", h(p("\\"), v(p("\x00"), tr, U, x))())
                    }

                    function ta() {
                        return t.strict ? null : c("obs-phrase", h(W, y(v(W, p("."), t.atInDisplayName ? p("@") : d, t.commaInDisplayName ? p(",") : d, b(z))))())
                    }

                    function ts() {
                        return t.strict ? null : c("obs-FWS", y(h(g(m(S)), R), 1)())
                    }

                    function tc() {
                        return t.strict ? null : c("obs-angle-addr", h(g(m(z)), p("<"), tl, tn, p(">"), g(m(z)))())
                    }

                    function tl() {
                        return t.strict ? null : c("obs-route", h(tf, p(":"))())
                    }

                    function tf() {
                        return t.strict ? null : c("obs-domain-list", h(y(v(g(z), p(","))), p("@"), te, y(h(p(","), g(m(z)), m(h(p("@"), te)))))())
                    }

                    function td() {
                        return t.strict ? null : c("obs-mbox-list", h(y(h(g(m(z)), p(","))), B, y(h(p(","), m(h(B, g(z))))))())
                    }

                    function tp() {
                        return t.strict ? null : c("obs-addr-list", h(y(h(g(m(z)), p(","))), q, y(h(p(","), m(h(q, g(z))))))())
                    }

                    function th() {
                        return t.strict ? null : c("obs-group-list", h(y(h(g(m(z)), p(",")), 1), g(m(z)))())
                    }

                    function tv() {
                        return t.strict ? null : c("obs-local-part", h(W, y(h(p("."), W)))())
                    }

                    function tm() {
                        return t.strict ? null : c("obs-domain", h(H, y(h(p("."), H)))())
                    }

                    function tg() {
                        return t.strict ? null : c("obs-dtext", v(tr, C)())
                    }

                    function tb(t, e) {
                        var n, r, o;
                        if (null == e) return null;
                        for (r = [e]; r.length > 0;) {
                            if ((o = r.pop()).name === t) return o;
                            for (n = o.children.length - 1; n >= 0; n -= 1) r.push(o.children[n])
                        }
                        return null
                    }

                    function ty(t, e) {
                        var n, r, o, i, u;
                        if (null == e) return null;
                        for (n = 0, r = [e], i = [], u = {}; n < t.length; n += 1) u[t[n]] = !0;
                        for (; r.length > 0;)
                            if ((o = r.pop()).name in u) i.push(o);
                            else
                                for (n = o.children.length - 1; n >= 0; n -= 1) r.push(o.children[n]);
                        return i
                    }

                    function tw(e) {
                        var n, r, o, i, u, a;
                        if (null === e) return null;
                        for (o = 0, n = [], r = ty(["group", "mailbox"], e); o < r.length; o += 1) "group" === (i = r[o]).name ? n.push(function(t) {
                            var e, n = tb("display-name", t),
                                r = [],
                                o = ty(["mailbox"], t);
                            for (e = 0; e < o.length; e += 1) r.push(tx(o[e]));
                            return {
                                node: t,
                                parts: {
                                    name: n
                                },
                                type: t.name,
                                name: tS(n),
                                addresses: r
                            }
                        }(i)) : "mailbox" === i.name && n.push(tx(i));
                        return (u = {
                            ast: e,
                            addresses: n
                        }, t.simple && (u = function(t) {
                            var e;
                            if (t && t.addresses)
                                for (e = 0; e < t.addresses.length; e += 1) delete t.addresses[e].node;
                            return t
                        }(u)), t.oneResult) ? (a = u) && (t.partial || !(a.addresses.length > 1)) ? a.addresses && a.addresses[0] : null : t.simple ? u && u.addresses : u
                    }

                    function tx(t) {
                        var e = tb("display-name", t),
                            n = tb("addr-spec", t),
                            r = function(t, e) {
                                var n, r, o, i;
                                if (null == e) return null;
                                for (r = [e], i = []; r.length > 0;)
                                    for ((o = r.pop()).name === t && i.push(o), n = o.children.length - 1; n >= 0; n -= 1) r.push(o.children[n]);
                                return i
                            }("cfws", t),
                            o = ty(["comment"], t),
                            i = tb("local-part", n),
                            u = tb("domain", n);
                        return {
                            node: t,
                            parts: {
                                name: e,
                                address: n,
                                local: i,
                                domain: u,
                                comments: r
                            },
                            type: t.name,
                            name: tS(e),
                            address: tS(n),
                            local: tS(i),
                            domain: tS(u),
                            comments: function(t) {
                                var e = "";
                                if (t)
                                    for (var n = 0; n < t.length; n += 1) e += tS(t[n]);
                                return e
                            }(o),
                            groupName: tS(t.groupName)
                        }
                    }

                    function tS(t) {
                        return null != t ? t.semantic : null
                    }
                    if (null === (t = r(t, {}))) return null;
                    if (e = t.input, u = ({
                            address: q,
                            "address-list": Q,
                            "angle-addr": Z,
                            from: function() {
                                return c("from", v(G, Q)())
                            },
                            group: V,
                            mailbox: B,
                            "mailbox-list": G,
                            "reply-to": function() {
                                return c("reply-to", Q())
                            },
                            sender: function() {
                                return c("sender", v(B, q)())
                            }
                        })[t.startAt] || Q, !t.strict) {
                        if (a(), t.strict = !0, i = u(e), t.partial || !(n < o)) return tw(i);
                        t.strict = !1
                    }
                    return (a(), i = u(e), !t.partial && n < o) ? null : tw(i)
                }

                function r(t, e) {
                    var n, r, o;

                    function i(t) {
                        return "[object String]" === Object.prototype.toString.call(t)
                    }
                    if (i(t)) t = {
                        input: t
                    };
                    else if ((o = t) !== Object(o)) return null;
                    if (!i(t.input) || !e) return null;
                    for (r in n = {
                            oneResult: !1,
                            partial: !1,
                            rejectTLD: !1,
                            rfc6532: !1,
                            simple: !1,
                            startAt: "address-list",
                            strict: !1,
                            atInDisplayName: !1,
                            commaInDisplayName: !1
                        }) null == t[r] && (t[r] = null == e[r] ? n[r] : e[r]);
                    return t
                }
                n.parseOneAddress = function(t) {
                    return n(r(t, {
                        oneResult: !0,
                        rfc6532: !0,
                        simple: !0,
                        startAt: "address-list"
                    }))
                }, n.parseAddressList = function(t) {
                    return n(r(t, {
                        rfc6532: !0,
                        simple: !0,
                        startAt: "address-list"
                    }))
                }, n.parseFrom = function(t) {
                    return n(r(t, {
                        rfc6532: !0,
                        simple: !0,
                        startAt: "from"
                    }))
                }, n.parseSender = function(t) {
                    return n(r(t, {
                        oneResult: !0,
                        rfc6532: !0,
                        simple: !0,
                        startAt: "sender"
                    }))
                }, n.parseReplyTo = function(t) {
                    return n(r(t, {
                        rfc6532: !0,
                        simple: !0,
                        startAt: "reply-to"
                    }))
                }, void 0 !== t.exports ? t.exports = n : e.emailAddresses = n
            }(this)
        },
        46782: function(t, e, n) {
            var r, o;
            void 0 !== (r = "function" == typeof(o = function() {
                "use strict";

                function e(t, e, n) {
                    var r = new XMLHttpRequest;
                    r.open("GET", t), r.responseType = "blob", r.onload = function() {
                        a(r.response, e, n)
                    }, r.onerror = function() {
                        console.error("could not download file")
                    }, r.send()
                }

                function r(t) {
                    var e = new XMLHttpRequest;
                    e.open("HEAD", t, !1);
                    try {
                        e.send()
                    } catch (t) {}
                    return 200 <= e.status && 299 >= e.status
                }

                function o(t) {
                    try {
                        t.dispatchEvent(new MouseEvent("click"))
                    } catch (n) {
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), t.dispatchEvent(e)
                    }
                }
                var i = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof n.g && n.g.global === n.g ? n.g : void 0,
                    u = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
                    a = i.saveAs || ("object" != typeof window || window !== i ? function() {} : "download" in HTMLAnchorElement.prototype && !u ? function(t, n, u) {
                        var a = i.URL || i.webkitURL,
                            s = document.createElement("a");
                        n = n || t.name || "download", s.download = n, s.rel = "noopener", "string" == typeof t ? (s.href = t, s.origin === location.origin ? o(s) : r(s.href) ? e(t, n, u) : o(s, s.target = "_blank")) : (s.href = a.createObjectURL(t), setTimeout(function() {
                            a.revokeObjectURL(s.href)
                        }, 4e4), setTimeout(function() {
                            o(s)
                        }, 0))
                    } : "msSaveOrOpenBlob" in navigator ? function(t, n, i) {
                        if (n = n || t.name || "download", "string" != typeof t) {
                            var u;
                            navigator.msSaveOrOpenBlob((void 0 === (u = i) ? u = {
                                autoBom: !1
                            } : "object" != typeof u && (console.warn("Deprecated: Expected third argument to be a object"), u = {
                                autoBom: !u
                            }), u.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob(["\uFEFF", t], {
                                type: t.type
                            }) : t), n)
                        } else if (r(t)) e(t, n, i);
                        else {
                            var a = document.createElement("a");
                            a.href = t, a.target = "_blank", setTimeout(function() {
                                o(a)
                            })
                        }
                    } : function(t, n, r, o) {
                        if ((o = o || open("", "_blank")) && (o.document.title = o.document.body.innerText = "downloading..."), "string" == typeof t) return e(t, n, r);
                        var a = "application/octet-stream" === t.type,
                            s = /constructor/i.test(i.HTMLElement) || i.safari,
                            c = /CriOS\/[\d]+/.test(navigator.userAgent);
                        if ((c || a && s || u) && "undefined" != typeof FileReader) {
                            var l = new FileReader;
                            l.onloadend = function() {
                                var t = l.result;
                                t = c ? t : t.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = t : location = t, o = null
                            }, l.readAsDataURL(t)
                        } else {
                            var f = i.URL || i.webkitURL,
                                d = f.createObjectURL(t);
                            o ? o.location = d : location.href = d, o = null, setTimeout(function() {
                                f.revokeObjectURL(d)
                            }, 4e4)
                        }
                    });
                i.saveAs = a.saveAs = a, t.exports = a
            }) ? o.apply(e, []) : o) && (t.exports = r)
        },
        39515: function(t, e, n) {
            var r = n(38761)(n(37772), "DataView");
            t.exports = r
        },
        52760: function(t, e, n) {
            var r = n(38761)(n(37772), "Promise");
            t.exports = r
        },
        2143: function(t, e, n) {
            var r = n(38761)(n(37772), "Set");
            t.exports = r
        },
        93215: function(t, e, n) {
            var r = n(38761)(n(37772), "WeakMap");
            t.exports = r
        },
        14034: function(t) {
            t.exports = function(t, e, n) {
                return t == t && (void 0 !== n && (t = t <= n ? t : n), void 0 !== e && (t = t >= e ? t : e)), t
            }
        },
        93228: function(t) {
            var e = Math.ceil,
                n = Math.max;
            t.exports = function(t, r, o, i) {
                for (var u = -1, a = n(e((r - t) / (o || 1)), 0), s = Array(a); a--;) s[i ? a : ++u] = t, t += o;
                return s
            }
        },
        82941: function(t, e, n) {
            var r = n(93228),
                o = n(82406),
                i = n(5707);
            t.exports = function(t) {
                return function(e, n, u) {
                    return u && "number" != typeof u && o(e, n, u) && (n = u = void 0), e = i(e), void 0 === n ? (n = e, e = 0) : n = i(n), u = void 0 === u ? e < n ? 1 : -1 : i(u), r(e, n, u, t)
                }
            }
        },
        70940: function(t, e, n) {
            var r = n(39515),
                o = n(10326),
                i = n(52760),
                u = n(2143),
                a = n(93215),
                s = n(53366),
                c = n(87035),
                l = "[object Map]",
                f = "[object Promise]",
                d = "[object Set]",
                p = "[object WeakMap]",
                h = "[object DataView]",
                v = c(r),
                m = c(o),
                g = c(i),
                b = c(u),
                y = c(a),
                w = s;
            (r && w(new r(new ArrayBuffer(1))) != h || o && w(new o) != l || i && w(i.resolve()) != f || u && w(new u) != d || a && w(new a) != p) && (w = function(t) {
                var e = s(t),
                    n = "[object Object]" == e ? t.constructor : void 0,
                    r = n ? c(n) : "";
                if (r) switch (r) {
                    case v:
                        return h;
                    case m:
                        return l;
                    case g:
                        return f;
                    case b:
                        return d;
                    case y:
                        return p
                }
                return e
            }), t.exports = w
        },
        82406: function(t, e, n) {
            var r = n(41225),
                o = n(67878),
                i = n(39045),
                u = n(29259);
            t.exports = function(t, e, n) {
                if (!u(n)) return !1;
                var a = typeof e;
                return ("number" == a ? !!(o(n) && i(e, n.length)) : "string" == a && e in n) && r(n[e], t)
            }
        },
        27875: function(t, e, n) {
            var r = n(14034),
                o = n(7642);
            t.exports = function(t, e, n) {
                return void 0 === n && (n = e, e = void 0), void 0 !== n && (n = (n = o(n)) == n ? n : 0), void 0 !== e && (e = (e = o(e)) == e ? e : 0), r(o(t), e, n)
            }
        },
        45455: function(t, e, n) {
            var r = n(86411),
                o = n(70940),
                i = n(79631),
                u = n(86152),
                a = n(67878),
                s = n(73226),
                c = n(16001),
                l = n(77598),
                f = Object.prototype.hasOwnProperty;
            t.exports = function(t) {
                if (null == t) return !0;
                if (a(t) && (u(t) || "string" == typeof t || "function" == typeof t.splice || s(t) || l(t) || i(t))) return !t.length;
                var e = o(t);
                if ("[object Map]" == e || "[object Set]" == e) return !t.size;
                if (c(t)) return !r(t).length;
                for (var n in t)
                    if (f.call(t, n)) return !1;
                return !0
            }
        },
        2689: function(t, e, n) {
            var r = n(82941)();
            t.exports = r
        },
        68015: function(t, e, n) {
            var r = n(67320)("round");
            t.exports = r
        },
        28394: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return y
                }
            });
            var r = n(7896),
                o = n(2784),
                i = n(43208),
                u = n(87984),
                a = {
                    "min-height": "0",
                    "max-height": "none",
                    height: "0",
                    visibility: "hidden",
                    overflow: "hidden",
                    position: "absolute",
                    "z-index": "-1000",
                    top: "0",
                    right: "0"
                },
                s = function(t) {
                    Object.keys(a).forEach(function(e) {
                        t.style.setProperty(e, a[e], "important")
                    })
                },
                c = null,
                l = function(t, e) {
                    var n = t.scrollHeight;
                    return "border-box" === e.sizingStyle.boxSizing ? n + e.borderSize : n - e.paddingSize
                },
                f = function() {},
                d = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "tabSize", "textIndent", "textRendering", "textTransform", "width", "wordBreak"],
                p = !!document.documentElement.currentStyle,
                h = function(t) {
                    var e = window.getComputedStyle(t);
                    if (null === e) return null;
                    var n = d.reduce(function(t, n) {
                            return t[n] = e[n], t
                        }, {}),
                        r = n.boxSizing;
                    if ("" === r) return null;
                    p && "border-box" === r && (n.width = parseFloat(n.width) + parseFloat(n.borderRightWidth) + parseFloat(n.borderLeftWidth) + parseFloat(n.paddingRight) + parseFloat(n.paddingLeft) + "px");
                    var o = parseFloat(n.paddingBottom) + parseFloat(n.paddingTop),
                        i = parseFloat(n.borderBottomWidth) + parseFloat(n.borderTopWidth);
                    return {
                        sizingStyle: n,
                        paddingSize: o,
                        borderSize: i
                    }
                };

            function v(t, e, n) {
                var r = (0, i.Z)(n);
                (0, o.useLayoutEffect)(function() {
                    var n = function(t) {
                        return r.current(t)
                    };
                    return t.addEventListener(e, n),
                        function() {
                            return t.removeEventListener(e, n)
                        }
                }, [])
            }
            var m = function(t) {
                    v(window, "resize", t)
                },
                g = function(t) {
                    v(document.fonts, "loadingdone", t)
                },
                b = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"],
                y = (0, o.forwardRef)(function(t, e) {
                    var n = t.cacheMeasurements,
                        i = t.maxRows,
                        a = t.minRows,
                        d = t.onChange,
                        p = void 0 === d ? f : d,
                        v = t.onHeightChange,
                        y = void 0 === v ? f : v,
                        w = function(t, e) {
                            if (null == t) return {};
                            var n, r, o = {},
                                i = Object.keys(t);
                            for (r = 0; r < i.length; r++) n = i[r], e.indexOf(n) >= 0 || (o[n] = t[n]);
                            return o
                        }(t, b),
                        x = void 0 !== w.value,
                        S = (0, o.useRef)(null),
                        M = (0, u.Z)(S, e),
                        E = (0, o.useRef)(0),
                        U = (0, o.useRef)(),
                        O = function() {
                            var t, e, r, o, u, f, d, p, v, m, g, b = S.current,
                                w = n && U.current ? U.current : h(b);
                            if (w) {
                                U.current = w;
                                var x = (t = b.value || b.placeholder || "x", void 0 === (e = a) && (e = 1), void 0 === (r = i) && (r = 1 / 0), c || ((c = document.createElement("textarea")).setAttribute("tabindex", "-1"), c.setAttribute("aria-hidden", "true"), s(c)), null === c.parentNode && document.body.appendChild(c), o = w.paddingSize, u = w.borderSize, d = (f = w.sizingStyle).boxSizing, Object.keys(f).forEach(function(t) {
                                        c.style[t] = f[t]
                                    }), s(c), c.value = t, p = l(c, w), c.value = t, p = l(c, w), c.value = "x", m = (v = c.scrollHeight - o) * e, "border-box" === d && (m = m + o + u), p = Math.max(m, p), g = v * r, "border-box" === d && (g = g + o + u), [p = Math.min(g, p), v]),
                                    M = x[0],
                                    O = x[1];
                                E.current !== M && (E.current = M, b.style.setProperty("height", M + "px", "important"), y(M, {
                                    rowHeight: O
                                }))
                            }
                        };
                    return (0, o.useLayoutEffect)(O), m(O), g(O), (0, o.createElement)("textarea", (0, r.Z)({}, w, {
                        onChange: function(t) {
                            x || O(), p(t)
                        },
                        ref: M
                    }))
                })
        },
        35185: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return s
                }
            });
            var r = n(2784),
                o = function(t) {
                    (0, r.useEffect)(t, [])
                },
                i = function(t) {
                    var e = (0, r.useRef)(t);
                    e.current = t, o(function() {
                        return function() {
                            return e.current()
                        }
                    })
                },
                u = function(t) {
                    var e = (0, r.useRef)(0),
                        n = (0, r.useState)(t),
                        o = n[0],
                        u = n[1],
                        a = (0, r.useCallback)(function(t) {
                            cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
                                u(t)
                            })
                        }, []);
                    return i(function() {
                        cancelAnimationFrame(e.current)
                    }), [o, a]
                },
                a = n(36883),
                s = function(t, e) {
                    void 0 === t && (t = 1 / 0), void 0 === e && (e = 1 / 0);
                    var n = u({
                            width: a.jU ? window.innerWidth : t,
                            height: a.jU ? window.innerHeight : e
                        }),
                        o = n[0],
                        i = n[1];
                    return (0, r.useEffect)(function() {
                        if (a.jU) {
                            var t = function() {
                                i({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                })
                            };
                            return (0, a.on)(window, "resize", t),
                                function() {
                                    (0, a.S1)(window, "resize", t)
                                }
                        }
                    }, []), o
                }
        },
        28709: function(t, e, n) {
            var r;
            t.exports = (r = n(2784), function(t) {
                var e = {};

                function n(r) {
                    if (e[r]) return e[r].exports;
                    var o = e[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                    };
                    return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
                }
                return n.m = t, n.c = e, n.d = function(t, e, r) {
                    n.o(t, e) || Object.defineProperty(t, e, {
                        enumerable: !0,
                        get: r
                    })
                }, n.r = function(t) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                        value: "Module"
                    }), Object.defineProperty(t, "__esModule", {
                        value: !0
                    })
                }, n.t = function(t, e) {
                    if (1 & e && (t = n(t)), 8 & e || 4 & e && "object" == typeof t && t && t.__esModule) return t;
                    var r = Object.create(null);
                    if (n.r(r), Object.defineProperty(r, "default", {
                            enumerable: !0,
                            value: t
                        }), 2 & e && "string" != typeof t)
                        for (var o in t) n.d(r, o, (function(e) {
                            return t[e]
                        }).bind(null, o));
                    return r
                }, n.n = function(t) {
                    var e = t && t.__esModule ? function() {
                        return t.default
                    } : function() {
                        return t
                    };
                    return n.d(e, "a", e), e
                }, n.o = function(t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }, n.p = "", n(n.s = "./src/react-webcam.tsx")
            }({
                "./src/react-webcam.tsx": function(t, e, n) {
                    "use strict";
                    n.r(e);
                    var r, o = n( /*! react */ "react"),
                        i = (r = function(t, e) {
                            return (r = Object.setPrototypeOf || ({
                                __proto__: []
                            }) instanceof Array && function(t, e) {
                                t.__proto__ = e
                            } || function(t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(t, e)
                        }, function(t, e) {
                            function n() {
                                this.constructor = t
                            }
                            r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                        }),
                        u = function() {
                            return (u = Object.assign || function(t) {
                                for (var e, n = 1, r = arguments.length; n < r; n++)
                                    for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                                return t
                            }).apply(this, arguments)
                        },
                        a = function(t, e) {
                            var n = {};
                            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && 0 > e.indexOf(r) && (n[r] = t[r]);
                            if (null != t && "function" == typeof Object.getOwnPropertySymbols)
                                for (var o = 0, r = Object.getOwnPropertySymbols(t); o < r.length; o++) 0 > e.indexOf(r[o]) && Object.prototype.propertyIsEnumerable.call(t, r[o]) && (n[r[o]] = t[r[o]]);
                            return n
                        };

                    function s() {
                        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
                    }
                    "undefined" != typeof window && (void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function(t) {
                        var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                        return e ? new Promise(function(n, r) {
                            e.call(navigator, t, n, r)
                        }) : Promise.reject(Error("getUserMedia is not implemented in this browser"))
                    }));
                    var c = function(t) {
                        function e(e) {
                            var n = t.call(this, e) || this;
                            return n.canvas = null, n.ctx = null, n.requestUserMediaId = 0, n.unmounted = !1, n.state = {
                                hasUserMedia: !1
                            }, n
                        }
                        return i(e, t), e.prototype.componentDidMount = function() {
                            var t = this.state,
                                e = this.props;
                            if (!s()) {
                                e.onUserMediaError("getUserMedia not supported");
                                return
                            }
                            t.hasUserMedia || this.requestUserMedia(), e.children && "function" != typeof e.children && console.warn("children must be a function")
                        }, e.prototype.componentDidUpdate = function(t) {
                            var e = this.props;
                            if (!s()) {
                                e.onUserMediaError("getUserMedia not supported");
                                return
                            }
                            var n = JSON.stringify(t.audioConstraints) !== JSON.stringify(e.audioConstraints),
                                r = JSON.stringify(t.videoConstraints) !== JSON.stringify(e.videoConstraints),
                                o = t.minScreenshotWidth !== e.minScreenshotWidth,
                                i = t.minScreenshotHeight !== e.minScreenshotHeight;
                            (r || o || i) && (this.canvas = null, this.ctx = null), (n || r) && (this.stopAndCleanup(), this.requestUserMedia())
                        }, e.prototype.componentWillUnmount = function() {
                            this.unmounted = !0, this.stopAndCleanup()
                        }, e.stopMediaStream = function(t) {
                            t && (t.getVideoTracks && t.getAudioTracks ? (t.getVideoTracks().map(function(e) {
                                t.removeTrack(e), e.stop()
                            }), t.getAudioTracks().map(function(e) {
                                t.removeTrack(e), e.stop()
                            })) : t.stop())
                        }, e.prototype.stopAndCleanup = function() {
                            var t = this.state;
                            t.hasUserMedia && (e.stopMediaStream(this.stream), t.src && window.URL.revokeObjectURL(t.src))
                        }, e.prototype.getScreenshot = function(t) {
                            var e = this.state,
                                n = this.props;
                            if (!e.hasUserMedia) return null;
                            var r = this.getCanvas(t);
                            return r && r.toDataURL(n.screenshotFormat, n.screenshotQuality)
                        }, e.prototype.getCanvas = function(t) {
                            var e = this.state,
                                n = this.props;
                            if (!this.video || !e.hasUserMedia || !this.video.videoHeight) return null;
                            if (!this.ctx) {
                                var r = this.video.videoWidth,
                                    o = this.video.videoHeight;
                                if (!this.props.forceScreenshotSourceSize) {
                                    var i = r / o;
                                    o = (r = n.minScreenshotWidth || this.video.clientWidth) / i, n.minScreenshotHeight && o < n.minScreenshotHeight && (r = (o = n.minScreenshotHeight) * i)
                                }
                                this.canvas = document.createElement("canvas"), this.canvas.width = (null == t ? void 0 : t.width) || r, this.canvas.height = (null == t ? void 0 : t.height) || o, this.ctx = this.canvas.getContext("2d")
                            }
                            var u = this.ctx,
                                a = this.canvas;
                            return u && a && (n.mirrored && (u.translate(a.width, 0), u.scale(-1, 1)), u.imageSmoothingEnabled = n.imageSmoothing, u.drawImage(this.video, 0, 0, (null == t ? void 0 : t.width) || a.width, (null == t ? void 0 : t.height) || a.height), n.mirrored && (u.scale(-1, 1), u.translate(-a.width, 0))), a
                        }, e.prototype.requestUserMedia = function() {
                            var t = this,
                                n = this.props,
                                r = function(r, o) {
                                    var i = {
                                        video: void 0 === o || o
                                    };
                                    n.audio && (i.audio = void 0 === r || r), t.requestUserMediaId++;
                                    var u = t.requestUserMediaId;
                                    navigator.mediaDevices.getUserMedia(i).then(function(n) {
                                        t.unmounted || u !== t.requestUserMediaId ? e.stopMediaStream(n) : t.handleUserMedia(null, n)
                                    }).catch(function(e) {
                                        t.handleUserMedia(e)
                                    })
                                };
                            if ("mediaDevices" in navigator) r(n.audioConstraints, n.videoConstraints);
                            else {
                                var o = function(t) {
                                        return {
                                            optional: [{
                                                sourceId: t
                                            }]
                                        }
                                    },
                                    i = function(t) {
                                        var e = t.deviceId;
                                        return "string" == typeof e ? e : Array.isArray(e) && e.length > 0 ? e[0] : "object" == typeof e && e.ideal ? e.ideal : null
                                    };
                                MediaStreamTrack.getSources(function(t) {
                                    var e = null,
                                        u = null;
                                    t.forEach(function(t) {
                                        "audio" === t.kind ? e = t.id : "video" === t.kind && (u = t.id)
                                    });
                                    var a = i(n.audioConstraints);
                                    a && (e = a);
                                    var s = i(n.videoConstraints);
                                    s && (u = s), r(o(e), o(u))
                                })
                            }
                        }, e.prototype.handleUserMedia = function(t, e) {
                            var n = this.props;
                            if (t || !e) {
                                this.setState({
                                    hasUserMedia: !1
                                }), n.onUserMediaError(t);
                                return
                            }
                            this.stream = e;
                            try {
                                this.video && (this.video.srcObject = e), this.setState({
                                    hasUserMedia: !0
                                })
                            } catch (t) {
                                this.setState({
                                    hasUserMedia: !0,
                                    src: window.URL.createObjectURL(e)
                                })
                            }
                            n.onUserMedia(e)
                        }, e.prototype.render = function() {
                            var t = this,
                                e = this.state,
                                n = this.props,
                                r = n.audio,
                                i = (n.forceScreenshotSourceSize, n.onUserMedia, n.onUserMediaError, n.screenshotFormat, n.screenshotQuality, n.minScreenshotWidth, n.minScreenshotHeight, n.audioConstraints, n.videoConstraints, n.imageSmoothing, n.mirrored),
                                s = n.style,
                                c = void 0 === s ? {} : s,
                                l = n.children,
                                f = a(n, ["audio", "forceScreenshotSourceSize", "onUserMedia", "onUserMediaError", "screenshotFormat", "screenshotQuality", "minScreenshotWidth", "minScreenshotHeight", "audioConstraints", "videoConstraints", "imageSmoothing", "mirrored", "style", "children"]),
                                d = i ? u(u({}, c), {
                                    transform: (c.transform || "") + " scaleX(-1)"
                                }) : c,
                                p = {
                                    getScreenshot: this.getScreenshot.bind(this)
                                };
                            return o.createElement(o.Fragment, null, o.createElement("video", u({
                                autoPlay: !0,
                                src: e.src,
                                muted: !r,
                                playsInline: !0,
                                ref: function(e) {
                                    t.video = e
                                },
                                style: d
                            }, f)), l && l(p))
                        }, e.defaultProps = {
                            audio: !1,
                            forceScreenshotSourceSize: !1,
                            imageSmoothing: !0,
                            mirrored: !1,
                            onUserMedia: function() {},
                            onUserMediaError: function() {},
                            screenshotFormat: "image/webp",
                            screenshotQuality: .92
                        }, e
                    }(o.Component);
                    e.default = c
                },
                react: function(t, e) {
                    t.exports = r
                }
            }).default)
        },
        87984: function(t, e, n) {
            "use strict";
            var r = n(2784),
                o = function(t, e) {
                    if ("function" == typeof t) {
                        t(e);
                        return
                    }
                    t.current = e
                };
            e.Z = function(t, e) {
                var n = (0, r.useRef)();
                return (0, r.useCallback)(function(r) {
                    t.current = r, n.current && o(n.current, null), n.current = e, e && o(e, r)
                }, [e])
            }
        },
        43208: function(t, e, n) {
            "use strict";
            n.d(e, {
                Z: function() {
                    return i
                }
            });
            var r = n(2784),
                o = r.useLayoutEffect,
                i = function(t) {
                    var e = r.useRef(t);
                    return o(function() {
                        e.current = t
                    }), e
                }
        },
        7896: function(t, e, n) {
            "use strict";

            function r() {
                return (r = Object.assign ? Object.assign.bind() : function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                    }
                    return t
                }).apply(this, arguments)
            }
            n.d(e, {
                Z: function() {
                    return r
                }
            })
        },
        55230: function(t, e, n) {
            "use strict";
            n.d(e, {
                Vi: function() {
                    return R
                }
            });
            var r = {
                    grad: .9,
                    turn: 360,
                    rad: 360 / (2 * Math.PI)
                },
                o = function(t) {
                    return "string" == typeof t ? t.length > 0 : "number" == typeof t
                },
                i = function(t, e, n) {
                    return void 0 === e && (e = 0), void 0 === n && (n = Math.pow(10, e)), Math.round(n * t) / n + 0
                },
                u = function(t, e, n) {
                    return void 0 === e && (e = 0), void 0 === n && (n = 1), t > n ? n : t > e ? t : e
                },
                a = function(t) {
                    return (t = isFinite(t) ? t % 360 : 0) > 0 ? t : t + 360
                },
                s = function(t) {
                    return {
                        r: u(t.r, 0, 255),
                        g: u(t.g, 0, 255),
                        b: u(t.b, 0, 255),
                        a: u(t.a)
                    }
                },
                c = function(t) {
                    return {
                        r: i(t.r),
                        g: i(t.g),
                        b: i(t.b),
                        a: i(t.a, 3)
                    }
                },
                l = /^#([0-9a-f]{3,8})$/i,
                f = function(t) {
                    var e = t.toString(16);
                    return e.length < 2 ? "0" + e : e
                },
                d = function(t) {
                    var e = t.r,
                        n = t.g,
                        r = t.b,
                        o = t.a,
                        i = Math.max(e, n, r),
                        u = i - Math.min(e, n, r),
                        a = u ? i === e ? (n - r) / u : i === n ? 2 + (r - e) / u : 4 + (e - n) / u : 0;
                    return {
                        h: 60 * (a < 0 ? a + 6 : a),
                        s: i ? u / i * 100 : 0,
                        v: i / 255 * 100,
                        a: o
                    }
                },
                p = function(t) {
                    var e = t.h,
                        n = t.s,
                        r = t.v,
                        o = t.a;
                    e = e / 360 * 6, n /= 100, r /= 100;
                    var i = Math.floor(e),
                        u = r * (1 - n),
                        a = r * (1 - (e - i) * n),
                        s = r * (1 - (1 - e + i) * n),
                        c = i % 6;
                    return {
                        r: 255 * [r, a, u, u, s, r][c],
                        g: 255 * [s, r, r, a, u, u][c],
                        b: 255 * [u, u, s, r, r, a][c],
                        a: o
                    }
                },
                h = function(t) {
                    return {
                        h: a(t.h),
                        s: u(t.s, 0, 100),
                        l: u(t.l, 0, 100),
                        a: u(t.a)
                    }
                },
                v = function(t) {
                    return {
                        h: i(t.h),
                        s: i(t.s),
                        l: i(t.l),
                        a: i(t.a, 3)
                    }
                },
                m = function(t) {
                    var e, n;
                    return p((e = t.s, {
                        h: t.h,
                        s: (e *= ((n = t.l) < 50 ? n : 100 - n) / 100) > 0 ? 2 * e / (n + e) * 100 : 0,
                        v: n + e,
                        a: t.a
                    }))
                },
                g = function(t) {
                    var e, n, r, o;
                    return {
                        h: (e = d(t)).h,
                        s: (o = (200 - (n = e.s)) * (r = e.v) / 100) > 0 && o < 200 ? n * r / 100 / (o <= 100 ? o : 200 - o) * 100 : 0,
                        l: o / 2,
                        a: e.a
                    }
                },
                b = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
                y = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
                w = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
                x = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
                S = {
                    string: [
                        [function(t) {
                            var e = l.exec(t);
                            return e ? (t = e[1]).length <= 4 ? {
                                r: parseInt(t[0] + t[0], 16),
                                g: parseInt(t[1] + t[1], 16),
                                b: parseInt(t[2] + t[2], 16),
                                a: 4 === t.length ? i(parseInt(t[3] + t[3], 16) / 255, 2) : 1
                            } : 6 === t.length || 8 === t.length ? {
                                r: parseInt(t.substr(0, 2), 16),
                                g: parseInt(t.substr(2, 2), 16),
                                b: parseInt(t.substr(4, 2), 16),
                                a: 8 === t.length ? i(parseInt(t.substr(6, 2), 16) / 255, 2) : 1
                            } : null : null
                        }, "hex"],
                        [function(t) {
                            var e = w.exec(t) || x.exec(t);
                            return e ? e[2] !== e[4] || e[4] !== e[6] ? null : s({
                                r: Number(e[1]) / (e[2] ? 100 / 255 : 1),
                                g: Number(e[3]) / (e[4] ? 100 / 255 : 1),
                                b: Number(e[5]) / (e[6] ? 100 / 255 : 1),
                                a: void 0 === e[7] ? 1 : Number(e[7]) / (e[8] ? 100 : 1)
                            }) : null
                        }, "rgb"],
                        [function(t) {
                            var e, n, o = b.exec(t) || y.exec(t);
                            return o ? m(h({
                                h: (e = o[1], void 0 === (n = o[2]) && (n = "deg"), Number(e) * (r[n] || 1)),
                                s: Number(o[3]),
                                l: Number(o[4]),
                                a: void 0 === o[5] ? 1 : Number(o[5]) / (o[6] ? 100 : 1)
                            })) : null
                        }, "hsl"]
                    ],
                    object: [
                        [function(t) {
                            var e = t.r,
                                n = t.g,
                                r = t.b,
                                i = t.a;
                            return o(e) && o(n) && o(r) ? s({
                                r: Number(e),
                                g: Number(n),
                                b: Number(r),
                                a: Number(void 0 === i ? 1 : i)
                            }) : null
                        }, "rgb"],
                        [function(t) {
                            var e = t.h,
                                n = t.s,
                                r = t.l,
                                i = t.a;
                            return o(e) && o(n) && o(r) ? m(h({
                                h: Number(e),
                                s: Number(n),
                                l: Number(r),
                                a: Number(void 0 === i ? 1 : i)
                            })) : null
                        }, "hsl"],
                        [function(t) {
                            var e, n = t.h,
                                r = t.s,
                                i = t.v,
                                s = t.a;
                            return o(n) && o(r) && o(i) ? p({
                                h: a((e = {
                                    h: Number(n),
                                    s: Number(r),
                                    v: Number(i),
                                    a: Number(void 0 === s ? 1 : s)
                                }).h),
                                s: u(e.s, 0, 100),
                                v: u(e.v, 0, 100),
                                a: u(e.a)
                            }) : null
                        }, "hsv"]
                    ]
                },
                M = function(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n][0](t);
                        if (r) return [r, e[n][1]]
                    }
                    return [null, void 0]
                },
                E = function(t, e) {
                    var n = g(t);
                    return {
                        h: n.h,
                        s: u(n.s + 100 * e, 0, 100),
                        l: n.l,
                        a: n.a
                    }
                },
                U = function(t) {
                    return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3 / 255
                },
                O = function(t, e) {
                    var n = g(t);
                    return {
                        h: n.h,
                        s: n.s,
                        l: u(n.l + 100 * e, 0, 100),
                        a: n.a
                    }
                },
                j = function() {
                    function t(t) {
                        this.parsed = ("string" == typeof t ? M(t.trim(), S.string) : "object" == typeof t && null !== t ? M(t, S.object) : [null, void 0])[0], this.rgba = this.parsed || {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 1
                        }
                    }
                    return t.prototype.isValid = function() {
                        return null !== this.parsed
                    }, t.prototype.brightness = function() {
                        return i(U(this.rgba), 2)
                    }, t.prototype.isDark = function() {
                        return .5 > U(this.rgba)
                    }, t.prototype.isLight = function() {
                        return U(this.rgba) >= .5
                    }, t.prototype.toHex = function() {
                        var t, e, n, r, o, u;
                        return e = (t = c(this.rgba)).r, n = t.g, r = t.b, u = (o = t.a) < 1 ? f(i(255 * o)) : "", "#" + f(e) + f(n) + f(r) + u
                    }, t.prototype.toRgb = function() {
                        return c(this.rgba)
                    }, t.prototype.toRgbString = function() {
                        var t, e, n, r, o;
                        return e = (t = c(this.rgba)).r, n = t.g, r = t.b, (o = t.a) < 1 ? "rgba(" + e + ", " + n + ", " + r + ", " + o + ")" : "rgb(" + e + ", " + n + ", " + r + ")"
                    }, t.prototype.toHsl = function() {
                        return v(g(this.rgba))
                    }, t.prototype.toHslString = function() {
                        var t, e, n, r, o;
                        return e = (t = v(g(this.rgba))).h, n = t.s, r = t.l, (o = t.a) < 1 ? "hsla(" + e + ", " + n + "%, " + r + "%, " + o + ")" : "hsl(" + e + ", " + n + "%, " + r + "%)"
                    }, t.prototype.toHsv = function() {
                        var t;
                        return {
                            h: i((t = d(this.rgba)).h),
                            s: i(t.s),
                            v: i(t.v),
                            a: i(t.a, 3)
                        }
                    }, t.prototype.invert = function() {
                        var t;
                        return R({
                            r: 255 - (t = this.rgba).r,
                            g: 255 - t.g,
                            b: 255 - t.b,
                            a: t.a
                        })
                    }, t.prototype.saturate = function(t) {
                        return void 0 === t && (t = .1), R(E(this.rgba, t))
                    }, t.prototype.desaturate = function(t) {
                        return void 0 === t && (t = .1), R(E(this.rgba, -t))
                    }, t.prototype.grayscale = function() {
                        return R(E(this.rgba, -1))
                    }, t.prototype.lighten = function(t) {
                        return void 0 === t && (t = .1), R(O(this.rgba, t))
                    }, t.prototype.darken = function(t) {
                        return void 0 === t && (t = .1), R(O(this.rgba, -t))
                    }, t.prototype.rotate = function(t) {
                        return void 0 === t && (t = 15), this.hue(this.hue() + t)
                    }, t.prototype.alpha = function(t) {
                        var e;
                        return "number" == typeof t ? R({
                            r: (e = this.rgba).r,
                            g: e.g,
                            b: e.b,
                            a: t
                        }) : i(this.rgba.a, 3)
                    }, t.prototype.hue = function(t) {
                        var e = g(this.rgba);
                        return "number" == typeof t ? R({
                            h: t,
                            s: e.s,
                            l: e.l,
                            a: e.a
                        }) : i(e.h)
                    }, t.prototype.isEqual = function(t) {
                        return this.toHex() === R(t).toHex()
                    }, t
                }(),
                R = function(t) {
                    return t instanceof j ? t : new j(t)
                }
        },
        25925: function(t, e, n) {
            "use strict";
            n.d(e, {
                M: function() {
                    return g
                }
            });
            var r = n(2784),
                o = n(85886),
                i = n(20251),
                u = n(97967),
                a = n(3105);
            class s extends r.Component {
                getSnapshotBeforeUpdate(t) {
                    let e = this.props.childRef.current;
                    if (e && t.isPresent && !this.props.isPresent) {
                        let t = this.props.sizeRef.current;
                        t.height = e.offsetHeight || 0, t.width = e.offsetWidth || 0, t.top = e.offsetTop, t.left = e.offsetLeft
                    }
                    return null
                }
                componentDidUpdate() {}
                render() {
                    return this.props.children
                }
            }

            function c({
                children: t,
                isPresent: e
            }) {
                let n = (0, r.useId)(),
                    o = (0, r.useRef)(null),
                    i = (0, r.useRef)({
                        width: 0,
                        height: 0,
                        top: 0,
                        left: 0
                    });
                return (0, r.useInsertionEffect)(() => {
                    let {
                        width: t,
                        height: r,
                        top: u,
                        left: a
                    } = i.current;
                    if (e || !o.current || !t || !r) return;
                    o.current.dataset.motionPopId = n;
                    let s = document.createElement("style");
                    return document.head.appendChild(s), s.sheet && s.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${r}px !important;
            top: ${u}px !important;
            left: ${a}px !important;
          }
        `), () => {
                        document.head.removeChild(s)
                    }
                }, [e]), r.createElement(s, {
                    isPresent: e,
                    childRef: o,
                    sizeRef: i
                }, r.cloneElement(t, {
                    ref: o
                }))
            }
            let l = ({
                children: t,
                initial: e,
                isPresent: n,
                onExitComplete: o,
                custom: i,
                presenceAffectsLayout: s,
                mode: l
            }) => {
                let d = (0, a.h)(f),
                    p = (0, r.useId)(),
                    h = (0, r.useMemo)(() => ({
                        id: p,
                        initial: e,
                        isPresent: n,
                        custom: i,
                        onExitComplete: t => {
                            for (let e of (d.set(t, !0), d.values()))
                                if (!e) return;
                            o && o()
                        },
                        register: t => (d.set(t, !1), () => d.delete(t))
                    }), s ? void 0 : [n]);
                return (0, r.useMemo)(() => {
                    d.forEach((t, e) => d.set(e, !1))
                }, [n]), r.useEffect(() => {
                    n || d.size || !o || o()
                }, [n]), "popLayout" === l && (t = r.createElement(c, {
                    isPresent: n
                }, t)), r.createElement(u.O.Provider, {
                    value: h
                }, t)
            };

            function f() {
                return new Map
            }
            var d = n(3422),
                p = n(23617),
                h = n(96073),
                v = n(57035);
            let m = t => t.key || "",
                g = ({
                    children: t,
                    custom: e,
                    initial: n = !0,
                    onExitComplete: u,
                    exitBeforeEnter: a,
                    presenceAffectsLayout: s = !0,
                    mode: c = "sync"
                }) => {
                    (0, v.k)(!a, "Replace exitBeforeEnter with mode='wait'");
                    let [f] = (0, o.N)(), g = (0, r.useContext)(d.p).forceRender;
                    g && (f = g);
                    let b = (0, i.t)(),
                        y = function(t) {
                            let e = [];
                            return r.Children.forEach(t, t => {
                                (0, r.isValidElement)(t) && e.push(t)
                            }), e
                        }(t),
                        w = y,
                        x = new Set,
                        S = (0, r.useRef)(w),
                        M = (0, r.useRef)(new Map).current,
                        E = (0, r.useRef)(!0);
                    if ((0, p.L)(() => {
                            E.current = !1,
                                function(t, e) {
                                    t.forEach(t => {
                                        let n = m(t);
                                        e.set(n, t)
                                    })
                                }(y, M), S.current = w
                        }), (0, h.z)(() => {
                            E.current = !0, M.clear(), x.clear()
                        }), E.current) return r.createElement(r.Fragment, null, w.map(t => r.createElement(l, {
                        key: m(t),
                        isPresent: !0,
                        initial: !!n && void 0,
                        presenceAffectsLayout: s,
                        mode: c
                    }, t)));
                    w = [...w];
                    let U = S.current.map(m),
                        O = y.map(m),
                        j = U.length;
                    for (let t = 0; t < j; t++) {
                        let e = U[t]; - 1 === O.indexOf(e) && x.add(e)
                    }
                    return "wait" === c && x.size && (w = []), x.forEach(t => {
                        if (-1 !== O.indexOf(t)) return;
                        let n = M.get(t);
                        if (!n) return;
                        let o = U.indexOf(t),
                            i = () => {
                                M.delete(t), x.delete(t);
                                let e = S.current.findIndex(e => e.key === t);
                                if (S.current.splice(e, 1), !x.size) {
                                    if (S.current = y, !1 === b.current) return;
                                    f(), u && u()
                                }
                            };
                        w.splice(o, 0, r.createElement(l, {
                            key: m(n),
                            isPresent: !1,
                            onExitComplete: i,
                            custom: e,
                            presenceAffectsLayout: s,
                            mode: c
                        }, n))
                    }), w = w.map(t => {
                        let e = t.key;
                        return x.has(e) ? t : r.createElement(l, {
                            key: m(t),
                            isPresent: !0,
                            presenceAffectsLayout: s,
                            mode: c
                        }, t)
                    }), r.createElement(r.Fragment, null, x.size ? w : w.map(t => (0, r.cloneElement)(t)))
                }
        },
        30453: function(t, e, n) {
            "use strict";
            n.d(e, {
                S: function() {
                    return o
                },
                o: function() {
                    return u
                }
            });
            var r = n(3105);
            class o {
                constructor() {
                    this.componentControls = new Set
                }
                subscribe(t) {
                    return this.componentControls.add(t), () => this.componentControls.delete(t)
                }
                start(t, e) {
                    this.componentControls.forEach(n => {
                        n.start(t.nativeEvent || t, e)
                    })
                }
            }
            let i = () => new o;

            function u() {
                return (0, r.h)(i)
            }
        },
        10810: function(t, e, n) {
            "use strict";
            n.d(e, {
                v: function() {
                    return u
                }
            });
            var r = n(83972);
            let o = t => "object" == typeof t && t.mix,
                i = t => o(t) ? t.mix : void 0;

            function u(...t) {
                let e = !Array.isArray(t[0]),
                    n = e ? 0 : -1,
                    o = t[0 + n],
                    a = t[1 + n],
                    s = t[2 + n],
                    c = t[3 + n],
                    l = (0, r.s)(a, s, {
                        mixer: i(s[0]),
                        ...c
                    });
                return e ? l(o) : l
            }
        },
        85886: function(t, e, n) {
            "use strict";
            n.d(e, {
                N: function() {
                    return u
                }
            });
            var r = n(91816),
                o = n(2784),
                i = n(20251);

            function u() {
                let t = (0, i.t)(),
                    [e, n] = (0, o.useState)(0),
                    u = (0, o.useCallback)(() => {
                        t.current && n(e + 1)
                    }, [e]),
                    a = (0, o.useCallback)(() => r.Z_.postRender(u), [u]);
                return [a, e]
            }
        },
        20251: function(t, e, n) {
            "use strict";
            n.d(e, {
                t: function() {
                    return i
                }
            });
            var r = n(2784),
                o = n(23617);

            function i() {
                let t = (0, r.useRef)(!1);
                return (0, o.L)(() => (t.current = !0, () => {
                    t.current = !1
                }), []), t
            }
        },
        96073: function(t, e, n) {
            "use strict";
            n.d(e, {
                z: function() {
                    return o
                }
            });
            var r = n(2784);

            function o(t) {
                return (0, r.useEffect)(() => () => t(), [])
            }
        },
        77014: function(t, e, n) {
            "use strict";
            n.d(e, {
                N: function() {
                    return u
                }
            });
            var r = n(21687),
                o = n(91816),
                i = n(23617);

            function u(t, e) {
                let n = (0, r.c)(e()),
                    u = () => n.set(e());
                return u(), (0, i.L)(() => {
                    let e = () => o.Z_.update(u, !1, !0),
                        n = t.map(t => t.on("change", e));
                    return () => {
                        n.forEach(t => t()), o.qY.update(u)
                    }
                }), n
            }
        },
        85770: function(t, e, n) {
            "use strict";
            n.d(e, {
                Y: function() {
                    return i
                }
            });
            var r = n(77014),
                o = n(15815);

            function i(t, ...e) {
                let n = t.length;
                return (0, r.N)(e.filter(o.i), function() {
                    let r = "";
                    for (let i = 0; i < n; i++) {
                        r += t[i];
                        let n = e[i];
                        n && (r += (0, o.i)(n) ? n.get() : n)
                    }
                    return r
                })
            }
        },
        21687: function(t, e, n) {
            "use strict";
            n.d(e, {
                c: function() {
                    return a
                }
            });
            var r = n(2784),
                o = n(40226),
                i = n(60976),
                u = n(3105);

            function a(t) {
                let e = (0, u.h)(() => (0, o.B)(t)),
                    {
                        isStatic: n
                    } = (0, r.useContext)(i._);
                if (n) {
                    let [, n] = (0, r.useState)(t);
                    (0, r.useEffect)(() => e.on("change", n), [])
                }
                return e
            }
        },
        54179: function(t, e, n) {
            "use strict";
            n.d(e, {
                q: function() {
                    return f
                }
            });
            var r = n(2784),
                o = n(15815),
                i = n(21687),
                u = n(60976),
                a = n(23617),
                s = n(72800),
                c = n(85403),
                l = n(41429);

            function f(t, e = {}) {
                let {
                    isStatic: n
                } = (0, r.useContext)(u._), f = (0, r.useRef)(null), d = (0, i.c)((0, o.i)(t) ? t.get() : t), p = () => {
                    f.current && f.current.stop()
                };
                return (0, r.useInsertionEffect)(() => d.attach((t, r) => {
                    if (n) return r(t);
                    if (p(), f.current = (0, s.y)({
                            keyframes: [d.get(), t],
                            velocity: d.getVelocity(),
                            type: "spring",
                            restDelta: .001,
                            restSpeed: .01,
                            ...e,
                            onUpdate: r
                        }), !c.w.isProcessing) {
                        let t = performance.now() - c.w.timestamp;
                        t < 30 && (f.current.time = (0, l.X)(t))
                    }
                    return d.get()
                }, p), [JSON.stringify(e)]), (0, a.L)(() => {
                    if ((0, o.i)(t)) return t.on("change", t => d.set(parseFloat(t)))
                }, [d]), d
            }
        },
        24373: function(t, e, n) {
            "use strict";
            n.d(e, {
                H: function() {
                    return u
                }
            });
            var r = n(10810),
                o = n(77014),
                i = n(3105);

            function u(t, e, n, o) {
                let i = "function" == typeof e ? e : (0, r.v)(e, n, o);
                return Array.isArray(t) ? a(t, i) : a([t], ([t]) => i(t))
            }

            function a(t, e) {
                let n = (0, i.h)(() => []);
                return (0, o.N)(t, () => {
                    n.length = 0;
                    let r = t.length;
                    for (let e = 0; e < r; e++) n[e] = t[e].get();
                    return e(n)
                })
            }
        },
        79162: function(t, e, n) {
            "use strict";
            n.d(e, {
                x0: function() {
                    return r
                }
            });
            let r = (t = 21) => {
                let e = "",
                    n = crypto.getRandomValues(new Uint8Array(t));
                for (; t--;) {
                    let r = 63 & n[t];
                    r < 36 ? e += r.toString(36) : r < 62 ? e += (r - 26).toString(36).toUpperCase() : r < 63 ? e += "_" : e += "-"
                }
                return e
            }
        }
    }
]);
//# sourceMappingURL=8570-360d5186731e1de3.js.map