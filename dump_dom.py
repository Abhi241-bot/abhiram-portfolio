import bs4

with open('gustavo_raw.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

soup = bs4.BeautifulSoup(html, 'html.parser')

with open('gustavo_clean_structure.html', 'w', encoding='utf-8') as out:
    out.write(soup.prettify())

print('Written gustavo_clean_structure.html. Length:', len(soup.prettify()))
