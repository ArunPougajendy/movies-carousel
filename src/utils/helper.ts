import APIKEY from '../services/config';

export function isApikeyAvailable() {
  if (APIKEY) {
    return true;
  } else {
    return false;
  }
}
