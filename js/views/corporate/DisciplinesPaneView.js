// _________________________________________________________________________ DisciplinesPaneView
main.views.corporate.DisciplinesPaneView = main.views.PaneView.extend({
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
	        self.offset =  -$('.divider', self.el).outerHeight();
        }, 100);
	}
});