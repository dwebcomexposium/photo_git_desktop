;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var animatedElements = '.actus, .marques, .village, .section-socials, .section-partners, .partenaires-all, #zone4 .quicklinks .ql-item, .social-sharing, .article_list .la-item'; 

	// Home slider
	function initHomepageSlider() {
		var $slider = $('.list-articles.selection .la-slider');
		var $clone = $slider.clone();
		var sliderPaging = '<div class="slider-paging">';

		for (var i = 0; i <= $clone.find('.la-item').length - 1; i++) {
			sliderPaging += '<a href="#"></a>';
		}

		sliderPaging += '</div>';

		$slider.after($clone);

		var $slidesContainer = $clone.find('.slider-content');

		$clone
			.append(sliderPaging);
		$slider.remove();

		$clone
			.find('.slider-paging a:first-child')
			.addClass('active');

		$clone
			.find('img')
			.each(function(){
				var $this = $(this);
				var $imgClone = $this.clone().addClass('background');

				$this
					.parent()
					.append($imgClone);
			});
			
		$slidesContainer.carouFredSel({
			width: '100%',
			responsive: true,
			items: 1,
			scroll: { 
				fx: 'fade',
				duration: 1300,
				onBefore: function() {
					$slidesContainer.find('.la-item').removeClass('active');
				},
				onAfter: function() {
					$slidesContainer.find('.la-item:first-child').addClass('active');

					$('#zone1 .list-articles .slider-paging a')
															.eq($slidesContainer.triggerHandler('currentPosition'))
															.addClass('active')
															.siblings()
															.removeClass('active');
				}
			},
			auto: {
				play: true,
				timeoutDuration: 7000
			},
			infinite: true,
			onCreate: function() {
				$slidesContainer.find('.la-item:first-child').addClass('active');

				$clone
					.parent()
					.addClass('loaded');
			}
		});

		$clone.find('.slider-paging a').on('click', function(e){
			e.preventDefault();

			var $this = $(this);

			$this
				.addClass('active')
				.siblings()
				.removeClass('active');

			$slidesContainer.trigger('slideTo', $this.index());
		});
	}

	//  Slider tiles
	function initTilesSlider() {
		var $slider = $('.list-articles.actus .la-slider');
		var $sliderClone = $('.list-articles.actus .la-slider').clone();
		var arrows = '<div class="slider-actions"><a href="#" class="slider-prev" id="prev"></a><a href="#" class="slider-next" id="next"></a></div>';

		$slider
			.after($sliderClone, arrows)
			.remove();

		$sliderClone
			.find('.slider-content')
			.carouFredSel({
				width: '100%',
				responsive: true,
				items: 4,
				infinite: true,
				auto: {
					play: false
				},
				prev: {
					button: $('#prev')
				},
				next: {
					button: $('#next')
				}
			});
	}

	// Sticky header
	function fixHeader(winST) {
		var $wrapper = $('.global-wrapper');
		var $header = $('.site-banner');
		var mainOT = $('#main').offset().top;

		if (winST > mainOT && !$header.hasClass('fixed')) {
			$wrapper.css({
				'paddingTop': $header.outerHeight()
			});

			$header.addClass('fixed');
		} else if (winST < mainOT) {
			$header.removeClass('fixed');

			$wrapper.css({
				'paddingTop': 0
			});
		}
	}

	// Partners slider
	function initPartnerSlider() {
		var $slider = $('.partner.marques .partner-gallery');
		var $clone = $slider.clone();

		$slider.after($clone);
		$slider.detach();

		$clone.find('.slider-content').carouFredSel({
			width: '100%',
			circular: true,
			infinite: true,
			responsive: true,
			swipe: true,						
			auto: {
				play: true,
				timeoutDuration: 0
			},
			swipe: {
				onTouch: true
			},
			scroll: {
				duration: 40000,
				easing: 'linear'
			},
			items: {
				minimum: 1,
				visible: 5
			}
		})
	}

	// Scroll down animation
	function animateElement(winST) {
		var $animate = $(animatedElements);

		$animate.each(function(){
			var $this = $(this);
			var offset = $this.offset().top;

			if (winST + ($win.outerHeight() * 0.8) > offset) {
				$this.addClass('animated');
			}
		});

		if (winST + $win.outerHeight() > $('.site-footer').offset().top) {
			$animate.addClass('animated');
		}
	}

	$doc.ready(function() {
		$win.on('load', function(){
			if ($('.list-articles.selection').length) {
				initHomepageSlider();
			}

			if ($('.list-articles.actus').length) {
				initTilesSlider();
			}

			if ($('.partner.marques').length) {
				initPartnerSlider();
			}
		}).on('scroll', function(){
			var winST = $win.scrollTop();

			fixHeader(winST);

			animateElement(winST);
		});

		if (animatedElements != '') {
			$(animatedElements).addClass('animate');
		}

		if ($('.partner.village').length) {
			var $slider = $('.partner.village .partner-gallery');
			var $clone = $slider.clone();

			$slider.after($clone);
			$slider.detach();
		}

		if ($('.article-wrapper').length) {
			$('.article-wrapper h2, .article-wrapper h4').wrapInner('<span/>');
		}

		if ($('.newsletter-form').length) {
			$('.newsletter-form .form-txt').attr('placeholder', 'Email...');
		}

		$('.gsf-trigger').on('click', function(e){
			setTimeout(function() {
				$('#search').focus();
			}, 100);
		});
	});
})(jQuery, window, document);
