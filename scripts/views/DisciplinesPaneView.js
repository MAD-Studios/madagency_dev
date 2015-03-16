// _________________________________________________________________________ DisciplinesPaneView
main.views.DisciplinesPaneView = main.views.PaneView.extend({
	id: "disciplines",
	_route: "disciplines",
	offset: 0,
	// ----------------- initialize
    initialize: function() {
        console.log("DisciplinesPaneView ---- initialize");
        //this.render();
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("DisciplinesPaneView ---- beforeRender");
        var self = this;
        setTimeout(function(){
	        self.offset =  -$('.spacer', self.el).outerHeight() - 1;
        }, 100);
	}
});