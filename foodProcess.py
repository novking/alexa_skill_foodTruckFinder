# asianFoodTruckList = ["Chick'n Fix", "Munch Boss", "It's Bao Time", "Peasant Food Manifesto", "Bomba Fusion", "Xplosive", "The Box On Wheels", "Hungry Me", "Yumbit", "Buddha Bruddah"],
# mediterraneanFoodTruckList = ["Athena's", "Peasant Food Manifesto", "Falafel Salam", "Seattle Chicken Over Rice", "I Love My GFF", "Main Street Gyros"],
# mexicanFoodTruckList = ["Bomba Fusion", "Taqueria Los Chilangos"],
# vegetarianFoodTruckList = ["NaanSense", "I Love My GFF", "Snout and Co", "Caravan Crepes", "Bread And Circuses", "Mesob At The Curb", "Cheese Wizards", "Anchor End Pretzel Shoppe", "Athena's", "Wicked Good Grinders", "Xplosive", "BeezNeez Gourmet Sausages", "Sam Choy's Poke To The Max", "Main Street Gyros", "The Box On Wheels", "Delfino's Chicago Pizza", "Falafel Salam", "Papa Bois", "Peasant Food Manifesto"],
# indianFoodTruckList = ["NaanSense"],
# sandwichesFoodTruckList = ["Tat's Truck", "Grilled Cheese Experience", "Cheese Wizards", "Anchor End Pretzel Shoppe", "Wicked Good Grinders", "Seattle Biscuit Company", "Where Ya At Matt?", "Xplosive", "Skillet Street Food", "KC Deez BBQ", "Peasant Food Manifesto", "Papa Bois", "NOSH", "Now Make Me A Sandwich", "Athena's"],
# bbqFoodTruckList = ["Woodshop BBQ", "Snout and Co", "KC Deez BBQ"],
# burgersFoodTruckList = ["Skillet Street Food", "Dante's Inferno Dogs", "Off The Rez", "Bread And Circuses"]

FoodTruckLists = {
    "asianFoodTruckList": ["Chick'n Fix", "Munch Boss", "It's Bao Time", "Peasant Food Manifesto", "Bomba Fusion", "Xplosive", "The Box On Wheels", "Hungry Me", "Yumbit", "Buddha Bruddah"],
    "mediterraneanFoodTruckList": ["Athena's", "Peasant Food Manifesto", "Falafel Salam", "Seattle Chicken Over Rice", "I Love My GFF", "Main Street Gyros"],
    "mexicanFoodTruckList": ["Bomba Fusion", "Taqueria Los Chilangos"],
    "vegetarianFoodTruckList": ["NaanSense", "I Love My GFF", "Snout and Co", "Caravan Crepes", "Bread And Circuses", "Mesob At The Curb", "Cheese Wizards", "Anchor End Pretzel Shoppe", "Athena's", "Wicked Good Grinders", "Xplosive", "BeezNeez Gourmet Sausages", "Sam Choy's Poke To The Max", "Main Street Gyros", "The Box On Wheels", "Delfino's Chicago Pizza", "Falafel Salam", "Papa Bois", "Peasant Food Manifesto"],
    "indianFoodTruckList": ["NaanSense"],
    "sandwichesFoodTruckList": ["Tat's Truck", "Grilled Cheese Experience", "Cheese Wizards", "Anchor End Pretzel Shoppe", "Wicked Good Grinders", "Seattle Biscuit Company", "Where Ya At Matt?", "Xplosive", "Skillet Street Food", "KC Deez BBQ", "Peasant Food Manifesto", "Papa Bois", "NOSH", "Now Make Me A Sandwich", "Athena's"],
    "bbqFoodTruckList": ["Woodshop BBQ", "Snout and Co", "KC Deez BBQ"],
    "burgersFoodTruckList": ["Skillet Street Food", "Dante's Inferno Dogs", "Off The Rez", "Bread And Circuses"]
}
result = []
for i in FoodTruckLists.keys():
    result.extend(FoodTruckLists[i])
print len(result)
setResult = set(result)
print len(setResult)
print list(setResult)
