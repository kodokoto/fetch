# fetch

## Prerequisites

- node
- yarn `npm install -g yarn`
- git (ideally ssh'd into it)
- android studio
- xcode (osx only)
- Expo go

## Installation

clone the github repo then run the following commands:

To intsall yarn:

```
npm install -g yarn
```

On windows, if this doesn't work, try running this in powershell as admin:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

```
cd fetch
yarn install
yarn db-generate
```

I have provided the `.env` file with all the necessary envidoment variables to run the app locally within your development enviroment. This is bad practice, but for the sake of simplicity, this was our best option. Please keep this file and its contents safe.

IMPORTANT FOR MARKERS: compressing the folder seems to rename `.env` to `env`. Please rename it back to `.env`

## Usage

```
yarn dev
```

### Expo Go (Reccomended)
To use run the app using [Expo Go](https://expo.dev/client), first download the app on your IOS or android device, create an account and run the following commands in the root folder of the project:

```sh
cd apps/expo
npx expo run  
```

Here you will see a QR code which you can now scan using the Expo Go app. If you are logged in, it will save the link, so you wont have to do this again. From there you have to go back to the root folder and start the application there to also run the backend locally:

```sh
cd ../..
yarn dev
```

### IOS Simulator

If you are on OSX, I suggest using the IOS Simulator. Here is the required [setup](https://docs.expo.dev/workflow/ios-simulator/).

Finally, go into `package.json` within `apps/expo` and add the `--ios` tag within the `dev` script as such: `"dev": "npx expo start --ios"`

### Android Studio

If you are on Windows, you can use the Android Simulator. Here is the required [setup](https://docs.expo.dev/workflow/android-studio-emulator/)

Finally, go into `package.json` within `apps/expo` and add the `--android` tag within the `dev` script as such: `"dev": "npx expo start --android"`

## Build

NOTE: Don't worry about this for now, we will be using expo to build the app.

install EAS cli:

```
npm install -g eas-cli
```

login

```
eas login
```

build

```
eas build --platform <android | ios | all>
```

## Contribution guidelines

- The steps for contributiing to the project are as follows:

  1. Create a new branch from the main branch
  2. Make your changes
  3. Commit your changes regularly
  4. Check your changes in the development server, make sure they don't break anything else
  5. Build your project and check for any errors/warnings
  6. Make a pull request on github to merge branch with main
  7. Ask for someone to review your code and merge it

- Please make sure you are using the latest version of the main branch before you start working on your branch
- Keep your commits small
- Name your commits properly, try to keep them relevant to the changes made
- Don't comment everywhere, only when needed
- Use prettier for formatting `npx prettier --write src/`
- Use `tsc` to check for typescript errors
- Please only install something to the project if absolutely necessary or if you know what you are doing
- If you are going to install something in the project please use `npm` instead of `yarn` or `pnpm`
- Likewise, please don't change any of the config files unless you know what you are doing

### Adding a new component

The idea behind encapsulating components is to make them reusable and to make them easy to maintain. Ideally components should be used to abstract the layout, styling and logic of a screen. Not just the styling.

Use [native base](https://docs.nativebase.io/) components as a baseline to your custom component.

We are using functional components, so please don't use class components.

1. Create a new file in `packages/app/design/components` with the name of the component
   ```sh
   touch packages/app/design/components/Component.tsx
   ```
2. If your component takes in parameters, it should be defined as a type in the component file. The type should be named after the component name with `Props` appended to it. i.e

   ```ts
   type componentProps = {
     text: string
   }
   ```

3. define and export the component as such (use `rnf` [snippet](https://marketplace.visualstudio.com/items?itemName=jundat95.react-native-snippet) if you are using vscode):

   ```tsx
   export default function Component({ text }: componentProps) {
     return (
       <View>
         <Text>{text}</Text>
       </View>
     )
   }
   ```

### Adding a new page

We are using [expo router](https://expo.github.io/router/docs/) for navigation. Meaning that the navigation within our application is defined by the file structure within the `apps/expo/app` folder.

## Using the backend

### Database

We are using [prisma](https://www.prisma.io/) as our database ORM, and mysql as our database.

The structure of the database is defined in `packages/db/schema.prisma`. Models define the tables in the database, and fields define the columns in the tables. Please refer to the [docs](https://www.prisma.io/docs/) for more information.

To make changes to the database, you can use the [prisma studio](https://www.prisma.io/docs/concepts/components/prisma-studio) which is available at `http://localhost:5555` when the server is running.

### Server Side

A we are using tRPC, for now, only to handle requests to the database.

The tRPC routers are defined in `packages/api/src/routers`.

Each router corresponds to a model in the database. Each procedure in the router defines the queries that can be made to the database.

For example `byId` in `packages/api/src/routers/user.ts` defines a query that can be made to the database to get a user by their id.

Please refer to the [docs](https://trpc.io/docs/server/procedures) for more information.

We also use `zod` to validate the input to the procedures. This is done in the `input` field of the procedure. Along with the types generated by `prisma` this allows us to have end to end type safety across the entire stack.

To create a new router, create a new file in `packages/api/src/routers` and define the the router within the main router in `packages/api/src/routers/index.ts`.

### Client Side

To use the api, we start by importing the `api` client from `packages/app/utils/trpc.ts` as such:

```ts
import { api } from '../utils/trpc'
```

We can now call the procedures defined in the routers as such:

```tsx
// get a user by their id
const { data } = api.user.byId.useQuery({ id: 1 })

return (
  <View>
    <Text>{data?.name}</Text>
  </View>
)
```

Keep in mind that these calls are technically react hooks, so they should only be called within a react component, and they should follow the [rules of hooks](https://reactjs.org/docs/hooks-rules.html).

Some of the best practices for using these api calls are:

Never call the api conditially, for example, never do this:

```tsx
if (condition) {
  const { data } = api.user.byId.useQuery({ id: 1 })
}
```

Instead, use the `enabled` field of the hook to conditionally call the api:

```tsx
const { data: user } = api.user.byId.useQuery({ id: 1 }, { enabled: condition })
```

The same trick can be used to chain api calls, for example, if you want to get a user by email, and then get all the posts by that user, you can do this:

```tsx
const { data: user } = api.user.byEmail.useQuery({ email: 'example@gmail.com' })
const userId = user?.id
const { data: posts } = api.post.byUser.useQuery({ id: userId }, { enabled: !!userId })
```

When displaying data from the api, always check if the data is defined, if not then display a skeleton from [native base](https://docs.nativebase.io/Components.html#skeleton-headref):

```tsx
import { api } from '../utils/trpc'
import { Skeleton } from 'native-base'

export default function Component({ text }: componentProps) {
  const { data: user } = api.user.byId.useQuery({ id: 1 })
  return <View>{user ? <Text>{user.name}</Text> : <Skeleton.Text />}</View>
}
```

## Styling guidelines

- Use tailwind css to further change the styling of a component within its component file.
- Try to use the same theming as other components, keeping consistent colours and margins.

### Naming conventions

- Use `camelCase` for variables and functions
- Use `PascalCase` for components, and follow this [naming convention](https://medium.com/@wittydeveloper/react-components-naming-convention-%EF%B8%8F-b50303551505)
- For files within the `apps/expo/app` folder, use `kebab-case`.

### Folder structure

```
|-- apps
    |-- expo
    |-- backend
|-- packages
    |-- app
        |-- components
        |-- provider
        |-- utils
        |-- assets
    |-- api
    |-- db
```

- `expo` is the expo app, this is where the [mobile navigation](https://expo.github.io/router/docs/) is handled
- `backend` is where the express.js backend is located.
- `components` is where all the custom components are stored
- `provider` contains the context providers for the app (authentication, theming, tanstack query and trpc)
- `assets` is where all the images and other assets are stored
- `utils` is where all the utility and helper functions are stored, including the api client
- `api` api for the backend, using tRPC routers
- `db` database backend w/ prisma

## resources

### Backend

- [prisma](https://www.prisma.io/docs)
- [trpc](https://trpc.io/docs)
- [tanstack query](https://tanstack.com/query/latest/docs/react/quick-start) (data fetching)

### react native

- [expo](https://docs.expo.dev/)
- [expo router](https://expo.github.io/router/docs/)

### styling

- [tailwind css](https://tailwindcss.com/)
- [native base](https://nativebase.io/)
