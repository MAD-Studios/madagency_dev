// _________________________________________________________________________ PaneContainerView
main.views.PaneContainerView = Backbone.View.extend({
	PANE_ACTIVATE: "pane_activate",
	PANE_ID_END_STR: "-pane",
	METHOD_PANE_SUBMIT: "method_pane_submit",
	METHOD_PANE_IDLE: "method_pane_idle",
	SCROLL_TO_BOTTOM: "scroll_to_bottom",
	DOWN: "down",
	UP: "up",
	offset: 0,
	paneViews: [],
	curPaneView: {},
	defaultPaneId: "method",
    // ----------------- initialize
    initialize: function() {
        console.log("PaneContainerView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("PaneContainerView ---- render");
        var self = this;
        var pane_view;
        this.paneViews = [];
        
        this.methodPaneView = new main.views.MethodPaneView( {el: $('#method-pane', this.el)} );
        this.paneViews.push(this.methodPaneView);
        this.howPaneView = new main.views.HowPaneView( {el: $('#how-pane', this.el)} );
        this.paneViews.push(this.howPaneView);
        this.workPaneView = new main.views.WorkPaneView( {el: $('#work-pane', this.el)} );
        this.paneViews.push(this.workPaneView);
        this.teamPaneView = new main.views.TeamPaneView( {el: $('#team-pane', this.el)} );
        this.paneViews.push(this.teamPaneView);
        this.disciplinesPaneView = new main.views.DisciplinesPaneView( {el: $('#disciplines-pane', this.el)} );
        this.paneViews.push(this.disciplinesPaneView);
        this.contactPaneView = new main.views.ContactPaneView( {el: $('#contact-pane', this.el)} );
        this.paneViews.push(this.contactPaneView);
        
        //set unique properties
        //for each pane
        //method pane -------
        $(this.methodPaneView.el).on(this.methodPaneView.SUBMIT, function(event){
	        $(self.el).trigger(self.METHOD_PANE_SUBMIT);
        });
        //listen for the method apne idle event
        $(this.methodPaneView.el).on(this.methodPaneView.IDLE, function(event){
	        $(self.el).trigger(self.METHOD_PANE_IDLE);
        });
        //set the methodPaneView to active
        this.methodPaneView.activate();
        this.curPaneView =  this.methodPaneView;
        
        //contact pane ----
        $(this.contactPaneView.el).on(this.contactPaneView.RESIZE, function(event){
	        self.initPanes();
        });
        $(this.contactPaneView.el).on(this.contactPaneView.SHOW_MESSAGE, function(event){
	        //scrollto bottom of the screen
	        $(self.el).trigger(self.SCROLL_TO_BOTTOM);
        });        
        
        //set common properties
        //for each pane
        for(var i=0;i<this.paneViews.length;i++){
		    pane_view = this.paneViews[i];
			$(pane_view.el).on(pane_view.ACTIVATE, function(event, params){
		        $(self.el).trigger(self.PANE_ACTIVATE, [params]);
	        });
	        pane_view.render();
		}        
        setTimeout(function(){
	        self.lastScrollTop = $(window).scrollTop();
	        self.initPanes();
	        setTimeout(function(){
		        self.checkPanes();
	        }, 400);
        }, 200);
        return this;
	},
	// ----------------- updateForUnsupportedBrowsers
    updateForUnsupportedBrowsers: function() {
	    this.methodPaneView.updateForUnsupportedBrowsers();
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
    // ----------------- posize
    posize: function() {
	    this.methodPaneView.posize();
	    this.howPaneView.posize();
	    this.workPaneView.posize();
	    this.teamPaneView.posize();
	    this.disciplinesPaneView.posize();
	    this.contactPaneView.posize();
	    this.initPanes();
    },
    // ----------------- checkPanes
    checkPanes: function() {
		var pane_view, pane_model, direction;
		var self = this;
		var scroll_top = $(window).scrollTop() + this.offset;
		var scroll_bottom = $(window).scrollTop() + $(window).height();
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
	  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	  console.log("scrollTop = " + $(el).scrollTop());
	  console.log("scroll_to_y = " + scroll_to_y);
	  if($(el).scrollTop() < scroll_to_y){
		  TweenLite.to(el, 1.4, {scrollTo:{y:scroll_to_y, autoKill:false}, ease:Expo.easeOut, onStart:self.onAutoScrollStart, onComplete:self.onAutoScrollComplete});
	  }
    },
    // ----------------- beginHide
    beginHide: function() {
	    this.scrollToTop();
	    this.methodPaneView.beginHide();
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