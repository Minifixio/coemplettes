import json
import html


"""
Notes strcuture des objets produits

Match 1 : 

Exemple :
"objElement": {
                    "sNoPointLivraison": "079111", <-- OSEF
                    "iIdProduit": 19432, <-- ID unique du produit (important pour retrouver ses filtres)
                    "iIdRayon": 284321, <-- Categorie L1 : Ici -> Pains Patisseries
                    "iIdFamille": 284362, <-- Categorie L2 : Ici -> Patisseries moelleuses
                    "niIdSousFamille": 285531, <-- Categorie L3 : Ici -> Viennoseries
                    "sType": "Produit", <-- OSEF
                    "sId": "19432", <-- OSEF
                    "niIdPhotoEnLigne": 2448400, <-- OSEF
                    "eIncitationLot": 0, <-- OSEF
                    "sIdUniqueRayon": "Rayon284321", <-- OSEF
                    "iIdElementPresentation": 296366, <-- OSEF
                    "sLibelleLigne1": "Pains au chocolat Eco+", <-- Nom du produit 1
                    "sLibelleLigne2": "x10 - 450g", <-- Nom du produit 2
                    "iQteDisponible": 21, <-- Si 0 alors produit indisponible
                    "sPrixUnitaire": "1,69 \u20ac", <-- Prix du produit
                    "fAfficherPrixUnitaire": true, 
                    "nrPVBRIIDeduit": 1.69, <-- Prix du produit
                    "sPrixPromo": "1,69 \u20ac", <-- Si pas de promo alors sPrixPromo = sPrixUnitaire
                    "sPrixParUniteDeMesure": "3,76 \u20ac / kg", <-- Prix au kilo
                    "fAfficherPrixParUniteMesure": true,
                    "nrPVMesureBRIIDeduit": 3.76,
                    "sUrlVignetteProduit": "https://fd7-photos.leclercdrive.fr/image.ashx?id=2448400&use=l&cat=p&typeid=i", <-- URL de l'image, changer le "l" en "d" pour une image de meilleure qualité
                    "fEstBRIIActifEtDisponible": false,
                    "fBriiAffichageSticker": false,
                    "fPrixAvantageux": false,
                    "sUrlLogoBrii": "",
                    "sUrlStickerCampagne": "",
                    "sTexteLogoBRII": "Promotion BRII",
                    "sTexteTooltipLot": "",
                    "fEstVisiblePictoPromoTEL": false,
                    "sCodeLotHeterogene": "",
                    "sUrlLogoTEL": "",
                    "sTexteLogoTel": "Promotion TEL",
                    "sLibellePictoAjouterProduit": "Ajouter au panier",
                    "sLibelleUrlNaviguerRayon": "Voir le rayon",
                    "iQuantitePanier": 0,
                    "rTotalAPayer": 0.0,
                    "sTotalAPayer": "0,00 \u20ac",
                    "sOrigineZoneDepeche": "",
                    "fVoirRayon": false,
                    "sUrlVoirRayon": "",
                    "eDisponibilite": 0,
                    "iIdElementPresentationPrincipale": 296366,
                    "fProduitSubstitution": false,
                    "sTexteEcoParticipationPrix": "",
                    "fAppartientAUneListe": false,
                    "sMsgHeaderPopinAuthen": "Vous devez \u00eatre identifi\u00e9(e) pour ajouter le produit \u00e0 vos listes.",
                    "fAfficherTexteProduitIndispo": false,
                    "sTexteProduitIndispo": "",
                    "sTexteProduitIndispoCarte": "",
                    "fGainsBRD": false,
                    "eTypeProduit": 1,
                    "sUrlPageProduit": "https://fd7-courses.leclercdrive.fr/magasin-079111-Massy-Palaiseau/fiche-produits-19432-Pains-au-chocolat-Eco.aspx",
                    "iQteMinPanier": 0,
                    "iQteMaxPanier": 1000,
                    "sUrlLogoDemandeVocale": "/_res/release/_img/ascWCRS414_PanierBot/picto-commande-vocale.svg?v=638163832640000000",
                    "fEstDansDemandeVocale": false,
                    "fEstProduitCategorieCommerciale": false,
                    "lstMentionsProduit": [],
                    "objAvisClient": {
                        "IdProduit": 19432,
                        "IdProduitBZV": 10010,
                        "Addon": "00",
                        "Note": {
                            "Valeur": 3.0,
                            "IdPicto": 159
                        },
                        "NbAvis": 8
                    },
                    "sIdUnique": "Produit19432"
                },
                "lstEnfants": []
            }
"""

file = open('rayon-284362.aspx', 'r').read()
fileSplit = file.split('Utilitaires.widget.initOptions(')

# for elem in fileSplit:
# print(len(elem))

filtres = fileSplit[6].replace(');', '')
filtres = filtres.replace("'ctl00_ctl00_mainMutiUnivers_main_ctl01_pnlBlocsFiltres',", '')
elemFiltres = json.loads(html.unescape(filtres))

# Recuperation des filtres pour parallele ID/Nom
for filtre in elemFiltres['lstValeursFiltres']:
    if(filtre['iIdBloc'] in [1,2, 12]):
        print(filtre)

data = fileSplit[8].replace(');', '')
data = data.replace("'ctl00_ctl00_mainMutiUnivers_main_ctl05_pnlElementProduit',", '')

# lstFiltres = json.loads(html.unescape(filtres))
elemProd = json.loads(html.unescape(data))

# file = open('produits.json', 'w')
# file.write(json.dumps(elemProd, indent=4))
# file.close()

for categories in elemProd:
    if categories == 'objContenu':
        for objElem in elemProd['objContenu']['lstElements']:
            prod = objElem['objElement']
            print(prod['sLibelleLigne1'] + ' ' + prod['sLibelleLigne2'])
            print(prod['sPrixUnitaire'])
