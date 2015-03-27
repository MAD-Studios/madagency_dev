// _________________________________________________________________________ PaneView
main.views.PaneView = Backbone.View.extend({
	ACTIVE_CLASS: "pane-active",
	PREPARED_CLASS: "pane-prepared",
	FULL_SCREEN_CLASS: "full-screen",
	DEACTIVATE: "deactivate",
	ACTIVATE: "activate",
	RESIZE: "resize",
	offset: 0,
	id: "",
	_route: "",
	paneActivationData: [],
    // ----------------- initialize
    initialize: function() {
        console.log("PaneView ---- initialize");
    },
    // ----------------- render
    render: function(eventName) {
	    var self = this;
	    if(this.beforeRender) this.beforeRender();
        console.log("PaneView ---- render");
        //create a view for each pane
        setTimeout(function(){
	         self.posize();
        }, 100);
        return this;
	},
	// ----------------- posize
    posize: function() {
		if( $(this.el).hasClass(this.FULL_SCREEN_CLASS)){
			var to_h = $(window).outerHeight();
			var min_h = $(this.el).css('min-height');
			if(to_h < min_h) to_h = min_h;
			$(this.el).height( to_h );
		} 
		if(this.beforePosize) this.beforePosize();
    },
    // ----------------- activate
    activate: function() {
    	console.log("activate ----------------- this.id = " + this.id);
	    $(this.el).addClass(this.ACTIVE_CLASS);
	    if(this.beforeActivate) this.beforeActivate();
	    if(main.router.navigate && !main.router.autoScrolling)  main.router.navigate(this._route, {trigger: false});
	    $(this.el).trigger(this.ACTIVATE, [this.id]);
    }, 
    // ----------------- deactivate
    deactivate: function() {
	    console.log("deactivate ----------------- this.id = " + this.id);
    	$(this.el).removeClass(this.ACTIVE_CLASS);
	    if(this.beforeDeactivate) this.beforeDeactivate();
	    $(this.el).trigger(this.DEACTIVATE);
    },
    // ----------------- prepare
    prepare: function() {
		$(this.el).addClass(this.PREPARED_CLASS);
    	if(this.beforePrepare) this.beforePrepare();
    }
});