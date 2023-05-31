! function() {
    "use strict";
    var e, t, c, a, n, d, f, r, b, o, i, s, u = {},
        l = {};

    function m(e) {
        var t = l[e];
        if (void 0 !== t) return t.exports;
        var c = l[e] = {
                id: e,
                loaded: !1,
                exports: {}
            },
            a = !0;
        try {
            u[e].call(c.exports, c, c.exports, m), a = !1
        } finally {
            a && delete l[e]
        }
        return c.loaded = !0, c.exports
    }
    m.m = u, e = [], m.O = function(t, c, a, n) {
        if (c) {
            n = n || 0;
            for (var d = e.length; d > 0 && e[d - 1][2] > n; d--) e[d] = e[d - 1];
            e[d] = [c, a, n];
            return
        }
        for (var f = 1 / 0, d = 0; d < e.length; d++) {
            for (var c = e[d][0], a = e[d][1], n = e[d][2], r = !0, b = 0; b < c.length; b++) f >= n && Object.keys(m.O).every(function(e) {
                return m.O[e](c[b])
            }) ? c.splice(b--, 1) : (r = !1, n < f && (f = n));
            if (r) {
                e.splice(d--, 1);
                var o = a();
                void 0 !== o && (t = o)
            }
        }
        return t
    }, m.F = {}, m.E = function(e) {
        Object.keys(m.F).map(function(t) {
            m.F[t](e)
        })
    }, m.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return m.d(t, {
            a: t
        }), t
    }, c = Object.getPrototypeOf ? function(e) {
        return Object.getPrototypeOf(e)
    } : function(e) {
        return e.__proto__
    }, m.t = function(e, a) {
        if (1 & a && (e = this(e)), 8 & a || "object" == typeof e && e && (4 & a && e.__esModule || 16 & a && "function" == typeof e.then)) return e;
        var n = Object.create(null);
        m.r(n);
        var d = {};
        t = t || [null, c({}), c([]), c(c)];
        for (var f = 2 & a && e;
            "object" == typeof f && !~t.indexOf(f); f = c(f)) Object.getOwnPropertyNames(f).forEach(function(t) {
            d[t] = function() {
                return e[t]
            }
        });
        return d.default = function() {
            return e
        }, m.d(n, d), n
    }, m.d = function(e, t) {
        for (var c in t) m.o(t, c) && !m.o(e, c) && Object.defineProperty(e, c, {
            enumerable: !0,
            get: t[c]
        })
    }, m.f = {}, m.e = function(e) {
        return Promise.all(Object.keys(m.f).reduce(function(t, c) {
            return m.f[c](e, t), t
        }, []))
    }, m.u = function(e) {
        return 9097 === e ? "static/chunks/9097-b46742872dc225e5.js" : 2911 === e ? "static/chunks/2911-f2a7c8ab4c34e198.js" : 8220 === e ? "static/chunks/8220-3b379839d6b96ea8.js" : 1688 === e ? "static/chunks/1688-ac25a38e4e1cb5ec.js" : 3556 === e ? "static/chunks/3556-d9f2264606701879.js" : 1686 === e ? "static/chunks/1686-62802f5aa33ae86d.js" : 1411 === e ? "static/chunks/1411-31ca2e35e2d5e36c.js" : 9611 === e ? "static/chunks/9611-269519895f09bb5e.js" : 3353 === e ? "static/chunks/3353-ef09466d606e27f3.js" : 8199 === e ? "static/chunks/8199-132e43f14f616bf2.js" : 255 === e ? "static/chunks/255-8a8c0df9176d2ae6.js" : 5818 === e ? "static/chunks/5818-cdaf26f9c0322f88.js" : 7916 === e ? "static/chunks/7916-53b417506bc3f086.js" : 3439 === e ? "static/chunks/3439-23266134147b2155.js" : 7620 === e ? "static/chunks/7620-816b47dc609b1f78.js" : 2242 === e ? "static/chunks/2242-fff0ef33da4d4490.js" : 2e3 === e ? "static/chunks/2000-98c7acfe76c28e8b.js" : 4185 === e ? "static/chunks/4185-4cbaeb323c52182e.js" : 9498 === e ? "static/chunks/9498-06b7c4d46082d6a8.js" : 6887 === e ? "static/chunks/6887-bf210fb6fd7f0c6d.js" : 8421 === e ? "static/chunks/8421-fd2ba219a9f6e351.js" : "static/chunks/" + (({
            39: "debug-settings",
            253: "go-live-modal",
            480: "rtc-media-capture",
            713: "page-transition-loader",
            912: "create-custom-env-modal-content",
            1119: "unity-client-saga",
            1937: "create-portal-modal-content",
            1976: "rtc-local-client",
            2182: "2edb282b",
            2400: "sandbox-mobile-interstitial",
            2434: "b54760fc",
            2729: "feed-history-modal-contents",
            2812: "manage-banned",
            3007: "feed-spaces-trailers",
            3755: "cca69633",
            3794: "profile-menu",
            3922: "1743016e",
            3994: "17f0de3f",
            3999: "51c52c66",
            4149: "room-rtc-manager",
            4361: "badge-modal-contents",
            4465: "report-space-content",
            4546: "020d8314",
            4597: "create-space",
            4608: "host-tools-modal",
            4636: "notif-permission-modal-content",
            4741: "7413e8b9",
            4803: "55de809b",
            5131: "filming-mode-modal",
            5162: "content-menu",
            5201: "user-profile-editor-modal",
            5505: "banned-modal-content",
            5562: "login-modal-content",
            5673: "framer-motion-features",
            5873: "fd0ff8c8",
            6015: "manage-categories",
            6584: "toast-component",
            6696: "feed-spaces-grid",
            6719: "token-gate-access-modal",
            6800: "switch-meeting",
            6850: "quest-complete-modal-contents",
            6886: "dance-streak-modal-content",
            6899: "edit-space-info",
            6911: "edit-category-modal-contents",
            6989: "global-modals",
            7227: "end-go-live-modal",
            7283: "manage-admins",
            7325: "connect-solana-button",
            7381: "quest-status-pill-contents",
            7433: "object-inspector",
            7752: "rename-modal-content",
            7921: "media-and-room-settings-modal",
            8006: "token-gate-welcome-modal",
            8136: "feed-spaces-row",
            8171: "spaces-picker-modal-contents",
            8520: "share-to-socials-modal",
            8791: "mobile-banner-view",
            9012: "cubemap-preview",
            9059: "backpack-item-details",
            9116: "chat-panel",
            9963: "shop-item-details"
        })[e] || e) + "." + ({
            39: "33e8aa68e423db31",
            253: "a04dccece0f6245f",
            340: "9d29898eb6dc3620",
            480: "7993b229f1361b6e",
            517: "d9f681e33e59f2b4",
            572: "c8c5de5f44740258",
            713: "e748c16896dbc13e",
            912: "f3bc247a881bad34",
            959: "f06cd398318c1d7b",
            1119: "0d41dc9a3dc8c4ea",
            1897: "13d4f2bfd920ce57",
            1937: "c1a0fd1721648dae",
            1976: "3ad49748da0105d3",
            2182: "4f046aae50401924",
            2292: "910341b6ae2b2730",
            2400: "410a5087c2f707a5",
            2434: "5cdc0a9345ed7244",
            2729: "08386ecb35d8dfdb",
            2812: "9b6b07dce77fad06",
            3007: "1e24862230d538ba",
            3041: "d0ab8266e571792b",
            3755: "f4a2c93aada7fc4e",
            3794: "a8f3e1fd2af02fb0",
            3897: "17d651964dbb5cd3",
            3922: "47278058e903fd35",
            3994: "82f6ee6b8c07d27f",
            3999: "3f8fbdded8d6bb62",
            4015: "77b580d5d5391dd8",
            4149: "6964946534793f60",
            4361: "c22d560e428d82ab",
            4371: "96d19be606803e1a",
            4410: "dc31b80f07c6f29b",
            4429: "aaa86515aa2672a5",
            4451: "a2f82ace970670be",
            4465: "067286186fefb839",
            4546: "4f3b1a4fa3c98bd5",
            4597: "befab70ee234f0f9",
            4608: "cebda3e931ec6bad",
            4636: "2e41495207cdf34a",
            4734: "bcb03d3adbd49dba",
            4741: "111056a7fffeba69",
            4803: "da2d60df70f81139",
            5131: "54b852e4a557d61d",
            5162: "bc928293c4c15c7d",
            5201: "9ef8a6ee65ad3962",
            5203: "3c32835007a71980",
            5505: "d146e7aa71c3259a",
            5562: "f4c461fe36a08eac",
            5673: "d0725df7173fd8c0",
            5873: "166c4845956e4a43",
            5977: "09ea43bb09b9743f",
            6015: "37db52f6058a1c0a",
            6441: "4052a4d0ae8026a7",
            6584: "cc09a61c002ae876",
            6617: "a7320487f2720c2e",
            6625: "7a31c4e8c2157a79",
            6689: "b9eb01ba50c0306e",
            6696: "0cdc22238781f3e8",
            6719: "017a98b8a72cd583",
            6800: "703f11ff4b33df47",
            6850: "4ce8e031619d07d1",
            6886: "f1ce28ff3699c2a9",
            6899: "8b806378e65e36cd",
            6911: "4ceedc6b525f6128",
            6989: "397e00cb0c545662",
            7104: "db6b852925141631",
            7122: "48b7d0fa6acd3508",
            7227: "74a5fb121bddd34c",
            7283: "d7838a63362f0e3c",
            7325: "04b83e2f29fdea30",
            7381: "f20cc19703e1c0ab",
            7393: "722b6f155ab52e5a",
            7433: "46f93574664ec65e",
            7752: "0e3fc68b24a04886",
            7921: "30800398e1953164",
            8006: "9a88382416000dba",
            8121: "792a4846ca8dcbb5",
            8136: "9d7e08dd84c02a5e",
            8171: "45b4f062c1c8a454",
            8520: "04f8652b0a38fd1e",
            8791: "d2b31cdff24e1b63",
            8854: "81bf5a0a425bd314",
            9012: "a37d3e96b31c6d58",
            9059: "dad900a718c03e41",
            9116: "8a2fa517e20163f8",
            9250: "a229553fe863ba08",
            9258: "87e715378ba49273",
            9414: "f1bfc51248b33fd0",
            9963: "d566e84474c96afc"
        })[e] + ".js"
    }, m.miniCssF = function(e) {
        return "static/css/" + ({
            253: "b0498f6b9170dc01",
            277: "dbebc4ccb51e08e4",
            572: "bdd3dc8ed10e4f1b",
            710: "d7f4cc8810c85569",
            765: "e2204c70bec5ec01",
            775: "1f12b187a00b4251",
            912: "8eb683067768164d",
            1119: "550d2c117b8ffd9e",
            1237: "7bf951cb54cd4db3",
            1353: "c2f74ee7405e48c3",
            1715: "5cc6dc0748417a45",
            2197: "e50ca7cb90ec15e5",
            2292: "250d8532cfd591e1",
            2400: "bf78489de39194ca",
            2417: "efcb7c6f12d82f51",
            2456: "d348fa99ef41884e",
            2729: "28cda0a380b4e2b0",
            2812: "399552b4b76f9d64",
            2888: "3762f5e88130609a",
            3007: "7add03becb7369c5",
            3028: "3fb8aa9ff3d696d8",
            3459: "d4f856e39300b4fd",
            3661: "b920e89cc37bd241",
            3794: "8019a37679914e1b",
            3897: "fdce98ca4a2a9a32",
            4361: "64191ea339f0c3eb",
            4465: "d2fc529721843672",
            4597: "4f65a2879a17f822",
            4608: "c24e943b6db6faf7",
            4670: "b53817acf10b4753",
            4714: "2166d23c1c4229dc",
            4742: "3bc770230b513126",
            5131: "eb949d80216ad1b3",
            5162: "3c0b866b342b7da5",
            5201: "beb60d0832f4047e",
            5250: "c1996f669ce33733",
            5405: "491b8ad822466875",
            5505: "1d2e129b95133463",
            5562: "4ea498a0058dd5f3",
            5638: "9a9d5f7a45fdffe4",
            6015: "6ad2a1b9cf8e8fe9",
            6550: "73a7f128d326a2bb",
            6584: "9ef858bf23a39661",
            6617: "d0e41ff37f720597",
            6696: "3a7e07e944f414d4",
            6719: "a2a90fa798a2f4dc",
            6800: "e098d87d45be56cb",
            6850: "4375344e4792aeef",
            6886: "961019f3ca52100b",
            6890: "f13ce8013455d66f",
            6891: "d4f856e39300b4fd",
            6892: "70e8489727ecbad2",
            6899: "63b6a396fbd9968e",
            6911: "32db746d3afd6bf6",
            6964: "e920b990dd69b022",
            6989: "ca1e9775d4939a1c",
            7232: "c0497e0d579c93d5",
            7283: "620400be118f6981",
            7381: "b686fe8e1f1d18e2",
            7410: "56d2efd8daf20fe6",
            7433: "80e2aa72fa51134d",
            7520: "2a9c92a675fd4ea8",
            7752: "a6f552768e762ce7",
            7921: "e4cf0b8a0cefda8e",
            8006: "608b8d9baab0c753",
            8017: "da8aca6c31adcf4e",
            8069: "1fdc4471116c4da9",
            8077: "70e8489727ecbad2",
            8084: "b61b52b1430c436f",
            8136: "4c503fb6d0ceb4e0",
            8171: "2d6534e31305f14e",
            8279: "ff67423688a39eb7",
            8293: "70e8489727ecbad2",
            8309: "7917f07e4d67dd0c",
            8490: "ff708cffef7f4d8f",
            8520: "a554e2b8aaf1d226",
            8573: "f2a768ca64d45949",
            8746: "52b8df382573c892",
            8791: "210d345d43aebf05",
            8915: "f13ce8013455d66f",
            9116: "56be2e9e4e8f7777",
            9163: "138929114e1a2ba8",
            9258: "2cee9276c3215619",
            9603: "26cee4a6f03629be"
        })[e] + ".css"
    }, m.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), m.hmd = function(e) {
        return (e = Object.create(e)).children || (e.children = []), Object.defineProperty(e, "exports", {
            enumerable: !0,
            set: function() {
                throw Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + e.id)
            }
        }), e
    }, m.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a = {}, n = "_N_E:", m.l = function(e, t, c, d) {
        if (a[e]) {
            a[e].push(t);
            return
        }
        if (void 0 !== c)
            for (var f, r, b = document.getElementsByTagName("script"), o = 0; o < b.length; o++) {
                var i = b[o];
                if (i.getAttribute("src") == e || i.getAttribute("data-webpack") == n + c) {
                    f = i;
                    break
                }
            }
        f || (r = !0, (f = document.createElement("script")).charset = "utf-8", f.timeout = 120, m.nc && f.setAttribute("nonce", m.nc), f.setAttribute("data-webpack", n + c), f.src = m.tu(e)), a[e] = [t];
        var s = function(t, c) {
                f.onerror = f.onload = null, clearTimeout(u);
                var n = a[e];
                if (delete a[e], f.parentNode && f.parentNode.removeChild(f), n && n.forEach(function(e) {
                        return e(c)
                    }), t) return t(c)
            },
            u = setTimeout(s.bind(null, void 0, {
                type: "timeout",
                target: f
            }), 12e4);
        f.onerror = s.bind(null, f.onerror), f.onload = s.bind(null, f.onload), r && document.head.appendChild(f)
    }, m.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, m.nmd = function(e) {
        return e.paths = [], e.children || (e.children = []), e
    }, m.tt = function() {
        return void 0 === d && (d = {
            createScriptURL: function(e) {
                return e
            }
        }, "undefined" != typeof trustedTypes && trustedTypes.createPolicy && (d = trustedTypes.createPolicy("nextjs#bundler", d))), d
    }, m.tu = function(e) {
        return m.tt().createScriptURL(e)
    }, m.p = "/_next/", f = function(e, t, c, a) {
        var n = document.createElement("link");
        return n.rel = "stylesheet", n.type = "text/css", n.onerror = n.onload = function(d) {
            if (n.onerror = n.onload = null, "load" === d.type) c();
            else {
                var f = d && ("load" === d.type ? "missing" : d.type),
                    r = d && d.target && d.target.href || t,
                    b = Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
                b.code = "CSS_CHUNK_LOAD_FAILED", b.type = f, b.request = r, n.parentNode.removeChild(n), a(b)
            }
        }, n.href = t, document.head.appendChild(n), n
    }, r = function(e, t) {
        for (var c = document.getElementsByTagName("link"), a = 0; a < c.length; a++) {
            var n = c[a],
                d = n.getAttribute("data-href") || n.getAttribute("href");
            if ("stylesheet" === n.rel && (d === e || d === t)) return n
        }
        for (var f = document.getElementsByTagName("style"), a = 0; a < f.length; a++) {
            var n = f[a],
                d = n.getAttribute("data-href");
            if (d === e || d === t) return n
        }
    }, b = {
        2272: 0
    }, m.f.miniCss = function(e, t) {
        b[e] ? t.push(b[e]) : 0 !== b[e] && ({
            253: 1,
            572: 1,
            912: 1,
            1119: 1,
            2292: 1,
            2400: 1,
            2729: 1,
            2812: 1,
            3007: 1,
            3794: 1,
            3897: 1,
            4361: 1,
            4465: 1,
            4597: 1,
            4608: 1,
            5131: 1,
            5162: 1,
            5201: 1,
            5505: 1,
            5562: 1,
            6015: 1,
            6584: 1,
            6617: 1,
            6696: 1,
            6719: 1,
            6800: 1,
            6850: 1,
            6886: 1,
            6899: 1,
            6911: 1,
            6989: 1,
            7283: 1,
            7381: 1,
            7433: 1,
            7752: 1,
            7921: 1,
            8006: 1,
            8136: 1,
            8171: 1,
            8520: 1,
            8791: 1,
            9116: 1,
            9258: 1
        })[e] && t.push(b[e] = new Promise(function(t, c) {
            var a = m.miniCssF(e),
                n = m.p + a;
            if (r(a, n)) return t();
            f(e, n, t, c)
        }).then(function() {
            b[e] = 0
        }, function(t) {
            throw delete b[e], t
        }))
    }, m.b = document.baseURI || self.location.href, o = {
        2272: 0,
        8279: 0
    }, m.f.j = function(e, t) {
        var c = m.o(o, e) ? o[e] : void 0;
        if (0 !== c) {
            if (c) t.push(c[2]);
            else if (/^(2272|4597|8279)$/.test(e)) o[e] = 0;
            else {
                var a = new Promise(function(t, a) {
                    c = o[e] = [t, a]
                });
                t.push(c[2] = a);
                var n = m.p + m.u(e),
                    d = Error();
                m.l(n, function(t) {
                    if (m.o(o, e) && (0 !== (c = o[e]) && (o[e] = void 0), c)) {
                        var a = t && ("load" === t.type ? "missing" : t.type),
                            n = t && t.target && t.target.src;
                        d.message = "Loading chunk " + e + " failed.\n(" + a + ": " + n + ")", d.name = "ChunkLoadError", d.type = a, d.request = n, c[1](d)
                    }
                }, "chunk-" + e, e)
            }
        }
    }, m.F.j = function(e) {
        if ((!m.o(o, e) || void 0 === o[e]) && !/^(2272|4597|8279)$/.test(e)) {
            o[e] = null;
            var t = document.createElement("link");
            m.nc && t.setAttribute("nonce", m.nc), t.rel = "prefetch", t.as = "script", t.href = m.p + m.u(e), document.head.appendChild(t)
        }
    }, m.O.j = function(e) {
        return 0 === o[e]
    }, i = function(e, t) {
        var c, a, n = t[0],
            d = t[1],
            f = t[2],
            r = 0;
        if (n.some(function(e) {
                return 0 !== o[e]
            })) {
            for (c in d) m.o(d, c) && (m.m[c] = d[c]);
            if (f) var b = f(m)
        }
        for (e && e(t); r < n.length; r++) a = n[r], m.o(o, a) && o[a] && o[a][0](), o[a] = 0;
        return m.O(b)
    }, (s = self.webpackChunk_N_E = self.webpackChunk_N_E || []).forEach(i.bind(null, 0)), s.push = i.bind(null, s.push.bind(s))
}();
//# sourceMappingURL=webpack-7739717d949243aa.js.map