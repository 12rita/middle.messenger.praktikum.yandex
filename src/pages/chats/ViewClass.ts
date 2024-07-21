export class View {
    content = '';

    constructor() {}
    getContent() {
        return this.content;
    }
    render() {}
    _render() {
        const { main, title } = this.render();
        this.content = Handlebars.compile(`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>

</head>
<body>
${main}
</body>
</html>
`)({});
    }
}
