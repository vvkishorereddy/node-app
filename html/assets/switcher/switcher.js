/**
 * Created by fast user on 2/12/2015.
 */

jQuery(function($) {
  var switcherHtml = [];
  var colorName = [
    "default",
    "red",
    "orange",
    "blue",
    "olive",
    "violet",
    "pink",
    "navy"
  ];

  switcherHtml.push('<div class="cbx-switcher-area">');
  switcherHtml.push('<div class="cbx-switcher-inner">');
  switcherHtml.push(
    '<a id="cbx-switcher-btn" class="cbx-switcher-btn" href="#"><span class="fa fa-cog fa-spin" aria-hidden="true"></span></a>'
  );
  switcherHtml.push(
    '<div id="cbx-switcher-body" class="cbx-switcher-body cbx-hide">'
  );
  switcherHtml.push(
    '<span class="cbx-switcher-text text-center" > Style Switcher</span>'
  );
  switcherHtml.push('<ul class="list-unstyled clearfix cbx-switcher-list">');

  $.each(colorName, function(index, value) {
    switcherHtml.push(
      '<li class="cbx-list-' +
        value +
        '"><a href="#"  class="cbx-switcher-clr-btn" data-color-name="-' +
        value +
        '"></a></li>'
    );
  });
  switcherHtml.push("</ul>");
  switcherHtml.push('<p class="cbx-switcher-text" > Demo Switcher</p>');
  switcherHtml.push('<select id="layoutswitch" class="form-control">');
  switcherHtml.push('<option value="index.html">Style1</option>');
  switcherHtml.push('<option value="index-two.html">Style2</option>');
  switcherHtml.push("</select>");
  switcherHtml.push("</div></div></div>");

  //<link rel="stylesheet" class="cbx-theme-style" href="css/style.css" media="all" />

  $.fn.SwitcherLoader = function() {
    var $this = $(this);
    $this.html(switcherHtml.join(""));

    var $styleLinker = $("#cbx-style"); // stylesheet id
    var $styleLayout = parseInt($styleLinker.data("layout"));

    switch ($styleLayout) {
      case 2:
        $("#layoutswitch").val("index-two.html");
        break;
      default:
        $("#layoutswitch").val("index.html");
    }

    /*LZ Switcher */

    var showSwitcher = true;
    $this.find("#cbx-switcher-btn").on("click", function(evt) {
      evt.preventDefault();

      //$("#lz-switcher-body").show("slide", { direction: "right" }, 1000); //toggleClass('lz-clicked');

      if (showSwitcher) {
        $("#cbx-switcher-body").animate(
          {
            right: 0
          },
          500
        );
        showSwitcher = !showSwitcher;
      } else {
        $("#cbx-switcher-body").animate(
          {
            right: -280
          },
          500
        );
        showSwitcher = !showSwitcher;
      }

      /* $( '.theme-chooser').on( 'change', function() {
                window.location = $( this).val();
            } );*/
    });

    //lz-theme-style
    $("a.cbx-switcher-clr-btn").on("click", function(e) {
      e.preventDefault();

      var $this = $(this);

      //console.log('switcher/color/' + $this.data( 'color-name' ) + '.css' );

      var styleLinker = $("#cbx-style"); // stylesheet id
      //console.log(styleLinker);
      styleLinker.attr(
        "href",
        "assets/css/style" + $this.data("color-name") + ".min.css"
      );
    });

    /*LZ Switcher  */
  };
});

//initialize the switcher
jQuery(document).ready(function($) {
  //add the switcher holder div

  $(document.body).append('<div class="switcher-loader"></div>');

  //Load Style Switcher
  if ($(".switcher-loader").length) {
    $(".switcher-loader").SwitcherLoader();
  }

  $("#layoutswitch").on("change", function(e) {
    e.preventDefault();

    var $layout = $(this).val();
    window.location = $layout;
  });
});
