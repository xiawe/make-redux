import { stat } from "fs";

const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}

function creatStore(state, stateChanger) {
    let listeners = []
    let subscribe = listener => listener.push(listner)
    const getState = () => state
    const dispatch = (action) => {
        stateChanger(state, action)
        listeners.forEach(listener => listener())
    }
    return {getState, dispatch, subscribe}
}

function renderApp(state) {
    renderTitle(state.title)
    renderContent(state.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

const store = creatStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))
renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
