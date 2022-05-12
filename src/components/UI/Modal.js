import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';

const ModalUI = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      backdropColor="#5B4025"
      style={{}}
      animationOutTiming={800}
      animationInTiming={500}>
      {/* <Spinner accessibilityLabel="Loading posts" /> */}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props.children}
      </View>
    </Modal>
  );
};

export default ModalUI;
