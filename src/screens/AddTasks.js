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
    Platform
} from 'react-native'
import moment from 'moment'
import CommonStyles from '../commonStyles'

const initialState = { description: '', date: new Date()}

export default class AddTasks extends Component {

    state = { ...initialState }

    save = () => {
        const data = [...this.state]
        this.props.onSave(data)
        this.setState({ ...initialState })
    }
    render() {
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
                        <DatePickerIOS mode='date' date={this.state.date}
                            onDateChange={date => this.setState({ date })} />
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        )
    }
}

const styles = StyleSheet.create({

})