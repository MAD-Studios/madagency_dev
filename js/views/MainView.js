// _________________________________________________________________________ MainView
main.views.MainView = Backbone.View.extend({
	STAGE_LEFT_CLASS: "stage-left",
	STAGE_CENTER_CLASS: "stage-center",
	STAGE_RIGHT_CLASS: "stage-right",
	STAGE_TRANSITION: "stage-transition",
	EXIT_STORY_PANE: "contact",
	elementManipulator: main.utils.ElementManipulator,
    // ----------------- initialize
    initialize: function() {
        console.log("MainView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("MainView ---- initialize");
        var self = this;
        this.setMainListeners();
        this.initiateCorporate();
        setTimeout(function(){
	        self.posize();
        }, 300);
        $(window).resize(
	       function(){ self.posize(); }
        );
        return this;
	},
	// ----------------- posize
    posize: function() {
    	console.log("MainView posize");
	   // $(this.el).css('height', $(window).height() + 'px');
	    if(this.corporateView && this.corporateView.posize) this.corporateView.posize();
	    if(this.castleView && this.castleView.posize) this.castleView.posize();
	    if($(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS)){
		   	this.disableDocumentScroll();
	    }
	    else{
	    	this.enableDocumentScroll();
	    }
    },
    // ----------------- setMainListeners
    setMainListeners: function() {
    	var self = this;
		$(this.el).on(main.events.Event.ENABLE_DOCUMENT_SCROLL, function(){
			self.enableDocumentScroll();
			self.elementManipulator.enableDocumentScroll();
		});
		$(this.el).on(main.events.Event.DISABLE_DOCUMENT_SCROLL, function(){
			self.disableDocumentScroll();
			self.elementManipulator.disableDocumentScroll();
		});
    },
    // ----------------- enableDocumentScroll
    enableDocumentScroll: function() {
		this.elementManipulator.enableDocumentScroll();
		this.updateDocumentScroll();
    },
    // ----------------- disableDocumentScroll
    disableDocumentScroll: function() {
    	this.elementManipulator.disableDocumentScroll();
		this.updateDocumentScroll();
    },
    // ----------------- enableDocumentScroll
    updateDocumentScroll: function() {
    	if($(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS)){
		   $(this.el).css('height', ($(window).height()) + 'px');
	    }
	    else{
		    $(this.el).css('height', $(this.corporateView.el).outerHeight() + 'px');
	    }
    },
    // ----------------- scrollToPane
    scrollToPane: function(id) {
	   this.corporateView.scrollWindowTo(id);
	   this.corporateView.markNav(id);
    },
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ----------------- openCastle
    /*openCastle: function() {
	    var self = this;
	    var castle_div;
	    if(!this.castleView) this.castleView = new main.views.CastleView( { el: $('.castle', this.el) } );
	    else {
			this.castleView = new main.views.CastleView();
		    $(this.el).append($(this.castleView.el));
		}
	    //create Castle view
	    $(this.castleView.el).on(this.castleView.EXIT, function(event){
		    self.closeCastle();
	    });
	    $(this.castleView.el).on(this.castleView.HIDE_COMPLETE, function(event){
		    self.handleHideCastleComplete();
	    });
	    $(this.castleView.el).addClass(this.STAGE_CENTER_CLASS);
	    this.castleView.render();
	    this.castleView.startLoader();
	    setTimeout(function(){
	    	self.castleView.show();
		    setTimeout(function(){
			    self.removeCorporate();
		    }, 1200);
	    }, 100);
	},*/
	
	// ----------------- closeCastles
   /* closeCastle: function() {
	    var self = this;
	    //first hide the castle
	    this.castleView.hide();	    
	},
    // ----------------- handleHideCastleComplete
    handleHideCastleComplete: function() {
	    var self = this;
	    setTimeout(function(){
	        $(document.body).height($(window).height());
	        $(document.body).css('overflow-x', 'visible');
	        $(document.body).css('overflow-y', 'visible');
	        $(document.documentElement).css('overflow-x', 'visible');
	        $(document.documentElement).css('overflow-y', 'visible');
	        $(document.documentElement).removeClass('no-skrollr');
		    //add the corporate view back
		    self.initiateCorporate();
		    //add the left transition class
		    $(self.corporateView.el).addClass(self.STAGE_TRANSITION);
		    $(self.castleView.el).addClass(self.STAGE_TRANSITION);
		    $(self.corporateView.el).removeClass(self.STAGE_CENTER_CLASS);
		    $(self.corporateView.el).addClass(self.STAGE_LEFT_CLASS);
		    $(self.corporateView.el).css('top', '0');
		    //set it to the left of the stage
		    //transition the castle view 
		    //out to the right
		    //set it from fixed to absolute
		    setTimeout(function(){
			    $(self.castleView.el).css('position', 'absolute');
			    $(self.corporateView.el).removeClass(self.STAGE_CENTER_CLASS);
			    $(self.castleView.el).addClass(self.STAGE_RIGHT_CLASS);     
			    //add webkit transition end listener
			    $(self.castleView.el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
				    $(self.castleView.el).off('transitionend webkitTransitionEnd oTransitionEnd');
				    self.removeCastle();
				});
			    //trasnition th ecorporate view
			    //in from the left
			    $(self.corporateView.el).removeClass(self.STAGE_LEFT_CLASS);
			    $(self.corporateView.el).addClass(self.STAGE_CENTER_CLASS);
		    }, 300);
		 }, 100);
    },*/
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ----------------- moveIntoCastle
    /*moveIntoCastle: function(){
	    //first begin the hide animation 
	    //of the corporate view
	    //then open/add the castle view 
	    //so that the memory spike during the add
	    //does not affect the performance of
	    //the hide animation
	    var self = this;
	    this.beginHideCorporateView();
	    setTimeout(function(){
		    self.openCastle();
	    }, 1400);
    },*/
    // ----------------- initiateCorporate
    initiateCorporate: function(){
	    var self = this;
	    
	    
	    if(!this.corporateView) this.corporateView = new main.views.CorporateView( {el: $('.corporate', this.el)} );
	    else {
		    this.corporateView = new main.views.CorporateView();
		    this.corporateView.unfixHeader();
		    $(this.el).append($(this.corporateView.el));
		    //set scrolltop to go to the 
		    //contact pane
		    setTimeout(function(){
			    var animate = false;
			    self.corporateView.scrollWindowTo(self.EXIT_STORY_PANE, animate);
			    self.corporateView.fixHeader();
		    }, 200);
	    }
	    //append corporate view
	    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    $(this.corporateView.el).on(this.corporateView.CORPORATE_SUBMIT, function(event){
		    self.moveIntoCastle();
        });
        //listen fo rthe method pane idle event
        //so that you can 
        //automatically go into the castle
        //when the method pane is idle
	    $(this.corporateView.el).on(this.corporateView.METHOD_PANE_IDLE, function(event){
	    	self.moveIntoCastle();
	    });
    },
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ----------------- beginHideCorporateView
    /*beginHideCorporateView: function() {
	    this.corporateView.beginHide();
    },
    // ----------------- removeCorporate
    removeCorporate: function() {
	    this.corporateView.dispose(); 
	    $(this.corporateView.el).remove();
	    $(this.corporateView.el).off();
    },
    // ----------------- removeCastle
    removeCastle: function() {
	    this.castleView.dispose(); 
	    $(this.castleView.el).css('visibility', 'hidden');
	    $(this.castleView.el).remove();
	    $(this.castleView.el).off();
    }*/
});