// components/HamburgerMenu.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

export default function HamburgerMenu({ onFlag, onEdit, onDelete }) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="menu" onPress={openMenu} />}
      >
        <Menu.Item onPress={onFlag} title="Flag" />
        <Menu.Item onPress={onEdit} title="Edit" />
        <Menu.Item onPress={onDelete} title="Delete" />
      </Menu>
    </View>
  );
}
