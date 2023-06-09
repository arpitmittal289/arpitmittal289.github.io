(() => {
    var n = {
            439: () => {
                window.pdfembGrabToPan = function() {
                    function e(e) {
                        this.element = e.element, this.document = e.element.ownerDocument, "function" == typeof e.ignoreTarget && (this.ignoreTarget = e.ignoreTarget), this.onActiveChanged = e.onActiveChanged, this.activate = this.activate.bind(this), this.deactivate = this.deactivate.bind(this), this.toggle = this.toggle.bind(this), this._onmousedown = this._onmousedown.bind(this), this._onmousemove = this._onmousemove.bind(this), this._onmousewheel = this._onmousewheel.bind(this), this._endPan = this._endPan.bind(this), (this.overlay = document.createElement("div")).className = "grab-to-pan-grabbing"
                    }
                    var t;
                    e.prototype = {
                        CSS_CLASS_GRAB: "grab-to-pan-grab",
                        activate: function() {
                            this.active || (this.active = !0, this.element.addEventListener("mousedown", this._onmousedown, !0), this.element.addEventListener("mousewheel", this._onmousewheel), this.element.addEventListener("wheel", this._onmousewheel), this.element.addEventListener("DOMMouseScroll", this._onmousewheel), this.element.classList.add(this.CSS_CLASS_GRAB), this.onActiveChanged && this.onActiveChanged(!0))
                        },
                        deactivate: function() {
                            this.active && (this.active = !1, this.element.removeEventListener("mousedown", this._onmousedown, !0), this._endPan(), this.element.classList.remove(this.CSS_CLASS_GRAB), this.onActiveChanged && this.onActiveChanged(!1))
                        },
                        toggle: function() {
                            this.active ? this.deactivate() : this.activate()
                        },
                        ignoreTarget: function(e) {
                            return e[t]("a[href], a[href] *, input, textarea, button, button *, select, option")
                        },
                        _onmousedown: function(e) {
                            if (0 === e.button && !this.ignoreTarget(e.target)) {
                                if (e.originalTarget) try {
                                    e.originalTarget.tagName
                                } catch (e) {
                                    return
                                }
                                this.scrollLeftStart = this.element.scrollLeft, this.scrollTopStart = this.element.scrollTop, this.clientXStart = e.clientX, this.clientYStart = e.clientY, this.document.addEventListener("mousemove", this._onmousemove, !0), this.document.addEventListener("mouseup", this._endPan, !0), this.element.addEventListener("scroll", this._endPan, !0), e.preventDefault(), e.stopPropagation(), this.document.documentElement.classList.add(this.CSS_CLASS_GRABBING);
                                var t = document.activeElement;
                                t && !t.contains(e.target) && t.blur()
                            }
                        },
                        _onmousemove: function(e) {
                            var t;
                            this.element.removeEventListener("scroll", this._endPan, !0),
                                function(e) {
                                    if ("buttons" in e && n) return !(1 | e.buttons);
                                    if (o || i) return 0 === e.which
                                }(e) ? this._endPan() : (t = e.clientX - this.clientXStart, e = e.clientY - this.clientYStart, this.element.scrollTop = this.scrollTopStart - e, this.element.scrollLeft = this.scrollLeftStart - t, this.overlay.parentNode || document.body.appendChild(this.overlay))
                        },
                        _onmousewheel: function(e) {
                            this.element.removeEventListener("scroll", this._endPan, !0);
                            var t = .5;
                            e.deltaMode && (1 == e.deltaMode && (t = 10), 2 == e.deltaMode && (t = 1e3));
                            var n = e.deltaY ? -e.deltaY : e.wheelDelta || -e.detail;
                            this.scrollLeftStart = this.element.scrollLeft, this.scrollTopStart = this.element.scrollTop;
                            t *= n;
                            if (this.element.scrollTop = this.scrollTopStart - t, this.overlay.parentNode || document.body.appendChild(this.overlay), this.element.scrollTop != this.scrollTopStart || 0 == t) return e.preventDefault(), !1
                        },
                        _endPan: function() {
                            this.element.removeEventListener("scroll", this._endPan, !0), this.document.removeEventListener("mousemove", this._onmousemove, !0), this.document.removeEventListener("mouseup", this._endPan, !0), this.overlay.parentNode && this.overlay.parentNode.removeChild(this.overlay)
                        }
                    }, ["webkitM", "mozM", "msM", "oM", "m"].some(function(e) {
                        e += "atches";
                        return e in document.documentElement && (t = e), t = (e += "Selector") in document.documentElement ? e : t
                    });
                    var n = !document.documentMode || 9 < document.documentMode,
                        a = window.chrome,
                        o = a && (a.webstore || a.app),
                        i = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);
                    return e
                }()
            },
            597: (e, t, n) => {
                n(311)(document).ready(function(e) {
                    function t() {
                        n.apply(this, arguments)
                    }
                    var n = PDFEMB_NS.pdfembPagesViewer;
                    t.prototype = new n, PDFEMB_NS.pdfembPagesViewerUsable = t
                }), PDFEMB_NS.pdfembGetPDF = function(e, t) {
                    t(e, !1)
                }
            },
            147: (e, t, n) => {
                n(311)(document).ready(function(r) {
                    var e;
                    r.fn.pdfEmbedder = function(i) {
                        return this.each(function(e, t) {
                            var n, a = r(t);
                            a.is("a") ? (t = a.data(), (n = r("<div></div>", {
                                class: a.attr("class"),
                                style: a.attr("style")
                            })).data(r.extend({
                                "pdf-url": a.attr("href")
                            }, t)), a.replaceWith(n)) : n = a, n.append(r("<div></div>", {
                                class: "pdfemb-loadingmsg"
                            }).append(document.createTextNode(pdfemb_trans.objectL10n.loading))), "on" == n.data("disablerightclick") && n.bind("contextmenu", function(e) {
                                e.preventDefault()
                            });

                            function o(e, t) {
                                new PDFEMB_NS.pdfembPagesViewerUsable(e, n, t).setup()
                            }
                            n.data("pdfDoc") ? o(n.data("pdfDoc"), n.data("showIsSecure")) : (a = n.data("pdf-url"), PDFEMB_NS.pdfembGetPDF(a, function(e, t) {
                                null !== e ? pdfjsLib.getDocument(e, i).promise.then(function(e) {
                                    o(e, t)
                                }, function(e) {
                                    var t = document.createTextNode(e.message);
                                    "UnknownErrorException" == e.name && "Failed to fetch" == e.message && (t = r("<span></span>").append(document.createTextNode(e.message + " " + pdfemb_trans.objectL10n.domainerror + " ")).append(r('<a href="https://wp-pdf.com/kb/error-url-to-the-pdf-file-must-be-on-exactly-the-same-domain-as-the-current-web-page/" target="_blank">' + pdfemb_trans.objectL10n.clickhereinfo + "</a>"))), n.empty().append(r("<div></div>", {
                                        class: "pdfemb-errormsg"
                                    }).append(t))
                                }) : n.empty().append(r("<div></div>", {
                                    class: "pdfemb-errormsg"
                                }).append(msgnode = r("<span></span>").append(document.createTextNode("Failed to load and decrypt PDF"))))
                            }))
                        }), this
                    }, e = "undefined" === pdfemb_trans.cmap_url ? "" : pdfemb_trans.cmap_url, r(".pdfemb-viewer").pdfEmbedder(e)
                })
            },
            529: (e, t, n) => {
                n = n(311);
                window.PDFEMB_NS = {}, n(document).ready(function(P) {
                    var y = (e = document.createElement("canvas").getContext("2d"), (window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1));
                    PDFEMB_NS.PIXEL_RATIO = y;
                    createHiDPICanvas = function(e, t, n) {
                        n = n || y;
                        var a = document.createElement("canvas");
                        return a.width = e * n, a.height = t * n, a.style.width = e + "px", a.style.height = t + "px", a.getContext("2d").setTransform(n, 0, 0, n, 0, 0), a
                    };
                    var g, v;
                    (e = document.createElement("div")).style.width = "100px", e.style.height = "100px", e.style.overflow = "scroll", e.style.position = "absolute", e.style.top = "-9999px", document.body.appendChild(e), g = e.offsetWidth - e.clientWidth, v = e.offsetHeight - e.clientHeight, document.body.removeChild(e), PDFEMB_NS.vscrollbarwidth = g, PDFEMB_NS.hscrollbarheight = v;
                    var e = function(e, t, n) {
                        this.pdfDoc = e, this.divContainer = t, this.showIsSecure = n, this.initialResize = !1, this.firstPageWidth = 0, this.firstPageHeight = 0, this.invalidationRound = 1, this.currentPageNum = 0, this.zoom = 100, this.fromZoom = 0, this.toZoom = 0
                    };
                    e.prototype.setup = function() {
                        var o = this,
                            e = this.divContainer,
                            t = this.pdfDoc,
                            n = this.showIsSecure;
                        this.numPages = t.numPages;
                        var a = e.data("scrollbar");
                        this.vscrollbar = "both" == a || "vertical" == a, this.hscrollbar = "both" == a || "horizontal" == a;
                        a = "overflow-y: " + (this.vscrollbar ? "scroll" : "hidden") + "; ";
                        a += "overflow-x: " + (this.hscrollbar ? "scroll" : "hidden") + "; ", e.empty().append(P("<div></div>", {
                            class: "pdfemb-pagescontainer",
                            style: a
                        })), e.data("pdfDoc", t);
                        a = e.data("toolbar");
                        "top" != a && "both" != a || this.addToolbar(!0, "on" == e.data("toolbar-fixed"), n), "bottom" != a && "both" != a || this.addToolbar(!1, "on" == e.data("toolbar-fixed"), n), void 0 !== PDFEMB_NS.pdfembPremiumAnnotationsLayerFactory ? o.annotationsLayerFactory = new PDFEMB_NS.pdfembPremiumAnnotationsLayerFactory : o.annotationsLayerFactory = {
                            createAnnotationsLayerBuilder: function(e, t) {
                                return null
                            }
                        }, o.annotationLayerFactories = Array(), void 0 !== PDFEMB_NS.pdfembPremiumTextLayerFactory ? o.textLayerFactory = new PDFEMB_NS.pdfembPremiumTextLayerFactory : o.textLayerFactory = {
                            createTextLayerBuilder: function(e, t) {
                                return null
                            }
                        }, o.textLayerFactories = Array(), e.on("pdfembGotopage", function(e, t) {
                            t > this.numPages || t <= 0 || (o.gotoPage(t), o.jumpToTop())
                        }), e.on("pdfembGotoHash", function(e, t) {
                            t.dest && (dest = t.dest, ("string" == typeof dest ? (destString = dest, o.pdfDoc.getDestination(dest)) : Promise.resolve(dest)).then(function(e) {
                                e instanceof Array && !(e.length < 1) && o.pdfDoc.getPageIndex(e[0]).then(function(e) {
                                    e += 1;
                                    e > o.numPages || e <= 0 || o.currentPageNum == e || (o.gotoPage(e), o.jumpToTop())
                                })
                            }))
                        }), e.on("pdfembGotoAction", function(e, t) {
                            var n = o.currentPageNum,
                                a = n;
                            switch (t) {
                                case "GoBack":
                                    --a;
                                    break;
                                case "GoForward":
                                case "NextPage":
                                    ++a;
                                    break;
                                case "PrevPage":
                                    --a;
                                    break;
                                case "LastPage":
                                    a = o.pageCount;
                                    break;
                                case "FirstPage":
                                    a = 1
                            }
                            a == n || a > o.pageCount || a <= 0 || o.gotoPage(a)
                        }), e.on("pdfembMagnify", function(e) {
                            o.magnifyEvent(e)
                        }), e.on("pdfembChangeZoom", function(e, t) {
                            o.changeZoom(t)
                        }), this.pageCount = t.numPages, (!e.data("pagenum") || e.data("pagenum") < 1 || e.data("pagenum") > this.pageCount) && e.data("pagenum", 1), e.data("showIsSecure", this.showIsSecure), e.data("pageNumPending", null);
                        t = "on" == e.data("fullScreen") ? parseInt(e.data("startfpzoom")) : parseInt(e.data("startzoom"));
                        (isNaN(t) || t < 20 || 800 < t) && (t = 100), 100 != (this.zoom = t) && e.find("span.pdfemb-zoom").text(t + "%"), e.find("span.pdfemb-page-count").text(this.pageCount), this.gotoPage(e.data("pagenum"))
                    }, e.prototype.checkForResize = function() {
                        var e = this,
                            t = e.divContainer,
                            n = P(window).height(),
                            a = P(window).width(),
                            o = t.data("checked-window-height"),
                            i = t.data("checked-window-width");
                        o && i || (t.data("checked-window-height", n), t.data("checked-window-width", a)), o == n && i == a || (e.resizeViewer(), e.resizeInnerDivs(), e.invalidateAllPages(), e.renderPage(this.currentPageNum), e.prerenderNearbyPages(this.currentPageNum), e.pdfembMakeMobile(), t.data("checked-window-height", n), t.data("checked-window-width", a)), "true" != t.data("fullScreenClosed") && setTimeout(function() {
                            e.checkForResize()
                        }, 100)
                    }, e.prototype.setSizesBasedOnPage = function(e) {
                        e = e.getViewport(1);
                        this.pageWidth = e.width, this.pageHeight = e.height, (this.pageWidth <= 0 || this.pageHeight <= 0) && this.divContainer.empty().append(document.createTextNode(pdfemb_trans.objectL10n.widthheightinvalid))
                    }, e.prototype.createPageInnerDivs = function() {
                        for (var e = this.divContainer.find(".pdfemb-pagescontainer"), t = 1; t <= this.pageCount; ++t) {
                            var n = e.find(".pdfemb-inner-div.pdfemb-page" + t);
                            0 == n.length && ((n = P("<div></div>", {
                                class: "pdfemb-inner-div pdfemb-page" + t
                            })).data("pageNum", t), e.append(n))
                        }
                        this.resizeInnerDivs()
                    }, e.prototype.addGrabToPan = function() {
                        var n = this,
                            e = n.divContainer,
                            t = e.find("div.pdfemb-pagescontainer"),
                            a = new pdfembGrabToPan({
                                element: t[0]
                            });
                        e.data("grabtopan", a), t.on("scroll", function(e) {
                            var t = n.getTopVisiblePageNum();
                            t != n.currentPageNum && (n.currentPageNum = t, n.updatePageNumDisplay(t), n.renderPage(t, !1), n.prerenderNearbyPages(t), n.deallocateFarAwayPages(t)), e.stopPropagation()
                        }), P(window).resize(function() {
                            setTimeout(function() {
                                n.checkForResize()
                            }, 100)
                        })
                    }, e.prototype.resizeInnerDivs = function(o) {
                        var i = this,
                            r = i.wantCanvasWidth,
                            d = i.wantCanvasHeight,
                            e = i.wantHeight,
                            s = this.divContainer.find(".pdfemb-pagescontainer").find(".pdfemb-inner-div");
                        o && (s = s.filter(".pdfemb-page" + o));
                        var c = 0;
                        s.each(function(e, t) {
                            var n = P(t),
                                a = (a = n.data("widthfactor")) || 1,
                                t = (t = n.data("heightfactor")) || 1;
                            n.data("invalidation-round", this.invalidationRound - 1), n.css("width", r * a);
                            e = d * t + (o == i.numPages || !o && e == s.length - 1 ? 0 : 2);
                            n.css("height", e), c += e;
                            n = n.find(".pdfemb-the-canvas");
                            n.css("width", r * a), n.css("height", d * t)
                        });
                        e = !o && c < e ? (e - c) / 2 : 0;
                        s.first().css("top", e)
                    }, e.prototype.invalidateAllPages = function() {
                        ++this.invalidationRound
                    }, e.prototype.prerenderNearbyPages = function(e) {
                        var t = 3,
                            n = 2;
                        this.zoom < 100 && (t *= Math.min(Math.ceil(100 / this.zoom), 10), n *= Math.min(Math.ceil(100 / this.zoom), 10));
                        for (var a = Math.max(1, e - n); a <= Math.min(e + t, this.numPages); ++a) a != e && this.renderPage(a, !1)
                    }, e.prototype.deallocateFarAwayPages = function(e) {
                        var t, n = 2,
                            a = 2;
                        this.zoom < 100 && (n += t = Math.min(Math.ceil(100 / this.zoom), 50), a += t);

                        function o(e) {
                            var t = i.find(".pdfemb-page" + e);
                            (e = t.find(".pdfemb-the-canvas")).length && (e.width = 1, e.height = 1, e.remove(), t.data("invalidation-round", 0))
                        }
                        for (var i = this.divContainer.find("div.pdfemb-pagescontainer"), r = 3; r < e - a; ++r) o(r);
                        for (r = e + n; r < this.numPages; ++r) o(r)
                    }, e.prototype.resizeViewer = function() {
                        var e = this,
                            t = e.pageWidth,
                            n = e.pageHeight,
                            a = e.divContainer,
                            o = a.find("div.pdfemb-pagescontainer"),
                            i = o[0].scrollLeft,
                            r = o[0].scrollTop,
                            d = a.parent().width(),
                            s = t;
                        "max" == a.data("width") ? s = d : "auto" == a.data("width") ? s = t : (s = parseInt(a.data("width"), 10), (isNaN(s) || s <= 0) && (s = d));
                        var c = n * (s = d < (s = s <= 0 ? t : s) && 0 < d ? d : s) / t,
                            p = e.pdfembWantMobile(s, l);
                        e.wantMobile = p;
                        var h = a.find("div.pdfemb-toolbar-fixed"),
                            m = p ? 0 : h.length,
                            l = parseInt(a.data("height"), 10);
                        (isNaN(l) || l <= 0 || c < l) && (l = "auto" == a.data("height") ? a.parent().height() - m * h.height() : c), e.userHeight = l;
                        var s = Math.floor(s),
                            c = Math.floor(c),
                            u = 100,
                            f = s - (e.vscrollbar ? g : 0),
                            n = c - (e.hscrollbar ? v : 0),
                            d = 1;
                        p || 16777e3 < (f = f * (u = e.zoom) / 100) * (n = n * u / 100) * y * y && (d = 16777e3 / (f * n * y * y)), s != a.width() && a.width(s), a.height() != l && a.height(l + m * h.height()), o.width(s), o.height(l);
                        h = h.filter(".pdfemb-toolbar-top");
                        0 < m && o.css("top", h.height());
                        t = (s - (e.vscrollbar ? g : 0)) / t;
                        0 != e.fromZoom && 0 != e.toZoom && (e.pccentreLeft, e.pccentreTop, o[0].scrollLeft = (i + e.pccentreLeft) * (e.toZoom / e.fromZoom) - e.pccentreLeft, o[0].scrollTop = (r + e.pccentreTop) * (e.toZoom / e.fromZoom) - e.pccentreTop), e.fromZoom = 0, e.toZoom = 0, e.wantCanvasWidth = f, e.wantCanvasHeight = n, e.reducefactor = d, e.wantWidth = s, e.wantHeight = c, e.canvasscale = t, e.zoom = u
                    }, e.prototype.getTopVisiblePageNum = function() {
                        var e = this.divContainer.find(".pdfemb-pagescontainer").find(".pdfemb-inner-div:visible");
                        return 0 < e.length ? e.first().data("pageNum") : 1
                    }, e.prototype.gotoPage = function(e) {
                        e <= 0 || e > this.pageCount || (this.renderPage(e, !0), this.currentPageNum = e, this.updatePageNumDisplay(e), this.prerenderNearbyPages(e), this.deallocateFarAwayPages(e))
                    }, e.prototype.updatePageNumDisplay = function(n) {
                        var e = this.divContainer;
                        e.find("div.pdfemb-toolbar .pdfemb-page-num").each(function(e, t) {
                            t = P(t);
                            t.is("span") ? t.text(n) : t.val(n)
                        }), n < this.pageCount ? e.find(".pdfemb-next").removeAttr("disabled").removeClass("pdfemb-btndisabled") : e.find(".pdfemb-next").attr("disabled", "disabled").addClass("pdfemb-btndisabled"), 1 < n ? e.find(".pdfemb-prev").removeAttr("disabled").removeClass("pdfemb-btndisabled") : e.find(".pdfemb-prev").attr("disabled", "disabled").addClass("pdfemb-btndisabled")
                    }, e.prototype.scrollPageIntoView = function(e) {
                        var t = this.divContainer.find(".pdfemb-pagescontainer"),
                            n = t.find(".pdfemb-page" + e);
                        t.find(".pdfemb-inner-div").not(".pdfemb-page" + e).hide(), n.show(), t[0].scrollTop = 0
                    }, e.prototype.renderPage = function(m, l) {
                        var u, f = this,
                            g = f.invalidationRound,
                            v = this.divContainer,
                            e = v.data("pdfDoc"),
                            b = v.find(".pdfemb-pagescontainer"),
                            w = b.find(".pdfemb-page" + m);
                        w.length && w.data("invalidation-round") >= g ? l && f.scrollPageIntoView(m) : (u = w.data("pending-drawing-round"), g <= u || (0 < u && u < g ? w.data("pending-drawing-round", g) : (w.data("pending-drawing-round", g), e.getPage(m).then(function(t) {
                            f.initialResize || (f.initialResize = !0, f.setSizesBasedOnPage(t), f.resizeViewer(), f.createPageInnerDivs(), f.addGrabToPan(), f.pdfembMakeMobile());
                            var n = (w = 0 == w.length ? b.find(".pdfemb-page" + m) : w).data("widthfactor"),
                                a = w.data("heightfactor");
                            n && a || (e = t.getViewport(1), n = e.width / f.pageWidth, a = e.height / f.pageHeight, w.data("widthfactor", n), w.data("heightfactor", a), 1 == n && 1 == a || f.resizeInnerDivs(m));
                            var o = w.find(".pdfemb-the-canvas");
                            0 == o.length && (o = P("<canvas></canvas>", {
                                class: "pdfemb-the-canvas"
                            }), w.append(o)), l && f.scrollPageIntoView(m);
                            var i = f.wantCanvasWidth,
                                r = f.wantCanvasHeight,
                                e = f.canvasscale,
                                d = f.zoom;
                            o.css("width", i * n), o.css("height", r * a), f.wantMobile ? v.data("grabtopan").deactivate() : v.data("grabtopan").activate();
                            var s = t.getViewport(e * d / 100),
                                c = document.createElement("canvas");
                            c.width = i * y * f.reducefactor * n, c.height = r * y * f.reducefactor * a;

                            function p() {
                                o[0].width = i * y * f.reducefactor * n, o[0].height = r * y * f.reducefactor * a, f.preRenderCanvas(h, m, d);
                                var e = h.getImageData(0, 0, c.width, c.height);
                                o[0].getContext("2d").putImageData(e, 0, 0), e = null, void 0 === f.annotationLayerFactories[m] ? (e = f.annotationsLayerFactory.createAnnotationsLayerBuilder(w[0], t), f.annotationLayerFactories[m] = e) : e = f.annotationLayerFactories[m], null != e && e.setupAnnotations(s, f.divContainer.data("newwindow")), e = null, void 0 === f.textLayerFactories[m] ? (e = f.textLayerFactory.createTextLayerBuilder(w[0], t), f.textLayerFactories[m] = e) : e = f.textLayerFactories[m], null != e && e.setupText(s), w.data("invalidation-round", g), u = w.data("pending-drawing-round"), w.data("pending-drawing-round", ""), g < u && f.renderPage(m, !1)
                            }
                            var h = c.getContext("2d"),
                                e = {
                                    canvasContext: h,
                                    viewport: s,
                                    transform: [y * f.reducefactor, 0, 0, y * f.reducefactor, 0, 0]
                                },
                                e = t.render(e);
                            e.promise.then(function() {
                                "requestAnimationFrame" in window ? window.requestAnimationFrame(p) : setTimeout(p, 1)
                            })
                        }))))
                    }, e.prototype.changeZoom = function(e) {
                        var t = this,
                            n = t.divContainer,
                            a = t.zoom,
                            e = a + e;
                        t.zoom = e, n.find("span.pdfemb-zoom").text(e + "%"), t.fromZoom = a, t.toZoom = e;
                        n = n.find(".pdfemb-pagescontainer");
                        t.pccentreLeft = n.width() / 2, t.pccentreTop = n.height() / 2, t.resizeViewer(), t.resizeInnerDivs(), t.invalidateAllPages(), t.renderPage(t.currentPageNum), t.prerenderNearbyPages(t.currentPageNum)
                    }, e.prototype.queueRenderPage = function(e, t) {
                        this.divContainer;
                        this.renderPage(e, t)
                    }, e.prototype.addToolbar = function(e, t, n) {
                        var a = this.divContainer,
                            o = this,
                            i = P("<div></div>", {
                                class: "pdfemb-toolbar pdfemb-toolbar" + (t ? "-fixed" : "-hover") + " " + (e ? " pdfemb-toolbar-top" : "pdfemb-toolbar-bottom")
                            }),
                            r = P('<button class="pdfemb-prev" title="' + pdfemb_trans.objectL10n.prev + '" type="button"></button>');
                        i.append(r);
                        var d = P('<button class="pdfemb-next" title="' + pdfemb_trans.objectL10n.next + '" type="button"></button>');
                        i.append(d), i.append(P('<div class="pdfemb-page-area">' + pdfemb_trans.objectL10n.page + ' <span class="pdfemb-page-num">0</span> / <span class="pdfemb-page-count"></span></div>'));
                        var s = P('<button class="pdfemb-zoomout" title="' + pdfemb_trans.objectL10n.zoomout + '" type="button"></button>');
                        i.append(s);
                        var c = P('<button class="pdfemb-zoomin" title="' + pdfemb_trans.objectL10n.zoomin + '" type="button"></button>');
                        i.append(c), i.append(P("<div>" + pdfemb_trans.objectL10n.zoom + ' <span class="pdfemb-zoom">100%</span></div>')), n && i.append(P("<div>" + pdfemb_trans.objectL10n.secure + "</div>")), e ? a.prepend(i) : a.append(i), r.on("click", function(e) {
                            o.currentPageNum <= 1 || (o.gotoPage(o.currentPageNum - 1), o.jumpToTop())
                        }), d.on("click", function(e) {
                            o.currentPageNum >= o.pageCount || 0 == o.currentPageNum || (o.gotoPage(o.currentPageNum + 1), o.jumpToTop())
                        }), c.on("click", function(e) {
                            800 <= o.zoom || o.changeZoom(10)
                        }), s.on("click", function(e) {
                            o.zoom <= 20 || o.changeZoom(-10)
                        }), o.addMoreToolbar(i), t || (a.on("mouseenter", function(e) {
                            var t = a.find("div.pdfemb-toolbar-hover");
                            !0 !== t.data("no-hover") && t.show()
                        }), a.on("mouseleave", function(e) {
                            a.find("div.pdfemb-toolbar-hover").hide()
                        }), a.on("pdfembTouchTapped", function(e) {
                            var t;
                            e.stopPropagation(), e.preventDefault(), o.locktaps || (o.locktaps = !0, e = (t = a.find("div.pdfemb-toolbar-hover")).is(":visible"), (e = 1 == t.data("no-hover") ? !0 : e) ? t.hide() : t.show(), setTimeout(function() {
                                o.locktaps = !1
                            }, 250))
                        })), "on" == pdfemb_trans.poweredby && i.append(P("<div></div>", {
                            class: "pdfemb-poweredby"
                        }).append(P('<a href="https://wp-pdf.com/?utm_source=Poweredby&utm_medium=freemium&utm_campaign=Freemium" target="_blank">wp-pdf.com</a>')))
                    }, e.prototype.magnifyEvent = function(e) {
                        var t, n = e.originalEvent.magnification; - 1 == n ? (this.resizeViewer(), this.resizeInnerDivs(), this.invalidateAllPages(), this.renderPage(this.getTopVisiblePageNum())) : (t = this.divContainer.find(".pdfemb-pagescontainer").offset(), this.magnifyZoom(n, e.originalEvent.centreLeft - t.left, e.originalEvent.centreTop - t.top))
                    }, e.prototype.magnifyZoom = function(e, t, n) {
                        var a = this.zoom,
                            e = Math.floor(a * e);
                        this.zoom = e = 800 < (e = e < 20 ? 20 : e) ? 800 : e, this.divContainer.find("span.pdfemb-zoom").text(e + "%"), this.fromZoom = a, this.toZoom = e, this.pccentreLeft = t, this.pccentreTop = n, this.resizeViewer(), this.resizeInnerDivs(), this.invalidateAllPages()
                    }, e.prototype.pdfembWantMobile = function(e, t) {
                        return !1
                    }, e.prototype.pdfembMakeMobile = function() {}, e.prototype.addMoreToolbar = function(e) {}, e.prototype.jumpToTop = function() {}, e.prototype.preRenderCanvas = function(e, t, n) {}, PDFEMB_NS.pdfembPagesViewer = e
                })
            },
            311: e => {
                "use strict";
                e.exports = jQuery
            }
        },
        a = {};

    function o(e) {
        var t = a[e];
        if (void 0 !== t) return t.exports;
        t = a[e] = {
            exports: {}
        };
        return n[e](t, t.exports, o), t.exports
    }
    o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }), t
    }, o.d = (e, t) => {
        for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    (() => {
        "use strict";
        o(439), o(529), o(597), o(147)
    })()
})();