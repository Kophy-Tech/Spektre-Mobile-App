
import * as React from 'react';

import {  StatusBar } from 'react-native';



export default function StatusBarContainer() {
  return (
      < StatusBar
          backgroundColor="#fff"
      barStyle="dark-content" hidden={false}
      />
  );
}
