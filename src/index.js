/** @jsx newDom */
import "./styles.css";

function newDom(type, props, ...args) {
  const children = [].concat(...args);

  return {
    type,
    props,
    children
  };
}

function render(node) {
  if (typeof node.type === "function") {
    const result = node.type(node.props);
    return render(result);
  }

  const element = document.createElement(node.type);

  if (node.props) {
    applyClass(element, node);
    Object.keys(node.props).map((key) => {
      element.setAttribute(key, node.props[key]);
    });
  }

  node.children.forEach((child) => {
    if (typeof child === "string") {
      return element.appendChild(document.createTextNode(child));
    }

      return element.appendChild(render(child))
  });

  return element;
}

function applyClass(element, node) {
  if (node.props.className) {
    element.setAttribute("class", node.props.className);
  }
}

const title = (
  <h1 className="title" style="text-decoration: underline">
    Prueba
  </h1>
);

const Subtitle = ({ text }) => <h2>{text}</h2>;

document.body.appendChild(render(title));
document.body.appendChild(render(<Subtitle text="prueba" />));

document.body.appendChild(
  render(
    <ul>
      <li>primer</li>
      <li>segundo</li>
      <li>segundo</li>
    </ul>
  )
);