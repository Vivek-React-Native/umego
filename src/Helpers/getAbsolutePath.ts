import RNFS from 'react-native-fs';
export async function getAbsolutePath(
  assetPath: string,
  extension: string = 'png',
): Promise<string | null> {
  const destination = `${RNFS.TemporaryDirectoryPath}${Math.random()
    .toString(36)
    .substring(7)}.${extension}`;
  try {
    return await RNFS.copyAssetsFileIOS(
      assetPath,
      destination,
      500,
      500,
      undefined,
      1,
    );
  } catch (error) {
    return null;
  }
}
