"""
Ce fichier permet de récupérer les categories, les marques et les produits contenus dans les pages web de Leclerc
"""

import os
import json
import html
import re
import requests

# importation des categories deja existantes
categories = {cat.split(';')[0]: cat.split(';')[1] for cat in
              open('dataFolder/categories.csv', 'r').read().split('\n')[:-1]}
# importation des marques deja existantes
marques = {marque.split(';')[0]: marque.split(';')[1] for marque in
           open('dataFolder/marques.csv', 'r').read().split('\n')[:-1]}
# importation des produits deja existants
produits = {produit.split(';')[0]: produit.split(';')[1:] for produit in
            open('dataFolder/produits.csv', 'r').read().split('\n')[:-1]}
prodSM = {produit.split(';')[0]: produit.split(';')[1:] for produit in
          open('dataFolder/supermarket_products.csv', 'r').read().split('\n')[:-1]}

# list files
fileNames = os.listdir("leclercScrap")
for fileName in fileNames:
    print(fileName)
    if fileName[0] =='.':
        print('ignored')
        continue
    fileOpen = open("leclercScrap/" + fileName, 'r')
    file = html.unescape(fileOpen.read().replace('&quot;', ''))
    fileOpen.close()

    ## TRAITEMENT DES CATEGORIES
    # Les categories et leurs IDs sont contenues dans le fichier uniquement dans la structure HTML
    # On doit donc rechercher les lignes spécifiques et les traiter
    fileList = file.split('\n')
    for line in fileList:
        # ajout des categories et de leurs ID
        if '--sf--' in line and 'Filtres=4-' in line:
            catID = line.split('Filtres=4-')[1][:6]
            catName = line.split('--sf--')[1][:-2]
            if catID not in categories.keys():
                categories[catID] = catName

    # Recuperation des parties utiles du fichier
    fileSplit = re.findall("\'ctl00_ctl00_mainMutiUnivers_main_(.*?)\}\);", file)
    # 1er formatage
    fileSplit = [dataJson.split(',', 1) for dataJson in fileSplit]
    # 2nd formatage
    dicSplit = {dataJson[0][:-1]: dataJson[1] + '}' for dataJson in fileSplit}

    jsonFiltres = json.loads(dicSplit['ctl01_pnlBlocsFiltres'])

    ## TRAITEMENT DES FILTRES
    # Les iIDBloc importants sont:
    #   - Marques ['iIDBloc' = 1]
    #   - Labels Qualité (On retiendra seulement le Label BIO) ['iIDBloc' = 3, 'iIdValeur' = 1]
    #   - Nutriscore ['iIDBloc' = 12, 'iIdValeur' = 1 -> 5 (A -> B)]
    # On récupère les marques présentes
    for elem in jsonFiltres['lstValeursFiltres']:
        if elem['iIdBloc'] == 1:
            if str(elem['iIdValeur']) not in marques.keys():
                # On ajoute la marque
                marques[str(elem['iIdValeur'])] = elem['sLibelle']

    # On récupère les produits
    # try :
    jsonProds = json.loads(dicSplit['ctl05_pnlElementProduit'])
    # except :
    #     erFile = open('erreurParsing/errorFile.json', 'a')
    #     erFile.write(dicSplit['ctl05_pnlElementProduit'])
    #     erFile.close()
    #     exit()

    lstProds = jsonProds['objContenu']['lstElements']
    assoProdFiltres = jsonProds['lstAssocFiltreProduit']
    for objProd in lstProds:
        prod = objProd['objElement']
        prodID = str(prod['iIdProduit'])

        try:
            prodNameWl = re.split('\s+|-', prod['sLibelleLigne1']) + re.split('\s+|-', prod['sLibelleLigne2'])
        except KeyError:
            prodNameWl = re.split('\s+|-', prod['sLibelleLigne1'])

        # On enleve les mots vides et les tirets
        prodNameWl = [word for word in prodNameWl if word != '']
        prodName = ' '.join(prodNameWl)

        prodQtt = re.findall('([0-9]*[xX]*[0-9]+\s*[a-zA-Z]+$)|([xX][0-9]+$)', prodName)
        if prodQtt != []:
            prodQtt = prodQtt[0][0] if prodQtt[0][0] != '' else prodQtt[0][1]
            prodName = prodName.replace(' ' + prodQtt, '')
            prodQtt = prodQtt.replace(' ', '')
        else:
            prodQtt = '1p'

        prodCatID = prod['niIdSousFamille']

        # Telechargement de l'image
        prodImUrl = 'https://fd7-photos.leclercdrive.fr/image.ashx?id={}&use=l&cat=p&typeid=i'.format(
            str(prod['niIdPhotoEnLigne'] - 1))
        prodIm = requests.get(prodImUrl, stream=True).content
        with open('dataFolder/imagesProds/' + str(prodID) + '.jpg', 'wb') as handler:
            handler.write(prodIm)

        prodImPath = prodID + '.jpg'
        prodPrix = prod['nrPVBRIIDeduit']
        prodDisp = 1 if prod['iQteDisponible'] > 0 else 0
        # On ajoute le produit dans le dictionnaire produits
        # le '' correspond à la marque
        # le 0 correspond au BIO (0 = non, 1 = oui)
        # le '' correspond au nutriscore
        produits[prodID] = [prodName, prodCatID, prodQtt, prodImPath, '#', 0, '#']
        prodSM[prodID] = [prodPrix, 1, prodDisp]

    for asso in assoProdFiltres:
        if asso['iIdBloc'] == 1:
            # On récupère la marque grâce à l'id contenu dans asso
            prodMarque = marques[str(asso['iIdValeur'])]
            produits[str(asso["iIdProduit"])][4] = prodMarque
        if asso['iIdBloc'] == 3:
            # On récupère si l'élément est BIO
            if asso['iIdValeur'] == 1:
                produits[str(asso["iIdProduit"])][5] = 1
        if asso['iIdBloc'] == 12:
            # On récupère le nutriscore
            produits[str(asso["iIdProduit"])][6] = ['A', 'B', 'C', 'D', 'E'][asso['iIdValeur'] - 1]

    # On sauvegarde les données des produits
prodFile = open('dataFolder/produits.csv', 'w')
for prodKey in produits.keys():
    prodFile.write(prodKey + ';' + ';'.join([str(elem) for elem in produits[prodKey]]) + '\n')
prodFile.close()

# On sauvegarde les données des produits pour le supermarché
supProdFile = open('dataFolder/supermarket_products.csv', 'w')
for prodSMKey in prodSM.keys():
    supProdFile.write(prodSMKey + ';' + ';'.join([str(elem) for elem in prodSM[prodSMKey]]) + '\n')
supProdFile.close()

# sauvegarde des categories
catFile = open('dataFolder/categories.csv', 'w')
for catKey in categories.keys():
    catFile.write(catKey + ';' + categories[catKey] + '\n')
catFile.close()

# sauvegarde des marques
marquesFile = open('dataFolder/marques.csv', 'w')
for marqueKey in marques.keys():
    marquesFile.write(marqueKey + ';' + marques[marqueKey] + '\n')
marquesFile.close()
