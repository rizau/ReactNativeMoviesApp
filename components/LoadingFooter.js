import { View, ActivityIndicator, StyleSheet } from "react-native";
const loadingFooter = ({ isLoading }) => {
  return <View style={styles.container}>{isLoading ? <ActivityIndicator animating size="large" /> : null}</View>;
};
export default loadingFooter;
const styles = StyleSheet.create({ container: { marginBottom: 100 } });
