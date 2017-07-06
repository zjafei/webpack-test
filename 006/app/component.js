export  default (style) => {
    const text = 'hello world 1111';
    const element = document.createElement('div');
    element.innerHTML = text;
    element.className = style.class1;
    return element;
};