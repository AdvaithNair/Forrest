import User from '../entities/user';

const parseUser = async (
  id: number,
  relations?: string[],
  where?: { [k: string]: any }
) => {
  const user = await User.findOne(id, { relations, where });
  delete user!.password;
  delete user!.count;
  delete user!.role;

  return user;
};

export default parseUser;
