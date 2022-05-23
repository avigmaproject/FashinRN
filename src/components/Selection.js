import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "react-native-vector-icons/AntDesign"
import { addUserCollection } from "../services/api.fuctions"
import Button from "./UI/Button"
import InputText from "./UI/InputText"
import Modal from "./UI/Modal"
import { addUserCollectionItem } from "../store/actions/profileActions"
import { Toast } from "native-base"

const Selection = (props) => {
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(null)

  // const dropDownData = useSelector((state) => state.profile.dropdownData)
  const token = useSelector((state) => state.auth.userToken)
  const dispatch = useDispatch()
  const itemValueInputChangeHandler = (text) => {
    setShowErrorMsg(null)
    setAddItemValue(text)
  }

  const validation = () => {
    let cancel = false
    if (addItemValue.length === 0) {
      cancel = true
    }

    if (cancel) {
      setShowErrorMsg("Fields can not be empty")
      return false
    } else {
      return true
    }
  }

  const addToUserFav = (itemName) => {
    console.log("addToUserFav", itemName, props.sid)
    if (validation()) {
      const data = {
        UF_UC_PKeyID: 0,
        UF_UP_PKeyID: props.sid,
        Type: 1,
        UC_Name: itemName,
        UF_IsDelete: 0,
        UF_Closet_Spotlight: props.spotlight ? 2 : 1
      }
      console.log("data", data)
      if (addItemValue.trim() != "") {
        addUserCollection(data, token)
          .then((res) => {
            console.log(res.data)
            setShowModal(false)
          })
          .catch((err) => {
            setShowModal(false)
            console.log(err)
            setAddItemValue("")
          })
      }
    }
  }

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      )
    }
    return null
  }

  const onChangeHandler = (item) => {
    setValue(item.value)
    setIsFocus(false)
    if (item.value === -1) {
      setShowModal(true)
    }
    // console.log(props, 'here');
    props.changeHandler(item)
  }

  return (
    <View style={{ ...styles.container, ...props.style }}>
      {renderLabel()}
      <Modal isVisible={showModal}>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "92%",
            borderRadius: 10,
            minHeight: 220
          }}
        >
          <View style={{ height: 20, alignSelf: "center", marginTop: 18 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Add Item</Text>
          </View>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <InputText
              style={{ marginBottom: 10, width: "100%" }}
              label="Add Item"
              value={addItemValue}
              onChangeText={(text) => itemValueInputChangeHandler(text)}
              errorMsg={showErrorMsg}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 15
            }}
          >
            <Button
              style={{ width: 75, height: 50 }}
              text="Cancel"
              textColor="#593714"
              onPress={() => setShowModal(false)}
            />
            <Button
              style={{ width: 75, height: 50 }}
              text="Add"
              backgroundColor="#5B4025"
              onPress={() => addToUserFav(addItemValue)}
            />
          </View>
        </View>
      </Modal>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#593714" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{ backgroundColor: "#EBD4BD" }}
        activeColor="#AB8560"
        showsVerticalScrollIndicator={false}
        iconColor="#593714"
        data={props.data}
        autoScroll
        dropdownPosition="bottom"
        search
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "My Collection" : "My Collection"}
        searchPlaceholder="Search..."
        value={props.value ? props.value : value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => onChangeHandler(item)}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  )
}

export default Selection

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CDAF90",
    width: "86%",
    margin: 16,
    borderRadius: 8,
    color: "#593714"
  },
  dropdown: {
    height: 50,
    borderColor: "#D7C7B6",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#EBD4BD"
  },
  icon: {
    marginRight: 5,
    color: "#593714"
  },
  label: {
    position: "absolute",
    backgroundColor: "#D7C7B6",
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    display: "none"
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#593714"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#593714"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: "#593714",
    color: "#593714"
  }
})
