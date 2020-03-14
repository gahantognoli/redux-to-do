import { TodoService } from '../services/TodoService';
import * as TodoAction from '../actions/TodoActions';
import { all, put, takeLatest, takeEvery, select } from 'redux-saga/effects';

function* listAll() {
    const todoList = yield TodoService.list();
    yield put(TodoAction.listResponse(todoList));
}

function* watchListAll() {
    yield takeLatest(TodoAction.TODO_LIST, listAll);
}

function* create({ description }) {
    const newItem = yield TodoService.create({
        description,
        isChecked: false
    });
    yield put(TodoAction.createResponse, newItem);
}

function* watchCreate() {
    yield takeEvery(TodoAction.TODO_CREATE, create);
}

function* remove({ id }) {
    yield TodoService.remove(id);
}

function* watchRemove() {
    yield takeEvery(TodoAction.TODO_REMOVE, remove);
}

function* clear() {
    const state = yield select(),
        todoList = state.TodoReducer;

    const newTodoList = todoList.filter(item => !item.isChecked),
        toRemove = todoList.filter(item => item.isChecked);

    toRemove.forEach(item => TodoService.remove(item.id));

    yield put(TodoAction.listResponse(newTodoList));
}

function* watchClear() {
    yield takeLatest(TodoAction.TODO_CLEAR);
}

function* update({item}){
    TodoService.update(item);
}

function* watchUpdate(){
    yield takeEvery(TodoAction.TODO_UPDATE, update);
}

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        watchCreate(),
        watchRemove(),
        watchClear(),
        watchUpdate()
    ])
}