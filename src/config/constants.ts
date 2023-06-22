import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
    jwt_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET
};
