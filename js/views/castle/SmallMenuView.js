// _________________________________________________________________________ SmallMenuView
main.views.castle.SmallMenuView = main.views.SmallMenuView.extend({
    events: {
        'click .toggle-btn' : 'onToggleBtnClick',
		'click .social-btn' : 'onSocialBtnClick'
    }
});