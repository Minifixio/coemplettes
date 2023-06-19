# 1. connection au VPN de Télécom Paris
# Ouvrir un tunnel SSH vers la base de données
# ssh ubuntu@pact-28.r2.enst.fr -L 3306:localhost:3306
from mysql import connector

list = [elem.split(';') for elem in open("fromQELMC/exportFiltered.csv", "r").read().split("\n")][:-1]
req = "INSERT INTO supermarkets_products (product_id, supermarket_id, price) VALUES (%s, %s, %s)"
conn = connector.connect(user='admin', password='$vVvarSggxM*8P', host='localhost', database='COEMP')

cursor = conn.cursor(buffered=True)

for i in range(1, len(list)):
    ref = list[i][1]
    cursor.execute("SELECT id FROM products WHERE reference = %s", (ref,))
    product_id = cursor.fetchone()[0]

    nom = list[i][7] + ' ' + list[i][8]
    cursor.execute("SELECT id FROM supermarkets WHERE nom = %s", (zip,))
    supermarket_id = cursor.fetchone()[0]
    cursor.execute(req, (product_id, supermarket_id, list[i][5]))
    conn.commit()

cursor.close()
conn.close()
