# ReactNativeProject - Travel App

## Environment Setting

[**React Native Official Guide**](https://reactnative.dev/docs/environment-setup)

```bash
npm install
# or
yarn install
```

### iOS Setting

```bash
brew install node
brew install watchman

# optional for M1 MacOS
sudo arch -x86_64 gem install ffi

# Ruby - MacOS 12.5.1 or up
ruby --version

# install ruby version manager
brew install rbenv ruby-build

# list latest stable versions
rbenv install -l

rbenv install 3.0.4

# override main ruby version with rbenv’s
rbenv global 3.0.4

nano ~/.zshrc
#or
nano ~/.bash_profile

# insert the following if rbenv version override failed :
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

brew install cocoapods
cd ~/<project-root>/ios
pod install
rm -rf build
cd ../<project-root>
```

### Android Setting

1. Commands
```bash
brew install node
brew install watchman
brew tap homebrew/cask-versions
brew install --cask zulu11
```
2. [**Install Android Studio**](https://developer.android.com/studio)
With below items checked

- Android SDK
- Android SDK Platform
- Android Virtual Device

3. Install the Android SDK, Android 12 (S) works with this project, and check following items

- Android SDK Platform 31
- Intel x86 Atom_64 System Image / Google APIs Intel x86 Atom System Image

4.  Commands
```bash
nano ~/.bash_profile
# or
nano ~/.zshrc

# insert
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

5. Create a new Android emulator for testing
https://developer.android.com/studio/run/managing-avds

---

## Run the App

```bash
# watcher mode for debug purpose, enable instant hot reload
npx react-native start


# iOS
# open another terminal
npx react-native run-ios
# or specific simulator
xcrun simctl list devices # <- find all available iOS simulators
npx react-native run-ios --simulator="iPhone 13 Pro Max"
# or plug in USB to deploy to real iPhone device, "iPhone" is the name of your device
npx react-native run-ios --device "iPhone"


# Android
# open another terminal
npx react-native run-android
# or specific simulator
$ANDROID_HOME/tools/emulator -list-avds # <- find all available Android simulators
npx react-native run-android --deviceId="Pixel_3a_API_31"
# or plug in USB to deploy to real iPhone device, "iPhone" is the name of your device
adb devices
npx react-native run-android --deviceId="Samsung Galaxy S22"

```

## React Navigation

### Route Architecture

> [**Nesting Navigators**](https://reactnavigation.org/docs/nesting-navigators)
> 
> Route Links of this project:
> 
> AppNavigator/NavigationContainer <br>
> ┣ SplashStack (not yet) <br>
> &nbsp;&nbsp; ┣ SplashScreen <br>
> ┣ AuthStack (not yet) <br>
> &nbsp;&nbsp; ┣ OnBoardingScreen <br>
> &nbsp;&nbsp; ┣ Login/RegisterScreen <br>
> &nbsp;&nbsp; ┣ Login/RegisterScreen (OAuth) <br>
> ┣ AppStack <br>
> &nbsp;&nbsp; ┣ HomeBottomTab <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ┣ HomeScreen (default landing page) <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ┣ FavoriteScreen <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ┣ HistoryScreen <br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ┣ ProfileScreen <br>
> &nbsp;&nbsp; ┣ HotelSearchScreen <br>
> &nbsp;&nbsp; ┣ HotelListScreen <br>
> &nbsp;&nbsp; ┣ HotelDetailScreen <br>
> &nbsp;&nbsp; ┣ HotelRoomSelectScreen <br>
> &nbsp;&nbsp; ┣ PaymentScreen <br>
> &nbsp;&nbsp; ┣ PaymentCompleteScreen <br>

### Create new screens

1. At ```app/screens```, add new page ```new-screen.tsx```  
2. At ```app/navigators/app-stack.tsx```, add new property at param list and new screen in stack navigator
    ```typescript
    export type StackNavigatorParamList = {
      newScreen: NewScreenProps
    }
      
    <Stack.Navigator>
      <Stack.Screen name="newScreen" component={NewScreen} />
    </Stack.Navigator>
    ```
3. At ```app/screens/new-screen.tsx```, need to ensure the function component has this setting
    ```typescript
    export interface NewScreenProps{}
   
    export const NewScreen: FC<StackScreenProps<StackNavigatorParamList, "newScreen">> =
    ({ route,navigation }) => {
      return .... 
    }
    ```

---

## React Native Vector Icons issue

iOS - https://github.com/oblador/react-native-vector-icons#ios

```bash
cd ios
rm -rf build
pod install
```

Android - https://github.com/oblador/react-native-vector-icons#android

### How to use React Native Vector Icons within React Native Paper

React Native Vector Icons List
https://oblador.github.io/react-native-vector-icons/


```typescript
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { IconButton as PaperIconButton } from "react-native-paper";

// inside a button
<PaperIconButton icon={({ size, color }) => (
  <AwesomeIcon name="rocket" size={size} color={color} />
)}/>
  
// use it alone
<AwesomeIcon name="rocket" size={10} color={'red'} />
<MaterialIcon name="airplane" size={20} color={'blue'} />
```

---

## Redux

### Create new Reducer/Slice

[**Typescript Quick start**](https://redux-toolkit.js.org/tutorials/typescript)

1. At ```app/redux```, add new folder and ```newSlice.ts```
2. The content can refer to ```user/userSlice.ts```
3. At ```app/redux/store.ts```, add new reducer/slice
   ```typescript
   import newFeatureReducer from './new-feature/newSlice'
   
   export const store = configureStore({
    reducer: {
      users: usersReducer,
      newFeature: newFeatureReducer
    }
   })
   ```
4. To use it, at any React Component under App Tree (wrapped by App.tsx)
   ```typescript
   import { useSelector } from "react-redux";
   import { RootState } from "../redux/store";
   
   export function NewScreen(){
      const newState = useSelector<RootState>((state) => state.newFeature.newState);
   
      useEffect(()=>{
        ...
      },[])
   
      return (
        ...
      )
   }
   ```


---

## Amadeus - Hotel & Flight Booking API

[**Amadeus Self Service (Personal Account) API Setup Guide**](https://developers.amadeus.com/get-started/get-started-with-self-service-apis-335)

1. Register Account - https://developers.amadeus.com/register, Create account, Confirm my account
2. Go to [**My Self-Service Workspace**](https://developers.amadeus.com/my-apps), Create New App, Keep your ```API Key``` & ```API Secret``` somewhere safe

### API Call Sample (without Node SDK)

Postman API Spec: https://documenter.getpostman.com/view/2672636/RWEcPfuJ#8196c48f-30f9-4e3b-8590-e22f96da8326

API Reference: https://developers.amadeus.com/self-service/category/hotel/api-doc/hotel-search

API Cheatsheet: https://possible-quilt-2ff.notion.site/Cheat-sheet-e059caf4fcd342b78705f9f3d6f88f1d

#### Get Access Token API (expires every 30 minutes)

https://developers.amadeus.com/self-service/apis-docs/guides/authorization-262

![Get Access Token!](assets/images/readme/amadeus_post_access_token.png "Get Access Token")

The Rest of other APIs using Access Token

![Find Hotel by City!](assets/images/readme/amadeus_get_hotels_by_city.png "Find Hotel by City")



---
