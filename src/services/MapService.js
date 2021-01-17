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

    getProjects(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetProjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getRoutes(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetRoutes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getVoyages(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetVoyages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getStations(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetStations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getDirections(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetDirections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    sendTaskRequest(params) {
        return fetch("http://apibms.cetur.com.tr/api/sefer/addseferbaslabitirkontrol", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }).then(function (result) {
            return result.json();
        });
    }
}


