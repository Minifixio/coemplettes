from bs4 import BeautifulSoup
import os
import html
import re

# We first need to get a list of all the html files in the data folder

fileList = os.listdir('data')
prodExp = []
SupProdExp = []
tmpid = 0

for file in fileList:
    # We open the file and read it
    opFile = open('data/'+file, 'r',encoding='utf-8').read()
    # We unescape the html file
    opFile = html.unescape(opFile)
    # BeautifulSoup is used to parse the html file
    soup = BeautifulSoup(opFile, 'html.parser')
    # We get the list of all the products
    lst = soup.select('.liWCRS310_Product')
    print(len(lst))

    elemProdExp = []
    elemSupProdExp = []

    # We loop through the list of products
    for elem in lst:
        print(elem['id'])
        if elem['data-vignette'] == 'bientotDisponible':
            print(elem.select('.divWCRS310_Content')[0].img['alt'])
            print(elem.select('.divWCRS310_Content')[0].img['src'])
        else:
            print(elem.select('.divWCRS310_Content')[0].select('.aWCRS310_Product')[0].img['alt'])
            print(elem.select('.divWCRS310_Content')[0].select('.aWCRS310_Product')[0].img['src'])

        plst = []
        for p in elem.select('.divWCRS310_PrixUnitaire')[0].find_all('p'):
            plst.append(re.sub(r'\s+', '', p.text))
        price = plst[0]+plst[2]+plst[1]
        print(price)