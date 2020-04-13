# StudyBuddy REST API Documentation


## User Authentication

### Sign In
- description: sign in/log into an account
- request: `POST api/signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) username of the desired account
      - password: (string) password that matches the corresponding user for auth
- response: 200
    - content-type: `application/json`
    - cookie:
        - token: (string) JSON web token for authentication
    - body: object
        - token: (string) JSON web token for authentication
        - user: (object) contains string of id/username of the signed in account
- response: 500
    - body: internal server error
- response: 404
    - body: username does not exist
- response: 401
    - body: access denied
- response: 400
    - body: username is missing
    - body: password is missing

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"username": "someUser", "password":"somePass"}' 
       -b cookie.txt
       -X POST http://localhost:3000/api/signin/
```

### Sign Up
- description: sign up for an account
- request: `POST /api/signup/`
    - content-type: `application/json`
    - body: object
      - username: (string) username of the desired account
      - password: (string) password that matches the corresponding user for auth
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) id of user that was just created
        - username: (string) username that was just created
- response: 500
    - body: internal server error
- response: 409
    - body: username :username already exists
- response: 400
    - body: username is missing
    - body: password is missing

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"username": "someUser", "password":"somePass"}' 
       -X POST http://localhost:3000/api/signup/
```

### Sign Out
- description: signs out of the logged in account and destroys the session
- request: `GET /api/signout/`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - cookie:
        - token: (string) cleared as no longer logged in
    - body: signout completed
- response: 401
    - body: access denied

``` 
$ curl -b cookie.txt -c cookie.txt http://localhost:3000/api/signout/
```

## Notebook Routes

### Create Notebook
- description: add a notebook to a user's library of notebooks
- request: `POST /api/user/:userId/notebook/create`
    - content-type: `application/json`
    - body: object
      - title: (string) the title of the notebook
      - public: (boolean) an optional private/public flag that is default false
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the notebook id
      - ownerId: (string) the owner of the notebook
      - title: (string) the title of the image
      - collaborators: (array of strings) list of collaborators on the notebook
      - public: (boolean) indicates whether the notebook is public
      - createdAt: (timestamp) timestamp for creation in database
      - updatedAt: (timestamp) timestamp for last updated in database
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
- response: 401
    - body: access denied
- response: 400
    - body: could not create notebook with given parameters

``` 
$ curl -H "Content-Type: application/json"
       -d '{"title": "my new title", "public": true}'
       -F 'title=imageTitle'
       -F 'date=Feb 06 2020 00:00:02 GMT-0500 (Eastern Standard Time)'
       -F 'image_file=@"/Users/name/something.jpg"'
       -b cookie.txt
       -X POST 'http://localhost:3000/api/user/3kjhsdf98jaks/notebook/create'
```

### Get Notebook
- description: get a notebook given an id
- request: `GET /api/user/:userId/notebook/:notebookId`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the notebook id
      - ownerId: (string) the owner of the notebook
      - title: (string) the title of the image
      - collaborators: (array of strings) list of collaborators on the notebook
      - public: (boolean) indicates whether the notebook is public
      - createdAt: (timestamp) timestamp for creation in database
      - updatedAt: (timestamp) timestamp for last updated in database
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
    - body: notebook not found
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -b cookie.txt
       -X GET http://localhost:3000/api/user/3kjhsdf98jaks/notebook
```

### Get List of Notebooks
- description: get a list of notebooks that belong to a given user
- request: `GET /api/user/:userId/notebook/`
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - notebook (object)
      - _id: (string) the notebook id
      - ownerId: (string) the owner of the notebook
      - title: (string) the title of the image
      - collaborators: (array of strings) list of collaborators on the notebook
      - public: (boolean) indicates whether the notebook is public
      - createdAt: (timestamp) timestamp for creation in database
      - updatedAt: (timestamp) timestamp for last updated in database
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -b cookie.txt
       -X GET http://localhost:3000/api/comments/
```

### Delete Notebook
- description: deletes a notebook from a user's library and returns the deleted notebook
- request: `DELETE /api/user/:userId/notebook/:notebookId`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the notebook id
      - ownerId: (string) the owner of the notebook
      - title: (string) the title of the image
      - collaborators: (array of strings) list of collaborators on the notebook
      - public: (boolean) indicates whether the notebook is public
      - createdAt: (timestamp) timestamp for creation in database
      - updatedAt: (timestamp) timestamp for last updated in database
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
    - body: notebook not found
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -b cookie.txt
       -X DELETE http://localhost:3000/api/user/1hsk3jdfhaf/notebook/qowdj0qw9fn3
```

### Update Notebook
- description: updates the properties of a specified notebook
- request: `PATCH /api/user/:userId/notebook/:notebookId`
    - content-type: `application/json`
    - body: object
      - title: (string) the title of the image
      - collaborators: (array of strings) list of collaborators on the notebook
      - public: (boolean) indicates whether the notebook is public
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the notebook id
      - ownerId: (string) the owner of the notebook
      - title: (string) the title of the image
      - collaborators: (array of strings) list of collaborators on the notebook
      - public: (boolean) indicates whether the notebook is public
      - createdAt: (timestamp) timestamp for creation in database
      - updatedAt: (timestamp) timestamp for last updated in database
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
    - body: notebook not found
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"title": "my new title", "collaborators":[], "public": true}'
       -b cookie.txt
       -X PATCH http://localhost:3000/api/user/1hsk3jdfhaf/notebook/qowdj0qw9fn3
```

## Subject Routes

### Create Subject
- description: add a subject to a user's notebook
- request: `POST /api/user/:userId/notebook/:notebookId/subject/create`
    - content-type: `application/json`
    - body: object
      - notebookId: (string) the id of the notebook the subject is linked it
      - title: (string) the title of the subject
      - order: (number) the order the subject will be displayed
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the notebook id
      - title: (string) the title of the image
      - order: (number) the order the subject will be displayed in
- response: 400
    - body: subject could not be created
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"notebookId": "someid", "title": "some title", order: 0}' 
       -X POST http://localhost:3000/api/user/someuserid/notebook/somenotebookid/subject/create
```

### Get Subject
- description: retrieve a subject inside the user's notebook
- request: `GET /api/user/:userId/notebook/:notebookId/subject/:subjectId`   
- response: 200
    - content-type: `application/json`
    - body: A Subject object
      - _id: (string) the subject id
      - title: (string) the subject title
      - order: (number) the order the subject is displayed
- response: 500
    - body: internal server error
- response: 401
    - body: access denied
 
``` 
$ curl http://localhost:3000/api/user/someuserid/notebook/somenotebookid/subject/somesubjectid
``` 

### Get List of Subjects
- description: retrieve a list of all subjects in a notebook
- request: `GET /api/user/:userId/notebook/:notebookId/subject/`   
- response: 200
    - content-type: `application/json`
    - body: A list of objects
      - _id: (string) the subject id
      - title: (string) the subject title
      - order: (number) the order the subject is displayed
- response: 500
    - body: internal server error
- response: 401
    - body: access denied
 
``` 
$ curl http://localhost:3000/api/user/someuserid/notebook/somenotebookid/subject/
``` 

### Delete Subject
- description: remove a subject from a user's notebook
- request: `DELETE /api/user/:userId/notebook/:notebookId/subject/:subjectId`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: the deleted subject object
      - _id: (string) the notebook id
      - title: (string) the title of the image
      - order: (number) the order the subject will be displayed in
- response: 400
    - body: subject could not be deleted
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"notebookId": "someid", "title": "some title", order: 0}' 
       -X DELETE http://localhost:3000/api/user/someuserid/notebook/somenotebookid/subject/somesubjectid
```

### Update Subject
- description: Modify a subject in a user's notebook
- request: `PATCH /api/user/:userId/notebook/:notebookId/subject/:subjectId`
    - content-type: `application/json`
    - body: object
      - notebookId: (string) the id of the notebook the subject is linked it
      - title: (string) the title of the subject
      - order: (number) the order the subject will be displayed
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the notebook id
      - title: (string) the title of the image
      - order: (number) the order the subject will be displayed in
- response: 400
    - body: subject could not be created
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"notebookId": "someid", "title": "some title", order: 0}' 
       -X PATCH http://localhost:3000/api/user/someuserid/notebook/somenotebookid/subject/somesubjectid
```

### Update Subject Order
- description: Modify the order of the subjects in a user's notebook
- request: `PATCH /api/user/:userId/notebook/:notebookId/subject/:subjectId`
    - content-type: `application/json`
    - body: object containing a subject
      - notebookId: (string) the id of the notebook the subject is linked it
      - title: (string) the title of the subject
      - order: (number) the order the subject will be displayed
- response: 200
    - content-type: `application/json`
    - body: object containing a subject
      - _id: (string) the notebook id
      - title: (string) the title of the image
      - order: (number) the order the subject will be displayed in
- response: 400
    - body: subject could not be created
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"notebookId": "someid", "title": "some title", order: 0}' 
       -X PATCH http://localhost:3000/api/user/someuserid/notebook/somenotebookid/subject/somesubjectid/order
```

## Page Routes

### Create Page
- description: add a page to a user's notebook in a certain subject
- request: `POST /api/user/:userId/page/create`
    - content-type: `application/json`
    - body: object containing a page
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
      - public: (boolean) Flag to determine if the page is publically available
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the created page id
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 400
    - body: page could not be created
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{"ownerId": "someid", "ownerName": "some name", notebookId: "someid", subjectId: "someid", rawTitle: "sometitle", richTitle: "sometitle", notes: [], order: 0}' 
       -X POST http://localhost:3000/api/user/someuserid/page/create
```


### Create Page Tags Using NLP
- description: Add a page to user's given notebook's subject after scanning/converting the image using OCR
- request: `POST /api/user/:userId/page/:pageId/nlptags`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: (array of strings) array containing the categories/tags that the google nlp api assigned to the page contents
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
- response: 401
    - body: access denied
- response: 400
    - body: could not create page with given parameters

``` 
$ curl -H "Content-Type: application/json"
       -b cookie.txt
       -X POST 'http://localhost:3000/api/user/askdh3jkafk/page/sdk49htdf3f/nlptags'
```

### Create Page Using OCR
- description: Add a page to user's given notebook's subject after scanning/converting the image using OCR
- request: `POST /api/user/:userId/page/ocr`
    - content-type: `multipart/form-data`
    - body: object
      - file: (file) image of a note to be scanned
      - notebookId: (string) id of a notebook
      - subjectId: (string) id of a subject
- response: 200
    - content-type: `application/json`
    body: object containing a page
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
      - public: (boolean) Flag to determine if the page is publically available
- response: 500
    - body: internal server error
- response: 404
    - body: user does not exist
- response: 401
    - body: access denied
- response: 400
    - body: could not create page with given parameters

``` 
$ curl -H "Content-Type: application/json"
       -F 'notebookId=iasl23m5s0kf'
       -F 'subjectId=vo23m0sdgu3n'
       -F 'file=@"/Users/name/test.jpg"'
       -b cookie.txt
       -X POST 'http://localhost:3000/api/user/sa6jd1ofiwq/page/ocr'
```

### Get Page
- description: retrieve a page
- request: `GET /api/user/:userId/notebook/:notebookId/subject/:subjectId`   
- response: 200
    - content-type: `application/json`
    - body: A Page object
      - _id: (string) the page id
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 500
    - body: internal server error
- response: 401
    - body: access denied
 
``` 
$ curl http://localhost:3000/api/user/someuser/page/somepage
``` 

### Get List of Pages from Notebook
- description: retrieve all pages in a given notebook in a given subject
- request: `GET /api/user/:userId/notebook/:notebookId/subject/:subjectId`   
- response: 200
    - content-type: `application/json`
    - body: A list of objects
      - _id: (string) the page id
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 500
    - body: internal server error
- response: 401
    - body: access denied
 
``` 
$ curl http://localhost:3000/api/user/someuser/notebook/somenotebookid/subject/someid/page
``` 

### Search Public Pages
- description: retrieve all public pages that contain a certain phrase or tag
- request: `GET /api/user/:userId/search/page/[?limit=10&page=0&key=somesearch]`
- response: 200
    - content-type: application/json
    - body: A list of objects
      - _id: (string) the page id
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 500
    - body: internal server error
- response: 401
    - body: access denied
 
 
$ curl http://localhost:3000/api/user/someuser/search/page?key="somesearch"

### Delete Page
- description: remove a page from a user's notebook in a given subject
- request: `DELETE /api/user/:userId/page/:pageId`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: the deleted page object
      - _id: (string) the deleted page id
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 400
    - body: page could not be deleted
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -X DELETE http://localhost:3000/api/user/someuser/page/somepage
```

### Update Page
- description: Modify a page in a user's notebook in a given subject
- request: `PATCH /api/user/:userId/notebook/:notebookId/subject/:subjectId`
    - content-type: `application/json`
    - body: object (any of the following)
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 200
    - content-type: `application/json`
    - body: the updated page object
      - _id: (string) the page id
      - ownerId: (string) The id of the notebook owner
      - ownerName: (string) The name of the notebook owner
      - notebookId: (string) the id of the notebook the page will go in
      - subjectId: (string) the id of the subject the page will go in
      - rawTitle: (string) the title of the page in raw text
      - richTitle: (string) the title of the page formatted
      - collaborators: (list of strings) the users that have access to this page
      - tags: (list of strings) the tags that belong to a page
      - notes: (list of objects)
        - richText: (string) a note with formatted text
        - rawText: (string) a note with unformatted text
        - xPosition: (number) the position of the note's x coordinate
        - yPosition: (number) the position of the note's y coordinate
      - order: (number) the order the page will be displayed in
- response: 400
    - body: subject could not be created
- response: 500
    - body: internal server error
- response: 401
    - body: access denied

``` 
$ curl -H "Content-Type: application/json" 
       -d '{order: 0}' 
       -X PATCH http://localhost:3000/api/user/someuser/page/somepage
```
