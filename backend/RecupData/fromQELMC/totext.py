from PyPDF2 import PdfReader

file = PdfReader("details_202301.pdf")
otpt = open("export.txt", "w")
pages = file.pages

cPs = [' 91120', ' 91940', ' 91300', ' 91140', ' 91190']

for page in pages[816:]:
    text = page.extract_text()
    cdt = False
    for cp in cPs:
        if cp in text:
            cdt = True
            break
    if cdt:
        for line in text.split('\n'):
            for cp in cPs:
                if cp in line:
                    otpt.write(line + '\n')
                    break
otpt.close()
