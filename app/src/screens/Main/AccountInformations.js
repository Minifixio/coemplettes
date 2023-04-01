import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import BasicButton from '../../components/BasicButton';
import LinearGradient from 'react-native-linear-gradient';
import {UserService} from '../../services/UserService';
import Toast from 'react-native-toast-message';

const profilePicture = require('../../assets/icons/misc/profile_picture.png');

const Separator = () => <View style={styles.separator} />;

function AccountInformationsPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const updateInfos = async () => {
    console.log('[AccountInformations] Récupération des infos...');
    try {
      if (password !== passwordConfirm) {
        Toast.show({
          type: 'error',
          text1: 'Confirmez correctement le mot de passe',
        });
      } else {
        await UserService.updateUserProfile({
          first_name: firstName,
          last_name: lastName,
          email,
          school,
          phone,
          password,
        });
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Mise à jour des informations !',
          });
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infos = await UserService.getUserProfile();
        setEmail(infos.email);
        setLastName(infos.last_name);
        setFirstName(infos.first_name);
        setSchool(infos.school);
        setPhone(infos.phone);
        setSchool(infos.school);
        console.log(infos);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.photoView}>
        <Image style={styles.profileImage} source={profilePicture} />
      </LinearGradient>
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <Text style={[styles.text, styles.helloText]}>
            Mettre à jour ses informations
          </Text>
        </View>

        <View style={styles.nameContainer}>
          <TextInput
            textAlign={'left'}
            style={[styles.textInput, styles.nameInput]}
            placeholder="Nom."
            placeholderTextColor="#003f5c"
            onChangeText={newText => setLastName(newText)}
            defaultValue={lastName}
          />

          <TextInput
            textAlign={'left'}
            style={[styles.textInput, styles.nameInput]}
            placeholder="Prénom."
            placeholderTextColor="#003f5c"
            onChangeText={newText => setFirstName(newText)}
            defaultValue={firstName}
          />
        </View>
        <TextInput
          textAlign={'left'}
          style={styles.textInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={newText => setEmail(newText)}
          defaultValue={email}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Ecole."
          placeholderTextColor="#003f5c"
          onChangeText={newText => setSchool(newText)}
          defaultValue={school}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Téléphone."
          placeholderTextColor="#003f5c"
          onChangeText={newText => setPhone(newText)}
          defaultValue={phone}
        />

        <Separator />
        <Separator />

        <TextInput
          style={styles.textInput}
          placeholder="Mot de passe."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={newText => setPassword(newText)}
          defaultValue={password}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Confirmer le mot de passe."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={newText => setPasswordConfirm(newText)}
          defaultValue={passwordConfirm}
        />
        <Separator />
        <BasicButton onClick={() => updateInfos()} text="Mettre à jour" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  photoView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'grey',
  },
  textInput: {
    position: 'relative',
    padding: 8,
    margin: 3,
    color: 'black',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  nameInput: {
    width: '50%',
    marginRight: 0,
    marginLeft: 0,
  },
  nameContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    display: 'flex',
    paddingBottom: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'left',
  },
  textInputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: 10,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
  },
  helloText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AccountInformationsPage;
