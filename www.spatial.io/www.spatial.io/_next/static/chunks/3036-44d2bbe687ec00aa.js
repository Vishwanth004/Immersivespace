"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3036], {
        38822: function(e, t, n) {
            let i;
            n.d(t, {
                Sj: function() {
                    return s
                },
                WR: function() {
                    return p
                },
                Xy: function() {
                    return c
                },
                Zx: function() {
                    return d
                },
                dj: function() {
                    return l
                },
                k: function() {
                    return r
                },
                k2: function() {
                    return i
                }
            });
            var o, a = n(95235);
            class l extends Error {
                constructor(e, t) {
                    super(`File is too large. Limit for ${e} is ${t}MB`), (0, a.Z)(this, "contentType", void 0), (0, a.Z)(this, "maxSizeAllowed", void 0), this.contentType = e, this.maxSizeAllowed = t
                }
            }
            class s extends Error {
                constructor(e) {
                    super(`Sorry, we have not yet added support for ${e.name}.`), (0, a.Z)(this, "fileExt", void 0), (0, a.Z)(this, "fileTypeName", void 0), this.fileExt = e.ext, this.fileTypeName = e.name
                }
            }(o = i || (i = {})).avi = "video/avi", o.dae = "application/collada+xml", o.doc = "application/msword", o.docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document", o.fbx = "model/spatial-fbx", o.gif = "image/gif", o.glb = "model/gltf-binary", o.gltf = "model/gltf+json", o.jpeg = "image/jpeg", o.jpg = "image/jpeg", o.mkv = "video/x-matroska", o.mov = "video/quicktime", o.mp4 = "video/mp4", o.obj = "application/object", o.pcd = "model/pcd", o.pdf = "application/pdf", o.ply = "model/ply", o.png = "image/png", o.ppt = "application/vnd.ms-powerpoint", o.pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation", o.tif = "image/tiff", o.tiff = "image/tiff", o.webm = "video/webm", o.xls = "application/vnd.ms-excel", o.xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", o.zip = "application/zip";
            let r = ["GIF", "IMAGE", "VIDEO", "IMAGE_COLLECTION", i.avi, i.doc, i.docx, i.gif, i.jpeg, i.mkv, i.mov, i.mp4, i.png, i.ppt, i.pptx, i.tif, i.webm, i.xls, i.xlsx],
                c = ["3D_MODEL", i.fbx, i.pcd, i.ply, i.obj, i.glb, i.gltf],
                p = ["OPENSEA_ASSET"];
            class d {
                static getMaxSizeInMbForContentType(e) {
                    switch (e) {
                        case i.jpeg:
                        case i.png:
                        case i.tiff:
                            return 10;
                        case i.avi:
                        case i.gif:
                        case i.mkv:
                        case i.mov:
                        case i.mp4:
                        case i.webm:
                            return 1e3;
                        case i.doc:
                        case i.docx:
                        case i.pdf:
                        case i.ppt:
                        case i.pptx:
                        case i.xls:
                        case i.xlsx:
                        case i.dae:
                        case i.fbx:
                        case i.obj:
                        case i.ply:
                        case i.glb:
                        case i.gltf:
                            return 100;
                        case i.pcd:
                            return 10;
                        case i.zip:
                            return 500;
                        default:
                            return 0
                    }
                }
                static getAllowedUploadTypes() {
                    let e = Object.values(i);
                    return e.concat(this.TRACKED_UNIMPLEMENTED_FILE_TYPES.map(e => e.ext)), e
                }
                static getContentTypeForBroadcast(e) {
                    switch (e) {
                        case i.avi:
                            return "video/avi";
                        case i.dae:
                            return "model/vnd.collada+xml";
                        case i.fbx:
                            return "model/gltf-binary";
                        case i.doc:
                        case i.docx:
                        case i.pdf:
                        case i.ppt:
                        case i.pptx:
                        case i.xls:
                        case i.xlsx:
                            return "spatial-collection";
                        default:
                            return e
                    }
                }
                static getContentTypeForFilename(e) {
                    var t, n;
                    let o = null !== (t = null === (n = e.split(".").pop()) || void 0 === n ? void 0 : n.toLowerCase()) && void 0 !== t ? t : "",
                        a = i[o];
                    if (a) return a;
                    let l = this.TRACKED_UNIMPLEMENTED_FILE_TYPES.find(t => e.endsWith(t.ext));
                    if (l) throw new s(l);
                    throw Error("Unsupported file type")
                }
                static getFileExtensionForContentType(e) {
                    for (let [t, n] of Object.entries(i))
                        if (n === e) return t;
                    let t = e.split("/");
                    return t.length > 1 ? t[1] : e
                }
            }(0, a.Z)(d, "TRACKED_UNIMPLEMENTED_FILE_TYPES", [{
                ext: ".dbf",
                name: "Shapefiles"
            }, {
                ext: ".shp",
                name: "Shapefiles"
            }, {
                ext: ".shx",
                name: "Shapefiles"
            }, {
                ext: ".3ds",
                name: "3DS Files"
            }, {
                ext: ".blend",
                name: "Blender Files"
            }, {
                ext: ".iges",
                name: "IGES Files"
            }, {
                ext: ".igs",
                name: "IGES Files"
            }, {
                ext: ".stl",
                name: "STL Files"
            }, {
                ext: ".stp",
                name: "STEP Files"
            }, {
                ext: ".usda",
                name: "USDA Files"
            }, {
                ext: ".usdc",
                name: "USDC Files"
            }, {
                ext: ".usdz",
                name: "USDZ Files"
            }, {
                ext: ".dxf",
                name: "AutoCAD DXF Files"
            }, {
                ext: ".dwg",
                name: "DWG Files"
            }])
        },
        73036: function(e, t, n) {
            let i;
            n.d(t, {
                AK: function() {
                    return j
                },
                E2: function() {
                    return b
                },
                GR: function() {
                    return U
                },
                ID: function() {
                    return k
                },
                PO: function() {
                    return E
                },
                SO: function() {
                    return T
                },
                Yh: function() {
                    return x
                },
                aD: function() {
                    return I
                },
                cP: function() {
                    return D
                },
                mm: function() {
                    return S
                }
            });
            var o, a = n(22382),
                l = n(46782),
                s = n.n(l),
                r = n(91163),
                c = n(38822),
                p = n(13864),
                d = n(7484),
                m = n(44868),
                f = n(54537),
                u = n(71594);
            (o = i || (i = {}))[o.SearchOrURL = 0] = "SearchOrURL", o[o.Note = 1] = "Note", o[o.FileUpload = 2] = "FileUpload";
            let x = new d.nZ("FileUpload"),
                g = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.ms-excel", "application/msword"],
                h = ["image/tiff", "image/png"],
                y = ["model/vnd.collada+xml", "model/spatial-fbx", "model/gltf-binary", "application/object"],
                v = ["video/avi", "video/mp4", "video/webm", "video/quicktime", "video/x-ms-wmv", "video/x-flv", "video/x-matroska"],
                w = [{
                    ext: ".shp",
                    name: "Shapefiles"
                }, {
                    ext: ".shx",
                    name: "Shapefiles"
                }, {
                    ext: ".dbf",
                    name: "Shapefiles"
                }, {
                    ext: ".stl",
                    name: "STL Files"
                }, {
                    ext: ".3ds",
                    name: "3DS Files"
                }, {
                    ext: ".igs",
                    name: "IGES Files"
                }, {
                    ext: ".iges",
                    name: "IGES Files"
                }, {
                    ext: ".stp",
                    name: "STEP Files"
                }, {
                    ext: ".blend",
                    name: "Blender Files"
                }, {
                    ext: ".dxf",
                    name: "AutoCAD DXF Files"
                }, {
                    ext: ".dwg",
                    name: "DWG Files"
                }, {
                    ext: ".tiff",
                    name: "TIFF Images"
                }, {
                    ext: ".tif",
                    name: "TIFF Images"
                }, {
                    ext: ".heic",
                    name: "HEIC Images"
                }, {
                    ext: ".svg",
                    name: "SVG Vectors"
                }],
                E = ["image/jpeg", ".gltf", ".zip", ".glb", ".obj", ".fbx", ".dae", ".gif"].concat(w.map(e => e.ext), g, v, h, y, [".mkv"]).join(", "),
                T = ["image/jpeg", ".gif"].concat(v, h, [".mkv"]).join(", ");

            function F(e) {
                let t = e.type.toLowerCase(),
                    n = e.name.toLowerCase();
                if (g.concat(h, v, ["image/jpeg"]).includes(t)) return t;
                let i = Object.keys(c.k2).find(e => n.endsWith(e));
                if (i) return c.k2[i];
                let o = w.find(e => n.endsWith(e.ext));
                if (o) throw new c.Sj(o);
                throw Error(`Unsupported file type ${t}`)
            }
            class b extends Error {
                constructor() {
                    super("GLTF buffers and images must be embedded as data URIs instead of referenced externally")
                }
            }
            async function S(e, t, n, i) {
                let o = F(t),
                    l = function(e) {
                        let t = F(e);
                        return g.includes(t) ? "application/pdf" : h.includes(t) ? "image/png" : y.includes(t) ? "model/gltf-binary" : v.includes(t) ? "video/mp4" : t
                    }(t);
                try {
                    (0, p._e)(o, t.size), m.k.info(x, `File Uploaded with type ${o} and runtime type ${l}`);
                    let e = c.Zx.getMaxSizeInMbForContentType(l);
                    if (!i && t.size > 1e6 * e) throw new c.dj(o, e);
                    let s = await f.zt.content.createFileUpload(t.name, t.size, n, o),
                        {
                            fileUrls: {
                                putUrl: r
                            },
                            file: d
                        } = s;
                    try {
                        if (await new Promise((e, n) => {
                                let i = new FileReader,
                                    l = null;
                                i.onload = i => {
                                    let s;
                                    let c = i.target.result;
                                    try {
                                        ! function(e, t) {
                                            if ("model/gltf+json" === e) {
                                                var n, i;
                                                let e = JSON.parse(t),
                                                    o = RegExp("^data:");
                                                null === (n = e.buffers) || void 0 === n || n.forEach(e => {
                                                    if (e.uri && !o.exec(e.uri)) throw new b
                                                }), null === (i = e.images) || void 0 === i || i.forEach(e => {
                                                    if (e.uri && !o.exec(e.uri)) throw new b
                                                })
                                            }
                                        }(o, c)
                                    } catch (e) {
                                        n(e);
                                        return
                                    }(s = null, a.Z.request({
                                        method: "PUT",
                                        url: r,
                                        data: t,
                                        headers: {
                                            "Content-Type": t.type
                                        },
                                        timeout: 3e5,
                                        onUploadProgress: e => {
                                            let t = e.loaded / e.total;
                                            null === s ? s = u.notifyProgress("Upload in Progress", t) : u.update(s, {
                                                progress: t
                                            })
                                        }
                                    }).then(e => (u.dismiss(s), e)).catch(e => {
                                        throw console.log(e), e
                                    })).then(() => {
                                        l = u.notifyNoClose("Processing...")
                                    }).then(async () => {
                                        let t = await f.zt.content.completeFileUpload(d.id);
                                        u.dismiss(l), 202 === t.status ? (u.notify("Uploaded. We need to process the file, we will notify you once it's complete.", 6e3), e(!1)) : e(!0)
                                    }).catch(e => {
                                        u.dismiss(l), n(e)
                                    })
                                }, i.onabort = () => {
                                    u.notify("Aborted."), n()
                                }, i.onerror = () => {
                                    u.notify("Error reading file."), n()
                                }, i.readAsBinaryString(t)
                            }), (0, p.Uy)(o, t.size), "application/zip" === o) {
                            let e = await f.zt.content.getFile(d.id);
                            l = e.fileUrls.getUrlFileType
                        }
                        return {
                            contentId: d.id,
                            contentName: d.name,
                            contentType: "",
                            contentSourceType: "DIRECT_UPLOAD",
                            mimeType: l
                        }
                    } catch (e) {
                        throw m.k.error(x, `Error uploading file. Error: ${e}`), await f.zt.content.failedFileUpload(d.id), e
                    }
                } catch (e) {
                    throw e instanceof b ? (0, p.TQ)(o, t.size, "Contained Non-Embedded Resources") : e instanceof c.Sj ? (0, p.TQ)(e.fileTypeName, t.size, "Unimplemented Type") : e instanceof c.dj ? (0, p.TQ)(e.contentType, t.size, "Too Large") : (0, p.TQ)(t.type, t.size, "Error"), e
                }
            }
            async function U(e, t) {
                try {
                    if (!e) throw Error(`URL is falsy: ${e}`);
                    let n = await fetch(e);
                    return await s()(await n.blob(), t)
                } catch (n) {
                    throw m.k.error(r.BQ, `User failed to download content (to be named ${t}) from ${e}:`, n), n
                }
            }
            let j = e => ({
                    contentId: e.id,
                    contentName: e.name,
                    contentType: e.contentType,
                    contentSourceType: e.contentSourceType
                }),
                I = e => e.filter(e => c.k.includes(e.contentType) || c.k.includes(e.mimeType) || c.WR.includes(e.contentSourceType)).length,
                k = e => c.k.includes(e.contentType) || c.WR.includes(e.contentSourceType),
                D = e => e.filter(e => c.Xy.includes(e.contentType) || c.Xy.includes(e.mimeType)).length
        }
    }
]);
//# sourceMappingURL=3036-44d2bbe687ec00aa.js.map