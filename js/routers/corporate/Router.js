// _________________________________________________________________________ main Router
main.routers.corporate.Router = main.routers.Router.extend({
	 autoScrolling: false,
     routes:{
        "": "intro",
        "how": "how",
        "work": "work",
        "team": "team",
        "disciplines": "disciplines",
        "contact": "contact"
     },
      // ----------------- createMainView
     createMainView: function() {
     	this.mainView = new main.views.corporate.MainView( {el: $('#main', this.el)} );
     },
     // ----------------- intro
     intro: function(){
         console.log("main --- intro");
         var self = this;
         var id = "intro";
         this.handleRoute(id);
     },
     // ----------------- how
     how: function(){
          console.log("main --- how");
          var self = this;
          var id = "how";
          this.handleRoute(id);
     },
     // ----------------- work
     work: function(){
          console.log("main --- work");
          var self = this;
          var id = "work";
          this.handleRoute(id);
     },
     // ----------------- team
     team: function(){
          console.log("main --- team");
          var self = this;
          var id = "team";
          this.handleRoute(id);
     },
     // ----------------- disciplines
     disciplines: function(){
         console.log("main --- disciplines");
         var self = this;
         var id = "disciplines";         
         this.handleRoute(id);
     },
     // ----------------- contact
     contact: function(){
         console.log("main --- contact");
         var self = this;
         var id = "contact";         
         this.handleRoute(id); 
     },
     // ----------------- handleRoute
     handleRoute: function(id){
     	var self = this;
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
     }
});
