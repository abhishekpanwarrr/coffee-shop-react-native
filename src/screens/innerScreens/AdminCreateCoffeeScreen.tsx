import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Platform, View, Image } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuidv4 } from "uuid";
import RNPickerSelect from 'react-native-picker-select';
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

const AdminCreateCoffeeScreen = ({ navigation }: any) => {
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
            setLoading(false)
            return
        }
        if (response.assets) {
            const firstImage = response.assets[0];
            if (firstImage && firstImage.uri) {
                let file = { uri: firstImage.uri, type: `${firstImage.uri.split(".")[1]}`, name: "image.jpg" }
                return uploadImageToCloudinary(file);
            } else {
                setLoading(false);
                return Alert.alert("No image selected.");
            }
        } else {
            setLoading(false);
            return Alert.alert("No image selected.");
        }
    }

    const handleCoffee = async () => {
        if (name === "" || description === "" || roasted === "" || ingredients === "" || specialIngredients === "" || size === "" || price === "" || images.length > 2) {
            Alert.alert("Please fill all fields!")
        }
        const sizes = [...size.split(',').map((item) => item.trim())]
        const prices = [...price.split(',').map((item) => item.trim())]
        if (sizes.length !== prices.length) {
            return Alert.alert("Coffee size and prices should match")
        }
        const payload = {
            name, description, roasted, ingredients, specialIngredients, size: sizes, price: prices, imagelink_square: images[0], imagelink_portrait: images[1]
        }
        console.log("payload", payload);

        const response = await axios.post("http://localhost:9000/api/coffee/create", payload)
        if (response.data) {
            setName("")
            setDescription("")
            setImages([])
            setRoasted("")
            setIngredients("")
            setSpeicalIngredients("")
            setSize("")
            setPrice("")
            Alert.alert("Coffee added successfully!!")
            return
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
                    <TouchableOpacity style={styles.CloseButton} onPress={() => navigation.navigate("Coffee")}><Text style={styles.CloseButtonText}>X</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.ImageUploadContainer} onPress={() => onButtonPress(options.type, options.options)}>
                        <Image source={require("../../assets/coffee_assets/upload.png")}
                            style={styles.ImageUpload}
                        />
                    </TouchableOpacity>
                    <View style={styles.ImageGrid}>
                        {images.map((image:any,index:any) => (
                            <Image key={index} source={{ uri: image }} width={100} height={100} />
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
                        placeholder="Coffee cup size ex.(S,M,L)"
                        onChangeText={newText => setSize(newText)}
                        defaultValue={size}
                        keyboardType='default'

                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Price in rupees ex.(90,120,200)"
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
    CloseButtonText: {
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
        fontWeight: "700"
    },
    CloseButton: {
        position: "absolute",
        top: 10,
        right: 10
    },
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
        height: 50,
        paddingLeft: SPACING.space_10,
        color: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_10
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