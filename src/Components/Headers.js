import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, textScale} from '../styles/responsiveSize';
import imgPath from '../constants/imgPath';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Profile from '../screens/Profile';
import SideModal from './SideModal';
import Login from '../screens/Login';
import Cart from '../screens/Cart';
import {useDispatch, useSelector} from 'react-redux';
import {ViewOrderMethod} from '../redux/actions/UserAction';

const Headers = props => {
  const {
    title,
    back,
    quantity,
    showProfile,
    showShare,
    showBack,
    showLogin,
    showCart = false,
    isOrderRelod,
  } = props;
  const [showImage, setShowImage] = useState(back === true ? back : false);
  const navigation = useNavigation();
  const cartArray = useSelector(state => state?.product.cart?.data?.products);
  const cartLength = cartArray?.length > 0 ? cartArray.length : null;
  const dispatch = useDispatch();
  const product = useSelector(state => state?.auth?.data?.customer_data);

  useEffect(() => {
    setShowImage(back === true ? back : false);
  }, [quantity, back]);

  return (
    <View style={styles.container}>
      <View style={styles.insideConteiner}>
        {showImage && (
          <TouchableOpacity>
            <Image style={styles.imgStyle} source={imgPath.backIcon} />
          </TouchableOpacity>
        )}
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.imgStyle} source={imgPath.backIcon} />
          </TouchableOpacity>
        )}

        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={[styles.titleTxt, {marginRight: 20}]}>{quantity}</Text>
        {showProfile && (
          <TouchableOpacity onPress={() => navigation.navigate(Profile)}>
            <Icon
              name={'account'}
              style={{color: '#ECE447', fontSize: scale(35)}}
            />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity
            onPress={() => navigation.navigate(Cart)}
            style={{marginRight: 20, marginTop: 5}}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                borderRadius: 6,
                width: 13,
                height: 13,
                justifyContent: 'center',
                alignItems: 'center',
                right: -6,
                top: -3,
              }}>
              <Text style={{color: 'white', fontSize: 9}}>
                {cartLength || '0'}
              </Text>
            </View>
            <Icon name={'cart'} style={{color: '#000', fontSize: scale(30)}} />
          </TouchableOpacity>
        )}
        {showLogin && (
          <TouchableOpacity onPress={() => navigation.navigate(Login)}>
            <Text
              style={[
                styles.titleTxt,
                {
                  marginRight: 20,
                  fontSize: 18,
                  backgroundColor: '#ECE447',
                  paddingHorizontal: 6,
                  borderRadius: 4,
                },
              ]}>
              LogIn
            </Text>
          </TouchableOpacity>
        )}
        {isOrderRelod && (
          <TouchableOpacity
            onPress={() =>
              dispatch(ViewOrderMethod(product?.storeId, product?.saasId))
            }>
            <Icon name={'reload'} size={26} />
          </TouchableOpacity>
        )}
        {showShare && <SideModal />}
      </View>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  insideConteiner: {
    marginHorizontal: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: textScale(22),
    color: 'black',
    marginLeft: scale(14),
    fontWeight: '700',
  },
  imgStyle: {
    width: scale(35),
    height: scale(35),
  },
});
