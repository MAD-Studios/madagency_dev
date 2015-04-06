// _________________________________________________________________________ OrientationAlertView
main.views.OrientationAlertView = Backbone.View.extend({
    templateLoader: main.utils.templateLoader,
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