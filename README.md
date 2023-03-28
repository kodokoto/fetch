# fetch

## Prerequisites

- node
- git (ideally ssh'd into it)
- android studio
- Expo go

## Installation

clone the github repo then run the following commands:

```
cd fetch
npm install
```

## Usage
```
npx expo start
```
Setup for [android](https://docs.expo.dev/workflow/android-studio-emulator/) and [ios](https://docs.expo.dev/workflow/ios-simulator/) simulators.

## Build

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

Use [native base](https://docs.nativebase.io/) components as a baseline to your custom component.

We are using functional components, so please don't use class components.

1. Create a new file in `packages/app/design/components` with the name of the component
    ```sh
    touch packages/app/design/components/Component.tsx
    ```
2. define the component props as a type i.e
    ```ts
    type componentProps = {
        text: string
    }
    ```
3. define and export the component
    ```ts
    export default function Component({ text } : componentProps) {
        return (
            <View>
                <Text>{text}</Text>
            </View>
        )
    }
    ```
### Adding a new screen

Screens are primitives that are shared across the app, both on web and mobile.

They define the layout and the components that are used within the screen. They do not handle and navigation. That is defined in the `expo` and `next` folders.


## Styling guidelines

- Use tailwind css to further change the styling of a component within its component file.
- Try to use the same theming as other components, keeping consistent colours and margins. 

### Folder structure

```
|-- apps
    |-- expo
    |-- next
|-- packages
    |-- app
        |-- design
            |- components
            |- screens
            |- Tailwind
        |-- provider
        |-- utils
    |-- api  
    |-- db
```
- `expo` is the expo app, this is where the [mobile navigation](https://expo.github.io/router/docs/) is handled 
- `next` is the next app, this is where the web navigation is handled
- `components` is where all the custom components are stored
- `screens` is where all the screens are stored, think of this like pages in a website
- `provider` contains the context providers for the app
- `assets` is where all the images and other assets are stored
- `utils` is where all the utility and helper functions are stored
- `api` api backend w/ tRPC routers
- `db` database backend w/ prisma

## resources

### react native
- [expo](https://docs.expo.dev/)
- [expo router](https://expo.github.io/router/docs/)

### styling
- [tailwind css](https://tailwindcss.com/)
- [native base](https://nativebase.io/)
