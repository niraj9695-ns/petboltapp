import { View, ScrollView } from "react-native";
import LiveUpdates from "../components/LiveUpdates";
import statusStyles from "../styles/StatusScreenStyles";

export default function StatusScreen() {
  return (
    <ScrollView
      style={statusStyles.scroll}
      contentContainerStyle={statusStyles.content}
    >
      <View style={statusStyles.contentView}>
        <LiveUpdates />
      </View>
    </ScrollView>
  );
}

