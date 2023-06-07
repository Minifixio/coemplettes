import re
input = open("export.txt", "r").read().split('\n')
output = open("export.csv", "w")

id = 0

output.write("id;code;brand;name;quantity;price;category;supermarket;city;zip\n")

for line in input:
    print(id)
    lnElems = re.split('\s+',line)
    category = lnElems[0]
    code = lnElems[1]
    brand = lnElems[2]
    i = 3
    try:
        while not re.match('^.*[a-z].*$',lnElems[i]):
            if re.match('^[a-z].*$',lnElems[i+1]):
                break
            brand += " " + lnElems[i]
            i += 1
    except IndexError:
        brand = lnElems[2]
        i = 3

    debNom = i

    i = -1
    while not re.match('[0-9]{5}[A-Z\-]+',lnElems[i]):
        i -= 1

    zip = lnElems[i][:5]
    city = lnElems[i][5:]
    if re.match('^[0-9]{4}$',lnElems[i+1]):
        price = lnElems[i + 2]
    else:
        price = lnElems[i + 1][4:]
    supermarket = lnElems[i-1]

    i = i - 2
    quantity = ''
    while re.match('^[0-9]+[a-zA-Z]+$',lnElems[i]):
        quantity = lnElems[i] + ' ' + quantity
        i -= 1

    name = ''
    for j in range(debNom, len(lnElems) + i + 1):
        if (re.match('^[0-9]+[a-zA-Z]+$',lnElems[j]) or re.match('^x[0-9]+$',lnElems[j])):
            quantity = lnElems[j] + ' ' + quantity
        else:
            name += " " + lnElems[j]
    name = name[1:]

    output.write("{};{};{};{};{};{};{};{};{};{}\n".format(id, code, brand, name, quantity, price, category, supermarket, city, zip))
    id += 1
output.close()