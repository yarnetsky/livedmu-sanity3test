$(function() {
    let event_len = $("#localist-widget-84071707 > div > div > ul li").length;
    if (event_len < 1) {
        $("section#home-events").css('display','none');
    }
});