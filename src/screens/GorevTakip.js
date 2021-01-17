import React, { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, ScrollView, AsyncStorage, Modal, Button, Alert, ActivityIndicator } from "react-native"
import { Dropdown } from "react-native-material-dropdown-v2";
import { GetCarsModel, GetProjectsModel } from '../models';
import { MapService } from '../services';
import { Icon } from "native-base";
import * as Location from "expo-location";

const StorageKeys = require('../data/StorageKeys.json');
const GorevTakip = () => {
    const [showIndicator, setShowIndicator] = useState(false)
    const [storedData, setStoredData] = useState(null)
    const [modalStatus, setModalStatus] = useState(false)
    const [cars, setCars] = useState([])
    const [projects, setProjects] = useState([])
    const [routes, setRoutes] = useState([])
    const [selectedDirection, setSelectedDirection] = useState("Yön Seçiniz")
    const [selectedCar, setSeletectedCar] = useState({ Plate: "Araç seçiniz" })
    const [selectedProject, setSelectedProject] = useState({ ProjectName: "Proje Seçiniz" })
    const [selectedRoute, setSelectedRoute] = useState({ RouteName: "Güzergah Seçiniz" })
    const [personId, setPersonId] = useState(null)
    const [x, setX] = useState(null)
    const [y, setY] = useState(null)
    const [startTime, setStartTime] = useState("-")
    const mapService = new MapService();
    const getCars = (personId) => {
        var model = new GetCarsModel();
        model.PersonId = personId;
        mapService.getCars(model).then(responseJson => {
            if (!responseJson.IsSuccess) {
                return;
            }
            setCars(responseJson.Data.Cars)
        }).catch((error) => {
            console.log(error);
        });
    }

    const getProjects = (carId) => {
        const model = new GetProjectsModel()
        model.carId = carId
        mapService.getProjects(model).then(res => {
            if (res.Data?.Projects) {
                setProjects(res.Data.Projects)
            }
        })
    }

    const getRoutes = (carId, projectId) => {
        const params = {
            carId: carId,
            projectId: projectId
        }
        mapService.getRoutes(params).then(res => {
            if (res.Data?.Routes) {
                setRoutes(res.Data.Routes)
            }
        })
    }

    const getCurrentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Lokosyon izni verilmedi!');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const x = location.coords.latitude
        const y = location.coords.longitude
        return { x, y }
    }
    /* const getVoyages = (routeId) => {
        const params  = {
            carId: selectedCar.CarId,
            projectId: selectedProject.ProjectId,
            routeId: routeId
        }

        mapService.getVoyages(params).then(res => {
            console.log(res)
        })
    } */
    const getStoredData = async () => {
        const data = await AsyncStorage.getItem("mission-info")
        if (data) {
            const pData = JSON.parse(data)
            setSeletectedCar(pData.Plaka)
            setSelectedProject(pData.Proje)
            setSelectedRoute(pData.Guzergah)
            setStartTime(pData.Baslangic)
            setStoredData(pData)
        }
    }
    useEffect(() => {
        console.log("stored data", storedData)
        console.log("car", selectedCar)
        console.log("project", selectedProject)
        console.log("route", selectedRoute)
        console.log("direction", selectedDirection)
    })
    useEffect(() => {
        //AsyncStorage.removeItem("mission-info")
        getStoredData()
        getCurrentLocation()
        AsyncStorage.getItem(StorageKeys.UserDetailKey)
            .then(value => {
                const parsedUserDetail = JSON.parse(value);
                setPersonId(parsedUserDetail["UserDetail"]["PersonId"])
                getCars(parsedUserDetail["UserDetail"]["PersonId"]);
            })
    }, [])
    let yonler = [{
        value: 'İşe',
    }, {
        value: 'Eve',
    }];
    const plateItems = []
    const projectItems = []
    const routeItems = []
    cars.forEach(car => {
        const item = { value: car.Plate }
        plateItems.push(item)
    })
    projects.forEach(project => {
        const item = { value: project.ProjectName }
        projectItems.push(item)
    })
    routes.forEach(route => {
        const item = { value: route.RouteName }
        routeItems.push(item)
    })
    const handlePlate = (plate) => {
        const car = cars.find(car => car.Plate === plate)
        setSeletectedCar(car)
        getProjects(car.CarId)
    }
    const handleProject = (name) => {
        const project = projects.find(project => project.ProjectName === name)
        setSelectedProject(project)
        getRoutes(selectedCar.CarId, project.ProjectId)
    }
    const handleRoute = (routeName) => {
        const route = routes.find(route => route.RouteName === routeName)
        setSelectedRoute(route)
    }
    const handleYon = (yon) => {
        setSelectedDirection(yon)
    }

    const getHourMinute = () => {
        const date = new Date()
        const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        const hourMinute = hour + ':' + minute
        return hourMinute
    }

    const confirmAction = (code) => {
        let message = ""
        switch (code) {
            case 1:
                message = "Görev başlatılsın mı?"
                break;
            case 2:
                message = "Görev tamamlandı mı?"
                break;
            case 3:
                message = "Göreve yetişemedin mi?"
                break;
            case 4:
                message = "Görev iptal edilsin mi?"
                break;
            default:
                break;
        }
        Alert.alert(null, message, [
            {
                text: "Evet",
                onPress: () => {
                    handleTask(code)
                }
            },
            {
                text: "Hayır",
                onPress: () => {
                    console.log("yeahh")
                }
            }
        ])
    }
    const handleTask = async (code) => {
        setShowIndicator(true)
        const coords = await getCurrentLocation()
        const params = {
            PersonId: storedData ? storedData.PersonId : personId,
            GuzergahId: storedData ? storedData.Guzergah.RouteId : selectedRoute.RouteId,
            YonId: storedData ? storedData.Yon === "İşe" ? 0 : 1 : selectedDirection === 'İşe' ? 0 : 1,
            Plaka: storedData ? storedData.Plaka : selectedCar.Plate,
            AracId: storedData ? storedData.AracId : selectedCar.CarId,
            CoordinateX: coords.x,
            CoordinateY: coords.y,
            Address: "",
            ProcessDate: new Date(),
            StatusCode: code
        }

        if (code === 1) {
            const cData = { ...params }
            cData.Proje = selectedProject
            cData.Guzergah = selectedRoute
            cData.Yon = selectedDirection
            cData.Baslangic = getHourMinute()
            setStoredData(cData)
            const storeParams = JSON.stringify(cData)
            AsyncStorage.setItem("mission-info", storeParams)
        } else {
            setStoredData(null)
            setStartTime("-")
            setSeletectedCar({ Plate: "Araç seçiniz" })
            setSelectedDirection("Yön Seçiniz")
            setSelectedProject({ ProjectName: "Proje Seçiniz" })
            setSelectedRoute({ RouteName: "Güzergah Seçiniz" })
            AsyncStorage.removeItem("mission-info")
        }
        mapService.sendTaskRequest(params).then(res => {
            setShowIndicator(false)
            setModalStatus(false)
        }).catch(err => {
            alert("işlem sırasında bir hata oluştu!")
        })
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Modal
                visible={modalStatus}
                animationType="slide"
            >
                {showIndicator ? <View style={{ width: '100%', height: '100%', zIndex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: 100, width: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: '#4983B7', borderWidth: 2 }}>
                        <ActivityIndicator size="large" color="#4983B7" />
                    </View>
                </View> : null}
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ height: 30 }}></View>
                    <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
                        <TouchableOpacity onPress={() => setModalStatus(false)} style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="close" style={{ color: "white", fontSize: 32 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.7, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: "600", textAlign: 'center', marginBottom: 20 }}>GÖREV BİLGİLERİ</Text>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Plaka</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400" }}>: {storedData ? storedData.Plaka : selectedCar?.Plate}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Proje</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400" }}>: {storedData ? storedData.Proje.ProjectName : selectedProject?.ProjectName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Güzergah</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400" }}>: {storedData ? storedData.Guzergah.RouteName : selectedRoute?.RouteName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Yön</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400" }}>: {storedData ? storedData.Yon : selectedDirection}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Başlangıç</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400" }}>: {startTime}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Bitiş</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 17, fontWeight: "400" }}>: {getHourMinute()}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => confirmAction(storedData?.StatusCode === 1 ? 2 : 1)}
                            style={{ width: '80%', height: 48, borderRadius: 7, backgroundColor: storedData?.StatusCode === 1 ? 'brown' : 'green', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', textAlign: 'center' }}>{storedData?.StatusCode === 1 ? "Bitir" : "Başlat"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={storedData ? false : true}
                            onPress={() => confirmAction(3)}
                            style={{ opacity: storedData ? 1 : 0.3, width: '80%', height: 48, borderRadius: 7, backgroundColor: 'orange', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', textAlign: 'center' }}>Yetişemedim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={storedData ? false : true}
                            onPress={() => confirmAction(4)}
                            style={{ opacity: storedData ? 1 : 0.3, width: '80%', height: 48, borderRadius: 7, backgroundColor: 'red', justifyContent: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', textAlign: 'center' }}>Görev İptal</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
            <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image style={{ height: 100, width: 200 }} resizeMode="contain" source={require('../../assets/bmsLoginLogo.png')} />
            </View>
            <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
                <Dropdown
                    value={storedData?.Plaka ? storedData?.Plaka : selectedCar?.Plate}
                    disabled={storedData ? true : false}
                    label="Plaka"
                    data={plateItems}
                    onChangeText={handlePlate}
                />
                <Dropdown
                    value={storedData?.Proje ? storedData?.Proje.ProjectName : selectedProject?.ProjectName}
                    disabled={storedData ? true : false}
                    label="Proje"
                    data={projectItems}
                    onChangeText={handleProject}
                />
                <Dropdown
                    value={storedData?.Guzergah ? storedData?.Guzergah.RouteName : selectedRoute?.RouteName}
                    disabled={storedData ? true : false}
                    label="Güzergah"
                    data={routeItems}
                    onChangeText={handleRoute}
                />
                <Dropdown
                    value={storedData?.Yon ? storedData?.Yon : selectedDirection}
                    disabled={storedData ? true : false}
                    label="Yön"
                    data={yonler}
                    onChangeText={handleYon}
                />
                <TouchableOpacity
                    onPress={() => {
                        setModalStatus(true)
                        if (startTime === '-')
                            setStartTime(getHourMinute())
                    }}
                    style={{ width: '80%', height: 48, borderRadius: 7, backgroundColor: '#4983B7', justifyContent: 'center', alignSelf: 'center', marginTop: 32 }}>
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', textAlign: 'center' }}>Getir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default GorevTakip