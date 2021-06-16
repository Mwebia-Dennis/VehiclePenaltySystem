import { otherFields } from './constants'


export const handleUpdateData = (data)=> {
    let formattedData = {}
    for (const header in data) {

            

        if(header != 'id' && header != 'added_by' && header != 'created_at' && header != 'updated_at') {
            formattedData[header] = data[header]
        }

        
    }

    return formattedData


}


export const formatDate = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
}

export function formatUrlName(name) {

    //used to remove slashes ( '/' ) incase menu name has a slash character eg(debit/receipt)
    const nameParts = name.split("/")
    if(nameParts.length > 0) {
        return nameParts.join('___')
    }
    return name

}


export const getPlaceHolderName  = (header, data) => {
    
    for(const item of data ){
        if(item.name.trim().toLowerCase() == header.trim().toLowerCase()) {
            return item.placeholder.toUpperCase()
        }

    }

    //if it doesnt exist in existing fields check if it exists in other input data
    for(const item of otherFields ){
        if(item.name.trim().toLowerCase() == header.trim().toLowerCase()) {
            return item.placeholder.toUpperCase()
        }

    }



    return header
}