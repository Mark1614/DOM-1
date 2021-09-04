window.dom = {
  create(string) {
    //template用于容纳任何元素
    const container = document.createElement("template");
    //trim去掉空格
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //用于新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //用于新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //用于新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  //用于新增爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //用于删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //用于删除后代
  empty(node) {
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //用于读和写属性,根据参数个数写不同的代码就叫重载
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //用于读写文本内容
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1)
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
  },
  //用于读写HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //用于修改style
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  //用于class的添加，删除
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //用于查找选择器
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //用于查找父元素
  parent(node) {
    return node.parentNode;
  },
  //用于查找子元素
  children(node) {
    return node.children;
  },
  //用查找兄弟姐妹元素
  siblings(node) {
    Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //用于获取弟弟
  next(node) {
    let x = node.nextSiblings;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //用于获取哥哥
  previous(node) {
    let x = node.previousSiblings;
    while (x && x.nodeType === 3) {
      x = x.previousSiblings;
    }
    return x;
  },
  //用于遍历
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null,nodeList[i]);
    }
  },
  //
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
