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
        console.log("MainView ---- render");
        var self = this;
        this.setMainListeners();
        this.initiateCorporate();
        if(this.setCorporateListeners) this.setCorporateListeners();
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
	    if(this.corporateView && this.corporateView.posize) this.corporateView.posize();
	    if(this.castleView && this.castleView.posize) this.castleView.posize();
	    if($(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS)){
		   	this.disableDocumentScroll();
	    }
	    else this.enableDocumentScroll();
    },
    // ----------------- setMainListeners
    setMainListeners: function() {
    	var self = this;
		$(this.el).on(main.events.Event.ENABLE_DOCUMENT_SCROLL, function(){
		    console.log("setMainListeners ------------- ENABLE_DOCUMENT_SCROLL");
			self.enableDocumentScroll();
			//self.elementManipulator.enableDocumentScroll();
		});
		$(this.el).on(main.events.Event.DISABLE_DOCUMENT_SCROLL, function(){
			console.log("setMainListeners ------------- DISABLE_DOCUMENT_SCROLL");
			self.disableDocumentScroll();
			//self.elementManipulator.disableDocumentScroll();
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
        console.log("updateDocumentScroll ----- $(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS) = " + $(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS));

    	if($(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS)){
		   $(this.el).css('height', ($(window).outerHeight()) + 'px');
	    }
	    else $(this.el).css('height', $(this.corporateView.el).outerHeight() + 'px');
	    
	    //console.log(' --------- $(this.corporateView.el).outerHeight() = ' + $(this.corporateView.el).outerHeight() );
	   if( this.corporateView && this.corporateView.el ) console.log(' --------- $(this.corporateView.el).outerHeight() = ' + $(this.corporateView.el).outerHeight() );
	   
	    //$(this.el).css('height', '2400px');

	    
	   //$(this.el).css('height', $(this.corporateView.el).outerHeight() + 'px');
	    
	    //console.log("updateDocumentScroll ----- $(this.corporateView.el).outerHeight() = " + $(this.corporateView.el).outerHeight());
    },
    // ----------------- scrollToPane
    scrollToPane: function(id) {
	   this.corporateView.scrollWindowTo(id);
	   this.corporateView.markNav(id);
    },
    // ----------------- initiateCorporate
    initiateCorporate: function(){ 
  
	    if(!this.corporateView) this.corporateView = new main.views.CorporateView( {el: $('.corporate', this.el)} );
    }
});