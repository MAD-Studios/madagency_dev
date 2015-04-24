// ------------------------------------------------------------------------- BtnUtils
// BtnUtils
// generic btn handlers for site 

main.utils.BtnUtils = {
    BTN_SELECTOR_SUFFIX: "-btn",
    // ----------------- onBtnClick
    onBtnClick: function(event) {
        $(this.el).trigger(main.events.Event.ENABLE_DOCUMENT_SCROLL);
        
    	if($(event.currentTarget).attr("id")) {
	    	var id = $(event.currentTarget).attr("id");
	    	id = id.replace(this.BTN_SELECTOR_SUFFIX, "");
    	}
        main.router.navigate(id, {trigger: true});
    },
    // ----------------- onLogoClick
    onLogoClick: function(event) {
        if (Modernizr.history) main.router.navigate('work', {trigger: false});
	    main.router.navigate('', {trigger: true});
    }	

};