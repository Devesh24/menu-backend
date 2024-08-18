
<!-- CREATE CATEGORY -->
POST
localhost:5000/api/categories/createCategory
{
    "name": "CategoryOne,
    "description": "Random description",
    "taxApplicability": false
}
{
    "name": "Category2",
    "description": "Random description 2",
    "taxApplicability": true,
    "tax": 123,
    "taxType": "Tax type 1"
}

<!-- GET ALL CATEGORIES -->
GET
localhost:5000/api/categories/getAllCategories

<!-- GET CATEGORY BY ID -->
GET
localhost:5000/api/categories/getCategoryById/66be47fbfe6e16b8cb880a40

<!-- GET CATEGORY BY NAME OR ID -->
GET
localhost:5000/api/categories/getCategoryByNameOrId?name=Category2
localhost:5000/api/categories/getCategoryByNameOrId?id=66be47fbfe6e16b8cb880a40

<!-- EDIT CATEGORY -->
PUT
localhost:5000/api/categories/editCategory/66be47fbfe6e16b8cb880a40
{
    "description": "Random description edited"
}


Since user would not know the id of any category or subcategory, he would provide categoryName or subCategoryName, for creation or updation of subcategory or items
<!-- CREATE SUB CATEGORY -->
POST
localhost:5000/api/subcategories/createSubcategory
{
    "name": "subCategory1",
    "description": "Random description 2",
    "categoryName": "categoryOne"
}
{
    "name": "subCategory12",
    "description": "Random description 2",
    "image": "bajsbcbs",
    "categoryName": "category2"
}

<!-- GET ALL SUB CATEGORIES -->
GET
localhost:5000/api/subcategories/getAllSubcategories

<!-- GET SUB CATEGORIES UNDER A CATEGORY -->
localhost:5000/api/subcategories/getSubcategoriesOfCategory/categoryone


<!-- GET SUB CATEGORY BY NAME OR ID -->
GET
localhost:5000/api/subcategories/getSubcategoryByNameOrId?id=66be561d095fd0bd538e156a
localhost:5000/api/subcategories/getSubcategoryByNameOrId?name=subcategory1

<!-- EDIT SUB CATEGORY -->
PUT
localhost:5000/api/subcategories/editSubcategory/66be561d095fd0bd538e156a
{
    "description": "Random description edited",
    "image": "ahfiofskjl"
}
{
    "name": "subCategory314"
}
{
    "categoryName": "cateGoryone"
}




<!-- CREATE ITEM -->
POST
localhost:5000/api/items/createItem
{
    "name": "ItemOne",
    "description": "Random description 2",
    "taxApplicability": true,
    "tax": 1500,
    "baseAmount": 1000,
    "categoryName": "category2"
}
{
    "name": "Item2",
    "description": "Random description is here",
    "taxApplicability": false,
    "baseAmount": 1000,
    "discount": 50,
    "subcategoryName": "subcategory12"
}
{
    "name": "Item1452",
    "description": "Random description is here",
    "taxApplicability": false,
    "baseAmount": 43566,
    "discount": 50,
    "subcategoryName": "subcategory12",
    "categoryName": "categoryOne"
}

<!-- GET ALL ITEMS -->
GET
localhost:5000/api/items/getAllItems

<!-- GET ITEMS UNDER A CATEGORY -->
localhost:5000/api/items/getItemsOfCategory/categoryOne

<!-- GET ITEMS UNDER A SUB CATEGORY -->
localhost:5000/api/items/getItemsOfSubcategory/subcategory12


<!-- GET ITEM BY NAME OR ID -->
GET
localhost:5000/api/items/getItemByNameOrId?name=itemone
localhost:5000/api/items/getItemByNameOrId?id=66c0e72713068227fce81c8e

<!-- EDIT ITEM -->
PUT
localhost:5000/api/items/editItem/66c0e72713068227fce81c8e
{
    "name": "newItem43editted",
    "taxApplicability": false
}
{
    "categoryName": "categoryOne",
    "baseAmount": 2000
}
{
    "subcategoryName": "subcategory314",
    "discount": 100
}


<!--  SEARCH ITEMS  -->
GET
localhost:5000/api/items/searchItems?name=on
