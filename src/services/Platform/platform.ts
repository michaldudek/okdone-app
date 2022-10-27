export enum Platform {
  Mac = 'mac',
  Windows = 'windows',
  iOS = 'ios',
  Android = 'android',
  Other = 'other',
}

export const getPlatform = (): Platform => {
  const navigatorPlatform = window.navigator.platform;

  if (/android/i.test(navigatorPlatform)) {
    return Platform.Android;
  }

  if (/iphone|ipod|ipad/i.test(navigatorPlatform)) {
    return Platform.iOS;
  }

  if (/macintosh|macintel|macppc|mac/i.test(navigatorPlatform)) {
    return Platform.Mac;
  }

  if (/windows|win16|win32|win64/i.test(navigatorPlatform)) {
    return Platform.Windows;
  }

  return Platform.Other;
};

export const isIOS = () => getPlatform() === Platform.iOS;
export const isMac = () => getPlatform() === Platform.Mac;
export const isApple = () =>
  [Platform.iOS, Platform.Mac].includes(getPlatform());
export const isWindows = () => getPlatform() === Platform.Windows;
export const isAndroid = () => getPlatform() === Platform.Android;
