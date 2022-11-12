import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function OnboardingScreen () {
  return (
    <View style={{flex:1}}>
      <ImageBackground source={require('../../assets/images/mount-titlis.jpeg')} style={{flex: 1}}>

      </ImageBackground>
    </View>
  )
}
