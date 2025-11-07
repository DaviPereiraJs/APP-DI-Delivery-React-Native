import { View, Pressable, Text, Image } from 'react-native';
import PagerView from "react-native-pager-view"


export function Banner() {
 return (
    <View className="w-full h-36 rounded 2xl mt-5 mb-4">
        <PagerView style={{ flex: 1 }} initialPage={0} pageMargin={14}>
            <Pressable className="w-full h-36 rounded 2xl" key="1" onPress={() => console.log("CLICOU NO BANNER 1")}>
                <Image source={require("../../assets/banner1.png") }/>
            </Pressable>
        </PagerView>
    </View>
  );
}