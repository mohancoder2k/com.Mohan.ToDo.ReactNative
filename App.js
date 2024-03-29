import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, AsyncStorage, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState('');

  // Animation value for task item
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (taskText.trim() !== '' && taskTime.trim() !== '') {
      const newTask = { id: Date.now(), text: taskText, time: taskTime };
      setTasks([...tasks, newTask]);

      // Animate the newly added task
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Reset input fields
      setTaskText('');
      setTaskTime('');
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to render a task item
  const renderItem = ({ item }) => (
    <Animated.View style={[styles.taskItem, { opacity: fadeAnim }]}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskText}>{item.text}</Text>
        <Text style={styles.taskTime}>{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Daily Task Planner</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={taskText}
          onChangeText={text => setTaskText(text)}
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 10 }]}
          placeholder="Enter time (e.g., 10:00 AM)"
          value={taskTime}
          onChangeText={text => setTaskTime(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    flex: 1,
  },
  addButton: {
    backgroundColor: 'blue',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
  },
  taskTime: {
    color: 'gray',
  },
});
