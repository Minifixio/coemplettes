import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';

function ShipperCharterPage({navigation}) {
  const [acceptCharter, setAcceptCharter] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.text, styles.header]}>Charte du livreur</Text>

        <Text style={[styles.text, styles.subHeader]}>
          Données personnelles
        </Text>
        <Text style={[styles.text]}>
          Nous sommes susceptibles de collecter les données suivantes vous
          concernant : uniquement les donnéees que vous avez renseigneées, car
          nous n'enregistrons pas via des cookies et autres traceurs vos données
          d’utilisation lorsque vous accédez à nos services. Nous n'effectuons
          pas de mesure d'audience et nous ne recevons pas de données
          personnelles vous concernant de la part de nos partenaires. Le
          caractère obligatoire ou facultatif des données que vous renseignez
          vous est signalé lors de leur collecte par une astérisque. Pour vous
          inscrire sur Co-Emplettes en tant qu'Utilisateur, vous devez nous
          communiquer votre nom et prénom, votre adresse électronique, votre
          numéro de téléphone, et votre école. Lorsque vous créer votre compte
          livreur, vous devez compléter vos informations issues du profil
          Utilisateur en y ajoutant vos disponibilités sur chaque jour de la
          semaine à venir, votre possession d'une voiture si c'est le cas, le
          prix maximal que vous acceptez de payer pour une commande, et vos
          préférences concernant des courses en drive ou en magasin.
        </Text>

        <Text style={[styles.text, styles.subHeader]}>
          Durée de conservation
        </Text>
        <Text style={[styles.text]}>
          - Les données relatives à une commande particulière (produits de la
          liste de course) sont supprimées après la récupération de la commande
          par les Utilisateurs et la validation de son prix. En particulier, la
          photo du ticket de caisse prise par le livreur est conservée 30 jours
          après sa publication sur nos serveurs.
        </Text>

        <Text style={[styles.text]}>
          - Votre Compte Utilisateur est considéré comme inactif si vous avez
          supprimé manuellement votre Compte Personnel, ou bien si durant 3
          années consécutives, vous ne vous êtes pas connecté à celui-ci.
        </Text>

        <Text style={[styles.text, styles.subHeader]}>
          Sécurité de vos données :
        </Text>
        <Text style={[styles.text]}>
          Nous protégeons vos informations à l’aide de mesures de sécurité
          physiques, électroniques et administratives. Nos mesures de protection
          incluent notamment des pare-feu, des contrôles d’accès physiques aux
          centres de données de la DSI de Télécom Paris qui héberge nos serveurs
          et des contrôles d’autorisation d’accès aux informations.
        </Text>

        <Text style={[styles.text, styles.subHeader]}>
          Engagement du livreur :
        </Text>
        <Text style={[styles.text]}>
          En temps que livreur vous vous engagez :
        </Text>
        <Text style={[styles.text]}>
          - à respecter les dates limites de dépôts et de complétion des
          commandes de vos client.
        </Text>
        <Text style={[styles.text]}>
          - à respecter à compléter les paniers correctement avec tous les
          produits et en signalant si ces derniers ne sont pas disponibles -
          fournir une photo du ticket de caisse à renseigner sur l'application à
          la fin de chaque achat pour garantir la véracité du prix finalement
          payé - à assurer un bon dépôt des commandes en respectant le transfert
          des produits livrés ainsi que les infrastrucures de dépôt (locker)
        </Text>
        <Text style={[styles.text]}>
          - fournir une photo du ticket de caisse à renseigner sur l'application
          à la fin de chaque achat pour garantir la véracité du prix finalement
          payé
        </Text>
        <Text style={[styles.text]}>
          - à assurer un bon dépôt des commandes en respectant le transfert des
          produits livrés ainsi que les infrastrucures de dépôt (locker)
        </Text>

        <Text style={[styles.text, styles.subHeader]}>Vos droits :</Text>
        <Text style={[styles.text]}>
          Droit d'accès : il s’agit de votre droit d’obtenir la confirmation que
          vos données sont traitées ou non, et si oui, d’accéder à ces données.
        </Text>

        <Text style={[styles.text]}>
          Droit de rectification : il s’agit de votre droit d’obtenir, dans les
          meilleurs délais, que vos données inexactes soient rectifiées, et que
          vos données incomplètes soient complétées. Vous pouvez en outre, à
          tout moment, modifier les données personnelles de votre Compte
          Personnel. Il vous suffit de vous rendre dans votre Compte Personnel
          et de cliquer sur l’onglet « Paramètres ».
        </Text>

        <Text style={[styles.text]}>
          Droit de suppression/Effacement : il s’agit de votre droit d’obtenir,
          dans les meilleurs délais, l’effacement de vos données, sous réserve
          des motifs et exceptions pouvant justifier leur conservation.
        </Text>

        <Text style={[styles.text]}>
          Droit à la portabilité : il s’agit de votre droit de recevoir vos
          données dans un format structuré, couramment utilisé, lisible par
          machine et interopérable, et de les transmettre à un autre responsable
          du traitement sans que nous y fassions obstacle.
        </Text>

        <Text style={[styles.text]}>
          Directives en cas de décès : vous avez le droit de donner des
          directives pour le sort de vos données personnelles en cas de décès.
        </Text>

        <View style={styles.switchView}>
          <Switch
            trackColor={{false: 'red', true: 'green'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setAcceptCharter(!acceptCharter);
            }}
            value={acceptCharter}
          />
          <Text style={styles.switchText}>J'accepte les conditions</Text>
        </View>
      </ScrollView>

      <View style={styles.acceptButtonView}>
        {/* <Button
          title="Créer son profil livreur"
          disabled={!acceptCharter}
          color="green"
          style={styles.acceptButton}
          onPress={() => {}}
        /> */}
        <Pressable
          style={[
            acceptCharter
              ? styles.acceptButtonValid
              : styles.acceptButtonDisabled,
            styles.acceptButton,
          ]}
          onPress={() => {
            if (acceptCharter) {
              navigation.navigate('ShipperInformationPage');
            }
          }}>
          <Text style={styles.buttonText}>Créer son profil livreur</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  acceptButtonView: {
    marginBottom: 10,
  },
  acceptButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  acceptButtonValid: {
    backgroundColor: 'green',
  },
  acceptButtonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeader: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  switchView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    padding: 10,
  },
  switchText: {
    color: 'black',
    fontSize: 20,
  },
});

export default ShipperCharterPage;
