// _________________________________________________________________________ MainView
main.views.castle.mobile.MainView = main.views.castle.MainView.extend({
	// ----------------- createCastle
    createCastle: function(){
    	if(!this.castleView) this.castleView = new main.views.castle.mobile.CastleView( { el: $('.castle', this.el) } );
    }
});