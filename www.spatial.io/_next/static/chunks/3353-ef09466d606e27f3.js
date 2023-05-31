(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3353], {
        72779: function(e, t) {
            var n;
            /*!
              Copyright (c) 2018 Jed Watson.
              Licensed under the MIT License (MIT), see
              http://jedwatson.github.io/classnames
            */
            ! function() {
                "use strict";
                var r = {}.hasOwnProperty;

                function o() {
                    for (var e = [], t = 0; t < arguments.length; t++) {
                        var n = arguments[t];
                        if (n) {
                            var a = typeof n;
                            if ("string" === a || "number" === a) e.push(n);
                            else if (Array.isArray(n)) {
                                if (n.length) {
                                    var c = o.apply(null, n);
                                    c && e.push(c)
                                }
                            } else if ("object" === a) {
                                if (n.toString === Object.prototype.toString)
                                    for (var i in n) r.call(n, i) && n[i] && e.push(i);
                                else e.push(n.toString())
                            }
                        }
                    }
                    return e.join(" ")
                }
                e.exports ? (o.default = o, e.exports = o) : void 0 !== (n = (function() {
                    return o
                }).apply(t, [])) && (e.exports = n)
            }()
        },
        50381: function(e, t, n) {
            "use strict";
            var r = n(91706),
                o = {
                    "text/plain": "Text",
                    "text/html": "Url",
                    default: "Text"
                };
            e.exports = function(e, t) {
                var n, a, c, i, u, l, s, f, d = !1;
                t || (t = {}), c = t.debug || !1;
                try {
                    if (u = r(), l = document.createRange(), s = document.getSelection(), (f = document.createElement("span")).textContent = e, f.style.all = "unset", f.style.position = "fixed", f.style.top = 0, f.style.clip = "rect(0, 0, 0, 0)", f.style.whiteSpace = "pre", f.style.webkitUserSelect = "text", f.style.MozUserSelect = "text", f.style.msUserSelect = "text", f.style.userSelect = "text", f.addEventListener("copy", function(n) {
                            if (n.stopPropagation(), t.format) {
                                if (n.preventDefault(), void 0 === n.clipboardData) {
                                    c && console.warn("unable to use e.clipboardData"), c && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
                                    var r = o[t.format] || o.default;
                                    window.clipboardData.setData(r, e)
                                } else n.clipboardData.clearData(), n.clipboardData.setData(t.format, e)
                            }
                            t.onCopy && (n.preventDefault(), t.onCopy(n.clipboardData))
                        }), document.body.appendChild(f), l.selectNodeContents(f), s.addRange(l), !document.execCommand("copy")) throw Error("copy command was unsuccessful");
                    d = !0
                } catch (r) {
                    c && console.error("unable to copy using execCommand: ", r), c && console.warn("trying IE specific stuff");
                    try {
                        window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), d = !0
                    } catch (r) {
                        c && console.error("unable to copy using clipboardData: ", r), c && console.error("falling back to prompt"), n = "message" in t ? t.message : "Copy to clipboard: #{key}, Enter", a = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C", i = n.replace(/#{\s*key\s*}/g, a), window.prompt(i, e)
                    }
                } finally {
                    s && ("function" == typeof s.removeRange ? s.removeRange(l) : s.removeAllRanges()), f && document.body.removeChild(f), u()
                }
                return d
            }
        },
        67320: function(e, t, n) {
            var r = n(37772),
                o = n(38101),
                a = n(7642),
                c = n(66188),
                i = r.isFinite,
                u = Math.min;
            e.exports = function(e) {
                var t = Math[e];
                return function(e, n) {
                    if (e = a(e), (n = null == n ? 0 : u(o(n), 292)) && i(e)) {
                        var r = (c(e) + "e").split("e");
                        return +((r = (c(t(r[0] + "e" + (+r[1] + n))) + "e").split("e"))[0] + "e" + (+r[1] - n))
                    }
                    return t(e)
                }
            }
        },
        1868: function(e, t, n) {
            var r = n(67320)("ceil");
            e.exports = r
        },
        21842: function(e, t, n) {
            var r = n(67320)("floor");
            e.exports = r
        },
        68262: function(e, t, n) {
            "use strict";
            var r = n(23586);

            function o() {}

            function a() {}
            a.resetWarningCache = o, e.exports = function() {
                function e(e, t, n, o, a, c) {
                    if (c !== r) {
                        var i = Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw i.name = "Invariant Violation", i
                    }
                }

                function t() {
                    return e
                }
                e.isRequired = e;
                var n = {
                    array: e,
                    bigint: e,
                    bool: e,
                    func: e,
                    number: e,
                    object: e,
                    string: e,
                    symbol: e,
                    any: e,
                    arrayOf: t,
                    element: e,
                    elementType: e,
                    instanceOf: t,
                    node: e,
                    objectOf: t,
                    oneOf: t,
                    oneOfType: t,
                    shape: t,
                    exact: t,
                    checkPropTypes: a,
                    resetWarningCache: o
                };
                return n.PropTypes = n, n
            }
        },
        13980: function(e, t, n) {
            e.exports = n(68262)()
        },
        23586: function(e) {
            "use strict";
            e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
        },
        36794: function(e, t, n) {
            "use strict";

            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.CopyToClipboard = void 0;
            var o = i(n(2784)),
                a = i(n(50381)),
                c = ["text", "onCopy", "options", "children"];

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function u(e, t) {
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
                    t % 2 ? u(Object(n), !0).forEach(function(t) {
                        h(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }

            function s(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            function f(e, t) {
                return (f = Object.setPrototypeOf || function(e, t) {
                    return e.__proto__ = t, e
                })(e, t)
            }

            function d(e) {
                if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }

            function p(e) {
                return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
            }

            function h(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }
            var y = function(e) {
                ! function(e, t) {
                    if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t && f(e, t)
                }(y, e);
                var t, n, i, u = (t = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                    } catch (e) {
                        return !1
                    }
                }(), function() {
                    var e, n = p(y);
                    if (t) {
                        var o = p(this).constructor;
                        e = Reflect.construct(n, arguments, o)
                    } else e = n.apply(this, arguments);
                    return function(e, t) {
                        if (t && ("object" === r(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw TypeError("Derived constructors may only return object or undefined");
                        return d(e)
                    }(this, e)
                });

                function y() {
                    var e;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                    }(this, y);
                    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    return h(d(e = u.call.apply(u, [this].concat(n))), "onClick", function(t) {
                        var n = e.props,
                            r = n.text,
                            c = n.onCopy,
                            i = n.children,
                            u = n.options,
                            l = o.default.Children.only(i),
                            s = (0, a.default)(r, u);
                        c && c(r, s), l && l.props && "function" == typeof l.props.onClick && l.props.onClick(t)
                    }), e
                }
                return n = [{
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = (e.text, e.onCopy, e.options, e.children),
                            n = function(e, t) {
                                if (null == e) return {};
                                var n, r, o = function(e, t) {
                                    if (null == e) return {};
                                    var n, r, o = {},
                                        a = Object.keys(e);
                                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                                    return o
                                }(e, t);
                                if (Object.getOwnPropertySymbols) {
                                    var a = Object.getOwnPropertySymbols(e);
                                    for (r = 0; r < a.length; r++) n = a[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                                }
                                return o
                            }(e, c),
                            r = o.default.Children.only(t);
                        return o.default.cloneElement(r, l(l({}, n), {}, {
                            onClick: this.onClick
                        }))
                    }
                }], s(y.prototype, n), i && s(y, i), Object.defineProperty(y, "prototype", {
                    writable: !1
                }), y
            }(o.default.PureComponent);
            t.CopyToClipboard = y, h(y, "defaultProps", {
                onCopy: void 0,
                options: void 0
            })
        },
        72282: function(e, t, n) {
            "use strict";
            var r = n(36794).CopyToClipboard;
            r.CopyToClipboard = r, e.exports = r
        },
        21496: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r, o = (r = n(2784)) && r.__esModule ? r : {
                default: r
            };
            t.default = function() {
                return o.default.createElement("svg", {
                    width: "14",
                    height: "11",
                    viewBox: "0 0 14 11"
                }, o.default.createElement("path", {
                    d: "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
                    fill: "#fff",
                    fillRule: "evenodd"
                }))
            }
        },
        57293: function(e, t, n) {
            "use strict";
            var r = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                },
                o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                a = n(2784),
                c = d(a),
                i = d(n(72779)),
                u = d(n(13980)),
                l = d(n(21496)),
                s = d(n(57864)),
                f = n(56992);

            function d(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var p = function(e) {
                function t(e) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t && ("object" == typeof t || "function" == typeof t) ? t : e
                    }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return n.handleClick = n.handleClick.bind(n), n.handleTouchStart = n.handleTouchStart.bind(n), n.handleTouchMove = n.handleTouchMove.bind(n), n.handleTouchEnd = n.handleTouchEnd.bind(n), n.handleFocus = n.handleFocus.bind(n), n.handleBlur = n.handleBlur.bind(n), n.previouslyChecked = !!(e.checked || e.defaultChecked), n.state = {
                        checked: !!(e.checked || e.defaultChecked),
                        hasFocus: !1
                    }, n
                }
                return ! function(e, t) {
                    if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e), o(t, [{
                    key: "componentDidUpdate",
                    value: function(e) {
                        e.checked !== this.props.checked && this.setState({
                            checked: !!this.props.checked
                        })
                    }
                }, {
                    key: "handleClick",
                    value: function(e) {
                        if (!this.props.disabled) {
                            var t = this.input;
                            if (e.target !== t && !this.moved) {
                                this.previouslyChecked = t.checked, e.preventDefault(), t.focus(), t.click();
                                return
                            }
                            var n = this.props.hasOwnProperty("checked") ? this.props.checked : t.checked;
                            this.setState({
                                checked: n
                            })
                        }
                    }
                }, {
                    key: "handleTouchStart",
                    value: function(e) {
                        this.props.disabled || (this.startX = (0, f.pointerCoord)(e).x, this.activated = !0)
                    }
                }, {
                    key: "handleTouchMove",
                    value: function(e) {
                        if (this.activated && (this.moved = !0, this.startX)) {
                            var t = (0, f.pointerCoord)(e).x;
                            this.state.checked && t + 15 < this.startX ? (this.setState({
                                checked: !1
                            }), this.startX = t, this.activated = !0) : t - 15 > this.startX && (this.setState({
                                checked: !0
                            }), this.startX = t, this.activated = t < this.startX + 5)
                        }
                    }
                }, {
                    key: "handleTouchEnd",
                    value: function(e) {
                        if (this.moved) {
                            var t = this.input;
                            if (e.preventDefault(), this.startX) {
                                var n = (0, f.pointerCoord)(e).x;
                                !0 === this.previouslyChecked && this.startX + 4 > n ? this.previouslyChecked !== this.state.checked && (this.setState({
                                    checked: !1
                                }), this.previouslyChecked = this.state.checked, t.click()) : this.startX - 4 < n && this.previouslyChecked !== this.state.checked && (this.setState({
                                    checked: !0
                                }), this.previouslyChecked = this.state.checked, t.click()), this.activated = !1, this.startX = null, this.moved = !1
                            }
                        }
                    }
                }, {
                    key: "handleFocus",
                    value: function(e) {
                        var t = this.props.onFocus;
                        t && t(e), this.setState({
                            hasFocus: !0
                        })
                    }
                }, {
                    key: "handleBlur",
                    value: function(e) {
                        var t = this.props.onBlur;
                        t && t(e), this.setState({
                            hasFocus: !1
                        })
                    }
                }, {
                    key: "getIcon",
                    value: function(e) {
                        var n = this.props.icons;
                        return n ? void 0 === n[e] ? t.defaultProps.icons[e] : n[e] : null
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.props,
                            n = t.className,
                            o = (t.icons, function(e, t) {
                                var n = {};
                                for (var r in e) !(t.indexOf(r) >= 0) && Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                                return n
                            }(t, ["className", "icons"])),
                            a = (0, i.default)("react-toggle", {
                                "react-toggle--checked": this.state.checked,
                                "react-toggle--focus": this.state.hasFocus,
                                "react-toggle--disabled": this.props.disabled
                            }, n);
                        return c.default.createElement("div", {
                            className: a,
                            onClick: this.handleClick,
                            onTouchStart: this.handleTouchStart,
                            onTouchMove: this.handleTouchMove,
                            onTouchEnd: this.handleTouchEnd
                        }, c.default.createElement("div", {
                            className: "react-toggle-track"
                        }, c.default.createElement("div", {
                            className: "react-toggle-track-check"
                        }, this.getIcon("checked")), c.default.createElement("div", {
                            className: "react-toggle-track-x"
                        }, this.getIcon("unchecked"))), c.default.createElement("div", {
                            className: "react-toggle-thumb"
                        }), c.default.createElement("input", r({}, o, {
                            ref: function(t) {
                                e.input = t
                            },
                            onFocus: this.handleFocus,
                            onBlur: this.handleBlur,
                            className: "react-toggle-screenreader-only",
                            type: "checkbox"
                        })))
                    }
                }]), t
            }(a.PureComponent);
            t.Z = p, p.displayName = "Toggle", p.defaultProps = {
                icons: {
                    checked: c.default.createElement(l.default, null),
                    unchecked: c.default.createElement(s.default, null)
                }
            }, p.propTypes = {
                checked: u.default.bool,
                disabled: u.default.bool,
                defaultChecked: u.default.bool,
                onChange: u.default.func,
                onFocus: u.default.func,
                onBlur: u.default.func,
                className: u.default.string,
                name: u.default.string,
                value: u.default.string,
                id: u.default.string,
                "aria-labelledby": u.default.string,
                "aria-label": u.default.string,
                icons: u.default.oneOfType([u.default.bool, u.default.shape({
                    checked: u.default.node,
                    unchecked: u.default.node
                })])
            }
        },
        56992: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.pointerCoord = function(e) {
                if (e) {
                    var t = e.changedTouches;
                    if (t && t.length > 0) {
                        var n = t[0];
                        return {
                            x: n.clientX,
                            y: n.clientY
                        }
                    }
                    var r = e.pageX;
                    if (void 0 !== r) return {
                        x: r,
                        y: e.pageY
                    }
                }
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        57864: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r, o = (r = n(2784)) && r.__esModule ? r : {
                default: r
            };
            t.default = function() {
                return o.default.createElement("svg", {
                    width: "10",
                    height: "10",
                    viewBox: "0 0 10 10"
                }, o.default.createElement("path", {
                    d: "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
                    fill: "#fff",
                    fillRule: "evenodd"
                }))
            }
        },
        36883: function(e, t, n) {
            "use strict";
            n.d(t, {
                S1: function() {
                    return a
                },
                ZT: function() {
                    return r
                },
                jU: function() {
                    return c
                },
                on: function() {
                    return o
                }
            });
            var r = function() {};

            function o(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                e && e.addEventListener && e.addEventListener.apply(e, t)
            }

            function a(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                e && e.removeEventListener && e.removeEventListener.apply(e, t)
            }
            var c = "undefined" != typeof window
        },
        95567: function(e, t, n) {
            "use strict";
            var r = n(2784),
                o = n(36883);
            t.Z = function(e, t) {
                void 0 === t && (t = !0);
                var n = (0, r.useState)(!1),
                    a = n[0],
                    c = n[1];
                return (0, r.useEffect)(function() {
                    var n = function() {
                            return c(!0)
                        },
                        r = function() {
                            return c(!1)
                        };
                    t && e && e.current && ((0, o.on)(e.current, "mouseover", n), (0, o.on)(e.current, "mouseout", r));
                    var a = e.current;
                    return function() {
                        t && a && ((0, o.S1)(a, "mouseover", n), (0, o.S1)(a, "mouseout", r))
                    }
                }, [t, e]), a
            }
        },
        47823: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return i
                }
            });
            var r = n(2784),
                o = n(36883),
                a = o.jU ? r.useLayoutEffect : r.useEffect,
                c = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                i = o.jU && void 0 !== window.ResizeObserver ? function() {
                    var e = (0, r.useState)(null),
                        t = e[0],
                        n = e[1],
                        o = (0, r.useState)(c),
                        i = o[0],
                        u = o[1],
                        l = (0, r.useMemo)(function() {
                            return new window.ResizeObserver(function(e) {
                                if (e[0]) {
                                    var t = e[0].contentRect;
                                    u({
                                        x: t.x,
                                        y: t.y,
                                        width: t.width,
                                        height: t.height,
                                        top: t.top,
                                        left: t.left,
                                        bottom: t.bottom,
                                        right: t.right
                                    })
                                }
                            })
                        }, []);
                    return a(function() {
                        if (t) return l.observe(t),
                            function() {
                                l.disconnect()
                            }
                    }, [t]), [n, i]
                } : function() {
                    return [o.ZT, c]
                }
        },
        91706: function(e) {
            e.exports = function() {
                var e = document.getSelection();
                if (!e.rangeCount) return function() {};
                for (var t = document.activeElement, n = [], r = 0; r < e.rangeCount; r++) n.push(e.getRangeAt(r));
                switch (t.tagName.toUpperCase()) {
                    case "INPUT":
                    case "TEXTAREA":
                        t.blur();
                        break;
                    default:
                        t = null
                }
                return e.removeAllRanges(),
                    function() {
                        "Caret" === e.type && e.removeAllRanges(), e.rangeCount || n.forEach(function(t) {
                            e.addRange(t)
                        }), t && t.focus()
                    }
            }
        }
    }
]);
//# sourceMappingURL=3353-ef09466d606e27f3.js.map