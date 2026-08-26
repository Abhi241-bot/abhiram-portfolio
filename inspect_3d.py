with open('gustavo_index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

pos = js.find('function Sh(')
print('Snippet around render/camera loop:')
print(js[pos-500:pos+3000])
