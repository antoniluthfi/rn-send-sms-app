import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SendDirectSms} from 'react-native-send-direct-sms';
import Snackbar from 'react-native-snackbar';

export default function App() {
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [bodySMS, setBodySMS] = React.useState('');

  function sendSmsData(number: string, sms: string) {
    let errorMessage = '';
    if (!number) {
      errorMessage = 'Masukkan nomor HP!';
    } else if (!sms) {
      errorMessage = 'Masukkan pesan!';
    }

    if (errorMessage) {
      Snackbar.show({
        text: errorMessage,
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    } else {
      SendDirectSms(number, sms)
        .then(() => {
          Snackbar.show({
            text: `Pesan ke nomor ${mobileNumber} terkirim`,
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'OK',
              textColor: 'green',
              onPress: () => {
                Snackbar.dismiss();
              },
            },
          });
        })
        .catch((err: any) => {
          Snackbar.show({
            text: `${err}`,
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'OK',
              textColor: 'green',
              onPress: () => {
                Snackbar.dismiss();
              },
            },
          });
        });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text style={styles.titleText}>Aplikasi Pengirim Pesan SMS</Text>
      <Text style={styles.titleTextsmall}>Kirim ke</Text>
      <TextInput
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder={'Nomor HP'}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <Text style={styles.titleTextsmall}>Teks</Text>
      <TextInput
        value={bodySMS}
        onChangeText={setBodySMS}
        placeholder={'Masukkan pesan teks'}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => sendSmsData(mobileNumber, bodySMS)}>
        <Text style={styles.sendButtonLabel}>Kirim SMS</Text>
      </TouchableOpacity>

      <Text style={styles.text}>043008937</Text>
      <Text style={styles.text}>Lintang Luthfiantoni</Text>
      <Text style={styles.text}>UPBJJ UT Banjarmasin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  sendButtonLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#22C674',
    borderRadius: 4,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 30,
  },
  titleText: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 20,
    alignSelf: 'center',
    color: '#000000',
  },
  titleTextsmall: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
    alignSelf: 'flex-start',
    color: '#000000',
  },
  text: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#000000',
  },
  textInput: {
    paddingLeft: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#3F44511F',
    borderRadius: 4,
    height: 44,
    color: '#000000',
    opacity: 0.75,
    width: '100%',
  },
});
