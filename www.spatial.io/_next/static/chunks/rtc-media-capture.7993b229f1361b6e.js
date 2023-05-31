"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [480], {
        93872: function(e, t, i) {
            i.r(t), i.d(t, {
                CancelCapture: function() {
                    return I
                },
                CancelCapturesInProgress: function() {
                    return O
                },
                CaptureMicrophone: function() {
                    return T
                },
                CaptureScreen: function() {
                    return N
                },
                CaptureWebcam: function() {
                    return w
                },
                Release: function() {
                    return b
                },
                localMediaCaptureRejected: function() {
                    return v
                },
                localMediaCaptured: function() {
                    return y
                },
                localMediaReleased: function() {
                    return S
                }
            });
            var n = i(95235),
                r = i(55786),
                o = i.n(r),
                a = i(13115),
                s = i(6804),
                u = i(25688),
                d = i(66363),
                c = i(44868),
                h = i(38375),
                p = i(21082),
                l = i(50815);
            class m extends p.Z {
                GetStats() {
                    return this._stats
                }
                GetNativeMedia() {
                    return this._media._getInternal()._videoMediaStream
                }
                ObjectDebugString() {
                    return `LocalMedia{mediaID=${this.ID}:tag=${this.mediaType}}`
                }
                constructor(e, t, i) {
                    super(), (0, n.Z)(this, "_media", void 0), (0, n.Z)(this, "_audioContext", void 0), (0, n.Z)(this, "_sourceNode", void 0), (0, n.Z)(this, "_gainNode", void 0), (0, n.Z)(this, "_destinationNode", void 0), (0, n.Z)(this, "_shouldTransmit", void 0), this._media = t, this._stats = new l.Y4, this.ID = e, this.mediaType = i;
                    let r = this._media.getVideoEncoding();
                    r ? this.frameRate = r.getFrameRate() : this.frameRate = 0
                }
                Dispose() {
                    super.Dispose(), this._gainNode && (this._gainNode.disconnect(), this._gainNode = null), this._destinationNode && (this._destinationNode.disconnect(), this._destinationNode = null)
                }
                Start() {
                    this._media.start()
                }
                Stop() {
                    this._media.stop()
                }
                SetMute(e) {
                    this._media.setAudioMuted(e)
                }
                SetShouldTransmit(e) {
                    this._shouldTransmit = e, this.updateTransmission()
                }
                SetupTransmissionNodes(e, t, i) {
                    this._audioContext = e, this._sourceNode = t, this._gainNode = e.createGain(), this._destinationNode = i, this._sourceNode.connect(this._gainNode), this._gainNode.connect(this._destinationNode), this.updateTransmission()
                }
                updateTransmission() {
                    this._gainNode && this._audioContext && this._gainNode.gain.setValueAtTime(this._shouldTransmit ? 1 : 0, this._audioContext.currentTime)
                }
                ChangeAudioInputSource(e) {
                    this._media.getAudioSourceInput().getId() !== e && this._media.getAudioSourceInputs().then(t => {
                        for (let i = 0; i < t.length; ++i) {
                            let n = t[i];
                            if (n.getId() === e) {
                                this._media.changeAudioSourceInput(n);
                                break
                            }
                        }
                    })
                }
                CreateConnection() {
                    c.k.debug(h.C, `${this.ObjectDebugString()}.CreateSfuConnection()`);
                    let e = new(o()).AudioStream(this._media),
                        t = new(o()).VideoStream(this._media),
                        i = null;
                    return (i = "Webcam" === this.mediaType ? d.GetMcuChannel().createSfuUpstreamConnection(e, t, this.ID) : d.GetChannel().createSfuUpstreamConnection(e, t, this.ID)).setTag(this.mediaType), i
                }
                GetAudioSourceInput() {
                    return this._media.getAudioSourceInput()
                }
                GetVideoSourceInput() {
                    return this._media.getVideoSourceInput()
                }
            }

            function f(e, t) {
                var i = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), i.push.apply(i, n)
                }
                return i
            }

            function g(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? f(Object(i), !0).forEach(function(t) {
                        (0, n.Z)(e, t, i[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : f(Object(i)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                    })
                }
                return e
            }
            let _ = {},
                y = new a.Event,
                v = new a.Event,
                S = new a.Event;

            function b(e) {
                let t = d.GetLocalMedia(e);
                t && (t.Stop(), t.Dispose(), d.RemoveLocalMedia(e), S.emit(e))
            }

            function C(e, t, i) {
                if (e in _) {
                    let e = t.getId(),
                        n = new m(e, t, i);
                    "Voice" !== i && (n.GetNativeMedia().getVideoTracks()[0].onended = () => b(e)), d.AddLocalMedia(e, n), y.emit({
                        mediaType: n.mediaType,
                        mediaID: e
                    })
                } else t.stop()
            }

            function w(e, t, i, n) {
                let r = (0, s.Z)();
                _[r] = null;
                let a = (0, u.vU)(navigator.userAgent) ? 30 : 8,
                    d = {
                        max: null === i ? a : i
                    },
                    c = g(g({
                        width: e,
                        height: t
                    }, d && {
                        frameRate: d
                    }), n && {
                        deviceId: {
                            exact: n
                        }
                    }),
                    h = new(o()).LocalMedia(!1, c);
                return h.start().then(() => C(r, h, "Webcam")).fail(e => v.emit({
                    mediaType: "Webcam",
                    error: e
                })), r
            }

            function N(e, t, i) {
                let n = (0, s.Z)();
                return _[n] = null, navigator.mediaDevices.getDisplayMedia({
                    audio: !0,
                    video: {
                        width: {
                            max: e
                        },
                        height: {
                            max: t
                        },
                        frameRate: {
                            max: i
                        }
                    }
                }).then(e => {
                    let t = new(o()).LocalMedia(e, e);
                    t.start().then(() => C(n, t, "Screen")).fail(e => v.emit({
                        mediaType: "Screen",
                        error: e
                    }))
                }).catch(e => {
                    v.emit({
                        mediaType: "Screen",
                        error: e
                    })
                }), n
            }

            function T(e) {
                let t = (0, s.Z)();
                _[t] = null;
                let i = new(o()).LocalMedia(e, !1);
                return i.start().then(e => (C(t, i, "Voice"), e)).fail(e => {
                    v.emit({
                        mediaType: "Voice",
                        error: e
                    })
                })
            }

            function I(e) {
                delete _[e]
            }

            function O() {
                _ = {}
            }
        },
        6804: function(e, t, i) {
            i.d(t, {
                Z: function() {
                    return c
                }
            });
            var n, r = new Uint8Array(16);

            function o() {
                if (!n && !(n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                return n(r)
            }
            for (var a = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, s = [], u = 0; u < 256; ++u) s.push((u + 256).toString(16).substr(1));
            var d = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = (s[e[t + 0]] + s[e[t + 1]] + s[e[t + 2]] + s[e[t + 3]] + "-" + s[e[t + 4]] + s[e[t + 5]] + "-" + s[e[t + 6]] + s[e[t + 7]] + "-" + s[e[t + 8]] + s[e[t + 9]] + "-" + s[e[t + 10]] + s[e[t + 11]] + s[e[t + 12]] + s[e[t + 13]] + s[e[t + 14]] + s[e[t + 15]]).toLowerCase();
                    if (!("string" == typeof i && a.test(i))) throw TypeError("Stringified UUID is invalid");
                    return i
                },
                c = function(e, t, i) {
                    var n = (e = e || {}).random || (e.rng || o)();
                    if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, t) {
                        i = i || 0;
                        for (var r = 0; r < 16; ++r) t[i + r] = n[r];
                        return t
                    }
                    return d(n)
                }
        }
    }
]);
//# sourceMappingURL=rtc-media-capture.7993b229f1361b6e.js.map