import { View, ScrollView } from "react-native";
import LiveUpdates from "../components/LiveUpdates";
import statusStyles from "../styles/StatusScreenStyles";
import BackButton from "../components/BackButton";

export default function StatusScreen({ navigation }) {
  return (
    <ScrollView
      style={statusStyles.scroll}
      contentContainerStyle={statusStyles.content}
    >
      <BackButton onPress={() => navigation.goBack()} />
      <View style={statusStyles.contentView}>
        <LiveUpdates />
      </View>
    </ScrollView>
  );
}

