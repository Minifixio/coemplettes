# Just copy in a file the html element which ID is "ulListeProduits"

from bs4 import BeautifulSoup

soup = BeautifulSoup(open('test1.html', 'r'), 'html.parser')

lst = soup.find_all('li','liWCRS310_Product')

prodExp = []
SupProdExp = []
product_id = 0

print(len(lst))

for elem in lst:
    if elem['data-vignette'] == 'recette':
        continue
    data = [product_id]
    product_id += 1
    name = elem.find('div', 'divWCRS310_Content').find('p', 'pWCRS310_Desc').a.text
    elemprix = elem.find('div', 'divWCRS310_Content').find('div', 'divWCRS310_PrixUnitaire').find_all('p')
    prix = elemprix[0].text + elemprix[2].text
    print(name)
    print(prix)
