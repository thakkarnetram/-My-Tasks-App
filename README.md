# My Tasks 📋

A simple task manager built with **React Native**  **Expo**. Add tasks, get reminded via local notifications & manage them with basic animations and async storage.

---

## Demo

<video src="assets/demo.mp4" controls width="100%" style="max-width: 500px; max-height: 500px">
  Unsupported browser 
</video>

> If the video doesn't play, [click here to view it directly](assets/demo.mp4).
---

## 🚀 Features

-  Add new tasks with one tap
-  Get notified 10 seconds after adding a task via local notifications 
-  Tasks are saved using AsyncStorage 
-  Toggle task completion with strike line 
-  Delete tasks
-  Basic fade in and out animations using Reanimated 3

---

## Problems Faced and Solutions
- Had to find a workaround for local notifications as SDK 53+ had removed support for local notifications via expo go, so I had to switch to dev build in expo to make it work
- For animations, I had used LayoutAnimations but in the new arch it does not work properly so had to switch to Reanimated 3 

---- 

## 🛠 How to Run

### Prerequisites

- Node.js
- Expo CLI
- Expo Go App (for testing on Android/iOS)

### Steps

```bash
git clone https://github.com/YOUR_USERNAME/my-tasks-app.git
cd my-tasks-app
npm install
npx expo install expo-dev-client
npx expo run:android
npx expo start
