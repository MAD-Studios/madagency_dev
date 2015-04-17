// _________________________________________________________________________ MainView
main.views.castle.MainView = main.views.MainView.extend({
    EXIT_URL: "/contact",
    // ----------------- initiateCorporate
    initiateCorporate: function(){  
    	var self = this; 
	    this.corporateView = new main.views.castle.CorporateView( {el: $('.corporate', this.el)} );
	    
	    $(this.corporateView.el).on( main.events.castle.Event.ENTER_CASTLE, function(){
		    self.moveIntoCastle();
	    });
    },
    // ----------------- openCastle
    openCastle: function() {
	    var self = this;
	    var castle_div;
	    
	    this.initCastle();
	},
	// ----------------- createCastle
    createCastle: function(){
    	if(!this.castleView) this.castleView = new main.views.castle.CastleView( { el: $('.castle', this.el) } );
    },
	// ----------------- initCastle
    initCastle: function(){
    	var self = this;
    	this.createCastle();
	    $(this.castleView.el).addClass(this.STAGE_CENTER_CLASS);
	    
	     //create Story view
	    $(this.castleView.el).on(main.events.castle.Event.EXIT_CASTLE, function(event){
		   //navigate back to corporate site
		   window.location.href = self.EXIT_URL;
	    });

	    this.castleView.render();
	    this.castleView.startLoader();
	    setTimeout(function(){
	    	self.castleView.show();
		    setTimeout(function(){
			    self.removeCorporate();
		    }, 1200);
	    }, 200);
    },
    // ----------------- moveIntoCastle
    moveIntoCastle: function(){
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
	    }, 1600);
    },
    // ----------------- beginHideCorporateView
    beginHideCorporateView: function() {
	    this.corporateView.beginHide();
    },
    // ----------------- removeCorporate
    removeCorporate: function() {
	    this.corporateView.dispose(); 
	    $(this.corporateView.el).remove();
	    $(this.corporateView.el).off();
    },
    // ----------------- setCorporateListeners
    setCorporateListeners: function(){
	    var self = this;	
	    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    //append corporate view
	    /*$(this.corporateView.el).on(this.corporateView.CORPORATE_SUBMIT, function(event){
		    self.moveIntoCastle();
        });*/
        //listen fo rthe method pane idle event
        //so that you can 
        //automatically go into the castle
        //when the method pane is idle
	    /*$(this.corporateView.el).on(this.corporateView.METHOD_PANE_IDLE, function(event){
	    	self.moveIntoCastle();
	    });*/
    }
});