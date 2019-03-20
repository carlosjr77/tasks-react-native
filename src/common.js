import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ?
    'http://localhost:3000' : 'http://10.0.2.2:3000'

    function showErrorAlert(error) {
        Alert.alert('Ops! Ocorreu um Problema', `Mensagem: ${error}`)
    }


export { server, showErrorAlert }