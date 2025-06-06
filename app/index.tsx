import { Redirect } from "expo-router";
import { useEffect } from "react";
// import * as SecureStore from "expo-secure-store";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { login, logout, setLoading } from "@/redux/AuthSlice";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const isAuthenticated = false
  // const dispatch = useDispatch();
  // const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const storedToken = await SecureStore.getItemAsync("accessToken");
  //       if (storedToken) {
  //         dispatch(login(storedToken));
  //       } else {
  //         dispatch(logout());
  //       }
  //     } catch (error) {
  //       dispatch(logout());
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   };

  //   getData();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View className="flex-1 justify-center items-center bg-blue">
  //       <StatusBar backgroundColor="#003366" style="light" />
  //       <View className="flex-row justify-center items-center">
  //         <Text className='text-orange font-ablack text-4xl'>Navo</Text>
  //         <Text className='text-orange font-alight text-4xl'>Cargo</Text>
  //       </View>
  //     </View>
  //   );
  // }

  return <Redirect href={isAuthenticated ? "/(protected)/(tabs)/home" : "/Splash"} />;
}
