import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasicButton from '../components/BasicButton';
const carts = require('../assets/json/carts.json').carts;
const deliveries = require('../assets/json/deliveries.json').deliveries;

function CurrentCartOrder({navigation, route}) {
  /**
   * MOCKUP DATAS
   * cart
   * delivery
   * status
   *
   * l'idée c'est d'ensuite les passer en paramètre de route
   */

  const cart = carts[0];
  const [status, setStatus] = useState(cart.status);

  return (
    <View style={styles.container}>
      <View style={styles.progressView}>
        <View style={styles.progressCircleView}>
          <View
            style={[
              styles.progressCircle,
              status === 1 || status === 2 || status === 3
                ? styles.progressCircleSelected
                : styles.progressCircleUnselected,
            ]}>
            <Text style={styles.progressCircleInnerText}>1</Text>
          </View>
        </View>

        <View
          style={[
            styles.progressLine,
            status >= 2
              ? styles.progressLineSelected
              : styles.progressLineUnselected,
          ]}
        />

        <View style={styles.progressCircleView}>
          <View
            style={[
              styles.progressCircle,
              status >= 2
                ? styles.progressCircleSelected
                : styles.progressCircleUnselected,
            ]}>
            <Text style={styles.progressCircleInnerText}>2</Text>
          </View>
        </View>

        <View
          style={[
            styles.progressLine,
            status === 3
              ? styles.progressLineSelected
              : styles.progressLineUnselected,
          ]}
        />

        <View style={styles.progressCircleView}>
          <View
            style={[
              styles.progressCircle,
              status === 3
                ? styles.progressCircleSelected
                : styles.progressCircleUnselected,
            ]}>
            <Text style={styles.progressCircleInnerText}>3</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressTextView}>
        <Text style={styles.progressCircleLabel}>Liste placée</Text>
        <Text style={styles.progressCircleLabel}>Commande</Text>
        <Text style={styles.progressCircleLabel}>Récupération</Text>
      </View>

      <View style={styles.infoView}>
        {status === 1 && (
          <View style={styles.infoSubView}>
            <Text style={styles.infoText}>
              Votre date limite : &nbsp;
              {new Intl.DateTimeFormat('en-US').format(new Date(cart.deadline))}
            </Text>
            <Text style={styles.infoText}>
              Prochaine génération de commande :
            </Text>
            <Text style={styles.infoTextLight}>
              Il y actuellement 4 propositions de livreurs en cours
            </Text>
          </View>
        )}

        {status === 2 && (
          <View style={styles.infoSubView}>
            <Text style={styles.infoText}>
              Votre date limite : &nbsp;
              {new Intl.DateTimeFormat('en-US').format(new Date(cart.deadline))}
            </Text>
            <View style={styles.infoShipper}>
              <Text style={styles.infoText}>
                Livreur proposé : Carla George
              </Text>
            </View>

            <Text style={styles.infoTextLight}>
              Date de livraison prévue : 10/11/2023
            </Text>
            <View style={styles.estimatedPriceView}>
              <Text style={styles.infoText}>Prix estimé :</Text>
              <Text
                style={[
                  styles.estimatedPriceText,
                  styles.estimatedPriceTextMin,
                ]}>
                45.10€
              </Text>
              <Text style={styles.infoText}> - </Text>
              <Text
                style={[
                  styles.estimatedPriceText,
                  styles.estimatedPriceTextMax,
                ]}>
                50.30€
              </Text>
            </View>
          </View>
        )}

        {status === 3 && (
          <View style={styles.infoSubView}>
            <Text style={styles.infoText}>Commande livrée le 04/11/2022</Text>
            <Text style={styles.infoText}>A récupérer avant le 07/11/2022</Text>
          </View>
        )}
      </View>
      {status === 1 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            valid={false}
            onClick={() => {
              setStatus(status + 1);
            }}
            text="Annuler la liste"
          />
        </View>
      )}
      {status === 2 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              setStatus(status + 1);
            }}
            text="Valider et payer la caution"
          />
        </View>
      )}
      {status === 3 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              setStatus(1);
            }}
            text="Récupérer mon code Locker"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingTop: 20,
  },
  progressView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleView: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleSelected: {
    backgroundColor: 'green',
  },
  progressCircleUnselected: {
    backgroundColor: 'grey',
  },
  progressCircleInnerText: {
    color: 'white',
  },
  progressTextView: {
    display: 'flex',
    flexDirection: 'row',
    height: '5%',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
  progressCircleLabel: {
    color: 'grey',
  },
  infoView: {
    display: 'flex',
    height: '70%',
    padding: 10,
  },
  infoSubView: {
    display: 'flex',
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  infoTextLight: {
    fontSize: 15,
    color: 'grey',
    fontWeight: '400',
  },
  infoShipper: {
    display: 'flex',
  },
  estimatedPriceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  estimatedPriceText: {
    fontSize: 25,
    fontWeight: '500',
  },
  estimatedPriceTextMin: {
    color: 'green',
  },
  estimatedPriceTextMax: {
    color: 'red',
  },
  buttonView: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    bottom: 30,
  },
  progressLine: {
    display: 'flex',
    width: 100,
    height: 5,
  },
  progressLineSelected: {
    backgroundColor: 'green',
  },
  progressLineUnselected: {
    backgroundColor: 'grey',
  },
});

export default CurrentCartOrder;
