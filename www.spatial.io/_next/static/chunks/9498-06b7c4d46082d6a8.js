(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9498], {
        61350: function(e, t, n) {
            "use strict";
            n.d(t, {
                r: function() {
                    return u
                }
            });
            var r, i, a, l, o, A, s = n(2784),
                c = ["title", "titleId"];

            function m() {
                return (m = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }).apply(this, arguments)
            }
            var u = (0, s.forwardRef)(function(e, t) {
                var n = e.title,
                    u = e.titleId,
                    d = function(e, t) {
                        if (null == e) return {};
                        var n, r, i = function(e, t) {
                            if (null == e) return {};
                            var n, r, i = {},
                                a = Object.keys(e);
                            for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (r = 0; r < a.length; r++) n = a[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n])
                        }
                        return i
                    }(e, c);
                return s.createElement("svg", m({
                    width: 33,
                    height: 53,
                    viewBox: "0 0 33 53",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    ref: t,
                    "aria-labelledby": u
                }, d), n ? s.createElement("title", {
                    id: u
                }, n) : null, r || (r = s.createElement("path", {
                    d: "M16.3576 0.666687L16.0095 1.85009V36.1896L16.3576 36.5371L32.2976 27.115L16.3576 0.666687Z",
                    fill: "#343434"
                })), i || (i = s.createElement("path", {
                    d: "M16.3578 0.666687L0.417816 27.115L16.3578 36.5372V19.8699V0.666687Z",
                    fill: "#8C8C8C"
                })), a || (a = s.createElement("path", {
                    d: "M16.3575 39.5552L16.1613 39.7944V52.0268L16.3575 52.6L32.307 30.1378L16.3575 39.5552Z",
                    fill: "#3C3C3B"
                })), l || (l = s.createElement("path", {
                    d: "M16.3578 52.5998V39.5551L0.417816 30.1377L16.3578 52.5998Z",
                    fill: "#8C8C8C"
                })), o || (o = s.createElement("path", {
                    d: "M16.3575 36.537L32.2973 27.1151L16.3575 19.8699V36.537Z",
                    fill: "#141414"
                })), A || (A = s.createElement("path", {
                    d: "M0.417816 27.1151L16.3576 36.537V19.8699L0.417816 27.1151Z",
                    fill: "#393939"
                })))
            })
        },
        42793: function(e, t, n) {
            "use strict";
            n.d(t, {
                B: function() {
                    return A
                },
                YM: function() {
                    return c
                },
                l7: function() {
                    return s
                }
            });
            var r = n(95235),
                i = n(58943);

            function a(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function l(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(n), !0).forEach(function(t) {
                        (0, r.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let o = {
                    retry: 1,
                    cacheTime: 1 / 0,
                    staleTime: 3e5
                },
                A = (e, t) => (0, i.a)(l(l({
                    queryKey: ["getSpaceTemplates"],
                    queryFn: () => e.content.getSpaceTemplates()
                }, o), t)),
                s = (e, t) => (0, i.a)(l(l({
                    queryKey: ["getAvatars"],
                    queryFn: () => e.content.getAvatars()
                }, o), t)),
                c = (e, t) => (0, i.a)(l(l({
                    queryKey: ["getAvatarAnimations"],
                    queryFn: () => e.content.getAvatarAnimations()
                }, o), t))
        },
        89922: function(e, t, n) {
            "use strict";
            n.d(t, {
                B2: function() {
                    return d
                },
                Ko: function() {
                    return c
                },
                S3: function() {
                    return v
                },
                UX: function() {
                    return p
                },
                YC: function() {
                    return u
                }
            });
            var r = n(95235),
                i = n(58943),
                a = n(58586),
                l = n(55830),
                o = n(99771);

            function A(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function s(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? A(Object(n), !0).forEach(function(t) {
                        (0, r.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : A(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let c = (e, t, n) => (0, i.a)(["GET_FILE", t], () => e.content.getFile(t), s({
                    enabled: !!t
                }, n)),
                m = "GET_CONTENT_MENU",
                u = (e, t, n) => (0, a.N)([m, t], n => {
                    let {
                        pageParam: r
                    } = n;
                    return e.content.getContentMenu(s({
                        offset: r
                    }, t))
                }, s({
                    getNextPageParam: e => (null == e ? void 0 : e.nextCursor) < 0 ? void 0 : null == e ? void 0 : e.nextCursor,
                    cacheTime: 15e3,
                    staleTime: 15e3
                }, n)),
                d = () => {
                    let e = (0, l.NL)(),
                        t = [m, {
                            cmsType: "recent"
                        }];
                    return () => e.invalidateQueries(t)
                };

            function p(e, t, n, r) {
                let i = (0, l.NL)();
                return (0, o.D)(s({
                    mutationFn: t => e.content.toggleContentItemVisibility({
                        idList: [{
                            id: t.id,
                            hidden: !0
                        }]
                    }),
                    onSettled: () => {
                        i.invalidateQueries([m, {
                            cmsType: t,
                            chain: n
                        }])
                    }
                }, r))
            }
            let g = ["GET_ROOM_TEMPLATES"],
                v = (e, t) => (0, i.a)(g, e.content.getTemplates, t)
        },
        40798: function(e, t, n) {
            "use strict";
            n.d(t, {
                B: function() {
                    return u
                }
            });
            var r = n(95235),
                i = n(6277),
                a = n(99300),
                l = n.n(a),
                o = n(69529),
                A = n(78025),
                s = n(52322);

            function c(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function m(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? c(Object(n), !0).forEach(function(t) {
                        (0, r.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }

            function u(e) {
                let {
                    autoFocusConfirm: t,
                    title: n,
                    subtitle: r,
                    message: a,
                    denyText: c,
                    confirmText: u,
                    onConfirm: d,
                    onDeny: p,
                    linkHref: g,
                    confirmButtonColor: v,
                    denyButtonColor: b
                } = e, h = {
                    autoFocus: t,
                    className: "min-w-[180px]",
                    color: null != v ? v : "black",
                    onClick: d
                };
                return (0, s.jsxs)("div", {
                    className: (0, i.Z)(l().body, "min-w-[380px] max-w-[600px]"),
                    children: [(0, s.jsx)(o.X, {
                        size: "h2",
                        textAlign: "center",
                        className: "pb-4",
                        children: n
                    }), r, a, (0, s.jsxs)("div", {
                        className: "flex flex-row justify-evenly gap-5 pt-4",
                        children: [c && p && (0, s.jsx)(A.z, {
                            className: "min-w-[180px]",
                            color: null != b ? b : "outline",
                            size: "xl",
                            onClick: p,
                            children: c
                        }), g ? (0, s.jsx)(A.z, m(m({}, h), {}, {
                            size: "xl",
                            as: "a",
                            href: g,
                            target: "_blank",
                            rel: "noreferrer",
                            children: u
                        })) : (0, s.jsx)(A.z, m(m({}, h), {}, {
                            size: "xl",
                            children: u
                        }))]
                    })]
                })
            }
        },
        61945: function(e, t, n) {
            "use strict";
            n.d(t, {
                s: function() {
                    return d
                }
            });
            var r = n(95235),
                i = n(82269),
                a = n(2784),
                l = n(40798),
                o = n(53083),
                A = n(3349),
                s = n(52322);
            let c = ["onDismiss", "withInstanceCount"];

            function m(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function u(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? m(Object(n), !0).forEach(function(t) {
                        (0, r.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let d = (0, a.memo)(function(e) {
                let {
                    onDismiss: t,
                    withInstanceCount: n
                } = e, r = (0, i.Z)(e, c);
                return (0, s.jsx)(A.u, u(u({
                    darkOverlay: !0,
                    onRequestClose: t
                }, r), {}, {
                    children: n ? (0, s.jsx)(o.Jz, {
                        children: (0, s.jsx)(l.B, u({}, r))
                    }) : (0, s.jsx)(l.B, u({}, r))
                }))
            })
        },
        69506: function(e, t, n) {
            "use strict";
            n.d(t, {
                SX: function() {
                    return a
                },
                TJ: function() {
                    return i
                }
            });
            var r = n(39337);
            let i = [{
                    environment: r.cv.Abstract,
                    images: ["/_next/static/media/thumbnail-abstract.8c88bf40.png"],
                    name: "Upload Custom Space"
                }, {
                    environment: r.cv.Agora,
                    images: ["/_next/static/media/thumbnail-agora.bd9b2c01.jpg"],
                    name: "Agora"
                }, {
                    environment: r.cv.IsleGallery,
                    images: ["/_next/static/media/isle-gallery-0-white.3807ce75.png", "/_next/static/media/isle-gallery-1-brick.18e0424d.jpg", "/_next/static/media/isle-gallery-2-black.a7b71dc4.jpg"],
                    iconPickCoord: {
                        x: .07,
                        y: .6
                    },
                    name: "Isle Gallery"
                }, {
                    environment: r.cv.AeriesGallery,
                    images: ["/_next/static/media/aeries-0-white.ac22442d.jpg", "/_next/static/media/aeries-1-blue.570eb2bb.jpg", "/_next/static/media/aeries-2-red.542afc9a.jpg", "/_next/static/media/aeries-3-purple.f8219fdc.jpg", "/_next/static/media/aeries-4-yellow.8e299d88.jpg", "/_next/static/media/aeries-5-black.e4d33d4b.jpg", "/_next/static/media/aeries-6-pink.f8ccda11.jpg"],
                    variantOrders: [0, 5, 1, 2, 6, 4],
                    iconPickCoord: {
                        x: .1,
                        y: .5
                    },
                    name: "Aeries Gallery"
                }, {
                    environment: r.cv.ObsidianGallery,
                    images: ["/_next/static/media/thumbnail-gallery-obsidian.b7290d64.jpg"],
                    name: "Obsidian Gallery"
                }, {
                    environment: r.cv.Auditorium,
                    images: ["/_next/static/media/thumbnail-auditorium.87374b4c.png"],
                    name: "Auditorium"
                }, {
                    environment: r.cv.Outdoor,
                    images: ["/_next/static/media/thumbnail-outdoor.c5dd5895.jpg"],
                    name: "Outdoors"
                }, {
                    environment: r.cv.BoardroomLounge,
                    images: ["/_next/static/media/thumbnail-boardroom-lounge.2405afa9.png"],
                    name: "Boardroom Lounge"
                }, {
                    environment: r.cv.BoardroomWithATable,
                    images: ["/_next/static/media/thumbnail-boardroom-with-a-table.a3c507a8.jpg"],
                    name: "Boardroom with Table"
                }, {
                    environment: r.cv.MountainLounge,
                    images: ["/_next/static/media/thumbnail-mountain-lounge.60525c40.jpg"],
                    name: "Mountain Lounge"
                }],
                a = {
                    environment: r.cv.Custom,
                    images: ["/_next/static/media/thumbnail-custom.169e1640.png"],
                    name: "Custom"
                }
        },
        90675: function(e, t, n) {
            "use strict";
            n.d(t, {
                f: function() {
                    return A
                }
            });
            var r = n(6277),
                i = n(2784),
                a = n(48904),
                l = n.n(a),
                o = n(52322);
            let A = e => {
                    let {
                        disabled: t,
                        pickCoord: n,
                        selectedVariant: r,
                        setSelectedVariant: i,
                        urls: a,
                        orders: A,
                        setPreviewVariant: c
                    } = e;
                    return (0, o.jsx)("div", {
                        className: l().container,
                        children: A ? A.map(e => (0, o.jsx)(s, {
                            index: e,
                            pickCoord: n,
                            isSelected: e === r,
                            url: a[e],
                            handleSetToggle: i,
                            setPreviewVariant: c,
                            disabled: t
                        }, e)) : a.map((e, a) => (0, o.jsx)(s, {
                            index: a,
                            pickCoord: n,
                            isSelected: a === r,
                            url: e,
                            handleSetToggle: i,
                            setPreviewVariant: c,
                            disabled: t
                        }, a))
                    })
                },
                s = (0, i.memo)(e => {
                    let {
                        index: t,
                        pickCoord: n,
                        url: i,
                        isSelected: a,
                        disabled: A,
                        handleSetToggle: s,
                        setPreviewVariant: c
                    } = e;
                    return (0, o.jsx)("button", {
                        className: (0, r.Z)(l().buttonContainer, a && l().selected, !A && l().hoverEnabled),
                        style: {
                            backgroundImage: `url(${i})`,
                            backgroundPosition: n && `${100*n.x}% ${100*n.y}%`
                        },
                        onClick: () => s(t),
                        onMouseOver: () => c(t),
                        onMouseLeave: () => c(-1),
                        disabled: A
                    })
                })
        },
        66189: function(e, t, n) {
            "use strict";

            function r(e, t) {
                let n = e;
                if (t.id) {
                    let e = Number(t.id);
                    isNaN(e) || (n = e)
                }
                return n
            }
            n.d(t, {
                C: function() {
                    return r
                }
            })
        },
        53083: function(e, t, n) {
            "use strict";
            n.d(t, {
                Jz: function() {
                    return A
                },
                _E: function() {
                    return s
                }
            });
            var r = n(2784),
                i = n(31438),
                a = n(52322);
            let l = (0, i.G)("InstanceCountManager"),
                o = (0, r.createContext)({
                    register: l
                });

            function A(e) {
                return ! function() {
                    let {
                        register: e
                    } = (0, r.useContext)(o);
                    (0, r.useEffect)(() => e(), [e])
                }(), e.children || null
            }

            function s(e) {
                let t = (0, r.useRef)(0),
                    n = (0, r.useRef)(e.onChange);
                (0, r.useEffect)(() => {
                    n.current = e.onChange
                }, [e.onChange]);
                let i = (0, r.useCallback)(() => (t.current += 1, n.current(t.current), () => {
                    t.current -= 1, n.current(t.current)
                }), [t, n]);
                return (0, a.jsx)(o.Provider, {
                    value: {
                        register: i
                    },
                    children: e.children
                })
            }
        },
        69861: function(e, t, n) {
            "use strict";
            let r, i;
            n.d(t, {
                Z: function() {
                    return i
                },
                C: function() {
                    return H
                }
            });
            var a, l, o, A = n(6277),
                s = n(1366),
                c = n(10381),
                m = n(89922),
                u = n(96441),
                d = n(98637),
                p = n(54537),
                g = n(2784),
                v = n(14420),
                b = n(42793),
                h = n(39337),
                f = n(45080),
                j = n(69506),
                y = n(45773);
            (a = r || (r = {}))[a.Ready = 0] = "Ready", a[a.FreshPackage = 1] = "FreshPackage", a[a.NewVersion = 2] = "NewVersion";
            let C = e => (null == e ? void 0 : e.progress) === v.fh.Submitted || (null == e ? void 0 : e.progress) === v.fh.InProgress ? (null == e ? void 0 : e.latestSuccessfulVersion) > 0 ? r.NewVersion : r.FreshPackage : r.Ready;
            var _ = n(49611),
                x = {
                    src: "/_next/static/media/ethereum-white-on-blue.74f04df1.png",
                    height: 96,
                    width: 96,
                    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAu0lEQVR42iWPPQrCQBCF5wCW2giiSUTY4M/1FDuL7KI3sLARvIMgyF5AL2BpIYLpk2KebzYL3/LmZ+fNShYgxOVB4zRoa5jOPJzYYeAY1EVQDCqgT4oAZF5rqwmLcblXyAbN8ao436nXaCxnNSk4chaY3AHvr+LzU/QqYOIBs0sNFgy94vFSPMnqoBhWXUOymJvFFs3pprjETi+ShUbhVXKZeuyBPPAVGSXNJe0nHG84WkXS5sQ0c6WIyB8nEZ+HHRqCqwAAAABJRU5ErkJggg==",
                    blurWidth: 8,
                    blurHeight: 8
                },
                E = ["title", "titleId"];

            function O() {
                return (O = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }).apply(this, arguments)
            }
            var w = (0, g.forwardRef)(function(e, t) {
                    var n = e.title,
                        r = e.titleId,
                        i = function(e, t) {
                            if (null == e) return {};
                            var n, r, i = function(e, t) {
                                if (null == e) return {};
                                var n, r, i = {},
                                    a = Object.keys(e);
                                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                                return i
                            }(e, t);
                            if (Object.getOwnPropertySymbols) {
                                var a = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < a.length; r++) n = a[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n])
                            }
                            return i
                        }(e, E);
                    return g.createElement("svg", O({
                        width: 33,
                        height: 33,
                        viewBox: "0 0 33 33",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        ref: t,
                        "aria-labelledby": r
                    }, i), n ? g.createElement("title", {
                        id: r
                    }, n) : null, o || (o = g.createElement("path", {
                        d: "M28.875 22.6875V28.875H4.125V22.6875H0V28.875C0 31.1438 1.85625 33 4.125 33H28.875C31.1438 33 33 31.1438 33 28.875V22.6875H28.875ZM6.1875 10.3125L9.09562 13.2206L14.4375 7.89937V24.75H18.5625V7.89937L23.9044 13.2206L26.8125 10.3125L16.5 0L6.1875 10.3125Z",
                        fill: "white"
                    })))
                }),
                k = n(90675),
                P = n(43186),
                N = n(13270),
                B = n.n(N),
                I = n(52322);
            let Q = e => {
                    let {
                        processingStatus: t
                    } = e;
                    return t === r.NewVersion ? (0, I.jsx)("div", {
                        className: B().overlayBanner,
                        children: (0, I.jsxs)("div", {
                            className: B().loaderOverlayMinimal,
                            children: [(0, I.jsx)("div", {
                                className: B().smallLoadingIndicator,
                                children: (0, I.jsx)(P.l, {
                                    useRelativePosition: !0,
                                    color: "white"
                                })
                            }), (0, I.jsx)("div", {
                                className: (0, A.Z)(B().loaderText, B().small),
                                children: "Processing new version..."
                            })]
                        })
                    }) : (0, I.jsxs)("div", {
                        className: B().loaderOverlay,
                        children: [(0, I.jsx)("div", {
                            children: (0, I.jsx)(P.l, {
                                className: B().loadingIndicator,
                                useRelativePosition: !0,
                                color: "white"
                            })
                        }), (0, I.jsx)("div", {
                            className: B().loaderText,
                            children: "Processing..."
                        })]
                    })
                },
                T = e => {
                    var t;
                    let {
                        option: n,
                        currentEnvironment: i,
                        currentCustomNftEnvironmentId: a,
                        shouldShowMetamaskTutorial: l,
                        hideByLine: o,
                        onSelect: s
                    } = e, {
                        0: c,
                        1: m
                    } = (0, g.useState)(0), {
                        0: u,
                        1: d
                    } = (0, g.useState)(-1), p = (0, g.useCallback)(() => {
                        s(n, c)
                    }, [s, n, c]), b = (0, g.useMemo)(() => {
                        let e = i === n.environment;
                        return n.metadata && (e = e && a === (0, y.j2)(n.metadata)), e
                    }, [a, i, n.metadata, n.environment]), f = (0, g.useMemo)(() => {
                        var e;
                        return n.environment === h.cv.Custom && (null === (e = n.metadata) || void 0 === e ? void 0 : e.category) === v.hg.Collectibles
                    }, [n.metadata, n.environment]), j = C(n.metadata), E = j === r.FreshPackage, O = j === r.FreshPackage || j === r.NewVersion;
                    return (0, I.jsxs)("div", {
                        className: (0, A.Z)(B().buttonContainer, {
                            [B().pulsatingTile]: _.xi(n.environment, f) && l
                        }),
                        children: [(0, I.jsx)("button", {
                            type: "button",
                            className: (0, A.Z)(B().imageWrap, {
                                [B().selected]: b,
                                [B().hoverEnabled]: !E,
                                [B().disablePointer]: E
                            }),
                            onClick: p,
                            disabled: E,
                            children: (0, I.jsxs)("div", {
                                className: B().image,
                                style: {
                                    backgroundImage: `url(${n.images[u<0?c:u]})`
                                },
                                children: [(0, I.jsx)("div", {
                                    className: (0, A.Z)(B().imageMask, _.xi(n.environment, f) && l && B().imageWithBorder)
                                }), n.environment === h.cv.Abstract && (0, I.jsx)(w, {
                                    className: B().overlayIcon
                                }), O && (0, I.jsx)(Q, {
                                    processingStatus: j
                                })]
                            })
                        }), (0, I.jsxs)("div", {
                            className: (0, A.Z)(B().infoContainer, n.artist ? B().twoColumns : B().singleColumn, E && B().disabledOpacity),
                            children: [(0, I.jsxs)("div", {
                                className: B().nameContainer,
                                children: [(0, I.jsxs)("div", {
                                    className: B().flexCenter,
                                    children: [(0, I.jsx)("div", {
                                        className: B().name,
                                        children: n.name
                                    }), (null === (t = n.metadata) || void 0 === t ? void 0 : t.category) === v.hg.Collectibles && (0, I.jsx)("img", {
                                        src: x.src,
                                        alt: "Ethereum icon",
                                        className: B().ethereumLogo,
                                        title: "A collectible NFT environment on the Ethereum blockchain"
                                    })]
                                }), !o && n.artist && (0, I.jsxs)("div", {
                                    className: B().creatorName,
                                    children: [(0, I.jsx)("div", {
                                        className: B().byText,
                                        children: "by"
                                    }), " ", n.artist]
                                })]
                            }), n.images.length > 1 && (0, I.jsx)(k.f, {
                                disabled: E,
                                pickCoord: n.iconPickCoord,
                                selectedVariant: c,
                                setSelectedVariant: m,
                                setPreviewVariant: d,
                                urls: n.images
                            })]
                        })]
                    }, n.metadata ? `custom-nft-env-${(0,y.j2)(n.metadata)}` : `custom-nft-env-${n.environment}`)
                };
            var L = n(25976),
                D = n.n(L);
            let M = e => {
                let {
                    useTemplateGrid: t
                } = e;
                return (0, I.jsx)("div", {
                    className: D().container,
                    children: (0, I.jsx)("div", {
                        className: (0, A.Z)(D().grid, t ? D().templateLayout : D().layout),
                        children: e.children
                    })
                })
            };
            var S = n(69529),
                F = n(78025);
            let V = {
                    environment: h.cv.PrivateLobby,
                    images: [f.Z.src],
                    name: "Home"
                },
                Z = e => {
                    let {
                        currentEnvironment: t,
                        currentCustomNftEnvironmentId: n,
                        onSelect: r,
                        hideByLine: i,
                        includeDefaultEnvironments: a,
                        includeCustomEnvironment: l,
                        includePrivateLobbyEnvironment: o,
                        includeNFTEnvironments: A,
                        includeCreatorToolkitEnvironments: s
                    } = e, {
                        isInitialLoading: c,
                        isError: m,
                        data: u
                    } = (0, b.B)(p.CP), f = (0, g.useMemo)(() => {
                        if (u) {
                            let e = Object.values(h.cv);
                            return Object.entries(u.spaceTemplates).filter(e => {
                                let [t, n] = e;
                                return n.variants
                            }).map(t => {
                                let n, [r, i] = t;
                                i.environmentAssetType === v.oI.UnityPackage ? n = h.cv.UnityPackage : e.includes(i.id) ? n = h.cv[i.id] : i.environmentAssetType === v.oI.NFT && (n = h.cv.Custom);
                                let a = i.variants.map(e => e.thumbnail),
                                    l = {
                                        environment: n,
                                        images: a,
                                        name: i.name,
                                        artist: i.creatorName,
                                        metadata: i,
                                        id: i.id
                                    };
                                return l
                            })
                        }
                        return null
                    }, [u]), y = (0, g.useMemo)(() => {
                        let e = null != f ? f : [];
                        return a || (e = e.filter(e => {
                            var t;
                            return (null === (t = e.metadata) || void 0 === t ? void 0 : t.category) !== v.hg.Free
                        })), A || (e = e.filter(e => {
                            var t;
                            return (null === (t = e.metadata) || void 0 === t ? void 0 : t.category) !== v.hg.Collectibles
                        })), s || (e = e.filter(e => {
                            var t;
                            return (null === (t = e.metadata) || void 0 === t ? void 0 : t.category) !== v.hg.Packages
                        })), l && !n && (e = [j.SX].concat(e)), o && (e = [V].concat(e)), e
                    }, [n, f, a, l, A, o, s]), C = (0, d.Ie)();
                    if (c) return (0, I.jsx)(P.l, {
                        useRelativePosition: !0,
                        size: "large",
                        color: "black"
                    });
                    if ((null == y ? void 0 : y.length) === 0) {
                        if (m) return (0, I.jsx)("div", {
                            className: "flex h-full w-full flex-col items-center justify-center",
                            children: "Failed to load space templates."
                        });
                        if (s && !a && !l && !o && !A) return (0, I.jsxs)("div", {
                            className: "flex h-full w-full flex-col items-center justify-center",
                            children: [(0, I.jsx)(S.X, {
                                as: "h3",
                                size: "h3",
                                className: "mb-2",
                                children: "Create Your Own Custom Environment"
                            }), (0, I.jsx)("div", {
                                children: "The Spatial Creator Toolkit allows you to build immersive, interactive, and beautiful 3D spaces with Unity"
                            }), (0, I.jsx)(F.z, {
                                size: "lg",
                                className: "mt-6",
                                as: "a",
                                href: "https://docs.spatial.io/",
                                target: "_blank",
                                rel: "noreferrer",
                                children: "Get Started Now"
                            })]
                        })
                    }
                    return (0, I.jsx)(M, {
                        children: y.map(e => (0, I.jsx)(T, {
                            currentEnvironment: t,
                            currentCustomNftEnvironmentId: n,
                            shouldShowMetamaskTutorial: C,
                            hideByLine: i,
                            onSelect: r,
                            option: e
                        }, e.name))
                    })
                };
            var U = {
                src: "/_next/static/media/template-icon.e3b28dca.png",
                height: 73,
                width: 73,
                blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAeElEQVR42h3LMQ4BURjE8SeyonYAiUonNIo9gI5KtlyVQkQtUZDoRCeROItG4zCOoPF73r6v+Cbzn5nQnL5h1la2Ni5OzroZGbtlvLNKvx2MvG3VXuYJdIKpvYnS0t0gVZUOefIQ/cyCwtVa5SuKjilTqCzUPp56f6UjRGkMnvW3AAAAAElFTkSuQmCC",
                blurWidth: 8,
                blurHeight: 8
            };
            let R = [{
                src: "/_next/static/media/backup-thumbnail-pink.08256d01.jpg",
                height: 402,
                width: 1046,
                blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAMACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABgEBAQAAAAAAAAAAAAAAAAAABQb/2gAMAwEAAhADEAAAAKsK0/8A/8QAGBAAAgMAAAAAAAAAAAAAAAAAAAIBA0H/2gAIAQEAAT8Ardp0/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAIAQIBAT8Ar//EABYRAAMAAAAAAAAAAAAAAAAAAAACMf/aAAgBAwEBPwBqf//Z",
                blurWidth: 8,
                blurHeight: 3
            }, {
                src: "/_next/static/media/backup-thumbnail-orange.92b90094.jpg",
                height: 402,
                width: 1046,
                blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAMACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABgEBAQAAAAAAAAAAAAAAAAAABQb/2gAMAwEAAhADEAAAAL8TrP8A/8QAFxABAAMAAAAAAAAAAAAAAAAAAgADUf/aAAgBAQABPwCpLZ//xAAXEQEAAwAAAAAAAAAAAAAAAAABAAMS/9oACAECAQE/AK1zP//EABYRAAMAAAAAAAAAAAAAAAAAAAACMv/aAAgBAwEBPwB6P//Z",
                blurWidth: 8,
                blurHeight: 3
            }, {
                src: "/_next/static/media/backup-thumbnail-green.2f20b0d9.jpg",
                height: 402,
                width: 1046,
                blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAMACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABgEBAQAAAAAAAAAAAAAAAAAAAgb/2gAMAwEAAhADEAAAALUOc//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABkRAAEFAAAAAAAAAAAAAAAAAAIAAQMSMf/aAAgBAwEBPwCQRtjL/9k=",
                blurWidth: 8,
                blurHeight: 3
            }];
            var G = n(59654);
            let K = e => {
                let t = (e, t) => e.thumbnail ? e.thumbnail : R[t % R.length].src,
                    {
                        isError: n,
                        data: r
                    } = e.templatesQuery;
                return r ? r.length > 0 ? (0, I.jsx)(M, {
                    useTemplateGrid: !0,
                    children: r.map((n, r) => (0, I.jsx)("button", {
                        type: "button",
                        className: B().btnOption,
                        id: `template-option-${n.id}`,
                        onClick: () => e.onSelect(n.id),
                        children: (0, I.jsxs)("div", {
                            className: B().image,
                            style: {
                                backgroundImage: `url(${t(n,r)})`
                            },
                            children: [(0, I.jsx)("div", {
                                className: B().imageMask
                            }), (0, I.jsx)("img", {
                                src: U.src,
                                className: B().icon,
                                alt: "Template"
                            }), (0, I.jsx)("div", {
                                className: B().templateNameContainer,
                                children: (0, I.jsx)("div", {
                                    className: B().name,
                                    children: n.name
                                })
                            })]
                        })
                    }, n.id))
                }) : (0, I.jsx)("div", {
                    className: B().empty,
                    children: "You have not created any templates yet."
                }) : n ? (0, I.jsx)("div", {
                    className: B().error,
                    children: "Sorry! Something went wrong while fetching your templates. Try again later"
                }) : (0, I.jsx)("div", {
                    className: B().loading,
                    children: (0, I.jsx)(G.a, {
                        variant: "fancy",
                        color: "black"
                    })
                })
            };
            var Y = n(95133),
                z = n.n(Y);
            (l = i || (i = {}))[l.Environments = 0] = "Environments", l[l.CreatorToolkit = 1] = "CreatorToolkit", l[l.Collectibles = 2] = "Collectibles", l[l.Templates = 3] = "Templates";
            let W = e => {
                let {
                    tab: t,
                    setTab: n,
                    onSelectEnvironment: r,
                    onSelectTemplate: a,
                    includeTemplates: l,
                    currentEnvironment: o,
                    currentCustomNftEnvironmentId: g,
                    includeCustomEnvironment: v,
                    includePrivateLobbyEnvironment: b,
                    sidebarTitle: h
                } = e, f = (0, m.S3)(p.zt, {
                    enabled: l
                }), {
                    user: j
                } = (0, d.aF)(), {
                    collectibleEnvironmentsUpdateKey: y
                } = j.treatmentsParsed, C = (0, d.dd)(y), {
                    mutate: _
                } = (0, u.pX)(p.zt);
                return (0, I.jsxs)("div", {
                    className: z().container,
                    children: [(0, I.jsxs)("div", {
                        className: (0, A.Z)(z().sidebar, e.sidebarClassName),
                        children: [h && (0, I.jsx)("h2", {
                            className: z().title,
                            children: h
                        }), (0, I.jsxs)("div", {
                            className: z().sidebarTabs,
                            children: [(0, I.jsx)("button", {
                                className: (0, A.Z)(z().sidebarTab, {
                                    [z().active]: t === i.Environments
                                }),
                                onClick: () => n(i.Environments),
                                children: "Free"
                            }), (0, I.jsx)("button", {
                                className: (0, A.Z)(z().sidebarTab, {
                                    [z().active]: t === i.CreatorToolkit
                                }),
                                onClick: () => n(i.CreatorToolkit),
                                children: "Creator Toolkit"
                            }), (0, I.jsxs)("button", {
                                className: (0, A.Z)(z().sidebarTab, {
                                    [z().active]: t === i.Collectibles
                                }),
                                onClick: () => {
                                    n(i.Collectibles), C && _({
                                        userId: j.id,
                                        notification: y
                                    })
                                },
                                children: ["Collectibles", C && (0, I.jsx)("span", {
                                    className: z().collectibleDotContainer,
                                    children: (0, I.jsx)("span", {
                                        className: z().collectibleDot
                                    })
                                })]
                            }), l && (0, I.jsx)("button", {
                                className: (0, A.Z)(z().sidebarTab, {
                                    [z().active]: t === i.Templates
                                }),
                                onClick: () => n(i.Templates),
                                children: "Your Templates"
                            })]
                        })]
                    }), (0, I.jsx)("hr", {}), (0, I.jsxs)("div", {
                        className: z().innerWrapper,
                        children: [t === i.Environments && (0, I.jsx)(s.Op, {
                            id: c.C.EnvironmentsList,
                            children: (0, I.jsx)(Z, {
                                currentEnvironment: o,
                                currentCustomNftEnvironmentId: g,
                                onSelect: r,
                                includeDefaultEnvironments: !0,
                                includeCustomEnvironment: v,
                                includePrivateLobbyEnvironment: b,
                                hideByLine: !0
                            })
                        }), t === i.CreatorToolkit && (0, I.jsx)(s.Op, {
                            id: c.C.CreatorToolkitEnvironmentsList,
                            children: (0, I.jsx)(Z, {
                                currentEnvironment: o,
                                currentCustomNftEnvironmentId: g,
                                onSelect: r,
                                includeDefaultEnvironments: !1,
                                includeCreatorToolkitEnvironments: !0
                            })
                        }), t === i.Collectibles && (0, I.jsx)(s.Op, {
                            id: c.C.CollectibleEnvironmentsList,
                            children: (0, I.jsx)(Z, {
                                currentEnvironment: o,
                                currentCustomNftEnvironmentId: g,
                                onSelect: r,
                                includeDefaultEnvironments: !1,
                                includeNFTEnvironments: !0
                            })
                        }), t === i.Templates && (0, I.jsx)(s.Op, {
                            id: c.C.TemplatesList,
                            children: (0, I.jsx)(K, {
                                templatesQuery: f,
                                onSelect: a
                            })
                        })]
                    })]
                })
            };
            var H = W
        },
        79539: function(e, t, n) {
            "use strict";
            n.d(t, {
                O: function() {
                    return p
                }
            });
            var r = n(95235),
                i = n(82269),
                a = n(2784),
                l = n(89397),
                o = n(73669),
                A = n(24424),
                s = n(52322);
            let c = ["className", "isLoaded", "animationOffsetMs", "fadeInDelayMs", "children"];

            function m(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function u(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? m(Object(n), !0).forEach(function(t) {
                        (0, r.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let d = (0, a.forwardRef)((e, t) => {
                let {
                    className: n,
                    isLoaded: r,
                    animationOffsetMs: a = 0,
                    fadeInDelayMs: o = 0,
                    children: m
                } = e, d = (0, i.Z)(e, c);
                return (0, s.jsxs)(l.x, u(u({
                    ref: t,
                    className: (0, A.cn)("relative rounded-lg", n),
                    as: "div"
                }, d), {}, {
                    children: [m, !r && (0, s.jsx)("div", {
                        className: "animate-opacity-fade-in opacity-0",
                        style: {
                            animationDelay: `-${o}ms`
                        },
                        children: (0, s.jsx)("div", {
                            className: (0, A.cn)("absolute inset-0 rounded-lg", "bg-gradient-to-r from-[#fafafa] from-10% via-[#f0f0f0] via-40% to-[#fafafa] to-55% bg-[length:1000px_640px]", "animate-placeholder-shimmer"),
                            style: {
                                animationDelay: `-${a}ms`
                            }
                        })
                    })]
                }))
            });
            d.displayName = "Skeleton";
            let p = (0, o.F)(d)
        },
        45080: function(e, t) {
            "use strict";
            t.Z = {
                src: "/_next/static/media/thumbnail-private-lobby.b10946e7.jpg",
                height: 675,
                width: 1200,
                blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAUACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAAAwEBAAAAAAAAAAAAAAAAAAAABP/aAAwDAQACEAMQAAAAiBP/AP/EABsQAAEEAwAAAAAAAAAAAAAAAAEAAhESEyEx/9oACAEBAAE/AIdbI4gvrJ12V//EABgRAAMBAQAAAAAAAAAAAAAAAAECEQAh/9oACAECAQE/AHVSRReb/8QAFxEAAwEAAAAAAAAAAAAAAAAAAQIRAP/aAAgBAwEBPwAMwsO//9k=",
                blurWidth: 8,
                blurHeight: 5
            }
        },
        26357: function(e) {
            e.exports = {
                container: "tooltip_container__gOgTd",
                arrow: "tooltip_arrow__BzaS7"
            }
        },
        25976: function(e) {
            e.exports = {
                container: "environment-template-grid_container__exqYA",
                grid: "environment-template-grid_grid__KReGN",
                templateLayout: "environment-template-grid_templateLayout__ZihP0",
                layout: "environment-template-grid_layout__KY2tW"
            }
        },
        13270: function(e) {
            e.exports = {
                hoverEnabled: "environment-template-picker_hoverEnabled__VRkjr",
                image: "environment-template-picker_image__d106Z",
                empty: "environment-template-picker_empty__mNxa3",
                loading: "environment-template-picker_loading__MADa1",
                error: "environment-template-picker_error__CNBYH",
                buttonContainer: "environment-template-picker_buttonContainer__wlNLJ",
                imageWrap: "environment-template-picker_imageWrap__Uh9tm",
                selected: "environment-template-picker_selected__9ZbvK",
                disablePointer: "environment-template-picker_disablePointer__sRmiF",
                imageMask: "environment-template-picker_imageMask__AIZ2H",
                overlayIcon: "environment-template-picker_overlayIcon__rJIt7",
                loadingIndicator: "environment-template-picker_loadingIndicator__UhFuE",
                smallLoadingIndicator: "environment-template-picker_smallLoadingIndicator__K4H6C",
                infoContainer: "environment-template-picker_infoContainer__acyT4",
                singleColumn: "environment-template-picker_singleColumn__gnHDb",
                templateNameContainer: "environment-template-picker_templateNameContainer__nfWU2",
                name: "environment-template-picker_name__E8QMQ",
                byText: "environment-template-picker_byText__jOWet",
                creatorName: "environment-template-picker_creatorName__hnxkZ",
                flexCenter: "environment-template-picker_flexCenter__V7g1g",
                imageWithBorder: "environment-template-picker_imageWithBorder__tqVME",
                pulsatingTile: "environment-template-picker_pulsatingTile__hr3_j",
                "border-pulsate": "environment-template-picker_border-pulsate__39va_",
                ethereumLogo: "environment-template-picker_ethereumLogo__c790w",
                loaderOverlay: "environment-template-picker_loaderOverlay__kpsy3",
                loaderText: "environment-template-picker_loaderText__t_8Xo",
                small: "environment-template-picker_small__Z461V",
                disabledOpacity: "environment-template-picker_disabledOpacity__4UBoO",
                overlayBanner: "environment-template-picker_overlayBanner__GE7VO",
                loaderOverlayMinimal: "environment-template-picker_loaderOverlayMinimal___Mi87"
            }
        },
        48904: function(e) {
            e.exports = {
                container: "environment-variant-selector_container__qDTfH",
                buttonContainer: "environment-variant-selector_buttonContainer__V60O7",
                selected: "environment-variant-selector_selected__0LNXk",
                hoverEnabled: "environment-variant-selector_hoverEnabled__0t8AE"
            }
        },
        95133: function(e) {
            e.exports = {
                container: "environment-template-picker_container__fLC4M",
                sidebar: "environment-template-picker_sidebar__gPDC0",
                title: "environment-template-picker_title__Pi79d",
                sidebarTabs: "environment-template-picker_sidebarTabs__bugc5",
                sidebarTab: "environment-template-picker_sidebarTab__D85ke",
                active: "environment-template-picker_active__2jIcM",
                innerWrapper: "environment-template-picker_innerWrapper__GoF5v",
                collectibleDotContainer: "environment-template-picker_collectibleDotContainer__Prjoz",
                collectibleDot: "environment-template-picker_collectibleDot__Czn7E"
            }
        }
    }
]);
//# sourceMappingURL=9498-06b7c4d46082d6a8.js.map