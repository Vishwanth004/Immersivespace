(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6989], {
        32982: function(e, n, t) {
            "use strict";
            t.d(n, {
                Q: function() {
                    return p
                },
                WT: function() {
                    return m
                },
                cE: function() {
                    return u
                }
            });
            var o = t(95235),
                s = t(58943),
                l = t(55830),
                a = t(99771),
                i = t(22382),
                r = t(96441);

            function c(e, n) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    n && (o = o.filter(function(n) {
                        return Object.getOwnPropertyDescriptor(e, n).enumerable
                    })), t.push.apply(t, o)
                }
                return t
            }

            function d(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = null != arguments[n] ? arguments[n] : {};
                    n % 2 ? c(Object(t), !0).forEach(function(n) {
                        (0, o.Z)(e, n, t[n])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : c(Object(t)).forEach(function(n) {
                        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                    })
                }
                return e
            }
            let u = e => (0, s.a)(["getUnlockablesConfig"], async () => {
                    let n = await i.Z.get(`${e}/unlockables/unlockable_requirements.json`);
                    return n.data
                }, {
                    cacheTime: 1 / 0,
                    staleTime: 1 / 0
                }),
                m = (e, n) => {
                    let t = (0, l.NL)();
                    return (0, a.D)(e.unlockables.registerUnlockable, d({
                        onSuccess: async e => {
                            let n = await (0, r.WK)(t, n => d(d({}, n), {}, {
                                unlockables: e.unlockables
                            }));
                            return {
                                previousUserProfile: n
                            }
                        }
                    }, n))
                },
                p = (e, n) => {
                    let t = (0, l.NL)();
                    return (0, a.D)(e.unlockables.markRead, d({
                        onMutate: async e => {
                            let {
                                unlockableId: n
                            } = e, o = await (0, r.WK)(t, e => {
                                let t = d({}, e.unlockables);
                                return null != t && t[n] ? (t[n] = d(d({}, t[n]), {}, {
                                    unlocks: t[n].unlocks.map(e => d(d({}, e), {}, {
                                        read: !0
                                    }))
                                }), d(d({}, e), {}, {
                                    unlockables: t
                                })) : e
                            });
                            return {
                                previousUserProfile: o
                            }
                        }
                    }, n))
                }
        },
        64650: function(e, n, t) {
            "use strict";
            t.r(n), t.d(n, {
                GlobalModals: function() {
                    return en
                }
            });
            var o = t(2784),
                s = t(1366),
                l = t(10381),
                a = t(38776),
                i = t(44944),
                r = t(57655),
                c = t(3349),
                d = t(80206),
                u = t.n(d),
                m = t(52322);
            let p = (0, o.lazy)(() => t.e(5562).then(t.bind(t, 28134)).then(e => ({
                    default: e.LoginModalContent
                }))),
                b = () => {
                    let {
                        isAuthenticated: e,
                        isAuthless: n
                    } = (0, a.F_)(), t = (0, a.bp)(e => i.aC.getLoginModal(e.state)), d = (0, a.bp)(e => e.actions), b = (0, o.useCallback)(() => {
                        d.closeModal(r.c3.Login)
                    }, [d]);
                    return (0, m.jsx)(c.u, {
                        darkOverlay: !0,
                        isOpen: !!t && (!e || n),
                        onRequestClose: b,
                        overlayAdditionalBaseClass: u().loginModal,
                        children: (0, m.jsx)(o.Suspense, {
                            fallback: null,
                            children: (0, m.jsx)(s.Op, {
                                id: l.C.LoginModal,
                                children: (0, m.jsx)(p, {
                                    forceRedirect: null == t ? void 0 : t.payload.forceRedirect,
                                    label: null == t ? void 0 : t.payload.titleCta,
                                    onRequestClose: b
                                })
                            })
                        })
                    })
                };
            var f = t(77141);
            let h = (0, o.lazy)(() => t.e(5505).then(t.bind(t, 76326)).then(e => ({
                    default: e.BannedModalContents
                }))),
                k = (0, o.memo)(function() {
                    let {
                        isBanned: e,
                        bannedUntilUnixMs: n
                    } = (0, a.bp)(e => e.state.banned), {
                        setBanned: t
                    } = (0, a.bp)(e => e.actions), s = (0, o.useCallback)(() => t(f.du), [t]);
                    return (0, m.jsx)(c.u, {
                        isOpen: e,
                        darkOverlay: !0,
                        onRequestClose: s,
                        children: (0, m.jsx)(o.Suspense, {
                            fallback: null,
                            children: (0, m.jsx)(h, {
                                bannedUntilUnixMs: n,
                                onRequestClose: s
                            })
                        })
                    })
                });
            var j = t(52433),
                _ = t(68561),
                x = t(34978),
                g = t.n(x);
            let v = (0, o.lazy)(() => Promise.all([t.e(4185), t.e(9611), t.e(7916), t.e(9498), t.e(6887), t.e(4597)]).then(t.bind(t, 68848)).then(e => ({
                    default: e.CreateSpace
                }))),
                y = () => {
                    let e = (0, a.bp)(e => e.actions),
                        n = (0, a.bp)(e => !!e.state.spaceToCreate),
                        t = (0, a.bp)(e => {
                            var n;
                            return (null === (n = i.aC.getOpenModal(e.state)) || void 0 === n ? void 0 : n.type) === r.c3.CreateSpace
                        }),
                        s = (0, o.useCallback)(() => {
                            e.closeModal(r.c3.CreateSpace)
                        }, [e]);
                    return (0, m.jsx)(c.u, {
                        darkOverlay: !0,
                        isOpen: t,
                        onRequestClose: s,
                        shouldCloseOnEsc: !n,
                        shouldCloseOnOverlayClick: !n,
                        children: (0, m.jsxs)("div", {
                            className: g().container,
                            children: [(0, m.jsx)(o.Suspense, {
                                fallback: null,
                                children: (0, m.jsx)(_.n, {
                                    children: (0, m.jsx)(v, {})
                                })
                            }), (0, m.jsx)(j.P, {
                                disabled: n,
                                onClick: s
                            })]
                        })
                    })
                };
            var C = t(45635),
                O = t(13588),
                N = t(69529),
                R = t(57642),
                w = t.n(R);
            let I = (0, o.lazy)(() => t.e(39).then(t.bind(t, 28139)).then(e => ({
                    default: e.DebugSettings
                }))),
                P = (0, o.memo)(function() {
                    var e;
                    let n = (null === (e = (0, a.bp)(e => i.aC.getOpenModal(e.state))) || void 0 === e ? void 0 : e.type) === r.c3.Debug,
                        t = (0, a.bp)(e => () => e.actions.closeModal(r.c3.Debug)),
                        [s, l] = (0, O.k)(!1),
                        d = (0, o.useCallback)(() => {
                            s && window.location.reload()
                        }, [s]);
                    return (0, m.jsx)(c.u, {
                        darkOverlay: !0,
                        onAfterClose: d,
                        isOpen: n,
                        onRequestClose: t,
                        overlayAdditionalBaseClass: w().zIndex,
                        children: (0, m.jsx)(o.Suspense, {
                            fallback: null,
                            children: (0, m.jsxs)("div", {
                                className: w().modalBody,
                                children: [(0, m.jsx)("button", {
                                    type: "button",
                                    onClick: t,
                                    className: w().closeButton,
                                    children: (0, m.jsx)(C.r, {})
                                }), (0, m.jsx)(N.X, {
                                    size: "h2",
                                    weight: "black",
                                    textAlign: "center",
                                    className: "py-4",
                                    children: s ? "Page will refresh on close" : "Debug Settings"
                                }), (0, m.jsx)(I, {
                                    setRefreshNeeded: l.setTrue
                                })]
                            })
                        })
                    })
                });
            var S = t(40870),
                D = t.n(S);
            let M = (0, o.lazy)(() => Promise.all([t.e(8421), t.e(4636)]).then(t.bind(t, 81e3)).then(e => ({
                    default: e.NotificationPermissionModalContent
                }))),
                T = (0, o.memo)(function() {
                    let e = (0, a.bp)(e => e.state.pushNotificationPermissionModalType),
                        n = (0, a.bp)(e => e.actions);
                    return (0, m.jsx)(c.u, {
                        isOpen: e !== f.AK.None,
                        modalBaseClass: c.H.base,
                        overlayAdditionalBaseClass: D().overlay,
                        onRequestClose: n.dismissPushNotificationPermission,
                        darkOverlay: !0,
                        children: (0, m.jsx)(o.Suspense, {
                            fallback: null,
                            children: (0, m.jsx)(s.Op, {
                                id: l.C.NotificationPermissionModal,
                                properties: {
                                    "Modal Type": f.AK[e]
                                },
                                children: (0, m.jsx)(M, {
                                    type: e,
                                    onDismiss: n.dismissPushNotificationPermission,
                                    onConfirm: n.acceptPushNotificationPermission
                                })
                            })
                        })
                    })
                }),
                z = (0, o.lazy)(() => t.e(4465).then(t.bind(t, 5202)).then(e => ({
                    default: e.ReportSpaceMenu
                }))),
                q = (0, o.memo)(function() {
                    let e = (0, a.bp)(e => {
                            var n;
                            return (null === (n = i.aC.getOpenModal(e.state)) || void 0 === n ? void 0 : n.type) === r.c3.ReportSpace
                        }),
                        n = (0, a.bp)(e => () => e.actions.closeModal(r.c3.ReportSpace)),
                        t = (0, a.bp)(e => i.aC.getReportSpaceModal(e.state));
                    return (0, m.jsx)(c.u, {
                        darkOverlay: !0,
                        isOpen: e,
                        onRequestClose: n,
                        children: (0, m.jsx)(s.Op, {
                            id: l.C.ReportSpaceModal,
                            children: (0, m.jsx)(o.Suspense, {
                                fallback: null,
                                children: (0, m.jsx)(z, {
                                    onExit: n,
                                    spaceID: null == t ? void 0 : t.payload.spaceID,
                                    spaceName: null == t ? void 0 : t.payload.spaceName
                                })
                            })
                        })
                    })
                });
            var B = t(6277),
                E = t(39097),
                A = t.n(E),
                V = t(99300),
                U = t.n(V),
                G = t(78025),
                F = t(88438),
                W = t.n(F);
            let L = (0, o.memo)(function(e) {
                    var n;
                    let {
                        tokenGatedRoomConfig: t,
                        roomName: o,
                        hasWallet: s,
                        onRequestClose: l
                    } = e, a = t ? `https://opensea.io/assets/${t.blockchainIdentifier}/${t.contractAddress}/${t.anyToken?1:t.tokenID}` : "https://opensea.io", i = null !== (n = null == t ? void 0 : t.purchaseLink) && void 0 !== n ? n : a;
                    return (0, m.jsxs)("div", {
                        className: (0, B.Z)(U().body, W().container),
                        children: [(0, m.jsxs)("div", {
                            children: [(0, m.jsx)("div", {
                                className: W().roomName,
                                children: o
                            }), (0, m.jsx)("div", {
                                children: "is exclusive for token owners"
                            })]
                        }), t && (0, m.jsxs)(m.Fragment, {
                            children: [(0, m.jsx)("div", {
                                className: W().accessRequirements,
                                children: "Access Requirement"
                            }), (0, m.jsxs)("div", {
                                className: W().tokenInfoBody,
                                children: [t.tokenName ? (0, m.jsxs)("div", {
                                    className: W().tokenInfoRow,
                                    children: [(0, m.jsx)("div", {
                                        className: W().tokenInfoTitle,
                                        children: "Name of NFT"
                                    }), (0, m.jsx)("div", {
                                        className: W().tokenInfoValue,
                                        children: `${t.tokenName}`
                                    })]
                                }) : (0, m.jsxs)(m.Fragment, {
                                    children: [(0, m.jsxs)("div", {
                                        className: W().tokenInfoRow,
                                        children: [(0, m.jsx)("div", {
                                            className: W().tokenInfoTitle,
                                            children: "Blockchain"
                                        }), (0, m.jsx)("div", {
                                            className: W().tokenInfoValue,
                                            children: t.blockchainIdentifier
                                        })]
                                    }), (0, m.jsx)("hr", {}), (0, m.jsxs)("div", {
                                        className: W().tokenInfoRow,
                                        children: [(0, m.jsx)("div", {
                                            className: W().tokenInfoTitle,
                                            children: "Contract Address"
                                        }), (0, m.jsx)("div", {
                                            className: W().tokenInfoValue,
                                            children: t.contractAddress
                                        })]
                                    }), (0, m.jsx)("hr", {}), !t.anyToken && (0, m.jsxs)("div", {
                                        className: W().tokenInfoRow,
                                        children: [(0, m.jsx)("div", {
                                            className: W().tokenInfoTitle,
                                            children: "TokenID"
                                        }), (0, m.jsx)("div", {
                                            className: W().tokenInfoValue,
                                            children: t.tokenID
                                        })]
                                    })]
                                }), (0, m.jsx)("hr", {}), (0, m.jsxs)("div", {
                                    className: W().tokenInfoRow,
                                    children: [(0, m.jsx)("div", {
                                        className: W().tokenInfoTitle,
                                        children: "Minimum Quantity"
                                    }), (0, m.jsx)("div", {
                                        className: W().tokenInfoValue,
                                        children: `${t.quantity}`
                                    })]
                                })]
                            }), !s && (0, m.jsx)("div", {
                                className: W().connectWalletDialog,
                                children: "Connect your wallet and verify your token"
                            }), (0, m.jsx)("div", {
                                className: "flex justify-evenly pt-4",
                                children: s ? (0, m.jsx)(G.z, {
                                    className: "min-w-[250px]",
                                    as: "a",
                                    href: i,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    size: "xl",
                                    children: "Purchase Token"
                                }) : (0, m.jsx)(G.z, {
                                    className: "min-w-[250px]",
                                    as: A(),
                                    href: "/integrations",
                                    size: "xl",
                                    children: "Connect Wallet"
                                })
                            })]
                        }), (0, m.jsx)("div", {
                            className: "flex justify-evenly pt-4",
                            children: (0, m.jsx)(G.z, {
                                className: "min-w-[250px]",
                                color: "white",
                                size: "xl",
                                onClick: l,
                                children: "Close"
                            })
                        })]
                    })
                }),
                H = (0, o.memo)(function() {
                    let e = (0, a.bp)(e => e.actions),
                        {
                            isTokenGatedFromRoom: n,
                            tokenGatedRoomConfig: t,
                            tokenGatedRoomName: s,
                            tokenGatedUserHasWallet: l
                        } = (0, a.bp)(e => e.state.tokenGate),
                        i = (0, o.useCallback)(() => {
                            e.setTokenGate({
                                isTokenGatedFromRoom: !1,
                                tokenGatedRoomConfig: null,
                                tokenGatedUserHasWallet: !1
                            })
                        }, [e]);
                    return (0, m.jsx)(c.u, {
                        isOpen: n,
                        darkOverlay: !0,
                        onRequestClose: i,
                        shouldCloseOnEsc: !1,
                        shouldCloseOnOverlayClick: !1,
                        children: (0, m.jsx)(L, {
                            tokenGatedRoomConfig: t,
                            roomName: s,
                            hasWallet: l,
                            onRequestClose: i
                        })
                    })
                });
            var Z = t(96441),
                Q = t(32982),
                $ = t(4322),
                K = t(54537),
                X = t(83790),
                Y = t.n(X);
            let J = (0, o.lazy)(() => t.e(6886).then(t.bind(t, 97678)).then(e => ({
                    default: e.DanceStreakModalContent
                }))),
                ee = (0, o.memo)(function() {
                    var e, n;
                    let {
                        isAuthenticated: t
                    } = (0, a.F_)(), {
                        data: d
                    } = (0, Z.UE)(K.zt, t), {
                        mutate: u
                    } = (0, Q.Q)(K.GR), p = null == d ? void 0 : null === (e = d.unlockables) || void 0 === e ? void 0 : null === (n = e[$.R]) || void 0 === n ? void 0 : n.unlocks.some(e => !1 === e.read), b = (0, a.bp)(e => {
                        var n;
                        return (null === (n = i.aC.getOpenModal(e.state)) || void 0 === n ? void 0 : n.type) === r.c3.UnlockableDanceStreak
                    }), f = (0, a.bp)(e => e.actions), h = (0, o.useCallback)(() => {
                        f.closeModal(r.c3.UnlockableDanceStreak), p && u({
                            unlockableId: $.R
                        })
                    }, [f, p, u]);
                    return (0, m.jsx)(c.u, {
                        darkOverlay: !0,
                        isOpen: b || p,
                        onRequestClose: h,
                        overlayAdditionalBaseClass: Y().overlay,
                        children: (0, m.jsx)(o.Suspense, {
                            fallback: null,
                            children: (0, m.jsx)(s.Op, {
                                id: l.C.UnlockableDanceStreakModal,
                                children: (0, m.jsx)(J, {
                                    onRequestClose: h
                                })
                            })
                        })
                    })
                }),
                en = (0, o.memo)(function() {
                    return (0, m.jsxs)(m.Fragment, {
                        children: [(0, m.jsx)(k, {}), (0, m.jsx)(H, {}), (0, m.jsx)(T, {}), (0, m.jsx)(P, {}), (0, m.jsx)(b, {}), (0, m.jsx)(ee, {}), (0, m.jsx)(y, {}), (0, m.jsx)(q, {})]
                    })
                })
        },
        4322: function(e, n, t) {
            "use strict";
            t.d(n, {
                R: function() {
                    return o
                }
            });
            let o = "DanceStreak"
        },
        68561: function(e, n, t) {
            "use strict";
            t.d(n, {
                n: function() {
                    return v
                }
            });
            var o = t(95235),
                s = t(39097),
                l = t.n(s),
                a = t(2784),
                i = t(96441),
                r = t(38776),
                c = t(61351),
                d = t(12831),
                u = t(3349),
                m = t(62718),
                p = t(14420);
            let b = e => e.permissions.includes(p.Gm.CAN_ACCESS_ADMIN_PAGE);
            var f = t(54537),
                h = t(43186),
                k = t(2185),
                j = t.n(k),
                _ = t(52322);

            function x(e, n) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    n && (o = o.filter(function(n) {
                        return Object.getOwnPropertyDescriptor(e, n).enumerable
                    })), t.push.apply(t, o)
                }
                return t
            }
            let g = (0, a.memo)(function(e) {
                    let {
                        children: n,
                        requiresAdmin: t,
                        requiresOnboarded: o
                    } = e, {
                        isAuthenticated: s
                    } = (0, r.F_)(), a = (0, i.UE)(f.zt, s);
                    return ((0, m.f)(o), a.data) ? t && !b(a.data) ? (0, _.jsx)(u.u, {
                        isOpen: !0,
                        darkOverlay: !0,
                        children: (0, _.jsxs)("div", {
                            className: "modal-body text-center",
                            children: [(0, _.jsx)("div", {
                                children: "You must be an admin view this content."
                            }), (0, _.jsx)("div", {
                                className: "modal-cta",
                                children: (0, _.jsx)(l(), {
                                    href: "/",
                                    children: "Home"
                                })
                            })]
                        })
                    }) : o && "COMPLETE" !== a.data.accountCompletionStatus ? null : n : a.error ? (0, _.jsxs)("div", {
                        className: j().error,
                        children: ["Sorry, something went wrong while fetching your profile. Try refreshing the page, or logging in again.", (0, _.jsx)(l(), {
                            href: "/logout",
                            className: j().logout,
                            children: "Logout"
                        })]
                    }) : (0, _.jsx)(h.l, {
                        variant: "fancy",
                        color: "black"
                    })
                }),
                v = (0, a.memo)(function(e) {
                    let {
                        AuthFallbackComponent: n = c.ui
                    } = e;
                    return (0, _.jsx)(d.W, {
                        FallbackComponent: n,
                        children: (0, _.jsx)(g, function(e) {
                            for (var n = 1; n < arguments.length; n++) {
                                var t = null != arguments[n] ? arguments[n] : {};
                                n % 2 ? x(Object(t), !0).forEach(function(n) {
                                    (0, o.Z)(e, n, t[n])
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : x(Object(t)).forEach(function(n) {
                                    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                                })
                            }
                            return e
                        }({}, e))
                    })
                })
        },
        80206: function(e) {
            e.exports = {
                loginModal: "login-modal_loginModal__hFt0D"
            }
        },
        34978: function(e) {
            e.exports = {
                container: "create-space-modal_container__i7Ur6"
            }
        },
        57642: function(e) {
            e.exports = {
                zIndex: "debug-settings_zIndex__c_qc4",
                modal: "debug-settings_modal__mnHU3",
                modalBody: "debug-settings_modalBody__tGEQz modal_body__wXjnH",
                subtitle: "debug-settings_subtitle__2Z51Q",
                optionRow: "debug-settings_optionRow__CVU8T",
                label: "debug-settings_label__XvRi8",
                selectDropdown: "debug-settings_selectDropdown__V6i6w",
                closeButton: "debug-settings_closeButton__v_Do3",
                unityVersionContents: "debug-settings_unityVersionContents__NmBP1",
                unityVersionInput: "debug-settings_unityVersionInput__yrn1t",
                unityVersionCtas: "debug-settings_unityVersionCtas__TGu5r",
                button: "debug-settings_button__2kClB",
                inline: "debug-settings_inline__zlgc5",
                buildRow: "debug-settings_buildRow__MP2iE",
                buildInfo: "debug-settings_buildInfo__Nyx_3",
                buildSize: "debug-settings_buildSize__STFgj"
            }
        },
        40870: function(e) {
            e.exports = {
                overlay: "notification-permission-modal_overlay__LaY7W",
                modalBody: "notification-permission-modal_modalBody__yYZ4v"
            }
        },
        88438: function(e) {
            e.exports = {
                container: "token-gated-room-modal_container__1ZTpm",
                roomName: "token-gated-room-modal_roomName__M8vQx",
                accessRequirements: "token-gated-room-modal_accessRequirements__e3EjJ",
                tokenInfoBody: "token-gated-room-modal_tokenInfoBody__kPya_",
                tokenInfoRow: "token-gated-room-modal_tokenInfoRow__R_GUH",
                tokenInfoTitle: "token-gated-room-modal_tokenInfoTitle__roO1R",
                tokenInfoValue: "token-gated-room-modal_tokenInfoValue__yk7Jg",
                connectWalletDialog: "token-gated-room-modal_connectWalletDialog__iikCc"
            }
        },
        83790: function(e) {
            e.exports = {
                overlay: "dance-streak-modal_overlay__9IboC"
            }
        },
        2185: function(e) {
            e.exports = {
                error: "requires-user_error__HAR7V",
                logout: "requires-user_logout__sx9Bh"
            }
        }
    }
]);
//# sourceMappingURL=global-modals.397e00cb0c545662.js.map