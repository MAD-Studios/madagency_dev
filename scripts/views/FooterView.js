// _________________________________________________________________________ FooterView
main.views.FooterView = Backbone.View.extend({
	events: {
		'click .method-btn' : 'onMethodBtnClick',
		'click .how-btn' : 'onHowBtnClick',
		'click .work-btn' : 'onWorkBtnClick',
		'click .team-btn' : 'onTeamBtnClick',
		'click .disciplines-btn' : 'onDisciplinesBtnClick',
		'click .contact-btn' : 'onContactBtnClick'
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
    }
});