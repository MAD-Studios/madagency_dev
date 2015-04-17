// _________________________________________________________________________ LoaderView
main.views.castle.mobile.LoaderView = main.views.castle.LoaderView.extend({
	loaded_ratio_indicator_copy: "weeeeeeeee",
	 // ----------------- totalHideBg
    totalHideBg: function() {
	    //fade out here instead
	    var self = this;
	    $(this.el).addClass(this.FADE_SLOW_CLASS);
	    $(this.el).css('opacity', '0');
	    $(this.el).trigger(this.TOTAL_HIDE_BG);
	    $(this.el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			$(this).off('transitionend webkitTransitionEnd oTransitionEnd');
			self.totalHide();
		});
    },
    // ----------------- totalHide
    totalHide: function() {
	    $(this.el).css('display', 'none');
	    this.dispose();
    }
});

