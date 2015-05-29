// _________________________________________________________________________ MainView
main.views.corporate.MainView = main.views.MainView.extend({
	// ----------------- initiateCorporate
    initiateCorporate: function(){   
        console.log("initiateCorporate 0");

		this.corporateView = new main.views.corporate.CorporateView( {el: $('.corporate', this.el)} );
		
		console.log("initiateCorporate 1");
    }
});