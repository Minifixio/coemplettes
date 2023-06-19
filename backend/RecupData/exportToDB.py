# 1. connection au VPN de Télécom Paris
# Ouvrir un tunnel SSH vers la base de données
# ssh ubuntu@pact-28.r2.enst.fr -L 3306:localhost:3306
from mysql import connector

list = [elem.split(';') for elem in open("fromQELMC/exportFiltered.csv", "r").read().split("\n")][:-1]
req = "INSERT INTO products (name, quantity_type, average_price, brand, reference) VALUES (%s, %s, %s, %s, %s)"
conn = connector.connect(user='admin', password='$vVvarSggxM*8P', host='localhost', database='COEMP')

cursor = conn.cursor()

for i in range(1, len(list), 2):
    print(list[i])
    av_price = round((float(list[i][5]) + float(list[i + 1][5])) / 2, 2)
    name = list[i][3]
    brand = list[i][2]
    ref = list[i][1]
    quantity_type = list[i][4]

    cursor.execute(req, (name, quantity_type, str(av_price), brand, ref))
    conn.commit()

cursor.close()
conn.close()
