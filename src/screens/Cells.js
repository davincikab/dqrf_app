import React from 'react';
import {StyleSheet, FlatList, Animated } from 'react-native';

// 3rd party depenencies
import Icon from 'react-native-vector-icons/FontAwesome';

// active
import Input from '../components/Input';
import Block from '../components/Block';
import Card from '../components/Card';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme, cells } from '../constants';

export default class Cells extends React.Component {
    state = {
        value:'',
        allCells:[],
        cells:[],
        expandedCell:{},
        heightAnim: new Animated.Value(0)
    };



    onSearchCell = (text) => {
        const { allCells } = this.state;

        let cellsFilter = allCells.filter(cell => {
            if(cell.name.toLowerCase().includes(text.toLowerCase())) {
                return cell;
            }
        });

        this.setState({
            value:text,
            cells:cellsFilter
        });
    }

    handleDrawerNavigation = () => {
        // open drawe Navigation
        console.log("Press back");
        this.props.navigation.goBack();
    }

    toggleInfo = (item) => {
        console.log("Press cell");
        const { expandedCell } = this.state;

        if(item.id == expandedCell.id ) {
            this.collapseContainer(0);
            this.setState({
                expandedCell:item
            });          

            return;
        }

        this.setState({
            expandedCell:item
        });

        this.collapseContainer(60);
    }

    collapseContainer = (height) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.heightAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: false
        }).start();
    };

    handleOnCall = (item) => {
        console.log("Calling " + item.name);
    }

    handleEditContact = (item) => {
        this.props.navigation.navigate('EditCells', { cell:item })
    }

    handleCreateContact = () => {
        this.props.navigation.navigate('EditCells')
    }

    handleProfile = () => {
        this.props.navigation.navigate('Profile');
    }

    renderItem = ({item}) => {
        let time = new Date(item.time);
        const { expandedCell, heightAnim } = this.state;
    
        return (
            <Block left style={styles.card} color={theme.colors.white} padding={[0, 5]}>
                <Block style={styles.cardHeader}>
                    <Block center style={{ flexDirection:'row'}}>
                        <Block center style={styles.pictureStyle} color={theme.colors.gray2} flex={false}>
                            <Icon name="user" size={30} color={theme.colors.gray} />
                        </Block>

                        <Typography bold style={styles.cardTitle}>{item.name}</Typography>
                    </Block>
                    
                    <Button onPress={() => this.toggleInfo(item)}>
                        <Icon name="caret-down" size={25} color={theme.colors.primary} />
                    </Button>
                </Block>


                <Block animated middle style={{
                    height: expandedCell.id == item.id ? heightAnim : 0,
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <Button 
                        style={{flex:1, marginLeft:5, height:30}}
                        color={theme.colors.accent} 
                        onPress={() => this.handleOnCall(item)}
                    >
                        <Typography center title white>Call</Typography>
                    </Button>

                    <Button 
                        style={{flex:1, marginLeft:5, height:30}}
                        color={theme.colors.accent} 
                        onPress={() => this.handleEditContact(item)}
                    >
                        <Typography center title white>Edit</Typography>
                    </Button>
                </Block>
               
            </Block>
        )
    }

    componentDidMount() {
        this.setState({
            cells:cells,
            allCells:cells
        });
    }

    render() {
        const { cells, value } = this.state;
        return(
            <Block style={styles.container} >
                <Block center 
                    color={theme.colors.primary} shadow 
                    flex={false} 
                    style={styles.header}
                    padding={[0,10]}
                >
                    <Block flex={0.2}>
                        <Button 
                            color={theme.colors.transparent} 
                            onPress={this.handleDrawerNavigation}
                        >
                            <Icon name="long-arrow-left" size={18} color={theme.colors.white} />
                        </Button>
                    </Block>
                    <Block flex={0.7}>
                        <Typography h2 white>Cells</Typography>
                    </Block>
                    <Button flex={0.1} onPress={this.handleProfile} color={theme.colors.transparent}>
                        <Icon name="user-circle" size={30} color={theme.colors.white} />
                    </Button>
                </Block>
                <Block padding={[0]} shadow={true} flex={0.1}>
                    <Input 
                        placeholder={'Search cells ...'}
                        value={value}
                        style={styles.searchInput}
                        onChangeText={this.onSearchCell}
                    />
                </Block>
                <Block flex={1} >
                    <FlatList 
                        data={cells}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this.renderItem}
                    />
                </Block>

                <Button 
                    style={[styles.circleButton, styles.addButton]} 
                    color={theme.colors.accent}
                    onPress={this.handleCreateContact}
                >
                  <Icon name="plus" size={theme.sizes.base} color={theme.colors.white} />
                </Button>
                
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    card:{
        justifyContent:'flex-start',
        marginVertical:0
    },
    cardHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:0
    },
    cardTitle:{
        marginLeft:10
    },
    pictureStyle:{ 
        borderRadius:20,
        height:40,
        width:40,
        padding:5
    },
    marginLeft:{
        marginLeft:10
    },
    searchInput: {
        backgroundColor:theme.colors.white,
        borderWidth:0,
    },
    // repeated
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
});