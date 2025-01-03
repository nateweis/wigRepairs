export const search = () => { 
    const newArr = (searchItems, searchVal, searchType) => {
        // console.log(searchItems)
        // console.log(searchVal)
        // console.log(searchType)

        if(searchType == 'none' || !searchType || !searchVal) return searchItems
        var output = [];

        if(searchType == 'id'){
            angular.forEach(searchItems, function(item) {
                if (item.id == searchVal) {
                    output.push(item);
                }
            });
            return output;
        }

        else if(searchType == 'description'){
            angular.forEach(searchItems, function(item) {
                if (item.description.toLowerCase().includes(searchVal.toLowerCase())) {
                    output.push(item);
                }
            });
            return output;
        }

        else if(searchType == 'status'){
            angular.forEach(searchItems, function(item) {
                if (item.status == searchVal) {
                    output.push(item);
                }
            });
            return output;
        }

        else if(searchType == 'received_payment'){
            angular.forEach(searchItems, function(item) {
                if (item.received_payment && searchVal == 'Yes') {
                    output.push(item);
                }
                if (!item.received_payment && searchVal == 'No') {
                    output.push(item);
                }
            });
            return output;
        }
        
        }
        return newArr
 }