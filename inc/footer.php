<!------------ FOOTER ------------->
<section class="footer-sect">
	<div id="footer">
        <div class="row">
            <div class="column large-12 small-12">
            
                <div class="main-nav-ctn hide-for-medium-down show-for-large-up">
                    <a href="" class="full-logo-sm full-logo-white full-logo logo"></a>
                    <ul class="main-nav">
                        <?php if(isset($root)) include $root.'/inc/main-nav.php';?>
                    </ul>
                </div>
                
                <ul class="social-nav hide-for-medium-down show-for-large-up">
                    <?php if(isset($root)) include $root.'/inc/social-nav.php';?>
				</ul>
            </div>
        </div>
	</div>
</section>
