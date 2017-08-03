export function calculateUnit(unitType) {
    console.log(unitType);
    switch (unitType) {
        case 'fix':
            return '人名額';
        
        case 'count':
            return '件';
        
        case 'day':
            return '天';
        
        case 'month':
            return '月';
        
        default:
            return '件';
    }
    

}