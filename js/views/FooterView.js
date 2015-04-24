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
        main.utils.BtnUtils.onBtnClick(event);
        return false;
    },
    // ----------------- onLogoClick
    onLogoClick: function(event) {
        main.utils.BtnUtils.onLogoClick(event);
	    return false;
    }	
 });