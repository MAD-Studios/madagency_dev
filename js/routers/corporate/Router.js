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
     pane_id: "",
     enable_doc_scroll: false,
      // ----------------- createMainView
     createMainView: function() {
     	this.mainView = new main.views.corporate.MainView( {el: $('#main', this.el)} );
     },
     // ----------------- intro
     intro: function(){
         console.log("main --- intro");
         var delay_time = null;
         if( this.unrouted ) delay_time = 200;
         this.handleRoute("intro", delay_time);
     },
     // ----------------- how
     how: function(){
          console.log("main --- how");
          this.handleRoute("how");
     },
     // ----------------- work
     work: function(){
          console.log("main --- work");
          this.handleRoute("work");
     },
     // ----------------- team
     team: function(){
          console.log("main --- team");
          this.handleRoute("team");
     },
     // ----------------- disciplines
     disciplines: function(){
         console.log("main --- disciplines");
         this.handleRoute("disciplines");
     },
     // ----------------- contact
     contact: function(){
         console.log("main --- contact");
         this.handleRoute("contact");
     },
     // ----------------- handleRoute
     handleRoute: function(id, delay_time){
     	var self = this;
     	if(!delay_time) delay_time = this.UNROUTED_TIMEOUT;
     	if(this.unrouted){
	         setTimeout(function(){	
                 self.scrollToPane(id);          
	         }, delay_time);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     self.scrollToPane(id);
		 }
     },
     // ----------------- scrollToPane
     scrollToPane: function(id, enable_doc_scroll){
        //if(enable_doc_scroll) this.mainView.enableDocumentScroll();
        this.mainView.scrollToPane(id);
     }
});
