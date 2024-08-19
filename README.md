# GITHUB REPO LINK: 
https://github.com/Devesh24/menu-backend

# LIVE LINK:
https://menu-backend-eight.vercel.app

# LOOM VIDEO LINK
https://www.loom.com/share/95a0a4c6fb904afa8ec95a2eedbaad17

# TO TEST THE APPLICATION LOCALLY:
Use postman to test the api endpoints
All the endpoints of the api are given below along with their body and request method.
<IMPORTANT>: The body is given and to be written in body section of postman: 'body -> raw -> JSON'


- CREATE CATEGORY -->
METHOD: POST
ENDPOINT: https://menu-backend-eight.vercel.app/api/categories/createCategory
BODY1: {
        "name": "CategoryThree,
        "description": "Random description",
        "taxApplicability": false
    }
BODY2: {
        "name": "Category45",
        "description": "Random description written",
        "taxApplicability": true,
        "tax": 123,
        "taxType": "Tax type 4"
    }

- GET ALL CATEGORIES -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/categories/getAllCategories

- GET CATEGORY BY ID -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/categories/getCategoryById/66be47fbfe6e16b8cb880a40

- GET CATEGORY BY NAME OR ID -->
METHOD: GET
ENDPOINT1: https://menu-backend-eight.vercel.app/api/categories/getCategoryByNameOrId?name=Category2
ENDPOINT2: https://menu-backend-eight.vercel.app/api/categories/getCategoryByNameOrId?id=66be47fbfe6e16b8cb880a40

- EDIT CATEGORY -->
METHOD: PUT
ENDPOINT: https://menu-backend-eight.vercel.app/api/categories/editCategory/66be47fbfe6e16b8cb880a40
BODY: {
        "description": "Random description edited again"
    }


<IMPORTANT>: Since user would not know the id of any category or subcategory, he would provide categoryName or subcategoryName, for creation or updation of subcategory or items


- CREATE SUB CATEGORY -->
METHOD: POST
ENDPOINT: https://menu-backend-eight.vercel.app/api/subcategories/createSubcategory
BODY1: {
        "name": "subCategory5",
        "description": "Random description 2",
        "categoryName": "categoryOne"
    }
BODY2: {
        "name": "subCategorysix",
        "description": "Random description hello",
        "image": "nnslkvlks",
        "categoryName": "category2"
    }

- GET ALL SUB CATEGORIES -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/subcategories/getAllSubcategories

- GET SUB CATEGORIES UNDER A CATEGORY -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/subcategories/getSubcategoriesOfCategory/categoryone

- GET SUB CATEGORY BY NAME OR ID -->
METHOD: GET
ENDPOINT1: https://menu-backend-eight.vercel.app/api/subcategories/getSubcategoryByNameOrId?id=66be561d095fd0bd538e156a
ENDPOINT2: https://menu-backend-eight.vercel.app/api/subcategories/getSubcategoryByNameOrId?name=subcategory1

- EDIT SUB CATEGORY -->
METHOD: PUT
ENDPOINT: https://menu-backend-eight.vercel.app/api/subcategories/editSubcategory/66be561d095fd0bd538e156a
BODY1: {
        "description": "Random description edited hello",
        "image": "hjhkbjh"
    }
BODY2: {
        "name": "subCategory1254eight"
    }
BODY3: {
        "categoryName": "cateGory2"
    }



- CREATE ITEM -->
METHOD: POST
ENDPOINT: https://menu-backend-eight.vercel.app/api/items/createItem
BODY1: {
        "name": "ItemTen",
        "description": "Random description 2",
        "taxApplicability": true,
        "tax": 1500,
        "baseAmount": 1000,
        "categoryName": "category2"
    }
BODY2: {
        "name": "Item11",
        "description": "Random description is here",
        "taxApplicability": false,
        "baseAmount": 1000,
        "discount": 50,
        "subcategoryName": "subcategory12"
    }
BODY3: {
        "name": "Item12",
        "description": "Random description is here again",
        "taxApplicability": false,
        "baseAmount": 43566,
        "discount": 50,
        "subcategoryName": "subcategory12",
        "categoryName": "categoryOne"
    }

- GET ALL ITEMS -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/items/getAllItems

- GET ITEMS UNDER A CATEGORY -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/items/getItemsOfCategory/categoryOne

- GET ITEMS UNDER A SUB CATEGORY -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/items/getItemsOfSubcategory/subcategory12

- GET ITEM BY NAME OR ID -->
METHOD: GET
ENDPOINT1: https://menu-backend-eight.vercel.app/api/items/getItemByNameOrId?name=itemone
ENDPOINT2: https://menu-backend-eight.vercel.app/api/items/getItemByNameOrId?id=66c0e72713068227fce81c8e

- EDIT ITEM -->
METHOD: PUT
ENDPOINT: https://menu-backend-eight.vercel.app/api/items/editItem/66c0e7e1cb8e33b8c2d22ab6
BODY1: {
        "name": "newItem89",
        "taxApplicability": true,
        "tax": 1234
    }
BODY2: {
        "categoryName": "categoryOne",
        "baseAmount": 2000
    }
BODY3: {
        "subcategoryName": "subcategory314",
        "discount": 100
    }

-  SEARCH ITEMS  -->
METHOD: GET
ENDPOINT: https://menu-backend-eight.vercel.app/api/items/searchItems?name=on



# Which database you have chosen and why?
I have chosen MongoDB because it is well-suited for managing hierarchical data like categories, subcategories, and items. Its document-based structure allows for flexible data modeling, which is perfect for the nested relationships in a menu system. Additionally, MongoDB integrates smoothly with Node.js, offers efficient querying, and is easy to scale, making it an ideal choice for this project.

# 3 things that you learned from this assignment?
-> I learned how to effectively model and manage hierarchical relationships, such as categories, subcategories, and items, using a document-oriented database like MongoDB.
-> I gained experience in designing and implementing RESTful APIs for creating, retrieving, updating, and searching through different levels of a menu system.
-> I learned how to use Postman for testing APIs, which helped me ensure that all endpoints were functioning correctly and that the data flow between the server and the client was smooth.

# What was the most difficult part of the assignment?
The most difficult part of the assignment was managing the relationships between categories, subcategories, and items. Ensuring that each entity was correctly linked and updating or retrieving nested data accurately required careful planning and implementation. 

# What you would have done differently given more time?
Given more time, I would have focused on implementing more advanced features like pagination and filtering for the GET requests to handle large datasets efficiently. I would also consider adding authentication and authorization to secure the API endpoints.