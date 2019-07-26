import Host from '../config/host';

export default class MapService {
    host = new Host();

    getCars(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetCars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }
}


