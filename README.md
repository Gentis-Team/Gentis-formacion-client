<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=200px src="https://simplonline.co/_next/image?url=https%3A%2F%2Fsimplonline-v3-prod.s3.eu-west-3.amazonaws.com%2Fmedia%2Fimage%2Fpng%2F848ae791-7122-4229-9ff9-fdc209c6cd09.png&w=1280&q=75" alt="Project logo"></a>
</p>

<h3 align="center">Ecommerce Gentis</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-development-yellow.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/adriansunye/portfolio-client.svg)](https://github.com/adriansunye/ecommerce-gentis-client/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/adriansunye/ecommerce-gentis-client.svg)](https://github.com/adriansunye/ecommerce-gentis-client/pulls)
[![License](https://img.shields.io/badge/license-Gentis-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Web desenvolupada per al tractament dels cursos oferits per Gentis
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

La fundación Gentis tiene como objetivos ayudar a las personas en situación de desempleo a llegar a la acción formativa (cursos) que desean y necesitan, más rápido y sin más complejidad innecesaria y así mejorar su ocupabilidad. Por otro lado, yudar al equipo de formaciñón en la tarea de capacitación y selección de alumnado para todos los cursos de formación ocupacional que tienen diseminados por diferentes puntos territoriales de Cataluña.
## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* Vite - You're going to use the [Vite Package Manager](https://vitejs.dev) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install vite globally using npm:

```bash
$ npm install -g vite
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [ReactJs](https://reactjs.org) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Jest](https://jestjs.io) - Testing Framework
- [MaterialUI](https://mui.com) - Library of React UI components
- [ReactQuery](https://react-query-v3.tanstack.com) - Data-fetching library for React
- [React-router-dom](https://reactrouter.com/en/main) - Client side Routing


## ✍️ Authors <a name = "authors"></a>

- [@LidiaLG](https://github.com/LidiaLG)
- [@IngridB-afk](https://github.com/IngridB-afk)
- [@camilorocca](https://github.com/camilorocca)
- [@ecp12](https://github.com/ecp12)
- [@adriansunye](https://github.com/adriansunye)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- [Inspiration]
- [References]


```
Gentis-formacion-client
├─ .env
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ authApi.js
│  │  ├─ courseApi.js
│  │  ├─ courses.js
│  │  └─ index.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ content
│  │  │  │  ├─ CourseItem.jsx
│  │  │  │  └─ CourseItemStyles.scss
│  │  │  ├─ forms
│  │  │  │  ├─ buttons
│  │  │  │  │  └─ ButtonSubmit.jsx
│  │  │  │  ├─ inputs
│  │  │  │  │  ├─ Checkbox.jsx
│  │  │  │  │  ├─ DateInput.jsx
│  │  │  │  │  ├─ FileUploader.jsx
│  │  │  │  │  ├─ FormInput.jsx
│  │  │  │  │  ├─ RadioButton.jsx
│  │  │  │  │  ├─ Textfield.jsx
│  │  │  │  │  └─ TimeInput.jsx
│  │  │  │  ├─ NewCourse.jsx
│  │  │  │  ├─ NewStudent.jsx
│  │  │  │  └─ NewUser.jsx
│  │  │  ├─ index.js
│  │  │  ├─ Layout.jsx
│  │  │  └─ loaders
│  │  │     └─ FullScreenLoader.jsx
│  │  ├─ messages
│  │  │  └─ Message.jsx
│  │  ├─ modals
│  │  │  ├─ CourseModal.jsx
│  │  │  ├─ CreateCourse.jsx
│  │  │  └─ UpdateCourse.jsx
│  │  └─ navigation
│  │     ├─ filters
│  │     │  └─ Filters.jsx
│  │     ├─ footer
│  │     │  └─ Footer.jsx
│  │     ├─ header
│  │     │  └─ Header.jsx
│  │     ├─ search
│  │     │  └─ Search.jsx
│  │     └─ tags
│  │        ├─ Tag.jsx
│  │        └─ Tags.jsx
│  ├─ guards
│  │  ├─ RequireGuest.jsx
│  │  └─ RequireUser.jsx
│  ├─ main.jsx
│  ├─ middlewares
│  │  └─ AuthMiddleware.jsx
│  ├─ routes
│  │  └─ Routes.jsx
│  ├─ services
│  │  └─ providers
│  │     ├─ ColorModeProvider.jsx
│  │     ├─ PermissionsProvider.jsx
│  │     └─ StateContextProvider.jsx
│  ├─ store
│  │  └─ index.js
│  ├─ utils
│  │  └─ errorHandler.js
│  └─ views
│     ├─ errors
│     │  ├─ PageNotFound.jsx
│     │  └─ UnauthorizedPage.jsx
│     ├─ home
│     │  └─ Home.jsx
│     ├─ login
│     │  └─ Login.jsx
│     ├─ profile
│     │  └─ Profile.jsx
│     └─ register
│        └─ Register.jsx
└─ vite.config.js

```