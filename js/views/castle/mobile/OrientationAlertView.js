// _________________________________________________________________________ OrientationAlertView
main.views.castle.mobile.OrientationAlertView = Backbone.View.extend({
    templateLoader: main.utils.TemplateLoader,
    // ----------------- initialize
    initialize: function() {
        console.log("OrientationAlertView ---- initialize");
        this.template = _.template(this.templateLoader.get('orientation-alert'));
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("OrientationAlertView ---- render");
        $(this.el).html(this.template());
        return this;
	}
});