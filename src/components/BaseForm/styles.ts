import styled from 'styled-components/native';

import { config } from '../../config/gluestack-ui.config';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${config.tokens.colors.background};
`;

export const KeyboardView = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled.View`
  padding: 0px 16px;
  flex: 1;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const TopContent = styled.View``;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
