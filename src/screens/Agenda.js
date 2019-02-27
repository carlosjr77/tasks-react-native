import React, { Component } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTasks'

import todayImage from '../assets/img/today.jpg'

export default class Agenda extends Component {
  state = {
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false
  }

  addTask = task => {
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      description: task.description,
      estimateAt: task.date,
      doneAt: null
    })
    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTak = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks }, this.filterTasks)
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
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }

  toogleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks },
        this.filterTasks)
  }

  componentDidMount = async() => {
    this.setState({loading: true})
    const data = await AsyncStorage.getItem('tasks')
    const tasks = JSON.parse(data) || []
    this.setState({ tasks, loading: false }, this.filterTasks)
  }

  toogleTask = id => {
    const tasks = this.state.tasks.map(task => {
      if(task.id === id) {
        task = {...task}
        task.doneAt = task.doneAt ? null : new Date()
      }
      return task
    })

    this.setState({ tasks }, this.filterTasks)
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
