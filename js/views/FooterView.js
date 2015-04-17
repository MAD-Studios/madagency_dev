// _________________________________________________________________________ FooterView
main.views.FooterView = Backbone.View.extend({
    BTN_SELECTOR_SUFFIX: "-btn",
	events: {
		'click .logo' : 'onLogoClick',
        'click #init-btn' : 'onBtnClick',
		'click #how-btn' : 'onBtnClick',
		'click #work-btn' : 'onBtnClick',
		'click #team-btn' : 'onBtnClick',
		'click #disciplines-btn' : 'onBtnClick',
		'click #contact-btn' : 'onBtnClick'
	},
    // ----------------- initialize
    initialize: function() {
        console.log("FooterView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("FooterView ---- render");
        return this;
	},    
	// ----------------- posize
    posize: function() {
	},
    // ----------------- onBtnClick
    onBtnClick: function(event) {
    	console.log("onBtnClick -------- ");
        //$(this.el).trigger(main.events.Event.ENABLE_DOCUMENT_SCROLL);
        
    	if($(event.currentTarget).attr("id")) {
	    	var id = $(event.currentTarget).attr("id");
	    	id = id.replace(this.BTN_SELECTOR_SUFFIX, "");
    	}
    	
        main.router.navigate(id, {trigger: true});
        return false;
    },
    // ----------------- onLogoClick
    onLogoClick: function(event) {
        if (Modernizr.history) main.router.navigate('work', {trigger: false});
	    main.router.navigate('', {trigger: true});
	    return false;
    }
    // ----------------- onLogoClick
    /*onLogoClick: function(event) {
        if (Modernizr.history) main.router.navigate('work', {trigger: false});
	    main.router.navigate('', {trigger: true});
	    return false;
    }
	// ----------------- onHowBtnClick
    onMethodBtnClick: function(event) {
	    main.router.navigate('', {trigger: true});
	    return false;
    },
	// ----------------- onHowBtnClick
    onHowBtnClick: function(event) {
	    main.router.navigate('how', {trigger: true});
	    return false;
    },
    // ----------------- onWorkBtnClick
    onWorkBtnClick: function(event) {
	    main.router.navigate('work', {trigger: true});
	    return false;
    },
    // ----------------- onHowBtnClick
    onTeamBtnClick: function(event) {
	    main.router.navigate('team', {trigger: true});
	    return false;
    },
    // ----------------- onHowBtnClick
    onDisciplinesBtnClick: function(event) {
	    main.router.navigate('disciplines', {trigger: true});
	    return false;
    },  
	// ----------------- onHowBtnClick
    onContactBtnClick: function(event) {
	    main.router.navigate('contact', {trigger: true});
	    return false;
    }*/
});