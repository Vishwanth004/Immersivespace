! function() {
    var e = {
            15: function(e, t) {
                ! function(e) {
                    "use strict";

                    function t(e) {
                        return new Promise(function(t, n) {
                            e.onsuccess = function() {
                                t(e.result)
                            }, e.onerror = function() {
                                n(e.error)
                            }
                        })
                    }

                    function n(e, n, i) {
                        var a, r = new Promise(function(r, o) {
                            t(a = e[n].apply(e, i)).then(r, o)
                        });
                        return r.request = a, r
                    }

                    function i(e, t, n) {
                        n.forEach(function(n) {
                            Object.defineProperty(e.prototype, n, {
                                get: function() {
                                    return this[t][n]
                                },
                                set: function(e) {
                                    this[t][n] = e
                                }
                            })
                        })
                    }

                    function a(e, t, i, a) {
                        a.forEach(function(a) {
                            a in i.prototype && (e.prototype[a] = function() {
                                return n(this[t], a, arguments)
                            })
                        })
                    }

                    function r(e, t, n, i) {
                        i.forEach(function(i) {
                            i in n.prototype && (e.prototype[i] = function() {
                                return this[t][i].apply(this[t], arguments)
                            })
                        })
                    }

                    function o(e, t, i, a) {
                        a.forEach(function(a) {
                            a in i.prototype && (e.prototype[a] = function() {
                                var e, i, r;
                                return e = this[t], i = arguments, (r = n(e, a, i)).then(function(e) {
                                    if (e) return new c(e, r.request)
                                })
                            })
                        })
                    }

                    function s(e) {
                        this._index = e
                    }

                    function c(e, t) {
                        this._cursor = e, this._request = t
                    }

                    function l(e) {
                        this._store = e
                    }

                    function u(e) {
                        this._tx = e, this.complete = new Promise(function(t, n) {
                            e.oncomplete = function() {
                                t()
                            }, e.onerror = function() {
                                n(e.error)
                            }, e.onabort = function() {
                                n(e.error)
                            }
                        })
                    }

                    function p(e, t, n) {
                        this._db = e, this.oldVersion = t, this.transaction = new u(n)
                    }

                    function d(e) {
                        this._db = e
                    }
                    i(s, "_index", ["name", "keyPath", "multiEntry", "unique"]), a(s, "_index", IDBIndex, ["get", "getKey", "getAll", "getAllKeys", "count"]), o(s, "_index", IDBIndex, ["openCursor", "openKeyCursor"]), i(c, "_cursor", ["direction", "key", "primaryKey", "value"]), a(c, "_cursor", IDBCursor, ["update", "delete"]), ["advance", "continue", "continuePrimaryKey"].forEach(function(e) {
                        e in IDBCursor.prototype && (c.prototype[e] = function() {
                            var n = this,
                                i = arguments;
                            return Promise.resolve().then(function() {
                                return n._cursor[e].apply(n._cursor, i), t(n._request).then(function(e) {
                                    if (e) return new c(e, n._request)
                                })
                            })
                        })
                    }), l.prototype.createIndex = function() {
                        return new s(this._store.createIndex.apply(this._store, arguments))
                    }, l.prototype.index = function() {
                        return new s(this._store.index.apply(this._store, arguments))
                    }, i(l, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]), a(l, "_store", IDBObjectStore, ["put", "add", "delete", "clear", "get", "getAll", "getKey", "getAllKeys", "count"]), o(l, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]), r(l, "_store", IDBObjectStore, ["deleteIndex"]), u.prototype.objectStore = function() {
                        return new l(this._tx.objectStore.apply(this._tx, arguments))
                    }, i(u, "_tx", ["objectStoreNames", "mode"]), r(u, "_tx", IDBTransaction, ["abort"]), p.prototype.createObjectStore = function() {
                        return new l(this._db.createObjectStore.apply(this._db, arguments))
                    }, i(p, "_db", ["name", "version", "objectStoreNames"]), r(p, "_db", IDBDatabase, ["deleteObjectStore", "close"]), d.prototype.transaction = function() {
                        return new u(this._db.transaction.apply(this._db, arguments))
                    }, i(d, "_db", ["name", "version", "objectStoreNames"]), r(d, "_db", IDBDatabase, ["close"]), ["openCursor", "openKeyCursor"].forEach(function(e) {
                        [l, s].forEach(function(t) {
                            e in t.prototype && (t.prototype[e.replace("open", "iterate")] = function() {
                                var t, n = (t = arguments, Array.prototype.slice.call(t)),
                                    i = n[n.length - 1],
                                    a = this._store || this._index,
                                    r = a[e].apply(a, n.slice(0, -1));
                                r.onsuccess = function() {
                                    i(r.result)
                                }
                            })
                        })
                    }), [s, l].forEach(function(e) {
                        e.prototype.getAll || (e.prototype.getAll = function(e, t) {
                            var n = this,
                                i = [];
                            return new Promise(function(a) {
                                n.iterateCursor(e, function(e) {
                                    if (!e || (i.push(e.value), void 0 !== t && i.length == t)) {
                                        a(i);
                                        return
                                    }
                                    e.continue()
                                })
                            })
                        })
                    }), e.openDb = function(e, t, i) {
                        var a = n(indexedDB, "open", [e, t]),
                            r = a.request;
                        return r && (r.onupgradeneeded = function(e) {
                            i && i(new p(r.result, e.oldVersion, r.transaction))
                        }), a.then(function(e) {
                            return new d(e)
                        })
                    }, e.deleteDb = function(e) {
                        return n(indexedDB, "deleteDatabase", [e])
                    }, Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }(t)
            },
            406: function(e) {
                var t, n, i, a = e.exports = {};

                function r() {
                    throw Error("setTimeout has not been defined")
                }

                function o() {
                    throw Error("clearTimeout has not been defined")
                }

                function s(e) {
                    if (t === setTimeout) return setTimeout(e, 0);
                    if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
                    try {
                        return t(e, 0)
                    } catch (n) {
                        try {
                            return t.call(null, e, 0)
                        } catch (n) {
                            return t.call(this, e, 0)
                        }
                    }
                }! function() {
                    try {
                        t = "function" == typeof setTimeout ? setTimeout : r
                    } catch (e) {
                        t = r
                    }
                    try {
                        n = "function" == typeof clearTimeout ? clearTimeout : o
                    } catch (e) {
                        n = o
                    }
                }();
                var c = [],
                    l = !1,
                    u = -1;

                function p() {
                    l && i && (l = !1, i.length ? c = i.concat(c) : u = -1, c.length && d())
                }

                function d() {
                    if (!l) {
                        var e = s(p);
                        l = !0;
                        for (var t = c.length; t;) {
                            for (i = c, c = []; ++u < t;) i && i[u].run();
                            u = -1, t = c.length
                        }
                        i = null, l = !1,
                            function(e) {
                                if (n === clearTimeout) return clearTimeout(e);
                                if ((n === o || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                                try {
                                    n(e)
                                } catch (t) {
                                    try {
                                        return n.call(null, e)
                                    } catch (t) {
                                        return n.call(this, e)
                                    }
                                }
                            }(e)
                    }
                }

                function h(e, t) {
                    this.fun = e, this.array = t
                }

                function f() {}
                a.nextTick = function(e) {
                    var t = Array(arguments.length - 1);
                    if (arguments.length > 1)
                        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                    c.push(new h(e, t)), 1 !== c.length || l || s(d)
                }, h.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = f, a.addListener = f, a.once = f, a.off = f, a.removeListener = f, a.removeAllListeners = f, a.emit = f, a.prependListener = f, a.prependOnceListener = f, a.listeners = function(e) {
                    return []
                }, a.binding = function(e) {
                    throw Error("process.binding is not supported")
                }, a.cwd = function() {
                    return "/"
                }, a.chdir = function(e) {
                    throw Error("process.chdir is not supported")
                }, a.umask = function() {
                    return 0
                }
            },
            81: function() {
                "use strict";
                try {
                    self["workbox:core:5.1.4"] && _()
                } catch (e) {}
            },
            485: function() {
                "use strict";
                try {
                    self["workbox:expiration:5.1.4"] && _()
                } catch (e) {}
            },
            248: function() {
                "use strict";
                try {
                    self["workbox:precaching:5.1.4"] && _()
                } catch (e) {}
            },
            492: function() {
                "use strict";
                try {
                    self["workbox:routing:5.1.4"] && _()
                } catch (e) {}
            },
            154: function() {
                "use strict";
                try {
                    self["workbox:strategies:5.1.4"] && _()
                } catch (e) {}
            }
        },
        t = {};

    function n(i) {
        var a = t[i];
        if (void 0 !== a) return a.exports;
        var r = t[i] = {
                exports: {}
            },
            o = !0;
        try {
            e[i].call(r.exports, r, r.exports, n), o = !1
        } finally {
            o && delete t[i]
        }
        return r.exports
    }
    n.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || Function("return this")()
            } catch (e) {
                if ("object" == typeof window) return window
            }
        }(),
        function() {
            "use strict";
            let e, t, i, a;
            n(81);
            let r = (e, ...t) => {
                let n = e;
                return t.length > 0 && (n += ` :: ${JSON.stringify(t)}`), n
            };
            class o extends Error {
                constructor(e, t) {
                    let n = r(e, t);
                    super(n), this.name = e, this.details = t
                }
            }
            let s = new Set,
                c = {
                    googleAnalytics: "googleAnalytics",
                    precache: "precache-v2",
                    prefix: "workbox",
                    runtime: "runtime",
                    suffix: "undefined" != typeof registration ? registration.scope : ""
                },
                l = e => [c.prefix, e, c.suffix].filter(e => e && e.length > 0).join("-"),
                u = e => {
                    for (let t of Object.keys(c)) e(t)
                },
                p = {
                    updateDetails: e => {
                        u(t => {
                            "string" == typeof e[t] && (c[t] = e[t])
                        })
                    },
                    getGoogleAnalyticsName: e => e || l(c.googleAnalytics),
                    getPrecacheName: e => e || l(c.precache),
                    getPrefix: () => c.prefix,
                    getRuntimeName: e => e || l(c.runtime),
                    getSuffix: () => c.suffix
                };
            async function d() {
                for (let e of s) await e()
            }
            let h = e => {
                    let t = new URL(String(e), location.href);
                    return t.href.replace(RegExp(`^${location.origin}`), "")
                },
                f = {
                    filter: (e, t) => e.filter(e => t in e)
                },
                m = async ({
                    request: e,
                    mode: t,
                    plugins: n = []
                }) => {
                    let i = f.filter(n, "cacheKeyWillBeUsed"),
                        a = e;
                    for (let e of i) "string" == typeof(a = await e.cacheKeyWillBeUsed.call(e, {
                        mode: t,
                        request: a
                    })) && (a = new Request(a));
                    return a
                },
                g = async ({
                    request: e,
                    response: t,
                    event: n,
                    plugins: i = []
                }) => {
                    let a = t,
                        r = !1;
                    for (let t of i)
                        if ("cacheWillUpdate" in t) {
                            r = !0;
                            let i = t.cacheWillUpdate;
                            if (!(a = await i.call(t, {
                                    request: e,
                                    response: a,
                                    event: n
                                }))) break
                        }
                    return r || (a = a && 200 === a.status ? a : void 0), a || null
                },
                w = async ({
                    cacheName: e,
                    request: t,
                    event: n,
                    matchOptions: i,
                    plugins: a = []
                }) => {
                    let r = await self.caches.open(e),
                        o = await m({
                            plugins: a,
                            request: t,
                            mode: "read"
                        }),
                        s = await r.match(o, i);
                    for (let t of a)
                        if ("cachedResponseWillBeUsed" in t) {
                            let a = t.cachedResponseWillBeUsed;
                            s = await a.call(t, {
                                cacheName: e,
                                event: n,
                                matchOptions: i,
                                cachedResponse: s,
                                request: o
                            })
                        }
                    return s
                },
                y = async ({
                    cacheName: e,
                    request: t,
                    response: n,
                    event: i,
                    plugins: a = [],
                    matchOptions: r
                }) => {
                    let s = await m({
                        plugins: a,
                        request: t,
                        mode: "write"
                    });
                    if (!n) throw new o("cache-put-with-no-response", {
                        url: h(s.url)
                    });
                    let c = await g({
                        event: i,
                        plugins: a,
                        response: n,
                        request: s
                    });
                    if (!c) return;
                    let l = await self.caches.open(e),
                        u = f.filter(a, "cacheDidUpdate"),
                        p = u.length > 0 ? await w({
                            cacheName: e,
                            matchOptions: r,
                            request: s
                        }) : null;
                    try {
                        await l.put(s, c)
                    } catch (e) {
                        throw "QuotaExceededError" === e.name && await d(), e
                    }
                    for (let t of u) await t.cacheDidUpdate.call(t, {
                        cacheName: e,
                        event: i,
                        oldResponse: p,
                        newResponse: c,
                        request: s
                    })
                },
                S = {
                    put: y,
                    match: w
                };

            function b(e) {
                e.then(() => {})
            }
            class v {
                constructor(e, t, {
                    onupgradeneeded: n,
                    onversionchange: i
                } = {}) {
                    this._db = null, this._name = e, this._version = t, this._onupgradeneeded = n, this._onversionchange = i || (() => this.close())
                }
                get db() {
                    return this._db
                }
                async open() {
                    if (!this._db) return this._db = await new Promise((e, t) => {
                        let n = !1;
                        setTimeout(() => {
                            n = !0, t(Error("The open request was blocked and timed out"))
                        }, this.OPEN_TIMEOUT);
                        let i = indexedDB.open(this._name, this._version);
                        i.onerror = () => t(i.error), i.onupgradeneeded = e => {
                            n ? (i.transaction.abort(), i.result.close()) : "function" == typeof this._onupgradeneeded && this._onupgradeneeded(e)
                        }, i.onsuccess = () => {
                            let t = i.result;
                            n ? t.close() : (t.onversionchange = this._onversionchange.bind(this), e(t))
                        }
                    }), this
                }
                async getKey(e, t) {
                    return (await this.getAllKeys(e, t, 1))[0]
                }
                async getAll(e, t, n) {
                    return await this.getAllMatching(e, {
                        query: t,
                        count: n
                    })
                }
                async getAllKeys(e, t, n) {
                    let i = await this.getAllMatching(e, {
                        query: t,
                        count: n,
                        includeKeys: !0
                    });
                    return i.map(e => e.key)
                }
                async getAllMatching(e, {
                    index: t,
                    query: n = null,
                    direction: i = "next",
                    count: a,
                    includeKeys: r = !1
                } = {}) {
                    return await this.transaction([e], "readonly", (o, s) => {
                        let c = o.objectStore(e),
                            l = t ? c.index(t) : c,
                            u = [],
                            p = l.openCursor(n, i);
                        p.onsuccess = () => {
                            let e = p.result;
                            e ? (u.push(r ? e : e.value), a && u.length >= a ? s(u) : e.continue()) : s(u)
                        }
                    })
                }
                async transaction(e, t, n) {
                    return await this.open(), await new Promise((i, a) => {
                        let r = this._db.transaction(e, t);
                        r.onabort = () => a(r.error), r.oncomplete = () => i(), n(r, e => i(e))
                    })
                }
                async _call(e, t, n, ...i) {
                    let a = (n, a) => {
                        let r = n.objectStore(t),
                            o = r[e].apply(r, i);
                        o.onsuccess = () => a(o.result)
                    };
                    return await this.transaction([t], n, a)
                }
                close() {
                    this._db && (this._db.close(), this._db = null)
                }
            }
            for (let [e, t] of (v.prototype.OPEN_TIMEOUT = 2e3, Object.entries({
                    readonly: ["get", "count", "getKey", "getAll", "getAllKeys"],
                    readwrite: ["add", "put", "clear", "delete"]
                })))
                for (let n of t) n in IDBObjectStore.prototype && (v.prototype[n] = async function(t, ...i) {
                    return await this._call(n, t, e, ...i)
                });
            let E = async e => {
                    await new Promise((t, n) => {
                        let i = indexedDB.deleteDatabase(e);
                        i.onerror = () => {
                            n(i.error)
                        }, i.onblocked = () => {
                            n(Error("Delete blocked"))
                        }, i.onsuccess = () => {
                            t()
                        }
                    })
                },
                I = async ({
                    request: e,
                    fetchOptions: t,
                    event: n,
                    plugins: i = []
                }) => {
                    if ("string" == typeof e && (e = new Request(e)), n instanceof FetchEvent && n.preloadResponse) {
                        let e = await n.preloadResponse;
                        if (e) return e
                    }
                    let a = f.filter(i, "fetchDidFail"),
                        r = a.length > 0 ? e.clone() : null;
                    try {
                        for (let t of i)
                            if ("requestWillFetch" in t) {
                                let i = t.requestWillFetch,
                                    a = e.clone();
                                e = await i.call(t, {
                                    request: a,
                                    event: n
                                })
                            }
                    } catch (e) {
                        throw new o("plugin-error-request-will-fetch", {
                            thrownError: e
                        })
                    }
                    let s = e.clone();
                    try {
                        let a;
                        for (let r of (a = "navigate" === e.mode ? await fetch(e) : await fetch(e, t), i)) "fetchDidSucceed" in r && (a = await r.fetchDidSucceed.call(r, {
                            event: n,
                            request: s,
                            response: a
                        }));
                        return a
                    } catch (e) {
                        for (let t of a) await t.fetchDidFail.call(t, {
                            error: e,
                            event: n,
                            originalRequest: r.clone(),
                            request: s.clone()
                        });
                        throw e
                    }
                },
                C = {
                    fetch: I
                };
            async function A(t, n) {
                let i = t.clone(),
                    a = {
                        headers: new Headers(i.headers),
                        status: i.status,
                        statusText: i.statusText
                    },
                    r = n ? n(a) : a,
                    o = ! function() {
                        if (void 0 === e) {
                            let t = new Response("");
                            if ("body" in t) try {
                                new Response(t.body), e = !0
                            } catch (t) {
                                e = !1
                            }
                            e = !1
                        }
                        return e
                    }() ? await i.blob() : i.body;
                return new Response(o, r)
            }
            var T, k, R, N, P, D, O, L, U = n(406);
            let M = "undefined" != typeof self && void 0 !== self.location ? self.location.origin : "",
                x = "undefined" != typeof self && void 0 !== self.location ? self.location.host : "",
                B = {
                    API_URL: "https://api.spatial.io",
                    AUTHLESS_AVATAR_BASE_URL: "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars",
                    CAN_UPLOAD_GLB: "true",
                    CANONICAL_URL_ORIGIN: "https://www.spatial.io",
                    CHANNEL_NAME: "store",
                    DEPLOYMENT_ENV: "production",
                    DYNAMIC_LINK_URL: "https://go.spatial.io",
                    DYNAMIC_LINK_REDIRECT_URL: "https://www.spatial.io",
                    FAN_URL: "https://fan.spatial.io",
                    FAVICON_PATH: "favicon",
                    FIREBASE_API_KEY: "AIzaSyDBMWAzlEhBmed9yztkvm7v0ByV6NYbsik",
                    FIREBASE_APP_ID: "1:262650836557:web:84d19dc8367fe180e5ce04",
                    FIREBASE_AUTH_DOMAIN: "auth.spatial.io",
                    FIREBASE_MESSAGING_SENDER_ID: "262650836557",
                    FIREBASE_PROJECT_ID: "spatial-mobile",
                    FIREBASE_STORAGE_BUCKET: "spatial-mobile.appspot.com",
                    FIREBASE_PUBLIC_VAPID_KEY: "BCkkeGLFLOIotnRNfdwv1zBa--N3Xs7qr1Ykr6DRMWaiUZm-mG9dmaEpEk-c5g8HyCzlDi5hdMQSwJXdZNE5EOA",
                    IOS_BUNDLE_ID: "io.spatial.spatial",
                    IOS_APP_STORE_ID: "1528403747",
                    ANDROID_PACKAGE_NAME: "io.spatial.spatial",
                    MARKERIO_DESTINATION: "62154802fedae961126a3d46",
                    MIXPANEL_TOKEN: "82fea5017b4426cd50d2760b6208720f",
                    PUBLIC_ASSETS_BASE_URL: "https://dd2cgqlmnwvp5.cloudfront.net",
                    SPATIAL_UNITY_BUILD_PATH: "spatial-webgl",
                    SPATIAL_UNITY_ASSET_BUNDLES_PATH: "asset-bundles",
                    SPATIAL_UNITY_DATA_SIZE: Number(10231846),
                    SPATIAL_UNITY_WASM_SIZE: Number(9958569),
                    SHORT_SHA_LAST_UNITY_CHANGE: "26df8d2d",
                    STREAM_API_KEY: "9xfg57b5pfzw",
                    STRIPE_PK: "pk_live_tbSyqJq6UQyjzIt8H9NzVJMg00BndXJbGH",
                    SPATIAL_UNITY_VERSION: "6.68.1".trim(),
                    WEB_HOST: x,
                    WEB_URL: M,
                    SENTRY_DSN: U.env.SENTRY_DSN || "https://83f8009d39a449248e37447692e3f6e9@o1083485.ingest.sentry.io/6093190",
                    SENTRY_ENVIRONMENT: "store",
                    SENTRY_ORG_SLUG: "spatial",
                    SENTRY_PROJECT_SLUG: "spatial-web",
                    ASSUME_UNITY_BUILD_COMPRESSED: "true" !== U.env.NEXT_PUBLIC_COPY_LOCAL_BUILD,
                    COPY_LOCAL_UNITY_BUILD: "true" === U.env.NEXT_PUBLIC_COPY_LOCAL_BUILD,
                    USE_LOCAL_UNITY_BUILD: "true" === U.env.NEXT_PUBLIC_USE_LOCAL_UNITY_BUILD,
                    RENDER_RESET_PASSWORD_PAGE: "true" === U.env.RENDER_RESET_PASSWORD_PAGE,
                    CUSTOMER_IO_SITE_ID: "62024fb6aeacc250babf",
                    CUSTOMER_IO_API_KEY: "4e1b3b4a1855e96cc824"
                },
                F = "development" === B.DEPLOYMENT_ENV;
            n(485);
            let j = "cache-entries",
                K = e => {
                    let t = new URL(e, location.href);
                    return t.hash = "", t.href
                };
            class H {
                constructor(e) {
                    this._cacheName = e, this._db = new v("workbox-expiration", 1, {
                        onupgradeneeded: e => this._handleUpgrade(e)
                    })
                }
                _handleUpgrade(e) {
                    let t = e.target.result,
                        n = t.createObjectStore(j, {
                            keyPath: "id"
                        });
                    n.createIndex("cacheName", "cacheName", {
                        unique: !1
                    }), n.createIndex("timestamp", "timestamp", {
                        unique: !1
                    }), E(this._cacheName)
                }
                async setTimestamp(e, t) {
                    e = K(e);
                    let n = {
                        url: e,
                        timestamp: t,
                        cacheName: this._cacheName,
                        id: this._getId(e)
                    };
                    await this._db.put(j, n)
                }
                async getTimestamp(e) {
                    let t = await this._db.get(j, this._getId(e));
                    return t.timestamp
                }
                async expireEntries(e, t) {
                    let n = await this._db.transaction(j, "readwrite", (n, i) => {
                            let a = n.objectStore(j),
                                r = a.index("timestamp").openCursor(null, "prev"),
                                o = [],
                                s = 0;
                            r.onsuccess = () => {
                                let n = r.result;
                                if (n) {
                                    let i = n.value;
                                    i.cacheName === this._cacheName && (e && i.timestamp < e || t && s >= t ? o.push(n.value) : s++), n.continue()
                                } else i(o)
                            }
                        }),
                        i = [];
                    for (let e of n) await this._db.delete(j, e.id), i.push(e.url);
                    return i
                }
                _getId(e) {
                    return this._cacheName + "|" + K(e)
                }
            }
            class q {
                constructor(e, t = {}) {
                    this._isRunning = !1, this._rerunRequested = !1, this._maxEntries = t.maxEntries, this._maxAgeSeconds = t.maxAgeSeconds, this._cacheName = e, this._timestampModel = new H(e)
                }
                async expireEntries() {
                    if (this._isRunning) {
                        this._rerunRequested = !0;
                        return
                    }
                    this._isRunning = !0;
                    let e = this._maxAgeSeconds ? Date.now() - 1e3 * this._maxAgeSeconds : 0,
                        t = await this._timestampModel.expireEntries(e, this._maxEntries),
                        n = await self.caches.open(this._cacheName);
                    for (let e of t) await n.delete(e);
                    this._isRunning = !1, this._rerunRequested && (this._rerunRequested = !1, b(this.expireEntries()))
                }
                async updateTimestamp(e) {
                    await this._timestampModel.setTimestamp(e, Date.now())
                }
                async isURLExpired(e) {
                    if (!this._maxAgeSeconds) return !1; {
                        let t = await this._timestampModel.getTimestamp(e),
                            n = Date.now() - 1e3 * this._maxAgeSeconds;
                        return t < n
                    }
                }
                async delete() {
                    this._rerunRequested = !1, await this._timestampModel.expireEntries(1 / 0)
                }
            }
            class $ {
                constructor(e = {}) {
                    if (this.cachedResponseWillBeUsed = async ({
                            event: e,
                            request: t,
                            cacheName: n,
                            cachedResponse: i
                        }) => {
                            if (!i) return null;
                            let a = this._isResponseDateFresh(i),
                                r = this._getCacheExpiration(n);
                            b(r.expireEntries());
                            let o = r.updateTimestamp(t.url);
                            if (e) try {
                                e.waitUntil(o)
                            } catch (e) {}
                            return a ? i : null
                        }, this.cacheDidUpdate = async ({
                            cacheName: e,
                            request: t
                        }) => {
                            let n = this._getCacheExpiration(e);
                            await n.updateTimestamp(t.url), await n.expireEntries()
                        }, this._config = e, this._maxAgeSeconds = e.maxAgeSeconds, this._cacheExpirations = new Map, e.purgeOnQuotaError) {
                        var t;
                        t = () => this.deleteCacheAndMetadata(), s.add(t)
                    }
                }
                _getCacheExpiration(e) {
                    if (e === p.getRuntimeName()) throw new o("expire-custom-caches-only");
                    let t = this._cacheExpirations.get(e);
                    return t || (t = new q(e, this._config), this._cacheExpirations.set(e, t)), t
                }
                _isResponseDateFresh(e) {
                    if (!this._maxAgeSeconds) return !0;
                    let t = this._getDateHeaderTimestamp(e);
                    if (null === t) return !0;
                    let n = Date.now();
                    return t >= n - 1e3 * this._maxAgeSeconds
                }
                _getDateHeaderTimestamp(e) {
                    if (!e.headers.has("date")) return null;
                    let t = e.headers.get("date"),
                        n = new Date(t),
                        i = n.getTime();
                    return isNaN(i) ? null : i
                }
                async deleteCacheAndMetadata() {
                    for (let [e, t] of this._cacheExpirations) await self.caches.delete(e), await t.delete();
                    this._cacheExpirations = new Map
                }
            }
            n(248);
            class G {
                constructor(e) {
                    this._cacheName = p.getPrecacheName(e), this._urlsToCacheKeys = new Map, this._urlsToCacheModes = new Map, this._cacheKeysToIntegrities = new Map
                }
                addToCacheList(e) {
                    let t = [];
                    for (let n of e) {
                        "string" == typeof n ? t.push(n) : n && void 0 === n.revision && t.push(n.url);
                        let {
                            cacheKey: e,
                            url: i
                        } = function(e) {
                            if (!e) throw new o("add-to-cache-list-unexpected-type", {
                                entry: e
                            });
                            if ("string" == typeof e) {
                                let t = new URL(e, location.href);
                                return {
                                    cacheKey: t.href,
                                    url: t.href
                                }
                            }
                            let {
                                revision: t,
                                url: n
                            } = e;
                            if (!n) throw new o("add-to-cache-list-unexpected-type", {
                                entry: e
                            });
                            if (!t) {
                                let e = new URL(n, location.href);
                                return {
                                    cacheKey: e.href,
                                    url: e.href
                                }
                            }
                            let i = new URL(n, location.href),
                                a = new URL(n, location.href);
                            return i.searchParams.set("__WB_REVISION__", t), {
                                cacheKey: i.href,
                                url: a.href
                            }
                        }(n), a = "string" != typeof n && n.revision ? "reload" : "default";
                        if (this._urlsToCacheKeys.has(i) && this._urlsToCacheKeys.get(i) !== e) throw new o("add-to-cache-list-conflicting-entries", {
                            firstEntry: this._urlsToCacheKeys.get(i),
                            secondEntry: e
                        });
                        if ("string" != typeof n && n.integrity) {
                            if (this._cacheKeysToIntegrities.has(e) && this._cacheKeysToIntegrities.get(e) !== n.integrity) throw new o("add-to-cache-list-conflicting-integrities", {
                                url: i
                            });
                            this._cacheKeysToIntegrities.set(e, n.integrity)
                        }
                        if (this._urlsToCacheKeys.set(i, e), this._urlsToCacheModes.set(i, a), t.length > 0) {
                            let e = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
                            console.warn(e)
                        }
                    }
                }
                async install({
                    event: e,
                    plugins: t
                } = {}) {
                    let n = [],
                        i = [],
                        a = await self.caches.open(this._cacheName),
                        r = await a.keys(),
                        o = new Set(r.map(e => e.url));
                    for (let [e, t] of this._urlsToCacheKeys) o.has(t) ? i.push(e) : n.push({
                        cacheKey: t,
                        url: e
                    });
                    let s = n.map(({
                        cacheKey: n,
                        url: i
                    }) => {
                        let a = this._cacheKeysToIntegrities.get(n),
                            r = this._urlsToCacheModes.get(i);
                        return this._addURLToCache({
                            cacheKey: n,
                            cacheMode: r,
                            event: e,
                            integrity: a,
                            plugins: t,
                            url: i
                        })
                    });
                    await Promise.all(s);
                    let c = n.map(e => e.url);
                    return {
                        updatedURLs: c,
                        notUpdatedURLs: i
                    }
                }
                async activate() {
                    let e = await self.caches.open(this._cacheName),
                        t = await e.keys(),
                        n = new Set(this._urlsToCacheKeys.values()),
                        i = [];
                    for (let a of t) n.has(a.url) || (await e.delete(a), i.push(a.url));
                    return {
                        deletedURLs: i
                    }
                }
                async _addURLToCache({
                    cacheKey: e,
                    url: t,
                    cacheMode: n,
                    event: i,
                    plugins: a,
                    integrity: r
                }) {
                    let s;
                    let c = new Request(t, {
                            integrity: r,
                            cache: n,
                            credentials: "same-origin"
                        }),
                        l = await C.fetch({
                            event: i,
                            plugins: a,
                            request: c
                        });
                    for (let e of a || []) "cacheWillUpdate" in e && (s = e);
                    let u = s ? await s.cacheWillUpdate({
                        event: i,
                        request: c,
                        response: l
                    }) : l.status < 400;
                    if (!u) throw new o("bad-precaching-response", {
                        url: t,
                        status: l.status
                    });
                    l.redirected && (l = await A(l)), await S.put({
                        event: i,
                        plugins: a,
                        response: l,
                        request: e === t ? c : new Request(e),
                        cacheName: this._cacheName,
                        matchOptions: {
                            ignoreSearch: !0
                        }
                    })
                }
                getURLsToCacheKeys() {
                    return this._urlsToCacheKeys
                }
                getCachedURLs() {
                    return [...this._urlsToCacheKeys.keys()]
                }
                getCacheKeyForURL(e) {
                    let t = new URL(e, location.href);
                    return this._urlsToCacheKeys.get(t.href)
                }
                async matchPrecache(e) {
                    let t = e instanceof Request ? e.url : e,
                        n = this.getCacheKeyForURL(t);
                    if (n) {
                        let e = await self.caches.open(this._cacheName);
                        return e.match(n)
                    }
                }
                createHandler(e = !0) {
                    return async ({
                        request: t
                    }) => {
                        try {
                            let e = await this.matchPrecache(t);
                            if (e) return e;
                            throw new o("missing-precache-entry", {
                                cacheName: this._cacheName,
                                url: t instanceof Request ? t.url : t
                            })
                        } catch (n) {
                            if (e) return fetch(t);
                            throw n
                        }
                    }
                }
                createHandlerBoundToURL(e, t = !0) {
                    let n = this.getCacheKeyForURL(e);
                    if (!n) throw new o("non-precached-url", {
                        url: e
                    });
                    let i = this.createHandler(t),
                        a = new Request(e);
                    return () => i({
                        request: a
                    })
                }
            }
            n(492);
            let V = e => e && "object" == typeof e ? e : {
                handle: e
            };
            class z {
                constructor(e, t, n = "GET") {
                    this.handler = V(t), this.match = e, this.method = n
                }
            }
            class W extends z {
                constructor(e, t, n) {
                    let i = ({
                        url: t
                    }) => {
                        let n = e.exec(t.href);
                        if (n && (t.origin === location.origin || 0 === n.index)) return n.slice(1)
                    };
                    super(i, t, n)
                }
            }
            class Y {
                constructor() {
                    this._routes = new Map
                }
                get routes() {
                    return this._routes
                }
                addFetchListener() {
                    self.addEventListener("fetch", e => {
                        let {
                            request: t
                        } = e, n = this.handleRequest({
                            request: t,
                            event: e
                        });
                        n && e.respondWith(n)
                    })
                }
                addCacheListener() {
                    self.addEventListener("message", e => {
                        if (e.data && "CACHE_URLS" === e.data.type) {
                            let {
                                payload: t
                            } = e.data, n = Promise.all(t.urlsToCache.map(e => {
                                "string" == typeof e && (e = [e]);
                                let t = new Request(...e);
                                return this.handleRequest({
                                    request: t
                                })
                            }));
                            e.waitUntil(n), e.ports && e.ports[0] && n.then(() => e.ports[0].postMessage(!0))
                        }
                    })
                }
                handleRequest({
                    request: e,
                    event: t
                }) {
                    let n;
                    let i = new URL(e.url, location.href);
                    if (!i.protocol.startsWith("http")) return;
                    let {
                        params: a,
                        route: r
                    } = this.findMatchingRoute({
                        url: i,
                        request: e,
                        event: t
                    }), o = r && r.handler;
                    if (!o && this._defaultHandler && (o = this._defaultHandler), o) {
                        try {
                            n = o.handle({
                                url: i,
                                request: e,
                                event: t,
                                params: a
                            })
                        } catch (e) {
                            n = Promise.reject(e)
                        }
                        return n instanceof Promise && this._catchHandler && (n = n.catch(n => this._catchHandler.handle({
                            url: i,
                            request: e,
                            event: t
                        }))), n
                    }
                }
                findMatchingRoute({
                    url: e,
                    request: t,
                    event: n
                }) {
                    let i = this._routes.get(t.method) || [];
                    for (let a of i) {
                        let i;
                        let r = a.match({
                            url: e,
                            request: t,
                            event: n
                        });
                        if (r) return i = r, Array.isArray(r) && 0 === r.length ? i = void 0 : r.constructor === Object && 0 === Object.keys(r).length ? i = void 0 : "boolean" == typeof r && (i = void 0), {
                            route: a,
                            params: i
                        }
                    }
                    return {}
                }
                setDefaultHandler(e) {
                    this._defaultHandler = V(e)
                }
                setCatchHandler(e) {
                    this._catchHandler = V(e)
                }
                registerRoute(e) {
                    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e)
                }
                unregisterRoute(e) {
                    if (!this._routes.has(e.method)) throw new o("unregister-route-but-not-found-with-method", {
                        method: e.method
                    });
                    let t = this._routes.get(e.method).indexOf(e);
                    if (t > -1) this._routes.get(e.method).splice(t, 1);
                    else throw new o("unregister-route-route-not-registered")
                }
            }
            let J = () => (t || ((t = new Y).addFetchListener(), t.addCacheListener()), t);

            function Q(e, t, n) {
                let i;
                if ("string" == typeof e) {
                    let a = new URL(e, location.href);
                    i = new z(({
                        url: e
                    }) => e.href === a.href, t, n)
                } else if (e instanceof RegExp) i = new W(e, t, n);
                else if ("function" == typeof e) i = new z(e, t, n);
                else if (e instanceof z) i = e;
                else throw new o("unsupported-route-type", {
                    moduleName: "workbox-routing",
                    funcName: "registerRoute",
                    paramName: "capture"
                });
                let a = J();
                return a.registerRoute(i), i
            }
            n(154);
            class X {
                constructor(e = {}) {
                    this._cacheName = p.getRuntimeName(e.cacheName), this._plugins = e.plugins || [], this._fetchOptions = e.fetchOptions, this._matchOptions = e.matchOptions
                }
                async handle({
                    event: e,
                    request: t
                }) {
                    let n;
                    "string" == typeof t && (t = new Request(t));
                    let i = await S.match({
                        cacheName: this._cacheName,
                        request: t,
                        event: e,
                        matchOptions: this._matchOptions,
                        plugins: this._plugins
                    });
                    if (!i) try {
                        i = await this._getFromNetwork(t, e)
                    } catch (e) {
                        n = e
                    }
                    if (!i) throw new o("no-response", {
                        url: t.url,
                        error: n
                    });
                    return i
                }
                async _getFromNetwork(e, t) {
                    let n = await C.fetch({
                            request: e,
                            event: t,
                            fetchOptions: this._fetchOptions,
                            plugins: this._plugins
                        }),
                        i = n.clone(),
                        a = S.put({
                            cacheName: this._cacheName,
                            request: e,
                            response: i,
                            event: t,
                            plugins: this._plugins
                        });
                    if (t) try {
                        t.waitUntil(a)
                    } catch (e) {}
                    return n
                }
            }
            let Z = /spatial-webgl\/Spatial_.*\/Build\/WebGL\.(data|wasm)/,
                ee = e => Z.test(e.href),
                et = /spatial-webgl\/Spatial_.*\/StreamingAssets/,
                en = e => et.test(e.href),
                ei = /asset-bundles-.*\/WebGL\/catalog_.*\.(json|hash)/,
                ea = e => ei.test(e.pathname),
                er = /asset-bundles-.*\/WebGL\/.*.bundle$/,
                eo = e => er.test(e.href),
                es = "webpack-build-v1";
            Q(e => {
                let {
                    url: t
                } = e;
                return ee(t)
            }, new X({
                cacheName: "unity-core-build-v1",
                plugins: [new $({
                    maxEntries: 2
                })]
            })), Q(e => {
                let {
                    url: t
                } = e;
                return en(t)
            }, new X({
                cacheName: "unity-streaming-assets-v1",
                plugins: [new $({
                    maxEntries: 20
                })]
            })), Q(e => {
                let {
                    url: t
                } = e;
                return ea(t)
            }, new X({
                cacheName: "unity-asset-bundle-manifest-v1",
                plugins: [new $({
                    maxEntries: 2
                })]
            })), Q(e => {
                let {
                    url: t
                } = e;
                return eo(t)
            }, new X({
                cacheName: "unity-asset-bundles-v1",
                plugins: [new $({
                    maxEntries: 20
                })]
            }));
            let ec = async e => {
                    let t = encodeURIComponent(e),
                        n = await fetch("https://redirect-finder-proxy.polycorsproxy.workers.dev/redirect/?apiurl=".concat(t));
                    if (!n.ok) return e; {
                        let e = await n.text();
                        return e
                    }
                },
                el = async e => {
                    let t = await ec(e),
                        n = "https://odd-pine-4c83.polycorsproxy.workers.dev/corsproxy/?apiurl=".concat(encodeURIComponent(t)),
                        i = await fetch(n);
                    return i
                };
            /**
             * @license
             * Copyright 2017 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            class eu {
                constructor() {
                    this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise((e, t) => {
                        this.resolve = e, this.reject = t
                    })
                }
                wrapCallback(e) {
                    return (t, n) => {
                        t ? this.reject(t) : this.resolve(n), "function" == typeof e && (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, n))
                    }
                }
            }
            class ep extends Error {
                constructor(e, t, n) {
                    super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, ep.prototype), Error.captureStackTrace && Error.captureStackTrace(this, ed.prototype.create)
                }
            }
            class ed {
                constructor(e, t, n) {
                    this.service = e, this.serviceName = t, this.errors = n
                }
                create(e, ...t) {
                    let n = t[0] || {},
                        i = `${this.service}/${e}`,
                        a = this.errors[e],
                        r = a ? a.replace(eh, (e, t) => {
                            let i = n[t];
                            return null != i ? String(i) : `<${t}?>`
                        }) : "Error",
                        o = `${this.serviceName}: ${r} (${i}).`,
                        s = new ep(i, o, n);
                    return s
                }
            }
            let eh = /\{\$([^}]+)}/g;

            function ef(e, t) {
                if (e === t) return !0;
                let n = Object.keys(e),
                    i = Object.keys(t);
                for (let a of n) {
                    if (!i.includes(a)) return !1;
                    let n = e[a],
                        r = t[a];
                    if (em(n) && em(r)) {
                        if (!ef(n, r)) return !1
                    } else if (n !== r) return !1
                }
                for (let e of i)
                    if (!n.includes(e)) return !1;
                return !0
            }

            function em(e) {
                return null !== e && "object" == typeof e
            }
            /**
             * @license
             * Copyright 2021 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            function eg(e) {
                return e && e._delegate ? e._delegate : e
            }
            class ew {
                constructor(e, t, n) {
                    this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
                }
                setInstantiationMode(e) {
                    return this.instantiationMode = e, this
                }
                setMultipleInstances(e) {
                    return this.multipleInstances = e, this
                }
                setServiceProps(e) {
                    return this.serviceProps = e, this
                }
                setInstanceCreatedCallback(e) {
                    return this.onInstanceCreated = e, this
                }
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let ey = "[DEFAULT]";
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            class eS {
                constructor(e, t) {
                    this.name = e, this.container = t, this.component = null, this.instances = new Map, this.instancesDeferred = new Map, this.instancesOptions = new Map, this.onInitCallbacks = new Map
                }
                get(e) {
                    let t = this.normalizeInstanceIdentifier(e);
                    if (!this.instancesDeferred.has(t)) {
                        let e = new eu;
                        if (this.instancesDeferred.set(t, e), this.isInitialized(t) || this.shouldAutoInitialize()) try {
                            let n = this.getOrInitializeService({
                                instanceIdentifier: t
                            });
                            n && e.resolve(n)
                        } catch (e) {}
                    }
                    return this.instancesDeferred.get(t).promise
                }
                getImmediate(e) {
                    var t;
                    let n = this.normalizeInstanceIdentifier(null == e ? void 0 : e.identifier),
                        i = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
                    if (this.isInitialized(n) || this.shouldAutoInitialize()) try {
                        return this.getOrInitializeService({
                            instanceIdentifier: n
                        })
                    } catch (e) {
                        if (i) return null;
                        throw e
                    } else {
                        if (i) return null;
                        throw Error(`Service ${this.name} is not available`)
                    }
                }
                getComponent() {
                    return this.component
                }
                setComponent(e) {
                    if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
                    if (this.component) throw Error(`Component for ${this.name} has already been provided`);
                    if (this.component = e, this.shouldAutoInitialize()) {
                        if ("EAGER" === e.instantiationMode) try {
                            this.getOrInitializeService({
                                instanceIdentifier: ey
                            })
                        } catch (e) {}
                        for (let [e, t] of this.instancesDeferred.entries()) {
                            let n = this.normalizeInstanceIdentifier(e);
                            try {
                                let e = this.getOrInitializeService({
                                    instanceIdentifier: n
                                });
                                t.resolve(e)
                            } catch (e) {}
                        }
                    }
                }
                clearInstance(e = ey) {
                    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e)
                }
                async delete() {
                    let e = Array.from(this.instances.values());
                    await Promise.all([...e.filter(e => "INTERNAL" in e).map(e => e.INTERNAL.delete()), ...e.filter(e => "_delete" in e).map(e => e._delete())])
                }
                isComponentSet() {
                    return null != this.component
                }
                isInitialized(e = ey) {
                    return this.instances.has(e)
                }
                getOptions(e = ey) {
                    return this.instancesOptions.get(e) || {}
                }
                initialize(e = {}) {
                    let {
                        options: t = {}
                    } = e, n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
                    if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
                    if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
                    let i = this.getOrInitializeService({
                        instanceIdentifier: n,
                        options: t
                    });
                    for (let [e, t] of this.instancesDeferred.entries()) {
                        let a = this.normalizeInstanceIdentifier(e);
                        n === a && t.resolve(i)
                    }
                    return i
                }
                onInit(e, t) {
                    var n;
                    let i = this.normalizeInstanceIdentifier(t),
                        a = null !== (n = this.onInitCallbacks.get(i)) && void 0 !== n ? n : new Set;
                    a.add(e), this.onInitCallbacks.set(i, a);
                    let r = this.instances.get(i);
                    return r && e(r, i), () => {
                        a.delete(e)
                    }
                }
                invokeOnInitCallbacks(e, t) {
                    let n = this.onInitCallbacks.get(t);
                    if (n)
                        for (let i of n) try {
                            i(e, t)
                        } catch (e) {}
                }
                getOrInitializeService({
                    instanceIdentifier: e,
                    options: t = {}
                }) {
                    let n = this.instances.get(e);
                    if (!n && this.component && (n = this.component.instanceFactory(this.container, {
                            instanceIdentifier: e === ey ? void 0 : e,
                            options: t
                        }), this.instances.set(e, n), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(n, e), this.component.onInstanceCreated)) try {
                        this.component.onInstanceCreated(this.container, e, n)
                    } catch (e) {}
                    return n || null
                }
                normalizeInstanceIdentifier(e = ey) {
                    return this.component ? this.component.multipleInstances ? e : ey : e
                }
                shouldAutoInitialize() {
                    return !!this.component && "EXPLICIT" !== this.component.instantiationMode
                }
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            class e_ {
                constructor(e) {
                    this.name = e, this.providers = new Map
                }
                addComponent(e) {
                    let t = this.getProvider(e.name);
                    if (t.isComponentSet()) throw Error(`Component ${e.name} has already been registered with ${this.name}`);
                    t.setComponent(e)
                }
                addOrOverwriteComponent(e) {
                    let t = this.getProvider(e.name);
                    t.isComponentSet() && this.providers.delete(e.name), this.addComponent(e)
                }
                getProvider(e) {
                    if (this.providers.has(e)) return this.providers.get(e);
                    let t = new eS(e, this);
                    return this.providers.set(e, t), t
                }
                getProviders() {
                    return Array.from(this.providers.values())
                }
            }
            /**
             * @license
             * Copyright 2017 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let eb = [];
            (T = D || (D = {}))[T.DEBUG = 0] = "DEBUG", T[T.VERBOSE = 1] = "VERBOSE", T[T.INFO = 2] = "INFO", T[T.WARN = 3] = "WARN", T[T.ERROR = 4] = "ERROR", T[T.SILENT = 5] = "SILENT";
            let ev = {
                    debug: D.DEBUG,
                    verbose: D.VERBOSE,
                    info: D.INFO,
                    warn: D.WARN,
                    error: D.ERROR,
                    silent: D.SILENT
                },
                eE = D.INFO,
                eI = {
                    [D.DEBUG]: "log",
                    [D.VERBOSE]: "log",
                    [D.INFO]: "info",
                    [D.WARN]: "warn",
                    [D.ERROR]: "error"
                },
                eC = (e, t, ...n) => {
                    if (t < e.logLevel) return;
                    let i = new Date().toISOString(),
                        a = eI[t];
                    if (a) console[a](`[${i}]  ${e.name}:`, ...n);
                    else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)
                };
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            class eA {
                constructor(e) {
                    this.container = e
                }
                getPlatformInfoString() {
                    let e = this.container.getProviders();
                    return e.map(e => {
                        if (! function(e) {
                                let t = e.getComponent();
                                return (null == t ? void 0 : t.type) === "VERSION"
                            }(e)) return null; {
                            let t = e.getImmediate();
                            return `${t.library}/${t.version}`
                        }
                    }).filter(e => e).join(" ")
                }
            }
            let eT = "@firebase/app",
                ek = "0.7.8",
                eR = new class {
                    constructor(e) {
                        this.name = e, this._logLevel = eE, this._logHandler = eC, this._userLogHandler = null, eb.push(this)
                    }
                    get logLevel() {
                        return this._logLevel
                    }
                    set logLevel(e) {
                        if (!(e in D)) throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                        this._logLevel = e
                    }
                    setLogLevel(e) {
                        this._logLevel = "string" == typeof e ? ev[e] : e
                    }
                    get logHandler() {
                        return this._logHandler
                    }
                    set logHandler(e) {
                        if ("function" != typeof e) throw TypeError("Value assigned to `logHandler` must be a function");
                        this._logHandler = e
                    }
                    get userLogHandler() {
                        return this._userLogHandler
                    }
                    set userLogHandler(e) {
                        this._userLogHandler = e
                    }
                    debug(...e) {
                        this._userLogHandler && this._userLogHandler(this, D.DEBUG, ...e), this._logHandler(this, D.DEBUG, ...e)
                    }
                    log(...e) {
                        this._userLogHandler && this._userLogHandler(this, D.VERBOSE, ...e), this._logHandler(this, D.VERBOSE, ...e)
                    }
                    info(...e) {
                        this._userLogHandler && this._userLogHandler(this, D.INFO, ...e), this._logHandler(this, D.INFO, ...e)
                    }
                    warn(...e) {
                        this._userLogHandler && this._userLogHandler(this, D.WARN, ...e), this._logHandler(this, D.WARN, ...e)
                    }
                    error(...e) {
                        this._userLogHandler && this._userLogHandler(this, D.ERROR, ...e), this._logHandler(this, D.ERROR, ...e)
                    }
                }("@firebase/app"),
                eN = "[DEFAULT]",
                eP = {
                    [eT]: "fire-core",
                    "@firebase/app-compat": "fire-core-compat",
                    "@firebase/analytics": "fire-analytics",
                    "@firebase/analytics-compat": "fire-analytics-compat",
                    "@firebase/app-check": "fire-app-check",
                    "@firebase/app-check-compat": "fire-app-check-compat",
                    "@firebase/auth": "fire-auth",
                    "@firebase/auth-compat": "fire-auth-compat",
                    "@firebase/database": "fire-rtdb",
                    "@firebase/database-compat": "fire-rtdb-compat",
                    "@firebase/functions": "fire-fn",
                    "@firebase/functions-compat": "fire-fn-compat",
                    "@firebase/installations": "fire-iid",
                    "@firebase/installations-compat": "fire-iid-compat",
                    "@firebase/messaging": "fire-fcm",
                    "@firebase/messaging-compat": "fire-fcm-compat",
                    "@firebase/performance": "fire-perf",
                    "@firebase/performance-compat": "fire-perf-compat",
                    "@firebase/remote-config": "fire-rc",
                    "@firebase/remote-config-compat": "fire-rc-compat",
                    "@firebase/storage": "fire-gcs",
                    "@firebase/storage-compat": "fire-gcs-compat",
                    "@firebase/firestore": "fire-fst",
                    "@firebase/firestore-compat": "fire-fst-compat",
                    "fire-js": "fire-js",
                    firebase: "fire-js-all"
                },
                eD = new Map,
                eO = new Map;

            function eL(e) {
                let t = e.name;
                if (eO.has(t)) return eR.debug(`There were multiple attempts to register component ${t}.`), !1;
                for (let n of (eO.set(t, e), eD.values())) ! function(e, t) {
                    try {
                        e.container.addComponent(t)
                    } catch (n) {
                        eR.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n)
                    }
                }(n, e);
                return !0
            }

            function eU(e, t) {
                return e.container.getProvider(t)
            }
            let eM = new ed("app", "Firebase", {
                "no-app": "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
                "bad-app-name": "Illegal App name: '{$appName}",
                "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
                "app-deleted": "Firebase App named '{$appName}' already deleted",
                "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
                "invalid-log-argument": "First argument to `onLog` must be null or a function."
            });
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            class ex {
                constructor(e, t, n) {
                    this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new ew("app", () => this, "PUBLIC"))
                }
                get automaticDataCollectionEnabled() {
                    return this.checkDestroyed(), this._automaticDataCollectionEnabled
                }
                set automaticDataCollectionEnabled(e) {
                    this.checkDestroyed(), this._automaticDataCollectionEnabled = e
                }
                get name() {
                    return this.checkDestroyed(), this._name
                }
                get options() {
                    return this.checkDestroyed(), this._options
                }
                get config() {
                    return this.checkDestroyed(), this._config
                }
                get container() {
                    return this._container
                }
                get isDeleted() {
                    return this._isDeleted
                }
                set isDeleted(e) {
                    this._isDeleted = e
                }
                checkDestroyed() {
                    if (this.isDeleted) throw eM.create("app-deleted", {
                        appName: this._name
                    })
                }
            }

            function eB(e, t, n) {
                var i;
                let a = null !== (i = eP[e]) && void 0 !== i ? i : e;
                n && (a += `-${n}`);
                let r = a.match(/\s|\//),
                    o = t.match(/\s|\//);
                if (r || o) {
                    let e = [`Unable to register library "${a}" with version "${t}":`];
                    r && e.push(`library name "${a}" contains illegal characters (whitespace or "/")`), r && o && e.push("and"), o && e.push(`version name "${t}" contains illegal characters (whitespace or "/")`), eR.warn(e.join(" "));
                    return
                }
                eL(new ew(`${a}-version`, () => ({
                    library: a,
                    version: t
                }), "VERSION"))
            }
            eL(new ew("platform-logger", e => new eA(e), "PRIVATE")), eB(eT, ek, ""), eB(eT, ek, "esm2017"), eB("fire-js", "");
            var eF = n(15);
            let ej = "@firebase/installations",
                eK = "0.5.4",
                eH = `w:${eK}`,
                eq = "FIS_v2",
                e$ = new ed("installations", "Installations", {
                    "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
                    "not-registered": "Firebase Installation is not registered.",
                    "installation-not-found": "Firebase Installation not found.",
                    "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
                    "app-offline": "Could not process request. Application offline.",
                    "delete-pending-registration": "Can't delete installation while there is a pending registration request."
                });

            function eG(e) {
                return e instanceof ep && e.code.includes("request-failed")
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            function eV({
                projectId: e
            }) {
                return `https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`
            }

            function ez(e) {
                return {
                    token: e.token,
                    requestStatus: 2,
                    expiresIn: Number(e.expiresIn.replace("s", "000")),
                    creationTime: Date.now()
                }
            }
            async function eW(e, t) {
                let n = await t.json(),
                    i = n.error;
                return e$.create("request-failed", {
                    requestName: e,
                    serverCode: i.code,
                    serverMessage: i.message,
                    serverStatus: i.status
                })
            }

            function eY({
                apiKey: e
            }) {
                return new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "x-goog-api-key": e
                })
            }
            async function eJ(e) {
                let t = await e();
                return t.status >= 500 && t.status < 600 ? e() : t
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function eQ(e, {
                fid: t
            }) {
                let n = eV(e),
                    i = eY(e),
                    a = {
                        fid: t,
                        authVersion: eq,
                        appId: e.appId,
                        sdkVersion: eH
                    },
                    r = {
                        method: "POST",
                        headers: i,
                        body: JSON.stringify(a)
                    },
                    o = await eJ(() => fetch(n, r));
                if (o.ok) {
                    let e = await o.json(),
                        n = {
                            fid: e.fid || t,
                            registrationStatus: 2,
                            refreshToken: e.refreshToken,
                            authToken: ez(e.authToken)
                        };
                    return n
                }
                throw await eW("Create Installation", o)
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            function eX(e) {
                return new Promise(t => {
                    setTimeout(t, e)
                })
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let eZ = /^[cdef][\w-]{21}$/;
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            function e0(e) {
                return `${e.appName}!${e.appId}`
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let e1 = new Map;

            function e2(e, t) {
                let n = e0(e);
                e5(n, t),
                    function(e, t) {
                        let n = (!e4 && "BroadcastChannel" in self && ((e4 = new BroadcastChannel("[Firebase] FID Change")).onmessage = e => {
                            e5(e.data.key, e.data.fid)
                        }), e4);
                        n && n.postMessage({
                            key: e,
                            fid: t
                        }), 0 === e1.size && e4 && (e4.close(), e4 = null)
                    }(n, t)
            }

            function e5(e, t) {
                let n = e1.get(e);
                if (n)
                    for (let e of n) e(t)
            }
            let e4 = null,
                e6 = "firebase-installations-store",
                e8 = null;

            function e3() {
                return e8 || (e8 = (0, eF.openDb)("firebase-installations-database", 1, e => {
                    0 === e.oldVersion && e.createObjectStore(e6)
                })), e8
            }
            async function e9(e, t) {
                let n = e0(e),
                    i = await e3(),
                    a = i.transaction(e6, "readwrite"),
                    r = a.objectStore(e6),
                    o = await r.get(n);
                return await r.put(t, n), await a.complete, o && o.fid === t.fid || e2(e, t.fid), t
            }
            async function e7(e) {
                let t = e0(e),
                    n = await e3(),
                    i = n.transaction(e6, "readwrite");
                await i.objectStore(e6).delete(t), await i.complete
            }
            async function te(e, t) {
                let n = e0(e),
                    i = await e3(),
                    a = i.transaction(e6, "readwrite"),
                    r = a.objectStore(e6),
                    o = await r.get(n),
                    s = t(o);
                return void 0 === s ? await r.delete(n) : await r.put(s, n), await a.complete, s && (!o || o.fid !== s.fid) && e2(e, s.fid), s
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function tt(e) {
                let t;
                let n = await te(e, n => {
                    let i = function(e) {
                            let t = e || {
                                fid: function() {
                                    try {
                                        let e = new Uint8Array(17),
                                            t = self.crypto || self.msCrypto;
                                        t.getRandomValues(e), e[0] = 112 + e[0] % 16;
                                        let n = function(e) {
                                            let t =
                                                /**
                                                 * @license
                                                 * Copyright 2019 Google LLC
                                                 *
                                                 * Licensed under the Apache License, Version 2.0 (the "License");
                                                 * you may not use this file except in compliance with the License.
                                                 * You may obtain a copy of the License at
                                                 *
                                                 *   http://www.apache.org/licenses/LICENSE-2.0
                                                 *
                                                 * Unless required by applicable law or agreed to in writing, software
                                                 * distributed under the License is distributed on an "AS IS" BASIS,
                                                 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                 * See the License for the specific language governing permissions and
                                                 * limitations under the License.
                                                 */
                                                function(e) {
                                                    let t = btoa(String.fromCharCode(...e));
                                                    return t.replace(/\+/g, "-").replace(/\//g, "_")
                                                }(e);
                                            return t.substr(0, 22)
                                        }(e);
                                        return eZ.test(n) ? n : ""
                                    } catch (e) {
                                        return ""
                                    }
                                }(),
                                registrationStatus: 0
                            };
                            return tr(t)
                        }(n),
                        a = function(e, t) {
                            if (0 === t.registrationStatus) {
                                if (!navigator.onLine) {
                                    let e = Promise.reject(e$.create("app-offline"));
                                    return {
                                        installationEntry: t,
                                        registrationPromise: e
                                    }
                                }
                                let n = {
                                        fid: t.fid,
                                        registrationStatus: 1,
                                        registrationTime: Date.now()
                                    },
                                    i = tn(e, n);
                                return {
                                    installationEntry: n,
                                    registrationPromise: i
                                }
                            }
                            return 1 === t.registrationStatus ? {
                                installationEntry: t,
                                registrationPromise: ti(e)
                            } : {
                                installationEntry: t
                            }
                        }(e, i);
                    return t = a.registrationPromise, a.installationEntry
                });
                return "" === n.fid ? {
                    installationEntry: await t
                } : {
                    installationEntry: n,
                    registrationPromise: t
                }
            }
            async function tn(e, t) {
                try {
                    let n = await eQ(e, t);
                    return e9(e, n)
                } catch (n) {
                    throw eG(n) && 409 === n.customData.serverCode ? await e7(e) : await e9(e, {
                        fid: t.fid,
                        registrationStatus: 0
                    }), n
                }
            }
            async function ti(e) {
                let t = await ta(e);
                for (; 1 === t.registrationStatus;) await eX(100), t = await ta(e);
                if (0 === t.registrationStatus) {
                    let {
                        installationEntry: t,
                        registrationPromise: n
                    } = await tt(e);
                    return n || t
                }
                return t
            }

            function ta(e) {
                return te(e, e => {
                    if (!e) throw e$.create("installation-not-found");
                    return tr(e)
                })
            }

            function tr(e) {
                return 1 === e.registrationStatus && e.registrationTime + 1e4 < Date.now() ? {
                    fid: e.fid,
                    registrationStatus: 0
                } : e
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function to({
                appConfig: e,
                platformLoggerProvider: t
            }, n) {
                let i = function(e, {
                        fid: t
                    }) {
                        return `${eV(e)}/${t}/authTokens:generate`
                    }(e, n),
                    a = function(e, {
                        refreshToken: t
                    }) {
                        let n = eY(e);
                        return n.append("Authorization", `${eq} ${t}`), n
                    }(e, n),
                    r = t.getImmediate({
                        optional: !0
                    });
                r && a.append("x-firebase-client", r.getPlatformInfoString());
                let o = {
                        method: "POST",
                        headers: a,
                        body: JSON.stringify({
                            installation: {
                                sdkVersion: eH
                            }
                        })
                    },
                    s = await eJ(() => fetch(i, o));
                if (s.ok) {
                    let e = await s.json(),
                        t = ez(e);
                    return t
                }
                throw await eW("Generate Auth Token", s)
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function ts(e, t = !1) {
                let n;
                let i = await te(e.appConfig, i => {
                        var a;
                        if (!tp(i)) throw e$.create("not-registered");
                        let r = i.authToken;
                        if (!t && 2 === (a = r).requestStatus && ! function(e) {
                                let t = Date.now();
                                return t < e.creationTime || e.creationTime + e.expiresIn < t + 36e5
                            }(a)) return i;
                        if (1 === r.requestStatus) return n = tc(e, t), i; {
                            if (!navigator.onLine) throw e$.create("app-offline");
                            let t = function(e) {
                                let t = {
                                    requestStatus: 1,
                                    requestTime: Date.now()
                                };
                                return Object.assign(Object.assign({}, e), {
                                    authToken: t
                                })
                            }(i);
                            return n = tu(e, t), t
                        }
                    }),
                    a = n ? await n : i.authToken;
                return a
            }
            async function tc(e, t) {
                let n = await tl(e.appConfig);
                for (; 1 === n.authToken.requestStatus;) await eX(100), n = await tl(e.appConfig);
                let i = n.authToken;
                return 0 === i.requestStatus ? ts(e, t) : i
            }

            function tl(e) {
                return te(e, e => {
                    if (!tp(e)) throw e$.create("not-registered");
                    let t = e.authToken;
                    return 1 === t.requestStatus && t.requestTime + 1e4 < Date.now() ? Object.assign(Object.assign({}, e), {
                        authToken: {
                            requestStatus: 0
                        }
                    }) : e
                })
            }
            async function tu(e, t) {
                try {
                    let n = await to(e, t),
                        i = Object.assign(Object.assign({}, t), {
                            authToken: n
                        });
                    return await e9(e.appConfig, i), n
                } catch (n) {
                    if (eG(n) && (401 === n.customData.serverCode || 404 === n.customData.serverCode)) await e7(e.appConfig);
                    else {
                        let n = Object.assign(Object.assign({}, t), {
                            authToken: {
                                requestStatus: 0
                            }
                        });
                        await e9(e.appConfig, n)
                    }
                    throw n
                }
            }

            function tp(e) {
                return void 0 !== e && 2 === e.registrationStatus
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function td(e) {
                let {
                    installationEntry: t,
                    registrationPromise: n
                } = await tt(e.appConfig);
                return n ? n.catch(console.error) : ts(e).catch(console.error), t.fid
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function th(e, t = !1) {
                await tf(e.appConfig);
                let n = await ts(e, t);
                return n.token
            }
            async function tf(e) {
                let {
                    registrationPromise: t
                } = await tt(e);
                t && await t
            }

            function tm(e) {
                return e$.create("missing-app-config-values", {
                    valueName: e
                })
            }
            /**
             * @license
             * Copyright 2020 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let tg = "installations",
                tw = e => {
                    let t = e.getProvider("app").getImmediate(),
                        n =
                        /**
                         * @license
                         * Copyright 2019 Google LLC
                         *
                         * Licensed under the Apache License, Version 2.0 (the "License");
                         * you may not use this file except in compliance with the License.
                         * You may obtain a copy of the License at
                         *
                         *   http://www.apache.org/licenses/LICENSE-2.0
                         *
                         * Unless required by applicable law or agreed to in writing, software
                         * distributed under the License is distributed on an "AS IS" BASIS,
                         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                         * See the License for the specific language governing permissions and
                         * limitations under the License.
                         */
                        function(e) {
                            if (!e || !e.options) throw tm("App Configuration");
                            if (!e.name) throw tm("App Name");
                            for (let t of ["projectId", "apiKey", "appId"])
                                if (!e.options[t]) throw tm(t);
                            return {
                                appName: e.name,
                                projectId: e.options.projectId,
                                apiKey: e.options.apiKey,
                                appId: e.options.appId
                            }
                        }(t),
                        i = eU(t, "platform-logger");
                    return {
                        app: t,
                        appConfig: n,
                        platformLoggerProvider: i,
                        _delete: () => Promise.resolve()
                    }
                },
                ty = e => {
                    let t = e.getProvider("app").getImmediate(),
                        n = eU(t, tg).getImmediate();
                    return {
                        getId: () => td(n),
                        getToken: e => th(n, e)
                    }
                };
            eL(new ew(tg, tw, "PUBLIC")), eL(new ew("installations-internal", ty, "PRIVATE")), eB(ej, eK), eB(ej, eK, "esm2017");
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let tS = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
                t_ = "FCM_MSG";
            /**
             * @license
             * Copyright 2017 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            function tb(e) {
                let t = new Uint8Array(e),
                    n = btoa(String.fromCharCode(...t));
                return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
            }(k = O || (O = {}))[k.DATA_MESSAGE = 1] = "DATA_MESSAGE", k[k.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION", (R = L || (L = {})).PUSH_RECEIVED = "push-received", R.NOTIFICATION_CLICKED = "notification-clicked";
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let tv = "fcm_token_details_db",
                tE = "fcm_token_object_Store";
            async function tI(e) {
                if ("databases" in indexedDB) {
                    let e = await indexedDB.databases(),
                        t = e.map(e => e.name);
                    if (!t.includes(tv)) return null
                }
                let t = null,
                    n = await (0, eF.openDb)(tv, 5, async n => {
                        var i;
                        if (n.oldVersion < 2 || !n.objectStoreNames.contains(tE)) return;
                        let a = n.transaction.objectStore(tE),
                            r = await a.index("fcmSenderId").get(e);
                        if (await a.clear(), r) {
                            if (2 === n.oldVersion) {
                                if (!r.auth || !r.p256dh || !r.endpoint) return;
                                t = {
                                    token: r.fcmToken,
                                    createTime: null !== (i = r.createTime) && void 0 !== i ? i : Date.now(),
                                    subscriptionOptions: {
                                        auth: r.auth,
                                        p256dh: r.p256dh,
                                        endpoint: r.endpoint,
                                        swScope: r.swScope,
                                        vapidKey: "string" == typeof r.vapidKey ? r.vapidKey : tb(r.vapidKey)
                                    }
                                }
                            } else 3 === n.oldVersion ? t = {
                                token: r.fcmToken,
                                createTime: r.createTime,
                                subscriptionOptions: {
                                    auth: tb(r.auth),
                                    p256dh: tb(r.p256dh),
                                    endpoint: r.endpoint,
                                    swScope: r.swScope,
                                    vapidKey: tb(r.vapidKey)
                                }
                            } : 4 === n.oldVersion && (t = {
                                token: r.fcmToken,
                                createTime: r.createTime,
                                subscriptionOptions: {
                                    auth: tb(r.auth),
                                    p256dh: tb(r.p256dh),
                                    endpoint: r.endpoint,
                                    swScope: r.swScope,
                                    vapidKey: tb(r.vapidKey)
                                }
                            })
                        }
                    });
                return n.close(), await (0, eF.deleteDb)(tv), await (0, eF.deleteDb)("fcm_vapid_details_db"), await (0, eF.deleteDb)("undefined"), ! function(e) {
                    if (!e || !e.subscriptionOptions) return !1;
                    let {
                        subscriptionOptions: t
                    } = e;
                    return "number" == typeof e.createTime && e.createTime > 0 && "string" == typeof e.token && e.token.length > 0 && "string" == typeof t.auth && t.auth.length > 0 && "string" == typeof t.p256dh && t.p256dh.length > 0 && "string" == typeof t.endpoint && t.endpoint.length > 0 && "string" == typeof t.swScope && t.swScope.length > 0 && "string" == typeof t.vapidKey && t.vapidKey.length > 0
                }(t) ? null : t
            }
            let tC = "firebase-messaging-store",
                tA = null;

            function tT() {
                return tA || (tA = (0, eF.openDb)("firebase-messaging-database", 1, e => {
                    0 === e.oldVersion && e.createObjectStore(tC)
                })), tA
            }
            async function tk(e) {
                let t = function({
                        appConfig: e
                    }) {
                        return e.appId
                    }(e),
                    n = await tT(),
                    i = await n.transaction(tC).objectStore(tC).get(t);
                if (i) return i; {
                    let t = await tI(e.appConfig.senderId);
                    if (t) return await tR(e, t), t
                }
            }
            async function tR(e, t) {
                let n = function({
                        appConfig: e
                    }) {
                        return e.appId
                    }(e),
                    i = await tT(),
                    a = i.transaction(tC, "readwrite");
                return await a.objectStore(tC).put(t, n), await a.complete, t
            }
            async function tN(e) {
                let t = function({
                        appConfig: e
                    }) {
                        return e.appId
                    }(e),
                    n = await tT(),
                    i = n.transaction(tC, "readwrite");
                await i.objectStore(tC).delete(t), await i.complete
            }
            let tP = new ed("messaging", "Messaging", {
                "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
                "only-available-in-window": "This method is available in a Window context.",
                "only-available-in-sw": "This method is available in a service worker context.",
                "permission-default": "The notification permission was not granted and dismissed instead.",
                "permission-blocked": "The notification permission was not granted and blocked instead.",
                "unsupported-browser": "This browser doesn't support the API's required to use the Firebase SDK.",
                "indexed-db-unsupported": "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
                "failed-service-worker-registration": "We are unable to register the default service worker. {$browserErrorMessage}",
                "token-subscribe-failed": "A problem occurred while subscribing the user to FCM: {$errorInfo}",
                "token-subscribe-no-token": "FCM returned no token when subscribing the user to push.",
                "token-unsubscribe-failed": "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
                "token-update-failed": "A problem occurred while updating the user from FCM: {$errorInfo}",
                "token-update-no-token": "FCM returned no token when updating the user to push.",
                "use-sw-after-get-token": "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
                "invalid-sw-registration": "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
                "invalid-bg-handler": "The input to setBackgroundMessageHandler() must be a function.",
                "invalid-vapid-key": "The public VAPID key must be a string.",
                "use-vapid-key-after-get-token": "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."
            });
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function tD(e, t) {
                let n;
                let i = await tM(e),
                    a = tx(t),
                    r = {
                        method: "POST",
                        headers: i,
                        body: JSON.stringify(a)
                    };
                try {
                    let t = await fetch(tU(e.appConfig), r);
                    n = await t.json()
                } catch (e) {
                    throw tP.create("token-subscribe-failed", {
                        errorInfo: e
                    })
                }
                if (n.error) {
                    let e = n.error.message;
                    throw tP.create("token-subscribe-failed", {
                        errorInfo: e
                    })
                }
                if (!n.token) throw tP.create("token-subscribe-no-token");
                return n.token
            }
            async function tO(e, t) {
                let n;
                let i = await tM(e),
                    a = tx(t.subscriptionOptions),
                    r = {
                        method: "PATCH",
                        headers: i,
                        body: JSON.stringify(a)
                    };
                try {
                    let i = await fetch(`${tU(e.appConfig)}/${t.token}`, r);
                    n = await i.json()
                } catch (e) {
                    throw tP.create("token-update-failed", {
                        errorInfo: e
                    })
                }
                if (n.error) {
                    let e = n.error.message;
                    throw tP.create("token-update-failed", {
                        errorInfo: e
                    })
                }
                if (!n.token) throw tP.create("token-update-no-token");
                return n.token
            }
            async function tL(e, t) {
                let n = await tM(e);
                try {
                    let i = await fetch(`${tU(e.appConfig)}/${t}`, {
                            method: "DELETE",
                            headers: n
                        }),
                        a = await i.json();
                    if (a.error) {
                        let e = a.error.message;
                        throw tP.create("token-unsubscribe-failed", {
                            errorInfo: e
                        })
                    }
                } catch (e) {
                    throw tP.create("token-unsubscribe-failed", {
                        errorInfo: e
                    })
                }
            }

            function tU({
                projectId: e
            }) {
                return `https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`
            }
            async function tM({
                appConfig: e,
                installations: t
            }) {
                let n = await t.getToken();
                return new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "x-goog-api-key": e.apiKey,
                    "x-goog-firebase-installations-auth": `FIS ${n}`
                })
            }

            function tx({
                p256dh: e,
                auth: t,
                endpoint: n,
                vapidKey: i
            }) {
                let a = {
                    web: {
                        endpoint: n,
                        auth: t,
                        p256dh: e
                    }
                };
                return i !== tS && (a.web.applicationPubKey = i), a
            }
            async function tB(e) {
                let t = await tH(e.swRegistration, e.vapidKey),
                    n = {
                        vapidKey: e.vapidKey,
                        swScope: e.swRegistration.scope,
                        endpoint: t.endpoint,
                        auth: tb(t.getKey("auth")),
                        p256dh: tb(t.getKey("p256dh"))
                    },
                    i = await tk(e.firebaseDependencies);
                if (!i) return tK(e.firebaseDependencies, n);
                if (function(e, t) {
                        let n = t.vapidKey === e.vapidKey,
                            i = t.endpoint === e.endpoint,
                            a = t.auth === e.auth,
                            r = t.p256dh === e.p256dh;
                        return n && i && a && r
                    }(i.subscriptionOptions, n)) return Date.now() >= i.createTime + 6048e5 ? tj(e, {
                    token: i.token,
                    createTime: Date.now(),
                    subscriptionOptions: n
                }) : i.token;
                try {
                    await tL(e.firebaseDependencies, i.token)
                } catch (e) {
                    console.warn(e)
                }
                return tK(e.firebaseDependencies, n)
            }
            async function tF(e) {
                let t = await tk(e.firebaseDependencies);
                t && (await tL(e.firebaseDependencies, t.token), await tN(e.firebaseDependencies));
                let n = await e.swRegistration.pushManager.getSubscription();
                return !n || n.unsubscribe()
            }
            async function tj(e, t) {
                try {
                    let n = await tO(e.firebaseDependencies, t),
                        i = Object.assign(Object.assign({}, t), {
                            token: n,
                            createTime: Date.now()
                        });
                    return await tR(e.firebaseDependencies, i), n
                } catch (t) {
                    throw await tF(e), t
                }
            }
            async function tK(e, t) {
                let n = await tD(e, t),
                    i = {
                        token: n,
                        createTime: Date.now(),
                        subscriptionOptions: t
                    };
                return await tR(e, i), i.token
            }
            async function tH(e, t) {
                let n = await e.pushManager.getSubscription();
                return n || e.pushManager.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: function(e) {
                        let t = "=".repeat((4 - e.length % 4) % 4),
                            n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"),
                            i = atob(n),
                            a = new Uint8Array(i.length);
                        for (let e = 0; e < i.length; ++e) a[e] = i.charCodeAt(e);
                        return a
                    }(t)
                })
            }
            async function tq(e, t) {
                let n = function(e, t) {
                    var n, i;
                    let a = {};
                    return e.from && (a.project_number = e.from), e.fcm_message_id && (a.message_id = e.fcm_message_id), a.instance_id = t, e.notification ? a.message_type = O.DISPLAY_NOTIFICATION.toString() : a.message_type = O.DATA_MESSAGE.toString(), a.sdk_platform = "3", a.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), e.collapse_key && (a.collapse_key = e.collapse_key), a.event = "1", (null === (n = e.fcmOptions) || void 0 === n ? void 0 : n.analytics_label) && (a.analytics_label = null === (i = e.fcmOptions) || void 0 === i ? void 0 : i.analytics_label), a
                }(t, await e.firebaseDependencies.installations.getId());
                (function(e, t) {
                    let n = {};
                    n.event_time_ms = Math.floor(Date.now()).toString(), n.source_extension_json_proto3 = JSON.stringify(t), e.logEvents.push(n)
                })(e, n)
            }

            function t$(e, t) {
                let n = [];
                for (let i = 0; i < e.length; i++) n.push(e.charAt(i)), i < t.length && n.push(t.charAt(i));
                return n.join("")
            }
            /**
             * @license
             * Copyright 2017 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function tG(e, t) {
                var n, i;
                let {
                    newSubscription: a
                } = e;
                if (!a) {
                    await tF(t);
                    return
                }
                let r = await tk(t.firebaseDependencies);
                await tF(t), t.vapidKey = null !== (i = null === (n = null == r ? void 0 : r.subscriptionOptions) || void 0 === n ? void 0 : n.vapidKey) && void 0 !== i ? i : tS, await tB(t)
            }
            async function tV(e, t) {
                let n = function({
                    data: e
                }) {
                    if (!e) return null;
                    try {
                        return e.json()
                    } catch (e) {
                        return null
                    }
                }(e);
                if (!n) return;
                t.deliveryMetricsExportedToBigQueryEnabled && await tq(t, n);
                let i = await tY();
                if (i.some(e => "visible" === e.visibilityState && !e.url.startsWith("chrome-extension://"))) return function(e, t) {
                    for (let n of (t.isFirebaseMessaging = !0, t.messageType = L.PUSH_RECEIVED, e)) n.postMessage(t)
                }(i, n);
                if (n.notification && await
                    function(e) {
                        var t;
                        let {
                            actions: n
                        } = e, {
                            maxActions: i
                        } = Notification;
                        return n && i && n.length > i && console.warn(`This browser only supports ${i} actions. The remaining actions will not be displayed.`), self.registration.showNotification(null !== (t = e.title) && void 0 !== t ? t : "", e)
                    }(function(e) {
                        let t = Object.assign({}, e.notification);
                        return t.data = {
                            [t_]: e
                        }, t
                    }(n)), t && t.onBackgroundMessageHandler) {
                    let e =
                        /**
                         * @license
                         * Copyright 2020 Google LLC
                         *
                         * Licensed under the Apache License, Version 2.0 (the "License");
                         * you may not use this file except in compliance with the License.
                         * You may obtain a copy of the License at
                         *
                         *   http://www.apache.org/licenses/LICENSE-2.0
                         *
                         * Unless required by applicable law or agreed to in writing, software
                         * distributed under the License is distributed on an "AS IS" BASIS,
                         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                         * See the License for the specific language governing permissions and
                         * limitations under the License.
                         */
                        function(e) {
                            var t;
                            let n = {
                                from: e.from,
                                collapseKey: e.collapse_key,
                                messageId: e.fcm_message_id
                            };
                            return function(e, t) {
                                    if (!t.notification) return;
                                    e.notification = {};
                                    let n = t.notification.title;
                                    n && (e.notification.title = n);
                                    let i = t.notification.body;
                                    i && (e.notification.body = i);
                                    let a = t.notification.image;
                                    a && (e.notification.image = a)
                                }(n, e), t = n, e.data && (t.data = e.data),
                                function(e, t) {
                                    if (!t.fcmOptions) return;
                                    e.fcmOptions = {};
                                    let n = t.fcmOptions.link;
                                    n && (e.fcmOptions.link = n);
                                    let i = t.fcmOptions.analytics_label;
                                    i && (e.fcmOptions.analyticsLabel = i)
                                }(n, e), n
                        }(n);
                    "function" == typeof t.onBackgroundMessageHandler ? t.onBackgroundMessageHandler(e) : t.onBackgroundMessageHandler.next(e)
                }
            }
            async function tz(e) {
                var t, n;
                let i = null === (n = null === (t = e.notification) || void 0 === t ? void 0 : t.data) || void 0 === n ? void 0 : n[t_];
                if (!i || e.action) return;
                e.stopImmediatePropagation(), e.notification.close();
                let a = function(e) {
                    var t, n, i, a;
                    let r = null !== (n = null === (t = e.fcmOptions) || void 0 === t ? void 0 : t.link) && void 0 !== n ? n : null === (i = e.notification) || void 0 === i ? void 0 : i.click_action;
                    return r || ("object" == typeof(a = e.data) && a && "google.c.a.c_id" in a ? self.location.origin : null)
                }(i);
                if (!a) return;
                let r = new URL(a, self.location.href),
                    o = new URL(self.location.origin);
                if (r.host !== o.host) return;
                let s = await tW(r);
                if (s ? s = await s.focus() : (s = await self.clients.openWindow(a), await new Promise(e => {
                        setTimeout(e, 3e3)
                    })), s) return i.messageType = L.NOTIFICATION_CLICKED, i.isFirebaseMessaging = !0, s.postMessage(i)
            }
            async function tW(e) {
                let t = await tY();
                for (let n of t) {
                    let t = new URL(n.url, self.location.href);
                    if (e.host === t.host) return n
                }
                return null
            }

            function tY() {
                return self.clients.matchAll({
                    type: "window",
                    includeUncontrolled: !0
                })
            }

            function tJ(e) {
                return tP.create("missing-app-config-values", {
                    valueName: e
                })
            }
            /**
             * @license
             * Copyright 2019 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            t$("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o"), t$("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
            /**
             * @license
             * Copyright 2020 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            class tQ {
                constructor(e, t, n) {
                    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
                    let i =
                        /**
                         * @license
                         * Copyright 2019 Google LLC
                         *
                         * Licensed under the Apache License, Version 2.0 (the "License");
                         * you may not use this file except in compliance with the License.
                         * You may obtain a copy of the License at
                         *
                         *   http://www.apache.org/licenses/LICENSE-2.0
                         *
                         * Unless required by applicable law or agreed to in writing, software
                         * distributed under the License is distributed on an "AS IS" BASIS,
                         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                         * See the License for the specific language governing permissions and
                         * limitations under the License.
                         */
                        function(e) {
                            if (!e || !e.options) throw tJ("App Configuration Object");
                            if (!e.name) throw tJ("App Name");
                            let {
                                options: t
                            } = e;
                            for (let e of ["projectId", "apiKey", "appId", "messagingSenderId"])
                                if (!t[e]) throw tJ(e);
                            return {
                                appName: e.name,
                                projectId: t.projectId,
                                apiKey: t.apiKey,
                                appId: t.appId,
                                senderId: t.messagingSenderId
                            }
                        }(e);
                    this.firebaseDependencies = {
                        app: e,
                        appConfig: i,
                        installations: t,
                        analyticsProvider: n
                    }
                }
                _delete() {
                    return Promise.resolve()
                }
            }
            /**
             * @license
             * Copyright 2020 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            let tX = e => {
                let t = new tQ(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), e.getProvider("analytics-internal"));
                return self.addEventListener("push", e => {
                    e.waitUntil(tV(e, t))
                }), self.addEventListener("pushsubscriptionchange", e => {
                    e.waitUntil(tG(e, t))
                }), self.addEventListener("notificationclick", e => {
                    e.waitUntil(tz(e))
                }), t
            };
            /**
             * @license
             * Copyright 2020 Google LLC
             *
             * Licensed under the Apache License, Version 2.0 (the "License");
             * you may not use this file except in compliance with the License.
             * You may obtain a copy of the License at
             *
             *   http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software
             * distributed under the License is distributed on an "AS IS" BASIS,
             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             * See the License for the specific language governing permissions and
             * limitations under the License.
             */
            async function tZ() {
                return "object" == typeof indexedDB && await new Promise((e, t) => {
                    try {
                        let n = !0,
                            i = "validate-browser-context-for-indexeddb-analytics-module",
                            a = self.indexedDB.open(i);
                        a.onsuccess = () => {
                            a.result.close(), n || self.indexedDB.deleteDatabase(i), e(!0)
                        }, a.onupgradeneeded = () => {
                            n = !1
                        }, a.onerror = () => {
                            var e;
                            t((null === (e = a.error) || void 0 === e ? void 0 : e.message) || "")
                        }
                    } catch (e) {
                        t(e)
                    }
                }) && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey")
            }
            eL(new ew("messaging-sw", tX, "PUBLIC")), (N = i || (i = {})).Click = "Click", N.View = "View", N.Submission = "Submission", N.Error = "Error", N.Keypress = "Keypress", (P = a || (a = {})).AddSpawnPoint = "AddSpawnPoint", P.AuthSuccess = "AuthSuccess", P.AuthErrorCta = "AuthErrorCta", P.AuthErrorStartOver = "AuthErrorStartOver", P.AuthlessNameSignIn = "AuthlessNameSignIn", P.AuthlessSignInBackpackToast = "AuthlessSignInBackpackToast", P.AuthlessSignInShopToast = "AuthlessSignInShopToast", P.AuthlessSignInBannerCta = "AuthlessSignInBannerCta", P.AuthlessSignInBannerDismiss = "AuthlessSignInBannerDismiss", P.AuthlessUserSendChatMessage = "AuthlessUserSendChatMessage", P.AuthlessUserSetNameAndAvatar = "AuthlessUserSetNameAndAvatar", P.AuthlessUserSignUpForAvatarCustomization = "AuthlessUserSignUpForAvatarCustomization", P.AvatarCustomizationConfirmAsdkImage = "AvatarCustomizationConfirmAsdkImage", P.AvatarCustomizationRpmAvatarExported = "AvatarCustomizationRpmAvatarExported", P.CameraRotationMode = "CameraRotationMode", P.CancelAvatarCustomization = "CancelAvatarCustomization", P.ChatChannelJoin = "ChatChannelJoin", P.ChatMessageSent = "ChatMessageSent", P.ChatChannelJoinAndSawFirstMessage = "ChatChannelJoinAndSawFirstMessage", P.ClearAllFrames = "ClearAllFrames", P.ClearContentInRoom = "ClearContentInRoom", P.ClearCustomSkybox = "ClearCustomSkybox", P.CreateNewSpace = "CreateNewSpace", P.CreateTeam = "CreateTeam", P.CreatorToolkitNewsletterSignUp = "CreatorToolkitNewsletterSignUp", P.ConfirmCustomEnv = "ConfirmCustomEnv", P.ConfirmVerifyEmail = "ConfirmVerifyEmail", P.ControlsAndTipsFirstQuest = "ControlsAndTipsFirstQuest", P.CopyShareUrl = "CopyShareUrl", P.CustomEnvFromObject = "CustomEnvFromObject", P.CycleAuthlessAvatar = "CycleAuthlessAvatar", P.DeleteSpace = "DeleteSpace", P.EditEnvironmentPosition = "EditEnvironmentPosition", P.EditGenericBody = "EditGenericBody", P.EditShirtColor = "EditShirtColor", P.EditSkinColor = "EditSkinColor", P.EditSpaceInfoCancelConfirm = "EditSpaceInfoCancelConfirm", P.EditSpaceInfoSave = "EditSpaceInfoSave", P.EmailSupport = "EmailSupport", P.Emote = "Emote", P.EmoteKeybindSignInBannerCta = "EmoteKeybindSignInBannerCta", P.EmoteKeybindSignInBannerDismissed = "EmoteKeybindSignInBannerDismissed", P.EndGoLive = "EndGoLive", P.EndGoLiveModalConfirm = "EndGoLiveModalConfirm", P.EndGoLiveModalDismiss = "EndGoLiveModalDismiss", P.Exit = "Exit", P.FirstTutorialBack = "FirstTutorialBack", P.FirstTutorialDone = "FirstTutorialDone", P.FirstTutorialNext = "FirstTutorialNext", P.FirstTutorialSkip = "FirstTutorialSkip", P.FollowUser = "FollowUser", P.GoLive = "GoLive", P.GoLiveModalConfirm = "GoLiveModalConfirm", P.GoLiveModalDismiss = "GoLiveModalDismiss", P.HideEmptyFrames = "HideEmptyFrames", P.HomepageHeroCreator = "HomepageHeroCreator", P.HomepageHeroCta = "HomepageHeroCta", P.HyperlinkCreated = "HyperlinkCreated", P.HyperlinkClicked = "HyperlinkClicked", P.HyperlinkEditCancelled = "HyperlinkEditCancelled", P.HyperlinkLeaveSpatialConfirm = "HyperlinkLeaveSpatialConfirm", P.HyperlinkLeaveSpatialCancel = "HyperlinkLeaveSpatialCancel", P.InvalidProfileUrl = "InvalidProfileUrl", P.InvalidTokenGateAccessSettings = "InvalidTokenGateAccessSettings", P.JoinRecommendedSpaceOnLeave = "JoinRecommendedSpaceOnLeave", P.LeaveSpace = "LeaveSpace", P.LeaveSpaceCancel = "LeaveSpaceCancel", P.LeaveSpaceConfirm = "LeaveSpaceConfirm", P.LoginAttempt = "LoginAttempt", P.LoveSpace = "LikeSpace", P.PushNotificationPermissionModalDismissed = "PushNotificationPermissionModalDismissed", P.PushNotificationPermissionModalAccepted = "PushNotificationPermissionModalAccepted", P.PushNotificationPermissionFailed = "PushNotificationPermissionFailed", P.PushNotificationPermissionGranted = "PushNotificationPermissionGranted", P.ManageOculusProSubscription = "ManageOculusProSubscription", P.ManageAppleProSubscription = "ManageAppleProSubscription", P.ManageStripeProSubscription = "ManageStripeProSubscription", P.MuteSelf = "MuteSelf", P.MuteOther = "MuteOther", P.NftLinkClicked = "NftLinkClicked", P.OpenAvatarCustomizationPanel = "OpenAvatarCustomizationPanel", P.OpenEnvSettingsPanel = "OpenEnvSettingsPanel", P.OpenNewSpacePicker = "OpenNewSpacePicker", P.OpenEditProfile = "OpenEditProfile", P.OpenShopItemDetailsModal = "OpenShopItemDetailsModal", P.OpenSpaceInApp = "OpenSpaceInApp", P.OpenCreateSpaceInApp = "OpenCreateSpaceInApp", P.OpenCreatorProfile = "OpenCreatorProfile", P.ProfilePageCancel = "ProfilePageCancel", P.ProfilePageEditAvatar = "ProfilePageEditAvatar", P.ProfilePageSave = "ProfilePageSave", P.PublishSpace = "PublishSpace", P.PushNotificationClicked = "PushNotificationClicked", P.PushNotificationReceived = "PushNotificationReceived", P.RecordVideoStart = "RecordVideoStart", P.RecordVideoStop = "RecordVideoStop", P.RecordedVideo = "RecordedVideo", P.ReadyPlayerMeAnnouncementBannerCta = "ReadyPlayerMeAnnouncementBannerCta", P.ReadyPlayerMeAnnouncementBannerDismiss = "ReadyPlayerMeAnnouncementBannerDismiss", P.RejectSystemPermission = "RejectSystemPermission", P.RenameSpace = "RenameSpace", P.RenameSpaceCancel = "RenameSpaceCancel", P.RequestResetPasswordEmail = "RequestResetPasswordEmail", P.ResendVerificationEmail = "SentVerificationEmail", P.ResetPasswordAttempt = "ResetPasswordAttempt", P.ReturnedFromSsoLogin = "ReturnedFromSsoLogin", P.QuestsCompleteModalClose = "QuestsCompleteModalClose", P.QuestsCompleteModalKeepExploring = "QuestsCompleteModalKeepExploring", P.QuestsCompleteModalSelectSpace = "QuestsCompleteModalSelectSpace", P.SaveAvatarCustomization = "SaveAvatarCustomization", P.SaveAvatarData = "SaveAvatarData", P.SaveProfile = "SaveProfile", P.SaveTokenGateAccessSettings = "SaveTokenGateAccessSettings", P.SelectCreatorToolkitAvatar = "SelectCreatorToolkitAvatar", P.SelectRpmAvatar = "SelectRpmAvatar", P.SetProfileBackgroundBanner = "SetProfileBackgroundBanner", P.ShareSpace = "ShareSpace", P.ShareProfile = "ShareProfile", P.ShareToFacebook = "ShareToFacebook", P.ShareToLinkedIn = "ShareToLinkedIn", P.ShareToTwitter = "ShareToTwitter", P.SignUp = "SignUp", P.SpacePreviewJoinLive = "SpacePreviewJoinLive", P.SpacesSearch = "SpacesSearch", P.SplashScreenFinishedLoading = "SplashScreenFinishedLoading", P.StartDanceStreak = "StartDanceStreak", P.SupportForCustomEnv = "SupportForCustomEnv", P.SwitchParticipantGroup = "SwitchParticipantGroup", P.SwitchSpacesTab = "SwitchSpacesTab", P.TakeScreenshot = "TakeScreenshot", P.UnfollowUser = "UnfollowUser", P.UnloveSpace = "UnlikeSpace", P.UnmuteSelf = "UnmuteSelf", P.UnmuteOther = "UnmuteOther", P.UnpublishSpace = "UnpublishSpace", P.UpsellSignUpCta = "UpsellSignUpCta", P.UseBackpackItem = "UseBackpackItem", P.PurchaseShopItem = "PurchaseShopItem",
                /**
                 * @license
                 * Copyright 2020 Google LLC
                 *
                 * Licensed under the Apache License, Version 2.0 (the "License");
                 * you may not use this file except in compliance with the License.
                 * You may obtain a copy of the License at
                 *
                 *   http://www.apache.org/licenses/LICENSE-2.0
                 *
                 * Unless required by applicable law or agreed to in writing, software
                 * distributed under the License is distributed on an "AS IS" BASIS,
                 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                 * See the License for the specific language governing permissions and
                 * limitations under the License.
                 */
                eB("firebase", "9.4.1", "app");
            let t0 = {
                apiKey: B.FIREBASE_API_KEY,
                appId: B.FIREBASE_APP_ID,
                authDomain: B.FIREBASE_AUTH_DOMAIN,
                projectId: B.FIREBASE_PROJECT_ID,
                storageBucket: B.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: B.FIREBASE_MESSAGING_SENDER_ID
            };
            F || "www.spatial.io" !== x || (t0.authDomain = `${B.WEB_HOST}/api`);
            let t1 = function(e, t = {}) {
                if ("object" != typeof t) {
                    let e = t;
                    t = {
                        name: e
                    }
                }
                let n = Object.assign({
                        name: eN,
                        automaticDataCollectionEnabled: !1
                    }, t),
                    i = n.name;
                if ("string" != typeof i || !i) throw eM.create("bad-app-name", {
                    appName: String(i)
                });
                let a = eD.get(i);
                if (a) {
                    if (ef(e, a.options) && ef(n, a.config)) return a;
                    throw eM.create("duplicate-app", {
                        appName: i
                    })
                }
                let r = new e_(i);
                for (let e of eO.values()) r.addComponent(e);
                let o = new ex(e, n, r);
                return eD.set(i, o), o
            }(t0);
            async function t2() {
                try {
                    let e = await t5();
                    e.postMessage(...arguments)
                } catch (e) {
                    console.error("Error sending background notification to clients"), console.error(e)
                }
            }
            async function t5() {
                let e = await self.clients.matchAll({
                    type: "window"
                });
                for (; e.length < 1;) {
                    let t;
                    let n = new Promise(e => {
                            t = e
                        }),
                        i = e => {
                            e.data && "ready" === e.data.type && t()
                        };
                    self.addEventListener("message", i), await n, self.removeEventListener("message", i), e = await self.clients.matchAll({
                        type: "window"
                    })
                }
                return e[0]
            }(function() {
                var e, t;
                self.addEventListener("notificationclick", async e => {
                    var t, n, o;
                    await r(`${i.Click}: ${a.PushNotificationClicked}`, {
                        Interaction: i.Click,
                        Name: a.PushNotificationClicked
                    });
                    let s = null === (t = e.notification) || void 0 === t ? void 0 : null === (n = t.data) || void 0 === n ? void 0 : null === (o = n.FCM_MSG) || void 0 === o ? void 0 : o.data;
                    s && s.link && self.clients.openWindow(s.link)
                });
                let n =
                    /**
                     * @license
                     * Copyright 2017 Google LLC
                     *
                     * Licensed under the Apache License, Version 2.0 (the "License");
                     * you may not use this file except in compliance with the License.
                     * You may obtain a copy of the License at
                     *
                     *   http://www.apache.org/licenses/LICENSE-2.0
                     *
                     * Unless required by applicable law or agreed to in writing, software
                     * distributed under the License is distributed on an "AS IS" BASIS,
                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                     * See the License for the specific language governing permissions and
                     * limitations under the License.
                     */
                    function(e = function(e = eN) {
                        let t = eD.get(e);
                        if (!t) throw eM.create("no-app", {
                            appName: e
                        });
                        return t
                    }()) {
                        return tZ().then(e => {
                            if (!e) throw tP.create("unsupported-browser")
                        }, e => {
                            throw tP.create("indexed-db-unsupported")
                        }), eU(eg(e), "messaging-sw").getImmediate()
                    }(t1);
                e = n, t = async e => {
                        if (e.notification) {
                            var t;
                            await r(a.PushNotificationReceived, {
                                "In Foreground": !1,
                                Title: e.notification.title,
                                Body: e.notification.body,
                                Link: null === (t = e.data) || void 0 === t ? void 0 : t.link
                            })
                        } else console.warn("Received a background notification without a `notification` field in the payload.", e)
                    },
                    /**
                     * @license
                     * Copyright 2020 Google LLC
                     *
                     * Licensed under the Apache License, Version 2.0 (the "License");
                     * you may not use this file except in compliance with the License.
                     * You may obtain a copy of the License at
                     *
                     *   http://www.apache.org/licenses/LICENSE-2.0
                     *
                     * Unless required by applicable law or agreed to in writing, software
                     * distributed under the License is distributed on an "AS IS" BASIS,
                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                     * See the License for the specific language governing permissions and
                     * limitations under the License.
                     */
                    function(e, t) {
                        if (void 0 !== self.document) throw tP.create("only-available-in-sw");
                        e.onBackgroundMessageHandler = t, () => {
                            e.onBackgroundMessageHandler = null
                        }
                    }(e = eg(e), t);
                let r = async (e, t) => {
                    await t2({
                        type: "track-event",
                        payload: {
                            event_name: e,
                            properties: t
                        }
                    })
                }
            })(), self.addEventListener("activate", () => self.clients.claim()), self.addEventListener("install", () => self.skipWaiting()), self.addEventListener("fetch", e => {
                let {
                    url: t
                } = e.request;
                t.includes("googlevideo.com") && !t.includes("workers.dev") && e.respondWith(el(t))
            }), "development" !== B.DEPLOYMENT_ENV ? function() {
                let e = new G(es);
                e.addToCacheList([{
                    'revision': '4c03c35db15904af1dfe6e7259c78501',
                    'url': '/_next//static/media/404.ea4f2e03.png'
                }, {
                    'revision': 'a05ff4bdc6cb388a3b67e4b8c8aece65',
                    'url': '/_next//static/media/aeries-0-white.ac22442d.jpg'
                }, {
                    'revision': 'ed780413a8e6f35115545731cbf843de',
                    'url': '/_next//static/media/aeries-1-blue.570eb2bb.jpg'
                }, {
                    'revision': '21068b9b13622208136610cbb8db2330',
                    'url': '/_next//static/media/aeries-2-red.542afc9a.jpg'
                }, {
                    'revision': 'e6c938389d7764b1485f94b4ca4c66aa',
                    'url': '/_next//static/media/aeries-3-purple.f8219fdc.jpg'
                }, {
                    'revision': '2935d3afe89e6357841bcd6fa6840aa9',
                    'url': '/_next//static/media/aeries-4-yellow.8e299d88.jpg'
                }, {
                    'revision': '449f7887404bfeb6fbf6d0a2318c7021',
                    'url': '/_next//static/media/aeries-5-black.e4d33d4b.jpg'
                }, {
                    'revision': '2f436e2a3a258ea27ecae293590fc523',
                    'url': '/_next//static/media/aeries-6-pink.f8ccda11.jpg'
                }, {
                    'revision': '387d35b37cbd116a650fcc7e7ffc2f52',
                    'url': '/_next//static/media/agora.b522858f.webp'
                }, {
                    'revision': '2e24c122aa0c863a9d40e7cda0b3bb0b',
                    'url': '/_next//static/media/allow-camera-permission-thumbnail.6dce179b.jpg'
                }, {
                    'revision': '4460692a47bb083e12c986935467bd51',
                    'url': '/_next//static/media/allow-notifications.a16af0aa.png'
                }, {
                    'revision': 'd2a9d5922404d58bf68f599c2c58c1c7',
                    'url': '/_next//static/media/alteredalley.f4d787af.webp'
                }, {
                    'revision': '4ea3b61cf2ec55f46addd4e83623325c',
                    'url': '/_next//static/media/anothai-rvt.275ee948.jpg'
                }, {
                    'revision': '08c30e54043814952801cf10cc34314b',
                    'url': '/_next//static/media/avatar-1.57a7aa10.png'
                }, {
                    'revision': 'fda38b799050d27df175cfa75b0452cb',
                    'url': '/_next//static/media/avatar-2.638538ce.png'
                }, {
                    'revision': '6aa2550d64e4a8a0a851ec8f470a695b',
                    'url': '/_next//static/media/avatar-3.10106d49.png'
                }, {
                    'revision': 'f9bdb240cccf5fb6756bb39c179dafa4',
                    'url': '/_next//static/media/avatar-4.969a2f51.png'
                }, {
                    'revision': '81927d09ce91827934f7cb0a65ce7ab6',
                    'url': '/_next//static/media/avatar-5.a24a95d6.png'
                }, {
                    'revision': '986fde369a2df7be8267621a55223c6f',
                    'url': '/_next//static/media/avatar-6.dc5d7691.png'
                }, {
                    'revision': 'e0d64314c458e070eae8fc47b46684cd',
                    'url': '/_next//static/media/avatars.757b7595.webp'
                }, {
                    'revision': 'c91db08d0fa042efe6a5e0f3036fb208',
                    'url': '/_next//static/media/background.8041d8bd.jpg'
                }, {
                    'revision': '064f31d4455e0a381e39ba3a80f67d07',
                    'url': '/_next//static/media/backup-thumbnail-green.2f20b0d9.jpg'
                }, {
                    'revision': 'f7a21017f5070c37fa2a416f7e2c1af6',
                    'url': '/_next//static/media/backup-thumbnail-orange.92b90094.jpg'
                }, {
                    'revision': '2fb3210df9576c15e164ea54aa9d8b6b',
                    'url': '/_next//static/media/backup-thumbnail-pink.08256d01.jpg'
                }, {
                    'revision': 'cb6e7973a01b9b3bae979836861cc3ed',
                    'url': '/_next//static/media/benny-or.ed97ff96.jpg'
                }, {
                    'revision': '5c09ef9c94d67112a0efdac5e90f055a',
                    'url': '/_next//static/media/bike.86fb8024.webp'
                }, {
                    'revision': '934a1d01cb41019190faf7a019bb49b0',
                    'url': '/_next//static/media/bl0ckstone-bg.207f71ff.webp'
                }, {
                    'revision': '6938c2f1ac0c41471c2657cb7f09ad91',
                    'url': '/_next//static/media/bl0ckstone-fg.7b1db91d.webp'
                }, {
                    'revision': 'd35dcf20d7d88f4f6576ee47f2262c57',
                    'url': '/_next//static/media/blockstone.9a9d5153.jpg'
                }, {
                    'revision': '24f35f2fa4074729ff5f99bf93306c16',
                    'url': '/_next//static/media/cactus.3e10809e.webp'
                }, {
                    'revision': 'd2e17a9026068cfc71c86899f34a3c7b',
                    'url': '/_next//static/media/choen-lee.15b0507c.jpg'
                }, {
                    'revision': '36f2cf3a9b0912177f5c2129a34448c5',
                    'url': '/_next//static/media/community-graphic.b68b61ff.jpg'
                }, {
                    'revision': '9a39c5a4ef2862f72cfc9b79efbb4a23',
                    'url': '/_next//static/media/community-hangouts.35842161.jpg'
                }, {
                    'revision': '97b217ba4519234ead696e633731202e',
                    'url': '/_next//static/media/corner.d073e7bf.webp'
                }, {
                    'revision': '6f1fd035b9d4e7ba0766b0ba28ec7f3a',
                    'url': '/_next//static/media/creative-owls.e99fdd17.jpg'
                }, {
                    'revision': '6016e83e4ca9787075781e6bba4dc5aa',
                    'url': '/_next//static/media/crown.0ab931b4.webp'
                }, {
                    'revision': '9a473aad3278fb89457ac165cb7e9d55',
                    'url': '/_next//static/media/custom-environment@2x.03b69899.png'
                }, {
                    'revision': '2fb97892cccecca048efb69a2268eb1b',
                    'url': '/_next//static/media/cybernerdbaby.37af08da.webp'
                }, {
                    'revision': '7e670f21d0587bf9fff6cc15f02427d2',
                    'url': '/_next//static/media/dez-the-creator.c1b2be1d.jpg'
                }, {
                    'revision': 'f68ae03e415e7440845563edd35bc059',
                    'url': '/_next//static/media/diana-olynick.4f986e46.jpg'
                }, {
                    'revision': '4d22cb08de2483bc83be5f8f124cb289',
                    'url': '/_next//static/media/dopestilo-bg.2e403827.webp'
                }, {
                    'revision': '5f9e851b4e612e611e0618f68de971ba',
                    'url': '/_next//static/media/dopestilo-fg.10f786ef.webp'
                }, {
                    'revision': '7b936ff991df39587aca9f16daae0a21',
                    'url': '/_next//static/media/dopestilo.25a58d4d.webp'
                }, {
                    'revision': '569fb37b5864e347013ae8df66b70899',
                    'url': '/_next//static/media/duplicate@2x.089e3183.png'
                }, {
                    'revision': '8a26d11f705e5d93fc0a89e0f5b5fc0b',
                    'url': '/_next//static/media/estelle-so.3ac78903.jpg'
                }, {
                    'revision': 'b0f13966555d684216dd8ea6045d2e69',
                    'url': '/_next//static/media/ethereum-white-on-blue.74f04df1.png'
                }, {
                    'revision': '695d1f356b71e8f740bb076942b26e40',
                    'url': '/_next//static/media/frame-disabled.0dc86528.png'
                }, {
                    'revision': 'cc326b5aba9d38895c5ba8764a864b83',
                    'url': '/_next//static/media/frame-enabled.424843cf.png'
                }, {
                    'revision': '56e8161a274cc79c0ae650e95c677b7f',
                    'url': '/_next//static/media/gardenbee-bg.fc6a1e6c.webp'
                }, {
                    'revision': 'bce72e3904f3fadc8fcf9f97807659d1',
                    'url': '/_next//static/media/gardenbee-fg.a9dc10cd.webp'
                }, {
                    'revision': '94f4a75e96f4cfbabdd11887d91c2a8b',
                    'url': '/_next//static/media/gardenbee.aa791691.webp'
                }, {
                    'revision': '468ef7f576ce6cfef78231938349ab0b',
                    'url': '/_next//static/media/google-play.f6d81089.png'
                }, {
                    'revision': 'f0b253e40f8b8926f878b186361d3ebe',
                    'url': '/_next//static/media/greenbay-crypto.33e0d79b.jpg'
                }, {
                    'revision': 'eda9fc93bbd98d09ecd43c9416d6ff81',
                    'url': '/_next//static/media/hi-cee-cee.9381a43c.jpg'
                }, {
                    'revision': '6e61058d0adfcb1740ac66283e050a50',
                    'url': '/_next//static/media/immersive-galleries.a25fa4a6.jpg'
                }, {
                    'revision': '51e2e0b2e302d7a4843216d0acdca103',
                    'url': '/_next//static/media/iraxlab-bg.2c22ee6e.webp'
                }, {
                    'revision': 'ca1ebead20b271059407e76e1dae8aa3',
                    'url': '/_next//static/media/iraxlab-fg.463a8567.webp'
                }, {
                    'revision': '0b33be0a8299dc5854656cc7aa2b17a0',
                    'url': '/_next//static/media/iraxlab.9636e614.webp'
                }, {
                    'revision': 'e07e43a90bf4f2f40ab0ff50d722ae6f',
                    'url': '/_next//static/media/isle-gallery-0-white.3807ce75.png'
                }, {
                    'revision': '508879afb93c5153fa0a1c1277ab7ec6',
                    'url': '/_next//static/media/isle-gallery-1-brick.18e0424d.jpg'
                }, {
                    'revision': '3f7a0b4d9253a39ae42ec125741fd182',
                    'url': '/_next//static/media/isle-gallery-2-black.a7b71dc4.jpg'
                }, {
                    'revision': 'ae81d3cdfeb5ef6862799905e5c061fc',
                    'url': '/_next//static/media/jayhan.3945376b.jpg'
                }, {
                    'revision': 'a86bac3534449b8ed5a99441dc7bb29b',
                    'url': '/_next//static/media/live-shows.af41f07f.jpg'
                }, {
                    'revision': 'a2eaade92176f8ae19667fad089a67bd',
                    'url': '/_next//static/media/lmdesign.f7648f09.webp'
                }, {
                    'revision': 'd6097b9566da6037ed79a673daf64a88',
                    'url': '/_next//static/media/metaversejosh-bg.9d0d135b.webp'
                }, {
                    'revision': '7299866a42cc5907aeafa5616473ba7c',
                    'url': '/_next//static/media/metaversejosh-fg.7696f53e.webp'
                }, {
                    'revision': 'e5e44f12bc920786f5d48976227b723c',
                    'url': '/_next//static/media/metaversejosh.a6c5f874.webp'
                }, {
                    'revision': '7a64cee45f9817f0add39c28f6b918ca',
                    'url': '/_next//static/media/metx-mike.5fb3f873.jpg'
                }, {
                    'revision': '0aca060f9a0df61a24f29571306454a4',
                    'url': '/_next//static/media/mitch-jackson.5c767276.jpg'
                }, {
                    'revision': 'c525b06dd34719d2f3de0c29cd1dbad4',
                    'url': '/_next//static/media/mouse-controls.a6172804.png'
                }, {
                    'revision': 'cd57f3cefbbb01a544a02970842fc44f',
                    'url': '/_next//static/media/ninja.1809599a.webp'
                }, {
                    'revision': '43b14188f06413e0ad852e68e404d5c9',
                    'url': '/_next//static/media/pair-complete.3fd5d12c.png'
                }, {
                    'revision': 'd2b071413f7fb0c207bbea9673cb4b4f',
                    'url': '/_next//static/media/pedestal-disabled.12443633.png'
                }, {
                    'revision': '39b4b98af7b891639fd13ea3a90cdb6e',
                    'url': '/_next//static/media/pedestal-enabled.bea4e647.png'
                }, {
                    'revision': 'e6cd265d5871431d3ca636db32ac0b06',
                    'url': '/_next//static/media/permission-dialog-pointer.a6c0a32f.png'
                }, {
                    'revision': 'c6d25defeffe4db753df29f1f5d3ccaf',
                    'url': '/_next//static/media/private-space-abstract.f9689d7b.jpg'
                }, {
                    'revision': 'cf3ca20f627e11c120efbe02c8e2f96e',
                    'url': '/_next//static/media/prizem.e48c1b61.jpg'
                }, {
                    'revision': '63f952840422b9aab32350d4aa5940d7',
                    'url': '/_next//static/media/skull.358ab43d.webp'
                }, {
                    'revision': '239b78da3e56a52c4801b29cfe4af8bf',
                    'url': '/_next//static/media/template-icon.e3b28dca.png'
                }, {
                    'revision': '21448e61a47f7baec0c39b9d10996d83',
                    'url': '/_next//static/media/thumbnail-abstract.8c88bf40.png'
                }, {
                    'revision': '4c0e3df3bf6b75760324bf9351948168',
                    'url': '/_next//static/media/thumbnail-agora.bd9b2c01.jpg'
                }, {
                    'revision': 'd23797c7cc67abf5017aca216e174dfe',
                    'url': '/_next//static/media/thumbnail-auditorium.87374b4c.png'
                }, {
                    'revision': 'f4582bbec4cf0b87304ff801fb372dd2',
                    'url': '/_next//static/media/thumbnail-boardroom-lounge.2405afa9.png'
                }, {
                    'revision': '6549ec790a1d684f4d51c8311a5c7835',
                    'url': '/_next//static/media/thumbnail-boardroom-with-a-table.a3c507a8.jpg'
                }, {
                    'revision': '9f640256bf1181e9be19c5f950b656ff',
                    'url': '/_next//static/media/thumbnail-custom.169e1640.png'
                }, {
                    'revision': 'cc704bc5d65fdfefdede7f5b9001eaf9',
                    'url': '/_next//static/media/thumbnail-gallery-obsidian.b7290d64.jpg'
                }, {
                    'revision': '90fa941829a5628fc5b4e02f6012f4bc',
                    'url': '/_next//static/media/thumbnail-mountain-lounge.60525c40.jpg'
                }, {
                    'revision': '4c4f8c5d4381d437f608ff67119b3076',
                    'url': '/_next//static/media/thumbnail-outdoor.c5dd5895.jpg'
                }, {
                    'revision': 'ea57e3fafadd4ea7d35ec4d50d44b39d',
                    'url': '/_next//static/media/thumbnail-private-lobby.b10946e7.jpg'
                }, {
                    'revision': 'ccd47aefe21d2d9a0581bd0c7e715945',
                    'url': '/_next//static/media/tina-bonner.e79831e2.jpg'
                }, {
                    'revision': '1d98ac634581c051a4b42ba2c8af81a6',
                    'url': '/_next//static/media/travis-rice.8f318888.jpg'
                }, {
                    'revision': '5a4aa9912a52a9226c2c4db3e4af5d4e',
                    'url': '/_next//static/media/treeple-dreamers.242788b4.jpg'
                }, {
                    'revision': 'd08904734f72ae2bf64ac8db81b08d5a',
                    'url': '/_next//static/media/unity.c826c4f2.webp'
                }, {
                    'revision': '1eab6b2f5b6485621def829feb6cd3d6',
                    'url': '/_next//static/media/updated-terms.f87b6f50.png'
                }, {
                    'revision': '9e37609d0853c9c1ca658d1f07cd12b7',
                    'url': '/_next//static/media/yacine-ait-kaci.a5596288.jpg'
                }, {
                    'revision': 'a56357eaacb1e7b19b5f762f7fc74177',
                    'url': '/_next/build-manifest.json'
                }, {
                    'revision': null,
                    'url': '/_next/exclusible-logo.827f487.svg'
                }, {
                    'revision': null,
                    'url': '/_next/open-sea-logo.0bf8232.svg'
                }, {
                    'revision': null,
                    'url': '/_next/polygon-studios-logo.4edbcc8.svg'
                }, {
                    'revision': 'f515e250ad3762b87d85d1716da755cf',
                    'url': '/_next/react-loadable-manifest.json'
                }, {
                    'revision': null,
                    'url': '/_next/rpm-logo.c51b592.svg'
                }, {
                    'revision': '2df8d2c9577d5d875abdf125662d188a',
                    'url': '/_next/server/middleware-build-manifest.js'
                }, {
                    'revision': '0c988d44ec1606602c788ecd9e51427a',
                    'url': '/_next/server/middleware-react-loadable-manifest.js'
                }, {
                    'revision': '6f797f8e06c594386354da5a83b422ed',
                    'url': '/_next/server/next-font-manifest.js'
                }, {
                    'revision': 'c8573aa004774d292ee30bcd590d4337',
                    'url': '/_next/server/next-font-manifest.json'
                }, {
                    'revision': '33ef94439354cfbcb05f89aa41267333',
                    'url': '/_next/static/.well-known/apple-app-site-association'
                }, {
                    'revision': 'a91570298a01d6745ebbb6821fba2719',
                    'url': '/_next/static/.well-known/assetlinks.json'
                }, {
                    'revision': '58d8d5b20e16a7c755fee35f61cf23f9',
                    'url': '/_next/static/WL4Ongt5xNxa5Gx3Y91cI/_buildManifest.js'
                }, {
                    'revision': 'b6652df95db52feb4daf4eca35380933',
                    'url': '/_next/static/WL4Ongt5xNxa5Gx3Y91cI/_ssgManifest.js'
                }, {
                    'revision': 'f4386e3b474e484ef3a28dd82ccb4796',
                    'url': '/_next/static/android-chrome-192x192.png'
                }, {
                    'revision': '89138ca2e5716fcd0393c15853ba04da',
                    'url': '/_next/static/android-chrome-512x512.png'
                }, {
                    'revision': '14f9d4329576b9d92ccb5549c2ea86ca',
                    'url': '/_next/static/apple-touch-icon.png'
                }, {
                    'revision': '7f2b2f8a4c6863cc7be0a1e4b7963bd9',
                    'url': '/_next/static/browserconfig.xml'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/020d8314.4f3b1a4fa3c98bd5.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/1353-3358ece24bdfa21c.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/1411-31ca2e35e2d5e36c.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/148-1b2192ff4403fa22.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/165-dae6e535575cba54.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/1686-62802f5aa33ae86d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/1688-ac25a38e4e1cb5ec.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/1743016e.47278058e903fd35.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/17f0de3f.82f6ee6b8c07d27f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/1897.13d4f2bfd920ce57.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/2000-98c7acfe76c28e8b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/2242-fff0ef33da4d4490.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/2289-0ee5966070f71327.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/2292.910341b6ae2b2730.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/255-8a8c0df9176d2ae6.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/2911-f2a7c8ab4c34e198.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/2edb282b.4f046aae50401924.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3036-44d2bbe687ec00aa.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3041.d0ab8266e571792b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3353-ef09466d606e27f3.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3379-34f55c519388369b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/340.9d29898eb6dc3620.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3439-23266134147b2155.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3556-d9f2264606701879.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/3897.17d651964dbb5cd3.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4015.77b580d5d5391dd8.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4185-4cbaeb323c52182e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4371.96d19be606803e1a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4410.dc31b80f07c6f29b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4429.aaa86515aa2672a5.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4451.a2f82ace970670be.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4485-33d407b25dd05b0c.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4577-b540c4f718c23ff6.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/4734.bcb03d3adbd49dba.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/5148-acaae3c84884b9ee.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/517.d9f681e33e59f2b4.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/51c52c66.3f8fbdded8d6bb62.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/5203.3c32835007a71980.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/5301-a6e7450f75ef8f25.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/572.c8c5de5f44740258.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/5818-cdaf26f9c0322f88.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/5977.09ea43bb09b9743f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6441.4052a4d0ae8026a7.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6512-5d09c1be163f6493.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6577-527aab728b24436b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6617.a7320487f2720c2e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6625.7a31c4e8c2157a79.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6689.b9eb01ba50c0306e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/6887-bf210fb6fd7f0c6d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/7104.db6b852925141631.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/7122.48b7d0fa6acd3508.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/736-5d6ada8fbfec987f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/7393.722b6f155ab52e5a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/7413e8b9.111056a7fffeba69.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/7620-816b47dc609b1f78.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/7916-53b417506bc3f086.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/8121.792a4846ca8dcbb5.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/8199-132e43f14f616bf2.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/8220-3b379839d6b96ea8.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/8421-fd2ba219a9f6e351.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/8570-360d5186731e1de3.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/8854.81bf5a0a425bd314.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9097-b46742872dc225e5.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9248-9fb302a1f14962dd.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9250.a229553fe863ba08.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9258.87e715378ba49273.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9414.f1bfc51248b33fd0.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9498-06b7c4d46082d6a8.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/959.f06cd398318c1d7b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9611-269519895f09bb5e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/9899-9a7f077dfbb1e10d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/b54760fc.5cdc0a9345ed7244.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/backpack-item-details.dad900a718c03e41.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/badge-modal-contents.c22d560e428d82ab.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/banned-modal-content.d146e7aa71c3259a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/cca69633.f4a2c93aada7fc4e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/chat-panel.8a2fa517e20163f8.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/connect-solana-button.04b83e2f29fdea30.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/content-menu.bc928293c4c15c7d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/create-custom-env-modal-content.f3bc247a881bad34.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/create-portal-modal-content.c1a0fd1721648dae.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/cubemap-preview.a37d3e96b31c6d58.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/dance-streak-modal-content.f1ce28ff3699c2a9.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/debug-settings.33e8aa68e423db31.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/edit-category-modal-contents.4ceedc6b525f6128.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/edit-space-info.8b806378e65e36cd.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/end-go-live-modal.74a5fb121bddd34c.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/fd0ff8c8.166c4845956e4a43.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/feed-history-modal-contents.08386ecb35d8dfdb.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/feed-spaces-grid.0cdc22238781f3e8.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/feed-spaces-row.9d7e08dd84c02a5e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/feed-spaces-trailers.1e24862230d538ba.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/filming-mode-modal.54b852e4a557d61d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/framer-motion-features.d0725df7173fd8c0.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/framework-22b52409193a9a55.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/global-modals.397e00cb0c545662.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/go-live-modal.a04dccece0f6245f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/host-tools-modal.cebda3e931ec6bad.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/login-modal-content.f4c461fe36a08eac.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/main-6c954c8fb79c8fdc.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/manage-admins.d7838a63362f0e3c.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/manage-banned.9b6b07dce77fad06.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/manage-categories.37db52f6058a1c0a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/media-and-room-settings-modal.30800398e1953164.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/mobile-banner-view.d2b31cdff24e1b63.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/notif-permission-modal-content.2e41495207cdf34a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/object-inspector.46f93574664ec65e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/page-transition-loader.e748c16896dbc13e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/404-cf97093f58548448.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/500-95b1949eb1b14735.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/_app-7393b0f7d44e31c4.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/_error-e9b71f96f6eaf53f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/_prototype-92385751753deabf.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/admin-f0f4af1656c91b55.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/categories/[category]-c7fe67474b544553.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/content-3c28c32d5f58705e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/create-851235860d011b29.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/curate/[[...tab]]-22457d3cbc0f6f8a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/download-d6f1deefd6bab16f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/index-3d40dc211428ceb6.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/integrations-77e9f0e36a02440a.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/login-4d0ca86545b02e62.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/login/metamask-c4dfc511be3892cc.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/logout-6523a28dd415540b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/pair-1b444a6d24604d6d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/park-693614a7f37bce7f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/privacy-f4ab3f2bedbd79dc.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/profile-a6940fd760d161e7.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/profile/avatar-118ce6a2d50d4ae4.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/reset/password-27485a4d61eac857.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/s/[slugAndId]-dfd9c6232457752b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/sandbox-d6312dcea9174c31.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/search-bcd928481e3ba06d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/spatian-guides-b73c484a4e048c8f.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/studio/[tab]-0659947b2ac9f052.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/studio/worlds/[worldId]/[worldTab]-d03cca92511bb768.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/studio/worlds/[worldId]/badges/[badgeId]-47fddf2c7e883c69.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/studio/worlds/[worldId]/badges/new-e2e9565c66a53a7b.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/studio/worlds/[worldId]/items/[itemId]-883cf89daa3cde99.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/studio/worlds/[worldId]/items/new-77a068f24a49ef71.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/team/create-fa57e845f1114a51.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/team/invite-654bed6a5905d575.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/terms-8ba9a27c82f90c69.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/toolkit-c7726f86677c7059.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/u/[username]-e1703b8dea0fff39.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/upgrade-db9751eaa1dc041d.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/verify/email-52c9e3fd8a278d8e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/pages/welcome/[[...step]]-9abf1ad2b7ba8738.js'
                }, {
                    'revision': '837c0df77fd5009c9e46d446188ecfd0',
                    'url': '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/profile-menu.a8f3e1fd2af02fb0.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/quest-complete-modal-contents.4ce8e031619d07d1.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/quest-status-pill-contents.f20cc19703e1c0ab.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/rename-modal-content.0e3fc68b24a04886.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/report-space-content.067286186fefb839.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/room-rtc-manager.6964946534793f60.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/rtc-local-client.3ad49748da0105d3.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/rtc-media-capture.7993b229f1361b6e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/sandbox-mobile-interstitial.410a5087c2f707a5.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/share-to-socials-modal.04f8652b0a38fd1e.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/shop-item-details.d566e84474c96afc.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/spaces-picker-modal-contents.45b4f062c1c8a454.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/switch-meeting.703f11ff4b33df47.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/toast-component.cc09a61c002ae876.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/token-gate-access-modal.017a98b8a72cd583.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/token-gate-welcome-modal.9a88382416000dba.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/unity-client-saga.0d41dc9a3dc8c4ea.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/user-profile-editor-modal.9ef8a6ee65ad3962.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/chunks/webpack-7739717d949243aa.js'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/138929114e1a2ba8.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/1d2e129b95133463.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/1f12b187a00b4251.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/1fdc4471116c4da9.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/210d345d43aebf05.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/2166d23c1c4229dc.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/250d8532cfd591e1.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/26cee4a6f03629be.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/28cda0a380b4e2b0.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/2a9c92a675fd4ea8.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/2cee9276c3215619.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/2d6534e31305f14e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/32db746d3afd6bf6.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/3762f5e88130609a.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/399552b4b76f9d64.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/3a7e07e944f414d4.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/3bc770230b513126.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/3c0b866b342b7da5.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/3fb8aa9ff3d696d8.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/4375344e4792aeef.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/491b8ad822466875.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/4c503fb6d0ceb4e0.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/4ea498a0058dd5f3.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/4f65a2879a17f822.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/52b8df382573c892.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/550d2c117b8ffd9e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/56be2e9e4e8f7777.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/56d2efd8daf20fe6.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/5cc6dc0748417a45.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/608b8d9baab0c753.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/620400be118f6981.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/63b6a396fbd9968e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/64191ea339f0c3eb.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/6ad2a1b9cf8e8fe9.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/70e8489727ecbad2.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/73a7f128d326a2bb.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/7917f07e4d67dd0c.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/7add03becb7369c5.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/7bf951cb54cd4db3.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/8019a37679914e1b.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/80e2aa72fa51134d.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/8eb683067768164d.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/961019f3ca52100b.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/9a9d5f7a45fdffe4.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/9ef858bf23a39661.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/a2a90fa798a2f4dc.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/a554e2b8aaf1d226.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/a6f552768e762ce7.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/b0498f6b9170dc01.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/b53817acf10b4753.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/b61b52b1430c436f.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/b686fe8e1f1d18e2.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/b920e89cc37bd241.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/bdd3dc8ed10e4f1b.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/beb60d0832f4047e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/bf78489de39194ca.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/c0497e0d579c93d5.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/c1996f669ce33733.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/c24e943b6db6faf7.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/c2f74ee7405e48c3.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/ca1e9775d4939a1c.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/d0e41ff37f720597.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/d2fc529721843672.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/d348fa99ef41884e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/d4f856e39300b4fd.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/d7f4cc8810c85569.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/da8aca6c31adcf4e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/dbebc4ccb51e08e4.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/e098d87d45be56cb.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/e2204c70bec5ec01.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/e4cf0b8a0cefda8e.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/e50ca7cb90ec15e5.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/e920b990dd69b022.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/eb949d80216ad1b3.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/efcb7c6f12d82f51.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/f13ce8013455d66f.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/f2a768ca64d45949.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/fdce98ca4a2a9a32.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/ff67423688a39eb7.css'
                }, {
                    'revision': null,
                    'url': '/_next/static/css/ff708cffef7f4d8f.css'
                }, {
                    'revision': 'bd0e1ddfd890177be5b4cc15c51569c1',
                    'url': '/_next/static/favicon-16x16.png'
                }, {
                    'revision': '729d13bdf43084cbfac8c0fce19c9ec3',
                    'url': '/_next/static/favicon-32x32.png'
                }, {
                    'revision': 'eac5cee5a78cfbb99365d650d4705525',
                    'url': '/_next/static/favicon.ico'
                }, {
                    'revision': null,
                    'url': '/_next/static/media/pair-complete.6034bc4a99153ed3.mp4'
                }, {
                    'revision': null,
                    'url': '/_next/static/media/silence.5d8ee46af2c85f58.mp3'
                }, {
                    'revision': null,
                    'url': '/_next/static/microphone-recorder.1c511eaad645cc08.worklet.js'
                }, {
                    'revision': '0f1034f862d94a57535494d51bfa5a1b',
                    'url': '/_next/static/mstile-144x144.png'
                }, {
                    'revision': '27af49910d7fdf7dcb920a13c0813222',
                    'url': '/_next/static/mstile-150x150.png'
                }, {
                    'revision': 'a25da28307428671fb7d9c16b60c0447',
                    'url': '/_next/static/mstile-310x150.png'
                }, {
                    'revision': 'b36546be5470ace747f0b4d5e64eae94',
                    'url': '/_next/static/mstile-310x310.png'
                }, {
                    'revision': '997dbc495cfd548caea1ec6adfa205d1',
                    'url': '/_next/static/mstile-70x70.png'
                }, {
                    'revision': null,
                    'url': '/_next/static/photon/libopus.3d14bd5db6a492c3bc941b6f39b4b983.wasm.br'
                }, {
                    'revision': '91eeada4ee03121546c072bb6a658b92',
                    'url': '/_next/static/safari-pinned-tab.svg'
                }, {
                    'revision': '122f073cbf6925949227ca3ef5a10e8e',
                    'url': '/_next/static/site.webmanifest'
                }, {
                    'revision': null,
                    'url': '/_next/the-fabricant-logo.c8aee89.svg'
                }, {
                    'revision': null,
                    'url': '/_next/unity-wordmark.e6a555f.svg'
                }, {
                    'revision': null,
                    'url': '/_next/vogue-singapore-logo.b30291d.svg'
                }]);
                let t = t => t.origin === self.origin && e.getCacheKeyForURL(t.pathname);
                self.addEventListener("activate", () => {
                    e.activate()
                }), Q(e => {
                    let {
                        url: n
                    } = e;
                    return t(n)
                }, async t => {
                    let {
                        request: n,
                        url: i
                    } = t, a = await e.matchPrecache(n);
                    if (a) return a;
                    let r = e.getCacheKeyForURL(i.href),
                        o = new Request(r, {
                            credentials: "same-origin"
                        }),
                        s = await fetch(o);
                    if (s.ok) {
                        let e = await self.caches.open(es);
                        await e.put(o, s.clone())
                    }
                    return s
                })
            }() : self.__WB_DISABLE_DEV_LOGS = !0
        }()
}();