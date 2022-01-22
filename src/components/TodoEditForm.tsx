import React, { useState } from 'react';
import { ListItem } from './TodoList';

const styles = getStyles();

export default function TodoEditForm({ editableTodo, onCreate, onUpdate, onClose }: Props) {
    const [title, changeTitle] = useState(editableTodo?.title || '');
    const [text, changeText] = useState(editableTodo?.text || '');

    const reset = () => {
        changeTitle(() => '');
        changeText(() => '');
    }

    const getNewTodo = () => {
        const newTodo = {
            id: editableTodo?.id || (new Date()).getTime(),
            title,
            text,
        };
        reset();
        return newTodo;
    }

    const submit = () => {
        console.error('submit', editableTodo);
        const todo = getNewTodo();
        editableTodo ? onUpdate(todo) : onCreate(todo);
    }

    return (
        <div className="todo-edit-form" style={styles.container}>
            <div style={styles.titleContainer}>
                <div style={styles.titleContainerCol}>
                    <h3 style={styles.title}>Todo edit form</h3>
                </div>
                <div style={{...styles.titleContainerCol, ...styles.titleContainerColButton}}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
            <div style={styles.field}>
                <span>Title</span>
                <input 
                    type="text"
                    style={styles.fieldInput}
                    value={title}
                    onChange={(e) => changeTitle(() => e.target.value)}
                />
            </div>
            <div style={styles.field}>
                <span>Text</span>
                <textarea
                    style={styles.fieldInput}
                    value={text}
                    onChange={(e) => changeText(() => e.target.value)}
                ></textarea>
            </div>
            <div style={styles.field}>
                <button onClick={ submit }>Save</button>
            </div>
        </div>
    )
}

type Props = {
    editableTodo?: ListItem | null;
    onCreate: (newTodo: ListItem) => void;
    onUpdate: (updatedTodo: ListItem) => void;
    onClose: () => void;
}

function getStyles(): {[key: string]: React.CSSProperties} {
    return {
        container: {
            backgroundColor: 'lightgreen',
            padding: '10px',
            boxSizing: 'border-box',
        },
        titleContainer: {
            display: 'flex',
        },
        titleContainerCol: {
            flex: '50%',
        },
        titleContainerColButton: {
            textAlign: 'right'
        },
        title: {
            margin: '0',
        },
        field: {
            marginTop: '10px'
        },
        fieldInput: {
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
        },
    } 
}
