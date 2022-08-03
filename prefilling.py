from pymongo import MongoClient, collection
from openpyxl import load_workbook

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient(MONGO_URI)
db=client.HistoryDB
c = collection.Collection(db, 'courses')

wb = load_workbook('/Users/carolynzech/Desktop/courses.xlsx')
ws = wb.active

rows = tuple(ws.rows)
courses = []

for row in rows:
    course = {
        'course_number': str(row[0].value) if row[0].value != None else '',
        'course_title': str(row[1].value) if row[1].value != None else '',
        'description': 'Professors: ' + str(row[2].value) if row[2].value != None else '',
        'geography': [str(geo) for geo in row[3].value.split(',')] if row[3].value != None else '',
        'is_premodern': str(row[4].value) == 'P',
        'proposal_status': 'accepted by CCC'
    }
    courses.append(course)

result = c.insert_many(courses)
print(result.inserted_ids)