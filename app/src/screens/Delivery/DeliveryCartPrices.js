import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {DeliveryService} from '../../services/DeliveryService';
import InputSpinner from 'react-native-input-spinner';
import BasicButton from '../../components/BasicButton';

const carts_mockup =
  require('../../assets/json/cart_response.json').cart_response;

const Divider = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: 10,
        color: 'black',
        width: '90%',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

function DeliveryCartPricesPage({navigation, route}) {
  const {cartsData} = route.params;
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const mockup = false;

  useEffect(() => {
    if (mockup) {
      setCarts(carts_mockup);
    } else {
      setCarts(cartsData);
    }
    const p = getTotalPrice();
    setTotalPrice(p);
  }, [cartsData, mockup, getTotalPrice, carts]);

  const getTotalPrice = useCallback(() => {
    let s = 0;
    carts.forEach(cart => {
      s += cart.price_to_pay;
    });
    return s;
  }, [carts]);

  const endShopping = async () => {
    await DeliveryService.deliveryEndShopping(carts[0].delivery_id, carts);
    navigation.navigate('DeliveryTracking');
  };

  const StatusItem = ({cart}) => {
    const iconName = 'cash-outline';
    const user = cart.owner
      ? cart.owner.first_name + ' ' + cart.owner.last_name
      : 'John Doe';
    const productsCount = cart.items.length;
    const deadline = new Date(cart.deadline).toLocaleDateString('fr');
    cart.price_to_pay = cart.average_price;

    let unavailableProductsCount = 0;
    cart.items.forEach(item => {
      if (item.status === 2) {
        unavailableProductsCount++;
      }
    });

    return (
      <View style={styles.statusItemContainer}>
        <View style={styles.statusItemCard}>
          <View style={styles.statusItemCardSubView}>
            <View style={[styles.statusItemIconView]}>
              <Ionicons
                style={styles.statusItemIcon}
                name={iconName}
                size={40}
                color={'grey'}
              />
            </View>
            <View style={styles.statusItemTextView}>
              <Text style={styles.statusItemTitle}>{user}</Text>
              <Text style={styles.statusItemSubtitle}>
                Deadline : {deadline}
              </Text>
              <Text style={styles.statusItemSubtitle}>
                {productsCount} produits - {unavailableProductsCount} manquants
              </Text>
              <View style={styles.inputSpinnerView}>
                <Text style={styles.inputSpinnerText}>Prix final </Text>
                <InputSpinner
                  style={styles.inputSpinner}
                  skin="square"
                  colorLeft="#539903"
                  colorRight="#539903"
                  height={40}
                  max={100}
                  min={0}
                  step={0.5}
                  colorMax={'#f04048'}
                  colorMin={'#40c5f4'}
                  value={cart.average_price}
                  placeholder={'Prix' + user}
                  type="float"
                  onChange={num => {
                    cart.price_to_pay = num;
                    const p = getTotalPrice();
                    setTotalPrice(p);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.pressableView}>
            <Pressable
              style={styles.photoPressable}
              onPress={() =>
                navigation.navigate('DeliveryCartPricesCameraPage')
              }>
              <Text style={styles.photoText}>Prendre une photo du ticket</Text>
              <Ionicons
                style={styles.statusItemIcon}
                name={'camera-outline'}
                size={35}
                color={'grey'}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#ffffff', '#f2f2f2']}
          style={styles.container}>
          <FlatList
            data={carts}
            style={styles.container}
            renderItem={({item}) => (
              <StatusItem cart={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
        </LinearGradient>
      </SafeAreaView>
      <View style={styles.bottomCard}>
        <View style={styles.totalTextView}>
          <Text style={styles.subtotalText}>Sous-total</Text>
          <Text style={styles.subtotalText}>
            {Math.round(totalPrice * 100) / 100}€
          </Text>
        </View>
        <View style={styles.totalTextView}>
          <Text style={styles.subtotalText}>Pour le livreur</Text>
          <Text style={styles.subtotalText}>
            {Math.round(getTotalPrice() * 0.1 * 100) / 100}€
          </Text>
        </View>

        <Divider />

        <View style={styles.totalTextView}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>
            {Math.round(totalPrice * 1.1 * 100) / 100}€
          </Text>
        </View>

        <BasicButton
          style={styles.validationButton}
          onClick={() => {
            endShopping();
          }}
          text="Valider les prix et finaliser"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    height: '100%',
  },
  statusItemContainer: {
    flex: 1,
    marginBottom: 10,
  },
  statusItemCard: {
    margin: 10,
    marginBottom: 0,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  statusItemCardSubView: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputSpinner: {
    width: '60%',
  },
  pressableView: {
    display: 'flex',
    width: '90%',
  },
  inputSpinnerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSpinnerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusItemTextView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  statusItemTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  statusItemSubtitle: {
    fontSize: 15,
    color: 'grey',
    marginBottom: 5,
  },
  statusItemIconView: {
    borderRadius: 40,
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusItemIconViewSelected: {
    backgroundColor: '#89f77e',
  },
  statusItemIconViewUnselected: {
    backgroundColor: '#dbdbdb',
  },
  statusItemIcon: {
    width: 40,
    height: 40,
  },
  buttonView: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    bottom: 10,
  },
  emptyText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  emptyTextView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor:
      'linear-gradient(61deg, rgba(205,239,137,1) 35%, rgba(88,156,0,1) 100%)',
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  linearGradientAcceptButton: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
    borderRadius: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  totalTextView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotalText: {
    color: 'black',
    fontSize: 15,
  },
  totalText: {
    color: 'black',
    fontSize: 30,
  },
  bottomCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 24,
  },
  validationButton: {
    size: '90%',
  },
  photoPressable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    padding: 5,
    elevation: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  photoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
});

export default DeliveryCartPricesPage;
