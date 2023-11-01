import React, { useState } from 'react';

import {
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
} from '@gluestack-ui/themed';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useAuth } from '../../contexts/Auth';

type ProfileProps = BottomTabScreenProps<PrivateStackParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setIsLoading(true);
  const handleClose = () => setIsLoading(false);

  const handleExitApp = async () => {
    handleOpen();
    await handleLogout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
    handleClose();
  };

  return (
    <Center flex={1}>
      <Button onPress={handleExitApp}>
        {isLoading ? (
          <>
            <ButtonSpinner mr="$1" />
            <ButtonText fontWeight="$medium" fontSize="$sm">
              Please wait...
            </ButtonText>
          </>
        ) : (
          <ButtonText fontWeight="$medium" fontSize="$sm">
            Please wait...
          </ButtonText>
        )}
      </Button>
    </Center>
  );
};

export default Profile;
