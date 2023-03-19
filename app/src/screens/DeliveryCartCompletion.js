import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BasicButton from '../components/BasicButton';

const cart_response =
  require('../assets/json/cart_response.json').cart_response;

const Divider = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: 2,
        color: 'black',
        width: '90%',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
      }}
    />
  );
};

const CartItem = function ({item}) {
  const [valid, setValid] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const clickValidButton = () => {
    setValid(!valid);
    setInvalid(false);
  };

  const clickInvalidButton = () => {
    setInvalid(!invalid);
    setValid(false);
  };

  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={
          valid
            ? ['#ffffff', '#88DC5F']
            : invalid
            ? ['#ffffff', '#DC6E5F']
            : ['#ffffff', '#e6e6e6']
        }
        style={styles.productCartItemContainer}>
        <Pressable style={styles.productCartItemPressable}>
          <TouchableOpacity
            style={styles.imageProductContainer}
            onPress={() => {}}>
            <Image style={styles.icon} source={{uri: item.product.icon_link}} />
          </TouchableOpacity>
          <View style={styles.nameQuantityView}>
            <Text style={styles.productNameText}>{item.product.name}</Text>
            <Text style={styles.productQuantityText}>x{item.quantity}</Text>
            <Text style={styles.productQuantityTypeText}>
              {item.product.quantity_type}
            </Text>
          </View>
          <View style={styles.validationsButtonView}>
            <Pressable
              style={
                !invalid
                  ? [styles.validationsButton, styles.validationsButtonValid]
                  : [styles.validationsButton, styles.validationsButtonDisabled]
              }
              onPress={clickValidButton}>
              <Ionicons name="checkmark" size={30} color="white" />
            </Pressable>
            <Pressable
              style={
                !valid
                  ? [styles.validationsButton, styles.validationsButtonInvalid]
                  : [styles.validationsButton, styles.validationsButtonDisabled]
              }
              onPress={clickInvalidButton}>
              <Ionicons name="close-sharp" size={30} color="white" />
            </Pressable>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

function DeliveryCartCompletion() {
  /**
   * MOCKUP DATA
   *
   * _carts
   * */

  const _carts = cart_response;
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setCarts(_carts);
  }, [_carts]);

  const CartItemsList = ({cartItems, ownerName}) => {
    return (
      <View style={styles.cartItemsListView}>
        <View style={styles.ownerNameView}>
          <Text style={styles.ownerNameText}>{ownerName}</Text>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 10,
              color: 'black',
              width: '90%',
              marginLeft: 5,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>
        <FlatList
          style={styles.cartItemsList}
          data={cartItems}
          renderItem={({item}) => <CartItem item={item} />}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.container}>
        <FlatList
          data={carts}
          renderItem={({item}) => (
            <CartItemsList cartItems={item.items} ownerName={item.owner_name} />
          )}
          keyExtractor={item => item.id}
        />
        <View style={styles.bottomCard}>
          <View style={styles.totalTextView}>
            <Text style={styles.subtotalText}>Produits manquants : 5</Text>
          </View>
          <View style={styles.totalTextView}>
            <Text style={styles.subtotalText}>Produits non trouvés : 5</Text>
          </View>
          <Divider />
          <BasicButton
            style={styles.validationButton}
            onClick={() => {
              //navigation.navigate('CurrentCartOrderPage', {screen: 'Account'});
            }}
            text="Valider l'achat"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  ownerNameView: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerNameText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
  },
  cartItemsList: {
    padding: 2,
  },
  cartItemsListView: {
    marginBottom: 40,
    marginTop: 10,
  },
  imageProductContainer: {
    display: 'flex',
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  productNameText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  validationsButtonView: {
    position: 'absolute',
    right: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  validationsButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  validationsButtonValid: {
    backgroundColor: 'green',
  },
  validationsButtonInvalid: {
    backgroundColor: 'red',
  },
  validationsButtonDisabled: {
    backgroundColor: 'grey',
  },
  productQuantityText: {
    fontSize: 25,
    color: 'black',
    fontWeight: '900',
  },
  productQuantityTypeText: {
    fontSize: 15,
    color: 'black',
  },
  productCartItemPressable: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameQuantityView: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  productCartItemContainer: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: 16,
    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    height: 100,
    padding: 5,
    marginTop: 2,
  },
  totalTextView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
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
});

export default DeliveryCartCompletion;
