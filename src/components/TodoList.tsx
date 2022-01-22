import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import TodoEditForm from './TodoEditForm';

const defaultList = [
    {
        id: 1,
        title: 'Запись номер 1',
        text: 'Текст первой записи'
    },
    {
        id: 2,
        title: 'Запись номер 2',
        text: 'Текст второй записи'
    },
    {
        id: 3,
        title: 'Запись номер 3',
        text: 'Текст третьей записи'
    }
]

const styles = getStyles();

export default function TodoList() {
    const [list, updateList] = useState(defaultList as List);
    const [editableListItem, updateEditableListItem] = useState(null as ListItem | null);

    const [isEditFormVisible, toggleEditFormVisibility] = useState(false);
    const showTodoEditForm = () => toggleEditFormVisibility(() => true);
    const hideTodoEditForm = () => toggleEditFormVisibility(() => false);

    const createNewTodo = (newTodo: ListItem) => {
        console.error('createNewTodo', newTodo);
        updateList((prevList) => ([ ...prevList,  newTodo]));
        hideTodoEditForm();
    }

    const updateTodo = (updatedTodo: ListItem) => {
        console.error('updateTodo', updatedTodo);
        updateList((prevList) => {
            return prevList.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            })
        })
        updateEditableListItem(() => (null));
        hideTodoEditForm();
    }

    const removeTodo = (id: ListItemId) => {
        console.error('removeTodo', id);
        updateList((prevList) => prevList.filter((item) => item.id !== id));
    }

    const selectTodoToEdit = (todo: ListItem) => {
        console.error('selectTodoToEdit', todo);
        updateEditableListItem(() => todo);
        showTodoEditForm();
    }

    const listItems = list.map((item) => {
        return (
            <li style={ styles.listItem } key={ item.id }>
                <TodoListItem 
                    item={item}
                    onRemove={removeTodo}
                    onEdit={selectTodoToEdit}
                ></TodoListItem>
            </li>
        )
    })

    return (
        <div className="todo-list" style={ styles.container }>
            <h1 style={ styles.title }>Todos</h1>
            <button onClick={showTodoEditForm}>
                Create
            </button>
            {
                isEditFormVisible &&
                <div style={styles.editForm}>
                    <TodoEditForm
                        editableTodo={editableListItem}
                        onCreate={createNewTodo}
                        onUpdate={updateTodo}
                        onClose={hideTodoEditForm}
                    ></TodoEditForm>
                </div>
            }
            <ul style={ styles.list }>{ listItems }</ul>
        </div>
    )
}

export type ListItemId = number;
export type ListItem = {
    id: ListItemId;
    title: string;
    text: string;
}

type List = ListItem[];

function getStyles(): {[key: string]: React.CSSProperties} {
    return {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
        },
        title: {
            textAlign: 'center'
        },
        list: {
            padding: '0',
        },
        listItem: {
            marginTop: '20px',
            listStyleType: 'none',
        },
        editForm: {
            marginTop: '20px',
        }
    } 
}
