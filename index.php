<?php $root = $_SERVER['DOCUMENT_ROOT']; ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi" />
    <title>mad agency - design + printing + marketing</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="title" content="mad agency - design + printing + marketing" />
    <meta name="keywords" content="mad, agency, advertising, interactive, fort lauderdale, miami, digital, app, website, design, digital, online, content, SEO, SEM, branding, marketing, database, agency, integrated" />
    <meta name="robots" content="noodp" />
    <meta name="description" content="Mad Agency is a full service Advertising/Marketing/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result." />
    <meta property="og:title" content="mad agency - design + printing + marketing" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://www.madstudios.net" />
    <meta property="og:image" content="http://www.madstudios.net/assets/img/share_logo.jpg" />
    <meta property="og:description" content="Mad Agency is a full service Advertising/Marketing/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result." />
    <link href="css/mad-agency.css" type="text/css" rel="stylesheet" />
    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
    <script src="js/vendor/jquery.ui.map.full.min.js" type="text/javascript"></script>
    <script src="js/vendor/jquery.activity-indicator-1.0.0.min.js" type="text/javascript"></script>
    <script src="//use.typekit.net/ntj1viz.js" type="text/javascript"></script>
    <script src="js/vendor/underscore-min.js" type="text/javascript"></script>
    <script src="js/vendor/backbone-min.js" type="text/javascript"></script>
    <script src="js/vendor/greensock/TweenLite.min.js"></script>
    <script src="js/vendor/greensock/CSSPlugin.min.js"></script>
    <script src="js/vendor/greensock/EasePack.min.js"></script>
    <script src="js/vendor/greensock/ScrollToPlugin.min.js"></script>
    <script src="js/vendor/jquery-image-loader.js"></script>    
    <script src="js/vendor/fastclick.js" type="text/javascript"></script>
    
    <script src="js/main.js" type="text/javascript"></script>
    <script src="js/corporate.js" type="text/javascript"></script>
    <script src="js/events/Event.js" type="text/javascript"></script>
    <script src="js/utils/TemplateLoader.js" type="text/javascript"></script>
    <script src="js/utils/ElementManipulator.js" type="text/javascript"></script>
    <script src="js/utils/DeviceDetector.js" type="text/javascript"></script>
    <script src="js/utils/BtnUtils.js" type="text/javascript"></script>
    <script src="js/routers/Router.js" type="text/javascript"></script>
    <script src="js/routers/corporate/Router.js" type="text/javascript"></script>
    <script src="js/models/PaneModel.js" type="text/javascript"></script>
    <script src="js/views/MainView.js" type="text/javascript"></script>
    <script src="js/views/corporate/MainView.js" type="text/javascript"></script>
    <script src="js/views/CorporateView.js" type="text/javascript"></script>
    <script src="js/views/corporate/CorporateView.js" type="text/javascript"></script>
    <script src="js/views/PaneContainerView.js" type="text/javascript"></script>
    <script src="js/views/corporate/PaneContainerView.js" type="text/javascript"></script>
    <script src="js/views/PaneView.js" type="text/javascript"></script>
    <script src="js/views/corporate/IntroPaneView.js" type="text/javascript"></script>
    <script src="js/views/corporate/HowPaneView.js" type="text/javascript"></script>
    <script src="js/views/corporate/WorkPaneView.js" type="text/javascript"></script>
    <script src="js/views/corporate/TeamPaneView.js" type="text/javascript"></script>
    <script src="js/views/corporate/DisciplinesPaneView.js" type="text/javascript"></script>
    <script src="js/views/corporate/ContactPaneView.js" type="text/javascript"></script>
    <script src="js/views/MainNavContainerView.js" type="text/javascript"></script>
    <script src="js/views/HeaderView.js" type="text/javascript"></script>
    <script src="js/views/FooterView.js" type="text/javascript"></script>
    <script src="js/views/SmallMenuView.js" type="text/javascript"></script>
    
    <!--[if lt IE 9]>
            <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
	
<div id="main">

	<!------------ CORPORATE ------------->
	<div class="corporate">
	
	<?php include 'inc/header.php'; ?>
	
	<div class="content-wrapper">
    	<section class="content-sect">
    	<div id="pane-ctn">
    	
    		<!------------ INTRO ------------->
    		<section class="intro-sect">
        		
    			<div id="intro-pane" class="pane full-screen">
    				<div class="intro">
    			        <div class="row row-content">
    						<div class="column large-10 large-centered medium-12 small-12">
    						
    							<div class="row-absolute"><div class="text-block vertical-center">
    								<h1 class="text-shadow white">Hi. We are Mad Agency.<br>We do a lot of cool things for our clients.</h1>
    					        	<h1 class="text-shadow white last">Here&rsquo;s a list of some things we could do for you.</h1>
    								<div class="row-absolute row-arrow-ctn"><div id="show-more-btn" class="btn arrow circle-arrow down"></div></div>
    							</div></div>
    							
    							<div class="row-absolute"><div class="text-block text-block-to-fade">
    					        	<h2>Yes, we can help you retain your customers.</h2>
    								<h2>Yes, we can help you acquire new customers.</h2>
    								<h2>Yes, we can design a kick-ass logo for your business.</h2>
    								<h2>Yes, we can design a super-corporate logo too.</h2>
    								<h2>Yes, reluctantly, we can make that logo bigger.</h2>
    								<h2>Yes, we can build you a new web presence.</h2>
    								<h2>Yes, we can build you a website too.</h2>
    								<h2>Yes, we can develop an easy to use interface.</h2>
    								<h2>Yes, we can design a beer label for you.</h2>
    								<h2>Yes, we can design a sustainable six-pack carrier.</h2>
    								<h2>Yes, we can accept beer donations.</h2>
    								<h2>Yes, we can create an app for that.</h2>
    								<h2>Yes, we can develop a social media strategy.</h2>
    								<h2>Yes, we can design a cool Facebook post too.</h2>
    								<h2>Yes, we speak HTML5.</h2>
    								<h2>Yes, we build responsive.</h2>
    								<h2>Yes, we can speak Star Wars too.</h2>
                                    <h2>Yes, we can test in multiple environments.</h2>
                                    <h2>Yes, unenthusiastically, we will test in IE8.</h2>
                                    <h2>Yes, we can write copy that will get the party started.</h2>
                                    <h2>Yes, sometimes that copy is for our own parties.</h2>
                                    <h2>Yes, we spend our freetime designing for funzies.</h2> 
                                    <h2>Yes, we are card-carrying museum patrons.</h2>
                                    <h2>Yes, we know how to brand your product.</h2>
                                    <h2>Yes, we know how to make it stand out.</h2>
                                    <h2>Yes, we are perfectionists.</h2>
                                    <h2>Yes, that means we burn the midnight oil.</h2>
                                    <h2>Yes, that also means we have Gold status at Starbucks.</h2>
                                    <h2>Yes, things can get a little crazy with meeting deadlines.</h2>
                                    <h2>Yes, we sort of like crazy.</h2>
                                    <h2>Yes, we do things unconventionally.</h2>
                                    <h2>Yes, we love what we do.</h2>
                                    <h2>Yes, we are mad.</h2> 
    							</div></div>
    							
    							<div class="row-absolute"><div class="text-block vertical-center">
    								<h1 class="text-shadow white">That&rsquo;s a lot of cool things.<br>Right?</h1>
    								<h2>So if you&rsquo;re ready to start hearing YES to your advertising, marketing, public relations, and production needs <a id="contact-btn" class="btn" href="contact">contact us</a>.</h2>
    								<h2>Or, just keep scrolling to find out what we’re all about.</h2>
    							</div></div>
    							
    						</div>
    		            </div>
    				</div>
    				<div class="gradient gradient-small gold hide-for-medium-down show-for-large-up"><div class="top"></div></div>
    			</div>
    		</section>
    		
    		<!------------ HOW ------------->
    		<section class="how">
    			<div id="how-pane" class="pane">
    				<div class="row row-content">
    					<div class="column large-7 medium-7 hide-for-medium-down show-for-large-up">
    						<h2>Mad Agency works tirelessly to understand what makes your business unique.</h2>
    						<h3>We then explore creative ways to communicate to the customers you have, and help find the ones that are looking for you.</h3>
    						<p>In the summer of 2000 a team of experts from various backgrounds and fields got together with one common goal - produce great work.</p>
    						<p>And, while “great work” meant one thing then, it means a whole lot more today. Many agencies can produce great work, we strive to produce the type of work that gets results. That must be why the clients we have don’t just stay for a campaign or two, they stay for the long haul.</p>
    					</div>
    					
    					<div class="column large-5 large-uncentered medium-10 medium-centered small-10 small-centered">
    						<div class="row-float"><img id="img-how" src="" data-img-src="assets/images/corporate/png/how-logo-method@2x.png"  alt="How Method" title="How Method" /></div>
    						<!-- <div class="row-float hide-for-medium-down show-for-large-up"><div class="btn-move-ctn"><a class="btn btn-move" href=""><p>SEE IT IN ACTION</p><img style="width:16px;height:16px;"src="" data-img-src="assets/images/corporate/svg/how-btn-arrow.svg" alt="arrow down" title="arrow down"/></a></div> -->
    					</div>
    					
    				</div>
    				<div class="row row-content hide-for-large-up">
    					<div class="column small-12">
    						<h3>Mad Agency works tirelessly to understand what makes your business unique. We then explore creative ways to communicate to the customers you have, and help find the ones that are looking for you.</h3>
    					</div>
    				</div>
    			</div>
    		</section>
    		
    		<!------------ WORK ------------->
    		<section class="work">
    			<div id="work-pane" class="pane">
                    <div class="row-float hide-for-large-up show-for-medium-down row-pane-divider"><div class="pane-title">THE WORK</div><div class="divider"></div></div>
    				<div class="row">
    					<div class="column large-12">
    						<div class="row-float show-for-large-up hide-for-medium-down row-pane-divider"><div class="pane-title">THE WORK</div><div class="divider"></div></div>
    						<div class="row row-content row-header"><div class="column large-12">
    							<p>Have a quick gander at some of the more <b>recent projects</b> we’ve had the privilege to work on. We will add to this archive quarterly, so be sure to check back.</p>
    						</div></div>
    						<div class="row row-content"><div class="column large-12">	
    							<div class="video-ctn"></div>
    						</div></div>
    					</div>
    				</div>
    			</div>
    		</section>
    		
    		<!------------ TEAM ------------->
    		<section class="team">
    			<div id="team-pane" class="pane">
                    <div class="row-float hide-for-large-up show-for-medium-down row-pane-divider row-pane-divider-offset"><div class="pane-title">OUR TEAM</div><div class="divider"></div></div>
    				<div class="row">
    					<div class="column large-12">
    						<div class="row-float show-for-large-up hide-for-medium-down row-pane-divider"><div class="pane-title">OUR TEAM</div><div class="divider"></div></div>
    						<div class="row-float row-content">
    						
    							<div class="row">
    								<div class="column large-6 small-12"><div class="row">
                                        <div class="column large-2 small-2">
                                            <div class="icon-role icon-creative-director"></div>
                                        </div>
                                        <div class="column large-10 small-10">
                                            <p>The <b>Creative Director</b> is there to push the creative team to go where no one from the client-side upper management would ever dare want them to go. While they oversee the “feel” of a campaign, the CD is there to make sure the campaign is not only memorable, but also delivers on the intended strategic goals.</p>
                                        </div>
                                    </div></div>
    								<div class="column large-6 small-12"><div class="row">
                                        <div class="column large-2 small-2">
                                           <div class="icon-role icon-front-end"></div>
                                        </div> 
                                        <div class="column large-10 small-10">
                                           <p>The <b>Front-End Developer</b> gives life to both websites and applications, think evil scientist and Frankenstein. They take the static design and content provided by the creative team and bring it to life on the screen. They usually have some sort of Star Wars memorabilia on their desk.</p>
                                        </div>
                                    </div></div>
    							</div>
    						
    							<div class="row">
    								<div class="column large-6 small-12"><div class="row">
                                        <div class="column large-2 small-2">
                                           <div class="icon-role icon-art-director"></div>
                                        </div> 
                                        <div class="column large-10 small-10">
                                           <p>The <b>Art Director</b> is tasked with making sure the visual aspects of any communication are on point. These people usually have a good sense of style and tend to be artsy. Their artsy-ness can range from Etsy Store owner to "I design my band's gig flyers."</p>
                                        </div>
                                    </div></div>
    								<div class="column large-6 small-12"><div class="row">
                                        <div class="column large-2 small-2">
                                            <div class="icon-role icon-programmer"></div>
                                        </div>
                                        <div class="column large-10 small-10">
                                            <p><b>Programmers</b> write computer programs.</p>
                                        </div>
                                    </div></div>
    							</div>
    							
    							<div class="row">
    								<div class="column large-6 small-12"><div class="row">
                                        <div class="column large-2 small-2">
                                            <div class="icon-role icon-copy-writer"></div>
                                        </div> 
                                        <div class="column large-10 small-10">
                                            <p><b>Copywriters</b> tend to ask a lot of questions, seriously - a lot of questions. But, they don’t mean to be annoying; they are just inquisitive creatures attempting to learn about exactly what they’re writing. Known for correcting your grammar and having pets named after Shakespearean characters.</p>
                                        </div>
                                    </div></div>
    								<div class="column large-6 small-12 last"><div class="row">
                                        <div class="column large-2 small-2">
                                           <div class="icon-role icon-proj-manager"></div>
                                        </div>
                                        <div class="column large-10 small-10">
                                            <p>At Mad Agency we take a lot of pride knowing that when we set a deadline it’s going to be met. The <b>Project Manager</b> works with both our team and yours to make sure not only is the deadline met, but quality isn’t sacrificed.</p>
                                        </div>
                                    </div></div>
    							</div>
                                
                                <div class="row show-for-large-up hide-for-medium hide-for-small">
                                    <div class="column large-12 small-12"><div class="btn-move-ctn"><a class="btn btn-move" href=""><p>WATCH THEM GET’R DONE</p><img style="width:16px;height:16px;"src="" data-img-src="assets/images/corporate/svg/how-btn-arrow.svg" alt="arrow up" title="arrow up" /></a></div>
                                </div>
    							
    						</div>
    					</div>
    				</div>
    			</div>
    		</section>
    		
    		<!------------ DISCIPLINES ------------->
    		<section class="disciplines">
    			<div id="disciplines-pane" class="pane">
                    
                    <div class="row-float hide-for-large-up show-for-medium-down row-pane-divider row-pane-divider-offset"><div class="pane-title">DISCIPLINES</div><div class="divider"></div></div>
                    <div class="row">
                        <div class="column large-12 small-12">
                            
                            <div class="row-float show-for-large-up hide-for-medium-down row-pane-divider row-pane-divider-offset"><div class="pane-title">DISCIPLINES</div><div class="divider"></div></div>
                            
                            <div class="row row-content row-header">
                                <div class="column large-12 small-12">
                                    <p><b>Mad Agency</b> is a full service Advertising/Marketing/Public Relations/Production agency. We have the people needed to build your project here, onsite. This allows for tighter timelines and a more cohesive end result.</p>
                                </div>
                            </div>
                            
                            <div class="row row-content">
                                <div class="column large-4 small-12">
                                    <ul>
                                        <li>Interactive Design</li>
                                        <li>Brand Design</li>
                                        <li>Marketing Communications</li>
                                        <li>User Interface Design</li>
                                    </ul>
                                </div>
                                <div class="column large-4 small-12">
                                    <ul>
                                        <li>User Experience Design</li>
                                        <li>Front End Development</li>
                                        <li>Serverside/CMS Development</li>
                                        <li>Quality Assurance</li>
                                    </ul>
                                </div>
                                <div class="column large-4 small-12">
                                    <ul>
                                        <li>Brand Creative Direction</li>
                                        <li>Brand Strategy</li>
                                        <li>Retention Marketing Strategy</li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    			</div>
    		</section>
    		
    		<!------------ Contact ------------->
    		<section class="contact">
    			<div id="contact-pane" class="pane">
                    <div class="row-float row-pane-divider row-pane-divider-offset"><div class="pane-title">CONTACT US</div></div>
                    
    				<div class="row row-content row-header">
    				    <div class="column large-5 medium-5 hide-for-small show-for-medium-up">
                            <div class="flag-map"><a href="" id="flag-fl" class="flag active"></a><a href="" id="flag-mn" class="flag"></a></div>
                        </div>
                        <div class="column large-1 medium-1 hide-for-small show-for-medium-up">
                            &nbsp;
                        </div>
                        <div class="column large-3 medium-3 small-6" id="mad-south-addr">
                            <div class="row-float" ><a id="btn-fl" class="btn-addr btn active" href=""><h4 class="addr-title">mad south</h4></a></div>
                            <p class="addr">101 NE 3rd Avenue<br />Suite 1920<br />Fort Lauderdale, FL 33301</p>
                        </div>
                        <div class="column large-3 medium-3 small-6" id="mad-midwest-addr">
                            <div class="row-float" ><a id="btn-mn" class="btn-addr btn" href=""><h4 class="addr-title">mad midwest</h4></a></div>
                            <p class="addr">333 Washington Ave N<br />Suite 321<br />Minneapolis, MN 55401</p>
                        </div>
                    </div>
                
                    <div class="row row-content"><div class="column large-12 small-12">
                        <div class="map-ctn"><div class="map"></div></div>
                    </div></div>
                
                    <div class="row row-content"><div class="column large-12 small-12">
                        <div class="row-float msg"><h1>Come on over for a visit.</h1><p>We’re always interested to learn how your business functions. Just go ahead and drop us a line<br />and we’ll get in touch. If you give us an idea of why you’re contacting us - even better.</p></div>
                    </div></div>
                
                    <div class="row row-content" id="contact-form">
                        <div class="column large-6 small-12">
                            <div class="input-ctn shadow-bordered shadow-bordered-lt-blue row-float">
                                <p class="row-float"><i>Your Name</i></p><input class="row-float" id="input-name" />
                            </div>
                            <div class="input-ctn shadow-bordered shadow-bordered-lt-blue row-float">
                                <p class="row-float"><i>Your E-mail</i></p><input class="row-float" id="input-email" />
                            </div>
    				        <div class="input-ctn shadow-bordered shadow-bordered-lt-blue row-float">
                                <p class="row-float"><i>Your Industry</i></p><input class="row-float" id="input-industry" />
                            </div>
                        </div>
                        <div class="column large-6 small-12">
                            <div class="input-ctn input-ctn-ta shadow-bordered shadow-bordered-lt-blue row-float"><p class="row-float"><i>Your Business’ Challenge</i></p><textarea class="row-float" id="input-challenge"></textarea></div>
    				        <div class="row-float shadow-bordered shadow-bordered-blue btn-submit-ctn"><a href="" class="btn btn-blue btn-submit row-float">SUBMIT</a></div>
                        </div>
                    </div>
                
                    <div class="row row-content"><div class="column large-12 small-12 notice-col">
                    </div></div> 
    			</div>
    		</section>
    		
    	</div>
    	</section>
    	
    	<?php include 'inc/footer.php';?>
	</div>
		
	<!------------ MAIN NAV ------------->
    <?php include 'inc/main-nav-ctn.php';?>

    <!------------ SMALL MENU ------------->
	<div class="small-menu show-for-medium-down hide-for-large-up">
		<div class="nav-ctn">
			<div class="header"></div>
			<ul class="main-nav">
                <?php include 'inc/main-nav.php';?>
			</ul>
			<div class="social-nav-ctn">
				<a href="#" class="header btn social-btn">SOCIAL<img class="arrow arrow-down" src="" data-img-src="/assets/images/corporate/png/nav-arrow@2x.png" alt="social" /></a>
				<ul class="social-nav">
				    <?php include 'inc/social-nav.php';?>
				</ul>
			</div>
		</div>
		<div class="btn-toggle-ctn">
            <a href="#" class="btn btn-blue toggle-btn"><img class="arrow" src="" data-img-src="/assets/images/corporate/png/nav-arrow@2x.png" alt="open menu" /></a>
        </div>
	</div>
	
	</div>
	
</div>

<?php include 'inc/dom-end.php';?>

