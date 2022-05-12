import React from 'react';
import {Button, Center, Spinner, Heading} from 'native-base';
import {BubblesLoader} from 'react-native-indicator';
import Modal from 'react-native-modal';
import {View} from 'react-native';
const SpinnerBackdrop = props => {
  // const [showModal, setShowModal] = useState(false);
  return (
    <Modal isVisible={props.showModal} backdropColor="#5B4025">
      {/* <Spinner accessibilityLabel="Loading posts" /> */}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BubblesLoader size={80} color="#ffffff" dotRadius={20} />
        <Heading color="#ffffff" fontSize="md">
          Just a second
        </Heading>
      </View>
    </Modal>
  );
};

export default SpinnerBackdrop;
