$(document).ready(function() {
    window.app = new App();
    window.app.init();
});

var App = function() {
    "use strict";
    var lastCommand;
    var commandArray = [];
    var keyMapping = {
        "37" : "left",
        "38" : "up",
        "39" : "right",
        "40" : "down",
        "32" : "shoot"
    }
    
    var init = function() {
        $(window).keydown(keyDown);
        $(window).keyup(keyUp);
        $("#buttons a").mousedown(function() {
            sendCommand($(this).data("command"));
        });
         $("#buttons a").mouseup(function() {
            removeCommand($(this).data("command"));
        });
    }

    var keyDown = function(event) {
        sendCommand(keyMapping[event.keyCode]);
    }

    var keyUp = function(event) {
        removeCommand(keyMapping[event.keyCode]);
    }

    var sendCommand = function(command) {
        if($.inArray("stop", commandArray) > -1) {
            commandArray = [];
        }

        if($.inArray(command, commandArray) == -1) {
            commandArray.push(command); 
        }

        console.log(commandArray.length);

        sendCommandArray(commandArray);
        
    }

    var sendCommandArray = function(commandArrayToSend) {
        $.ajax({
        url : '/perform_command/' + commandArrayToSend,
        success : function(data)
            {

            }
        });   
    }

    var removeCommand = function(command) {
        $.each(commandArray, function(index, item) {
            if(item === command || item == "") {
                commandArray.splice(index, 1);
            }
        });
        if(commandArray.length == 0) {
            commandArray = ["stop"];
        }
        sendCommandArray(commandArray);
    }


    return {
        init : init,
        keyDown : keyDown
    }
}