function extMonth(e) {
    switch (e) {
        case 1:
            return "JANEIRO";
        case 2:
            return "FEVEREIRO";
        case 3:
            return "MARÇO";
        case 4:
            return "ABRIL";
        case 5:
            return "MAIO";
        case 6:
            return "JUNHO";
        case 7:
            return "JULHO";
        case 8:
            return "AGOSTO";
        case 9:
            return "SETEMBRO";
        case 10:
            return "OUTUBRO";
        case 11:
            return "NOVEMBRO";
        case 12:
            return "DEZEMBRO"
    }
}

function getIframe(e) {
    return '<iframe src="' + e + '" scrolling="no" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen=""></iframe>'
}

function watchMovie(e) {
    $("#watchMovieButton").removeAttr("onClick"), $.post("includes/ajax/publicFunctions.php", {
        watchMovie: e
    }, function(e) {
        var s = jQuery.parseJSON(e);
        if ("success" == s.status) {
            var t = "";
            $.each(s.list, function(e, s) {
                var a = "dub";
                "Inglês" == s.lang && (a = "leg"), t = t + '\t<div class="btn ' + a + ' click" onclick="showPlayer(' + s.id + ')">' + s.lang + "</div>"
            }), $("#watchMovieButton .langButtons").html(t), 1 == s.count && ("Inglês" == s.list[0].lang ? $("#watchMovieButton").addClass("enOnly") : $("#watchMovieButton").addClass("ptOnly")), $("#watchMovieButton").addClass("langOn").find(".tit").html("audio")
        }
    })
}

function showPlayer(e) {
    $.post("includes/ajax/publicFunctions.php", {
        showPlayer: e
    }, function(e) {
        var s = jQuery.parseJSON(e);
        if ("success" == s.status) {
            var t = "";
            1 == s.mixdrop && (t = t + '<div class="btn mixdrop click" onclick="loadEmbed(' + s.id + ", 'mixdrop', this)\">Mixdrop</div>"), 1 == s.mystream && (t = t + '<div class="btn mystream click" onclick="loadEmbed(' + s.id + ", 'mystream', this)\">Mystream</div>"), 1 == s.fembed && (t = t + '<div class="btn fembed click" onclick="loadEmbed(' + s.id + ", 'fembed', this)\">Fembed</div>"), $("#vp").length && $("#vp").remove(), $("body").prepend('<div id="vp"><div id="embed"></div><div id="vpBar"><div class="back" onclick="closePlayer()"><i class="icon w60" data-generate-icon><svg viewBox="-18 -18 572.009 572" xmlns="http://www.w3.org/2000/svg"><path d="M430.293 255.602H180.23l94.165-94.165c4.855-4.855 4.855-12.73 0-17.582-4.86-4.855-12.73-4.855-17.582 0L141.445 259.223a12.328 12.328 0 00-3.62 8.851 12.874 12.874 0 003.62 8.86l115.368 115.363a12.242 12.242 0 008.851 3.617 12.794 12.794 0 008.856-3.617 12.42 12.42 0 000-17.586l-94.29-94.164h250.063c6.89 0 12.473-5.582 12.473-12.473 0-6.886-5.582-12.472-12.473-12.472zm0 0"/><path d="M268.156-.074C159.7-.094 61.914 65.234 20.41 165.438-21.086 265.644 1.867 380.98 78.582 457.647c104.703 104.704 274.453 104.704 379.152 0 104.7-104.695 104.7-274.445 0-379.148A266.44 266.44 0 00268.156-.074zm0 511.355c-134.074 0-243.203-109.133-243.203-243.207S134.082 24.871 268.156 24.871 511.363 134 511.363 268.074 402.23 511.281 268.156 511.281zm0 0"/></svg></i></div><div class="players">' + t + '</div><div class="report" onclick="reportVideo(' + s.id + ')"><i class="icon w60" data-generate-icon><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M277.332 384c0 11.781-9.55 21.332-21.332 21.332s-21.332-9.55-21.332-21.332 9.55-21.332 21.332-21.332 21.332 9.55 21.332 21.332zm0 0M256 320c-8.832 0-16-7.168-16-16V122.668c0-8.832 7.168-16 16-16s16 7.168 16 16V304c0 8.832-7.168 16-16 16zm0 0"/><path d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"/></svg></i></div></div></div>'), $("#vp .players .btn:first").trigger("click"), $("body").addClass("vpLoad"), $("#vp").addClass("active"), $("html, body").animate({
                scrollTop: 0
            }, "slow")
        }
    })
}

function closePlayer() {
    $("body").removeClass("vpLoad"), $("#vp").removeClass("active"), setTimeout(function() {
        $("#vp").remove()
    }, 300)
}

function loadEmbed(e, s, t) {
    $("#vp .players .btn").removeClass("active"), t.className += " active", $("#embed").html(getIframe("embed/getEmbed.php?id=" + e + "&sv=" + s))
}

function reportVideo(e) {
    if (!checkLogin()) return !1;
    createModal("includes/ajax/publicModals.php?reportPlayer=" + e)
}

function reportPlayerSubmit(e) {
    if (!checkLogin()) return !1;
    var s = $("#reportPlayerSelect").val();
    s && $.post("includes/ajax/userFunctions.php", {
        reportPlayer: "",
        id: e,
        problem: s
    }, function(e) {
        $(".reportbox").remove(), $(".reportPlayerModal .title").html("Reportado! Vizer Agradece.")
    })
}

function loadComments(e, s, t) {
    s && $.post("includes/ajax/publicFunctions.php", {
        getComments: e,
        type: s,
        offset: t
    }, function(e) {
        var s = jQuery.parseJSON(e);
        if ("success" != s.status) return !1;
        $("#loadMoreComments").attr("data-load-comments", parseInt($("[data-load-comments]").attr("data-load-comments")) + 10);
        for (var t = $("#cmtList"), a = s.list, i = [], o = 0; o < s.count; o++) {
            var n = a[o],
                r = n.comment.replace(/&/g, "&amp;").replace(/</g, "&lt;"),
                d = n.username;
            d.length > 16 && (d = d.substring(0, 16) + "..."), 1 == n.spoiler && (r = '<div class="pButton showSpoiler">MOSTRAR SPOILER</div><div class="spoiled hidden">' + r + "</div>");
            var c = "";
            2 == n.rank ? c = '<div class="rank vip">vip</div>' : n.rank >= 3 && (c = '<div class="rank admin">admin</div>'), i.push('<div class="item" data-comment-id="' + n.id + '"><div class="user"><div class="image lazy" data-original="' + n.userimage + '"></div><div class="userLink"><a class="hover" href="perfil/' + n.username + '">' + d + "</a>" + c + '<div class="date">Comentou ' + n.date + '</div></div></div><div class="text">' + r + "</div></div>")
        }
        t.html(i.join("")), lazyLoad();
        $("#cmtBox").attr("data-total-comments");
        s.count < 10 ? ($("#cmt .loadMore").removeClass("active"), $("#cmt .noMore").addClass("active")) : 10 == s.count && ($("#cmt .loadMore").addClass("active"), $("#cmt .noMore").removeClass("active"))
    })
}

function audioList(e) {
    switch (e = parseInt(e)) {
        case 1:
            return "Inglês";
        case 2:
            return "Português";
        case 3:
            return "Japonês";
        case 4:
            return "Chinês";
        case 5:
            return "Coreano";
        case 6:
            return "Espanhol";
        case 7:
            return "Francês";
        case 8:
            return "Italiano";
        default:
            return "Normal"
    }
}

function showSeriePlayer(e, s, t) {
    if (!1 !== t) {
        $("#episodesList .poster").removeClass("active"), $(t).closest(".poster").addClass("active");
        var a = $(t).closest(".poster").find(".title").text();
        $(".langChose").remove()
    } else a = $("#episodesList .poster.active .title").text();
    $.post("includes/ajax/publicFunctions.php", {
        showPlayer: e
    }, function(e) {
        var t = jQuery.parseJSON(e);
        if ("success" == t.status) {
            var i = "";
            1 == t.mixdrop && (i = i + '<div class="btn mixdrop click" onclick="loadEmbed(' + t.id + ", 'mixdrop', this)\">Mixdrop</div>"), 1 == t.mystream && (i = i + '<div class="btn mystream click" onclick="loadEmbed(' + t.id + ", 'mystream', this)\">Mystream</div>"), 1 == t.fembed && (i = i + '<div class="btn fembed click" onclick="loadEmbed(' + t.id + ", 'fembed', this)\">Fembed</div>"), 1 == t.mixdrop && (i = i + '<div class="btn mixdown click" onclick="downloadVideo(' + s + ', 2)">BAIXAR</div>'), $("#vp").length && $("#vp").remove(), $("#episodes").after('<div id="vp" class="seriesVp"><div id="embed"></div><div class="titleBar">' + a + '</div><div id="vpBar"><div class="back nextEp" onclick="nextEpisode(' + t.id + ')"><i class="icon w60" data-generate-icon><svg viewBox="-18 -18 572.009 572" xmlns="http://www.w3.org/2000/svg"><path d="M279.629 143.855c-4.852-4.855-12.723-4.855-17.582 0-4.856 4.852-4.856 12.727 0 17.583l94.164 94.164H106.02c-6.887 0-12.473 5.585-12.473 12.472 0 6.89 5.586 12.473 12.473 12.473h250.066l-94.164 94.164a12.42 12.42 0 000 17.586 12.25 12.25 0 008.855 3.617 12.778 12.778 0 008.852-3.617l115.367-115.363a12.36 12.36 0 003.621-8.86 12.856 12.856 0 00-3.62-8.851zm0 0"/><path d="M268.156-.074C159.7-.094 61.914 65.234 20.41 165.438-21.086 265.644 1.867 380.98 78.582 457.647c104.703 104.704 274.453 104.704 379.152 0 104.7-104.695 104.7-274.445 0-379.148A266.44 266.44 0 00268.156-.074zm0 511.355c-134.074 0-243.203-109.133-243.203-243.207S134.082 24.871 268.156 24.871 511.363 134 511.363 268.074 402.23 511.281 268.156 511.281zm0 0"/></svg></i></div><div class="players">' + i + '</div><div class="report" onclick="reportVideo(' + t.id + ')"><i class="icon w60" data-generate-icon><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M277.332 384c0 11.781-9.55 21.332-21.332 21.332s-21.332-9.55-21.332-21.332 9.55-21.332 21.332-21.332 21.332 9.55 21.332 21.332zm0 0M256 320c-8.832 0-16-7.168-16-16V122.668c0-8.832 7.168-16 16-16s16 7.168 16 16V304c0 8.832-7.168 16-16 16zm0 0"/><path d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"/></svg></i></div></div></div>'), $("#vp .players .btn:first").trigger("click"), $("#vp").addClass("active")
        }
    })
}

function markAsSeenBoxSeason(e, s, t, a) {
    $(".markAsSeenBox").remove(), e ? $("body").append('<div class="markAsSeenBox" style="top:' + a + "px;left:" + t + 'px;"><div class="text">Ainda não assistiu tudo?</div><div class="coolButton gray hover icn click" data-mark-as-seen-season="' + s + '"><img src="img/iSaw.png" class="icon"><div class="txt">DESMARQUE O VISTO</div></div></div>') : $("body").append('<div class="markAsSeenBox" style="top:' + a + "px;left:" + t + 'px;"><div class="text">Já assistiu essa temporada?</div><div class="coolButton green hover icn click" data-mark-as-seen-season="' + s + '"><img src="img/iSaw.png" class="icon"><div class="txt">MARQUE COMO VISTO</div></div></div>')
}

function resetEpisodesSlider(e) {
    var s = $("#episodesList");
    s.removeClass("hidden"), s.trigger("destroy.owl.carousel"), s.owlCarousel({
        center: !1,
        loop: !1,
        autoWidth: !0,
        responsiveClass: !0,
        nav: !1,
        dots: !1,
        margin: 20,
        navText: ["", ""],
        onDragged: ondragcarousel
    }), s.trigger("to.owl.carousel", [e, 0, !0])
}

function markAsSeenBoxEpisode(e, s, t, a) {
    $(".markAsSeenBox").remove(), e ? $("body").append('<div class="markAsSeenBox" style="top:' + a + "px;left:" + t + 'px;"><div class="text">Não assistiu o episódio?</div><div class="coolButton gray hover icn click" data-mark-as-seen-episode="' + s + '"><img src="img/iSaw.png" class="icon"><div class="txt">DESMARQUE O VISTO</div></div></div>') : $("body").append('<div class="markAsSeenBox" style="top:' + a + "px;left:" + t + 'px;"><div class="text">Já assistiu esse episódio?</div><div class="coolButton green hover icn click" data-mark-as-seen-episode="' + s + '"><img src="img/iSaw.png" class="icon"><div class="txt">MARQUE COMO VISTO</div></div></div>')
}
var pressTimer;

function nextEpisode(e) {
    $.post("includes/ajax/publicFunctions.php", {
        nextEpisode: e
    }, function(e) {
        var s = jQuery.parseJSON(e);
        if ("success" == s.status) {
            $("#episodesList .item .poster").removeClass("active"), $("#episodesList .langChose").remove(), $('#episodesList [data-episode-id="' + s.ep + '"] .poster').addClass("active"), showSeriePlayer(s.id, s.ep, !1);
            var t = $('#episodesList [data-episode-id="' + s.ep + '"]').attr("slide-number");
            $("#episodesList").trigger("to.owl.carousel", [t, 500, !0])
        } else if ("nolang" == s.status) alert("Próximo episódio não está disponível na lingua definida, escolha manualmente");
        else {
            if ("end" != s.status) return !1;
            $("#vpBar .nextEp").remove(), alert("Temporada terminada")
        }
    })
}

function downloadVideo(e, s) {
    createModal("includes/ajax/publicModals.php?downloadVideo=" + e + "&type=" + s)
}
$(function() {
    createItemSlider()
}), $(document).on("click", "[data-movie-see-later]", function() {
    if (!checkLogin()) return !1;
    var e = $(this),
        s = e.attr("data-movie-see-later");
    s && $.post("includes/ajax/userFunctions.php", {
        movieSeeLater: s
    }, function(s) {
        var t = jQuery.parseJSON(s);
        if ("success" != t.status) return !1;
        1 == t.result ? e.addClass("active") : e.removeClass("active")
    })
}), $(document).on("click", "[data-like-movie]", function() {
    if (!checkLogin()) return !1;
    var e = $(this),
        s = $("[data-likes-number]"),
        t = e.attr("data-like-movie");
    t && $.post("includes/ajax/userFunctions.php", {
        movieLike: t
    }, function(t) {
        var a = jQuery.parseJSON(t);
        if ("success" != a.status) return !1;
        if (1 == a.result) {
            e.addClass("active");
            var i = parseInt($("[data-likes-number]").attr("data-likes-number")) + 1
        } else {
            e.removeClass("active");
            i = parseInt($("[data-likes-number]").attr("data-likes-number")) - 1
        }
        s.html(i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), s.attr("data-likes-number", i)
    })
}), $(document).on("click", "[data-serie-see-later]", function() {
    if (!checkLogin()) return !1;
    var e = $(this),
        s = e.attr("data-serie-see-later");
    s && $.post("includes/ajax/userFunctions.php", {
        serieSeeLater: s
    }, function(s) {
        var t = jQuery.parseJSON(s);
        if ("success" != t.status) return !1;
        1 == t.result ? (e.addClass("active"), e.find(".txt").html("POR VER")) : (e.removeClass("active"), e.find(".txt").html("VER DEPOIS"))
    })
}), $(document).on("click", "[data-like-serie]", function() {
    if (!checkLogin()) return !1;
    var e = $(this),
        s = $("[data-likes-number]"),
        t = e.attr("data-like-serie");
    t && $.post("includes/ajax/userFunctions.php", {
        serieLike: t
    }, function(t) {
        var a = jQuery.parseJSON(t);
        if ("success" != a.status) return !1;
        if (1 == a.result) {
            e.addClass("active"), e.find(".txt").html("EU CURTI");
            var i = parseInt($("[data-likes-number]").attr("data-likes-number")) + 1
        } else {
            e.removeClass("active"), e.find(".txt").html("CURTIR");
            i = parseInt($("[data-likes-number]").attr("data-likes-number")) - 1
        }
        s.html(i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), s.attr("data-likes-number", i)
    })
}), $(document).on("click", "[data-follow-serie]", function() {
    if (!checkLogin()) return !1;
    var e = $(this),
        s = e.attr("data-follow-serie");
    s && $.post("includes/ajax/userFunctions.php", {
        serieFollow: s
    }, function(s) {
        var t = jQuery.parseJSON(s);
        if ("success" != t.status) return !1;
        1 == t.result ? (e.addClass("active"), e.find(".tit").html("SEGUINDO")) : (e.removeClass("active"), e.find(".tit").html("SEGUIR"))
    })
}), $(document).on("click", "#cmtBox .spoiler", function() {
    $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
}), $(document).on("click", "#cmtBox .commentThis", function() {
    if (!checkLogin()) return !1;
    var e = $("#cmtBox"),
        s = e.attr("data-comment-type"),
        t = e.find("textarea").val(),
        a = e.attr("data-comment-id"),
        i = 0;
    $("#cmtBox .spoiler").hasClass("active") && (i = 1), $.post("includes/ajax/userFunctions.php", {
        makeComment: s,
        id: a,
        comment: t,
        spoiler: i
    }, function(t) {
        var i = jQuery.parseJSON(t);
        "success" == i.status ? (e.find("textarea").val(""), loadComments(parseInt(a), parseInt(s), 0)) : $("#cmt .error").html(i.message).addClass("active")
    })
}), $(document).on("click", "[data-load-comments]", function() {
    var e = $("#cmtBox"),
        s = e.attr("data-comment-type");
    loadComments(e.attr("data-comment-id"), s, $(this).attr("data-load-comments"))
}), $(document).on("click", "#cmtList .showSpoiler", function() {
    $(this).addClass("hidden"), $(this).closest(".item").find(".spoiled").removeClass("hidden")
}), $(document).on("click", "#seasonsList .item", function() {
    var e = $(this).attr("data-season-id");
    $("#seasonsList .item").removeClass("active"), $(this).addClass("active"), $.post("includes/ajax/publicFunctions.php", {
        getEpisodes: e
    }, function(e) {
        var s = jQuery.parseJSON(e);
        if ("success" == s.status) {
            for (var t = s.list, a = [], i = 0, o = 0, n = 0; n < s.count; n++) {
                var r = t[n],
                    d = "";
                1 == r.seen && (d = "seen", i = n);
                var c = "",
                    l = "";
                if (!0 !== r.released) {
                    var u = new Date(r.released);
                    c = '<div class="releaseSoon"><div class="day">' + u.getDate() + '</div><div class="month">' + extMonth(u.getMonth() + 1) + "</div></div>";
                    l = "unreleased"
                }
                var m = "https://image.tmdb.org/t/p/w185" + r.img;
                null == r.img && (m = "img/epthumb.png"), a.push('<div class="item slider-item ' + d + " " + l + '" slide-number="' + o + '" data-episode-id="' + r.id + '"><div class="poster">' + c + '<div class="img" style="background-image:url(' + m + ');"></div><div class="title">' + r.name + ". " + r.title + "</div></div></div>"), o++
            }
            var v = $("#episodes");
            v.hasClass("active") ? (v.addClass("trans"), setTimeout(function() {
                $("#episodesList").html(a.join("")), resetEpisodesSlider(i), v.removeClass("trans")
            }, 300)) : ($("#episodesList").html(a.join("")), resetEpisodesSlider(i), v.addClass("active"))
        }
    })
}), $(document).on("click", "#episodesList .item:not(.unreleased)", function(e) {
    if ($(e.target).is(".langChose, .langChose *")) return !1;
    var s = $(this),
        t = s.attr("data-episode-id");
    $.post("includes/ajax/publicFunctions.php", {
        getEpisodeLanguages: t
    }, function(e) {
        var a = jQuery.parseJSON(e);
        if ("success" == a.status) {
            for (var i = a.list, o = [], n = 0; n < a.count; n++) {
                var r = i[n],
                    d = audioList(r.lang);
                o.push('<div class="btn click" onClick="showSeriePlayer(' + r.id + ", " + t + ', this)">' + d + "</div>")
            }
            var c = "";
            1 == a.count && (c = "one"), $(".langChose").remove(), s.find(".poster").append("<div class='langChose " + c + "'><div class='tit'>AUDIO</div>" + o.join("") + "</div>"), setTimeout(function() {
                s.find(".langChose").addClass("active")
            }, 100)
        }
    })
}), $(document).on("contextmenu", "#seasonsList .item", function(e) {
    if (!logged) return !1;
    e.preventDefault();
    var s = $(this).attr("data-season-id"),
        t = !1;
    $(this).hasClass("seen") && (t = !0), markAsSeenBoxSeason(t, s, $(this).offset().left, $(this).offset().top - 97)
}), $(document).on("touchend", "#seasonList [data-season-id], #episodesList [data-episode-id]", function(e) {
    clearTimeout(pressTimer)
}).on("touchstart", "[data-season-id],[data-episode-id]", function(e) {
    var s = $(e.currentTarget);
    pressTimer = window.setTimeout(function() {
        s.trigger("contextmenu")
    }, 700)
}), $(document).on("touchstart", function(e) {
    0 === $(e.target).closest(".markAsSeenBox").length && $(".markAsSeenBox").remove()
}), $(document).on("contextmenu", "#episodesList [data-episode-id]", function(e) {
    if ($(this).hasClass("unreleased")) return !1;
    if (!logged) return !1;
    e.preventDefault();
    var s = $(this).attr("data-episode-id"),
        t = !1;
    $(this).hasClass("seen") && (t = !0), markAsSeenBoxEpisode(t, s, $(this).offset().left, $(this).offset().top - 97)
}), $(document).on("mouseleave", "#episodesList, #seasonsList", function(e) {
    if ($(".markAsSeenBox").length) {
        var s = e.pageY,
            t = $(".markAsSeenBox").offset();
        s >= (t = t.top + 110) && $(".markAsSeenBox").remove()
    }
}), $(document).on("mouseleave", ".markAsSeenBox", function(e) {
    $(".markAsSeenBox").length && $(".markAsSeenBox").remove()
}), $(document).on("click", "[data-mark-as-seen-season]", function() {
    if (!checkLogin()) return !1;
    var e = $(this).attr("data-mark-as-seen-season"),
        s = $(this).closest(".markAsSeenBox"),
        t = $('#seasonsList [data-season-id="' + e + '"]'),
        a = $("body").attr("data-serie-id");
    a && $.post("includes/ajax/userFunctions.php", {
        seasonMarkAsSeen: e,
        serie: a
    }, function(e) {
        var a = jQuery.parseJSON(e);
        "success" == a.status && (1 == a.result ? (s.find(".text").html("Ainda não assistiu tudo?"), s.find(".coolButton").removeClass("green").addClass("gray"), s.find(".coolButton .txt").html("DESMARQUE O VISTO"), t.hasClass("active") && $("#episodesList .item").addClass("seen"), t.addClass("seen")) : (s.find(".text").html("Já assistiu essa temporada?"), s.find(".coolButton").removeClass("gray").addClass("green"), s.find(".coolButton .txt").html("MARQUE COMO VISTO"), t.removeClass("seen"), t.hasClass("active") && $("#episodesList .item").removeClass("seen")))
    })
}), $(document).on("click", "[data-mark-as-seen-episode]", function() {
    if (!checkLogin()) return !1;
    var e = $(this).attr("data-mark-as-seen-episode"),
        s = $(this).closest(".markAsSeenBox"),
        t = $('#episodesList [data-episode-id="' + e + '"]'),
        a = $("#seasonsList [data-season-id].active"),
        i = $("#seasonsList .item.active").attr("data-season-id"),
        o = $("body").attr("data-serie-id");
    o && $.post("includes/ajax/userFunctions.php", {
        episodeMarkAsSeen: e,
        season: i,
        serie: o
    }, function(e) {
        var i = jQuery.parseJSON(e);
        "success" == i.status && (1 == i.result ? (s.find(".text").html("Não assistiu o episódio?"), s.find(".coolButton").removeClass("green").addClass("gray"), s.find(".coolButton .txt").html("DESMARQUE O VISTO"), t.addClass("seen")) : (s.find(".text").html("Já assistiu esse episódio?"), s.find(".coolButton").removeClass("gray").addClass("green"), s.find(".coolButton .txt").html("MARQUE COMO VISTO"), t.removeClass("seen"), a.removeClass("seen")))
    })
});