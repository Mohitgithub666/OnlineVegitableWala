import { useState } from 'react';
import { View, Text, Share } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../styles/responsiveSize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Help from './Help';
import Aboutus from './Aboutus';


export default function SideModal() {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation()

    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    const ShareAPkLink = async () => {
        // const  message = `Check out this App`
        const shareOptions = {
            message: `Check out this App! \n https://play.google.com/store/apps/details?id=com.nanoomnistore`,
            // url: `data:application/pdf;base64,${pdfBase64Data}`,
            title: 'GrocerySpot '
        };
        Share.share(shareOptions)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });

    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Menu
                visible={visible}
                anchor={
                    <TouchableOpacity onPress={showMenu} >
                        <Icon
                            name={'dots-vertical'}
                            style={{ color: '#000', fontSize: scale(35) }}
                        />
                    </TouchableOpacity>
                }
                onRequestClose={hideMenu}
            >
                {/* <MenuItem onPress={hideMenu} >Logout</MenuItem> */}
                <MenuItem onPress={() => { ShareAPkLink() }} textStyle={{ color: "#000" }}>Share</MenuItem>
                <MenuItem onPress={() => { navigation.navigate(Help) }} textStyle={{ color: "#000" }}>Help</MenuItem>
                {/* <MenuItem disabled>Disabled About Us</MenuItem> */}
                {/* <MenuDivider /> */}
                <MenuItem onPress={() => navigation.navigate(Aboutus)} textStyle={{ color: "#000" }}>About Us</MenuItem>
            </Menu>
        </View>
    );
}