import { ListItem, ListItemId } from './TodoList'

const listItemStyles = {
    backgroundColor: 'orange',
    padding: '10px'
 };
const titleStyles = {
    margin: '0'
};
const textStyles = {
    marginTop: '5px'
};
const actionsStyles = {
    marginTop: '5px'
};

export default function TodoListItem({ item, onRemove, onEdit }: Props) {

    return (
        <div className="todo-list-item" style={ listItemStyles }>
            <h4 style={ titleStyles }>
                { item.title }
            </h4>
            <div style={ textStyles }>
                { item.text }
            </div>
            <div style={ actionsStyles }>
                <button onClick={() => onEdit(item)}>Edit</button>
                <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </div>
    )
}

type Props = {
    item: ListItem;
    onRemove: (id: ListItemId) => void;
    onEdit: (item: ListItem) => void; 
}
