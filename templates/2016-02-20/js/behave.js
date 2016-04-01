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

    Fares = (function($){
        var init;

        init = function(){
            var fares = $('.fares');

            fares.each(function(){
                var _this = $(this);

                _this.find('.choosedDay').on('click', 'a', function(){
                    $(this).closest('.choosedDay').next('div.week').toggleClass('active');
                    return false;
                });

                _this.find('.flightType').on('click','input', function(){
                    if(this.value == 'business')
                        _this.addClass('business');
                    else
                        _this.removeClass('business');
                });
            });
        };

        return { init: init }
    })(jQuery);

	NiceSelect = (function($){
		var init, selects;

		init = function(root){
			if(root){
				selects = root.find('div.select');
			} else {
				selects = $('div.select');
			}

			selects.each(function(){
				var select = $(this).find('select');
				var i = $(this).find('div.option');

				var startText = select.find('option:selected').text();
				if(startText)
					i.text(startText);
				else
					i.text(select.children().eq(0).text());

				select.change(function(){
					i.text(select.find('option:selected').text());
				});
			});

		};

		return { init: init };
	})(jQuery)

    NumerInput = (function($){
        var init;

        init = function(){
            var inputs = $('.numberInput');

            if(inputs.size() == 0)
                return false;

            inputs.each(function(){
                var _this = $(this),
                    total = _this.find('.total'),
                    hidden = total.find('input'),
                    counter = total.find('span'),
                    controls = _this.find('.controls');

                controls.on('click','a', function(){
                    var _this = $(this),
                        tempCounter = parseInt(counter.text()),
                        direction = _this.attr('class');

                        if(direction == 'up')
                            tempCounter++;
                        else if(direction == 'down')
                            tempCounter--;

                        tempCounter = (tempCounter < 0) ? 0 : tempCounter; 
                        counter.text(tempCounter);                        
                        hidden.attr('value', tempCounter);
                    
                    return false;
                });

            });
        };

        return { init: init }
    })(jQuery);

    PeopleCounter = (function($){
        var init;

        init = function(){
            var root = $('div.peopleCounter'),
                inputs = root.find('.addPassangers').find('div.type'),
                confirmButton = root.find('div.confirm').find('a'),
                toggle = root.children('a.total'),
                buildTotalString;

            if(inputs.size() == 0)
                return false;

            inputs.each(function(){
                var _this = $(this),
                    hidden = _this.find('input'),
                    counter = _this.find('span'),
                    controls = _this.find('.controls');

                controls.on('click','a', function(){
                    var _this = $(this),
                        tempCounter = parseInt(counter.text()),
                        direction = _this.attr('class');

                        if(direction == 'up')
                            tempCounter++;
                        else if(direction == 'down')
                            tempCounter--;

                        tempCounter = (tempCounter < 0) ? 0 : tempCounter; 
                        counter.text(tempCounter);                        
                        hidden.attr('value', tempCounter);
                    
                    return false;
                });
            });

            buildTotalString = function(){
                var string = '',
                    tempArray = [];

                    inputs.each(function(){
                        var _this = $(this),
                            quantity = parseInt(_this.find('span').text());
                            label = _this.find('div.name').text();

                            if(quantity > 0)
                                tempArray.push(quantity + ' ' + label);
                    });

                if(tempArray.length == 0)
                    return 'Click to add';

                return tempArray.join(', ');
            };

            confirmButton.click(function(){
                root.removeClass('active');
                toggle.text(buildTotalString());

                return false;
            });

            toggle.click(function(){
                root.addClass('active');
                return false;
            });
        };

        return { init: init }
    })(jQuery);

    TripType = (function($){
        var init;

        init = function(){
            var root = $('#banner').find('div.whereWeFly'),
                types = root.find('.tripType'),
                tabs = root.find('.flightTypeTabs').children('.tab');

            types.on('click', 'input', function(){
                var value = this.value;

                if(value == 'multicity') {
                    root.addClass('multicity');
                    tabs.removeClass('active').eq(1).addClass('active')
                } else {
                    root.removeClass('multicity');
                    tabs.removeClass('active').eq(0).addClass('active')
                }

                console.log(value);
            });
        };

        return { init: init }
    })(jQuery);

    Services = (function($){
        var init;

        init = function(){
            var root = $('div.services');

            if(root.size() == 0)
                return false;

            root.each(function(){
                var services = root.children('.service');

                // toggle on/off service details on header click
                services.on('click', 'a.cover', function(){
                    $(this).closest('.service').toggleClass('active');
                    return false;
                });
            });

        };

        return { init: init }
    })(jQuery);

    ServiceToggle = (function(){
        var init;

        init = function(){
            var root = $('.serviceToggle');

            if(root.size() == 0)
                return false;

            root.each(function(){
                var _this = $(this),
                    statusCheckbox = _this.find('label.status').find('input'),
                    toggle = _this.find('.options').find('a'),
                    updateStatus;

                updateStatus = function(){
                    var value = this.checked;

                    if(value == true){
                        toggle.text('Remove');
                        _this.addClass('active');
                    } else {
                        toggle.text('Add');
                        _this.removeClass('active');
                    }
                };

                updateStatus.call(statusCheckbox.get(0));
                statusCheckbox.click(updateStatus);

            });
        };

        return { init: init }
    })(jQuery);

    Menu.init();
    PeopleCounter.init();
    TripType.init();
    PlaceHolder.init();
    Slider.init();
    RecentlySearched.init();
    Fares.init();
    NiceSelect.init();
    NumerInput.init();
    Services.init();
    ServiceToggle.init();

});


