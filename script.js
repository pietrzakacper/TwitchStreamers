var streamers = ["ESL_SC2", "cretetion", "OgamingSC2", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamersOnline = [];
var streamersOffline = [];

function emplaceStreamer(data){
  if(data.stream == null){
    streamersOffline.push(data);
  } else {
    streamersOnline.push(data);
  }
}

function setStreamersInfo() {
  console.log(streamersOffline);
  streamersOnline.forEach(function(value, index) {
    $(".streamers-container").append('<div class="streamer-info active">'+value.stream.channel.display_name+'</div>');
  });

  streamersOffline.forEach(function(value, index) {
    $(".streamers-container").append('<div class="streamer-info">'+value._links.channel+'</div>');
  });
}

function getStreamsData() {
    streamers.forEach(function(value, index) {
        $.getJSON('https://api.twitch.tv/kraken/streams/'+value+'?callback=?', function(data) {
          emplaceStreamer(data);
            if(index==streamers.length-1)setStreamersInfo();
        });
});
}

  getStreamsData();
