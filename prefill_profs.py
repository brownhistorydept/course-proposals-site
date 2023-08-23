from pymongo import MongoClient, collection
from openpyxl import load_workbook

client = MongoClient(MONGODB_URI)
db=client.HistoryDB

u = collection.Collection(db, 'users')

wb = load_workbook('insert excel path here')
ws = wb.active

rows = tuple(ws.rows)
profs = []

for row in rows:
    prof = {
        'displayName': str(row[0].value) if row[0].value != None else '',
        'email': str(row[1].value) if row[1].value != None else '',
        'role': str(row[2].value) if row[2].value != None else ''
    }
    profs.append(prof)

result = u.insert_many(profs)
