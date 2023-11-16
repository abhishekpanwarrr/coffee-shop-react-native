import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminDashboardScreen from './AdminDashboardScreen';

const ProfileScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const handleLogin = async () => {
        if (email == "" || password == "") {
            return Alert.alert("Please enter all the details.")
        }
        const payload = {
            email: email.toLocaleLowerCase(),
            password
        }
        const response = await axios.post("http://localhost:9000/api/user/login", payload)
        console.log("response", response.data);
        if (response.data) {
            try {
                await AsyncStorage.setItem('bbc_token', response.data.token);
                Alert.alert("Success");
            } catch (e) {
                Alert.alert("Something went wrong in saving token")
            }
        }

    }

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('bbc_token');
                if (storedToken !== null) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };
        retrieveToken()
    }, [token])
    return (
        <View style={styles.Container}>
            {
                token ? <AdminDashboardScreen />: <View style={styles.InnerContainer}>
                    <Text style={styles.Title}>Welcome Back</Text>
                    <Text style={styles.SubTitle}>Please enter your details here</Text>
                    <View style={styles.FormBox}>
                        <TextInput
                            style={styles.Input}
                            placeholderTextColor={"#ddd"}
                            placeholder="Enter your email"
                            onChangeText={newText => setEmail(newText)}
                            defaultValue={email}
                            keyboardType='email-address'
                        />
                        <TextInput
                            style={styles.Input}
                            placeholderTextColor={"#ddd"}
                            placeholder="Password"
                            onChangeText={newText => setPassword(newText)}
                            defaultValue={password}
                        />
                        <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}><Text style={styles.LoginButtonText}>{token ? "User" : "Login"}</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.SignupButton} onPress={() => navigation.push("Signup")}>
                        <Text style={styles.SignupText}>Dont have an account ? <Text style={styles.SignupInnerText}>Sign up</Text></Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    SignupButton: {
        marginVertical: SPACING.space_12,
    },
    SignupInnerText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    SignupText: {
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryLightGreyHex
    },
    InnerContainer: {
        flexGrow: 1,
        justifyContent: "center"
    },
    Title: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_30,
        textAlign: "center",
        marginBottom: SPACING.space_10
    },
    SubTitle: {
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_20,
        textAlign: "center",
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
        color:COLORS.primaryWhiteHex
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
    Container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
        justifyContent: "center",
        alignItems: "center"
    }
})