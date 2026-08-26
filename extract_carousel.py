with open('gustavo_index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

pos_s = js.find('var s=[{title:')
if pos_s != -1:
    print('Snippet around var s=[:')
    print(js[pos_s:pos_s+4000])
else:
    print('var s=[ not found')
