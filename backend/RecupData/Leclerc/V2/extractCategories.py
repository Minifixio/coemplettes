import os
import json
import html

# importation des categories deja existantes
categories = [cat.split(';') for cat in open('dataFolder/categories.csv', 'r').read().split('\n')]
marques = [marque.split(';') for marque in open('dataFolder/marques.csv', 'r').read().split('\n')]
produits = [produit.split(';') for produit in open('dataFolder/produits.csv', 'r').read().split('\n')]

# list files
fileNames = os.listdir("leclercScrap")
for fileName in fileNames:

    fileOpen = open("leclercScrap/" + fileName, 'r')
    file = fileOpen.read()
    fileOpen.close()

    fileList = file.split('\n')
    for line in fileList:
        # ajout des categories et de leurs ID
        if '--sf--' in line and 'Filtres=4-' in line:
            catID = html.unescape(line.split('Filtres=4-')[1][:6])
            catName = html.unescape(line.split('--sf--')[1][:-2])
            if catID not in [cat[0] for cat in categories]:
                categories.append([catID, catName])

    fileSplit = file.split('Utilitaires.widget.initOptions(')

    filtres = fileSplit[6].replace(');', '')
    filtres = filtres.replace("'ctl00_ctl00_mainMutiUnivers_main_ctl01_pnlBlocsFiltres',", '')
    elemFiltres = json.loads(html.unescape(filtres))

    data = fileSplit[8].replace(');', '')
    print(data[:100])
    data = filtres.replace("'ctl00_ctl00_mainMutiUnivers_main_ctl01_pnlBlocsFiltres',", '')
    elemProduits = json.loads(html.unescape(data))


    # # sauvegarde des categories
    # catFile = open('dataFolder/categories.csv', 'w')
    # for cat in categories:
    #     if cat != ['']:
    #         catFile.write(cat[0] + ';' + cat[1] + '\n')
    # catFile.close()
    #
    # # sauvegarde des marques
    # marquesFile = open('dataFolder/marques.csv', 'w')
    # for marque in marques:
    #     if marque != ['']:
    #         marquesFile.write(marque[0] + ';' + marque[1] + '\n')
    # marquesFile.close()
