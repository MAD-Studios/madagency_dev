// ------------------------------------------------------------------------- ElementManipulator
// ElementManipulator
// used tomanipulate elements(resize , ect.) 

main.utils.ElementManipulator = {
	SCALE_TYPE: {
		FIT: "scale_to_fit",
		COVER: "scale_to_cover"
	},
	NO_DOCUMENT_SCROLL_CLASS: "no-document-scroll",
	touch_start_y: 0,
	//======================================
	// manipulate element
	// dimmensions
	//======================================
	//--------------------------------------
	// resizeElement
	//--------------------------------------
	resizeElement:function(el, init_width, init_height, parent_width, parent_height, scale_type){
		if(scale_type == null) scale_type = this.SCALE_TYPE.COVER;
		        
        var el_width = init_width;
	    var el_height = init_height;
	    
        var scale = 1;
        var rat_width = 0;
        var rat_height = 0;
        
        if(parent_width){
			rat_width = (parent_width)/el_width;
			rat_height = (parent_height)/el_height;
		}

		var delta_scale_width = Math.abs(1-rat_width);
		var delta_scale_height = Math.abs(1-rat_height);
        
        //scale to cover
        switch(scale_type){
        	case this.SCALE_TYPE.COVER:
				//IF WIDTH AND HEIGHT GREATER THAN
				if(rat_width <= 1 && rat_height <= 1){
				 //use smallest difference
				 if(delta_scale_width >= delta_scale_height){ scale = rat_height; }
				 else{ scale = rat_width; }
				}
				//IF WIDTH AND HEIGHT LESS THAN
				else if(rat_width >= 1 && rat_height >= 1){
				 //use largest difference
				 if(delta_scale_width >= delta_scale_height){ scale = rat_width; }
				 else{ scale = rat_height; }
				}
				//IF WIDTH GRETAER THAN & HEIGHT LESS THAN
				else if(rat_width < 1 && rat_height > 1){
				 scale = rat_height;
				}
				//IF HEIGHT GRETAER THAN & WIDTH LESS THAN
				else if(rat_width > 1 && rat_height < 1){
				 scale = rat_width;
				}
				if(rat_width == 0){
					scale = rat_height;
				}
				else if(rat_height == 0){
					scale = rat_width;
				}
			break;
			case this.SCALE_TYPE.FIT:
				//IF WIDTH AND HEIGHT GREATER THAN
				console.log("SCALE_TYPE.FIT ");

				if(rat_width <= 1 && rat_height <= 1){
				//use greatest difference
				 if(delta_scale_width >= delta_scale_height){ scale = rat_width; }
				 else{ scale = rat_height; }
				}
				//IF WIDTH AND HEIGHT LESS THAN
				//leave as is
				else if(rat_width >= 1 && rat_height >= 1){
				}
				//IF WIDTH GRETAER THAN & HEIGHT LESS THAN
				else if(rat_width < 1 && rat_height > 1){
					//use width
					scale = rat_width;
				}
				//IF HEIGHT GRETAER THAN & WIDTH LESS THAN
				else if(rat_width > 1 && rat_height < 1){
					//use height
					scale = rat_height;
				}
				if(rat_width == 0){
					scale = rat_height;
				}
				else if(rat_height == 0){
					scale = rat_width;
				}
			break;
		}
		var to_width = Math.ceil(parseFloat(el_width*scale));
		var to_height = Math.ceil(parseFloat(el_height*scale));

		$(el).css('width', to_width + 'px');
		$(el).css('height', to_height + 'px');
	},
	//--------------------------------------
	// disableDocumentScroll
	//--------------------------------------
	disableDocumentScroll:function(){
		$(document.documentElement).addClass(this.NO_DOCUMENT_SCROLL_CLASS);
    },
    //--------------------------------------
	// enableDocumentScroll
	//--------------------------------------
	enableDocumentScroll:function(){
		$(document.documentElement).removeClass(this.NO_DOCUMENT_SCROLL_CLASS);
    },
    //--------------------------------------
	// addTouchWheelScrollListener
	//--------------------------------------
	addTouchWheelScrollListener:function(el, onTouchWheelScrollFunction){
        console.log("~~~~~~~~~~~~~~~~~~~ addTouchWheelScrollListener ~~~~~~~~~~~~~~~~~~~");
	    var self = this;
	    this.onTouchWheelScrollFunction = onTouchWheelScrollFunction;
	    
        // Register mousewheel event handlers.
		el.onwheel = function(event){ self.onTouchWheelScroll(event); };       // Future browsers
		el.onmousewheel = function(event){ self.onTouchWheelScroll(event); };  // Most current browsers

		if (el.addEventListener) { //(firefox)
			// add touch start here 
			// to grab touch start value so that 
			// you can determine the delta
			/*el.addEventListener('touchstart', function(event){ self.onElTouchStart(event);});
			el.addEventListener('touchmove', function(event){ self.onTouchWheelScroll(event);});
		    el.addEventListener("DOMMouseScroll", function(event){ self.onTouchWheelScroll(event); });*/
		    el.addEventListener('touchstart', onElTouchStart );
			el.addEventListener('touchmove', onTouchWheelScroll );
		    el.addEventListener("DOMMouseScroll", onTouchWheelScroll );
		}
		/*else{
    		
		}*/
		
		
    },
    //--------------------------------------
	// removeTouchWheelScrollListener
	//--------------------------------------
	removeTouchWheelScrollListener:function(el){
	    console.log("~~~~~~~~~~~~~~~~~~~ removeTouchWheelScrollListener ~~~~~~~~~~~~~~~~~~~");
        var self = this;
	    el.onwheel = null;
	    el.onmousewheel = null;
	    //if(el.addEventListener) {
    	    /*el.removeEventListener('touchstart', function(event){ self.onElTouchStart(event);});
			el.removeEventListener('touchmove', function(event){ self.onTouchWheelScroll(event);});
		    el.removeEventListener("DOMMouseScroll", function(event){ self.onTouchWheelScroll(event); });*/
	    //}
	    el.removeEventListener('touchstart', onElTouchStart );
        el.removeEventListener('touchmove', onTouchWheelScroll );
        el.removeEventListener("DOMMouseScroll", onTouchWheelScroll );
            console.log("~~~~~~~~~~~~~~~~~~~ sfter events removed ~~~~~~~~~~~~~~~~~~~");

	},
    //--------------------------------------
	// onChildTouchStart
	//--------------------------------------
	onElTouchStart: function(event) {
        this.touch_start_y = event.touches[0].pageY;
        return false;
    },
    //--------------------------------------
	// onTouchWheelScroll
	//--------------------------------------
	onTouchWheelScroll: function(event) {
	    console.log("~~~~~~~~~~~~~~~~~~~ onTouchWheelScroll ~~~~~~~~~~~~~~~~~~~");
	    var deltaY = 0;
	    var deltaX = 0;
	    var self = this;
		var e = event || window.event;
		
		if (this.touch_start_y) {
	        deltaY = e.touches[0].pageY - this.touch_start_y;
	    }
	    else{
            deltaX = e.deltaX * -30 ||  // wheel event
                     e.wheelDeltaX / 4 ||  // mousewheel
			                    	  0;    // property not defined
			deltaY = e.deltaY * -30 ||  // wheel event
			      	  e.wheelDeltaY / 4 ||  // mousewheel event in Webkit
			(e.wheelDeltaY === undefined &&      // if there is no 2D property then 
			          e.wheelDelta / 4) ||  // use the 1D wheel property
					     e.detail * -10 ||  // Firefox DOMMouseScroll event
			                   		  0;     // property not defined
			                   
			 if (this.isMacWebkit) {
			    deltaX /= 30;
			    deltaY /= 30;
			 }
		 }
		 
         if( this.onTouchWheelScrollFunction )  this.onTouchWheelScrollFunction(deltaX, deltaY, event);
		 return false;
	},
    //--------------------------------------
	// removeFromArray
	//--------------------------------------
	removeFromArray:function(index, array){
	    var new_array, array_slice_1, array_slice_2;
	    
	    array_slice_1 = array.slice(0, index);
	    array_slice_2 = array.slice(index+1, array.length);

	    if(index == 0) new_array = array_slice_2;
	    else if(index == (array.length-1)) new_array = array_slice_1;
	    else new_array = array_slice_1.concat(array_slice_2);
	    
	    return new_array;
	}

};

function onElTouchStart(event){
    main.utils.ElementManipulator.onElTouchStart(event);
} 
function onTouchWheelScroll(){
    main.utils.ElementManipulator.onTouchWheelScroll(event);
} 