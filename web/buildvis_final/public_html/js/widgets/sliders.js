
  $(function() {
      //document.getElementById("gl_canvas").style.display = "block";
    // setup light master control
    $( "#l_c_s_master" ).slider({
      value: 60,
      orientation: "horizontal",
      range: "min",
      animate: true
    });
    // setup light controls
    $( "#l_c_s_slider > span" ).each(function() {
      // read initial values from markup and remove that
      var value = parseInt( $( this ).text(), 10 );
      $( this ).empty().slider({
        value: value,
        range: "min",
        animate: true,
        orientation: "vertical"
      });
    });
//    // setup blind controls
//    $( "#b_c_s_slider > span" ).each(function() {
//      // read initial values from markup and remove that
//      var value = parseInt( $( this ).text(), 10 );
//      $( this ).empty().slider({
//        value: value,
//        range: "min",
//        animate: true,
//        orientation: "vertical"
//      });
//    });
  });

  $(function() {
    $( "#weight-slider-range" ).slider({
      range: "min",
      value: 5,
      min: 0,
      max: 100,
      slide: function( event, ui ) {
        $( "#rule_weight_text_div_id" ).text('%'+ui.value+' Energy Saving Required' );
      }
    });
//    $( "#rule_weight_text_div_id" ).text($( "#weight-slider-range" ).slider( 'value' ) );
  });
  
//  $(function() {
//    $( "#weight-slider-range" ).slider({
//      range: true,
//      min: 0,
//      max: 500,
//      values: [ 80, 300 ],
//      slide: function( event, ui ) {
//        $( "#rule_weight_text_div_id" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
//      }
//    });
//    $( "#rule_weight_text_div_id" ).val( "$" + $( "#weight-slider-range" ).slider( "values", 0 ) +
//      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
//  });