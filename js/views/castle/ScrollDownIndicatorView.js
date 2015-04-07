// _________________________________________________________________________ ScrollDownIndicatorView
main.views.castle.ScrollDownIndicatorView = Backbone.View.extend({
	FADE_CLASS: "fade-fast",
	SCROLL_DOWN_INDICATOR: "scroll-down-indicator",
	SCROLL_DOWN_INDICATOR_CTA: "scroll-down-indicator-cta",
	templateLoader: main.utils.TemplateLoader,
	// ----------------- initialize
    initialize: function() {
        console.log("ScrollDownIndicatorView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.SCROLL_DOWN_INDICATOR));
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("ScrollDownIndicatorView ---- render");
        $(this.el).html(this.template());
        $(this.el).attr('id', this.SCROLL_DOWN_INDICATOR_CTA);
        $(this.el).addClass('maintain-ratio');
        this.indicator_el = $('#' + this.SCROLL_DOWN_INDICATOR, this.el);
        this.indicator_el.css('visibility', 'hidden');
        this.indicator_el.css('opacity', '0');
		this.indicator_el.addClass(this.FADE_CLASS);
        return this;
	},    
	// ----------------- posize
    posize: function() {
	},
	// ----------------- show
	show: function() {
		this.indicator_el.off('transitionend webkitTransitionEnd oTransitionEnd');
	    this.indicator_el.css('visibility', 'visible');
	    this.indicator_el.css('opacity', '1');
	},
	// ----------------- show
	hide: function() {
	    this.indicator_el.css('opacity', '0');
	    //make invisible on transition end
		this.indicator_el.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			$(this).off('transitionend webkitTransitionEnd oTransitionEnd');
			$(this).css('visibility', 'hidden');
		});
	},
});