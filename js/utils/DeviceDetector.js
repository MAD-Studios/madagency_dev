// ------------------------------------------------------------------------- DeviceDetector
// DeviceDetector
// detect if mobile device an dother

main.utils.DeviceDetector = {
	mobile_devices: [
		"Android",
		"BlackBerry",
		"iPhone",
		"iPad",
		"iPod",
		"Opera Mini",
		"IEMobile"
	],
	isMobile: function(){
		var is_mobile = false;
		var user_agent = navigator.userAgent;
		var mobile_reg_exp = new RegExp(this.mobile_devices.join("|"), "i");
		return (user_agent.match(mobile_reg_exp) != null);
	}
};