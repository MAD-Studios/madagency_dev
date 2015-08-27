// _________________________________________________________________________ main Router
main.routers.Router = Backbone.Router.extend({
	 UNROUTED_TIMEOUT: 2000,
	 unrouted: true,
     routes:{
     },
     // ----------------- initialize
     initialize: function() {
        console.log("initialize");
        var self = this;
        
        if(this.beforeInitialize) this.beforeInitialize();
        
        if(this.createMainView) this.createMainView(); 
        
        this.initTouchEvents();
        //break down url and navigate to the right place
        //if rerefreshed from story 
        //grab the string after the last "/"
        var route = window.location.href;
        var slash_index = route.lastIndexOf("/");
        if( slash_index > 0 && route.length >= (slash_index+1) ){
			route = route.slice( (slash_index+1), route.length );
			if(route.length == 0) {
				route = "";
			}
        } 
       // $(window).scrollTop(0);
        setTimeout(function(){
	        //$(window).scrollTop(0);
	        /*setTimeout(function(){
		        if(route == "") self.navigate(route, {trigger: true}); 
		    }, 100);*/
        }, 300);
     },
     // ----------------- createMainView
     createMainView: function() {
     	this.mainView = new main.views.MainView( {el: $('#main', this.el)} );
     },
     // ----------------- initTouchEvents
     initTouchEvents: function() {
        var self = this;
        // otherwise register mouse events instead
        $('#main').on('mousedown', 'a', function(event) {
           self.selectItem(event);
        });
        $('#main').on('mouseup', 'a', function(event) {
             self.deselectItem(event);
        });
     },
     // ----------------- selectItem
     selectItem: function(event) {
       $(event.currentTarget).addClass('tappable-active');
     },
     // ----------------- deselectItem
     deselectItem: function(event) {
       $(event.currentTarget).removeClass('tappable-active');
     }
});
