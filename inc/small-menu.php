<div class="small-menu show-for-medium-down hide-for-large-up">
	<div class="nav-ctn">
		<div class="header"></div>
		<ul class="main-nav">
            <?php if(isset($root)) include $root.'/inc/main-nav.php';?>
		</ul>
		<div class="social-nav-ctn">
			<a href="#" class="header btn social-btn">SOCIAL<img class="arrow arrow-down" src="" data-img-src="/assets/images/corporate/png/nav-arrow@2x.png" alt="social" /></a>
			<ul class="social-nav">
			    <?php if(isset($root)) include $root.'/inc/social-nav.php';?>
			</ul>
		</div>
	</div>
	<div class="btn-toggle-ctn">
        <a href="" class="btn btn-blue toggle-btn"><img class="arrow" src="" data-img-src="/assets/images/corporate/png/nav-arrow@2x.png" alt="open menu" /></a>
    </div>
</div>
