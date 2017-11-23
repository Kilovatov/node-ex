class DefaultProductsList {
    constructor () {
        return [
            {
                id: 'a001',
                product_name: 'A',
                price: '$1.00',
                reviews: ['Cool!', 'awesome']
            },
            {
                id: 'b101',
                product_name: 'B',
                price: '$1.00',
                reviews: ['Cool!', 'awesome']

            },
            {
                id: 'c100',
                product_name: 'C',
                price: '$100.00',
                reviews: ['Cool!', 'awesome']
            }];
    }
}

module.exports = DefaultProductsList;