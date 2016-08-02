var streamers = ["ESL_SC2", "cretetion", "OgamingSC2", "freecodecamp", "brunofin", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamersOfflineName = [];
var streamersOnline = [];
var streamersOffline = [];


getStreamsData(); // ON LOAD


// --- BEGIN OF BINDINGS --- //
$("#all").on("click", displayAll);

$("#online").on("click", displayOnline);

$("#offline").on("click", displayOffline);
// --- END OF BINDINGS --- //

// --- BEGIN OF DEFINITIONS --- //
function getStreamsData() {
    streamers.forEach(function(value, index) {
        $.getJSON('https://api.twitch.tv/kraken/streams/' + value + '?callback=?', function(data) {
            emplaceStreamer(data, index);
            if (index == streamers.length - 1) displayAll(); //if all responds have been received
        });
    });
}

function emplaceStreamer(data, index) {
    if (data.hasOwnProperty("error")) {
        showNotification(streamers[index]);
        return;
    }
    if (data.stream == null) {
        streamersOffline.push(data);
        streamersOfflineName.push(streamers[index]);
    } else {
        streamersOnline.push(data);
    }
}

function displayAll() {
    displayOnline();
    displayOffline(false);
}

function displayOnline(only = true) {
    var $container = $(".streamers-container");
    if (only) {
        $container.empty();
    }
    streamersOnline.forEach(function(value, index) {
        $container.append('<a href="https://www.twitch.tv/' + value.stream.channel.display_name + '" target="_blank" >' + '<div class="streamer-info active row text-center">' + '<div class="col-md-2">' + value.stream.channel.display_name + '</div>' + '<div class="col-md-8">' + '<span class="stream-name">' + value.stream.game + '</span>' + '</div>' + '<div class="col-md-2">' + '<span class="online-text">ONLINE!</span>' + '</div>' + '</div>' + '</a>');
    });
}

function displayOffline(only = true) {
    var $container = $(".streamers-container");
    if (only) {
        $container.empty();
    }
    streamersOffline.forEach(function(value, index) {
        $container.append('<a href="https://www.twitch.tv/' + streamersOfflineName[index] + '" target="_blank" >' + '<div class="streamer-info not-active row text-center">' + '<div class="col-md-2">' + streamersOfflineName[index] + '</div>' + '<div class="col-md-2 col-md-offset-8">' + '<span class="offline-text">OFFLINE</span>' + '</div>' + '</div>' + '</a>');
    });
}

function showNotification(name) {
    $.notify({
        title: '<strong>Warning!&nbsp</strong>',
        message: "Channel: \"" + name + "\" does not exist!"
    }, {
        type: 'warning'
    });
}

// --- END OF DEFINITIONS --- //
