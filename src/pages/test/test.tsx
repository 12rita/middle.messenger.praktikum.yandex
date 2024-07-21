const Test = () => {
    return <div></div>;
};
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
