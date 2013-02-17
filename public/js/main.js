$(document).ready(function() {
    window.app = new App();
    window.app.init();
});

var App = function() {
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
            sendCommand("stop");
        });
    }

    var keyDown = function(event) {
        sendCommand(keyMapping[event.keyCode]);
    }

    var keyUp = function(event) {
        sendCommand("stop");
    }

    var sendCommand = function(command) {
        if(lastCommand === "shoot" && command === "stop") {
            lastCommand = "";
            return;
        }
        lastCommand = command;
            $.ajax({
            url : '/perform_command/' + command,
            success : function(data)
            {

            }
        });
    }

    var removeCommand = function(command) {
        
    }


    return {
        init : init,
        keyDown : keyDown
    }
}