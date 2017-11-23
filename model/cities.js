class DefaultCitiesList {
    constructor () {
        return [
            {
                id: '1',
                name: 'Brest',
                country: 'Belarus',
                capital: false,
                location: {
                    lat: 52.097621,
                    long: 23.734050
                }
            },
            {
                id: '2',
                name: 'Minsk',
                country: 'Belarus',
                capital: true,
                location: {
                    lat: 50.097621,
                    long: 22.734050
                }
            },
            {
                id: '3',
                name: 'Samara',
                country: 'Russia',
                capital: false,
                location: {
                    lat: 55.097621,
                    long: 40.734050
                }
            },
            {
                id: '4',
                name: 'Mogadishu',
                country: 'Somalia',
                capital: true,
                location: {
                    lat: 2.922597,
                    long: 38.286411
                }
            }];
    }
}

module.exports = DefaultCitiesList;