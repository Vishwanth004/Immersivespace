(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6441], {
        56441: function(e, t, r) {
            var o, n, i, a, s, u, c, d, l, p, _, f, E, T, w, y = r(34406),
                O = void 0 !== O ? O : {};
            O.onRuntimeInitialized = function() {
                O.onload && O.onload(), O.loaded = !0
            }, O.locateFile = function(e) {
                return "undefined" != typeof LIBOPUS_WASM_URL ? LIBOPUS_WASM_URL : e
            };
            var m = {};
            for (o in O) O.hasOwnProperty(o) && (m[o] = O[o]);
            var R = [],
                b = !1,
                g = !1,
                h = !1,
                M = !1;
            if (b = !0, g = "function" == typeof importScripts, h = "object" == typeof y && "object" == typeof y.versions && "string" == typeof y.versions.node && !b && !g, M = !b && !h && !g, O.ENVIRONMENT) throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
            var A = "";
            if (h) A = "//", n = function(e, t) {
                return a || (a = r(67234)), s || (s = r(84371)), e = s.normalize(e), a.readFileSync(e, t ? null : "utf8")
            }, i = function(e) {
                var t = n(e, !0);
                return t.buffer || (t = new Uint8Array(t)), N(t.buffer), t
            }, y.argv.length > 1 && y.argv[1].replace(/\\/g, "/"), R = y.argv.slice(2), e.exports = O, y.on("uncaughtException", function(e) {
                if (!(e instanceof eA)) throw e
            }), y.on("unhandledRejection", z), O.inspect = function() {
                return "[Emscripten Module object]"
            };
            else if (M) "undefined" != typeof read && (n = function(e) {
                return read(e)
            }), i = function(e) {
                var t;
                return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (N("object" == typeof(t = read(e, "binary"))), t)
            }, "undefined" != typeof scriptArgs ? R = scriptArgs : "undefined" != typeof arguments && (R = arguments), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
            else if (b || g) g ? A = self.location.href : document.currentScript && (A = document.currentScript.src), A = 0 !== A.indexOf("blob:") ? A.substr(0, A.lastIndexOf("/") + 1) : "", n = function(e) {
                var t = new XMLHttpRequest;
                return t.open("GET", e, !1), t.send(null), t.responseText
            }, g && (i = function(e) {
                var t = new XMLHttpRequest;
                return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response)
            });
            else throw Error("environment detection error");
            var D = O.print || window.spatialWebGLLogger.debug.bind(window.spatialWebGLLogger),
                P = O.printErr || window.spatialWebGLLogger.warn.bind(window.spatialWebGLLogger);
            for (o in m) m.hasOwnProperty(o) && (O[o] = m[o]);

            function I(e) {
                I.shown || (I.shown = {}), I.shown[e] || (I.shown[e] = 1, P(e))
            }
            m = null, O.arguments && (R = O.arguments), Object.getOwnPropertyDescriptor(O, "arguments") || Object.defineProperty(O, "arguments", {
                configurable: !0,
                get: function() {
                    z("Module.arguments has been replaced with plain arguments_")
                }
            }), O.thisProgram && O.thisProgram, Object.getOwnPropertyDescriptor(O, "thisProgram") || Object.defineProperty(O, "thisProgram", {
                configurable: !0,
                get: function() {
                    z("Module.thisProgram has been replaced with plain thisProgram")
                }
            }), O.quit && O.quit, Object.getOwnPropertyDescriptor(O, "quit") || Object.defineProperty(O, "quit", {
                configurable: !0,
                get: function() {
                    z("Module.quit has been replaced with plain quit_")
                }
            }), N(void 0 === O.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), N(void 0 === O.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), N(void 0 === O.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), N(void 0 === O.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), N(void 0 === O.read, "Module.read option was removed (modify read_ in JS)"), N(void 0 === O.readAsync, "Module.readAsync option was removed (modify readAsync in JS)"), N(void 0 === O.readBinary, "Module.readBinary option was removed (modify readBinary in JS)"), N(void 0 === O.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"), Object.getOwnPropertyDescriptor(O, "read") || Object.defineProperty(O, "read", {
                configurable: !0,
                get: function() {
                    z("Module.read has been replaced with plain read_")
                }
            }), Object.getOwnPropertyDescriptor(O, "readAsync") || Object.defineProperty(O, "readAsync", {
                configurable: !0,
                get: function() {
                    z("Module.readAsync has been replaced with plain readAsync")
                }
            }), Object.getOwnPropertyDescriptor(O, "readBinary") || Object.defineProperty(O, "readBinary", {
                configurable: !0,
                get: function() {
                    z("Module.readBinary has been replaced with plain readBinary")
                }
            }), eM = function() {
                z("cannot use the stack before compiled code is ready to run, and has provided stack access")
            }, O.wasmBinary && (u = O.wasmBinary), Object.getOwnPropertyDescriptor(O, "wasmBinary") || Object.defineProperty(O, "wasmBinary", {
                configurable: !0,
                get: function() {
                    z("Module.wasmBinary has been replaced with plain wasmBinary")
                }
            }), O.noExitRuntime && O.noExitRuntime, Object.getOwnPropertyDescriptor(O, "noExitRuntime") || Object.defineProperty(O, "noExitRuntime", {
                configurable: !0,
                get: function() {
                    z("Module.noExitRuntime has been replaced with plain noExitRuntime")
                }
            }), "object" != typeof WebAssembly && z("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
            var F = new WebAssembly.Table({
                    initial: 3,
                    maximum: 3,
                    element: "anyfunc"
                }),
                x = !1;

            function N(e, t) {
                e || z("Assertion failed: " + t)
            }
            "undefined" != typeof TextDecoder && new TextDecoder("utf8"), "undefined" != typeof TextDecoder && new TextDecoder("utf-16le"), N(!0, "stack must start aligned"), N(!0, "heap must start aligned"), O.TOTAL_STACK && N(5242880 === O.TOTAL_STACK, "the stack size can no longer be determined at runtime");
            var S = O.TOTAL_MEMORY || 16777216;

            function v() {
                N(!0), f[10389] = 34821223, f[10390] = 2310721022, _[0] = 1668509029
            }

            function X() {
                var e = f[10389],
                    t = f[10390];
                (34821223 != e || 2310721022 != t) && z("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + t.toString(16) + " " + e.toString(16)), 1668509029 !== _[0] && z("Runtime error: The application has corrupted its heap memory area (address zero)!")
            }

            function U(e) {
                for (; e.length > 0;) {
                    var t = e.shift();
                    if ("function" == typeof t) {
                        t();
                        continue
                    }
                    var r = t.func;
                    "number" == typeof r ? void 0 === t.arg ? O.dynCall_v(r) : O.dynCall_vi(r, t.arg) : r(void 0 === t.arg ? null : t.arg)
                }
            }
            Object.getOwnPropertyDescriptor(O, "TOTAL_MEMORY") || Object.defineProperty(O, "TOTAL_MEMORY", {
                    configurable: !0,
                    get: function() {
                        z("Module.TOTAL_MEMORY has been replaced with plain INITIAL_TOTAL_MEMORY")
                    }
                }), N(S >= 5242880, "TOTAL_MEMORY should be larger than TOTAL_STACK, was " + S + "! (TOTAL_STACK=5242880)"), N("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"), (c = O.wasmMemory ? O.wasmMemory : new WebAssembly.Memory({
                    initial: S / 65536,
                    maximum: S / 65536
                })) && (d = c.buffer), N((S = d.byteLength) % 65536 == 0), d = T = d, O.HEAP8 = l = new Int8Array(T), O.HEAP16 = new Int16Array(T), O.HEAP32 = _ = new Int32Array(T), O.HEAPU8 = p = new Uint8Array(T), O.HEAPU16 = new Uint16Array(T), O.HEAPU32 = f = new Uint32Array(T), O.HEAPF32 = new Float32Array(T), O.HEAPF64 = new Float64Array(T), _[10348] = 5284432,
                function() {
                    var e = new Int16Array(1),
                        t = new Int8Array(e.buffer);
                    if (e[0] = 25459, 115 !== t[0] || 99 !== t[1]) throw "Runtime error: expected the system to be little-endian!"
                }();
            var k = [],
                L = [],
                j = [],
                H = [],
                Q = !1;
            N(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), N(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), N(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), N(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
            var C = 0,
                B = null,
                W = null,
                Y = {};

            function z(e) {
                var t;
                throw O.onAbort && O.onAbort(e), D(e += ""), P(e), x = !0, e = "abort(" + e + ") at " + (t = function() {
                    var e = Error();
                    if (!e.stack) {
                        try {
                            throw Error(0)
                        } catch (t) {
                            e = t
                        }
                        if (!e.stack) return "(no stack trace available)"
                    }
                    return e.stack.toString()
                }(), O.extraStackTrace && (t += "\n" + O.extraStackTrace()), t.replace(/\b_Z[\w\d_]+/g, function(e) {
                    var t = (I("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), e);
                    return e === t ? e : t + " [" + e + "]"
                })), new WebAssembly.RuntimeError(e)
            }
            O.preloadedImages = {}, O.preloadedAudios = {};
            var V = {
                error: function() {
                    z("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1")
                },
                init: function() {
                    V.error()
                },
                createDataFile: function() {
                    V.error()
                },
                createPreloadedFile: function() {
                    V.error()
                },
                createLazyFile: function() {
                    V.error()
                },
                open: function() {
                    V.error()
                },
                mkdev: function() {
                    V.error()
                },
                registerDevice: function() {
                    V.error()
                },
                analyzePath: function() {
                    V.error()
                },
                loadFilesFromDB: function() {
                    V.error()
                },
                ErrnoError: function() {
                    V.error()
                }
            };
            O.FS_createDataFile = V.createDataFile, O.FS_createPreloadedFile = V.createPreloadedFile;
            var G = "data:application/octet-stream;base64,";

            function q(e) {
                return String.prototype.startsWith ? e.startsWith(G) : 0 === e.indexOf(G)
            }
            var J = "/libopus.wasm";

            function K() {
                try {
                    if (u) return new Uint8Array(u);
                    if (i) return i(J);
                    throw "both async and sync fetching of the wasm failed"
                } catch (e) {
                    z(e)
                }
            }
            q(J) || (w = J, J = O.locateFile ? O.locateFile(w, A) : A + w), L.push({
                func: function() {
                    eh()
                }
            });
            var Z = {
                    __handle_stack_overflow: function() {
                        z("stack overflow")
                    },
                    __lock: function() {},
                    __unlock: function() {},
                    emscripten_get_sbrk_ptr: function() {
                        return 41392
                    },
                    emscripten_memcpy_big: function(e, t, r) {
                        p.set(p.subarray(t, t + r), e)
                    },
                    emscripten_resize_heap: function(e) {
                        z("Cannot enlarge memory arrays to size " + e + " bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + l.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
                    },
                    memory: c,
                    table: F
                },
                $ = function() {
                    var e, t = {
                        env: Z,
                        wasi_snapshot_preview1: Z
                    };

                    function r(e, t) {
                        var r = e.exports;
                        O.asm = r,
                            function(e) {
                                if (C--, O.monitorRunDependencies && O.monitorRunDependencies(C), e ? (N(Y[e]), delete Y[e]) : P("warning: run dependency removed without ID"), 0 == C && (null !== B && (clearInterval(B), B = null), W)) {
                                    var t = W;
                                    W = null, t()
                                }
                            }("wasm-instantiate")
                    }
                    e = "wasm-instantiate", C++, O.monitorRunDependencies && O.monitorRunDependencies(C), e ? (N(!Y[e]), Y[e] = 1, null === B && "undefined" != typeof setInterval && (B = setInterval(function() {
                        if (x) {
                            clearInterval(B), B = null;
                            return
                        }
                        var e = !1;
                        for (var t in Y) e || (e = !0, P("still waiting on run dependencies:")), P("dependency: " + t);
                        e && P("(end of list)")
                    }, 1e4))) : P("warning: run dependency added without ID");
                    var o = O;

                    function n(e) {
                        N(O === o, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), o = null, r(e.instance)
                    }

                    function i(e) {
                        return (!u && (b || g) && "function" == typeof fetch ? fetch(J, {
                            credentials: "same-origin"
                        }).then(function(e) {
                            if (!e.ok) throw "failed to load wasm binary file at '" + J + "'";
                            return e.arrayBuffer()
                        }).catch(function() {
                            return K()
                        }) : new Promise(function(e, t) {
                            e(K())
                        })).then(function(e) {
                            return WebAssembly.instantiate(e, t)
                        }).then(e, function(e) {
                            P("failed to asynchronously prepare wasm: " + e), z(e)
                        })
                    }
                    if (O.instantiateWasm) try {
                        return O.instantiateWasm(t, r)
                    } catch (e) {
                        return P("Module.instantiateWasm callback failed with error: " + e), !1
                    }
                    return ! function() {
                        if (u || "function" != typeof WebAssembly.instantiateStreaming || q(J) || "function" != typeof fetch) return i(n);
                        fetch(J, {
                            credentials: "same-origin"
                        }).then(function(e) {
                            return WebAssembly.instantiateStreaming(e, t).then(n, function(e) {
                                P("wasm streaming compile failed: " + e), P("falling back to ArrayBuffer instantiation"), i(n)
                            })
                        })
                    }(), {}
                }(),
                ee = $.__wasm_call_ctors;
            $.__wasm_call_ctors = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ee.apply(null, arguments)
            };
            var et = $.opus_encoder_ctl_set;
            $.opus_encoder_ctl_set = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), et.apply(null, arguments)
            };
            var er = $.opus_encoder_ctl_get;
            $.opus_encoder_ctl_get = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), er.apply(null, arguments)
            };
            var eo = $.opus_strerror;
            $.opus_strerror = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eo.apply(null, arguments)
            };
            var en = $.opus_get_version_string;
            $.opus_get_version_string = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), en.apply(null, arguments)
            };
            var ei = $.opus_decoder_create;
            $.opus_decoder_create = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ei.apply(null, arguments)
            };
            var ea = $.opus_packet_get_bandwidth;
            $.opus_packet_get_bandwidth = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ea.apply(null, arguments)
            };
            var es = $.opus_packet_get_nb_channels;
            $.opus_packet_get_nb_channels = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), es.apply(null, arguments)
            };
            var eu = $.opus_decode;
            $.opus_decode = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eu.apply(null, arguments)
            };
            var ec = $.opus_decode_float;
            $.opus_decode_float = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ec.apply(null, arguments)
            };
            var ed = $.opus_encoder_create;
            $.opus_encoder_create = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ed.apply(null, arguments)
            };
            var el = $.opus_encode;
            $.opus_encode = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), el.apply(null, arguments)
            };
            var ep = $.opus_encode_float;
            $.opus_encode_float = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ep.apply(null, arguments)
            };
            var e_ = $.malloc;
            $.malloc = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), e_.apply(null, arguments)
            };
            var ef = $.free;
            $.free = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ef.apply(null, arguments)
            };
            var eE = $.fflush;
            $.fflush = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eE.apply(null, arguments)
            };
            var eT = $.__errno_location;
            $.__errno_location = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eT.apply(null, arguments)
            };
            var ew = $.setThrew;
            $.setThrew = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ew.apply(null, arguments)
            };
            var ey = $.__set_stack_limit;
            $.__set_stack_limit = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ey.apply(null, arguments)
            };
            var eO = $.stackSave;
            $.stackSave = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eO.apply(null, arguments)
            };
            var em = $.stackAlloc;
            $.stackAlloc = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), em.apply(null, arguments)
            };
            var eR = $.stackRestore;
            $.stackRestore = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eR.apply(null, arguments)
            };
            var eb = $.__growWasmMemory;
            $.__growWasmMemory = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eb.apply(null, arguments)
            };
            var eg = $.dynCall_viiiiiii;
            $.dynCall_viiiiiii = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), eg.apply(null, arguments)
            }, O.asm = $;
            var eh = O.___wasm_call_ctors = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.__wasm_call_ctors.apply(null, arguments)
            };
            O._opus_encoder_ctl_set = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_encoder_ctl_set.apply(null, arguments)
            }, O._opus_encoder_ctl_get = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_encoder_ctl_get.apply(null, arguments)
            }, O._opus_strerror = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_strerror.apply(null, arguments)
            }, O._opus_get_version_string = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_get_version_string.apply(null, arguments)
            }, O._opus_decoder_create = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_decoder_create.apply(null, arguments)
            }, O._opus_packet_get_bandwidth = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_packet_get_bandwidth.apply(null, arguments)
            }, O._opus_packet_get_nb_channels = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_packet_get_nb_channels.apply(null, arguments)
            }, O._opus_decode = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_decode.apply(null, arguments)
            }, O._opus_decode_float = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_decode_float.apply(null, arguments)
            }, O._opus_encoder_create = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_encoder_create.apply(null, arguments)
            }, O._opus_encode = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_encode.apply(null, arguments)
            }, O._opus_encode_float = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.opus_encode_float.apply(null, arguments)
            }, O._malloc = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.malloc.apply(null, arguments)
            }, O._free = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.free.apply(null, arguments)
            }, O._fflush = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.fflush.apply(null, arguments)
            }, O.___errno_location = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.__errno_location.apply(null, arguments)
            }, O._setThrew = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.setThrew.apply(null, arguments)
            }, O.___set_stack_limit = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.__set_stack_limit.apply(null, arguments)
            };
            var eM = O.stackSave = function() {
                return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.stackSave.apply(null, arguments)
            };

            function eA(e) {
                this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
            }

            function eD(e) {
                e = e || R, !(C > 0) && (v(), function() {
                    if (O.preRun)
                        for ("function" == typeof O.preRun && (O.preRun = [O.preRun]); O.preRun.length;) {
                            var e;
                            e = O.preRun.shift(), k.unshift(e)
                        }
                    U(k)
                }(), C > 0 || (O.setStatus ? (O.setStatus("Running..."), setTimeout(function() {
                    setTimeout(function() {
                        O.setStatus("")
                    }, 1), t()
                }, 1)) : t(), X()));

                function t() {
                    !E && (E = !0, x || (X(), N(!Q), Q = !0, U(L), X(), U(j), O.onRuntimeInitialized && O.onRuntimeInitialized(), N(!O._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), function() {
                        if (X(), O.postRun)
                            for ("function" == typeof O.postRun && (O.postRun = [O.postRun]); O.postRun.length;) {
                                var e;
                                e = O.postRun.shift(), H.unshift(e)
                            }
                        U(H)
                    }()))
                }
            }
            if (O.stackAlloc = function() {
                    return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.stackAlloc.apply(null, arguments)
                }, O.stackRestore = function() {
                    return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.stackRestore.apply(null, arguments)
                }, O.__growWasmMemory = function() {
                    return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.__growWasmMemory.apply(null, arguments)
                }, O.dynCall_viiiiiii = function() {
                    return N(Q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), O.asm.dynCall_viiiiiii.apply(null, arguments)
                }, O.asm = $, Object.getOwnPropertyDescriptor(O, "intArrayFromString") || (O.intArrayFromString = function() {
                    z("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "intArrayToString") || (O.intArrayToString = function() {
                    z("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "ccall") || (O.ccall = function() {
                    z("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "cwrap") || (O.cwrap = function() {
                    z("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "setValue") || (O.setValue = function() {
                    z("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getValue") || (O.getValue = function() {
                    z("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "allocate") || (O.allocate = function() {
                    z("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getMemory") || (O.getMemory = function() {
                    z("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "AsciiToString") || (O.AsciiToString = function() {
                    z("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stringToAscii") || (O.stringToAscii = function() {
                    z("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "UTF8ArrayToString") || (O.UTF8ArrayToString = function() {
                    z("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "UTF8ToString") || (O.UTF8ToString = function() {
                    z("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stringToUTF8Array") || (O.stringToUTF8Array = function() {
                    z("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stringToUTF8") || (O.stringToUTF8 = function() {
                    z("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "lengthBytesUTF8") || (O.lengthBytesUTF8 = function() {
                    z("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "UTF16ToString") || (O.UTF16ToString = function() {
                    z("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stringToUTF16") || (O.stringToUTF16 = function() {
                    z("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "lengthBytesUTF16") || (O.lengthBytesUTF16 = function() {
                    z("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "UTF32ToString") || (O.UTF32ToString = function() {
                    z("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stringToUTF32") || (O.stringToUTF32 = function() {
                    z("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "lengthBytesUTF32") || (O.lengthBytesUTF32 = function() {
                    z("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "allocateUTF8") || (O.allocateUTF8 = function() {
                    z("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stackTrace") || (O.stackTrace = function() {
                    z("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addOnPreRun") || (O.addOnPreRun = function() {
                    z("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addOnInit") || (O.addOnInit = function() {
                    z("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addOnPreMain") || (O.addOnPreMain = function() {
                    z("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addOnExit") || (O.addOnExit = function() {
                    z("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addOnPostRun") || (O.addOnPostRun = function() {
                    z("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "writeStringToMemory") || (O.writeStringToMemory = function() {
                    z("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "writeArrayToMemory") || (O.writeArrayToMemory = function() {
                    z("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "writeAsciiToMemory") || (O.writeAsciiToMemory = function() {
                    z("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addRunDependency") || (O.addRunDependency = function() {
                    z("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "removeRunDependency") || (O.removeRunDependency = function() {
                    z("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "ENV") || (O.ENV = function() {
                    z("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "FS") || (O.FS = function() {
                    z("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "FS_createFolder") || (O.FS_createFolder = function() {
                    z("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_createPath") || (O.FS_createPath = function() {
                    z("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_createDataFile") || (O.FS_createDataFile = function() {
                    z("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_createPreloadedFile") || (O.FS_createPreloadedFile = function() {
                    z("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_createLazyFile") || (O.FS_createLazyFile = function() {
                    z("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_createLink") || (O.FS_createLink = function() {
                    z("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_createDevice") || (O.FS_createDevice = function() {
                    z("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "FS_unlink") || (O.FS_unlink = function() {
                    z("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                }), Object.getOwnPropertyDescriptor(O, "GL") || (O.GL = function() {
                    z("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "dynamicAlloc") || (O.dynamicAlloc = function() {
                    z("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "loadDynamicLibrary") || (O.loadDynamicLibrary = function() {
                    z("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "loadWebAssemblyModule") || (O.loadWebAssemblyModule = function() {
                    z("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getLEB") || (O.getLEB = function() {
                    z("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getFunctionTables") || (O.getFunctionTables = function() {
                    z("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "alignFunctionTables") || (O.alignFunctionTables = function() {
                    z("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "registerFunctions") || (O.registerFunctions = function() {
                    z("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "addFunction") || (O.addFunction = function() {
                    z("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "removeFunction") || (O.removeFunction = function() {
                    z("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getFuncWrapper") || (O.getFuncWrapper = function() {
                    z("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "prettyPrint") || (O.prettyPrint = function() {
                    z("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "makeBigInt") || (O.makeBigInt = function() {
                    z("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "dynCall") || (O.dynCall = function() {
                    z("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getCompilerSetting") || (O.getCompilerSetting = function() {
                    z("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "print") || (O.print = function() {
                    z("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "printErr") || (O.printErr = function() {
                    z("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "getTempRet0") || (O.getTempRet0 = function() {
                    z("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "setTempRet0") || (O.setTempRet0 = function() {
                    z("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "callMain") || (O.callMain = function() {
                    z("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "abort") || (O.abort = function() {
                    z("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "warnOnce") || (O.warnOnce = function() {
                    z("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stackSave") || (O.stackSave = function() {
                    z("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stackRestore") || (O.stackRestore = function() {
                    z("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), Object.getOwnPropertyDescriptor(O, "stackAlloc") || (O.stackAlloc = function() {
                    z("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                }), O.writeStackCookie = v, O.checkStackCookie = X, O.abortStackOverflow = function(e) {
                    z("Stack overflow! Attempted to allocate " + e + " bytes on the stack, but stack has only " + (41552 - eM() + e) + " bytes available!")
                }, Object.getOwnPropertyDescriptor(O, "ALLOC_NORMAL") || Object.defineProperty(O, "ALLOC_NORMAL", {
                    configurable: !0,
                    get: function() {
                        z("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                    }
                }), Object.getOwnPropertyDescriptor(O, "ALLOC_STACK") || Object.defineProperty(O, "ALLOC_STACK", {
                    configurable: !0,
                    get: function() {
                        z("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                    }
                }), Object.getOwnPropertyDescriptor(O, "ALLOC_DYNAMIC") || Object.defineProperty(O, "ALLOC_DYNAMIC", {
                    configurable: !0,
                    get: function() {
                        z("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                    }
                }), Object.getOwnPropertyDescriptor(O, "ALLOC_NONE") || Object.defineProperty(O, "ALLOC_NONE", {
                    configurable: !0,
                    get: function() {
                        z("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
                    }
                }), Object.getOwnPropertyDescriptor(O, "calledRun") || Object.defineProperty(O, "calledRun", {
                    configurable: !0,
                    get: function() {
                        z("'calledRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
                    }
                }), W = function e() {
                    E || eD(), E || (W = e)
                }, O.run = eD, O.preInit)
                for ("function" == typeof O.preInit && (O.preInit = [O.preInit]); O.preInit.length > 0;) O.preInit.pop()();
            eD(), window.js_opus_encoder_get_size = function(e) {
                return libopus._opus_encoder_get_size(e)
            }, window.js_opus_encoder_init = function(e, t, r, o) {
                return libopus._opus_encoder_init(e, t, r, o)
            }, window.js_opus_encoder_create = function(e, t, r, o) {
                let n = libopus._malloc(4);
                return libopus._opus_encoder_create(e, t, r, n)
            }, window.js_opus_get_version_string = function() {
                return libopus._opus_get_version_string()
            }, window.js_opus_encode = function(e, t, r, o, n) {
                return libopus._opus_encode(e, t, r, o, n)
            }, window.js_opus_encoder_ctl_set = function(e, t, r) {
                return libopus._opus_encoder_ctl_set(e, t, r)
            }, window.js_opus_encoder_ctl_get = function(e, t, r) {
                let o = libopus._malloc(4);
                return libopus._opus_encoder_ctl_get(e, t, o)
            }, window.js_opus_encode_float = function(e, t, r, o, n) {
                var i = libopus._malloc(t.length * t.BYTES_PER_ELEMENT),
                    a = i >> 2;
                O.HEAPF32.subarray(a, a + t.length).set(t);
                var s = libopus._malloc(n),
                    u = O.HEAP8.subarray(s, s + n),
                    c = libopus._opus_encode_float(e, i, r, s, n);
                return o.set(u), libopus._free(i), libopus._free(s), c
            }, window.js_opus_decoder_create = function(e, t, r) {
                let o = libopus._malloc(4);
                return libopus._opus_decoder_create(e, t, o)
            }, window.js_opus_decode_float = function(e, t, r, o, n, i) {
                var a = libopus._malloc(o.length * o.BYTES_PER_ELEMENT),
                    s = a >> 2,
                    u = O.HEAPF32.subarray(s, s + o.length),
                    c = libopus._malloc(r);
                O.HEAP8.subarray(c, c + r).set(t);
                var d = libopus._opus_decode_float(e, c, r, a, n, i);
                return o.set(u), libopus._free(a), libopus._free(c), d
            }, window.js_opus_strerror = function(e) {
                return libopus._opus_strerror(e)
            }, window.js_opus_packet_get_bandwidth = function(e) {
                var t = libopus._malloc(1);
                O.HEAP8.subarray(t, t + 1).set(e);
                var r = libopus._opus_packet_get_bandwidth(t);
                return libopus._free(t), r
            }, window.js_opus_packet_get_nb_channels = function(e) {
                var t = libopus._malloc(1);
                O.HEAP8.subarray(t, t + 1).set(e);
                var r = libopus._opus_packet_get_nb_channels(t);
                return libopus._free(t), r
            }, window.js_opus_free = function(e) {
                libopus._free(e)
            }, window.libopus = O
        },
        67234: function() {}
    }
]);
//# sourceMappingURL=6441.4052a4d0ae8026a7.js.map