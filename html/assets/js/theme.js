"use strict";


jQuery(document).ready(function ($) {

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
    
    //sticky header
    $(window).scroll(function () {
        var sticky = $('#cbx-header'),
            scroll = $(window).scrollTop();

        if (scroll >= 50) sticky.addClass('scrolled');
        else sticky.removeClass('scrolled');
    });
    //end sticky header

    // feedback slider
    $('#feedback-slider').owlCarousel({
        loop:true,
        margin:10,
        navText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
        nav:true,
        dots: false,
        autoplay: true,
        items:1,
    });

    // client slider
    $('#client-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots: false,
        autoplay: true,
        responsiveClass: true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:3,
            },
            1000:{
                items:5,
            }
        }
    });

    // google map
    var cbx_path = window.location.protocol + '//' + window.location.host;
    var pathArray = window.location.pathname.split( '/' );
    for (var i = 1; i < (pathArray.length - 1); i++) {
        cbx_path += '/';
        cbx_path += pathArray[i];
    }

    $('.cbxmapcanvas').each(function (index, element) {

        var $mapref = $(element);
        var maptitle = $mapref.data('title');
        var maplat = $mapref.data('lat');
        var maplng = $mapref.data('lng');
        var mapcontent = $mapref.data('content');

        var boxText = mapcontent;

        // Show google Maps
        $mapref.jqcbxgoglemap({
            mapOptions: {
                latitude: [maplat],
                longitude: [maplng],
                center: true,
                scrollwheel: false,
                zoom: 17,
                mapType: 'satellite', //google.maps.MapTypeId.ROADMAP
                icon: cbx_path + '/assets/img/map-icon.png',
                infoWindow: [{
                    title: maptitle,
                    content: boxText
                }]
            }
        });
    });

    //remove a widget on click of delete button
    $('.dashwidget').on('click', 'a.widget-removehandle', function (e) {
        e.preventDefault();

        var $this = $(this);
        $this.parents('.dashwidget').remove();

    });

    //remove a language wrapper on click of delete button
    $('.resume-summary').on('click', 'button.remove_language', function (e) {
        e.preventDefault();

        var $this = $(this);
        $this.parents('.languages_wrapper').remove();

    });

    //remove a expertise wrapper on click of delete button
    $('.resume-summary').on('click', 'button.remove_expertise', function (e) {
        e.preventDefault();

        var $this = $(this);
        $this.parents('.expertise_wrapper').remove();

    });

    //remove a educational_qualification wrapper on click of delete button
    $('.resume-summary').on('click', 'button.remove_educational_qualification', function (e) {
        e.preventDefault();

        var $this = $(this);
        $this.parents('.educational_qualification_wrapper').remove();

    });

    //remove a working_experience wrapper on click of delete button
    $('.resume-summary').on('click', 'button.remove_working_experience', function (e) {
        e.preventDefault();

        var $this = $(this);
        $this.parents('.working_experience_wrapper').remove();

    });

    //Start Contact Form Validation And Ajax Submission

    var $contactForm = $( 'form#cbx-contact-form' );

    $contactForm.validate({
        submitHandler: function(form) {
            var $contactForm = $(form);
            $.ajax({
                url: cbx_path + '/php/contact.php',
                type: 'post',
                data: $contactForm.serialize()+'&action=cbx_contact_us',
                beforeSubmit: function (argument) {
                    // body...
                },
                success: function (ajaxResponse) {
                    try {
                        var ajaxResponse = $.parseJSON(ajaxResponse);
                        if (ajaxResponse.error) {
                            //for field error
                            $.each(ajaxResponse.error_field, function(i) {
                                $('label#'+ajaxResponse.error_field[i]+'-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
                            });
                        } else if(ajaxResponse.successmessage) {

                            $('#cbx-formalert').addClass( "alert alert alert-success" ).html(ajaxResponse.successmessage);
                            $contactForm[0].reset();
                        }
                    } catch (e) {
                    }

                    $contactForm.reset();
                },
                error: function (argument) {
                    $contactForm.reset();
                }
            });

            return false;

        },

        rules: {
            'cbxname': {
                required: true
            },
            'cbxemail': {
                required: true
            },
            'cbxmessage': {
                required: true
            }
        }
    });

    //End Contact Form Validation And Ajax Submission

    //Email Subscription Validation And Ajax Submission

    var isEmail = function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };

    $('form#cbx-subscribe-form').on( 'submit', function (evnt) {
        evnt.preventDefault();

        var $form = $(this);
        var emailInput = $( 'form#cbx-subscribe-form' ).find( 'input#subscribe' );
        if (isEmail( emailInput.val() )) {

            $.ajax({
                url: cbx_path + '/php/subscribe.php',
                type: 'post',
                data: { 'email': emailInput.val().toLowerCase()},
                beforeSubmit: function (argument) {
                    // body...
                },
                success: function (ajaxResponse) {

                    console.log(ajaxResponse);
                    try {
                        var ajaxResponse = $.parseJSON(ajaxResponse);
                        if ( !ajaxResponse.error ) {
                            emailInput.css('color', '#0f0');
                        } else {
                            emailInput.removeAttr( 'style' ); //css('color', '#f00');
                            throw ajaxResponse.message;
                        }
                    } catch (e) {
                    }
                },
                error: function (argument) {
                    // body...
                }
            });
            $form[0].reset();
        } else {
            emailInput.css('color', '#f00');
            return false;
        }
    });

    $('form.subscribe-form input#subscribe').on('keyup', function (evnt) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        this.style.color = (isEmail( $(this).val() )) ? '#f5832b': '#f00';
    });

    //End Email Subscription Validation And Ajax Submission

    // working_experience_wrapper_template add
    var working_experience_wrapper_template = $('#working_experience_wrapper_template').html();
    Mustache.parse(working_experience_wrapper_template);

    var working_experience_count = 1;

    $('#working_experience_wrapper_btn').on('click',function () {
        working_experience_count++;
        var rendered = Mustache.render(working_experience_wrapper_template, {working_experience_count: working_experience_count});
        $('#working_experience_wrapper_target').append(rendered);
    });

    // educational_qualification_wrapper_template add
    var educational_qualification_wrapper_template = $('#educational_qualification_wrapper_template').html();
    Mustache.parse(educational_qualification_wrapper_template);

    var educational_count = 1;

    $('#educational_qualification_wrapper_btn').on('click',function () {
        educational_count++;
        var rendered = Mustache.render(educational_qualification_wrapper_template, {educational_count: educational_count});
        $('#educational_qualification_wrapper_target').append(rendered);
    });

    // expertise_wrapper_template add
    var expertise_wrapper_template = $('#expertise_wrapper_template').html();
    Mustache.parse(expertise_wrapper_template);

    var expertise_count = 1;

    $('#expertise_wrapper_btn').on('click',function () {
        expertise_count++;
        var rendered = Mustache.render(expertise_wrapper_template, {expertise_count: expertise_count});
        $('#expertise_wrapper_target').append(rendered);
    });

    // languages_wrapper_template add
    var languages_wrapper_template = $('#languages_wrapper_template').html();
    Mustache.parse(languages_wrapper_template);

    $('#languages_wrapper_btn').on('click',function () {
        var rendered = Mustache.render(languages_wrapper_template);
        $('#languages_wrapper_target').append(rendered);
    });

    //tapatar start
    $('input.tapatar').tapatar({
        sources: {
            
        }
    });
    //tapatar end

    // daterangepicker start
    $(".flatpickr-daterange").flatpickr({
        mode: "range"
    });
    // daterangepicker end

    //jquery editable
    //editable start
    var $editable = $('.editable');
    if( $editable.length > 0 ){
        $editable.editable({
            closeOnEnter : true,
            callback : function( data ) {
                // Callback that will be called once the editor is blurred
                if( data.content ) {
                    // Content has changed...
                }
                if( data.fontSize ) {
                    // the font size has changed
                }

                // data.$el gives you a reference to the element that was edited
                //data.$el.effect('blink');
            }

        });
    }
    //editable end

    // list-grid action
    var job_list_action = $('.job-list-action');
    var job_grid_action = $('.job-grid-action');
    job_list_action.on('click',function(e){
        e.preventDefault();
        job_grid_action.removeClass('active');
        $(this).addClass('active');
        $(document).find('.jobs-wrapper').each(function( index, element ){
            $(element).removeClass('grid_view');
        });
    });
    job_grid_action.on('click',function(e){
        e.preventDefault();
        job_list_action.removeClass('active');
        $(this).addClass('active');
        $(document).find('.jobs-wrapper').each(function( index, element ){
            $(element).addClass('grid_view');
        });
    });

    // bootstrap slider
    $("#filterByPrice").slider({});

});