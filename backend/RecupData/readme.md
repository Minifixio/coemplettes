# Récupérer les données des sites marchands

## Prérequis

- Python 3.6
- pip
- BeautifulSoup

## Utilisation

Depuis le site marchand, récupérer les données de la page produit et les mettre dans un fichier .html.
<br>L'élément requis s'obtient facilement depuis la console Javascript du navigateur:
<code>document.getElementById('ElementID')</code>
<br>Mettez tout les fichiers .html dans le dossier <b>data</b> du projet.

### Spécificités par site

Leclerc : récupérer seulement l'élément d'ID <b>ulListeProduits</b> des pages rayons.
<br>
![Leclerc Selection](img/leclerc.png)
<br>
Auchan :
<br>
Carrefour :
<br>
Cora : 
<br>
Intermarché :
<br>
Casino :

## Exécution

L'exécution du script produit 2 fichiers CSV exportables sur la base de données.
<br>Un fichier <b>products.csv</b> contenant les produit.
<br>Un fichier <b>supermarketProducts.csv</b> contenant les données spécifiques au supermarché.

## Evolutions

Ajouter un connecteur pour ajouter directement les données dans la base de données.
<br>Améliorer la gestion des produits des supermarchés.