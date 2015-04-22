// _________________________________________________________________________ DisciplinesPaneView
main.views.corporate.DisciplinesPaneView = main.views.PaneView.extend({
	id: "disciplines",
	_route: "disciplines",
	// ----------------- initialize
    initialize: function() {
        console.log("DisciplinesPaneView ---- initialize");
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("DisciplinesPaneView ---- beforeRender");
        var self = this;
        setTimeout(function(){
	        self.override_offset =  -$('.divider', self.el).outerHeight();
        }, 100);
	}
});