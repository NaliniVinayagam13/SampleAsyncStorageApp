import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AsycStorageScreen = () => {
    const [textValue, setTextValue] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const credentialsData = await AsyncStorage.getItem('data');
            if (credentialsData !== null) {
                const data = JSON.parse(credentialsData);
                setEmail(data.emailId);
                setPwd(data.password);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const saveData = async () => {
        const credentials: any = {
            emailId: email,
            password: pwd
        };

        try {
            await AsyncStorage.setItem('data', JSON.stringify(credentials));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('data');
            setEmail('');
            setPwd('');
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    };

    return (

        <View style={styles.containerStyle} >
            <Text style={styles.headerStyle}>AsyncStorage Example</Text>

            <TextInput
                multiline={true}
                keyboardType='email-address'
                scrollEnabled={true}
                numberOfLines={3}
                style={styles.descriptiveTextStyle}
                placeholder="Enter your text here.."
                value={textValue}
                onChangeText={text => {
                    setTextValue(text.trim());
                }}
            />

            <Text style={styles.textStyle}>
                {textValue}
            </Text>

            <Text style={styles.credentialsHeaderStyle}>Credentials</Text>

            <TextInput keyboardType='email-address' scrollEnabled={true} style={styles.credentialsInputStyle}
                placeholder="Email id"
                value={email}
                onChangeText={text => {
                    setEmail(text.toLocaleLowerCase().trim());
                }}
            />

            <TextInput secureTextEntry={true} style={styles.credentialsInputStyle}
                placeholder="Password"
                value={pwd}
                onChangeText={text => setPwd(text.trim())}
            />

            <View style={styles.buttonAllignmentStyle}>
                <Button onPress={saveData} title="Save Data" />
                <Button onPress={clearData} title="Clear Data" />
            </View>

            <Text style={styles.bottomStyle}>
                Your Credentials are {'\n\n'}Email Id: {email} {'\n'}Password: {pwd}
            </Text>
        </View>
    );
}
export default AsycStorageScreen;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white'
    },
    headerStyle: {
        margin: 20,
        fontSize: 25,
        color: 'purple',
        textAlign: 'center'
    },
    descriptiveTextStyle: {
        height: 75,
        borderColor: 'orange',
        borderWidth: 2,
        margin: 10,
        padding: 10,
        fontSize: 14,
        color: 'green',
        alignContent: 'flex-start',
        textAlignVertical: 'top'
    },
    textStyle: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    credentialsHeaderStyle: {
        margin: 20,
        fontSize: 20,
        color: 'purple',
        textAlign: 'center'
    },
    credentialsInputStyle: {
        borderColor: 'green',
        borderWidth: 2,
        margin: 10,
        padding: 10,
        fontSize: 14,
        color: 'green',
        alignContent: 'flex-start',
        textAlignVertical: 'top'
    },
    buttonAllignmentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 20
    },
    bottomStyle: {
        margin: 10,
        fontSize: 14,
        color: 'blue',
        textAlign: 'left'
    },
});