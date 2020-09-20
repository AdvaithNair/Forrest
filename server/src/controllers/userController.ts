import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT, ERRORS, COOKIE_NAMES, BUCKET_URL } from '@app/common';
import User from '../entities/user';
import { getConnection, getRepository } from 'typeorm';
import parseUser from '../utils/parseUser';
import RouteLog from '../entities/routeLog';

const checkCreds = async (res: Response, email: string) => {
  try {
    // Gets User by Email
    const user = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.routeLogs', 'routeLogs')
        .where('email = :email', { email })
        .orderBy('routeLogs.date', 'DESC')
        .getOne();

    if (!user)
      return {
        payload: {},
        password: '',
        exists: false
      };

    const hash = user!.password;
    delete user!.password;

    return {
      payload: user,
      password: hash,
      exists: Boolean(user)
    };
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: ERRORS.GENERAL.INVALID
    });
  }
};

// Signup Route
export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    // Checks if User Exists
    const userExists = await checkCreds(res, email);
    if ((userExists as any).exists) {
      return res.status(400).json({
        error: ERRORS.SIGNUP.EMAIL_USERNAME_IN_USE
      });
    }

    // Hashes Password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

    // Inserts User
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      firstName,
      lastName
    }).save();
    user.routeLogs = [];
    delete user.password;
    delete user.role;
    delete user.count;

    // Sets Payload of res.locals
    res.locals = {
      ...res.locals,
      payload: user
    };

    // Proceeds
    return next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: ERRORS.SIGNUP.UNABLE
    });
  }
};

// Signin Route
export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Gets User from Credentials
    const user = await checkCreds(res, email);
    if (!(user as any).exists) {
      return res.status(400).json({
        error: ERRORS.SIGNIN.USER_NONEXISTENT
      });
    }

    // Validates Password
    const isPasswordValid = await bcrypt.compare(
        password,
        (user as any).password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        error: ERRORS.GENERAL.INVALID
      });
    }

    res.locals = {
      ...res.locals,
      payload: (user as any).payload
    };

    return next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: ERRORS.GENERAL.INVALID
    });
  }
};

// Sign Out Route
export const signout = async (_req: Request, res: Response) => {
  try {
    // Throws Error if User isn't in Payload (logged in)
    if (!res.locals.payload.id) throw new Error();

    // Updates Count
    getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ count: () => 'count + 1' })
        .where('id = :id', { id: res.locals.payload.id })
        .execute();

    // Clears Cookies
    res.clearCookie(COOKIE_NAMES.REFRESH);
    res.clearCookie(COOKIE_NAMES.ACCESS);

    res.json({
      message: 'Successfully Signed Out'
    });
  } catch (error) {
    res.status(401).json({
      error: ERRORS.LOGOUT.USER_UNAVAILABLE
    });
  }
};

// Updates User Info
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Query User
    const { id } = res.locals.payload;

    // Filter Parameters
    Object.keys(req.body).forEach(key => {
      req.body[key] == '' && delete req.body[key];
    });

    // Save User
    await User.save({ ...req.body, id });
    const user = await User.findOne(id);

    res.json(user);
  } catch {
    res.status(400).json({
      error: ERRORS.UPDATE_USER.UNABLE
    });
  }
};

// Gets Own User
export const getOwnInfo = async (_req: Request, res: Response) => {
  try {
    // Gets User
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.routeLogs', 'routeLogs')
      .where('user.id = :id', { id: res.locals.payload.id })
      .orderBy('routeLogs.date', 'DESC')
      .getOne();

    if (!user) throw new Error();
    delete user.password;
    delete user.count;
    delete user.role;

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: ERRORS.AUTH.USER_NOT_FOUND
    });
  }
};

// Upload Image
export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;

    // Get File
    const file = req.file;
    if (!file) throw new Error();

    // Remove Username from Request Object
    delete (req as any).username;

    // Sets New Image URL
    const imageURL = `${BUCKET_URL}/uploads/profile-pictures/${file.filename}`;
    await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          imageURL
        })
        .where('id = :id', { id })
        .execute();

    res.json({
      imageURL
    });
  } catch {
    res.status(400).json({
      error: ERRORS.FILE_UPLOAD.NO_FILE
    });
  }
};

// Link Social Media
export const linkSocialMedia = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const { provider, username } = req.body;

    const user = await User.findOne(id);
    if (!user) throw new Error();

    // Set URL
    if (provider == 'Facebook')
      user.facebook = !username ? '' : `https://facebook.com/${username}`;
    else if (provider == 'Instagram')
      user.instagram = !username ? '' : `https://instagram.com/${username}`;
    else if (provider == 'Twitter')
      user.twitter = !username ? '' : `https://twitter.com/${username}`;
    else if (provider == 'Snapchat')
      user.snapchat = !username ? '' : `https://snapchat.com/add/${username}`;
    user.save();

    // Filter Output
    delete user.password;
    delete user.count;
    delete user.role;

    res.json(user);
  } catch {
    res.status(400).json({
      error: ERRORS.UPDATE_USER.SOCIAL_MEDIA
    });
  }
};

// Updates User Password
export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const { oldPassword, newPassword } = req.body;

    // Get User and Confirm Password
    const user = await User.findOne(id);
    if (!user) throw new Error(ERRORS.AUTH.USER_NOT_FOUND);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) throw new Error(ERRORS.GENERAL.INVALID);

    // Update Password
    user.password = await bcrypt.hash(newPassword, BCRYPT_SALT);
    user.save();

    res.json({
      message: 'Successfuly Updated Password'
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// User Drive Information Updates
export const updateDriveInfo = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const { parameters } = req.body;

    // Get User
    const user = await User.findOne(id);
    if (!user) throw new Error();

    // Parse Parameters and Update
    if (parameters.carType) user.carType = parameters.carType;
    if (parameters.avgHighwayOver)
      user.avgHighwayOver = parameters.avgHighwayOver;
    if (parameters.avgCityOver) user.avgCityOver = parameters.avgCityOver;
    user.save();

    // Filter Output
    delete user.password;
    delete user.count;
    delete user.role;

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: ERRORS.UPDATE_USER.DRIVE_INFO
    });
  }
};

// Log A Route to User
export const addRoute = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const { route, carbonSaved, estimatedDuration } = req.body;

    // Get User
    const userData = await parseUser(id);
    if (!userData) throw new Error();

    // Create Log Entry
    const logEntry = new RouteLog();
    logEntry.route = route;
    logEntry.userID = id;
    logEntry.carbonSaved = carbonSaved;
    logEntry.estimatedDuration = estimatedDuration;
    logEntry.carType = userData.carType;
    logEntry.avgHighwayOver = userData.avgHighwayOver;
    logEntry.avgCityOver = userData.avgCityOver;
    logEntry.date = new Date().toISOString();
    logEntry.verified = false;
    logEntry.user = userData;
    logEntry.save();

    // Prepare Output
    const { user, ...rest } = logEntry;
    res.json({ ...rest });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: ERRORS.LOG.CREATE
    });
  }
};

// Confirm Logged Route
export const confirmRoute = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const { route } = req.body;

    // Get Log Entry
    const logEntry = await RouteLog.findOne({
      where: { userID: id, route, verified: false }
    });
    console.log(logEntry);
    if (!logEntry) throw new Error();

    // Update Log Entry
    logEntry.verified = true;
    logEntry.save();

    // Prepare Log Entry
    delete logEntry.user;

    // Update User Entry
    const user = await parseUser(id);
    if (!user) throw new Error();
    user.routesTaken += 1;
    user.carbonSaved += logEntry.carbonSaved;
    user.save();

    res.json(logEntry);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: ERRORS.LOG.CONFIRM
    });
  }
};

// Gets User With Username
export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // Gets User
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error();

    // Filter Output
    delete user.password;
    delete user.count;
    delete user.role;

    res.json(user);
  } catch {
    res.status(400).json({
      error: ERRORS.AUTH.USER_NOT_FOUND
    });
  }
};

// Searches for Users
export const searchUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    const queryLimit = 10;

    // Gets Users
    const users = await getRepository(User)
        .createQueryBuilder('user')
        .orderBy('user.username')
        .select(['user.username', 'user.imageURL', 'user.carbonSaved'])
        .where('user.username like :name', { name: `%${username}%` })
        .limit(queryLimit)
        .getMany();

    res.json(users);
  } catch {
    res.status(400).json({
      error: ERRORS.AUTH.USER_NOT_FOUND
    });
  }
};