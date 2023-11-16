import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme'

const SignupScreen = ({ navigation }: any) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <View style={styles.Container}>
            <View style={styles.InnerContainer}>
                <Text style={styles.Title}>Welcome</Text>
                <Text style={styles.SubTitle}>Create an account</Text>
                <View style={styles.FormBox}>
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Enter your fullname"
                        onChangeText={newText => setName(newText)}
                        defaultValue={name}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Enter your email"
                        onChangeText={newText => setEmail(newText)}
                        defaultValue={email}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholderTextColor={"#ddd"}
                        placeholder="Password"
                        onChangeText={newText => setPassword(newText)}
                        defaultValue={password}
                    />
                    <TouchableOpacity style={styles.LoginButton}><Text style={styles.LoginButtonText}>Signup</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.SignupButton} onPress={() => navigation.push("Profile")}>
                    <Text style={styles.SignupText}>Already have an account ? <Text style={styles.SignupInnerText}>Login </Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreen

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
        paddingLeft: SPACING.space_10
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