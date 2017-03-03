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


const asianFoodTruckList = ["Gogi On The Go", "Big Boy's Filipino Food Truck", "Djung On Wheels", "Deen's Banh Mi", "Chebogz Filipino Food Truck", "Mo Pockets", "Seattle Mamak", "Bumbu Truck", "Made In Taiwan", "Spicy Papaya Food Truck", "It's Bao Time", "Bomba Fusion", "Mobile Mavens: Gai Box", "The Box On Wheels", "Beanfish", "Hungry Me", "Yummy Box Food Truck", "Kaosamai Thai Food Truck", "Marination Mobile", "Chopstix", "Tummy Yummy Thai", "Buddha Bruddah", "Chick'n Fix", "Xplosive", "Yumbit", "Munch Boss", "Peasant Food Manifesto", "Seoul Kitchen", "Garden Sushi", "Thai-U-Up", "Lumpia World", "The Roll Pod"]
const mediterraneanFoodTruckList = ["Falafel Salam", "Athena's", "Hallava Falafel", "Main Street Gyros", "I Love My GFF", "Peasant Food Manifesto", "Kabob N' Kabob", "Crisp Creperie", "Seattle Chicken Over Rice"]
const mexicanFoodTruckList = ["Express Mexican Grill", "Tacos El Tajin", "Big Boy's Filipino Food Truck", "El Cabrito Oaxaca", "Taqueria Los Chilangos", "Macho Burgers", "Bomba Fusion", "The Vet Chef", "El Camion", "The Mobile Mayan", "Nibbles Food Truck", "Marination Mobile", "People Of The Chubbs", "Don Lucho's", "Tacos La Flaca", "Taco Time"]
const vegetarianFoodTruckList = ["Falafel Salam", "Athena's", "Tabassum", "Roll OK Please", "Gogi On The Go", "Chopstix", "Spice On Curve", "Djung On Wheels", "Bread And Circuses", "Hallava Falafel", "Cheese Wizards", "Caravan Crepes", "Neema's Comfort Food", "Delfino's Chicago Pizza", "Pompeii Wood Fired Pizza", "Nibbles Food Truck", "BeezNeez Gourmet Sausages", "Spicy Papaya Food Truck", "Thai-U-Up", "I Love My GFF", "Lula Salads", "Big Boy's Filipino Food Truck", "Wicked Pies", "The Box On Wheels", "My Chef Lynn", "Main Street Gyros", "Sam Choy's Poke To The Max", "Dirty Dog Hot Dog", "Kaosamai Thai Food Truck", "Mesob At The Curb", "Yummy Box Food Truck", "Wicked Good Grinders", "Xplosive", "Anchor End Pretzel Shoppe", "The Mobile Mayan", "Marination Mobile", "Plum Burgers", "314 Pie", "Veg-Wich", "Tummy Yummy Thai", "Papa Bois", "Express Mexican Grill", "HB Beverage Company", "Picnic", "Chewaya Moroccan BBQ", "Snout and Co", "Lumpia World", "Delicatessen Montanti", "El Camion", "NaanSense", "Fruit Chatter Box", "Peasant Food Manifesto", "Charlie's Bun's N' Stuff", "Kabob N' Kabob", "Garden Sushi", "Budha Bear Bagels", "A Fire Inside Wood Fired Pizza", "Seattle Mamak", "The Roll Pod"]
const indianFoodTruckList = ["Spice On Curve", "Roll OK Please", "NaanSense", "Veg-Wich", "Kabob N' Kabob", "The Roll Pod"]
const sandwichesFoodTruckList = ["Athena's", "Now Make Me A Sandwich", "Big Boy's Filipino Food Truck", "Deen's Banh Mi", "Hallava Falafel", "Delicatessen Montanti", "Gourmini's", "Maximus Minimus", "Mo Pockets", "Big House BBQ", "Wet Buns", "Tat's Truck", "Napkin Friends", "Nibbles Food Truck", "Mangia Me", "The Peach And The Pig", "NOSH", "My Chef Lynn", "KC Deez BBQ", "Jemil's Big Easy", "Where Ya At Matt?", "Curb Jumper Street Eats", "Wicked Good Grinders", "Anchor End Pretzel Shoppe", "Skillet Street Food", "The Ultimate Melt", "Veg-Wich", "Don Lucho's", "Xplosive", "Grilled Cheese Experience", "Burgerphenia", "Cheese Wizards", "Cauldron", "Seattle Biscuit Company", "Peasant Food Manifesto", "Picnic", "Charlie's Bun's N' Stuff", "Papa Bois", "Budha Bear Bagels"]
const bbqFoodTruckList = ["Campfire BBQ", "KC Deez BBQ", "Macho Burgers", "Woodshop BBQ", "Chewaya Moroccan BBQ", "Snout and Co", "Big House BBQ", "Raney Brothers BBQ", "The Peach And The Pig", "Neema's Comfort Food", "Maximus Minimus", "Gobble Express"]
const burgersFoodTruckList = ["Off The Rez", "My Chef Lynn", "Burgerphenia", "People Of The Chubbs", "Curb Jumper Street Eats", "Buns On Wheels", "Bread And Circuses", "Jessica's Unique Bite", "The People's Burger", "Skillet Street Food", "Charlie's Bun's N' Stuff", "Plum Burgers", "Stacks Burgers", "Dante's Inferno Dogs", "Macho Burgers"]


const cannotFindLocation = 'Sorry, we cannot find the food truck location based on seattle food truck dot com. Please chose another one';



var states = {
    TRUCKLOCATIONMODE: '_TRUCKLOCATIONMODE',
    CUISINESMODE: '_CUISINESMODE',
    TRUCKLISTMODE: '_TRUCKLISTMODE',
}
var startingStateHandlers = {
    'NewSession': function () {

    },
    'getCuisinesIntent': function (isRepeat) {
        //API CALL result
        if (isRepeat) {

        }
        this.attributes["result"] = result;
        this.handler.state = states.CUISINESMODE;
        //this.emitWithState(getCui); will this become a INF loop???
        this.emit(':ask', result, repeatResult);
    },
    'getTrucksListOfSameCuisineIntent': function () {

        this.handler.state = states.TRUCKLISTMODE;
        this.emit(':ask', result, repeatResult);
    },
    'getTruckLocationIntent': function () {

        this.handler.state = states.TRUCKLOCATIONMODE;
        this.emit(':ask', result, repeatResult);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
       output = HelpMessage;
       this.emit(':ask', output, welcomeRepromt);
    },
};

var cuisinesHandlers = Alexa.CreateStateHandler(states.CUISINESMODE, {
    'getCuisinesIntent': function () {
        this.handler.state = '';
        this.emitWithState('getCuisinesIntent');
    },
    'getTrucksListOfSameCuisineIntent': function () {
        this.handler.state = '';
        this.emitWithState('getTrucksListOfSameCuisineIntent');
    },
    'getTruckLocationIntent': function () {
        this.handler.state = '';
        this.emitWithState('getTruckLocationIntent');
    },
    'AMAZON.RepeatIntent': function () {
        this.emit('getCuisinesIntent', true);// go back to startingHandlers or stay within this one??
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
});

var truckListHandlers = Alexa.CreateStateHandler(states.TRUCKLISTMODE, {


});

var truckLocationHandlers = Alexa.CreateStateHandler(states.TRUCKLOCATIONMODE, {

});
