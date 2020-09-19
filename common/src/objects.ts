export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  OWNER: 'OWNER'
};

export const COOKIE_NAMES = {
  ACCESS: 'at',
  REFRESH: 'rt'
};

export const TOKEN_DURATIONS = {
  ACCESS: '15m',
  REFRESH: '30d',
  ACCESS_DATE: new Date(Date.now() + 1000 * 60 * 15),
  REFRESH_DATE: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
};

export const ERRORS = {
  GENERAL: {
    EMAIL: 'Must Be A Valid Email Address',
    BLANK: 'Must Not Be Empty',
    PASSWORD_SHORT: 'Must Be At Least 6 Characters',
    INVALID: 'Invalid Credentials'
  },
  AUTH: {
    NOT_LOGGED_IN: 'Unauthorized: Not Logged In',
    UNAUTHORIZED: 'Unauthorized',
    LOG_BACK_IN: 'Unauthorized: Log Back In',
    USER_NOT_FOUND: 'User Not Found'
  },
  SIGNUP: {
    EMAIL_USERNAME_IN_USE: 'Email or Username Already In Use',
    UNABLE: 'Unable To Sign Up User',
    USERNAME_SHORT: 'Username Too Short',
    USERNAME_LONG: 'Username Too Long'
  },
  SIGNIN: {
    USER_NONEXISTENT: 'User Does Not Exist'
  },
  LOGOUT: {
    SUCCESS: 'Successfully Logged Out',
    USER_UNAVAILABLE: 'User Not Available'
  },
  UPDATE_USER: {
    UNABLE: 'Unable To Update User',
    SOCIAL_MEDIA: 'Unable To Update Social Media',
    DRIVE_INFO: 'Unable To Update Drive Info'
  },
  FILE_UPLOAD: {
    NO_FILE: 'Please Upload File',
    FILENAME: 'Invalid File Name'
  },
  LOG: {
    CREATE: 'Unable to Create Route Entry',
    CONFIRM: 'Unable to Confirm Route Entry',
    NOT_FOUND: 'Route Entry Not Found'
  }
};

export const COLORS = {
  PRIMARY: '#7E8D2B',
  SECONDARY: '#005B13',
  BUBBLY_START: '#7E8D2B',
  BUBBLY_STOP: '#005B13'
};

export const LOCALSTORAGE = {
  USER: 'userData'
};

export const FILE_UPLOADS = {
  PROFILE_PICTURE: 'profile-picture'
};

// User Defaults for Drive Settings
export const USER_DRIVE_DEFAULTS = {
  VEHICLE_TYPE: 'SEDAN',
  AVERAGE_MPH_OVER_HIGHWAY: 3,
  AVERAGE_MPH_OVER_CITY: 0
};

// Car Types for Forrest
export const CAR_TYPES = {
  SEDAN: 'SEDAN',
  HYBRID_SEDAN: 'HYBRID_SEDAN',
  TRUCK: 'TRUCK',
  VAN: 'VAN',
  SUV: 'SUV',
  MOTORCYCLE: 'MOTORCYCLE',
  ELECTRIC: 'ELECTRIC'
};

export const CARBON_SAVINGS = {
  CARBON_PER_TREE: 500
}