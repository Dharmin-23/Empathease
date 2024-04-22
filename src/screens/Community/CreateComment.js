import React from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo';


const CreateComment = ({ onPress, setComment, comment, setIsFocused }) => {
  const { colors } = useTheme()
  const textInputRef = React.useRef()

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }
        ]}
        ref={textInputRef}
        placeholder="Add a comment"
        placeholderTextColor={colors.text}
        onChangeText={setComment}
        maxLength={2000}
        autoCorrect={false}
        value={comment}
        multiline={true} // Enable multiline
        numberOfLines={4} // Set the number of lines
      />
      <TouchableOpacity
        onPress={() => {
          textInputRef.current.blur()
          onPress()
        }}
      >
        <Entypo
          onPress={()=> {console.log(sent)}}
          style={{ marginRight: 5 }}
          name="direction"
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    paddingHorizontal: 5,
    elevation: 3
  },
  textInput: {
    flex: 1,
    margin: 5,
    height: 100, // Increase height
    borderRadius: 10,
    paddingHorizontal: 15
  }
})

export default CreateComment
