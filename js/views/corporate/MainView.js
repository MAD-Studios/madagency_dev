// _________________________________________________________________________ MainView
main.views.corporate.MainView = main.views.MainView.extend({
	// ----------------- initiateCorporate
    initiateCorporate: function(){   
		this.corporateView = new main.views.corporate.CorporateView( {el: $('.corporate', this.el)} );
    }
});