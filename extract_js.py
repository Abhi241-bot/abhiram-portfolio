with open('gustavo_index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

pos_eng = js.find('eng:{')
if pos_eng == -1:
    pos_eng = js.find('"eng":{')
if pos_eng == -1:
    pos_eng = js.find('eng:')

print('Snippet around eng:', pos_eng)
print(js[pos_eng:pos_eng+3500])
