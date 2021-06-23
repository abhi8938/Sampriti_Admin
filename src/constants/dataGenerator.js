export default class DataGenerator {

    userForm = () => {
        //return an array with userInput form
        const baseData = ['fullName', 'contactNumber', 'email', 'password', 'location', 'role']
        const inputData = [];
        baseData.map((el, index) => {
            const dataFormat = {
                id: index,
                value: '',
                title: el === 'location' ? 'address' : el,
                placeholder: `Enter ${el}`,
                disable: false,
                key: el
            }
            inputData.push(dataFormat)
        })
        return inputData
    }
    orderForm = () => {
        //return an array with userInput form
        const baseData = ["customerName",
            "contact",
            "email",
            "customer",
            "location",
            "items",
            "totalCost",
            "offer",
            "discount",
            "finalCost",
            "orderRating",
            "status",
            "paymentStatus",
            "paymentType",
            "timeAssigned",
            "timeDelivered",
            "deliveryBoy",
            "deliveryId"]
        const inputData = [];
        baseData.map((el, index) => {
            const dataFormat = {
                id: index,
                value: '',
                title: el,
                placeholder: `Enter ${el}`,
                disable: false,
                key: el
            }
            inputData.push(dataFormat)
        })
        return inputData
    }
    productForm = () => {
        //return an array with productInput form
        const baseData = ['name', 'manufacturer', 'description', 'features', 'otherNames', 'life', 'rating', 'category', 'subCategory','subCategoryItem', "taxable", "variants"]
        const inputData = [];
        baseData.map((el, index) => {
            const dataFormat = {
                id: index,
                value: '',
                title: el,
                placeholder: `ENTER ${el.toUpperCase()}`,
                disable: false,
                key: el
            }
            inputData.push(dataFormat)
        })
        return inputData
    }
    goryForm = () => {
        //return an array with categoryInput form
        const baseData = ['parent', 'name']
        const inputData = [];
        baseData.map((el, index) => {
            const dataFormat = {
                id: index,
                value: '',
                title: el,
                placeholder: `Enter ${el}`,
                disable: false,
                key: el
            }
            inputData.push(dataFormat)
        })
        return inputData
    }
    listHeaders = (key) => {
        switch (key) {
            case 'Gories':
                return ['Index','Name','Parent', 'Delete' ]
            case 'Banners':
                return ['Index','Name','Image']
        }
    }
    storeForm = () => {
        //return an array with categoryInput form
        const baseData = ['name', 'address', 'rating','status','onDuty','totalStock','totalSales','totalRefunds','products','employees']
        const inputData = [];
        baseData.map((el, index) => {
            const dataFormat = {
                id: index,
                value: '',
                title: el,
                placeholder: `Enter ${el}`,
                disable: false,
                key: el
            }
            inputData.push(dataFormat)
        })
        return inputData
    }
    bannerForm = () => {
        //return an array with categoryInput form
        const baseData = ['name', 'banner']
        const inputData = [];
        baseData.map((el, index) => {
            const dataFormat = {
                id: index,
                value: '',
                title: el,
                placeholder: `Enter ${el}`,
                disable: false,
                key: el
            }
            inputData.push(dataFormat)
        })
        return inputData
    }


}
