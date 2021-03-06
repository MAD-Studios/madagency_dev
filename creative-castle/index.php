<?php $root = $_SERVER['DOCUMENT_ROOT']; ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi" />
    <title>MAD Agency - Creative Castle</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="title" content="MAD Agency - Creative Castle" />
    <meta name="keywords" content="mad, agency, creative, castle, creative advertising, interactive, fort lauderdale, miami, digital, app, website, design, digital, online, content, SEO, SEM, branding, marketing, database, integrated" />
    <meta name="robots" content="noodp" />
    <meta name="description" content="MAD Agency is a full service Advertising/Marketing/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result." />
    <meta property="og:title" content="MAD Agency - Design + Printing + Marketing" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://www.madstudios.net" />
    <meta property="og:image" content="http://www.yeswearemad.com/assets/img/share_logo.jpg" />
    <meta property="og:description" content="MAD Agency is a full service Advertising/Marketing/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result." />
    
    <link href="../css/mad-agency.css" type="text/css" rel="stylesheet" />
    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
    <script src="../js/vendor/spin.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="//use.typekit.net/ntj1viz.js"></script>
    <script src="../js/vendor/underscore-min.js" type="text/javascript"></script>
    <script src="../js/vendor/backbone-min.js" type="text/javascript"></script>
    <script src="../js/vendor/greensock/TweenLite.min.js"></script>
    <script src="../js/vendor/greensock/CSSPlugin.min.js"></script>
    <script src="../js/vendor/greensock/EasePack.min.js"></script>
    <script src="../js/vendor/greensock/ScrollToPlugin.min.js"></script>
    <script src="../js/vendor/jquery-image-loader.js"></script>
    <script src="../js/vendor/jquery.mobile.custom.edit10172014.js"></script>
    <script src="../js/vendor/fastclick.js" type="text/javascript"></script>
    
    <script src="../js/vendor/skrollr.min.js"></script>
    
    <script src="../js/main.js" type="text/javascript"></script>
    <script src="../js/castle.js" type="text/javascript"></script>
    <script src="../js/events/Event.js" type="text/javascript"></script>
    <script src="../js/events/castle/Event.js" type="text/javascript"></script>
    <script src="../js/utils/JSLoader.js" type="text/javascript"></script>
    <script src="../js/utils/TemplateLoader.js" type="text/javascript"></script>
    <script src="../js/utils/ElementManipulator.js" type="text/javascript"></script>
    <script src="../js/utils/DeviceDetector.js" type="text/javascript"></script>
    <script src="../js/routers/Router.js" type="text/javascript"></script>
    <script src="../js/routers/castle/Router.js" type="text/javascript"></script>
    <script src="../js/models/PaneModel.js" type="text/javascript"></script>
    <script src="../js/models/castle/ResponseGeneratorModel.js" type="text/javascript"></script>
    <script src="../js/models/castle/LoaderModel.js" type="text/javascript"></script>
    <script src="../js/views/MainView.js" type="text/javascript"></script>
    <script src="../js/views/SmallMenuView.js" type="text/javascript"></script>
    <script src="../js/views/castle/SmallMenuView.js" type="text/javascript"></script>
    <script src="../js/views/MainNavContainerView.js" type="text/javascript"></script>
    <script src="../js/views/castle/MainNavContainerView.js" type="text/javascript"></script>
    <script src="../js/views/castle/MainView.js" type="text/javascript"></script>
    <script src="../js/views/CorporateView.js" type="text/javascript"></script>
    <script src="../js/views/castle/CorporateView.js" type="text/javascript"></script>
    <script src="../js/views/PaneContainerView.js" type="text/javascript"></script>
    <script src="../js/views/castle/PaneContainerView.js" type="text/javascript"></script>
    <script src="../js/views/PaneView.js" type="text/javascript"></script>
    <script src="../js/views/HeaderView.js" type="text/javascript"></script>
    <script src="../js/views/FooterView.js" type="text/javascript"></script>
    <script src="../js/views/castle/CastleGatewayPaneView.js" type="text/javascript"></script>
    <script src="../js/views/castle/LoaderView.js" type="text/javascript"></script>
    
    <!--[if lt IE 9]>
            <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
    
<body>
	
<div id="main">
    
	<!------- preload story loader assets -------->
    <div class="preload-ctn">
	    <!-- <div class="preload-unicorn"></div>
	    <div class="preload-rainbow-end"></div>
	    <div class="preload-rainbow-solid"></div> -->
	    <img src="/assets/images/loader/png/loader-unicorn.png">
	    <img src="/assets/images/loader/png/loader-rainbow.png">
	    <img src="/assets/images/loader/png/loader-snippet.png">
    </div>
    
	<!------------ CORPORATE ------------->
	<div class="corporate">
	
    <?php if(isset($root)) include $root.'/inc/header.php';?>	
	
	<section class="content-sect">
	<div id="pane-ctn">
	
	<!------------ CASTLE GATEWAY ------------->
	<section class="castle-gateway-sect">
		<div id="castle-gateway-pane" class="pane full-screen">
	        <div class="row row-content">
				<div class="column large-12 medium-12 small-12">
					<div class="row-absolute"><div class="logo full-logo"></div></div>
                    <div class="row-absolute"><h1 class="text-shadow white">Welcome to our<br>idea-generator.</h1></div>
                    <div class="row-absolute hide-for-small show-for-medium-up">
                        <div class="input-w-btn-ctn">
                            <div class="shadow-bordered"><input class="input input-method" placeholder="How do I sell more ..."/></div>
                            <div class="shadow-bordered shadow-bordered-blue"><a class="btn btn-blue btn-ask" href="">ENTER</a></div>
                        </div>
                    </div>
                    <div class="row-absolute show-for-small hide-for-medium-up">
                	   <div class="input-w-btn-ctn ta-w-btn-ctn">
                            <div class="shadow-bordered row-float input-ctn-ta"><textarea class="input input-ta-method"></textarea></div>
                            <div class="shadow-bordered shadow-bordered-blue row-float"><a class="btn btn-blue btn-ask" href="">ENTER</a></div>
                        </div>
                    </div>
				</div>
            </div>
		</div>
	</section>
	
	</div>
	</section>
	
	<!-- <div class="divider shadow-bordered bottom-sticky"></div> -->
	<!------------ MAIN NAV ------------->
    <?php if(isset($root)) include $root.'/inc/main-nav-ctn.php';?>
        
    <!------------ SMALL MENU ------------->
    <?php if(isset($root)) include $root.'/inc/small-menu.php';?>
                    
	
	</div>
	
	<!------------ CASTLE ------------->
	<div class="castle">
		<div class="scene-ctn"><div id="skrollr-body"></div></div>
		<div class="loader"></div>
	</div>
</div>

<?php if(isset($root)) include $root.'/inc/dom-end.php';?>
