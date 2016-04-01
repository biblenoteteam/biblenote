$(document).ready(function(){

	Menu = (function($){
		var init;

		init = function(){
			var toggle = $('a.toggleMenu'),
                windowWidth = $(window).width(),
                body = $('body');

			toggle.click(function(){
				body.toggleClass('menuOpen');
				return false;
			});

		};

		return { init: init }
	})(jQuery);

    PlaceHolder = (function($){
        var init = function(){
            var i = document.createElement('input');

            // brak support dla placeholdera
            if(!('placeholder' in i)){
                var element = $('input[placeholder], textarea[placeholder');
                element.each(function(){
                    var _this = $(this);

                    if(_this.val() == '')
                    _this.val(_this.attr('placeholder'));

                _this.focus(function(){
                    if(_this.val() == _this.attr('placeholder'))
                    _this.val('');
                });

                _this.blur(function(){
                    if(_this.val() == '')
                    _this.val(_this.attr('placeholder'));
                });

                });
            }
        }

        return { init: init }
    })(jQuery);

    Slider = (function($){
        var init;

        init = function(){;
            var root = $('div.slider');

            root.each(function(){
                var _this = $(this),
                    menu = _this.find('.sliderMenu').children(),
                    slides = _this.find('.slides').children(),
                    setSlide;

                setSlide = function(index){
                    menu.removeClass('active').eq(index).addClass('active');
                    slides.removeClass('active').eq(index).addClass('active');
                };

                menu.on('click', 'a', function(){
                    var index = $(this).parent().index();
                    setSlide(index);

                    return false;
                });

            });
        };

        return { init: init }
    })(jQuery);

    RecentlySearched = (function($){
        var init;

        init = function(){
            var root = $('.recentlySearched'),
                wrap = root.children('.wrap'),
                slides = wrap.children('ul'),
                prev = $('<a class="prev" href="#"></a>'),
                next = $('<a class="next" href="#"></a>'),
                pages = {
                    number: slides.size(),
                    active: 0
                },
                setSlide;


            if(pages.number < 2)
                return false;

            setSlide = function(index){
                var temp;

                if(index <= 0)
                    temp = 0;
                else if(index >= pages.number-1)
                    temp = pages.number-1;
                else
                    temp = index;

                prev.removeClass('hidden');
                next.removeClass('hidden');

                if(temp == 0)
                    prev.addClass('hidden');
                if(temp == pages.number-1)
                    next.addClass('hidden');

                slides.removeClass('active').eq(temp).addClass('active');
                pages.active = temp;
            };

            prev.addClass('hidden').appendTo(wrap);
            next.appendTo(wrap);

            prev.click(function(){
                setSlide(pages.active-1);
                return false;
            });

            next.click(function(){
                setSlide(pages.active+1);
                return false;
            });

        };

        return { init: init }
    })(jQuery);


    Menu.init();
    PlaceHolder.init();
    Slider.init();
    RecentlySearched.init();


});


