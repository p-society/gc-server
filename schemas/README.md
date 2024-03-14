## Schema Design

> [!Last Modified - Mar 15 02:00 IST]  
> Going forward, all the bug fixes, feature requests and schema changes will be applied and released from this document.


## User
- **_id** (ObjectId)
- **firstName** (String)
- **lastName** (String)
- **email** (String)
- **password** (String)
- **role** (String)
- **branch** (String)
- **year** (Number)
- **deleted** (Boolean)
- **deletedBy** (ObjectId)
- **deletedAt** (Date)
- **createdAt** (Date)
- **updatedAt** (Date)
- **__v** (Number)


## Player (CRUD by PSA, Player only)

- **_id** (ObjectId)
- **user** (ObjectId)
- **sport** (String)
- **socials** (Object)
- **deleted** (Boolean)
- **deletedBy** (ObjectId)
- **deletedAt** (Date)
- **createdAt** (Date)
- **updatedAt** (Date)
- **__v** (Number)

## Squad (CRUD by PSA only)

- **_id** (ObjectId)
- **name** (String)
- **branch** (String)
- **sport** (String)
- **createdBy** (ObjectId)
- **createdAt** (Date)
- **deleted** (Boolean)
- **deletedBy** (ObjectId)
- **updatedAt** (Date)
- **socials** (Object)
- **description** (String, optional)

## Squad Player (CRUD by PSA only)

- **_id** (ObjectId)
- **user** (ObjectId)
- **player** (ObjectId)
- **squad** (ObjectId)
- **createdAt** (Date)
- **createdBy** (ObjectId)
- **updatedAt** (Date)
- **deleted** (Boolean)
- **deletedBy** (ObjectId)
- **jerseyNumber** (Number, optional)

## Team (CRUD by Admin + PSA)

- **_id** (ObjectId)
- **squad** (ObjectId)
- **sport** (String)
- **branch** (String)
- **createdAt** (Date)
- **updatedAt** (Date)
- **deleted** (Boolean)
- **deleteBy** (ObjectId)
- **updatedAt** (Date)
- **description** (String, optional)

## Team Player (CRUD by PSA + Admin (Bulk insertion allowed))

- **_id** (ObjectId)
- **team** (ObjectId)
- **user** (ObjectId)
- **player** (ObjectId)
- **squad** (ObjectId)
- **position** (String, optional)
- **createdBy** (ObjectId)
- **createdAt** (Date)
- **updatedAt** (Date)
- **deleted** (Boolean)
- **deletedBy** (ObjectId)

## Admins (An admin can only be created, deleted, read by PSA, update delete PSA + Admin)

- **_id** (ObjectId)
- **player** (ObjectId)
- **user** (ObjectId)
- **createdBy** (ObjectId)
- **createdAt** (Date)
- **updatedAt** (Date)
- **deleted** (Boolean)
- **deletedBy** (ObjectId)

## PSA (A PSA can create, update other PSA)

- **_id** (ObjectId)
- **user** (ObjectId,Optional)
- **player** (ObjectId,Optional)

## Match (Created, Deleted by PSA only, Can be updated by Admin + PSA only)

- **team1** (ObjectId)
- **team2** (ObjectId)
- **squad1** (ObjectId)
- **squad2** (ObjectId)
- **assignedAdmin** (ObjectId)
- **venue** (String)
- **date** (Date)
- **status** (String, e.g., scheduled, ongoing, finished)

## Events
- TBD
