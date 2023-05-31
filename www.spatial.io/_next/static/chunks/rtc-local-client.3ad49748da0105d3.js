"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1976], {
        56058: function(e, t, n) {
            n.d(t, {
                Z: function() {
                    return s
                }
            });
            var i = n(95235);
            class s {
                constructor(e, t) {
                    (0, i.Z)(this, "id", void 0), this.id = setTimeout(t, 1e3 * e)
                }
                Cancel() {
                    clearTimeout(this.id)
                }
            }
        },
        66363: function(e, t, n) {
            n.r(t), n.d(t, {
                AddLocalMedia: function() {
                    return eC
                },
                AddMessageHandler: function() {
                    return X
                },
                ClaimChannel: function() {
                    return eu
                },
                GetAllLocalMedia: function() {
                    return B
                },
                GetAllRemoteClients: function() {
                    return W
                },
                GetChannel: function() {
                    return $
                },
                GetID: function() {
                    return x
                },
                GetLocalMedia: function() {
                    return z
                },
                GetMCUMedia: function() {
                    return V
                },
                GetMcuChannel: function() {
                    return G
                },
                GetRemoteClient: function() {
                    return J
                },
                HandleMCULayoutChanged: function() {
                    return ea
                },
                HandleRemoteClientReleasedChannel: function() {
                    return er
                },
                HandleRemoteUpstreamConnectionClose: function() {
                    return eo
                },
                HandleRemoteUpstreamConnectionOpen: function() {
                    return es
                },
                Initialize: function() {
                    return em
                },
                InitializeLogger: function() {
                    return Q
                },
                NotifyLocalMediasUpdated: function() {
                    return Y
                },
                ReleaseChannel: function() {
                    return eh
                },
                RemoveLocalMedia: function() {
                    return ef
                },
                RemoveMessageHandler: function() {
                    return K
                },
                SendChannelMessage: function() {
                    return q
                },
                channelConnectionStatusChanged: function() {
                    return H
                },
                clientInitialized: function() {
                    return P
                },
                mcuLayoutChanged: function() {
                    return j
                },
                remoteClientClaimedChannel: function() {
                    return U
                },
                remoteClientReleasedChannel: function() {
                    return N
                }
            });
            var i, s, o = n(55786),
                a = n.n(o),
                r = n(13115),
                c = n(39337),
                l = n(44868),
                d = n(54537),
                u = n(35248),
                h = n(56058),
                C = n(38375);
            class f extends a().LogProvider {
                doLog(e) {
                    if (e.getException()) l.k.error(C.C, e.getException());
                    else {
                        let t = e.getMessage();
                        switch (e.getLevel()) {
                            case a().LogLevel.Verbose:
                            case a().LogLevel.Debug:
                                l.k.debug(C.C, t);
                                break;
                            case a().LogLevel.Info:
                                l.k.info(C.C, t);
                                break;
                            case a().LogLevel.Warn:
                                l.k.warn(C.C, t);
                                break;
                            case a().LogLevel.Error:
                                l.k.error(C.C, t)
                        }
                    }
                }
            }
            var m = n(95235),
                g = n(69870),
                S = n(51294);
            class _ extends S.Z {
                CreateConnection() {
                    l.k.debug(C.C, `${this.ObjectDebugString()}.CreateConnection()`);
                    let e = new(a()).VideoStream(this._media);
                    return e.setSimulcastMode(a().SimulcastMode.RtpStreamId), k.createMcuConnection(e)
                }
            }
            class v {
                GetID() {
                    return this._ID
                }
                GetUserID() {
                    return this._userID
                }
                GetDeviceID() {
                    return this._deviceID
                }
                GetRemoteMedia(e) {
                    return this._medias[e]
                }
                GetAllRemoteMedias() {
                    return this._medias
                }
                ObjectDebugString() {
                    return `RemoteClient{userID=${this.GetID()}:clientID=${this.GetUserID()}}`
                }
                constructor(e, t, n) {
                    (0, m.Z)(this, "TIMEOUT_DURATION_SECONDS", 10), (0, m.Z)(this, "_ID", void 0), (0, m.Z)(this, "_userID", void 0), (0, m.Z)(this, "_deviceID", void 0), (0, m.Z)(this, "_medias", {}), (0, m.Z)(this, "_timeoutCommand", null), (0, m.Z)(this, "connectedToChannel", new r.Signal), (0, m.Z)(this, "disconnectedFromChannel", new r.Signal), (0, m.Z)(this, "timedOut", new r.Signal), (0, m.Z)(this, "capturedMedia", new r.Event), (0, m.Z)(this, "releasedMedia", new r.Event), this._ID = e, this._userID = t, this._deviceID = n
                }
                Dispose() {
                    l.k.debug(C.C, `${this.ObjectDebugString()}.Dispose()`), null != this._timeoutCommand && this._timeoutCommand.Cancel(), Object.keys(this._medias).forEach(e => {
                        this.HandleRemoteMediaReleased(e)
                    })
                }
                HandleRemoteUpstreamConnectionOpen(e) {
                    e.getMediaId() in this._medias || "Voice" !== e.getTag() || this.HandleRemoteMediaCaptured(e.getMediaId(), "Voice", -1), "Cast" === e.getTag() && this.HandleRemoteMediaCaptured(e.getMediaId(), e.getTag(), -1), e.getMediaId() in this._medias && this._medias[e.getMediaId()].HandleSfuAvailable(e)
                }
                HandleRemoteUpstreamConnectionClose(e) {
                    e.getMediaId() in this._medias && this._medias[e.getMediaId()].HandleSfuUnavailable()
                }
                HandleConnectedToChannel() {
                    l.k.info(C.C, `${this.ObjectDebugString()}.HandleConnectedToChannel()`), Y(), null != this._timeoutCommand && (this._timeoutCommand.Cancel(), this._timeoutCommand = null), this.connectedToChannel.emit()
                }
                HandleDisconnectedFromChannel() {
                    l.k.info(C.C, `${this.ObjectDebugString()}.HandleDisconnectedFromChannel()`), this._timeoutCommand = new h.Z(this.TIMEOUT_DURATION_SECONDS, () => {
                        l.k.info(C.C, `${this.ObjectDebugString()} timed out`), this._timeoutCommand = null, er(this._ID), this.timedOut.emit()
                    }), this.disconnectedFromChannel.emit()
                }
                HandleRemoteMediasUpdated(e) {
                    l.k.debug(C.C, `${this.ObjectDebugString()}.HandleRemoteMediasUpdated()`);
                    let t = new Set(Object.keys(e)),
                        n = new Set(Object.keys(this._medias)),
                        i = [...t].filter(e => !n.has(e));
                    i.forEach(t => {
                        let n = e[t];
                        this.HandleRemoteMediaCaptured(t, n.mediaType, n.frameRate);
                        let i = D.getRemoteUpstreamConnectionInfos(),
                            s = k.getRemoteUpstreamConnectionInfos();
                        i.concat(s).forEach(e => {
                            e.getMediaId() === t && this._medias[e.getMediaId()].HandleSfuAvailable(e)
                        })
                    });
                    let s = [...n].filter(e => !t.has(e));
                    s.forEach(e => {
                        this.HandleRemoteMediaReleased(e)
                    })
                }
                HandleRemoteMediaCaptured(e, t, n) {
                    l.k.info(C.C, `${this.ObjectDebugString()}.HandleRemoteMediaCaptured()`, {
                        mediaID: e
                    }), "mcu" === e ? this._medias[e] = new _(e, t, n, this) : "Webcam" === t ? this._medias[e] = new g.Z(e, t, n, this) : this._medias[e] = new S.Z(e, t, n, this), this.capturedMedia.emit({
                        mediaID: e,
                        mediaType: t
                    })
                }
                HandleRemoteMediaReleased(e) {
                    l.k.info(C.C, `${this.ObjectDebugString()}.HandleRemoteMediaReleased()`, {
                        mediaID: e
                    }), this._medias[e].Dispose(), delete this._medias[e], this.releasedMedia.emit(e)
                }
            }(i = s || (s = {}))[i.Ignore = 0] = "Ignore", i[i.Queue = 1] = "Queue";
            let p = null,
                b = null,
                R = null,
                I = null,
                D = null,
                k = null,
                O = null,
                M = null,
                w = null,
                E = !1,
                L = null,
                Z = 1,
                y = c.Fe.Disconnected,
                A = {},
                F = {},
                T = {},
                H = new r.Event,
                U = new r.Event,
                N = new r.Event,
                j = new r.Event,
                P = new r.Event;

            function $() {
                return D
            }

            function G() {
                return k
            }

            function V() {
                return O
            }

            function x() {
                return I.getId()
            }

            function z(e) {
                return A[e]
            }

            function B() {
                return A
            }

            function J(e) {
                return F[e]
            }

            function W() {
                return F
            }

            function Q() {
                a().Log.setLogLevel(a().LogLevel.Warn);
                let e = new f;
                e.setLevel(a().LogLevel.Warn), a().Log.registerProvider(e)
            }

            function X(e, t) {
                if (e in T) throw Error("Can't add message handler for message type that already has a handler");
                l.k.debug(C.C, `LocalClient.AddMessageHandler(${e})`), T[e] = t
            }

            function K(e) {
                if (!(e in T)) throw Error("Can't remove message handler for message type that has no handler");
                l.k.debug(C.C, `LocalClient.RemoveMessageHandler(${e})`), delete T[e]
            }

            function q(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s.Ignore;
                return l.k.debug(C.C, `LocalClient.SendChannelMessage(${e}, ${t})`), new Promise((i, o) => {
                    if (n === s.Queue) throw Error("SendChannelMessage does not support queueing messages when disconnected");
                    if (null == M) throw Error("Can't send message when no channel is claimed");
                    if (null == D) throw Error("Can't send message when channel is null");
                    D.sendMessage(JSON.stringify({
                        type: e,
                        payload: t
                    })).then(() => i()).fail(() => o())
                })
            }

            function Y() {
                if (l.k.debug(C.C, "LocalClient.NotifyLocalMediasUpdated()"), !E) {
                    let e = {};
                    Object.entries(A).forEach(t => {
                        let [n, i] = t;
                        e[n] = {
                            mediaType: i.mediaType,
                            frameRate: i.frameRate
                        }
                    }), q("LocalMediasUpdated", JSON.stringify(e)).catch(e => {
                        l.k.error(C.C, 'LocalClient: sending channel message "LocalMediasUpdated" failed', e)
                    })
                }
            }

            function ee(e, t) {
                if (e.getId() !== I.getId()) {
                    l.k.debug(C.C, "LocalClient.HandleMessage()", {
                        id: e.getId(),
                        userId: e.getUserId(),
                        message: t
                    });
                    let n = JSON.parse(t);
                    if (n.type in T) T[n.type](e, n.payload);
                    else throw Error("Unhandled message type")
                } else l.k.debug(C.C, `ignoring message from self ${t}`)
            }

            function et(e, t, n) {
                l.k.debug(C.C, "LocalClient.HandleRemoteClientClaimedChannel", {
                    clientID: e,
                    userID: t,
                    deviceID: n
                }), F[e] = new v(e, t, n), U.emit(e)
            }

            function en(e) {
                e.getId() in F || et(e.getId(), e.getUserId(), e.getDeviceId()), F[e.getId()].HandleConnectedToChannel()
            }

            function ei(e) {
                e.getId() in F && F[e.getId()].HandleDisconnectedFromChannel()
            }

            function es(e) {
                e.getClientId() in F || et(e.getClientId(), e.getUserId(), e.getDeviceId()), F[e.getClientId()].HandleRemoteUpstreamConnectionOpen(e)
            }

            function eo(e) {
                e.getClientId() in F && F[e.getClientId()].HandleRemoteUpstreamConnectionClose(e)
            }

            function ea(e) {
                j.emit(e)
            }

            function er(e) {
                if (l.k.debug(C.C, `LocalClient.HandleRemoteClientReleasedChannel(clientID=${e})`), !(e in F)) {
                    l.k.warn(C.C, `LocalClient.HandleRemoteClientReleasedChannel(clientID=${e}): remote client does not exist`);
                    return
                }
                F[e].Dispose(), delete F[e], N.emit(e)
            }
            async function ec(e) {
                l.k.debug(C.C, "LocalClient.ConnectToChannel()");
                let t = e;
                if (!t) {
                    let {
                        liveswitchToken: e
                    } = await d.zt.rooms.generateLiveswitchToken(u.lt, [M.getId(), w.getId()]);
                    t = e
                }
                y = c.Fe.Connecting, H.emit(y), I.register(t).then(e => {
                    if (!M || E) throw el(), Error("already released channel before fully connected");
                    return function(e) {
                        if (l.k.debug(C.C, `LocalClient.HandleConnectedToChannel(${e[0].getId()})`), 2 !== e.length) throw l.k.error(C.C, "Incorrect number of channels"), Error("Incorrect number of channels");
                        e[0].getId().endsWith("_mcu") ? (e[1].getId().endsWith("_mcu") && l.k.error(C.C, "Multiple MCU channels"), k = e[0], D = e[1]) : (e[1].getId().endsWith("_mcu") || l.k.error(C.C, "No MCU channels"), D = e[0], k = e[1]), D.addOnMessage(ee), D.addOnRemoteClientJoin(en), D.addOnRemoteClientLeave(ei), D.addOnRemoteUpstreamConnectionOpen(es), D.addOnRemoteUpstreamConnectionClose(eo), k.addOnRemoteUpstreamConnectionOpen(es), k.addOnRemoteUpstreamConnectionClose(eo), k.addOnMcuVideoLayout(ea), X("LocalMediasUpdated", (e, t) => {
                            var n;
                            n = JSON.parse(t), e.getId() in F || et(e.getId(), e.getUserId(), e.getDeviceId()), F[e.getId()].HandleRemoteMediasUpdated(n)
                        }), X("ChannelReleased", e => er(e.getId())), Z = 1, y = c.Fe.Connected, H.emit(y), Object.values(A).forEach(e => {
                            e.HandleSfuAvailable(null)
                        });
                        let t = D.getRemoteClientInfos();
                        t.forEach(e => {
                            en(e)
                        }), M && M.getId() === D.getId() ? Y() : el(), F.mcu.HandleRemoteMediasUpdated({
                            mcu: {
                                mediaType: "mcu",
                                frameRate: 8
                            }
                        }), (O = F.mcu.GetRemoteMedia("mcu")).HandleSfuAvailable(null)
                    }(e)
                }).fail(e => {
                    l.k.error(C.C, "Could not register liveswitch token", e)
                })
            }

            function el() {
                l.k.debug(C.C, "LocalClient.DisconnectFromChannel()"), y = c.Fe.Disconnecting, H.emit(y), I.unregister()
            }

            function ed(e) {
                if (I !== e) {
                    let e = "Impossible! - LocalClient.HandleStateChanged: _localClient != client";
                    throw l.k.error(C.C, e), Error(e)
                }
                I.getState() === a().ClientState.Registered || I.getState() === a().ClientState.Unregistered && (null != D && (Object.values(A).forEach(e => {
                    e.HandleSfuUnavailable()
                }), D.removeOnMessage(ee), D.removeOnRemoteClientJoin(en), D.removeOnRemoteClientLeave(ei), D.removeOnRemoteUpstreamConnectionOpen(es), D.removeOnRemoteUpstreamConnectionClose(eo), k.removeOnRemoteUpstreamConnectionOpen(es), k.removeOnRemoteUpstreamConnectionClose(eo), k.removeOnMcuVideoLayout(ea), K("LocalMediasUpdated"), K("ChannelReleased"), D = null), null == I.getUnregisterException() ? (l.k.info(C.C, "LocalClient.HandleDisconnectedFromChannel()"), y = c.Fe.Disconnected, H.emit(y), null != M && ec()) : (l.k.info(C.C, "LocalClient.HandleFailedConnectionToChannel()"), y = c.Fe.Failed, H.emit(y), null != M && (L = new h.Z(Z, () => {
                    l.k.info(C.C, "Channel reconnecting"), L = null, I && (I.closeAll(), I.unregister()), eg(), ec()
                }), (Z += 1) > 10 && (Z = 10))))
            }

            function eu(e, t) {
                if (null == R) throw Error("Can't claim channel when no userID set");
                if (null != M) throw Error("Can't claim channel when channel is claimed");
                if (y !== c.Fe.Disconnected) throw Error("Can't claim channel when channel is not disconnected");
                l.k.debug(C.C, `LocalClient.ClaimChannel(${e})`), M = new(a()).ChannelClaim(e), w = new(a()).ChannelClaim(`${e}_mcu`), et("mcu", "mcu", "mcu"), y === c.Fe.Disconnected && ec(t)
            }

            function eh() {
                null != M && (l.k.debug(C.C, "LocalClient.ReleaseChannel()"), er("mcu"), Object.keys(F).forEach(e => {
                    er(e)
                }), E = !0, q("ChannelReleased", null).catch(e => {
                    l.k.error(C.C, 'LocalClient: sending channel message "ChannelReleased" failed', e)
                }).finally(() => {
                    M = null, null != L ? (l.k.warn(C.C, "LocalClient.CancelChannelReconnect()"), Z = 1, L.Cancel(), L = null) : y === c.Fe.Connected && el(), E = !1
                }))
            }

            function eC(e, t) {
                if (e in A) throw Error("Can't add local media that already exists");
                l.k.debug(C.C, `LocalClient.AddLocalMedia(${e})`), A[e] = t, null != M && D && (Y(), y === c.Fe.Connected && t.HandleSfuAvailable(null))
            }

            function ef(e) {
                if (!(e in A)) throw Error("Can't remove local media that does not exist");
                l.k.debug(C.C, `LocalClient.RemoveLocalMedia(${e})`), delete A[e], null != M && D && Y()
            }

            function em(e, t, n) {
                if (e !== R || t !== p || n !== b) {
                    if (null === e || "" === e) throw Error("Can't set userID to null or empty string");
                    if (null != M) throw Error("Can't set userID when channel is claimed");
                    if (y !== c.Fe.Disconnected) throw Error("Can't set userID when channel is not disconnected");
                    l.k.info(C.C, `LocalClient.Initialize(${e}, ${t}, ${n})`), p = t, b = n, R = e, eg()
                }
            }

            function eg() {
                (I = new(a()).Client(p, b, R, u.lt)).addOnStateChange(ed), P.emit()
            }
        },
        21082: function(e, t, n) {
            n.d(t, {
                Z: function() {
                    return u
                }
            });
            var i = n(95235),
                s = n(55786),
                o = n.n(s),
                a = n(13115),
                r = n(39337),
                c = n(44868),
                l = n(56058),
                d = n(38375);
            class u {
                constructor() {
                    (0, i.Z)(this, "SFU_RECONNECT_INTERVAL_BASE_SECONDS", 1), (0, i.Z)(this, "SFU_RECONNECT_INTERVAL_BACKOFF_SECONDS", 1), (0, i.Z)(this, "SFU_RECONNECT_INTERVAL_MAX_SECONDS", 10), (0, i.Z)(this, "_disposed", !1), (0, i.Z)(this, "_sfuConnection", null), (0, i.Z)(this, "_sfuConnectionClaimed", !1), (0, i.Z)(this, "_sfuReconnectCommand", null), (0, i.Z)(this, "_sfuReconnectIntervalSeconds", this.SFU_RECONNECT_INTERVAL_BASE_SECONDS), (0, i.Z)(this, "_stats", void 0), (0, i.Z)(this, "refreshedStats", new a.Signal), (0, i.Z)(this, "ID", void 0), (0, i.Z)(this, "mediaType", void 0), (0, i.Z)(this, "frameRate", void 0), (0, i.Z)(this, "_sfuAvailable", !1), (0, i.Z)(this, "sfuAvalailabilityChanged", new a.Event), (0, i.Z)(this, "_sfuConnectionStatus", r.Fe.Disconnected), (0, i.Z)(this, "sfuConnectionStatusChanged", new a.Event), (0, i.Z)(this, "_sfuConnectionInfo", void 0)
                }
                GetConnectionID() {
                    var e;
                    return null === (e = this._sfuConnectionInfo) || void 0 === e ? void 0 : e.getId()
                }
                Dispose() {
                    if (this._disposed) throw Error("Can't dispose Media that is already disposed");
                    c.k.debug(d.C, `${this.ObjectDebugString()}.Dispose())`), this.sfuAvalailabilityChanged.offAll(), this.sfuConnectionStatusChanged.offAll(), this._sfuConnectionClaimed && this.ReleaseSfuConnection(), this._disposed = !0
                }
                ClaimSfuConnectionIfUnclaimed() {
                    this._sfuConnectionClaimed || this.ClaimSfuConnection()
                }
                ClaimSfuConnection() {
                    if (this._sfuConnectionClaimed) throw Error("Can't claim sfu connection when sfu connection already claimed");
                    c.k.debug(d.C, `${this.ObjectDebugString()}.ClaimSfuConnection())`), this._sfuConnectionClaimed = !0, this._sfuConnectionStatus === r.Fe.Disconnected && this._sfuAvailable && this.ConnectToSfu()
                }
                ReleaseSfuConnectionIfClaimed() {
                    this._sfuConnectionClaimed && this.ReleaseSfuConnection()
                }
                ReleaseSfuConnection() {
                    if (!this._sfuConnectionClaimed) throw Error("Can't release sfu connection when sfu conenction is not claimed");
                    c.k.debug(d.C, `${this.ObjectDebugString()}.ReleaseSfuConnection())`), this._sfuConnectionClaimed = !1, null != this._sfuReconnectCommand ? this.CancelSfuReconnect() : this._sfuConnectionStatus === r.Fe.Connected && this.DisconnectFromSfu()
                }
                RefreshStats() {
                    this._sfuConnectionStatus !== r.Fe.Connected ? c.k.error(d.C, `${this.ObjectDebugString()}.RefreshStats() failed: Not connected to sfu`) : this._sfuConnection.getStats().then(e => {
                        this._stats.Refresh(e), this.refreshedStats.emit()
                    })
                }
                HandleSfuAvailable(e) {
                    c.k.debug(d.C, `${this.ObjectDebugString()}.HandleSfuAvailable()`), this._sfuConnectionInfo = e, this._sfuAvailable = !0, this.sfuAvalailabilityChanged.emit(this._sfuAvailable), this._sfuConnectionClaimed && this._sfuConnectionStatus === r.Fe.Disconnected && this.ConnectToSfu()
                }
                HandleSfuUnavailable() {
                    c.k.info(d.C, `${this.ObjectDebugString()}.HandleSfuUnavailable()`), null != this._sfuReconnectCommand && this.CancelSfuReconnect(), this._sfuAvailable = !1, this.sfuAvalailabilityChanged.emit(this._sfuAvailable)
                }
                ConnectToSfu() {
                    if (c.k.debug(d.C, `${this.ObjectDebugString()}.ConnectToSfu())`), !this._sfuAvailable) {
                        let e = `Impossible! - ${this.ObjectDebugString()}.ConnectToSfu: !SfuAvailable`;
                        throw c.k.error(d.C, e), Error(e)
                    }
                    try {
                        this._sfuConnection = this.CreateConnection(this._sfuConnectionInfo), this._sfuConnection.addOnStateChange(this.HandleSfuStateChanged.bind(this)), this._sfuConnection.setDisableAutomaticIceServers(!1), this._sfuConnectionStatus = r.Fe.Connecting, this._sfuConnection.open()
                    } catch (e) {
                        c.k.warn(d.C, e), this.HandleFailedConnectionToSfu()
                    }
                }
                DisconnectFromSfu() {
                    c.k.debug(d.C, `${this.ObjectDebugString()}.DisconnectFromSfu())`), this._sfuConnectionStatus = r.Fe.Disconnecting, this._sfuConnection.close()
                }
                HandleSfuStateChanged(e) {
                    if (this._sfuConnection !== e) {
                        let e = `Impossible! - ${this.ObjectDebugString()}.HandleSfuStateChanged: _sfuConnection != connection`;
                        throw c.k.error(d.C, e), Error(e)
                    }
                    c.k.debug(d.C, `${this.ObjectDebugString()}.HandleSfuStateChanged())`, {
                        state: e.getState().toString()
                    });
                    let t = this._sfuConnection.getState();
                    switch ((t === o().ConnectionState.Closed || t === o().ConnectionState.Failed) && (this._sfuConnection.removeOnStateChange(this.HandleSfuStateChanged.bind(this)), this._sfuConnection = null), t) {
                        case o().ConnectionState.Connected:
                            this.HandleConnectedToSfu();
                            break;
                        case o().ConnectionState.Closed:
                            this.HandleDisconnectedFromSfu();
                            break;
                        case o().ConnectionState.Failed:
                            this.HandleFailedConnectionToSfu()
                    }
                }
                HandleConnectedToSfu() {
                    c.k.debug(d.C, `${this.ObjectDebugString()}.HandleConnectedToSfu())`), this._sfuReconnectIntervalSeconds = this.SFU_RECONNECT_INTERVAL_BASE_SECONDS, this._sfuConnectionStatus = r.Fe.Connected, this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus), this._sfuConnectionClaimed || this.DisconnectFromSfu()
                }
                HandleDisconnectedFromSfu() {
                    c.k.info(d.C, `${this.ObjectDebugString()}.HandleDisconnectedFromSfu())`), this._sfuConnectionStatus = r.Fe.Disconnected, this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus), this._sfuConnectionClaimed && this._sfuAvailable && this.ConnectToSfu()
                }
                HandleFailedConnectionToSfu() {
                    c.k.info(d.C, `${this.ObjectDebugString()}.HandleFailedConnectionToSfu())`), this._sfuConnectionClaimed && this._sfuAvailable ? (this._sfuConnectionStatus = r.Fe.Failed, this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus), this._sfuReconnectCommand = new l.Z(this._sfuReconnectIntervalSeconds, () => {
                        c.k.info(d.C, "{ObjectDebugString()} sfu reconnecting"), this._sfuReconnectCommand = null, this.HandleDisconnectedFromSfu()
                    }), this._sfuReconnectIntervalSeconds += this.SFU_RECONNECT_INTERVAL_BACKOFF_SECONDS, this._sfuReconnectIntervalSeconds > this.SFU_RECONNECT_INTERVAL_MAX_SECONDS && (this._sfuReconnectIntervalSeconds = this.SFU_RECONNECT_INTERVAL_MAX_SECONDS)) : (this._sfuConnectionStatus = r.Fe.Disconnected, this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus))
                }
                CancelSfuReconnect() {
                    if (c.k.warn(d.C, `${this.ObjectDebugString()}.CancelSfuReconnect()`), this._sfuConnectionStatus !== r.Fe.Failed) {
                        let e = `Impossible! - ${this.ObjectDebugString()}.CancelSfuReconnect: _sfuConnectionStatus != RTCConnectionStatus.Failed`;
                        throw c.k.error(d.C, e), Error(e)
                    }
                    this._sfuConnectionStatus = r.Fe.Disconnected, this._sfuReconnectIntervalSeconds = this.SFU_RECONNECT_INTERVAL_BASE_SECONDS, this._sfuReconnectCommand.Cancel(), this._sfuReconnectCommand = null
                }
            }
        },
        69870: function(e, t, n) {
            n.d(t, {
                Z: function() {
                    return l
                }
            });
            var i = n(55786),
                s = n.n(i),
                o = n(44868),
                a = n(66363),
                r = n(38375),
                c = n(51294);
            class l extends c.Z {
                get useMCUMedia() {
                    return !this._sfuConnectionClaimed
                }
                GetNativeMedia() {
                    return this.useMCUMedia ? a.GetMCUMedia().GetNativeMedia() : super.GetNativeMedia()
                }
                CreateConnection(e) {
                    o.k.debug(r.C, `${this.ObjectDebugString()}.CreateSfuConnection()`);
                    let t = new(s()).AudioStream(this._media),
                        n = new(s()).VideoStream(this._media);
                    return n.setSimulcastMode(s().SimulcastMode.RtpStreamId), a.GetMcuChannel().createSfuDownstreamConnection(e, t, n)
                }
            }
        },
        51294: function(e, t, n) {
            n.d(t, {
                Z: function() {
                    return h
                }
            });
            var i = n(95235),
                s = n(55786),
                o = n.n(s),
                a = n(44868),
                r = n(11251),
                c = n(66363),
                l = n(38375),
                d = n(21082),
                u = n(50815);
            class h extends d.Z {
                GetClient() {
                    return this._client
                }
                GetStats() {
                    return this._stats
                }
                GetNativeMedia() {
                    return this._media._getInternal()._videoMediaStream
                }
                GetVolume() {
                    return this._media.getAudioVolume()
                }
                SetVolume(e) {
                    this._media.setAudioVolume(e)
                }
                ObjectDebugString() {
                    return `RemoteMedia{userID=${this._client.GetUserID()}:clientID=${this._client.GetID()}:mediaID=${this.ID}:tag=${this.mediaType}}`
                }
                constructor(e, t, n, s) {
                    super(), (0, i.Z)(this, "_client", void 0), (0, i.Z)(this, "_media", void 0), this.ID = e, this.mediaType = t, this.frameRate = n, this._client = s, this._stats = new u.ao, this.Initialize()
                }
                Initialize() {
                    this._media = new(o()).RemoteMedia;
                    let e = this._media._getInternal()._audioSink,
                        t = e.getAudio();
                    (0, r.z)(t)
                }
                CreateConnection(e) {
                    a.k.debug(l.C, `${this.ObjectDebugString()}.CreateConnection()`);
                    let t = new(o()).AudioStream(this._media),
                        n = new(o()).VideoStream(this._media);
                    return n.setSimulcastMode(o().SimulcastMode.RtpStreamId), c.GetChannel().createSfuDownstreamConnection(e, t, n)
                }
            }
        },
        50815: function(e, t, n) {
            n.d(t, {
                Y4: function() {
                    return c
                },
                ao: function() {
                    return l
                }
            });
            var i = n(95235);
            class s {
                constructor() {
                    (0, i.Z)(this, "rttMSec", void 0), (0, i.Z)(this, "localPort", void 0), (0, i.Z)(this, "remotePort", void 0), (0, i.Z)(this, "remoteIP", void 0)
                }
                Refresh(e, t) {
                    let n = e.getTransport(),
                        i = n.getActiveCandidatePair();
                    if (null != i) {
                        this.rttMSec = i.getCurrentRoundTripTime();
                        let e = n.getLocalCandidate(i.getLocalCandidateId());
                        this.localPort = e.getPort();
                        let t = n.getRemoteCandidate(i.getRemoteCandidateId());
                        this.remotePort = t.getPort(), this.remoteIP = t.getIPAddress()
                    }
                }
            }
            class o extends s {
                constructor() {
                    super(...arguments), (0, i.Z)(this, "bytesSent", void 0), (0, i.Z)(this, "packetsSent", void 0), (0, i.Z)(this, "nacks", void 0), (0, i.Z)(this, "bytesSentPerSecond", void 0), (0, i.Z)(this, "packetsSentPerSecond", void 0), (0, i.Z)(this, "nacksPerSecond", void 0), (0, i.Z)(this, "framesSent", void 0), (0, i.Z)(this, "framesSentPerSecond", void 0)
                }
                Refresh(e, t) {
                    super.Refresh(e, t);
                    let n = e.getSender(),
                        i = this.bytesSent,
                        s = this.packetsSent,
                        o = this.nacks;
                    this.bytesSent = n.getBytesSent(), this.packetsSent = n.getPacketsSent(), this.nacks = n.getNackCount(), this.bytesSentPerSecond = (this.bytesSent - i) / t, this.packetsSentPerSecond = this.packetsSent - s / t, this.nacksPerSecond = (this.nacks - o) / t;
                    let a = n.getTrack(),
                        r = this.framesSent;
                    this.framesSent = a.getFramesSent(), this.framesSentPerSecond = this.framesSent - r / t
                }
            }
            class a extends s {
                constructor() {
                    super(...arguments), (0, i.Z)(this, "bytesReceived", void 0), (0, i.Z)(this, "jitterMSec", void 0), (0, i.Z)(this, "packetsReceived", void 0), (0, i.Z)(this, "packetsLost", void 0), (0, i.Z)(this, "nacks", void 0), (0, i.Z)(this, "bytesReceivedPerSecond", void 0), (0, i.Z)(this, "packetsReceivedPerSecond", void 0), (0, i.Z)(this, "packetsLostPerSecond", void 0), (0, i.Z)(this, "percentPacketsLost", void 0), (0, i.Z)(this, "nacksPerSecond", void 0), (0, i.Z)(this, "framesReceived", void 0), (0, i.Z)(this, "framesDropped", void 0), (0, i.Z)(this, "framesReceivedPerSecond", void 0), (0, i.Z)(this, "framesDroppedPerSecond", void 0), (0, i.Z)(this, "percentFramesDropped", void 0)
                }
                Refresh(e, t) {
                    super.Refresh(e, t);
                    let n = e.getReceiver(),
                        i = this.bytesReceived,
                        s = this.packetsReceived,
                        o = this.packetsLost,
                        a = this.nacks;
                    this.bytesReceived = n.getBytesReceived(), this.jitterMSec = n.getJitter(), this.packetsReceived = n.getPacketsReceived(), this.packetsLost = n.getPacketsLost(), this.nacks = n.getNackCount();
                    let r = this.packetsReceived - s,
                        c = this.packetsLost - o;
                    this.bytesReceivedPerSecond = (this.bytesReceived - i) / t, this.packetsReceivedPerSecond = r / t, this.packetsLostPerSecond = c / t, this.nacksPerSecond = (this.nacks - a) / t, this.percentPacketsLost = c / (r + c) * 100;
                    let l = n.getTrack(),
                        d = this.framesReceived,
                        u = this.framesDropped;
                    this.framesReceived = l.getFramesReceived(), this.framesDropped = l.getFramesDropped();
                    let h = this.framesReceived - d,
                        C = this.framesDropped - u;
                    this.framesReceivedPerSecond = h / t, this.framesDroppedPerSecond = C / t, this.percentFramesDropped = C / h * 100
                }
            }
            class r {
                constructor() {
                    (0, i.Z)(this, "hasAudio", void 0), (0, i.Z)(this, "hasVideo", void 0), (0, i.Z)(this, "audioStats", new s), (0, i.Z)(this, "videoStats", new s), (0, i.Z)(this, "time", new Date().getTime())
                }
                Refresh(e) {
                    let t = new Date().getTime();
                    this.time = new Date().getTime(), this.hasAudio = null != e.getAudioStream(), this.hasAudio && this.audioStats.Refresh(e.getAudioStream(), t), this.hasVideo = null != e.getVideoStream(), this.hasVideo && this.videoStats.Refresh(e.getVideoStream(), t)
                }
            }
            class c extends r {
                GetAudioStats() {
                    return this.audioStats
                }
                GetVideoStats() {
                    return this.videoStats
                }
                MediaSenderStats() {
                    this.audioStats = new o, this.videoStats = new o
                }
            }
            class l extends r {
                GetAudioStats() {
                    return this.audioStats
                }
                GetVideoStats() {
                    return this.videoStats
                }
                MediaReceiverStats() {
                    this.audioStats = new a, this.videoStats = new a
                }
            }
        },
        43879: function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e() {
                    this.listeners = []
                }
                return e.prototype.on = function(e) {
                    this.listeners.push({
                        once: !1,
                        callback: e
                    })
                }, e.prototype.once = function(e) {
                    var t = this;
                    if (!e) {
                        var n = new Promise(function(e, n) {
                            t.once(e)
                        });
                        return this.listeners[this.listeners.length - 1].promise = n, n
                    }
                    this.listeners.push({
                        once: !0,
                        callback: e
                    })
                }, e.prototype.off = function(e) {
                    var t = this.listeners.length;
                    return this.listeners = this.listeners.filter(function(t) {
                        return e !== t.callback && (!t.promise || e !== t.promise)
                    }), this.listeners.length !== t
                }, e.prototype.offAll = function() {
                    var e = this.listeners.length;
                    return this.listeners.length = 0, e
                }, e.prototype.emit = function(e) {
                    for (var t = this.listeners.length > 0, n = 0, i = this.listeners; n < i.length; n++) i[n].callback(e);
                    return this.listeners = this.listeners.filter(function(e) {
                        return !e.once
                    }), t
                }, e
            }();
            t.Event = n
        },
        15770: function(e, t) {
            var n = this && this.__assign || Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var s in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                return e
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.events = function(e) {
                return Object.freeze(e)
            }, t.events.concat = function(e, t) {
                return Object.freeze(n({}, e, t))
            }, t.events.offAll = function(e) {
                for (var t = 0, n = Object.keys(e); t < n.length; t++) e[n[t]].offAll()
            }
        },
        13115: function(e, t, n) {
            function i(e) {
                for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), i(n(43879)), i(n(15770)), i(n(48371));
            var s = n(13115);
            e.exports = {
                Event: s.Event,
                events: s.events,
                Signal: s.Signal
            }
        },
        48371: function(e, t, n) {
            var i, s = this && this.__extends || (i = Object.setPrototypeOf || ({
                __proto__: []
            }) instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            }, function(e, t) {
                function n() {
                    this.constructor = e
                }
                i(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            });
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return s(t, e), t.prototype.emit = function() {
                    return e.prototype.emit.call(this, void 0)
                }, t
            }(n(43879).Event);
            t.Signal = o
        }
    }
]);
//# sourceMappingURL=rtc-local-client.3ad49748da0105d3.js.map