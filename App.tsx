// import React, { useCallback } from 'react'
// import AppFlashlist from './AppFlashlist';
// import { RenderPassReport, PerformanceProfiler } from '@shopify/react-native-performance';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FakeScreen from './FakeScreen';

// const Stack = createNativeStackNavigator();


// export default function App() {
//     const onReportPrepared = useCallback((report: RenderPassReport) => {
//         console.log(report);
//     }, []);

//     return (
//         <PerformanceProfiler onReportPrepared={onReportPrepared}>
//             <NavigationContainer>
//                 <Stack.Navigator>
//                     <Stack.Screen name="AppFlashlist" component={AppFlashlist} />
//                     <Stack.Screen name="FakeScreen" component={FakeScreen} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//      </PerformanceProfiler>

//     )
// }