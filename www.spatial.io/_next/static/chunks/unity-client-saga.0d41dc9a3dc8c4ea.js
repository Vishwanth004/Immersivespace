(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1119, 6584], {
        45635: function(e, t, n) {
            "use strict";
            n.d(t, {
                r: function() {
                    return s
                }
            });
            var i, o = n(2784),
                r = ["title", "titleId"];

            function a() {
                return (a = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                    }
                    return e
                }).apply(this, arguments)
            }
            var s = (0, o.forwardRef)(function(e, t) {
                var n = e.title,
                    s = e.titleId,
                    l = function(e, t) {
                        if (null == e) return {};
                        var n, i, o = function(e, t) {
                            if (null == e) return {};
                            var n, i, o = {},
                                r = Object.keys(e);
                            for (i = 0; i < r.length; i++) n = r[i], t.indexOf(n) >= 0 || (o[n] = e[n]);
                            return o
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var r = Object.getOwnPropertySymbols(e);
                            for (i = 0; i < r.length; i++) n = r[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                        }
                        return o
                    }(e, r);
                return o.createElement("svg", a({
                    xmlns: "http://www.w3.org/2000/svg",
                    height: 24,
                    viewBox: "0 0 24 24",
                    width: 24,
                    ref: t,
                    "aria-labelledby": s
                }, l), n ? o.createElement("title", {
                    id: s
                }, n) : null, i || (i = o.createElement("path", {
                    fill: "currentColor",
                    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                })))
            })
        },
        9962: function(e, t, n) {
            "use strict";

            function i(e, t) {
                let n = URL.createObjectURL(t);
                ! function(e, t) {
                    let n = document.createElement("a");
                    n.href = t, n.download = e, n.style.display = "none", document.body.appendChild(n), n.click(), document.body.removeChild(n)
                }(e, n), URL.revokeObjectURL(n)
            }
            n.d(t, {
                J: function() {
                    return i
                }
            })
        },
        10381: function(e, t, n) {
            "use strict";
            var i;
            let o;
            n.d(t, {
                C: function() {
                    return o
                }
            }), (i = o || (o = {})).AddContentHyperlink = "AddContentHyperlink", i.AddHostConfirmModal = "AddHostConfirmModal", i.AppSettings = "AppSettings", i.AnimationsPicker = "AnimationsPicker", i.AuthlessUserNameModal = "AuthlessUserNameModal", i.AvatarCustomizationPanel = "AvatarCustomizationPanel", i.AvatarHeadGenerationModal = "AvatarHeadGenerationModal", i.Backpack = "Backpack", i.BackpackItemDetails = "BackpackItemDetailsModal", i.CameraModeButtons = "CameraModeButtons", i.CategoryPage = "CategoryPage", i.CollectibleEnvironmentsList = "CollectibleEnvironmentsList", i.ContentPage = "ContentPage", i.ContentMenuCreatorToolkitTab = "ContentMenuCreatorToolkitTab", i.ContentMenuModal = "ContentMenuModal", i.ContentMenuRecentTab = "ContentMenuRecentTab", i.ContentMenuStuffTab = "ContentMenuStuffTab", i.ContentMenuFurnitureTab = "ContentMenuFurnitureTab", i.ContentMenuYoutubeTab = "ContentMenuYoutubeTab", i.ContentMenuSketchfabTab = "ContentMenuSketchfabTab", i.ContentMenuNftTab = "ContentMenuNftTab", i.ContentMenuTemplatesTab = "ContentMenuTemplatesTab", i.ContentMenuIntegrationsTab = "ContentMenuIntegrationsTab", i.ContentMenuUploadTab = "ContentMenuUploadTab", i.CreateCustomEnvModal = "CreateCustomEnvModal", i.CreateHyperlinkPortal = "CreateHyperlinkPortal", i.CreatePortalModal = "CreatePortalModal", i.CreateYourHome = "CreateYourHome", i.CreatorToolkitEnvironmentsList = "CreatorToolkitEnvironmentsList", i.CreatorToolkitPage = "CreatorToolkitPage", i.CubemapPreviewMesh = "CubemapPreviewMesh", i.CubemapPreview = "CubemapPreview", i.CustomizeYourIdentity = "CustomizeYourIdentity", i.DisabledBackpackItemBanner = "DisabledBackpackItemBanner", i.DragAndDropFilesOverlay = "DragAndDropFilesOverlay", i.DownloadPage = "DownloadPage", i.EditCategoryModal = "EditCategoryModal", i.EditCustomEnvironmentBanner = "EditCustomEnvironmentBanner", i.EditSpaceInfo = "EditSpaceInfo", i.EditUserProfile = "EditUserProfile", i.EmailPasswordLogin = "EmailPasswordLogin", i.EmojiPicker = "EmojiPicker", i.EmoteKeybindSignInBanner = "EmoteKeybindSignInBanner", i.EmotesPicker = "EmotesPicker", i.EmotesTray = "EmotesTray", i.EndGoLiveModal = "EndGoLiveModal", i.EnvironmentsList = "EnvironmentsList", i.EnvironmentPicker = "EnvironmentPicker", i.EnvironmentSettings = "EnvironmentSettings", i.ErrorScreen = "ErrorScreen", i.ExploreTab = "ExploreTab", i.Footer = "Footer", i.FilmingModeModal = "FilmingModeModal", i.FirstTutorial = "FirstTutorial", i.FlatMediaLightbox = "FlatMediaLightbox", i.ForceResetPasswordForm = "ForceResetPasswordForm", i.GoLiveModal = "GoLiveModal", i.HappeningNowCarousel = "HappeningNowCarousel", i.HeroCarousel = "HeroCarousel", i.HeroCarouselSlide = "HeroCarouselSlide", i.HeroVideo = "HeroVideo", i.Homepage = "Homepage", i.HomepageBuildYourSpaceCarousel = "HomepageBuildYourSpaceCarousel", i.HomepageCreators = "HomepageCreators", i.HomepagePartners = "HomepagePartners", i.HomepagePress = "HomepagePress", i.HomepageTryOrDownload = "HomepageTryOrDownload", i.HostLiveEvents = "HostLiveEvents", i.HostToolsModal = "HostToolsModal", i.HyperlinksConfirmModal = "HyperlinksConfirmModal", i.InsufficientFundsModal = "InsufficientFundsModal", i.LovedSpacesList = "LovedSpacesList", i.LiveSpacesList = "LiveSpacesList", i.LoginModal = "LoginModal", i.LoginPage = "LoginPage", i.LoginOrSignUpEmailInput = "LoginOrSignUpEmailInput", i.LoginOrSignUpError = "LoginOrSignUpError", i.MicButton = "MicButton", i.MobileWebAppBanner = "MobileWebAppBanner", i.MobileWebSpaceInterstitial = "MobileWebSpaceInterstitial", i.MobileWebCreateSpaceInterstitial = "MobileWebCreateSpaceInterstitial", i.MobileWebSandboxInterstitial = "MobileWebSandboxInterstitial", i.Navbar = "Navbar", i.NewestSpacesList = "NewestSpacesList", i.NewSpaceMenu = "NewSpaceMenu", i.NotificationPermissionModal = "NotificationPermissionModal", i.OnboardingAddName = "OnboardingAddName", i.OnboardingTerms = "OnboardingTerms", i.OurPartners = "OurPartners", i.ParticipantsModal = "ParticipantsModal", i.PersonalSpacesList = "PersonalSpacesList", i.PersonalTab = "PersonalTab", i.PopularSpacesList = "PopularSpacesList", i.MobilePricingPlans = "MobilePricingPlans", i.MobilePricingPlansError = "MobilePricingPlansError", i.MobilePricingPlansLoading = "MobilePricingPlansLoading", i.ProfilePage = "ProfilePage", i.PublishedSpacesList = "PublishedSpacesList", i.QuestsCompleteModal = "QuestsCompleteModal", i.ReadyPlayerMeAnnouncementBanner = "ReadyPlayerMeAnnouncementBanner", i.ReadyPlayerMeCustomizationIFrame = "ReadyPlayerMeCustomizationIFrame", i.RecentSpacesList = "RecentSpacesList", i.RecommendedSpacesList = "RecommendedSpacesList", i.RecommendedSpacesOnLeave = "RecommendedSpacesOnLeave", i.RenameSpaceModal = "RenameSpaceModal", i.ReportSpaceModal = "ReportSpaceModal", i.RtcModal = "RtcModal", i.Safari15_4Rejection = "Safari15_4Rejection", i.SearchPage = "SearchPage", i.SelectedObjectButtons = "SelectedObjectButtons", i.SharedSpacesList = "SharedSpacesList", i.ShareDirectlyInvitedUsersModal = "ShareDirectlyInvitedUsersModal", i.SharePanel = "SharePanel", i.ShareSettingsCanViewDropdown = "ShareSettingsCanViewDropdown", i.ShareSettingsDropdown = "ShareSettingsDropdown", i.ShareToSocialsModal = "ShareToSocialsModal", i.ShareYourCreation = "ShareYourCreation", i.Shop = "Shop", i.ShopItemDetailsModal = "ShopItemDetailsModal", i.SignUpPasswordScreen = "SignUpPasswordScreen", i.Space = "Space", i.SpaceBanConfirmModal = "SpaceBanConfirmModal", i.SpaceLoadingSplash = "SpaceLoadingSplash", i.SpaceListItemHoverPreviewCard = "SpaceListItemHoverPreviewCard", i.SpacesListItemOverflowMenu = "SpacesListItemOverflowMenu", i.SpacePage = "SpacePage", i.SpacePicker = "SpacePicker", i.SpacePickerModal = "SpacePickerModal", i.SpacePreview = "SpacePreview", i.SpacePreviewErrorLoadingContent = "SpacePreviewErrorLoadingContent", i.SpacePreviewLoadingContent = "SpacePreviewLoadingContent", i.SpacesSearchError = "SpacesSearchError", i.SpacesSearchNoResults = "SpacesSearchNoResults", i.SpacesSearchResults = "SpacesSearchResults", i.SpaceSettingsMenu = "SpaceSettingsMenu", i.SpatianCommunity = "SpatianCommunity", i.SplashScreen = "SplashScreen", i.Studio = "Studio", i.StudioBadge = "StudioBadge", i.StudioItem = "StudioItem", i.StudioNewBadge = "StudioNewBadge", i.StudioNewItem = "StudioNewItem", i.SystemPermissionSettings = "SystemPermissionSettings", i.SystemPermissionRequest = "SystemPermissionRequest", i.FeedSpacesList = "FeedSpacesList", i.TeamSpacesList = "TeamSpacesList", i.TeamTab = "TeamTab", i.TemplatesList = "TemplatesList", i.TokenGateAccessSettings = "TokenGateAccessSettings", i.TrendingSpacesList = "TrendingSpacesList", i.TutorialModalKeyboardInstructions = "TutorialModalKeyboardInstructions", i.TutorialModalMouseInstructions = "TutorialModalMouseInstructions", i.TutorialModalReactInstructions = "TutorialModalReactInstructions", i.TutorialModalWelcome = "TutorialModalWelcome", i.UnlockableDanceStreakModal = "UnlockableDanceStreakModal", i.UpdatedTermsModal = "UpdatedTermsModal", i.UpsellSignup = "UpsellSignup", i.UseOnEveryDevice = "UseOnEveryDevice", i.UserProfile = "UserProfile", i.UserProfilePanel = "UserProfilePanel", i.UserProfileFollows = "UserProfileFollows", i.UserProfileFollowing = "UserProfileFollowing", i.VerifyEmailScreen = "VerifyEmailScreen", i.Webview = "Webview", i.WhatYouExperience = "WhatYouExperience"
        },
        54184: function(e, t, n) {
            "use strict";
            var i;
            let o;

            function r(e, t) {
                return e ? o.Image : t ? o.Video : o.Object
            }

            function a(e) {
                try {
                    if (!e) return null;
                    return new URL(e).host
                } catch (e) {
                    return null
                }
            }
            n.d(t, {
                LP: function() {
                    return o
                },
                iT: function() {
                    return a
                },
                tQ: function() {
                    return r
                }
            }), (i = o || (o = {})).Portal = "Portal", i.Image = "Image", i.Video = "Video", i.Object = "Object"
        },
        52433: function(e, t, n) {
            "use strict";
            n.d(t, {
                P: function() {
                    return l
                },
                e: function() {
                    return c
                }
            });
            var i = n(6277),
                o = n(45635),
                r = n(24966),
                a = n.n(r),
                s = n(52322);

            function l(e) {
                let {
                    classNameButton: t,
                    onClick: n,
                    disabled: r
                } = e;
                return (0, s.jsx)("button", {
                    className: (0, i.Z)(a().button, t),
                    onClick: n,
                    disabled: r,
                    children: (0, s.jsx)(o.r, {})
                })
            }

            function c(e) {
                let {
                    closeToast: t
                } = e;
                return (0, s.jsx)("button", {
                    className: a().button,
                    onClick: t,
                    children: (0, s.jsx)(o.r, {})
                })
            }
        },
        40798: function(e, t, n) {
            "use strict";
            n.d(t, {
                B: function() {
                    return h
                }
            });
            var i = n(95235),
                o = n(6277),
                r = n(99300),
                a = n.n(r),
                s = n(69529),
                l = n(78025),
                c = n(52322);

            function u(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    t && (i = i.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, i)
                }
                return n
            }

            function d(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? u(Object(n), !0).forEach(function(t) {
                        (0, i.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }

            function h(e) {
                let {
                    autoFocusConfirm: t,
                    title: n,
                    subtitle: i,
                    message: r,
                    denyText: u,
                    confirmText: h,
                    onConfirm: p,
                    onDeny: m,
                    linkHref: g,
                    confirmButtonColor: f,
                    denyButtonColor: _
                } = e, b = {
                    autoFocus: t,
                    className: "min-w-[180px]",
                    color: null != f ? f : "black",
                    onClick: p
                };
                return (0, c.jsxs)("div", {
                    className: (0, o.Z)(a().body, "min-w-[380px] max-w-[600px]"),
                    children: [(0, c.jsx)(s.X, {
                        size: "h2",
                        textAlign: "center",
                        className: "pb-4",
                        children: n
                    }), i, r, (0, c.jsxs)("div", {
                        className: "flex flex-row justify-evenly gap-5 pt-4",
                        children: [u && m && (0, c.jsx)(l.z, {
                            className: "min-w-[180px]",
                            color: null != _ ? _ : "outline",
                            size: "xl",
                            onClick: m,
                            children: u
                        }), g ? (0, c.jsx)(l.z, d(d({}, b), {}, {
                            size: "xl",
                            as: "a",
                            href: g,
                            target: "_blank",
                            rel: "noreferrer",
                            children: h
                        })) : (0, c.jsx)(l.z, d(d({}, b), {}, {
                            size: "xl",
                            children: h
                        }))]
                    })]
                })
            }
        },
        61945: function(e, t, n) {
            "use strict";
            n.d(t, {
                s: function() {
                    return p
                }
            });
            var i = n(95235),
                o = n(82269),
                r = n(2784),
                a = n(40798),
                s = n(53083),
                l = n(3349),
                c = n(52322);
            let u = ["onDismiss", "withInstanceCount"];

            function d(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    t && (i = i.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, i)
                }
                return n
            }

            function h(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? d(Object(n), !0).forEach(function(t) {
                        (0, i.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let p = (0, r.memo)(function(e) {
                let {
                    onDismiss: t,
                    withInstanceCount: n
                } = e, i = (0, o.Z)(e, u);
                return (0, c.jsx)(l.u, h(h({
                    darkOverlay: !0,
                    onRequestClose: t
                }, i), {}, {
                    children: n ? (0, c.jsx)(s.Jz, {
                        children: (0, c.jsx)(a.B, h({}, i))
                    }) : (0, c.jsx)(a.B, h({}, i))
                }))
            })
        },
        78298: function(e, t, n) {
            "use strict";
            n.d(t, {
                w: function() {
                    return s
                }
            });
            var i = n(2784),
                o = n(1366),
                r = n(54184),
                a = n(17905);

            function s(e, t) {
                let n = (0, o.XW)(),
                    s = (0, r.iT)(e),
                    l = (0, i.useMemo)(() => ({
                        host: s,
                        url: e,
                        objectType: t
                    }), [s, e, t]),
                    c = (0, i.useCallback)(e => {
                        let t = e ? a.A.HyperlinkLeaveSpatialConfirm : a.A.HyperlinkLeaveSpatialCancel;
                        n({
                            type: a.s.Click,
                            name: t
                        }, l)
                    }, [l, n]);
                return c
            }
        },
        53083: function(e, t, n) {
            "use strict";
            n.d(t, {
                Jz: function() {
                    return l
                },
                _E: function() {
                    return c
                }
            });
            var i = n(2784),
                o = n(31438),
                r = n(52322);
            let a = (0, o.G)("InstanceCountManager"),
                s = (0, i.createContext)({
                    register: a
                });

            function l(e) {
                return ! function() {
                    let {
                        register: e
                    } = (0, i.useContext)(s);
                    (0, i.useEffect)(() => e(), [e])
                }(), e.children || null
            }

            function c(e) {
                let t = (0, i.useRef)(0),
                    n = (0, i.useRef)(e.onChange);
                (0, i.useEffect)(() => {
                    n.current = e.onChange
                }, [e.onChange]);
                let o = (0, i.useCallback)(() => (t.current += 1, n.current(t.current), () => {
                    t.current -= 1, n.current(t.current)
                }), [t, n]);
                return (0, r.jsx)(s.Provider, {
                    value: {
                        register: o
                    },
                    children: e.children
                })
            }
        },
        34201: function(e, t, n) {
            "use strict";
            let i, o;
            n.r(t), n.d(t, {
                unityClientSaga: function() {
                    return eT
                }
            });
            var r, a, s = n(95235),
                l = n(14772),
                c = n(92642),
                u = n(6521),
                d = n(95893),
                h = n(14258),
                p = n(89959),
                m = n(8166),
                g = n(38776),
                f = n(44944),
                _ = n(73004),
                b = n(32082),
                v = n(65043),
                S = n(7484),
                C = n(44868),
                y = n(11251),
                P = n(27916),
                O = class {
                    constructor(e, t, n) {
                        (0, s.Z)(this, "_audioContext", void 0), (0, s.Z)(this, "_channels", void 0), (0, s.Z)(this, "_sampleRate", void 0), (0, s.Z)(this, "_minDelay", .2), (0, s.Z)(this, "_maxDelay", 1.2), (0, s.Z)(this, "_volume", 1), (0, s.Z)(this, "_playbackTailTime", 0), (0, s.Z)(this, "_audioElement", void 0), (0, s.Z)(this, "_destinationNode", void 0), (0, s.Z)(this, "_gainNode", void 0), (0, s.Z)(this, "_rtcAudioPipe", void 0), this._audioContext = e, this._channels = t, this._sampleRate = n, this.setup()
                    }
                    setup() {
                        this._gainNode = this._audioContext.createGain(), this._gainNode.gain.value = this._volume, this._rtcAudioPipe = window.globalRTCAudioLoopback, window.chrome && this._rtcAudioPipe ? (this._audioElement = document.createElement("audio"), this._audioElement.autoplay = !1, this._audioElement.className = "photonVoiceRTCPlaybackHackOutput", this._audioElement.loop = !0, this._destinationNode = this._audioContext.createMediaStreamDestination(), this._gainNode.connect(this._destinationNode), document.body.appendChild(this._audioElement), this._rtcAudioPipe.addStream(this._destinationNode.stream, e => {
                            this._audioElement.srcObject = e, (0, y.z)(this._audioElement)
                        }, e => {
                            C.k.error(P.D, e), this._gainNode.disconnect(), this._gainNode.connect(this._audioContext.destination)
                        })) : this._gainNode.connect(this._audioContext.destination), this._playbackTailTime = this._audioContext.currentTime
                    }
                    dispose() {
                        if (this._audioElement && (this._audioElement.srcObject = null, this._audioElement.remove()), this._destinationNode) {
                            var e;
                            null === (e = this._rtcAudioPipe) || void 0 === e || e.removeStream(this._destinationNode.stream)
                        }
                    }
                    setVolume(e) {
                        this._volume = e, this._gainNode && (this._gainNode.gain.value = this._volume)
                    }
                    feed(e) {
                        if (!e.length) return;
                        let t = this._audioContext.createBufferSource(),
                            n = e.length / this._channels,
                            i = this._audioContext.createBuffer(this._channels, n, this._sampleRate);
                        for (let t = 0; t < this._channels; t++) {
                            let o = i.getChannelData(t),
                                r = t;
                            for (let t = 0; t < n; t++) o[t] = e[r], r += this._channels
                        }
                        this._playbackTailTime < this._audioContext.currentTime && (this._playbackTailTime = this._audioContext.currentTime + this._minDelay);
                        let o = this._playbackTailTime - this._audioContext.currentTime;
                        o > this._maxDelay && (this._playbackTailTime = this._audioContext.currentTime + this._maxDelay), t.buffer = i, t.connect(this._gainNode), t.start(this._playbackTailTime), this._playbackTailTime += i.duration
                    }
                };
            class w {
                constructor() {
                    (0, s.Z)(this, "_streams", {}), (0, s.Z)(this, "_inputConnection", void 0), (0, s.Z)(this, "_outputConnection", void 0), (0, s.Z)(this, "_currOfferPromise", void 0), this.initConnection(), this.createOfferWhenAvailable({
                        offerToReceiveAudio: !0,
                        offerToReceiveVideo: !1
                    })
                }
                dispose() {
                    this._inputConnection.close(), this._outputConnection.close(), this._inputConnection = null, this._outputConnection = null, this._streams = {}
                }
                initConnection() {
                    this._inputConnection = new RTCPeerConnection(null), this._inputConnection.onicecandidate = e => this.onIceCandidate(this._outputConnection, e), this._outputConnection = new RTCPeerConnection(null), this._outputConnection.onicecandidate = e => this.onIceCandidate(this._inputConnection, e), this._outputConnection.ontrack = this.onOutputStreamOpened.bind(this)
                }
                addStream(e, t, n) {
                    this.isConnectionClosed() && this.initConnection();
                    let i = this._inputConnection.addTrack(e.getAudioTracks()[0], e);
                    this._streams[e.id] = {
                        inputStream: e,
                        outputStream: null,
                        sender: i,
                        onOutputStreamOpen: t,
                        onError: n
                    }, this.createOfferWhenAvailable({
                        offerToReceiveAudio: !0,
                        offerToReceiveVideo: !1
                    })
                }
                createOfferWhenAvailable(e) {
                    this._currOfferPromise ? this._currOfferPromise.finally(() => {
                        this.createOfferWhenAvailable(e)
                    }) : this._currOfferPromise = new Promise(t => {
                        this._inputConnection.createOffer(e).then(this.gotInputDescription.bind(this)).catch(this.onError.bind(this)).finally(() => {
                            this._currOfferPromise = null, t()
                        })
                    })
                }
                removeStream(e) {
                    let t = this._streams[e.id];
                    this.isConnectionClosed() || this._inputConnection.removeTrack(t.sender), delete this._streams[e.id]
                }
                isConnectionClosed() {
                    return "closed" === this._inputConnection.signalingState || "closed" === this._outputConnection.signalingState
                }
                gotInputDescription(e) {
                    return this._inputConnection.setLocalDescription(e).then(() => this._outputConnection.setRemoteDescription(e).then(() => this._outputConnection.createAnswer().then(this.gotOutputDescription.bind(this)).catch(this.onError.bind(this))).catch(this.onError.bind(this))).catch(this.onError.bind(this))
                }
                gotOutputDescription(e) {
                    return this._outputConnection.setLocalDescription(e).then(() => this._inputConnection.setRemoteDescription(e).catch(this.onError.bind(this))).catch(this.onError.bind(this))
                }
                onOutputStreamOpened(e) {
                    for (let t = 0; t < e.streams.length; ++t) {
                        let n = e.streams[t],
                            i = this._streams[n.id];
                        i ? (i.outputStream = n, i.onOutputStreamOpen(n)) : C.k.error(P.D, "remote stream opened unexpectedly")
                    }
                }
                onIceCandidate(e, t) {
                    e.addIceCandidate(t.candidate).catch(this.onError.bind(this))
                }
                onError(e) {
                    Object.values(this._streams).forEach(t => {
                        t.onError(e)
                    })
                }
            }
            var T = n(16837);
            let k = (e, t, n, i) => {
                    e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n), i && (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR))
                },
                E = (e, t, n, i, o) => {
                    if (e.width <= 0 || e.height <= 0) return {
                        texture: n,
                        needsRefresh: !1
                    };
                    let r = !1;
                    return n ? (e.width !== i || e.height !== o) && (i = e.width, o = e.height, r = !0) : (n = t.createTexture(), r = !0), {
                        texture: n,
                        needsRefresh: r
                    }
                },
                M = e => {
                    let t = {
                        width: 0,
                        height: 0,
                        updateTexture: null,
                        dispose: null
                    };
                    return t.updateTexture = (n, i, o, r) => {
                        if (!e || e.paused) return {
                            texture: i,
                            needsRefresh: !1
                        };
                        t.width = e.videoWidth, t.height = e.videoHeight;
                        let a = E(t, n, i, o, r);
                        return k(n, a.texture, e, a.needsRefresh), a
                    }, t.dispose = () => {
                        e && (e.srcObject = null, e.remove())
                    }, t
                };
            (r = i || (i = {}))[r.Setup = 0] = "Setup", r[r.Sample = 1] = "Sample";
            let N = e => {
                let t, o;
                let r = () => {
                    o && (o.terminate(), o = null), t && (t.readable.cancel(), t = null)
                };
                try {
                    let r = e.getVideoTracks();
                    if (r && r.length > 0) {
                        let e = r[0];
                        if (e && "VideoEncoder" in window) {
                            t = new window.MediaStreamTrackProcessor(e), (o = new Worker(n.tu(new URL(n.p + n.u(6689), n.b)))).onmessage = e => {
                                let t = e.data.frame;
                                a.width = t.width, a.height = t.height, t.close()
                            };
                            let r = t.readable,
                                s = {
                                    type: i.Setup,
                                    payload: {
                                        readable: r
                                    }
                                };
                            o.postMessage(s, [r])
                        }
                    }
                } catch (e) {
                    console.error("media stream processor failed setting up: ", e), r()
                }
                if (!t || !o) return r(), null;
                let a = {
                    width: 0,
                    height: 0,
                    updateTexture: null,
                    dispose: r
                };
                return a.updateTexture = (e, t, n, r) => {
                    let s = E(a, e, t, n, r);
                    s.needsRefresh && (o.onmessage = n => {
                        let i = n.data.frame;
                        k(e, t, i, !1), a.width = i.width, a.height = i.height, i.close()
                    });
                    let l = {
                        type: i.Sample
                    };
                    return o.postMessage(l, []), s
                }, a
            };
            (a = o || (o = {})).Liveswitch = "liveswitch", a.HLS = "hls";
            let I = e => {
                    let {
                        sourceType: t,
                        sourceInfo: n
                    } = e;
                    return t === o.Liveswitch ? R(n) : (o.HLS, null)
                },
                R = e => {
                    if ("function" == typeof window.spatialWebGLGetMediaStream) {
                        let t = window.spatialWebGLGetMediaStream(e.clientID, e.mediaID);
                        if (t) {
                            let e = N(t);
                            if (!e) {
                                let n = x();
                                n.srcObject = t, e = M(n)
                            }
                            return e
                        }
                    }
                    return null
                },
                x = () => {
                    let e = document.createElement("video");
                    return e.className = "unity-webgl-video-source", e.style.display = "none", e.playsInline = !0, e.muted = !0, e.loop = !0, e.disablePictureInPicture = !0, document.body.append(e), e.play().catch(() => {
                        e.addEventListener("canplay", () => {
                            e.play()
                        })
                    }), e
                };
            var D = n(39197),
                L = n(49611),
                A = n(54537);

            function* j() {
                let e = yield*(0, m.w_)(e => e.unity.appState.roomSession ? L.yZ(e.unity.appState) : null), t = yield*(0, m.w_)(e => {
                    var t;
                    return null === (t = e.auth) || void 0 === t ? void 0 : t.useAuthlessToken
                });
                if (t || !e) return;
                let n = yield(0, l.RE)(A.zt.integrations.getIntegrationResponse);
                yield(0, l.gz)(f.eX.setIntegrations(n))
            }
            var U = n(74115);

            function* B(e) {
                yield(0, l.$6)([(0, l.RE)(fetch, e.dataUrl), (0, l.RE)(fetch, e.codeUrl), (0, l.RE)(fetch, e.frameworkUrl)])
            }

            function* F(e, t) {
                for (;;) {
                    let n = yield(0, l.qn)(e);
                    if (yield(0, l.gz)(f.eX.setUnityInitializationProgress(n)), n > U.E9) {
                        t || (performance.measure("DownloadUnity", "DownloadUnity-start"), yield(0, l.gz)(f.eX.setUnityDownloadState(_.r5.Done)), v.Q8(), performance.mark("BootUnity-start")), e.close();
                        return
                    }
                }
            }
            var z = n(5632),
                H = n.n(z),
                Z = n(14420),
                G = n(39337),
                W = n(13864),
                X = n(57655),
                Y = n(25688),
                V = n(41385),
                K = n(50963),
                q = n(57755),
                J = n(61945),
                $ = n(54184),
                Q = n(1366),
                ee = n(10381),
                et = n(78298),
                en = n(69529),
                ei = n(52322);
            let eo = (0, Q.X5)(function(e) {
                let {
                    close: t,
                    unityAlert: n,
                    reply: i
                } = e, o = (0, et.w)(null == n ? void 0 : n.linkHref, $.LP.Portal), r = e => {
                    let r = e === (null == n ? void 0 : n.permitText);
                    o(r), t(), i(e)
                };
                return (0, ei.jsx)(J.s, {
                    isOpen: !0,
                    title: n.title,
                    subtitle: (0, ei.jsx)(en.X, {
                        as: "h4",
                        size: "h4",
                        textAlign: "center",
                        className: "mb-2 text-gray-500",
                        children: n.message
                    }),
                    message: (0, ei.jsx)(en.X, {
                        as: "h4",
                        size: "h4",
                        textAlign: "center",
                        weight: "black",
                        children: `${n.linkHref} ?`
                    }),
                    denyText: n.deniedText,
                    confirmText: n.permitText,
                    onDismiss: () => r(n.deniedText),
                    onDeny: () => r(n.deniedText),
                    onConfirm: () => r(n.permitText)
                })
            }, {
                id: ee.C.HyperlinksConfirmModal
            });
            var er = n(6277),
                ea = n(6991),
                es = n.n(ea),
                el = n(82546),
                ec = n.n(el);
            let eu = e => (0, ei.jsxs)("div", {
                className: (0, er.Z)(ec().container, "p-4"),
                children: [(0, ei.jsx)(en.X, {
                    size: "h2",
                    children: e.title
                }), (0, ei.jsx)("p", {
                    className: "py-4",
                    children: e.message
                }), (0, ei.jsx)("button", {
                    type: "button",
                    className: (0, er.Z)(es().textButton, "pr-8"),
                    onClick: e.onDeny,
                    children: e.denyText
                }), (0, ei.jsx)("button", {
                    type: "button",
                    className: (0, er.Z)(es().textButton, "pt-4 text-blue"),
                    onClick: e.onConfirm,
                    children: e.confirmText
                })]
            });
            var ed = n(53083),
                eh = n(71594),
                ep = n(95051);
            let em = ["hasUsedMouseOrKeyboard", "microphone/status", "roomSession/meetings", "roomSession/sessionDataSynced", "rtc/token"],
                eg = {
                    app_finished_booting: function*() {
                        let e = yield*(0, m.w_)(e => e.user), t = yield(0, l.Ys)(e => e.auth);
                        p.finishBooting(), p.setWebUserAgent((0, Y.GI)(navigator.userAgent)), p.initializeAppStateObservers(em), p.logIn(t.accessToken, t.useAuthlessToken, JSON.stringify(e.raw));
                        let n = new URLSearchParams(window.location.search);
                        eb(), yield(0, l.rM)(ev, n), eS(n), eC(n), yield(0, l.gz)(f.eX.setIsStarted(!0))
                    },
                    app_state_changed: function*(e) {
                        yield(0, l.gz)(f.eX.setUnityAppState(e.data))
                    },
                    app_state_patches: function*(e) {
                        yield(0, l.gz)(f.eX.patchAppState(e.data))
                    },
                    app_request_alert: function*(e) {
                        let t = e.data;
                        t.alertType === G.Km.EnterPortal ? yield(0, l.gz)(f.eX.setAlertFromUnity(t)): function(e, t) {
                            switch (e.alertType) {
                                case G.Km.ConfirmPortalPermissions:
                                case G.Km.NFTEnvironmentFallback:
                                case G.Km.ChangeEnvironmentFromContentMenu:
                                    (0, ep.v)(n => {
                                        let {
                                            close: i
                                        } = n, o = e => {
                                            i(), t(e)
                                        };
                                        return (0, ei.jsx)(J.s, {
                                            isOpen: !0,
                                            title: e.title,
                                            subtitle: (0, ei.jsx)(en.X, {
                                                as: "h5",
                                                size: "h5",
                                                textAlign: "center",
                                                children: e.linkHref
                                            }),
                                            message: (0, ei.jsx)(en.X, {
                                                as: "h5",
                                                size: "h5",
                                                textAlign: "center",
                                                children: e.message
                                            }),
                                            denyText: e.deniedText,
                                            confirmText: e.permitText,
                                            onDismiss: () => void 0,
                                            onDeny: () => o(e.deniedText),
                                            onConfirm: () => o(e.permitText)
                                        })
                                    });
                                    break;
                                case G.Km.NavigateWithHyperlink:
                                    (0, ep.v)(n => {
                                        let {
                                            close: i
                                        } = n;
                                        return (0, ei.jsx)(q.GH, {
                                            track: W.j,
                                            children: (0, ei.jsx)(eo, {
                                                close: i,
                                                unityAlert: e,
                                                reply: t
                                            })
                                        })
                                    });
                                    break;
                                default:
                                    let n = `spatial_unity_alert_${e.callbackID}`;
                                    eh.notifyConfirm({
                                        message: n => {
                                            let {
                                                closeToast: i
                                            } = n, o = e => {
                                                t(e), i()
                                            };
                                            return (0, ei.jsx)(ed.Jz, {
                                                children: (0, ei.jsx)(eu, {
                                                    title: e.title,
                                                    message: e.message,
                                                    denyText: e.deniedText,
                                                    confirmText: e.permitText,
                                                    onDeny: () => o(e.deniedText),
                                                    onConfirm: () => o(e.permitText)
                                                })
                                            })
                                        },
                                        containerId: eh.InRoomContainerId,
                                        options: {
                                            toastId: n,
                                            position: K.Am.POSITION.TOP_CENTER
                                        }
                                    })
                            }
                        }(t, e => {
                            p.requestAlertFeedback(t.callbackID, e)
                        })
                    },
                    get_app_config: function*() {
                        p.setAppConfig({
                            spatialUid: yield(0, l.Ys)(e => e.spatialUid), swagOrigin: "", sapiOrigin: b.ZP.API_URL
                        })
                    },
                    set_canvas_size: function*(e) {
                        let {
                            width: t,
                            height: n
                        } = e.data, i = yield(0, l.Ys)(e => e.canvas);
                        i.width = t, i.height = n
                    },
                    set_microphone_level: function*(e) {
                        let t = yield(0, l.Ys)(e => e.space.micPeakAmplitude);
                        t.set(e.data.level)
                    },
                    leave_room: function() {
                        H().push("/")
                    },
                    mixpanel_track: function(e) {
                        W.nT.track(e.data.eventName, e.data.properties)
                    },
                    mixpanel_register: function(e) {
                        W.nT.register(e.data)
                    },
                    mixpanel_unregister: function(e) {
                        W.nT.unregister(e.data)
                    },
                    end_of_frame: V.b,
                    quest_completed: function*(e) {
                        let {
                            data: t
                        } = e, n = yield(0, l.Ys)(e => e.unity.appState.roomSession.questSystem.quests), i = n[t.questId];
                        Object.values(n).every(e => e.status === G.SW.Completed) && (yield(0, l.gz)(f.eX.openModal({
                            type: X.c3.QuestComplete,
                            payload: {
                                questId: t.questId
                            }
                        }))), i && (yield(0, l.gz)(f.eX.questCompleted(i)))
                    },
                    quest_task_completed: function*(e) {
                        let t = yield(0, l.Ys)(e => L.ao(e.unity.appState));
                        if (!t) return;
                        let n = t.taskIDtoIndex[e.data.taskId],
                            i = t.tasks[n];
                        i && (yield(0, l.gz)(f.eX.questTaskCompleted(i)))
                    },
                    badge_rewarded: function*(e) {
                        yield(0, l.gz)(f.eX.badgeRewarded(e.data.badgeId))
                    }
                },
                ef = new S.nZ("UnityBridge");

            function* e_(e) {
                let t = performance.now(),
                    n = JSON.parse(e),
                    i = performance.now();
                if (!(null != n && n.name)) {
                    C.k.error(ef, "Received message without `name` property", {
                        message: n
                    });
                    return
                }
                if ("production" !== b.ZP.DEPLOYMENT_ENV && n.timing) {
                    n.timing.preParse = t, n.timing.postParse = i;
                    let e = yield(0, l.Ys)(e => e.user);
                    (null == e ? void 0 : e.treatments.recordReactBridgeTraces) === Z.f7 && ey(n)
                }
                let o = eg[n.name];
                if (!o) {
                    C.k.error(ef, "Unhandled message", {
                        message: n
                    });
                    return
                }
                yield(0, l.RE)(o, n)
            }
            let eb = () => {
                let e = D.K.fetch(D.K.STORAGE_LOCAL_LOG_LEVEL_KEY, -1),
                    t = D.K.fetch(D.K.STORAGE_REMOTE_LOG_LEVEL_KEY, -1);
                e >= 0 && p.setLocalLogLevel(e), t >= 0 && p.setRemoteLogLevel(t)
            };

            function* ev(e) {
                let t = yield(0, l.Ys)(f.aC.getSelectedPixelRatio), n = parseFloat(e.get("pixel_ratio"));
                for (n && (t = n), t > 1 && (t = 1), yield(0, l.gz)(f.eX.setMediaSettings({
                        selectedPixelRatio: t
                    }));;) - 1 === t ? (p.setCameraPixelRatio(1), p.enableAutoCameraPixelRatio()) : (p.setCameraPixelRatio(t), p.disableAutoCameraPixelRatio()), [t] = yield*(0, m.Sq)(f.aC.getSelectedPixelRatio)
            }
            let eS = e => {
                    let t = parseFloat(e.get("framerate"));
                    t && p.setFramerateSettings(t, 0)
                },
                eC = e => {
                    let t = parseInt(e.get("anti_aliasing"));
                    t && p.setAntiAliasing(t)
                },
                ey = e => {
                    let t = e.timing.postSerialize - e.timing.preSerialize,
                        n = e.timing.preParse - e.timing.postSerialize,
                        i = e.timing.postParse - e.timing.preParse;
                    v.QE({
                        msgName: e.name,
                        serialize: t,
                        transit: n,
                        parse: i
                    })
                };

            function eP(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    t && (i = i.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, i)
                }
                return n
            }

            function eO(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? eP(Object(n), !0).forEach(function(t) {
                        (0, s.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eP(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let ew = new S.nZ("UnityDownload");

            function* eT(e, t, n, i) {
                "production" !== b.ZP.DEPLOYMENT_ENV && (window.UnityMessages = p), window.spatialWebGLCreateMicrophone = (e, t, n, i) => new T.z(e, t, n, i), window.chrome && "undefined" != typeof RTCPeerConnection ? window.globalRTCAudioLoopback = new w : window.globalRTCAudioLoopback = null, window.spatialWebGLCreateAudioSource = (e, t, n) => new O(e, t, n), window.spatialWebGLCreateVideoSource = e => I(e), window.spatialWebGLStartSentryTransaction = e => c.Yr({
                    name: e
                });
                let o = (0, d.GG)(e => (window.ReactUnityWebGL = {
                        MessageToReact: t => e(t)
                    }, () => {
                        window.ReactUnityWebGL.MessageToReact = e => {
                            let t;
                            try {
                                t = JSON.parse(e)
                            } catch {}
                            C.k.error("Message sent from Unity after the channel was closed.", t)
                        }
                    }), d.Ef.expanding()),
                    r = yield(0, l.v_)(i), a = eO(eO({}, e), {}, {
                        companyName: "Spatial Systems, Inc.",
                        productName: "Spatial",
                        devicePixelRatio: window.devicePixelRatio,
                        print: e => {
                            C.k.debug(`Unity message: ${e}`)
                        },
                        printErr: e => {
                            if (e instanceof Error ? C.k.error("Unity error:", e) : C.k.error(`Unity error: ${e}`), "out of memory" === e) {
                                let e = Error("SPATIAL_UNITY_OUT_OF_MEMORY");
                                c.Tb(e, {
                                    level: "fatal"
                                }), (0, g.Ko)()
                            }
                        },
                        matchWebGLToCanvasSize: !0,
                        startupErrorHandler: eE("SPATIAL_UNITY_FATAL_STARTUP_EXCEPTION"),
                        errorHandler: eE("SPATIAL_UNITY_FATAL_EXCEPTION")
                    });
                C.k.debug(ew, "Unity instance parameters", a);
                let s = "unity-download-and-boot",
                    u = `${s}-start`;
                performance.mark(u), performance.mark("DownloadUnity-start"), yield(0, l.gz)(f.eX.setUnityDownloadState(_.r5.InProgress));
                let m = n.isRunning();
                if (m) {
                    let t = "pre-download-unity",
                        n = `${t}-start`;
                    performance.mark(n), yield(0, l.RE)(B, e), performance.measure(t, n), yield(0, l.RE)(v.Q8), performance.measure("DownloadUnity", "DownloadUnity-start"), yield(0, l.gz)(f.eX.setUnityDownloadState(_.r5.Done)), performance.mark("BootUnity-start")
                }
                let S = (0, d.CE)();
                yield(0, l.rM)(F, S, m), yield(0, l.v_)(n);
                let y = yield(0, l.RE)(r, t, a, S.put);
                performance.measure("BootUnity", "BootUnity-start"), performance.measure(s, u), yield(0, l.RE)(v.ll);
                let P = e => {
                    let t = JSON.stringify(e);
                    y.SendMessage("UnityMessageManager", "onRNMessage", t)
                };
                yield(0, l.RE)(p.setMessageSender, P), yield(0, l.rM)(h.Y6, o, e_), yield(0, l.rM)(ek), yield(0, l.rM)(j)
            }

            function* ek() {
                for (;;) {
                    let [e] = yield*(0, m.Sq)(f.aC.getMediaSettings);
                    D.K.setItem(D.K.SPATIAL_MEDIA_SETTINGS, JSON.stringify(e))
                }
            }

            function eE(e) {
                return function(t) {
                    if (!u.eW()) {
                        let n = Error(e);
                        n.stack = t, c.Tb(n, {
                            level: "fatal"
                        })
                    }
                    return (0, g.Ko)(), !0
                }
            }
        },
        71594: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                InRoomContainerId: function() {
                    return l
                },
                dismiss: function() {
                    return b
                },
                error: function() {
                    return v
                },
                errorManualClose: function() {
                    return S
                },
                isActive: function() {
                    return c
                },
                notify: function() {
                    return u
                },
                notifyConfirm: function() {
                    return m
                },
                notifyManualClose: function() {
                    return p
                },
                notifyNoClose: function() {
                    return h
                },
                notifyProgress: function() {
                    return d
                },
                promptConfirm: function() {
                    return f
                },
                update: function() {
                    return _
                },
                warn: function() {
                    return g
                }
            });
            var i = n(95235),
                o = n(50963),
                r = n(52433);

            function a(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    t && (i = i.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), n.push.apply(n, i)
                }
                return n
            }

            function s(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(n), !0).forEach(function(t) {
                        (0, i.Z)(e, t, n[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    })
                }
                return e
            }
            let l = "inRoom";

            function c(e) {
                return o.Am.isActive(e)
            }

            function u() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Got it",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1600,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "toast-bg",
                    i = arguments.length > 3 ? arguments[3] : void 0,
                    r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                    a = (0, o.Am)(e, s(s({
                        position: o.Am.POSITION.BOTTOM_CENTER,
                        transition: o.Mi,
                        className: n,
                        bodyClassName: "toast-body",
                        progressClassName: "toast-progress-bar",
                        hideProgressBar: !0,
                        closeButton: r,
                        closeOnClick: !1
                    }, t && {
                        autoClose: t
                    }), i && {
                        toastId: i
                    }));
                return a
            }

            function d() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Upload in progress",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "toast-bg",
                    i = (0, o.Am)(e, {
                        position: o.Am.POSITION.BOTTOM_CENTER,
                        transition: o.Mi,
                        className: n,
                        bodyClassName: "toast-body",
                        progressClassName: "toast-progress-bar",
                        autoClose: !1,
                        progress: t,
                        closeButton: !1,
                        closeOnClick: !1
                    });
                return i
            }

            function h() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Got it",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "toast-bg",
                    n = (0, o.Am)(e, {
                        position: o.Am.POSITION.BOTTOM_CENTER,
                        transition: o.Mi,
                        className: t,
                        bodyClassName: "toast-body",
                        progressClassName: "toast-progress-bar",
                        hideProgressBar: !0,
                        autoClose: !1,
                        closeButton: !1,
                        closeOnClick: !1
                    });
                return n
            }

            function p() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Got it",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "toast-bg toast-bg-overflow",
                    n = arguments.length > 2 ? arguments[2] : void 0,
                    i = arguments.length > 3 ? arguments[3] : void 0,
                    a = (0, o.Am)(e, s(s({
                        position: o.Am.POSITION.BOTTOM_CENTER,
                        transition: o.Mi,
                        className: t,
                        bodyClassName: "toast-body",
                        progressClassName: "toast-progress-bar"
                    }, {
                        containerId: i
                    }), {}, {
                        hideProgressBar: !0,
                        autoClose: !1,
                        closeButton: r.e,
                        closeOnClick: !1
                    }, {
                        onClose: n
                    }));
                return a
            }

            function m(e) {
                let {
                    message: t = "Got it",
                    containerId: n,
                    options: i = {
                        position: o.Am.POSITION.TOP_CENTER
                    },
                    className: r = "toast-bg"
                } = e, a = (0, o.Am)(t, s(s({}, i), {}, {
                    transition: o.Mi,
                    className: r,
                    bodyClassName: "toast-body",
                    progressClassName: "toast-progress-bar",
                    hideProgressBar: !0,
                    draggable: !1,
                    autoClose: !1,
                    closeButton: !1,
                    closeOnClick: !1,
                    containerId: n
                }));
                return a
            }

            function g(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1600,
                    n = o.Am.warn(e, {
                        position: o.Am.POSITION.BOTTOM_CENTER,
                        transition: o.Mi,
                        hideProgressBar: !0,
                        autoClose: t,
                        closeButton: !1,
                        closeOnClick: !1
                    });
                return n
            }

            function f(e, t) {
                let n = (0, o.Am)(e, {
                    position: o.Am.POSITION.BOTTOM_CENTER,
                    transition: o.Mi,
                    className: "toast-bg toast-prompt",
                    bodyClassName: "toast-prompt-body",
                    progressClassName: "toast-progress-bar",
                    hideProgressBar: !0,
                    autoClose: !1,
                    closeButton: !1,
                    closeOnClick: !0,
                    onClick: t
                });
                return n
            }
            let _ = (e, t) => o.Am.update(e, t),
                b = e => o.Am.dismiss(e);

            function v() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Error",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1600;
                u(e, t, "toast-error")
            }

            function S() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Error";
                p(e, "toast-error")
            }
        },
        30507: function(e, t, n) {
            "use strict";
            n.d(t, {
                i: function() {
                    return s
                }
            });
            var i = n(14772),
                o = n(49611);
            let r = Intl.DateTimeFormat("default", {
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit"
                }),
                a = Intl.DateTimeFormat("default", {
                    timeStyle: "short"
                });

            function* s() {
                let e = yield(0, i.Ys)(e => o.r6(e.unity.appState)), t = new Date, n = r.format(t).replaceAll("/", "-"), s = a.format(t).replace(":", ".");
                return `${e} on ${n} at ${s}`
            }
        },
        41385: function(e, t, n) {
            "use strict";
            n.d(t, {
                b: function() {
                    return h
                },
                V: function() {
                    return d
                }
            });
            var i = n(14772),
                o = n(92642);

            function r(e, t, n) {
                return new Promise(i => {
                    e.toBlob(i, t, n)
                })
            }
            var a = n(9962),
                s = n(89959),
                l = n(71594),
                c = n(30507);
            let u = null;

            function* d(e) {
                yield(0, i.RE)(s.notifyOnFrameEnd), yield new Promise(e => void(u = e));
                try {
                    let t = yield(0, i.RE)(r, e);
                    if (!t) throw Error("Unable to make make blob while taking screenshot of the canvas");
                    let n = yield(0, i.RE)(c.i);
                    yield(0, i.RE)(a.J, `${n}.png`, t)
                } catch (e) {
                    l.error("Something went wrong taking a photo. Please try again."), o.Tb(e)
                }
            }

            function h() {
                if (!u) throw Error("finishScreenshot called before screenshotSaga");
                u()
            }
        },
        95051: function(e, t, n) {
            "use strict";
            n.d(t, {
                v: function() {
                    return o
                }
            });
            var i = n(28316);
            let o = e => {
                let t = !0,
                    n = document.createElement("div"),
                    o = () => {
                        t && (t = !1, i.unmountComponentAtNode(n), n.remove())
                    },
                    r = e({
                        close: o
                    });
                return document.body.appendChild(n), i.render(r, n), o
            }
        },
        11251: function(e, t, n) {
            "use strict";
            n.d(t, {
                z: function() {
                    return i
                }
            });
            let i = e => {
                let t = () => {
                        o(), null != e && e.paused && e.play().catch(() => {
                            i()
                        })
                    },
                    n = window.globalAudioContext,
                    i = () => {
                        n.addEventListener("statechange", t)
                    },
                    o = () => {
                        n.removeEventListener("statechange", t)
                    };
                t()
            }
        },
        16837: function(e, t, n) {
            "use strict";
            n.d(t, {
                z: function() {
                    return d
                }
            });
            var i = n(95235),
                o = n(13115),
                r = n(39337),
                a = n(7484),
                s = n(44868),
                l = n.p + "static/microphone-recorder.1c511eaad645cc08.worklet.js";
            class c {
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
                    (0, i.Z)(this, "_deviceID", void 0), (0, i.Z)(this, "_groupID", void 0), (0, i.Z)(this, "_mediaStream", void 0), (0, i.Z)(this, "_isCreatingStream", !1), (0, i.Z)(this, "_isCanceled", !1), (0, i.Z)(this, "_shouldBeRecording", !1), (0, i.Z)(this, "_status", void 0), (0, i.Z)(this, "_statusCallback", void 0), this._deviceID = e, this._statusCallback = (e, n) => {
                        this._status = e, t(e, n)
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
                    this._statusCallback(r.PF.On, null), this._mediaStream.onremovetrack = () => {
                        this._statusCallback(r.PF.Off, "microphone track has been removed unexpectedly")
                    }, this._mediaStream.getTracks().forEach(e => {
                        var t;
                        e.onended = () => {
                            this._statusCallback(r.PF.Off, null)
                        }, e.onmute = () => {
                            this._shouldBeRecording ? this._statusCallback(r.PF.Muted, "microphone has been muted unexpectedly") : this._statusCallback(r.PF.Off, null)
                        }, e.onunmute = () => {
                            this._statusCallback(r.PF.On, null)
                        }, this._groupID = null === (t = e.getSettings()) || void 0 === t ? void 0 : t.groupId
                    }), this._shouldBeRecording || this.pause()
                }
                handleStartFailed(e) {
                    let t = r.PF.Unknown;
                    if (e.name in r.PF) {
                        let n = e.name;
                        t = r.PF[n]
                    }
                    this._statusCallback(t, e.message)
                }
                async start() {
                    this._isCreatingStream = !0, this._shouldBeRecording = !0, this._statusCallback(r.PF.RequestingPermissions, null);
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
                    }), this._mediaStream = null), this._statusCallback(r.PF.Off, null)
                }
                pause() {
                    this._shouldBeRecording = !1;
                    let e = !1;
                    this._mediaStream && this._mediaStream.getTracks().forEach(t => {
                        t.enabled = !1, e = !0
                    }), e && this._statusCallback(r.PF.Off, null)
                }
                resume() {
                    this._shouldBeRecording = !0;
                    let e = !1;
                    return this._mediaStream && this._mediaStream.getTracks().forEach(t => {
                        "live" === t.readyState && (t.enabled = !0, e = !0)
                    }), !!e && (this._statusCallback(r.PF.On, null), !0)
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
            let u = new a.nZ("Microphone");
            class d {
                static get instance() {
                    return d._instance
                }
                get audioContext() {
                    return this._audioContext
                }
                get outputNode() {
                    return this._gainNode
                }
                constructor(e, t, n, o) {
                    (0, i.Z)(this, "_audioContext", void 0), (0, i.Z)(this, "_statusCallback", void 0), (0, i.Z)(this, "_deviceID", null), (0, i.Z)(this, "_currentStream", null), (0, i.Z)(this, "_shouldBeRecording", void 0), (0, i.Z)(this, "_sourceNode", void 0), (0, i.Z)(this, "_gainNode", void 0), (0, i.Z)(this, "_workletNode", void 0), (0, i.Z)(this, "_processorNode", void 0), (0, i.Z)(this, "_isReading", !1), (0, i.Z)(this, "handleMediaDevicesChanged", async () => {
                        try {
                            let i = await navigator.mediaDevices.enumerateDevices();
                            if (!i) return;
                            let o = !1,
                                a = null,
                                l = null;
                            for (let e = 0; e < i.length; ++e) "audioinput" !== i[e].kind || (i[e].deviceId === this._deviceID ? (o = !0, l = i[e].groupId) : o || null !== a && "default" !== i[e].deviceId || (a = i[e].deviceId));
                            if (o) {
                                var e, t, n;
                                if (((null === (e = this._currentStream) || void 0 === e ? void 0 : e.groupID) !== l || (null === (t = this._currentStream) || void 0 === t ? void 0 : t.deviceID) !== this._deviceID || (null === (n = this._currentStream) || void 0 === n ? void 0 : n.status) !== r.PF.On) && this._shouldBeRecording) {
                                    let e = this.debugInfo();
                                    e.currentGroupID = l, s.k.info(u, "restarting microphone stream after device list has changed", {
                                        LogData: e
                                    }), this.start()
                                }
                            } else if (a && this._shouldBeRecording) {
                                let e = this.debugInfo();
                                e.fallbackDeviceID = a, s.k.info(u, "starting microphone stream with a fallback device", {
                                    LogData: e
                                }), this.startWithDevice(a)
                            }
                        } catch (e) {
                            s.k.error(u, "failed with handling devices changed", e)
                        }
                    }), d._instance = this, this._audioContext = e, this._statusCallback = t, this._gainNode = this._audioContext.createGain(), navigator.mediaDevices.addEventListener("devicechange", this.handleMediaDevicesChanged), this.setupPermissionsHandler(), this.startDataReadback(o, n), d.onMicrophoneInitialized.emit()
                }
                dispose() {
                    d._instance === this && (d._instance = null), this.stop(), this.stopDataReadback(), this._gainNode && (this._gainNode.disconnect(), this._gainNode = null), navigator.mediaDevices.removeEventListener("devicechange", this.handleMediaDevicesChanged)
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
                    s.k.debug(u, "setting microphone deviceID", {
                        LogData: {
                            deviceID: e
                        }
                    }), e !== this._deviceID && (this._deviceID = e, this._shouldBeRecording && this.start())
                }
                setGain(e) {
                    this._gainNode.gain.setValueAtTime(e, this._audioContext.currentTime)
                }
                startWithDevice(e) {
                    this.stop(), this._shouldBeRecording = !0, s.k.debug(u, "starting microphone stream", {
                        LogData: {
                            deviceID: e
                        }
                    });
                    let t = new c(e, (e, n) => {
                        this.handleMicStatusChanged(t, e, n)
                    });
                    this._currentStream = t, this._currentStream.start().then(e => {
                        this.handleMicrophoneStreamStarted(t, e)
                    })
                }
                handleMicStatusChanged(e, t, n) {
                    e === this._currentStream && (this._statusCallback(t, n), t === r.PF.Off && this._shouldBeRecording && (s.k.info(u, "microphone has stopped when it should be recording", {
                        LogData: this.debugInfo()
                    }), this.start()))
                }
                handleMicrophoneStreamStarted(e, t) {
                    let n = e === this._currentStream;
                    if (s.k.debug(u, "handle microphone stream started", {
                            LogData: {
                                success: t,
                                isCurrentStream: n
                            }
                        }), t && n) {
                        var i;
                        null === (i = this._sourceNode) || void 0 === i || i.disconnect(), this._sourceNode = this._audioContext.createMediaStreamSource(e.mediaStream), this._sourceNode.connect(this._gainNode)
                    }
                }
                async setupPermissionsHandler() {
                    if (navigator.permissions) try {
                        let e = await navigator.permissions.query({
                            name: "microphone"
                        });
                        e.onchange = () => {
                            var t;
                            s.k.debug(u, "microphone permission status has changed", {
                                LogData: {
                                    status: e.state
                                }
                            }), "granted" === e.state && this._shouldBeRecording && !(null !== (t = this._currentStream) && void 0 !== t && t.isCreatingStream) && (s.k.info(u, "restarting microphone stream due to permission being granted"), this.start())
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
                    var n;
                    if (this._isReading) {
                        s.k.error(u, "tried starting data readback when it was already reading");
                        return
                    }
                    if (this._isReading = !0, "function" == typeof(null === (n = this._audioContext.audioWorklet) || void 0 === n ? void 0 : n.addModule)) try {
                        this.setupAudioWorklet(e, t)
                    } catch (n) {
                        try {
                            await this._audioContext.audioWorklet.addModule(l), this.setupAudioWorklet(e, t)
                        } catch (n) {
                            s.k.warn(u, "creating audio worklet for readback has failed", n), this.setupScriptProcessor(e, t)
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
            }(0, i.Z)(d, "onMicrophoneInitialized", new o.Event), (0, i.Z)(d, "_instance", void 0)
        },
        27916: function(e, t, n) {
            "use strict";
            n.d(t, {
                D: function() {
                    return o
                }
            });
            var i = n(7484);
            let o = new i.nZ("Voice")
        },
        6991: function(e) {
            e.exports = {
                textButton: "button_textButton__1FrJk"
            }
        },
        24966: function(e) {
            e.exports = {
                button: "close-button_button__iDEuL"
            }
        },
        82546: function(e) {
            e.exports = {
                container: "confirm-toast_container__KvfwG"
            }
        },
        43879: function(e, t) {
            "use strict";
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
            "use strict";
            var n = this && this.__assign || Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
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
            "use strict";

            function i(e) {
                for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), i(n(43879)), i(n(15770)), i(n(48371));
            var o = n(13115);
            e.exports = {
                Event: o.Event,
                events: o.events,
                Signal: o.Signal
            }
        },
        48371: function(e, t, n) {
            "use strict";
            var i, o = this && this.__extends || (i = Object.setPrototypeOf || ({
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
            var r = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), t.prototype.emit = function() {
                    return e.prototype.emit.call(this, void 0)
                }, t
            }(n(43879).Event);
            t.Signal = r
        }
    }
]);
//# sourceMappingURL=unity-client-saga.0d41dc9a3dc8c4ea.js.map