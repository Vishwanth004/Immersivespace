"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1411], {
        74197: function(t, e, i) {
            i.d(e, {
                D: function() {
                    return o
                }
            });
            var n = i(11047),
                r = i(40226),
                s = i(15815);

            function o(t, e, i) {
                let o = (0, s.i)(t) ? t : (0, r.B)(t);
                return o.start((0, n.v)("", o, e, i)), o.animation
            }
        },
        25925: function(t, e, i) {
            i.d(e, {
                M: function() {
                    return g
                }
            });
            var n = i(2784),
                r = i(85886),
                s = i(20251),
                o = i(97967),
                a = i(3105);
            class l extends n.Component {
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

            function u({
                children: t,
                isPresent: e
            }) {
                let i = (0, n.useId)(),
                    r = (0, n.useRef)(null),
                    s = (0, n.useRef)({
                        width: 0,
                        height: 0,
                        top: 0,
                        left: 0
                    });
                return (0, n.useInsertionEffect)(() => {
                    let {
                        width: t,
                        height: n,
                        top: o,
                        left: a
                    } = s.current;
                    if (e || !r.current || !t || !n) return;
                    r.current.dataset.motionPopId = i;
                    let l = document.createElement("style");
                    return document.head.appendChild(l), l.sheet && l.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${n}px !important;
            top: ${o}px !important;
            left: ${a}px !important;
          }
        `), () => {
                        document.head.removeChild(l)
                    }
                }, [e]), n.createElement(l, {
                    isPresent: e,
                    childRef: r,
                    sizeRef: s
                }, n.cloneElement(t, {
                    ref: r
                }))
            }
            let h = ({
                children: t,
                initial: e,
                isPresent: i,
                onExitComplete: r,
                custom: s,
                presenceAffectsLayout: l,
                mode: h
            }) => {
                let d = (0, a.h)(c),
                    p = (0, n.useId)(),
                    m = (0, n.useMemo)(() => ({
                        id: p,
                        initial: e,
                        isPresent: i,
                        custom: s,
                        onExitComplete: t => {
                            for (let e of (d.set(t, !0), d.values()))
                                if (!e) return;
                            r && r()
                        },
                        register: t => (d.set(t, !1), () => d.delete(t))
                    }), l ? void 0 : [i]);
                return (0, n.useMemo)(() => {
                    d.forEach((t, e) => d.set(e, !1))
                }, [i]), n.useEffect(() => {
                    i || d.size || !r || r()
                }, [i]), "popLayout" === h && (t = n.createElement(u, {
                    isPresent: i
                }, t)), n.createElement(o.O.Provider, {
                    value: m
                }, t)
            };

            function c() {
                return new Map
            }
            var d = i(3422),
                p = i(23617),
                m = i(96073),
                f = i(57035);
            let v = t => t.key || "",
                g = ({
                    children: t,
                    custom: e,
                    initial: i = !0,
                    onExitComplete: o,
                    exitBeforeEnter: a,
                    presenceAffectsLayout: l = !0,
                    mode: u = "sync"
                }) => {
                    (0, f.k)(!a, "Replace exitBeforeEnter with mode='wait'");
                    let [c] = (0, r.N)(), g = (0, n.useContext)(d.p).forceRender;
                    g && (c = g);
                    let y = (0, s.t)(),
                        x = function(t) {
                            let e = [];
                            return n.Children.forEach(t, t => {
                                (0, n.isValidElement)(t) && e.push(t)
                            }), e
                        }(t),
                        P = x,
                        E = new Set,
                        T = (0, n.useRef)(P),
                        V = (0, n.useRef)(new Map).current,
                        S = (0, n.useRef)(!0);
                    if ((0, p.L)(() => {
                            S.current = !1,
                                function(t, e) {
                                    t.forEach(t => {
                                        let i = v(t);
                                        e.set(i, t)
                                    })
                                }(x, V), T.current = P
                        }), (0, m.z)(() => {
                            S.current = !0, V.clear(), E.clear()
                        }), S.current) return n.createElement(n.Fragment, null, P.map(t => n.createElement(h, {
                        key: v(t),
                        isPresent: !0,
                        initial: !!i && void 0,
                        presenceAffectsLayout: l,
                        mode: u
                    }, t)));
                    P = [...P];
                    let w = T.current.map(v),
                        b = x.map(v),
                        A = w.length;
                    for (let t = 0; t < A; t++) {
                        let e = w[t]; - 1 === b.indexOf(e) && E.add(e)
                    }
                    return "wait" === u && E.size && (P = []), E.forEach(t => {
                        if (-1 !== b.indexOf(t)) return;
                        let i = V.get(t);
                        if (!i) return;
                        let r = w.indexOf(t),
                            s = () => {
                                V.delete(t), E.delete(t);
                                let e = T.current.findIndex(e => e.key === t);
                                if (T.current.splice(e, 1), !E.size) {
                                    if (T.current = x, !1 === y.current) return;
                                    c(), o && o()
                                }
                            };
                        P.splice(r, 0, n.createElement(h, {
                            key: v(i),
                            isPresent: !1,
                            onExitComplete: s,
                            custom: e,
                            presenceAffectsLayout: l,
                            mode: u
                        }, i))
                    }), P = P.map(t => {
                        let e = t.key;
                        return E.has(e) ? t : n.createElement(h, {
                            key: v(t),
                            isPresent: !0,
                            presenceAffectsLayout: l,
                            mode: u
                        }, t)
                    }), n.createElement(n.Fragment, null, E.size ? P : P.map(t => (0, n.cloneElement)(t)))
                }
        },
        58175: function(t, e, i) {
            i.d(e, {
                hO: function() {
                    return o
                },
                oO: function() {
                    return s
                }
            });
            var n = i(2784),
                r = i(97967);

            function s() {
                let t = (0, n.useContext)(r.O);
                if (null === t) return [!0, null];
                let {
                    isPresent: e,
                    onExitComplete: i,
                    register: s
                } = t, o = (0, n.useId)();
                (0, n.useEffect)(() => s(o), []);
                let a = () => i && i(o);
                return !e && i ? [!1, a] : [!0]
            }

            function o() {
                var t;
                return null === (t = (0, n.useContext)(r.O)) || t.isPresent
            }
        },
        677: function(t, e, i) {
            i.d(e, {
                t: function() {
                    return y
                }
            });
            var n = i(57035),
                r = i(2784);
            let s = (0, r.createContext)(null);
            var o = i(66865),
                a = i(3105),
                l = i(44866),
                u = i(65339);
            let h = (0, r.forwardRef)(function({
                children: t,
                as: e = "ul",
                axis: i = "y",
                onReorder: h,
                values: p,
                ...m
            }, f) {
                let v = (0, a.h)(() => (0, o.E)(e)),
                    g = [],
                    y = (0, r.useRef)(!1);
                return (0, n.k)(!!p, "Reorder.Group must be provided a values prop"), (0, r.useEffect)(() => {
                    y.current = !1
                }), r.createElement(v, { ...m,
                    ref: f,
                    ignoreStrict: !0
                }, r.createElement(s.Provider, {
                    value: {
                        axis: i,
                        registerItem: (t, e) => {
                            e && -1 === g.findIndex(e => t === e.value) && (g.push({
                                value: t,
                                layout: e[i]
                            }), g.sort(d))
                        },
                        updateOrder: (t, e, i) => {
                            if (y.current) return;
                            let n = function(t, e, i, n) {
                                if (!n) return t;
                                let r = t.findIndex(t => t.value === e);
                                if (-1 === r) return t;
                                let s = n > 0 ? 1 : -1,
                                    o = t[r + s];
                                if (!o) return t;
                                let a = t[r],
                                    h = o.layout,
                                    c = (0, u.C)(h.min, h.max, .5);
                                return 1 === s && a.layout.max + i > c || -1 === s && a.layout.min + i < c ? (0, l.uo)(t, r, r + s) : t
                            }(g, t, e, i);
                            g !== n && (y.current = !0, h(n.map(c).filter(t => -1 !== p.indexOf(t))))
                        }
                    }
                }, t))
            });

            function c(t) {
                return t.value
            }

            function d(t, e) {
                return t.layout.min - e.layout.min
            }
            var p = i(21687),
                m = i(24373),
                f = i(15815);

            function v(t, e = 0) {
                return (0, f.i)(t) ? t : (0, p.c)(e)
            }
            let g = (0, r.forwardRef)(function({
                    children: t,
                    style: e = {},
                    value: i,
                    as: l = "li",
                    onDrag: u,
                    layout: h = !0,
                    ...c
                }, d) {
                    let p = (0, a.h)(() => (0, o.E)(l)),
                        f = (0, r.useContext)(s),
                        g = {
                            x: v(e.x),
                            y: v(e.y)
                        },
                        y = (0, m.H)([g.x, g.y], ([t, e]) => t || e ? 1 : "unset"),
                        x = (0, r.useRef)(null);
                    (0, n.k)(!!f, "Reorder.Item must be a child of Reorder.Group");
                    let {
                        axis: P,
                        registerItem: E,
                        updateOrder: T
                    } = f;
                    return (0, r.useEffect)(() => {
                        E(i, x.current)
                    }, [f]), r.createElement(p, {
                        drag: P,
                        ...c,
                        dragSnapToOrigin: !0,
                        style: { ...e,
                            x: g.x,
                            y: g.y,
                            zIndex: y
                        },
                        layout: h,
                        onDrag: (t, e) => {
                            let {
                                velocity: n
                            } = e;
                            n[P] && T(i, g[P].get(), n[P]), u && u(t, e)
                        },
                        onLayoutMeasure: t => {
                            x.current = t
                        },
                        ref: d,
                        ignoreStrict: !0
                    }, t)
                }),
                y = {
                    Group: h,
                    Item: g
                }
        },
        78624: function(t, e, i) {
            i.d(e, {
                E: function() {
                    return n
                }
            });

            function n(t, e, i, n = {
                passive: !0
            }) {
                return t.addEventListener(e, i, n), () => t.removeEventListener(e, i)
            }
        },
        67817: function(t, e, i) {
            i.d(e, {
                a: function() {
                    return s
                }
            });
            var n = i(78624),
                r = i(98457);

            function s(t, e, i, s) {
                return (0, n.E)(t, e, (0, r.s)(i), s)
            }
        },
        98457: function(t, e, i) {
            i.d(e, {
                Q: function() {
                    return r
                },
                s: function() {
                    return s
                }
            });
            var n = i(53502);

            function r(t, e = "page") {
                return {
                    point: {
                        x: t[e + "X"],
                        y: t[e + "Y"]
                    }
                }
            }
            let s = t => e => (0, n.D)(e) && t(e, r(e))
        },
        53502: function(t, e, i) {
            i.d(e, {
                D: function() {
                    return n
                }
            });
            let n = t => "mouse" === t.pointerType ? "number" != typeof t.button || t.button <= 0 : !1 !== t.isPrimary
        },
        54438: function(t, e, i) {
            function n(t) {
                let e = null;
                return () => {
                    let i = () => {
                        e = null
                    };
                    return null === e && (e = t, i)
                }
            }
            i.d(e, {
                fJ: function() {
                    return o
                },
                gD: function() {
                    return a
                }
            });
            let r = n("dragHorizontal"),
                s = n("dragVertical");

            function o(t) {
                let e = !1;
                if ("y" === t) e = s();
                else if ("x" === t) e = r();
                else {
                    let t = r(),
                        i = s();
                    t && i ? e = () => {
                        t(), i()
                    } : (t && t(), i && i())
                }
                return e
            }

            function a() {
                let t = o(!0);
                return !t || (t(), !1)
            }
        },
        94796: function(t, e, i) {
            i.d(e, {
                L: function() {
                    return n
                }
            });
            class n {
                constructor(t) {
                    this.isMounted = !1, this.node = t
                }
                update() {}
            }
        },
        60526: function(t, e, i) {
            i.d(e, {
                s: function() {
                    return g
                }
            });
            var n = i(12816),
                r = i(55721);

            function s(t, e) {
                if (!Array.isArray(e)) return !1;
                let i = e.length;
                if (i !== t.length) return !1;
                for (let n = 0; n < i; n++)
                    if (e[n] !== t[n]) return !1;
                return !0
            }
            var o = i(20330),
                a = i(12841),
                l = i(36427),
                u = i(1686);
            let h = [...l.e].reverse(),
                c = l.e.length;

            function d(t = !1) {
                return {
                    isActive: t,
                    protectedKeys: {},
                    needsAnimating: {},
                    prevResolvedValues: {}
                }
            }
            var p = i(94796);
            class m extends p.L {
                constructor(t) {
                    super(t), t.animationState || (t.animationState = function(t) {
                        let e = e => Promise.all(e.map(({
                                animation: e,
                                options: i
                            }) => (0, u.d)(t, e, i))),
                            i = {
                                animate: d(!0),
                                whileInView: d(),
                                whileHover: d(),
                                whileTap: d(),
                                whileDrag: d(),
                                whileFocus: d(),
                                exit: d()
                            },
                            l = !0,
                            p = (e, i) => {
                                let n = (0, a.x)(t, i);
                                if (n) {
                                    let {
                                        transition: t,
                                        transitionEnd: i,
                                        ...r
                                    } = n;
                                    e = { ...e,
                                        ...r,
                                        ...i
                                    }
                                }
                                return e
                            };

                        function m(a, u) {
                            let d = t.getProps(),
                                m = t.getVariantContext(!0) || {},
                                f = [],
                                v = new Set,
                                g = {},
                                y = 1 / 0;
                            for (let e = 0; e < c; e++) {
                                var x;
                                let c = h[e],
                                    P = i[c],
                                    E = void 0 !== d[c] ? d[c] : m[c],
                                    T = (0, o.$)(E),
                                    V = c === u ? P.isActive : null;
                                !1 === V && (y = e);
                                let S = E === m[c] && E !== d[c] && T;
                                if (S && l && t.manuallyAnimateOnMount && (S = !1), P.protectedKeys = { ...g
                                    }, !P.isActive && null === V || !E && !P.prevProp || (0, n.H)(E) || "boolean" == typeof E) continue;
                                let w = (x = P.prevProp, "string" == typeof E ? E !== x : !!Array.isArray(E) && !s(E, x)),
                                    b = w || c === u && P.isActive && !S && T || e > y && T,
                                    A = Array.isArray(E) ? E : [E],
                                    C = A.reduce(p, {});
                                !1 === V && (C = {});
                                let {
                                    prevResolvedValues: D = {}
                                } = P, L = { ...D,
                                    ...C
                                }, R = t => {
                                    b = !0, v.delete(t), P.needsAnimating[t] = !0
                                };
                                for (let t in L) {
                                    let e = C[t],
                                        i = D[t];
                                    g.hasOwnProperty(t) || (e !== i ? (0, r.C)(e) && (0, r.C)(i) ? !s(e, i) || w ? R(t) : P.protectedKeys[t] = !0 : void 0 !== e ? R(t) : v.add(t) : void 0 !== e && v.has(t) ? R(t) : P.protectedKeys[t] = !0)
                                }
                                P.prevProp = E, P.prevResolvedValues = C, P.isActive && (g = { ...g,
                                    ...C
                                }), l && t.blockInitialAnimation && (b = !1), b && !S && f.push(...A.map(t => ({
                                    animation: t,
                                    options: {
                                        type: c,
                                        ...a
                                    }
                                })))
                            }
                            if (v.size) {
                                let e = {};
                                v.forEach(i => {
                                    let n = t.getBaseTarget(i);
                                    void 0 !== n && (e[i] = n)
                                }), f.push({
                                    animation: e
                                })
                            }
                            let P = !!f.length;
                            return l && !1 === d.initial && !t.manuallyAnimateOnMount && (P = !1), l = !1, P ? e(f) : Promise.resolve()
                        }
                        return {
                            animateChanges: m,
                            setActive: function(e, n, r) {
                                var s;
                                if (i[e].isActive === n) return Promise.resolve();
                                null === (s = t.variantChildren) || void 0 === s || s.forEach(t => {
                                    var i;
                                    return null === (i = t.animationState) || void 0 === i ? void 0 : i.setActive(e, n)
                                }), i[e].isActive = n;
                                let o = m(r, e);
                                for (let t in i) i[t].protectedKeys = {};
                                return o
                            },
                            setAnimateFunction: function(i) {
                                e = i(t)
                            },
                            getState: () => i
                        }
                    }(t))
                }
                updateAnimationControlsSubscription() {
                    let {
                        animate: t
                    } = this.node.getProps();
                    this.unmount(), (0, n.H)(t) && (this.unmount = t.subscribe(this.node))
                }
                mount() {
                    this.updateAnimationControlsSubscription()
                }
                update() {
                    let {
                        animate: t
                    } = this.node.getProps(), {
                        animate: e
                    } = this.node.prevProps || {};
                    t !== e && this.updateAnimationControlsSubscription()
                }
                unmount() {}
            }
            let f = 0;
            class v extends p.L {
                constructor() {
                    super(...arguments), this.id = f++
                }
                update() {
                    if (!this.node.presenceContext) return;
                    let {
                        isPresent: t,
                        onExitComplete: e,
                        custom: i
                    } = this.node.presenceContext, {
                        isPresent: n
                    } = this.node.prevPresenceContext || {};
                    if (!this.node.animationState || t === n) return;
                    let r = this.node.animationState.setActive("exit", !t, {
                        custom: null != i ? i : this.node.getProps().custom
                    });
                    e && !t && r.then(() => e(this.id))
                }
                mount() {
                    let {
                        register: t
                    } = this.node.presenceContext || {};
                    t && (this.unmount = t(this.id))
                }
                unmount() {}
            }
            let g = {
                animation: {
                    Feature: m
                },
                exit: {
                    Feature: v
                }
            }
        },
        51169: function(t, e, i) {
            i.d(e, {
                o: function() {
                    return G
                }
            });
            var n = i(94796),
                r = i(50065),
                s = i(57035),
                o = i(98457),
                a = i(91816),
                l = i(41429),
                u = i(67817),
                h = i(96953),
                c = i(31216),
                d = i(85403),
                p = i(53502);
            class m {
                constructor(t, e, {
                    transformPagePoint: i
                } = {}) {
                    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.updatePoint = () => {
                            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                            let t = g(this.lastMoveEventInfo, this.history),
                                e = null !== this.startEvent,
                                i = (0, c.y)(t.offset, {
                                    x: 0,
                                    y: 0
                                }) >= 3;
                            if (!e && !i) return;
                            let {
                                point: n
                            } = t, {
                                timestamp: r
                            } = d.w;
                            this.history.push({ ...n,
                                timestamp: r
                            });
                            let {
                                onStart: s,
                                onMove: o
                            } = this.handlers;
                            e || (s && s(this.lastMoveEvent, t), this.startEvent = this.lastMoveEvent), o && o(this.lastMoveEvent, t)
                        }, this.handlePointerMove = (t, e) => {
                            this.lastMoveEvent = t, this.lastMoveEventInfo = f(e, this.transformPagePoint), a.Z_.update(this.updatePoint, !0)
                        }, this.handlePointerUp = (t, e) => {
                            if (this.end(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                            let {
                                onEnd: i,
                                onSessionEnd: n
                            } = this.handlers, r = g("pointercancel" === t.type ? this.lastMoveEventInfo : f(e, this.transformPagePoint), this.history);
                            this.startEvent && i && i(t, r), n && n(t, r)
                        }, !(0, p.D)(t)) return;
                    this.handlers = e, this.transformPagePoint = i;
                    let n = (0, o.Q)(t),
                        r = f(n, this.transformPagePoint),
                        {
                            point: s
                        } = r,
                        {
                            timestamp: l
                        } = d.w;
                    this.history = [{ ...s,
                        timestamp: l
                    }];
                    let {
                        onSessionStart: m
                    } = e;
                    m && m(t, g(r, this.history)), this.removeListeners = (0, h.z)((0, u.a)(window, "pointermove", this.handlePointerMove), (0, u.a)(window, "pointerup", this.handlePointerUp), (0, u.a)(window, "pointercancel", this.handlePointerUp))
                }
                updateHandlers(t) {
                    this.handlers = t
                }
                end() {
                    this.removeListeners && this.removeListeners(), a.qY.update(this.updatePoint)
                }
            }

            function f(t, e) {
                return e ? {
                    point: e(t.point)
                } : t
            }

            function v(t, e) {
                return {
                    x: t.x - e.x,
                    y: t.y - e.y
                }
            }

            function g({
                point: t
            }, e) {
                return {
                    point: t,
                    delta: v(t, y(e)),
                    offset: v(t, e[0]),
                    velocity: function(t, e) {
                        if (t.length < 2) return {
                            x: 0,
                            y: 0
                        };
                        let i = t.length - 1,
                            n = null,
                            r = y(t);
                        for (; i >= 0 && (n = t[i], !(r.timestamp - n.timestamp > (0, l.w)(.1)));) i--;
                        if (!n) return {
                            x: 0,
                            y: 0
                        };
                        let s = (0, l.X)(r.timestamp - n.timestamp);
                        if (0 === s) return {
                            x: 0,
                            y: 0
                        };
                        let o = {
                            x: (r.x - n.x) / s,
                            y: (r.y - n.y) / s
                        };
                        return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o
                    }(e, 0)
                }
            }

            function y(t) {
                return t[t.length - 1]
            }
            var x = i(54438),
                P = i(8350),
                E = i(17475),
                T = i(24144),
                V = i(51366),
                S = i(65339);

            function w(t, e, i) {
                return {
                    min: void 0 !== e ? t.min + e : void 0,
                    max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0
                }
            }

            function b(t, e) {
                let i = e.min - t.min,
                    n = e.max - t.max;
                return e.max - e.min < t.max - t.min && ([i, n] = [n, i]), {
                    min: i,
                    max: n
                }
            }

            function A(t, e, i) {
                return {
                    min: C(t, e),
                    max: C(t, i)
                }
            }

            function C(t, e) {
                return "number" == typeof t ? t : t[e] || 0
            }
            var D = i(33933),
                L = i(1010),
                R = i(85579),
                M = i(77222),
                j = i(78624),
                B = i(88772),
                F = i(11047);
            let k = new WeakMap;
            class O {
                constructor(t) {
                    this.openGlobalLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
                        x: 0,
                        y: 0
                    }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = (0, D.dO)(), this.visualElement = t
                }
                start(t, {
                    snapToCursor: e = !1
                } = {}) {
                    let {
                        presenceContext: i
                    } = this.visualElement;
                    if (i && !1 === i.isPresent) return;
                    let n = t => {
                            this.stopAnimation(), e && this.snapToCursor((0, o.Q)(t, "page").point)
                        },
                        r = (t, e) => {
                            let {
                                drag: i,
                                dragPropagation: n,
                                onDragStart: r
                            } = this.getProps();
                            if (i && !n && (this.openGlobalLock && this.openGlobalLock(), this.openGlobalLock = (0, x.fJ)(i), !this.openGlobalLock)) return;
                            this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), (0, L.U)(t => {
                                let e = this.getAxisMotionValue(t).get() || 0;
                                if (B.aQ.test(e)) {
                                    let {
                                        projection: i
                                    } = this.visualElement;
                                    if (i && i.layout) {
                                        let n = i.layout.layoutBox[t];
                                        if (n) {
                                            let t = (0, T.JO)(n);
                                            e = t * (parseFloat(e) / 100)
                                        }
                                    }
                                }
                                this.originPoint[t] = e
                            }), r && a.Z_.update(() => r(t, e));
                            let {
                                animationState: s
                            } = this.visualElement;
                            s && s.setActive("whileDrag", !0)
                        },
                        s = (t, e) => {
                            let {
                                dragPropagation: i,
                                dragDirectionLock: n,
                                onDirectionLock: r,
                                onDrag: s
                            } = this.getProps();
                            if (!i && !this.openGlobalLock) return;
                            let {
                                offset: o
                            } = e;
                            if (n && null === this.currentDirection) {
                                this.currentDirection = function(t, e = 10) {
                                    let i = null;
                                    return Math.abs(t.y) > e ? i = "y" : Math.abs(t.x) > e && (i = "x"), i
                                }(o), null !== this.currentDirection && r && r(this.currentDirection);
                                return
                            }
                            this.updateAxis("x", e.point, o), this.updateAxis("y", e.point, o), this.visualElement.render(), s && s(t, e)
                        },
                        l = (t, e) => this.stop(t, e);
                    this.panSession = new m(t, {
                        onSessionStart: n,
                        onStart: r,
                        onMove: s,
                        onSessionEnd: l
                    }, {
                        transformPagePoint: this.visualElement.getTransformPagePoint()
                    })
                }
                stop(t, e) {
                    let i = this.isDragging;
                    if (this.cancel(), !i) return;
                    let {
                        velocity: n
                    } = e;
                    this.startAnimation(n);
                    let {
                        onDragEnd: r
                    } = this.getProps();
                    r && a.Z_.update(() => r(t, e))
                }
                cancel() {
                    this.isDragging = !1;
                    let {
                        projection: t,
                        animationState: e
                    } = this.visualElement;
                    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
                    let {
                        dragPropagation: i
                    } = this.getProps();
                    !i && this.openGlobalLock && (this.openGlobalLock(), this.openGlobalLock = null), e && e.setActive("whileDrag", !1)
                }
                updateAxis(t, e, i) {
                    let {
                        drag: n
                    } = this.getProps();
                    if (!i || !U(t, n, this.currentDirection)) return;
                    let r = this.getAxisMotionValue(t),
                        s = this.originPoint[t] + i[t];
                    this.constraints && this.constraints[t] && (s = function(t, {
                        min: e,
                        max: i
                    }, n) {
                        return void 0 !== e && t < e ? t = n ? (0, S.C)(e, t, n.min) : Math.max(t, e) : void 0 !== i && t > i && (t = n ? (0, S.C)(i, t, n.max) : Math.min(t, i)), t
                    }(s, this.constraints[t], this.elastic[t])), r.set(s)
                }
                resolveConstraints() {
                    let {
                        dragConstraints: t,
                        dragElastic: e
                    } = this.getProps(), {
                        layout: i
                    } = this.visualElement.projection || {}, n = this.constraints;
                    t && (0, P.I)(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && i ? this.constraints = function(t, {
                        top: e,
                        left: i,
                        bottom: n,
                        right: r
                    }) {
                        return {
                            x: w(t.x, i, r),
                            y: w(t.y, e, n)
                        }
                    }(i.layoutBox, t) : this.constraints = !1, this.elastic = function(t = .35) {
                        return !1 === t ? t = 0 : !0 === t && (t = .35), {
                            x: A(t, "left", "right"),
                            y: A(t, "top", "bottom")
                        }
                    }(e), n !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && (0, L.U)(t => {
                        this.getAxisMotionValue(t) && (this.constraints[t] = function(t, e) {
                            let i = {};
                            return void 0 !== e.min && (i.min = e.min - t.min), void 0 !== e.max && (i.max = e.max - t.min), i
                        }(i.layoutBox[t], this.constraints[t]))
                    })
                }
                resolveRefConstraints() {
                    var t;
                    let {
                        dragConstraints: e,
                        onMeasureDragConstraints: i
                    } = this.getProps();
                    if (!e || !(0, P.I)(e)) return !1;
                    let n = e.current;
                    (0, s.k)(null !== n, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
                    let {
                        projection: r
                    } = this.visualElement;
                    if (!r || !r.layout) return !1;
                    let o = (0, R.z)(n, r.root, this.visualElement.getTransformPagePoint()),
                        a = {
                            x: b((t = r.layout.layoutBox).x, o.x),
                            y: b(t.y, o.y)
                        };
                    if (i) {
                        let t = i((0, M.z2)(a));
                        this.hasMutatedConstraints = !!t, t && (a = (0, M.i8)(t))
                    }
                    return a
                }
                startAnimation(t) {
                    let {
                        drag: e,
                        dragMomentum: i,
                        dragElastic: n,
                        dragTransition: r,
                        dragSnapToOrigin: s,
                        onDragTransitionEnd: o
                    } = this.getProps(), a = this.constraints || {}, l = (0, L.U)(o => {
                        if (!U(o, e, this.currentDirection)) return;
                        let l = a && a[o] || {};
                        s && (l = {
                            min: 0,
                            max: 0
                        });
                        let u = {
                            type: "inertia",
                            velocity: i ? t[o] : 0,
                            bounceStiffness: n ? 200 : 1e6,
                            bounceDamping: n ? 40 : 1e7,
                            timeConstant: 750,
                            restDelta: 1,
                            restSpeed: 10,
                            ...r,
                            ...l
                        };
                        return this.startAxisValueAnimation(o, u)
                    });
                    return Promise.all(l).then(o)
                }
                startAxisValueAnimation(t, e) {
                    let i = this.getAxisMotionValue(t);
                    return i.start((0, F.v)(t, i, 0, e))
                }
                stopAnimation() {
                    (0, L.U)(t => this.getAxisMotionValue(t).stop())
                }
                getAxisMotionValue(t) {
                    let e = "_drag" + t.toUpperCase(),
                        i = this.visualElement.getProps(),
                        n = i[e];
                    return n || this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0)
                }
                snapToCursor(t) {
                    (0, L.U)(e => {
                        let {
                            drag: i
                        } = this.getProps();
                        if (!U(e, i, this.currentDirection)) return;
                        let {
                            projection: n
                        } = this.visualElement, r = this.getAxisMotionValue(e);
                        if (n && n.layout) {
                            let {
                                min: i,
                                max: s
                            } = n.layout.layoutBox[e];
                            r.set(t[e] - (0, S.C)(i, s, .5))
                        }
                    })
                }
                scalePositionWithinConstraints() {
                    if (!this.visualElement.current) return;
                    let {
                        drag: t,
                        dragConstraints: e
                    } = this.getProps(), {
                        projection: i
                    } = this.visualElement;
                    if (!(0, P.I)(e) || !i || !this.constraints) return;
                    this.stopAnimation();
                    let n = {
                        x: 0,
                        y: 0
                    };
                    (0, L.U)(t => {
                        let e = this.getAxisMotionValue(t);
                        if (e) {
                            let i = e.get();
                            n[t] = function(t, e) {
                                let i = .5,
                                    n = (0, T.JO)(t),
                                    r = (0, T.JO)(e);
                                return r > n ? i = (0, E.Y)(e.min, e.max - n, t.min) : n > r && (i = (0, E.Y)(t.min, t.max - r, e.min)), (0, V.u)(0, 1, i)
                            }({
                                min: i,
                                max: i
                            }, this.constraints[t])
                        }
                    });
                    let {
                        transformTemplate: r
                    } = this.visualElement.getProps();
                    this.visualElement.current.style.transform = r ? r({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), (0, L.U)(e => {
                        if (!U(e, t, null)) return;
                        let i = this.getAxisMotionValue(e),
                            {
                                min: r,
                                max: s
                            } = this.constraints[e];
                        i.set((0, S.C)(r, s, n[e]))
                    })
                }
                addListeners() {
                    if (!this.visualElement.current) return;
                    k.set(this.visualElement, this);
                    let t = this.visualElement.current,
                        e = (0, u.a)(t, "pointerdown", t => {
                            let {
                                drag: e,
                                dragListener: i = !0
                            } = this.getProps();
                            e && i && this.start(t)
                        }),
                        i = () => {
                            let {
                                dragConstraints: t
                            } = this.getProps();
                            (0, P.I)(t) && (this.constraints = this.resolveRefConstraints())
                        },
                        {
                            projection: n
                        } = this.visualElement,
                        r = n.addEventListener("measure", i);
                    n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()), i();
                    let s = (0, j.E)(window, "resize", () => this.scalePositionWithinConstraints()),
                        o = n.addEventListener("didUpdate", ({
                            delta: t,
                            hasLayoutChanged: e
                        }) => {
                            this.isDragging && e && ((0, L.U)(e => {
                                let i = this.getAxisMotionValue(e);
                                i && (this.originPoint[e] += t[e].translate, i.set(i.get() + t[e].translate))
                            }), this.visualElement.render())
                        });
                    return () => {
                        s(), e(), r(), o && o()
                    }
                }
                getProps() {
                    let t = this.visualElement.getProps(),
                        {
                            drag: e = !1,
                            dragDirectionLock: i = !1,
                            dragPropagation: n = !1,
                            dragConstraints: r = !1,
                            dragElastic: s = .35,
                            dragMomentum: o = !0
                        } = t;
                    return { ...t,
                        drag: e,
                        dragDirectionLock: i,
                        dragPropagation: n,
                        dragConstraints: r,
                        dragElastic: s,
                        dragMomentum: o
                    }
                }
            }

            function U(t, e, i) {
                return (!0 === e || e === t) && (null === i || i === t)
            }
            class I extends n.L {
                constructor(t) {
                    super(t), this.removeGroupControls = r.Z, this.removeListeners = r.Z, this.controls = new O(t)
                }
                mount() {
                    let {
                        dragControls: t
                    } = this.node.getProps();
                    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || r.Z
                }
                unmount() {
                    this.removeGroupControls(), this.removeListeners()
                }
            }
            let N = t => (e, i) => {
                t && a.Z_.update(() => t(e, i))
            };
            class z extends n.L {
                constructor() {
                    super(...arguments), this.removePointerDownListener = r.Z
                }
                onPointerDown(t) {
                    this.session = new m(t, this.createPanHandlers(), {
                        transformPagePoint: this.node.getTransformPagePoint()
                    })
                }
                createPanHandlers() {
                    let {
                        onPanSessionStart: t,
                        onPanStart: e,
                        onPan: i,
                        onPanEnd: n
                    } = this.node.getProps();
                    return {
                        onSessionStart: N(t),
                        onStart: N(e),
                        onMove: i,
                        onEnd: (t, e) => {
                            delete this.session, n && a.Z_.update(() => n(t, e))
                        }
                    }
                }
                mount() {
                    this.removePointerDownListener = (0, u.a)(this.node.current, "pointerdown", t => this.onPointerDown(t))
                }
                update() {
                    this.session && this.session.updateHandlers(this.createPanHandlers())
                }
                unmount() {
                    this.removePointerDownListener(), this.session && this.session.end()
                }
            }
            var $ = i(97856),
                Z = i(27614);
            let G = {
                pan: {
                    Feature: z
                },
                drag: {
                    Feature: I,
                    ProjectionNode: Z.u,
                    MeasureLayout: $.q
                }
            }
        },
        18106: function(t, e, i) {
            i.d(e, {
                E: function() {
                    return V
                }
            });
            var n = i(67817),
                r = i(96953),
                s = i(54438),
                o = i(94796),
                a = i(91816);

            function l(t, e) {
                let i = "onHover" + (e ? "Start" : "End"),
                    r = (n, r) => {
                        if ("touch" === n.type || (0, s.gD)()) return;
                        let o = t.getProps();
                        t.animationState && o.whileHover && t.animationState.setActive("whileHover", e), o[i] && a.Z_.update(() => o[i](n, r))
                    };
                return (0, n.a)(t.current, "pointer" + (e ? "enter" : "leave"), r, {
                    passive: !t.getProps()[i]
                })
            }
            class u extends o.L {
                mount() {
                    this.unmount = (0, r.z)(l(this.node, !0), l(this.node, !1))
                }
                unmount() {}
            }
            var h = i(78624);
            class c extends o.L {
                constructor() {
                    super(...arguments), this.isActive = !1
                }
                onFocus() {
                    let t = !1;
                    try {
                        t = this.node.current.matches(":focus-visible")
                    } catch (e) {
                        t = !0
                    }
                    t && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
                }
                onBlur() {
                    this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
                }
                mount() {
                    this.unmount = (0, r.z)((0, h.E)(this.node.current, "focus", () => this.onFocus()), (0, h.E)(this.node.current, "blur", () => this.onBlur()))
                }
                unmount() {}
            }
            var d = i(98457);
            let p = (t, e) => !!e && (t === e || p(t, e.parentElement));
            var m = i(50065);

            function f(t, e) {
                if (!e) return;
                let i = new PointerEvent("pointer" + t);
                e(i, (0, d.Q)(i))
            }
            class v extends o.L {
                constructor() {
                    super(...arguments), this.removeStartListeners = m.Z, this.removeEndListeners = m.Z, this.removeAccessibleListeners = m.Z, this.startPointerPress = (t, e) => {
                        if (this.removeEndListeners(), this.isPressing) return;
                        let i = this.node.getProps(),
                            s = (t, e) => {
                                if (!this.checkPressEnd()) return;
                                let {
                                    onTap: i,
                                    onTapCancel: n
                                } = this.node.getProps();
                                a.Z_.update(() => {
                                    p(this.node.current, t.target) ? i && i(t, e) : n && n(t, e)
                                })
                            },
                            o = (0, n.a)(window, "pointerup", s, {
                                passive: !(i.onTap || i.onPointerUp)
                            }),
                            l = (0, n.a)(window, "pointercancel", (t, e) => this.cancelPress(t, e), {
                                passive: !(i.onTapCancel || i.onPointerCancel)
                            });
                        this.removeEndListeners = (0, r.z)(o, l), this.startPress(t, e)
                    }, this.startAccessiblePress = () => {
                        let t = t => {
                                if ("Enter" !== t.key || this.isPressing) return;
                                let e = t => {
                                    "Enter" === t.key && this.checkPressEnd() && f("up", (t, e) => {
                                        let {
                                            onTap: i
                                        } = this.node.getProps();
                                        i && a.Z_.update(() => i(t, e))
                                    })
                                };
                                this.removeEndListeners(), this.removeEndListeners = (0, h.E)(this.node.current, "keyup", e), f("down", (t, e) => {
                                    this.startPress(t, e)
                                })
                            },
                            e = (0, h.E)(this.node.current, "keydown", t),
                            i = () => {
                                this.isPressing && f("cancel", (t, e) => this.cancelPress(t, e))
                            },
                            n = (0, h.E)(this.node.current, "blur", i);
                        this.removeAccessibleListeners = (0, r.z)(e, n)
                    }
                }
                startPress(t, e) {
                    this.isPressing = !0;
                    let {
                        onTapStart: i,
                        whileTap: n
                    } = this.node.getProps();
                    n && this.node.animationState && this.node.animationState.setActive("whileTap", !0), i && a.Z_.update(() => i(t, e))
                }
                checkPressEnd() {
                    this.removeEndListeners(), this.isPressing = !1;
                    let t = this.node.getProps();
                    return t.whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1), !(0, s.gD)()
                }
                cancelPress(t, e) {
                    if (!this.checkPressEnd()) return;
                    let {
                        onTapCancel: i
                    } = this.node.getProps();
                    i && a.Z_.update(() => i(t, e))
                }
                mount() {
                    let t = this.node.getProps(),
                        e = (0, n.a)(this.node.current, "pointerdown", this.startPointerPress, {
                            passive: !(t.onTapStart || t.onPointerStart)
                        }),
                        i = (0, h.E)(this.node.current, "focus", this.startAccessiblePress);
                    this.removeStartListeners = (0, r.z)(e, i)
                }
                unmount() {
                    this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners()
                }
            }
            let g = new WeakMap,
                y = new WeakMap,
                x = t => {
                    let e = g.get(t.target);
                    e && e(t)
                },
                P = t => {
                    t.forEach(x)
                },
                E = {
                    some: 0,
                    all: 1
                };
            class T extends o.L {
                constructor() {
                    super(...arguments), this.hasEnteredView = !1, this.isInView = !1
                }
                startObserver() {
                    this.unmount();
                    let {
                        viewport: t = {}
                    } = this.node.getProps(), {
                        root: e,
                        margin: i,
                        amount: n = "some",
                        once: r
                    } = t, s = {
                        root: e ? e.current : void 0,
                        rootMargin: i,
                        threshold: "number" == typeof n ? n : E[n]
                    }, o = t => {
                        let {
                            isIntersecting: e
                        } = t;
                        if (this.isInView === e || (this.isInView = e, r && !e && this.hasEnteredView)) return;
                        e && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", e);
                        let {
                            onViewportEnter: i,
                            onViewportLeave: n
                        } = this.node.getProps(), s = e ? i : n;
                        s && s(t)
                    };
                    return function(t, e, i) {
                        let n = function({
                            root: t,
                            ...e
                        }) {
                            let i = t || document;
                            y.has(i) || y.set(i, {});
                            let n = y.get(i),
                                r = JSON.stringify(e);
                            return n[r] || (n[r] = new IntersectionObserver(P, {
                                root: t,
                                ...e
                            })), n[r]
                        }(e);
                        return g.set(t, i), n.observe(t), () => {
                            g.delete(t), n.unobserve(t)
                        }
                    }(this.node.current, s, o)
                }
                mount() {
                    this.startObserver()
                }
                update() {
                    if ("undefined" == typeof IntersectionObserver) return;
                    let {
                        props: t,
                        prevProps: e
                    } = this.node, i = ["amount", "margin", "root"].some(function({
                        viewport: t = {}
                    }, {
                        viewport: e = {}
                    } = {}) {
                        return i => t[i] !== e[i]
                    }(t, e));
                    i && this.startObserver()
                }
                unmount() {}
            }
            let V = {
                inView: {
                    Feature: T
                },
                tap: {
                    Feature: v
                },
                focus: {
                    Feature: c
                },
                hover: {
                    Feature: u
                }
            }
        },
        81840: function(t, e, i) {
            i.d(e, {
                b: function() {
                    return s
                }
            });
            var n = i(27614),
                r = i(97856);
            let s = {
                layout: {
                    ProjectionNode: n.u,
                    MeasureLayout: r.q
                }
            }
        },
        97856: function(t, e, i) {
            i.d(e, {
                q: function() {
                    return x
                }
            });
            var n = i(91816),
                r = i(2784),
                s = i(58175),
                o = i(3422),
                a = i(64460),
                l = i(63722),
                u = i(88772);

            function h(t, e) {
                return e.max === e.min ? 0 : t / (e.max - e.min) * 100
            }
            let c = {
                correct: (t, e) => {
                    if (!e.target) return t;
                    if ("string" == typeof t) {
                        if (!u.px.test(t)) return t;
                        t = parseFloat(t)
                    }
                    let i = h(t, e.target.x),
                        n = h(t, e.target.y);
                    return `${i}% ${n}%`
                }
            };
            var d = i(64833),
                p = i(65339),
                m = i(76865);
            let f = "_$css",
                v = {
                    correct: (t, {
                        treeScale: e,
                        projectionDelta: i
                    }) => {
                        let n = t,
                            r = t.includes("var("),
                            s = [];
                        r && (t = t.replace(d.Xp, t => (s.push(t), f)));
                        let o = m.P.parse(t);
                        if (o.length > 5) return n;
                        let a = m.P.createTransformer(t),
                            l = "number" != typeof o[0] ? 1 : 0,
                            u = i.x.scale * e.x,
                            h = i.y.scale * e.y;
                        o[0 + l] /= u, o[1 + l] /= h;
                        let c = (0, p.C)(u, h, .5);
                        "number" == typeof o[2 + l] && (o[2 + l] /= c), "number" == typeof o[3 + l] && (o[3 + l] /= c);
                        let v = a(o);
                        if (r) {
                            let t = 0;
                            v = v.replace(f, () => {
                                let e = s[t];
                                return t++, e
                            })
                        }
                        return v
                    }
                };
            var g = i(14599);
            class y extends r.Component {
                componentDidMount() {
                    let {
                        visualElement: t,
                        layoutGroup: e,
                        switchLayoutGroup: i,
                        layoutId: n
                    } = this.props, {
                        projection: r
                    } = t;
                    (0, g.B)(P), r && (e.group && e.group.add(r), i && i.register && n && i.register(r), r.root.didUpdate(), r.addEventListener("animationComplete", () => {
                        this.safeToRemove()
                    }), r.setOptions({ ...r.options,
                        onExitComplete: () => this.safeToRemove()
                    })), l.V.hasEverUpdated = !0
                }
                getSnapshotBeforeUpdate(t) {
                    let {
                        layoutDependency: e,
                        visualElement: i,
                        drag: r,
                        isPresent: s
                    } = this.props, o = i.projection;
                    return o && (o.isPresent = s, r || t.layoutDependency !== e || void 0 === e ? o.willUpdate() : this.safeToRemove(), t.isPresent === s || (s ? o.promote() : o.relegate() || n.Z_.postRender(() => {
                        let t = o.getStack();
                        t && t.members.length || this.safeToRemove()
                    }))), null
                }
                componentDidUpdate() {
                    let {
                        projection: t
                    } = this.props.visualElement;
                    t && (t.root.didUpdate(), !t.currentAnimation && t.isLead() && this.safeToRemove())
                }
                componentWillUnmount() {
                    let {
                        visualElement: t,
                        layoutGroup: e,
                        switchLayoutGroup: i
                    } = this.props, {
                        projection: n
                    } = t;
                    n && (n.scheduleCheckAfterUnmount(), e && e.group && e.group.remove(n), i && i.deregister && i.deregister(n))
                }
                safeToRemove() {
                    let {
                        safeToRemove: t
                    } = this.props;
                    t && t()
                }
                render() {
                    return null
                }
            }

            function x(t) {
                let [e, i] = (0, s.oO)(), n = (0, r.useContext)(o.p);
                return r.createElement(y, { ...t,
                    layoutGroup: n,
                    switchLayoutGroup: (0, r.useContext)(a.g),
                    isPresent: e,
                    safeToRemove: i
                })
            }
            let P = {
                borderRadius: { ...c,
                    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
                },
                borderTopLeftRadius: c,
                borderTopRightRadius: c,
                borderBottomLeftRadius: c,
                borderBottomRightRadius: c,
                boxShadow: v
            }
        },
        77222: function(t, e, i) {
            function n({
                top: t,
                left: e,
                right: i,
                bottom: n
            }) {
                return {
                    x: {
                        min: e,
                        max: i
                    },
                    y: {
                        min: t,
                        max: n
                    }
                }
            }

            function r({
                x: t,
                y: e
            }) {
                return {
                    top: e.min,
                    right: t.max,
                    bottom: e.max,
                    left: t.min
                }
            }

            function s(t, e) {
                if (!e) return t;
                let i = e({
                        x: t.left,
                        y: t.top
                    }),
                    n = e({
                        x: t.right,
                        y: t.bottom
                    });
                return {
                    top: i.y,
                    left: i.x,
                    bottom: n.y,
                    right: n.x
                }
            }
            i.d(e, {
                d7: function() {
                    return s
                },
                i8: function() {
                    return n
                },
                z2: function() {
                    return r
                }
            })
        },
        2217: function(t, e, i) {
            i.d(e, {
                D2: function() {
                    return f
                },
                YY: function() {
                    return u
                },
                am: function() {
                    return c
                },
                o2: function() {
                    return l
                },
                q2: function() {
                    return s
                }
            });
            var n = i(65339),
                r = i(28749);

            function s(t, e, i) {
                return i + e * (t - i)
            }

            function o(t, e, i, n, r) {
                return void 0 !== r && (t = n + r * (t - n)), n + i * (t - n) + e
            }

            function a(t, e = 0, i = 1, n, r) {
                t.min = o(t.min, e, i, n, r), t.max = o(t.max, e, i, n, r)
            }

            function l(t, {
                x: e,
                y: i
            }) {
                a(t.x, e.translate, e.scale, e.originPoint), a(t.y, i.translate, i.scale, i.originPoint)
            }

            function u(t, e, i, n = !1) {
                let s, o;
                let a = i.length;
                if (a) {
                    e.x = e.y = 1;
                    for (let u = 0; u < a; u++) {
                        o = (s = i[u]).projectionDelta;
                        let a = s.instance;
                        (!a || !a.style || "contents" !== a.style.display) && (n && s.options.layoutScroll && s.scroll && s !== s.root && f(t, {
                            x: -s.scroll.offset.x,
                            y: -s.scroll.offset.y
                        }), o && (e.x *= o.x.scale, e.y *= o.y.scale, l(t, o)), n && (0, r.ud)(s.latestValues) && f(t, s.latestValues))
                    }
                    e.x = h(e.x), e.y = h(e.y)
                }
            }

            function h(t) {
                return Number.isInteger(t) ? t : t > 1.0000000000001 || t < .999999999999 ? t : 1
            }

            function c(t, e) {
                t.min = t.min + e, t.max = t.max + e
            }

            function d(t, e, [i, r, s]) {
                let o = void 0 !== e[s] ? e[s] : .5,
                    l = (0, n.C)(t.min, t.max, o);
                a(t, e[i], e[r], l, e.scale)
            }
            let p = ["x", "scaleX", "originX"],
                m = ["y", "scaleY", "originY"];

            function f(t, e) {
                d(t.x, e, p), d(t.y, e, m)
            }
        },
        24144: function(t, e, i) {
            i.d(e, {
                JO: function() {
                    return r
                },
                b3: function() {
                    return c
                },
                tf: function() {
                    return u
                },
                wS: function() {
                    return s
                },
                y$: function() {
                    return a
                }
            });
            var n = i(65339);

            function r(t) {
                return t.max - t.min
            }

            function s(t, e = 0, i = .01) {
                return Math.abs(t - e) <= i
            }

            function o(t, e, i, o = .5) {
                t.origin = o, t.originPoint = (0, n.C)(e.min, e.max, t.origin), t.scale = r(i) / r(e), (s(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1), t.translate = (0, n.C)(i.min, i.max, t.origin) - t.originPoint, (s(t.translate) || isNaN(t.translate)) && (t.translate = 0)
            }

            function a(t, e, i, n) {
                o(t.x, e.x, i.x, n ? n.originX : void 0), o(t.y, e.y, i.y, n ? n.originY : void 0)
            }

            function l(t, e, i) {
                t.min = i.min + e.min, t.max = t.min + r(e)
            }

            function u(t, e, i) {
                l(t.x, e.x, i.x), l(t.y, e.y, i.y)
            }

            function h(t, e, i) {
                t.min = e.min - i.min, t.max = t.min + r(e)
            }

            function c(t, e, i) {
                h(t.x, e.x, i.x), h(t.y, e.y, i.y)
            }
        },
        33933: function(t, e, i) {
            i.d(e, {
                dO: function() {
                    return o
                },
                wc: function() {
                    return r
                }
            });
            let n = () => ({
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                }),
                r = () => ({
                    x: n(),
                    y: n()
                }),
                s = () => ({
                    min: 0,
                    max: 0
                }),
                o = () => ({
                    x: s(),
                    y: s()
                })
        },
        27614: function(t, e, i) {
            i.d(e, {
                u: function() {
                    return ty
                },
                J: function() {
                    return tg
                }
            });
            var n = i(91816),
                r = i(88069),
                s = i(41469),
                o = i(17475),
                a = i(65339),
                l = i(50065),
                u = i(88772);
            let h = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
                c = h.length,
                d = t => "string" == typeof t ? parseFloat(t) : t,
                p = t => "number" == typeof t || u.px.test(t);

            function m(t, e) {
                return void 0 !== t[e] ? t[e] : t.borderRadius
            }
            let f = g(0, .5, s.Bn),
                v = g(.5, .95, l.Z);

            function g(t, e, i) {
                return n => n < t ? 0 : n > e ? 1 : i((0, o.Y)(t, e, n))
            }

            function y(t, e) {
                t.min = e.min, t.max = e.max
            }

            function x(t, e) {
                y(t.x, e.x), y(t.y, e.y)
            }
            var P = i(2217),
                E = i(24144);

            function T(t, e, i, n, r) {
                return t -= e, t = (0, P.q2)(t, 1 / i, n), void 0 !== r && (t = (0, P.q2)(t, 1 / r, n)), t
            }

            function V(t, e, [i, n, r], s, o) {
                ! function(t, e = 0, i = 1, n = .5, r, s = t, o = t) {
                    if (u.aQ.test(e)) {
                        e = parseFloat(e);
                        let t = (0, a.C)(o.min, o.max, e / 100);
                        e = t - o.min
                    }
                    if ("number" != typeof e) return;
                    let l = (0, a.C)(s.min, s.max, n);
                    t === s && (l -= e), t.min = T(t.min, e, i, l, r), t.max = T(t.max, e, i, l, r)
                }(t, e[i], e[n], e[r], e.scale, s, o)
            }
            let S = ["x", "scaleX", "originX"],
                w = ["y", "scaleY", "originY"];

            function b(t, e, i, n) {
                V(t.x, e, S, i ? i.x : void 0, n ? n.x : void 0), V(t.y, e, w, i ? i.y : void 0, n ? n.y : void 0)
            }
            var A = i(33933),
                C = i(73172);

            function D(t) {
                return 0 === t.translate && 1 === t.scale
            }

            function L(t) {
                return D(t.x) && D(t.y)
            }

            function R(t, e) {
                return t.x.min === e.x.min && t.x.max === e.x.max && t.y.min === e.y.min && t.y.max === e.y.max
            }

            function M(t) {
                return (0, E.JO)(t.x) / (0, E.JO)(t.y)
            }
            var j = i(44866);
            class B {
                constructor() {
                    this.members = []
                }
                add(t) {
                    (0, j.y4)(this.members, t), t.scheduleRender()
                }
                remove(t) {
                    if ((0, j.cl)(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
                        let t = this.members[this.members.length - 1];
                        t && this.promote(t)
                    }
                }
                relegate(t) {
                    let e;
                    let i = this.members.findIndex(e => t === e);
                    if (0 === i) return !1;
                    for (let t = i; t >= 0; t--) {
                        let i = this.members[t];
                        if (!1 !== i.isPresent) {
                            e = i;
                            break
                        }
                    }
                    return !!e && (this.promote(e), !0)
                }
                promote(t, e) {
                    let i = this.lead;
                    if (t !== i && (this.prevLead = i, this.lead = t, t.show(), i)) {
                        i.instance && i.scheduleRender(), t.scheduleRender(), t.resumeFrom = i, e && (t.resumeFrom.preserveOpacity = !0), i.snapshot && (t.snapshot = i.snapshot, t.snapshot.latestValues = i.animationValues || i.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
                        let {
                            crossfade: n
                        } = t.options;
                        !1 === n && i.hide()
                    }
                }
                exitAnimationComplete() {
                    this.members.forEach(t => {
                        let {
                            options: e,
                            resumingFrom: i
                        } = t;
                        e.onExitComplete && e.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete()
                    })
                }
                scheduleRender() {
                    this.members.forEach(t => {
                        t.instance && t.scheduleRender(!1)
                    })
                }
                removeLeadSnapshot() {
                    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
                }
            }
            var F = i(14599);

            function k(t, e, i) {
                let n = "",
                    r = t.x.translate / e.x,
                    s = t.y.translate / e.y;
                if ((r || s) && (n = `translate3d(${r}px, ${s}px, 0) `), (1 !== e.x || 1 !== e.y) && (n += `scale(${1/e.x}, ${1/e.y}) `), i) {
                    let {
                        rotate: t,
                        rotateX: e,
                        rotateY: r
                    } = i;
                    t && (n += `rotate(${t}deg) `), e && (n += `rotateX(${e}deg) `), r && (n += `rotateY(${r}deg) `)
                }
                let o = t.x.scale * e.x,
                    a = t.y.scale * e.y;
                return (1 !== o || 1 !== a) && (n += `scale(${o}, ${a})`), n || "none"
            }
            var O = i(1010),
                U = i(28749),
                I = i(32958),
                N = i(69535),
                z = i(63722),
                $ = i(59803),
                Z = i(28650),
                G = i(74197),
                _ = i(85403);
            let Y = ["", "X", "Y", "Z"],
                H = 0,
                J = {
                    type: "projectionFrame",
                    totalNodes: 0,
                    resolvedTargetDeltas: 0,
                    recalculatedProjection: 0
                };

            function q({
                attachResizeListener: t,
                defaultParent: e,
                measureScroll: i,
                checkIsScrollRoot: s,
                resetTransform: o
            }) {
                return class {
                    constructor(t, i = {}, n = null == e ? void 0 : e()) {
                        this.id = H++, this.animationId = 0, this.children = new Set, this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.treeScale = {
                            x: 1,
                            y: 1
                        }, this.eventHandlers = new Map, this.potentialNodes = new Map, this.checkUpdateFailed = () => {
                            this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
                        }, this.updateProjection = () => {
                            J.totalNodes = J.resolvedTargetDeltas = J.recalculatedProjection = 0, this.nodes.forEach(Q), this.nodes.forEach(tr), this.nodes.forEach(ts), this.nodes.forEach(K), window.MotionDebug && window.MotionDebug.record(J)
                        }, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = new Map, this.elementId = t, this.latestValues = i, this.root = n ? n.root || n : this, this.path = n ? [...n.path, n] : [], this.parent = n, this.depth = n ? n.depth + 1 : 0, t && this.root.registerPotentialNode(t, this);
                        for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0;
                        this.root === this && (this.nodes = new I.E)
                    }
                    addEventListener(t, e) {
                        return this.eventHandlers.has(t) || this.eventHandlers.set(t, new r.L), this.eventHandlers.get(t).add(e)
                    }
                    notifyListeners(t, ...e) {
                        let i = this.eventHandlers.get(t);
                        i && i.notify(...e)
                    }
                    hasListeners(t) {
                        return this.eventHandlers.has(t)
                    }
                    registerPotentialNode(t, e) {
                        this.potentialNodes.set(t, e)
                    }
                    mount(e, i = !1) {
                        if (this.instance) return;
                        this.isSVG = (0, Z.v)(e), this.instance = e;
                        let {
                            layoutId: n,
                            layout: r,
                            visualElement: s
                        } = this.options;
                        if (s && !s.current && s.mount(e), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.elementId && this.root.potentialNodes.delete(this.elementId), i && (r || n) && (this.isLayoutDirty = !0), t) {
                            let i;
                            let n = () => this.root.updateBlockedByResize = !1;
                            t(e, () => {
                                this.root.updateBlockedByResize = !0, i && i(), i = (0, $.g)(n, 250), z.V.hasAnimatedSinceResize && (z.V.hasAnimatedSinceResize = !1, this.nodes.forEach(tn))
                            })
                        }
                        n && this.root.registerSharedNode(n, this), !1 !== this.options.animate && s && (n || r) && this.addEventListener("didUpdate", ({
                            delta: t,
                            hasLayoutChanged: e,
                            hasRelativeTargetChanged: i,
                            layout: n
                        }) => {
                            if (this.isTreeAnimationBlocked()) {
                                this.target = void 0, this.relativeTarget = void 0;
                                return
                            }
                            let r = this.options.transition || s.getDefaultTransition() || tc,
                                {
                                    onLayoutAnimationStart: o,
                                    onLayoutAnimationComplete: a
                                } = s.getProps(),
                                l = !this.targetLayout || !R(this.targetLayout, n) || i,
                                u = !e && i;
                            if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || u || e && (l || !this.currentAnimation)) {
                                this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(t, u);
                                let e = { ...(0, C.ev)(r, "layout"),
                                    onPlay: o,
                                    onComplete: a
                                };
                                (s.shouldReduceMotion || this.options.layoutRoot) && (e.delay = 0, e.type = !1), this.startAnimation(e)
                            } else e || 0 !== this.animationProgress || tn(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                            this.targetLayout = n
                        })
                    }
                    unmount() {
                        this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
                        let t = this.getStack();
                        t && t.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, n.qY.preRender(this.updateProjection)
                    }
                    blockUpdate() {
                        this.updateManuallyBlocked = !0
                    }
                    unblockUpdate() {
                        this.updateManuallyBlocked = !1
                    }
                    isUpdateBlocked() {
                        return this.updateManuallyBlocked || this.updateBlockedByResize
                    }
                    isTreeAnimationBlocked() {
                        return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
                    }
                    startUpdate() {
                        !this.isUpdateBlocked() && (this.isUpdating = !0, this.nodes && this.nodes.forEach(to), this.animationId++)
                    }
                    getTransformTemplate() {
                        let {
                            visualElement: t
                        } = this.options;
                        return t && t.getProps().transformTemplate
                    }
                    willUpdate(t = !0) {
                        if (this.root.isUpdateBlocked()) {
                            this.options.onExitComplete && this.options.onExitComplete();
                            return
                        }
                        if (this.root.isUpdating || this.root.startUpdate(), this.isLayoutDirty) return;
                        this.isLayoutDirty = !0;
                        for (let t = 0; t < this.path.length; t++) {
                            let e = this.path[t];
                            e.shouldResetTransform = !0, e.updateScroll("snapshot"), e.options.layoutRoot && e.willUpdate(!1)
                        }
                        let {
                            layoutId: e,
                            layout: i
                        } = this.options;
                        if (void 0 === e && !i) return;
                        let n = this.getTransformTemplate();
                        this.prevTransformTemplateValue = n ? n(this.latestValues, "") : void 0, this.updateSnapshot(), t && this.notifyListeners("willUpdate")
                    }
                    didUpdate() {
                        let t = this.isUpdateBlocked();
                        if (t) {
                            this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(te);
                            return
                        }
                        this.isUpdating && (this.isUpdating = !1, this.potentialNodes.size && (this.potentialNodes.forEach(td), this.potentialNodes.clear()), this.nodes.forEach(ti), this.nodes.forEach(W), this.nodes.forEach(X), this.clearAllSnapshots(), n.iW.update(), n.iW.preRender(), n.iW.render())
                    }
                    clearAllSnapshots() {
                        this.nodes.forEach(tt), this.sharedNodes.forEach(ta)
                    }
                    scheduleUpdateProjection() {
                        n.Z_.preRender(this.updateProjection, !1, !0)
                    }
                    scheduleCheckAfterUnmount() {
                        n.Z_.postRender(() => {
                            this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
                        })
                    }
                    updateSnapshot() {
                        !this.snapshot && this.instance && (this.snapshot = this.measure())
                    }
                    updateLayout() {
                        if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
                        if (this.resumeFrom && !this.resumeFrom.instance)
                            for (let t = 0; t < this.path.length; t++) {
                                let e = this.path[t];
                                e.updateScroll()
                            }
                        let t = this.layout;
                        this.layout = this.measure(!1), this.layoutCorrected = (0, A.dO)(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
                        let {
                            visualElement: e
                        } = this.options;
                        e && e.notify("LayoutMeasure", this.layout.layoutBox, t ? t.layoutBox : void 0)
                    }
                    updateScroll(t = "measure") {
                        let e = !!(this.options.layoutScroll && this.instance);
                        this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === t && (e = !1), e && (this.scroll = {
                            animationId: this.root.animationId,
                            phase: t,
                            isRoot: s(this.instance),
                            offset: i(this.instance)
                        })
                    }
                    resetTransform() {
                        if (!o) return;
                        let t = this.isLayoutDirty || this.shouldResetTransform,
                            e = this.projectionDelta && !L(this.projectionDelta),
                            i = this.getTransformTemplate(),
                            n = i ? i(this.latestValues, "") : void 0,
                            r = n !== this.prevTransformTemplateValue;
                        t && (e || (0, U.ud)(this.latestValues) || r) && (o(this.instance, n), this.shouldResetTransform = !1, this.scheduleRender())
                    }
                    measure(t = !0) {
                        var e;
                        let i = this.measurePageBox(),
                            n = this.removeElementScroll(i);
                        return t && (n = this.removeTransform(n)), tp((e = n).x), tp(e.y), {
                            animationId: this.root.animationId,
                            measuredBox: i,
                            layoutBox: n,
                            latestValues: {},
                            source: this.id
                        }
                    }
                    measurePageBox() {
                        let {
                            visualElement: t
                        } = this.options;
                        if (!t) return (0, A.dO)();
                        let e = t.measureViewportBox(),
                            {
                                scroll: i
                            } = this.root;
                        return i && ((0, P.am)(e.x, i.offset.x), (0, P.am)(e.y, i.offset.y)), e
                    }
                    removeElementScroll(t) {
                        let e = (0, A.dO)();
                        x(e, t);
                        for (let i = 0; i < this.path.length; i++) {
                            let n = this.path[i],
                                {
                                    scroll: r,
                                    options: s
                                } = n;
                            if (n !== this.root && r && s.layoutScroll) {
                                if (r.isRoot) {
                                    x(e, t);
                                    let {
                                        scroll: i
                                    } = this.root;
                                    i && ((0, P.am)(e.x, -i.offset.x), (0, P.am)(e.y, -i.offset.y))
                                }(0, P.am)(e.x, r.offset.x), (0, P.am)(e.y, r.offset.y)
                            }
                        }
                        return e
                    }
                    applyTransform(t, e = !1) {
                        let i = (0, A.dO)();
                        x(i, t);
                        for (let t = 0; t < this.path.length; t++) {
                            let n = this.path[t];
                            !e && n.options.layoutScroll && n.scroll && n !== n.root && (0, P.D2)(i, {
                                x: -n.scroll.offset.x,
                                y: -n.scroll.offset.y
                            }), (0, U.ud)(n.latestValues) && (0, P.D2)(i, n.latestValues)
                        }
                        return (0, U.ud)(this.latestValues) && (0, P.D2)(i, this.latestValues), i
                    }
                    removeTransform(t) {
                        let e = (0, A.dO)();
                        x(e, t);
                        for (let t = 0; t < this.path.length; t++) {
                            let i = this.path[t];
                            if (!i.instance || !(0, U.ud)(i.latestValues)) continue;
                            (0, U.Lj)(i.latestValues) && i.updateSnapshot();
                            let n = (0, A.dO)(),
                                r = i.measurePageBox();
                            x(n, r), b(e, i.latestValues, i.snapshot ? i.snapshot.layoutBox : void 0, n)
                        }
                        return (0, U.ud)(this.latestValues) && b(e, this.latestValues), e
                    }
                    setTargetDelta(t) {
                        this.targetDelta = t, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0
                    }
                    setOptions(t) {
                        this.options = { ...this.options,
                            ...t,
                            crossfade: void 0 === t.crossfade || t.crossfade
                        }
                    }
                    clearMeasurements() {
                        this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1
                    }
                    resolveTargetDelta(t = !1) {
                        var e;
                        let i = this.getLead();
                        this.isProjectionDirty || (this.isProjectionDirty = i.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = i.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = i.isSharedProjectionDirty);
                        let n = !!this.resumingFrom || this !== i,
                            r = !(t || n && this.isSharedProjectionDirty || this.isProjectionDirty || (null === (e = this.parent) || void 0 === e ? void 0 : e.isProjectionDirty) || this.attemptToResolveRelativeTarget);
                        if (r) return;
                        let {
                            layout: s,
                            layoutId: o
                        } = this.options;
                        if (this.layout && (s || o)) {
                            if (this.resolvedRelativeTargetAt = _.w.timestamp, !this.targetDelta && !this.relativeTarget) {
                                let t = this.getClosestProjectingParent();
                                t && t.layout ? (this.relativeParent = t, this.relativeTarget = (0, A.dO)(), this.relativeTargetOrigin = (0, A.dO)(), (0, E.b3)(this.relativeTargetOrigin, this.layout.layoutBox, t.layout.layoutBox), x(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                            }
                            if (this.relativeTarget || this.targetDelta) {
                                if (this.target || (this.target = (0, A.dO)(), this.targetWithTransforms = (0, A.dO)()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.relativeParent.resolvedRelativeTargetAt !== _.w.timestamp && this.relativeParent.resolveTargetDelta(!0), (0, E.tf)(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : x(this.target, this.layout.layoutBox), (0, P.o2)(this.target, this.targetDelta)) : x(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
                                    this.attemptToResolveRelativeTarget = !1;
                                    let t = this.getClosestProjectingParent();
                                    t && !!t.resumingFrom == !!this.resumingFrom && !t.options.layoutScroll && t.target ? (this.relativeParent = t, this.relativeTarget = (0, A.dO)(), this.relativeTargetOrigin = (0, A.dO)(), (0, E.b3)(this.relativeTargetOrigin, this.target, t.target), x(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                                }
                                J.resolvedTargetDeltas++
                            }
                        }
                    }
                    getClosestProjectingParent() {
                        return !this.parent || (0, U.Lj)(this.parent.latestValues) || (0, U.D_)(this.parent.latestValues) ? void 0 : this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
                    }
                    isProjecting() {
                        return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
                    }
                    calcProjection() {
                        var t;
                        let e = this.getLead(),
                            i = !!this.resumingFrom || this !== e,
                            n = !0;
                        if ((this.isProjectionDirty || (null === (t = this.parent) || void 0 === t ? void 0 : t.isProjectionDirty)) && (n = !1), i && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1), this.resolvedRelativeTargetAt === _.w.timestamp && (n = !1), n) return;
                        let {
                            layout: r,
                            layoutId: s
                        } = this.options;
                        if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(r || s)) return;
                        x(this.layoutCorrected, this.layout.layoutBox), (0, P.YY)(this.layoutCorrected, this.treeScale, this.path, i);
                        let {
                            target: o
                        } = e;
                        if (!o) return;
                        this.projectionDelta || (this.projectionDelta = (0, A.wc)(), this.projectionDeltaWithTransform = (0, A.wc)());
                        let a = this.treeScale.x,
                            l = this.treeScale.y,
                            u = this.projectionTransform;
                        (0, E.y$)(this.projectionDelta, this.layoutCorrected, o, this.latestValues), this.projectionTransform = k(this.projectionDelta, this.treeScale), (this.projectionTransform !== u || this.treeScale.x !== a || this.treeScale.y !== l) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", o)), J.recalculatedProjection++
                    }
                    hide() {
                        this.isVisible = !1
                    }
                    show() {
                        this.isVisible = !0
                    }
                    scheduleRender(t = !0) {
                        if (this.options.scheduleRender && this.options.scheduleRender(), t) {
                            let t = this.getStack();
                            t && t.scheduleRender()
                        }
                        this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
                    }
                    setAnimationOrigin(t, e = !1) {
                        let i;
                        let n = this.snapshot,
                            r = n ? n.latestValues : {},
                            s = { ...this.latestValues
                            },
                            o = (0, A.wc)();
                        this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !e;
                        let l = (0, A.dO)(),
                            g = n ? n.source : void 0,
                            y = this.layout ? this.layout.source : void 0,
                            P = g !== y,
                            T = this.getStack(),
                            V = !T || T.members.length <= 1,
                            S = !!(P && !V && !0 === this.options.crossfade && !this.path.some(th));
                        this.animationProgress = 0, this.mixTargetDelta = e => {
                            var n, g;
                            let y = e / 1e3;
                            tl(o.x, t.x, y), tl(o.y, t.y, y), this.setTargetDelta(o), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && ((0, E.b3)(l, this.layout.layoutBox, this.relativeParent.layout.layoutBox), n = this.relativeTarget, g = this.relativeTargetOrigin, tu(n.x, g.x, l.x, y), tu(n.y, g.y, l.y, y), i && R(this.relativeTarget, i) && (this.isProjectionDirty = !1), i || (i = (0, A.dO)()), x(i, this.relativeTarget)), P && (this.animationValues = s, function(t, e, i, n, r, s) {
                                r ? (t.opacity = (0, a.C)(0, void 0 !== i.opacity ? i.opacity : 1, f(n)), t.opacityExit = (0, a.C)(void 0 !== e.opacity ? e.opacity : 1, 0, v(n))) : s && (t.opacity = (0, a.C)(void 0 !== e.opacity ? e.opacity : 1, void 0 !== i.opacity ? i.opacity : 1, n));
                                for (let r = 0; r < c; r++) {
                                    let s = `border${h[r]}Radius`,
                                        o = m(e, s),
                                        l = m(i, s);
                                    if (void 0 === o && void 0 === l) continue;
                                    o || (o = 0), l || (l = 0);
                                    let c = 0 === o || 0 === l || p(o) === p(l);
                                    c ? (t[s] = Math.max((0, a.C)(d(o), d(l), n), 0), (u.aQ.test(l) || u.aQ.test(o)) && (t[s] += "%")) : t[s] = l
                                }(e.rotate || i.rotate) && (t.rotate = (0, a.C)(e.rotate || 0, i.rotate || 0, n))
                            }(s, r, this.latestValues, y, S, V)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = y
                        }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
                    }
                    startAnimation(t) {
                        this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (n.qY.update(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = n.Z_.update(() => {
                            z.V.hasAnimatedSinceResize = !0, this.currentAnimation = (0, G.D)(0, 1e3, { ...t,
                                onUpdate: e => {
                                    this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e)
                                },
                                onComplete: () => {
                                    t.onComplete && t.onComplete(), this.completeAnimation()
                                }
                            }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0
                        })
                    }
                    completeAnimation() {
                        this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
                        let t = this.getStack();
                        t && t.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete")
                    }
                    finishAnimation() {
                        this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()), this.completeAnimation()
                    }
                    applyTransformsToTarget() {
                        let t = this.getLead(),
                            {
                                targetWithTransforms: e,
                                target: i,
                                layout: n,
                                latestValues: r
                            } = t;
                        if (e && i && n) {
                            if (this !== t && this.layout && n && tm(this.options.animationType, this.layout.layoutBox, n.layoutBox)) {
                                i = this.target || (0, A.dO)();
                                let e = (0, E.JO)(this.layout.layoutBox.x);
                                i.x.min = t.target.x.min, i.x.max = i.x.min + e;
                                let n = (0, E.JO)(this.layout.layoutBox.y);
                                i.y.min = t.target.y.min, i.y.max = i.y.min + n
                            }
                            x(e, i), (0, P.D2)(e, r), (0, E.y$)(this.projectionDeltaWithTransform, this.layoutCorrected, e, r)
                        }
                    }
                    registerSharedNode(t, e) {
                        this.sharedNodes.has(t) || this.sharedNodes.set(t, new B);
                        let i = this.sharedNodes.get(t);
                        i.add(e);
                        let n = e.options.initialPromotionConfig;
                        e.promote({
                            transition: n ? n.transition : void 0,
                            preserveFollowOpacity: n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(e) : void 0
                        })
                    }
                    isLead() {
                        let t = this.getStack();
                        return !t || t.lead === this
                    }
                    getLead() {
                        var t;
                        let {
                            layoutId: e
                        } = this.options;
                        return e && (null === (t = this.getStack()) || void 0 === t ? void 0 : t.lead) || this
                    }
                    getPrevLead() {
                        var t;
                        let {
                            layoutId: e
                        } = this.options;
                        return e ? null === (t = this.getStack()) || void 0 === t ? void 0 : t.prevLead : void 0
                    }
                    getStack() {
                        let {
                            layoutId: t
                        } = this.options;
                        if (t) return this.root.sharedNodes.get(t)
                    }
                    promote({
                        needsReset: t,
                        transition: e,
                        preserveFollowOpacity: i
                    } = {}) {
                        let n = this.getStack();
                        n && n.promote(this, i), t && (this.projectionDelta = void 0, this.needsReset = !0), e && this.setOptions({
                            transition: e
                        })
                    }
                    relegate() {
                        let t = this.getStack();
                        return !!t && t.relegate(this)
                    }
                    resetRotation() {
                        let {
                            visualElement: t
                        } = this.options;
                        if (!t) return;
                        let e = !1,
                            {
                                latestValues: i
                            } = t;
                        if ((i.rotate || i.rotateX || i.rotateY || i.rotateZ) && (e = !0), !e) return;
                        let n = {};
                        for (let e = 0; e < Y.length; e++) {
                            let r = "rotate" + Y[e];
                            i[r] && (n[r] = i[r], t.setStaticValue(r, 0))
                        }
                        for (let e in t.render(), n) t.setStaticValue(e, n[e]);
                        t.scheduleRender()
                    }
                    getProjectionStyles(t = {}) {
                        var e, i;
                        let n = {};
                        if (!this.instance || this.isSVG) return n;
                        if (!this.isVisible) return {
                            visibility: "hidden"
                        };
                        n.visibility = "";
                        let r = this.getTransformTemplate();
                        if (this.needsReset) return this.needsReset = !1, n.opacity = "", n.pointerEvents = (0, N.b)(t.pointerEvents) || "", n.transform = r ? r(this.latestValues, "") : "none", n;
                        let s = this.getLead();
                        if (!this.projectionDelta || !this.layout || !s.target) {
                            let e = {};
                            return this.options.layoutId && (e.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1, e.pointerEvents = (0, N.b)(t.pointerEvents) || ""), this.hasProjected && !(0, U.ud)(this.latestValues) && (e.transform = r ? r({}, "") : "none", this.hasProjected = !1), e
                        }
                        let o = s.animationValues || s.latestValues;
                        this.applyTransformsToTarget(), n.transform = k(this.projectionDeltaWithTransform, this.treeScale, o), r && (n.transform = r(o, n.transform));
                        let {
                            x: a,
                            y: l
                        } = this.projectionDelta;
                        for (let t in n.transformOrigin = `${100*a.origin}% ${100*l.origin}% 0`, s.animationValues ? n.opacity = s === this ? null !== (i = null !== (e = o.opacity) && void 0 !== e ? e : this.latestValues.opacity) && void 0 !== i ? i : 1 : this.preserveOpacity ? this.latestValues.opacity : o.opacityExit : n.opacity = s === this ? void 0 !== o.opacity ? o.opacity : "" : void 0 !== o.opacityExit ? o.opacityExit : 0, F.P) {
                            if (void 0 === o[t]) continue;
                            let {
                                correct: e,
                                applyTo: i
                            } = F.P[t], r = "none" === n.transform ? o[t] : e(o[t], s);
                            if (i) {
                                let t = i.length;
                                for (let e = 0; e < t; e++) n[i[e]] = r
                            } else n[t] = r
                        }
                        return this.options.layoutId && (n.pointerEvents = s === this ? (0, N.b)(t.pointerEvents) || "" : "none"), n
                    }
                    clearSnapshot() {
                        this.resumeFrom = this.snapshot = void 0
                    }
                    resetTree() {
                        this.root.nodes.forEach(t => {
                            var e;
                            return null === (e = t.currentAnimation) || void 0 === e ? void 0 : e.stop()
                        }), this.root.nodes.forEach(te), this.root.sharedNodes.clear()
                    }
                }
            }

            function W(t) {
                t.updateLayout()
            }

            function X(t) {
                var e;
                let i = (null === (e = t.resumeFrom) || void 0 === e ? void 0 : e.snapshot) || t.snapshot;
                if (t.isLead() && t.layout && i && t.hasListeners("didUpdate")) {
                    let {
                        layoutBox: e,
                        measuredBox: n
                    } = t.layout, {
                        animationType: r
                    } = t.options, s = i.source !== t.layout.source;
                    "size" === r ? (0, O.U)(t => {
                        let n = s ? i.measuredBox[t] : i.layoutBox[t],
                            r = (0, E.JO)(n);
                        n.min = e[t].min, n.max = n.min + r
                    }) : tm(r, i.layoutBox, e) && (0, O.U)(n => {
                        let r = s ? i.measuredBox[n] : i.layoutBox[n],
                            o = (0, E.JO)(e[n]);
                        r.max = r.min + o, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[n].max = t.relativeTarget[n].min + o)
                    });
                    let o = (0, A.wc)();
                    (0, E.y$)(o, e, i.layoutBox);
                    let a = (0, A.wc)();
                    s ? (0, E.y$)(a, t.applyTransform(n, !0), i.measuredBox) : (0, E.y$)(a, e, i.layoutBox);
                    let l = !L(o),
                        u = !1;
                    if (!t.resumeFrom) {
                        let n = t.getClosestProjectingParent();
                        if (n && !n.resumeFrom) {
                            let {
                                snapshot: r,
                                layout: s
                            } = n;
                            if (r && s) {
                                let o = (0, A.dO)();
                                (0, E.b3)(o, i.layoutBox, r.layoutBox);
                                let a = (0, A.dO)();
                                (0, E.b3)(a, e, s.layoutBox), R(o, a) || (u = !0), n.options.layoutRoot && (t.relativeTarget = a, t.relativeTargetOrigin = o, t.relativeParent = n)
                            }
                        }
                    }
                    t.notifyListeners("didUpdate", {
                        layout: e,
                        snapshot: i,
                        delta: a,
                        layoutDelta: o,
                        hasLayoutChanged: l,
                        hasRelativeTargetChanged: u
                    })
                } else if (t.isLead()) {
                    let {
                        onExitComplete: e
                    } = t.options;
                    e && e()
                }
                t.options.transition = void 0
            }

            function Q(t) {
                J.totalNodes++, t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
            }

            function K(t) {
                t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
            }

            function tt(t) {
                t.clearSnapshot()
            }

            function te(t) {
                t.clearMeasurements()
            }

            function ti(t) {
                let {
                    visualElement: e
                } = t.options;
                e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform()
            }

            function tn(t) {
                t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0
            }

            function tr(t) {
                t.resolveTargetDelta()
            }

            function ts(t) {
                t.calcProjection()
            }

            function to(t) {
                t.resetRotation()
            }

            function ta(t) {
                t.removeLeadSnapshot()
            }

            function tl(t, e, i) {
                t.translate = (0, a.C)(e.translate, 0, i), t.scale = (0, a.C)(e.scale, 1, i), t.origin = e.origin, t.originPoint = e.originPoint
            }

            function tu(t, e, i, n) {
                t.min = (0, a.C)(e.min, i.min, n), t.max = (0, a.C)(e.max, i.max, n)
            }

            function th(t) {
                return t.animationValues && void 0 !== t.animationValues.opacityExit
            }
            let tc = {
                duration: .45,
                ease: [.4, 0, .1, 1]
            };

            function td(t, e) {
                let i = t.root;
                for (let e = t.path.length - 1; e >= 0; e--)
                    if (t.path[e].instance) {
                        i = t.path[e];
                        break
                    }
                let n = i && i !== t.root ? i.instance : document,
                    r = n.querySelector(`[data-projection-id="${e}"]`);
                r && t.mount(r, !0)
            }

            function tp(t) {
                t.min = Math.round(t.min), t.max = Math.round(t.max)
            }

            function tm(t, e, i) {
                return "position" === t || "preserve-aspect" === t && !(0, E.wS)(M(e), M(i), .2)
            }
            var tf = i(78624);
            let tv = q({
                    attachResizeListener: (t, e) => (0, tf.E)(t, "resize", e),
                    measureScroll: () => ({
                        x: document.documentElement.scrollLeft || document.body.scrollLeft,
                        y: document.documentElement.scrollTop || document.body.scrollTop
                    }),
                    checkIsScrollRoot: () => !0
                }),
                tg = {
                    current: void 0
                },
                ty = q({
                    measureScroll: t => ({
                        x: t.scrollLeft,
                        y: t.scrollTop
                    }),
                    defaultParent: () => {
                        if (!tg.current) {
                            let t = new tv(0, {});
                            t.mount(window), t.setOptions({
                                layoutScroll: !0
                            }), tg.current = t
                        }
                        return tg.current
                    },
                    resetTransform: (t, e) => {
                        t.style.transform = void 0 !== e ? e : "none"
                    },
                    checkIsScrollRoot: t => "fixed" === window.getComputedStyle(t).position
                })
        },
        1010: function(t, e, i) {
            i.d(e, {
                U: function() {
                    return n
                }
            });

            function n(t) {
                return [t("x"), t("y")]
            }
        },
        28749: function(t, e, i) {
            function n(t) {
                return void 0 === t || 1 === t
            }

            function r({
                scale: t,
                scaleX: e,
                scaleY: i
            }) {
                return !n(t) || !n(e) || !n(i)
            }

            function s(t) {
                return r(t) || o(t) || t.z || t.rotate || t.rotateX || t.rotateY
            }

            function o(t) {
                var e, i;
                return (e = t.x) && "0%" !== e || (i = t.y) && "0%" !== i
            }
            i.d(e, {
                D_: function() {
                    return o
                },
                Lj: function() {
                    return r
                },
                ud: function() {
                    return s
                }
            })
        },
        85579: function(t, e, i) {
            i.d(e, {
                J: function() {
                    return s
                },
                z: function() {
                    return o
                }
            });
            var n = i(77222),
                r = i(2217);

            function s(t, e) {
                return (0, n.i8)((0, n.d7)(t.getBoundingClientRect(), e))
            }

            function o(t, e, i) {
                let n = s(t, i),
                    {
                        scroll: o
                    } = e;
                return o && ((0, r.am)(n.x, o.offset.x), (0, r.am)(n.y, o.offset.y)), n
            }
        },
        56779: function(t, e, i) {
            i.d(e, {
                l: function() {
                    return V
                }
            });
            var n = i(91816),
                r = i(33933),
                s = i(8350),
                o = i(62519),
                a = i(23993),
                l = i(88069),
                u = i(40226),
                h = i(67397),
                c = i(15815),
                d = i(73442),
                p = i(23293),
                m = i(20330),
                f = i(99764),
                v = i(7397),
                g = i(36427),
                y = i(16578);
            let x = Object.keys(v.A),
                P = x.length,
                E = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"],
                T = g.V.length;
            class V {
                constructor({
                    parent: t,
                    props: e,
                    presenceContext: i,
                    reducedMotionConfig: r,
                    visualState: s
                }, o = {}) {
                    this.current = null, this.children = new Set, this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = new Map, this.features = {}, this.valueSubscriptions = new Map, this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
                        this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
                    }, this.scheduleRender = () => n.Z_.render(this.render, !1, !0);
                    let {
                        latestValues: a,
                        renderState: l
                    } = s;
                    this.latestValues = a, this.baseTarget = { ...a
                    }, this.initialValues = e.initial ? { ...a
                    } : {}, this.renderState = l, this.parent = t, this.props = e, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = r, this.options = o, this.isControllingVariants = (0, p.G)(e), this.isVariantNode = (0, p.M)(e), this.isVariantNode && (this.variantChildren = new Set), this.manuallyAnimateOnMount = !!(t && t.current);
                    let {
                        willChange: u,
                        ...d
                    } = this.scrapeMotionValuesFromProps(e, {});
                    for (let t in d) {
                        let e = d[t];
                        void 0 !== a[t] && (0, c.i)(e) && (e.set(a[t], !1), (0, h.L)(u) && u.add(t))
                    }
                }
                scrapeMotionValuesFromProps(t, e) {
                    return {}
                }
                mount(t) {
                    this.current = t, y.R.set(t, this), this.projection && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((t, e) => this.bindToMotionValue(e, t)), a.O.current || (0, o.A)(), this.shouldReduceMotion = "never" !== this.reducedMotionConfig && ("always" === this.reducedMotionConfig || a.n.current), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext)
                }
                unmount() {
                    for (let t in y.R.delete(this.current), this.projection && this.projection.unmount(), n.qY.update(this.notifyUpdate), n.qY.render(this.render), this.valueSubscriptions.forEach(t => t()), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this), this.events) this.events[t].clear();
                    for (let t in this.features) this.features[t].unmount();
                    this.current = null
                }
                bindToMotionValue(t, e) {
                    let i = d.G.has(t),
                        r = e.on("change", e => {
                            this.latestValues[t] = e, this.props.onUpdate && n.Z_.update(this.notifyUpdate, !1, !0), i && this.projection && (this.projection.isTransformDirty = !0)
                        }),
                        s = e.on("renderRequest", this.scheduleRender);
                    this.valueSubscriptions.set(t, () => {
                        r(), s()
                    })
                }
                sortNodePosition(t) {
                    return this.current && this.sortInstanceNodePosition && this.type === t.type ? this.sortInstanceNodePosition(this.current, t.current) : 0
                }
                loadFeatures({
                    children: t,
                    ...e
                }, i, n, r, o) {
                    let a, l;
                    for (let t = 0; t < P; t++) {
                        let i = x[t],
                            {
                                isEnabled: n,
                                Feature: r,
                                ProjectionNode: s,
                                MeasureLayout: o
                            } = v.A[i];
                        s && (a = s), n(e) && (!this.features[i] && r && (this.features[i] = new r(this)), o && (l = o))
                    }
                    if (!this.projection && a) {
                        this.projection = new a(r, this.latestValues, this.parent && this.parent.projection);
                        let {
                            layoutId: t,
                            layout: i,
                            drag: n,
                            dragConstraints: l,
                            layoutScroll: u,
                            layoutRoot: h
                        } = e;
                        this.projection.setOptions({
                            layoutId: t,
                            layout: i,
                            alwaysMeasureLayout: !!n || l && (0, s.I)(l),
                            visualElement: this,
                            scheduleRender: () => this.scheduleRender(),
                            animationType: "string" == typeof i ? i : "both",
                            initialPromotionConfig: o,
                            layoutScroll: u,
                            layoutRoot: h
                        })
                    }
                    return l
                }
                updateFeatures() {
                    for (let t in this.features) {
                        let e = this.features[t];
                        e.isMounted ? e.update(this.props, this.prevProps) : (e.mount(), e.isMounted = !0)
                    }
                }
                triggerBuild() {
                    this.build(this.renderState, this.latestValues, this.options, this.props)
                }
                measureViewportBox() {
                    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : (0, r.dO)()
                }
                getStaticValue(t) {
                    return this.latestValues[t]
                }
                setStaticValue(t, e) {
                    this.latestValues[t] = e
                }
                makeTargetAnimatable(t, e = !0) {
                    return this.makeTargetAnimatableFromInstance(t, this.props, e)
                }
                update(t, e) {
                    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = e;
                    for (let e = 0; e < E.length; e++) {
                        let i = E[e];
                        this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
                        let n = t["on" + i];
                        n && (this.propEventSubscriptions[i] = this.on(i, n))
                    }
                    this.prevMotionValues = function(t, e, i) {
                        let {
                            willChange: n
                        } = e;
                        for (let r in e) {
                            let s = e[r],
                                o = i[r];
                            if ((0, c.i)(s)) t.addValue(r, s), (0, h.L)(n) && n.add(r);
                            else if ((0, c.i)(o)) t.addValue(r, (0, u.B)(s, {
                                owner: t
                            })), (0, h.L)(n) && n.remove(r);
                            else if (o !== s) {
                                if (t.hasValue(r)) {
                                    let e = t.getValue(r);
                                    e.hasAnimated || e.set(s)
                                } else {
                                    let e = t.getStaticValue(r);
                                    t.addValue(r, (0, u.B)(void 0 !== e ? e : s, {
                                        owner: t
                                    }))
                                }
                            }
                        }
                        for (let n in i) void 0 === e[n] && t.removeValue(n);
                        return e
                    }(this, this.scrapeMotionValuesFromProps(t, this.prevProps), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue()
                }
                getProps() {
                    return this.props
                }
                getVariant(t) {
                    return this.props.variants ? this.props.variants[t] : void 0
                }
                getDefaultTransition() {
                    return this.props.transition
                }
                getTransformPagePoint() {
                    return this.props.transformPagePoint
                }
                getClosestVariantNode() {
                    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
                }
                getVariantContext(t = !1) {
                    if (t) return this.parent ? this.parent.getVariantContext() : void 0;
                    if (!this.isControllingVariants) {
                        let t = this.parent && this.parent.getVariantContext() || {};
                        return void 0 !== this.props.initial && (t.initial = this.props.initial), t
                    }
                    let e = {};
                    for (let t = 0; t < T; t++) {
                        let i = g.V[t],
                            n = this.props[i];
                        ((0, m.$)(n) || !1 === n) && (e[i] = n)
                    }
                    return e
                }
                addVariantChild(t) {
                    let e = this.getClosestVariantNode();
                    if (e) return e.variantChildren && e.variantChildren.add(t), () => e.variantChildren.delete(t)
                }
                addValue(t, e) {
                    e !== this.values.get(t) && (this.removeValue(t), this.bindToMotionValue(t, e)), this.values.set(t, e), this.latestValues[t] = e.get()
                }
                removeValue(t) {
                    this.values.delete(t);
                    let e = this.valueSubscriptions.get(t);
                    e && (e(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState)
                }
                hasValue(t) {
                    return this.values.has(t)
                }
                getValue(t, e) {
                    if (this.props.values && this.props.values[t]) return this.props.values[t];
                    let i = this.values.get(t);
                    return void 0 === i && void 0 !== e && (i = (0, u.B)(e, {
                        owner: this
                    }), this.addValue(t, i)), i
                }
                readValue(t) {
                    return void 0 === this.latestValues[t] && this.current ? this.readValueFromInstance(this.current, t, this.options) : this.latestValues[t]
                }
                setBaseTarget(t, e) {
                    this.baseTarget[t] = e
                }
                getBaseTarget(t) {
                    var e;
                    let {
                        initial: i
                    } = this.props, n = "string" == typeof i || "object" == typeof i ? null === (e = (0, f.o)(this.props, i)) || void 0 === e ? void 0 : e[t] : void 0;
                    if (i && void 0 !== n) return n;
                    let r = this.getBaseTargetFromProps(this.props, t);
                    return void 0 === r || (0, c.i)(r) ? void 0 !== this.initialValues[t] && void 0 === n ? void 0 : this.baseTarget[t] : r
                }
                on(t, e) {
                    return this.events[t] || (this.events[t] = new l.L), this.events[t].add(e)
                }
                notify(t, ...e) {
                    this.events[t] && this.events[t].notify(...e)
                }
            }
        },
        57182: function(t, e, i) {
            i.d(e, {
                J: function() {
                    return w
                }
            });
            var n = i(18617),
                r = i(64833),
                s = i(55721),
                o = i(57035),
                a = i(73442),
                l = i(62289),
                u = i(33791),
                h = i(30397),
                c = i(88772);
            let d = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y"]),
                p = t => d.has(t),
                m = t => Object.keys(t).some(p),
                f = t => t === h.Rx || t === c.px,
                v = (t, e) => parseFloat(t.split(", ")[e]),
                g = (t, e) => (i, {
                    transform: n
                }) => {
                    if ("none" === n || !n) return 0;
                    let r = n.match(/^matrix3d\((.+)\)$/);
                    if (r) return v(r[1], e); {
                        let e = n.match(/^matrix\((.+)\)$/);
                        return e ? v(e[1], t) : 0
                    }
                },
                y = new Set(["x", "y", "z"]),
                x = a._.filter(t => !y.has(t)),
                P = {
                    width: ({
                        x: t
                    }, {
                        paddingLeft: e = "0",
                        paddingRight: i = "0"
                    }) => t.max - t.min - parseFloat(e) - parseFloat(i),
                    height: ({
                        y: t
                    }, {
                        paddingTop: e = "0",
                        paddingBottom: i = "0"
                    }) => t.max - t.min - parseFloat(e) - parseFloat(i),
                    top: (t, {
                        top: e
                    }) => parseFloat(e),
                    left: (t, {
                        left: e
                    }) => parseFloat(e),
                    bottom: ({
                        y: t
                    }, {
                        top: e
                    }) => parseFloat(e) + (t.max - t.min),
                    right: ({
                        x: t
                    }, {
                        left: e
                    }) => parseFloat(e) + (t.max - t.min),
                    x: g(4, 13),
                    y: g(5, 14)
                },
                E = (t, e, i) => {
                    let n = e.measureViewportBox(),
                        r = e.current,
                        s = getComputedStyle(r),
                        {
                            display: o
                        } = s,
                        a = {};
                    "none" === o && e.setStaticValue("display", t.display || "block"), i.forEach(t => {
                        a[t] = P[t](n, s)
                    }), e.render();
                    let l = e.measureViewportBox();
                    return i.forEach(i => {
                        let n = e.getValue(i);
                        n && n.jump(a[i]), t[i] = P[i](l, s)
                    }), t
                },
                T = (t, e, i = {}, n = {}) => {
                    e = { ...e
                    }, n = { ...n
                    };
                    let r = Object.keys(e).filter(p),
                        a = [],
                        h = !1,
                        d = [];
                    if (r.forEach(r => {
                            let u;
                            let p = t.getValue(r);
                            if (!t.hasValue(r)) return;
                            let m = i[r],
                                v = (0, l.C)(m),
                                g = e[r];
                            if ((0, s.C)(g)) {
                                let t = g.length,
                                    e = null === g[0] ? 1 : 0;
                                m = g[e], v = (0, l.C)(m);
                                for (let i = e; i < t && null !== g[i]; i++) u ? (0, o.k)((0, l.C)(g[i]) === u, "All keyframes must be of the same type") : (u = (0, l.C)(g[i]), (0, o.k)(u === v || f(v) && f(u), "Keyframes must be of the same dimension as the current value"))
                            } else u = (0, l.C)(g);
                            if (v !== u) {
                                if (f(v) && f(u)) {
                                    let t = p.get();
                                    "string" == typeof t && p.set(parseFloat(t)), "string" == typeof g ? e[r] = parseFloat(g) : Array.isArray(g) && u === c.px && (e[r] = g.map(parseFloat))
                                } else(null == v ? void 0 : v.transform) && (null == u ? void 0 : u.transform) && (0 === m || 0 === g) ? 0 === m ? p.set(u.transform(m)) : e[r] = v.transform(g) : (h || (a = function(t) {
                                    let e = [];
                                    return x.forEach(i => {
                                        let n = t.getValue(i);
                                        void 0 !== n && (e.push([i, n.get()]), n.set(i.startsWith("scale") ? 1 : 0))
                                    }), e.length && t.render(), e
                                }(t), h = !0), d.push(r), n[r] = void 0 !== n[r] ? n[r] : e[r], p.jump(g))
                            }
                        }), !d.length) return {
                        target: e,
                        transitionEnd: n
                    }; {
                        let i = d.indexOf("height") >= 0 ? window.pageYOffset : null,
                            r = E(e, t, d);
                        return a.length && a.forEach(([e, i]) => {
                            t.getValue(e).set(i)
                        }), t.render(), u.j && null !== i && window.scrollTo({
                            top: i
                        }), {
                            target: r,
                            transitionEnd: n
                        }
                    }
                },
                V = (t, e, i, n) => {
                    var s, o;
                    let a = (0, r.mH)(t, e, n);
                    return e = a.target, n = a.transitionEnd, s = e, o = n, m(s) ? T(t, s, i, o) : {
                        target: s,
                        transitionEnd: o
                    }
                };
            var S = i(56779);
            class w extends S.l {
                sortInstanceNodePosition(t, e) {
                    return 2 & t.compareDocumentPosition(e) ? 1 : -1
                }
                getBaseTargetFromProps(t, e) {
                    return t.style ? t.style[e] : void 0
                }
                removeValueFromRenderState(t, {
                    vars: e,
                    style: i
                }) {
                    delete e[t], delete i[t]
                }
                makeTargetAnimatableFromInstance({
                    transition: t,
                    transitionEnd: e,
                    ...i
                }, {
                    transformValues: r
                }, s) {
                    let o = (0, n.P$)(i, t || {}, this);
                    if (r && (e && (e = r(e)), i && (i = r(i)), o && (o = r(o))), s) {
                        (0, n.GJ)(this, i, o);
                        let t = V(this, i, o, e);
                        e = t.transitionEnd, i = t.target
                    }
                    return {
                        transition: t,
                        transitionEnd: e,
                        ...i
                    }
                }
            }
        },
        63048: function(t, e, i) {
            i.d(e, {
                b: function() {
                    return o
                }
            });
            var n = i(74422),
                r = i(23384),
                s = i(75866);
            let o = (t, e) => (0, s.q)(t) ? new r.e(e, {
                enableHardwareAcceleration: !1
            }) : new n.W(e, {
                enableHardwareAcceleration: !0
            })
        },
        66865: function(t, e, i) {
            i.d(e, {
                E: function() {
                    return d
                },
                F: function() {
                    return p
                }
            });
            var n = i(28383),
                r = i(65019),
                s = i(63377),
                o = i(18106),
                a = i(60526),
                l = i(51169),
                u = i(63048),
                h = i(81840);
            let c = { ...a.s,
                    ...o.E,
                    ...l.o,
                    ...h.b
                },
                d = (0, r.D)((t, e) => (0, s.w)(t, e, c, u.b));

            function p(t) {
                return (0, n.F)((0, s.w)(t, {
                    forwardMotionProps: !1
                }, c, u.b))
            }
        },
        64833: function(t, e, i) {
            i.d(e, {
                Xp: function() {
                    return s
                },
                mH: function() {
                    return a
                }
            });
            var n = i(57035),
                r = i(91331);
            let s = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;

            function o(t, e, i = 1) {
                (0, n.k)(i <= 4, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`);
                let [a, l] = function(t) {
                    let e = s.exec(t);
                    if (!e) return [, ];
                    let [, i, n] = e;
                    return [i, n]
                }(t);
                if (!a) return;
                let u = window.getComputedStyle(e).getPropertyValue(a);
                return u ? u.trim() : (0, r.t)(l) ? o(l, e, i + 1) : l
            }

            function a(t, { ...e
            }, i) {
                let n = t.current;
                if (!(n instanceof Element)) return {
                    target: e,
                    transitionEnd: i
                };
                for (let s in i && (i = { ...i
                    }), t.values.forEach(t => {
                        let e = t.get();
                        if (!(0, r.t)(e)) return;
                        let i = o(e, n);
                        i && t.set(i)
                    }), e) {
                    let t = e[s];
                    if (!(0, r.t)(t)) continue;
                    let a = o(t, n);
                    a && (e[s] = a, i || (i = {}), void 0 === i[s] && (i[s] = t))
                }
                return {
                    target: e,
                    transitionEnd: i
                }
            }
        },
        28650: function(t, e, i) {
            i.d(e, {
                v: function() {
                    return n
                }
            });

            function n(t) {
                return t instanceof SVGElement && "svg" !== t.tagName
            }
        },
        74422: function(t, e, i) {
            i.d(e, {
                W: function() {
                    return d
                }
            });
            var n = i(10161),
                r = i(91331),
                s = i(73442),
                o = i(53921),
                a = i(2473),
                l = i(88434),
                u = i(85579),
                h = i(57182),
                c = i(15815);
            class d extends h.J {
                readValueFromInstance(t, e) {
                    if (s.G.has(e)) {
                        let t = (0, l.A)(e);
                        return t && t.default || 0
                    } {
                        let i = window.getComputedStyle(t),
                            n = ((0, r.f)(e) ? i.getPropertyValue(e) : i[e]) || 0;
                        return "string" == typeof n ? n.trim() : n
                    }
                }
                measureInstanceViewportBox(t, {
                    transformPagePoint: e
                }) {
                    return (0, u.J)(t, e)
                }
                build(t, e, i, r) {
                    (0, n.r)(t, e, i, r.transformTemplate)
                }
                scrapeMotionValuesFromProps(t, e) {
                    return (0, o.U)(t, e)
                }
                handleChildMotionValue() {
                    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
                    let {
                        children: t
                    } = this.props;
                    (0, c.i)(t) && (this.childSubscription = t.on("change", t => {
                        this.current && (this.current.textContent = `${t}`)
                    }))
                }
                renderInstance(t, e, i, n) {
                    (0, a.N)(t, e, i, n)
                }
            }
        },
        16578: function(t, e, i) {
            i.d(e, {
                R: function() {
                    return n
                }
            });
            let n = new WeakMap
        },
        23384: function(t, e, i) {
            i.d(e, {
                e: function() {
                    return p
                }
            });
            var n = i(7587),
                r = i(57182),
                s = i(10658),
                o = i(18754),
                a = i(55282),
                l = i(73442),
                u = i(13517),
                h = i(88434),
                c = i(33933),
                d = i(13336);
            class p extends r.J {
                constructor() {
                    super(...arguments), this.isSVGTag = !1
                }
                getBaseTargetFromProps(t, e) {
                    return t[e]
                }
                readValueFromInstance(t, e) {
                    if (l.G.has(e)) {
                        let t = (0, h.A)(e);
                        return t && t.default || 0
                    }
                    return e = a.s.has(e) ? e : (0, o.D)(e), t.getAttribute(e)
                }
                measureInstanceViewportBox() {
                    return (0, c.dO)()
                }
                scrapeMotionValuesFromProps(t, e) {
                    return (0, n.U)(t, e)
                }
                build(t, e, i, n) {
                    (0, s.i)(t, e, i, this.isSVGTag, n.transformTemplate)
                }
                renderInstance(t, e, i, n) {
                    (0, u.K)(t, e, i, n)
                }
                mount(t) {
                    this.isSVGTag = (0, d.a)(t.tagName), super.mount(t)
                }
            }
        },
        32958: function(t, e, i) {
            i.d(e, {
                E: function() {
                    return s
                }
            });
            var n = i(44866);
            let r = (t, e) => t.depth - e.depth;
            class s {
                constructor() {
                    this.children = [], this.isDirty = !1
                }
                add(t) {
                    (0, n.y4)(this.children, t), this.isDirty = !0
                }
                remove(t) {
                    (0, n.cl)(this.children, t), this.isDirty = !0
                }
                forEach(t) {
                    this.isDirty && this.children.sort(r), this.isDirty = !1, this.children.forEach(t)
                }
            }
        },
        59803: function(t, e, i) {
            i.d(e, {
                g: function() {
                    return r
                }
            });
            var n = i(91816);

            function r(t, e) {
                let i = performance.now(),
                    r = ({
                        timestamp: s
                    }) => {
                        let o = s - i;
                        o >= e && (n.qY.read(r), t(o - e))
                    };
                return n.Z_.read(r, !0), () => n.qY.read(r)
            }
        },
        31216: function(t, e, i) {
            i.d(e, {
                T: function() {
                    return n
                },
                y: function() {
                    return r
                }
            });
            let n = (t, e) => Math.abs(t - e);

            function r(t, e) {
                let i = n(t.x, e.x),
                    r = n(t.y, e.y);
                return Math.sqrt(i ** 2 + r ** 2)
            }
        },
        62519: function(t, e, i) {
            i.d(e, {
                A: function() {
                    return s
                }
            });
            var n = i(33791),
                r = i(23993);

            function s() {
                if (r.O.current = !0, n.j) {
                    if (window.matchMedia) {
                        let t = window.matchMedia("(prefers-reduced-motion)"),
                            e = () => r.n.current = t.matches;
                        t.addListener(e), e()
                    } else r.n.current = !1
                }
            }
        },
        23993: function(t, e, i) {
            i.d(e, {
                O: function() {
                    return r
                },
                n: function() {
                    return n
                }
            });
            let n = {
                    current: null
                },
                r = {
                    current: !1
                }
        },
        10810: function(t, e, i) {
            i.d(e, {
                v: function() {
                    return o
                }
            });
            var n = i(83972);
            let r = t => "object" == typeof t && t.mix,
                s = t => r(t) ? t.mix : void 0;

            function o(...t) {
                let e = !Array.isArray(t[0]),
                    i = e ? 0 : -1,
                    r = t[0 + i],
                    a = t[1 + i],
                    l = t[2 + i],
                    u = t[3 + i],
                    h = (0, n.s)(a, l, {
                        mixer: s(l[0]),
                        ...u
                    });
                return e ? h(r) : h
            }
        },
        85886: function(t, e, i) {
            i.d(e, {
                N: function() {
                    return o
                }
            });
            var n = i(91816),
                r = i(2784),
                s = i(20251);

            function o() {
                let t = (0, s.t)(),
                    [e, i] = (0, r.useState)(0),
                    o = (0, r.useCallback)(() => {
                        t.current && i(e + 1)
                    }, [e]),
                    a = (0, r.useCallback)(() => n.Z_.postRender(o), [o]);
                return [a, e]
            }
        },
        20251: function(t, e, i) {
            i.d(e, {
                t: function() {
                    return s
                }
            });
            var n = i(2784),
                r = i(23617);

            function s() {
                let t = (0, n.useRef)(!1);
                return (0, r.L)(() => (t.current = !0, () => {
                    t.current = !1
                }), []), t
            }
        },
        96073: function(t, e, i) {
            i.d(e, {
                z: function() {
                    return r
                }
            });
            var n = i(2784);

            function r(t) {
                return (0, n.useEffect)(() => () => t(), [])
            }
        },
        77014: function(t, e, i) {
            i.d(e, {
                N: function() {
                    return o
                }
            });
            var n = i(21687),
                r = i(91816),
                s = i(23617);

            function o(t, e) {
                let i = (0, n.c)(e()),
                    o = () => i.set(e());
                return o(), (0, s.L)(() => {
                    let e = () => r.Z_.update(o, !1, !0),
                        i = t.map(t => t.on("change", e));
                    return () => {
                        i.forEach(t => t()), r.qY.update(o)
                    }
                }), i
            }
        },
        21687: function(t, e, i) {
            i.d(e, {
                c: function() {
                    return a
                }
            });
            var n = i(2784),
                r = i(40226),
                s = i(60976),
                o = i(3105);

            function a(t) {
                let e = (0, o.h)(() => (0, r.B)(t)),
                    {
                        isStatic: i
                    } = (0, n.useContext)(s._);
                if (i) {
                    let [, i] = (0, n.useState)(t);
                    (0, n.useEffect)(() => e.on("change", i), [])
                }
                return e
            }
        },
        24373: function(t, e, i) {
            i.d(e, {
                H: function() {
                    return o
                }
            });
            var n = i(10810),
                r = i(77014),
                s = i(3105);

            function o(t, e, i, r) {
                let s = "function" == typeof e ? e : (0, n.v)(e, i, r);
                return Array.isArray(t) ? a(t, s) : a([t], ([t]) => s(t))
            }

            function a(t, e) {
                let i = (0, s.h)(() => []);
                return (0, r.N)(t, () => {
                    i.length = 0;
                    let n = t.length;
                    for (let e = 0; e < n; e++) i[e] = t[e].get();
                    return e(i)
                })
            }
        }
    }
]);
//# sourceMappingURL=1411-31ca2e35e2d5e36c.js.map