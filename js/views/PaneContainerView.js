// _________________________________________________________________________ PaneContainerView
main.views.PaneContainerView = Backbone.View.extend({
	PANE_ACTIVATE: "pane_activate",
	PANE_ID_END_STR: "-pane",
	INTRO_PANE_SUBMIT: "intro_pane_submit",
	INTRO_PANE_IDLE: "intro_pane_idle",
	SCROLL_TO_BOTTOM: "scroll_to_bottom",
    UPDATE_HEIGHT: "update_height",
	DOWN: "down",
	UP: "up",
	offset: 0,
	nav_offset: 0,
	paneViews: [],
	curPaneView: {},
	defaultPaneId: "intro",
    // ----------------- initialize
    initialize: function() {
        console.log("PaneContainerView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("PaneContainerView ---- render");
        var self = this;
        this.renderCommonParts();
        return this;
	},
    // ----------------- renderCommonParts
    renderCommonParts: function() {
        this.renderCommonPanes();
    },
    // ----------------- renderCommonPanes
    renderCommonPanes: function() {
	    var self = this;
        var pane_view;
        this.paneViews = [];
        if(this.renderPanes) this.renderPanes();
        for(var i=0;i<this.paneViews.length;i++){
		    pane_view = this.paneViews[i];
			$(pane_view.el).on(pane_view.ACTIVATE, function(event, params){
		        $(self.el).trigger(self.PANE_ACTIVATE, [params]);
	        });
	        pane_view.render();
		}        
        setTimeout(function(){
	        self.lastScrollTop = $(window).scrollTop();
	        setTimeout(function(){
		        self.checkPanes();
	        }, 400);
        }, 200);
    },
	// ----------------- updateForUnsupportedBrowsers
    updateForUnsupportedBrowsers: function() {
	},
	// ----------------- initPanes
    initPanes: function() {
	    var self = this;
    	this.paneCollection = new main.models.PaneCollection();
	    var pane_obj, pos, pos_top, end_pos_top, pane_model, paneHeight;
		//save each pane id
	    //and its absolute position on the page
	    for(var i=0;i<this.paneViews.length;i++){
		    pane_view = this.paneViews[i];
		    pos = $(pane_view.el).offset();
			paneHeight = $(pane_view.el).outerHeight();
		    if(i == 0) pos_top = pos.top;
		    else pos_top = pos.top - this.offset - pane_view.offset;
		    end_pos_top = pos_top + paneHeight;
		    pane_model = new main.models.PaneModel({id: i+1, el_id: $(pane_view.el).attr('id'), posY: pos_top, endPosY: end_pos_top, view: pane_view}); 
		    self.paneCollection.add(pane_model);
	    }
    },
    // ----------------- updateHeight
    updateHeight: function() {
        $(this.el).trigger(this.UPDATE_HEIGHT);
    },
    // ----------------- posize
    posize: function() {
	    var pane_view;
	    if(this.beforePosize) this.beforePosize();
	    
	    for(var i=0;i<this.paneViews.length;i++){
	    	pane_view = this.paneViews[i];
	    	if(pane_view.posize) pane_view.posize();
		}
	    this.initPanes();
    },
    // ----------------- checkPanes
    checkPanes: function(actual_scroll_top) {
		var pane_view, pane_model, direction;
		var self = this;
		var scroll_top = actual_scroll_top + this.offset;
		var scroll_bottom = actual_scroll_top + $(window).height();
		if(this.lastScrollTop < scroll_top) direction = this.DOWN;
		else direction = this.UP;
		this.lastScrollTop = scroll_top;
		
		if(scroll_top >= 0 && this.paneCollection){
		    pane_model = this.paneCollection.find(function(model){
		         return ( scroll_top >= model.get("posY") && scroll_top < model.get("endPosY") );
		    });
		    //get the view based upon pane_data_model.el_id
			if(pane_model) {
				pane_view = pane_model.get("view");
				if(pane_view.onScroll)  pane_view.onScroll(actual_scroll_top);
				if( !$(pane_view.el).hasClass(pane_view.ACTIVE_CLASS) ){
					pane_view.activate();
					if(this.curPaneView && this.curPaneView.deactivate) this.curPaneView.deactivate();
					this.curPaneView = pane_view;
				} 				
			}
			//if has entered the screen
			//call prepare on the pane
			pane_model_arr = this.paneCollection.filter(function(model){
		         return ( (model.get("posY") <= scroll_bottom && direction == self.DOWN) || (model.get("endPosY") <= scroll_top && direction == self.UP));
		    });
			for(var i=0;i<pane_model_arr.length;i++){
				pane_view = pane_model_arr[i].get("view");
				if( !$(pane_view.el).hasClass(pane_view.PREPARED_CLASS) ) pane_view.prepare();
			}
		}
	},
    // ----------------- scrollToTop
    scrollToTop: function() {
        TweenLite.to(window, 1.4, {scrollTo:{y:0, autoKill:false}, ease:Expo.easeOut, onStart:self.onAutoScrollStart, onComplete:self.onAutoScrollComplete});
    },
    // ----------------- scrollWindowTo
    scrollWindowTo: function(id, animate) {
      if(animate == null || typeof animate === undefined) animate = true;
	  var self = this;	  
	  //scroll the window to the correct pane 
	  //according to id
	  if(this.paneCollection){
		  var pane_model = this.paneCollection.find(function(model){
			return ( model.get("el_id") == (id + self.PANE_ID_END_STR) );
		  });
		  var scroll_to_y = pane_model.get("posY");

		  if(animate) TweenLite.to(window, 1.4, {scrollTo:{y:scroll_to_y, autoKill:false}, ease:Expo.easeOut, onStart:self.onAutoScrollStart, onComplete:self.onAutoScrollComplete});
		  else $(window).scrollTop(scroll_to_y);
	  }
    },
    // ----------------- scrollToBottom
    scrollToBottom: function(el) {
	  var self = this;
	  var scroll_to_y = $(this.el).height() - $(window).height() + (this.offset*2);
	  //only scroll here if current scroll is above the custom bottom value
	  //if scroll_to_y > the current scroll
	  if($(el).scrollTop() < scroll_to_y){
		  TweenLite.to(el, 1.4, {scrollTo:{y:scroll_to_y, autoKill:false}, ease:Expo.easeOut, onStart:self.onAutoScrollStart, onComplete:self.onAutoScrollComplete});
	  }
    },
    // ----------------- beginHide
    beginHide: function() {
	    this.scrollToTop();
		if(this.afterBeginHide) this.afterBeginHide();
    },
    // ----------------- onAutoScrollStart
    onAutoScrollStart: function() {
	    main.router.autoScrolling = true;
    },
    // ----------------- onAutoScrollComplete
    onAutoScrollComplete: function() {
        main.router.autoScrolling = false;
    },
    // ----------------- beforeDispose
	beforeDispose: function(){
		var view;
		//remove events
		//dispose each pane
		for( var i=0;i<this.paneViews.length;i++){
			view = this.paneViews[i];
			view.dispose();
			$(view.el).off();
		}
	}
});