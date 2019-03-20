import React, { Component } from 'react'
import { 
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
    ImageBackground
} from 'react-native'
import CommonStyles from '../commonStyles'
import backgroundImage from'../assets/img/login.jpg'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    signinOrSignup = () => {
        if(this.state.stageNew) {
            Alert.alert("Criar conta", "Criar conta")

        } else {
            Alert.alert("Entrar na conta", "Entrar na conta")
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgorund}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 
                            'Crie sua Conta' : 'Informe seus Dados'}
                    </Text>
                    { this.state.stageNew &&
                        <TextInput placeholder="Nome" style={styles.input} 
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}/>
                    }
                    <TextInput placeholder="E-mail" style={styles.input} 
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}/>
                    <TextInput placeholder="Senha" style={styles.input} 
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}/>
                    { this.state.stageNew &&
                        <TextInput placeholder="Confirmação de Senha" style={styles.input} 
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}/>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew})}>
                    <Text style={styles.buttonText}>
                                {this.state.stageNew ? 
                                    'Já possui Conta?' : 'Ainda não possui Conta?'}
                            </Text>
                </TouchableOpacity>
            </ImageBackground>
        ) 
    }
}

const styles = StyleSheet.create({
    container: {

    },
    backgorund: {

    },
    title: {

    },
    formC0ontainer: {

    }
})