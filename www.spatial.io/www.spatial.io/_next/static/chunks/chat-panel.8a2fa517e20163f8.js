(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9116], {
        62541: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                ChatPanel: function() {
                    return eF
                },
                useChatPanelEntered: function() {
                    return eZ
                }
            });
            var r, a, s, o = n(6277),
                i = n(25925),
                l = n(93556),
                c = n(2784),
                u = n(76163),
                p = n(26226),
                h = n(96500),
                d = n(73347),
                m = n(5094),
                f = n(1366),
                g = n(17905),
                y = n(43649),
                b = n(38776),
                j = n(57655),
                v = n(43041),
                O = n(95235),
                x = n(79354),
                w = n(95624),
                _ = n(89601);
            let C = e => {
                let t = new Date(e),
                    n = Math.floor((Date.now() - t.getTime()) / 1e3);
                if (n < 20) return "Just now";
                let r = n / 3600;
                if (r >= 1) return Math.floor(r) + ` hour${r>1?"s":""} ago`;
                let a = n / 60;
                return a >= 1 ? Math.floor(a) + ` min${a>1?"s":""} ago` : Math.floor(n) + " secs ago"
            };
            var P = n(73940),
                M = n(13588),
                k = n(49611),
                S = n(89959),
                E = n(8239),
                N = n(56515),
                B = n(6937),
                D = n.n(B),
                R = n(52322);

            function T(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function z(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? T(Object(n), !0).forEach(function(t) {
                        (0, O.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : T(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let A = (0, c.memo)(function(e) {
                    var t;
                    let {
                        attemptBlockUser: n,
                        attemptBanUser: r,
                        openUserProfile: a
                    } = e, s = eZ(), {
                        message: i,
                        isMyMessage: u,
                        handleDelete: p
                    } = (0, x.fr)(), h = u(), d = (0, b.bp)(e => k.sB(e.state.unity.appState, i.user.id)), m = (0, b.bp)(e => k.zZ(e.state.unity.appState, i.user.id)), f = null !== (t = i.user.color) && void 0 !== t ? t : "blue", g = (0, c.useMemo)(() => {
                        if (d) return "You’ve blocked this user";
                        if (m) return "This Spatian has been removed by a host";
                        if ("error" === i.type) {
                            if ("Message was blocked by moderation policies" === i.text) return "Message not sent: Keep the vibes positive!";
                            if ("The message you are trying to send is larger than 800 characters" === i.text) return "Message not sent: Keep messages under 800 characters."
                        }
                        return i.text
                    }, [d, m, i.text, i.type]), j = (0, b.bp)(e => k.Dh(e.state.unity.appState)), v = (0, b.bp)(e => k.sv(e.state.unity.appState)), O = (0, b.bp)(e => k.W$(e.state.unity.appState, i.user.id)), [C, B] = (0, M.k)(!1), [T, A] = (0, M.k)(!1), F = (0, c.useCallback)(() => {
                        S.unblockUser(i.user.id), B.setFalse()
                    }, [i.user.id, B]), I = (0, c.useCallback)(() => {
                        j && S.unbanUserFromRoom(i.user.id), B.setFalse()
                    }, [j, i.user.id, B]), U = (0, c.useCallback)(() => {
                        a(i.user.id)
                    }, [i.user.id, a]), {
                        isAuthless: H
                    } = (0, b.F_)();
                    return (0, R.jsxs)(l.m.div, {
                        initial: !!s && {
                            scale: 0,
                            y: "100%"
                        },
                        animate: {
                            scale: 1,
                            y: 0
                        },
                        transition: y.D,
                        className: (0, o.Z)(D().container, "error" === i.type ? D().whiteBackground : D().transparentBackground, C && D().overflowMenuOpen),
                        onMouseEnter: A.setTrue,
                        onMouseLeave: A.setFalse,
                        children: [(0, R.jsxs)("div", {
                            className: (0, o.Z)((d || m || "error" === i.type) && D().blockedOrBanned),
                            children: [(0, R.jsx)("button", {
                                className: D().avatarContainer,
                                onClick: U,
                                children: (0, R.jsx)(E.f, {
                                    applyPlayerColorToPlaceholder: !0,
                                    profilePicUrl: i.user.image,
                                    playerColor: (0, P.v0)(f),
                                    altText: `${i.user.name}'s avatar`,
                                    className: D().avatar,
                                    showShadow: !0
                                })
                            }), (0, R.jsxs)("div", {
                                className: (0, o.Z)(D().content, D().message),
                                children: [(0, R.jsx)("span", {
                                    className: D().name,
                                    children: i.user.name
                                }), (0, R.jsx)(w.Y, {
                                    customInnerClass: D().messageText,
                                    customWrapperClass: D().messageTextContainer,
                                    message: z(z({}, i), {}, {
                                        text: g,
                                        type: "regular"
                                    })
                                })]
                            })]
                        }), (T || C) && (0, R.jsxs)("div", {
                            className: (0, o.Z)(D().topRightBar),
                            children: [(0, R.jsx)(Z, {
                                timestamp: i.updated_at
                            }), !H && (0, R.jsx)(N.Z, {
                                dropPosition: "dropdown",
                                menuPosition: "right",
                                touchOnly: !0,
                                paddingStyle: "4px 12px",
                                classNameContent: D().overflowMenuContent,
                                onClose: B.setFalse,
                                render: e => {
                                    let {
                                        setIsOpen: t
                                    } = e;
                                    return (0, R.jsx)("button", {
                                        onClick: () => {
                                            B.setTrue(), t(e => !e)
                                        },
                                        className: D().showOverflowMenuButton,
                                        children: (0, R.jsx)(_.r, {})
                                    })
                                },
                                children: (0, R.jsxs)(R.Fragment, {
                                    children: [(h || v) && (0, R.jsx)("button", {
                                        className: (0, o.Z)(D().overflowMenuButton, D().redText),
                                        onClick: p,
                                        children: "Delete"
                                    }), !h && (0, R.jsxs)(R.Fragment, {
                                        children: [(0, R.jsx)("button", {
                                            className: D().overflowMenuButton,
                                            onClick: () => d ? F() : n({
                                                displayName: i.user.name,
                                                userId: i.user.id
                                            }),
                                            children: d ? "Unblock" : "Block"
                                        }), j && !O && (0, R.jsx)("button", {
                                            className: D().overflowMenuButton,
                                            onClick: () => m ? I() : r({
                                                displayName: i.user.name,
                                                userId: i.user.id
                                            }),
                                            children: m ? "Unban" : "Ban"
                                        })]
                                    })]
                                })
                            })]
                        })]
                    })
                }),
                Z = (0, c.memo)(function(e) {
                    let {
                        timestamp: t
                    } = e, n = (0, c.useMemo)(() => C(t), [t]);
                    return (0, R.jsx)("time", {
                        className: D().timestamp,
                        children: n
                    })
                });
            var F = n(44868),
                I = n(43442),
                U = n(93700);
            let H = (0, c.memo)(function() {
                let {
                    onSelectEmoji: e
                } = (0, I.Nc)();
                return (0, R.jsx)(U.h, {
                    onEmojiSelect: e,
                    theme: "light",
                    navPosition: "bottom",
                    previewPosition: "none",
                    perLine: 10
                })
            });
            var L = n(8513),
                V = n(21063),
                W = n.n(V);

            function X(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function Q(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? X(Object(n), !0).forEach(function(t) {
                        (0, O.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : X(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let Y = (0, c.forwardRef)(function(e, t) {
                return (0, R.jsx)(L.c, Q(Q({
                    ref: t
                }, e), {}, {
                    className: W().container
                }))
            });
            var J = n(60076),
                K = n(67972),
                $ = n.n(K);

            function q(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function G(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? q(Object(n), !0).forEach(function(t) {
                        (0, O.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : q(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let ee = (0, c.memo)(function(e) {
                return (0, R.jsx)(J.a, G(G({}, e), {}, {
                    className: $().container
                }))
            });
            var et = n(60128),
                en = n(69189),
                er = n(91247),
                ea = ["title", "titleId"];

            function es() {
                return (es = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }).apply(this, arguments)
            }
            var eo = (0, c.forwardRef)(function(e, t) {
                    var n = e.title,
                        a = e.titleId,
                        s = function(e, t) {
                            if (null == e) return {};
                            var n, r, a = function(e, t) {
                                if (null == e) return {};
                                var n, r, a = {},
                                    s = Object.keys(e);
                                for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                                return a
                            }(e, t);
                            if (Object.getOwnPropertySymbols) {
                                var s = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < s.length; r++) n = s[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
                            }
                            return a
                        }(e, ea);
                    return c.createElement("svg", es({
                        xmlns: "http://www.w3.org/2000/svg",
                        height: 24,
                        viewBox: "0 0 24 24",
                        width: 24,
                        ref: t,
                        "aria-labelledby": a
                    }, s), n ? c.createElement("title", {
                        id: a
                    }, n) : null, r || (r = c.createElement("path", {
                        fill: "currentColor",
                        d: "M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"
                    })))
                }),
                ei = ["title", "titleId"];

            function el() {
                return (el = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }).apply(this, arguments)
            }
            var ec = (0, c.forwardRef)(function(e, t) {
                    var n = e.title,
                        r = e.titleId,
                        s = function(e, t) {
                            if (null == e) return {};
                            var n, r, a = function(e, t) {
                                if (null == e) return {};
                                var n, r, a = {},
                                    s = Object.keys(e);
                                for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                                return a
                            }(e, t);
                            if (Object.getOwnPropertySymbols) {
                                var s = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < s.length; r++) n = s[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
                            }
                            return a
                        }(e, ei);
                    return c.createElement("svg", el({
                        xmlns: "http://www.w3.org/2000/svg",
                        height: 24,
                        viewBox: "0 0 24 24",
                        width: 24,
                        ref: t,
                        "aria-labelledby": r
                    }, s), n ? c.createElement("title", {
                        id: r
                    }, n) : null, a || (a = c.createElement("path", {
                        fill: "currentColor",
                        d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    })))
                }),
                eu = ["title", "titleId"];

            function ep() {
                return (ep = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }).apply(this, arguments)
            }
            var eh = (0, c.forwardRef)(function(e, t) {
                    var n = e.title,
                        r = e.titleId,
                        a = function(e, t) {
                            if (null == e) return {};
                            var n, r, a = function(e, t) {
                                if (null == e) return {};
                                var n, r, a = {},
                                    s = Object.keys(e);
                                for (r = 0; r < s.length; r++) n = s[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                                return a
                            }(e, t);
                            if (Object.getOwnPropertySymbols) {
                                var s = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < s.length; r++) n = s[r], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
                            }
                            return a
                        }(e, eu);
                    return c.createElement("svg", ep({
                        xmlns: "http://www.w3.org/2000/svg",
                        height: 24,
                        viewBox: "0 0 24 24",
                        width: 24,
                        ref: t,
                        "aria-labelledby": r
                    }, a), n ? c.createElement("title", {
                        id: r
                    }, n) : null, s || (s = c.createElement("path", {
                        fill: "currentColor",
                        d: "M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"
                    })))
                }),
                ed = n(65557),
                em = n.n(ed);
            let ef = (0, c.memo)(function() {
                let {
                    isOpen: e,
                    numNewMessages: t
                } = (0, b.bp)(e => e.state.space.chat), {
                    emojiPickerIsOpen: n,
                    closeEmojiPicker: r,
                    openEmojiPicker: a
                } = (0, I.Nc)(), {
                    messages: s
                } = (0, et.JN)(), i = (0, b.bp)(e => e.actions), l = (0, c.useMemo)(() => s.filter(e => "deleted" !== e.type && "system" !== e.type).length, [s]), u = (0, c.useCallback)(e => "Escape" === e.key && i.focusUnity(), [i]), p = (0, c.useMemo)(() => n ? r : a, [r, n, a]), h = (0, c.useCallback)(() => {
                    e || i.toggleChat()
                }, [i, e]), d = (0, c.useCallback)(() => {
                    i.toggleChat(), i.focusUnity()
                }, [i]);
                return (0, R.jsxs)("div", {
                    className: em().container,
                    onKeyDown: u,
                    children: [(0, R.jsx)(en.T, {
                        onFocus: h,
                        placeholder: e && !l ? "Say hello!" : "Chat"
                    }), (0, R.jsxs)("div", {
                        className: em().buttonsContainer,
                        children: [e && (0, R.jsxs)("button", {
                            "aria-label": "Toggle Emoji Picker",
                            className: (0, o.Z)("tooltip-host", em().actionButton),
                            onClick: p,
                            children: [(0, R.jsx)("span", {
                                className: (0, o.Z)("tooltip-text tooltip-text--top", em().tooltip),
                                children: "Emojis"
                            }), (0, R.jsx)(ec, {})]
                        }), (0, R.jsxs)("button", {
                            "aria-label": "Toggle Chat",
                            className: (0, o.Z)("tooltip-host", em().actionButton),
                            onClick: d,
                            children: [(0, R.jsx)("span", {
                                className: (0, o.Z)("tooltip-text tooltip-text--top", em().tooltip),
                                children: e ? "Hide Chat" : "Open Chat"
                            }), e ? (0, R.jsx)(eo, {}) : (0, R.jsx)(eh, {}), !e && t > 0 && (0, R.jsx)("span", {
                                className: em().redDot
                            })]
                        })]
                    }), (0, R.jsx)("div", {
                        className: em().emojiPicker,
                        children: (0, R.jsx)(er.h, {})
                    })]
                })
            });
            var eg = n(14772),
                ey = n(95893),
                eb = n(42782),
                ej = n(7484),
                ev = n(14258),
                eO = n(21263),
                ex = n(8166),
                ew = n(13864),
                e_ = n(44944),
                eC = n(32082),
                eP = n(54537);
            let eM = new ej.nZ("Chat");

            function* ek() {
                let e;
                let t = eb.c8.getInstance(eC.ZP.STREAM_API_KEY),
                    n = yield(0, eg.Ys)(e => e.unity.appState.roomSession.meetingID);
                yield*(0, ex.Xs)(e => e.unity.appState.roomSession.inRoomAndFullyParticipating);
                try {
                    e = yield(0, eg.RE)(eP.ji.space.joinChat, n)
                } catch (e) {
                    throw yield(0, eg.gz)(e_.eX.setChatError(e)), e
                }
                try {
                    yield(0, eg.RE)([t, t.connectUser], {
                        id: e.userID
                    }, e.token)
                } catch (e) {
                    throw yield(0, eg.gz)(e_.eX.setChatError(e)), e
                }
                yield(0, eg.gz)(e_.eX.setChatClient(t)), yield(0, eg.RE)(eO.L, ew.j, {
                    name: g.A.ChatChannelJoin,
                    type: g.s.View
                }), 0 === e.messages.filter(e => "system" !== e.type && "deleted" !== e.type).length && (yield(0, eg.gz)(e_.eX.setChatMaySeeFirstMessage(!0)));
                let r = t.channel(e.channel.channelType, e.channel.channelName);
                try {
                    yield(0, eg.RE)(eS, r)
                } finally {
                    yield(0, eg.RE)([t, t.disconnectUser])
                }
            }

            function* eS(e) {
                yield(0, eg.RE)([e, e.watch]), yield(0, eg.gz)(e_.eX.setChatChannel(e));
                let t = (0, ey.GG)(t => {
                    let {
                        unsubscribe: n
                    } = e.on("message.new", t);
                    return n
                }, ey.Ef.sliding());
                try {
                    yield*(0, ev.Y6)(t, eE)
                } finally {
                    yield(0, eg.RE)([e, e.stopWatching])
                }
            }

            function* eE(e) {
                yield(0, eg.RE)(S.processChatMessage, e.user.id, e.message.text);
                let t = yield(0, eg.Ys)(e => e.space.chat.maySeeFirstMessage);
                t && (yield(0, eg.RE)(eO.L, ew.j, {
                    name: g.A.ChatChannelJoinAndSawFirstMessage,
                    type: g.s.View
                }), yield(0, eg.gz)(e_.eX.setChatMaySeeFirstMessage(!1))), yield(0, eg.gz)(e_.eX.processChatMessage())
            }
            var eN = n(63524),
                eB = n.n(eN);
            let eD = ["delete"],
                eR = () => null,
                eT = e => {
                    let {
                        message: t
                    } = e;
                    return "Truncated channel history." === t.text ? (0, R.jsx)(eR, {}) : (0, R.jsx)("div", {
                        className: (0, o.Z)(eB().errorMessage, eB().container),
                        children: t.text
                    })
                },
                ez = (0, c.memo)(function(e) {
                    let {
                        onAnimationComplete: t,
                        isOpen: n
                    } = e, {
                        sendMessage: r
                    } = (0, u.uz)(), a = (0, f.XW)(), s = (0, b.bp)(e => e.actions), {
                        maySeeFirstMessage: o
                    } = (0, b.bp)(e => e.state.space.chat), d = (0, c.useCallback)(() => {
                        s.openModal({
                            type: j.c3.Login,
                            payload: {
                                forceRedirect: !0,
                                titleCta: "Log in/Sign up to chat"
                            }
                        })
                    }, [s]), {
                        isAuthless: m
                    } = (0, b.F_)(), v = (0, c.useCallback)(e => {
                        if (m) {
                            a({
                                name: g.A.AuthlessUserSendChatMessage,
                                type: g.s.Click
                            }), d();
                            return
                        }
                        a({
                            name: g.A.ChatMessageSent,
                            type: g.s.Submission
                        }, {
                            "Message Length": e.text.length
                        }), o && (a({
                            name: g.A.ChatChannelJoinAndSawFirstMessage,
                            type: g.s.View
                        }), s.setChatMaySeeFirstMessage(!1)), r(e)
                    }, [s, m, o, d, r, a]);
                    return (0, R.jsxs)(R.Fragment, {
                        children: [(0, R.jsx)(i.M, {
                            children: n && (0, R.jsx)(l.m.div, {
                                initial: {
                                    x: 150,
                                    opacity: 0
                                },
                                animate: {
                                    x: 0,
                                    opacity: 1
                                },
                                exit: {
                                    x: 150,
                                    opacity: 0
                                },
                                transition: y.D,
                                className: eB().transitionComponent,
                                onAnimationComplete: t,
                                children: (0, R.jsx)(p.r, {
                                    hideDeletedMessages: !0,
                                    disableDateSeparator: !0,
                                    disableQuotedMessages: !0,
                                    messageActions: eD,
                                    scrolledUpThreshold: 200
                                })
                            })
                        }), (0, R.jsx)(h.R, {
                            maxRows: 2,
                            grow: !0,
                            noFiles: !0,
                            disableMentions: !0,
                            overrideSubmitHandler: v
                        })]
                    })
                }),
                eA = (0, c.createContext)(!1),
                eZ = () => (0, c.useContext)(eA),
                eF = (0, c.memo)(function(e) {
                    let {
                        displayAboveModals: t,
                        isOpen: n,
                        onSelectUser: r
                    } = e, {
                        client: a,
                        channel: s,
                        loaded: i,
                        error: l
                    } = (0, b.bp)(e => e.state.space.chat), {
                        0: u,
                        1: p
                    } = (0, c.useState)(null), {
                        0: h,
                        1: f
                    } = (0, c.useState)(null), g = (0, b.bp)(e => e.runSaga);
                    (0, c.useEffect)(() => {
                        let e = e => F.k.error(eM, "ChatSaga encountered an error", e),
                            t = g({
                                onError: e
                            }, ek);
                        return t.cancel
                    }, [g]);
                    let {
                        0: y,
                        1: j
                    } = (0, c.useState)(!1), O = (0, c.useRef)(n);
                    (0, c.useEffect)(() => {
                        O.current = n
                    }, [n]);
                    let x = (0, c.useCallback)(() => {
                        j(O.current)
                    }, []);
                    return (0, R.jsxs)(eA.Provider, {
                        value: y,
                        children: [(0, R.jsx)("div", {
                            className: (0, o.Z)(eB().container, eB().streamChat, t && eB().displayAboveModals),
                            children: i && a ? l ? (0, R.jsx)("div", {
                                className: eB().infoMessage,
                                children: "Something went wrong"
                            }) : (0, R.jsx)(d.e, {
                                client: a,
                                children: (0, R.jsx)(m.$, {
                                    channel: s,
                                    EmojiPicker: H,
                                    Input: ef,
                                    Message: () => (0, R.jsx)(A, {
                                        attemptBlockUser: p,
                                        attemptBanUser: f,
                                        openUserProfile: r
                                    }),
                                    AutocompleteSuggestionHeader: eR,
                                    AutocompleteSuggestionItem: Y,
                                    AutocompleteSuggestionList: ee,
                                    MessageSystem: eT,
                                    children: (0, R.jsx)(ez, {
                                        isOpen: n,
                                        onAnimationComplete: x
                                    })
                                })
                            }) : (0, R.jsx)("div", {
                                className: eB().infoMessage,
                                children: "Loading chat..."
                            })
                        }), (0, R.jsx)(v.w, {
                            blockTarget: u,
                            handleClose: () => p(null)
                        }), (0, R.jsx)(v.i, {
                            banTarget: h,
                            handleClose: () => f(null)
                        })]
                    })
                })
        },
        93700: function(e, t, n) {
            "use strict";
            n.d(t, {
                h: function() {
                    return d
                }
            });
            var r = n(95235),
                a = n(25291),
                s = n.n(a),
                o = n(2784),
                i = n(1366),
                l = n(10381),
                c = n(52322);

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
            let p = (0, o.lazy)(() => Promise.all([n.e(4741), n.e(9414)]).then(n.bind(n, 99414)).then(e => ({
                    default: e.default
                }))),
                h = s()(async () => (await n.e(3922).then(n.t.bind(n, 72126, 19))).default),
                d = e => (0, c.jsx)(o.Suspense, {
                    fallback: null,
                    children: (0, c.jsx)(i.Op, {
                        as: "div",
                        id: l.C.EmojiPicker,
                        children: (0, c.jsx)(p, function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? u(Object(n), !0).forEach(function(t) {
                                    (0, r.Z)(e, t, n[t])
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function(t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                                })
                            }
                            return e
                        }({
                            data: async () => {
                                let e = await h();
                                return e
                            }
                        }, e))
                    })
                })
        },
        21063: function(e) {
            e.exports = {
                container: "suggestion-item_container__9anQu"
            }
        },
        67972: function(e) {
            e.exports = {
                container: "suggestion-list_container__r_54K"
            }
        },
        65557: function(e) {
            e.exports = {
                container: "chat-input_container__iPDzw",
                buttonsContainer: "chat-input_buttonsContainer__uairP",
                actionButton: "chat-input_actionButton__QDTi2",
                tooltip: "chat-input_tooltip__SV7mQ",
                emojiPicker: "chat-input_emojiPicker__x7eMJ",
                redDot: "chat-input_redDot__aq_hq"
            }
        },
        6937: function(e) {
            e.exports = {
                avatarCustomizationPanelWidth: "400",
                transitionHiddenDuration: "200",
                showOverflowMenuButton: "chat-message_showOverflowMenuButton__i7UsQ",
                container: "chat-message_container__a0x_y",
                overflowMenuOpen: "chat-message_overflowMenuOpen__fmSBZ",
                blockedOrBanned: "chat-message_blockedOrBanned__Hx_iK",
                transparentBackground: "chat-message_transparentBackground__fx9LR",
                whiteBackground: "chat-message_whiteBackground__I_4oM",
                messageText: "chat-message_messageText__zakta",
                name: "chat-message_name__TQZWa",
                timestamp: "chat-message_timestamp__QN7rx",
                avatarContainer: "chat-message_avatarContainer__QiqRr",
                avatar: "chat-message_avatar__6xRBr",
                topRightBar: "chat-message_topRightBar__uAgt1",
                overflowMenuContent: "chat-message_overflowMenuContent__Yprjp",
                overflowMenuButton: "chat-message_overflowMenuButton__72uPy",
                redText: "chat-message_redText___30hA"
            }
        },
        63524: function(e) {
            e.exports = {
                avatarCustomizationPanelWidth: "400",
                transitionHiddenDuration: "200",
                streamChat: "chat_streamChat__5_kY5",
                transitionComponent: "chat_transitionComponent__nT_bo",
                container: "chat_container__iVxW8",
                displayAboveModals: "chat_displayAboveModals__LJhVL",
                infoMessage: "chat_infoMessage__WZeHv"
            }
        }
    }
]);
//# sourceMappingURL=chat-panel.8a2fa517e20163f8.js.map