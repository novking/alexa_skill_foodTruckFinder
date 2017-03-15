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

// const totalValidFoodTrucks = ['Falafel Salam', 'Now Make Me A Sandwich', 'Woodshop BBQ', 'Bread And Circuses', 'Caravan Crepes', "Dante's Inferno Dogs", 'Off The Rez', "Chick'n Fix", "It's Bao Time", 'BeezNeez Gourmet Sausages', 'I Love My GFF', "Delfino's Chicago Pizza", 'Bomba Fusion', 'NOSH', 'The Box On Wheels', 'Grilled Cheese Experience', 'Main Street Gyros', 'Where Ya At Matt?', 'Hungry Me', 'Taqueria Los Chilangos', 'Wicked Good Grinders', 'Anchor End Pretzel Shoppe', 'Skillet Street Food', 'Mesob At The Curb', "Sam Choy's Poke To The Max", 'Xplosive', 'Seattle Chicken Over Rice', 'Buddha Bruddah', "Tat's Truck", 'KC Deez BBQ', 'Yumbit', 'Snout and Co', 'Munch Boss', 'Cheese Wizards', 'Seattle Biscuit Company', 'NaanSense', 'Peasant Food Manifesto', 'Papa Bois', "Athena's"];

var totalValidFoodTrucks = [
  "hometown dogs",
"veg-wich",
"spice on curve",
"el cabrito oaxaca",
"djung on wheels",
"deen's banh mi",
"now make me a sandwich",
"caravan crepes",
"street treats",
"neema's comfort food",
"delfino's chicago pizza",
"wet buns",
"tat's truck",
"holo holo food truck",
"off the rez",
"made in taiwan",
"nibbles food truck",
"balleywood creamery",
"napkin friends",
"it's bao time",
"my chef lynn",
"the caveman food truck â closed",
"curb jumper street eats",
"hallava falafel",
"carmelito's",
"p&j's waffle delight",
"plum burgers",
"candy butcher hot dogs",
"seattle chicken over rice",
"chebogz filipino food truck",
"yumbit",
"roll ok please",
"kabob n' kabob",
"lumpia world",
"pop-up bike pops",
"athena's",
"miniâ¦the dough-nut",
"hot revolution donuts",
"igloo rolls",
"gourmini's",
"maximus minimus",
"galaxy donuts",
"mo pockets",
"cauldron",
"seattle mamak",
"bumbu truck",
"das brat wagen",
"fish basket",
"tuscan stone wood fired pizza",
"spicy papaya food truck",
"thai-u-up",
"i love my gff",
"the peach and the pig",
"bomba fusion",
"wicked pies",
"the box on wheels",
"yummy box food truck",
"kaosamai thai food truck",
"anchor end pretzel shoppe",
"raney brothers bbq",
"jessica's unique bite",
"street donuts",
"stacks burgers",
"chicago west",
"express mexican grill",
"picnic",
"munch boss",
"chopstix",
"cheese wizards",
"mobile mavens: gai box",
"garden sushi",
"the roll pod",
"tabassum",
"big boy's filipino food truck",
"campfire bbq",
"verita's coffee company",
"the people's burger",
"fire dog pizza company",
"tacos la flaca",
"gobble express",
"taco time",
"pompeii wood fired pizza",
"macho burgers",
"streetzeria autopompa",
"jemil's big easy",
"hb beverage company",
"kc deez bbq",
"sam choy's poke to the max",
"where ya at matt?",
"hungry me",
"moonie icy tunes",
"wicked good grinders",
"the vet chef",
"skillet street food",
"314 pie",
"don lucho's",
"tummy yummy thai",
"lil j's superdawgs",
"buddha bruddah",
"grilled cheese experience",
"burgerphenia",
"big house bbq",
"main street gyros",
"big dog's",
"peasant food manifesto",
"ezell's chicken express",
"a fire inside wood fired pizza",
"falafel salam",
"dirty dog hot dog",
"gogi on the go",
"woodshop bbq",
"buns on wheels",
"word of mouth",
"bread and circuses",
"el camion",
"crisp creperie",
"seattle biscuit company",
"stella fiore pizza",
"ben & jerry's food truck",
"my sweet lil cakes",
"beezneez gourmet sausages",
"mangia me",
"lula salads",
"nosh",
"mobile mavens: lil' blu mobile bar",
"dogfather catering",
"dante's inferno dogs",
"seoul kitchen",
"taqueria los chilangos",
"the mobile mayan",
"marination mobile",
"papa bois",
"the ultimate melt",
"people of the chubbs",
"kiss my grits",
"chick'n fix",
"tacos el tajin",
"xplosive",
"mobile mavens: biscuit box",
"the seattle barkery",
"chewaya moroccan bbq",
"snout and co",
"delicatessen montanti",
"naansense",
"fruit chatter box",
"beanfish",
"kebab bros",
"charlie's bun's n' stuff",
"budha bear bagels",
"seattle cookie counter",
"mesob at the curb",]

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

const cannotFindLocation = 'Sorry, we cannot find the food truck location because the food truck doesn\'t provide their location online right now. Please chose another one';

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
        //console.log(this.handler.state);

        // console.log("get into 'getCuisinesIntent'");
        var cuisineListToString = cuisineList.toString();
        var styleNumber = cuisineList.length;
        var getCuisinesResPre = "There are " + styleNumber.toString() + " different food categories: ";
        var just_for_certification = " You can chose from one cuisine from the list."
        var output = getCuisinesResPre + cuisineListToString + just_for_certification;
        var cardTitle = "Cuisine";
        var cardContent = cuisineListToString;

        // change state for special RepeatIntent
        this.handler.state = states.CUISINESMODE;
        this.emit(':askWithCard', output, Repromt_getCuisine, cardTitle, cardContent);
    },
    'getTrucksListOfSameCuisineIntent': function() {
        //console.log(this.handler.state);

        var cuisineSlot = this.event.request.intent.slots.cuisine.value;
        if (cuisineSlot == undefined){
            this.emit(":ask", "please provide a cuisine style you like", "please provide a cuisine style, such as: give me a list of Indian food trucks");
        }
        var cuisineCustomerPicked = cuisineSlot.toString().toLowerCase() + "FoodTruckList";
        //console.log(cuisineCustomerPicked);
        if(FoodTruckLists[cuisineCustomerPicked]){
            var targetFoodTruckList = FoodTruckLists[cuisineCustomerPicked];

            var repromt_getTruckList;
            var output;
            var outputResult;
            if (targetFoodTruckList.length < 3) {
                outputResult = targetFoodTruckList.toString();
                this.attributes['numberOfFoodTrucksHasGiven'] = targetFoodTruckList.length;
                repromt_getTruckList = "You can pick a food truck or get other cuisine food truck lists.";

                if (targetFoodTruckList.length===1){
                    output = "There is only " + targetFoodTruckList.length.toString() + " food truck gave us the valid address information. It called: " + outputResult + " Do you want to know the location of the food truck?";
                }
                else{
                    output = "There are only " + targetFoodTruckList.length.toString() + " food trucks gave us the valid address information. There are: " + outputResult + " Do you want to know the location of the food truck?";
                }
            } else {
                outputResult = targetFoodTruckList.slice(0, 3).toString();
                this.attributes['numberOfFoodTrucksHasGiven'] = 3; // to track how many food trucks that has already been told to customer
                output = "Food Trucks fit your taste are: " + outputResult + " Do you want to know the location of one of the food trucks? or you can say 'more' to get more food trucks choices";
                repromt_getTruckList = "You can get more food truck list by saying:'Give me more food trucks info', or find out a food truck location by saying:'Where is your chonse food truck?'";
            }

            var cardTitle = "Food Truck Names";
            var cardContent = outputResult;
            this.attributes['cuisineCustomerPicked'] = cuisineCustomerPicked;
            this.attributes['repeatFoodTruckList'] = outputResult;
            this.handler.state = states.TRUCKLISTMODE;
            this.emit(':askWithCard', output, repromt_getTruckList, cardTitle, cardContent);

        } else{
            this.emit(":ask", "sorry, i don't get what you are trying to ask", "you can pick a cuisine, such as indian, asian, Vegetarian.");
        }
    },
    'getTruckLocationIntent': function() {

        //get food truck name
        var foodTruckName = this.event.request.intent.slots.foodTruckName.value;
        if (foodTruckName == undefined){
            this.emit(":ask", 'pleas pick a food truck name', "for example, you can ask where is it's bao time?");
        }
        foodTruckName = foodTruckName.toLowerCase();
        console.log("this is the input food truck name (raw): ", foodTruckName);

        var test_result = totalValidFoodTrucks.indexOf(foodTruckName);
        console.log("this is the result: ", test_result);

        // var rawDate = this.event.request.intent.slots.date.value;
        // var date = new Date(Date.parse(rawDate));
        if (totalValidFoodTrucks.indexOf(foodTruckName) >= 0){
            console.log("food truck name");
            console.log(foodTruckName);

            var today = new Date();
            customerDate = today.getDate();

            getWebsiteInString(foodTruckName , (htmlPage) => {
                // get location use regex directly
                var regex_location = /class="simcal-event-address simcal-event-start-location" itemprop="location" itemscope itemtype="http:\/\/schema\.org\/Place">(.+)<\/span><\/em><\/p>/g;
                var output;
                var repromt_output;


                ////// test "today" = timeInfo. Also timeInfo's formate is :"02". it's a string.
                var locationInfo;
                // var timeInfo_dd;
                // var timeInfo_mm;
                // var timeInfo_yy;
                var foodTruckDate;


                locationInfo = regex_location.exec(htmlPage);
                // timeInfo_dd = regex_date_dd.exec(htmlPage);
                // timeInfo_mm = regex_date_mm.exec(htmlPage);
                // timeInfo_yy = regex_date_yy.exec(htmlPage);

                console.log("location info: " + locationInfo);
                console.log("customer date: " + customerDate);
                console.log("food truck date: " + foodTruckDate);

                if(locationInfo){
                    // foodTruckDate_dd = parseInt(timeInfo_dd[1]);
                    // foodTruckDate_mm = parseInt(timeInfo_mm[1]);
                    // foodTruckDate_yy = parseInt(timeInfo_yy[1]);
                    //
                    // var output_date = new Date(foodTruckDate_yy, foodTruckDate_mm, foodTruckDate_dd);

                    //console.log("locationInfo && (customerDate === foodTruckDate");

                    // today's location
                    output = "The location for " + foodTruckName + "for today : " + locationInfo[1] + " You can say stop to end the session, or pick another food truck, i will give you the location";
                    repromt_output = "The address also shows on your phone's Alexa app, do you want to pick another one?";
                    var cardTitle = foodTruckName + " Location";
                    var cardContent = locationInfo[1];

                    this.attributes['foodTruckName'] = foodTruckName;
                    this.attributes['forLocationRepeat'] = locationInfo[1];
                    this.handler.state = states.TRUCKLOCATIONMODE;
                    this.emit(':askWithCard', output, repromt_output, cardTitle, cardContent);

                } else {

                    //console.log("locationInfo === 'undefined'");
                    output = cannotFindLocation;
                    repromt_output = 'You can pick another food truck.';
                    this.handler.state = states.TRUCKLOCATIONMODE;
                    this.emit(':ask', output, repromt_output);
                }


                // if it jump out of loop, means no dates are valid
                // output = cannotFindLocation;
                // repromt_output = 'You can pick another food truck.';
                // console.log(this.handler);
                // console.log(this.handler.state);
                // this.handler.state = states.TRUCKLOCATIONMODE;
                // this.emit(':ask', output, repromt_output);

            });
        }
        else {
            this.handler.state = states.TRUCKLOCATIONMODE;
            var new_output = "Sorry, there isn't a food truck with name you picked in our system. Please find another one."
            this.emit(':ask', new_output, new_output);
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
    'AMAZON.HelpIntent': function () {
        var help_output = "you can say:' give me the cuisine list' to get the cuisine list in the system, or saying for a particular cuisine style by saying: 'give me a list of Asian food trucks.'";
        this.emit(":ask", help_output, help_output);
    },
    'Unhandled': function() {
        this.emit(':ask', helpMessage, helpMessage);
    },
};

var cuisinesHandlers = Alexa.CreateStateHandler(states.CUISINESMODE, {
    'getCuisinesIntent': function() {
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },
    'getTrucksListOfSameCuisineIntent': function() {
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },
    'getTruckLocationIntent': function() {
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },
    'AMAZON.RepeatIntent': function() {
        this.emit('getCuisinesIntent');
    },
    'AMAZON.HelpIntent': function () {
        var help_output1 = "you can ask pick from one the the cuisine from the list you just heard";
        this.emit(':ask', help_output1, help_output1);
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
        //console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },

    'getTrucksListOfSameCuisineIntent': function() {
        //console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },

    'getMoreFoodTrucksIntent': function() {
        //console.log(this.handler.state);
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
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },

    'AMAZON.RepeatIntent': function() {
        console.log(this.handler.state);
        if (this.attributes['repeatFoodTruckList']){
            var outputResult = this.attributes['repeatFoodTruckList'];
            this.emit(':ask', outputResult, "You can ask for more truck info or ask for the location of a food truck you want to eat today.");
        }
        else {
            this.emit(':ask', "there is nothing to repeat. Please ask for a food truck location first", "there is nothing to repeat. Please ask for a food truck location first");
        }
    },
    'AMAZON.HelpIntent': function () {
        var help_help_output = 'you can ask for more food truk, or pick one from what you just heard.'
        this.emit(':ask', help_help_output, help_help_output);
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
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },
    'getTrucksListOfSameCuisineIntent': function() {
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },
    'getTruckLocationIntent': function() {
        console.log(this.handler.state);
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },
    'AMAZON.RepeatIntent': function() {
        console.log(this.handler.state);
        if (this.attributes['forLocationRepeat']) {
            var output = this.attributes['forLocationRepeat'];
            var repromt_output = "The address also shows on your phone's Alexa app";
            var cardTitle = this.attributes['foodTruckName'];
            var cardContent = this.attributes['forLocationRepeat'];
            this.emit(':ask', output, repromt_output, cardTitle, cardContent);
        } else {
            var new_output = "sorry, we cannot find the current location for the given food truck.";
            var new_repromt_output = "Come on, don't play with me. Pick another one.";
            this.emit(':ask', new_output, new_repromt_output);
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
    'AMAZON.HelpIntent': function () {
        var help_output2 = "You can pick another food truck location, or say stop to quit.";
        this.emit(':ask', help_output2, help_output2);
    },
    'Unhandled': function() {
        this.emit('Unhandled');
    },
});


function getWebsiteInString(foodTruckName, eventCallback) {
    var corrected_foodTruckName = foodTruckName.replace(/\'/g, "").toLowerCase().replace(/ /g, '-');
    console.log("this is the food truck name: ", foodTruckName);
    console.log("this is the corrected food truck name: ", corrected_foodTruckName);
    var url = 'http://www.seattlefoodtruck.com/food-trucks/' + corrected_foodTruckName;
    console.log("this is the url: ", url);
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
        console.log("Food Truck Name with error message: " + foodTruckName);
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
