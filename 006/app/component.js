export  default (text = 'hello world 1111')=>{
    const element = document.createElement('div');
    element.innerHTML = text;
    return element;
}