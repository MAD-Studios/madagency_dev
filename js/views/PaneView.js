// _________________________________________________________________________ PaneView
main.views.PaneView = Backbone.View.extend({
	ACTIVE_CLASS: "pane-active",
	PREPARED_CLASS: "pane-prepared",
	FULL_SCREEN_CLASS: "full-screen",
	DEACTIVATE: "deactivate",
	ACTIVATE: "activate",
	RESIZE: "resize",
	offset: 0,
	override_offset: 0,
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
    	console.log("PaneView ---- posize ----------------- ");
		if( $(this.el).hasClass(this.FULL_SCREEN_CLASS)){
			var to_h = $(window).outerHeight();
			var min_h = $(this.el).css('min-height');
			if(to_h < min_h) to_h = min_h;
			$(this.el).height( to_h );
		} 
		this.setOffset();
		if(this.beforePosize) this.beforePosize();
    },
    // ----------------- setOffset
    setOffset: function() {
        var cur_divider_title, 
            pane_title_el, 
            divider_el, 
            margin_top;
        var margin_top_is_neg = false; 
        $('.row-pane-divider', this.el).each(function(){
            if($(this).css('display') != 'none'){
                cur_divider_title = $(this);
                return;
            }
        });
        
        if(cur_divider_title){
            margin_top = cur_divider_title.css('marginTop');
            if(margin_top.indexOf('px') > -1) margin_top = parseInt(margin_top);
            else margin_top = 0;
            console.log();
            if(typeof margin_top == 'number' && margin_top < 0) margin_top_is_neg = true;
            pane_title_el = $('.pane-title', cur_divider_title);
            divider_el = $('.divider', cur_divider_title);
            if(!margin_top_is_neg){
                if(pane_title_el && divider_el) this.offset = -(pane_title_el.outerHeight() + divider_el.outerHeight());
                else if(pane_title_el) this.offset = -pane_title_el.outerHeight();
                else if(divider_el) this.offset = -divider_el.outerHeight();
                else this.offset = 0;
            }
            else this.offset = 0;
            
            if(this.override_offset) this.offset = this.override_offset;
        }
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