import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Dimensions, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
    SafeAreaView
} from 'react-navigation';
import Home from "../home/home"
import FloorPlan from "../floorMap/floorPlan"

class NavigationDrawer extends Component {

    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require('../../../assets/images/drawer.png')}
                        style={{width: 25, height: 25, marginLeft: 5}}
                    />
                </TouchableOpacity>
            </View>
        );
    }

}

const Custom_Side_Menu = props => (

            <ScrollView>
                <SafeAreaView style={styles.sideMenuContainer}>

                    <Image source={require("../../../assets/images/route.png")}
                           style={styles.sideMenuProfileIcon}/>

                    <View style={{width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15}}/>

                    <View style={{width: '100%'}}>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>

                            <Image source={require("../../../assets/images/map.png")}
                                   style={styles.sideMenuIcon}/>

                            <Text style={styles.menuText} onPress={() => {
                                props.navigation.navigate('FloorPlan')
                            }}> FloorPlan </Text>

                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>

                            <Image source={require("../../../assets/images/icon.png")}
                                   style={styles.sideMenuIcon}/>

                            <Text style={styles.menuText} onPress={() => {
                                props.navigation.navigate('Home')
                            }}> Home </Text>

                        </View>


                    </View>

                    <View style={{width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15}}/>


                </SafeAreaView>
            </ScrollView>
);

const Home_StackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: 'Home',
            headerLeft: <NavigationDrawer navigationProps={navigation}/>,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
});

const FloorPlan_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    FloorPlan: {
        screen: FloorPlan,
        navigationOptions: ({navigation}) => ({
            title: 'FloorPlan',
            headerLeft: <NavigationDrawer navigationProps={navigation}/>,

            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
});

const DrawerNavigator = createDrawerNavigator({
    //Drawer Optons and indexing
    Screen1: {
        //Title
        screen: Home_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
        },
    },

    Screen2: {
        //Title
        screen: FloorPlan_StackNavigator,
        navigationOptions: {
            drawerLabel: 'FloorPlan',
        },
    },

}, {
    contentComponent: Custom_Side_Menu,
    drawerWidth: Dimensions.get('window').width - 130,
});



const styles = StyleSheet.create({

    MainContainer: {

        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',

    },

    sideMenuContainer: {

        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20
    },

    sideMenuProfileIcon:
        {
            resizeMode: 'center',
            width: 150,
            height: 150,
        },

    sideMenuIcon:
        {
            resizeMode: 'center',
            width: 28,
            height: 28,
            marginRight: 10,
            marginLeft: 20

        },

    menuText: {

        fontSize: 15,
        color: '#222222',

    }

});


export default createAppContainer(DrawerNavigator);