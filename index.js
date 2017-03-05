var http = require('http');
var Alexa = require('alexa-sdk');
const cuisineList = [
    'Asian',
    'Mediterranean',
    'Mexican',
    'Vegetarian',
    'Indian',
    'Sandwiches',
    'BBQ',
    'Burgers'
];

const totalValidFoodTrucks = ['Falafel Salam', 'Now Make Me A Sandwich', 'Woodshop BBQ', 'Bread And Circuses', 'Caravan Crepes', "Dante's Inferno Dogs", 'Off The Rez', "Chick'n Fix", "It's Bao Time", 'BeezNeez Gourmet Sausages', 'I Love My GFF', "Delfino's Chicago Pizza", 'Bomba Fusion', 'NOSH', 'The Box On Wheels', 'Grilled Cheese Experience', 'Main Street Gyros', 'Where Ya At Matt?', 'Hungry Me', 'Taqueria Los Chilangos', 'Wicked Good Grinders', 'Anchor End Pretzel Shoppe', 'Skillet Street Food', 'Mesob At The Curb', "Sam Choy's Poke To The Max", 'Xplosive', 'Seattle Chicken Over Rice', 'Buddha Bruddah', "Tat's Truck", 'KC Deez BBQ', 'Yumbit', 'Snout and Co', 'Munch Boss', 'Cheese Wizards', 'Seattle Biscuit Company', 'NaanSense', 'Peasant Food Manifesto', 'Papa Bois', "Athena's"];

var FoodTruckLists = {
    "asianFoodTruckList": ["Chick'n Fix", "Munch Boss", "It's Bao Time", "Peasant Food Manifesto", "Bomba Fusion", "Xplosive", "The Box On Wheels", "Hungry Me", "Yumbit", "Buddha Bruddah"],
    "mediterraneanFoodTruckList": ["Athena's", "Peasant Food Manifesto", "Falafel Salam", "Seattle Chicken Over Rice", "I Love My GFF", "Main Street Gyros"],
    "mexicanFoodTruckList": ["Bomba Fusion", "Taqueria Los Chilangos"],
    "vegetarianFoodTruckList": ["NaanSense", "I Love My GFF", "Snout and Co", "Caravan Crepes", "Bread And Circuses", "Mesob At The Curb", "Cheese Wizards", "Anchor End Pretzel Shoppe", "Athena's", "Wicked Good Grinders", "Xplosive", "BeezNeez Gourmet Sausages", "Sam Choy's Poke To The Max", "Main Street Gyros", "The Box On Wheels", "Delfino's Chicago Pizza", "Falafel Salam", "Papa Bois", "Peasant Food Manifesto"],
    "indianFoodTruckList": ["NaanSense"],
    "sandwichesFoodTruckList": ["Tat's Truck", "Grilled Cheese Experience", "Cheese Wizards", "Anchor End Pretzel Shoppe", "Wicked Good Grinders", "Seattle Biscuit Company", "Where Ya At Matt?", "Xplosive", "Skillet Street Food", "KC Deez BBQ", "Peasant Food Manifesto", "Papa Bois", "NOSH", "Now Make Me A Sandwich", "Athena's"],
    "bbqFoodTruckList": ["Woodshop BBQ", "Snout and Co", "KC Deez BBQ"],
    "burgersFoodTruckList": ["Skillet Street Food", "Dante's Inferno Dogs", "Off The Rez", "Bread And Circuses"]
};

const cannotFindLocation = 'Sorry, we cannot find the food truck current location based on seattle food truck dot com. Please chose another one';

const welcomeMesssage = "Yo Yo Yo, you hungry? Let's find a food truck for you. ";
const repromt_weclomeMessage = "You can ask for cuisine list, food truck list of a particular cuisine, or location of a particular food truck";
const goodbyeMessage = "Good appetite!";
const helpMessage = "Sorry, I didn't get what you say. Can you rephase it?";

const Repromt_getCuisine = "You can ask me to repeat the cuisine list or choose a cuisine you like, I will give you a list of food trucks fit your taste.";


var states = {
    TRUCKLOCATIONMODE: '_TRUCKLOCATIONMODE',
    CUISINESMODE: '_CUISINESMODE',
    TRUCKLISTMODE: '_TRUCKLISTMODE',
};
var startingStateHandlers = {
    'LaunchRequest': function () {
        // console.log("get into 'LaunchRequest'");
        output = welcomeMesssage + repromt_weclomeMessage;
        this.emit(':ask', output, repromt_weclomeMessage);
    },
    'getCuisinesIntent': function() {
        // console.log("get into 'getCuisinesIntent'");
        var cuisineListToString = cuisineList.toString();
        var styleNumber = cuisineList.length;
        var getCuisinesResPre = "There are " + styleNumber.toString() + " different food categories: "
        var output = getCuisinesResPre + cuisineListToString;
        var cardTitle = "Cuisine";
        var cardContent = cuisineListToString;

        // change state for special RepeatIntent
        this.handler.state = states.CUISINESMODE;
        this.emit(':askWithCard', output, Repromt_getCuisine, cardTitle, cardContent);
    },
    'getTrucksListOfSameCuisineIntent': function() {

        var cuisineSlot = this.event.request.intent.slots.cuisine.value;
        var cuisineCustomerPicked = cuisineSlot.toString().toLowerCase() + "FoodTruckList";
        //console.log(cuisineCustomerPicked);
        var targetFoodTruckList = FoodTruckLists[cuisineCustomerPicked];

        var repromt_getTruckList;
        var output;
        var outputResult;
        if (targetFoodTruckList.length < 3) {
            outputResult = targetFoodTruckList.toString();
            this.attributes['numberOfFoodTrucksHasGiven'] = targetFoodTruckList.length;
            repromt_getTruckList = "You can pick a food truck or get other cuisine food truck lists.";

            if (targetFoodTruckList.length===1){
                output = "There is only " + targetFoodTruckList.length.toString() + " food truck gave us the valid address information. It called: " + outputResult;
            }
            else{
                output = "There are only " + targetFoodTruckList.length.toString() + " food trucks gave us the valid address information. There are: " + outputResult;
            }
        } else {
            outputResult = targetFoodTruckList.slice(0, 3).toString();
            this.attributes['numberOfFoodTrucksHasGiven'] = 3; // to track how many food trucks that has already been told to customer
            output = "Food Trucks fit your taste are: " + outputResult;
            repromt_getTruckList = "You can get more food truck list by saying:'Give me more food trucks info', or find out a food truck location by saying:'Where is your chonse food truck?'";
        }

        var cardTitle = "Food Truck Names";
        var cardContent = outputResult;
        this.attributes['cuisineCustomerPicked'] = cuisineCustomerPicked;
        this.attributes['repeatFoodTruckList'] = outputResult;
        this.handler.state = states.TRUCKLISTMODE;
        this.emit(':askWithCard', output, repromt_getTruckList, cardTitle, cardContent);

    },
    'getTruckLocationIntent': function() {
        //get food truck name
        var foodTruckName = this.event.request.intent.slots.foodTruckName.value;
        getWebsiteInString(foodTruckName, function(htmlPage) {
            // get location use regex directly
            var regex_location = /class="simcal-event-address simcal-event-start-location" itemprop="location" itemscope itemtype="http:\/\/schema\.org\/Place">(.+)<\/span><\/em><\/p>/g;
            var locationInfo = regex_location.exec(htmlPage);

            // get date info, so that it can match with "today"
            var regex_date = /<span class="simcal-date-format" data-date-format="d">([0-9]+)<\/span>/;
            var timeInfo = regex_date.exec(htmlPage);
            var foodTruckDate = parseInt(timeInfo);
            var today = new Date();
            var todayDate = today.getDate();
            var output;
            var repromt_output;
            ////// test "today" = timeInfo. Also timeInfo's formate is :"02". it's a string.
            if (locationInfo && (todayDate === foodTruckDate)) {
                output = "The location for " + foodTruckName + " is \n" + locationInfo;
                repromt_output = "The address also shows on your phone's Alexa app";
                var cardTitle = foodTruckName + " Location";
                var cardContent = locationInfo;

                this.attributes['foodTruckName'] = foodTruckName;
                this.attributes['forLocationRepeat'] = locationInfo;
                this.handler.state = states.TRUCKLOCATIONMODE;
                this.emit(':askWithCard', output, repromt_output, cardTitle, cardContent);
            } else {
                output = cannotFindLocation;
                repromt_output = 'You can pick another food truck.';

                this.attributes['foodTruckName'] = "nothing";
                this.attributes['forLocationRepeat'] = "nothing";
                this.handler.state = states.TRUCKLOCATIONMODE;
                this.emit(':ask', output, repromt_output);
            }
        });
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.emit(':ask', helpMessage, helpMessage);
    },
};

var cuisinesHandlers = Alexa.CreateStateHandler(states.CUISINESMODE, {
    'getCuisinesIntent': function() {
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },
    'getTrucksListOfSameCuisineIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },
    'getTruckLocationIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },
    'AMAZON.RepeatIntent': function() {
        this.emit('getCuisinesIntent');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", "OK, you can pick cuisine, and I will give you a list of food trucks. For example: you can say: 'I want to eat Chinese' or 'find food trucks which cook Indian'");
    },
    'SessionEndedRequest': function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.emit('Unhandled');
    },
});

var truckListHandlers = Alexa.CreateStateHandler(states.TRUCKLISTMODE, {
    'getCuisinesIntent': function() {
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },

    'getTrucksListOfSameCuisineIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },

    'getMoreFoodTrucksIntent': function() {

        var cuisineCustomerPicked = this.attributes['cuisineCustomerPicked'];
        var targetFoodTruckList = FoodTruckLists[cuisineCustomerPicked];
        var start = this.attributes['numberOfFoodTrucksHasGiven'];
        var output;
        var repromt_output;
        var end;
        // figure where to start and end for "more info"
        if (start >= targetFoodTruckList.length) {
            output = "That's all the food trucks with valid location info. Do you want to pick a food truck?";
            repromt_output = "You can got the food truck location by saying:' where is your chosen food truck?'";
            this.emit(":ask", output, repromt_output);
        } else if ((start + 5) > targetFoodTruckList.length) {
            end = targetFoodTruckList.length;
            this.attributes['numberOfFoodTrucksHasGiven'] = end;
        } else {
            end = start + 5;
            this.attributes['numberOfFoodTrucksHasGiven'] = end;
        }

        var outputResult = targetFoodTruckList.slice(start, end).toString();
        output = "Here are more food trucks : " + outputResult;
        this.attributes['repeatFoodTruckList'] = outputResult;
        var repromt = "You can ask for more truck info or chose a food truck you want to go eat today";
        this.emit(':ask', output, repromt);
    },

    'getTruckLocationIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },

    'AMAZON.RepeatIntent': function() {
        var outputResult = this.attributes['repeatFoodTruckList'];
        this.emit(':ask', outputResult, "You can ask for more truck info or ask for the location of a food truck you want to eat today.");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.emit('Unhandled');
    }
});

var truckLocationHandlers = Alexa.CreateStateHandler(states.TRUCKLOCATIONMODE, {
    'getCuisinesIntent': function() {
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },
    'getTrucksListOfSameCuisineIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },
    'getTruckLocationIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },
    'AMAZON.RepeatIntent': function() {
        if (this.attributes['forLocationRepeat']) {
            var output = this.attributes['forLocationRepeat'];
            var repromt_output = "The address also shows on your phone's Alexa app";
            var cardTitle = this.attributes['foodTruckName'];
            var cardContent = this.attributes['forLocationRepeat'];
            this.emit(':ask', output, repromt_output, cardTitle, cardContent);
        } else {
            var output = "sorry, we cannot find the current location for the given food truck.";
            var repromt_output = "Come on, don't play with me. Pick another one.";
            this.emit(':ask', output, repromt_output);
        }
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.emit('Unhandled');
    },
});


function getWebsiteInString(foodTruckName, eventCallback) {
    var corrected_foodTruckName = foodTruckName.replace(/\'/g, "").toLowerCase().replace(/ /g, '-');
    var url = 'http://www.seattlefoodtruck.com/food-trucks/' + corrected_foodTruckName;
    //console.log(url)
    http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            eventCallback(body);
        });

    }).on('error', function(e) {
        console.log("Got error: ", e);
        console.log("Food Truck Name: " + foodTruckName);
    });
}

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(truckLocationHandlers, truckListHandlers, cuisinesHandlers, startingStateHandlers);
    alexa.execute();
};


// for future if need to add "tomorrow"
// do{
//   test = re.exec(stringResult);
//   if (test) {
//     console.log(test[1]);
//   }
//   else{
//     console.log(url)
//     console.log("nothing")
//   }
// } while (test);
