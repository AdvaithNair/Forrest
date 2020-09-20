# Forrest

Forrest is an application intended to help users plot fast and environmentally friendly drive routes and track their environmental savings. These routes include energy and CO2 saving paths. Forrest uses the Google Maps API and Google Directions API to generate the most efficient routes for users. Finally, Forrest acts as a bridge to becoming a social media, with the capabilities to extend its own features to become a utility-social-media hybrid application.

NOTE: If you spot a bug, please contact me at [advaithnair2@gmail.com](mailto:advaithnair2@gmail.com)/[adn323@lehigh.edu](mailto:adn323@lehigh.edu) or Dom at [d-hupp@onu.edu](mailto:d-hupp@onu.edu).

Forrest contains the following features:

- Testing Ping Route
- Auth Functions
  - Sign Up
  - Sign In
  - Log Out
  - Three levels of Authorization(User, Admin, Owner)
- Common Folder with constants, objects, types, and secrets
- MaterialUI
- Google Maps Interface
- Google Directions API
- Responsive Design
- Search for Users

## Technology Overview

It utilizes the following technologies:

- Client
  - ReactJS
  - Material UI
  - Axios
- Server
  - NodeJS
  - ExpressJS
  - PostgreSQL
  - TypeORM
  - JSON Web Token
  - BcryptJS
- APIs
  - Google Maps
  - Google Directions

All code is constructed using TypeScript.

## Prerequisites

### Technologies Used

- [ReactJS](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Axios](https://github.com/axios/axios)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/#/)
- [JSON Web Token](https://jwt.io/)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)

### Commands

Execute these commands to ensure Forrest can run properly. Run these in the root directory.

#### Install Packages

```
yarn install
```

#### Web

```
yarn web
```

#### Server

```
yarn server
```

#### Common

```
yarn common

OR

cd common && tsc
```

NOTE: You probably want to run web, server, and common in three seperate terminals. They use hot reloading.

## Contributors

- **Advaith Nair**

  - _Full Stack Developer_
  - [Website](https://advaithnair.com)

- **Dominic Hupp**
  - _Full Stack Developer_
  - [Website](https://domhupp.space/)

## Contact

For questions, feel free to contact me at [advaithnair2@gmail.com](mailto:advaithnair2@gmail.com)/[adn323@lehigh.edu](mailto:adn323@lehigh.edu) or Dom at [d-hupp@onu.edu](mailto:d-hupp@onu.edu).
