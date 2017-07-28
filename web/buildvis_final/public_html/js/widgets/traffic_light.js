var interval = null;


function display_data() {
        
        interval = window.setInterval(function() {
                var red = (Math.floor(Math.random() * 2) == 0);
                var yellow = '#4D4D00';
                var green = '#003300';
                setColors(red, yellow, green);
        }, 5000);

}

// turn lights on/off
function setColors(red, yellow, green) {
	// first color value is 'on', second is 'off' (darker color)
	var red = red ? 'red' : '#4D0000';
//	var yellow = yellow ? 'yellow' : '#4D4D00';
//	var green = green ? 'green' : '#003300';

	// set the css
	$('span#red').css('background-color', red);
	$('span#yellow').css('background-color', yellow);
	$('span#green').css('background-color', green);
}

$(document).ready(function() {
	// fetch initial data and start the whole polling thing
        var yellow = '#4D4D00';
        var green = '#003300';
        var red =  '#003300';//fix
        setColors(red, yellow, green);
//        display_data();
});