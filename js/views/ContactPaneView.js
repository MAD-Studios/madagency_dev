// _________________________________________________________________________ ContactPaneView
main.views.ContactPaneView = main.views.PaneView.extend({
	SHOW_MESSAGE: "showMessage",
	CUSTOM_FOCUS_CLASS: "custom-focus",
	offset: -1,
	id: "contact",
	_route: "contact",
	message_is_shown: false,
	has_been_prepared: false,
	map_added: false,
	map_shown: false,
	locations: [
		{state:"fl", lat:"26.1233269", lng:"-80.1413047", name:"MAD SOUTH", directions_url:"https://www.google.com/maps/dir//101+NE+3rd+Ave+%231920,+Fort+Lauderdale,+FL+33301/@26.1233269,-80.1413047,17z/data=!4m13!1m4!3m3!1s0x88d90055c64579ed:0xf1b43f13a53ce760!2s101+NE+3rd+Ave+%231920!3b1!4m7!1m0!1m5!1m1!1s0x88d90055c64579ed:0xf1b43f13a53ce760!2m2!1d-80.1413047!2d26.1233269" },
		{state:"mn", lat:"44.984508", lng:"-93.274399", name:"MAD MIDWEST", directions_url:"https://www.google.com/maps/dir//333+Washington+Ave+N+%23321,+Minneapolis,+MN+55401/@44.984508,-93.274399,17z/data=!4m13!1m4!3m3!1s0x52b3328f1e4ef4cb:0x5c1e8331385ee5f!2s333+Washington+Ave+N+%23321!3b1!4m7!1m0!1m5!1m1!1s0x52b3328f1e4ef4cb:0x5c1e8331385ee5f!2m2!1d-93.274399!2d44.984508"}
	],
	events: {
		'click #flag-fl' : 'onBtnFlClick',
		'click #flag-mn' : 'onBtnMnClick',
		'click #btn-fl' : 'onBtnFlClick',
		'click #btn-mn' : 'onBtnMnClick',
		'click .btn-submit' : 'onBtnSubmitClick'
	},
	errors: {
		SEND_EMAIL_ERROR: "We could not complete your request.  Please check your connection and try again."
	},
	validation_errors: [
		{error: "email", msg: "Please enter a valid E-mail address.", regExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
	],
	successes: {
		SEND_EMAIL_SUCCESS_H: "Thank you!",
		SEND_EMAIL_SUCCESS: "Your request was sent to the <b>Help Desk</b>."
	},
	mapStyles: [
		 {
		   "featureType": "landscape",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#333e48" }
		   ]
		 },{
		   "featureType": "poi",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#919191" }
		   ]
		 },{
		   "featureType": "poi",
		   "elementType": "geometry.stroke",
		   "stylers": [
		     { "color": "#ffa227" }
		   ]
		 },{
		   "featureType": "water",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#e7ebf3" }
		   ]
		 },{
		   "featureType": "administrative",
		   "elementType": "labels.text.stroke",
		   "stylers": [
		     { "color": "#ffffff" },
		     { "visibility": "off" }
		   ]
		 },{
		   "elementType": "labels.text",
		   "stylers": [
		     { "color": "#FFFFFF" }
		   ]
		 },{
		   "featureType": "road.arterial",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#ffa227" }
		   ]
		 },{
		   "featureType": "road.highway",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#ffc627" }
		   ]
		 },{
		   "featureType": "road.arterial",
		   "elementType": "geometry.stroke",
		   "stylers": [
		     { "visibility": "off" }
		   ]
		 },{
		   "featureType": "road.highway",
		   "elementType": "geometry.stroke",
		   "stylers": [
		     { "visibility": "off" }
		   ]
		 },{
		   "featureType": "road.local",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#797979" }
		   ]
		 },{
		   "featureType": "road.local",
		   "elementType": "geometry.stroke",
		   "stylers": [
		     { "visibility": "off" }
		   ]
		 },{
		   "featureType": "transit.line",
		   "elementType": "geometry.fill",
		   "stylers": [
		     { "color": "#ffc627" }
		   ]
		 },{
		   "featureType": "transit.line",
		   "elementType": "geometry.stroke",
		   "stylers": [
		     { "color": "#ffa227" }
		   ]
		 },{
		   "elementType": "labels.text.fill",
		   "stylers": [
		     { "color": "#FFFFFF" }
		   ]
		 },{
		   "elementType": "labels.text.stroke",
		   "stylers": [
		     { "visibility": "off" }
		   ]
		 },{
		   "featureType": "administrative",
		   "elementType": "labels.text.fill",
		   "stylers": [
		     { "color": "#FFFFFF" }
		   ]
		 },{
		   "featureType": "road",
		   "elementType": "labels",
		   "stylers": [
		     { "hue": "#ffc627" }
		   ]
		 }
	],
	mapOptions:  {
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         zoomControl: true,
         streetViewControl: false,
         mapTypeControl: false,
         zoom: 18,
         draggable:true,
         scrollwheel: false
    },
	// ----------------- initialize
    initialize: function() {
        console.log("ContactPaneView ---- initialize");
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("ContactPaneView ---- beforeRender");
        var self = this;
        this.has_been_prepared = false;
        this.map_shown = false;
        $('input', this.el).keyup(function(event){
		    if(event.keyCode == 13){
		        self.submit();
		    }
		});
        setTimeout(function(){
	        self.createMap();
        }, 1000);
	},
    // ----------------- createMap
    createMap: function(){
	    var self = this;
        this.map_canvas_el = $('.map', this.el);
        this.map_canvas_el.css('opacity', '0');
        //this.map_canvas_el.css('filter', 'alpha(opacity=50)');  
        this.mapOptions.center = new google.maps.LatLng(this.locations[0].lat, this.locations[0].lng);
		var marker_img_path = 'assets/images/corporate/png/mad_pin@2x.png';
		var marker_img_width = 45;
        var  marker_img_height = 56;
        this.markerImage = new google.maps.MarkerImage( marker_img_path, new google.maps.Size(marker_img_width, marker_img_height), new google.maps.Point(0, 0), null, new google.maps.Size(marker_img_width, marker_img_height) );
        var info_box_content = "<span style='font-size:11px;color:#333e48;'><b>" + this.locations[0].name + "</b><br/><a style='color:#333e48;' href='" + this.locations[0].directions_url + "' target=_blank >Get Directions &nbsp;></a></span>";
        this.map_canvas_el.gmap(this.mapOptions).bind('init', function(evt, map) {
	        //set a timeout for this
	        //or add it on prpare
			map.setOptions({styles: self.mapStyles});
			self.map = map;
			if(self.has_been_prepared) self.showMap();      
        });
        this.map_added = true;
    },
    // ----------------- setMapCenter
    setMapCenter: function(){
         this.map.setCenter(this.map_center);
         if(this.map) this.map_center = this.map.getCenter();
    },
    // ----------------- onBtnFlClick
    onBtnFlClick: function(){
	    console.log("onBtnFlClick");
	    this.showLocation("fl");
	    return false;
    },
    // ----------------- onBtnMnClick
    onBtnMnClick: function(){
    	console.log("onBtnMnClick");
	    this.showLocation("mn");
	    return false;
    },
	// ----------------- onBtnSubmitClick
    onBtnSubmitClick: function(){
	    this.submit();
    	return false;
	},
	// ----------------- clearForm
    clearForm: function(){
	    $('input', this.el).each( function(){
		    $(this).val("");
	    } );
	    $('textarea', this.el).each( function(){
		    $(this).val("");
	    } );
	},
	// ----------------- submit
    submit: function(){
	    var self = this;
	    var delay = false;
	    if(this.message_is_shown){
		    this.removeMessage();
		    delay = true;
		}
	    var isValid = this.formIsValid();
	    if(isValid == true){
		    var param = {
                  user_name:  $('#input-name', self.el).val(),
                  user_email: $('#input-email', self.el).val(),
                  user_industry:  $('#input-industry', self.el).val(),
                  user_challenge: $('#input-challenge', self.el).val(),
                  user_orig_challenge: main.router.responseGeneratorModel.get("current_question"),
                  mad_answer: main.router.responseGeneratorModel.get("current_answer")
            };
		    this.showSubmitLoader();
		    //send the email
		    $.ajax({
              url: "api/send_email.php",
              type:"POST",
              data: param,
              success: function(data){
	              self.clearForm();
                  //show success alert
                  self.hideSubmitLoader();
			      if(delay){
				     setTimeout(function(){ self.showSuccessMessage(self.successes.SEND_EMAIL_SUCCESS); }, 700);
			      }
			      else{
				     self.showSuccessMessage(self.successes.SEND_EMAIL_SUCCESS);
			      }
                  console.log("sendEmail succcess");
              },
              error: function(data){
                  //show error alert
				  self.hideSubmitLoader();
			      if(delay){
				     setTimeout(function(){ self.showErrorMessage(self.errors.SEND_EMAIL_ERROR); }, 700);
			      }
			      else{
				     self.showErrorMessage(self.errors.SEND_EMAIL_ERROR);
			      }
                  console.log("sendEmail error"); 
               }
            });
		}
	    else{
		     //did not pass validation
		     //highlight the input according to the 
		     //isValid result
		     this.highlightInvalidInput(isValid.error);
		     if(delay){
			     setTimeout(function(){ self.showErrorMessage(isValid.msg); }, 700);
		     }
		     else{
			    this.showErrorMessage(isValid.msg);
		     }
	    }
    },
    // ----------------- showSubmitLoader
    showSubmitLoader: function(){
	    //hid ethe
	    //hide sunbmit btn
	    var submit_btn_container_el = $('.btn-submit-container', this.el);
	    var loader_row_el = $('.loader-row', this.el);
	    TweenLite.to(submit_btn_container_el, 0.25, {opacity:0, overwrite: 2});
	    loader_row_el.activity({segments: 8, width:2, space: 0, length: 3, color: '#bdd0ff', valign:'top', align:'center', padding:26});
    },
     // ----------------- hideSubmitLoader
    hideSubmitLoader: function(){
	    //hide the loader
	    //show sunbmit btn
	     var submit_btn_container_el = $('.btn-submit-container', this.el);
	    var loader_row_el = $('.loader-row', this.el);
	    TweenLite.to(submit_btn_container_el, 0.25, {opacity:1, overwrite: 2});
	    loader_row_el.activity(false);
    },
    // ----------------- showErrorMessage
    showErrorMessage: function(msg){
	     this.msg_el = $('<p class="notice error-msg">' + msg + '</p>');
	     //also highlight the input
	     //box that is causing the error
		 this.showMessage();
    },
    // ----------------- showSuccessMessage
    showSuccessMessage: function(msg){
	     this.msg_el = $('<h2 class="notice success-msg">' + this.successes.SEND_EMAIL_SUCCESS_H + '</h2><p class="notice">' + this.successes.SEND_EMAIL_SUCCESS + '</p>');
		 this.showMessage();
    },
    // ----------------- showErrorMessage
    showMessage: function(){
	    var self = this;
	    var msg_col_el = $('.notice-col', this.el);
    	msg_col_el.append(this.msg_el);
    	this.msg_el.css('opacity', '0');
    	var to_height = this.msg_el.outerHeight();
		//grow the height kof the .msg-col to fit its content
		TweenLite.to(msg_col_el, 0.5, {height:to_height, ease: Expo.easeOut, overwrite: 2, onComplete: function(){ $(self.el).trigger(self.RESIZE); } });
		//on  almost complete show the content
		TweenLite.to(this.msg_el, 0.25, {opacity:1, delay: 0.45, overwrite: 2});
		$(this.el).trigger(this.SHOW_MESSAGE);
		this.message_is_shown = true;
    },
    // ----------------- removeMessage
    removeMessage: function(){
	    var self = this;
	    var msg_col_el = $('.notice-col', this.el);
    	TweenLite.to(this.msg_el, 0.25, {opacity:0, overwrite: 2});
	    //shrink the .msg-col
	    //rmove  this.msg_el on complete
	    TweenLite.to(msg_col_el, 0.5, {height:0, ease: Expo.easeOut, delay: 0.45, overwrite: 2, onComplete: function(){ $(self.el).trigger(self.RESIZE); } });
	    setTimeout(function(){
		    self.msg_el.remove();
		    self.message_is_shown = false;
	    }, 250);
    },
    // ----------------- formIsValid
    formIsValid: function(){
	    for(var i=0; i<this.validation_errors.length; i++){
		    var val = $('#input-' + this.validation_errors[i].error, this.el).val();
		    var isValid = true;
		    var regExp = this.validation_errors[i].regExp;
		    isValid = regExp.test(val);
		    if(isValid == false) return this.validation_errors[i];
		    return isValid;
	    }
    },
    // ----------------- highlightInvalidInput
    highlightInvalidInput: function(error){
	    var self = this;
		//highlight the correct  
		$('#input-' + error, this.el).focus(); 
		$('#input-' + error, this.el).addClass(this.CUSTOM_FOCUS_CLASS); 
		//on blur the input
		//remove the custom focu class
		$('#input-' + error, this.el).on('blur', function(){
			$('#input-' + error, self.el).off('blur');
			$(this).removeClass(self.CUSTOM_FOCUS_CLASS); 
			self.removeMessage();
		});
    },
    // ----------------- showFL
    showLocation: function(state){
    var self = this;
	    var loc_ind = 0;
	    for(var i=0;i<this.locations.length;i++){
		    if(this.locations[i].state === state){
			    //remove active from other locations
			    //set the flag to active
			    //set the addr-title to active
			    loc_ind = i;
			    $('#flag-' + state, this.el).addClass('active');
			    $('#btn-' + state, this.el).addClass('active');
		    }
		    else{
			    $('#flag-' + this.locations[i].state, this.el).removeClass('active');
			    $('#btn-' + this.locations[i].state, this.el).removeClass('active');
		    }
	    }
	    
	    //recenter the map
        var center = new google.maps.LatLng(this.locations[loc_ind].lat, this.locations[loc_ind].lng);
	    this.map.panTo(center);	    
	    //remove current pin
	    self.map_canvas_el.gmap('clear', 'markers');
	    //add new pin
	    var info_box_content = "<span style='font-size:11px;color:#333e48;'><b>" + this.locations[loc_ind].name + "</b><br/><a style='color:#333e48;' href='" + this.locations[loc_ind].directions_url + "' target=_blank >Get Directions &nbsp;></a></span>";
	    this.map_canvas_el.gmap('addMarker', {position: this.locations[loc_ind].lat + ',' + this.locations[loc_ind].lng,  icon: this.markerImage, animation: google.maps.Animation.DROP}).click(function() {
				self.map_canvas_el.gmap('openInfoWindow', {'content': info_box_content}, this);
		});
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
		this.map_canvas_el.gmap('destroy');
		$('input', this.el).off();
	},
    // ----------------- beforePrepare
    beforePrepare: function() {
	    //if first time 
	    if(!this.map_shown && this.map_added) this.showMap();
	    //fade in
	    this.has_been_prepared = true;
	},
	// ----------------- showMap
    showMap: function() {
	    var self = this;
	    clearTimeout(this.hideMapTimeout);
        TweenLite.to(this.map_canvas_el, 0.5, {opacity:1, delay:0.75});
        self.showMapMarkerTimeout = setTimeout(function(){
	        self.map_canvas_el.gmap('addMarker', {position: self.locations[0].lat + ',' + self.locations[0].lng,  icon: self.markerImage, animation: google.maps.Animation.DROP}).click(function() {
				self.map_canvas_el.gmap('openInfoWindow', {'content': info_box_content}, this);
			});
		}, 700);
		this.map_shown = true;
    },
    // ----------------- hideMap
    hideMap: function() {
	    clearTimeout(this.showMapMarkerTimeout);
	    var self = this;
	    this.hideMapTimeout = setTimeout(function(){ 
		    if(self.map_canvas_el) self.map_canvas_el.css('opacity', '0');
	    }, 100);
	    this.map_shown = false;
    },
    // ----------------- beforeDeactivate
    beforeDeactivate: function() {
    },
    // ----------------- beforePosize
    beforePosize: function() {
        console.log("ContactPaneView ----- beforePosize");
        //center the map
        if(this.map){
            this.setMapCenter(this.map);
        }
    }
});