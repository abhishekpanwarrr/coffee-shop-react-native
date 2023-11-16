import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Platform, View, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import RNCloudinary from 'react-native-cloudinary';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
    },
}

const AdminCreateCoffeeScreen = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [roasted, setRoasted] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [specialIngredients, setSpeicalIngredients] = useState("")
    const [size, setSize] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const onButtonPress = async (type: any, options: any) => {
        if (images.length == 2) {
            return Alert.alert("Max 2 images upload.")
        }
        setLoading(true)
        const response = await launchImageLibrary(options);
        if (response.didCancel) {
            return setLoading(false)
        }
        if (response.assets) {
            let file = { uri: response.assets[0]?.uri, type: `${response.assets[0]?.uri.split(".")[1]}`, name: "image.jpg" }
            return uploadImageToCloudinary(file)
        }
    }
    const handleCoffee = async () => {
        if (name === "" || description === "" || roasted === "" || ingredients === "" || specialIngredients === "" || size === "" || price === "" || images.length > 2) {
            Alert.alert("Please fill all fields!")
        }
        const payload = {
            name, description, roasted, ingredients, specialIngredients, prices: [{ size, price, currency: "₹" }], imagelink_square: images[0], imagelink_portrait: images[1]
        }
        const response = await axios.post("http://localhost:9000/api/coffee/create", payload)
        console.log("response.data", response.data);
        if (response.data) {
            setName("")
            setDescription("")
            setImages([])
            setRoasted("")
            setIngredients("")
            setSpeicalIngredients("")
            setSize("")
            setPrice("")
            return Alert.alert("Coffee added successfully!!")
        }

    }
    const uploadImageToCloudinary = async (imageUri: any) => {
        const data = new FormData()
        data.append("file", imageUri)
        data.append("upload_preset", "bbc_cafe")
        data.append("cloud_name", "dl1a6idba")

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dl1a6idba/image/upload", {
                method: "POST",
                body: data
            })
            const image = await response.json()

            setImages([...images, image.secure_url])
            Alert.alert(image.secure_url)
            setLoading(false)

        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.FormBox}>
                {loading ? <View style={{ flexGrow: 1, justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{ color: "white" }}>Loading...</Text>
                </View> : <>

                    <Text style={styles.ContainerTitle}>Add New coffee</Text>
                    <TouchableOpacity style={styles.ImageUploadContainer} onPress={() => onButtonPress(options.type, options.options)}>
                        <Image source={require("../../assets/coffee_assets/upload.png")}
                            style={styles.ImageUpload}
                        />
                    </TouchableOpacity>
                    <View style={styles.ImageGrid}>
                        {images.map((image: any) => (
                            <Image key={image} source={{ uri: image }} width={100} height={100} />
                        ))}
                    </View>
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Coffee name"
                        onChangeText={newText => setName(newText)}
                        defaultValue={name}
                        keyboardType='default'
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="About coffee"
                        onChangeText={newText => setDescription(newText)}
                        defaultValue={description}
                        keyboardType='default'
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Roasted or not"
                        onChangeText={newText => setRoasted(newText)}
                        defaultValue={roasted}
                        keyboardType='default'
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Ingredients"
                        onChangeText={newText => setIngredients(newText)}
                        defaultValue={ingredients}
                        keyboardType='default'

                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Ingredients"
                        onChangeText={newText => setSpeicalIngredients(newText)}
                        defaultValue={specialIngredients}
                        keyboardType='default'
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Size"
                        onChangeText={newText => setSize(newText)}
                        defaultValue={size}
                        keyboardType='default'
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Price"
                        onChangeText={newText => setPrice(newText)}
                        defaultValue={price}
                        keyboardType='default'
                    />

                    <TouchableOpacity style={styles.LoginButton} onPress={handleCoffee}><Text style={styles.LoginButtonText}>Add Coffee</Text></TouchableOpacity></>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminCreateCoffeeScreen

const styles = StyleSheet.create({
    ImageGrid: {
        flexDirection: "row",
        gap: SPACING.space_10,
    },
    ImageUploadContainer: {
        width: 70,
        height: 50,
        alignSelf: 'center',
        marginVertical: 10
    },
    ImageUpload: {
        width: "100%",
        height: "100%",
        objectFit: "fill",
        borderRadius: BORDERRADIUS.radius_20
    },
    ContainerTitle: {
        color: COLORS.primaryWhiteHex,
        textAlign: "center",
        fontSize: FONTSIZE.size_24,
        textDecorationLine: "underline",
        letterSpacing: 1,
        paddingBottom: 5
    },
    Container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
        paddingHorizontal: SPACING.space_10
    },
    FormBox: {
        marginTop: SPACING.space_20,
        marginBottom: SPACING.space_24
    },
    Input: {
        backgroundColor: COLORS.primaryGreyHex,
        marginVertical: SPACING.space_10,
        height: SPACING.space_36,
        paddingLeft: SPACING.space_10,
        color: COLORS.primaryWhiteHex
    },
    LoginButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: BORDERRADIUS.radius_8,
        marginTop: SPACING.space_4
    },
    LoginButtonText: {
        textAlign: "center",
        paddingVertical: SPACING.space_15,
    },
})