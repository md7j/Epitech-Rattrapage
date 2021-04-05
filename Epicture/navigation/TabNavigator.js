import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import GalerieScreen from '../screens/GalerieScreen'
import ImagesScreen from '../screens/ImagesScreen'
import FavorisScreen from '../screens/FavorisScreen'
import ProfilScreen from '../screens/ProfilScreen'

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const userToken = JSON.parse(route.params.userToken)
  return (
    <Tab.Navigator
      initialRouteName="Galerie"
      tabBarOptions={{
        activeTintColor: '#85BF25',
        // inactiveTintColor: '#38491B'
      }}
    >
      {/* <Tab.Screen
        name="Galerie"
        component={GalerieNavigator}
        options={{
          tabBarLabel: 'Galerie',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Images"
        component={ImagesNavigator}
        options={{
          tabBarLabel: 'Mes images',
          tabBarIcon: ({ color, size }) => (
            <Icon name="image" color={color} size={size} />
          ),
          // tabBarBadge: 3,
        }}
      /> */}
      {/* <Tab.Screen
        name="Favoris"
        component={FavorisNavigator}
        options={{
          tabBarLabel: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilNavigator}
        options={{
          tabBarLabel: 'Mon profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen name="Galerie" options={{ tabBarLabel: 'Galerie', tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }}>
        {props => <GalerieNavigator {...props} userToken={userToken} />}
      </Tab.Screen>
      <Tab.Screen name="Images" options={{ tabBarLabel: 'Mes images', tabBarIcon: ({ color, size }) => (<Icon name="image" color={color} size={size} />) }}>
        {props => <ImagesNavigator {...props} userToken={userToken} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Favoris" options={{ tabBarLabel: 'Favoris', tabBarIcon: ({ color, size }) => (<Icon name="star" color={color} size={size} />) }}>
        {props => <FavorisNavigator {...props} userToken={userToken} />}
      </Tab.Screen> */}
      <Tab.Screen name="Profil" options={{ tabBarLabel: 'Mon profil', tabBarIcon: ({ color, size }) => (<Icon name="person" color={color} size={size} />) }}>
        {props => <ProfilNavigator {...props} userToken={userToken} />}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

const GalerieStack = createStackNavigator();

function GalerieNavigator({ userToken }) {
  return (
    <GalerieStack.Navigator screenOptions={{ headerLeft: ()=> null }}>
      <GalerieStack.Screen name="GalerieScreen" options={{ headerTitle: 'Galerie', headerStyle: { backgroundColor: '#38491B' } }}>
        {props => <GalerieScreen {...props} userToken={userToken} />}
      </GalerieStack.Screen>
      {/* <GalerieStack.Screen
        name="GalerieScreen"
        component={GalerieScreen}
        options={{ headerTitle: 'Galerie', headerStyle: {
          backgroundColor: '#38491B',
        }}}
      /> */}
    </GalerieStack.Navigator>
  );
}

const ImagesStack = createStackNavigator();

function ImagesNavigator({ userToken }) {
  return (
    <ImagesStack.Navigator screenOptions={{ headerLeft: ()=> null }}>
      <ImagesStack.Screen name="ImagesScreen" options={{ headerTitle: 'Mes images', headerStyle: { backgroundColor: '#38491B' } }}>
        {props => <ImagesScreen {...props} userToken={userToken} />}
      </ImagesStack.Screen>
      {/* <ImagesStack.Screen
        name="ImagesScreen"
        component={ImagesScreen}
        options={{
          headerTitle: 'Mes images', headerStyle: {
            backgroundColor: '#38491B',
          }
        }}
      /> */}
    </ImagesStack.Navigator>
  );
}

const FavorisStack = createStackNavigator();

function FavorisNavigator({ userToken }) {
  return (
    <FavorisStack.Navigator screenOptions={{ headerLeft: ()=> null }}>
      <FavorisStack.Screen name="FavorisScreen" options={{ headerTitle: 'Favoris', headerStyle: { backgroundColor: '#38491B' } }}>
        {props => <FavorisScreen {...props} userToken={userToken} />}
      </FavorisStack.Screen>
      {/* <FavorisStack.Screen
        name="FavorisScreen"
        component={FavorisScreen}
        options={{
          headerTitle: 'Favoris', headerStyle: {
            backgroundColor: '#38491B',
          }
        }}
      /> */}
    </FavorisStack.Navigator>
  );
}

const ProfilStack = createStackNavigator();

function ProfilNavigator({ userToken }) {
  return (
    <ProfilStack.Navigator screenOptions={{ headerLeft: ()=> null }}>
      <ProfilStack.Screen name="ProfilScreen" options={{ headerTitle: 'Profil', headerStyle: { backgroundColor: '#38491B' } }}>
        {props => <ProfilScreen {...props} userToken={userToken} />}
      </ProfilStack.Screen>
      {/* <ProfilStack.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{
          headerTitle: 'Profil', headerStyle: {
            backgroundColor: '#38491B',
          }
        }}
      /> */}
    </ProfilStack.Navigator>
  );
}

export default TabNavigator