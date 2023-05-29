# 1. connection au VPN de Télécom Paris
# Ouvrir un tunnel SSH vers la base de données
# ssh ubuntu@pact-28.r2.enst.fr -L 3306:localhost:3306
from mysql import connector

listProd = [elem.split(';') for elem in open("dataFolder/produits.csv", "r").read().split("\n")][1:-1]
listSMProd = [elem.split(';') for elem in open("dataFolder/supermarket_products.csv", "r").read().split("\n")][1:-1]
listCat = [elem.split(';') for elem in open("dataFolder/categories.csv", "r").read().split("\n")][1:-1]

reqProd = "INSERT INTO products (name, category_id, quantity_type,icon_link, brand, reference,is_bio,nutriscore) VALUES (%s, %s, %s, %s, %s,%s, %s, %s)"
reqSMProd = "INSERT INTO supermarkets_products (product_id,supermarket_id,price,is_available) VALUES (%s, %s, %s, %s)"
reqCat = "INSERT INTO category (id,name) VALUES (%s, %s)"
conn = connector.connect(user='admin', password='$vVvarSggxM*8P', host='localhost', database='COEMP')

cursor = conn.cursor(buffered=True)

# Ajout des categories en premier car clé étrangère dans products
for i in range(1, len(listCat)):
    id = listCat[i][0]
    name = listCat[i][1]

    cursor.execute("SELECT id FROM category WHERE id = %s", (id,))
    if cursor.fetchone() is None:
        cursor.execute(reqCat, (id, name))
    else :
        cursor.execute("UPDATE category SET name = %s WHERE id = %s", (name, id))
    conn.commit()

for i in range(1, len(listProd)):
    name = listProd[i][1]
    category_id = listProd[i][2]
    quantity_type = listProd[i][3]
    icon_link = listProd[i][4]
    brand = listProd[i][5]
    reference = listProd[i][0]
    is_bio = listProd[i][6]
    nutriscore = listProd[i][7]

    cursor.execute("SELECT id FROM products WHERE reference = %s", (reference,))
    if cursor.fetchone() is None:
        cursor.execute(reqProd, (name, category_id, quantity_type, icon_link, brand, reference, is_bio, nutriscore,))
    else :
        cursor.execute("UPDATE products SET name = %s, category_id = %s, quantity_type = %s, icon_link = %s, brand = %s, is_bio = %s, nutriscore = %s WHERE reference = %s", (name, category_id, quantity_type, icon_link, brand, is_bio, nutriscore, reference))
    conn.commit()

for i in range(1, len(listSMProd)):
    cursor.execute("SELECT id FROM products WHERE reference = %s", (listSMProd[i][0],))
    product_id = cursor.fetchone()[0]
    supermarket_id = listSMProd[i][1]
    price = listSMProd[i][2]
    is_available = listSMProd[i][3]

    cursor.execute("SELECT id FROM supermarkets_products WHERE product_id = %s AND supermarket_id = %s", (product_id, supermarket_id,))
    if cursor.fetchone() is None:
        cursor.execute(reqSMProd, (product_id, supermarket_id, price, is_available))
    else :
        cursor.execute("UPDATE supermarkets_products SET price = %s, is_available = %s WHERE product_id = %s AND supermarket_id = %s", (price, is_available, product_id, supermarket_id))
    conn.commit()

cursor.close()
conn.close()
