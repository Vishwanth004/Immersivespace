"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4149], {
        16837: function(e, t, i) {
            i.d(t, {
                z: function() {
                    return h
                }
            });
            var a = i(95235),
                s = i(13115),
                o = i(39337),
                n = i(7484),
                r = i(44868),
                d = i.p + "static/microphone-recorder.1c511eaad645cc08.worklet.js";
            class l {
                get deviceID() {
                    return this._deviceID
                }
                get groupID() {
                    return this._groupID
                }
                get mediaStream() {
                    return this._mediaStream
                }
                get isCreatingStream() {
                    return this._isCreatingStream
                }
                get status() {
                    return this._status
                }
                constructor(e, t) {
                    (0, a.Z)(this, "_deviceID", void 0), (0, a.Z)(this, "_groupID", void 0), (0, a.Z)(this, "_mediaStream", void 0), (0, a.Z)(this, "_isCreatingStream", !1), (0, a.Z)(this, "_isCanceled", !1), (0, a.Z)(this, "_shouldBeRecording", !1), (0, a.Z)(this, "_status", void 0), (0, a.Z)(this, "_statusCallback", void 0), this._deviceID = e, this._statusCallback = (e, i) => {
                        this._status = e, t(e, i)
                    }
                }
                createStream() {
                    let e = {
                        echoCancellation: !0,
                        noiseSuppression: !0,
                        autoGainControl: !0,
                        googEchoCancellation: !0,
                        googNoiseSuppression: !0,
                        googAutoGainControl: !0,
                        deviceId: this._deviceID ? this._deviceID : void 0
                    };
                    return navigator.mediaDevices.getUserMedia({
                        audio: e,
                        video: !1
                    })
                }
                handleStartSuccess() {
                    this._statusCallback(o.PF.On, null), this._mediaStream.onremovetrack = () => {
                        this._statusCallback(o.PF.Off, "microphone track has been removed unexpectedly")
                    }, this._mediaStream.getTracks().forEach(e => {
                        var t;
                        e.onended = () => {
                            this._statusCallback(o.PF.Off, null)
                        }, e.onmute = () => {
                            this._shouldBeRecording ? this._statusCallback(o.PF.Muted, "microphone has been muted unexpectedly") : this._statusCallback(o.PF.Off, null)
                        }, e.onunmute = () => {
                            this._statusCallback(o.PF.On, null)
                        }, this._groupID = null === (t = e.getSettings()) || void 0 === t ? void 0 : t.groupId
                    }), this._shouldBeRecording || this.pause()
                }
                handleStartFailed(e) {
                    let t = o.PF.Unknown;
                    if (e.name in o.PF) {
                        let i = e.name;
                        t = o.PF[i]
                    }
                    this._statusCallback(t, e.message)
                }
                async start() {
                    this._isCreatingStream = !0, this._shouldBeRecording = !0, this._statusCallback(o.PF.RequestingPermissions, null);
                    try {
                        let e = await this.createStream();
                        if (this._mediaStream = e, this._isCanceled) return;
                        return this.handleStartSuccess(), !0
                    } catch (e) {
                        if (this._isCanceled) return;
                        return this.handleStartFailed(e), !1
                    } finally {
                        this._isCreatingStream = !1, this._isCanceled && this.stop()
                    }
                }
                stop() {
                    if (this._shouldBeRecording = !1, this._isCreatingStream) {
                        this._isCanceled = !0;
                        return
                    }
                    this._mediaStream && (this._mediaStream.getTracks().forEach(e => {
                        e.stop()
                    }), this._mediaStream = null), this._statusCallback(o.PF.Off, null)
                }
                pause() {
                    this._shouldBeRecording = !1;
                    let e = !1;
                    this._mediaStream && this._mediaStream.getTracks().forEach(t => {
                        t.enabled = !1, e = !0
                    }), e && this._statusCallback(o.PF.Off, null)
                }
                resume() {
                    this._shouldBeRecording = !0;
                    let e = !1;
                    return this._mediaStream && this._mediaStream.getTracks().forEach(t => {
                        "live" === t.readyState && (t.enabled = !0, e = !0)
                    }), !!e && (this._statusCallback(o.PF.On, null), !0)
                }
                debugInfo() {
                    return {
                        deviceID: this._deviceID,
                        groupID: this._groupID,
                        status: this._status,
                        isCreatingStream: this._isCreatingStream,
                        isCanceled: this._isCanceled,
                        shouldBeRecording: this._shouldBeRecording,
                        mediaStream: this._mediaStream ? {
                            active: this._mediaStream.active,
                            id: this._mediaStream.id
                        } : null
                    }
                }
            }
            let c = new n.nZ("Microphone");
            class h {
                static get instance() {
                    return h._instance
                }
                get audioContext() {
                    return this._audioContext
                }
                get outputNode() {
                    return this._gainNode
                }
                constructor(e, t, i, s) {
                    (0, a.Z)(this, "_audioContext", void 0), (0, a.Z)(this, "_statusCallback", void 0), (0, a.Z)(this, "_deviceID", null), (0, a.Z)(this, "_currentStream", null), (0, a.Z)(this, "_shouldBeRecording", void 0), (0, a.Z)(this, "_sourceNode", void 0), (0, a.Z)(this, "_gainNode", void 0), (0, a.Z)(this, "_workletNode", void 0), (0, a.Z)(this, "_processorNode", void 0), (0, a.Z)(this, "_isReading", !1), (0, a.Z)(this, "handleMediaDevicesChanged", async () => {
                        try {
                            let a = await navigator.mediaDevices.enumerateDevices();
                            if (!a) return;
                            let s = !1,
                                n = null,
                                d = null;
                            for (let e = 0; e < a.length; ++e) "audioinput" !== a[e].kind || (a[e].deviceId === this._deviceID ? (s = !0, d = a[e].groupId) : s || null !== n && "default" !== a[e].deviceId || (n = a[e].deviceId));
                            if (s) {
                                var e, t, i;
                                if (((null === (e = this._currentStream) || void 0 === e ? void 0 : e.groupID) !== d || (null === (t = this._currentStream) || void 0 === t ? void 0 : t.deviceID) !== this._deviceID || (null === (i = this._currentStream) || void 0 === i ? void 0 : i.status) !== o.PF.On) && this._shouldBeRecording) {
                                    let e = this.debugInfo();
                                    e.currentGroupID = d, r.k.info(c, "restarting microphone stream after device list has changed", {
                                        LogData: e
                                    }), this.start()
                                }
                            } else if (n && this._shouldBeRecording) {
                                let e = this.debugInfo();
                                e.fallbackDeviceID = n, r.k.info(c, "starting microphone stream with a fallback device", {
                                    LogData: e
                                }), this.startWithDevice(n)
                            }
                        } catch (e) {
                            r.k.error(c, "failed with handling devices changed", e)
                        }
                    }), h._instance = this, this._audioContext = e, this._statusCallback = t, this._gainNode = this._audioContext.createGain(), navigator.mediaDevices.addEventListener("devicechange", this.handleMediaDevicesChanged), this.setupPermissionsHandler(), this.startDataReadback(s, i), h.onMicrophoneInitialized.emit()
                }
                dispose() {
                    h._instance === this && (h._instance = null), this.stop(), this.stopDataReadback(), this._gainNode && (this._gainNode.disconnect(), this._gainNode = null), navigator.mediaDevices.removeEventListener("devicechange", this.handleMediaDevicesChanged)
                }
                start() {
                    this.startWithDevice(this._deviceID)
                }
                stop() {
                    var e;
                    this._shouldBeRecording = !1, null === (e = this._currentStream) || void 0 === e || e.stop(), this._sourceNode && (this._sourceNode.disconnect(), this._sourceNode = null)
                }
                pause() {
                    var e;
                    null === (e = this._currentStream) || void 0 === e || e.pause()
                }
                resume() {
                    var e;
                    null === (e = this._currentStream) || void 0 === e || e.resume()
                }
                setDeviceID(e) {
                    r.k.debug(c, "setting microphone deviceID", {
                        LogData: {
                            deviceID: e
                        }
                    }), e !== this._deviceID && (this._deviceID = e, this._shouldBeRecording && this.start())
                }
                setGain(e) {
                    this._gainNode.gain.setValueAtTime(e, this._audioContext.currentTime)
                }
                startWithDevice(e) {
                    this.stop(), this._shouldBeRecording = !0, r.k.debug(c, "starting microphone stream", {
                        LogData: {
                            deviceID: e
                        }
                    });
                    let t = new l(e, (e, i) => {
                        this.handleMicStatusChanged(t, e, i)
                    });
                    this._currentStream = t, this._currentStream.start().then(e => {
                        this.handleMicrophoneStreamStarted(t, e)
                    })
                }
                handleMicStatusChanged(e, t, i) {
                    e === this._currentStream && (this._statusCallback(t, i), t === o.PF.Off && this._shouldBeRecording && (r.k.info(c, "microphone has stopped when it should be recording", {
                        LogData: this.debugInfo()
                    }), this.start()))
                }
                handleMicrophoneStreamStarted(e, t) {
                    let i = e === this._currentStream;
                    if (r.k.debug(c, "handle microphone stream started", {
                            LogData: {
                                success: t,
                                isCurrentStream: i
                            }
                        }), t && i) {
                        var a;
                        null === (a = this._sourceNode) || void 0 === a || a.disconnect(), this._sourceNode = this._audioContext.createMediaStreamSource(e.mediaStream), this._sourceNode.connect(this._gainNode)
                    }
                }
                async setupPermissionsHandler() {
                    if (navigator.permissions) try {
                        let e = await navigator.permissions.query({
                            name: "microphone"
                        });
                        e.onchange = () => {
                            var t;
                            r.k.debug(c, "microphone permission status has changed", {
                                LogData: {
                                    status: e.state
                                }
                            }), "granted" === e.state && this._shouldBeRecording && !(null !== (t = this._currentStream) && void 0 !== t && t.isCreatingStream) && (r.k.info(c, "restarting microphone stream due to permission being granted"), this.start())
                        }
                    } catch (e) {}
                }
                setupAudioWorklet(e, t) {
                    this._workletNode = new AudioWorkletNode(this._audioContext, "recorder-worklet"), this._workletNode.port.postMessage({
                        bufferLength: e
                    }), this._workletNode.port.onmessage = function(e) {
                        t(e.data)
                    }, this._gainNode.connect(this._workletNode), this._workletNode.connect(this._audioContext.destination)
                }
                setupScriptProcessor(e, t) {
                    this._processorNode = this._audioContext.createScriptProcessor(e, 1, 1), this._processorNode.onaudioprocess = function(e) {
                        t(e.inputBuffer.getChannelData(0))
                    }, this._gainNode.connect(this._processorNode), this._processorNode.connect(this._audioContext.destination)
                }
                async startDataReadback(e, t) {
                    var i;
                    if (this._isReading) {
                        r.k.error(c, "tried starting data readback when it was already reading");
                        return
                    }
                    if (this._isReading = !0, "function" == typeof(null === (i = this._audioContext.audioWorklet) || void 0 === i ? void 0 : i.addModule)) try {
                        this.setupAudioWorklet(e, t)
                    } catch (i) {
                        try {
                            await this._audioContext.audioWorklet.addModule(d), this.setupAudioWorklet(e, t)
                        } catch (i) {
                            r.k.warn(c, "creating audio worklet for readback has failed", i), this.setupScriptProcessor(e, t)
                        }
                    } else this.setupScriptProcessor(e, t)
                }
                stopDataReadback() {
                    this._workletNode && (this._gainNode.disconnect(this._workletNode), this._workletNode.disconnect(), this._workletNode = null), this._processorNode && (this._gainNode.disconnect(this._processorNode), this._processorNode.disconnect(), this._processorNode = null), this._isReading = !1
                }
                debugInfo() {
                    var e;
                    return {
                        deviceID: this._deviceID,
                        shouldBeRecording: this._shouldBeRecording,
                        isReading: this._isReading,
                        sourceNode: this._sourceNode ? {
                            channelCount: this._sourceNode.channelCount,
                            channelCountMode: this._sourceNode.channelCountMode,
                            channelCountInterpretation: this._sourceNode.channelInterpretation,
                            numberOfInputs: this._sourceNode.numberOfInputs,
                            numberOfOutputs: this._sourceNode.numberOfOutputs
                        } : null,
                        workletNode: this._workletNode ? {
                            parameters: this._workletNode.parameters,
                            channelCount: this._workletNode.channelCount,
                            channelCountMode: this._workletNode.channelCountMode,
                            channelCountInterpretation: this._workletNode.channelInterpretation,
                            numberOfInputs: this._workletNode.numberOfInputs,
                            numberOfOutputs: this._workletNode.numberOfOutputs
                        } : null,
                        processorNode: this._processorNode ? {
                            bufferSize: this._processorNode.bufferSize,
                            channelCount: this._processorNode.channelCount,
                            channelCountMode: this._processorNode.channelCountMode,
                            channelCountInterpretation: this._processorNode.channelInterpretation,
                            numberOfInputs: this._processorNode.numberOfInputs,
                            numberOfOutputs: this._processorNode.numberOfOutputs
                        } : null,
                        micStream: null === (e = this._currentStream) || void 0 === e ? void 0 : e.debugInfo()
                    }
                }
            }(0, a.Z)(h, "onMicrophoneInitialized", new s.Event), (0, a.Z)(h, "_instance", void 0)
        },
        30687: function(e, t, i) {
            i.r(t), i.d(t, {
                RoomRTCManager: function() {
                    return u
                }
            });
            var a = i(95235),
                s = i(39337),
                o = i(89959),
                n = i(13864),
                r = i(16837),
                d = i(35248),
                l = i(74696),
                c = i(13603),
                h = i(69870);
            class u {
                constructor(e, t, i, s) {
                    this.state = e, this.updateState = t, this.userId = i, this.maxWebcamFps = s, (0, a.Z)(this, "RTCLocalClient", void 0), (0, a.Z)(this, "RTCMediaCapture", void 0), (0, a.Z)(this, "isLoading", !0), (0, a.Z)(this, "_shouldConnectToVoice", !1), (0, a.Z)(this, "_shouldTransmitVoice", !1), (0, a.Z)(this, "_voiceClientsListeningTo", void 0), (0, a.Z)(this, "_webcamCaptureId", void 0), (0, a.Z)(this, "_screenshareCaptureId", void 0), (0, a.Z)(this, "onLocalCapture", void 0), (0, a.Z)(this, "onLocalRejected", void 0), (0, a.Z)(this, "onLocalReleased", void 0), (0, a.Z)(this, "onRemoteClaimed", void 0), (0, a.Z)(this, "onRemoteReleased", void 0), (0, a.Z)(this, "onClientInitialized", void 0), (0, a.Z)(this, "onMCULayoutChanged", void 0), (0, a.Z)(this, "onChannelConnectionStatusChanged", void 0), (0, a.Z)(this, "handleMicrophoneInitialized", () => {
                        this._shouldConnectToVoice && this.createMicrophoneLocalMedia()
                    }), this.maxWebcamFps = s, this.onLocalCapture = this.localMediaCaptured.bind(this), this.onLocalRejected = this.localMediaRejected.bind(this), this.onLocalReleased = this.localMediaReleased.bind(this), this.onRemoteClaimed = this.remoteClientClaimedChannel.bind(this), this.onRemoteReleased = u.remoteClientReleasedChannel.bind(this), this.onClientInitialized = this.clientInitialized.bind(this), this.onMCULayoutChanged = this.mcuLayoutChanged.bind(this), this.onChannelConnectionStatusChanged = u.channelConnectionStatusChanged.bind(this)
                }
                static async load(e, t, i, a, s) {
                    let o = new u(e, t, a, i),
                        {
                            rtcLocalClient: n,
                            rtcMediaCapture: r
                        } = await (0, l.z)(a, s.url, s.appID);
                    return o.RTCLocalClient = n, o.RTCMediaCapture = r, o.isLoading = !1, window.spatialWebGLGetMediaStream = (e, t) => {
                        if (n.GetID() === e) {
                            let e = n.GetLocalMedia(t);
                            return e ? e.GetNativeMedia() : null
                        }
                        let i = o.RTCLocalClient.GetRemoteClient(e);
                        if (!i) return null;
                        let a = i.GetRemoteMedia(t);
                        return a ? a.GetNativeMedia() : null
                    }, window.spatialWebGLSetMediaVolume = (e, t, i) => {
                        let a = o.RTCLocalClient.GetRemoteClient(e);
                        if (!a) return null;
                        let s = a.GetRemoteMedia(t);
                        if (!s) return null;
                        s.SetVolume(i)
                    }, o
                }
                setState(e) {
                    this.state = e
                }
                registerRemoteRTC() {
                    this.RTCLocalClient.channelConnectionStatusChanged.on(this.onChannelConnectionStatusChanged), this.RTCLocalClient.remoteClientClaimedChannel.on(this.onRemoteClaimed), this.RTCLocalClient.remoteClientReleasedChannel.on(this.onRemoteReleased), this.RTCLocalClient.clientInitialized.on(this.onClientInitialized), this.RTCLocalClient.mcuLayoutChanged.on(this.onMCULayoutChanged)
                }
                registerLocalRTC() {
                    this.RTCMediaCapture.localMediaCaptured.on(this.onLocalCapture), this.RTCMediaCapture.localMediaCaptureRejected.on(this.onLocalRejected), this.RTCMediaCapture.localMediaReleased.on(this.onLocalReleased), r.z.onMicrophoneInitialized.on(this.handleMicrophoneInitialized), this.updateState(e => {
                        e.readyForCapture = !0
                    })
                }
                unregisterRTC() {
                    Object.keys(this.RTCLocalClient.GetAllLocalMedia()).forEach(e => this.RTCMediaCapture.Release(e)), this.RTCMediaCapture.localMediaCaptured.off(this.onLocalCapture), this.RTCMediaCapture.localMediaCaptureRejected.off(this.onLocalRejected), this.RTCMediaCapture.localMediaReleased.off(this.onLocalReleased), this.RTCLocalClient.remoteClientClaimedChannel.off(this.onRemoteClaimed), this.RTCLocalClient.remoteClientReleasedChannel.off(this.onRemoteReleased), this.RTCLocalClient.clientInitialized.off(this.onClientInitialized), this.RTCLocalClient.mcuLayoutChanged.off(this.onMCULayoutChanged), this.RTCMediaCapture.CancelCapturesInProgress(), r.z.onMicrophoneInitialized.off(this.handleMicrophoneInitialized), this.updateState(e => {
                        e.readyForCapture = !1
                    })
                }
                releaseChannel() {
                    this.RTCLocalClient.ReleaseChannel()
                }
                claimChannel(e, t) {
                    o.setRtcClientId(this.RTCLocalClient.GetID()), this.RTCLocalClient.ClaimChannel(e, t)
                }
                setShouldConnectToVoice(e, t) {
                    e !== this._shouldConnectToVoice && (this._shouldConnectToVoice = e, e ? r.z.instance && this.createMicrophoneLocalMedia() : this.state.localVoiceMediaID && this.RTCMediaCapture.Release(this.state.localVoiceMediaID)), this._voiceClientsListeningTo = t, Object.values(this.RTCLocalClient.GetAllRemoteClients()).forEach(e => {
                        Object.values(e.GetAllRemoteMedias()).forEach(i => {
                            let a = "Voice" === i.mediaType;
                            a && (this._shouldConnectToVoice && t.includes(e.GetID()) ? i.ClaimSfuConnectionIfUnclaimed() : i.ReleaseSfuConnectionIfClaimed())
                        })
                    })
                }
                createMicrophoneLocalMedia() {
                    let e = r.z.instance,
                        t = e.audioContext.createMediaStreamDestination();
                    this.RTCMediaCapture.CaptureMicrophone(t.stream).then(i => {
                        let a = i.getId();
                        if (this._shouldConnectToVoice) {
                            let i = this.RTCLocalClient.GetLocalMedia(a);
                            i.SetupTransmissionNodes(e.audioContext, e.outputNode, t)
                        } else this.RTCMediaCapture.Release(a)
                    })
                }
                setShouldTransmitVoice(e) {
                    e !== this._shouldTransmitVoice && (this._shouldTransmitVoice = e, Object.values(this.RTCLocalClient.GetAllLocalMedia()).forEach(t => {
                        let i = "Voice" === t.mediaType;
                        i && t.SetShouldTransmit(e)
                    }))
                }
                localMediaCaptured(e) {
                    let t = this.RTCLocalClient.GetLocalMedia(e.mediaID);
                    o.localMediaCaptured(e.mediaID, e.mediaType), this.updateState(i => {
                        switch (i.localMedias[e.mediaID] = {
                            userID: this.userId,
                            location: "local",
                            status: "connecting",
                            audioRemoteIP: null,
                            videoRemoteIP: null,
                            raw: t
                        }, t.mediaType) {
                            case "Voice":
                                i.localVoiceMediaID = e.mediaID;
                                break;
                            case "Webcam":
                                i.localWebcamMediaID = e.mediaID, i.webcamStatus = d.Ei.On;
                                break;
                            case "Screen":
                                i.localScreenshareMediaID = e.mediaID, i.screenSharing = !0
                        }
                    }), t.sfuConnectionStatusChanged.on(i => {
                        switch (o.localMediaConnectionStatusChanged(e.mediaID, i), i) {
                            case s.Fe.Connected:
                                t.RefreshStats(), this.updateState(t => {
                                    t.localMedias[e.mediaID].status = "connected"
                                });
                                break;
                            case s.Fe.Disconnected:
                                this.updateState(t => {
                                    t.localMedias[e.mediaID].status = "connecting"
                                })
                        }
                    }), t.refreshedStats.on(() => {
                        this.updateState(i => {
                            i.localMedias[e.mediaID].audioRemoteIP = t.GetStats().GetAudioStats().remoteIP, i.localMedias[e.mediaID].videoRemoteIP = t.GetStats().GetVideoStats().remoteIP
                        })
                    }), "Voice" === e.mediaType ? this._shouldConnectToVoice && (t.ClaimSfuConnection(), t.SetShouldTransmit(this._shouldTransmitVoice)) : t.ClaimSfuConnection(), o.localMediaClaimedConnection(e.mediaID)
                }
                localMediaRejected(e) {
                    "Webcam" === e.mediaType ? this.updateState(t => {
                        "NotAllowedError" === e.error.name ? t.webcamStatus = d.Ei.PermissionsDenied : t.webcamStatus = d.Ei.Unavailable
                    }) : "Screen" === e.mediaType && this.updateState(e => {
                        e.screenSharing = !1
                    })
                }
                localMediaReleased(e) {
                    o.localMediaReleased(e), e === this.state.localWebcamMediaID ? this.updateState(e => {
                        e.webcamStatus = d.Ei.Off, e.localWebcamMediaID = null
                    }) : e === this.state.localScreenshareMediaID ? this.updateState(e => {
                        e.screenSharing = !1, e.localScreenshareMediaID = null
                    }) : e === this.state.localVoiceMediaID && this.updateState(e => {
                        e.localVoiceMediaID = null
                    }), this.updateState(t => {
                        t.localMedias[e] = null
                    })
                }
                static channelConnectionStatusChanged(e) {
                    o.channelConnectionStatusChanged(e)
                }
                clientInitialized() {
                    o.setRtcClientId(this.RTCLocalClient.GetID())
                }
                remoteClientClaimedChannel(e) {
                    let t = this.RTCLocalClient.GetRemoteClient(e);
                    o.remoteClientClaimedChannel(e, t.GetUserID()), t.connectedToChannel.on(() => {
                        o.remoteClientConnectedToChannel(e)
                    }), t.disconnectedFromChannel.on(() => {
                        o.remoteClientDisconnectedFromChannel(e)
                    }), t.capturedMedia.on(t => this.remoteMediaCaptured(e, t)), t.releasedMedia.on(t => this.remoteMediaReleased(e, t))
                }
                static remoteClientReleasedChannel(e) {
                    o.remoteClientReleasedChannel(e), "mcu" === e && o.clearMCULayoutFrame()
                }
                mcuLayoutChanged(e) {
                    let t = e.getWidth(),
                        i = e.getHeight();
                    o.remoteMediaLayoutChanged("mcu", "mcu", t, i), o.clearMCULayoutFrame(), Object.values(e.getRegions()).forEach(e => {
                        let a = e.getConnectionId(),
                            s = e.getClientId(),
                            n = e.getFrame(),
                            r = e.getBounds(),
                            d = n.getX() + r.getX(),
                            l = n.getY() + r.getY(),
                            c = r.getWidth(),
                            h = r.getHeight();
                        o.setMCULayoutFrame(s, d, l, c, h);
                        let u = c / t,
                            C = h / i,
                            m = this.RTCLocalClient.GetMcuChannel().getRemoteConnectionInfo(a),
                            p = null == m ? void 0 : m.getMediaId();
                        if (p) {
                            let e = `${s}:${p}`;
                            this.updateState(t => {
                                let i = t.remoteMedias[e];
                                i && (i.mcuRegion = {
                                    x: d,
                                    y: l,
                                    width: c,
                                    height: h,
                                    widthRatio: u,
                                    heightRatio: C
                                })
                            })
                        }
                    })
                }
                remoteMediaCaptured(e, t) {
                    let {
                        mediaID: i,
                        mediaType: a
                    } = t, r = `${e}:${i}`, d = this.RTCLocalClient.GetRemoteClient(e), l = d.GetUserID(), u = d.GetRemoteMedia(i);
                    "Voice" === u.mediaType ? o.remoteVoiceStreamCaptured(e, i) : o.remoteMediaCaptured(e, i, u.mediaType, "mcu" === i ? "MCU" : "SFU", u.frameRate), this.updateState(t => {
                        t.remoteMedias[r] = {
                            userID: l,
                            location: "remote",
                            clientId: e,
                            status: "connecting",
                            videoRemoteIP: null,
                            audioRemoteIP: null,
                            raw: u,
                            mcuRegion: null,
                            useMCU: !1
                        }
                    }), u.sfuConnectionStatusChanged.on(t => {
                        switch (o.remoteMediaStatusChanged(e, i, t), t) {
                            case s.Fe.Connected:
                                u.RefreshStats(), this.updateState(e => {
                                    e.remoteMedias[r].status = "connected"
                                }), u instanceof h.Z && this.updateState(e => {
                                    e.remoteMedias[r].useMCU = !1
                                });
                                break;
                            case s.Fe.Disconnected:
                                this.updateState(e => {
                                    let t = e.remoteMedias[r];
                                    "connecting-hidden" !== t.status && (t.status = "connecting")
                                }), u instanceof h.Z && this.updateState(e => {
                                    e.remoteMedias[r].useMCU = !0
                                })
                        }
                    }), u.sfuAvalailabilityChanged.on(e => {
                        !e && c.Z.mediaIsSpectator(u.mediaType) && this.updateState(e => {
                            e.remoteMedias[r].status = "connecting-hidden"
                        })
                    }), u.refreshedStats.on(() => {
                        this.updateState(e => {
                            e.remoteMedias[r].audioRemoteIP = u.GetStats().GetAudioStats().remoteIP, e.remoteMedias[r].videoRemoteIP = u.GetStats().GetVideoStats().remoteIP
                        })
                    }), "Voice" === a ? this._shouldConnectToVoice && this._voiceClientsListeningTo.includes(d.GetID()) && u.ClaimSfuConnection() : u instanceof h.Z ? (this.updateState(e => {
                        e.remoteMedias[r].useMCU = !0
                    }), this.state.currentStreamId === r && u.ClaimSfuConnection()) : u.ClaimSfuConnection(), (0, n.NR)(a)
                }
                remoteMediaReleased(e, t) {
                    let i = `${e}:${t}`;
                    if (this.state.remoteMedias[i]) {
                        let {
                            mediaType: a
                        } = this.state.remoteMedias[i].raw;
                        (0, n.Ez)(a), "Voice" === a ? o.remoteVoiceStreamReleased(e) : o.remoteMediaReleased(e, t)
                    }
                    this.updateState(e => {
                        delete e.remoteMedias[i]
                    }), this.state.currentStreamId === i && this.resetMediaPlayerStream()
                }
                resetMediaPlayerStream() {
                    this.disconnectFromSfuIfMcuConnection(this.state.currentStreamId), this.updateState(e => {
                        e.currentStreamId = null
                    })
                }
                releaseWebcamMedia() {
                    let e = this.state.localWebcamMediaID;
                    e && this.RTCMediaCapture.Release(e), this._webcamCaptureId && this.RTCMediaCapture.CancelCapture(this._webcamCaptureId), this.state.currentStreamId === e && this.resetMediaPlayerStream()
                }
                releaseScreenshareMedia() {
                    let e = this.state.localScreenshareMediaID;
                    e && this.RTCMediaCapture.Release(e), this._screenshareCaptureId && this.RTCMediaCapture.CancelCapture(this._screenshareCaptureId), this.state.currentStreamId === e && this.resetMediaPlayerStream()
                }
                disconnectFromSfuIfMcuConnection(e) {
                    var t;
                    if (!e) return;
                    let i = e.split(":");
                    if (i.length <= 1) return;
                    let a = null === (t = this.RTCLocalClient.GetRemoteClient(i[0])) || void 0 === t ? void 0 : t.GetRemoteMedia(i[1]);
                    a instanceof h.Z && a.ReleaseSfuConnectionIfClaimed()
                }
                switchToLocal() {
                    if (null !== this.state.localScreenshareMediaID) {
                        if (this.state.currentStreamId === this.state.localScreenshareMediaID) {
                            this.resetMediaPlayerStream();
                            return
                        }
                        this.updateState(e => {
                            e.currentStreamId = e.localScreenshareMediaID
                        })
                    } else if (null !== this.state.localWebcamMediaID) {
                        if (this.state.currentStreamId === this.state.localWebcamMediaID) {
                            this.resetMediaPlayerStream();
                            return
                        }
                        this.disconnectFromSfuIfMcuConnection(this.state.currentStreamId), this.updateState(e => {
                            e.currentStreamId = e.localWebcamMediaID
                        })
                    }
                }
                switchToRemote(e, t) {
                    let i = `${e}:${t}`;
                    if (this.state.currentStreamId === i) {
                        this.resetMediaPlayerStream();
                        return
                    }
                    this.disconnectFromSfuIfMcuConnection(this.state.currentStreamId);
                    let a = this.RTCLocalClient.GetRemoteClient(e).GetRemoteMedia(t);
                    a && a.ClaimSfuConnectionIfUnclaimed(), this.updateState(e => {
                        e.currentStreamId = i
                    })
                }
                remoteUserStreamExists() {
                    return Object.values(this.state.remoteMedias).some(e => !e.raw.mediaType.includes("Spectator"))
                }
                startScreenSharing(e) {
                    this.state.localScreenshareMediaID && this.releaseScreenshareMedia(), (0, n.N8)(e), this._screenshareCaptureId = this.RTCMediaCapture.CaptureScreen(e.maxWidth, e.maxHeight, e.maxFrameRate)
                }
                startWebcamCapture(e) {
                    this.updateState(e => {
                        e.webcamStatus = d.Ei.RequestingPermissions
                    }), this.state.localWebcamMediaID && this.releaseWebcamMedia(), this._webcamCaptureId = this.RTCMediaCapture.CaptureWebcam(640, 480, this.maxWebcamFps, e)
                }
            }
        }
    }
]);
//# sourceMappingURL=room-rtc-manager.6964946534793f60.js.map