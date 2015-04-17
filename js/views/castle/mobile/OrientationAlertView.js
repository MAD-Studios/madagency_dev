// _________________________________________________________________________ OrientationAlertView
main.views.castle.mobile.OrientationAlertView = Backbone.View.extend({
    PORTRAIT: "portrait",
    LANDSCAPE: "landscape",
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
	},
    // ----------------- posize
    posize: function() {
        //if aspect ratio is landsape
        //show alert that orientation
        //is best in portrait
        this.orientation = window.innerHeight >= window.innerWidth ?  this.PORTRAIT : this.LANDSCAPE;

        if(this.orientation == this.LANDSCAPE) this.show();
        else this.hide();
    },
    // ----------------- show
    show: function() {
        $("#orientation-alert", this.el).css('display', 'block');
    },
    // ----------------- hide
    hide: function() {
        $("#orientation-alert", this.el).css('display', 'none');
    }
});