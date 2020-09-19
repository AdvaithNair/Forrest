# API Documentation

## Types

- User

  - id
  - email
  - username
  - firstName
  - lastName
  - imageURL
  - facebook
  - instagram
  - twitter
  - snapchat
  - carType
  - avgHighwayOver
  - avgCityOver
  - carbonSaved
  - routesTaken
  - routeLogs (Type RouteLog)

- RouteLog
  - id (at times)
  - userID
  - route
  - date
  - carType
  - avgHighwayOver
  - avgCityOver
  - carbonSaved
  - verified

## Routes

### /ping

```
/
```

GET: Route for Testing API. Returns "pong!" if done right.

- Returns
  - "pong!"

### /api/users

```
/
```

GET: Returns User's Own User Info.

- Returns
  - User

```
/signup
```

POST: Signs Up and Creates User. Returns User Info and Authentication Token Cookies.

- Parameters
  - Email
  - Password
  - Username
  - First Name
  - Last Name
- Returns
  - User

```
/signin
```

POST: Signs In User. Returns User Info and Authentication Token Cookies.

- Parameters
  - Email
  - Password
- Returns
  - User

```
/signout
```

POST: Signs Out User. Returns Success Message.

- Parameters
  - None
- Returns
  - message

```
/update
```

PUT: Updates User Info. Returns Updated User Info.

- Parameters
  - email
  - username
  - firstName
  - lastName
- Returns
  - User

```
/upload-profile-picture
```

POST: Uploads Profile Picture to Server. Returns New Image URL.

- Parameters
  - Image File (Form Data, key = 'profile-picture')
- Returns
  - imageURL

```
/update/social-media
```

PUT: Updates User Social Media. Returns User.

- Parameters
  - provider (Social Media Type: Facebook, Instagram, Twitter, Snapchat)
  - username (Username for designated Social Media)
- Returns
  - User

```
/update/drive
```

PUT: Updates User Drive Info. Returns User.

- Parameters
  - parameters (Object containing any of the following three parameters)
    - carType (string, type of car user drives)
    - avgHighwayOver (number, average MPH above highway speed user drives)
    - avgCityOver (number, average MPH above city user drives)
- Returns
  - User

```
/user/log/add
```

POST: Adds Route to Log. Returns New Log Entry.

- Parameters
  - route (string description of route)
  - carbonSaved (number of lbs of CO2 saved)
- Returns
  - RouteLog

```
/user/log/confirm
```

PUT: Confirms (verifies) Log with Given Route. Returns Updated Log Entry.

- Parameters
  - route (string description of route)
- Returns
  - RouteLog
