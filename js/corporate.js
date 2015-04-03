// _________________________________________________________________________extend main namespace
main.corporate: {
    models: {},
    views: {}
};

// _________________________________________________________________________ main Router
main.corporate.CorporateRouter = main.Router.extend({
	 autoScrolling: false,
     routes:{
        "": "intro",
        "how": "how",
        "work": "work",
        "team": "team",
        "disciplines": "disciplines",
        "contact": "contact"
     },
     // ----------------- intro
     intro: function(){
         console.log("main --- intro");
         var self = this;
         var id = "intro";
         //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){	
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
	     }
     },
     // ----------------- how
     how: function(){
          console.log("main --- how");
          var self = this;
          var id = "how";
          //if first time set a delay
          if(this.unrouted){
	         setTimeout(function(){
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
          }
          else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
	      }
     },
     // ----------------- work
     work: function(){
          console.log("main --- work");
          var self = this;
          var id = "work";
          //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){	
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
		 }
     },
     // ----------------- team
     team: function(){
          console.log("main --- team");
          var self = this;
          var id = "team";
           //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
		 }
     },
     // ----------------- disciplines
     disciplines: function(){
         console.log("main --- disciplines");
         var self = this;
         var id = "disciplines";         
           //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
	     }
     },
     // ----------------- contact
     contact: function(){
         console.log("main --- contact");
         var self = this;
         var id = "contact";         
         //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){	
		          self.mainView.scrollToPane(id);	          
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
		 }
     },
     // ----------------- handleRoute
     handleRoute: function(){
     	//!!!!!!!!!!!!!!!!!!!!!!!!
     }
});

// _________________________________________________________________________
function onReady() {
    main.router = new main.corporate.CorporateRouter();
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: "dev/" });
	    //Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}
