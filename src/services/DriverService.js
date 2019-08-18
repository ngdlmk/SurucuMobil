import Host from '../config/host';

export default class DriverService {
    host = new Host();

    getDriverInformation(request) {
        return fetch(this.host.ServiceUrl + 'Driver/GetDriverInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getLicenseInformation(request) {
        return fetch(this.host.ServiceUrl + 'Driver/GetLicenseInformation', {
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