"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5673], {
        63617: function(t, e, n) {
            n.d(e, {
                W: function() {
                    return i
                }
            });
            var r = n(57035),
                o = n(18617),
                u = n(1686);

            function i() {
                let t = !1,
                    e = new Set,
                    n = {
                        subscribe: t => (e.add(t), () => void e.delete(t)),
                        start(n, o) {
                            (0, r.k)(t, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");
                            let i = [];
                            return e.forEach(t => {
                                i.push((0, u.d)(t, n, {
                                    transitionOverride: o
                                }))
                            }), Promise.all(i)
                        },
                        set: n => ((0, r.k)(t, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."), e.forEach(t => {
                            (0, o.gg)(t, n)
                        })),
                        stop() {
                            e.forEach(t => {
                                ! function(t) {
                                    t.values.forEach(t => t.stop())
                                }(t)
                            })
                        },
                        mount: () => (t = !0, () => {
                            t = !1, n.stop()
                        })
                    };
                return n
            }
        },
        68609: function(t, e, n) {
            n.d(e, {
                E: function() {
                    return i
                },
                _: function() {
                    return a
                }
            });
            var r = n(63617),
                o = n(3105),
                u = n(23617);

            function i() {
                let t = (0, o.h)(r.W);
                return (0, u.L)(t.mount, []), t
            }
            let a = i
        },
        30453: function(t, e, n) {
            n.d(e, {
                S: function() {
                    return o
                },
                o: function() {
                    return i
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
            let u = () => new o;

            function i() {
                return (0, r.h)(u)
            }
        },
        74378: function(t, e, n) {
            let r, o;
            n.r(e), n.d(e, {
                AnimatePresence: function() {
                    return a.M
                },
                AnimateSharedLayout: function() {
                    return eY
                },
                DeprecatedLayoutGroupContext: function() {
                    return p
                },
                DragControls: function() {
                    return t9.S
                },
                FlatTree: function() {
                    return eO.E
                },
                LayoutGroup: function() {
                    return E
                },
                LayoutGroupContext: function() {
                    return m.p
                },
                LazyMotion: function() {
                    return h.X
                },
                MotionConfig: function() {
                    return d
                },
                MotionConfigContext: function() {
                    return l._
                },
                MotionContext: function() {
                    return eM.v
                },
                MotionValue: function() {
                    return _.H
                },
                PresenceContext: function() {
                    return eL.O
                },
                Reorder: function() {
                    return b.t
                },
                SwitchLayoutGroupContext: function() {
                    return ek.g
                },
                VisualElement: function() {
                    return ei.l
                },
                addPointerEvent: function() {
                    return e5.a
                },
                addPointerInfo: function() {
                    return e3.s
                },
                addScaleCorrector: function() {
                    return ea.B
                },
                animate: function() {
                    return tQ
                },
                animateValue: function() {
                    return ep.y
                },
                animateVisualElement: function() {
                    return t7.d
                },
                animationControls: function() {
                    return tL.W
                },
                animations: function() {
                    return A.s
                },
                anticipate: function() {
                    return eU.L
                },
                backIn: function() {
                    return eJ.G2
                },
                backInOut: function() {
                    return eJ.XL
                },
                backOut: function() {
                    return eJ.CG
                },
                buildTransform: function() {
                    return em.P
                },
                calcLength: function() {
                    return e7.JO
                },
                checkTargetForNewValues: function() {
                    return eP.GJ
                },
                circIn: function() {
                    return eq.Z7
                },
                circInOut: function() {
                    return eq.X7
                },
                circOut: function() {
                    return eq.Bn
                },
                clamp: function() {
                    return eX.u
                },
                color: function() {
                    return eg.$
                },
                complex: function() {
                    return ev.P
                },
                createBox: function() {
                    return eW.dO
                },
                createDomMotionComponent: function() {
                    return u.F
                },
                createMotionComponent: function() {
                    return en.F
                },
                createScopedAnimate: function() {
                    return tK
                },
                cubicBezier: function() {
                    return ej._
                },
                delay: function() {
                    return e0.g
                },
                distance: function() {
                    return e1.T
                },
                distance2D: function() {
                    return e1.y
                },
                domAnimation: function() {
                    return C
                },
                domMax: function() {
                    return k
                },
                easeIn: function() {
                    return e$.YQ
                },
                easeInOut: function() {
                    return e$.mZ
                },
                easeOut: function() {
                    return e$.Vv
                },
                filterProps: function() {
                    return c.L
                },
                frameData: function() {
                    return R.w
                },
                inView: function() {
                    return t2
                },
                interpolate: function() {
                    return te.s
                },
                invariant: function() {
                    return z.k
                },
                isBrowser: function() {
                    return e4.j
                },
                isDragActive: function() {
                    return e6.gD
                },
                isMotionComponent: function() {
                    return eo
                },
                isMotionValue: function() {
                    return tD.i
                },
                isValidMotionProp: function() {
                    return t5.Z
                },
                m: function() {
                    return i.m
                },
                makeUseVisualState: function() {
                    return eV.t
                },
                mirrorEasing: function() {
                    return eK.o
                },
                mix: function() {
                    return tN.C
                },
                motion: function() {
                    return u.E
                },
                motionValue: function() {
                    return _.B
                },
                optimizedAppearDataAttribute: function() {
                    return eb.M
                },
                pipe: function() {
                    return eZ.z
                },
                progress: function() {
                    return X.Y
                },
                px: function() {
                    return ey.px
                },
                resolveMotionValue: function() {
                    return V.b
                },
                reverseEasing: function() {
                    return eQ.M
                },
                scroll: function() {
                    return ts
                },
                spring: function() {
                    return t_.S
                },
                stagger: function() {
                    return eG
                },
                startOptimizedAppearAnimation: function() {
                    return eC
                },
                sync: function() {
                    return H.Z_
                },
                transform: function() {
                    return eN.v
                },
                unwrapMotionComponent: function() {
                    return eu
                },
                useAnimate: function() {
                    return t0
                },
                useAnimation: function() {
                    return t1._
                },
                useAnimationControls: function() {
                    return t1.E
                },
                useAnimationFrame: function() {
                    return tp
                },
                useCycle: function() {
                    return t6
                },
                useDeprecatedAnimatedState: function() {
                    return e_
                },
                useDeprecatedInvertedScale: function() {
                    return eR
                },
                useDomEvent: function() {
                    return ee
                },
                useDragControls: function() {
                    return t9.o
                },
                useElementScroll: function() {
                    return th
                },
                useForceUpdate: function() {
                    return g.N
                },
                useInView: function() {
                    return t8
                },
                useInstantLayoutTransition: function() {
                    return el
                },
                useInstantTransition: function() {
                    return ed
                },
                useIsPresent: function() {
                    return t3.hO
                },
                useIsomorphicLayoutEffect: function() {
                    return tl.L
                },
                useMotionTemplate: function() {
                    return P.Y
                },
                useMotionValue: function() {
                    return O.c
                },
                useMotionValueEvent: function() {
                    return T
                },
                usePresence: function() {
                    return t3.oO
                },
                useReducedMotion: function() {
                    return tC
                },
                useReducedMotionConfig: function() {
                    return tM
                },
                useResetProjection: function() {
                    return eh
                },
                useScroll: function() {
                    return td
                },
                useSpring: function() {
                    return I.q
                },
                useTime: function() {
                    return tg
                },
                useTransform: function() {
                    return W.H
                },
                useUnmountEffect: function() {
                    return tk.z
                },
                useVelocity: function() {
                    return B
                },
                useViewportScroll: function() {
                    return tm
                },
                useWillChange: function() {
                    return tA
                },
                warning: function() {
                    return z.K
                },
                wrap: function() {
                    return tF
                }
            });
            var u = n(66865),
                i = n(93556),
                a = n(25925),
                s = n(2784),
                l = n(60976),
                c = n(48630),
                f = n(3105);

            function d({
                children: t,
                isValidProp: e,
                ...n
            }) {
                e && (0, c.K)(e), (n = { ...(0, s.useContext)(l._),
                    ...n
                }).isStatic = (0, f.h)(() => n.isStatic);
                let r = (0, s.useMemo)(() => n, [JSON.stringify(n.transition), n.transformPagePoint, n.reducedMotion]);
                return s.createElement(l._.Provider, {
                    value: r
                }, t)
            }
            var h = n(35463),
                m = n(3422);
            let p = (0, s.createContext)(null);
            var g = n(85886);
            let v = t => !t.isLayoutDirty && t.willUpdate(!1),
                y = t => !0 === t,
                w = t => y(!0 === t) || "id" === t,
                E = ({
                    children: t,
                    id: e,
                    inherit: n = !0
                }) => {
                    let r = (0, s.useContext)(m.p),
                        o = (0, s.useContext)(p),
                        [u, i] = (0, g.N)(),
                        a = (0, s.useRef)(null),
                        l = r.id || o;
                    null === a.current && (w(n) && l && (e = e ? l + "-" + e : l), a.current = {
                        id: e,
                        group: y(n) && r.group || function() {
                            let t = new Set,
                                e = new WeakMap,
                                n = () => t.forEach(v);
                            return {
                                add: r => {
                                    t.add(r), e.set(r, r.addEventListener("willUpdate", n))
                                },
                                remove: r => {
                                    t.delete(r);
                                    let o = e.get(r);
                                    o && (o(), e.delete(r)), n()
                                },
                                dirty: n
                            }
                        }()
                    });
                    let c = (0, s.useMemo)(() => ({ ...a.current,
                        forceRender: u
                    }), [i]);
                    return s.createElement(m.p.Provider, {
                        value: c
                    }, t)
                };
            var b = n(677),
                A = n(60526),
                x = n(18106),
                S = n(63048);
            let C = {
                renderer: S.b,
                ...A.s,
                ...x.E
            };
            var M = n(51169),
                L = n(81840);
            let k = { ...C,
                ...M.o,
                ...L.b
            };
            var O = n(21687),
                P = n(85770),
                V = n(69535),
                W = n(24373),
                I = n(54179);

            function T(t, e, n) {
                (0, s.useInsertionEffect)(() => t.on(e, n), [t, e, n])
            }

            function B(t) {
                let e = (0, O.c)(t.getVelocity());
                return T(t, "velocityChange", t => {
                    e.set(t)
                }), e
            }
            var _ = n(40226),
                z = n(57035),
                H = n(91816),
                R = n(85403);

            function D(t, e, n) {
                var r;
                if ("string" == typeof t) {
                    let o = document;
                    e && ((0, z.k)(!!e.current, "Scope provided, but no element detected."), o = e.current), n ? (null !== (r = n[t]) && void 0 !== r || (n[t] = o.querySelectorAll(t)), t = n[t]) : t = o.querySelectorAll(t)
                } else t instanceof Element && (t = [t]);
                return Array.from(t || [])
            }
            let Y = new WeakMap;

            function F({
                target: t,
                contentRect: e,
                borderBoxSize: n
            }) {
                var r;
                null === (r = Y.get(t)) || void 0 === r || r.forEach(r => {
                    r({
                        target: t,
                        contentSize: e,
                        get size() {
                            return function(t, e) {
                                if (e) {
                                    let {
                                        inlineSize: t,
                                        blockSize: n
                                    } = e[0];
                                    return {
                                        width: t,
                                        height: n
                                    }
                                }
                                return t instanceof SVGElement && "getBBox" in t ? t.getBBox() : {
                                    width: t.offsetWidth,
                                    height: t.offsetHeight
                                }
                            }(t, n)
                        }
                    })
                })
            }

            function G(t) {
                t.forEach(F)
            }
            let N = new Set;
            var X = n(17475),
                Z = n(75394);
            let U = () => ({
                    current: 0,
                    offset: [],
                    progress: 0,
                    scrollLength: 0,
                    targetOffset: 0,
                    targetLength: 0,
                    containerLength: 0,
                    velocity: 0
                }),
                J = () => ({
                    time: 0,
                    x: U(),
                    y: U()
                }),
                q = {
                    x: {
                        length: "Width",
                        position: "Left"
                    },
                    y: {
                        length: "Height",
                        position: "Top"
                    }
                };

            function $(t, e, n, r) {
                let o = n[e],
                    {
                        length: u,
                        position: i
                    } = q[e],
                    a = o.current,
                    s = n.time;
                o.current = t["scroll" + i], o.scrollLength = t["scroll" + u] - t["client" + u], o.offset.length = 0, o.offset[0] = 0, o.offset[1] = o.scrollLength, o.progress = (0, X.Y)(0, o.scrollLength, o.current);
                let l = r - s;
                o.velocity = l > 50 ? 0 : (0, Z.R)(o.current - a, l)
            }
            let j = {
                    Enter: [
                        [0, 1],
                        [1, 1]
                    ],
                    Exit: [
                        [0, 0],
                        [1, 0]
                    ],
                    Any: [
                        [1, 0],
                        [0, 1]
                    ],
                    All: [
                        [0, 0],
                        [1, 1]
                    ]
                },
                K = {
                    start: 0,
                    center: .5,
                    end: 1
                };

            function Q(t, e, n = 0) {
                let r = 0;
                if (void 0 !== K[t] && (t = K[t]), "string" == typeof t) {
                    let e = parseFloat(t);
                    t.endsWith("px") ? r = e : t.endsWith("%") ? t = e / 100 : t.endsWith("vw") ? r = e / 100 * document.documentElement.clientWidth : t.endsWith("vh") ? r = e / 100 * document.documentElement.clientHeight : t = e
                }
                return "number" == typeof t && (r = e * t), n + r
            }
            let tt = [0, 0];
            var te = n(83972),
                tn = n(95254);
            let tr = {
                    x: 0,
                    y: 0
                },
                to = new WeakMap,
                tu = new WeakMap,
                ti = new WeakMap,
                ta = t => t === document.documentElement ? window : t;

            function ts(t, {
                container: e = document.documentElement,
                ...n
            } = {}) {
                let u = ti.get(e);
                u || (u = new Set, ti.set(e, u));
                let i = J(),
                    a = function(t, e, n, r = {}) {
                        return {
                            measure: () => (function(t, e = t, n) {
                                if (n.x.targetOffset = 0, n.y.targetOffset = 0, e !== t) {
                                    let r = e;
                                    for (; r && r !== t;) n.x.targetOffset += r.offsetLeft, n.y.targetOffset += r.offsetTop, r = r.offsetParent
                                }
                                n.x.targetLength = e === t ? e.scrollWidth : e.clientWidth, n.y.targetLength = e === t ? e.scrollHeight : e.clientHeight, n.x.containerLength = t.clientWidth, n.y.containerLength = t.clientHeight
                            })(t, r.target, n),
                            update: e => {
                                var o;
                                $(t, "x", o = n, e), $(t, "y", o, e), o.time = e, (r.offset || r.target) && function(t, e, n) {
                                    let {
                                        offset: r = j.All
                                    } = n, {
                                        target: o = t,
                                        axis: u = "y"
                                    } = n, i = "y" === u ? "height" : "width", a = o !== t ? function(t, e) {
                                        let n = {
                                                x: 0,
                                                y: 0
                                            },
                                            r = t;
                                        for (; r && r !== e;)
                                            if (r instanceof HTMLElement) n.x += r.offsetLeft, n.y += r.offsetTop, r = r.offsetParent;
                                            else if (r instanceof SVGGraphicsElement && "getBBox" in r) {
                                            let {
                                                top: t,
                                                left: e
                                            } = r.getBBox();
                                            for (n.x += e, n.y += t; r && "svg" !== r.tagName;) r = r.parentNode
                                        }
                                        return n
                                    }(o, t) : tr, s = o === t ? {
                                        width: t.scrollWidth,
                                        height: t.scrollHeight
                                    } : {
                                        width: o.clientWidth,
                                        height: o.clientHeight
                                    }, l = {
                                        width: t.clientWidth,
                                        height: t.clientHeight
                                    };
                                    e[u].offset.length = 0;
                                    let c = !e[u].interpolate,
                                        f = r.length;
                                    for (let t = 0; t < f; t++) {
                                        let n = function(t, e, n, r) {
                                            let o = Array.isArray(t) ? t : tt,
                                                u = 0;
                                            return "number" == typeof t ? o = [t, t] : "string" == typeof t && (o = (t = t.trim()).includes(" ") ? t.split(" ") : [t, K[t] ? t : "0"]), Q(o[0], n, r) - Q(o[1], e)
                                        }(r[t], l[i], s[i], a[u]);
                                        c || n === e[u].interpolatorOffsets[t] || (c = !0), e[u].offset[t] = n
                                    }
                                    c && (e[u].interpolate = (0, te.s)(e[u].offset, (0, tn.Y)(r)), e[u].interpolatorOffsets = [...e[u].offset]), e[u].progress = e[u].interpolate(e[u].current)
                                }(t, n, r)
                            },
                            notify: () => e(n)
                        }
                    }(e, t, i, n);
                if (u.add(a), !to.has(e)) {
                    let t = () => {
                            for (let t of u) t.measure()
                        },
                        n = () => {
                            for (let t of u) t.update(R.w.timestamp)
                        },
                        i = () => {
                            for (let t of u) t.notify()
                        },
                        a = () => {
                            H.Z_.read(t, !1, !0), H.Z_.update(n, !1, !0), H.Z_.update(i, !1, !0)
                        };
                    to.set(e, a);
                    let s = ta(e);
                    window.addEventListener("resize", a, {
                        passive: !0
                    }), e !== document.documentElement && tu.set(e, "function" == typeof e ? (N.add(e), o || (o = () => {
                        let t = {
                                width: window.innerWidth,
                                height: window.innerHeight
                            },
                            e = {
                                target: window,
                                size: t,
                                contentSize: t
                            };
                        N.forEach(t => t(e))
                    }, window.addEventListener("resize", o)), () => {
                        N.delete(e), !N.size && o && (o = void 0)
                    }) : function(t, e) {
                        r || "undefined" == typeof ResizeObserver || (r = new ResizeObserver(G));
                        let n = D(t);
                        return n.forEach(t => {
                            let n = Y.get(t);
                            n || (n = new Set, Y.set(t, n)), n.add(e), null == r || r.observe(t)
                        }), () => {
                            n.forEach(t => {
                                let n = Y.get(t);
                                null == n || n.delete(e), (null == n ? void 0 : n.size) || null == r || r.unobserve(t)
                            })
                        }
                    }(e, a)), s.addEventListener("scroll", a, {
                        passive: !0
                    })
                }
                let s = to.get(e);
                return H.Z_.read(s, !1, !0), () => {
                    var t;
                    H.qY.read(s);
                    let n = ti.get(e);
                    if (!n || (n.delete(a), n.size)) return;
                    let r = to.get(e);
                    to.delete(e), r && (ta(e).removeEventListener("scroll", r), null === (t = tu.get(e)) || void 0 === t || t(), window.removeEventListener("resize", r))
                }
            }
            var tl = n(23617);

            function tc(t, e) {
                (0, z.K)(!!(!e || e.current), `You have defined a ${t} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`)
            }
            let tf = () => ({
                scrollX: (0, _.B)(0),
                scrollY: (0, _.B)(0),
                scrollXProgress: (0, _.B)(0),
                scrollYProgress: (0, _.B)(0)
            });

            function td({
                container: t,
                target: e,
                layoutEffect: n = !0,
                ...r
            } = {}) {
                let o = (0, f.h)(tf),
                    u = n ? tl.L : s.useEffect;
                return u(() => (tc("target", e), tc("container", t), ts(({
                    x: t,
                    y: e
                }) => {
                    o.scrollX.set(t.current), o.scrollXProgress.set(t.progress), o.scrollY.set(e.current), o.scrollYProgress.set(e.progress)
                }, { ...r,
                    container: (null == t ? void 0 : t.current) || void 0,
                    target: (null == e ? void 0 : e.current) || void 0
                })), []), o
            }

            function th(t) {
                return td({
                    container: t
                })
            }

            function tm() {
                return td()
            }

            function tp(t) {
                let e = (0, s.useRef)(0),
                    {
                        isStatic: n
                    } = (0, s.useContext)(l._);
                (0, s.useEffect)(() => {
                    if (n) return;
                    let r = ({
                        timestamp: n,
                        delta: r
                    }) => {
                        e.current || (e.current = n), t(n - e.current, r)
                    };
                    return H.Z_.update(r, !0), () => H.qY.update(r)
                }, [t])
            }

            function tg() {
                let t = (0, O.c)(0);
                return tp(e => t.set(e)), t
            }
            var tv = n(91331),
                ty = n(73442),
                tw = n(44866),
                tE = n(18754);
            class tb extends _.H {
                constructor() {
                    super(...arguments), this.members = [], this.transforms = new Set
                }
                add(t) {
                    let e;
                    ty.G.has(t) ? (this.transforms.add(t), e = "transform") : t.startsWith("origin") || (0, tv.f)(t) || "willChange" === t || (e = (0, tE.D)(t)), e && ((0, tw.y4)(this.members, e), this.update())
                }
                remove(t) {
                    ty.G.has(t) ? (this.transforms.delete(t), this.transforms.size || (0, tw.cl)(this.members, "transform")) : (0, tw.cl)(this.members, (0, tE.D)(t)), this.update()
                }
                update() {
                    this.set(this.members.length ? this.members.join(", ") : "auto")
                }
            }

            function tA() {
                return (0, f.h)(() => new tb("auto"))
            }
            var tx = n(62519),
                tS = n(23993);

            function tC() {
                tS.O.current || (0, tx.A)();
                let [t] = (0, s.useState)(tS.n.current);
                return t
            }

            function tM() {
                let t = tC(),
                    {
                        reducedMotion: e
                    } = (0, s.useContext)(l._);
                return "never" !== e && ("always" === e || t)
            }
            var tL = n(63617),
                tk = n(96073),
                tO = n(16578);
            class tP {
                constructor(t) {
                    this.animations = t.filter(Boolean)
                }
                then(t, e) {
                    return Promise.all(this.animations).then(t).catch(e)
                }
                getAll(t) {
                    return this.animations[0][t]
                }
                setAll(t, e) {
                    for (let n = 0; n < this.animations.length; n++) this.animations[n][t] = e
                }
                get time() {
                    return this.getAll("time")
                }
                set time(t) {
                    this.setAll("time", t)
                }
                get speed() {
                    return this.getAll("speed")
                }
                set speed(t) {
                    this.setAll("speed", t)
                }
                get duration() {
                    let t = 0;
                    for (let e = 0; e < this.animations.length; e++) t = Math.max(t, this.animations[e].duration);
                    return t
                }
                runAll(t) {
                    this.animations.forEach(e => e[t]())
                }
                play() {
                    this.runAll("play")
                }
                pause() {
                    this.runAll("pause")
                }
                stop() {
                    this.runAll("stop")
                }
                cancel() {
                    this.runAll("cancel")
                }
                complete() {
                    this.runAll("complete")
                }
            }
            var tV = n(91222),
                tW = n(28650),
                tI = n(23384),
                tT = n(74422),
                tB = n(74197),
                t_ = n(27047),
                tz = n(60779),
                tH = n(41429),
                tR = n(74125),
                tD = n(15815);

            function tY(t, e, n, r) {
                var o;
                return "number" == typeof e ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : "<" === e ? n : null !== (o = r.get(e)) && void 0 !== o ? o : t
            }
            let tF = (t, e, n) => {
                let r = e - t;
                return ((n - t) % r + r) % r + t
            };
            var tG = n(29554),
                tN = n(65339);

            function tX(t, e) {
                return t.at !== e.at ? t.at - e.at : null === t.value ? 1 : null === e.value ? -1 : 0
            }

            function tZ(t, e) {
                return e.has(t) || e.set(t, {}), e.get(t)
            }

            function tU(t, e) {
                return e[t] || (e[t] = []), e[t]
            }
            let tJ = t => "number" == typeof t,
                tq = t => t.every(tJ);

            function t$(t, e, n, r) {
                let o = D(t, r),
                    u = o.length;
                (0, z.k)(!!u, "No valid element provided.");
                let i = [];
                for (let t = 0; t < u; t++) {
                    let r = o[t];
                    tO.R.has(r) || function(t) {
                        let e = {
                                presenceContext: null,
                                props: {},
                                visualState: {
                                    renderState: {
                                        transform: {},
                                        transformOrigin: {},
                                        style: {},
                                        vars: {},
                                        attrs: {}
                                    },
                                    latestValues: {}
                                }
                            },
                            n = (0, tW.v)(t) ? new tI.e(e, {
                                enableHardwareAcceleration: !1
                            }) : new tT.W(e, {
                                enableHardwareAcceleration: !0
                            });
                        n.mount(t), tO.R.set(t, n)
                    }(r);
                    let a = tO.R.get(r),
                        s = { ...n
                        };
                    "function" == typeof s.delay && (s.delay = s.delay(t, u)), i.push(...(0, tV.w)(a, { ...e,
                        transition: s
                    }, {}))
                }
                return new tP(i)
            }
            let tj = t => Array.isArray(t) && Array.isArray(t[0]),
                tK = t => function(e, n, r) {
                    let o;
                    return o = tj(e) ? function(t, e, n) {
                        let r = [],
                            o = function(t, {
                                defaultTransition: e = {},
                                ...n
                            } = {}, r) {
                                let o = e.duration || .3,
                                    u = new Map,
                                    i = new Map,
                                    a = {},
                                    s = new Map,
                                    l = 0,
                                    c = 0,
                                    f = 0;
                                for (let n = 0; n < t.length; n++) {
                                    let u = t[n];
                                    if ("string" == typeof u) {
                                        s.set(u, c);
                                        continue
                                    }
                                    if (!Array.isArray(u)) {
                                        s.set(u.name, tY(c, u.at, l, s));
                                        continue
                                    }
                                    let [h, m, p = {}] = u;
                                    void 0 !== p.at && (c = tY(c, p.at, l, s));
                                    let g = 0,
                                        v = (t, n, r, u = 0, i = 0) => {
                                            let a = Array.isArray(t) ? t : [t],
                                                {
                                                    delay: s = 0,
                                                    times: l = (0, tn.Y)(a),
                                                    type: d = "keyframes",
                                                    ...h
                                                } = n,
                                                {
                                                    ease: m = e.ease || "easeOut",
                                                    duration: p
                                                } = n,
                                                v = "function" == typeof s ? s(u, i) : s,
                                                y = a.length;
                                            if (y <= 2 && "spring" === d) {
                                                let t = 100;
                                                if (2 === y && tq(a)) {
                                                    let e = a[1] - a[0];
                                                    t = Math.abs(e)
                                                }
                                                let e = { ...h
                                                };
                                                void 0 !== p && (e.duration = (0, tH.w)(p));
                                                let n = function(t, e = 100) {
                                                    let n = (0, t_.S)({
                                                            keyframes: [0, e],
                                                            ...t
                                                        }),
                                                        r = Math.min((0, tz.i)(n), tz.E);
                                                    return {
                                                        type: "keyframes",
                                                        ease: t => n.next(r * t).value / e,
                                                        duration: (0, tH.X)(r)
                                                    }
                                                }(e, t);
                                                m = n.ease, p = n.duration
                                            }
                                            null != p || (p = o);
                                            let w = c + v,
                                                E = w + p;
                                            1 === l.length && 0 === l[0] && (l[1] = 1);
                                            let b = l.length - a.length;
                                            b > 0 && (0, tR.c)(l, b), 1 === a.length && a.unshift(null),
                                                function(t, e, n, r, o, u) {
                                                    ! function(t, e, n) {
                                                        for (let r = 0; r < t.length; r++) {
                                                            let o = t[r];
                                                            o.at > e && o.at < n && ((0, tw.cl)(t, o), r--)
                                                        }
                                                    }(t, o, u);
                                                    for (let a = 0; a < e.length; a++) {
                                                        var i;
                                                        t.push({
                                                            value: e[a],
                                                            at: (0, tN.C)(o, u, r[a]),
                                                            easing: (i = a, (0, tG.N)(n) ? n[tF(0, n.length, i)] : n)
                                                        })
                                                    }
                                                }(r, a, m, l, w, E), g = Math.max(v + p, g), f = Math.max(E, f)
                                        };
                                    if ((0, tD.i)(h)) {
                                        let t = tZ(h, i);
                                        v(m, p, tU("default", t))
                                    } else {
                                        let t = D(h, r, a),
                                            e = t.length;
                                        for (let n = 0; n < e; n++) {
                                            let r = t[n],
                                                o = tZ(r, i);
                                            for (let t in m) {
                                                var d;
                                                v(m[t], p[d = t] ? { ...p,
                                                    ...p[d]
                                                } : { ...p
                                                }, tU(t, o), n, e)
                                            }
                                        }
                                        l = c, c += g
                                    }
                                }
                                return i.forEach((t, r) => {
                                    for (let o in t) {
                                        let i = t[o];
                                        i.sort(tX);
                                        let a = [],
                                            s = [],
                                            l = [];
                                        for (let t = 0; t < i.length; t++) {
                                            let {
                                                at: e,
                                                value: n,
                                                easing: r
                                            } = i[t];
                                            a.push(n), s.push((0, X.Y)(0, f, e)), l.push(r || "easeOut")
                                        }
                                        0 !== s[0] && (s.unshift(0), a.unshift(a[0]), l.unshift("easeInOut")), 1 !== s[s.length - 1] && (s.push(1), a.push(null)), u.has(r) || u.set(r, {
                                            keyframes: {},
                                            transition: {}
                                        });
                                        let c = u.get(r);
                                        c.keyframes[o] = a, c.transition[o] = { ...e,
                                            duration: f,
                                            ease: l,
                                            times: s,
                                            ...n
                                        }
                                    }
                                }), u
                            }(t, e, n);
                        return o.forEach(({
                            keyframes: t,
                            transition: e
                        }, n) => {
                            let o;
                            o = (0, tD.i)(n) ? (0, tB.D)(n, t.default, e.default) : t$(n, t, e), r.push(o)
                        }), new tP(r)
                    }(e, n, t) : "object" != typeof n || Array.isArray(n) ? (0, tB.D)(e, n, r) : t$(e, n, r, t), t && t.animations.push(o), o
                },
                tQ = tK();

            function t0() {
                let t = (0, f.h)(() => ({
                        current: null,
                        animations: []
                    })),
                    e = (0, f.h)(() => tK(t));
                return (0, tk.z)(() => {
                    t.animations.forEach(t => t.stop())
                }), [t, e]
            }
            var t1 = n(68609),
                t7 = n(1686);

            function t6(...t) {
                let e = (0, s.useRef)(0),
                    [n, r] = (0, s.useState)(t[e.current]),
                    o = (0, s.useCallback)(n => {
                        e.current = "number" != typeof n ? tF(0, t.length, e.current + 1) : n, r(t[e.current])
                    }, [t.length, ...t]);
                return [n, o]
            }
            var t5 = n(24232),
                t3 = n(58175);
            let t4 = {
                any: 0,
                all: 1
            };

            function t2(t, e, {
                root: n,
                margin: r,
                amount: o = "any"
            } = {}) {
                let u = D(t),
                    i = new WeakMap,
                    a = t => {
                        t.forEach(t => {
                            let n = i.get(t.target);
                            if (!!n !== t.isIntersecting) {
                                if (t.isIntersecting) {
                                    let n = e(t);
                                    "function" == typeof n ? i.set(t.target, n) : s.unobserve(t.target)
                                } else n && (n(t), i.delete(t.target))
                            }
                        })
                    },
                    s = new IntersectionObserver(a, {
                        root: n,
                        rootMargin: r,
                        threshold: "number" == typeof o ? o : t4[o]
                    });
                return u.forEach(t => s.observe(t)), () => s.disconnect()
            }

            function t8(t, {
                root: e,
                margin: n,
                amount: r,
                once: o = !1
            } = {}) {
                let [u, i] = (0, s.useState)(!1);
                return (0, s.useEffect)(() => {
                    if (!t.current || o && u) return;
                    let a = () => (i(!0), o ? void 0 : () => i(!1)),
                        s = {
                            root: e && e.current || void 0,
                            margin: n,
                            amount: "some" === r ? "any" : r
                        };
                    return t2(t.current, a, s)
                }, [e, t, n, o]), u
            }
            var t9 = n(30453),
                et = n(78624);

            function ee(t, e, n, r) {
                (0, s.useEffect)(() => {
                    let o = t.current;
                    if (n && o) return (0, et.E)(o, e, n, r)
                }, [t, e, n, r])
            }
            var en = n(28383),
                er = n(53599);

            function eo(t) {
                return null !== t && "object" == typeof t && er.a in t
            }

            function eu(t) {
                if (eo(t)) return t[er.a]
            }
            var ei = n(56779),
                ea = n(14599),
                es = n(27614);

            function el() {
                return ec
            }

            function ec(t) {
                es.J.current && (es.J.current.isUpdating = !1, es.J.current.blockUpdate(), t && t())
            }
            var ef = n(14277);

            function ed() {
                let [t, e] = (0, g.N)();
                return (0, s.useEffect)(() => {
                    H.Z_.postRender(() => H.Z_.postRender(() => ef.c.current = !1))
                }, [e]), e => {
                    ec(() => {
                        ef.c.current = !0, t(), e()
                    })
                }
            }

            function eh() {
                let t = s.useCallback(() => {
                    let t = es.J.current;
                    t && t.resetTree()
                }, []);
                return t
            }
            var em = n(9825),
                ep = n(72800),
                eg = n(53096),
                ev = n(76865),
                ey = n(88772);
            let ew = (t, e) => `${t}: ${e}`;
            var eE = n(26351),
                eb = n(67098);
            let eA = new Map;

            function ex(t, e, n, r) {
                let o = ew(t, ty.G.has(e) ? "transform" : e),
                    u = eA.get(o);
                if (!u) return 0;
                let {
                    animation: i,
                    startTime: a
                } = u, s = () => {
                    eA.delete(o);
                    try {
                        i.cancel()
                    } catch (t) {}
                };
                if (null === a) return s(), 0; {
                    let t = performance.now();
                    return r.update(() => {
                        n.animation && (n.animation.time = performance.now() - (0, tH.X)(t))
                    }), r.render(s), t - a || 0
                }
            }
            var eS = n(50065);

            function eC(t, e, n, r, o) {
                let u = t.dataset[eb.t];
                if (!u) return;
                window.HandoffAppearAnimations = ex;
                let i = ew(u, e),
                    a = (0, eE.p)(t, e, [n[0], n[0]], {
                        duration: 1e4,
                        ease: "linear"
                    });
                eA.set(i, {
                    animation: a,
                    startTime: null
                });
                let s = () => {
                    a.cancel();
                    let u = (0, eE.p)(t, e, n, r);
                    document.timeline && (u.startTime = document.timeline.currentTime), eA.set(i, {
                        animation: u,
                        startTime: performance.now()
                    }), o && o(u)
                };
                a.ready ? a.ready.then(s).catch(eS.Z) : s()
            }
            var eM = n(46154),
                eL = n(97967),
                ek = n(64460),
                eO = n(32958),
                eP = n(18617),
                eV = n(7819),
                eW = n(33933);
            let eI = () => ({});
            class eT extends ei.l {
                build() {}
                measureInstanceViewportBox() {
                    return (0, eW.dO)()
                }
                resetTransform() {}
                restoreTransform() {}
                removeValueFromRenderState() {}
                renderInstance() {}
                scrapeMotionValuesFromProps() {
                    return eI()
                }
                getBaseTargetFromProps() {}
                readValueFromInstance(t, e, n) {
                    return n.initialState[e] || 0
                }
                sortInstanceNodePosition() {
                    return 0
                }
                makeTargetAnimatableFromInstance({
                    transition: t,
                    transitionEnd: e,
                    ...n
                }) {
                    let r = (0, eP.P$)(n, t || {}, this);
                    return (0, eP.GJ)(this, n, r), {
                        transition: t,
                        transitionEnd: e,
                        ...n
                    }
                }
            }
            let eB = (0, eV.t)({
                scrapeMotionValuesFromProps: eI,
                createRenderState: eI
            });

            function e_(t) {
                let [e, n] = (0, s.useState)(t), r = eB({}, !1), o = (0, f.h)(() => new eT({
                    props: {},
                    visualState: r,
                    presenceContext: null
                }, {
                    initialState: t
                }));
                (0, s.useEffect)(() => (o.mount({}), () => o.unmount()), [o]), (0, s.useEffect)(() => {
                    o.update({
                        onUpdate: t => {
                            n({ ...t
                            })
                        }
                    }, null)
                }, [n, o]);
                let u = (0, f.h)(() => t => (0, t7.d)(o, t));
                return [e, u]
            }
            let ez = t => t > .001 ? 1 / t : 1e5,
                eH = !1;

            function eR(t) {
                let e = (0, O.c)(1),
                    n = (0, O.c)(1),
                    {
                        visualElement: r
                    } = (0, s.useContext)(eM.v);
                (0, z.k)(!!(t || r), "If no scale values are provided, useInvertedScale must be used within a child of another motion component."), (0, z.K)(eH, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead."), eH = !0, t ? (e = t.scaleX || e, n = t.scaleY || n) : r && (e = r.getValue("scaleX", 1), n = r.getValue("scaleY", 1));
                let o = (0, W.H)(e, ez),
                    u = (0, W.H)(n, ez);
                return {
                    scaleX: o,
                    scaleY: u
                }
            }
            let eD = 0,
                eY = ({
                    children: t
                }) => (s.useEffect(() => {
                    (0, z.k)(!1, "AnimateSharedLayout is deprecated: https://www.framer.com/docs/guide-upgrade/##shared-layout-animations")
                }, []), s.createElement(E, {
                    id: (0, f.h)(() => `asl-${eD++}`)
                }, t));
            var eF = n(45240);

            function eG(t = .1, {
                startDelay: e = 0,
                from: n = 0,
                ease: r
            } = {}) {
                return (o, u) => {
                    let i = "number" == typeof n ? n : function(t, e) {
                            if ("first" === t) return 0; {
                                let n = e - 1;
                                return "last" === t ? n : n / 2
                            }
                        }(n, u),
                        a = t * Math.abs(i - o);
                    if (r) {
                        let e = u * t,
                            n = (0, eF.R)(r);
                        a = n(a / e) * e
                    }
                    return e + a
                }
            }
            var eN = n(10810),
                eX = n(51366),
                eZ = n(96953),
                eU = n(60731),
                eJ = n(17899),
                eq = n(41469),
                e$ = n(97800),
                ej = n(74732),
                eK = n(17070),
                eQ = n(26574),
                e0 = n(59803),
                e1 = n(31216),
                e7 = n(24144),
                e6 = n(54438),
                e5 = n(67817),
                e3 = n(98457),
                e4 = n(33791)
        },
        85770: function(t, e, n) {
            n.d(e, {
                Y: function() {
                    return u
                }
            });
            var r = n(77014),
                o = n(15815);

            function u(t, ...e) {
                let n = t.length;
                return (0, r.N)(e.filter(o.i), function() {
                    let r = "";
                    for (let u = 0; u < n; u++) {
                        r += t[u];
                        let n = e[u];
                        n && (r += (0, o.i)(n) ? n.get() : n)
                    }
                    return r
                })
            }
        },
        54179: function(t, e, n) {
            n.d(e, {
                q: function() {
                    return f
                }
            });
            var r = n(2784),
                o = n(15815),
                u = n(21687),
                i = n(60976),
                a = n(23617),
                s = n(72800),
                l = n(85403),
                c = n(41429);

            function f(t, e = {}) {
                let {
                    isStatic: n
                } = (0, r.useContext)(i._), f = (0, r.useRef)(null), d = (0, u.c)((0, o.i)(t) ? t.get() : t), h = () => {
                    f.current && f.current.stop()
                };
                return (0, r.useInsertionEffect)(() => d.attach((t, r) => {
                    if (n) return r(t);
                    if (h(), f.current = (0, s.y)({
                            keyframes: [d.get(), t],
                            velocity: d.getVelocity(),
                            type: "spring",
                            restDelta: .001,
                            restSpeed: .01,
                            ...e,
                            onUpdate: r
                        }), !l.w.isProcessing) {
                        let t = performance.now() - l.w.timestamp;
                        t < 30 && (f.current.time = (0, c.X)(t))
                    }
                    return d.get()
                }, h), [JSON.stringify(e)]), (0, a.L)(() => {
                    if ((0, o.i)(t)) return t.on("change", t => d.set(parseFloat(t)))
                }, [d]), d
            }
        }
    }
]);
//# sourceMappingURL=framer-motion-features.d0725df7173fd8c0.js.map