import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Center, useDisclose } from 'native-base';

import { useAuth } from '../../contexts/Auth';

type ProfileProps = BottomTabScreenProps<PrivateStackParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { handleLogout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleExitApp = async () => {
    onOpen();
    await handleLogout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
    onClose();
  };

  return (
    <Center flex={1}>
      <Button isLoading={isOpen} onPress={handleExitApp}>
        Sair
      </Button>
    </Center>
  );
};

export default Profile;
