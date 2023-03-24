list = [elem.split(';') for elem in open("export.csv","r").read().split("\n")][:-1]
listExport = []
exportFitlered = open("exportFiltered.csv", "w")

listExport.append(list[0])

for it in range(1,len(list)-1):
    if list[it][1]==list[it+1][1]:
        listExport.append(list[it])
        listExport.append(list[it+1])

for elem in listExport:
    exportFitlered.write(";".join(elem)+"\n")

exportFitlered.close()