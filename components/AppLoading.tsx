import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface AppLoadingProps {
  loadingText?: string; // Optional prop to display loading text
}

const AppLoading: React.FC<AppLoadingProps> = ({ loadingText }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#5171A5" />
      {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Change background color
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default AppLoading;
