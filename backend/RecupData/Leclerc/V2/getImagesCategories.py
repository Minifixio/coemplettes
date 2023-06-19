import re
import html
import requests

code = html.unescape(open("categories.html", "r").read())

codelst = [line for line in code.split("\n") if line !='']

for numLine in range(len(codelst)):
    line = codelst[numLine].replace(" ", "").replace("\t", "")
    if line == '<liclass="famille"><img':
        catID = codelst[numLine + 3].split('rayon-')[1].split('-')[0]
        catUrl = codelst[numLine + 1].split('src="')[1][:-1]
        catIm = requests.get(catUrl, stream=True).content
        with open('dataFolder/imagesCats/' + str(catID) + '.jpg', 'wb') as handler:
            handler.write(catIm)



