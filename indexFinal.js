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
var FoodTruckLists = {
    asianFoodTruckList: ["Gogi On The Go", "Big Boy's Filipino Food Truck", "Djung On Wheels", "Deen's Banh Mi", "Chebogz Filipino Food Truck", "Mo Pockets", "Seattle Mamak", "Bumbu Truck", "Made In Taiwan", "Spicy Papaya Food Truck", "It's Bao Time", "Bomba Fusion", "Mobile Mavens: Gai Box", "The Box On Wheels", "Beanfish", "Hungry Me", "Yummy Box Food Truck", "Kaosamai Thai Food Truck", "Marination Mobile", "Chopstix", "Tummy Yummy Thai", "Buddha Bruddah", "Chick'n Fix", "Xplosive", "Yumbit", "Munch Boss", "Peasant Food Manifesto", "Seoul Kitchen", "Garden Sushi", "Thai-U-Up", "Lumpia World", "The Roll Pod"],
    mediterraneanFoodTruckList: ["Falafel Salam", "Athena's", "Hallava Falafel", "Main Street Gyros", "I Love My GFF", "Peasant Food Manifesto", "Kabob N' Kabob", "Crisp Creperie", "Seattle Chicken Over Rice"],
    mexicanFoodTruckList: ["Express Mexican Grill", "Tacos El Tajin", "Big Boy's Filipino Food Truck", "El Cabrito Oaxaca", "Taqueria Los Chilangos", "Macho Burgers", "Bomba Fusion", "The Vet Chef", "El Camion", "The Mobile Mayan", "Nibbles Food Truck", "Marination Mobile", "People Of The Chubbs", "Don Lucho's", "Tacos La Flaca", "Taco Time"],
    vegetarianFoodTruckList: ["Falafel Salam", "Athena's", "Tabassum", "Roll OK Please", "Gogi On The Go", "Chopstix", "Spice On Curve", "Djung On Wheels", "Bread And Circuses", "Hallava Falafel", "Cheese Wizards", "Caravan Crepes", "Neema's Comfort Food", "Delfino's Chicago Pizza", "Pompeii Wood Fired Pizza", "Nibbles Food Truck", "BeezNeez Gourmet Sausages", "Spicy Papaya Food Truck", "Thai-U-Up", "I Love My GFF", "Lula Salads", "Big Boy's Filipino Food Truck", "Wicked Pies", "The Box On Wheels", "My Chef Lynn", "Main Street Gyros", "Sam Choy's Poke To The Max", "Dirty Dog Hot Dog", "Kaosamai Thai Food Truck", "Mesob At The Curb", "Yummy Box Food Truck", "Wicked Good Grinders", "Xplosive", "Anchor End Pretzel Shoppe", "The Mobile Mayan", "Marination Mobile", "Plum Burgers", "314 Pie", "Veg-Wich", "Tummy Yummy Thai", "Papa Bois", "Express Mexican Grill", "HB Beverage Company", "Picnic", "Chewaya Moroccan BBQ", "Snout and Co", "Lumpia World", "Delicatessen Montanti", "El Camion", "NaanSense", "Fruit Chatter Box", "Peasant Food Manifesto", "Charlie's Bun's N' Stuff", "Kabob N' Kabob", "Garden Sushi", "Budha Bear Bagels", "A Fire Inside Wood Fired Pizza", "Seattle Mamak", "The Roll Pod"],
    indianFoodTruckList: ["Spice On Curve", "Roll OK Please", "NaanSense", "Veg-Wich", "Kabob N' Kabob", "The Roll Pod"],
    sandwichesFoodTruckList: ["Athena's", "Now Make Me A Sandwich", "Big Boy's Filipino Food Truck", "Deen's Banh Mi", "Hallava Falafel", "Delicatessen Montanti", "Gourmini's", "Maximus Minimus", "Mo Pockets", "Big House BBQ", "Wet Buns", "Tat's Truck", "Napkin Friends", "Nibbles Food Truck", "Mangia Me", "The Peach And The Pig", "NOSH", "My Chef Lynn", "KC Deez BBQ", "Jemil's Big Easy", "Where Ya At Matt?", "Curb Jumper Street Eats", "Wicked Good Grinders", "Anchor End Pretzel Shoppe", "Skillet Street Food", "The Ultimate Melt", "Veg-Wich", "Don Lucho's", "Xplosive", "Grilled Cheese Experience", "Burgerphenia", "Cheese Wizards", "Cauldron", "Seattle Biscuit Company", "Peasant Food Manifesto", "Picnic", "Charlie's Bun's N' Stuff", "Papa Bois", "Budha Bear Bagels"],
    bbqFoodTruckList: ["Campfire BBQ", "KC Deez BBQ", "Macho Burgers", "Woodshop BBQ", "Chewaya Moroccan BBQ", "Snout and Co", "Big House BBQ", "Raney Brothers BBQ", "The Peach And The Pig", "Neema's Comfort Food", "Maximus Minimus", "Gobble Express"],
    burgersFoodTruckList: ["Off The Rez", "My Chef Lynn", "Burgerphenia", "People Of The Chubbs", "Curb Jumper Street Eats", "Buns On Wheels", "Bread And Circuses", "Jessica's Unique Bite", "The People's Burger", "Skillet Street Food", "Charlie's Bun's N' Stuff", "Plum Burgers", "Stacks Burgers", "Dante's Inferno Dogs", "Macho Burgers"]
};


const cannotFindLocation = 'Sorry, we cannot find the food truck location based on seattle food truck dot com. Please chose another one';

const welcomeMesssage = "Yo Yo Yo, Do you want to find some good food? You can ask for cuisine list, food truck list of a particular cuisine, or location of a particular food truck";
const goodbyeMessage = "Good appetite!";
const helpMessage = "Sorry, I didn't get what you say. Can you rephase?"

const Repromt_getCuisine = "You can ask me to repeat the cuisine list or choose a cuisine you like, I will give you a list of food trucks fit your taste."
const Repromt_getTruckList = "You can get food trucks by saying:' Give me more food trucks info'";

var states = {
    TRUCKLOCATIONMODE: '_TRUCKLOCATIONMODE',
    CUISINESMODE: '_CUISINESMODE',
    TRUCKLISTMODE: '_TRUCKLISTMODE',
}
var startingStateHandlers = {
    'NewSession': function() {
        this.emit(':ask', welcomeMesssage, welcomeMesssage);
    },
    'getCuisinesIntent': function() {
        var cuisineListToString = cuisineList.toString();
        var styleNumber = cuisineList.length;
        var getCuisinesResPre = "There are " + styleNumber.toString() + " different categories:"
        var output = getCuisinesResPre + cuisineListToString;

        this.handler.state = states.CUISINESMODE;
        this.emit(':ask', output, Repromt_getCuisine);
    },
    'getTrucksListOfSameCuisineIntent': function() {
        //not very confident////////////////////
        var cuisineCustomerPicked = this.event.request.intent.slots.cuisine.value;
        ////////////////////////////////////////
        var targetFoodTruckList = FoodTrucks[cuisineCustomerPicked];
        var outputResult = targetFoodTruckList.slice(0, 3).toString();


        this.attributes['numberOfFoodTrucksHasGiven'] = 3 // to track how many food trucks that has already been told to customer
        this.attributes['cuisineCustomerPicked'] = cuisineCustomerPicked;

        var output = "Food Trucks which serve " + cuisineCustomerPicked + " are: " + outputResult
        var cardTitle = "Food Truck Names";
        var cardContent = outputResult;
        this.attributes['repeatFoodTruckList'] = outputResult;
        this.handler.state = states.TRUCKLISTMODE;
        this.emit(':askWithCard', output, Repromt_getTruckList, cardTitle, cardContent);
    },
    'getTruckLocationIntent': function() {
        //get food truck name
        var foodTruckName = this.event.request.intent.slots.foodTruck.value;

        getWebsiteInString(foodTruckName, function(htmlPage) {
          var re = /class="simcal-event-address simcal-event-start-location" itemprop="location" itemscope itemtype="http:\/\/schema\.org\/Place">(.+)<\/span><\/em><\/p>/g;
          var locationInfo;
          locationInfo = re.exec(htmlPage);

          if (locationInfo) {
              var output = "The location for " + foodTruckName + " is \n" + locationInfo;
              var repromt_output = "The address also shows on your phone's Alexa app";
              var cardTitle = foodTruckName + "Location";
              var cardContent = locationInfo
              this.emit(':askWithCard', output, repromt_output, cardTitle, cardContent);
          } else {
            var output = cannotFindLocation;
            var repromt_output = 'You can pick another food truck.';
            this.emit(':ask', output, repromt_output);
        });
        this.attributes['forLocationRepeat'] = locationInfo;
        this.handler.state = states.TRUCKLOCATIONMODE;
        this.emit(':ask', result, repeatResult);
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
        var targetFoodTruckList = FoodTrucks[cuisineCustomerPicked];
        var start = this.attributes['numberOfFoodTrucksHasGiven'];

        // figure where to start and end for "more info"
        if (start >= targetFoodTruckList.length) {
            this.emit(":ask", "That's all the food trucks fit your chosen. Do you want to pick a food truck?", "You can got the food truck location by saying:' where is your chosen food truck?'");
        } else if ((start + 5) > targetFoodTruckList.length) {
            var end = targetFoodTruckList.length;
            this.attributes['numberOfFoodTrucksHasGiven'] = end;
        } else {
            var end = start + 5;
            this.attributes['numberOfFoodTrucksHasGiven'] = end;
        }

        var outputResult = targetFoodTruckList.slice(start, end).toString();
        var output = "Here are more food trucks server " + cuisineCustomerPicked + " : " + outputResult;
        this.attributes['repeatFoodTruckList'] = outputResult;
        this.emit(':ask', output, "You can ask for more truck info or chose a food truck you want to go eat today");
    },

    'getTruckLocationIntent': function() {
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },

    'AMAZON.RepeatIntent': function() {
        var outputResult = this.attributes['repeatFoodTruckList'];
        this.emit(':ask', outputResult, "You can ask for more truck info or chose a food truck you want to go eat today");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", "OK, OK");
    },
    'SessionEndedRequest': function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.emit('Unhandled');
    },


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
    'AMAZON.RepeatIntent': function () {
        var output = this.attributes['forLocationRepeat'];
        var repromt_output = "The address also shows on your phone's Alexa app";
        this.emit(':ask', output, repromt_output);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", "OK, OK'");
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
    console.log(url)
    http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            eventCallback(body, url);
        });

    }).on('error', function(e) {
        console.log("Got error: ", e);
        console.log("Food Truck Name: " + foodTruckName);
    });
}
