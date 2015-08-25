// _________________________________________________________________________ HeaderView
main.views.HeaderView = Backbone.View.extend({
	TRANS_CLASS: "header-trans",
	OVERLAID_CLASS: "overlaid",
	LIGHT_COLOR: "#fceec9",
	DARK_COLOR: "#ffc627",
	HIDE_ANIMATE_OFFSET: -100,
	events:{
		'click .logo': 'onLogoClick'
	},
    // ----------------- initialize
    initialize: function() {
        console.log("HeaderView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("HeaderView ---- render");
        //hide on render and show after delay??
        
        return this;
	},    
	// ----------------- posize
    posize: function() {
	},
    // ----------------- setOverlaid
    setOverlaid: function() {
        $(this.el).addClass(this.OVERLAID_CLASS);
    },
    // ----------------- unsetOverlaid
    unsetOverlaid: function() {
        $(this.el).removeClass(this.OVERLAID_CLASS);
    },
	// ----------------- lightenBackground
    lightenBackground: function() {
	    //var el = $(this.el);
	    /*var color = new RGBColor(obj.css(prop));
           if (color.ok) { 
               css[prop] = 'rgb(255,198,39,0.2)';
               TweenLite.to(el, 2, {css:css});
            }*/
    	//TweenLite.to($(this.el), 0.35, {backgroundColor:this.LIGHT_COLOR, overwrite: 2});
	},
	// ----------------- darkenBackground
    darkenBackground: function() {
    	//TweenLite.to($(this.el), 0.35, {backgroundColor:this.DARK_COLOR, overwrite: 2});
	},
	// ----------------- beginHide
    beginHide: function() {
	    //get current Y
	    var cur_top = parseInt($(this.el).css('top'));
	    //move this down and fade it out
	    $(this.el).addClass(this.TRANS_CLASS);
	    $(this.el).css('top', (cur_top + this.HIDE_ANIMATE_OFFSET)+ 'px');
	    $(this.el).css('opacity', '0');
	},
	// ----------------- onLogoClick
    onLogoClick: function(event) {
        main.utils.BtnUtils.onLogoClick(event);
	    return false;
    }	
});