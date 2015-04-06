// _________________________________________________________________________ SceneXrayView
main.views.castle.SceneXrayView = main.views.castle.SceneView.extend({
	name: "scene-xray",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneXrayView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
        //this.render();
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneXrayView ---- render");
        $(this.el).html(this.template());        
        return this;
	}
});