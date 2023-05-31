"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9611], {
        13412: function(o, e, n) {
            n.d(e, {
                n: function() {
                    return t
                },
                y: function() {
                    return r
                }
            });
            let r = o => o.startsWith("https://youtube.com/watch") || o.startsWith("https://m.youtube.com/watch") || o.startsWith("https://www.youtube.com/watch") || o.startsWith("https://www.youtube.com/embed/") || o.startsWith("https://youtu.be/"),
                t = o => r(o) && o.includes("/playlist")
        },
        49611: function(o, e, n) {
            n.d(e, {
                $S: function() {
                    return oS
                },
                $t: function() {
                    return E
                },
                DH: function() {
                    return O
                },
                Dh: function() {
                    return g
                },
                Ds: function() {
                    return u
                },
                FX: function() {
                    return M
                },
                J7: function() {
                    return T
                },
                JO: function() {
                    return W
                },
                Js: function() {
                    return c
                },
                Jx: function() {
                    return oO
                },
                LR: function() {
                    return R
                },
                Lk: function() {
                    return ot
                },
                Ln: function() {
                    return z
                },
                Ns: function() {
                    return J
                },
                O$: function() {
                    return oD
                },
                Or: function() {
                    return _
                },
                PN: function() {
                    return m
                },
                Qb: function() {
                    return p
                },
                RH: function() {
                    return oi
                },
                RR: function() {
                    return b
                },
                Re: function() {
                    return oh
                },
                S2: function() {
                    return ob
                },
                SF: function() {
                    return S
                },
                SJ: function() {
                    return v
                },
                Sz: function() {
                    return ou
                },
                T8: function() {
                    return L
                },
                UP: function() {
                    return C
                },
                Uu: function() {
                    return V
                },
                Uy: function() {
                    return k
                },
                VY: function() {
                    return U
                },
                W$: function() {
                    return y
                },
                Wc: function() {
                    return A
                },
                Wv: function() {
                    return q
                },
                _2: function() {
                    return op
                },
                _8: function() {
                    return I
                },
                _N: function() {
                    return oI
                },
                aV: function() {
                    return or
                },
                ao: function() {
                    return oN
                },
                b_: function() {
                    return ov
                },
                cs: function() {
                    return x
                },
                dd: function() {
                    return os
                },
                e7: function() {
                    return w
                },
                fv: function() {
                    return oa
                },
                gI: function() {
                    return $
                },
                hY: function() {
                    return h
                },
                jW: function() {
                    return od
                },
                mS: function() {
                    return oo
                },
                nK: function() {
                    return Q
                },
                ni: function() {
                    return ol
                },
                ox: function() {
                    return X
                },
                qB: function() {
                    return om
                },
                qJ: function() {
                    return oy
                },
                qT: function() {
                    return a
                },
                r6: function() {
                    return d
                },
                sB: function() {
                    return P
                },
                sv: function() {
                    return f
                },
                t: function() {
                    return l
                },
                tK: function() {
                    return of
                },
                u0: function() {
                    return on
                },
                uM: function() {
                    return F
                },
                x0: function() {
                    return D
                },
                xi: function() {
                    return og
                },
                yZ: function() {
                    return j
                },
                zZ: function() {
                    return N
                }
            });
            var r, t, s = n(13412),
                i = n(39337);
            (r = t || (t = {})).Store = "store", r.EarlyAccess = "early-access";
            let u = o => o.clientVersionChannel === t.EarlyAccess,
                l = (o, e) => {
                    var n;
                    let r = e ? o.rooms[e] : a(o);
                    return null !== (n = null == r ? void 0 : r.lobbyType) && void 0 !== n ? n : i.A8.None
                },
                a = o => o.rooms[o.roomSession.roomID],
                c = o => {
                    var e;
                    return null === (e = o.roomSession) || void 0 === e ? void 0 : e.roomID
                },
                d = function(o) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
                        n = null != e ? e : o.roomSession.roomID,
                        r = o.rooms[n];
                    return null == r ? void 0 : r.name
                },
                m = function(o, e) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
                        r = o.rooms[null != n ? n : o.roomSession.roomID];
                    return Object.keys(r.participants).filter(o => o !== e).length > 0
                },
                S = o => o !== i.PF.On && o !== i.PF.Off && o !== i.PF.RequestingPermissions && o !== i.PF.Muted && o !== i.PF.Unknown,
                v = o => o.features.includes(i.OS.RoomAdminTools),
                f = (o, e) => y(o, o.userProfile.userID, e),
                h = (o, e) => b(o, o.userProfile.userID, e),
                b = (o, e, n) => {
                    let r = o.rooms[null != n ? n : o.roomSession.roomID];
                    return e === (null == r ? void 0 : r.ownerID)
                },
                y = (o, e, n) => {
                    let r = b(o, e, n),
                        t = o.rooms[null != n ? n : o.roomSession.roomID],
                        s = t ? t.administrators : o.roomSession.room.administrators,
                        i = s.includes(e);
                    return r || i
                },
                p = (o, e, n) => {
                    let r = o.rooms[null != n ? n : o.roomSession.roomID],
                        t = r ? r.participants : o.roomSession.room.participants;
                    return e in t || e in o.roomSession.actorsLookup
                },
                D = (o, e, n) => E(o, e) ? "(You)" : b(o, e, n) ? "(Creator)" : y(o, e, n) ? "(Host)" : null,
                I = (o, e, n) => e ? N(o, e) ? `${n} is already banned` : E(o, e) ? "Cannot ban yourself" : b(o, e) ? `Cannot ban ${n} because they are the creator of this space` : null : "User not found",
                A = (o, e, n) => e ? y(o, e) ? `${n} is already a host` : null : "User not found",
                g = o => v(o.roomSession) && f(o),
                O = o => o.roomSession.socialProfileMenu.menuVisible ? o.roomSession.socialProfileMenu.selectedUserID : void 0,
                P = (o, e) => o.userProfile.blockedUsers.includes(e),
                N = (o, e) => e in o.roomSession.moderation.bannedUsers,
                E = (o, e) => o.userProfile.userID === e,
                M = (o, e) => o.room.restrictedPermissions.includes(e),
                R = o => !!o.config.treatments.userTeleportHostTool,
                k = o => o.roomSession.inSession && o.roomSession.avatarOverride.type !== i.YN.Disabled ? o.roomSession.avatarOverride.bodyURL : o.userProfile.avatar.body,
                j = o => o.roomSession.addContentEnabled,
                C = o => o.roomSession.clearRoomEnabled,
                W = o => {
                    let e = M(o.roomSession, i.gs.NoAutoplay),
                        n = o.roomSession.camera.mode,
                        r = o.roomSession.isReadOnlyActor,
                        t = o.roomSession.selectedObject.objectID,
                        s = o.roomSession.addContentEnabled;
                    return !e && (r || 0 === t && !s || n === i.VC.ArtNavigation || n === i.VC.AutoPlay)
                },
                w = (o, e) => {
                    var n;
                    let r = o.roomSession;
                    return e === (null === (n = r.actors[r.localActorNumber]) || void 0 === n ? void 0 : n.userID) || r.muteAnyoneEnabled
                },
                U = o => o.roomSession.changeEnvironmentEnabled,
                F = (o, e) => b(o, o.userProfile.userID, e) && !m(o, o.userProfile.userID, e) && l(o, e) === i.A8.None,
                T = o => o.roomSession.saveRoomEnabled,
                L = (o, e) => {
                    let {
                        images: n,
                        videoPlayers: r
                    } = o.roomSession.sharedState.scene;
                    return !!((null == n ? void 0 : n[e]) || (null == r ? void 0 : r[e]))
                },
                _ = (o, e) => {
                    let {
                        images: n
                    } = o.roomSession.sharedState.scene;
                    return !!(null == n ? void 0 : n[e])
                },
                q = (o, e) => {
                    let {
                        videoPlayers: n
                    } = o.roomSession.sharedState.scene;
                    return !!(null == n ? void 0 : n[e])
                },
                V = (o, e) => o.roomSession.objectIDToDirectURLLookup[e],
                $ = (o, e) => {
                    var n;
                    return null === (n = o.roomSession.sharedState.scene.hyperlinks) || void 0 === n ? void 0 : n[e]
                },
                J = o => (o.roomSession.selectedObject.transformManipulationMode & i.QW.Move) != 0,
                Q = o => (o.roomSession.selectedObject.transformManipulationMode & i.QW.Rotate) != 0,
                x = o => (o.roomSession.selectedObject.transformManipulationMode & i.QW.Scale) != 0,
                z = (o, e) => {
                    var n;
                    return !!(null === (n = o.roomSession.sharedState.scene.models) || void 0 === n ? void 0 : n[e])
                },
                B = (o, e) => {
                    var n;
                    return !!(null === (n = o.roomSession.sharedState.scene.rtcFeeds) || void 0 === n ? void 0 : n[e])
                },
                H = (o, e) => {
                    var n, r;
                    let {
                        rtcFeeds: t
                    } = o.roomSession.sharedState.scene, {
                        feedID: s
                    } = t[e];
                    return null !== (n = null === (r = Object.keys(t).find(o => {
                        let n = Number.parseInt(o);
                        return n != e && (null == t ? void 0 : t[n].feedID) === s
                    })) || void 0 === r ? void 0 : r.length) && void 0 !== n ? n : 0
                },
                Y = (o, e) => H(o, e) >= 2,
                G = (o, e) => {
                    var n;
                    return !!(null === (n = o.roomSession.sharedState.scene.documents) || void 0 === n ? void 0 : n[e])
                },
                K = (o, e) => {
                    var n;
                    let r = null === (n = o.roomSession.sharedState.scene.objects) || void 0 === n ? void 0 : n[e];
                    return !!r && y(o, r.creatorUserID)
                },
                Z = ["spatialcontent://opensea", "spatialcontent://magicEden"],
                X = o => {
                    var e;
                    return null === (e = o.roomSession.sharedState.scene.galleryFrames[o.roomSession.selectedObject.objectID]) || void 0 === e ? void 0 : e.isEmpty
                },
                oo = (o, e) => {
                    let {
                        images: n,
                        videoPlayers: r,
                        models: t
                    } = o.roomSession.sharedState.scene;
                    return Z.some(o => {
                        var s, i, u;
                        return (null == n ? void 0 : null === (s = n[e]) || void 0 === s ? void 0 : s.url.startsWith(o)) || (null == r ? void 0 : null === (i = r[e]) || void 0 === i ? void 0 : i.url.startsWith(o)) || (null == t ? void 0 : null === (u = t[e]) || void 0 === u ? void 0 : u.url.startsWith(o))
                    })
                },
                oe = (o, e) => {
                    let {
                        images: n,
                        videoPlayers: r,
                        models: t
                    } = o.roomSession.sharedState.scene;
                    return !!((null == n ? void 0 : n[e]) || (null == r ? void 0 : r[e]) || (null == t ? void 0 : t[e]))
                },
                on = (o, e) => {
                    var n, r;
                    return !!(null === (n = o.roomSession.sharedState.scene.galleryInfos) || void 0 === n ? void 0 : null === (r = n[e]) || void 0 === r ? void 0 : r.isVisible)
                },
                or = (o, e) => {
                    var n;
                    return null === (n = o.roomSession.sharedState.scene.galleryInfos) || void 0 === n ? void 0 : n[e]
                },
                ot = o => !!o.roomSession.sharedState.customEnvironment.modelURL,
                os = o => o.roomSession.sharedState.settings.environment === i.cv.Custom,
                oi = o => !!o.roomSession.sharedState.customEnvironment.skyboxURL,
                ou = o => o.roomSession.userTools.customEnvironmentTool.currentStep !== i.f2.None,
                ol = (o, e) => {
                    var n;
                    return !!(null === (n = o.roomSession.sharedState.scene.portals) || void 0 === n ? void 0 : n[e])
                },
                oa = o => ou(o),
                oc = o => o.roomSession.room.restrictedPermissions.includes(i.gs.RestrictOthersViewOnly),
                od = (o, e) => {
                    var n, r;
                    if (!(e in o.roomSession.actorsLookup)) return !0;
                    let t = o.roomSession.actorsLookup[e][0];
                    return null === (n = null === (r = o.roomSession.sharedState.actorMetaData[t]) || void 0 === r ? void 0 : r.isAuthless) || void 0 === n || n
                },
                om = o => {
                    var e, n, r;
                    let t = g(o),
                        u = b(o, o.userProfile.userID),
                        l = o.roomSession.selectedObject.objectID,
                        a = V(o, l),
                        c = oo(o, l),
                        d = a && (0, s.y)(a),
                        m = o.roomSession.sharedState.scene.pinnedObjects.includes(l),
                        S = !!(null === (e = o.roomSession.sharedState.scene.galleryPedestals) || void 0 === e ? void 0 : e[l]),
                        v = c && on(o, l),
                        f = !!(null === (n = o.roomSession.sharedState.scene.galleryFrames) || void 0 === n ? void 0 : null === (r = n[l]) || void 0 === r ? void 0 : r.hasFrame),
                        h = K(o, l),
                        y = o.roomSession.editAdminContentEnabled,
                        p = oc(o),
                        D = u || t || !p && (y || !h),
                        I = o.roomSession.addContentEnabled,
                        A = !l || m || !D,
                        O = z(o, l) && o.roomSession.changeEnvironmentEnabled && D && !A,
                        P = o.roomSession.features.includes(i.OS.DisableDeleteContent),
                        N = L(o, l),
                        E = X(o),
                        M = !!a && o.roomSession.downloadContentEnabled && !c && !d,
                        R = D && o.roomSession.selectedObject.transformManipulationMode !== i.QW.None,
                        k = (E || N || z(o, l) || G(o, l)) && D,
                        j = z(o, l) && D,
                        C = (!B(o, l) || 2 > H(o, l)) && I && !A,
                        W = (!B(o, l) || Y(o, l)) && D && !A && !P,
                        w = L(o, l) && D && !A,
                        U = z(o, l) && D && !A,
                        F = D && oe(o, l) && !d;
                    return {
                        downloadButtonDisplayed: M,
                        lockButtonDisplayed: R,
                        replaceContentButtonDisplayed: k,
                        transformButtonDisplayed: D && !A,
                        oneToOneButtonDisplayed: j,
                        duplicateButtonDisplayed: C,
                        deleteButtonDisplayed: W,
                        disableDelete: P,
                        customEnvironmentButtonDisplayed: O,
                        infoButtonDisplayed: c && D && !A && !d,
                        frameButtonDisplayed: w,
                        pedestalButtonDisplayed: U,
                        objectURL: a,
                        isLocked: A,
                        infoDisplayed: v,
                        frameDisplayed: f,
                        pedestalDisplayed: S,
                        isNft: c,
                        canAddHyperlink: F
                    }
                },
                oS = (o, e) => {
                    var n, r;
                    let t = null === (n = o.roomSession) || void 0 === n ? void 0 : n.actorsLookup[e];
                    return null === (r = o.roomSession) || void 0 === r ? void 0 : r.sharedState.actorMetaData[null == t ? void 0 : t[0]]
                },
                ov = o => o.userProfile.blockedUsers,
                of = o => {
                    let e = o.roomSession.persistenceStatus;
                    return e === i.Tr.SaveRequested || e === i.Tr.Saving
                },
                oh = o => o.roomSession.sharedState.settings.environment,
                ob = o => {
                    var e;
                    return null === (e = o.toastSystem) || void 0 === e ? void 0 : e.toasts
                },
                oy = o => o.roomSession.sharedState.settings.enableAudioAttenuation,
                op = o => o.roomSession.sharedState.settings.enableAutosave,
                oD = o => {
                    var e;
                    return null == o ? void 0 : null === (e = o.roomSession) || void 0 === e ? void 0 : e.inRoomAndFullySynced
                },
                oI = o => o.roomSession.participantChatDisabled,
                oA = [i.cv.IsleGallery, i.cv.ObsidianGallery, i.cv.AeriesGallery, i.cv.NFT0001_Museo, i.cv.NFT0002_BozoIsland],
                og = (o, e) => oA.includes(o) || e,
                oO = (o, e) => {
                    let n = !o.isMuted,
                        r = !e.isMuted;
                    return n !== r ? r ? 1 : -1 : oP(o, e)
                },
                oP = (o, e) => {
                    let n = o.roomActorNumbers && o.roomActorNumbers.size > 0 ? Math.min(...o.roomActorNumbers) : -1,
                        r = e.roomActorNumbers && e.roomActorNumbers.size > 0 ? Math.min(...e.roomActorNumbers) : -1;
                    return r - n
                },
                oN = o => {
                    let e = o.roomSession.questSystem.currentQuestID;
                    return 0 === e ? null : o.roomSession.questSystem.quests[e]
                }
        }
    }
]);
//# sourceMappingURL=9611-269519895f09bb5e.js.map