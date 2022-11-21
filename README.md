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

5. (API Call) add ```createAsyncThunk``` callback function inside slice file, DO NOT USE ```Axios``` inside thunk function, you must use ```fetch``` !!!
```typescript
export const getAmadeusAccessToken = createAsyncThunk<GetAccessTokenResponse, GetAccessTokenRequest>(
        "hotel/getAmadeusAccessToken",
        async (requestBody: GetAccessTokenRequest, thunkAPI) => {
          
           const response = await fetch(`${amadeusTestApiUrl}/v1/security/oauth2/token`, {
              method: "POST",
              headers: {
                 "Content-Type": "application/x-www-form-urlencoded"
              },
              body: QueryString.stringify(requestBody)
           })
           if (response.status < 200 || response.status >= 300) {
              return thunkAPI.rejectWithValue((await response.json()));
           }

           let data: GetAccessTokenResponse = await response.json()

           return data;
        },
)
```
6. (API Call) and then add builder.Case function inside ```extraReducer``` of ```createSlice```
```typescript
export const hotelSlice = createSlice({
   name: "hotel",
   initialState,
   reducers: {
      ...
   },
   extraReducers: (builder) => {
      builder.addCase(getAmadeusAccessToken.fulfilled, (state, action) => {
         state.accessToken = action.payload.access_token;
      });
      builder.addCase(getAmadeusAccessToken.rejected, (state, action) => {
         state.accessToken = "";
      });
   },
});

```

---
## AWS Amplify

Useful Links

[**AWS Amplify Library Doc**](https://docs.amplify.aws/lib/restapi/getting-started/q/platform/js/)

[**AWS Amplify CLI Doc**](https://docs.amplify.aws/cli/)

[**AWS Amplify Studio**](https://ap-southeast-1.admin.amplifyapp.com/admin/d1448zlrk0oot2/dev/rest)

[**AWS Amplify Console**](https://ap-southeast-1.console.aws.amazon.com/amplify/home?region=ap-southeast-1#/d1448zlrk0oot2/settings/general)

[**AWS CloudFormation**](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false)

[**AWS API Gateway**](https://ap-southeast-1.console.aws.amazon.com/apigateway/main/apis?region=ap-southeast-1#)

[**AWS Lambda Function**](https://ap-southeast-1.console.aws.amazon.com/lambda/home?region=ap-southeast-1#/functions)

[**AWS CloudWatch**](https://ap-southeast-1.console.aws.amazon.com/cloudwatch/home?region=ap-southeast-1#logsV2:log-groups)

---

[**Getting Started - React Native**](https://docs.amplify.aws/start/getting-started/installation/q/integration/react-native/)
1. Install Amplify CLI locally
   ```bash
   npm install -g @aws-amplify/cli
   # or
   yarn global add @aws-amplify/cli
   ```
   
2. Create Amplify profile, note that this will replace your access ID and access secret during setup of EC2
   ```bash
   amplify configure
   
   # After login AWS Console >>>
   Specify the AWS Region
   > region: ap-southeast-1
   Specify the username of the new IAM user:
   > user name: your-name
   ```

   Remember to save down the access ID and access secret (better download CSV)
   ![Amplify User Creation!](assets/images/readme/amplify-user-creation.gif "Amplify User Creation")

   ```bash
   Enter the access key of the newly created user:
   > accessKeyId:  <ACCESSKEYID>
   > secretAccessKey:  <ACCESSKEY>
   This would update/create the AWS Profile in your local machine
   > Profile Name: default
   ```

   ### If encounter error like "amplify" command not found, try to add path at root
   ```bash
   nano ~/.zshrc 
   # or
   nano ~/.bash_profile
   
   # insert the below statement and save
   export PATH = ${PATH}:/usr/local/bin/amplify
   ```
   

3. Invite other users to Amplify Studio, using their own email, and not related to existing AWS account
   ![Amplify Studio_Invite1!](assets/images/readme/amplify-studio-invite1.png "Amplify Studio Invite 1")
   ![Amplify Studio_Invite2!](assets/images/readme/amplify-studio-invite2.png "Amplify Studio Invite 2")


4. Add access for other user for accessing your Amplify cloud using their Amplify CLI (not related to Amplify Studio access)
   Follow the step 2 above, share access ID and access secret for new user (download CSV)
   ![Amplify IAM_Add_User 1!](assets/images/readme/amplify-iam-add-user1.png "Amplify IAM Add User 1")


5. Newly added user need to add AWS profile in their PC locally, whether or not executed ```amplify configure``` themselves
   ```bash
   nano ~/.aws/credentials
   
   # add below
   [your-new-profile-name]
   aws_access_key_id=123456ABCDE
   aws_secret_access_key=23456TYUIO
   
   nano ~/.aws/config
   # add below
   [profile your-new-profile-name]
   region=ap-southeast-1
   output=json
   ```

6. At project root, install the following dependencies which we already done
   ```bash
   npm install aws-amplify amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage
   # or
   yarn add aws-amplify amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage
   
   cd ios
   pod update
   ```
   
7. Init or pull local Amplify Backend
   #### !!! Amplify init will add list of paths and files in <span style="color: orange">.gitignore</span>
   ```bash
   # if no existing Amplify backend at Amplify Studio (cloud)
   amplify init
   
   # if have existing amplify project, make sure the following files are at amplify folder before pull
   - amplify/backend/backend-config.json
   - amplify/backend/amplify-meta.json
   - amplify/#current-cloud-backend/amplify-meta.json
      
   amplify pull
   # or pull from specific project, env
   amplify pull --appId d1448zlrk0oot2 --envName dev
   
   # if you need to add API (will deploy to API Gateway after push)
   amplify api add
   
   # if you need to add function (will deploy to Lambda after push)
   amplify function add
   
   # after you finish editing code
   amplify push
   ```
   
8. Enable Amplify in project
   
   For each time ```amplify push``` and ```amplify pull``` executed, a file ```src/aws-export.js``` will be created or updated.
   
   ```javascript
   const awsmobile = {
    "aws_project_region": "ap-southeast-1",
      "aws_cloud_logic_custom": [
        {
          "name": "amadeusAPI",
          "endpoint": "https://ixzkcz9ip2.execute-api.ap-southeast-1.amazonaws.com/dev",
          "region": "ap-southeast-1"
        }
      ]
    };
   export default awsmobile;
   ```
   
   At ```App.tsx```, import that for Amplify configuration before AppRegistry
   
   Reference: https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js/#scoped-configuration---graphql-api
   ```typescript
   import { AppRegistry } from "react-native";
   import App from "./app/App";
   import { name as appName } from "./app.json";
   import "react-native-gesture-handler";
   import { Amplify } from "aws-amplify";
   import awsmobile from "./src/aws-exports";
   
   Amplify.configure(awsmobile);
   
   AppRegistry.registerComponent(appName, () => App);
   ```

### API - AWS Amplify -> AWS API Gateway

1. Create a new API (~ MVC Controller)

   [**Create new REST API Amplify Doc**](https://docs.amplify.aws/lib/restapi/getting-started/q/platform/react-native/)

   ```bash
   amplify api add
   
   Select from one of the below mentioned services:
   > REST
   
   Would you like to add a new path to an existing REST API:
   > N
   
   Provide a friendly name for your resource to be used as a label for this category in the project:
   > controllerAPI
   
   Provide a path:
   > /route-name/route1
   
   # create a new service function and bind to this route
   Choose a Lambda source:
   > Create a new Lambda function
   
   Provide an AWS Lambda function name:
   > newFunction
   
   Choose the runtime that you want to use:
   > NodeJS
   
   Choose the function template that you want to use:
   # recommended option
   > Serverless ExpressJS function (Integration with API Gateway)
   # or easier option
   > Hello World
   
   Do you want to configure advanced settings?
   # if we want to use process.env
   > Y
   -> Do you want to access other resources in this project from your Lambda function?
      > N
   -> Do you want to invoke this function on a recurring schedule?
      > N
   -> Do you want to enable Lambda layers for this function?
      > N
   -> Do you want to configure environment variables for this function?
      > Y
      -> Enter the environment variable name:
         > API_ID
      -> Enter the environment variable value:
         > 123456
      -> Select what you want to do with environment variables:
         > I'm done'
   -> Do you want to configure secret values this function can access?
      > N
  
   Do you want to edit the local lambda function now?
   > N
   
   Restrict API access?
   > N
   
   Do you want to add another path?
   > N
   
   # to check afterwards
   amplify status
   
   # if everything confirmed, push
   amplify push
   ```

2. Update an existing API (add path at the controller)

   ```bash
   amplify api update
   
   Select from one of the below mentioned services:
   > REST
   
   What would you like to do?
   > Add another path
   
   /* Repeat the add path steps at creating API */
   
   # if everything confirmed, push
   amplify push
   ```
   
A new endpoint at API Gateway will be generated, e.g. https://ixzkcz9ip2.execute-api.ap-southeast-1.amazonaws.com/dev

If the last path of the API controller is removed, the endpoint will be removed as well.

Newly generated API will be allocated with another endpoint

Can check at [**AWS API Gateway**](https://ap-southeast-1.console.aws.amazon.com/apigateway/home?region=ap-southeast-1#/apis/ixzkcz9ip2/resources/di2zt6/methods/ANY) 
and ```amplify/backend/api/<api-name>/cli-inputs.json```

![AWS_API_Gateway!](assets/images/readme/aws-api-gateway1.png "AWS API Gateway")

### API - AWS Amplify -> AWS Lambda Function

1. To install NPM dependencies and build Lambda function (express.js)

   at ```amplify/backend/function/<function-name>/src/package.json```

   ```json
   {
      "dependencies": {
        "amadeus": "^7.1.0"
      }
   }   
   ```
   
   Run this command to build ```dist``` folder and ```node_modules```
   ```bash
   amplify function build
   ```
   
2. Modify the Lambda function source code

   at ```amplify/backend/function/<function-name>/src/app.js```, remove all HTTP request methods except the one you need

   ```javascript
   /* commented methods are not necessary
   app.get('/amadeus/hotel-offers', function(req, res) {
      res.json({success: 'get call succeed!', url: req.url});
   });
   app.post('/amadeus/hotel-offers', function(req, res) {
      res.json({success: 'post call succeed!', url: req.url, body: req.body})
   }); 
   */
   
   app.put('/amadeus/hotel-offers', function(req, res) {
      res.json({success: 'put call succeed!', url: req.url, body: req.body})
   });
   
   ```
   
   Make sure these code snippets exist, to allow two request headers content type
   GET ```'Content-Type': 'application/x-www-form-urlencoded'```

   POST ```'Content-Type': 'application/json'```

   ```javascript
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(express.urlencoded());
   app.use(express.json());
   ```

   If everything confirmed
   ```bash
   amplify push
   ```

   [**AWS Lambda Reference Link**](https://ap-southeast-1.console.aws.amazon.com/lambda/home?region=ap-southeast-1#/functions)

   ![AWS_Lambda1!](assets/images/readme/aws-lambda1.png "AWS Lambda 1")
   ![AWS_Lambda2!](assets/images/readme/aws-lambda2.png "AWS Lambda 2")
   ![AWS_Lambda3!](assets/images/readme/aws-lambda3.png "AWS Lambda 3")


3. This app makes API call at Redux level, can refer to ```app/redux/hotel/hotelSlice.ts```
   
   ```typescript
   import { API as AmplifyAPI } from "aws-amplify";
   
   export const getAmadeusHotelList = createAsyncThunk<HotelListResponse, HotelListRequest>(
   "hotel/getAmadeusHotelList",
      async (requestBody: HotelListRequest, thunkAPI) => {
          let apiName = "amadeusAPI";
          const path = "/amadeus/hotel-list";
          const option = {
              headers: {}, // OPTIONAL
              // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
              queryStringParameters: requestBody,
          };

          let response: HotelListResponse = await AmplifyAPI.get(apiName, path, option);
      }
   );
   ```

### Deployment Tracker - AWS Amplify -> AWS CloudFormation

[**AWS CloudFormation Reference Link**](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false)

![Amplify_Push!](assets/images/readme/amplify-push.png "Amplify Push")

![AWS_CloudFormation!](assets/images/readme/aws-cloudformation1.png "AWS CloudFormation")

### Logger - AWS Amplify -> AWS CloudWatch

![AWS_CloudWatch1!](assets/images/readme/aws-cloudwatch1.png "AWS CloudWatch 1")
![AWS_CloudWatch2!](assets/images/readme/aws-cloudwatch2.png "AWS CloudWatch 2")
![AWS_CloudWatch3!](assets/images/readme/aws-cloudwatch3.png "AWS CloudWatch 3")

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
