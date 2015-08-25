// _________________________________________________________________________ FauxIntroPaneView
main.views.corporate.FauxIntroPaneView = main.views.PaneView.extend({
    // ----------------- setHeight
    setHeight: function(_height) {
        $(this.el).css('height', _height + 'px');
    }
});