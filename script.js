fetch("https://api.github.com/repos/CIAg-Pompeia/ciag-pompeia.github.io/git/trees/main")
    .then(e => e.json())
    .then(e => {
        console.log(e.tree.filter(t => t.type == 'tree'))
        const projects = (e.tree.filter(t => t.type == 'tree')).map(m => {
            console.log({ name: m.path, url: window.location.href + '/' + m.path, cover: `https://raw.githubusercontent.com/CIAg-Pompeia/ciag-pompeia.github.io/main/${m.path}/cover.png` })
            return ({ name: m.path, url: window.location.href + '/' + m.path, cover: `https://raw.githubusercontent.com/CIAg-Pompeia/ciag-pompeia.github.io/main/${m.path}/cover.png` })
        });
        projects.forEach(project => {
            document.querySelector("#projects").appendChild(parseHTML(`<div>
                <img src="${project.cover}"/>
                <p>${project.name}</p>
            </div>`).body.firstChild)
        });
    })

const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc;
}