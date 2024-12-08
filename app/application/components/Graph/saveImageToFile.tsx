import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const saveImageToFile = async (base64Image: any) => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const fileUri = `${FileSystem.cacheDirectory}imagem_salva.png`;
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Erro', 'O compartilhamento não está disponível.');
    }
  } catch (error: any) {
    Alert.alert('Erro ao salvar', error.message);
  }
};

export default saveImageToFile;
