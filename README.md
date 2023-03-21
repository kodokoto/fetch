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
- We are using functional components, so please don't use class components
- Use prettier for formatting `npx prettier --write src/`
- Use `tsc` to check for typescript errors
- Please only install something to the project if absolutely necessary or if you know what you are doing
- If you are going to install something in the project please use `npm` instead of `yarn` or `pnpm`
- Likewise, please don't change any of the config files unless you know what you are doing

## Styling guidelines

- Use [native base](https://docs.nativebase.io/) components as a baseline to your custom component.
- Use tailwind css to further change the styling of a component within its component file.
- Try to use the same theming as other components, keeping consistent colours and margins. 

### Folder structure

```
|-- App.tsx
|-- src
    |-- components  
    |-- screens
    |-- assets
    |-- utils
```

- `App.tsx` is the entry point of the app
- `components` is where all the custom components are stored
- `screens` is where all the screens are stored, think of this like pages in a website
- `assets` is where all the images and other assets are stored
- `utils` is where all the utility and helper functions are stored

## resources

### react native
- [expo](https://docs.expo.dev/)
- [react navigation)](https://reactnavigation.org/)

### styling
- [tailwind css](https://tailwindcss.com/)
- [native base](https://nativebase.io/)
