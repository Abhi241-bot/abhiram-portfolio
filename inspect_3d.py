with open('gustavo_index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

pos = js.find('yR=kn.attributes.position.count')
print('Snippet around terrain animation:')
print(js[pos:pos+2000])
