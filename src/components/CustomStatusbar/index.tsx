import React from 'react';

import { Platform, StatusBar, View } from 'react-native';

import { config } from '../../config/gluestack-ui.config';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const CustomStatusbar: React.FC = () => {
  const primary = config.tokens.colors.primary700;
  return (
    <View style={[{ height: STATUSBAR_HEIGHT }, { backgroundColor: primary }]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={primary}
      />
    </View>
  );
};

export default CustomStatusbar;
