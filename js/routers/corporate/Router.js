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
         this.handleRoute("intro", false);
     },
     // ----------------- how
     how: function(){
          console.log("main --- how");
          this.handleRoute("how", true);
     },
     // ----------------- work
     work: function(){
          console.log("main --- work");
          this.handleRoute("work", true);
     },
     // ----------------- team
     team: function(){
          console.log("main --- team");
          this.handleRoute("team", true);
     },
     // ----------------- disciplines
     disciplines: function(){
         console.log("main --- disciplines");
         this.handleRoute("disciplines", true);
     },
     // ----------------- contact
     contact: function(){
         console.log("main --- contact");
         this.handleRoute("contact", true);
     },
     // ----------------- handleRoute
     handleRoute: function(id, enable_doc_scroll){
     	var self = this;
     	if(this.unrouted){
	         setTimeout(function(){	
                 self.scrollToPane(id, enable_doc_scroll);          
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     self.scrollToPane(id, enable_doc_scroll);
		 }
     },
     // ----------------- scrollToPane
     scrollToPane: function(id, enable_doc_scroll){
        //if(enable_doc_scroll) this.mainView.enableDocumentScroll();
        this.mainView.scrollToPane(id);
     }
});
