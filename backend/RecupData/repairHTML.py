import html
import os

fileList = os.listdir('Leclerc/obsolete/data/')

for file in fileList:
    fileR = open('Leclerc/data/{}'.format(file), 'r').read()
    fileW = open('Leclerc/data/{}'.format(file), 'w')
    fileW.write(html.unescape(fileR))
    fileW.close()





