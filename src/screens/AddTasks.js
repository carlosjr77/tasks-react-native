import React, { Component } from 'react'
import { 
    Modal,
    View,
    StyleSheet,
    Text,
    TextInput,
    DatePickerAndroid,
    DatePickerIOS,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    Alert
} from 'react-native'
import moment from 'moment'
import CommonStyles from '../commonStyles'

const initialState = { description: '', date: new Date()}

export default class AddTasks extends Component {

    state = { ...initialState }

    save = () => {
        if(!this.state.description.trim()) {
            Alert.alert('Dados Inválidos', 'Informe uma descrição para continuar')
            return
        }
        const data = {...this.state}
        this.props.onSave(data)
        this.setState({ ...initialState })
    }

    handleDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if(e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date) 
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({ date: momentDate.toDate() })
            }
        })
    }

    render() {
        let datePicker = null
        if(Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='date' date={this.state.date}
                onDateChange={date => this.setState({ date })} />
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.onVisible}
                animationType='slide'
                transparent={true}>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.offSet}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.header}>Nova Tarefa!</Text>
                        <TextInput placeholder='Descrição...' style={styles.input}
                            onChangeText={description => this.setState({ description })} 
                            value={this.state.description} />
                            {datePicker}
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.offSet}></View>
                    </TouchableWithoutFeedback>
                </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    offSet: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: CommonStyles.colors.default
    },
    header: {
        fontFamily: CommonStyles.fontFamily,
        backgroundColor: CommonStyles.colors.default,
        color: CommonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15 
    },
    input: {
        fontFamily: CommonStyles.fontFamily,
        marginTop: 10,
        marginLeft: 10,
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6   
    },
    date: {
        fontFamily: CommonStyles.fontFamily,
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 20 
    }
})