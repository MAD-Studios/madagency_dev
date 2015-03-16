/*
*************************************
	MAD STUDIOS test scripting
*************************************
*/
$(document).ready(function(){
	$(document).on('load resize', adjustPanels());
	$('#skrollr-body img').attr('draggable', 'false');
	/* FUNCTIONS */
	function adjustPanels () {
		var s = skrollr.init({
			smoothScrolling: true,
			smoothScrollingDuration: 500,
			mobileDeceleration: 1,
			constants: {
				gerbil: 7000,
				boy: 8300
			}
		});
		debug = $('#debug');
		$('[data-stretch]').height('100%');
	}
	function triggerSelector (elementSelector, customOffset, documentOffset, removeOffset) {
		
		if (customOffset <= documentOffset)
		{
			$(elementSelector).addClass('animate');
		} else {
			$(elementSelector).removeClass('animate');
		}
		if (typeof removeOffset != 'undefined' && removeOffset <= documentOffset)
		{
			$(elementSelector).removeClass('animate');
		}
	}
	/* SCROLL OFFSET */
	$(this).scroll(function () {
		var scrollVal = skrollr.get().getScrollTop();
		debug.text('Top Scroll: ' + scrollVal);
		triggerSelector ('#scroll-down-indicator', 100, scrollVal);
		triggerSelector ('#castle-container-parts', 60, scrollVal, 1100);
		triggerSelector ('#sprite-gorilla', 300, scrollVal, 1100);
		triggerSelector ('#sprite-gorilla-2', 300, scrollVal, 1100);
		triggerSelector ('#horn-container', 441, scrollVal);
		triggerSelector ('#lake-02', 800, scrollVal, 1300);
		triggerSelector ('.gears', 1200, scrollVal);
		triggerSelector ('#castle-door-container', 800, scrollVal);
		triggerSelector ('#signage-container', 1600, scrollVal, 3770);
		triggerSelector ('#monitor-01', 1900, scrollVal, 2200);
		// Monitor Pipe
		triggerSelector ('#xray-monitor', 2300, scrollVal);
		triggerSelector ('#clipboard', 5000, scrollVal);
		triggerSelector ('#stones-container', 7215, scrollVal);
		triggerSelector ('#gerbil-container', 7855, scrollVal, 8340);
		triggerSelector ('#steam-container', 7700, scrollVal, 8450);
		triggerSelector ('#red-transparency', 8000, scrollVal);
		triggerSelector ('#boy-container', 9750, scrollVal);
		triggerSelector ('#behold-container', 9750, scrollVal);
		triggerSelector ('#cta-container', 9750, scrollVal);
	});
	
});
// 