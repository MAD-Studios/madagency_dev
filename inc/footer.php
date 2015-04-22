<!------------ FOOTER ------------->
<section class="footer-sect">
	<div id="footer">
        <div class="row">
            <div class="column large-12 small-12">
            
                <div class="main-nav-ctn hide-for-medium-down show-for-large-up">
                    <a href="" class="full-logo-sm full-logo-white full-logo logo"></a>
                    <ul class="main-nav">
                        <li><a class="btn" id="intro-btn" href="/">ABOVE THE FOLD</a></li>
                        <li><a class="btn" id="how-btn" href="/how">HOW WE ROLL</a></li>
                        <li><a class="btn" id="work-btn" href="/work">THE WORK</a></li>
                        <li><a class="btn" id="team-btn" href="/team">OUR TEAM</a></li>
                        <li><a class="btn" id="disciplines-btn" href="/disciplines">DISCIPLINES</a></li>
                        <li><a class="btn" id="contact-btn" href="/contact">CONTACT US</a></li>
                    </ul>
                </div>
                
                <ul class="social-nav hide-for-medium-down show-for-large-up">
                    <?php if(isset($root)) include $root.'/inc/social-nav.php';?>
				</ul>
            </div>
        </div>
	</div>
</section>
