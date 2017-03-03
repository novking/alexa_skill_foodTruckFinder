from bs4 import BeautifulSoup
import re
import io

Asian = set()
Mediterranean = set()
Mexican = set()
Vegetarian = set()
Indian = set()
Sandwiches = set()
BBQ = set()
Burger = set()

with open('/Users/yimzhang/Desktop/FoodTrucks.html') as input_html:
    soup = BeautifulSoup(input_html, 'html.parser')
    for one_food_truck in soup.find_all('div', attrs={'class':'w-portfolio-item'}):
        categories = one_food_truck['class'][1:]

        list_of_cuisine_tags = [i.encode('utf8') for i in categories]

        tag =  one_food_truck.h2
        truck_name = tag.get_text().encode('utf8', 'ignore')

        if 'asian' in list_of_cuisine_tags:
            Asian.add(truck_name)
        if 'vegetarian' in list_of_cuisine_tags:
            Vegetarian.add(truck_name)
        if 'mediterranean' in list_of_cuisine_tags:
            Mediterranean.add(truck_name)
        if 'mexican' in list_of_cuisine_tags:
            Mexican.add(truck_name)
        if 'indian' in list_of_cuisine_tags:
            Indian.add(truck_name)
        if 'sandwiches' in list_of_cuisine_tags:
            Sandwiches.add(truck_name)
        if 'bbq' in list_of_cuisine_tags:
            BBQ.add(truck_name)
        if 'burgers' in list_of_cuisine_tags:
            Burger.add(truck_name)

x = [Asian ,  Mediterranean ,  Mexican ,  Vegetarian ,  Indian ,  Sandwiches ,  BBQ ,  Burger]
xx = [list(i) for i in x]
encoding = 'utf-8'
with open('truckListFinal.txt', 'a') as f:
    for i in xx:
        f.write(str(i))
        f.write("\n")
