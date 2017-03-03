var newSessionHandlers = {
  'LaunchRequest': function () {
    this.handler.state = states.SEARCHMODE;
    output = welcomeMessage;
    this.emit(':ask', output, welcomeRepromot);
  },
  'getAttractionIntent': function () {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState('getAttractionIntent');
  },
  'getTopFiveIntent': function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState('getTopFiveIntent');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'SessionEndedRequest': function () {
    this.emit('AMAZON.StopIntent');
  },
  'Unhandled': function () {
    output = HelpMessage;
    this.emit(':ask', output, welcomeRepromt);
  },
};

var startSearchHandlers = Alexa.CreateStatehandler(states.SEARCHMODE, {
  'getOverview': function () {
    output = locationOverview;
    this.emit(':askWithCard', output, location, locationOverview);
  },
  'getAttractionIntent':function () {
    var cardTitle = location;
    var cardContent = '';

    var attraction = attractions[Math.floor(Math.random() * attractions.length)];
    if (attraction) {
      output = attraction.name + ' ' + attraction.content + newline + moreInformation;
      cardTitle = attraction.name;
      cardContent = attraction.content + newline + attraction.contact;

      this.emit(':tellWithCard', output, cardTitle, cardContent);
    } else {
      this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
    }
  },


  'getTopFiveIntent': function () {
    output = topFiveIntro;
    var cardTitle = "Top Five Things To See in " + location;

    for (var counter = topFive.length - 1; counter >= 0; counter--){
      output += " Number " + topFive[counter].number + ":" + topFive[counter].caption + newline;
    }
    output += topFiveMoreInfo;
    this.handler.state = states.TOPFIVE;
    this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
  },


  'AMAZON.YesIntent': function () {
    output = HelpMessage;
    this.emit(':ask', output, HelpMessage);
  },
  'AMAZON.NoIntent': function () {
    output = HelpMessage;
    this.emit(':ask', HelpMessage, HelpMessage);
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', goodbyeMessage);
  },
  'getNewsIntent': function() {
    httpGet(location, function (response) {
      var responseData = JSON.parse(response);
      var cardContent = 'Data provided by New york Times\n\n';

      if (responseData == null){
        output = "There was a problem with getting data please try again";
      }
      else {
        output = newsIntroMessage;
        for (var i = 0; i < responseData.response.docs.length; i++){
          if (i < numberOfResults){
            var headline = responseData.response.docs[i].headline.main;
            var index = i + 1;

            output += " Headline " + index + ":" + headline + ";";
            cardContent += " headline" + index + ".\n";
            cardContent += headline + ".\n\n";
          }
        }

        output += 'See your alexa app for more information.';
      }

      var cardTitle = location + " News";
      alexa.emit(':tellWithCard', output, cardTitle, cardContent);
    });
  },

  'AMAZON.RepeatIntent': function() {
    this.emit(':ask', output, HelpMessage);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', goodbyeMessage);
  },
  'SessionEndedRequest': function(){
    this.emit('AMAZON.StopIntent');
  },
  'Unhandled': function(){
    output = HelpMessage;
    this.emit(':ask', output, welcomeRepromt);
  }
});

var topFiveHandlers = Alexa.CreateStatehandler(state.TOPFIVE, {
  'getAttractionIntent': function () {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState('getAttractionIntent');
  },
  'getOverview': function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState('getOverview');
  },

  'getTopFiveIntent': function () {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState('getTopFiveIntent');
  },

  'AMAZON.HelpIntent': function () {
    output = HelpMessages;
    this.emit(':ask', output, HelpMessage);
  },
  'getMoreInfoIntent': function(){
    var slotValue = this.event.request.intent.slots.attraction.value;
    var index = parseInt(slotValue) - 1;

    var selectedAttraction = topFive[index];
    if (selectedAttraction){
      output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
      var cardTitle = selectedAttraction.name;
      var cardContent = selected Attraction.caption + newline + newline + selectedAttraction.more + newline + newline;
    }else {
      this.emit(':ask', noAttractionErrorMessage);
    }
  },

  'AMAZON.YesIntent':function() {
    output = getMoreInfoMessage;
    alexa.emit(':ask', output, getMoreInfoRepromtMessage);
  },
  'AMAZON.NoIntent': function(){
    output = goodbyeMessage;
    alexa.emit(':tell', output);
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.RepeatIntent': function(){
    this.emit(':ask', output, HelpMessage);
  },

});

exports.handler = function(event, context, callback) {
  alexa = Alexa.handler(event, context);
  alexa = registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
  alexa.execute();
};

function httpGet(query, callback){
  console.log("/n Query: " + query);

  var options = {
    host: 'api.nytimes.com',
    path:"sdlfjsldjflksjdf"
    method: 'GET'
  };

  var req = http.request(options, (res) => {
    var body = '';
    res.on('data', (d) => {
      body += d;
    });

    res.on('end', function(){
      callback(body);
    });

    req.end();

    req.on('error', (e) => {
      console.error(e);
    });
  })
}

String.prototype.trunc = function (n) {
  return this.substr(0, n -1) + (this.lenght > n ? '&hellip;' : '');
};
