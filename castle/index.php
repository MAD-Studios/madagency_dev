<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MAD Agency - Creative Castle</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="title" content="MAD Agency - Creative Castle" />
    <meta name="keywords" content="mad, agency, creative, castle, creative advertising, interactive, fort lauderdale, miami, digital, app, website, design, digital, online, content, SEO, SEM, branding, marketing, database, integrated" />
    <meta name="robots" content="noodp" />
    <meta name="description" content="MAD Agency is a full service Advertising/Marketing/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result." />
    <meta property="og:title" content="MAD Agency - Design + Printing + Marketing" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://www.madstudios.net" />
    <meta property="og:image" content="http://www.madstudios.net/assets/img/share_logo.jpg" />
    <meta property="og:description" content="MAD Agency is a full service Advertising/Marketing/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result." />
    <link href="css/castle.css" type="text/css" rel="stylesheet" />
    
    <script src="js/vendor/jquery.activity-indicator-1.0.0.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="//use.typekit.net/ntj1viz.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
    <script src="js/vendor/skrollr.min.js"></script>
    <script src="js/vendor/underscore-min.js" type="text/javascript"></script>
    <script src="js/vendor/backbone-min.js" type="text/javascript"></script>
    <script src="js/vendor/greensock/TweenLite.min.js"></script>
    <script src="js/vendor/greensock/CSSPlugin.min.js"></script>
    <script src="js/vendor/greensock/EasePack.min.js"></script>
    <script src="js/vendor/greensock/ScrollToPlugin.min.js"></script>
    <script src="js/vendor/jquery-image-loader.js"></script>
    
    <script src="js/main.js" type="text/javascript"></script>
    <script src="js/utils/TemplateLoader.js" type="text/javascript"></script>
    <script src="js/utils/ElementManipulator.js" type="text/javascript"></script>
    <script src="js/models/PaneModel.js" type="text/javascript"></script>
    <script src="js/models/SceneModel.js" type="text/javascript"></script>
    <script src="js/models/ResponseGeneratorModel.js" type="text/javascript"></script>
    <script src="js/models/LoaderModel.js" type="text/javascript"></script>
    <script src="js/models/AudioModel.js" type="text/javascript"></script>
    <script src="js/views/MainView.js" type="text/javascript"></script>
    <script src="js/views/CorporateView.js" type="text/javascript"></script>
    <script src="js/views/PaneContainerView.js" type="text/javascript"></script>
    <script src="js/views/PaneView.js" type="text/javascript"></script>
    <!-- <script src="js/views/MethodPaneView.js" type="text/javascript"></script>
    <script src="js/views/HowPaneView.js" type="text/javascript"></script>
    <script src="js/views/WorkPaneView.js" type="text/javascript"></script>
    <script src="js/views/TeamPaneView.js" type="text/javascript"></script>
    <script src="js/views/DisciplinesPaneView.js" type="text/javascript"></script>
    <script src="js/views/ContactPaneView.js" type="text/javascript"></script>
    <script src="js/views/MainNavContainerView.js" type="text/javascript"></script> -->
    <script src="js/views/HeaderView.js" type="text/javascript"></script>
    <script src="js/views/FooterView.js" type="text/javascript"></script>
    <script src="js/views/StoryView.js" type="text/javascript"></script>
    <script src="js/views/SceneView.js" type="text/javascript"></script>
    <script src="js/views/SceneCastleView.js" type="text/javascript"></script>
    <script src="js/views/SceneCreationView.js" type="text/javascript"></script>
    <script src="js/views/SceneGerbilView.js" type="text/javascript"></script>
    <script src="js/views/SceneXrayView.js" type="text/javascript"></script>
    <script src="js/views/SceneLabView.js" type="text/javascript"></script>
    <script src="js/views/SceneBoyView.js" type="text/javascript"></script>
    <script src="js/views/LoaderView.js" type="text/javascript"></script>
    <script src="js/views/SceneContainerView.js" type="text/javascript"></script>
    <script src="js/views/ScrollDownIndicatorView.js" type="text/javascript"></script> 
    
    <!--[if lt IE 9]>
            <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
</head>
    
<body>
	
<div id="main">
    
	<!------- preload story loader assets -------->
    <div class="preload-container">
	    <div class="preload-unicorn"></div>
	    <div class="preload-rainbow-end"></div>
	    <div class="preload-rainbow-solid"></div>
    </div>
    
	<!------------ CORPORATE ------------->
	<div class="corporate">
	
	<?php include 'inc/header.php';?>
	
	<section class="content-sect">
	<div id="pane-container">
	
	<!------------ CASTLE GATEWAY ------------->
	<section class="castle-gateway-sect">
		<div id="castle-gateway-pane" class="pane full-screen">
	        <div class="row row-content">
				<div class="column large-12 medium-12 small-12">
					<div class="row-absolute"><div class="logo full-logo"></div></div>
                    <div class="row-absolute"><h1 class="text-shadow white">Welcome to our<br>idea-generator.</h1></div>
                    <div class="row-absolute hide-for-small show-for-medium-up">
                        <div class="input-w-btn-container">
                            <div class="shadow-bordered"><input class="input input-method" placeholder="How do I sell more ..."/></div>
                            <div class="shadow-bordered shadow-bordered-blue"><a class="btn btn-blue btn-ask" href="#">ENTER</a></div>
                        </div>
                    </div>
                    <div class="row-absolute show-for-small hide-for-medium-up">
                	   <div class="input-w-btn-container ta-w-btn-container">
                            <div class="shadow-bordered row-float input-container-ta"><textarea class="input input-ta-method"></textarea></div>
                            <div class="shadow-bordered shadow-bordered-blue row-float"><a class="btn btn-blue btn-ask" href="#">ENTER</a></div>
                        </div>
                    </div>
				</div>
            </div>
		</div>
	</section>
	
	</div>
	
	<!------------ STORY ------------->
	<div class="story story">
		<div class="scene-container"><div id="skrollr-body"></div></div>
		<div class="loader"></div>
	</div>

<?php include 'inc/dom-end.php';?>
