import bson
from pymongo import MongoClient, collection
from openpyxl import load_workbook

client = MongoClient(MONGI_URI)
db=client.HistoryDB
c = collection.Collection(db, 'courses')
u = collection.Collection(db, 'users')

wb = load_workbook('path')
ws = wb.active

rows = tuple(ws.rows)
courses = []

c.delete_many({})

def get_profs(row):
    if row[2].value:
        prof_names = str(row[2].value).split(',')
        prof_ids = []
        for name in prof_names:
            prof_obj = u.find_one({'displayName': name})
            if prof_obj:
                prof_id = bson.objectid.ObjectId(str(prof_obj['_id']))
                prof_ids.append(prof_id)
            else:
                print('No prof found for ' + name)

    return prof_ids


for row in rows:
    prof_ids = get_profs(row)
    course = {
        'course_number': str(row[0].value) if row[0].value != None else '',
        'course_title': str(row[1].value) if row[1].value != None else '',
        'professors': prof_ids,
        'geography': [str(geo) for geo in row[3].value.split(',')] if row[3].value != None else '',
        'is_premodern': str(row[4].value) == 'P',
        'proposal_status': 'accepted by CCC',
        'levels': ['Undergraduate']
    }
    courses.append(course)

result = c.insert_many(courses)