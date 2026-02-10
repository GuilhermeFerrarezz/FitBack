
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Tabs } from "expo-router";
import { AuthProvider } from './contexts/AuthContext.jsx'
import { useWindowDimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function RootLayout() {
    const { width, height } = useWindowDimensions();
    const barraLaranjaWidth = width * 0.2
    return (
        <AuthProvider>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#ffffffff',
                    borderTopColor: '#dbdbdbff',
                    height: 75,
                    paddingBottom: 5,
                    paddingTop: 5
                },
                tabBarActiveTintColor: 'rgb(0, 0, 0)',
                tabBarInactiveTintColor: '#9d9d9dff',
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <Tabs.Screen name="index"
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={{
                                borderTopWidth: 2,
                                marginBottom: 12,
                                height: 38,
                                width: barraLaranjaWidth,
                                borderTopColor: focused ? '#000000' : 'transparent',
                                alignItems: 'center',
                                justifyContent: 'center',

                                }}
                            >
                                <Entypo
                                    name={'home'}
                                    size={25}
                                    color={color}
                                />
                            </View>


                        );
                    },
                    tabBarLabel: ({ focused, color }) =>
                        <Text style={{ color: color }}>Início</Text>,
                }}
            />
            <Tabs.Screen name="screens/Menu"
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        
                        
                        return (

                            <View
                                style={{
                                borderTopWidth: 2,
                                marginBottom: 12,
                                height: 38,
                                width: barraLaranjaWidth,
                                borderTopColor: focused ? '#ff850b' : 'transparent',
                                alignItems: 'center',
                                justifyContent: 'center',

                                }}
                            >
                            
                            <AntDesign
                                name={"menu"}
                                size={25}
                                color={color}
                                />
                            </View>
                        );
                    },
                    tabBarLabel: ({ focused, color }) =>
                        <Text style={{ color: color }}>Menu</Text>,
                }}

            />
            <Tabs.Screen name="screens/Home" options={{ href: null }} />
            <Tabs.Screen name="routes/Router" options={{ href: null }} />
            <Tabs.Screen name="screens/Login" options={{ href: null }} />
            <Tabs.Screen name="screens/SingUp" options={{ href: null }} />
            <Tabs.Screen name="screens/Treino" options={{ href: null }} />
            
            </Tabs >
            </AuthProvider>
    )
}