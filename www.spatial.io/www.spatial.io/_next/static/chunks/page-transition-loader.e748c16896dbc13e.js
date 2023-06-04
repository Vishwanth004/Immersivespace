(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [713], {
        85771: function(e, n, t) {
            "use strict";
            t.r(n), t.d(n, {
                PageTransitionLoader: function() {
                    return a
                }
            });
            var r = t(5632),
                o = t(92521),
                s = t.n(o),
                i = t(2784);

            function a() {
                var e;
                let n = (0, r.useRouter)();
                return (0, i.useEffect)(() => {
                    let t = (n, t) => {
                            let {
                                shallow: r
                            } = t;
                            (!r || null != e && e.showOnShallowTransitions) && s().start()
                        },
                        r = () => {
                            s().done()
                        };
                    return n.events.on("routeChangeStart", t), n.events.on("routeChangeComplete", r), n.events.on("routeChangeError", r), () => {
                        n.events.off("routeChangeStart", t), n.events.off("routeChangeComplete", r), n.events.off("routeChangeError", r)
                    }
                }, [null == e ? void 0 : e.showOnShallowTransitions, n]), null
            }
        },
        92521: function(e, n, t) {
            var r, o;
            void 0 !== (r = "function" == typeof(o = function() {
                var e, n, t, r = {};
                r.version = "0.2.0";
                var o = r.settings = {
                    minimum: .08,
                    easing: "ease",
                    positionUsing: "",
                    speed: 200,
                    trickle: !0,
                    trickleRate: .02,
                    trickleSpeed: 800,
                    showSpinner: !0,
                    barSelector: '[role="bar"]',
                    spinnerSelector: '[role="spinner"]',
                    parent: "body",
                    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                };

                function s(e, n, t) {
                    return e < n ? n : e > t ? t : e
                }
                r.configure = function(e) {
                    var n, t;
                    for (n in e) void 0 !== (t = e[n]) && e.hasOwnProperty(n) && (o[n] = t);
                    return this
                }, r.status = null, r.set = function(e) {
                    var n = r.isStarted();
                    e = s(e, o.minimum, 1), r.status = 1 === e ? null : e;
                    var t = r.render(!n),
                        u = t.querySelector(o.barSelector),
                        c = o.speed,
                        l = o.easing;
                    return t.offsetWidth, i(function(n) {
                        var s, i;
                        "" === o.positionUsing && (o.positionUsing = r.getPositioningCSS()), a(u, (s = e, (i = "translate3d" === o.positionUsing ? {
                            transform: "translate3d(" + (-1 + s) * 100 + "%,0,0)"
                        } : "translate" === o.positionUsing ? {
                            transform: "translate(" + (-1 + s) * 100 + "%,0)"
                        } : {
                            "margin-left": (-1 + s) * 100 + "%"
                        }).transition = "all " + c + "ms " + l, i)), 1 === e ? (a(t, {
                            transition: "none",
                            opacity: 1
                        }), t.offsetWidth, setTimeout(function() {
                            a(t, {
                                transition: "all " + c + "ms linear",
                                opacity: 0
                            }), setTimeout(function() {
                                r.remove(), n()
                            }, c)
                        }, c)) : setTimeout(n, c)
                    }), this
                }, r.isStarted = function() {
                    return "number" == typeof r.status
                }, r.start = function() {
                    r.status || r.set(0);
                    var e = function() {
                        setTimeout(function() {
                            r.status && (r.trickle(), e())
                        }, o.trickleSpeed)
                    };
                    return o.trickle && e(), this
                }, r.done = function(e) {
                    return e || r.status ? r.inc(.3 + .5 * Math.random()).set(1) : this
                }, r.inc = function(e) {
                    var n = r.status;
                    return n ? ("number" != typeof e && (e = (1 - n) * s(Math.random() * n, .1, .95)), n = s(n + e, 0, .994), r.set(n)) : r.start()
                }, r.trickle = function() {
                    return r.inc(Math.random() * o.trickleRate)
                }, e = 0, n = 0, r.promise = function(t) {
                    return t && "resolved" !== t.state() && (0 === n && r.start(), e++, n++, t.always(function() {
                        0 == --n ? (e = 0, r.done()) : r.set((e - n) / e)
                    })), this
                }, r.render = function(e) {
                    if (r.isRendered()) return document.getElementById("nprogress");
                    c(document.documentElement, "nprogress-busy");
                    var n = document.createElement("div");
                    n.id = "nprogress", n.innerHTML = o.template;
                    var t, s, i = n.querySelector(o.barSelector),
                        u = e ? "-100" : (-1 + (r.status || 0)) * 100,
                        l = document.querySelector(o.parent);
                    return a(i, {
                        transition: "all 0 linear",
                        transform: "translate3d(" + u + "%,0,0)"
                    }), !o.showSpinner && (s = n.querySelector(o.spinnerSelector)) && d(s), l != document.body && c(l, "nprogress-custom-parent"), l.appendChild(n), n
                }, r.remove = function() {
                    l(document.documentElement, "nprogress-busy"), l(document.querySelector(o.parent), "nprogress-custom-parent");
                    var e = document.getElementById("nprogress");
                    e && d(e)
                }, r.isRendered = function() {
                    return !!document.getElementById("nprogress")
                }, r.getPositioningCSS = function() {
                    var e = document.body.style,
                        n = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
                    return n + "Perspective" in e ? "translate3d" : n + "Transform" in e ? "translate" : "margin"
                };
                var i = (t = [], function(e) {
                        t.push(e), 1 == t.length && function e() {
                            var n = t.shift();
                            n && n(e)
                        }()
                    }),
                    a = function() {
                        var e = ["Webkit", "O", "Moz", "ms"],
                            n = {};

                        function t(t, r, o) {
                            var s;
                            r = n[s = (s = r).replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(e, n) {
                                return n.toUpperCase()
                            })] || (n[s] = function(n) {
                                var t = document.body.style;
                                if (n in t) return n;
                                for (var r, o = e.length, s = n.charAt(0).toUpperCase() + n.slice(1); o--;)
                                    if ((r = e[o] + s) in t) return r;
                                return n
                            }(s)), t.style[r] = o
                        }
                        return function(e, n) {
                            var r, o, s = arguments;
                            if (2 == s.length)
                                for (r in n) void 0 !== (o = n[r]) && n.hasOwnProperty(r) && t(e, r, o);
                            else t(e, s[1], s[2])
                        }
                    }();

                function u(e, n) {
                    return ("string" == typeof e ? e : f(e)).indexOf(" " + n + " ") >= 0
                }

                function c(e, n) {
                    var t = f(e);
                    u(t, n) || (e.className = (t + n).substring(1))
                }

                function l(e, n) {
                    var t, r = f(e);
                    u(e, n) && (t = r.replace(" " + n + " ", " "), e.className = t.substring(1, t.length - 1))
                }

                function f(e) {
                    return (" " + (e.className || "") + " ").replace(/\s+/gi, " ")
                }

                function d(e) {
                    e && e.parentNode && e.parentNode.removeChild(e)
                }
                return r
            }) ? o.call(n, t, n, e) : o) && (e.exports = r)
        }
    }
]);
//# sourceMappingURL=page-transition-loader.e748c16896dbc13e.js.map