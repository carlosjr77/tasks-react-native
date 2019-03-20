import React, { Component } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTasks'
import { server, showErrorAlert } from '../common'
import Axios from 'axios';

import todayImage from '../assets/img/today.jpg'

export default class Agenda extends Component {
  state = {
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false
  }

  addTask = async task => {
    try {
      await Axios.post(`${server}/tasks`, {
        description: task.description,
        estimateAt: task.date
      })
      this.setState({ showAddTask: false }, this.loadTasks)
    } catch (error) {
      showErrorAlert(error)
    }
  }

  deleteTak = async id => {
    try {
      await Axios.delete(`${server}/tasks/${id}`)
      await this.loadTasks()
    } catch(error) {
      showErrorAlert(error)
    }
  }

  filterTasks = () => {
    let visibleTasks = null
    if(this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({ visibleTasks })
  }

  toogleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks },
        this.filterTasks)
  }

  componentDidMount = async() => {
    this.loadTasks()
  }

  toogleTask = async id => {
    try {
      await Axios.put(`${server}/tasks/${id}/toggle`)
      await this.loadTasks()
    } catch (error) {
      showErrorAlert(error)
    }
  }

  loadTasks = async () => {
    try {
      const maxDate = moment()
      .format('YYYY-MM-DD 23:59')
      const res = await Axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({ tasks: res.data }, this.filterTasks)
    } catch (error) {
      showErrorAlert(error)
    }
  }

  render() {
    if (this.state.loading) {
      return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color={commonStyles.colors.today} /></View>
    }
    return (
      <View style={styles.container}>
        <AddTask onVisible={this.state.showAddTask}
          onSave={this.addTask}
          onCancel={() => this.setState({ showAddTask: false })} />
        <ImageBackground source={todayImage} style={styles.backgroud}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={this.toogleFilter}>
            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
              size={25} color={commonStyles.colors.secondary}/>
          </TouchableOpacity>
        </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>
              {moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.tasksContainer}>
          <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => 
              <Task {...item} toogleTask={this.toogleTask} onDelete={this.deleteTak} /> }/>
        </View>
        <ActionButton buttonColor={commonStyles.colors.today}
          onPress={() => this.setState({ showAddTask: true })} /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroud: {
    flex: 3,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  tasksContainer: {
    flex: 7
  },
  iconBar: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
