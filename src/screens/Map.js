import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity,
  Image,
  View, 
  KeyboardAvoidingView, Text
} from "react-native";

import MapboxGL from "@react-native-mapbox-gl/maps";

import Icon from 'react-native-vector-icons/FontAwesome';

// data
import * as Amenity from '../assets/data/amenity.json';
import * as Building from '../assets/data/building.json';
import * as Roads from '../assets/data/roads.json';

// components 
import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme } from '../constants';

// utils
import getColorsByAlertType from '../utils/getColors';
import getIconNameByAlertType from '../utils/getIconName';

MapboxGL.setAccessToken("pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA");

const images = {
    'custom-marker':require('../assets/images/icon.png'),
};

const layerStyles = {
    building: {
        fillColor:"#ddd"
    },
    path:{
      lineColor:"#ef9f15",
      lineWidth:2
    }, 
    shortestPath:{
      lineColor:"#febe1d",
      lineWidth:2
    },
    pointSymbol:{
      iconImage:"custom-marker",
      iconSize:0.5
    }
  };

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        // map states
        this.state = {
            threed:true,
            centre:[],
            zoom:18,
            pitch:220,
            sliderValue: 80,
            amenity:null,
            roads:{},
            building:{},
            activeAmenity:null,
            alerts:[],
            activeAlert:null
        }
    }


    onMapPress = (e) => {
        console.log("Map Press");
        this.setState({
            activeAmenity:null
        });
    }

    createPopup = (feature) => {
        console.log(feature);
        // update the popup element
        this.setState({
            activeAmenity:feature
        });
    }

    componentDidMount() {
        this.setState({
            amenity:JSON.parse(JSON.stringify(Amenity)),
            roads:JSON.parse(JSON.stringify(Roads)),
            building:JSON.parse(JSON.stringify(Building)),
        });
    }

    componentWillUnmount() {

    }

    render() {

        const { amenity, roads, building, activeAmenity, activeAlert} = this.state;

        return(
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={-50}
        >
            <Block style={styles.mainView}>
              <MapboxGL.MapView 
                ref={(ref) => (this.map = ref)}
                style={styles.map} 
                onPress={this.onMapPress}
              >
              <MapboxGL.Camera
                zoomLevel={14}
                pitch={0}
                heading={200}
                centerCoordinate={[36.962846352233818, -0.399017834239519]}
              />
                <MapboxGL.Images 
                    images={images}
                />
                {
                    activeAmenity &&
                    <MapboxGL.PointAnnotation
                        id={activeAmenity.properties.name}
                        coordinate={activeAmenity.geometry.coordinates}
                    >
                        <MapboxGL.Callout 
                            title={activeAmenity.properties.name}
                        />
                    </MapboxGL.PointAnnotation>
                }

                {
                    building.type &&
                    <MapboxGL.ShapeSource
                        id="building"
                        shape={building}
                    >
                        <MapboxGL.FillLayer 
                            id="building"
                            style={layerStyles.building}
                        />
                    </MapboxGL.ShapeSource>
                }

                {
                    roads.type &&
                    <MapboxGL.ShapeSource
                        id="roads"
                        shape={roads}
                    >
                        <MapboxGL.LineLayer 
                            id="roads"
                            style={layerStyles.shortestPath}
                        />
                    </MapboxGL.ShapeSource>
                }

                {
                    amenity && 
                    amenity.features.map((amty, index) => (
                        <MapboxGL.PointAnnotation
                            id={index.toString()} 
                            key={index}
                            coordinate={amty.geometry.coordinates}
                        >
                            {/* <View
                                style={styles.markerWrapper}
                            > */}
                                <Image 
                                    // style={styles.marker} 
                                    source={require('../assets/images/icon.png')} 
                                />
                            {/* </View> */}
                            
                            <MapboxGL.Callout title={amty.properties.name} />
                        </MapboxGL.PointAnnotation>
                    ))
                }
              </MapboxGL.MapView>
                <Button 
                    style={[styles.circleButton, styles.addButton]} 
                    color={theme.colors.accent}
                >
                  <Icon name="plus" size={theme.sizes.base} color={theme.colors.white} />
                </Button>

                <Button 
                    style={[styles.circleButton, styles.directionButton]} 
                    color={theme.colors.black}
                    >
                    <Icon name="arrows" size={theme.sizes.base} color={theme.colors.white} />
                </Button>

            {   activeAlert && 
                <AlertModal 
                    username={"David"}
                    alertType={"Crime"}
                    alertSummary={"BLOOD REQUIRED"}
                    alertDescription={"Blood Group A required at "}
                    time={new Date()}
                    location={"Kimathi"}
                    markerCenter={[36.962846352233818, -0.399017834239519]}
                />
            }
            </Block>
        </KeyboardAvoidingView>
        )
    }
}

const AlertModal = (props) => {
    // props
    const { username, alertType, time, location, markerCenter, alertSummary, alertDescription }  = props;

    // colors
    let [darkColor, lightColor] = getColorsByAlertType(alertType);
    let IconName = getIconNameByAlertType(alertType);
 

    return(
        <Block style={styles.alertModalBackground}>
            <Block style={styles.alertModal} middle>
                <Block style={styles.headerTop} shadow={true} color={lightColor} flex={false} middle center>
                    <Icon name={IconName} size={theme.sizes.base * 2} color={theme.colors.white} />
                </Block>

                <Block flex={1} color={lightColor} style={styles.modalBody} margin={[5, 0]}>
                    <Block center flex={0.8} style={{flexDirection:'row'}} padding={[2, 10]}>
                        <Icon name="exclamation-circle" size={theme.sizes.base * 3} color={theme.colors.white} /> 
                        <Typography h3 style={styles.marginLeft} white>
                            <Typography bold white h3>{username}</Typography> Issued a <Typography bold white h3>{alertType}</Typography> alert
                        </Typography>

                        <Typography caption white style={styles.time}>
                            {time.getHours()}:{time.getMinutes()}
                        </Typography>
                    </Block>

                    <Block left color={darkColor} flex={0.3}  padding={[2, 10]}>
                        <Typography bold white>{alertSummary}</Typography>
                        <Typography white>{alertDescription}</Typography>
                    </Block>

                    <Block flex={1}>
                        <MapboxGL.MapView 
                            style={styles.map} 
                        >
                            <MapboxGL.Camera
                                zoomLevel={14}
                                pitch={0}
                                heading={200}
                                centerCoordinate={[36.962846352233818, -0.399017834239519]}
                            />

                            <MapboxGL.MarkerView 
                                coordinate={markerCenter}
                            >
                                <Image 
                                    style={styles.marker} 
                                    source={require('../assets/images/icon.png')} 
                                />
                            </MapboxGL.MarkerView>
                        </MapboxGL.MapView>
                    </Block>

                    <Block left center flex={0.3} 
                        padding={[0, 4]} 
                        style={{ flexDirection:'row'}}  
                        color={ darkColor} 
                    >
                        <Icon name="map-marker" size={18} color={ theme.colors.white} />
                        <Typography white style={styles.marginLeft}>
                            {location}
                        </Typography>
                    </Block>

                    <Block flex={0.4} padding={[10,0]}>
                        <Block style={{ flexDirection:'row'}} center middle>
                            <Button shadow color={darkColor} style={styles.actionButton}>
                                <Icon name="location-arrow" size={18} color={ theme.colors.white}/>
                            </Button>
                            <Button shadow color={darkColor} style={styles.actionButton}>
                                <Icon name="whatsapp" size={18} color={ theme.colors.white}/>
                            </Button>
                        </Block>

                        <Block center >
                            <Button 
                                style={{ ...styles.forwardButton, borderColor:darkColor}}
                            >
                                <Icon name="share" size={10} color={ theme.colors.white}/>
                                <Typography white bold style={styles.marginLeft}>FORWARD ALERT</Typography>
                            </Button>
                        </Block>
                    </Block>

                    <Block flex={0.4} style={{flexDirection:'row'}}>
                        <Button style={{...styles.successButton, backgroundColor:darkColor, borderColor:lightColor}}>
                            <Typography center white>CANNOT HELP</Typography>
                        </Button>
                        <Button style={{...styles.successButton, backgroundColor:darkColor, borderColor:lightColor}}>
                            <Typography center white>HELP</Typography>
                        </Button>
                    </Block>

                </Block>
            </Block>
        </Block>
    )
}


// styles
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#F5FCFF"
      },
    container: {
        flex:1,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1,
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:0,
        position:'absolute',
        zIndex:0
    },
    markerWrapper:{
        backgroundColor:"black",
        height:24,
        width:24,
        zIndex:4
    },
    marker:{
        height:24,
        width:15
    },  
    popup:{
        backgroundColor:'#fff',
        width:150,
        height:25,
        // marginBottom:9
    },
    text:{
        color:'#000',
        fontSize:15
    },
    circleButton:{
        position:'absolute',
        borderRadius:20,
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center'
    },
    addButton:{
        bottom:40,
        right:10,
    },
    directionButton:{
        bottom:90,
        right:10,
    },
    alertModalBackground:{
        position:'absolute',
        backgroundColor:theme.colors.black,
        opacity:1,
        zIndex:2,
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    alertModal:{
        marginVertical:40,
        marginHorizontal:20,
        backgroundColor:'transparent',
    },
    headerTop:{
        height:80,
        width:80,
        borderRadius:40,
        elevation:2,
        top:0,
        left:120
    },
    modalBody:{
        marginTop:-40,
        borderRadius:theme.sizes.radius
    },
    actionButton:{
        height:40,
        width:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:4,
        elevation:1
    },
    marginLeft:{
        marginLeft:10
    },
    forwardButton:{
        height:30,
        paddingHorizontal:4,
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:theme.colors.primary,
        borderWidth:1.5,
        borderRadius:3,
        alignItems:'center'
    },
    successButton:{
        flex:1,
        borderRadius:0,
        borderColor:theme.colors.accent,
        backgroundColor:theme.colors.primary,
        borderWidth:StyleSheet.hairlineWidth,
    },
    time:{
        position:'absolute',
        top:2,
        right:5
    }
});