"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3755], {
        42782: function(e, t, n) {
            n.d(t, {
                c8: function() {
                    return eS
                },
                t1: function() {
                    return j
                }
            });
            var r, s, i, a, o = n(95766),
                c = n(20321),
                u = n(15650),
                l = n(52860),
                h = n(95153),
                d = n(20250),
                p = n(55102),
                f = n(50772),
                v = n(95397),
                g = n(66903),
                m = n.n(g),
                y = n(50768),
                b = n.n(y),
                w = n(86529),
                k = n(61688),
                _ = n.n(k),
                x = n(97475),
                C = n.n(x),
                Z = n(28888),
                S = n(4376),
                U = n(42538),
                R = n(38092),
                M = n(93236),
                E = n(48834).Buffer,
                I = n(34406);

            function O(e) {
                return "string" == typeof e
            }
            var L = function(e) {
                var t, n, r, s = {},
                    i = String.fromCharCode,
                    a = e.length,
                    o = 0,
                    c = 0,
                    u = "",
                    l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for (t = 0; t < 64; t++) s[l.charAt(t)] = t;
                for (n = 0; n < a; n++)
                    for (o = (o << 6) + s[e.charAt(n)], c += 6; c >= 8;)((r = o >>> (c -= 8) & 255) || n < a - 2) && (u += i(r));
                return u
            };

            function D(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function T(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? D(Object(n), !0).forEach(function(t) {
                        (0, v.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : D(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            var P = function() {
                var e;

                function t(e) {
                    var n, r = this;
                    (0, p.Z)(this, t), (0, v.Z)(this, "_channel", void 0), (0, v.Z)(this, "watcher_count", void 0), (0, v.Z)(this, "typing", void 0), (0, v.Z)(this, "read", void 0), (0, v.Z)(this, "pinnedMessages", void 0), (0, v.Z)(this, "pending_messages", void 0), (0, v.Z)(this, "threads", void 0), (0, v.Z)(this, "mutedUsers", void 0), (0, v.Z)(this, "watchers", void 0), (0, v.Z)(this, "members", void 0), (0, v.Z)(this, "unreadCount", void 0), (0, v.Z)(this, "membership", void 0), (0, v.Z)(this, "last_message_at", void 0), (0, v.Z)(this, "isUpToDate", void 0), (0, v.Z)(this, "messageSets", []), (0, v.Z)(this, "setIsUpToDate", function(e) {
                        r.isUpToDate = e
                    }), (0, v.Z)(this, "removeMessageFromArray", function(e, t) {
                        var n = e.filter(function(e) {
                            return !(e.id && t.id && e.id === t.id)
                        });
                        return {
                            removed: n.length < e.length,
                            result: n
                        }
                    }), (0, v.Z)(this, "updateUserMessages", function(e) {
                        var t = function(e, t) {
                            for (var n = 0; n < e.length; n++) {
                                var r, s = e[n];
                                (null === (r = s.user) || void 0 === r ? void 0 : r.id) === t.id && (e[n] = T(T({}, s), {}, {
                                    user: t
                                }))
                            }
                        };
                        for (var n in r.messageSets.forEach(function(n) {
                                return t(n.messages, e)
                            }), r.threads) t(r.threads[n], e);
                        t(r.pinnedMessages, e)
                    }), (0, v.Z)(this, "deleteUserMessages", function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            n = function(e, t) {
                                for (var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = 0; r < e.length; r++) {
                                    var s, i = e[r];
                                    (null === (s = i.user) || void 0 === s ? void 0 : s.id) === t.id && (n ? e[r] = {
                                        cid: i.cid,
                                        created_at: i.created_at,
                                        deleted_at: t.deleted_at,
                                        id: i.id,
                                        latest_reactions: [],
                                        mentioned_users: [],
                                        own_reactions: [],
                                        parent_id: i.parent_id,
                                        reply_count: i.reply_count,
                                        status: i.status,
                                        thread_participants: i.thread_participants,
                                        type: "deleted",
                                        updated_at: i.updated_at,
                                        user: i.user
                                    } : e[r] = T(T({}, i), {}, {
                                        type: "deleted",
                                        deleted_at: t.deleted_at
                                    }))
                                }
                            };
                        for (var s in r.messageSets.forEach(function(r) {
                                return n(r.messages, e, t)
                            }), r.threads) n(r.threads[s], e, t);
                        n(r.pinnedMessages, e, t)
                    }), this._channel = e, this.watcher_count = 0, this.typing = {}, this.read = {}, this.initMessages(), this.pinnedMessages = [], this.pending_messages = [], this.threads = {}, this.mutedUsers = [], this.watchers = {}, this.members = {}, this.membership = {}, this.unreadCount = 0, this.isUpToDate = !0, this.last_message_at = (null == e ? void 0 : null === (n = e.state) || void 0 === n ? void 0 : n.last_message_at) != null ? new Date(e.state.last_message_at) : null
                }
                return (0, f.Z)(t, [{
                    key: "messages",
                    get: function() {
                        var e;
                        return (null === (e = this.messageSets.find(function(e) {
                            return e.isCurrent
                        })) || void 0 === e ? void 0 : e.messages) || []
                    },
                    set: function(e) {
                        var t = this.messageSets.findIndex(function(e) {
                            return e.isCurrent
                        });
                        this.messageSets[t].messages = e
                    }
                }, {
                    key: "latestMessages",
                    get: function() {
                        var e;
                        return (null === (e = this.messageSets.find(function(e) {
                            return e.isLatest
                        })) || void 0 === e ? void 0 : e.messages) || []
                    },
                    set: function(e) {
                        var t = this.messageSets.findIndex(function(e) {
                            return e.isLatest
                        });
                        this.messageSets[t].messages = e
                    }
                }, {
                    key: "addMessageSorted",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            n = !(arguments.length > 2) || void 0 === arguments[2] || arguments[2],
                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "latest";
                        return this.addMessagesSorted([e], t, !1, n, r)
                    }
                }, {
                    key: "formatMessage",
                    value: function(e) {
                        return T(T({}, e), {}, {
                            __html: e.html,
                            pinned_at: e.pinned_at ? new Date(e.pinned_at) : null,
                            created_at: e.created_at ? new Date(e.created_at) : new Date,
                            updated_at: e.updated_at ? new Date(e.updated_at) : new Date,
                            status: e.status || "received"
                        })
                    }
                }, {
                    key: "addMessagesSorted",
                    value: function(e) {
                        for (var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = !(arguments.length > 3) || void 0 === arguments[3] || arguments[3], s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "current", i = this.findTargetMessageSet(e, r, s), a = i.messagesToAdd, o = i.targetMessageSetIndex, c = 0; c < a.length; c += 1)
                            if (!a[c].shadowed) {
                                var u, l = a[c].created_at instanceof Date,
                                    h = void 0;
                                l ? h = a[c] : ((h = this.formatMessage(a[c])).user && null !== (u = this._channel) && void 0 !== u && u.cid && this._channel.getClient().state.updateUserReference(h.user, this._channel.cid), n && h.id && this.threads[h.id] && delete this.threads[h.id], this.last_message_at || (this.last_message_at = new Date(h.created_at.getTime())), h.created_at.getTime() > this.last_message_at.getTime() && (this.last_message_at = new Date(h.created_at.getTime())));
                                var d = h.parent_id;
                                if ((!d || h.show_in_channel) && -1 !== o && (this.messageSets[o].messages = this._addToMessageList(this.messageSets[o].messages, h, t, "created_at", r)), d && !n) {
                                    var p = this.threads[d] || [],
                                        f = this._addToMessageList(p, h, t, "created_at", r);
                                    this.threads[d] = f
                                }
                            }
                        return {
                            messageSet: this.messageSets[o]
                        }
                    }
                }, {
                    key: "addPinnedMessages",
                    value: function(e) {
                        for (var t = 0; t < e.length; t += 1) this.addPinnedMessage(e[t])
                    }
                }, {
                    key: "addPinnedMessage",
                    value: function(e) {
                        this.pinnedMessages = this._addToMessageList(this.pinnedMessages, this.formatMessage(e), !1, "pinned_at")
                    }
                }, {
                    key: "removePinnedMessage",
                    value: function(e) {
                        var t = this.removeMessageFromArray(this.pinnedMessages, e).result;
                        this.pinnedMessages = t
                    }
                }, {
                    key: "addReaction",
                    value: function(e, t, n) {
                        var r = this;
                        if (t) {
                            var s = t;
                            return this._updateMessage(t, function(t) {
                                return s.own_reactions = r._addOwnReactionToMessage(t.own_reactions, e, n), r.formatMessage(s)
                            }), s
                        }
                    }
                }, {
                    key: "_addOwnReactionToMessage",
                    value: function(e, t, n) {
                        return e = (e = n ? [] : this._removeOwnReactionFromMessage(e, t)) || [], this._channel.getClient().userID === t.user_id && e.push(t), e
                    }
                }, {
                    key: "_removeOwnReactionFromMessage",
                    value: function(e, t) {
                        return e ? e.filter(function(e) {
                            return e.user_id !== t.user_id || e.type !== t.type
                        }) : e
                    }
                }, {
                    key: "removeReaction",
                    value: function(e, t) {
                        var n = this;
                        if (t) {
                            var r = t;
                            return this._updateMessage(t, function(t) {
                                return r.own_reactions = n._removeOwnReactionFromMessage(t.own_reactions, e), n.formatMessage(r)
                            }), r
                        }
                    }
                }, {
                    key: "removeQuotedMessageReferences",
                    value: function(e) {
                        var t = this,
                            n = function(e) {
                                var t, n;
                                return T(T({}, e), {}, {
                                    created_at: e.created_at.toString(),
                                    pinned_at: null === (t = e.pinned_at) || void 0 === t ? void 0 : t.toString(),
                                    updated_at: null === (n = e.updated_at) || void 0 === n ? void 0 : n.toString()
                                })
                            };
                        this.messageSets.forEach(function(r) {
                            var s = r.messages.filter(function(t) {
                                return t.quoted_message_id === e.id
                            }).map(n).map(function(t) {
                                return T(T({}, t), {}, {
                                    quoted_message: T(T({}, e), {}, {
                                        attachments: []
                                    })
                                })
                            });
                            t.addMessagesSorted(s, !0)
                        })
                    }
                }, {
                    key: "_updateMessage",
                    value: function(e, t) {
                        var n = e.parent_id,
                            r = e.show_in_channel,
                            s = e.pinned;
                        if (n && this.threads[n]) {
                            var i = this.threads[n],
                                a = i.findIndex(function(t) {
                                    return t.id === e.id
                                }); - 1 !== a && (i[a] = t(i[a]), this.threads[n] = i)
                        }
                        if (!r && !n || r) {
                            var o = this.findMessageSetIndex(e);
                            if (-1 !== o) {
                                var c = this.messageSets[o].messages.findIndex(function(t) {
                                    return t.id === e.id
                                }); - 1 !== c && (this.messageSets[o].messages[c] = t(this.messageSets[o].messages[c]))
                            }
                        }
                        if (s) {
                            var u = this.pinnedMessages.findIndex(function(t) {
                                return t.id === e.id
                            }); - 1 !== u && (this.pinnedMessages[u] = t(this.pinnedMessages[u]))
                        }
                    }
                }, {
                    key: "_addToMessageList",
                    value: function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "created_at",
                            s = !(arguments.length > 4) || void 0 === arguments[4] || arguments[4],
                            i = s || n,
                            a = e;
                        n && (a = a.filter(function(e) {
                            return !(e.id && t.id === e.id)
                        }));
                        var o = a.length;
                        if (0 === o && i) return a.concat(t);
                        if (0 === o) return (0, h.Z)(a);
                        var c = t[r].getTime(),
                            u = a[o - 1][r].getTime() < c;
                        if (u && i) return a.concat(t);
                        if (u) return (0, h.Z)(a);
                        for (var l = 0, d = 0, p = o - 1; l <= p;) a[d = Math.floor((p + l) / 2)][r].getTime() <= c ? l = d + 1 : p = d - 1;
                        if (!n && t.id) {
                            if (a[l] && t.id === a[l].id) return a[l] = t, (0, h.Z)(a);
                            if (a[l - 1] && t.id === a[l - 1].id) return a[l - 1] = t, (0, h.Z)(a)
                        }
                        return i && a.splice(l, 0, t), (0, h.Z)(a)
                    }
                }, {
                    key: "removeMessage",
                    value: function(e) {
                        var t = !1;
                        if (e.parent_id && this.threads[e.parent_id]) {
                            var n = this.removeMessageFromArray(this.threads[e.parent_id], e),
                                r = n.removed,
                                s = n.result;
                            this.threads[e.parent_id] = s, t = r
                        } else {
                            var i, a = null !== (i = e.messageSetIndex) && void 0 !== i ? i : this.findMessageSetIndex(e);
                            if (-1 !== a) {
                                var o = this.removeMessageFromArray(this.messageSets[a].messages, e),
                                    c = o.removed,
                                    u = o.result;
                                this.messageSets[a].messages = u, t = c
                            }
                        }
                        return t
                    }
                }, {
                    key: "filterErrorMessages",
                    value: function() {
                        var e = this.latestMessages.filter(function(e) {
                            return "error" !== e.type
                        });
                        this.latestMessages = e
                    }
                }, {
                    key: "clean",
                    value: function() {
                        for (var e = new Date, t = 0, n = Object.entries(this.typing); t < n.length; t++) {
                            var r = (0, w.Z)(n[t], 2),
                                s = r[0],
                                i = r[1],
                                a = "string" == typeof i.received_at ? new Date(i.received_at) : i.received_at || new Date;
                            e.getTime() - a.getTime() > 7e3 && (delete this.typing[s], this._channel.getClient().dispatchEvent({
                                cid: this._channel.cid,
                                type: "typing.stop",
                                user: {
                                    id: s
                                }
                            }))
                        }
                    }
                }, {
                    key: "clearMessages",
                    value: function() {
                        this.initMessages(), this.pinnedMessages = []
                    }
                }, {
                    key: "initMessages",
                    value: function() {
                        this.messageSets = [{
                            messages: [],
                            isLatest: !0,
                            isCurrent: !0
                        }]
                    }
                }, {
                    key: "loadMessageIntoState",
                    value: (e = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s, i, a, o, c, u = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (s = u.length > 2 && void 0 !== u[2] ? u[2] : 25, a = !1, o = !1, c = n || t, "latest" !== t) {
                                        e.next = 10;
                                        break
                                    }
                                    if (this.messages !== this.latestMessages) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 7:
                                    i = this.messageSets.findIndex(function(e) {
                                        return e.isLatest
                                    }), e.next = 11;
                                    break;
                                case 10:
                                    i = this.findMessageSetIndex({
                                        id: c
                                    });
                                case 11:
                                    if (-1 !== i && (this.switchToMessageSet(i), a = !0), o = !n || !!(null !== (r = this.threads[n]) && void 0 !== r && r.find(function(e) {
                                            return e.id === t
                                        })), !(a && o)) {
                                        e.next = 15;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 15:
                                    if (a) {
                                        e.next = 18;
                                        break
                                    }
                                    return e.next = 18, this._channel.query({
                                        messages: {
                                            id_around: c,
                                            limit: s
                                        }
                                    }, "new");
                                case 18:
                                    if (!(!o && n)) {
                                        e.next = 21;
                                        break
                                    }
                                    return e.next = 21, this._channel.getReplies(n, {
                                        id_around: t,
                                        limit: s
                                    });
                                case 21:
                                    -1 !== (i = this.findMessageSetIndex({
                                        id: c
                                    })) && this.switchToMessageSet(i);
                                case 23:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(t, n) {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "findMessage",
                    value: function(e, t) {
                        if (t) {
                            var n = this.threads[t];
                            if (!n) return;
                            return n.find(function(t) {
                                return t.id === e
                            })
                        }
                        var r = this.findMessageSetIndex({
                            id: e
                        });
                        if (-1 !== r) return this.messageSets[r].messages.find(function(t) {
                            return t.id === e
                        })
                    }
                }, {
                    key: "switchToMessageSet",
                    value: function(e) {
                        var t = this.messageSets.find(function(e) {
                            return e.isCurrent
                        });
                        t && (t.isCurrent = !1, this.messageSets[e].isCurrent = !0)
                    }
                }, {
                    key: "areMessageSetsOverlap",
                    value: function(e, t) {
                        return e.some(function(e) {
                            return t.find(function(t) {
                                return e.id === t.id
                            })
                        })
                    }
                }, {
                    key: "findMessageSetIndex",
                    value: function(e) {
                        return this.messageSets.findIndex(function(t) {
                            return !!t.messages.find(function(t) {
                                return t.id === e.id
                            })
                        })
                    }
                }, {
                    key: "findTargetMessageSet",
                    value: function(e) {
                        var t, n = this,
                            r = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1],
                            s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "current",
                            i = e;
                        if (r) {
                            var a = this.messageSets.map(function(e, t) {
                                return t
                            }).filter(function(t) {
                                return n.areMessageSetsOverlap(n.messageSets[t].messages, e)
                            });
                            switch (s) {
                                case "new":
                                    a.length > 0 ? t = a[0] : e.some(function(e) {
                                        return !e.parent_id
                                    }) && (this.messageSets.push({
                                        messages: [],
                                        isCurrent: !1,
                                        isLatest: !1
                                    }), t = this.messageSets.length - 1);
                                    break;
                                case "current":
                                    t = this.messageSets.findIndex(function(e) {
                                        return e.isCurrent
                                    });
                                    break;
                                case "latest":
                                    t = this.messageSets.findIndex(function(e) {
                                        return e.isLatest
                                    });
                                    break;
                                default:
                                    t = -1
                            }
                            var o = a.splice(0, 1)[0],
                                c = (0, h.Z)(a);
                            if (void 0 !== o && o !== t && c.push(t), c.length > 0) {
                                var u = this.messageSets[o],
                                    l = this.messageSets.filter(function(e, t) {
                                        return -1 !== c.indexOf(t)
                                    });
                                l.forEach(function(e) {
                                    u.isLatest = u.isLatest || e.isLatest, u.isCurrent = u.isCurrent || e.isCurrent, i = [].concat((0, h.Z)(i), (0, h.Z)(e.messages))
                                }), l.forEach(function(e) {
                                    return n.messageSets.splice(n.messageSets.indexOf(e), 1)
                                }), t = this.messageSets.findIndex(function(t) {
                                    return n.areMessageSetsOverlap(t.messages, e)
                                })
                            }
                        } else t = this.findMessageSetIndex(e[0]);
                        return {
                            targetMessageSetIndex: t,
                            messagesToAdd: i
                        }
                    }
                }]), t
            }();

            function A(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function j(e, t) {
                e.then().catch(function(e) {
                    console.warn("failed to do ".concat(t, ", ran into error: "), e)
                })
            }
            var F = function(e) {
                return new Promise(function(t) {
                    return setTimeout(t, e)
                })
            };

            function q(e) {
                return e && ("[object Function]" === Object.prototype.toString.call(e) || "function" == typeof e || e instanceof Function)
            }
            var W = {
                TOKEN_EXPIRED: 40,
                WS_CLOSED_SUCCESS: 1e3
            };

            function N(e) {
                var t, n = [],
                    r = function(e, t) {
                        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (!n) {
                            if (Array.isArray(e) || (n = function(e, t) {
                                    if (e) {
                                        if ("string" == typeof e) return A(e, t);
                                        var n = Object.prototype.toString.call(e).slice(8, -1);
                                        if ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n) return Array.from(e);
                                        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return A(e, t)
                                    }
                                }(e))) {
                                n && (e = n);
                                var r = 0,
                                    s = function() {};
                                return {
                                    s: s,
                                    n: function() {
                                        return r >= e.length ? {
                                            done: !0
                                        } : {
                                            done: !1,
                                            value: e[r++]
                                        }
                                    },
                                    e: function(e) {
                                        function t(t) {
                                            return e.apply(this, arguments)
                                        }
                                        return t.toString = function() {
                                            return e.toString()
                                        }, t
                                    }(function(e) {
                                        throw e
                                    }),
                                    f: s
                                }
                            }
                            throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }
                        var i, a = !0,
                            o = !1;
                        return {
                            s: function() {
                                n = n.call(e)
                            },
                            n: function() {
                                var e = n.next();
                                return a = e.done, e
                            },
                            e: function(e) {
                                function t(t) {
                                    return e.apply(this, arguments)
                                }
                                return t.toString = function() {
                                    return e.toString()
                                }, t
                            }(function(e) {
                                o = !0, i = e
                            }),
                            f: function() {
                                try {
                                    a || null == n.return || n.return()
                                } finally {
                                    if (o) throw i
                                }
                            }
                        }
                    }(Array.isArray(e) ? e : [e]);
                try {
                    for (r.s(); !(t = r.n()).done;) {
                        var s = t.value,
                            i = Object.entries(s);
                        i.length > 1 && console.warn("client._buildSort() - multiple fields in a single sort object detected. Object's field order is not guaranteed");
                        for (var a = 0; a < i.length; a++) {
                            var o = (0, w.Z)(i[a], 2),
                                c = o[0],
                                u = o[1];
                            n.push({
                                field: c,
                                direction: u
                            })
                        }
                    }
                } catch (e) {
                    r.e(e)
                } finally {
                    r.f()
                }
                return n
            }

            function B(e) {
                var t = Math.min(Math.max(250, (e - 1) * 2e3), 25e3);
                return Math.floor(Math.random() * (Math.min(500 + 2e3 * e, 25e3) - t) + t)
            }

            function H(e) {
                for (var t = "", n = 0; n < e.length; n++) t += e[n].toString(16).padStart(2, "0");
                return t
            }

            function z() {
                var e, t = (J(e = new Uint8Array(16)), e);
                return t[6] = 15 & t[6] | 64, t[8] = 191 & t[8] | 128, H(t.subarray(0, 4)) + "-" + H(t.subarray(4, 6)) + "-" + H(t.subarray(6, 8)) + "-" + H(t.subarray(8, 10)) + "-" + H(t.subarray(10, 16))
            }
            var J = "undefined" != typeof crypto && void 0 !== (null === (r = crypto) || void 0 === r ? void 0 : r.getRandomValues) ? crypto.getRandomValues.bind(crypto) : "undefined" != typeof msCrypto ? msCrypto.getRandomValues.bind(msCrypto) : function(e) {
                for (var t = Math.pow(2, 8 * e.byteLength / e.length), n = 0; n < e.length; n++) e[n] = Math.random() * t
            };

            function K(e) {
                "undefined" != typeof window && window.addEventListener && (window.addEventListener("offline", e), window.addEventListener("online", e))
            }

            function X(e) {
                "undefined" != typeof window && window.removeEventListener && (window.removeEventListener("offline", e), window.removeEventListener("online", e))
            }

            function G(e, t) {
                var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!n) {
                    if (Array.isArray(e) || (n = function(e, t) {
                            if (e) {
                                if ("string" == typeof e) return $(e, t);
                                var n = Object.prototype.toString.call(e).slice(8, -1);
                                if ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n) return Array.from(e);
                                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $(e, t)
                            }
                        }(e)) || t && e && "number" == typeof e.length) {
                        n && (e = n);
                        var r = 0,
                            s = function() {};
                        return {
                            s: s,
                            n: function() {
                                return r >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[r++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: s
                        }
                    }
                    throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var i, a = !0,
                    o = !1;
                return {
                    s: function() {
                        n = n.call(e)
                    },
                    n: function() {
                        var e = n.next();
                        return a = e.done, e
                    },
                    e: function(e) {
                        o = !0, i = e
                    },
                    f: function() {
                        try {
                            a || null == n.return || n.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                }
            }

            function $(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function Q(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function V(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Q(Object(n), !0).forEach(function(t) {
                        (0, v.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Q(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            var Y = function() {
                var e, t, n, r, s, i, a, o, c, l, g, y, b, w, k, _, x, C, Z, S, U, R, M, E, I, O, L, D, T, A, F, q, W, B, H, z, J, K;

                function X(e, t, n, r) {
                    var s, i = this;
                    if ((0, p.Z)(this, X), (0, v.Z)(this, "_client", void 0), (0, v.Z)(this, "type", void 0), (0, v.Z)(this, "id", void 0), (0, v.Z)(this, "data", void 0), (0, v.Z)(this, "_data", void 0), (0, v.Z)(this, "cid", void 0), (0, v.Z)(this, "listeners", void 0), (0, v.Z)(this, "state", void 0), (0, v.Z)(this, "initialized", void 0), (0, v.Z)(this, "offlineMode", void 0), (0, v.Z)(this, "lastKeyStroke", void 0), (0, v.Z)(this, "lastTypingEvent", void 0), (0, v.Z)(this, "isTyping", void 0), (0, v.Z)(this, "disconnected", void 0), (0, v.Z)(this, "create", (s = (0, d.Z)(m().mark(function e(t) {
                            var n;
                            return m().wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return n = V(V({}, t), {}, {
                                            watch: !1,
                                            state: !1,
                                            presence: !1
                                        }), e.next = 3, i.query(n, "latest");
                                    case 3:
                                        return e.abrupt("return", e.sent);
                                    case 4:
                                    case "end":
                                        return e.stop()
                                }
                            }, e)
                        })), function(e) {
                            return s.apply(this, arguments)
                        })), (0, v.Z)(this, "_callChannelListeners", function(e) {
                            var t = [];
                            i.listeners.all && t.push.apply(t, (0, h.Z)(i.listeners.all)), i.listeners[e.type] && t.push.apply(t, (0, h.Z)(i.listeners[e.type]));
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                "string" != typeof r && r(e)
                            }
                        }), (0, v.Z)(this, "_channelURL", function() {
                            if (!i.id) throw Error("channel id is not defined");
                            return "".concat(i.getClient().baseURL, "/channels/").concat(i.type, "/").concat(i.id)
                        }), !/^[\w_-]+$/.test(t)) throw Error("Invalid chat type ".concat(t, ', letters, numbers and "_-" are allowed'));
                    if ("string" == typeof n && !/^[\w!_-]+$/.test(n)) throw Error("Invalid chat id ".concat(n, ', letters, numbers and "!-_" are allowed'));
                    this._client = e, this.type = t, this.id = n, this.data = r, this._data = V({}, r), this.cid = "".concat(t, ":").concat(n), this.listeners = {}, this.state = new P(this), this.initialized = !1, this.offlineMode = !1, this.lastTypingEvent = null, this.isTyping = !1, this.disconnected = !1
                }
                return (0, f.Z)(X, [{
                    key: "getClient",
                    value: function() {
                        if (!0 === this.disconnected) throw Error("You can't use a channel after client.disconnect() was called");
                        return this._client
                    }
                }, {
                    key: "getConfig",
                    value: function() {
                        return this.getClient().configs[this.cid]
                    }
                }, {
                    key: "sendMessage",
                    value: (e = (0, d.Z)(m().mark(function e(t, n) {
                        var r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().post(this._channelURL() + "/message", V({
                                        message: t
                                    }, n));
                                case 2:
                                    return r = e.sent, this.state.unreadCount = 0, e.abrupt("return", r);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(t, n) {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "sendFile",
                    value: function(e, t, n, r) {
                        return this.getClient().sendFile("".concat(this._channelURL(), "/file"), e, t, n, r)
                    }
                }, {
                    key: "sendImage",
                    value: function(e, t, n, r) {
                        return this.getClient().sendFile("".concat(this._channelURL(), "/image"), e, t, n, r)
                    }
                }, {
                    key: "deleteFile",
                    value: function(e) {
                        return this.getClient().delete("".concat(this._channelURL(), "/file"), {
                            url: e
                        })
                    }
                }, {
                    key: "deleteImage",
                    value: function(e) {
                        return this.getClient().delete("".concat(this._channelURL(), "/image"), {
                            url: e
                        })
                    }
                }, {
                    key: "sendEvent",
                    value: (t = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this._checkInitialized(), e.next = 3, this.getClient().post(this._channelURL() + "/event", {
                                        event: t
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return t.apply(this, arguments)
                    })
                }, {
                    key: "search",
                    value: (n = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (!((n = s.length > 1 && void 0 !== s[1] ? s[1] : {}).offset && (n.sort || n.next))) {
                                        e.next = 3;
                                        break
                                    }
                                    throw Error("Cannot specify offset with sort or next parameters");
                                case 3:
                                    if (r = V(V({
                                            filter_conditions: {
                                                cid: this.cid
                                            }
                                        }, n), {}, {
                                            sort: n.sort ? N(n.sort) : void 0
                                        }), "string" != typeof t) {
                                        e.next = 8;
                                        break
                                    }
                                    r.query = t, e.next = 13;
                                    break;
                                case 8:
                                    if ("object" !== (0, u.Z)(t)) {
                                        e.next = 12;
                                        break
                                    }
                                    r.message_filter_conditions = t, e.next = 13;
                                    break;
                                case 12:
                                    throw Error("Invalid type ".concat((0, u.Z)(t), " for query parameter"));
                                case 13:
                                    return e.next = 15, this.getClient().wsPromise;
                                case 15:
                                    return e.next = 17, this.getClient().get(this.getClient().baseURL + "/search", {
                                        payload: r
                                    });
                                case 17:
                                    return e.abrupt("return", e.sent);
                                case 18:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return n.apply(this, arguments)
                    })
                }, {
                    key: "queryMembers",
                    value: (r = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s, i, a, o, c = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = c.length > 1 && void 0 !== c[1] ? c[1] : [], s = c.length > 2 && void 0 !== c[2] ? c[2] : {}, a = this.type, this.id ? i = this.id : null !== (n = this.data) && void 0 !== n && n.members && Array.isArray(this.data.members) && (o = this.data.members), e.next = 6, this.getClient().get(this.getClient().baseURL + "/members", {
                                        payload: V({
                                            type: a,
                                            id: i,
                                            members: o,
                                            sort: N(r),
                                            filter_conditions: t
                                        }, s)
                                    });
                                case 6:
                                    return e.abrupt("return", e.sent);
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "sendReaction",
                    value: (s = (0, d.Z)(m().mark(function e(t, n, r) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error("Message id is missing");
                                case 2:
                                    if (!(!n || 0 === Object.keys(n).length)) {
                                        e.next = 4;
                                        break
                                    }
                                    throw Error("Reaction object is missing");
                                case 4:
                                    return e.next = 6, this.getClient().post(this.getClient().baseURL + "/messages/".concat(t, "/reaction"), V({
                                        reaction: n
                                    }, r));
                                case 6:
                                    return e.abrupt("return", e.sent);
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t, n) {
                        return s.apply(this, arguments)
                    })
                }, {
                    key: "deleteReaction",
                    value: function(e, t, n) {
                        if (this._checkInitialized(), !t || !e) throw Error("Deleting a reaction requires specifying both the message and reaction type");
                        var r = this.getClient().baseURL + "/messages/".concat(e, "/reaction/").concat(t);
                        return n ? this.getClient().delete(r, {
                            user_id: n
                        }) : this.getClient().delete(r, {})
                    }
                }, {
                    key: "update",
                    value: (i = (0, d.Z)(m().mark(function e() {
                        var t, n, r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = s.length > 0 && void 0 !== s[0] ? s[0] : {}, n = s.length > 1 ? s[1] : void 0, r = s.length > 2 ? s[2] : void 0, ["config", "cid", "created_by", "id", "member_count", "type", "created_at", "updated_at", "last_message_at", "own_capabilities"].forEach(function(e) {
                                        delete t[e]
                                    }), e.next = 7, this._update(V({
                                        message: n,
                                        data: t
                                    }, r));
                                case 7:
                                    return e.abrupt("return", e.sent);
                                case 8:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return i.apply(this, arguments)
                    })
                }, {
                    key: "updatePartial",
                    value: (a = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().patch(this._channelURL(), t);
                                case 2:
                                    return n = e.sent, this.data = n.channel, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return a.apply(this, arguments)
                    })
                }, {
                    key: "enableSlowMode",
                    value: (o = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().post(this._channelURL(), {
                                        cooldown: t
                                    });
                                case 2:
                                    return n = e.sent, this.data = n.channel, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return o.apply(this, arguments)
                    })
                }, {
                    key: "disableSlowMode",
                    value: (c = (0, d.Z)(m().mark(function e() {
                        var t;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().post(this._channelURL(), {
                                        cooldown: 0
                                    });
                                case 2:
                                    return t = e.sent, this.data = t.channel, e.abrupt("return", t);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return c.apply(this, arguments)
                    })
                }, {
                    key: "delete",
                    value: (l = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this.getClient().delete(this._channelURL(), V({}, t));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return l.apply(this, arguments)
                    })
                }, {
                    key: "truncate",
                    value: (g = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this.getClient().post(this._channelURL() + "/truncate", t);
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return g.apply(this, arguments)
                    })
                }, {
                    key: "acceptInvite",
                    value: (y = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this._update(V({
                                        accept_invite: !0
                                    }, t));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return y.apply(this, arguments)
                    })
                }, {
                    key: "rejectInvite",
                    value: (b = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this._update(V({
                                        reject_invite: !0
                                    }, t));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return b.apply(this, arguments)
                    })
                }, {
                    key: "addMembers",
                    value: (w = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this._update(V({
                                        add_members: t,
                                        message: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return w.apply(this, arguments)
                    })
                }, {
                    key: "addModerators",
                    value: (k = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this._update(V({
                                        add_moderators: t,
                                        message: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return k.apply(this, arguments)
                    })
                }, {
                    key: "assignRoles",
                    value: (_ = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this._update(V({
                                        assign_roles: t,
                                        message: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return _.apply(this, arguments)
                    })
                }, {
                    key: "inviteMembers",
                    value: (x = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this._update(V({
                                        invites: t,
                                        message: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return x.apply(this, arguments)
                    })
                }, {
                    key: "removeMembers",
                    value: (C = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this._update(V({
                                        remove_members: t,
                                        message: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return C.apply(this, arguments)
                    })
                }, {
                    key: "demoteModerators",
                    value: (Z = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this._update(V({
                                        demote_moderators: t,
                                        message: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return Z.apply(this, arguments)
                    })
                }, {
                    key: "_update",
                    value: (S = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().post(this._channelURL(), t);
                                case 2:
                                    return n = e.sent, this.data = n.channel, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return S.apply(this, arguments)
                    })
                }, {
                    key: "mute",
                    value: (U = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this.getClient().post(this.getClient().baseURL + "/moderation/mute/channel", V({
                                        channel_cid: this.cid
                                    }, t));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return U.apply(this, arguments)
                    })
                }, {
                    key: "unmute",
                    value: (R = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this.getClient().post(this.getClient().baseURL + "/moderation/unmute/channel", V({
                                        channel_cid: this.cid
                                    }, t));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return R.apply(this, arguments)
                    })
                }, {
                    key: "muteStatus",
                    value: function() {
                        return this._checkInitialized(), this.getClient()._muteStatus(this.cid)
                    }
                }, {
                    key: "sendAction",
                    value: function(e, t) {
                        if (this._checkInitialized(), !e) throw Error("Message id is missing");
                        return this.getClient().post(this.getClient().baseURL + "/messages/".concat(e, "/action"), {
                            message_id: e,
                            form_data: t,
                            id: this.id,
                            type: this.type
                        })
                    }
                }, {
                    key: "keystroke",
                    value: (M = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (null !== (n = this.getConfig()) && void 0 !== n && n.typing_events) {
                                        e.next = 2;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 2:
                                    if (r = new Date, s = this.lastTypingEvent && r.getTime() - this.lastTypingEvent.getTime(), this.lastKeyStroke = r, this.isTyping = !0, !(null === s || s > 2e3)) {
                                        e.next = 10;
                                        break
                                    }
                                    return this.lastTypingEvent = new Date, e.next = 10, this.sendEvent({
                                        type: "typing.start",
                                        parent_id: t
                                    });
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return M.apply(this, arguments)
                    })
                }, {
                    key: "stopTyping",
                    value: (E = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (null !== (n = this.getConfig()) && void 0 !== n && n.typing_events) {
                                        e.next = 2;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 2:
                                    return this.lastTypingEvent = null, this.isTyping = !1, e.next = 6, this.sendEvent({
                                        type: "typing.stop",
                                        parent_id: t
                                    });
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return E.apply(this, arguments)
                    })
                }, {
                    key: "lastMessage",
                    value: function() {
                        var e = this.state.latestMessages.length - 5;
                        e < 0 && (e = 0);
                        var t = this.state.latestMessages.length + 1,
                            n = this.state.latestMessages.slice(e, t);
                        return n.sort(function(e, t) {
                            return t.created_at.getTime() - e.created_at.getTime()
                        }), n[0]
                    }
                }, {
                    key: "markRead",
                    value: (I = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = r.length > 0 && void 0 !== r[0] ? r[0] : {}, this._checkInitialized(), null !== (t = this.getConfig()) && void 0 !== t && t.read_events) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", Promise.resolve(null));
                                case 4:
                                    return e.next = 6, this.getClient().post(this._channelURL() + "/read", V({}, n));
                                case 6:
                                    return e.abrupt("return", e.sent);
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return I.apply(this, arguments)
                    })
                }, {
                    key: "markUnread",
                    value: (O = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (this._checkInitialized(), null !== (n = this.getConfig()) && void 0 !== n && n.read_events) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return", Promise.resolve(null));
                                case 3:
                                    return e.next = 5, this.getClient().post(this._channelURL() + "/unread", V({}, t));
                                case 5:
                                    return e.abrupt("return", e.sent);
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return O.apply(this, arguments)
                    })
                }, {
                    key: "clean",
                    value: function() {
                        this.lastKeyStroke && new Date().getTime() - this.lastKeyStroke.getTime() > 1e3 && this.isTyping && j(this.stopTyping(), "stop typing event"), this.state.clean()
                    }
                }, {
                    key: "watch",
                    value: (L = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = {
                                        state: !0,
                                        watch: !0,
                                        presence: !1
                                    }, e.next = 3, this.getClient().wsPromise;
                                case 3:
                                    return this.getClient()._hasConnectionID() || (n.watch = !1), r = V(V({}, n), t), e.next = 7, this.query(r, "latest");
                                case 7:
                                    return s = e.sent, this.initialized = !0, this.data = s.channel, this._client.logger("info", "channel:watch() - started watching channel ".concat(this.cid), {
                                        tags: ["channel"],
                                        channel: this
                                    }), e.abrupt("return", s);
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return L.apply(this, arguments)
                    })
                }, {
                    key: "stopWatching",
                    value: (D = (0, d.Z)(m().mark(function e() {
                        var t;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().post(this._channelURL() + "/stop-watching", {});
                                case 2:
                                    return t = e.sent, this._client.logger("info", "channel:watch() - stopped watching channel ".concat(this.cid), {
                                        tags: ["channel"],
                                        channel: this
                                    }), e.abrupt("return", t);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return D.apply(this, arguments)
                    })
                }, {
                    key: "getReplies",
                    value: (T = (0, d.Z)(m().mark(function e(t, n) {
                        var r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().get(this.getClient().baseURL + "/messages/".concat(t, "/replies"), V({}, n));
                                case 2:
                                    return (r = e.sent).messages && this.state.addMessagesSorted(r.messages), e.abrupt("return", r);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return T.apply(this, arguments)
                    })
                }, {
                    key: "getPinnedMessages",
                    value: (A = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : [], e.next = 3, this.getClient().get(this.getClient().baseURL + "/channels/".concat(this.type, "/").concat(this.id, "/pinned_messages"), {
                                        payload: V(V({}, t), {}, {
                                            sort: N(n)
                                        })
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return A.apply(this, arguments)
                    })
                }, {
                    key: "getReactions",
                    value: function(e, t) {
                        return this.getClient().get(this.getClient().baseURL + "/messages/".concat(e, "/reactions"), V({}, t))
                    }
                }, {
                    key: "getMessagesById",
                    value: function(e) {
                        return this.getClient().get(this._channelURL() + "/messages", {
                            ids: e.join(",")
                        })
                    }
                }, {
                    key: "lastRead",
                    value: function() {
                        this._checkInitialized();
                        var e = this.getClient().userID;
                        if (e) return this.state.read[e] ? this.state.read[e].last_read : null
                    }
                }, {
                    key: "_countMessageAsUnread",
                    value: function(e) {
                        var t, n, r, s;
                        return !(e.shadowed || e.silent || e.parent_id && !e.show_in_channel || (null === (t = e.user) || void 0 === t ? void 0 : t.id) === this.getClient().userID || null !== (n = e.user) && void 0 !== n && n.id && this.getClient().userMuteStatus(e.user.id) || "system" === e.type || Array.isArray(null === (r = this.data) || void 0 === r ? void 0 : r.own_capabilities) && !(null !== (s = this.data) && void 0 !== s && s.own_capabilities.includes("read-events"))) && !this.muteStatus().muted
                    }
                }, {
                    key: "countUnread",
                    value: function(e) {
                        if (!e) return this.state.unreadCount;
                        for (var t = 0, n = 0; n < this.state.latestMessages.length; n += 1) {
                            var r = this.state.latestMessages[n];
                            r.created_at > e && this._countMessageAsUnread(r) && t++
                        }
                        return t
                    }
                }, {
                    key: "countUnreadMentions",
                    value: function() {
                        for (var e = this.lastRead(), t = this.getClient().userID, n = 0, r = 0; r < this.state.latestMessages.length; r += 1) {
                            var s, i = this.state.latestMessages[r];
                            this._countMessageAsUnread(i) && (!e || i.created_at > e) && null !== (s = i.mentioned_users) && void 0 !== s && s.some(function(e) {
                                return e.id === t
                            }) && n++
                        }
                        return n
                    }
                }, {
                    key: "query",
                    value: (F = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s, i, a, o, c = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = c.length > 1 && void 0 !== c[1] ? c[1] : "current", e.next = 3, this.getClient().wsPromise;
                                case 3:
                                    return r = "".concat(this.getClient().baseURL, "/channels/").concat(this.type), this.id && (r += "/".concat(this.id)), e.next = 7, this.getClient().post(r + "/query", V({
                                        data: this._data,
                                        state: !0
                                    }, t));
                                case 7:
                                    return s = e.sent, this.id || (this.id = s.channel.id, this.cid = s.channel.cid, i = s.members.map(function(e) {
                                        var t;
                                        return e.user_id || (null === (t = e.user) || void 0 === t ? void 0 : t.id)
                                    }).sort().join(","), (a = "".concat(this.type, ":!members-").concat(i)) in this.getClient().activeChannels && delete this.getClient().activeChannels[a], this.cid in this.getClient().activeChannels || (this.getClient().activeChannels[this.cid] = this)), this.getClient()._addChannelConfig(s.channel), o = this._initializeState(s, n).messageSet, this.data = s.channel, this.getClient().dispatchEvent({
                                        type: "channels.queried",
                                        queriedChannels: {
                                            channels: [s],
                                            isLatestMessageSet: o.isLatest
                                        }
                                    }), e.abrupt("return", s);
                                case 14:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return F.apply(this, arguments)
                    })
                }, {
                    key: "banUser",
                    value: (q = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this._checkInitialized(), e.next = 3, this.getClient().banUser(t, V(V({}, n), {}, {
                                        type: this.type,
                                        id: this.id
                                    }));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return q.apply(this, arguments)
                    })
                }, {
                    key: "hide",
                    value: (W = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.length > 0 && void 0 !== r[0] ? r[0] : null, n = r.length > 1 && void 0 !== r[1] && r[1], this._checkInitialized(), e.next = 5, this.getClient().post("".concat(this._channelURL(), "/hide"), {
                                        user_id: t,
                                        clear_history: n
                                    });
                                case 5:
                                    return e.abrupt("return", e.sent);
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return W.apply(this, arguments)
                    })
                }, {
                    key: "show",
                    value: (B = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : null, this._checkInitialized(), e.next = 4, this.getClient().post("".concat(this._channelURL(), "/show"), {
                                        user_id: t
                                    });
                                case 4:
                                    return e.abrupt("return", e.sent);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return B.apply(this, arguments)
                    })
                }, {
                    key: "unbanUser",
                    value: (H = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this._checkInitialized(), e.next = 3, this.getClient().unbanUser(t, {
                                        type: this.type,
                                        id: this.id
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return H.apply(this, arguments)
                    })
                }, {
                    key: "shadowBan",
                    value: (z = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this._checkInitialized(), e.next = 3, this.getClient().shadowBan(t, V(V({}, n), {}, {
                                        type: this.type,
                                        id: this.id
                                    }));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return z.apply(this, arguments)
                    })
                }, {
                    key: "removeShadowBan",
                    value: (J = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this._checkInitialized(), e.next = 3, this.getClient().removeShadowBan(t, {
                                        type: this.type,
                                        id: this.id
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return J.apply(this, arguments)
                    })
                }, {
                    key: "createCall",
                    value: (K = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.getClient().post(this._channelURL() + "/call", t);
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return K.apply(this, arguments)
                    })
                }, {
                    key: "on",
                    value: function(e, t) {
                        var n = this,
                            r = t ? e : "all",
                            s = t || e;
                        return r in this.listeners || (this.listeners[r] = []), this._client.logger("info", "Attaching listener for ".concat(r, " event on channel ").concat(this.cid), {
                            tags: ["event", "channel"],
                            channel: this
                        }), this.listeners[r].push(s), {
                            unsubscribe: function() {
                                n._client.logger("info", "Removing listener for ".concat(r, " event from channel ").concat(n.cid), {
                                    tags: ["event", "channel"],
                                    channel: n
                                }), n.listeners[r] = n.listeners[r].filter(function(e) {
                                    return e !== s
                                })
                            }
                        }
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        var n = t ? e : "all",
                            r = t || e;
                        n in this.listeners || (this.listeners[n] = []), this._client.logger("info", "Removing listener for ".concat(n, " event from channel ").concat(this.cid), {
                            tags: ["event", "channel"],
                            channel: this
                        }), this.listeners[n] = this.listeners[n].filter(function(e) {
                            return e !== r
                        })
                    }
                }, {
                    key: "_handleChannelEvent",
                    value: function(e) {
                        var t, n, r, s, i, a, o = this;
                        this._client.logger("info", "channel:_handleChannelEvent - Received event of type { ".concat(e.type, " } on ").concat(this.cid), {
                            tags: ["event", "channel"],
                            channel: this
                        });
                        var c = o.state;
                        switch (e.type) {
                            case "typing.start":
                                null !== (u = e.user) && void 0 !== u && u.id && (c.typing[e.user.id] = e);
                                break;
                            case "typing.stop":
                                null !== (l = e.user) && void 0 !== l && l.id && delete c.typing[e.user.id];
                                break;
                            case "message.read":
                                null !== (h = e.user) && void 0 !== h && h.id && e.created_at && (c.read[e.user.id] = {
                                    last_read: new Date(e.created_at),
                                    user: e.user,
                                    unread_messages: 0
                                }, (null === (m = e.user) || void 0 === m ? void 0 : m.id) === (null === (y = this.getClient().user) || void 0 === y ? void 0 : y.id) && (c.unreadCount = 0));
                                break;
                            case "user.watching.start":
                            case "user.updated":
                                null !== (d = e.user) && void 0 !== d && d.id && (c.watchers[e.user.id] = e.user);
                                break;
                            case "user.watching.stop":
                                null !== (p = e.user) && void 0 !== p && p.id && delete c.watchers[e.user.id];
                                break;
                            case "message.deleted":
                                e.message && (this._extendEventWithOwnReactions(e), e.hard_delete ? c.removeMessage(e.message) : c.addMessageSorted(e.message, !1, !1), c.removeQuotedMessageReferences(e.message), e.message.pinned && c.removePinnedMessage(e.message));
                                break;
                            case "message.new":
                                if (e.message) {
                                    var u, l, h, d, p, f, v, g, m, y, b, w, k, _ = (null === (b = e.user) || void 0 === b ? void 0 : b.id) === (null === (w = this.getClient().user) || void 0 === w ? void 0 : w.id),
                                        x = e.message.parent_id && !e.message.show_in_channel;
                                    if ((this.state.isUpToDate || x) && c.addMessageSorted(e.message, _), e.message.pinned && c.addPinnedMessage(e.message), null !== (k = e.user) && void 0 !== k && k.id)
                                        for (var C in c.read) C === e.user.id ? c.read[e.user.id] = {
                                            last_read: new Date(e.created_at),
                                            user: e.user,
                                            unread_messages: 0
                                        } : c.read[C].unread_messages += 1;
                                    _ ? c.unreadCount = 0 : this._countMessageAsUnread(e.message) && (c.unreadCount = c.unreadCount + 1)
                                }
                                break;
                            case "message.updated":
                                e.message && (this._extendEventWithOwnReactions(e), c.addMessageSorted(e.message, !1, !1), e.message.pinned ? c.addPinnedMessage(e.message) : c.removePinnedMessage(e.message));
                                break;
                            case "channel.truncated":
                                if (null !== (f = e.channel) && void 0 !== f && f.truncated_at) {
                                    var Z = +new Date(e.channel.truncated_at);
                                    c.messageSets.forEach(function(e, t) {
                                        e.messages.forEach(function(e) {
                                            var n = e.created_at,
                                                r = e.id;
                                            Z > +n && c.removeMessage({
                                                id: r,
                                                messageSetIndex: t
                                            })
                                        })
                                    }), c.pinnedMessages.forEach(function(e) {
                                        var t = e.id;
                                        Z > +e.created_at && c.removePinnedMessage({
                                            id: t
                                        })
                                    })
                                } else c.clearMessages();
                                c.unreadCount = 0, e.message && (c.addMessageSorted(e.message), e.message.pinned && c.addPinnedMessage(e.message));
                                break;
                            case "member.added":
                            case "member.updated":
                                null !== (v = e.member) && void 0 !== v && v.user_id && (c.members[e.member.user_id] = e.member);
                                break;
                            case "member.removed":
                                null !== (g = e.user) && void 0 !== g && g.id && delete c.members[e.user.id];
                                break;
                            case "channel.updated":
                                e.channel && (o.data = V(V({}, e.channel), {}, {
                                    hidden: null !== (t = null === (n = e.channel) || void 0 === n ? void 0 : n.hidden) && void 0 !== t ? t : null === (r = o.data) || void 0 === r ? void 0 : r.hidden,
                                    own_capabilities: null !== (s = null === (i = e.channel) || void 0 === i ? void 0 : i.own_capabilities) && void 0 !== s ? s : null === (a = o.data) || void 0 === a ? void 0 : a.own_capabilities
                                }));
                                break;
                            case "reaction.new":
                                e.message && e.reaction && (e.message = c.addReaction(e.reaction, e.message));
                                break;
                            case "reaction.deleted":
                                e.reaction && (e.message = c.removeReaction(e.reaction, e.message));
                                break;
                            case "reaction.updated":
                                e.reaction && (e.message = c.addReaction(e.reaction, e.message, !0));
                                break;
                            case "channel.hidden":
                                e.clear_history && c.clearMessages()
                        }
                        void 0 !== e.watcher_count && (o.state.watcher_count = e.watcher_count)
                    }
                }, {
                    key: "_checkInitialized",
                    value: function() {
                        if (!this.initialized && !this.offlineMode && !this.getClient()._isUsingServerAuth()) throw Error("Channel ".concat(this.cid, " hasn't been initialized yet. Make sure to call .watch() and wait for it to resolve"))
                    }
                }, {
                    key: "_initializeState",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "latest",
                            n = this.getClient(),
                            r = n.state,
                            s = n.user,
                            i = n.userID;
                        if (e.members) {
                            var a, o = G(e.members);
                            try {
                                for (o.s(); !(a = o.n()).done;) {
                                    var c = a.value;
                                    c.user && r.updateUserReference(c.user, this.cid)
                                }
                            } catch (e) {
                                o.e(e)
                            } finally {
                                o.f()
                            }
                        }
                        this.state.membership = e.membership || {};
                        var u = e.messages || [];
                        this.state.messages || this.state.initMessages();
                        var l = this.state.addMessagesSorted(u, !1, !0, !0, t).messageSet;
                        if (this.state.pinnedMessages || (this.state.pinnedMessages = []), this.state.addPinnedMessages(e.pinned_messages || []), e.pending_messages && (this.state.pending_messages = e.pending_messages), this.state.watcher_count = e.watcher_count || 0, e.watchers) {
                            var h, d = G(e.watchers);
                            try {
                                for (d.s(); !(h = d.n()).done;) {
                                    var p = h.value;
                                    p && (r.updateUserReference(p, this.cid), this.state.watchers[p.id] = p)
                                }
                            } catch (e) {
                                d.e(e)
                            } finally {
                                d.f()
                            }
                        }
                        if (null != i) {
                            var f = this.state.last_message_at || new Date;
                            s && (this.state.read[s.id] = {
                                user: s,
                                last_read: f,
                                unread_messages: 0
                            })
                        }
                        if (e.read) {
                            var v, g = G(e.read);
                            try {
                                for (g.s(); !(v = g.n()).done;) {
                                    var m, y = v.value;
                                    this.state.read[y.user.id] = {
                                        last_read: new Date(y.last_read),
                                        unread_messages: null !== (m = y.unread_messages) && void 0 !== m ? m : 0,
                                        user: y.user
                                    }, y.user.id === (null == s ? void 0 : s.id) && (this.state.unreadCount = this.state.read[y.user.id].unread_messages)
                                }
                            } catch (e) {
                                g.e(e)
                            } finally {
                                g.f()
                            }
                        }
                        return e.members && (this.state.members = e.members.reduce(function(e, t) {
                            return t.user && (e[t.user.id] = t), e
                        }, {})), {
                            messageSet: l
                        }
                    }
                }, {
                    key: "_extendEventWithOwnReactions",
                    value: function(e) {
                        if (e.message) {
                            var t = this.state.findMessage(e.message.id, e.message.parent_id);
                            t && (e.message.own_reactions = t.own_reactions)
                        }
                    }
                }, {
                    key: "_disconnect",
                    value: function() {
                        this._client.logger("info", "channel:disconnect() - Disconnecting the channel ".concat(this.cid), {
                            tags: ["connection", "channel"],
                            channel: this
                        }), this.disconnected = !0, this.state.setIsUpToDate(!1)
                    }
                }]), X
            }();

            function ee(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }
            var et = function() {
                function e() {
                    (0, p.Z)(this, e), (0, v.Z)(this, "users", void 0), (0, v.Z)(this, "userChannelReferences", void 0), this.users = {}, this.userChannelReferences = {}
                }
                return (0, f.Z)(e, [{
                    key: "updateUsers",
                    value: function(e) {
                        var t, n = function(e, t) {
                            var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                            if (!n) {
                                if (Array.isArray(e) || (n = function(e, t) {
                                        if (e) {
                                            if ("string" == typeof e) return ee(e, t);
                                            var n = Object.prototype.toString.call(e).slice(8, -1);
                                            if ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n) return Array.from(e);
                                            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ee(e, t)
                                        }
                                    }(e))) {
                                    n && (e = n);
                                    var r = 0,
                                        s = function() {};
                                    return {
                                        s: s,
                                        n: function() {
                                            return r >= e.length ? {
                                                done: !0
                                            } : {
                                                done: !1,
                                                value: e[r++]
                                            }
                                        },
                                        e: function(e) {
                                            throw e
                                        },
                                        f: s
                                    }
                                }
                                throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }
                            var i, a = !0,
                                o = !1;
                            return {
                                s: function() {
                                    n = n.call(e)
                                },
                                n: function() {
                                    var e = n.next();
                                    return a = e.done, e
                                },
                                e: function(e) {
                                    o = !0, i = e
                                },
                                f: function() {
                                    try {
                                        a || null == n.return || n.return()
                                    } finally {
                                        if (o) throw i
                                    }
                                }
                            }
                        }(e);
                        try {
                            for (n.s(); !(t = n.n()).done;) {
                                var r = t.value;
                                this.updateUser(r)
                            }
                        } catch (e) {
                            n.e(e)
                        } finally {
                            n.f()
                        }
                    }
                }, {
                    key: "updateUser",
                    value: function(e) {
                        null != e && (this.users[e.id] = e)
                    }
                }, {
                    key: "updateUserReference",
                    value: function(e, t) {
                        null != e && (this.updateUser(e), this.userChannelReferences[e.id] || (this.userChannelReferences[e.id] = {}), this.userChannelReferences[e.id][t] = !0)
                    }
                }, {
                    key: "deleteAllChannelReference",
                    value: function(e) {
                        for (var t in this.userChannelReferences) delete this.userChannelReferences[t][e]
                    }
                }]), e
            }();

            function en(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function er(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? en(Object(n), !0).forEach(function(t) {
                        (0, v.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : en(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            var es = function e() {
                    (0, p.Z)(this, e), (0, v.Z)(this, "connectionStartTimestamp", void 0), (0, v.Z)(this, "wsConsecutiveFailures", void 0), (0, v.Z)(this, "wsTotalFailures", void 0), (0, v.Z)(this, "instanceClientId", void 0), this.connectionStartTimestamp = null, this.wsTotalFailures = 0, this.wsConsecutiveFailures = 0, this.instanceClientId = z()
                },
                ei = (s = (0, d.Z)(m().mark(function e(t, n) {
                    var r, s;
                    return m().wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                r = 3, s = 0;
                            case 2:
                                if (!(s < r)) {
                                    e.next = 17;
                                    break
                                }
                                return e.prev = 3, e.next = 6, b().post("https://chat-insights.getstream.io/insights/".concat(t), n);
                            case 6:
                                e.next = 13;
                                break;
                            case 8:
                                return e.prev = 8, e.t0 = e.catch(3), e.next = 12, F((s + 1) * 3e3);
                            case 12:
                                return e.abrupt("continue", 14);
                            case 13:
                                return e.abrupt("break", 17);
                            case 14:
                                s++, e.next = 2;
                                break;
                            case 17:
                            case "end":
                                return e.stop()
                        }
                    }, e, null, [
                        [3, 8]
                    ])
                })), function(e, t) {
                    return s.apply(this, arguments)
                });

            function ea(e) {
                var t, n, r, s = e.client;
                return {
                    ready_state: null === (t = e.ws) || void 0 === t ? void 0 : t.readyState,
                    url: e._buildUrl(),
                    api_key: s.key,
                    start_ts: s.insightMetrics.connectionStartTimestamp,
                    end_ts: new Date().getTime(),
                    auth_type: s.getAuthType(),
                    token: s.tokenManager.token,
                    user_id: s.userID,
                    user_details: s._user,
                    device: s.options.device,
                    client_id: e.connectionID,
                    ws_details: e.ws,
                    ws_consecutive_failures: s.insightMetrics.wsConsecutiveFailures,
                    ws_total_failures: s.insightMetrics.wsTotalFailures,
                    request_id: e.requestID,
                    online: "undefined" != typeof navigator ? null === (n = navigator) || void 0 === n ? void 0 : n.onLine : null,
                    user_agent: "undefined" != typeof navigator ? null === (r = navigator) || void 0 === r ? void 0 : r.userAgent : null,
                    instance_client_id: s.insightMetrics.instanceClientId
                }
            }

            function eo(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }
            var ec = function() {
                var e, t, n, r;

                function s(e) {
                    var t = this,
                        n = e.client;
                    (0, p.Z)(this, s), (0, v.Z)(this, "client", void 0), (0, v.Z)(this, "connectionID", void 0), (0, v.Z)(this, "connectionOpen", void 0), (0, v.Z)(this, "consecutiveFailures", void 0), (0, v.Z)(this, "pingInterval", void 0), (0, v.Z)(this, "healthCheckTimeoutRef", void 0), (0, v.Z)(this, "isConnecting", void 0), (0, v.Z)(this, "isDisconnected", void 0), (0, v.Z)(this, "isHealthy", void 0), (0, v.Z)(this, "isResolved", void 0), (0, v.Z)(this, "lastEvent", void 0), (0, v.Z)(this, "connectionCheckTimeout", void 0), (0, v.Z)(this, "connectionCheckTimeoutRef", void 0), (0, v.Z)(this, "rejectPromise", void 0), (0, v.Z)(this, "requestID", void 0), (0, v.Z)(this, "resolvePromise", void 0), (0, v.Z)(this, "totalFailures", void 0), (0, v.Z)(this, "ws", void 0), (0, v.Z)(this, "wsID", void 0), (0, v.Z)(this, "_buildUrl", function() {
                        var e = encodeURIComponent(t.client._buildWSPayload(t.requestID)),
                            n = t.client.tokenManager.getToken();
                        return "".concat(t.client.wsBaseURL, "/connect?json=").concat(e, "&api_key=").concat(t.client.key, "&authorization=").concat(n, "&stream-auth-type=").concat(t.client.getAuthType(), "&X-Stream-Client=").concat(t.client.getUserAgent())
                    }), (0, v.Z)(this, "onlineStatusChanged", function(e) {
                        "offline" === e.type ? (t._log("onlineStatusChanged() - Status changing to offline"), t._setHealth(!1)) : "online" !== e.type || (t._log("onlineStatusChanged() - Status changing to online. isHealthy: ".concat(t.isHealthy)), t.isHealthy || t._reconnect({
                            interval: 10
                        }))
                    }), (0, v.Z)(this, "onopen", function(e) {
                        t.wsID === e && t._log("onopen() - onopen callback", {
                            wsID: e
                        })
                    }), (0, v.Z)(this, "onmessage", function(e, n) {
                        if (t.wsID === e) {
                            t._log("onmessage() - onmessage callback", {
                                event: n,
                                wsID: e
                            });
                            var r, s, i = "string" == typeof n.data ? JSON.parse(n.data) : null;
                            if (!t.isResolved && i) {
                                if (t.isResolved = !0, i.error) {
                                    null === (s = t.rejectPromise) || void 0 === s || s.call(t, t._errorFromWSEvent(i, !1));
                                    return
                                }
                                null === (r = t.resolvePromise) || void 0 === r || r.call(t, i), t._setHealth(!0)
                            }
                            t.lastEvent = new Date, i && "health.check" === i.type && t.scheduleNextPing(), t.client.handleEvent(n), t.scheduleConnectionCheck()
                        }
                    }), (0, v.Z)(this, "onclose", function(e, n) {
                        if (t.wsID === e) {
                            if (t._log("onclose() - onclose callback - " + n.code, {
                                    event: n,
                                    wsID: e
                                }), n.code === W.WS_CLOSED_SUCCESS) {
                                var r, s, i = Error("WS connection reject with error ".concat(n.reason));
                                i.reason = n.reason, i.code = n.code, i.wasClean = n.wasClean, i.target = n.target, null === (s = t.rejectPromise) || void 0 === s || s.call(t, i), t._log("onclose() - WS connection reject with error ".concat(n.reason), {
                                    event: n
                                })
                            } else t.consecutiveFailures += 1, t.totalFailures += 1, t._setHealth(!1), t.isConnecting = !1, null === (r = t.rejectPromise) || void 0 === r || r.call(t, t._errorFromWSEvent(n)), t._log("onclose() - WS connection closed. Calling reconnect ...", {
                                event: n
                            }), t._reconnect()
                        }
                    }), (0, v.Z)(this, "onerror", function(e, n) {
                        var r;
                        t.wsID === e && (t.consecutiveFailures += 1, t.totalFailures += 1, t._setHealth(!1), t.isConnecting = !1, null === (r = t.rejectPromise) || void 0 === r || r.call(t, t._errorFromWSEvent(n)), t._log("onerror() - WS connection resulted into error", {
                            event: n
                        }), t._reconnect())
                    }), (0, v.Z)(this, "_setHealth", function(e) {
                        if (e !== t.isHealthy) {
                            if (t.isHealthy = e, t.isHealthy) {
                                t.client.dispatchEvent({
                                    type: "connection.changed",
                                    online: t.isHealthy
                                });
                                return
                            }
                            setTimeout(function() {
                                t.isHealthy || t.client.dispatchEvent({
                                    type: "connection.changed",
                                    online: t.isHealthy
                                })
                            }, 5e3)
                        }
                    }), (0, v.Z)(this, "_errorFromWSEvent", function(e) {
                        var n, r, s, i = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1];
                        void 0 !== e.code && (n = e.code, r = "unknown", s = e.reason), void 0 !== e.error && (n = e.error.code, r = e.error.StatusCode, s = e.error.message), t._log("_errorFromWSEvent() - WS failed with code ".concat(n), {
                            event: e
                        }, "warn");
                        var a = Error("WS failed with code ".concat(n, " and reason - ").concat(s));
                        return a.code = n, a.StatusCode = r, a.isWSFailure = i, a
                    }), (0, v.Z)(this, "_setupConnectionPromise", function() {
                        t.isResolved = !1, t.connectionOpen = new Promise(function(e, n) {
                            t.resolvePromise = e, t.rejectPromise = n
                        })
                    }), (0, v.Z)(this, "scheduleNextPing", function() {
                        t.healthCheckTimeoutRef && clearTimeout(t.healthCheckTimeoutRef), t.healthCheckTimeoutRef = setTimeout(function() {
                            var e, n = [{
                                type: "health.check",
                                client_id: t.client.clientID
                            }];
                            try {
                                null === (e = t.ws) || void 0 === e || e.send(JSON.stringify(n))
                            } catch (e) {}
                        }, t.pingInterval)
                    }), (0, v.Z)(this, "scheduleConnectionCheck", function() {
                        t.connectionCheckTimeoutRef && clearTimeout(t.connectionCheckTimeoutRef), t.connectionCheckTimeoutRef = setTimeout(function() {
                            var e = new Date;
                            t.lastEvent && e.getTime() - t.lastEvent.getTime() > t.connectionCheckTimeout && (t._log("scheduleConnectionCheck - going to reconnect"), t._setHealth(!1), t._reconnect())
                        }, t.connectionCheckTimeout)
                    }), this.client = n, this.consecutiveFailures = 0, this.totalFailures = 0, this.isConnecting = !1, this.isDisconnected = !1, this.isResolved = !1, this.isHealthy = !1, this.wsID = 1, this.lastEvent = null, this.pingInterval = 25e3, this.connectionCheckTimeout = this.pingInterval + 1e4, K(this.onlineStatusChanged)
                }
                return (0, f.Z)(s, [{
                    key: "_log",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "info";
                        this.client.logger(n, "connection:" + e, function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? eo(Object(n), !0).forEach(function(t) {
                                    (0, v.Z)(e, t, n[t])
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eo(Object(n)).forEach(function(t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                                })
                            }
                            return e
                        }({
                            tags: ["connection"]
                        }, t))
                    }
                }, {
                    key: "setClient",
                    value: function(e) {
                        this.client = e
                    }
                }, {
                    key: "connect",
                    value: (e = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = r.length > 0 && void 0 !== r[0] ? r[0] : 15e3, !this.isConnecting) {
                                        e.next = 3;
                                        break
                                    }
                                    throw Error("You've called connect twice, can only attempt 1 connection at the time");
                                case 3:
                                    return this.isDisconnected = !1, e.prev = 4, e.next = 7, this._connect();
                                case 7:
                                    n = e.sent, this.consecutiveFailures = 0, this._log("connect() - Established ws connection with healthcheck: ".concat(n)), e.next = 23;
                                    break;
                                case 12:
                                    if (e.prev = 12, e.t0 = e.catch(4), this.isHealthy = !1, this.consecutiveFailures += 1, !(e.t0.code === W.TOKEN_EXPIRED && !this.client.tokenManager.isStatic())) {
                                        e.next = 21;
                                        break
                                    }
                                    this._log("connect() - WS failure due to expired token, so going to try to reload token and reconnect"), this._reconnect({
                                        refreshToken: !0
                                    }), e.next = 23;
                                    break;
                                case 21:
                                    if (e.t0.isWSFailure) {
                                        e.next = 23;
                                        break
                                    }
                                    throw Error(JSON.stringify({
                                        code: e.t0.code,
                                        StatusCode: e.t0.StatusCode,
                                        message: e.t0.message,
                                        isWSFailure: e.t0.isWSFailure
                                    }));
                                case 23:
                                    return e.next = 25, this._waitForHealthy(t);
                                case 25:
                                    return e.abrupt("return", e.sent);
                                case 26:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [4, 12]
                        ])
                    })), function() {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "_waitForHealthy",
                    value: (t = (0, d.Z)(m().mark(function e() {
                        var t, n = this,
                            r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.length > 0 && void 0 !== r[0] ? r[0] : 15e3, e.abrupt("return", Promise.race([(0, d.Z)(m().mark(function e() {
                                        var r, s;
                                        return m().wrap(function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    r = 50, s = 0;
                                                case 2:
                                                    if (!(s <= t)) {
                                                        e.next = 18;
                                                        break
                                                    }
                                                    return e.prev = 3, e.next = 6, n.connectionOpen;
                                                case 6:
                                                    return e.abrupt("return", e.sent);
                                                case 9:
                                                    if (e.prev = 9, e.t0 = e.catch(3), s !== t) {
                                                        e.next = 13;
                                                        break
                                                    }
                                                    throw Error(JSON.stringify({
                                                        code: e.t0.code,
                                                        StatusCode: e.t0.StatusCode,
                                                        message: e.t0.message,
                                                        isWSFailure: e.t0.isWSFailure
                                                    }));
                                                case 13:
                                                    return e.next = 15, F(r);
                                                case 15:
                                                    s += r, e.next = 2;
                                                    break;
                                                case 18:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }, e, null, [
                                            [3, 9]
                                        ])
                                    }))(), (0, d.Z)(m().mark(function e() {
                                        return m().wrap(function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    return e.next = 2, F(t);
                                                case 2:
                                                    throw n.isConnecting = !1, Error(JSON.stringify({
                                                        code: "",
                                                        StatusCode: "",
                                                        message: "initial WS connection could not be established",
                                                        isWSFailure: !0
                                                    }));
                                                case 4:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }, e)
                                    }))()]));
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }, e)
                    })), function() {
                        return t.apply(this, arguments)
                    })
                }, {
                    key: "disconnect",
                    value: function(e) {
                        var t, n = this;
                        this._log("disconnect() - Closing the websocket connection for wsID ".concat(this.wsID)), this.wsID += 1, this.isConnecting = !1, this.isDisconnected = !0, this.healthCheckTimeoutRef && clearInterval(this.healthCheckTimeoutRef), this.connectionCheckTimeoutRef && clearInterval(this.connectionCheckTimeoutRef), X(this.onlineStatusChanged), this.isHealthy = !1, this.ws && this.ws.removeAllListeners && this.ws.removeAllListeners();
                        var r = this.ws;
                        return r && r.close && r.readyState === r.OPEN ? (t = new Promise(function(t) {
                            var s = function(e) {
                                n._log("disconnect() - resolving isClosedPromise ".concat(e ? "with" : "without", " close frame"), {
                                    event: e
                                }), t()
                            };
                            r.onclose = s, setTimeout(s, null != e ? e : 1e3)
                        }), this._log("disconnect() - Manually closed connection by calling client.disconnect()"), r.close(W.WS_CLOSED_SUCCESS, "Manually closed connection by calling client.disconnect()")) : (this._log("disconnect() - ws connection doesn't exist or it is already closed."), t = Promise.resolve()), delete this.ws, t
                    }
                }, {
                    key: "_connect",
                    value: (n = (0, d.Z)(m().mark(function e() {
                        var t, n, r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (!(this.isConnecting || this.isDisconnected && this.client.options.enableWSFallback)) {
                                        e.next = 2;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 2:
                                    return this.isConnecting = !0, this.requestID = z(), this.client.insightMetrics.connectionStartTimestamp = new Date().getTime(), t = !1, e.prev = 6, this._log("_connect() - waiting for token"), e.next = 10, this.client.tokenManager.tokenReady();
                                case 10:
                                    t = !0, e.next = 15;
                                    break;
                                case 13:
                                    e.prev = 13, e.t0 = e.catch(6);
                                case 15:
                                    if (e.prev = 15, t) {
                                        e.next = 20;
                                        break
                                    }
                                    return this._log("_connect() - tokenProvider failed before, so going to retry"), e.next = 20, this.client.tokenManager.loadToken();
                                case 20:
                                    return this._setupConnectionPromise(), n = this._buildUrl(), this._log("_connect() - Connecting to ".concat(n), {
                                        wsURL: n,
                                        requestID: this.requestID
                                    }), this.ws = new(C())(n), this.ws.onopen = this.onopen.bind(this, this.wsID), this.ws.onclose = this.onclose.bind(this, this.wsID), this.ws.onerror = this.onerror.bind(this, this.wsID), this.ws.onmessage = this.onmessage.bind(this, this.wsID), e.next = 30, this.connectionOpen;
                                case 30:
                                    if (r = e.sent, this.isConnecting = !1, !r) {
                                        e.next = 36;
                                        break
                                    }
                                    return this.connectionID = r.connection_id, this.client.insightMetrics.wsConsecutiveFailures > 0 && this.client.options.enableInsights && (ei("ws_success_after_failure", ea(this)), this.client.insightMetrics.wsConsecutiveFailures = 0), e.abrupt("return", r);
                                case 36:
                                    e.next = 44;
                                    break;
                                case 38:
                                    throw e.prev = 38, e.t1 = e.catch(15), this.isConnecting = !1, this._log("_connect() - Error - ", e.t1), this.client.options.enableInsights && (this.client.insightMetrics.wsConsecutiveFailures++, this.client.insightMetrics.wsTotalFailures++, s = er(er({}, function(e) {
                                        var t = {};
                                        if (!e) return t;
                                        try {
                                            Object.getOwnPropertyNames(e).forEach(function(n) {
                                                t[n] = Object.getOwnPropertyDescriptor(e, n)
                                            })
                                        } catch (e) {
                                            return {
                                                error: "failed to serialize the error"
                                            }
                                        }
                                        return t
                                    }(e.t1)), ea(this)), null == ei || ei("ws_fatal", s)), e.t1;
                                case 44:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [6, 13],
                            [15, 38]
                        ])
                    })), function() {
                        return n.apply(this, arguments)
                    })
                }, {
                    key: "_reconnect",
                    value: (r = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = r.length > 0 && void 0 !== r[0] ? r[0] : {}, this._log("_reconnect() - Initiating the reconnect"), !(this.isConnecting || this.isHealthy)) {
                                        e.next = 5;
                                        break
                                    }
                                    return this._log("_reconnect() - Abort (1) since already connecting or healthy"), e.abrupt("return");
                                case 5:
                                    return (n = t.interval) || (n = B(this.consecutiveFailures)), e.next = 9, F(n);
                                case 9:
                                    if (!(this.isConnecting || this.isHealthy)) {
                                        e.next = 12;
                                        break
                                    }
                                    return this._log("_reconnect() - Abort (2) since already connecting or healthy"), e.abrupt("return");
                                case 12:
                                    if (!(this.isDisconnected && this.client.options.enableWSFallback)) {
                                        e.next = 15;
                                        break
                                    }
                                    return this._log("_reconnect() - Abort (3) since disconnect() is called"), e.abrupt("return");
                                case 15:
                                    if (this._log("_reconnect() - Destroying current WS connection"), this._destroyCurrentWSConnection(), !t.refreshToken) {
                                        e.next = 20;
                                        break
                                    }
                                    return e.next = 20, this.client.tokenManager.loadToken();
                                case 20:
                                    return e.prev = 20, e.next = 23, this._connect();
                                case 23:
                                    return this._log("_reconnect() - Waiting for recoverCallBack"), e.next = 26, this.client.recoverState();
                                case 26:
                                    this._log("_reconnect() - Finished recoverCallBack"), this.consecutiveFailures = 0, e.next = 38;
                                    break;
                                case 30:
                                    if (e.prev = 30, e.t0 = e.catch(20), this.isHealthy = !1, this.consecutiveFailures += 1, !(e.t0.code === W.TOKEN_EXPIRED && !this.client.tokenManager.isStatic())) {
                                        e.next = 37;
                                        break
                                    }
                                    return this._log("_reconnect() - WS failure due to expired token, so going to try to reload token and reconnect"), e.abrupt("return", this._reconnect({
                                        refreshToken: !0
                                    }));
                                case 37:
                                    e.t0.isWSFailure && (this._log("_reconnect() - WS failure, so going to try to reconnect"), this._reconnect());
                                case 38:
                                    this._log("_reconnect() - == END ==");
                                case 39:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [20, 30]
                        ])
                    })), function() {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "_destroyCurrentWSConnection",
                    value: function() {
                        this.wsID += 1;
                        try {
                            var e, t;
                            this === null || void 0 === this || null === (e = this.ws) || void 0 === e || e.removeAllListeners(), this === null || void 0 === this || null === (t = this.ws) || void 0 === t || t.close()
                        } catch (e) {}
                    }
                }]), s
            }();

            function eu(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function el(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (arguments.length > 3 && void 0 !== arguments[3] && arguments[3], "string" != typeof t) throw TypeError("userId should be a string");
                throw ! function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? eu(Object(n), !0).forEach(function(t) {
                            (0, v.Z)(e, t, n[t])
                        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eu(Object(n)).forEach(function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        })
                    }
                }({
                    user_id: t
                }, n), Error("Unable to find jwt crypto, if you are getting this error is probably because you are trying to generate tokens on browser or React Native (or other environment where crypto functions are not available). Please Note: token should only be generated server-side.")
            }

            function eh(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = (0, c.Z)({
                        algorithm: "HS256",
                        noTimestamp: !0
                    }, t);
                return null.sign({
                    server: !0
                }, e, n)
            }
            var ed = function e(t) {
                    var n, r = this;
                    (0, p.Z)(this, e), (0, v.Z)(this, "loadTokenPromise", void 0), (0, v.Z)(this, "type", void 0), (0, v.Z)(this, "secret", void 0), (0, v.Z)(this, "token", void 0), (0, v.Z)(this, "tokenProvider", void 0), (0, v.Z)(this, "user", void 0), (0, v.Z)(this, "setTokenOrProvider", (n = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r.validateToken(t, n), r.user = n, q(t) && (r.tokenProvider = t, r.type = "provider"), "string" == typeof t && (r.token = t, r.type = "static"), !t && r.user && r.secret && (r.token = el(r.secret, n.id, {}, {}), r.type = "static"), e.next = 7, r.loadToken();
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }, e)
                    })), function(e, t) {
                        return n.apply(this, arguments)
                    })), (0, v.Z)(this, "reset", function() {
                        r.token = void 0, r.user = void 0, r.loadTokenPromise = null
                    }), (0, v.Z)(this, "validateToken", function(e, t) {
                        if (!t || !t.anon || e) {
                            if (!r.secret && !e) throw Error("User token can not be empty");
                            if (e && "string" != typeof e && !q(e)) throw Error("user token should either be a string or a function");
                            if ("string" == typeof e) {
                                if (t.anon && "" === e) return;
                                var n, s = 3 !== (n = e.split(".")).length ? "" : JSON.parse(L(n[1])).user_id;
                                if (null != e && (null == s || "" === s || s !== t.id)) throw Error("userToken does not have a user_id or is not matching with user.id")
                            }
                        }
                    }), (0, v.Z)(this, "tokenReady", function() {
                        return r.loadTokenPromise
                    }), (0, v.Z)(this, "loadToken", function() {
                        var e;
                        return r.loadTokenPromise = new Promise((e = (0, d.Z)(m().mark(function e(t, n) {
                            return m().wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if ("static" !== r.type) {
                                            e.next = 2;
                                            break
                                        }
                                        return e.abrupt("return", t(r.token));
                                    case 2:
                                        if (!(r.tokenProvider && "string" != typeof r.tokenProvider)) {
                                            e.next = 13;
                                            break
                                        }
                                        return e.prev = 3, e.next = 6, r.tokenProvider();
                                    case 6:
                                        r.token = e.sent, e.next = 12;
                                        break;
                                    case 9:
                                        return e.prev = 9, e.t0 = e.catch(3), e.abrupt("return", n(Error("Call to tokenProvider failed with message: ".concat(e.t0))));
                                    case 12:
                                        t(r.token);
                                    case 13:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, null, [
                                [3, 9]
                            ])
                        })), function(t, n) {
                            return e.apply(this, arguments)
                        })), r.loadTokenPromise
                    }), (0, v.Z)(this, "getToken", function() {
                        if (r.token || r.user && r.user.anon && !r.token) return r.token;
                        if (r.secret) return eh(r.secret);
                        throw Error("Both secret and user tokens are not set. Either client.connectUser wasn't called or client.disconnect was called")
                    }), (0, v.Z)(this, "isStatic", function() {
                        return "static" === r.type
                    }), this.loadTokenPromise = null, t && (this.secret = t), this.type = "static", this.secret && (this.token = eh(this.secret))
                },
                ep = {
                    "-1": {
                        name: "InternalSystemError",
                        retryable: !0
                    },
                    2: {
                        name: "AccessKeyError",
                        retryable: !1
                    },
                    3: {
                        name: "AuthenticationFailedError",
                        retryable: !0
                    },
                    4: {
                        name: "InputError",
                        retryable: !1
                    },
                    6: {
                        name: "DuplicateUsernameError",
                        retryable: !1
                    },
                    9: {
                        name: "RateLimitError",
                        retryable: !0
                    },
                    16: {
                        name: "DoesNotExistError",
                        retryable: !1
                    },
                    17: {
                        name: "NotAllowedError",
                        retryable: !1
                    },
                    18: {
                        name: "EventNotSupportedError",
                        retryable: !1
                    },
                    19: {
                        name: "ChannelFeatureNotSupportedError",
                        retryable: !1
                    },
                    20: {
                        name: "MessageTooLongError",
                        retryable: !1
                    },
                    21: {
                        name: "MultipleNestingLevelError",
                        retryable: !1
                    },
                    22: {
                        name: "PayloadTooBigError",
                        retryable: !1
                    },
                    23: {
                        name: "RequestTimeoutError",
                        retryable: !0
                    },
                    24: {
                        name: "MaxHeaderSizeExceededError",
                        retryable: !1
                    },
                    40: {
                        name: "AuthErrorTokenExpired",
                        retryable: !1
                    },
                    41: {
                        name: "AuthErrorTokenNotValidYet",
                        retryable: !1
                    },
                    42: {
                        name: "AuthErrorTokenUsedBeforeIssuedAt",
                        retryable: !1
                    },
                    43: {
                        name: "AuthErrorTokenSignatureInvalid",
                        retryable: !1
                    },
                    44: {
                        name: "CustomCommandEndpointMissingError",
                        retryable: !1
                    },
                    45: {
                        name: "CustomCommandEndpointCallError",
                        retryable: !0
                    },
                    46: {
                        name: "ConnectionIDNotFoundError",
                        retryable: !1
                    },
                    60: {
                        name: "CoolDownError",
                        retryable: !0
                    },
                    69: {
                        name: "ErrWrongRegion",
                        retryable: !1
                    },
                    70: {
                        name: "ErrQueryChannelPermissions",
                        retryable: !1
                    },
                    71: {
                        name: "ErrTooManyConnections",
                        retryable: !0
                    },
                    99: {
                        name: "AppSuspendedError",
                        retryable: !1
                    }
                };

            function ef(e) {
                if (!e.code) return !1;
                var t = ep["".concat(e.code)];
                return !!t && t.retryable
            }

            function ev(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function eg(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ev(Object(n), !0).forEach(function(t) {
                        (0, v.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ev(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }(i = a || (a = {})).Closed = "CLOSED", i.Connected = "CONNECTED", i.Connecting = "CONNECTING", i.Disconnected = "DISCONNECTED", i.Init = "INIT";
            var em = function() {
                    function e(t) {
                        var n, r = this,
                            s = t.client;
                        (0, p.Z)(this, e), (0, v.Z)(this, "client", void 0), (0, v.Z)(this, "state", void 0), (0, v.Z)(this, "consecutiveFailures", void 0), (0, v.Z)(this, "connectionID", void 0), (0, v.Z)(this, "cancelToken", void 0), (0, v.Z)(this, "_onlineStatusChanged", function(e) {
                            if (r._log("_onlineStatusChanged() - ".concat(e.type)), "offline" === e.type) {
                                var t;
                                r._setState(a.Closed), null === (t = r.cancelToken) || void 0 === t || t.cancel("disconnect() is called"), r.cancelToken = void 0;
                                return
                            }
                            "online" === e.type && r.state === a.Closed && r.connect(!0)
                        }), (0, v.Z)(this, "_req", (n = (0, d.Z)(m().mark(function e(t, n, s) {
                            var i, a;
                            return m().wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return r.cancelToken || t.close || (r.cancelToken = b().CancelToken.source()), e.prev = 1, e.next = 4, r.client.doAxiosRequest("get", r.client.baseURL.replace(":3030", ":8900") + "/longpoll", void 0, {
                                            config: eg(eg({}, n), {}, {
                                                cancelToken: null === (i = r.cancelToken) || void 0 === i ? void 0 : i.token
                                            }),
                                            params: t
                                        });
                                    case 4:
                                        return a = e.sent, r.consecutiveFailures = 0, e.abrupt("return", a);
                                    case 9:
                                        if (e.prev = 9, e.t0 = e.catch(1), r.consecutiveFailures += 1, !(s && ef(e.t0))) {
                                            e.next = 17;
                                            break
                                        }
                                        return r._log("_req() - Retryable error, retrying request"), e.next = 16, F(B(r.consecutiveFailures));
                                    case 16:
                                        return e.abrupt("return", r._req(t, n, s));
                                    case 17:
                                        throw e.t0;
                                    case 18:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, null, [
                                [1, 9]
                            ])
                        })), function(e, t, r) {
                            return n.apply(this, arguments)
                        })), (0, v.Z)(this, "_poll", (0, d.Z)(m().mark(function e() {
                            var t, n, s;
                            return m().wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (r.state !== a.Connected) {
                                            e.next = 25;
                                            break
                                        }
                                        return e.prev = 1, e.next = 4, r._req({}, {
                                            timeout: 3e4
                                        }, !0);
                                    case 4:
                                        if (null !== (t = (n = e.sent).events) && void 0 !== t && t.length)
                                            for (s = 0; s < n.events.length; s++) r.client.dispatchEvent(n.events[s]);
                                        e.next = 23;
                                        break;
                                    case 8:
                                        if (e.prev = 8, e.t0 = e.catch(1), !b().isCancel(e.t0)) {
                                            e.next = 13;
                                            break
                                        }
                                        return r._log("_poll() - axios canceled request"), e.abrupt("return");
                                    case 13:
                                        if (46 !== e.t0.code) {
                                            e.next = 18;
                                            break
                                        }
                                        return r._log("_poll() - ConnectionID error, connecting without ID..."), r._setState(a.Disconnected), r.connect(!0), e.abrupt("return");
                                    case 18:
                                        if (!(void 0 !== e.t0.code && !ef(e.t0))) {
                                            e.next = 21;
                                            break
                                        }
                                        return r._setState(a.Closed), e.abrupt("return");
                                    case 21:
                                        return e.next = 23, F(B(r.consecutiveFailures));
                                    case 23:
                                        e.next = 0;
                                        break;
                                    case 25:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, null, [
                                [1, 8]
                            ])
                        }))), (0, v.Z)(this, "connect", (0, d.Z)(m().mark(function e() {
                            var t, n, s = arguments;
                            return m().wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t = s.length > 0 && void 0 !== s[0] && s[0], r.state !== a.Connecting) {
                                            e.next = 4;
                                            break
                                        }
                                        return r._log("connect() - connecting already in progress", {
                                            reconnect: t
                                        }, "warn"), e.abrupt("return");
                                    case 4:
                                        if (r.state !== a.Connected) {
                                            e.next = 7;
                                            break
                                        }
                                        return r._log("connect() - already connected and polling", {
                                            reconnect: t
                                        }, "warn"), e.abrupt("return");
                                    case 7:
                                        return r._setState(a.Connecting), r.connectionID = void 0, e.prev = 9, e.next = 12, r._req({
                                            json: r.client._buildWSPayload()
                                        }, {
                                            timeout: 8e3
                                        }, t);
                                    case 12:
                                        return n = e.sent.event, r._setState(a.Connected), r.connectionID = n.connection_id, r.client.dispatchEvent(n), r._poll(), t && r.client.recoverState(), e.abrupt("return", n);
                                    case 22:
                                        throw e.prev = 22, e.t0 = e.catch(9), r._setState(a.Closed), e.t0;
                                    case 26:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, null, [
                                [9, 22]
                            ])
                        }))), (0, v.Z)(this, "isHealthy", function() {
                            return !!r.connectionID && r.state === a.Connected
                        }), (0, v.Z)(this, "disconnect", (0, d.Z)(m().mark(function e() {
                            var t, n, s, i = arguments;
                            return m().wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return n = i.length > 0 && void 0 !== i[0] ? i[0] : 2e3, X(r._onlineStatusChanged), r._setState(a.Disconnected), null === (t = r.cancelToken) || void 0 === t || t.cancel("disconnect() is called"), r.cancelToken = void 0, s = r.connectionID, r.connectionID = void 0, e.prev = 7, e.next = 10, r._req({
                                            close: !0,
                                            connection_id: s
                                        }, {
                                            timeout: n
                                        }, !1);
                                    case 10:
                                        r._log("disconnect() - Closed connectionID"), e.next = 16;
                                        break;
                                    case 13:
                                        e.prev = 13, e.t0 = e.catch(7), r._log("disconnect() - Failed", {
                                            err: e.t0
                                        }, "error");
                                    case 16:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, null, [
                                [7, 13]
                            ])
                        }))), this.client = s, this.state = a.Init, this.consecutiveFailures = 0, K(this._onlineStatusChanged)
                    }
                    return (0, f.Z)(e, [{
                        key: "_log",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "info";
                            this.client.logger(n, "WSConnectionFallback:" + e, eg({
                                tags: ["connection_fallback", "connection"]
                            }, t))
                        }
                    }, {
                        key: "_setState",
                        value: function(e) {
                            this._log("_setState() - ".concat(e)), this.state === a.Connecting && e === a.Connected && this.client.dispatchEvent({
                                type: "connection.changed",
                                online: !0
                            }), (e === a.Closed || e === a.Disconnected) && this.client.dispatchEvent({
                                type: "connection.changed",
                                online: !1
                            }), this.state = e
                        }
                    }]), e
                }(),
                ey = function(e) {
                    (0, S.Z)(r, e);
                    var t, n = (t = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                        } catch (e) {
                            return !1
                        }
                    }(), function() {
                        var e, n = (0, R.Z)(r);
                        if (t) {
                            var s = (0, R.Z)(this).constructor;
                            e = Reflect.construct(n, arguments, s)
                        } else e = n.apply(this, arguments);
                        return (0, U.Z)(this, e)
                    });

                    function r() {
                        var e;
                        (0, p.Z)(this, r);
                        for (var t = arguments.length, s = Array(t), i = 0; i < t; i++) s[i] = arguments[i];
                        return e = n.call.apply(n, [this].concat(s)), (0, v.Z)((0, Z.Z)(e), "code", void 0), (0, v.Z)((0, Z.Z)(e), "response", void 0), (0, v.Z)((0, Z.Z)(e), "status", void 0), e
                    }
                    return r
                }((0, M.Z)(Error)),
                eb = ["created_at", "updated_at", "last_active", "online"],
                ew = ["params", "headers"];

            function ek(e, t) {
                var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!n) {
                    if (Array.isArray(e) || (n = function(e, t) {
                            if (e) {
                                if ("string" == typeof e) return e_(e, t);
                                var n = Object.prototype.toString.call(e).slice(8, -1);
                                if ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n) return Array.from(e);
                                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return e_(e, t)
                            }
                        }(e)) || t && e && "number" == typeof e.length) {
                        n && (e = n);
                        var r = 0,
                            s = function() {};
                        return {
                            s: s,
                            n: function() {
                                return r >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[r++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: s
                        }
                    }
                    throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var i, a = !0,
                    o = !1;
                return {
                    s: function() {
                        n = n.call(e)
                    },
                    n: function() {
                        var e = n.next();
                        return a = e.done, e
                    },
                    e: function(e) {
                        o = !0, i = e
                    },
                    f: function() {
                        try {
                            a || null == n.return || n.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                }
            }

            function e_(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function ex(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, r)
                }
                return n
            }

            function eC(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ex(Object(n), !0).forEach(function(t) {
                        (0, v.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ex(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }

            function eZ(e) {
                return "string" == typeof e || e instanceof String
            }
            var eS = function() {
                var e, t, n, r, s, i, a, g, y, w, k, x, C, Z, S, U, R, M, L, D, T, P, A, j, H, J, K, X, G, $, Q, V, ee, en, er, ea, eo, eu, eh, ep, ef, ev, eg, e_, ex, eS, eU, eR, eM, eE, eI, eO, eL, eD, eT, eP, eA, ej, eF, eq, eW, eN, eB, eH, ez, eJ, eK, eX, eG, e$, eQ, eV, eY, e0, e1;

                function e2(e, t, n) {
                    var r, s, i, a, o, c = this;
                    (0, p.Z)(this, e2), (0, v.Z)(this, "_user", void 0), (0, v.Z)(this, "activeChannels", void 0), (0, v.Z)(this, "anonymous", void 0), (0, v.Z)(this, "persistUserOnConnectionFailure", void 0), (0, v.Z)(this, "axiosInstance", void 0), (0, v.Z)(this, "baseURL", void 0), (0, v.Z)(this, "browser", void 0), (0, v.Z)(this, "cleaningIntervalRef", void 0), (0, v.Z)(this, "clientID", void 0), (0, v.Z)(this, "configs", void 0), (0, v.Z)(this, "key", void 0), (0, v.Z)(this, "listeners", void 0), (0, v.Z)(this, "logger", void 0), (0, v.Z)(this, "recoverStateOnReconnect", void 0), (0, v.Z)(this, "mutedChannels", void 0), (0, v.Z)(this, "mutedUsers", void 0), (0, v.Z)(this, "node", void 0), (0, v.Z)(this, "options", void 0), (0, v.Z)(this, "secret", void 0), (0, v.Z)(this, "setUserPromise", void 0), (0, v.Z)(this, "state", void 0), (0, v.Z)(this, "tokenManager", void 0), (0, v.Z)(this, "user", void 0), (0, v.Z)(this, "userAgent", void 0), (0, v.Z)(this, "userID", void 0), (0, v.Z)(this, "wsBaseURL", void 0), (0, v.Z)(this, "wsConnection", void 0), (0, v.Z)(this, "wsFallback", void 0), (0, v.Z)(this, "wsPromise", void 0), (0, v.Z)(this, "consecutiveFailures", void 0), (0, v.Z)(this, "insightMetrics", void 0), (0, v.Z)(this, "defaultWSTimeoutWithFallback", void 0), (0, v.Z)(this, "defaultWSTimeout", void 0), (0, v.Z)(this, "nextRequestAbortController", null), (0, v.Z)(this, "_getConnectionID", function() {
                        var e, t;
                        return (null === (e = c.wsConnection) || void 0 === e ? void 0 : e.connectionID) || (null === (t = c.wsFallback) || void 0 === t ? void 0 : t.connectionID)
                    }), (0, v.Z)(this, "_hasConnectionID", function() {
                        return !!c._getConnectionID()
                    }), (0, v.Z)(this, "connectUser", (r = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t.id) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error('The "id" field on the user is missing');
                                case 2:
                                    if (!(c.userID === t.id && c.setUserPromise)) {
                                        e.next = 5;
                                        break
                                    }
                                    return console.warn("Consecutive calls to connectUser is detected, ideally you should only call this function once in your app."), e.abrupt("return", c.setUserPromise);
                                case 5:
                                    if (!c.userID) {
                                        e.next = 7;
                                        break
                                    }
                                    throw Error("Use client.disconnect() before trying to connect as a different user. connectUser was called twice.");
                                case 7:
                                    return (c._isUsingServerAuth() || c.node) && !c.options.allowServerSideConnect && console.warn('Please do not use connectUser server side. connectUser impacts MAU and concurrent connection usage and thus your bill. If you have a valid use-case, add "allowServerSideConnect: true" to the client options to disable this warning.'), c.userID = t.id, c.anonymous = !1, r = c._setToken(t, n), c._setUser(t), s = c.openConnection(), c.setUserPromise = Promise.all([r, s]).then(function(e) {
                                        return e[1]
                                    }), e.prev = 14, e.next = 17, c.setUserPromise;
                                case 17:
                                    return e.abrupt("return", e.sent);
                                case 20:
                                    throw e.prev = 20, e.t0 = e.catch(14), c.persistUserOnConnectionFailure ? c.closeConnection() : c.disconnectUser(), e.t0;
                                case 24:
                                case "end":
                                    return e.stop()
                            }
                        }, e, null, [
                            [14, 20]
                        ])
                    })), function(e, t) {
                        return r.apply(this, arguments)
                    })), (0, v.Z)(this, "setUser", this.connectUser), (0, v.Z)(this, "_setToken", function(e, t) {
                        return c.tokenManager.setTokenOrProvider(t, e)
                    }), (0, v.Z)(this, "closeConnection", (s = (0, d.Z)(m().mark(function e(t) {
                        var n, r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return null != c.cleaningIntervalRef && (clearInterval(c.cleaningIntervalRef), c.cleaningIntervalRef = void 0), e.next = 3, Promise.all([null === (n = c.wsConnection) || void 0 === n ? void 0 : n.disconnect(t), null === (r = c.wsFallback) || void 0 === r ? void 0 : r.disconnect(t)]);
                                case 3:
                                    return e.abrupt("return", Promise.resolve());
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e)
                    })), function(e) {
                        return s.apply(this, arguments)
                    })), (0, v.Z)(this, "openConnection", (0, d.Z)(m().mark(function e() {
                        var t, n, r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (c.userID) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error("User is not set on client, use client.connectUser or client.connectAnonymousUser instead");
                                case 2:
                                    if (!(null !== (t = c.wsConnection) && void 0 !== t && t.isConnecting && c.wsPromise)) {
                                        e.next = 5;
                                        break
                                    }
                                    return c.logger("info", "client:openConnection() - connection already in progress", {
                                        tags: ["connection", "client"]
                                    }), e.abrupt("return", c.wsPromise);
                                case 5:
                                    if (!((null !== (n = c.wsConnection) && void 0 !== n && n.isHealthy || null !== (r = c.wsFallback) && void 0 !== r && r.isHealthy()) && c._hasConnectionID())) {
                                        e.next = 8;
                                        break
                                    }
                                    return c.logger("info", "client:openConnection() - openConnection called twice, healthy connection already exists", {
                                        tags: ["connection", "client"]
                                    }), e.abrupt("return", Promise.resolve());
                                case 8:
                                    return c.clientID = "".concat(c.userID, "--").concat(z()), c.wsPromise = c.connect(), c._startCleaning(), e.abrupt("return", c.wsPromise);
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }, e)
                    }))), (0, v.Z)(this, "_setupConnection", this.openConnection), (0, v.Z)(this, "_normalizeDate", function(e) {
                        if (e instanceof Date && (e = e.toISOString()), "" === e) throw Error("Don't pass blank string for since, use null instead if resetting the token revoke");
                        return e
                    }), (0, v.Z)(this, "disconnectUser", (i = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    for (c.logger("info", "client:disconnect() - Disconnecting the client", {
                                            tags: ["connection", "client"]
                                        }), delete c.user, delete c._user, delete c.userID, c.anonymous = !1, n = c.closeConnection(t), r = 0, s = Object.values(c.activeChannels); r < s.length; r++) s[r]._disconnect();
                                    return c.activeChannels = {}, c.state = new et, setTimeout(c.tokenManager.reset), e.abrupt("return", n);
                                case 11:
                                case "end":
                                    return e.stop()
                            }
                        }, e)
                    })), function(e) {
                        return i.apply(this, arguments)
                    })), (0, v.Z)(this, "disconnect", this.disconnectUser), (0, v.Z)(this, "connectAnonymousUser", function() {
                        (c._isUsingServerAuth() || c.node) && !c.options.allowServerSideConnect && console.warn('Please do not use connectUser server side. connectUser impacts MAU and concurrent connection usage and thus your bill. If you have a valid use-case, add "allowServerSideConnect: true" to the client options to disable this warning.'), c.anonymous = !0, c.userID = z();
                        var e = {
                            id: c.userID,
                            anon: !0
                        };
                        return c._setToken(e, ""), c._setUser(e), c._setupConnection()
                    }), (0, v.Z)(this, "setAnonymousUser", this.connectAnonymousUser), (0, v.Z)(this, "doAxiosRequest", (a = (0, d.Z)(m().mark(function e(t, n, r) {
                        var s, i, a, o, u = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return s = u.length > 3 && void 0 !== u[3] ? u[3] : {}, e.next = 3, c.tokenManager.tokenReady();
                                case 3:
                                    i = c._enrichAxiosOptions(s), e.prev = 4, c._logApiRequest(t, n, r, i), e.t0 = t, e.next = "get" === e.t0 ? 9 : "delete" === e.t0 ? 13 : "post" === e.t0 ? 17 : "put" === e.t0 ? 21 : "patch" === e.t0 ? 25 : "options" === e.t0 ? 29 : 33;
                                    break;
                                case 9:
                                    return e.next = 11, c.axiosInstance.get(n, i);
                                case 11:
                                case 15:
                                case 19:
                                case 23:
                                case 27:
                                case 31:
                                    return a = e.sent, e.abrupt("break", 34);
                                case 13:
                                    return e.next = 15, c.axiosInstance.delete(n, i);
                                case 17:
                                    return e.next = 19, c.axiosInstance.post(n, r, i);
                                case 21:
                                    return e.next = 23, c.axiosInstance.put(n, r, i);
                                case 25:
                                    return e.next = 27, c.axiosInstance.patch(n, r, i);
                                case 29:
                                    return e.next = 31, c.axiosInstance.options(n, i);
                                case 33:
                                    throw Error("Invalid request type");
                                case 34:
                                    return c._logApiResponse(t, n, a), c.consecutiveFailures = 0, e.abrupt("return", c.handleResponse(a));
                                case 39:
                                    if (e.prev = 39, e.t1 = e.catch(4), e.t1.client_request_id = null === (o = i.headers) || void 0 === o ? void 0 : o["x-client-request-id"], c._logApiError(t, n, e.t1), c.consecutiveFailures += 1, !e.t1.response) {
                                        e.next = 56;
                                        break
                                    }
                                    if (!(e.t1.response.data.code === W.TOKEN_EXPIRED && !c.tokenManager.isStatic())) {
                                        e.next = 53;
                                        break
                                    }
                                    if (!(c.consecutiveFailures > 1)) {
                                        e.next = 49;
                                        break
                                    }
                                    return e.next = 49, F(B(c.consecutiveFailures));
                                case 49:
                                    return c.tokenManager.loadToken(), e.next = 52, c.doAxiosRequest(t, n, r, s);
                                case 52:
                                    return e.abrupt("return", e.sent);
                                case 53:
                                    return e.abrupt("return", c.handleResponse(e.t1.response));
                                case 56:
                                    throw e.t1;
                                case 57:
                                case "end":
                                    return e.stop()
                            }
                        }, e, null, [
                            [4, 39]
                        ])
                    })), function(e, t, n) {
                        return a.apply(this, arguments)
                    })), (0, v.Z)(this, "dispatchEvent", function(e) {
                        e.received_at || (e.received_at = new Date);
                        var t = c._handleClientEvent(e),
                            n = e.cid,
                            r = n ? c.activeChannels[n] : void 0;
                        r && r._handleChannelEvent(e), c._callClientListeners(e), r && r._callChannelListeners(e), t.forEach(function(e) {
                            return e()
                        })
                    }), (0, v.Z)(this, "handleEvent", function(e) {
                        var t = JSON.parse(e.data);
                        c.dispatchEvent(t)
                    }), (0, v.Z)(this, "_updateMemberWatcherReferences", function(e) {
                        var t = c.state.userChannelReferences[e.id] || {};
                        for (var n in t) {
                            var r = c.activeChannels[n];
                            null != r && r.state && (r.state.members[e.id] && (r.state.members[e.id].user = e), r.state.watchers[e.id] && (r.state.watchers[e.id] = e))
                        }
                    }), (0, v.Z)(this, "_updateUserReferences", this._updateMemberWatcherReferences), (0, v.Z)(this, "_updateUserMessageReferences", function(e) {
                        var t = c.state.userChannelReferences[e.id] || {};
                        for (var n in t) {
                            var r = c.activeChannels[n].state;
                            null == r || r.updateUserMessages(e)
                        }
                    }), (0, v.Z)(this, "_deleteUserMessageReference", function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            n = c.state.userChannelReferences[e.id] || {};
                        for (var r in n) {
                            var s = c.activeChannels[r].state;
                            null == s || s.deleteUserMessages(e, t)
                        }
                    }), (0, v.Z)(this, "_handleUserEvent", function(e) {
                        if (e.user) {
                            if ("user.presence.changed" === e.type || "user.updated" === e.type) {
                                if (e.user.id === c.userID) {
                                    var t = eC({}, c.user || {}),
                                        n = eC({}, c._user || {});
                                    for (var r in c.user) r in e.user || ({
                                        channel_mutes: !0,
                                        devices: !0,
                                        mutes: !0,
                                        total_unread_count: !0,
                                        unread_channels: !0,
                                        unread_count: !0,
                                        invisible: !0,
                                        roles: !0
                                    })[r] || (delete t[r], delete n[r]);
                                    for (var s in e.user) n && s in n && (n[s] = e.user[s]);
                                    c._user = eC({}, n), c.user = eC(eC({}, t), e.user)
                                }
                                c.state.updateUser(e.user), c._updateMemberWatcherReferences(e.user)
                            }
                            "user.updated" === e.type && c._updateUserMessageReferences(e.user), "user.deleted" === e.type && e.user.deleted_at && (e.mark_messages_deleted || e.hard_delete) && c._deleteUserMessageReference(e.user, e.hard_delete)
                        }
                    }), (0, v.Z)(this, "_callClientListeners", function(e) {
                        var t = [];
                        c.listeners.all && t.push.apply(t, (0, h.Z)(c.listeners.all)), c.listeners[e.type] && t.push.apply(t, (0, h.Z)(c.listeners[e.type]));
                        for (var n = 0; n < t.length; n++)(0, t[n])(e)
                    }), (0, v.Z)(this, "recoverState", (0, d.Z)(m().mark(function e() {
                        var t;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (c.logger("info", "client:recoverState() - Start of recoverState with connectionID ".concat(c._getConnectionID()), {
                                            tags: ["connection"]
                                        }), !((t = Object.keys(c.activeChannels)).length && c.recoverStateOnReconnect)) {
                                        e.next = 10;
                                        break
                                    }
                                    return c.logger("info", "client:recoverState() - Start the querying of ".concat(t.length, " channels"), {
                                        tags: ["connection", "client"]
                                    }), e.next = 6, c.queryChannels({
                                        cid: {
                                            $in: t
                                        }
                                    }, {
                                        last_message_at: -1
                                    }, {
                                        limit: 30
                                    });
                                case 6:
                                    c.logger("info", "client:recoverState() - Querying channels finished", {
                                        tags: ["connection", "client"]
                                    }), c.dispatchEvent({
                                        type: "connection.recovered"
                                    }), e.next = 11;
                                    break;
                                case 10:
                                    c.dispatchEvent({
                                        type: "connection.recovered"
                                    });
                                case 11:
                                    c.wsPromise = Promise.resolve(), c.setUserPromise = Promise.resolve();
                                case 13:
                                case "end":
                                    return e.stop()
                            }
                        }, e)
                    }))), (0, v.Z)(this, "getChannelByMembers", function(e, t) {
                        var n = (0, h.Z)(t.members || []).sort().join(","),
                            r = "".concat(e, ":!members-").concat(n);
                        if (!n) throw Error("Please specify atleast one member when creating unique conversation");
                        for (var s in c.activeChannels) {
                            var i = c.activeChannels[s];
                            if (!i.disconnected && (s === r || 0 === s.indexOf("".concat(e, ":!members-")) && Object.keys(i.state.members).sort().join(",") === n)) return i
                        }
                        var a = new Y(c, e, void 0, t);
                        return c.activeChannels[r] = a, a
                    }), (0, v.Z)(this, "getChannelById", function(e, t, n) {
                        if ("string" == typeof t && ~t.indexOf(":")) throw Error("Invalid channel id ".concat(t, ", can't contain the : character"));
                        var r = "".concat(e, ":").concat(t);
                        if (r in c.activeChannels && !c.activeChannels[r].disconnected) {
                            var s = c.activeChannels[r];
                            return Object.keys(n).length > 0 && (s.data = n, s._data = n), s
                        }
                        var i = new Y(c, e, t, n);
                        return c.activeChannels[i.cid] = i, i
                    }), (0, v.Z)(this, "updateUsers", this.upsertUsers), (0, v.Z)(this, "updateUser", this.upsertUser), (0, v.Z)(this, "markAllRead", this.markChannelsRead), (0, v.Z)(this, "_isUsingServerAuth", function() {
                        return !!c.secret
                    }), (0, v.Z)(this, "_buildWSPayload", function(e) {
                        return JSON.stringify({
                            user_id: c.userID,
                            user_details: c._user,
                            device: c.options.device,
                            client_request_id: e
                        })
                    }), this.key = e, this.listeners = {}, this.state = new et, this.mutedChannels = [], this.mutedUsers = [], t && eZ(t) && (this.secret = t);
                    var u = n || (t && !eZ(t) ? t : {});
                    this.browser = void 0 !== u.browser ? u.browser : "undefined" != typeof window, this.node = !this.browser, this.options = eC({
                        timeout: 3e3,
                        withCredentials: !1,
                        warmUp: !1,
                        recoverStateOnReconnect: !0
                    }, u), this.node && !this.options.httpsAgent && (this.options.httpsAgent = new null.Agent({
                        keepAlive: !0,
                        keepAliveMsecs: 3e3
                    })), this.axiosInstance = b().create(this.options), this.setBaseURL(this.options.baseURL || "https://chat.stream-io-api.com"), void 0 !== I && I.env.STREAM_LOCAL_TEST_RUN && this.setBaseURL("http://localhost:3030"), void 0 !== I && I.env.STREAM_LOCAL_TEST_HOST && this.setBaseURL("http://" + I.env.STREAM_LOCAL_TEST_HOST), this.wsConnection = null, this.wsPromise = null, this.setUserPromise = null, this.activeChannels = {}, this.configs = {}, this.anonymous = !1, this.persistUserOnConnectionFailure = null === (o = this.options) || void 0 === o ? void 0 : o.persistUserOnConnectionFailure, this.tokenManager = new ed(this.secret), this.consecutiveFailures = 0, this.insightMetrics = new es, this.defaultWSTimeoutWithFallback = 6e3, this.defaultWSTimeout = 15e3, this.logger = q(u.logger) ? u.logger : function() {
                        return null
                    }, this.recoverStateOnReconnect = this.options.recoverStateOnReconnect
                }
                return (0, f.Z)(e2, [{
                    key: "devToken",
                    value: function(e) {
                        var t;
                        return ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", (t = JSON.stringify({
                            user_id: e
                        }), (0, o.fromByteArray)(new Uint8Array(function(e, t) {
                            var n = [];
                            if (O(e) && t && O(e)) {
                                for (var r = 0, s = e.length; r < s; r++)
                                    if (e.charAt(r)) {
                                        var i = t(e.charAt(r), r, e);
                                        n[r] = i
                                    }
                            } else if (!O(e) && !(t && O(e))) {
                                for (var a = 0, o = e.length; a < o; a++)
                                    if (a in e) {
                                        var c = t(e[a], a, e);
                                        n[a] = c
                                    }
                            }
                            return n
                        }(t, function(e) {
                            return e.charCodeAt(0)
                        })))), "devtoken"].join(".")
                    }
                }, {
                    key: "getAuthType",
                    value: function() {
                        return this.anonymous ? "anonymous" : "jwt"
                    }
                }, {
                    key: "setBaseURL",
                    value: function(e) {
                        this.baseURL = e, this.wsBaseURL = this.baseURL.replace("http", "ws").replace(":3030", ":8800")
                    }
                }, {
                    key: "_setUser",
                    value: function(e) {
                        this.user = e, this.userID = e.id, this._user = eC({}, e)
                    }
                }, {
                    key: "updateAppSettings",
                    value: (e = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return null != (n = t.apn_config) && n.p12_cert && (t = eC(eC({}, t), {}, {
                                        apn_config: eC(eC({}, n), {}, {
                                            p12_cert: E.from(n.p12_cert).toString("base64")
                                        })
                                    })), e.next = 4, this.patch(this.baseURL + "/app", t);
                                case 4:
                                    return e.abrupt("return", e.sent);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(t) {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "revokeTokens",
                    value: (t = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.updateAppSettings({
                                        revoke_tokens_issued_before: this._normalizeDate(t)
                                    });
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return t.apply(this, arguments)
                    })
                }, {
                    key: "revokeUserToken",
                    value: (n = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.revokeUsersToken([t], n);
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return n.apply(this, arguments)
                    })
                }, {
                    key: "revokeUsersToken",
                    value: (r = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s, i, a;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    n = void 0 === n ? new Date().toISOString() : this._normalizeDate(n), r = [], s = ek(t);
                                    try {
                                        for (s.s(); !(i = s.n()).done;) a = i.value, r.push({
                                            id: a,
                                            set: {
                                                revoke_tokens_issued_before: n
                                            }
                                        })
                                    } catch (e) {
                                        s.e(e)
                                    } finally {
                                        s.f()
                                    }
                                    return e.next = 6, this.partialUpdateUsers(r);
                                case 6:
                                    return e.abrupt("return", e.sent);
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "getAppSettings",
                    value: (s = (0, d.Z)(m().mark(function e() {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/app");
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return s.apply(this, arguments)
                    })
                }, {
                    key: "testPushSettings",
                    value: (i = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/check_push", eC(eC(eC(eC(eC(eC(eC({
                                        user_id: t
                                    }, n.messageID ? {
                                        message_id: n.messageID
                                    } : {}), n.apnTemplate ? {
                                        apn_template: n.apnTemplate
                                    } : {}), n.firebaseTemplate ? {
                                        firebase_template: n.firebaseTemplate
                                    } : {}), n.firebaseDataTemplate ? {
                                        firebase_data_template: n.firebaseDataTemplate
                                    } : {}), n.skipDevices ? {
                                        skip_devices: !0
                                    } : {}), n.pushProviderName ? {
                                        push_provider_name: n.pushProviderName
                                    } : {}), n.pushProviderType ? {
                                        push_provider_type: n.pushProviderType
                                    } : {}));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return i.apply(this, arguments)
                    })
                }, {
                    key: "testSQSSettings",
                    value: (a = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this.post(this.baseURL + "/check_sqs", t);
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return a.apply(this, arguments)
                    })
                }, {
                    key: "setGuestUser",
                    value: (g = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this.anonymous = !0, e.prev = 1, e.next = 4, this.post(this.baseURL + "/guest", {
                                        user: t
                                    });
                                case 4:
                                    n = e.sent, e.next = 11;
                                    break;
                                case 7:
                                    throw e.prev = 7, e.t0 = e.catch(1), this.anonymous = !1, e.t0;
                                case 11:
                                    return this.anonymous = !1, (r = n.user).created_at, r.updated_at, r.last_active, r.online, s = (0, l.Z)(r, eb), e.next = 15, this.connectUser(s, n.access_token);
                                case 15:
                                    return e.abrupt("return", e.sent);
                                case 16:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [1, 7]
                        ])
                    })), function(e) {
                        return g.apply(this, arguments)
                    })
                }, {
                    key: "createToken",
                    value: function(e, t, n) {
                        if (null == this.secret) throw Error("tokens can only be created server-side using the API Secret");
                        var r = {};
                        return t && (r.exp = t), n && (r.iat = n), el(this.secret, e, r, {})
                    }
                }, {
                    key: "on",
                    value: function(e, t) {
                        var n = this,
                            r = t ? e : "all",
                            s = t || e;
                        return r in this.listeners || (this.listeners[r] = []), this.logger("info", "Attaching listener for ".concat(r, " event"), {
                            tags: ["event", "client"]
                        }), this.listeners[r].push(s), {
                            unsubscribe: function() {
                                n.logger("info", "Removing listener for ".concat(r, " event"), {
                                    tags: ["event", "client"]
                                }), n.listeners[r] = n.listeners[r].filter(function(e) {
                                    return e !== s
                                })
                            }
                        }
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        var n = t ? e : "all",
                            r = t || e;
                        n in this.listeners || (this.listeners[n] = []), this.logger("info", "Removing listener for ".concat(n, " event"), {
                            tags: ["event", "client"]
                        }), this.listeners[n] = this.listeners[n].filter(function(e) {
                            return e !== r
                        })
                    }
                }, {
                    key: "_logApiRequest",
                    value: function(e, t, n, r) {
                        this.logger("info", "client: ".concat(e, " - Request - ").concat(t), {
                            tags: ["api", "api_request", "client"],
                            url: t,
                            payload: n,
                            config: r
                        })
                    }
                }, {
                    key: "_logApiResponse",
                    value: function(e, t, n) {
                        this.logger("info", "client:".concat(e, " - Response - url: ").concat(t, " > status ").concat(n.status), {
                            tags: ["api", "api_response", "client"],
                            url: t,
                            response: n
                        })
                    }
                }, {
                    key: "_logApiError",
                    value: function(e, t, n) {
                        this.logger("error", "client:".concat(e, " - Error - url: ").concat(t), {
                            tags: ["api", "api_response", "client"],
                            url: t,
                            error: n
                        })
                    }
                }, {
                    key: "get",
                    value: function(e, t) {
                        return this.doAxiosRequest("get", e, null, {
                            params: t
                        })
                    }
                }, {
                    key: "put",
                    value: function(e, t) {
                        return this.doAxiosRequest("put", e, t)
                    }
                }, {
                    key: "post",
                    value: function(e, t) {
                        return this.doAxiosRequest("post", e, t)
                    }
                }, {
                    key: "patch",
                    value: function(e, t) {
                        return this.doAxiosRequest("patch", e, t)
                    }
                }, {
                    key: "delete",
                    value: function(e, t) {
                        return this.doAxiosRequest("delete", e, null, {
                            params: t
                        })
                    }
                }, {
                    key: "sendFile",
                    value: function(e, t, n, r, s) {
                        var i, a, o, c, l = (i = t, a = n, o = r, c = new(_()), null !== i && "object" === (0, u.Z)(i) && (i.readable || "function" == typeof i._read) || null != i && null != i.constructor && "function" == typeof i.constructor.isBuffer && i.constructor.isBuffer(i) || "undefined" != typeof window && "File" in window && i instanceof File || "undefined" != typeof window && "Blob" in window && i instanceof Blob ? a ? c.append("file", i, a) : c.append("file", i) : c.append("file", {
                            uri: i,
                            name: a || i.split("/").reverse()[0],
                            contentType: o || void 0,
                            type: o || void 0
                        }), c);
                        return null != s && l.append("user", JSON.stringify(s)), this.doAxiosRequest("post", e, l, {
                            headers: l.getHeaders ? l.getHeaders() : {},
                            config: {
                                timeout: 0,
                                maxContentLength: 1 / 0,
                                maxBodyLength: 1 / 0
                            }
                        })
                    }
                }, {
                    key: "errorFromResponse",
                    value: function(e) {
                        var t;
                        return t = new ey("StreamChat error HTTP code: ".concat(e.status)), e.data && e.data.code && ((t = Error("StreamChat error code ".concat(e.data.code, ": ").concat(e.data.message))).code = e.data.code), t.response = e, t.status = e.status, t
                    }
                }, {
                    key: "handleResponse",
                    value: function(e) {
                        var t = e.data;
                        if (!e.status || e.status < 200 || 300 <= e.status) throw this.errorFromResponse(e);
                        return t
                    }
                }, {
                    key: "_handleClientEvent",
                    value: function(e) {
                        var t, n, r, s = this,
                            i = this,
                            a = [];
                        if (this.logger("info", "client:_handleClientEvent - Received event of type { ".concat(e.type, " }"), {
                                tags: ["event", "client"],
                                event: e
                            }), ("user.presence.changed" === e.type || "user.updated" === e.type || "user.deleted" === e.type) && this._handleUserEvent(e), "health.check" === e.type && e.me && (i.user = e.me, i.state.updateUser(e.me), i.mutedChannels = e.me.channel_mutes, i.mutedUsers = e.me.mutes), e.channel && "notification.message_new" === e.type && this._addChannelConfig(e.channel), "notification.channel_mutes_updated" === e.type && null !== (n = e.me) && void 0 !== n && n.channel_mutes) {
                            var o = [],
                                c = [];
                            this.mutedChannels.forEach(function(e) {
                                return e.channel && o.push(e.channel.cid)
                            }), e.me.channel_mutes.forEach(function(e) {
                                return e.channel && c.push(e.channel.cid)
                            }), o.forEach(function(e) {
                                !c.includes(e) && s.activeChannels[e] && (s.activeChannels[e].state.unreadCount = 0)
                            }), this.mutedChannels = e.me.channel_mutes
                        }
                        return "notification.mutes_updated" === e.type && null !== (r = e.me) && void 0 !== r && r.mutes && (this.mutedUsers = e.me.mutes), "notification.mark_read" === e.type && 0 === e.unread_channels && Object.keys(this.activeChannels).forEach(function(e) {
                            return s.activeChannels[e].state.unreadCount = 0
                        }), ("channel.deleted" === e.type || "notification.channel_deleted" === e.type) && e.cid && (i.state.deleteAllChannelReference(e.cid), null === (t = this.activeChannels[e.cid]) || void 0 === t || t._disconnect(), a.push(function() {
                            e.cid && delete s.activeChannels[e.cid]
                        })), a
                    }
                }, {
                    key: "_muteStatus",
                    value: function(e) {
                        for (var t, n = 0; n < this.mutedChannels.length; n++) {
                            var r, s = this.mutedChannels[n];
                            if ((null === (r = s.channel) || void 0 === r ? void 0 : r.cid) === e) {
                                t = {
                                    muted: !s.expires || new Date(s.expires).getTime() > new Date().getTime(),
                                    createdAt: s.created_at ? new Date(s.created_at) : new Date,
                                    expiresAt: s.expires ? new Date(s.expires) : null
                                };
                                break
                            }
                        }
                        return t || {
                            muted: !1,
                            createdAt: null,
                            expiresAt: null
                        }
                    }
                }, {
                    key: "connect",
                    value: (y = (0, d.Z)(m().mark(function e() {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (!(!this.userID || !this._user)) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error("Call connectUser or connectAnonymousUser before starting the connection");
                                case 2:
                                    if (this.wsBaseURL) {
                                        e.next = 4;
                                        break
                                    }
                                    throw Error("Websocket base url not set");
                                case 4:
                                    if (this.clientID) {
                                        e.next = 6;
                                        break
                                    }
                                    throw Error("clientID is not set");
                                case 6:
                                    if (!this.wsConnection && (this.options.warmUp || this.options.enableInsights) && this._sayHi(), this.options.wsConnection && this.node ? (this.options.wsConnection.setClient(this), this.wsConnection = this.options.wsConnection) : this.wsConnection = new ec({
                                            client: this
                                        }), e.prev = 8, !this.wsFallback) {
                                        e.next = 13;
                                        break
                                    }
                                    return e.next = 12, this.wsFallback.connect();
                                case 12:
                                case 15:
                                case 28:
                                    return e.abrupt("return", e.sent);
                                case 13:
                                    return e.next = 15, this.wsConnection.connect(this.options.enableWSFallback ? this.defaultWSTimeoutWithFallback : this.defaultWSTimeout);
                                case 18:
                                    if (e.prev = 18, e.t0 = e.catch(8), !(this.options.enableWSFallback && function(e) {
                                            if ("boolean" == typeof e.isWSFailure) return e.isWSFailure;
                                            try {
                                                return JSON.parse(e.message).isWSFailure
                                            } catch (e) {
                                                return !1
                                            }
                                        }(e.t0) && function() {
                                            var e = "undefined" != typeof navigator ? navigator : "undefined" != typeof window && window.navigator ? window.navigator : void 0;
                                            return e ? "boolean" != typeof e.onLine || e.onLine : (console.warn("isOnline failed to access window.navigator and assume browser is online"), !0)
                                        }())) {
                                        e.next = 29;
                                        break
                                    }
                                    return this.logger("info", "client:connect() - WS failed, fallback to longpoll", {
                                        tags: ["connection", "client"]
                                    }), this.dispatchEvent({
                                        type: "transport.changed",
                                        mode: "longpoll"
                                    }), this.wsConnection._destroyCurrentWSConnection(), this.wsConnection.disconnect().then(), this.wsFallback = new em({
                                        client: this
                                    }), e.next = 28, this.wsFallback.connect();
                                case 29:
                                    throw e.t0;
                                case 30:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [8, 18]
                        ])
                    })), function() {
                        return y.apply(this, arguments)
                    })
                }, {
                    key: "_sayHi",
                    value: function() {
                        var e = this,
                            t = z();
                        this.doAxiosRequest("get", this.baseURL + "/hi", null, {
                            headers: {
                                "x-client-request-id": t
                            }
                        }).catch(function(n) {
                            e.options.enableInsights && ei("http_hi_failed", {
                                api_key: e.key,
                                err: n,
                                client_request_id: t
                            })
                        })
                    }
                }, {
                    key: "queryUsers",
                    value: (w = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s, i, a = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = a.length > 1 && void 0 !== a[1] ? a[1] : [], r = a.length > 2 && void 0 !== a[2] ? a[2] : {}, s = {
                                        presence: !1
                                    }, e.next = 5, this.wsPromise;
                                case 5:
                                    return this._hasConnectionID() || (s.presence = !1), e.next = 8, this.get(this.baseURL + "/users", {
                                        payload: eC(eC({
                                            filter_conditions: t,
                                            sort: N(n)
                                        }, s), r)
                                    });
                                case 8:
                                    return i = e.sent, this.state.updateUsers(i.users), e.abrupt("return", i);
                                case 11:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return w.apply(this, arguments)
                    })
                }, {
                    key: "queryBannedUsers",
                    value: (k = (0, d.Z)(m().mark(function e() {
                        var t, n, r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = s.length > 0 && void 0 !== s[0] ? s[0] : {}, n = s.length > 1 && void 0 !== s[1] ? s[1] : [], r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 5, this.get(this.baseURL + "/query_banned_users", {
                                        payload: eC({
                                            filter_conditions: t,
                                            sort: N(n)
                                        }, r)
                                    });
                                case 5:
                                    return e.abrupt("return", e.sent);
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return k.apply(this, arguments)
                    })
                }, {
                    key: "queryMessageFlags",
                    value: (x = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.length > 0 && void 0 !== r[0] ? r[0] : {}, n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 4, this.get(this.baseURL + "/moderation/flags/message", {
                                        payload: eC({
                                            filter_conditions: t
                                        }, n)
                                    });
                                case 4:
                                    return e.abrupt("return", e.sent);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return x.apply(this, arguments)
                    })
                }, {
                    key: "queryChannels",
                    value: (C = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s, i, a, o, c = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = c.length > 1 && void 0 !== c[1] ? c[1] : [], r = c.length > 2 && void 0 !== c[2] ? c[2] : {}, s = c.length > 3 && void 0 !== c[3] ? c[3] : {}, i = {
                                        state: !0,
                                        watch: !0,
                                        presence: !1
                                    }, e.next = 6, this.wsPromise;
                                case 6:
                                    return this._hasConnectionID() || (i.watch = !1), a = eC(eC({
                                        filter_conditions: t,
                                        sort: N(n)
                                    }, i), r), e.next = 10, this.post(this.baseURL + "/channels", a);
                                case 10:
                                    return o = e.sent, this.dispatchEvent({
                                        type: "channels.queried",
                                        queriedChannels: {
                                            channels: o.channels,
                                            isLatestMessageSet: !0
                                        }
                                    }), e.abrupt("return", this.hydrateActiveChannels(o.channels, s));
                                case 13:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return C.apply(this, arguments)
                    })
                }, {
                    key: "hydrateActiveChannels",
                    value: function() {
                        var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            r = n.skipInitialization,
                            s = n.offlineMode,
                            i = void 0 !== s && s,
                            a = ek(t);
                        try {
                            for (a.s(); !(e = a.n()).done;) {
                                var o = e.value;
                                this._addChannelConfig(o.channel)
                            }
                        } catch (e) {
                            a.e(e)
                        } finally {
                            a.f()
                        }
                        var c, u = [],
                            l = ek(t);
                        try {
                            for (l.s(); !(c = l.n()).done;) {
                                var h = c.value,
                                    d = this.channel(h.channel.type, h.channel.id);
                                d.data = h.channel, d.offlineMode = i, d.initialized = !i, void 0 === r ? d._initializeState(h, "latest") : r.includes(h.channel.id) || (d.state.clearMessages(), d._initializeState(h, "latest")), u.push(d)
                            }
                        } catch (e) {
                            l.e(e)
                        } finally {
                            l.f()
                        }
                        if (!i)
                            for (var p in this.activeChannels) this.activeChannels[p].offlineMode && delete this.activeChannels[p];
                        return u
                    }
                }, {
                    key: "search",
                    value: (Z = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s, i = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (!((r = i.length > 2 && void 0 !== i[2] ? i[2] : {}).offset && (r.sort || r.next))) {
                                        e.next = 3;
                                        break
                                    }
                                    throw Error("Cannot specify offset with sort or next parameters");
                                case 3:
                                    if (s = eC(eC({
                                            filter_conditions: t
                                        }, r), {}, {
                                            sort: r.sort ? N(r.sort) : void 0
                                        }), "string" != typeof n) {
                                        e.next = 8;
                                        break
                                    }
                                    s.query = n, e.next = 13;
                                    break;
                                case 8:
                                    if ("object" !== (0, u.Z)(n)) {
                                        e.next = 12;
                                        break
                                    }
                                    s.message_filter_conditions = n, e.next = 13;
                                    break;
                                case 12:
                                    throw Error("Invalid type ".concat((0, u.Z)(n), " for query parameter"));
                                case 13:
                                    return e.next = 15, this.wsPromise;
                                case 15:
                                    return e.next = 17, this.get(this.baseURL + "/search", {
                                        payload: s
                                    });
                                case 17:
                                    return e.abrupt("return", e.sent);
                                case 18:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return Z.apply(this, arguments)
                    })
                }, {
                    key: "setLocalDevice",
                    value: function(e) {
                        var t, n, r;
                        if (null !== (t = this.wsConnection) && void 0 !== t && t.isConnecting && this.wsPromise || (null !== (n = this.wsConnection) && void 0 !== n && n.isHealthy || null !== (r = this.wsFallback) && void 0 !== r && r.isHealthy()) && this._hasConnectionID()) throw Error("you can only set device before opening a websocket connection");
                        this.options.device = e
                    }
                }, {
                    key: "addDevice",
                    value: (S = (0, d.Z)(m().mark(function e(t, n, r, s) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/devices", eC(eC({
                                        id: t,
                                        push_provider: n
                                    }, null != r ? {
                                        user_id: r
                                    } : {}), null != s ? {
                                        push_provider_name: s
                                    } : {}));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t, n, r) {
                        return S.apply(this, arguments)
                    })
                }, {
                    key: "getDevices",
                    value: (U = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/devices", t ? {
                                        user_id: t
                                    } : {});
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return U.apply(this, arguments)
                    })
                }, {
                    key: "removeDevice",
                    value: (R = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.delete(this.baseURL + "/devices", eC({
                                        id: t
                                    }, n ? {
                                        user_id: n
                                    } : {}));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return R.apply(this, arguments)
                    })
                }, {
                    key: "getRateLimits",
                    value: (M = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s, i, a, o;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = (n = t || {}).serverSide, s = n.web, i = n.android, a = n.ios, o = n.endpoints, e.abrupt("return", this.get(this.baseURL + "/rate_limits", {
                                        server_side: r,
                                        web: s,
                                        android: i,
                                        ios: a,
                                        endpoints: o ? o.join(",") : void 0
                                    }));
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return M.apply(this, arguments)
                    })
                }, {
                    key: "_addChannelConfig",
                    value: function(e) {
                        var t = e.cid,
                            n = e.config;
                        this.configs[t] = n
                    }
                }, {
                    key: "channel",
                    value: function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if (!this.userID && !this._isUsingServerAuth()) throw Error("Call connectUser or connectAnonymousUser before creating a channel");
                        if (~e.indexOf(":")) throw Error("Invalid channel group ".concat(e, ", can't contain the : character"));
                        return null == t || "" === t ? new Y(this, e, void 0, n) : "object" === (0, u.Z)(t) ? this.getChannelByMembers(e, t) : this.getChannelById(e, t, n)
                    }
                }, {
                    key: "partialUpdateUser",
                    value: (L = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.partialUpdateUsers([t]);
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return L.apply(this, arguments)
                    })
                }, {
                    key: "upsertUsers",
                    value: (D = (0, d.Z)(m().mark(function e(t) {
                        var n, r, s, i;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    n = {}, r = ek(t), e.prev = 2, r.s();
                                case 4:
                                    if ((s = r.n()).done) {
                                        e.next = 11;
                                        break
                                    }
                                    if ((i = s.value).id) {
                                        e.next = 8;
                                        break
                                    }
                                    throw Error("User ID is required when updating a user");
                                case 8:
                                    n[i.id] = i;
                                case 9:
                                    e.next = 4;
                                    break;
                                case 11:
                                    e.next = 16;
                                    break;
                                case 13:
                                    e.prev = 13, e.t0 = e.catch(2), r.e(e.t0);
                                case 16:
                                    return e.prev = 16, r.f(), e.finish(16);
                                case 19:
                                    return e.next = 21, this.post(this.baseURL + "/users", {
                                        users: n
                                    });
                                case 21:
                                    return e.abrupt("return", e.sent);
                                case 22:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [2, 13, 16, 19]
                        ])
                    })), function(e) {
                        return D.apply(this, arguments)
                    })
                }, {
                    key: "upsertUser",
                    value: function(e) {
                        return this.upsertUsers([e])
                    }
                }, {
                    key: "partialUpdateUsers",
                    value: (T = (0, d.Z)(m().mark(function e(t) {
                        var n, r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    n = ek(t), e.prev = 1, n.s();
                                case 3:
                                    if ((r = n.n()).done) {
                                        e.next = 9;
                                        break
                                    }
                                    if (r.value.id) {
                                        e.next = 7;
                                        break
                                    }
                                    throw Error("User ID is required when updating a user");
                                case 7:
                                    e.next = 3;
                                    break;
                                case 9:
                                    e.next = 14;
                                    break;
                                case 11:
                                    e.prev = 11, e.t0 = e.catch(1), n.e(e.t0);
                                case 14:
                                    return e.prev = 14, n.f(), e.finish(14);
                                case 17:
                                    return e.next = 19, this.patch(this.baseURL + "/users", {
                                        users: t
                                    });
                                case 19:
                                    return e.abrupt("return", e.sent);
                                case 20:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this, [
                            [1, 11, 14, 17]
                        ])
                    })), function(e) {
                        return T.apply(this, arguments)
                    })
                }, {
                    key: "deleteUser",
                    value: (P = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.delete(this.baseURL + "/users/".concat(t), n);
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return P.apply(this, arguments)
                    })
                }, {
                    key: "restoreUsers",
                    value: (A = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/users/restore", {
                                        user_ids: t
                                    });
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return A.apply(this, arguments)
                    })
                }, {
                    key: "reactivateUser",
                    value: (j = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/users/".concat(t, "/reactivate"), eC({}, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return j.apply(this, arguments)
                    })
                }, {
                    key: "reactivateUsers",
                    value: (H = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/users/reactivate", eC({
                                        user_ids: t
                                    }, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return H.apply(this, arguments)
                    })
                }, {
                    key: "deactivateUser",
                    value: (J = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/users/".concat(t, "/deactivate"), eC({}, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return J.apply(this, arguments)
                    })
                }, {
                    key: "deactivateUsers",
                    value: (K = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/users/deactivate", eC({
                                        user_ids: t
                                    }, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return K.apply(this, arguments)
                    })
                }, {
                    key: "exportUser",
                    value: (X = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/users/".concat(t, "/export"), eC({}, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return X.apply(this, arguments)
                    })
                }, {
                    key: "banUser",
                    value: (G = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/moderation/ban", eC({
                                        target_user_id: t
                                    }, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return G.apply(this, arguments)
                    })
                }, {
                    key: "unbanUser",
                    value: ($ = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.delete(this.baseURL + "/moderation/ban", eC({
                                        target_user_id: t
                                    }, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return $.apply(this, arguments)
                    })
                }, {
                    key: "shadowBan",
                    value: (Q = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.banUser(t, eC({
                                        shadow: !0
                                    }, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return Q.apply(this, arguments)
                    })
                }, {
                    key: "removeShadowBan",
                    value: (V = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.unbanUser(t, eC({
                                        shadow: !0
                                    }, n));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return V.apply(this, arguments)
                    })
                }, {
                    key: "muteUser",
                    value: (ee = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this.post(this.baseURL + "/moderation/mute", eC(eC({
                                        target_id: t
                                    }, n ? {
                                        user_id: n
                                    } : {}), r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return ee.apply(this, arguments)
                    })
                }, {
                    key: "unmuteUser",
                    value: (en = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/moderation/unmute", eC({
                                        target_id: t
                                    }, n ? {
                                        user_id: n
                                    } : {}));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return en.apply(this, arguments)
                    })
                }, {
                    key: "userMuteStatus",
                    value: function(e) {
                        if (!this.user || !this.wsPromise) throw Error("Make sure to await connectUser() first.");
                        for (var t = 0; t < this.mutedUsers.length; t += 1)
                            if (this.mutedUsers[t].target.id === e) return !0;
                        return !1
                    }
                }, {
                    key: "flagMessage",
                    value: (er = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/moderation/flag", eC({
                                        target_message_id: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return er.apply(this, arguments)
                    })
                }, {
                    key: "flagUser",
                    value: (ea = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/moderation/flag", eC({
                                        target_user_id: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return ea.apply(this, arguments)
                    })
                }, {
                    key: "unflagMessage",
                    value: (eo = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/moderation/unflag", eC({
                                        target_message_id: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eo.apply(this, arguments)
                    })
                }, {
                    key: "unflagUser",
                    value: (eu = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/moderation/unflag", eC({
                                        target_user_id: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eu.apply(this, arguments)
                    })
                }, {
                    key: "getCallToken",
                    value: (eh = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/calls/".concat(t), eC({}, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eh.apply(this, arguments)
                    })
                }, {
                    key: "_queryFlags",
                    value: (ep = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.length > 0 && void 0 !== r[0] ? r[0] : {}, n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 4, this.post(this.baseURL + "/moderation/flags", eC({
                                        filter_conditions: t
                                    }, n));
                                case 4:
                                    return e.abrupt("return", e.sent);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return ep.apply(this, arguments)
                    })
                }, {
                    key: "_queryFlagReports",
                    value: (ef = (0, d.Z)(m().mark(function e() {
                        var t, n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.length > 0 && void 0 !== r[0] ? r[0] : {}, n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 4, this.post(this.baseURL + "/moderation/reports", eC({
                                        filter_conditions: t
                                    }, n));
                                case 4:
                                    return e.abrupt("return", e.sent);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return ef.apply(this, arguments)
                    })
                }, {
                    key: "_reviewFlagReport",
                    value: (ev = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = s.length > 2 && void 0 !== s[2] ? s[2] : {}, e.next = 3, this.patch(this.baseURL + "/moderation/reports/".concat(t), eC({
                                        review_result: n
                                    }, r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return ev.apply(this, arguments)
                    })
                }, {
                    key: "_unblockMessage",
                    value: (eg = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/moderation/unblock_message", eC({
                                        target_message_id: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eg.apply(this, arguments)
                    })
                }, {
                    key: "markChannelsRead",
                    value: (e_ = (0, d.Z)(m().mark(function e() {
                        var t, n = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, e.next = 3, this.post(this.baseURL + "/channels/read", eC({}, t));
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return e_.apply(this, arguments)
                    })
                }, {
                    key: "createCommand",
                    value: function(e) {
                        return this.post(this.baseURL + "/commands", e)
                    }
                }, {
                    key: "getCommand",
                    value: function(e) {
                        return this.get(this.baseURL + "/commands/".concat(e))
                    }
                }, {
                    key: "updateCommand",
                    value: function(e, t) {
                        return this.put(this.baseURL + "/commands/".concat(e), t)
                    }
                }, {
                    key: "deleteCommand",
                    value: function(e) {
                        return this.delete(this.baseURL + "/commands/".concat(e))
                    }
                }, {
                    key: "listCommands",
                    value: function() {
                        return this.get(this.baseURL + "/commands")
                    }
                }, {
                    key: "createChannelType",
                    value: function(e) {
                        var t = (0, c.Z)({}, {
                            commands: ["all"]
                        }, e);
                        return this.post(this.baseURL + "/channeltypes", t)
                    }
                }, {
                    key: "getChannelType",
                    value: function(e) {
                        return this.get(this.baseURL + "/channeltypes/".concat(e))
                    }
                }, {
                    key: "updateChannelType",
                    value: function(e, t) {
                        return this.put(this.baseURL + "/channeltypes/".concat(e), t)
                    }
                }, {
                    key: "deleteChannelType",
                    value: function(e) {
                        return this.delete(this.baseURL + "/channeltypes/".concat(e))
                    }
                }, {
                    key: "listChannelTypes",
                    value: function() {
                        return this.get(this.baseURL + "/channeltypes")
                    }
                }, {
                    key: "translateMessage",
                    value: (ex = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/messages/".concat(t, "/translate"), {
                                        language: n
                                    });
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return ex.apply(this, arguments)
                    })
                }, {
                    key: "_normalizeExpiration",
                    value: function(e) {
                        var t = null;
                        if ("number" == typeof e) {
                            var n = new Date;
                            n.setSeconds(n.getSeconds() + e), t = n.toISOString()
                        } else eZ(e) ? t = e : e instanceof Date && (t = e.toISOString());
                        return t
                    }
                }, {
                    key: "_validateAndGetMessageId",
                    value: function(e, t) {
                        var n;
                        if ("string" == typeof e) n = e;
                        else {
                            if (!e.id) throw Error(t);
                            n = e.id
                        }
                        return n
                    }
                }, {
                    key: "pinMessage",
                    value: function(e, t, n, r) {
                        var s = this._validateAndGetMessageId(e, "Please specify the message id when calling unpinMessage");
                        return this.partialUpdateMessage(s, {
                            set: {
                                pinned: !0,
                                pin_expires: this._normalizeExpiration(t),
                                pinned_at: this._normalizeExpiration(r)
                            }
                        }, n)
                    }
                }, {
                    key: "unpinMessage",
                    value: function(e, t) {
                        var n = this._validateAndGetMessageId(e, "Please specify the message id when calling unpinMessage");
                        return this.partialUpdateMessage(n, {
                            set: {
                                pinned: !1
                            }
                        }, t)
                    }
                }, {
                    key: "updateMessage",
                    value: (eS = (0, d.Z)(m().mark(function e(t, n, r) {
                        var s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t.id) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error("Please specify the message id when calling updateMessage");
                                case 2:
                                    return s = (0, c.Z)({}, t), delete s.id, ["command", "created_at", "html", "latest_reactions", "own_reactions", "quoted_message", "reaction_counts", "reply_count", "type", "updated_at", "user", "__html"].forEach(function(e) {
                                        null != s[e] && delete s[e]
                                    }), null != n && (eZ(n) ? s.user_id = n : s.user = {
                                        id: n.id
                                    }), Array.isArray(s.mentioned_users) && !eZ(s.mentioned_users[0]) && (s.mentioned_users = s.mentioned_users.map(function(e) {
                                        return e.id
                                    })), e.next = 10, this.post(this.baseURL + "/messages/".concat(t.id), eC({
                                        message: s
                                    }, r));
                                case 10:
                                    return e.abrupt("return", e.sent);
                                case 11:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t, n) {
                        return eS.apply(this, arguments)
                    })
                }, {
                    key: "partialUpdateMessage",
                    value: (eU = (0, d.Z)(m().mark(function e(t, n, r, s) {
                        var i;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error("Please specify the message id when calling partialUpdateMessage");
                                case 2:
                                    return i = r, null != r && eZ(r) && (i = {
                                        id: r
                                    }), e.next = 6, this.put(this.baseURL + "/messages/".concat(t), eC(eC(eC({}, n), s), {}, {
                                        user: i
                                    }));
                                case 6:
                                    return e.abrupt("return", e.sent);
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t, n, r) {
                        return eU.apply(this, arguments)
                    })
                }, {
                    key: "deleteMessage",
                    value: (eR = (0, d.Z)(m().mark(function e(t, n) {
                        var r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = {}, n && (r = {
                                        hard: !0
                                    }), e.next = 4, this.delete(this.baseURL + "/messages/".concat(t), r);
                                case 4:
                                    return e.abrupt("return", e.sent);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eR.apply(this, arguments)
                    })
                }, {
                    key: "getMessage",
                    value: (eM = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/messages/".concat(t));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eM.apply(this, arguments)
                    })
                }, {
                    key: "getUserAgent",
                    value: function() {
                        return this.userAgent || "stream-chat-javascript-client-".concat(this.node ? "node" : "browser", "-", "8.5.0")
                    }
                }, {
                    key: "setUserAgent",
                    value: function(e) {
                        this.userAgent = e
                    }
                }, {
                    key: "_enrichAxiosOptions",
                    value: function() {
                        var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                                params: {},
                                headers: {},
                                config: {}
                            },
                            n = this._getToken(),
                            r = null;
                        null !== this.nextRequestAbortController && (r = this.nextRequestAbortController.signal, this.nextRequestAbortController = null), null !== (e = t.headers) && void 0 !== e && e["x-client-request-id"] || (t.headers = eC(eC({}, t.headers), {}, {
                            "x-client-request-id": z()
                        }));
                        var s = this.options.axiosRequestConfig || {},
                            i = s.params,
                            a = s.headers,
                            o = (0, l.Z)(s, ew);
                        return eC(eC(eC({
                            params: eC(eC({
                                user_id: this.userID,
                                connection_id: this._getConnectionID(),
                                api_key: this.key
                            }, t.params), i || {}),
                            headers: eC(eC(eC({}, n ? {
                                Authorization: n
                            } : void 0), {}, {
                                "stream-auth-type": this.getAuthType(),
                                "X-Stream-Client": this.getUserAgent()
                            }, t.headers), a || {})
                        }, r ? {
                            signal: r
                        } : {}), t.config), o || {})
                    }
                }, {
                    key: "_getToken",
                    value: function() {
                        return !this.tokenManager || this.anonymous ? null : this.tokenManager.getToken()
                    }
                }, {
                    key: "_startCleaning",
                    value: function() {
                        var e = this;
                        null == this.cleaningIntervalRef && (this.cleaningIntervalRef = setInterval(function() {
                            for (var t = 0, n = Object.values(e.activeChannels); t < n.length; t++) n[t].clean()
                        }, 500))
                    }
                }, {
                    key: "verifyWebhook",
                    value: function(e, t) {
                        var n, r;
                        return !!this.secret && (n = this.secret, r = E.from(n, "ascii"), null.createHmac("sha256", r).update(e).digest("hex") === t)
                    }
                }, {
                    key: "getPermission",
                    value: function(e) {
                        return this.get("".concat(this.baseURL, "/permissions/").concat(e))
                    }
                }, {
                    key: "createPermission",
                    value: function(e) {
                        return this.post("".concat(this.baseURL, "/permissions"), eC({}, e))
                    }
                }, {
                    key: "updatePermission",
                    value: function(e, t) {
                        return this.put("".concat(this.baseURL, "/permissions/").concat(e), eC({}, t))
                    }
                }, {
                    key: "deletePermission",
                    value: function(e) {
                        return this.delete("".concat(this.baseURL, "/permissions/").concat(e))
                    }
                }, {
                    key: "listPermissions",
                    value: function() {
                        return this.get("".concat(this.baseURL, "/permissions"))
                    }
                }, {
                    key: "createRole",
                    value: function(e) {
                        return this.post("".concat(this.baseURL, "/roles"), {
                            name: e
                        })
                    }
                }, {
                    key: "listRoles",
                    value: function() {
                        return this.get("".concat(this.baseURL, "/roles"))
                    }
                }, {
                    key: "deleteRole",
                    value: function(e) {
                        return this.delete("".concat(this.baseURL, "/roles/").concat(e))
                    }
                }, {
                    key: "sync",
                    value: function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return this.post("".concat(this.baseURL, "/sync"), eC({
                            channel_cids: e,
                            last_sync_at: t
                        }, n))
                    }
                }, {
                    key: "sendUserCustomEvent",
                    value: (eE = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post("".concat(this.baseURL, "/users/").concat(t, "/event"), {
                                        event: n
                                    });
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eE.apply(this, arguments)
                    })
                }, {
                    key: "createBlockList",
                    value: function(e) {
                        return this.post("".concat(this.baseURL, "/blocklists"), e)
                    }
                }, {
                    key: "listBlockLists",
                    value: function() {
                        return this.get("".concat(this.baseURL, "/blocklists"))
                    }
                }, {
                    key: "getBlockList",
                    value: function(e) {
                        return this.get("".concat(this.baseURL, "/blocklists/").concat(e))
                    }
                }, {
                    key: "updateBlockList",
                    value: function(e, t) {
                        return this.put("".concat(this.baseURL, "/blocklists/").concat(e), t)
                    }
                }, {
                    key: "deleteBlockList",
                    value: function(e) {
                        return this.delete("".concat(this.baseURL, "/blocklists/").concat(e))
                    }
                }, {
                    key: "exportChannels",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            n = eC({
                                channels: e
                            }, t);
                        return this.post("".concat(this.baseURL, "/export_channels"), n)
                    }
                }, {
                    key: "exportUsers",
                    value: function(e) {
                        return this.post("".concat(this.baseURL, "/export/users"), e)
                    }
                }, {
                    key: "exportChannel",
                    value: function(e, t) {
                        return this.exportChannels([e], t)
                    }
                }, {
                    key: "getExportChannelStatus",
                    value: function(e) {
                        return this.get("".concat(this.baseURL, "/export_channels/").concat(e))
                    }
                }, {
                    key: "createSegment",
                    value: (eI = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/segments", {
                                        segment: t
                                    });
                                case 2:
                                    return n = e.sent.segment, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eI.apply(this, arguments)
                    })
                }, {
                    key: "querySegments",
                    value: (eO = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.get(this.baseURL + "/segments", {
                                        payload: eC({
                                            filter_conditions: t
                                        }, n)
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eO.apply(this, arguments)
                    })
                }, {
                    key: "updateSegment",
                    value: (eL = (0, d.Z)(m().mark(function e(t, n) {
                        var r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.put(this.baseURL + "/segments/".concat(t), {
                                        segment: n
                                    });
                                case 2:
                                    return r = e.sent.segment, e.abrupt("return", r);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eL.apply(this, arguments)
                    })
                }, {
                    key: "deleteSegment",
                    value: (eD = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.abrupt("return", this.delete(this.baseURL + "/segments/".concat(t)));
                                case 1:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eD.apply(this, arguments)
                    })
                }, {
                    key: "createCampaign",
                    value: (eT = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/campaigns", {
                                        campaign: t
                                    });
                                case 2:
                                    return n = e.sent.campaign, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eT.apply(this, arguments)
                    })
                }, {
                    key: "queryCampaigns",
                    value: (eP = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.get(this.baseURL + "/campaigns", {
                                        payload: eC({
                                            filter_conditions: t
                                        }, n)
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eP.apply(this, arguments)
                    })
                }, {
                    key: "updateCampaign",
                    value: (eA = (0, d.Z)(m().mark(function e(t, n) {
                        var r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.put(this.baseURL + "/campaigns/".concat(t), {
                                        campaign: n
                                    });
                                case 2:
                                    return r = e.sent.campaign, e.abrupt("return", r);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eA.apply(this, arguments)
                    })
                }, {
                    key: "deleteCampaign",
                    value: (ej = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.abrupt("return", this.delete(this.baseURL + "/campaigns/".concat(t), n));
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return ej.apply(this, arguments)
                    })
                }, {
                    key: "scheduleCampaign",
                    value: (eF = (0, d.Z)(m().mark(function e(t, n) {
                        var r, s;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = n.scheduledFor, e.next = 3, this.patch(this.baseURL + "/campaigns/".concat(t, "/schedule"), {
                                        scheduled_for: r
                                    });
                                case 3:
                                    return s = e.sent.campaign, e.abrupt("return", s);
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eF.apply(this, arguments)
                    })
                }, {
                    key: "stopCampaign",
                    value: (eq = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.patch(this.baseURL + "/campaigns/".concat(t, "/stop"));
                                case 2:
                                    return n = e.sent.campaign, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eq.apply(this, arguments)
                    })
                }, {
                    key: "resumeCampaign",
                    value: (eW = (0, d.Z)(m().mark(function e(t) {
                        var n;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.patch(this.baseURL + "/campaigns/".concat(t, "/resume"));
                                case 2:
                                    return n = e.sent.campaign, e.abrupt("return", n);
                                case 5:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eW.apply(this, arguments)
                    })
                }, {
                    key: "testCampaign",
                    value: (eN = (0, d.Z)(m().mark(function e(t, n) {
                        var r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = n.users, e.next = 3, this.post(this.baseURL + "/campaigns/".concat(t, "/test"), {
                                        users: r
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eN.apply(this, arguments)
                    })
                }, {
                    key: "queryRecipients",
                    value: (eB = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.get(this.baseURL + "/recipients", {
                                        payload: eC({
                                            filter_conditions: t
                                        }, n)
                                    });
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eB.apply(this, arguments)
                    })
                }, {
                    key: "enrichURL",
                    value: (eH = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.abrupt("return", this.get(this.baseURL + "/og", {
                                        url: t
                                    }));
                                case 1:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eH.apply(this, arguments)
                    })
                }, {
                    key: "getTask",
                    value: (ez = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.abrupt("return", this.get("".concat(this.baseURL, "/tasks/").concat(t)));
                                case 1:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return ez.apply(this, arguments)
                    })
                }, {
                    key: "deleteChannels",
                    value: (eJ = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this.post(this.baseURL + "/channels/delete", eC({
                                        cids: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eJ.apply(this, arguments)
                    })
                }, {
                    key: "deleteUsers",
                    value: (eK = (0, d.Z)(m().mark(function e(t, n) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (!((null == n ? void 0 : n.user) !== "soft" && (null == n ? void 0 : n.user) !== "hard")) {
                                        e.next = 2;
                                        break
                                    }
                                    throw Error("Invalid delete user options. user must be one of [soft hard]");
                                case 2:
                                    if (!(void 0 !== n.messages && "soft" !== n.messages && "hard" !== n.messages)) {
                                        e.next = 4;
                                        break
                                    }
                                    throw Error("Invalid delete user options. messages must be one of [soft hard]");
                                case 4:
                                    if (!(void 0 !== n.conversations && "soft" !== n.conversations && "hard" !== n.conversations)) {
                                        e.next = 6;
                                        break
                                    }
                                    throw Error("Invalid delete user options. conversations must be one of [soft hard]");
                                case 6:
                                    return e.next = 8, this.post(this.baseURL + "/users/delete", eC({
                                        user_ids: t
                                    }, n));
                                case 8:
                                    return e.abrupt("return", e.sent);
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e, t) {
                        return eK.apply(this, arguments)
                    })
                }, {
                    key: "_createImportURL",
                    value: (eX = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/import_urls", {
                                        filename: t
                                    });
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eX.apply(this, arguments)
                    })
                }, {
                    key: "_createImport",
                    value: (eG = (0, d.Z)(m().mark(function e(t) {
                        var n, r = arguments;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = r.length > 1 && void 0 !== r[1] ? r[1] : {
                                        mode: "upsert"
                                    }, e.next = 3, this.post(this.baseURL + "/imports", eC({
                                        path: t
                                    }, n));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eG.apply(this, arguments)
                    })
                }, {
                    key: "_getImport",
                    value: (e$ = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/imports/".concat(t));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return e$.apply(this, arguments)
                    })
                }, {
                    key: "_listImports",
                    value: (eQ = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/imports", t);
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eQ.apply(this, arguments)
                    })
                }, {
                    key: "upsertPushProvider",
                    value: (eV = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/push_providers", {
                                        push_provider: t
                                    });
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eV.apply(this, arguments)
                    })
                }, {
                    key: "deletePushProvider",
                    value: (eY = (0, d.Z)(m().mark(function e(t) {
                        var n, r;
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = t.type, r = t.name, e.next = 3, this.delete(this.baseURL + "/push_providers/".concat(n, "/").concat(r));
                                case 3:
                                    return e.abrupt("return", e.sent);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return eY.apply(this, arguments)
                    })
                }, {
                    key: "listPushProviders",
                    value: (e0 = (0, d.Z)(m().mark(function e() {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.get(this.baseURL + "/push_providers");
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function() {
                        return e0.apply(this, arguments)
                    })
                }, {
                    key: "createAbortControllerForNextRequest",
                    value: function() {
                        return this.nextRequestAbortController = new AbortController
                    }
                }, {
                    key: "commitMessage",
                    value: (e1 = (0, d.Z)(m().mark(function e(t) {
                        return m().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, this.post(this.baseURL + "/messages/".concat(t, "/commit"));
                                case 2:
                                    return e.abrupt("return", e.sent);
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    })), function(e) {
                        return e1.apply(this, arguments)
                    })
                }], [{
                    key: "getInstance",
                    value: function(e, t, n) {
                        return e2._instance || ("string" == typeof t ? e2._instance = new e2(e, t, n) : e2._instance = new e2(e, t)), e2._instance
                    }
                }]), e2
            }();
            (0, v.Z)(eS, "_instance", void 0);
            var eU = "Allow",
                eR = ["*"],
                eM = ["*"],
                eE = function e(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : eR,
                        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : eM,
                        i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                        a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : eU;
                    (0, p.Z)(this, e), (0, v.Z)(this, "name", void 0), (0, v.Z)(this, "action", void 0), (0, v.Z)(this, "owner", void 0), (0, v.Z)(this, "priority", void 0), (0, v.Z)(this, "resources", void 0), (0, v.Z)(this, "roles", void 0), this.name = t, this.action = a, this.owner = i, this.priority = n, this.resources = r, this.roles = s
                };
            new eE("Allow all", 999, eR, eM, !1, eU), new eE("Deny all", 1, eR, eM, !1, "Deny")
        }
    }
]);
//# sourceMappingURL=cca69633.f4a2c93aada7fc4e.js.map