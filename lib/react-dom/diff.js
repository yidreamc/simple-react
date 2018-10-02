function diff(dom, vdom) {
    if(typeof vdom === 'string'){

        if(dom && dom.nodeType === 3){

            if (dom.textContent !== vdom) {
                dom.textContent = vdom;
            }
        }else{
            out = document.createTextNode(vdom);
            if (dom && dom.parentNode ){
                dom.parentNode.replaceChild(out, dom);
            }
            return out;
        }
    }
}