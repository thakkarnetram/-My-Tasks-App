import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function TaskItem({ task, toggleComplete, deleteTask }) {
    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.task}
        >
            <TouchableOpacity onPress={() => toggleComplete(task.id)}>
                <Text style={[styles.text, task.completed && styles.completed]}>
                    {task.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        fontSize: 16
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'gray'
    },
    delete: {
        fontSize: 18,
        color: 'red'
    },
});
