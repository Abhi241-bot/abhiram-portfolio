with open('gustavo_raw.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

import bs4

try:
    soup = bs4.BeautifulSoup(html, 'html.parser')
    print('=== HEADER ===')
    header = soup.find('header')
    if header:
        print(header.prettify()[:2000])

    print('=== SECTION HOME ===')
    sec_home = soup.find(id='section-home')
    if sec_home:
        print(sec_home.prettify()[:2000])

    print('=== ABOUT ===')
    sec_about = soup.find(id='about')
    if sec_about:
        print(sec_about.prettify()[:3000])

    print('=== SERVICE ===')
    sec_service = soup.find(id='service')
    if sec_service:
        print(sec_service.prettify()[:3000])

    print('=== PROJECTS ===')
    sec_projects = soup.find(id='projects')
    if sec_projects:
        print(sec_projects.prettify()[:3000])

    print('=== CONTACT ===')
    sec_contact = soup.find(id='contact')
    if sec_contact:
        print(sec_contact.prettify()[:3000])

    print('=== MODALS ===')
    modals = soup.find_all('div', class_=lambda c: c and 'modal' in c)
    for m in modals:
        print(m.prettify()[:1000])

except Exception as e:
    print('Error:', e)
