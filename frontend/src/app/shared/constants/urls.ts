// const BASE_URL = 'http://localhost:5000'
import { environment } from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_UPDATE_PROFILE_URL = BASE_URL + '/api/users/updateProfile';
export const USER_CHANGE_PASSWORD_URL = BASE_URL + '/api/users/changePassword';
export const GET_ALL_USERS = BASE_URL + '/api/users/getAll/';
export const USER_BLOCK_URL = BASE_URL + '/api/users/toggleBlock/';
export const USER_BY_ID_URL = BASE_URL + '/api/users/getById/';
export const UPDATE_USER_URL = BASE_URL + '/api/users/update/';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const ORDER_STATUSES_URL = ORDERS_URL + '/allstatus';

export const UPLOAD_URL = BASE_URL + '/api/upload';