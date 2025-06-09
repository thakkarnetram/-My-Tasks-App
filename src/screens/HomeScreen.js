import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import TaskItem from '../components/TaskItem';

export default function HomeScreen() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync();
        loadTasks();
    }, []);

    const registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
            await Notifications.requestPermissionsAsync();
        }
    };

    const loadTasks = async () => {
        try {
            const json = await AsyncStorage.getItem('@tasks');
            if (json !== null) {
                setTasks(JSON.parse(json));
            }
        } catch (e) {
            console.error('Failed to load tasks', e);
        }
    };

    const saveTasks = async (updatedTasks) => {
        try {
            await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
        } catch (e) {
            console.error('Failed to save tasks', e);
        }
    };

    const addTask = async () => {
        if (!text.trim()) {
            Alert.alert('Please enter a task');
            return;
        }

        const id = Date.now().toString();
        const trigger = {
            type: 'date',
            date: new Date(Date.now() + 10 * 1000),
        };

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Task Reminder',
                body: `Time to complete: ${text}`,
            },
            trigger,
        });

        const newTask = {
            id,
            text,
            completed: false,
            notificationId,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setText('');
        saveTasks(updatedTasks);
    };

    const toggleComplete = async (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                if (!task.completed && task.notificationId) {
                    Notifications.cancelScheduledNotificationAsync(task.notificationId);
                }
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const taskToDelete = tasks.find(t => t.id === id);
        if (taskToDelete?.notificationId) {
            Notifications.cancelScheduledNotificationAsync(taskToDelete.notificationId);
        }

        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Tasks</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Task"
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={addTask} style={styles.addBtn}>
                    <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} toggleComplete={toggleComplete} deleteTask={deleteTask} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        flex: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    addBtn: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    },
});
