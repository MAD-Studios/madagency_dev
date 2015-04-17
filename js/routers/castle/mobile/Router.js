console.log("mobile.Router loaded ^^^^^^^^^^^^^^^^^^^^^^^^" );

// _________________________________________________________________________ main.routers.castle.Router
main.routers.castle.mobile.Router = main.routers.castle.Router.extend({
	 // ----------------- createMainView
     createMainView: function() {
     	this.mainView = new main.views.castle.mobile.MainView( {el: $('#main', this.el)} );
     }
});